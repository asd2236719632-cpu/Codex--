# -*- coding: utf-8 -*-
import os
import sys
import subprocess
import glob
import time
from PIL import Image, ImageFilter

base_dir = os.path.abspath('C:/Users/22367/Desktop/pet')
realesrgan_dir = os.path.join(base_dir, 'tools', 'realesrgan')
realesrgan_exe = os.path.join(realesrgan_dir, 'realesrgan-ncnn-vulkan.exe')
temp_dir = os.path.join(base_dir, 'assets', 'images', 'temp_sr')
os.makedirs(temp_dir, exist_ok=True)

targets = [
    ('area1-reception.jpg', '前台接待区'),
    ('area2-spa.jpg', '微气泡水疗SPA房'),
    ('area3-cat-suite.jpg', '猫咪专属套房'),
    ('area4-styling-studio.jpg', '精修造型美发室'),
    ('area5-vip-lounge.jpg', 'VIP家长茶饮监控吧'),
]

report = []

for filename, desc in targets:
    src_path = os.path.join(base_dir, 'assets', 'images', filename)
    orig_size = os.path.getsize(src_path)
    with Image.open(src_path) as img:
        orig_res = img.size
    
    print('=== 开始处理 [{}] {} (原始分辨率: {}x{}) ==='.format(desc, filename, orig_res[0], orig_res[1]))
    t0 = time.time()
    
    prefix = os.path.splitext(filename)[0]
    pass1_png = os.path.join(temp_dir, '{}_p1.png'.format(prefix))
    pass2_png = os.path.join(temp_dir, '{}_p2.png'.format(prefix))
    final_temp_jpg = os.path.join(temp_dir, '{}_4k.jpg'.format(prefix))
    
    # Pass 1: 4x upscale (199x112 -> 796x448)
    cmd1 = [realesrgan_exe, '-i', src_path, '-o', pass1_png, '-n', 'realesrgan-x4plus', '-s', '4']
    ret1 = subprocess.run(cmd1, cwd=realesrgan_dir, capture_output=True, text=True)
    if ret1.returncode != 0:
        print('Pass 1 failed: {}'.format(ret1.stderr))
        sys.exit(1)
        
    # Pass 2: 4x upscale (796x448 -> 3184x1792)
    cmd2 = [realesrgan_exe, '-i', pass1_png, '-o', pass2_png, '-n', 'realesrgan-x4plus', '-s', '4']
    ret2 = subprocess.run(cmd2, cwd=realesrgan_dir, capture_output=True, text=True)
    if ret2.returncode != 0:
        print('Pass 2 failed: {}'.format(ret2.stderr))
        sys.exit(1)
        
    # Resize to exact 4K (3840 x 2160) + UnsharpMask + Save quality=96, subsampling=0
    with Image.open(pass2_png) as img:
        img_4k = img.resize((3840, 2160), Image.Resampling.LANCZOS)
        img_4k = img_4k.filter(ImageFilter.UnsharpMask(radius=1.2, percent=120, threshold=3))
        img_4k.save(final_temp_jpg, 'JPEG', quality=96, subsampling=0)
        
    # Replace original
    if os.path.exists(src_path):
        os.remove(src_path)
    os.rename(final_temp_jpg, src_path)
    
    new_size = os.path.getsize(src_path)
    with Image.open(src_path) as img:
        new_res = img.size
        
    elapsed = time.time() - t0
    print('完成: 4K已输出 ({}x{}), 耗时 {:.2f}s, 大小 {:.2f} MB'.format(new_res[0], new_res[1], elapsed, new_size/1024/1024))
    
    report.append({
        'filename': filename,
        'desc': desc,
        'orig_res': '{}x{}'.format(orig_res[0], orig_res[1]),
        'orig_size_kb': round(orig_size / 1024, 1),
        'new_res': '{}x{}'.format(new_res[0], new_res[1]),
        'new_size_mb': round(new_size / (1024 * 1024), 2),
        'elapsed_sec': round(elapsed, 1),
        'status': '成功' if new_res == (3840, 2160) else '异常'
    })

# Cleanup temp files
for f in glob.glob(os.path.join(temp_dir, '*')):
    try:
        os.remove(f)
    except Exception:
        pass
try:
    os.rmdir(temp_dir)
except Exception:
    pass

print('=' * 70)
print('超分与4K画质重建全部完成！汇总报告：')
for r in report:
    print('{} ({}): {} ({} KB) -> {} ({} MB) [{}]'.format(
        r['desc'], r['filename'], r['orig_res'], r['orig_size_kb'], r['new_res'], r['new_size_mb'], r['status']
    ))
