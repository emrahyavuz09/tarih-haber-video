# Seslendirmeyi hızlı ve akıcı yapar: kelimeler arası uzun boşlukları kısaltır, baştaki/sondaki sessizliği atar,
# sesi perdeyi bozmadan biraz hızlandırır ve words.json zamanlarını buna göre günceller.
# Kullanım: python3 engine/tighten.py episodes/<klasör> [hız=1.08]
# Girdi: voice.mp3 + words.json (ElevenLabs döküm). Orijinaller voice_raw.mp3 / words_raw.json olarak saklanır.
import json, sys, os, subprocess, shutil
import numpy as np

ep = sys.argv[1]; SPEED = float(sys.argv[2]) if len(sys.argv) > 2 else 1.08
SR = 44100
CAP_WORD = 0.05   # cümle içi kelime arası en fazla
CAP_COMMA = 0.12  # virgül / iki nokta sonrası
CAP_STOP = 0.20   # nokta, ünlem, soru, üç nokta sonrası
XF = int(0.008 * SR)  # tıklama önleyici geçiş

raw_mp3, raw_json = f'{ep}/voice_raw.mp3', f'{ep}/words_raw.json'
if not os.path.exists(raw_mp3): shutil.copy(f'{ep}/voice.mp3', raw_mp3)
if not os.path.exists(raw_json): shutil.copy(f'{ep}/words.json', raw_json)

pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', raw_mp3, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
a = np.frombuffer(pcm, dtype=np.float32).copy()
words = [w for w in json.load(open(raw_json))['words'] if w.get('type', 'word') == 'word']

# tutulacak aralıklar: [başlangıç, bitiş] (saniye)
keep = []
cur_s = max(0.0, words[0]['start'] - 0.04)
for i in range(len(words) - 1):
    w, nx = words[i], words[i + 1]
    gap = nx['start'] - w['end']
    t = w['text'].rstrip('"”\'')
    cap = CAP_STOP if t.endswith(('.', '!', '?', '…', '...')) else CAP_COMMA if t.endswith((',', ':', ';')) else CAP_WORD
    if gap > cap:
        cut_a = w['end'] + cap / 2; cut_b = nx['start'] - cap / 2
        keep.append([cur_s, cut_a]); cur_s = cut_b
keep.append([cur_s, min(len(a) / SR, words[-1]['end'] + 0.12)])

# birleştir + zaman eşleme
out = []; mapping = []; pos = 0.0
for s, e in keep:
    seg = a[int(s * SR):int(e * SR)].copy()
    if len(seg) > 2 * XF:
        seg[:XF] *= np.linspace(0, 1, XF); seg[-XF:] *= np.linspace(1, 0, XF)
    mapping.append((s, e, pos)); out.append(seg); pos += len(seg) / SR
y = np.concatenate(out)

def remap(t):
    for s, e, p in mapping:
        if t <= e: return p + max(0.0, t - s)
    s, e, p = mapping[-1]; return p + (e - s)

tmp = f'{ep}/_tight.f32'
y.astype(np.float32).tofile(tmp)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', tmp,
                '-af', f'atempo={SPEED}', '-c:a', 'libmp3lame', '-b:a', '192k', f'{ep}/voice.mp3'], check=True)
os.remove(tmp)

new = []
for w in words:
    new.append({**w, 'start': round(remap(w['start']) / SPEED, 3), 'end': round(remap(w['end']) / SPEED, 3)})
json.dump({'words': new}, open(f'{ep}/words.json', 'w'), ensure_ascii=False, indent=1)
old_d = words[-1]['end']; new_d = new[-1]['end']
print(f'süre: {old_d:.1f} sn -> {new_d:.1f} sn  ({100 * (1 - new_d / old_d):.0f}% daha kısa), hız x{SPEED}')
