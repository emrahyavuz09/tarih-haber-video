#!/bin/bash
# Açılışı değiştirilmiş bölümü yeniden render eder, ESKİ final videonun sesini (ses+müzik) aynen kullanır. Kredi harcamaz.
# Kullanım: bash engine/rehook.sh episodes/<klasör> <eski_final.mp4> <yeni_çıktı.mp4>
set -e; EP=$(realpath "$1"); OLD=$(realpath "$2"); OUT="$3"; D=$(dirname "$(realpath "$0")")
node "$D/render.js" "$EP" video
ffmpeg -y -v error -i "$EP/video_noaudio.mp4" -i "$OLD" -map 0:v -map 1:a -c:v libx264 -preset veryfast -crf 24 -tune animation -pix_fmt yuv420p -c:a copy -shortest -movflags +faststart "$OUT"
rm -f "$EP/video_noaudio.mp4"; ls -la "$OUT"
