// ===== Preveze 1538: Barbaros ve Haçlı donanması (akşam) =====
const KEY = ['HAÇLI', 'FENERLERİNİ', 'PAPA', 'VENEDİK', 'İSPANYA', 'CENEVİZ', 'PAPALIK', 'DORIA', 'AKDENİZ', 'AKDENİZ\'DEN', 'BARBAROS', 'PREVEZE', 'RÜZGÂR', 'DURUR', 'KADIRGALARI', 'TOPLAR', 'YAĞMUR', 'KANUNİ', 'HÂKİMİDİR', 'OTUZ', 'DENİZ', 'KUVVETLERİ', 'ÇAĞ'];
const DURATION = 63.64 + 2.2;
const OUTRO_AT = DURATION - 1.6;

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
// ---- harita verileri (boylam, enlem) ----
const MED = [[-5.6, 36.0], [-4.4, 36.7], [-2.4, 36.8], [-1.0, 37.6], [-0.5, 38.3], [-0.3, 39.5], [0.0, 40.0], [0.9, 40.7], [2.2, 41.4], [3.3, 42.3], [3.0, 43.0], [3.9, 43.5], [5.4, 43.3], [6.0, 43.1], [7.3, 43.7], [8.9, 44.4], [9.8, 44.1], [10.3, 43.5], [10.5, 42.9], [11.8, 42.1], [12.3, 41.7], [13.6, 41.2], [14.3, 40.8], [14.8, 40.6], [15.6, 40.0], [16.0, 39.0], [15.65, 38.1], [16.0, 37.9], [16.6, 38.4], [17.15, 39.1], [16.6, 39.6], [17.2, 40.4], [18.0, 40.0], [18.4, 39.8], [18.5, 40.15], [17.9, 40.6], [16.9, 41.1], [15.9, 41.6], [16.2, 41.9], [14.2, 42.5], [13.5, 43.6], [12.6, 44.1], [12.3, 45.4], [13.7, 45.7], [13.6, 45.0], [14.4, 45.3], [15.2, 44.2], [16.4, 43.5], [17.6, 43.0], [18.5, 42.4], [19.4, 41.9], [19.5, 40.8], [19.3, 40.3], [20.0, 39.7], [20.2, 39.5], [20.7, 38.95], [21.1, 38.3], [21.6, 37.6], [21.7, 36.8], [22.4, 36.4], [23.2, 36.4], [22.9, 37.5], [24.0, 37.7], [23.0, 38.2], [24.0, 38.5], [22.9, 40.5], [24.0, 40.8], [26.0, 40.6], [26.7, 40.35], [26.2, 40.05], [26.1, 39.5], [26.6, 39.3], [26.9, 38.7], [26.3, 38.25], [26.9, 38.0], [27.3, 37.3], [27.6, 36.7], [28.6, 36.7], [29.6, 36.2], [30.6, 36.8], [31.6, 36.7], [32.6, 36.1], [33.6, 36.2], [34.6, 36.8], [35.9, 36.5], [36.2, 35.9], [35.9, 35.4], [35.6, 34.6], [35.0, 33.0], [34.6, 31.5], [32.0, 31.0], [29.9, 31.2], [25.0, 31.6], [23.0, 32.6], [20.1, 32.1], [19.0, 30.3], [16.5, 31.2], [15.2, 32.3], [13.2, 32.9], [11.1, 33.2], [10.1, 34.3], [10.8, 34.7], [11.1, 35.8], [11.0, 37.1], [10.3, 36.9], [9.9, 37.3], [8.6, 36.9], [7.8, 36.9], [3.0, 36.8], [-0.6, 35.7], [-2.2, 35.1], [-5.3, 35.9], [-7, 35], [-7, 37]];
const ISLANDS = [
  [[12.4, 37.8], [13.3, 38.2], [15.6, 38.3], [15.1, 37.4], [15.1, 36.7], [14.5, 36.8], [12.4, 37.6]],
  [[8.4, 41.1], [9.6, 41.1], [9.8, 40.0], [9.6, 39.1], [8.9, 38.9], [8.4, 39.0], [8.4, 40.5]],
  [[9.4, 43.0], [9.5, 42.0], [9.2, 41.4], [8.6, 41.9], [8.6, 42.6]],
  [[23.5, 35.6], [26.3, 35.3], [25.9, 35.0], [23.6, 35.2]],
  [[2.4, 39.6], [3.4, 39.8], [3.2, 39.3], [2.6, 39.4]],
  [[32.3, 35.0], [34.0, 35.6], [34.6, 35.0], [32.6, 34.6]],
  [[19.65, 39.8], [20.1, 39.65], [19.95, 39.4], [19.75, 39.6]],
];
const MEDM = { x: 520, y: 820, lon: 16, lat: 38.5, k: 22 };
const MEDZ = { x: 520, y: 830, lon: 13.5, lat: 40.5, k: 42 };
function medMap(ctx, m) {
  ctx.drawImage(paperTex('#d9c393', 'mapland'), 0, 0); ctx.fillStyle = '#d9c393'; ctx.fillRect(-500, -500, W + 1000, 500); ctx.fillRect(-500, H, W + 1000, 500); ctx.fillRect(-500, 0, 500, H); ctx.fillRect(W, 0, 500, H);
  [MED, SEA_BLACK, SEA_MARMARA].forEach(s => seaArea(ctx, m, s));
  ISLANDS.forEach(p => drawLand(ctx, m, p, '#d9c393'));
}
// Preveze yakın harita
const PVM = { x: 470, y: 820, lon: 20.85, lat: 38.93, k: 1100 };
const PV_SEA = [[19.9, 39.6], [20.62, 39.2], [20.68, 39.05], [20.73, 38.975], [20.745, 38.957], [20.765, 38.953], [20.82, 38.97], [20.9, 39.03], [21.0, 39.05], [21.1, 39.03], [21.17, 38.98], [21.15, 38.92], [21.05, 38.88], [20.95, 38.9], [20.87, 38.87], [20.8, 38.9], [20.775, 38.94], [20.758, 38.946], [20.74, 38.94], [20.72, 38.92], [20.70, 38.88], [20.71, 38.83], [20.65, 38.80], [20.6, 38.5], [19.9, 38.4]];
const LEFKADA = [[20.71, 38.845], [20.73, 38.83], [20.72, 38.75], [20.70, 38.66], [20.68, 38.62], [20.62, 38.6], [20.55, 38.56], [20.57, 38.65], [20.60, 38.75], [20.64, 38.82]];
function pvMap(ctx) {
  ctx.drawImage(paperTex('#d9c393', 'mapland'), 0, 0); ctx.fillStyle = '#d9c393'; ctx.fillRect(-500, -500, W + 1000, 500); ctx.fillRect(-500, H, W + 1000, 500);
  seaArea(ctx, PVM, PV_SEA); drawLand(ctx, PVM, LEFKADA, '#d9c393');
  mountains(ctx, PVM, [[20.95, 39.12], [21.08, 39.13], [20.9, 38.8], [21.05, 38.8], [20.82, 39.1]]);
}
// ---- gemiler ----
// kadırga (yan görünüş): kürekli, latin yelkenli. dir: 1 sağa
function kadirga(ctx, x, y, s, lt, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y + Math.sin(lt * 2.4 + x * .01) * 5); ctx.rotate(Math.sin(lt * 1.7 + x) * .02); ctx.scale(s * dir, s);
  const row = o.row === undefined ? 1 : o.row;
  for (let i = 0; i < 12; i++) { const ox = -190 + i * 34; const a = Math.sin(lt * 7 * row + i * .1) * .45 * row; line(ctx, [[ox, -20], [ox - 20 + Math.sin(a) * 50, 46 + Math.cos(a) * 8]], '#5a3a20', 5, .2); }
  shape(ctx, [[-250, -44], [210, -44], [310, -64], [222, -24], [196, 8], [-214, 8], [-256, -22]], o.hull || '#7a3b26', C.ink, 5, .6);
  line(ctx, [[-240, -36], [204, -36]], C.gold, 5, .3);
  shape(ctx, [[-248, -44], [-248, -96], [-178, -96], [-170, -44]], '#a5482c', C.ink, 4, .4);
  line(ctx, [[30, -44], [30, -300]], '#4a3020', 8, .3);
  const sw = Math.sin(lt * 3) * 8 * (o.wind === undefined ? 1 : o.wind);
  line(ctx, [[-110, -80], [170, -330]], '#4a3020', 6, .3);
  shape(ctx, [[-96, -92], [160, -318], [120 + sw, -170], [70 + sw, -96]], o.sail || '#efe4cc', C.ink, 4, .6);
  line(ctx, [[-226, -96], [-226, -186]], '#4a3020', 5, .2);
  const fw = Math.sin(lt * 7 + x) * 10; shape(ctx, [[-226, -186], [-150, -174 + fw], [-226, -150]], o.flag || C.red, C.ink, 3, .4);
  for (let i = 0; i < 6; i++) { ell(ctx, -130 + i * 50, -58, 10, 10, C.skin, C.ink, 2); ell(ctx, -130 + i * 50, -68, 11, 7, '#f6f1e6', C.ink, 2); }
  if (o.fire > 0 && o.fire < 1) { const k = o.fire; ctx.globalAlpha = 1 - k; shape(ctx, [[310, -64], [370 + k * 40, -96], [356, -60], [390 + k * 50, -40], [314, -50]], '#f8d25a', '#e2572b', 4, 3); ctx.globalAlpha = 1; }
  ctx.restore();
}
// kalyon (yan görünüş): kare yelkenler; wind 1: şişkin, 0: sarkık
function kalyon(ctx, x, y, s, lt, o = {}) {
  const dir = o.dir || 1, wind = o.wind === undefined ? 1 : o.wind;
  ctx.save(); ctx.translate(x, y + Math.sin(lt * 1.8 + x * .01) * 4); ctx.rotate(Math.sin(lt * 1.3 + x) * .015); ctx.scale(s * dir, s);
  shape(ctx, [[-250, -150], [-180, -150], [-176, -70], [160, -70], [190, -110], [250, -110], [226, 0], [180, 40], [-200, 40], [-240, -20]], o.hull || '#5a3a28', C.ink, 5, .6);
  line(ctx, [[-226, -20], [222, -20]], C.gold, 5, .3);
  for (let i = 0; i < 8; i++) shape(ctx, [[-170 + i * 44, -12], [-150 + i * 44, -12], [-150 + i * 44, 8], [-170 + i * 44, 8]], '#2a1d15', null);
  [[-110, 330, 70], [20, 400, 86], [150, 310, 64]].forEach(([mx, mh, w], j) => {
    line(ctx, [[mx, -70], [mx, -70 - mh]], '#4a3020', 9, .3);
    for (let k = 0; k < 2; k++) {
      const top = -100 - mh * (k ? .48 : .02) - (k ? 0 : 0), hgt = mh * .36, ww = w * (k ? .8 : 1);
      const t0 = -70 - mh + (k ? 20 : mh * .42), b0 = t0 + hgt;
      const bul = 34 * wind * (1 + Math.sin(lt * 3 + j) * .08) * (o.dirWind || 1);
      line(ctx, [[mx - ww - 8, t0], [mx + ww + 8, t0]], '#4a3020', 6, .2);
      ctx.beginPath(); ctx.moveTo(mx - ww, t0); ctx.lineTo(mx + ww, t0);
      if (wind > .05) { ctx.quadraticCurveTo(mx + ww + bul, (t0 + b0) / 2, mx + ww, b0); ctx.quadraticCurveTo(mx, b0 + bul * .4, mx - ww, b0); ctx.quadraticCurveTo(mx - ww + bul, (t0 + b0) / 2, mx - ww, t0); }
      else { const sag = Math.sin(lt * 1.5 + j + k) * 3; ctx.lineTo(mx + ww * .8, b0 - 10 + sag); ctx.lineTo(mx, b0 - 22); ctx.lineTo(mx - ww * .8, b0 - 10 - sag); ctx.closePath(); }
      ctx.fillStyle = '#efe4cc'; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.stroke();
      if (wind <= .05) for (let q = -1; q <= 1; q++) line(ctx, [[mx + q * ww * .4, t0 + 6], [mx + q * ww * .35, b0 - 26]], 'rgba(42,29,21,.35)', 2, .2);
    }
    const fw = Math.sin(lt * 6 + j) * 12 * Math.max(wind, .15); shape(ctx, [[mx, -70 - mh], [mx + 60 * Math.max(wind, .35), -60 - mh + fw], [mx, -40 - mh]], o.flag || '#3e5f8a', C.ink, 3, .3);
  });
  if (o.lights) o.lights.forEach((on, i) => fener(ctx, -220 + i * 40, -160, .55, on, lt + i));
  ctx.restore();
}
// fener: on 0..1 (1 yanar)
function fener(ctx, x, y, s, on, lt) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (on > 0) { const g = ctx.createRadialGradient(0, 30, 4, 0, 30, 140); g.addColorStop(0, `rgba(255,210,120,${.6 * on})`); g.addColorStop(1, 'rgba(255,210,120,0)'); ctx.fillStyle = g; ctx.fillRect(-150, -110, 300, 280); }
  line(ctx, [[0, -40], [0, -10]], C.ink, 4, .2);
  shape(ctx, [[-22, -10], [22, -10], [26, 60], [-26, 60]], on > 0 ? `rgba(248,210,90,${.4 + .6 * on})` : '#6a6050', C.ink, 4, .3);
  shape(ctx, [[-30, -10], [0, -30], [30, -10]], '#6e4a2c', C.ink, 3, .3); line(ctx, [[-28, 60], [28, 60]], C.ink, 6, .2);
  if (on > 0) { const f = 1 + Math.sin(lt * 18) * .12; shape(ctx, [[-8 * f, 46], [0, 10 - 6 * f], [8 * f, 46]], '#e2572b', null); }
  ctx.restore();
}
// kuş bakışı gemi simgesi
function shipTop(ctx, x, y, s, ang, col, lt, oars = false) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  if (oars) for (let i = 0; i < 5; i++) { const a = Math.sin(lt * 8 + i) * 6; line(ctx, [[-24 + i * 12, -10], [-28 + i * 12 + a, -26]], C.ink, 2.5, .1); line(ctx, [[-24 + i * 12, 10], [-28 + i * 12 + a, 26]], C.ink, 2.5, .1); }
  shape(ctx, [[-40, 0], [-32, -12], [28, -12], [50, 0], [28, 12], [-32, 12]], col, C.ink, 3, .3);
  line(ctx, [[-20, 0], [24, 0]], 'rgba(255,255,255,.5)', 3, .1);
  ctx.restore();
}
function seaSide(ctx, lt, o = {}) { // yan görünüş deniz + gök
  const g = ctx.createLinearGradient(0, 0, 0, 1000); g.addColorStop(0, o.top || '#e6d3a8'); g.addColorStop(1, o.bot || '#f3e6c6'); ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, 1500);
  if (o.sun) { const sg = ctx.createRadialGradient(780, 900, 20, 780, 900, 420); sg.addColorStop(0, 'rgba(240,170,80,.7)'); sg.addColorStop(1, 'rgba(240,170,80,0)'); ctx.fillStyle = sg; ctx.fillRect(-300, 300, W + 600, 900); ell(ctx, 780, 920, 90, 90, '#e8a24a', null); }
  if (!o.noClouds) for (let i = 0; i < 4; i++) { const x = ((lt * (o.cloud === undefined ? 30 : o.cloud) + i * 330) % 1500) - 250, y = 300 + (i % 2) * 120; ctx.globalAlpha = o.dark ? .15 : .5; ell(ctx, x, y, 110, 26, '#fff8e8', null); ell(ctx, x + 60, y - 18, 70, 24, '#fff8e8', null); } ctx.globalAlpha = 1;
  const y0 = o.y0 || 1000; ctx.fillStyle = o.sea || '#7fa6b4'; ctx.fillRect(-300, y0, W + 600, H);
  ctx.strokeStyle = o.dark ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.45)'; ctx.lineWidth = 4; const sp = o.calm ? 8 : 40;
  for (let r = 0; r < 12; r++) for (let i = 0; i < 9; i++) { const x = ((i * 150 + r * 70 + lt * sp * (r % 2 ? 1 : -1)) % 1500 + 1500) % 1500 - 200, y = y0 + 30 + r * 60; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 20, y - (o.calm ? 3 : 10), x + 40, y); ctx.stroke(); }
}
function smoke(ctx, lt, x, y, t0, n = 10, c = 'rgba(235,228,214,.85)') {
  const k = lt - t0; if (k < 0) return;
  for (let i = 0; i < n; i++) { const a = hash(i + x) * Math.PI * 2; const r = 20 + k * (60 + hash(i) * 70); ctx.globalAlpha = clamp(1 - k / 3.2) * .85; ell(ctx, x + Math.cos(a) * r * .8 + k * 40, y + Math.sin(a) * r * .4 - k * 30, 34 + k * 30, 26 + k * 22, c, null); }
  ctx.globalAlpha = 1;
}
function windLines(ctx, lt, amt = 1) { if (amt <= 0) return; ctx.save(); ctx.globalAlpha = .6 * amt; for (let i = 0; i < 8; i++) { const x = ((lt * 600 + i * 260) % 1600) - 300, y = 260 + i * 90; line(ctx, [[x, y], [x + 140, y - 4], [x + 200, y + 10]], '#fff8e8', 6, .3); } ctx.restore(); }
// Andrea Doria büstü (temsili): bere, uzun ak sakal, siyah giysi
function doria(ctx, x, y, s, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], '#2a2a32', C.ink, 6);
  shape(ctx, [[-130, 80], [-40, 52], [-30, 120], [-120, 150]], '#6e4a2c', C.ink, 5); shape(ctx, [[130, 80], [40, 52], [30, 120], [120, 150]], '#6e4a2c', C.ink, 5);
  for (let i = 0; i < 9; i++) { const a = Math.PI * (.15 + i / 8 * .7); ell(ctx, Math.cos(a) * 110, 60 + Math.sin(a) * 120, 8, 8, C.gold, C.ink, 2); }
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 64, 80, C.skin, C.ink, 6);
  ell(ctx, -24, -48, 6, 7, C.ink, null); ell(ctx, 24, -48, 6, 7, C.ink, null);
  line(ctx, [[-42, -66], [-12, -62]], '#9a948a', 6); line(ctx, [[12, -62], [42, -66]], '#9a948a', 6);
  line(ctx, [[0, -42], [-6, -12], [6, -10]], C.ink, 4);
  shape(ctx, [[-62, -24], [-58, 30], [-30, 100], [0, 150], [30, 100], [58, 30], [62, -24], [36, 6], [0, 12], [-36, 6]], '#e6e0d4', C.ink, 4);
  shape(ctx, [[0, 4], [-34, 10], [-50, 24], [-24, 20], [0, 16], [24, 20], [50, 24], [34, 10]], '#e6e0d4', C.ink, 3);
  shape(ctx, [[-78, -84], [-70, -120], [-30, -138], [40, -136], [82, -112], [88, -84], [40, -96], [-40, -96]], '#1e1e24', C.ink, 5);
  ctx.restore();
}
function horse(ctx, x, y, s, dir = 1, ph = 0, color = '#3a2e24', amp = .7) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  const L = (ang, hx, hy) => { const a2 = ang * .6 - .3; const kx = hx + Math.sin(ang) * 46, ky = hy + Math.cos(ang) * 46; line(ctx, [[hx, hy], [kx, ky], [kx + Math.sin(a2) * 46, ky + Math.cos(a2) * 46]], color, 12, .5); };
  const sw = Math.sin(ph) * amp, cw = Math.cos(ph) * amp;
  L(sw, 55, -10); L(-sw, 70, -10); L(cw, -60, -10); L(-cw, -45, -10);
  ctx.translate(0, Math.sin(ph * 2) * 4);
  ell(ctx, 0, -40, 92, 40, color, null);
  const hb = Math.sin(ph * .8) * 3;
  shape(ctx, [[44, -70], [72, -112], [98, -146], [120, -160 + hb], [146, -154 + hb], [166, -130 + hb], [164, -118 + hb], [142, -122 + hb], [122, -110], [104, -76], [92, -30]], color, null);
  shape(ctx, [[116, -154 + hb], [122, -180 + hb], [132, -156 + hb]], color, null);
  shape(ctx, [[-88, -50], [-128, -34 + Math.sin(ph * 1.3) * 10], [-138, 14 + Math.sin(ph * 1.3) * 12], [-104, -32]], '#1a120c', null);
  shape(ctx, [[-38, -78], [34, -78], [40, -40], [-44, -40]], C.red, C.ink, 3, .4);
  // ulak
  shape(ctx, [[-16, -74], [-20, -150], [16, -156], [24, -78]], '#2d4a7a', C.ink, 3, .4);
  ell(ctx, 2, -174, 17, 19, C.skin, C.ink, 3); ell(ctx, 2, -192, 18, 10, '#f6f1e6', C.ink, 3);
  ctx.restore();
}
function tug(ctx, x, y, h, lt, col = '#2a1d15') {
  line(ctx, [[x, y], [x, y - h]], '#6e4a2c', 10, .4); ell(ctx, x, y - h - 10, 14, 14, C.gold, C.ink, 4);
  for (let i = 0; i < 7; i++) { const a = (i - 3) * 6; const sw = Math.sin(lt * 4 + i * .6) * 22; line(ctx, [[x, y - h + 10], [x + a + sw * .5 + 20, y - h + 70], [x + a + sw + 40, y - h + 150]], i % 2 ? col : '#5a4632', 9, .4); }
}
// modern fırkateyn silüeti (bayrak flagPole ile)
function firkateyn(ctx, x, y, s, lt) {
  ctx.save(); ctx.translate(x, y + Math.sin(lt * 2) * 4); ctx.scale(s, s);
  shape(ctx, [[-300, -40], [280, -40], [330, -70], [300, 20], [-270, 20]], '#7d8a94', C.ink, 5, .4);
  shape(ctx, [[-180, -40], [-180, -110], [60, -110], [60, -40]], '#94a1aa', C.ink, 4, .3);
  shape(ctx, [[-120, -110], [-120, -170], [10, -170], [10, -110]], '#a7b3ba', C.ink, 4, .3);
  line(ctx, [[-50, -170], [-50, -280]], '#4a5056', 6, .2); line(ctx, [[-80, -240], [-20, -240]], '#4a5056', 5, .2);
  shape(ctx, [[150, -40], [150, -64], [200, -64], [200, -40]], '#94a1aa', C.ink, 3, .2); line(ctx, [[200, -54], [260, -60]], '#4a5056', 6, .2);
  for (let i = 0; i < 6; i++) ell(ctx, -150 + i * 34, -76, 8, 8, '#2a3038', null);
  ctx.restore();
}
function rain(ctx, lt, amt = 1) { ctx.save(); ctx.globalAlpha = .55 * amt; ctx.strokeStyle = '#c8d4dc'; ctx.lineWidth = 3; for (let i = 0; i < 120; i++) { const x = (hash(i) * 1400 + lt * 200) % 1400 - 160, y = ((hash(i + 7) * 2000 + lt * 1500) % 2000) - 100; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 14, y + 46); ctx.stroke(); } ctx.restore(); }

const SCENES = [
  { s: 0, e: 2.93, draw(ctx, lt, d) { // HOOK — gece denizi, Haçlı gemilerinin fenerleri tek tek söner, gemiler karanlığa kaçar
    shake(ctx, lt, 0, 18, .3);
    const z = lt < .3 ? lerp(1.16, 1.0, eOut(lt / .3)) : lerp(1.0, 1.07, eInOut((lt - .3) / (d - .3)));
    ctx.translate(W / 2, 1050); ctx.scale(z, z); ctx.translate(-W / 2, -1050);
    seaSide(ctx, lt, { y0: 1180, top: '#070b16', bot: '#1d2a44', sea: '#101b2e', dark: true, noClouds: true });
    for (let i = 0; i < 60; i++) { const tw = .4 + .6 * Math.abs(Math.sin(lt * 3 + i * 1.7)); ctx.globalAlpha = tw * .8; ell(ctx, hash(i) * W, 120 + hash(i + 9) * 900, 2.5, 2.5, '#fff8e0', null); } ctx.globalAlpha = 1;
    const mg = ctx.createRadialGradient(820, 720, 10, 820, 720, 260); mg.addColorStop(0, 'rgba(240,235,210,.35)'); mg.addColorStop(1, 'rgba(240,235,210,0)'); ctx.fillStyle = mg; ctx.fillRect(500, 400, 700, 700);
    ell(ctx, 820, 720, 54, 54, '#efe9d2', null); ell(ctx, 804, 706, 12, 10, 'rgba(180,175,150,.5)', null); ell(ctx, 838, 738, 9, 8, 'rgba(180,175,150,.5)', null); ell(ctx, 830, 700, 6, 5, 'rgba(180,175,150,.45)', null);
    // ay yansıması
    for (let i = 0; i < 8; i++) { const w = 70 - i * 6 + Math.sin(lt * 5 + i) * 14; line(ctx, [[800 - w, 1200 + i * 26], [800 + w, 1200 + i * 26]], 'rgba(240,235,210,.3)', 5, .3); }
    const off = (t0) => 1 - clamp((lt - t0) / .18);
    // gemiler: [x, y, ölçek, lt kayması, fener sönme zamanları]
    const ships = [[200 - lt * 40, 1190, .4, 1, [.3, .5, .7]], [930 - lt * 40, 1180, .32, 3, [.85, 1.05, 1.25]], [640 - lt * 70, 1340, .95, 2, [1.45, 1.75, 2.05, 2.35]]];
    { const oc = document.createElement('canvas'); oc.width = W; oc.height = H; const g3 = oc.getContext('2d'); g3.setTransform(ctx.getTransform());
      ships.forEach(([x, y, sc, o]) => kalyon(g3, x, y, sc, lt + o, { hull: '#1c1712', dir: -1, flag: '#3b4b6a' }));
      g3.setTransform(1, 0, 0, 1, 0, 0); g3.globalCompositeOperation = 'source-atop'; g3.fillStyle = 'rgba(22,32,62,.55)'; g3.fillRect(0, 0, W, H);
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(oc, 0, 0); ctx.restore(); }
    // fenerler (karartmanın üstünde parlar)
    ships.forEach(([x, y, sc, o, ts]) => { const yy = y + Math.sin((lt + o) * 1.8 + x * .01) * 4; ts.forEach((t0, i) => fener(ctx, x - sc * (-220 + i * 40) * 1, yy + sc * -160, .55 * sc * (sc < .5 ? 1.6 : 1), off(t0), lt + i)); });
    // ön plan dalgaları
    for (let r = 0; r < 3; r++) { ctx.save(); ctx.strokeStyle = 'rgba(160,190,220,.35)'; ctx.lineWidth = 5; for (let i = 0; i < 8; i++) { const x = ((i * 170 + lt * (90 + r * 40)) % 1400) - 200, y = 1400 + r * 50; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 40, y - 16, x + 80, y); ctx.stroke(); } ctx.restore(); }
    // karanlık vinyet (fenerler söndükçe artar)
    const dk = clamp((lt - 1.5) / 1.2) * .4; const vg = ctx.createLinearGradient(0, 700, 0, 1300); vg.addColorStop(0, 'rgba(3,5,12,0)'); vg.addColorStop(1, `rgba(3,5,12,${dk})`); ctx.fillStyle = vg; ctx.fillRect(-200, 700, W + 400, 1300);
    hookText(ctx, lt + .6, 'Haçlı donanması, fenerlerini söndürüp kaçtı!', { style: 'split', key: 'FENER', y: 420 });
  } },
  { s: 2.93, e: 5.77, draw(ctx, lt, d) { // 1538, Papa'nın çağrısı
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 850);
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = C.gold; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .25; ctx.beginPath(); ctx.moveTo(W / 2, 900); ctx.arc(W / 2, 900, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    bigText(ctx, '1538', W / 2, 360, 170, C.red, lt, 0, F_SANS, [C.cream, 14]);
    for (let i = 0; i < 4; i++) { const k = eInOut(prog(lt, .6 + i * .25, 1.3)); const ang = -Math.PI / 2 + (i - 1.5) * .7; letter(ctx, W / 2 - 40 + Math.cos(ang) * 420 * k, 900 + Math.sin(ang) * 120 * k + k * 260, .9, Math.sin(lt * 4 + i) * .2); }
    letter(ctx, W / 2 - 40, 900, 1.6, Math.sin(lt * 2) * .05);
    tag(ctx, 'PAPA\'NIN ÇAĞRISI', W / 2, 560, 64, lt, .8, C.ink);
  } },
  { s: 5.77, e: 8.71, draw(ctx, lt, d) { // Haçlı ittifakı: harita okları
    camera(ctx, lt, d, 1, 1.08, 520, 830); medMap(ctx, MEDZ);
    const tgt = proj(MEDZ, 19.9, 39.6);
    const src = [[12.33, 45.44, 'VENEDİK', 0], [8.93, 44.41, 'CENEVİZ', .25], [12.5, 41.9, 'PAPALIK', .5], [2.17, 41.38, 'İSPANYA', .75]];
    src.forEach(([lo, la, nm, dl]) => { const p = proj(MEDZ, lo, la); pin(ctx, ...p, .8, lt, dl, '#3e5f8a'); arrow(ctx, curvePts(p, [(p[0] + tgt[0]) / 2, Math.max(p[1], tgt[1]) + 60], tgt), eInOut(prog(lt, dl + .2, 1.4)), '#3e5f8a', 9, true); tag(ctx, nm, p[0], p[1] - 110, 36, lt, dl + .1, '#3e5f8a'); });
    tag(ctx, 'HAÇLI İTTİFAKI', W / 2, 320, 72, lt, 0, C.ink);
  } },
  { s: 8.71, e: 11.3, draw(ctx, lt, d) { // gemiler bir araya gelir
    seaSide(ctx, lt, { y0: 980 }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    const k = eOut(prog(lt, 0, 2.2));
    kalyon(ctx, lerp(-200, 200, k), 1060, .55, lt, { flag: '#3e5f8a' }); kalyon(ctx, lerp(1300, 820, k), 1070, .55, lt, { flag: C.gold, dir: -1 });
    kalyon(ctx, lerp(-300, 480, k), 1230, .7, lt, { flag: '#6a4a8c' });
    kadirga(ctx, lerp(1400, 760, k), 1310, .55, lt, { dir: -1, flag: '#3e5f8a', hull: '#3b3a4a' });
    tag(ctx, 'VENEDİK · İSPANYA · CENEVİZ · PAPALIK', W / 2, 320, 44, lt, 0, '#3e5f8a');
    stampBox(ctx, 'BİR ARAYA GELDİ', W / 2, 500, 84, C.red, lt, 1.2, -5);
  } },
  { s: 11.3, e: 14.0, draw(ctx, lt, d) { // Andrea Doria
    seaSide(ctx, lt, { y0: 1150, top: '#d9c4a0' }); camera(ctx, lt, d, 1, 1.06, W / 2, 850);
    kalyon(ctx, 150 + lt * 30, 1180, .5, lt, { flag: '#3e5f8a' }); kalyon(ctx, 900 - lt * 20, 1190, .45, lt, { flag: C.gold, dir: -1 });
    const p = eBack(prog(lt, 0, .5)); if (p > 0) doria(ctx, W / 2 - 40, 830 + (1 - p) * 180, 1.05 * p);
    tag(ctx, 'ÜNLÜ AMİRAL', W / 2, 320, 62, lt, .1, C.ink);
    tag(ctx, 'ANDREA DORIA', W / 2, 1240, 74, lt, .9, '#3e5f8a', C.cream, 2);
  } },
  { s: 14.0, e: 16.61, draw(ctx, lt, d) { // hedef: Akdeniz
    camera(ctx, lt, d, 1.05, 1, 520, 820); medMap(ctx, MEDM);
    const pu = .4 + Math.sin(lt * 6) * .2; ctx.save(); ctx.globalAlpha = pu; drawLand(ctx, MEDM, ANATOLIA, C.red); drawLand(ctx, MEDM, THRACE, C.red); ctx.restore();
    const a = proj(MEDM, 4, 41), b = proj(MEDM, 22, 37.5);
    arrow(ctx, curvePts(a, [(a[0] + b[0]) / 2, a[1] - 140], b), eInOut(prog(lt, .2, 1.4)), '#3e5f8a', 14);
    tag(ctx, 'HEDEF', W / 2, 320, 70, lt, 0, C.ink);
    stampBox(ctx, 'AKDENİZ', W / 2, 1180, 110, C.red, lt, 1.5, -6);
  } },
  { s: 16.61, e: 20.02, draw(ctx, lt, d) { // Barbaros Hayreddin Paşa
    seaSide(ctx, lt, { y0: 1150, top: '#e2c99a' }); camera(ctx, lt, d, 1, 1.06, W / 2, 850);
    ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = C.gold; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .25; ctx.beginPath(); ctx.moveTo(W / 2, 820); ctx.arc(W / 2, 820, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    tug(ctx, 150, 1170, 560, lt); tug(ctx, 870, 1170, 560, lt + 1.3);
    kadirga(ctx, 200 + lt * 40, 1200, .45, lt); kadirga(ctx, 860 - lt * 30, 1210, .4, lt, { dir: -1 });
    const p = eBack(prog(lt, 0, .5)); if (p > 0) padisah(ctx, W / 2 - 20, 840 + (1 - p) * 180, 1.0 * p, { kaftan: '#2d4a7a', beard: '#b5502a' });
    tag(ctx, 'KAPTAN-I DERYA', W / 2, 320, 62, lt, .1, C.ink);
    tag(ctx, 'BARBAROS HAYREDDİN PAŞA', W / 2, 1250, 56, lt, 1.6, C.red, C.cream, 2);
  } },
  { s: 20.02, e: 22.61, draw(ctx, lt, d) { // donanma çok daha küçük
    seaSide(ctx, lt, { y0: 760, noClouds: true }); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    const k = eOut(prog(lt, .1, 1.4));
    for (let i = 0; i < 4; i++) shipTop(ctx, 170 + (i % 2) * 90, 900 + i * 100 + Math.sin(lt * 2 + i) * 6, 1.4, 0, C.red, lt, true);
    let n = 0; for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) { if (n++ > k * 24) continue; shipTop(ctx, 560 + c * 100, 880 + r * 72 + Math.sin(lt * 2 + r + c) * 5, 1.15, Math.PI, '#3e5f8a', lt); }
    tag(ctx, 'OSMANLI', 215, 1310, 48, lt, .2, C.red); tag(ctx, 'HAÇLILAR', 710, 1310, 48, lt, .4, '#3e5f8a');
    stampBox(ctx, 'ÇOK DAHA KÜÇÜK', W / 2, 400, 86, C.red, lt, 1.3, -5);
  } },
  { s: 22.61, e: 25.3, draw(ctx, lt, d) { // Preveze körfezine çeker
    camera(ctx, lt, d, 1, 1.1, ...proj(PVM, 20.76, 38.95)); pvMap(ctx);
    const path = [proj(PVM, 20.45, 39.05), proj(PVM, 20.66, 38.98), proj(PVM, 20.752, 38.952), proj(PVM, 20.85, 38.96), proj(PVM, 20.98, 38.97)];
    arrow(ctx, path, eInOut(prog(lt, .2, 1.8)), C.red, 12);
    const k = eInOut(prog(lt, .2, 1.8)); const q = partial(path, Math.max(.01, k)); const hp = q[q.length - 1];
    for (let i = 0; i < 3; i++) shipTop(ctx, hp[0] - 50 - i * 46, hp[1] + (i - 1) * 24, .9, .1, C.red, lt, true);
    const pv = proj(PVM, 20.751, 38.958); pin(ctx, pv[0], pv[1] - 10, 1, lt, .1, C.ink);
    tag(ctx, 'PREVEZE', pv[0], pv[1] - 130, 48, lt, .2, C.ink);
    tag(ctx, 'NARTA KÖRFEZİ', ...proj(PVM, 21.0, 38.84), 40, lt, 1.0, '#3d6676');
    tag(ctx, 'BARBAROS KÖRFEZDE', W / 2, 320, 62, lt, 0, C.red);
  } },
  { s: 25.3, e: 28.06, draw(ctx, lt, d) { // Doria dar körfeze giremez (yan görünüş)
    seaSide(ctx, lt, { y0: 1040 }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    shape(ctx, [[-200, 1060], [-200, 760], [100, 700], [330, 820], [400, 1060]], '#b39a6c', C.ink, 5, 1);
    shape(ctx, [[1300, 1060], [1300, 740], [960, 700], [700, 840], [640, 1060]], '#a8905f', C.ink, 5, 1);
    shape(ctx, [[110, 700], [110, 610], [260, 610], [260, 700]], '#cdb68a', C.ink, 5, .6); for (let i = 110; i < 260; i += 30) shape(ctx, [[i, 610], [i, 590], [i + 16, 590], [i + 16, 610]], '#cdb68a', C.ink, 3, .3);
    const fw = Math.sin(lt * 6) * 8; line(ctx, [[185, 590], [185, 500]], '#4a3020', 5, .2); shape(ctx, [[185, 500], [250, 512 + fw], [185, 530]], C.red, C.ink, 3, .3);
    const hes = Math.sin(lt * 2.4) * 50; kalyon(ctx, 520 + hes * .3, 1200, .62, lt, { flag: '#3e5f8a', dir: -1 });
    arrow(ctx, [[520, 1340], [520 - 120 - hes, 1340]], 1, '#3e5f8a', 10, true);
    tag(ctx, 'DAR KÖRFEZ', W / 2, 320, 70, lt, 0, C.ink);
    stampBox(ctx, 'CESARET EDEMEDİ', W / 2, 480, 80, C.red, lt, 1.4, -5);
  } },
  { s: 28.06, e: 31.14, draw(ctx, lt, d) { // 28 Eylül sabahı açık denize
    seaSide(ctx, lt, { y0: 1000, sun: true, top: '#e9c79a', bot: '#f5dfb4' }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    const k = eInOut(prog(lt, 0, d));
    kadirga(ctx, lerp(-100, 380, k), 1150, .62, lt); kadirga(ctx, lerp(-400, 120, k), 1290, .7, lt + .4);
    sealPro(ctx, '28 Eylül 1538', 'Preveze açıkları', W / 2, 470, 160, C.red, lt, .2, 'SABAH');
  } },
  { s: 31.14, e: 33.27, draw(ctx, lt, d) { // savaş düzeni (kuş bakışı)
    ctx.drawImage(paperTex('#9fc0c8', 'seatop'), 0, 0); camera(ctx, lt, d, 1, 1.08, W / 2, 850);
    ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 4; for (let r = 0; r < 20; r++) for (let i = 0; i < 8; i++) { const x = ((i * 160 + r * 60 + lt * 30) % 1400) - 160, y = 200 + r * 70; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 20, y - 8, x + 40, y); ctx.stroke(); }
    const k = eInOut(prog(lt, 0, 1.6));
    for (let i = 0; i < 13; i++) { const j = i - 6; const tx = W / 2 - 40 + j * 62, ty = 760 + Math.abs(j) * 52; const sx = W / 2 - 40 + (hash(i) - .5) * 300, sy = 1300 + hash(i + 2) * 100; shipTop(ctx, lerp(sx, tx, k), lerp(sy, ty, k), 1.1, -Math.PI / 2, C.red, lt, true); }
    tag(ctx, 'SAVAŞ DÜZENİ', W / 2, 320, 72, lt, 0, C.red);
  } },
  { s: 33.27, e: 35.46, draw(ctx, lt, d) { // rüzgâr durur
    const wind = 1 - eInOut(prog(lt, .4, .9));
    seaSide(ctx, lt, { y0: 1050, cloud: 30 * wind + 2, calm: wind < .5 }); shake(ctx, lt, 1.0, 10); camera(ctx, lt, d, 1, 1.1, W / 2, 900);
    windLines(ctx, lt, wind);
    kalyon(ctx, W / 2 - 40, 1150, 1.0, lt, { flag: '#3e5f8a', wind });
    stampBox(ctx, 'RÜZGÂR DURDU!', W / 2, 330, 96, C.red, lt, 1.0, -6);
  } },
  { s: 35.46, e: 37.78, draw(ctx, lt, d) { // dev yelkenliler olduğu yerde
    seaSide(ctx, lt, { y0: 1020, cloud: 2, calm: true }); camera(ctx, lt, d, 1.08, 1, W / 2, 950);
    kalyon(ctx, 240, 1100, .62, lt, { flag: '#3e5f8a', wind: 0 }); kalyon(ctx, 720, 1120, .62, lt, { flag: C.gold, wind: 0, dir: -1 }); kalyon(ctx, 470, 1280, .72, lt, { flag: '#6a4a8c', wind: 0 });
    for (let i = 0; i < 3; i++) { const x = ((lt * 90 + i * 400) % 1400) - 200, y = 520 + i * 60 + Math.sin(lt * 3 + i) * 10; line(ctx, [[x - 22, y - 8 + Math.sin(lt * 10 + i) * 6], [x, y], [x + 22, y - 8 + Math.sin(lt * 10 + i) * 6]], C.ink, 4, .2); }
    tag(ctx, 'DEV YELKENLİLER', W / 2, 320, 66, lt, 0, '#3e5f8a');
    tag(ctx, 'OLDUĞU YERDE KALDI', W / 2, 450, 56, lt, .7, C.ink, C.cream, 2);
  } },
  { s: 37.78, e: 40.02, draw(ctx, lt, d) { // kadırgalar kürekle yaklaşır
    seaSide(ctx, lt, { y0: 1000, cloud: 3, calm: true }); camera(ctx, lt, d, 1, 1.08, 600, 1000);
    kalyon(ctx, 900, 1080, .5, lt, { flag: '#3e5f8a', wind: 0, dir: -1 });
    const k = eOut(prog(lt, 0, d)); kadirga(ctx, lerp(-150, 330, k), 1180, .78, lt, { row: 1.6 }); kadirga(ctx, lerp(-450, 60, k), 1300, .7, lt + .3, { row: 1.6 });
    tag(ctx, 'OSMANLI KADIRGALARI', W / 2, 320, 62, lt, 0, C.red);
    stampBox(ctx, 'KÜREKLE!', W / 2, 500, 100, C.red, lt, 1.0, -6);
  } },
  { s: 40.02, e: 42.83, draw(ctx, lt, d) { // toplar ateşlenir
    seaSide(ctx, lt, { y0: 1000, cloud: 3, calm: true }); shake(ctx, lt, .3, 18); shake(ctx, lt, 1.1, 14); camera(ctx, lt, d, 1.05, 1, 600, 1000);
    const hit = prog(lt, .5, .6);
    kalyon(ctx, 820, 1100 + hit * 10, .62, lt, { flag: '#3e5f8a', wind: 0, dir: -1 });
    kadirga(ctx, 260, 1220, .78, lt, { fire: prog(lt, .25, .5) }); kadirga(ctx, 120, 1340, .6, lt + .3, { fire: prog(lt, 1.0, .5) });
    for (let i = 0; i < 2; i++) { const p = prog(lt, .3 + i * .75, .5); if (p > 0 && p < 1) ell(ctx, lerp(500, 780, p), lerp(1170, 1040, p) - Math.sin(p * Math.PI) * 60, 14, 14, C.ink, null); }
    smoke(ctx, lt, 520, 1160, .3); smoke(ctx, lt, 360, 1300, 1.05); smoke(ctx, lt, 800, 1020, .8, 8, 'rgba(90,80,70,.5)');
    if (lt > .8) fire(ctx, 760, 1000, .8 + Math.sin(lt * 5) * .1, lt);
    stampBox(ctx, 'ATEŞ!', W / 2, 340, 130, C.red, lt, .25, -6);
  } },
  { s: 42.83, e: 44.72, draw(ctx, lt, d) { // Haçlı saflarında düzen bozulur
    ctx.drawImage(paperTex('#9fc0c8', 'seatop'), 0, 0); shake(ctx, lt, .2, 10); camera(ctx, lt, d, 1, 1.08, W / 2, 850);
    const k = eOut(prog(lt, .1, 1.6));
    for (let i = 0; i < 16; i++) { const r = Math.floor(i / 4), c = i % 4; const bx = 300 + c * 120, by = 640 + r * 110; const a = hash(i) * Math.PI * 2; shipTop(ctx, bx + Math.cos(a) * 220 * k, by + Math.sin(a) * 160 * k, 1.15, Math.PI + (hash(i + 5) - .5) * 4 * k, '#3e5f8a', lt); }
    for (let i = 0; i < 5; i++) shipTop(ctx, 200 + i * 140, 1250 - k * 80, 1.1, -Math.PI / 2, C.red, lt, true);
    tag(ctx, 'DÜZEN BOZULDU', W / 2, 320, 72, lt, 0, '#3e5f8a');
  } },
  { s: 44.72, e: 46.7, draw(ctx, lt, d) { // gece çöker, yağmur
    const nk = eInOut(prog(lt, 0, 1.0));
    seaSide(ctx, lt, { y0: 1040, top: nk > .5 ? '#1c2232' : '#6a5a50', bot: nk > .5 ? '#3a4050' : '#a08060', sea: nk > .5 ? '#2c3e4a' : '#5f8090', dark: true });
    ctx.fillStyle = `rgba(10,14,24,${.5 * (1 - Math.abs(nk - .5) * 2)})`; ctx.fillRect(-300, -300, W + 600, H + 600);
    camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    kalyon(ctx, 320, 1130, .6, lt, { flag: '#3e5f8a', wind: .6, hull: '#3a2a20' }); kalyon(ctx, 760, 1180, .55, lt + 1, { flag: C.gold, wind: .6, dir: -1, hull: '#3a2a20' });
    rain(ctx, lt, nk);
    if (lt > 1.2 && lt < 1.35) { ctx.fillStyle = 'rgba(255,255,240,.5)'; ctx.fillRect(-300, -300, W + 600, H + 600); }
    tag(ctx, 'GECE VE YAĞMUR', W / 2, 330, 70, lt, .1, C.cream, C.ink);
  } },
  { s: 46.7, e: 49.38, draw(ctx, lt, d) { // Doria fenerleri söndürüp kaçar
    seaSide(ctx, lt, { y0: 1040, top: '#141b2c', bot: '#2c3444', sea: '#22323e', dark: true });
    camera(ctx, lt, d, 1, 1.08, W / 2, 1000);
    const k = eInOut(prog(lt, .3, d - .3));
    const lights = [0, 1, 2, 3].map(i => 1 - clamp((lt - (.4 + i * .35)) / .2));
    kalyon(ctx, lerp(560, 120, k), 1170, .78, lt, { flag: '#3e5f8a', wind: .8, dir: -1, hull: '#2a2020', lights });
    rain(ctx, lt, .8);
    tag(ctx, 'FENERLER SÖNDÜ', W / 2, 330, 68, lt, .1, C.cream, C.ink);
    tag(ctx, 'DORIA KAÇTI', W / 2, 480, 76, lt, 1.7, C.red, C.cream, 3);
  } },
  { s: 49.38, e: 51.23, draw(ctx, lt, d) { // zafer haberi Kanuni'ye
    const g = ctx.createLinearGradient(0, 0, 0, 1100); g.addColorStop(0, '#e6d3a8'); g.addColorStop(1, '#f1e3c2'); ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, H + 600);
    camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    shape(ctx, [[-300, 1080], [300, 1050], [700, 1080], [1400, 1050], [1400, 2200], [-300, 2200]], '#b7a06a', C.ink, 5, 1.2);
    dust(ctx, lt, lerp(-100, 760, lt / d) - 150, 1180, 10);
    horse(ctx, lerp(-100, 760, lt / d), 1200, 1.1, 1, lt * 14);
    letter(ctx, lerp(-100, 760, lt / d) + 40, 960 + Math.sin(lt * 14) * 4, .55, .2);
    tag(ctx, 'ZAFER HABERİ', W / 2, 330, 72, lt, 0, C.red);
    tag(ctx, 'KANUNİ\'YE MÜJDE', W / 2, 470, 58, lt, .5, C.ink, C.cream, 2);
  } },
  { s: 51.23, e: 53.95, draw(ctx, lt, d) { // Akdeniz'in hâkimi
    camera(ctx, lt, d, 1, 1.06, 520, 820); medMap(ctx, MEDM);
    const ships = [[14, 37], [18, 35], [22, 34.5], [26, 34], [10, 38.5], [20, 39], [30, 34.5], [5, 38.5], [16, 33.5]];
    ships.forEach(([lo, la], i) => { const k = eOut(prog(lt, .1 + i * .15, .5)); if (k <= 0) return; const p = proj(MEDM, lo, la); shipTop(ctx, p[0] + Math.sin(lt * 2 + i) * 6, p[1], .7 * k, Math.sin(lt + i) * .3, C.red, lt, true); });
    tag(ctx, 'AKDENİZ\'İN HÂKİMİ', W / 2, 320, 70, lt, 0, C.red);
    stampBox(ctx, 'OSMANLI', W / 2, 1180, 110, C.red, lt, 1.4, -6);
  } },
  { s: 53.95, e: 56.56, draw(ctx, lt, d) { // otuz yılı aşkın
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.05, W / 2, 850);
    const k = eInOut(prog(lt, .2, 1.8));
    line(ctx, [[170, 760], [170 + 600 * k, 760]], C.red, 18, .5);
    [[170, '1538'], [770, '1571']].forEach(([x, s], i) => { if (i === 0 || k > .95) { ell(ctx, x, 760, 28, 28, i ? C.ink : C.red, C.ink, 5); tag(ctx, s, x, 860, 56, lt, i ? 1.9 : .1, i ? C.ink : C.red); } });
    if (k > .95) text(ctx, 'İnebahtı\'ya kadar', 770, 940, 34, 'rgba(42,29,21,.85)', F_SANS, 700);
    kadirga(ctx, 170 + 600 * k, 690, .38, lt);
    ctx.fillStyle = '#7fa6b4'; ctx.fillRect(-200, 1180, W + 400, 800);
    for (let i = 0; i < 3; i++) kadirga(ctx, ((lt * 90 + i * 380) % 1400) - 200, 1230 + (i % 2) * 70, .5, lt + i);
    stampBox(ctx, '30 YILI AŞKIN', W / 2, 420, 100, C.red, lt, 1.3, -5);
  } },
  { s: 56.56, e: 60.01, draw(ctx, lt, d) { // 28 Eylül Deniz Kuvvetleri Günü
    seaSide(ctx, lt, { y0: 1060, top: '#cfe0e8', bot: '#eef3f0', sea: '#5f8fa8' }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    firkateyn(ctx, 560 + lt * 20, 1150, 1.05, lt);
    flagPole(ctx, 560 + lt * 20 - 270, 1110, 230, 110, .7, lt);
    sealPro(ctx, 'Deniz Kuvvetleri Günü', '28 Eylül · Preveze Zaferi', W / 2, 530, 190, '#1f3f6a', lt, .2, 'HER YIL');
  } },
  { s: 60.01, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    ctx.save(); ctx.globalAlpha = .15; ctx.fillStyle = C.gold; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .2; ctx.beginPath(); ctx.moveTo(W / 2, 1000); ctx.arc(W / 2, 1000, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    kadirga(ctx, lerp(120, 560, eInOut(lt / d)), 1120, .9, lt);
    bigText(ctx, 'RÜZGÂR DURDU...', W / 2, 380, 92, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'AKDENİZ\'DE YENİ BİR ÇAĞ', W / 2, 540, 60, lt, 1.0, C.ink, C.cream);
  } },
];
