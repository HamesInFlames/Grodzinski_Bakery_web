# Setup script for GPU-accelerated photo enhancement
# Run this in PowerShell to set up the environment

Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "Grodzinski Bakery - GPU Photo Enhancement Setup" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan

# Check Python
Write-Host "`nChecking Python..." -ForegroundColor Yellow
python --version

# Check CUDA
Write-Host "`nChecking CUDA availability..." -ForegroundColor Yellow
python -c "import torch; print(f'PyTorch: {torch.__version__}'); print(f'CUDA available: {torch.cuda.is_available()}'); print(f'GPU: {torch.cuda.get_device_name(0) if torch.cuda.is_available() else \"N/A\"}')"

Write-Host "`n" -ForegroundColor Yellow
Write-Host "To set up the environment, run these commands:" -ForegroundColor Green
Write-Host ""
Write-Host "# 1. Create virtual environment (optional but recommended)" -ForegroundColor White
Write-Host "python -m venv venv" -ForegroundColor Gray
Write-Host ".\venv\Scripts\Activate" -ForegroundColor Gray
Write-Host ""
Write-Host "# 2. Install PyTorch with CUDA 12.1 support" -ForegroundColor White
Write-Host "pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121" -ForegroundColor Gray
Write-Host ""
Write-Host "# 3. Install rembg with GPU support" -ForegroundColor White
Write-Host "pip install rembg[gpu]" -ForegroundColor Gray
Write-Host ""
Write-Host "# 4. Install other dependencies" -ForegroundColor White
Write-Host "pip install pillow numpy opencv-python pillow-heif" -ForegroundColor Gray
Write-Host ""
Write-Host "# 5. (Optional) For AI background generation" -ForegroundColor White
Write-Host "pip install diffusers transformers accelerate" -ForegroundColor Gray
Write-Host ""
Write-Host "# 6. Run the enhancement script" -ForegroundColor White
Write-Host "python scripts/photo_enhance_gpu.py --help" -ForegroundColor Gray
Write-Host ""
Write-Host "Example usage:" -ForegroundColor Green
Write-Host "  # Process all photos with gradient background" -ForegroundColor Gray
Write-Host "  python scripts/photo_enhance_gpu.py --bg-style gradient" -ForegroundColor Gray
Write-Host ""
Write-Host "  # Process with flour-dusted background (like your example)" -ForegroundColor Gray
Write-Host "  python scripts/photo_enhance_gpu.py --bg-style flour" -ForegroundColor Gray
Write-Host ""
Write-Host "  # Process first 5 photos as test" -ForegroundColor Gray
Write-Host "  python scripts/photo_enhance_gpu.py --limit 5" -ForegroundColor Gray
Write-Host ""
Write-Host "  # Use AI to generate backgrounds (requires more VRAM)" -ForegroundColor Gray
Write-Host "  python scripts/photo_enhance_gpu.py --ai-bg" -ForegroundColor Gray
