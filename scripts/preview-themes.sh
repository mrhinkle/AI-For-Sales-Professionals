#!/bin/bash
# Render the sample audience in every skin and produce one contact sheet per skin in deck/previews/.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
for skin in "$@"; do
  node deck/build.mjs _sample --theme "$skin" --out "deck/previews/$skin.html" >/dev/null
  prof=$(mktemp -d)
  "$CHROME" --headless=new --disable-gpu --no-first-run --user-data-dir="$prof" --no-pdf-header-footer --virtual-time-budget=4000 --print-to-pdf="deck/previews/$skin.pdf" "file://$PWD/deck/previews/$skin.html" 2>/dev/null
  rm -rf "$prof"
  rm -f deck/previews/$skin-*.png
  pdftoppm -png -r 50 "deck/previews/$skin.pdf" "deck/previews/$skin"
  python3 - "$skin" <<'PY'
import glob,sys,math
from PIL import Image
skin=sys.argv[1]; fs=sorted(glob.glob(f'deck/previews/{skin}-*.png')); ims=[Image.open(f) for f in fs]
w,h=ims[0].size; cols=4; rows=math.ceil(len(ims)/cols)
S=Image.new('RGB',(cols*w+(cols+1)*10, rows*h+(rows+1)*10),(40,40,40))
for i,im in enumerate(ims): S.paste(im,(10+(i%cols)*(w+10), 10+(i//cols)*(h+10)))
S.save(f'deck/previews/{skin}-sheet.png'); print(skin, len(ims), 'slides')
PY
  rm -f deck/previews/$skin-[0-9]*.png
done
