# Sentetik savaş davulu + drone + sahne geçiş sesleri. Kullanım: python3 engine/music.py <bölüm_klasörü>
import numpy as np, wave, json, sys
ep = sys.argv[1]; tl = json.load(open(ep + '/timeline.json'))
sr = 44100; D = tl['dur']; n = int(sr * D); t = np.arange(n) / sr; out = np.zeros(n); np.random.seed(7)
def add(sig, at):
    i = int(max(0, at) * sr); j = min(n, i + len(sig)); out[i:j] += sig[:j - i]
def drum(f0=55, dur=.7, amp=1.0):
    tt = np.arange(int(sr * dur)) / sr; f = f0 * (1 + 1.5 * np.exp(-tt * 30)); ph = 2 * np.pi * np.cumsum(f) / sr
    return amp * np.sin(ph) * np.exp(-tt * 6)
def hat(dur=.12, amp=.25):
    tt = np.arange(int(sr * dur)) / sr; return amp * np.random.randn(len(tt)) * np.exp(-tt * 40)
beat = 60 / 96; k = 0; x = 0.0
while x < D - 2:
    add(drum(52 if k % 4 == 0 else 62, .8, 1.0 if k % 4 == 0 else .6), x)
    if k % 2: add(hat(), x)
    x += beat; k += 1
for f, a in [(73.4, .12), (110, .07), (146.8, .04)]: out += a * np.sin(2 * np.pi * f * t) * (0.7 + 0.3 * np.sin(2 * np.pi * .1 * t))
for c in tl['cuts']:
    L = int(sr * .45); w = np.convolve(np.random.randn(L), np.ones(30) / 30, 'same'); add(.5 * w * np.sin(np.linspace(0, np.pi, L)) ** 2, c - .3)
add(drum(40, 1.5, 1.6), 0.05)
for c in tl.get('hits', []): add(drum(40, 1.5, 1.6), c)
fe = int(sr * 3); out[-fe:] *= np.linspace(1, 0, fe); out = out / np.max(np.abs(out)) * .9
wv = wave.open(ep + '/music.wav', 'wb'); wv.setnchannels(1); wv.setsampwidth(2); wv.setframerate(sr); wv.writeframes((out * 32767).astype(np.int16).tobytes()); wv.close()
