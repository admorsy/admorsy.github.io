#!/bin/bash

INPUT_DIR="img"
OUTPUT_DIR="img_optimized"

mkdir -p "$OUTPUT_DIR"

find "$INPUT_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read file; do

  # Remove "img/" from path
  relative_path="${file#$INPUT_DIR/}"

  # Extract folder + filename separately
  dir_name="$(dirname "$relative_path")"
  file_name="$(basename "$relative_path")"
  name="${file_name%.*}"

  output_dir="$OUTPUT_DIR/$dir_name"
  mkdir -p "$output_dir"

  # Detect transparency
  has_alpha=$(magick "$file" -format "%[channels]" info: | grep -i "a")

  # Count colors
  colors=$(magick "$file" -format "%k" info:)

  # Decide format
  if [[ ! -z "$has_alpha" ]]; then
    format="png"
  elif [[ $colors -lt 256 ]]; then
    format="png"
  else
    format="jpg"
  fi

  sizes=(500 1200 1600)

  for size in "${sizes[@]}"; do

    main_output="$output_dir/${name}-${size}.${format}"
    webp_output="$output_dir/${name}-${size}.webp"

    if [[ "$format" == "jpg" ]]; then
      magick "$file" -resize ${size}x\> -strip -quality 80 "$main_output"
    else
      magick "$file" -resize ${size}x\> -strip "$main_output"
    fi

    magick "$file" -resize ${size}x\> -strip -quality 80 "$webp_output"

  done

  echo "Processed: $relative_path"
done

echo "✅ Fixed and working!"