// Kullanım: node engine/render.js <bölüm_klasörü> stills [t1,t2,...]   |   node engine/render.js <bölüm_klasörü> video
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
(async () => {
  const ep = path.resolve(process.argv[2]); const mode = process.argv[3] || 'stills';
  const words = JSON.parse(fs.readFileSync(ep + '/words.json')).words;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  let errs = 0; p.on('pageerror', e => { errs++; console.log('HATA', e.message); });
  await p.goto('file://' + __dirname + '/index.html?ep=' + encodeURIComponent('file://' + ep));
  await p.evaluate(async (w) => { await document.fonts.load('700 40px Poppins'); await document.fonts.load('700 40px Lora'); buildCaptions(w); }, words);
  const info = await p.evaluate(() => ({ dur: DURATION, cuts: SCENES.map(s => s.s).filter(x => x > 0) }));
  fs.writeFileSync(ep + '/timeline.json', JSON.stringify(info));
  const grab = async (t) => { const d = await p.evaluate((t) => { render(t); return document.getElementById('c').toDataURL('image/jpeg', 0.92); }, t); return Buffer.from(d.split(',')[1], 'base64'); };
  if (mode === 'stills') {
    const times = process.argv[4] ? process.argv[4].split(',').map(Number) : (() => { const a = []; for (let t = 0.8; t < info.dur; t += 2.5) a.push(+t.toFixed(1)); return a; })();
    fs.mkdirSync(ep + '/stills', { recursive: true });
    for (const t of times) fs.writeFileSync(`${ep}/stills/${String(t.toFixed(1)).padStart(5, '0')}.jpg`, await grab(t));
    console.log('kareler:', times.length);
  } else {
    const N = Math.round(info.dur * 30);
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', ep + '/video_noaudio.mp4']);
    for (let i = 0; i < N; i++) { const buf = await grab(i / 30); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); if (i % 300 === 0) console.log('kare', i, '/', N); }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  await b.close(); if (errs) process.exit(1);
})();
