"""
Professional Studio-Quality Photo Enhancement with Relighting
For Grodzinski Bakery product photos.

This script achieves the professional look with:
1. High-quality background removal (rembg with u2net or isnet)
2. Professional studio relighting (simulated IC-Light effect)
3. Realistic soft shadows and highlights
4. Generated bakery-style background (flour dust, marble, etc.)

Designed for RTX 3080 (10GB VRAM)

Usage:
    python photo_studio_relight.py --input image.jpg --output result.png
    python photo_studio_relight.py --input-folder ./photos --output-folder ./enhanced
"""

import os
import sys
from pathlib import Path
from typing import Optional, Tuple, Literal
import argparse
import math

os.environ.setdefault("CUDA_VISIBLE_DEVICES", "0")

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw, ExifTags
import torch

# Check GPU
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {DEVICE}")
if DEVICE == "cuda":
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    vram_gb = torch.cuda.get_device_properties(0).total_memory / 1024**3
    print(f"VRAM: {vram_gb:.1f} GB")

try:
    from rembg import remove, new_session
    REMBG_OK = True
except ImportError:
    REMBG_OK = False
    print("Install rembg: pip install rembg[gpu]")

try:
    import cv2
    CV2_OK = True
except ImportError:
    CV2_OK = False
    print("Install opencv: pip install opencv-python")


class StudioPhotoEnhancer:
    """
    Creates professional bakery product photos with:
    - Clean background removal
    - Studio-quality lighting simulation
    - Soft natural shadows
    - Contextual backgrounds (flour, marble, gradient)
    """
    
    def __init__(self, model: str = "u2net"):
        self.session = new_session(model) if REMBG_OK else None
        
    def fix_orientation(self, img: Image.Image) -> Image.Image:
        """Fix EXIF orientation."""
        try:
            exif = img._getexif()
            if not exif:
                return img
            
            for key, val in ExifTags.TAGS.items():
                if val == 'Orientation':
                    orientation = exif.get(key)
                    if orientation == 3:
                        return img.rotate(180, expand=True)
                    elif orientation == 6:
                        return img.rotate(270, expand=True)
                    elif orientation == 8:
                        return img.rotate(90, expand=True)
                    break
        except:
            pass
        return img
    
    def remove_bg(self, img: Image.Image) -> Image.Image:
        """Remove background with GPU acceleration."""
        if not REMBG_OK:
            return img.convert('RGBA')
        
        return remove(img.convert('RGB'), session=self.session)
    
    def get_bbox(self, img: Image.Image) -> Tuple[int, int, int, int]:
        """Get bounding box of non-transparent content."""
        if img.mode != 'RGBA':
            return (0, 0, img.size[0], img.size[1])
        
        alpha = np.array(img.split()[3])
        rows = np.any(alpha > 10, axis=1)
        cols = np.any(alpha > 10, axis=0)
        
        if not np.any(rows) or not np.any(cols):
            return (0, 0, img.size[0], img.size[1])
        
        y_min, y_max = np.where(rows)[0][[0, -1]]
        x_min, x_max = np.where(cols)[0][[0, -1]]
        
        return (x_min, y_min, x_max + 1, y_max + 1)
    
    def create_flour_texture(self, size: Tuple[int, int], intensity: float = 0.3) -> Image.Image:
        """Create realistic flour dust texture."""
        w, h = size
        
        # Base warm white
        base = np.full((h, w, 3), [252, 249, 245], dtype=np.float32)
        
        # Multiple noise layers for natural look
        # Fine grain
        fine = np.random.normal(0, 3, (h, w, 3))
        # Medium clusters
        medium = np.random.normal(0, 8, (h // 4, w // 4, 3))
        medium = np.array(Image.fromarray(medium.astype(np.uint8)).resize((w, h), Image.BILINEAR))
        # Large soft variations
        large = np.random.normal(0, 5, (h // 16, w // 16, 3))
        large = np.array(Image.fromarray(large.clip(0, 255).astype(np.uint8)).resize((w, h), Image.BILINEAR))
        
        # Flour spots (white patches)
        spots = np.zeros((h, w, 3), dtype=np.float32)
        num_spots = int(w * h / 5000)
        for _ in range(num_spots):
            x, y = np.random.randint(0, w), np.random.randint(0, h)
            r = np.random.randint(5, 30)
            brightness = np.random.randint(10, 40)
            
            y1, y2 = max(0, y - r), min(h, y + r)
            x1, x2 = max(0, x - r), min(w, x + r)
            
            for dy in range(y1, y2):
                for dx in range(x1, x2):
                    dist = math.sqrt((dx - x) ** 2 + (dy - y) ** 2)
                    if dist < r:
                        falloff = 1 - (dist / r) ** 2
                        spots[dy, dx] += brightness * falloff
        
        # Combine
        result = base + fine * 0.5 + medium.astype(np.float32) * 0.3 + large.astype(np.float32) * 0.2
        result += spots * intensity
        
        # Subtle gradient (darker at bottom for depth)
        gradient = np.linspace(1.0, 0.95, h).reshape(-1, 1, 1)
        result *= gradient
        
        result = np.clip(result, 0, 255).astype(np.uint8)
        return Image.fromarray(result)
    
    def create_surface_shadow(
        self,
        product_mask: Image.Image,
        size: Tuple[int, int],
        shadow_intensity: float = 0.12,
        shadow_blur: int = 25,
        shadow_offset: Tuple[int, int] = (0, 15),
    ) -> Image.Image:
        """Create realistic contact shadow beneath product."""
        w, h = size
        
        # Get alpha as shadow base
        if product_mask.mode == 'RGBA':
            alpha = product_mask.split()[3]
        else:
            alpha = product_mask.convert('L')
        
        # Resize to match output
        alpha = alpha.resize((w, h), Image.LANCZOS)
        
        # Compress vertically (shadow is flattened)
        shadow_h = int(h * 0.3)
        compressed = alpha.resize((w, shadow_h), Image.LANCZOS)
        
        # Place at bottom with offset
        shadow = Image.new('L', (w, h), 0)
        paste_y = h - shadow_h - shadow_offset[1]
        shadow.paste(compressed, (shadow_offset[0], paste_y))
        
        # Blur for soft shadow
        shadow = shadow.filter(ImageFilter.GaussianBlur(shadow_blur))
        
        # Adjust intensity
        shadow_arr = np.array(shadow).astype(np.float32) / 255.0
        shadow_arr = (shadow_arr * shadow_intensity * 255).astype(np.uint8)
        
        # Create RGBA shadow layer (black with alpha)
        shadow_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        shadow_rgba = Image.merge('RGBA', (
            Image.new('L', (w, h), 20),  # R
            Image.new('L', (w, h), 18),  # G  
            Image.new('L', (w, h), 15),  # B (slightly warm shadow)
            Image.fromarray(shadow_arr),  # A
        ))
        
        return shadow_rgba
    
    def apply_studio_lighting(
        self,
        img: Image.Image,
        light_direction: str = "top-left",
        highlight_strength: float = 0.15,
        shadow_depth: float = 0.08,
    ) -> Image.Image:
        """
        Simulate studio lighting on the product.
        Adds subtle highlights and depth.
        """
        if img.mode != 'RGBA':
            return img
        
        r, g, b, a = img.split()
        rgb = Image.merge('RGB', (r, g, b))
        rgb_arr = np.array(rgb).astype(np.float32)
        alpha_arr = np.array(a).astype(np.float32) / 255.0
        
        h, w = rgb_arr.shape[:2]
        
        # Create lighting gradient based on direction
        if light_direction == "top-left":
            x_grad = np.linspace(1, 0, w).reshape(1, -1)
            y_grad = np.linspace(1, 0, h).reshape(-1, 1)
        elif light_direction == "top-right":
            x_grad = np.linspace(0, 1, w).reshape(1, -1)
            y_grad = np.linspace(1, 0, h).reshape(-1, 1)
        elif light_direction == "top":
            x_grad = np.ones((1, w))
            y_grad = np.linspace(1, 0, h).reshape(-1, 1)
        else:
            x_grad = np.linspace(1, 0, w).reshape(1, -1)
            y_grad = np.linspace(1, 0, h).reshape(-1, 1)
        
        light_map = (x_grad * 0.3 + y_grad * 0.7)
        light_map = light_map.reshape(h, w, 1)
        
        # Apply only where product exists
        mask = alpha_arr.reshape(h, w, 1)
        
        # Highlights (where light hits)
        highlight = light_map * mask * highlight_strength
        rgb_arr = rgb_arr + highlight * 40  # Add brightness
        
        # Shadows (opposite side)
        shadow = (1 - light_map) * mask * shadow_depth
        rgb_arr = rgb_arr * (1 - shadow * 0.3)
        
        # Subtle warmth in highlights
        rgb_arr[:, :, 0] += highlight[:, :, 0] * 8  # Red
        rgb_arr[:, :, 1] += highlight[:, :, 0] * 4  # Green
        
        rgb_arr = np.clip(rgb_arr, 0, 255).astype(np.uint8)
        rgb = Image.fromarray(rgb_arr)
        
        r, g, b = rgb.split()
        return Image.merge('RGBA', (r, g, b, a))
    
    def enhance_product(
        self,
        img: Image.Image,
        saturation: float = 1.15,
        contrast: float = 1.08,
        sharpness: float = 1.12,
        warmth: float = 1.02,
    ) -> Image.Image:
        """Enhance product colors and details."""
        if img.mode == 'RGBA':
            r, g, b, a = img.split()
            rgb = Image.merge('RGB', (r, g, b))
        else:
            rgb = img.convert('RGB')
            a = None
        
        rgb = ImageEnhance.Color(rgb).enhance(saturation)
        rgb = ImageEnhance.Contrast(rgb).enhance(contrast)
        rgb = ImageEnhance.Sharpness(rgb).enhance(sharpness)
        
        # Warmth adjustment
        if warmth != 1.0:
            arr = np.array(rgb).astype(np.float32)
            arr[:, :, 0] *= warmth
            arr[:, :, 1] *= (1 + (warmth - 1) * 0.5)
            arr = np.clip(arr, 0, 255).astype(np.uint8)
            rgb = Image.fromarray(arr)
        
        if a:
            r, g, b = rgb.split()
            return Image.merge('RGBA', (r, g, b, a))
        return rgb
    
    def process(
        self,
        input_path: Path,
        output_path: Path,
        output_size: int = 1200,
        bg_style: Literal["flour", "gradient", "plain"] = "flour",
        add_shadow: bool = True,
        apply_lighting: bool = True,
    ) -> bool:
        """
        Full processing pipeline:
        1. Load and fix orientation
        2. Remove background
        3. Create styled background
        4. Add realistic shadow
        5. Apply studio lighting
        6. Enhance colors
        7. Save result
        """
        try:
            print(f"  Loading: {input_path.name}")
            img = Image.open(input_path)
            img = self.fix_orientation(img)
            original_size = img.size
            
            # Remove background
            print("  Removing background...")
            product = self.remove_bg(img)
            
            # Get content bounds and crop
            bbox = self.get_bbox(product)
            product = product.crop(bbox)
            
            # Calculate output size (square with padding)
            content_size = max(product.size)
            padding = int(content_size * 0.25)  # 25% padding
            canvas_size = content_size + padding * 2
            
            # Scale to output size
            scale = output_size / canvas_size
            new_product_size = (int(product.size[0] * scale), int(product.size[1] * scale))
            product = product.resize(new_product_size, Image.LANCZOS)
            
            # Create background
            print(f"  Creating {bg_style} background...")
            if bg_style == "flour":
                bg = self.create_flour_texture((output_size, output_size))
            elif bg_style == "gradient":
                bg = self.create_gradient_bg((output_size, output_size))
            else:
                bg = Image.new('RGB', (output_size, output_size), (252, 249, 245))
            
            # Position product (centered, slightly above center)
            pos_x = (output_size - product.size[0]) // 2
            pos_y = int((output_size - product.size[1]) * 0.45)  # 45% from top
            
            # Create shadow
            if add_shadow:
                print("  Adding shadow...")
                shadow = self.create_surface_shadow(
                    product,
                    (output_size, output_size),
                    shadow_intensity=0.15,
                    shadow_blur=30,
                    shadow_offset=(pos_x, output_size - pos_y - product.size[1] - 20),
                )
                bg = bg.convert('RGBA')
                bg = Image.alpha_composite(bg, shadow)
            
            # Apply studio lighting to product
            if apply_lighting:
                print("  Applying studio lighting...")
                product = self.apply_studio_lighting(product)
            
            # Enhance product
            print("  Enhancing colors...")
            product = self.enhance_product(product)
            
            # Composite
            bg = bg.convert('RGBA')
            canvas = bg.copy()
            canvas.paste(product, (pos_x, pos_y), product)
            
            # Final adjustments
            canvas = ImageEnhance.Contrast(canvas).enhance(1.02)
            
            # Save
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Save as JPEG for smaller files (no transparency needed)
            final = canvas.convert('RGB')
            if output_path.suffix.lower() in ['.jpg', '.jpeg']:
                final.save(output_path, 'JPEG', quality=92, optimize=True)
            else:
                final.save(output_path, 'PNG', optimize=True)
            
            print(f"  Saved: {output_path}")
            return True
            
        except Exception as e:
            print(f"  ERROR: {e}")
            import traceback
            traceback.print_exc()
            return False
    
    def create_gradient_bg(self, size: Tuple[int, int]) -> Image.Image:
        """Create soft gradient background."""
        w, h = size
        
        # Warm white to slightly darker
        top_color = np.array([252, 250, 248])
        bottom_color = np.array([245, 240, 235])
        
        gradient = np.zeros((h, w, 3), dtype=np.uint8)
        for y in range(h):
            t = y / h
            color = top_color * (1 - t) + bottom_color * t
            gradient[y, :] = color.astype(np.uint8)
        
        # Add subtle noise
        noise = np.random.normal(0, 2, (h, w, 3))
        gradient = np.clip(gradient.astype(np.float32) + noise, 0, 255).astype(np.uint8)
        
        return Image.fromarray(gradient)
    
    def batch_process(
        self,
        input_folder: Path,
        output_folder: Path,
        limit: Optional[int] = None,
        **kwargs
    ) -> Tuple[int, int]:
        """Process all images in folder."""
        extensions = {'.jpg', '.jpeg', '.png', '.webp', '.heic'}
        files = sorted([f for f in input_folder.iterdir() if f.suffix.lower() in extensions])
        
        if limit:
            files = files[:limit]
        
        success = 0
        for i, f in enumerate(files, 1):
            print(f"\n[{i}/{len(files)}] {f.name}")
            out_path = output_folder / f"{f.stem}.jpg"
            if self.process(f, out_path, **kwargs):
                success += 1
        
        return success, len(files)


def main():
    parser = argparse.ArgumentParser(
        description="Professional bakery photo enhancement with studio lighting"
    )
    parser.add_argument("--input", "-i", type=Path, help="Input image or folder")
    parser.add_argument("--output", "-o", type=Path, help="Output path or folder")
    parser.add_argument("--size", type=int, default=1200, help="Output size (default: 1200)")
    parser.add_argument("--style", choices=["flour", "gradient", "plain"], default="flour",
                        help="Background style (default: flour)")
    parser.add_argument("--no-shadow", action="store_true", help="Disable shadow")
    parser.add_argument("--no-lighting", action="store_true", help="Disable studio lighting")
    parser.add_argument("--limit", "-n", type=int, help="Limit number of images")
    
    args = parser.parse_args()
    
    # Default paths
    base = Path(__file__).parent.parent
    input_path = args.input or base / "public/images/Photos/Raw/Grodzinski Photos/Good"
    output_path = args.output or base / "public/images/Photos/Studio"
    
    print("=" * 60)
    print("GRODZINSKI BAKERY - Studio Photo Enhancement")
    print("=" * 60)
    print(f"Input:  {input_path}")
    print(f"Output: {output_path}")
    print(f"Style:  {args.style}")
    print(f"Size:   {args.size}px")
    print("=" * 60)
    
    enhancer = StudioPhotoEnhancer()
    
    if input_path.is_file():
        out = output_path if output_path.suffix else output_path / f"{input_path.stem}.jpg"
        success = enhancer.process(
            input_path, out,
            output_size=args.size,
            bg_style=args.style,
            add_shadow=not args.no_shadow,
            apply_lighting=not args.no_lighting,
        )
        print(f"\nResult: {'SUCCESS' if success else 'FAILED'}")
    else:
        success, total = enhancer.batch_process(
            input_path, output_path,
            limit=args.limit,
            output_size=args.size,
            bg_style=args.style,
            add_shadow=not args.no_shadow,
            apply_lighting=not args.no_lighting,
        )
        print(f"\n{'=' * 60}")
        print(f"COMPLETE: {success}/{total} processed")


if __name__ == "__main__":
    main()
