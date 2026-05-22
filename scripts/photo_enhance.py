"""
Photo enhancement script for Grodzinski Bakery product photos.
Removes background, outputs transparent PNG with full product visible.
"""

import sys
from pathlib import Path
from PIL import Image, ImageEnhance, ExifTags
import numpy as np

try:
    from rembg import remove
    REMBG_AVAILABLE = True
except ImportError:
    REMBG_AVAILABLE = False
    print("Warning: rembg not installed. Background removal disabled.")

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
    HEIC_SUPPORT = True
except ImportError:
    HEIC_SUPPORT = False
    print("Warning: pillow-heif not installed. HEIC files will be skipped.")


def fix_orientation(img: Image.Image) -> Image.Image:
    """
    Fix image orientation based on EXIF data.
    Handles all 8 EXIF orientation values.
    """
    try:
        # Get EXIF data
        exif = img._getexif()
        if exif is None:
            return img
        
        # Find orientation tag
        orientation_key = None
        for key, val in ExifTags.TAGS.items():
            if val == 'Orientation':
                orientation_key = key
                break
        
        if orientation_key is None or orientation_key not in exif:
            return img
        
        orientation = exif[orientation_key]
        
        # Apply rotation/flip based on orientation value
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


def enhance_photo(
    img: Image.Image,
    saturation: float = 1.15,
    contrast: float = 1.05,
    brightness: float = 1.02,
    sharpness: float = 1.05,
) -> Image.Image:
    """
    Enhance a photo with subtle, natural adjustments.
    Preserves alpha channel if present.
    """
    if img.mode == 'RGBA':
        r, g, b, a = img.split()
        rgb = Image.merge('RGB', (r, g, b))
        
        rgb = ImageEnhance.Color(rgb).enhance(saturation)
        rgb = ImageEnhance.Contrast(rgb).enhance(contrast)
        rgb = ImageEnhance.Brightness(rgb).enhance(brightness)
        rgb = ImageEnhance.Sharpness(rgb).enhance(sharpness)
        
        r, g, b = rgb.split()
        return Image.merge('RGBA', (r, g, b, a))
    else:
        img = img.convert("RGB")
        img = ImageEnhance.Color(img).enhance(saturation)
        img = ImageEnhance.Contrast(img).enhance(contrast)
        img = ImageEnhance.Brightness(img).enhance(brightness)
        img = ImageEnhance.Sharpness(img).enhance(sharpness)
        return img


def remove_background(img: Image.Image) -> Image.Image:
    """
    Remove background from image, returning RGBA with transparent background.
    """
    if not REMBG_AVAILABLE:
        return img.convert("RGBA")
    
    if img.mode not in ('RGB', 'RGBA'):
        img = img.convert('RGB')
    
    result = remove(img)
    return result


def crop_to_content(img: Image.Image, padding_percent: float = 0.08) -> Image.Image:
    """
    Crop image to the non-transparent content with generous padding.
    Uses percentage-based padding to ensure nothing is cut off.
    """
    if img.mode != 'RGBA':
        return img
    
    alpha = np.array(img.split()[3])
    
    # Find non-transparent pixels (threshold of 10 to ignore antialiasing artifacts)
    rows = np.any(alpha > 10, axis=1)
    cols = np.any(alpha > 10, axis=0)
    
    if not np.any(rows) or not np.any(cols):
        return img
    
    # Get bounding box of content
    y_min, y_max = np.where(rows)[0][[0, -1]]
    x_min, x_max = np.where(cols)[0][[0, -1]]
    
    # Calculate content dimensions
    content_width = x_max - x_min
    content_height = y_max - y_min
    
    # Add percentage-based padding (based on content size, not image size)
    pad_x = int(max(content_width, content_height) * padding_percent)
    pad_y = int(max(content_width, content_height) * padding_percent)
    
    # Ensure minimum padding of 20 pixels
    pad_x = max(pad_x, 20)
    pad_y = max(pad_y, 20)
    
    # Apply padding with bounds checking
    width, height = img.size
    x_min = max(0, x_min - pad_x)
    y_min = max(0, y_min - pad_y)
    x_max = min(width, x_max + pad_x)
    y_max = min(height, y_max + pad_y)
    
    return img.crop((x_min, y_min, x_max, y_max))


def make_square_with_padding(img: Image.Image) -> Image.Image:
    """
    Make image square by adding transparent padding.
    Ensures the full product is visible and centered.
    """
    width, height = img.size
    
    # Add extra padding around the content (10% of larger dimension)
    extra_pad = int(max(width, height) * 0.10)
    
    # New size is the larger dimension plus padding
    size = max(width, height) + extra_pad * 2
    
    # Create transparent square
    square = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    
    # Paste image centered
    x = (size - width) // 2
    y = (size - height) // 2
    square.paste(img, (x, y), img if img.mode == 'RGBA' else None)
    
    return square


def process_photo(
    input_path: Path,
    output_path: Path,
    max_size: int = 1200,
    make_square: bool = True,
    **enhance_kwargs
) -> bool:
    """Process a single photo: fix rotation, remove background, enhance, save as PNG."""
    try:
        img = Image.open(input_path)
        
        # Fix orientation FIRST (before any other processing)
        img = fix_orientation(img)
        
        # Convert to RGB for processing
        img = img.convert("RGB")
        
        # Remove background
        img = remove_background(img)
        
        # Crop to content with padding (keeps full product)
        img = crop_to_content(img, padding_percent=0.08)
        
        # Make square with transparent padding
        if make_square:
            img = make_square_with_padding(img)
        
        # Subtle enhancement
        img = enhance_photo(img, **enhance_kwargs)
        
        # Resize if needed (maintain aspect ratio)
        if max(img.size) > max_size:
            img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
        
        # Save as PNG (preserves transparency)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(output_path, "PNG", optimize=True)
        
        return True
        
    except Exception as e:
        print(f"Error: {e}")
        return False


def process_folder(
    input_folder: Path,
    output_folder: Path,
    limit: int = None,
    **kwargs
) -> tuple[int, int]:
    """Process all photos in a folder."""
    supported = {'.jpg', '.jpeg', '.png', '.webp'}
    if HEIC_SUPPORT:
        supported.add('.heic')
    
    files = [f for f in input_folder.iterdir() if f.suffix.lower() in supported]
    
    if limit:
        files = files[:limit]
    
    success = 0
    failed_files = []
    
    for i, input_path in enumerate(files, 1):
        output_path = output_folder / f"{input_path.stem}.png"
        print(f"[{i}/{len(files)}] {input_path.name}...", end=" ", flush=True)
        
        if process_photo(input_path, output_path, **kwargs):
            print("OK", flush=True)
            success += 1
        else:
            print("FAIL", flush=True)
            failed_files.append(input_path.name)
    
    if failed_files:
        print(f"\nFailed files: {failed_files}")
    
    return success, len(files)


if __name__ == "__main__":
    base_path = Path(__file__).parent.parent
    raw_base = base_path / "public/images/Photos/Raw/Grodzinski Photos"
    output_folder = base_path / "public/images/Photos/Enhanced"
    
    # Process Good and Hero folders
    folders_to_process = ["Good", "Hero"]
    
    limit = None
    if len(sys.argv) > 1:
        try:
            limit = int(sys.argv[1])
            print(f"Limiting to {limit} photos per folder...")
        except:
            pass
    
    print(f"Output: {output_folder}")
    print(f"Background removal: {'enabled' if REMBG_AVAILABLE else 'disabled'}")
    print(f"HEIC support: {'enabled' if HEIC_SUPPORT else 'disabled'}")
    print()
    
    total_success = 0
    total_count = 0
    
    for folder_name in folders_to_process:
        input_folder = raw_base / folder_name
        if not input_folder.exists():
            print(f"Folder not found: {input_folder}")
            continue
            
        print(f"=== Processing {folder_name} ===")
        success, total = process_folder(
            input_folder,
            output_folder,
            limit=limit,
            saturation=1.15,
            contrast=1.05,
            brightness=1.02,
            sharpness=1.05,
            max_size=1200,
            make_square=True,
        )
        total_success += success
        total_count += total
        print()
    
    print(f"=== COMPLETE: {total_success}/{total_count} photos processed ===")
