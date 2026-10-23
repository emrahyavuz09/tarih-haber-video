#!/bin/bash
# Tek komutla video: bash engine/build.sh episodes/<klasör>   (klasörde voice.mp3, words.json, scenes.js olmalı)
set -e; EP=$(realpath "$1"); D=$(dirname "$(realpath "$0")")
node "$D/render.js" "$EP" video
python3 "$D/music.py" "$EP"
ffmpeg -y -v error -i "$EP/video_noaudio.mp4" -i "$EP/voice.mp3" -i "$EP/music.wav" -filter_complex \
 "[2:a]volume=0.16[m];[1:a][m]amix=inputs=2:duration=longest:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]" \
 -map 0:v -map "[a]" -c:v libx264 -preset veryfast -crf 24 -tune animation -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart "$EP/final.mp4"
rm -f "$EP/video_noaudio.mp4"
ls -la "$EP/final.mp4"
