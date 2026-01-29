#!/usr/bin/env bash
# Convert webm to gif using ffmpeg with a palette pass for better quality.
# Usage: ./scripts/convert-webm-to-gif.sh input.webm output.gif

set -e
if [ $# -lt 2 ]; then
  echo "Usage: $0 input.webm output.gif"
  exit 1
fi
in=$1
out=$2
palette=/tmp/palette.png
ffmpeg -y -i "$in" -vf "fps=15,scale=960:-1:flags=lanczos,palettegen" -y "$palette"
ffmpeg -y -i "$in" -i "$palette" -filter_complex "fps=15,scale=960:-1:flags=lanczos[x];[x][1:v]paletteuse" -y "$out"

echo "Created GIF: $out"
