import argparse
import os
import sys
from pathlib import Path
from datetime import datetime

def generate_image(prompt: str, output_path: str = None, aspect_ratio: str = "1:1", num_images: int = 1, api_key: str = None):
    # 优先使用传入的 key，其次读取环境变量
    key = api_key or os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not key:
        print("[错误] 未检测到 Google API Key！", file=sys.stderr)
        print("请设置环境变量 GEMINI_API_KEY，或运行参数中传入 --api-key <YOUR_KEY>", file=sys.stderr)
        print("获取地址（免费）：https://aistudio.google.com/app/apikey", file=sys.stderr)
        sys.exit(1)

    try:
        from google import genai
        from google.genai import types
        from PIL import Image
        import io
    except ImportError as e:
        print(f"[错误] 依赖缺失: {e}", file=sys.stderr)
        print("请确保已安装 google-genai 与 pillow 库", file=sys.stderr)
        sys.exit(1)

    print(f"[*] 正在调用 Google Imagen 3 生成图片...")
    print(f"[*] 提示词: {prompt}")
    print(f"[*] 画幅比例: {aspect_ratio}")

    client = genai.Client(api_key=key)

    try:
        result = client.models.generate_images(
            model='imagen-3.0-generate-002',
            prompt=prompt,
            config=types.GenerateImagesConfig(
                number_of_images=num_images,
                output_mime_type='image/png',
                aspect_ratio=aspect_ratio,
                person_generation='ALLOW_ADULT',
            )
        )
    except Exception as e:
        print(f"[API 调用失败] {e}", file=sys.stderr)
        sys.exit(1)

    if not result.generated_images:
        print("[警告] 模型未返回任何图像内容。", file=sys.stderr)
        sys.exit(1)

    saved_paths = []
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    for idx, gen_img in enumerate(result.generated_images):
        if output_path:
            out_file = Path(output_path)
            if num_images > 1 and len(result.generated_images) > 1:
                out_file = out_file.parent / f"{out_file.stem}_{idx+1}{out_file.suffix}"
        else:
            out_dir = Path("public/generated") if Path("public").exists() else Path("output/images")
            out_dir.mkdir(parents=True, exist_ok=True)
            out_file = out_dir / f"imagen3_{timestamp}_{idx+1}.png"

        out_file.parent.mkdir(parents=True, exist_ok=True)
        img = Image.open(io.BytesIO(gen_img.image.image_bytes))
        img.save(str(out_file), format="PNG")
        saved_paths.append(str(out_file.resolve()))
        print(f"[成功] 图像已保存至: {out_file.resolve()}")

    return saved_paths

def main():
    parser = argparse.ArgumentParser(description="Google Imagen 3 图像生成工具")
    parser.add_argument("--prompt", "-p", required=True, help="图像提示词 (Prompt)")
    parser.add_argument("--out", "-o", default=None, help="输出文件路径 (例如 output/dog.png)")
    parser.add_argument("--aspect-ratio", "-ar", default="1:1", choices=["1:1", "3:4", "4:3", "9:16", "16:9"], help="画幅比例")
    parser.add_argument("--num", "-n", type=int, default=1, help="生成张数 (1-4)")
    parser.add_argument("--api-key", default=None, help="Google API 密钥 (可选，默认读 GEMINI_API_KEY)")

    args = parser.parse_args()
    generate_image(
        prompt=args.prompt,
        output_path=args.out,
        aspect_ratio=args.aspect_ratio,
        num_images=args.num,
        api_key=args.api_key
    )

if __name__ == "__main__":
    main()
