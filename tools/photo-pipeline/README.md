# Photo pipeline (one-off)

Background-removal, HEIC conversion, smart-crop and studio-relight
scripts used to prepare the original Grodzinski product photoshoot.

These ran on James's RTX 3080 workstation (CUDA + rembg + Pillow +
OpenCV + diffusers). The output already landed in `_photos-source/`
(out of `public/`, gitignored), so these scripts are kept here only
for reproducibility if the bakery commissions another shoot.

- `setup_gpu_env.ps1` — PyTorch / rembg-gpu / OpenCV / diffusers env
- `photo_enhance.py` — CPU pipeline (bg removal, HEIC, EXIF, crop, enhance)
- `photo_enhance_gpu.py` — CUDA-accelerated variant
- `photo_studio_relight.py` — studio relight effects (flour, gradient, plain)

Not invoked by any `npm` script; not required to build or run the site.
