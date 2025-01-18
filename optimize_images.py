import os
from PIL import Image

def optimize_image(input_path, output_path, quality=80):
    """
    Optimize an image and save it to the output path.
    
    Args:
        input_path (str): Path to the input image.
        output_path (str): Path to save the optimized image.
        quality (int): Quality level for optimization (1-100).
    """
    try:
        # Open the image
        with Image.open(input_path) as img:
            # Convert to RGB mode (if not already) for compatibility
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            # Save the image with optimization
            img.save(output_path, optimize=True, quality=quality)
            print(f"Optimized: {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error optimizing {input_path}: {e}")

def optimize_images_in_folder(folder_path, output_folder, quality=80):
    """
    Optimize all images in a folder recursively.
    
    Args:
        folder_path (str): Path to the input folder.
        output_folder (str): Path to the output folder for optimized images.
        quality (int): Quality level for optimization (1-100).
    """
    supported_formats = (".jpg", ".jpeg", ".png", ".webp")
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith(supported_formats):
                input_path = os.path.join(root, file)
                # Maintain folder structure in the output directory
                relative_path = os.path.relpath(root, folder_path)
                output_dir = os.path.join(output_folder, relative_path)
                os.makedirs(output_dir, exist_ok=True)
                
                output_path = os.path.join(output_dir, file)
                optimize_image(input_path, output_path, quality)

if __name__ == "__main__":
    # Paths for input folder and output folder
    input_folder = "./src/images/sharepics"  # Replace with your input folder
    output_folder = "./public/images/sharepics"  # Replace with your output folder
    image_quality = 80  # Adjust quality level (lower means more compression)
    
    optimize_images_in_folder(input_folder, output_folder, quality=image_quality)
