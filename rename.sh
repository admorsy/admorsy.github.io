find . -type f -name "*.html" ! -name "index.html" | while read -r f; do
  dir=$(dirname "$f")
  base=$(basename "$f" .html)
  newdir="$dir/$base"
  target="$newdir/index.html"

  if [ -e "$target" ]; then
    echo "Skipping (already exists): $target"
    continue
  fi

  mkdir -p "$newdir"
  mv "$f" "$target"
done