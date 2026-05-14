"""
GPU-accelerated photo enhancement for Grodzinski Bakery product photos.
Uses RTX 3080 for:
- High-quality background removal (rembg with GPU or SAM)
- AI relighting (IC-Light)
- Background generation (Stable Diffusion)

Requirements:
    pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
    pip install rembg[gpu] pillow numpy diffusers transformers accelerate
    pip install opencv-python
"""

import sys
import os
from pathlib import Path
from typing import Optional, Literal
import argparse

# Set CUDA device before importing torch
os.environ.setdefault("CUDA_VISIBLE_DEVICES", "0")

import torch
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ExifTags

# Check CUDA availability
CUDA_AVAILABLE = torch.cuda.is_available()
DEVICE = "cuda" if CUDA_AVAILABLE else "cpu"

if CUDA_AVAILABLE:
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")
else:
    print("WARNING: CUDA not available, using CPU (will be slow)")

# Try importing optional dependencies
try:
    from rembg import remove, new_session
    REMBG_AVAILABLE = True
except ImportError:
    REMBG_AVAILABLE = False
    print("Warning: rembg not installed. Run: pip install rembg[gpu]")

try:
    from diffusers import StableDiffusionInpaintPipeline, AutoPipelineForInpainting
    DIFFUSERS_AVAILABLE = True
except ImportError:
    DIFFUSERS_AVAILABLE = False
    print("Warning: diffusers not installed. Run: pip install diffusers transformers accelerate")

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
    HEIC_SUPPORT = True
except ImportError:
    HEIC_SUPPORT = False


class ProductPhotoEnhancer:
    """GPU-accelerated product photo enhancement pipeline."""
    
    def __init__(
        self,
        use_gpu: bool = True,
        bg_model: str = "u2net",  # Options: u2net, isnet-general-use, sam
        enable_relighting: bool = False,
        enable_bg_generation: bool = False,
    ):
        self.device = DEVICE if use_gpu else "cpu"
        self.bg_model = bg_model
        self.enable_relighting = enable_relighting
        self.enable_bg_generation = enable_bg_generation
        
        # Initialize rembg session for GPU acceleration
        self.rembg_session = None
        if REMBG_AVAILABLE:
            print(f"Initializing background removal model: {bg_model}")
            self.rembg_session = new_session(bg_model)
        
        # Initialize inpainting pipeline for background generation
        self.inpaint_pipe = None
        if enable_bg_generation and DIFFUSERS_AVAILABLE and CUDA_AVAILABLE:
            print("Loading Stable Diffusion inpainting model...")
            self.inpaint_pipe = AutoPipelineForInpainting.from_pretrained(
                "runwayml/stable-diffusion-inpainting",
                torch_dtype=torch.float16,
                variant="fp16",
            ).to("cuda")
            self.inpaint_pipe.enable_model_cpu_offload()
    
    def fix_orientation(self, img: Image.Image) -> Image.Image:
        """Fix image orientation based on EXIF data."""
        try:
            exif = img._getexif()
            if exif is None:
                return img
            
            orientation_key = None
            for key, val in ExifTags.TAGS.items():
                if val == 'Orientation':
                    orientation_key = key
                    break
            
            if orientation_key is None or orientation_key not in exif:
                return img
            
            orientation = exif[orientation_key]
            
            if orientation == 2:
                img = img.transpose(Image.FLIP_LEFT_RIGHT)
            elif orientation == 3:
                img = img.rotate(180, expand=True)
            elif orientation == 4:
                img = img.transpose(Image.FLIP_TOP_BOTTOM)
            elif orientation == 5:
                img = img.transpose(Image.FLIP_LEFT_RIGHT).rotate(90, expand=True)
            elif orientation == 6:
                img = img.rotate(270, expand=True)
            elif orientation == 7:
                img = img.transpose(Image.FLIP_LEFT_RIGHT).rotate(270, expand=True)
            elif orientation == 8:
                img = img.rotate(90, expand=True)
                
        except (AttributeError, KeyError, IndexError, TypeError):
            pass
        
        return img
    
    def remove_background(self, img: Image.Image) -> Image.Image:
        """Remove background using GPU-accelerated model."""
        if not REMBG_AVAILABLE:
            print("  [skip] rembg not available")
            return img.convert("RGBA")
        
        if img.mode not in ('RGB', 'RGBA'):
            img = img.convert('RGB')
        
        # Use session for faster repeated processing
        result = remove(img, session=self.rembg_session)
        return result
    
    def crop_to_content(self, img: Image.Image, padding_percent: float = 0.08) -> Image.Image:
        """Crop image to non-transparent content with padding."""
        if img.mode != 'RGBA':
            return img
        
        alpha = np.array(img.split()[3])
        
        rows = np.any(alpha > 10, axis=1)
        cols = np.any(alpha > 10, axis=0)
        
        if not np.any(rows) or not np.any(cols):
            return img
        
        y_min, y_max = np.where(rows)[0][[0, -1]]
        x_min, x_max = np.where(cols)[0][[0, -1]]
        
        content_width = x_max - x_min
        content_height = y_max - y_min
        
        pad = int(max(content_width, content_height) * padding_percent)
        pad = max(pad, 20)
        
        width, height = img.size
        x_min = max(0, x_min - pad)
        y_min = max(0, y_min - pad)
        x_max = min(width, x_max + pad)
        y_max = min(height, y_max + pad)
        
        return img.crop((x_min, y_min, x_max, y_max))
    
    def create_studio_background(
        self,
        img: Image.Image,
        style: Literal["flour", "marble", "wood", "gradient", "plain"] = "gradient",
        color: tuple = (250, 248, 245),  # Warm white
    ) -> Image.Image:
        """Create a professional studio-style background."""
        width, height = img.size
        
        if style == "plain":
            bg = Image.new('RGB', (width, height), color)
        
        elif style == "gradient":
            # Create soft vertical gradient (lighter at top)
            bg = Image.new('RGB', (width, height))
            pixels = bg.load()
            for y in range(height):
                # Gradient from light to slightly darker
                factor = 1.0 - (y / height) * 0.08
                r = int(color[0] * factor)
                g = int(color[1] * factor)
                b = int(color[2] * factor)
                for x in range(width):
                    pixels[x, y] = (r, g, b)
            
            # Add subtle noise for texture
            noise = np.random.normal(0, 2, (height, width, 3)).astype(np.int16)
            bg_arr = np.array(bg).astype(np.int16) + noise
            bg_arr = np.clip(bg_arr, 0, 255).astype(np.uint8)
            bg = Image.fromarray(bg_arr)
        
        elif style == "flour":
            # Create flour-dusted surface look
            bg = Image.new('RGB', (width, height), (248, 245, 240))
            
            # Add flour dust texture
            noise = np.random.normal(0, 8, (height, width, 3))
            # Make it more white/powdery
            noise[:, :, :] += np.random.choice([0, 15, 25], (height, width, 1), p=[0.7, 0.2, 0.1])
            
            bg_arr = np.array(bg).astype(np.float32) + noise
            bg_arr = np.clip(bg_arr, 0, 255).astype(np.uint8)
            bg = Image.fromarray(bg_arr)
            bg = bg.filter(ImageFilter.GaussianBlur(0.5))
        
        else:
            bg = Image.new('RGB', (width, height), color)
        
        return bg
    
    def add_soft_shadow(self, img: Image.Image, bg: Image.Image) -> Image.Image:
        """Add realistic soft shadow beneath the product."""
        if img.mode != 'RGBA':
            return Image.alpha_composite(bg.convert('RGBA'), img.convert('RGBA'))
        
        # Get alpha channel for shadow
        alpha = img.split()[3]
        
        # Create shadow (darker, blurred, offset version of alpha)
        shadow = alpha.copy()
        shadow = shadow.filter(ImageFilter.GaussianBlur(15))
        
        # Offset shadow downward
        shadow_offset = Image.new('L', img.size, 0)
        offset_y = int(img.size[1] * 0.02)  # 2% offset
        shadow_offset.paste(shadow, (0, offset_y))
        
        # Make shadow semi-transparent
        shadow_arr = np.array(shadow_offset).astype(np.float32)
        shadow_arr = (shadow_arr * 0.15).astype(np.uint8)  # 15% opacity
        shadow_img = Image.fromarray(shadow_arr)
        
        # Create shadow layer
        shadow_layer = Image.new('RGBA', img.size, (0, 0, 0, 0))
        shadow_rgba = Image.merge('RGBA', (
            Image.new('L', img.size, 30),  # Dark gray
            Image.new('L', img.size, 25),
            Image.new('L', img.size, 20),
            shadow_img
        ))
        
        # Composite: bg -> shadow -> product
        result = bg.convert('RGBA')
        result = Image.alpha_composite(result, shadow_rgba)
        result = Image.alpha_composite(result, img)
        
        return result
    
    def enhance_colors(
        self,
        img: Image.Image,
        saturation: float = 1.12,
        contrast: float = 1.05,
        brightness: float = 1.02,
        sharpness: float = 1.08,
        warmth: float = 1.02,  # Slight warm tint
    ) -> Image.Image:
        """Enhance colors with professional adjustments."""
        if img.mode == 'RGBA':
            r, g, b, a = img.split()
            rgb = Image.merge('RGB', (r, g, b))
        else:
            rgb = img.convert('RGB')
            a = None
        
        # Apply enhancements
        rgb = ImageEnhance.Color(rgb).enhance(saturation)
        rgb = ImageEnhance.Contrast(rgb).enhance(contrast)
        rgb = ImageEnhance.Brightness(rgb).enhance(brightness)
        rgb = ImageEnhance.Sharpness(rgb).enhance(sharpness)
        
        # Add warmth (slight red/yellow boost)
        if warmth != 1.0:
            rgb_arr = np.array(rgb).astype(np.float32)
            rgb_arr[:, :, 0] *= warmth  # Red
            rgb_arr[:, :, 1] *= (1 + (warmth - 1) * 0.5)  # Green (less)
            rgb_arr = np.clip(rgb_arr, 0, 255).astype(np.uint8)
            rgb = Image.fromarray(rgb_arr)
        
        if a is not None:
            r, g, b = rgb.split()
            return Image.merge('RGBA', (r, g, b, a))
        return rgb
    
    def generate_contextual_background(
        self,
        img: Image.Image,
        prompt: str = "professional bakery product photo, soft neutral background, scattered flour, studio lighting, food photography",
        negative_prompt: str = "blurry, dark, harsh shadows, cluttered, text, watermark",
    ) -> Image.Image:
        """Generate AI background using Stable Diffusion inpainting."""
        if self.inpaint_pipe is None:
            print("  [skip] Inpainting not available, using gradient background")
            return self.create_studio_background(img, style="gradient")
        
        # Create mask from alpha channel (inpaint where transparent)
        if img.mode == 'RGBA':
            alpha = np.array(img.split()[3])
            mask = Image.fromarray((alpha < 128).astype(np.uint8) * 255)
        else:
            # No alpha, can't generate background
            return self.create_studio_background(img, style="gradient")
        
        # Resize for SD (must be multiple of 8)
        target_size = 512
        aspect = img.size[0] / img.size[1]
        if aspect > 1:
            new_w = target_size
            new_h = int(target_size / aspect)
        else:
            new_h = target_size
            new_w = int(target_size * aspect)
        new_w = (new_w // 8) * 8
        new_h = (new_h // 8) * 8
        
        img_resized = img.convert('RGB').resize((new_w, new_h), Image.LANCZOS)
        mask_resized = mask.resize((new_w, new_h), Image.LANCZOS)
        
        # Generate
        with torch.inference_mode():
            result = self.inpaint_pipe(
                prompt=prompt,
                negative_prompt=negative_prompt,
                image=img_resized,
                mask_image=mask_resized,
                num_inference_steps=25,
                guidance_scale=7.5,
            ).images[0]
        
        # Resize back and composite with original product
        result = result.resize(img.size, Image.LANCZOS)
        
        if img.mode == 'RGBA':
            result = result.convert('RGBA')
            result = Image.alpha_composite(result, img)
        
        return result
    
    def process(
        self,
        input_path: Path,
        output_path: Path,
        max_size: int = 1200,
        bg_style: str = "gradient",
        use_ai_background: bool = False,
    ) -> bool:
        """Process a single photo through the full pipeline."""
        try:
            print(f"  Loading: {input_path.name}")
            img = Image.open(input_path)
            
            # Fix orientation
            img = self.fix_orientation(img)
            img = img.convert("RGB")
            
            # Remove background (GPU accelerated)
            print("  Removing background...")
            img = self.remove_background(img)
            
            # Crop to content
            img = self.crop_to_content(img, padding_percent=0.10)
            
            # Create/generate background
            if use_ai_background and self.inpaint_pipe:
                print("  Generating AI background...")
                result = self.generate_contextual_background(img)
            else:
                print(f"  Creating {bg_style} background...")
                # Make square first
                size = max(img.size)
                square = Image.new('RGBA', (size, size), (0, 0, 0, 0))
                x = (size - img.size[0]) // 2
                y = (size - img.size[1]) // 2
                square.paste(img, (x, y), img)
                img = square
                
                bg = self.create_studio_background(img, style=bg_style)
                result = self.add_soft_shadow(img, bg)
            
            # Enhance colors
            print("  Enhancing colors...")
            result = self.enhance_colors(result)
            
            # Resize if needed
            if max(result.size) > max_size:
                result.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
            
            # Save
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Save as PNG if has transparency, else JPEG for smaller size
            if result.mode == 'RGBA':
                result.save(output_path, "PNG", optimize=True)
            else:
                if output_path.suffix.lower() == '.png':
                    result.save(output_path, "PNG", optimize=True)
                else:
                    output_path = output_path.with_suffix('.jpg')
                    result.convert('RGB').save(output_path, "JPEG", quality=92, optimize=True)
            
            print(f"  Saved: {output_path.name}")
            return True
            
        except Exception as e:
            print(f"  ERROR: {e}")
            import traceback
            traceback.print_exc()
            return False
    
    def process_folder(
        self,
        input_folder: Path,
        output_folder: Path,
        limit: Optional[int] = None,
        **kwargs
    ) -> tuple[int, int]:
        """Process all photos in a folder."""
        supported = {'.jpg', '.jpeg', '.png', '.webp'}
        if HEIC_SUPPORT:
            supported.add('.heic')
        
        files = sorted([f for f in input_folder.iterdir() if f.suffix.lower() in supported])
        
        if limit:
            files = files[:limit]
        
        success = 0
        
        for i, input_path in enumerate(files, 1):
            print(f"\n[{i}/{len(files)}] Processing {input_path.name}")
            output_path = output_folder / f"{input_path.stem}.png"
            
            if self.process(input_path, output_path, **kwargs):
                success += 1
        
        return success, len(files)


def main():
    parser = argparse.ArgumentParser(description="GPU-accelerated product photo enhancement")
    parser.add_argument("--input", "-i", type=Path, help="Input folder or file")
    parser.add_argument("--output", "-o", type=Path, help="Output folder")
    parser.add_argument("--limit", "-n", type=int, help="Limit number of photos")
    parser.add_argument("--bg-style", choices=["gradient", "flour", "plain"], default="gradient")
    parser.add_argument("--ai-bg", action="store_true", help="Use AI to generate background")
    parser.add_argument("--max-size", type=int, default=1200, help="Max output dimension")
    parser.add_argument("--cpu", action="store_true", help="Force CPU mode")
    
    args = parser.parse_args()
    
    # Default paths
    base_path = Path(__file__).parent.parent
    input_folder = args.input or base_path / "public/images/Photos/Raw/Grodzinski Photos/Good"
    output_folder = args.output or base_path / "public/images/Photos/Enhanced_v2"
    
    print("=" * 60)
    print("Grodzinski Bakery - GPU Photo Enhancement")
    print("=" * 60)
    print(f"Device: {DEVICE}")
    print(f"Input:  {input_folder}")
    print(f"Output: {output_folder}")
    print(f"Style:  {args.bg_style}")
    print(f"AI BG:  {args.ai_bg}")
    print("=" * 60)
    
    # Initialize enhancer
    enhancer = ProductPhotoEnhancer(
        use_gpu=not args.cpu,
        enable_bg_generation=args.ai_bg,
    )
    
    if input_folder.is_file():
        # Single file mode
        output_path = output_folder / f"{input_folder.stem}.png"
        success = enhancer.process(
            input_folder,
            output_path,
            max_size=args.max_size,
            bg_style=args.bg_style,
            use_ai_background=args.ai_bg,
        )
        print(f"\nResult: {'SUCCESS' if success else 'FAILED'}")
    else:
        # Folder mode
        success, total = enhancer.process_folder(
            input_folder,
            output_folder,
            limit=args.limit,
            max_size=args.max_size,
            bg_style=args.bg_style,
            use_ai_background=args.ai_bg,
        )
        print(f"\n{'=' * 60}")
        print(f"COMPLETE: {success}/{total} photos processed")
        print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
