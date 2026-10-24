// ===== Tarih Haber çizim kütüphanesi (yeniden kullanılabilir) =====
const W = 1080, H = 1920, FPS = 30;
const C = {
  ink: '#2a1d15', red: '#b7342a', cream: '#f3e9d2', paper: '#e8dcc0',
  blue: '#3e5f8a', sea: '#a9c9d4', seaLine: '#6f9fb0', land: '#ead7ad',
  gold: '#d9a630', purple: '#6a4a8c', skin: '#efc39b', green: '#9aa463', navy: '#14213a'
};

// ---------- yardımcılar ----------
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const eOut = t => 1 - Math.pow(1 - clamp(t), 3);
const eInOut = t => { t = clamp(t); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
const eBack = t => { t = clamp(t); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const prog = (lt, a, d) => clamp((lt - a) / d);
function rng(seed) { let s = seed >>> 0 || 1; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }
function hash(n) { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); }
let BOIL = 0; // el çizimi titreşimi
const jit = (i, a = 2.2) => (hash(i * 13.7 + BOIL * 7.3) - .5) * 2 * a;

// ---------- kağıt dokusu ----------
const paperCache = {};
function paperTex(base, key) {
  if (paperCache[key]) return paperCache[key];
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d'); g.fillStyle = base; g.fillRect(0, 0, W, H);
  const r = rng(key.length * 999 + 7);
  for (let i = 0; i < 26; i++) {
    const x = r() * W, y = r() * H, rad = 150 + r() * 420;
    const gr = g.createRadialGradient(x, y, 0, x, y, rad);
    const dark = r() < .55;
    gr.addColorStop(0, dark ? 'rgba(120,85,40,0.13)' : 'rgba(255,250,235,0.16)');
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
  }
  const id = g.getImageData(0, 0, W, H), d = id.data;
  for (let i = 0; i < d.length; i += 4) { const n = (r() - .5) * 18; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  g.putImageData(id, 0, 0);
  const v = g.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, H * .75);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(60,35,10,0.28)');
  g.fillStyle = v; g.fillRect(0, 0, W, H);
  return (paperCache[key] = c);
}
function bg(ctx, base = C.paper) { ctx.drawImage(paperTex(base, base), 0, 0); }

// ---------- çizim temelleri ----------
function wpath(ctx, pts, close = false, amp = 2.2) {
  ctx.beginPath();
  pts.forEach((p, i) => { const x = p[0] + jit(i * 2 + p[0] * .01, amp), y = p[1] + jit(i * 2 + 1 + p[1] * .01, amp); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
  if (close) ctx.closePath();
}
function shape(ctx, pts, fill, stroke = C.ink, lw = 5, amp = 2) {
  wpath(ctx, pts, true, amp);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.stroke(); }
}
function ell(ctx, x, y, rx, ry, fill, stroke = C.ink, lw = 5, rot = 0) {
  const pts = []; const n = 28;
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; const cx = Math.cos(a) * rx, cy = Math.sin(a) * ry; pts.push([x + cx * Math.cos(rot) - cy * Math.sin(rot), y + cx * Math.sin(rot) + cy * Math.cos(rot)]); }
  shape(ctx, pts, fill, stroke, lw, 1.3);
}
function line(ctx, pts, color = C.ink, lw = 5, amp = 1.5) {
  wpath(ctx, pts, false, amp); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
}
// kısmen çizilmiş yol (0..1)
function partial(pts, p) {
  if (p >= 1) return pts; const segs = []; let L = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(d); L += d; }
  const target = L * p; const out = [pts[0]]; let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    if (acc + segs[i - 1] >= target) { const f = (target - acc) / segs[i - 1]; out.push([lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]); return out; }
    acc += segs[i - 1]; out.push(pts[i]);
  }
  return out;
}
function curvePts(p0, p1, p2, n = 40) { const o = []; for (let i = 0; i <= n; i++) { const t = i / n; o.push([(1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0], (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]]); } return o; }
function arrow(ctx, pts, p, color = C.red, lw = 10, dashed = false) {
  const q = partial(pts, p); if (q.length < 2) return;
  ctx.save(); if (dashed) ctx.setLineDash([26, 18]); line(ctx, q, color, lw, 1); ctx.restore();
  const a = q[q.length - 1], b = q[q.length - 2]; const ang = Math.atan2(a[1] - b[1], a[0] - b[0]); const s = lw * 3.2;
  shape(ctx, [[a[0] + Math.cos(ang) * s * .6, a[1] + Math.sin(ang) * s * .6], [a[0] + Math.cos(ang + 2.5) * s, a[1] + Math.sin(ang + 2.5) * s], [a[0] + Math.cos(ang - 2.5) * s, a[1] + Math.sin(ang - 2.5) * s]], color, null);
}

// ---------- güvenli alan ----------
// Reels/Shorts arayüzü: üst ~200px, alt ~400px, sağ ~140px butonlar
const SAFE = { l: 70, r: W - 150, t: 190, capY: 1430 };
// yerel (kameralı) koordinatta x'i, ekranda [l, r] içinde kalacak şekilde düzelt
function fitX(ctx, x, y, halfW) {
  const m = ctx.getTransform(); const sx = m.a * x + m.c * y + m.e; const hw = halfW * m.a;
  const lo = SAFE.l + hw, hi = SAFE.r - hw; let nx = sx;
  if (lo > hi) nx = (SAFE.l + SAFE.r) / 2; else nx = Math.max(lo, Math.min(hi, sx));
  return (nx - m.e - m.c * y) / m.a;
}
// ---------- yazılar ----------
const F_SANS = 'Poppins', F_SERIF = 'Lora';
const up = s => s.toLocaleUpperCase('tr-TR');
function text(ctx, s, x, y, size, color = C.ink, font = F_SANS, weight = 700, align = 'center', stroke = null) {
  ctx.font = `${weight} ${size}px ${font}`; ctx.textAlign = align; ctx.textBaseline = 'middle';
  if (stroke) { ctx.lineWidth = stroke[1]; ctx.strokeStyle = stroke[0]; ctx.lineJoin = 'round'; ctx.strokeText(s, x, y); }
  ctx.fillStyle = color; ctx.fillText(s, x, y);
}
function tornRect(ctx, x, y, w, h, fill, seed = 1) {
  const r = rng(seed); const pts = []; const st = 22;
  for (let i = 0; i <= w; i += st) pts.push([x + i, y + (r() - .5) * 7]);
  for (let i = 0; i <= h; i += st) pts.push([x + w + (r() - .5) * 7, y + i]);
  for (let i = w; i >= 0; i -= st) pts.push([x + i, y + h + (r() - .5) * 7]);
  for (let i = h; i >= 0; i -= st) pts.push([x + (r() - .5) * 7, y + i]);
  ctx.save(); ctx.shadowColor = 'rgba(40,20,5,0.35)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 6;
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.restore();
}
// koyu/kırmızı etiket (BUGÜN gibi)
function tag(ctx, s, x, y, size, lt, delay = 0, bgc = C.ink, fg = C.cream, rot = -2) {
  const p = eBack(prog(lt, delay, .35)); if (p <= 0) return;
  ctx.font = `700 ${size}px ${F_SANS}`;
  const maxW = (SAFE.r - SAFE.l) / ctx.getTransform().a; while (ctx.measureText(s).width + size * .9 > maxW && size > 20) { size -= 2; ctx.font = `700 ${size}px ${F_SANS}`; }
  const w = ctx.measureText(s).width + size * .9, h = size * 1.45; x = fitX(ctx, x, y, w / 2 + 8);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot * Math.PI / 180); ctx.scale(p, p);
  tornRect(ctx, -w / 2, -h / 2, w, h, bgc, s.length * 31 + size);
  text(ctx, s, 0, size * .06, size, fg); ctx.restore();
}
// mühür
function stamp(ctx, s, x, y, r, color, lt, delay = 0, sub = '', rot = -10) {
  const p = prog(lt, delay, .28); if (p <= 0) return;
  const sc = lerp(2.3, 1, eOut(p)); x = fitX(ctx, x, y, r + 10);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot * Math.PI / 180); ctx.scale(sc, sc); ctx.globalAlpha = clamp(p * 1.6) * .92;
  ell(ctx, 0, 0, r, r, 'rgba(255,250,235,0.35)', color, 9);
  ell(ctx, 0, 0, r * .84, r * .84, null, color, 4);
  let fs = r * .42; ctx.font = `700 ${fs}px ${F_SANS}`; while (ctx.measureText(s).width > r * 1.5) { fs -= 2; ctx.font = `700 ${fs}px ${F_SANS}`; }
  text(ctx, s, 0, sub ? -r * .08 : 0, fs, color);
  if (sub) text(ctx, sub, 0, r * .36, r * .16, color);
  ctx.restore();
}
// dikdörtgen damga (TUZAK! gibi)
function boxStamp(ctx, s, x, y, size, color, lt, delay = 0, rot = -8) {
  const p = prog(lt, delay, .25); if (p <= 0) return;
  const sc = lerp(2.4, 1, eOut(p));
  ctx.font = `700 ${size}px ${F_SANS}`;
  const maxW = (SAFE.r - SAFE.l) / ctx.getTransform().a * .95; while (ctx.measureText(s).width + size * .8 > maxW && size > 20) { size -= 2; ctx.font = `700 ${size}px ${F_SANS}`; }
  const w = ctx.measureText(s).width + size * .8, h = size * 1.35; x = fitX(ctx, x, y, w / 2 + 10);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot * Math.PI / 180); ctx.scale(sc, sc); ctx.globalAlpha = clamp(p * 1.6) * .93;
  shape(ctx, [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]], null, color, 10, 2.5);
  text(ctx, s, 0, size * .06, size, color); ctx.restore();
}
// büyük başlık metni (pop)
function bigText(ctx, s, x, y, size, color, lt, delay = 0, font = F_SANS, stroke = null) {
  const p = eBack(prog(lt, delay, .4)); if (p <= 0) return;
  ctx.font = `700 ${size}px ${font}`; const maxW = (SAFE.r - SAFE.l) / ctx.getTransform().a;
  while (ctx.measureText(s).width > maxW && size > 20) { size -= 3; ctx.font = `700 ${size}px ${font}`; }
  x = fitX(ctx, x, y, ctx.measureText(s).width / 2);
  ctx.save(); ctx.translate(x, y); ctx.scale(p, p); text(ctx, s, 0, 0, size, color, font, 700, 'center', stroke); ctx.restore();
}

// ---------- altyazı ----------
let CAP = [];
function buildCaptions(words) {
  const chunks = []; let cur = [];
  const flush = () => { if (cur.length) chunks.push(cur); cur = []; };
  words.forEach(w => {
    const t = w.text.replace(/["“”]/g, '');
    cur.push({ t, s: w.start, e: w.end });
    const chars = cur.map(c => c.t).join(' ').length;
    if (/[.,!?:…]$/.test(t) || cur.length >= 3 || chars > 17) flush();
  });
  flush();
  CAP = chunks.map((c, i) => ({ words: c, s: c[0].s, e: i < chunks.length - 1 ? chunks[i + 1][0].s : c[c.length - 1].e + .5 }));
}
function drawCaption(ctx, t, KEY) {
  const ch = CAP.find(c => t >= c.s && t < c.e); if (!ch) return;
  let size = 62; const ws = ch.words.map(w => ({ ...w, u: up(w.t) }));
  let widths, sp, total;
  for (;;) { ctx.font = `700 ${size}px ${F_SANS}`; sp = size * .28; widths = ws.map(w => ctx.measureText(w.u).width); total = widths.reduce((a, b) => a + b, 0) + sp * (ws.length - 1); if (total + 68 <= SAFE.r - SAFE.l || size <= 34) break; size -= 2; }
  const pin = eBack(prog(t, ch.s, .18)); const cx = (SAFE.l + SAFE.r) / 2, cy = SAFE.capY;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-1.2 * Math.PI / 180); ctx.scale(.85 + .15 * pin, .85 + .15 * pin);
  tornRect(ctx, -total / 2 - 34, -size * .78, total + 68, size * 1.56, C.cream, Math.round(ch.s * 100));
  let x = -total / 2;
  ws.forEach((w, i) => {
    const active = t >= w.s - .05; const isKey = KEY.some(k => up(w.t).includes(k));
    const now = t >= w.s - .05 && t < (ws[i + 1] ? ws[i + 1].s : ch.e);
    ctx.globalAlpha = active ? 1 : .28;
    ctx.fillStyle = (isKey || now) ? C.red : C.ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(w.u, x, size * .06); x += widths[i] + sp;
  });
  ctx.restore();
}

// ---------- harita ----------
// basit Anadolu/Türkiye ana hattı (boylam, enlem)
const ANATOLIA = [[26.0, 40.6], [26.6, 40.4], [27.5, 40.4], [29.0, 40.95], [30.3, 41.2], [31.4, 41.3], [32.6, 41.85], [33.8, 42.0], [35.2, 42.05], [36.1, 41.65], [37.0, 41.2], [38.4, 40.95], [39.8, 41.0], [41.0, 41.3], [41.6, 41.55], [43.0, 41.2], [43.6, 40.7], [44.6, 39.8], [44.3, 39.3], [44.4, 38.3], [44.8, 37.2], [43.2, 37.3], [42.4, 37.1], [41.0, 37.1], [40.0, 36.9], [38.2, 36.85], [36.7, 36.85], [36.15, 35.9], [35.9, 36.5], [35.5, 36.6], [34.6, 36.8], [33.6, 36.2], [32.6, 36.1], [31.6, 36.7], [30.6, 36.8], [30.4, 36.25], [29.6, 36.2], [28.6, 36.7], [27.6, 36.7], [27.3, 37.3], [26.9, 38.0], [26.3, 38.25], [26.9, 38.7], [26.6, 39.3], [26.1, 39.5], [26.2, 40.05], [26.7, 40.35], [26.2, 40.6]];
const THRACE = [[26.0, 40.6], [26.6, 40.95], [26.4, 41.7], [27.6, 42.0], [28.0, 41.9], [29.0, 41.25], [28.6, 40.98], [27.5, 40.95], [26.8, 40.6]];
function proj(m, lon, lat) { return [m.x + (lon - m.lon) * m.k, m.y - (lat - m.lat) * m.k * 1.28]; }
function drawSea(ctx, area = [0, 0, W, H]) {
  ctx.fillStyle = C.sea; ctx.fillRect(...area);
  ctx.strokeStyle = C.seaLine; ctx.lineWidth = 3; ctx.globalAlpha = .55;
  for (let y = area[1] + 30; y < area[1] + area[3]; y += 46) for (let x = area[0] + ((y / 46) % 2) * 40; x < area[0] + area[2]; x += 92) {
    ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 12, y - 9, x + 24, y); ctx.quadraticCurveTo(x + 36, y + 9, x + 48, y); ctx.stroke();
  }
  ctx.globalAlpha = 1;
}
function drawLand(ctx, m, poly, fill = C.land) { shape(ctx, poly.map(p => proj(m, ...p)), fill, C.ink, 5, 1.6); }
function mountains(ctx, m, list) { list.forEach(([lon, lat], i) => { const [x, y] = proj(m, lon, lat); line(ctx, [[x - 16, y + 10], [x, y - 12], [x + 16, y + 10]], '#7d6a52', 4, 1); }); }
function pin(ctx, x, y, s, lt, delay, color = C.red) {
  const p = eBack(prog(lt, delay, .35)); if (p <= 0) return;
  x = fitX(ctx, x, y, 26 * s);
  ctx.save(); ctx.translate(x, y); ctx.scale(p * s, p * s);
  shape(ctx, [[0, 0], [-22, -40], [-24, -62], [-12, -80], [0, -84], [12, -80], [24, -62], [22, -40]], color, C.ink, 5, .8);
  ell(ctx, 0, -60, 9, 9, C.cream, C.ink, 4); ctx.restore();
}

// ---------- figürler ----------
function pawn(ctx, x, y, s, color, shield = null) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-16, 0], [-15, -18], [-8, -28], [8, -28], [15, -18], [16, 0]], color, C.ink, 3, .6);
  ell(ctx, 0, -38, 10, 10, color, C.ink, 3);
  if (shield) ell(ctx, 10, -12, 8, 10, shield, C.ink, 2.5);
  ctx.restore();
}
function sword(ctx, x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, [[-4, 0], [4, 0], [3, -90], [0, -100], [-3, -90]], '#cfd3d6', C.ink, 3); shape(ctx, [[-16, 0], [16, 0], [16, 7], [-16, 7]], C.gold, C.ink, 3); shape(ctx, [[-4, 7], [4, 7], [4, 30], [-4, 30]], C.ink, null); ctx.restore(); }

// Alparslan büstü. opts: robe, mouth (0..1), dir (1 sağa bakar)
function alparslan(ctx, x, y, s, o = {}) {
  const robe = o.robe || C.red; const dir = o.dir || 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  // gövde
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], robe, C.ink, 6);
  if (!o.plain) { shape(ctx, [[-40, 52], [0, 150], [40, 52]], o.collar || C.gold, C.ink, 5); for (let i = -3; i <= 3; i++) ell(ctx, i * 38, 200 + Math.abs(i) * 4, 6, 6, C.gold, null); }
  // boyun + baş
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 72, 84, C.skin, C.ink, 6);
  ell(ctx, -72, -36, 12, 18, C.skin, C.ink, 4); ell(ctx, 72, -36, 12, 18, C.skin, C.ink, 4);
  // gözler, kaşlar
  ell(ctx, -26, -48, 6, 7, C.ink, null); ell(ctx, 26, -48, 6, 7, C.ink, null);
  line(ctx, [[-44, -70], [-12, -64]], C.ink, 7); line(ctx, [[12, -64], [44, -70]], C.ink, 7);
  line(ctx, [[0, -42], [-6, -12], [6, -10]], C.ink, 4);
  // uzun bıyık (Alparslan'ın ünlü bıyığı)
  shape(ctx, [[0, 0], [-30, -6], [-70, 6], [-104, 34], [-112, 70], [-90, 40], [-60, 22], [-24, 14], [0, 10], [24, 14], [60, 22], [90, 40], [112, 70], [104, 34], [70, 6], [30, -6]], C.ink, C.ink, 3, 1);
  // ağız
  const mo = o.mouth || 0; ell(ctx, 0, 26, 14, 3 + mo * 10, mo > .1 ? '#6b2a20' : C.ink, C.ink, 3);
  // börk (sivri keçe başlık, kürk kenarlı)
  shape(ctx, [[-66, -98], [-50, -190], [-14, -250], [8, -262], [30, -236], [58, -180], [70, -98]], o.hat || C.cream, C.ink, 6);
  shape(ctx, [[-82, -110], [-80, -78], [82, -78], [84, -110]], '#6e4a2c', C.ink, 6);
  for (let i = -70; i <= 70; i += 20) line(ctx, [[i, -104], [i + 6, -84]], '#4a3020', 3);
  ell(ctx, 4, -262, 12, 12, C.gold, C.ink, 4);
  ctx.restore();
}
// Romen Diyojen büstü
function diyojen(ctx, x, y, s, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], o.robe || C.purple, C.ink, 6);
  shape(ctx, [[-120, 78], [-40, 52], [40, 52], [120, 78], [100, 120], [-100, 120]], C.gold, C.ink, 5);
  for (let i = -3; i <= 3; i++) ell(ctx, i * 28, 96, 7, 7, i % 2 ? '#b7342a' : '#3e5f8a', C.ink, 2);
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 70, 82, C.skin, C.ink, 6);
  ell(ctx, -26, -48, 6, 7, C.ink, null); ell(ctx, 26, -48, 6, 7, C.ink, null);
  if (o.sad) { line(ctx, [[-44, -62], [-12, -72]], C.ink, 7); line(ctx, [[12, -72], [44, -62]], C.ink, 7); }
  else { line(ctx, [[-44, -70], [-12, -66]], C.ink, 7); line(ctx, [[12, -66], [44, -70]], C.ink, 7); }
  line(ctx, [[0, -42], [-6, -12], [6, -10]], C.ink, 4);
  // sakal
  shape(ctx, [[-70, -30], [-66, 20], [-40, 70], [0, 90], [40, 70], [66, 20], [70, -30], [44, 0], [0, 6], [-44, 0]], '#5a3a22', C.ink, 4);
  const mo = o.mouth || 0; ell(ctx, 0, 28, 16, 3 + mo * 11, '#6b2a20', C.ink, 3);
  // taç
  if (!o.noCrown) {
    shape(ctx, [[-74, -100], [-74, -160], [74, -160], [74, -100]], C.gold, C.ink, 6);
    for (let i = -50; i <= 50; i += 50) ell(ctx, i, -130, 11, 13, i ? '#b7342a' : '#3e5f8a', C.ink, 3);
    shape(ctx, [[-74, -160], [-40, -200], [40, -200], [74, -160]], C.gold, C.ink, 6);
    line(ctx, [[0, -200], [0, -240]], C.ink, 7); line(ctx, [[-14, -224], [14, -224]], C.ink, 7);
    [-70, 70].forEach(px => { line(ctx, [[px, -100], [px, -40]], C.gold, 5); ell(ctx, px, -36, 6, 6, C.cream, C.ink, 2); });
  }
  ctx.restore();
}
// taç (tek başına)
function crown(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-74, 30], [-74, -30], [74, -30], [74, 30]], C.gold, C.ink, 6);
  for (let i = -50; i <= 50; i += 50) ell(ctx, i, 0, 11, 13, i ? '#b7342a' : '#3e5f8a', C.ink, 3);
  shape(ctx, [[-74, -30], [-40, -70], [40, -70], [74, -30]], C.gold, C.ink, 6);
  line(ctx, [[0, -70], [0, -110]], C.ink, 7); line(ctx, [[-14, -94], [14, -94]], C.ink, 7);
  ctx.restore();
}
// atlı okçu silüeti (dir: 1 sağa, -1 sola), ph: dörtnala evresi
function horseArcher(ctx, x, y, s, dir, ph, color = C.ink, drawBow = true) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  const L = (ang, hx, hy) => { const a1 = ang, a2 = ang * .6 - .3; const kx = hx + Math.sin(a1) * 46, ky = hy + Math.cos(a1) * 46; line(ctx, [[hx, hy], [kx, ky], [kx + Math.sin(a2) * 46, ky + Math.cos(a2) * 46]], color, 11, .5); };
  const sw = Math.sin(ph), cw = Math.cos(ph);
  L(sw * .7, 55, -10); L(-sw * .7, 70, -10); L(cw * .7, -60, -10); L(-cw * .7, -45, -10);
  const bob = Math.sin(ph * 2) * 4;
  ctx.translate(0, bob);
  ell(ctx, 0, -40, 92, 40, color, null);
  shape(ctx, [[60, -60], [95, -120], [120, -140], [150, -128], [148, -112], [118, -104], [92, -40]], color, null);
  shape(ctx, [[-88, -50], [-130, -30 + sw * 10], [-140, 10 + sw * 12], [-108, -34]], color, null); // kuyruk
  // binici
  shape(ctx, [[-14, -74], [-20, -150], [14, -156], [24, -78]], color, null);
  ell(ctx, 2, -172, 17, 19, color, null);
  shape(ctx, [[-14, -186], [4, -214], [20, -184]], color, null);
  if (drawBow) {
    ctx.beginPath(); ctx.ellipse(62, -142, 18, 54, 0, -Math.PI / 2, Math.PI / 2); ctx.strokeStyle = color; ctx.lineWidth = 7; ctx.stroke();
    line(ctx, [[62, -196], [26, -142], [62, -88]], color, 2.5, .2);
    line(ctx, [[8, -142], [80, -142]], color, 4, .2); line(ctx, [[2, -140], [62, -140]], color, 9, .2);
  }
  ctx.restore();
}
function arrowShot(ctx, x, y, ang, len = 70, color = C.ink) {
  const dx = Math.cos(ang), dy = Math.sin(ang);
  line(ctx, [[x - dx * len, y - dy * len], [x, y]], color, 4, .3);
  shape(ctx, [[x + dx * 14, y + dy * 14], [x - dy * 7, y + dx * 7], [x + dy * 7, y - dx * 7]], color, null);
}
function yurt(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-60, 0], [-60, -46], [-50, -60], [0, -86], [50, -60], [60, -46], [60, 0]], C.cream, C.ink, 5); shape(ctx, [[-14, 0], [-14, -36], [14, -36], [14, 0]], C.red, C.ink, 4); line(ctx, [[-56, -50], [56, -50]], C.ink, 4); ctx.restore(); }
function chainLink(ctx, x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0, 0, 46 * s, 26 * s, 0, 0, 7); ctx.strokeStyle = '#555a5e'; ctx.lineWidth = 16 * s; ctx.stroke(); ctx.strokeStyle = C.ink; ctx.lineWidth = 4 * s; ctx.stroke(); ctx.restore(); }
function bubble(ctx, s, x, y, w, size, lt, delay, tail = 'left', fill = C.cream, color = C.ink) {
  const p = eBack(prog(lt, delay, .35)); if (p <= 0) return;
  w = Math.min(w, (SAFE.r - SAFE.l) / ctx.getTransform().a); x = fitX(ctx, x, y, w / 2 + 6);
  ctx.save(); ctx.translate(x, y); ctx.scale(p, p);
  ctx.font = `700 ${size}px ${F_SANS}`;
  const words = s.split(' '); const lines = []; let cur = '';
  words.forEach(wd => { const tst = cur ? cur + ' ' + wd : wd; if (ctx.measureText(tst).width > w - 60) { lines.push(cur); cur = wd; } else cur = tst; }); lines.push(cur);
  const h = lines.length * size * 1.2 + 50;
  const tx = tail === 'left' ? -w / 2 + 70 : w / 2 - 70;
  shape(ctx, [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [tx + 30, h / 2], [tx + (tail === 'left' ? -40 : 40), h / 2 + 70], [tx - 30, h / 2], [-w / 2, h / 2]], fill, C.ink, 6, 1.5);
  lines.forEach((l, i) => text(ctx, l, 0, -h / 2 + 25 + size * .6 + i * size * 1.2, size, color));
  ctx.restore();
}

// ---------- HOOK kartı (her videonun ilk ~2 sn'si) ----------
// line1: büyük merak cümlesi, line2: alt vurgu. bgc: arka plan rengi
function hookCard(ctx, lt, d, line1, line2 = '', bgc = '#a8352b') {
  ctx.drawImage(paperTex(bgc, 'hook' + bgc), 0, 0);
  const z = lerp(1.0, 1.08, eInOut(lt / d)); ctx.translate(W / 2, 800); ctx.scale(z, z); ctx.translate(-W / 2, -800);
  // satır kır
  ctx.font = `700 92px ${F_SANS}`; const words = up(line1).split(' '); const lines = []; let cur = '';
  words.forEach(w => { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > (SAFE.r - SAFE.l) - 40) { lines.push(cur); cur = w; } else cur = t; }); lines.push(cur);
  const y0 = 760 - (lines.length - 1) * 60;
  lines.forEach((l, i) => bigText(ctx, l, (SAFE.l + SAFE.r) / 2, y0 + i * 120, 92, C.cream, lt, i * .12, F_SANS, [C.ink, 12]));
  if (line2) tag(ctx, up(line2), (SAFE.l + SAFE.r) / 2, y0 + lines.length * 120 + 40, 60, lt, .15, C.ink, C.cream);
  boxStamp(ctx, '?', SAFE.r - 70, 380, 150, C.cream, lt, .25, 12);
}
// ---------- kapanış (son ~1.6 sn üstüne bindirilir) ----------
function outro(ctx, lt) {
  const p = eOut(prog(lt, 0, .5)); if (p <= 0) return;
  ctx.fillStyle = `rgba(27,23,18,${p * .86})`; ctx.fillRect(-200, -200, W + 400, H + 400);
  bigText(ctx, 'TARİH HABER', (SAFE.l + SAFE.r) / 2, 820, 100, C.cream, lt, .15);
  text(ctx, 'Takip et, tarih kaçmasın', (SAFE.l + SAFE.r) / 2, 940, 44, `rgba(243,233,210,${prog(lt, .4, .4)})`, F_SANS, 700);
}
// ---------- ana çizim döngüsü ----------
// Bölüm dosyası şunları tanımlar: SCENES [{s,e,draw(ctx,lt,d)}], KEY [büyük harf anahtar kelimeler], DURATION
// OUTRO_AT (isteğe bağlı): kapanışın başlayacağı saniye
function render(t) {
  const cv = document.getElementById('c'); const ctx = cv.getContext('2d');
  BOIL = Math.floor(t * 8);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H);
  const sc = SCENES.find(s => t >= s.s && t < s.e) || SCENES[SCENES.length - 1];
  ctx.save(); sc.draw(ctx, t - sc.s, sc.e - sc.s); ctx.restore();
  const since = t - sc.s; if (since < .1 && sc.s > 0) { ctx.fillStyle = `rgba(255,248,230,${(1 - since / .1) * .5})`; ctx.fillRect(0, 0, W, H); }
  if (typeof OUTRO_AT !== 'undefined' && t >= OUTRO_AT) { ctx.save(); outro(ctx, t - OUTRO_AT); ctx.restore(); }
  drawCaption(ctx, t, typeof KEY !== 'undefined' ? KEY : []);
}

// ---------- MİLLİ DEĞERLER: saygılı, doğru çizimler ----------
// Türk Bayrağı — resmî oranlar (Türk Bayrağı Kanunu): en/boy 2:3, hilal ve yıldız ölçüleri birebir.
// x,y: bayrağın sol üst köşesi, h: yükseklik (G). wave: 0..1 hafif dalgalanma (oranları bozmaz, sadece gölgelendirir)
function turkFlag(ctx, x, y, h, wave = 0, t = 0) {
  const G = h, L = 1.5 * G, R = '#E30A17';
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = R; ctx.fillRect(0, 0, L, G);
  const k = G / 800; // SVG referansı (1200x800)
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(425 * k, 400 * k, 200 * k, 0, 7); ctx.fill();
  ctx.fillStyle = R; ctx.beginPath(); ctx.arc(475 * k, 400 * k, 160 * k, 0, 7); ctx.fill();
  const sx = 683.334 * k, sy = 400 * k, sr = 100 * k; ctx.fillStyle = '#fff'; ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a = Math.PI + i * Math.PI / 5; const r = i % 2 ? sr * 0.381966 : sr; ctx.lineTo(sx + Math.cos(a) * r, sy + Math.sin(a) * r); }
  ctx.closePath(); ctx.fill();
  if (wave > 0) { // dalga gölgesi
    for (let i = 0; i < 4; i++) { const gx = ((i / 4 + t * .25) % 1) * L; const g = ctx.createLinearGradient(gx - L * .12, 0, gx + L * .12, 0);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.5, `rgba(0,0,0,${.12 * wave})`); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, L, G); }
  }
  ctx.strokeStyle = C.ink; ctx.lineWidth = Math.max(3, G * .012); ctx.strokeRect(0, 0, L, G);
  ctx.restore();
}
// Direkli bayrak: direk dibi (x,y), bayrak yüksekliği h
function flagPole(ctx, x, y, poleH, h, wave = .6, t = 0) {
  line(ctx, [[x, y], [x, y - poleH]], '#6e4a2c', Math.max(8, h * .06), .5);
  ell(ctx, x, y - poleH - 8, 12, 12, C.gold, C.ink, 3);
  turkFlag(ctx, x + 4, y - poleH, h, wave, t);
}
// !!! KULLANMA: Kural gereği Atatürk ÇİZİLMEZ (yüz de silüet de). Bu fonksiyon yalnızca arşiv için duruyor.
// Atatürk büstü — her zaman ağırbaşlı ve saygılı (karikatür YOK). o.kalpak: true ise kalpaklı (Kurtuluş Savaşı), değilse takım elbise
function ataturk(ctx, x, y, s, o = {}) {
  if (o.kalpak && o.uniform === undefined) o.uniform = true;
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  // ceket
  shape(ctx, [[-170, 260], [-162, 118], [-112, 70], [-40, 52], [40, 52], [112, 70], [162, 118], [170, 260]], o.uniform ? '#6b6a4a' : '#3a3f47', C.ink, 6);
  shape(ctx, [[-40, 52], [0, 170], [40, 52]], '#f4f1ea', C.ink, 5); // gömlek
  if (!o.uniform) { shape(ctx, [[-10, 70], [10, 70], [16, 150], [0, 172], [-16, 150]], '#2a2d33', C.ink, 3); // kravat
    shape(ctx, [[-40, 52], [-74, 150], [-20, 230], [0, 170]], '#3a3f47', C.ink, 5); shape(ctx, [[40, 52], [74, 150], [20, 230], [0, 170]], '#3a3f47', C.ink, 5); }
  else { [-60, 60].forEach(px => ell(ctx, px, 140, 7, 7, C.gold, C.ink, 2)); }
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -42, 66, 84, C.skin, C.ink, 6);
  ell(ctx, -66, -38, 11, 17, C.skin, C.ink, 4); ell(ctx, 66, -38, 11, 17, C.skin, C.ink, 4);
  // keskin, kararlı bakış: açık mavi gözler, belirgin kaşlar
  ell(ctx, -25, -50, 9, 7, '#fff', C.ink, 3); ell(ctx, 25, -50, 9, 7, '#fff', C.ink, 3);
  ell(ctx, -25, -50, 4.5, 5, '#5b8fb9', null); ell(ctx, 25, -50, 4.5, 5, '#5b8fb9', null);
  line(ctx, [[-46, -70], [-26, -76], [-8, -68]], '#7a5a32', 8); line(ctx, [[8, -68], [26, -76], [46, -70]], '#7a5a32', 8);
  line(ctx, [[0, -46], [-5, -14], [6, -12]], C.ink, 4);
  line(ctx, [[-18, 22], [0, 20], [18, 22]], C.ink, 4); // ciddi, sakin ağız
  line(ctx, [[-30, 4], [-22, 10]], 'rgba(42,29,21,.5)', 3); line(ctx, [[30, 4], [22, 10]], 'rgba(42,29,21,.5)', 3);
  if (o.kalpak) {
    shape(ctx, [[-70, -96], [-74, -150], [-60, -196], [60, -196], [74, -150], [70, -96]], '#2b2420', C.ink, 6);
    for (let i = -56; i <= 56; i += 14) line(ctx, [[i, -186], [i + 4, -106]], '#4a3e36', 3);
  } else { // geriye taranmış açık kumral saç
    shape(ctx, [[-66, -70], [-70, -110], [-48, -138], [0, -150], [48, -138], [70, -110], [66, -70], [44, -100], [0, -112], [-44, -100]], '#b8956a', C.ink, 5);
    for (let i = -40; i <= 40; i += 20) line(ctx, [[i, -108], [i * 1.1, -140]], '#8c6d48', 3);
  }
  ctx.restore();
}
// Osmanlı padişahı büstü — kavuk (büyük beyaz sarık), kürk yakalı kaftan, sakal. Ağırbaşlı çizilir.
function padisah(ctx, x, y, s, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], o.kaftan || '#2f6b4f', C.ink, 6);
  shape(ctx, [[-120, 74], [-40, 52], [-20, 260], [-90, 260]], '#8a6a48', C.ink, 5); shape(ctx, [[120, 74], [40, 52], [20, 260], [90, 260]], '#8a6a48', C.ink, 5); // kürk yaka
  for (let i = 0; i < 4; i++) ell(ctx, 0, 110 + i * 38, 7, 7, C.gold, C.ink, 2);
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 68, 82, C.skin, C.ink, 6);
  ell(ctx, -26, -46, 6, 7, C.ink, null); ell(ctx, 26, -46, 6, 7, C.ink, null);
  line(ctx, [[-44, -68], [-12, -64]], C.ink, 7); line(ctx, [[12, -64], [44, -68]], C.ink, 7);
  line(ctx, [[0, -42], [-6, -12], [6, -10]], C.ink, 4);
  shape(ctx, [[-66, -24], [-62, 26], [-36, 74], [0, 92], [36, 74], [62, 26], [66, -24], [40, 4], [0, 10], [-40, 4]], o.beard || '#3b2a1e', C.ink, 4);
  shape(ctx, [[0, 4], [-40, 14], [-56, 30], [-30, 24], [0, 18], [30, 24], [56, 30], [40, 14]], o.beard || '#3b2a1e', C.ink, 3);
  // kavuk
  ell(ctx, 0, -150, 104, 76, '#f6f1e6', C.ink, 6);
  for (let i = -2; i <= 2; i++) line(ctx, [[i * 34 - 20, -212], [i * 34 + 20, -94]], 'rgba(42,29,21,.35)', 3);
  shape(ctx, [[-26, -222], [-20, -258], [20, -258], [26, -222]], o.kaftan || '#2f6b4f', C.ink, 5);
  ell(ctx, 0, -168, 14, 18, '#b7342a', C.ink, 3); line(ctx, [[0, -186], [6, -236]], '#2a1d15', 4); // sorguç
  ctx.restore();
}

// ---------- GENEL HARİTA YARDIMCILARI (deniz poligonları + bölge haritası) ----------
const SEA_BLACK = [[28.0,41.95],[28.0,43.5],[29.6,45.3],[30.8,46.6],[33.4,46.1],[33.5,44.5],[36.6,45.3],[38.3,44.4],[39.8,43.4],[41.6,42.6],[41.6,41.55],[41.0,41.3],[39.8,41.0],[38.4,40.95],[37.0,41.2],[36.1,41.65],[35.2,42.05],[33.8,42.0],[32.6,41.85],[31.4,41.3],[30.3,41.2],[29.0,41.25]];
const SEA_MED = [[10,43],[19,42],[22.5,40.6],[24,40.9],[26.0,40.6],[26.7,40.35],[26.2,40.05],[26.1,39.5],[26.6,39.3],[26.9,38.7],[26.3,38.25],[26.9,38.0],[27.3,37.3],[27.6,36.7],[28.6,36.7],[29.6,36.2],[30.4,36.25],[30.6,36.8],[31.6,36.7],[32.6,36.1],[33.6,36.2],[34.6,36.8],[35.5,36.6],[35.9,36.5],[36.15,35.9],[35.9,35.4],[35.6,34.6],[35.0,33.0],[34.6,31.5],[32,31.0],[29,30.9],[10,30]];
const SEA_MARMARA = [[26.6,40.45],[27.5,40.42],[29.0,40.9],[28.6,40.98],[27.5,40.95],[26.8,40.62]];
const SEA_CASPIAN = [[47.0,38.4],[48.9,37.6],[50.3,37.1],[51.8,36.6],[53.9,36.9],[54.0,38.5],[53.0,40.0],[53.0,42.0],[51.5,45.5],[48.5,46.5],[47.5,43.0],[49.3,40.6],[48.9,38.9]];
const SEA_GULF = [[47.9,30.0],[49.6,30.1],[50.6,29.1],[51.4,27.9],[53.5,26.7],[55.0,26.6],[56.3,27.2],[56.4,26.0],[56.0,24.0],[52.0,23.8],[51.2,25.5],[50.2,26.0],[49.0,27.8],[48.3,28.6]];
function seaArea(ctx, m, poly) {
  const pts = poly.map(p => proj(m, ...p));
  ctx.save(); wpath(ctx, pts, true, 1.4); ctx.clip(); drawSea(ctx, [-300, -300, W + 600, H + 600]); ctx.restore();
  shape(ctx, pts, null, C.ink, 4, 1.4);
}
// o: {seas:[...], lands:[...]} — kâğıt zemin + denizler + kara poligonları
function regionMap(ctx, m, o = {}) {
  ctx.drawImage(paperTex('#d9c393', 'mapland'), 0, 0); ctx.fillStyle = '#d9c393'; ctx.fillRect(-400, -400, W + 800, 400); ctx.fillRect(-400, H, W + 800, 400);
  (o.seas || [SEA_BLACK, SEA_MED, SEA_MARMARA]).forEach(s => seaArea(ctx, m, s));
  (o.lands || []).forEach(l => drawLand(ctx, m, l));
}
// Türkmen / Akkoyunlu beyi büstü — ağırbaşlı. o: {young, robe, taj (sarık içi külah rengi), beard, mouth, dir, sad}
function turkmenBey(ctx, x, y, s, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  const robe = o.robe || '#2d5a7a';
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], robe, C.ink, 6);
  shape(ctx, [[-40, 52], [0, 140], [40, 52]], C.cream, C.ink, 5);
  line(ctx, [[-150, 190], [150, 190]], C.gold, 10); // kuşak
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 66, 80, C.skin, C.ink, 6);
  ell(ctx, -66, -36, 11, 17, C.skin, C.ink, 4); ell(ctx, 66, -36, 11, 17, C.skin, C.ink, 4);
  ell(ctx, -24, -46, 6, 7, C.ink, null); ell(ctx, 24, -46, 6, 7, C.ink, null);
  if (o.sad) { line(ctx, [[-42, -62], [-12, -70]], C.ink, 6); line(ctx, [[12, -70], [42, -62]], C.ink, 6); }
  else { line(ctx, [[-42, -68], [-12, -64]], C.ink, 6); line(ctx, [[12, -64], [42, -68]], C.ink, 6); }
  line(ctx, [[0, -40], [-5, -12], [6, -10]], C.ink, 4);
  if (!o.young) { // sakal + bıyık
    shape(ctx, [[-62, -20], [-58, 26], [-34, 70], [0, 86], [34, 70], [58, 26], [62, -20], [38, 6], [0, 12], [-38, 6]], o.beard || '#3a2618', C.ink, 4);
    shape(ctx, [[0, 6], [-36, 12], [-54, 26], [-28, 22], [0, 16], [28, 22], [54, 26], [36, 12]], o.beard || '#3a2618', C.ink, 3);
  } else { // genç: ince bıyık
    line(ctx, [[-22, 10], [0, 6], [22, 10]], '#4a3020', 5);
  }
  const mo = o.mouth || 0; ell(ctx, 0, 28, 12, 3 + mo * 9, mo > .1 ? '#6b2a20' : C.ink, C.ink, 3);
  // Türkmen sarığı + uzun kırmızı külah (tac)
  shape(ctx, [[-30, -110], [-22, -230], [0, -262], [22, -230], [30, -110]], o.taj || C.red, C.ink, 5);
  ell(ctx, 0, -112, 90, 44, '#f6f1e6', C.ink, 6);
  for (let i = -2; i <= 2; i++) line(ctx, [[i * 32 - 18, -146], [i * 32 + 18, -78]], 'rgba(42,29,21,.35)', 3);
  ell(ctx, 0, -262, 9, 9, C.gold, C.ink, 3);
  ctx.restore();
}
// taht
function throne(ctx, x, y, s, col = C.red) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-110, 0], [-110, -330], [-80, -380], [0, -410], [80, -380], [110, -330], [110, 0]], C.gold, C.ink, 7);
  shape(ctx, [[-80, -60], [-80, -320], [0, -350], [80, -320], [80, -60]], col, C.ink, 5);
  shape(ctx, [[-150, 0], [-150, -90], [150, -90], [150, 0]], '#8b6a45', C.ink, 6);
  shape(ctx, [[-130, 60], [-130, 0], [130, 0], [130, 60]], '#6e4a2c', C.ink, 6);
  ell(ctx, 0, -380, 16, 16, C.cream, C.ink, 4);
  ctx.restore();
}
// mühürlü mektup
function letter(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-90, -60], [90, -60], [90, 60], [-90, 60]], C.cream, C.ink, 5);
  line(ctx, [[-90, -60], [0, 10], [90, -60]], C.ink, 4);
  ell(ctx, 0, 10, 20, 20, C.red, C.ink, 4);
  ctx.restore();
}
// iç içe iki yüzük (evlilik)
function rings(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  [[-38, 0], [38, 0]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(dx, dy, 62, 0, 7); ctx.strokeStyle = C.ink; ctx.lineWidth = 26; ctx.stroke(); ctx.strokeStyle = C.gold; ctx.lineWidth = 16; ctx.stroke(); });
  shape(ctx, [[38, -62], [22, -92], [38, -112], [54, -92]], '#bfe3ef', C.ink, 4);
  ctx.restore();
}

// ---------- AKSİYON yardımcıları (her sahnede hareket olmalı) ----------
// Darbe sarsıntısı: sahne çiziminin başında çağır. at: sarsıntı anı (sn), amp: piksel
function shake(ctx, lt, at, amp = 16, dur = .35) {
  const p = (lt - at) / dur; if (p < 0 || p > 1) return;
  const k = (1 - p) * amp; ctx.translate(Math.sin(lt * 90) * k, Math.cos(lt * 77) * k * .7);
}
// Kaydırma + yakınlaşma (Ken Burns). dx,dy: sahne boyunca toplam kayma
function pan(ctx, lt, d, dx = 0, dy = 0, z0 = 1, z1 = 1.1, cx = W / 2, cy = 760) {
  const e = eInOut(lt / d); const z = lerp(z0, z1, e);
  ctx.translate(cx + dx * e, cy + dy * e); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
// Yürüyen/ilerleyen birlik: n piyon, sürekli hareket (dir 1 sağa, -1 sola)
function marching(ctx, lt, x0, y, n, color, dir = 1, speed = 90, s = 1.1, shield = null) {
  for (let i = 0; i < n; i++) { const x = x0 + dir * (lt * speed) + i * 46 * -dir; const bob = Math.abs(Math.sin(lt * 9 + i)) * -6; pawn(ctx, x, y + bob + (i % 2) * 18, s, color, shield); }
}
// Toz/duman parçacıkları (sahneye canlılık katar)
function dust(ctx, lt, x, y, n = 14, color = 'rgba(120,95,60,.35)') {
  for (let i = 0; i < n; i++) { const t = (lt * .8 + i / n) % 1; const xx = x + (hash(i) - .5) * 160 + t * 60; const yy = y - t * 120; ctx.globalAlpha = (1 - t) * .9; ell(ctx, xx, yy, 10 + t * 30, 8 + t * 22, color, null); }
  ctx.globalAlpha = 1;
}
// Ateş titremesi
function fire(ctx, x, y, s, lt) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 3; i++) { const h = 90 - i * 24 + Math.sin(lt * 14 + i) * 10; const w = 40 - i * 10; shape(ctx, [[-w, 0], [-w * .6, -h * .5], [0, -h], [w * .6, -h * .5], [w, 0]], ['#e2572b', '#f09a2a', '#f8d25a'][i], i ? null : C.ink, 4, 3); }
  ctx.restore();
}

// !!! KULLANMA: Kural gereği Atatürk ÇİZİLMEZ. Arşiv için duruyor.
// Atatürk — YÜZ ÇİZİLMEZ. Yalnızca kalpaklı, ufka bakan profil silüeti (ağırbaşlı, temiz çizgi, titreme yok).
// x,y: ayak/taban ortası; s: ölçek (s=1 → ~640 px yükseklik); color: silüet rengi
function ataturkSilhouette(ctx, x, y, s, color = '#1f1712', glow = true) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (glow) { const g = ctx.createRadialGradient(10, -380, 40, 10, -380, 420); g.addColorStop(0, 'rgba(255,214,140,.55)'); g.addColorStop(1, 'rgba(255,214,140,0)'); ctx.fillStyle = g; ctx.fillRect(-460, -820, 920, 860); }
  const path = (P) => { ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); };
  ctx.fillStyle = color;
  // palto (omuzlar geniş, aşağı doğru hafif açılır)
  path([[-40, -300], [-90, -292], [-150, -262], [-178, -205], [-188, 0], [188, 0], [180, -205], [154, -260], [96, -290], [30, -294]]);
  // baş + boyun (sağa bakan profil)
  path([[30, -294], [28, -312], [44, -318], [62, -322], [72, -334], [75, -344], [71, -350], [76, -357], [72, -364],
        [90, -372], [86, -382], [70, -398], [73, -410], [70, -428], [66, -444],
        [-70, -444], [-72, -404], [-62, -372], [-50, -350], [-42, -318], [-40, -300]]);
  // kalpak: geniş, basık, üstü hafif açılan
  path([[-76, -436], [-80, -470], [-84, -528], [-74, -540], [72, -540], [84, -528], [80, -470], [76, -436]]);
  // kürk yaka (palto renginden biraz açık)
  ctx.fillStyle = 'rgba(255,240,210,.10)';
  path([[-40, -300], [-96, -290], [-120, -250], [-60, -236], [30, -240], [98, -252], [96, -290], [30, -294]]);
  // ince ışık çizgileri: kalpak dokusu, palto önü
  ctx.strokeStyle = 'rgba(255,240,210,.16)'; ctx.lineWidth = 3;
  for (let i = -64; i <= 64; i += 16) { ctx.beginPath(); ctx.moveTo(i, -532); ctx.lineTo(i * 1.02, -444); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(40, -240); ctx.lineTo(30, -120); ctx.lineTo(34, 0); ctx.stroke();
  ctx.restore();
}

// Birinci TBMM binası (Ankara, Ulus) — taş, iki katlı, kemerli pencereler, çatıda bayrak
function meclis(ctx, x, y, s, lt = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-300, 0], [-300, -230], [300, -230], [300, 0]], '#c9a27a', C.ink, 6, 1);           // gövde
  shape(ctx, [[-90, -230], [-90, -290], [90, -290], [90, -230]], '#c9a27a', C.ink, 6, 1);          // orta çıkıntı
  shape(ctx, [[-320, -230], [320, -230], [300, -250], [-300, -250]], '#a5805c', C.ink, 5, 1);       // korniş
  shape(ctx, [[-110, -290], [110, -290], [90, -310], [-90, -310]], '#a5805c', C.ink, 5, 1);
  for (let r = 0; r < 2; r++) for (let i = -4; i <= 4; i++) { if (i === 0) continue;
    const wx = i * 62, wy = -60 - r * 100; shape(ctx, [[wx - 18, wy], [wx - 18, wy - 46], [wx - 10, wy - 58], [wx, wy - 62], [wx + 10, wy - 58], [wx + 18, wy - 46], [wx + 18, wy]], '#5b4636', C.ink, 3, .6); }
  shape(ctx, [[-40, 0], [-40, -110], [-28, -128], [0, -138], [28, -128], [40, -110], [40, 0]], '#5b4636', C.ink, 4, .6); // kapı
  for (let i = 0; i < 3; i++) shape(ctx, [[-80 - i * 14, i * 14 + 14], [80 + i * 14, i * 14 + 14], [80 + i * 14, i * 14], [-80 - i * 14, i * 14]], '#b39472', C.ink, 3, .5); // basamak
  ctx.restore();
  flagPole(ctx, x, y - 310 * s, 150 * s, 90 * s, .7, lt);
}
// Kutlayan kalabalık (bayraklı); sürekli hareket
function crowd(ctx, lt, x0, x1, y, n = 22, s = 1) {
  const r = rng(77);
  for (let i = 0; i < n; i++) { const x = lerp(x0, x1, r()), yy = y + r() * 60; const jump = Math.max(0, Math.sin(lt * 7 + i * 1.7)) * 14;
    pawn(ctx, x, yy - jump, s, ['#b7342a', '#3a3f47', '#6e4a2c', '#2f6b4f'][i % 4]);
    if (i % 5 === 0) { line(ctx, [[x + 8 * s, yy - jump - 20 * s], [x + 8 * s, yy - jump - 120 * s]], '#6e4a2c', 4 * s, .3); turkFlag(ctx, x + 8 * s, yy - jump - 120 * s, 40 * s, .5, lt); } }
}
