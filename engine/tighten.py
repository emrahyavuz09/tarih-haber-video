# Seslendirmeyi doğal ama hızlı yapar. KONUŞMAYA DOKUNMAZ: yalnızca sesin kendisinde ölçülen gerçek sessizlikleri kısaltır
# (kelime zamanlarına göre kesmez, bu yüzden kelime yutmaz), ardından sesi çok hafif hızlandırır ve words.json zamanlarını günceller.
# Kullanım: python3 engine/tighten.py episodes/<klasör> [hız=1.04]
# Girdi: voice.mp3 + words.json. Orijinaller voice_raw.mp3 / words_raw.json olarak saklanır (tekrar çalıştırmak güvenlidir).
import json, sys, os, subprocess, shutil
import numpy as np

ep = sys.argv[1]; SPEED = float(sys.argv[2]) if len(sys.argv) > 2 else 1.04
SR = 44100; FR = int(0.01 * SR)          # 10 ms çerçeve
MIN_SIL = 0.16    # bundan kısa sessizliklere dokunma (doğal kelime arası)
KEEP_SIL = 0.13   # uzun sessizlik bu kadara indirilir (nefes payı)
PAD = 0.05        # konuşmanın önünde/arkasında her zaman korunan pay
XF = int(0.012 * SR)

raw_mp3, raw_json = f'{ep}/voice_raw.mp3', f'{ep}/words_raw.json'
if not os.path.exists(raw_mp3): shutil.copy(f'{ep}/voice.mp3', raw_mp3)
if not os.path.exists(raw_json): shutil.copy(f'{ep}/words.json', raw_json)

pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', raw_mp3, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
a = np.frombuffer(pcm, dtype=np.float32).copy()
words = [w for w in json.load(open(raw_json))['words'] if w.get('type', 'word') == 'word']

# çerçeve enerjisi ve sessizlik eşiği (konuşma enerjisinin ~ -32 dB altı)
nf = len(a) // FR
rms = np.sqrt(np.mean(a[:nf * FR].reshape(nf, FR) ** 2, axis=1) + 1e-12)
db = 20 * np.log10(rms + 1e-9)
speech_db = np.percentile(db, 75)
silent = db < speech_db - 32

# sessiz koşuları bul
runs = []; i = 0
while i < nf:
    if silent[i]:
        j = i
        while j < nf and silent[j]: j += 1
        runs.append((i * FR / SR, j * FR / SR)); i = j
    else: i += 1

# kesilecek aralıklar: baştaki/sondaki sessizlik tamamen (pay hariç), aradaki uzun sessizlikler KEEP_SIL'e
dur = len(a) / SR; cuts = []
for s, e in runs:
    L = e - s
    if s <= 0.001: cuts.append((0.0, max(0.0, e - PAD))); continue
    if e >= dur - 0.011: cuts.append((min(dur, s + PAD + 0.05), dur)); continue
    if L >= MIN_SIL:
        rem = L - KEEP_SIL
        if rem > 0.02: mid = (s + e) / 2; cuts.append((mid - rem / 2, mid + rem / 2))
cuts = [(max(0, s), min(dur, e)) for s, e in cuts if e - s > 0.01]

# tutulacak parçalar
keep = []; cur = 0.0
for s, e in cuts:
    if s > cur: keep.append((cur, s))
    cur = max(cur, e)
if cur < dur: keep.append((cur, dur))

out = []; mapping = []; pos = 0.0
for s, e in keep:
    seg = a[int(s * SR):int(e * SR)].copy()
    if len(seg) > 2 * XF:
        seg[:XF] *= np.linspace(0, 1, XF); seg[-XF:] *= np.linspace(1, 0, XF)
    mapping.append((s, e, pos)); out.append(seg); pos += len(seg) / SR
y = np.concatenate(out)

def remap(t):
    best = None
    for s, e, p in mapping:
        if t < s: return p if best is None else best   # kesilen sessizliğe düşen zaman -> sonraki parçanın başı
        if t <= e: return p + (t - s)
        best = p + (e - s)
    return best

tmp = f'{ep}/_tight.f32'; y.astype(np.float32).tofile(tmp)
af = f'atempo={SPEED}' if abs(SPEED - 1) > 1e-3 else 'anull'
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', tmp,
                '-af', af, '-c:a', 'libmp3lame', '-b:a', '192k', f'{ep}/voice.mp3'], check=True)
os.remove(tmp)

new = [{**w, 'start': round(remap(w['start']) / SPEED, 3), 'end': round(remap(w['end']) / SPEED, 3)} for w in words]
json.dump({'words': new}, open(f'{ep}/words.json', 'w'), ensure_ascii=False, indent=1)
print(f'süre: {dur:.1f} sn -> {pos / SPEED:.1f} sn ({100 * (1 - pos / SPEED / dur):.0f}% kısa), kısaltılan sessizlik: {len(cuts)}, hız x{SPEED}')
