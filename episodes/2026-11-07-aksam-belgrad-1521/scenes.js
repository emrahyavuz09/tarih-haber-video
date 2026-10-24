// ===== Belgrad'ın fethi 1521: Kanuni'nin ilk seferi (akşam) =====
const KEY = ['BELGRAD', 'BELGRAD.', 'BELGRAD\'I', 'KANUNİ', 'SÜLEYMAN', 'MURAD,', 'FATİH', 'HUNYADİ', 'DÜŞMEDİ.', 'İLK', 'SEFER-İ', 'BÖĞÜRDELEN', 'ZEMUN\'U', 'PÎRÎ', 'TOPLAR', 'DÜŞTÜ.', 'MOHAÇ\'TA', 'AĞUSTOS\'TA,', 'AĞUSTOS\'TA...', 'ÜSSÜYDÜ.', 'MACARİSTAN\'IN', 'TUNA', 'SAVA'];
const DURATION = 58.75 + 2.2;
const OUTRO_AT = DURATION - 1.6;
function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
const HUN = '#3e5f8a';
function geoMap(ctx, m, geo, o = {}) {
  drawSea(ctx, [-400, -400, W + 800, H + 800]);
  const polys = []; geo.forEach(c => c.r.forEach(r => polys.push(r.map(p => proj(m, p[0], p[1])))));
  polys.forEach(P => shape(ctx, P, null, C.ink, 7, .5));
  polys.forEach(P => shape(ctx, P, '#e2cd9c', null, 0, .5));
}
const BK = { x: 520, y: 820, lon: 20.5, lat: 45, k: 70 };
const PB = (lon, lat) => proj(BK, lon, lat);
const DANUBE = [[16.37, 48.2], [17.1, 48.1], [18.0, 47.75], [18.9, 47.8], [19.05, 47.5], [18.95, 46.8], [18.85, 46.3], [18.68, 45.99], [19.0, 45.4], [20.0, 45.25], [20.46, 44.82], [21.4, 44.7], [22.5, 44.6], [22.9, 44.0], [24.0, 43.7], [25.9, 43.8], [27.2, 44.1], [28.2, 45.4], [29.6, 45.2]];
const SAVA = [[14.5, 46.0], [15.6, 45.85], [16.4, 45.4], [17.2, 45.15], [18.2, 45.1], [19.0, 44.95], [19.7, 44.78], [20.46, 44.82]];
function bkMap(ctx, o = {}) {
  geoMap(ctx, BK, GEO_BLK);
  line(ctx, partial(DANUBE.map(p => PB(...p)), o.dan === undefined ? 1 : o.dan), '#4f8fa6', 12, .6);
  line(ctx, partial(SAVA.map(p => PB(...p)), o.sava === undefined ? 1 : o.sava), '#4f8fa6', 10, .6);
  mountains(ctx, BK, [[23.5, 45.6], [25, 45.5], [22.5, 46.6], [24, 47.3], [21.5, 43.2], [19, 43.5], [23, 42.5], [17.5, 44.3], [20.5, 42.4]]);
}
// Belgrad yakın plan (şematik): Sava ile Tuna'nın birleştiği burun
const DAN_L = [[380, -200], [420, 200], [470, 520], [560, 760], [760, 830], [1300, 800]];
const SAVA_L = [[-200, 1180], [150, 1060], [380, 930], [560, 780]];
function localMap(ctx, lt) {
  ctx.drawImage(paperTex('#d9c393', 'mapland'), 0, 0); ctx.fillStyle = '#d9c393'; ctx.fillRect(-400, -400, W + 800, 400); ctx.fillRect(-400, H, W + 800, 400); ctx.fillRect(-400, -400, 400, H + 800); ctx.fillRect(W, -400, 400, H + 800);
  [[DAN_L, 120], [SAVA_L, 90]].forEach(([pts, w]) => { const P = curvePts(pts[0], pts[1], pts[2], 10).concat(pts.slice(2)); line(ctx, P, C.ink, w + 10, .4); line(ctx, P, '#8fb8c6', w, .4);
    ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 3; for (let i = 0; i < pts.length - 1; i++) { const k = (lt * .3 + i * .2) % 1; const x = lerp(pts[i][0], pts[i + 1][0], k), y = lerp(pts[i][1], pts[i + 1][1], k); ctx.beginPath(); ctx.moveTo(x - 14, y); ctx.quadraticCurveTo(x, y - 8, x + 14, y); ctx.stroke(); } ctx.restore(); });
  [[900, 1150], [820, 1250], [250, 1250], [180, 380], [880, 560]].forEach(([x, y], i) => { const h = 26 + (i % 2) * 8; shape(ctx, [[x - h, y + h * .6], [x, y - h * .6], [x + h, y + h * .6]], '#b3a07c', C.ink, 3, .4); });
  tag(ctx, 'TUNA', 300, 220, 38, 1, 0, '#3d6676', C.cream, 0); tag(ctx, 'SAVA', 160, 1010, 38, 1, 0, '#3d6676', C.cream, 0);
}
// Belgrad kalesi (tepe üstünde). o: {dmg 0..1, flag: 'hu'|'ot', lt}
function kale(ctx, x, y, s, o = {}) {
  const lt = o.lt || 0, dmg = o.dmg || 0; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-440, 120], [-320, 10], [-140, -30], [120, -24], [320, 20], [440, 120]], '#a08a5c', C.ink, 5, 1);
  shape(ctx, [[-300, 20], [-300, -150], [280, -150], [280, 20]], '#cdb68a', C.ink, 6, .8);
  for (let i = -300; i < 280; i += 40) { if (dmg > 0 && hash(i) < dmg * .7) continue; shape(ctx, [[i, -150], [i, -176], [i + 22, -176], [i + 22, -150]], '#cdb68a', C.ink, 4, .5); }
  [[-300, -250], [280, -250], [-10, -300], [-150, -220], [140, -220]].forEach(([tx, th], j) => { shape(ctx, [[tx - 44, 20], [tx - 44, th], [tx + 44, th], [tx + 44, 20]], '#bfa577', C.ink, 6, .8);
    for (let q = -44; q < 44; q += 22) { if (dmg > 0 && hash(q + j * 7) < dmg * .6) continue; shape(ctx, [[tx + q, th], [tx + q, th - 22], [tx + q + 13, th - 22], [tx + q + 13, th]], '#bfa577', C.ink, 3, .4); }
    shape(ctx, [[tx - 10, th + 50], [tx - 10, th + 26], [tx, th + 18], [tx + 10, th + 26], [tx + 10, th + 50]], '#3b2a1e', null); });
  shape(ctx, [[-50, 20], [-50, -60], [-26, -84], [26, -84], [50, -60], [50, 20]], '#3b2a1e', C.ink, 4, .5);
  if (dmg > 0) { for (let i = 0; i < 6; i++) { const cx = -260 + hash(i * 3) * 520, cy = -120 + hash(i * 5) * 100; if (hash(i * 9) > dmg) continue; line(ctx, [[cx, cy], [cx + 14, cy + 22], [cx + 4, cy + 40], [cx + 18, cy + 64]], C.ink, 4, .4); } }
  if (o.flag === 'hu') [[-300, -250], [280, -250], [-10, -300]].forEach(([tx, th], j) => { line(ctx, [[tx, th - 22], [tx, th - 110]], '#6e4a2c', 6, .2); const w = Math.sin(lt * 6 + j) * 8; shape(ctx, [[tx, th - 110], [tx + 70, th - 96 + w], [tx, th - 76]], HUN, C.ink, 3, .3); });
  if (o.flag === 'ot') [[-300, -250], [280, -250], [-10, -300]].forEach(([tx, th], j) => { const r = eOut(clamp(o.rise === undefined ? 1 : o.rise)); line(ctx, [[tx, th - 22], [tx, th - 22 - 110 * r]], '#6e4a2c', 6, .2); const w = Math.sin(lt * 6 + j) * 8; if (r > .3) shape(ctx, [[tx, th - 22 - 110 * r], [tx + 80, th - 22 - 110 * r + 18 + w], [tx, th - 22 - 110 * r + 40]], C.red, C.ink, 3, .3); });
  ctx.restore();
}
function dusk(ctx, lt, o = {}) {
  const sky = ctx.createLinearGradient(0, 0, 0, 1100); sky.addColorStop(0, o.top || '#e6d3a8'); sky.addColorStop(1, o.bot || '#f1e3c2');
  ctx.fillStyle = sky; ctx.fillRect(-300, -300, W + 600, 1500);
  for (let i = 0; i < 4; i++) { const x = ((lt * 28 + i * 330) % 1500) - 250, y = 300 + (i % 2) * 130; ctx.globalAlpha = o.dark ? .12 : .45; ell(ctx, x, y, 110, 26, '#fff8e8', null); ell(ctx, x + 60, y - 18, 70, 24, '#fff8e8', null); }
  ctx.globalAlpha = 1;
  shape(ctx, [[-300, 1050], [200, 1030], [600, 1060], [1000, 1025], [1400, 1050], [1400, 2200], [-300, 2200]], o.ground || '#b7a06a', C.ink, 5, 1.2);
  ctx.strokeStyle = 'rgba(70,55,25,.35)'; ctx.lineWidth = 3;
  for (let i = 0; i < 36; i++) { const x = hash(i) * W, y = 1080 + hash(i + 9) * 600; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6 + Math.sin(lt * 3 + i) * 4, y - 20); ctx.stroke(); }
}
function horseBody(ctx, ph, color, amp = .7) {
  const L = (ang, hx, hy) => { const a2 = ang * .6 - .3; const kx = hx + Math.sin(ang) * 46, ky = hy + Math.cos(ang) * 46; line(ctx, [[hx, hy], [kx, ky], [kx + Math.sin(a2) * 46, ky + Math.cos(a2) * 46]], color, 12, .5); };
  const sw = Math.sin(ph) * amp, cw = Math.cos(ph) * amp;
  L(sw, 55, -10); L(-sw, 70, -10); L(cw, -60, -10); L(-cw, -45, -10);
  const hb = Math.sin(ph * 2) * 3;
  ell(ctx, 0, -40, 92, 40, color, null);
  shape(ctx, [[44, -70], [72, -112], [98, -146], [120, -160 + hb], [146, -154 + hb], [166, -130 + hb], [164, -118 + hb], [142, -122 + hb], [122, -110], [104, -76], [92, -30]], color, null);
  shape(ctx, [[116, -154 + hb], [122, -180 + hb], [132, -156 + hb]], color, null);
  shape(ctx, [[-88, -50], [-128, -34 + Math.sin(ph) * 10], [-138, 14 + Math.sin(ph) * 12], [-104, -32]], color, null);
}
// zırhlı şövalye (Macar ağır süvarisi)
function knight(ctx, x, y, s, dir, ph, cap = '#3e5f8a', lance = true) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); ctx.translate(0, Math.sin(ph * 2) * 4);
  horseBody(ctx, ph, '#2a1d15');
  shape(ctx, [[-96, -70], [70, -70], [86, -10], [60, 14], [-60, 14], [-100, -14]], cap, C.ink, 4, .6); // örtü
  for (let i = -70; i <= 60; i += 26) line(ctx, [[i, 8], [i + 10, 14]], C.gold, 4, .2);
  shape(ctx, [[-18, -70], [-24, -150], [20, -156], [26, -72]], '#9aa3a8', C.ink, 4, .5);
  ell(ctx, 0, -176, 22, 24, '#9aa3a8', C.ink, 4); line(ctx, [[2, -178], [22, -178]], C.ink, 4, .2);
  shape(ctx, [[-4, -198], [-30, -226 + Math.sin(ph) * 4], [-40, -206], [-12, -194]], C.red, C.ink, 3, .5);
  if (lance) { line(ctx, [[-40, -110], [210, -150]], '#6e4a2c', 7, .2); shape(ctx, [[150, -142], [176, -146], [150, -126 + Math.sin(ph * 2) * 6]], C.gold, C.ink, 2, .3); }
  ctx.restore();
}
// yeniçeri: mavi dolama, beyaz börk, tüfek
function yeniceri(ctx, x, y, s, lt = 0, aim = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(0, Math.sin(lt * 2 + x) * 1.5);
  shape(ctx, [[-34, 0], [-30, -70], [-18, -92], [18, -92], [30, -70], [34, 0]], '#2d4a7a', C.ink, 4, .6);
  line(ctx, [[-30, -40], [30, -40]], C.red, 7, .3);
  ell(ctx, 0, -112, 20, 22, C.skin, C.ink, 4);
  line(ctx, [[-10, -104], [0, -101], [10, -104]], C.ink, 4, .2);
  shape(ctx, [[-20, -128], [-18, -168], [-44, -214], [-30, -222], [8, -170], [20, -128]], '#f6f1e6', C.ink, 4, .6);
  shape(ctx, [[-22, -134], [22, -134], [22, -124], [-22, -124]], C.gold, C.ink, 3, .3);
  const a = -0.25 * aim; line(ctx, [[-10, -60], [-10 + Math.cos(a) * 110, -60 + Math.sin(a) * 110]], '#4a3020', 7, .2);
  ctx.restore();
}
// top (sahra topu); fire: 0..1 atış anı
function cannon(ctx, x, y, s, fire = 0, lt = 0) {
  ctx.save(); ctx.translate(x - Math.sin(clamp(fire) * Math.PI) * 18 * s, y); ctx.scale(s, s);
  shape(ctx, [[-70, -20], [-60, -36], [80, -54], [96, -50], [96, -26], [80, -24], [-60, -6]], '#b8892f', C.ink, 4, .6);
  line(ctx, [[0, -40], [0, -14]], '#7a5a22', 4, .2);
  shape(ctx, [[-90, 0], [-40, -20], [40, -16], [30, 6]], '#6e4a2c', C.ink, 4, .5);
  ell(ctx, -6, 4, 34, 34, '#8b6a45', C.ink, 5); ell(ctx, -6, 4, 8, 8, C.ink, null);
  if (fire > 0 && fire < 1) {
    const k = fire; ctx.globalAlpha = 1 - k;
    shape(ctx, [[96, -38], [150 + k * 40, -70], [140, -38], [170 + k * 60, -20], [100, -30]], '#f8d25a', '#e2572b', 4, 3);
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}
function smoke(ctx, lt, x, y, t0, n = 10, c = 'rgba(235,228,214,.8)') {
  const k = lt - t0; if (k < 0) return;
  for (let i = 0; i < n; i++) { const a = hash(i + x) * Math.PI * 2; const r = 20 + k * (60 + hash(i) * 70); ctx.globalAlpha = clamp(1 - k / 3.2) * .85; ell(ctx, x + Math.cos(a) * r * .8 + k * 40, y + Math.sin(a) * r * .4 - k * 30, 34 + k * 30, 26 + k * 22, c, null); }
  ctx.globalAlpha = 1;
}
// genç kral (II. Layoş): sakalsız, omuz boyu saç, taç
function layos(ctx, x, y, s, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], o.robe || '#3e5f8a', C.ink, 6);
  shape(ctx, [[-120, 78], [-40, 52], [40, 52], [120, 78], [100, 120], [-100, 120]], '#f3efe6', C.ink, 5);
  for (let i = -3; i <= 3; i++) ell(ctx, i * 28, 96, 5, 5, C.ink, null);
  shape(ctx, [[-76, -60], [-84, 40], [-50, 60], [50, 60], [84, 40], [76, -60]], '#a0703a', C.ink, 5); // saç arka
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 64, 80, C.skin, C.ink, 6);
  ell(ctx, -24, -46, 6, 7, C.ink, null); ell(ctx, 24, -46, 6, 7, C.ink, null);
  line(ctx, [[-42, -66], [-12, -64]], '#7a5a32', 6); line(ctx, [[12, -64], [42, -66]], '#7a5a32', 6);
  line(ctx, [[0, -40], [-5, -12], [6, -10]], C.ink, 4);
  line(ctx, [[-14, 18], [0, 20], [14, 18]], C.ink, 4);
  shape(ctx, [[-66, -78], [-70, -110], [-40, -122], [40, -122], [70, -110], [66, -78], [40, -96], [0, -100], [-40, -96]], '#a0703a', C.ink, 4); // perçem
  shape(ctx, [[-70, -110], [-70, -160], [-46, -138], [-24, -172], [0, -142], [24, -172], [46, -138], [70, -160], [70, -110]], C.gold, C.ink, 5);
  [-46, 0, 46].forEach((px, i) => ell(ctx, px, -124, 8, 9, i === 1 ? '#3e5f8a' : '#b7342a', C.ink, 2));
  ctx.restore();
}
function tug(ctx, x, y, h, lt, col = '#2a1d15') {
  line(ctx, [[x, y], [x, y - h]], '#6e4a2c', 10, .4); ell(ctx, x, y - h - 10, 14, 14, C.gold, C.ink, 4);
  for (let i = 0; i < 7; i++) { const a = (i - 3) * 6; const sw = Math.sin(lt * 4 + i * .6) * 22; line(ctx, [[x, y - h + 10], [x + a + sw * .5 + 20, y - h + 70], [x + a + sw + 40, y - h + 150]], i % 2 ? col : '#5a4632', 9, .4); }
}
function pennant(ctx, x, y, h, lt, col) { // düz renkli flama (simgesiz)
  line(ctx, [[x, y], [x, y - h]], '#6e4a2c', 6, .3);
  const w = Math.sin(lt * 6 + x) * 10; shape(ctx, [[x, y - h], [x + 80, y - h + 18 + w], [x, y - h + 40]], col, C.ink, 3, .4);
}
function hourglass(ctx, x, y, s, k, lt) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-120, -230], [120, -230], [120, -200], [-120, -200]], '#6e4a2c', C.ink, 5, .5);
  shape(ctx, [[-120, 230], [120, 230], [120, 200], [-120, 200]], '#6e4a2c', C.ink, 5, .5);
  const glass = [[-90, -200], [90, -200], [12, 0], [90, 200], [-90, 200], [-12, 0]];
  shape(ctx, glass, 'rgba(220,235,240,.45)', C.ink, 5, .4);
  const top = lerp(-180, -30, k); shape(ctx, [[-90 * (1 - (top + 200) / 200 * .87), top], [90 * (1 - (top + 200) / 200 * .87), top], [10, -6], [-10, -6]], '#d9a630', null);
  const hgt = lerp(10, 150, k); shape(ctx, [[-88, 198], [88, 198], [20, 198 - hgt], [-20, 198 - hgt]], '#d9a630', null);
  line(ctx, [[0, 0], [0, 196 - hgt]], '#d9a630', 5, .3);
  [-100, 100].forEach(px => line(ctx, [[px, -200], [px, 200]], '#6e4a2c', 10, .3));
  ctx.restore();
}
function horse(ctx, x, y, s, dir = 1, ph = 0, color = '#3a2e24', amp = .6) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  const L = (ang, hx, hy) => { const a2 = ang * .6 - .3; const kx = hx + Math.sin(ang) * 46, ky = hy + Math.cos(ang) * 46; line(ctx, [[hx, hy], [kx, ky], [kx + Math.sin(a2) * 46, ky + Math.cos(a2) * 46]], color, 12, .5); };
  const sw = Math.sin(ph) * amp, cw = Math.cos(ph) * amp;
  L(sw, 55, -10); L(-sw, 70, -10); L(cw, -60, -10); L(-cw, -45, -10);
  ell(ctx, 0, -40, 92, 40, color, null);
  const hb = Math.sin(ph * .8) * 3;
  shape(ctx, [[44, -70], [72, -112], [98, -146], [120, -160 + hb], [146, -154 + hb], [166, -130 + hb], [164, -118 + hb], [142, -122 + hb], [122, -110], [104, -76], [92, -30]], color, null);
  shape(ctx, [[116, -154 + hb], [122, -180 + hb], [132, -156 + hb]], color, null);
  ell(ctx, 140, -142 + hb, 3.5, 3.5, '#f3e9d2', null);
  shape(ctx, [[-88, -50], [-128, -34 + Math.sin(ph * 1.3) * 10], [-138, 14 + Math.sin(ph * 1.3) * 12], [-104, -32]], '#1a120c', null);
  shape(ctx, [[-38, -78], [34, -78], [40, -40], [-44, -40]], C.red, C.ink, 3, .4);
  ctx.restore();
}
function otag(ctx, x, y, s, lt, glow = 0, cur = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-300, 0], [-300, -260], [0, -420], [300, -260], [300, 0]], '#b7342a', C.ink, 7, .8);
  shape(ctx, [[-300, -260], [0, -420], [300, -260], [270, -230], [0, -380], [-270, -230]], C.gold, C.ink, 4, .6);
  for (let i = -240; i <= 240; i += 60) line(ctx, [[i, -10], [i * .95, -230 + Math.abs(i) * .1]], 'rgba(255,230,190,.25)', 4, .3);
  line(ctx, [[0, -420], [0, -500]], '#6e4a2c', 8, .3); ell(ctx, 0, -508, 14, 14, C.gold, C.ink, 4);
  // kapı açıklığı
  const dw = 90; shape(ctx, [[-dw, 0], [-dw, -190], [0, -240], [dw, -190], [dw, 0]], '#2a1a12', C.ink, 5, .5);
  if (glow > 0) { const fl = .8 + Math.sin(lt * 11) * .12 + Math.sin(lt * 7) * .08; ctx.save(); ctx.globalAlpha = glow * fl; const g = ctx.createRadialGradient(0, -90, 5, 0, -90, 170); g.addColorStop(0, '#ffe2a0'); g.addColorStop(1, 'rgba(255,190,90,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-dw, 0); ctx.lineTo(-dw, -190); ctx.lineTo(0, -240); ctx.lineTo(dw, -190); ctx.lineTo(dw, 0); ctx.fill(); ctx.restore(); }
  // perdeler (kapanır)
  const pw = lerp(30, dw, cur);
  shape(ctx, [[-dw, 0], [-dw, -190], [-dw + pw, -200], [-dw + pw * .8, 0]], '#7a1f1a', C.ink, 4, .4);
  shape(ctx, [[dw, 0], [dw, -190], [dw - pw, -200], [dw - pw * .8, 0]], '#7a1f1a', C.ink, 4, .4);
  ctx.restore();
}
// sadrazam: kallavi kavuk (uzun beyaz, altın şeritli)
function calendarPage(ctx, x, y, n, label) {
  tornRect(ctx, x - 150, y - 170, 300, 340, C.cream, n + 3);
  shape(ctx, [[x - 150, y - 170], [x + 150, y - 170], [x + 150, y - 100], [x - 150, y - 100]], C.red, null);
  text(ctx, label, x, y - 135, 34, C.cream);
  text(ctx, String(n), x, y + 30, 150, C.ink);
}
function sultanRider(ctx, x, y, s, dir, ph) {
  horse(ctx, x, y, s, dir, ph, '#f1ebe0', .45);
  ctx.save(); ctx.translate(x, y + Math.sin(ph * 2) * 3 * s); ctx.scale(s * dir, s);
  shape(ctx, [[-22, -74], [-26, -150], [20, -156], [28, -78]], '#2f6b4f', C.ink, 3, .4);
  shape(ctx, [[-30, -80], [36, -80], [30, -40], [-36, -40]], '#2f6b4f', C.ink, 3, .4);
  ell(ctx, 2, -172, 18, 20, C.skin, C.ink, 3);
  ell(ctx, 2, -204, 30, 22, '#f6f1e6', C.ink, 3); ell(ctx, 8, -212, 5, 7, C.red, null);
  ctx.restore();
}
function gate(ctx, x, y, s, open) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-380, 0], [-380, -560], [380, -560], [380, 0]], '#cdb68a', C.ink, 7, .8);
  for (let i = -380; i < 380; i += 54) shape(ctx, [[i, -560], [i, -600], [i + 30, -600], [i + 30, -560]], '#cdb68a', C.ink, 4, .4);
  for (let r = 0; r < 6; r++) line(ctx, [[-380, -90 * r], [380, -90 * r]], 'rgba(42,29,21,.25)', 3, .4);
  ctx.save(); ctx.beginPath(); ctx.moveTo(-190, 0); ctx.lineTo(-190, -300); ctx.quadraticCurveTo(0, -460, 190, -300); ctx.lineTo(190, 0); ctx.closePath(); ctx.clip();
  const g = ctx.createLinearGradient(0, -400, 0, 0); g.addColorStop(0, '#f6d9a0'); g.addColorStop(1, '#b7a06a'); ctx.fillStyle = g; ctx.fillRect(-200, -460, 400, 460);
  shape(ctx, [[-200, -80], [-60, -130], [80, -110], [200, -140], [200, 0], [-200, 0]], '#8a7a4a', null);
  const w = 190 * Math.cos(open * 1.35);
  shape(ctx, [[-190, 0], [-190, -400], [-190 + w, -400], [-190 + w, 0]], '#6e4a2c', C.ink, 5, .4);
  shape(ctx, [[190, 0], [190, -400], [190 - w, -400], [190 - w, 0]], '#6e4a2c', C.ink, 5, .4);
  ctx.restore();
  ctx.beginPath(); ctx.moveTo(-190, 0); ctx.lineTo(-190, -300); ctx.quadraticCurveTo(0, -460, 190, -300); ctx.lineTo(190, 0); ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.stroke();
  ctx.restore();
}
function yMarch(ctx, lt, y, s, n, speed = 80, gap = 120) {
  const span = n * gap; for (let i = 0; i < n; i++) { const x = ((lt * speed + i * gap) % span) - 120; yeniceri(ctx, x, y + Math.abs(Math.sin(lt * 8 + i)) * -5, s, lt, 1); }
}
function lightning(ctx, lt, x, y, per = .9) { const k = (lt % per) / per; if (k > .25) return; ctx.save(); ctx.globalAlpha = 1 - k * 4; line(ctx, [[x, y], [x - 30, y + 80], [x + 10, y + 90], [x - 20, y + 190]], '#f8e27a', 10, .2); ctx.restore(); }
const SCENES = [
  { s: 0, e: 2.0, draw(ctx, lt, d) { // AÇILIŞ (slam): Tuna kıyısında Belgrad surları, top ateşi, yıkılan taşlar
    ctx.save(); shake(ctx, lt, 0, 26, .4); shake(ctx, lt, .3, 18, .3); shake(ctx, lt, 1.25, 14, .3);
    const z = lt < .3 ? lerp(1.3, 1.0, eOut(lt / .3)) : lerp(1.0, 1.06, (lt - .3) / (d - .3));
    ctx.translate(W / 2, 1050); ctx.scale(z, z); ctx.translate(-W / 2, -1050);
    dusk(ctx, lt, { top: '#a9483a', bot: '#efb873', ground: '#8f7a4a' });
    kale(ctx, 610, 1010, .86, { flag: 'hu', dmg: clamp(.25 + lt / d * .6), lt });
    // Tuna
    ctx.fillStyle = '#5c8aa0'; ctx.fillRect(-300, 1110, W + 600, 70); line(ctx, [[-300, 1110], [1400, 1110]], C.ink, 4, .6); line(ctx, [[-300, 1180], [1400, 1180]], C.ink, 4, .6);
    for (let i = 0; i < 10; i++) { const x = ((lt * 110 + i * 140) % 1400) - 150; ctx.globalAlpha = .7; line(ctx, [[x, 1140 + (i % 2) * 18], [x + 50, 1140 + (i % 2) * 18]], '#dbeef2', 4, .2); } ctx.globalAlpha = 1;
    // gülleler ve çarpma
    const hits = [[0, 540, 880], [.95, 780, 850]];
    for (const [t0, hx, hy] of hits) {
      const sx = 330, sy = 1225; const k = (lt - t0) / .3;
      if (k >= 0 && k < 1) { const bx = lerp(sx, hx, k), by = lerp(sy, hy, k) - Math.sin(k * Math.PI) * 160; ell(ctx, bx, by, 14, 14, '#2a1d15', null); line(ctx, [[bx - 60, by + 22], [bx - 10, by + 4]], 'rgba(255,255,255,.6)', 6, .2); }
      const ti = lt - t0 - .3; if (ti > 0) {
        if (ti < .22) { ctx.globalAlpha = 1 - ti / .22; for (let r = 0; r < 10; r++) { const a = r / 10 * Math.PI * 2; line(ctx, [[hx + Math.cos(a) * 30, hy + Math.sin(a) * 30], [hx + Math.cos(a) * (70 + ti * 400), hy + Math.sin(a) * (70 + ti * 400)]], '#f8d25a', 8, .3); } ell(ctx, hx, hy, 60, 60, '#f09a2a', null); ctx.globalAlpha = 1; }
        for (let j = 0; j < 7; j++) { const vx = (hash(j + t0 * 9) - .5) * 520, vy = -200 - hash(j + 3) * 260; const x = hx + vx * ti, y = hy + vy * ti + 1300 * ti * ti; if (y > 1150) continue; ctx.save(); ctx.translate(x, y); ctx.rotate(ti * (4 + j)); const b = 16 + hash(j + 7) * 18; shape(ctx, [[-b, -b * .7], [b, -b * .7], [b, b * .7], [-b, b * .7]], '#cdb68a', C.ink, 3, .4); ctx.restore(); }
        smoke(ctx, lt, hx, hy, t0 + .3, 7, 'rgba(90,70,50,.55)');
      }
    }
    // Osmanlı topları
    for (let i = 0; i < 2; i++) { const t0 = i ? .95 : 0; const f = (lt - t0) / .4; cannon(ctx, 190 + i * 130, 1265 + i * 45, 1.2, f, lt); smoke(ctx, lt, 325 + i * 130, 1218 + i * 45, t0, 6); }
    dust(ctx, lt, 230, 1300, 8, 'rgba(90,60,30,.35)');
    ctx.restore();
    hookText(ctx, lt + .6, 'İki padişahın alamadığı kaleyi, Kanuni ilk seferinde aldı!', { style: 'slam', key: 'KANUNİ', y: 420, size: 80 });
  } },
  { s: 2.0, e: 4.15, draw(ctx, lt, d) { // Kanuni ilk seferinde
    dusk(ctx, lt, { top: '#e8c890', bot: '#f6e6c4' }); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    tug(ctx, 170, 1200, 620, lt); tug(ctx, 780, 1200, 620, lt);
    padisah(ctx, W / 2 - 40, 900, 1.25, { kaftan: '#2f6b4f', beard: '#4a3020' });
    tag(ctx, 'KANUNİ SULTAN SÜLEYMAN', W / 2, 330, 58, lt, 0, C.ink);
    stampBox(ctx, 'İLK SEFER', W / 2 - 40, 1270, 80, C.red, lt, 1.2, -5);
  } },
  { s: 4.15, e: 6.94, draw(ctx, lt, d) { // Belgrad: Tuna ile Sava
    camera(ctx, lt, d, 1.0, 1.25, ...PB(20.46, 44.82)); bkMap(ctx, { dan: eInOut(prog(lt, 0, 1.6)), sava: eInOut(prog(lt, .6, 1.6)) });
    const b = PB(20.46, 44.82); pin(ctx, ...b, 1.1, lt, .2, C.red); tag(ctx, 'BELGRAD', b[0] + 20, b[1] + 80, 52, lt, .3, C.red);
    tag(ctx, 'TUNA', ...PB(19.2, 46.6), 40, lt, .8, '#3d6676'); tag(ctx, 'SAVA', ...PB(17.2, 44.6), 40, lt, 1.4, '#3d6676');
  } },
  { s: 6.94, e: 8.85, draw(ctx, lt, d) { // Macaristan'ın kapısı
    dusk(ctx, lt); camera(ctx, lt, d, 1, 1.1, W / 2, 900);
    gate(ctx, W / 2 - 40, 1200, 1.0, eInOut(prog(lt, .2, 1.3)));
    tag(ctx, 'MACARİSTAN\'IN KAPISI', W / 2, 330, 64, lt, 0, HUN);
  } },
  { s: 8.85, e: 11.19, draw(ctx, lt, d) { // 1440 II. Murad
    dusk(ctx, lt, { top: '#d8c49a' }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    kale(ctx, 640, 1010, .75, { flag: 'hu', lt });
    otag(ctx, 200, 1240, .4, lt); otag(ctx, 380, 1290, .32, lt); tug(ctx, 90, 1290, 420, lt);
    for (let i = 0; i < 3; i++) { const k = (lt * 1.1 + i / 3) % 1; arrowShot(ctx, lerp(320, 600, k), lerp(1150, 880, k) - Math.sin(k * Math.PI) * 120, -.7 + k * .9, 60); }
    sealPro(ctx, '1440', 'II. Murad', 300, 560, 115, C.red, lt, .3, 'KUŞATMA');
  } },
  { s: 11.19, e: 13.34, draw(ctx, lt, d) { // altı ay — alamadı
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.05, W / 2, 800);
    const m = Math.min(6, 1 + Math.floor(prog(lt, 0, 1.2) * 6));
    const fl = (lt * 5) % 1; ctx.save(); ctx.translate(W / 2 - 40, 760); ctx.rotate(Math.sin(lt * 3) * .03); calendarPage(ctx, 0, 0, m, 'AY'); ctx.restore();
    if (m < 6) { ctx.save(); ctx.globalAlpha = 1 - fl; ctx.translate(W / 2 - 40 + fl * 200, 760 - fl * 300); ctx.rotate(fl * .8); tornRect(ctx, -150, -170, 300, 340, C.cream, 9); ctx.restore(); }
    shake(ctx, lt, 1.4, 12); stampBox(ctx, 'ALINAMADI', W / 2 - 40, 1150, 96, C.red, lt, 1.35, -7);
    tag(ctx, 'ALTI AY KUŞATMA', W / 2, 330, 64, lt, 0, C.ink);
  } },
  { s: 13.34, e: 15.88, draw(ctx, lt, d) { // 1456 Fatih
    dusk(ctx, lt, { top: '#e0b884', bot: '#f2dcb4' }); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    tug(ctx, 170, 1200, 620, lt); tug(ctx, 780, 1200, 620, lt);
    padisah(ctx, W / 2 - 40, 920, 1.2, { kaftan: '#8a2a22', beard: '#3b2a1e' });
    tag(ctx, 'FATİH SULTAN MEHMED', W / 2, 330, 60, lt, 0, C.ink);
    sealPro(ctx, '1456', 'Belgrad kuşatması', 760, 1230, 95, C.red, lt, .5, 'FATİH');
  } },
  { s: 15.88, e: 17.83, draw(ctx, lt, d) { // bizzat savaştı, yaralandı
    dusk(ctx, lt, { top: '#c98a5a', bot: '#e8c49a', ground: '#9a8454' }); camera(ctx, lt, d, 1, 1.08, W / 2, 1000); shake(ctx, lt, .4, 12);
    for (let i = 0; i < 3; i++) knight(ctx, 1050 - ((lt * 160 + i * 260) % 700), 1220 + i * 40, 1.15, -1, lt * 9 + i);
    for (let i = 0; i < 4; i++) yeniceri(ctx, 110 + i * 105 + Math.sin(lt * 6 + i) * 6, 1270 + (i % 2) * 30, 1.5, lt + i, 1);
    smoke(ctx, (lt % 1.6), 480, 1100, 0, 8);
    tag(ctx, 'BİZZAT SAVAŞTI', W / 2, 330, 64, lt, 0, C.ink);
    stampBox(ctx, 'YARALANDI', W / 2 - 40, 560, 88, C.red, lt, 1.1, -6);
  } },
  { s: 17.83, e: 21.46, draw(ctx, lt, d) { // Hunyadi savunuyordu, kale düşmedi
    dusk(ctx, lt, { top: '#b9a37e', bot: '#e2d2ae' }); camera(ctx, lt, d, 1.05, 1.0, W / 2, 1000);
    kale(ctx, W / 2 - 40, 1150, 1.0, { flag: 'hu', lt });
    for (let i = 0; i < 6; i++) { const x = 220 + i * 90; ctx.save(); ctx.translate(x, 990 + Math.sin(lt * 4 + i) * 3); pawn(ctx, 0, 0, .7, HUN); ctx.restore(); }
    for (let i = 0; i < 5; i++) { const k = (lt * 1.3 + i / 5) % 1; arrowShot(ctx, lerp(300 + i * 80, 150 + i * 160, k), lerp(980, 1320, k), 1.9, 50, HUN); }
    tag(ctx, 'HUNYADİ YANOŞ SAVUNUYOR', W / 2, 330, 56, lt, 0, HUN);
    shake(ctx, lt, 2.9, 10); stampBox(ctx, 'KALE DÜŞMEDİ', W / 2 - 40, 560, 86, C.ink, lt, 2.85, -5);
  } },
  { s: 21.46, e: 24.33, draw(ctx, lt, d) { // 1521 Kanuni
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = C.red; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .2; ctx.beginPath(); ctx.moveTo(W / 2 - 40, 900); ctx.arc(W / 2 - 40, 900, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    throne(ctx, W / 2 - 40, 1230, 1.3, '#2f6b4f');
    tug(ctx, 160, 1260, 640, lt); tug(ctx, 760, 1260, 640, lt);
    sealPro(ctx, '1521', 'Kanuni Sultan Süleyman', W / 2 - 40, 520, 150, C.red, lt, .2, 'İLK SEFER');
  } },
  { s: 24.33, e: 26.65, draw(ctx, lt, d) { // tahta geçeli bir yıl bile olmamıştı
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    ctx.save(); ctx.translate(W / 2 - 40, 860); ctx.rotate(Math.sin(lt * 2) * .05); hourglass(ctx, 0, 0, 1.3, clamp(lt / d * .85), lt); ctx.restore();
    tag(ctx, 'TAHTTA HENÜZ 1 YIL BİLE YOK', W / 2, 330, 52, lt, 0, C.ink);
    sealPro(ctx, '1520', 'Tahta çıkış', 760, 1230, 90, C.ink, lt, .8, 'EYLÜL');
  } },
  { s: 26.65, e: 28.97, draw(ctx, lt, d) { // ilk sefer-i hümayun
    dusk(ctx, lt, { top: '#e8c890' }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    tug(ctx, ((lt * 80 + 300) % 1100) - 100, 1150, 520, lt); tug(ctx, ((lt * 80 + 750) % 1100) - 100, 1150, 520, lt);
    yMarch(ctx, lt, 1180, 1.0, 10, 80, 120); yMarch(ctx, lt + .5, 1310, 1.2, 9, 95, 140);
    dust(ctx, lt, 300, 1300, 12);
    stampBox(ctx, 'SEFER-İ HÜMAYUN', W / 2 - 40, 340, 74, C.red, lt, .1, -4);
  } },
  { s: 28.97, e: 32.73, draw(ctx, lt, d) { // iki kol — Böğürdelen
    ctx.save(); camera(ctx, lt, d, 1.15, 1.22, ...PB(21, 43.9)); bkMap(ctx);
    const so = PB(23.32, 42.7), ni = PB(21.9, 43.32), bo = PB(19.7, 44.75), be = PB(20.46, 44.82);
    arrow(ctx, [so, ni], eInOut(prog(lt, 0, .8)), C.red, 12);
    arrow(ctx, curvePts(ni, PB(20.4, 43.9), bo), eInOut(prog(lt, .8, 1.4)), C.red, 12);
    arrow(ctx, curvePts(ni, PB(21.2, 44.2), PB(20.6, 44.7)), eInOut(prog(lt, .8, 1.4)), '#7a3b26', 12, true);
    pin(ctx, ...be, .8, lt, .5, HUN); tag(ctx, 'BELGRAD', be[0] + 60, be[1] - 50, 30, lt, .6, HUN);
    pin(ctx, ...bo, .8, lt, 2.2, C.red); tag(ctx, 'BÖĞÜRDELEN', bo[0] - 60, bo[1] + 50, 30, lt, 2.4, C.red);
    ctx.restore();
    tag(ctx, 'ORDU İKİ KOLA AYRILDI', W / 2, 330, 58, lt, 0, C.ink);
    sealPro(ctx, '7 Temmuz', 'Böğürdelen', 300, 1150, 85, C.red, lt, 2.8, '1521');
  } },
  { s: 32.73, e: 36.70, draw(ctx, lt, d) { // Pîrî Mehmed Paşa: Zemun, kuşatma
    camera(ctx, lt, d, 1, 1.05, W / 2, 850); localMap(ctx, lt);
    const ze = [250, 640], bel = [700, 1000];
    shape(ctx, [[bel[0] - 70, bel[1] + 20], [bel[0] - 70, bel[1] - 50], [bel[0] - 40, bel[1] - 50], [bel[0] - 40, bel[1] - 80], [bel[0] + 40, bel[1] - 80], [bel[0] + 40, bel[1] - 50], [bel[0] + 70, bel[1] - 50], [bel[0] + 70, bel[1] + 20]], '#cdb68a', C.ink, 5, .5);
    tag(ctx, 'BELGRAD', bel[0], bel[1] + 70, 40, lt, 0, HUN);
    arrow(ctx, curvePts([80, 900], [120, 760], [ze[0] - 20, ze[1] + 40]), eInOut(prog(lt, .1, .9)), C.red, 12);
    pin(ctx, ...ze, .9, lt, .9, C.red); tag(ctx, 'ZEMUN', ze[0], ze[1] + 70, 40, lt, 1.0, C.red);
    const k = eInOut(prog(lt, 1.8, 1.6)); const ring = []; for (let i = 0; i <= 40; i++) { const a = Math.PI * .1 + i / 40 * Math.PI * 1.2; ring.push([bel[0] + Math.cos(a) * 200, bel[1] + Math.sin(a) * 150]); }
    line(ctx, partial(ring, k), C.red, 10, .4);
    for (let i = 0; i < 8; i++) { if (i / 8 > k) continue; const a = Math.PI * .1 + i / 7 * Math.PI * 1.2; pawn(ctx, bel[0] + Math.cos(a) * 240, bel[1] + Math.sin(a) * 180 + Math.sin(lt * 6 + i) * 3, .5, C.red); }
    tag(ctx, 'PÎRÎ MEHMED PAŞA', W / 2, 330, 62, lt, 0, C.ink);
  } },
  { s: 36.70, e: 38.97, draw(ctx, lt, d) { // toplar surları dövdü
    dusk(ctx, lt, { top: '#c9a678', bot: '#e8d2a8' }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    shake(ctx, lt, .3, 14); shake(ctx, lt, 1.0, 12); shake(ctx, lt, 1.7, 12);
    kale(ctx, 660, 1060, .9, { flag: 'hu', dmg: clamp(.2 + lt / d), lt });
    for (let i = 0; i < 3; i++) { const t0 = .2 + i * .7, f = prog(lt, t0, .5); cannon(ctx, 130 + i * 40, 1200 + i * 60, 1.3, f, lt); smoke(ctx, lt, 290 + i * 40, 1150 + i * 60, t0, 7);
      const kb = prog(lt, t0, .45); if (kb > 0 && kb < 1) ell(ctx, lerp(240, 600, kb), lerp(1150 + i * 60, 920, kb) - Math.sin(kb * Math.PI) * 120, 12, 12, C.ink, null); }
    tag(ctx, 'TOPLAR HAFTALARCA DÖVDÜ', W / 2, 330, 56, lt, 0, C.red);
  } },
  { s: 38.97, e: 41.92, draw(ctx, lt, d) { // Macaristan iç sorunlar
    const g = ctx.createLinearGradient(0, 0, 0, 1400); g.addColorStop(0, '#4a5466'); g.addColorStop(1, '#a8a294'); ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, H + 600);
    camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    for (let i = 0; i < 4; i++) { const x = ((lt * 70 + i * 320) % 1500) - 250; ctx.globalAlpha = .6; ell(ctx, x, 470 + (i % 2) * 70, 170, 46, '#3a404c', null); ell(ctx, x + 80, 440 + (i % 2) * 70, 110, 44, '#3a404c', null); ctx.globalAlpha = 1; }
    lightning(ctx, lt, 230, 470, .9); lightning(ctx, lt + .45, 780, 500, .9);
    layos(ctx, W / 2 - 40, 900 + Math.sin(lt * 2) * 4, 1.1, {});
    for (let i = 0; i < 6; i++) { const x = 140 + i * 130, j = Math.max(0, Math.sin(lt * 8 + i * 1.3)) * 14; pawn(ctx, x, 1310 - j, .9, ['#3e5f8a', '#6a4a8c', '#7a3b26'][i % 3]); }
    tag(ctx, 'MACARİSTAN: İÇ SORUNLAR', W / 2, 330, 56, lt, 0, HUN);
    tag(ctx, 'GENÇ KRAL II. LAYOŞ', W / 2, 1190, 40, lt, .5, C.cream, C.ink, 2);
  } },
  { s: 41.92, e: 45.18, draw(ctx, lt, d) { // 29 Ağustos: kale düştü
    dusk(ctx, lt, { top: '#e8a868', bot: '#f6dcb0' }); camera(ctx, lt, d, 1, 1.08, W / 2, 1000);
    const k = prog(lt, 1.0, 1.0); shake(ctx, lt, 1.0, 16);
    kale(ctx, W / 2 - 40, 1150, 1.0, { flag: k < .5 ? 'hu' : 'ot', rise: (k - .5) * 2, dmg: .8, lt });
    if (k > 0 && k < .5) { const f = k * 2; ctx.save(); ctx.translate(W / 2 - 40 - 10, 1150 - 300 - 100 + f * 400); ctx.rotate(f * 2); shape(ctx, [[0, 0], [70, 14], [0, 34]], HUN, C.ink, 3, .3); ctx.restore(); }
    for (let i = 0; i < 2; i++) tug(ctx, 160 + i * 620, 1300, 420, lt);
    dust(ctx, lt, 300, 1200, 10);
    stampBox(ctx, '29 AĞUSTOS 1521', W / 2 - 40, 340, 80, C.red, lt, .2, -5);
    tag(ctx, 'BELGRAD KALESİ DÜŞTÜ', W / 2, 500, 50, lt, 1.6, C.ink);
  } },
  { s: 45.18, e: 47.11, draw(ctx, lt, d) { // ertesi gün
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    const f = eInOut(prog(lt, .3, .7));
    ctx.save(); ctx.translate(W / 2 - 40, 780); calendarPage(ctx, 0, 0, 30, 'AĞUSTOS 1521'); ctx.restore();
    if (f < 1) { ctx.save(); ctx.globalAlpha = 1 - f; ctx.translate(W / 2 - 40 + f * 260, 780 - f * 380); ctx.rotate(f * .9); calendarPage(ctx, 0, 0, 29, 'AĞUSTOS 1521'); ctx.restore(); }
    tag(ctx, 'ERTESİ GÜN', W / 2, 330, 72, lt, 0, C.ink);
  } },
  { s: 47.11, e: 49.28, draw(ctx, lt, d) { // şehre girdi, dolaştı
    dusk(ctx, lt, { top: '#e8c890', bot: '#f6e6c4' }); pan(ctx, lt, d, -60, 0, 1, 1.08, W / 2, 1000);
    kale(ctx, 820, 1020, .55, { flag: 'ot', lt });
    sultanRider(ctx, 120 + lt * 170, 1250, 1.25, 1, lt * 7);
    for (let i = 0; i < 4; i++) yeniceri(ctx, -60 + lt * 170 - i * 110, 1290 + (i % 2) * 20, .95, lt + i, 0);
    tag(ctx, 'GENÇ PADİŞAH ŞEHİRDE', W / 2, 330, 60, lt, 0, C.red);
  } },
  { s: 49.28, e: 53.11, draw(ctx, lt, d) { // Orta Avrupa seferlerinin üssü
    camera(ctx, lt, d, 1.0, 1.08, ...PB(19, 46.3)); bkMap(ctx);
    const be = PB(20.46, 44.82); ell(ctx, be[0], be[1], 40 + Math.sin(lt * 5) * 6, 40 + Math.sin(lt * 5) * 6, 'rgba(183,52,42,.35)', null);
    [[19.04, 47.5, 'BUDİN'], [16.37, 48.2, 'VİYANA'], [18.68, 45.99, 'MOHAÇ']].forEach(([lo, la, n], i) => { arrow(ctx, curvePts(be, PB((20.46 + lo) / 2 + .6, (44.82 + la) / 2), PB(lo, la)), eInOut(prog(lt, .2 + i * .5, 1.2)), C.red, 11, true); tag(ctx, n, ...PB(lo, la + .45), 34, lt, .9 + i * .5, C.ink); });
    pin(ctx, ...be, 1, lt, 0, C.red); tag(ctx, 'BELGRAD', be[0] + 40, be[1] + 70, 44, lt, .1, C.red);
    tag(ctx, 'ORTA AVRUPA\'NIN ÜSSÜ', W / 2, 330, 60, lt, 0, C.ink);
  } },
  { s: 53.11, e: 56.22, draw(ctx, lt, d) { // beş yıl sonra, yine 29 Ağustos
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    const yr = Math.min(1526, 1521 + Math.floor(prog(lt, .2, 1.4) * 6));
    ctx.save(); ctx.translate(W / 2 - 40, 820); ctx.rotate(Math.sin(lt * 3) * .03); calendarPage(ctx, 0, 0, 29, 'AĞUSTOS'); ctx.restore();
    bigText(ctx, String(yr), W / 2 - 40, 500, 140, C.red, 1, 0, F_SANS, [C.ink, 12]);
    tag(ctx, 'BEŞ YIL SONRA', W / 2, 330, 64, lt, 0, C.ink);
    sealPro(ctx, '29', 'Aynı gün', 760, 1180, 90, C.red, lt, 1.8, 'AĞUSTOS');
  } },
  { s: 56.22, e: DURATION, draw(ctx, lt, d) { // Mohaç
    dusk(ctx, lt, { top: '#c98a5a', bot: '#e8c49a', ground: '#9a8454' }); camera(ctx, lt, d, 1, 1.07, W / 2, 1000); shake(ctx, lt, .4, 14);
    for (let i = 0; i < 4; i++) knight(ctx, 1050 - ((lt * 200 + i * 240) % 850), 1200 + (i % 2) * 50, 1.05, -1, lt * 9 + i);
    for (let i = 0; i < 3; i++) { const f = ((lt + i * .5) % 1.5) / .5; cannon(ctx, 110 + i * 30, 1260 + i * 30, 1.0, f, lt); smoke(ctx, (lt + i * .5) % 1.5, 230 + i * 30, 1220 + i * 30, 0, 6); }
    const ck = eOut(prog(lt, 1.0, 1.0)); crown(ctx, lerp(W / 2 - 40, W / 2 + 120, ck), lerp(640, 1080, ck), 1.4, ck * 2.5);
    stampBox(ctx, 'MOHAÇ 1526', W / 2 - 40, 340, 88, C.red, lt, .2, -5);
  } },
];
const GEO_BLK = [{"a":"UKR","r":[[[38.21,47.09],[37.54,47.07],[36.79,46.71],[36.56,46.76],[35.83,46.62],[35.06,46.1],[35.28,46.28],[35.23,46.44],[34.85,46.19],[34.95,45.73],[34.69,45.98],[34.45,45.97],[33.81,46.21],[33.66,46.22],[33.59,46.1],[33.43,46.06],[33.2,46.18],[32.48,46.08],[31.83,46.28],[31.78,46.32],[32.01,46.43],[31.55,46.55],[32.36,46.47],[32.58,46.62],[32.35,46.56],[32.04,46.64],[31.76,47.21],[31.91,46.93],[31.87,46.65],[31.53,46.66],[31.56,46.78],[31.4,46.63],[30.8,46.55],[30.66,46.27],[30.22,45.87],[29.63,45.72],[29.71,45.26],[29.4,45.42],[28.78,45.31],[28.76,45.23],[28.21,45.45],[28.5,45.52],[28.49,45.67],[28.95,46.05],[28.96,46.46],[29.19,46.52],[29.2,46.38],[29.3,46.47],[29.71,46.45],[29.84,46.35],[30.13,46.42],[29.92,46.54],[29.88,46.83],[29.57,46.96],[29.54,47.27],[29.13,47.49],[29.21,47.77],[29.13,47.96],[28.92,47.95],[28.77,48.12],[28.46,48.09],[28.29,48.24],[27.55,48.48],[27.23,48.37],[26.85,48.39],[26.31,48.2],[26.16,47.99],[25.46,47.91],[24.89,47.72],[24.48,47.95],[24.18,47.91],[23.14,48.09],[22.88,47.95],[22.77,48.11],[22.13,48.41],[22.14,48.57],[22.54,49.07],[22.84,49.04],[22.71,49.17],[22.71,49.61],[23.71,50.38],[23.97,50.41],[24.09,50.53],[23.98,50.79],[24.1,50.87],[23.66,51.31],[23.61,51.61],[23.98,51.59],[24.36,51.87],[25.93,51.91],[27.14,51.75],[27.3,51.6],[27.69,51.57],[27.7,51.48],[27.86,51.59],[28.18,51.61],[28.6,51.54],[28.73,51.43],[29.1,51.63],[29.35,51.38],[30.16,51.48],[30.54,51.27],[30.63,51.36],[30.53,51.6],[30.58,51.69],[30.98,52.05],[32.12,52.05],[32.44,52.31],[32.81,52.25],[33.74,52.34],[34.4,51.78],[34.12,51.68],[34.27,51.34],[34.21,51.26],[35.06,51.2],[35.16,51.06],[35.31,51.04],[35.44,50.73],[35.41,50.54],[35.59,50.37],[36.12,50.41],[36.62,50.21],[37.42,50.41],[37.7,50.11],[38.05,49.92],[38.26,50.05],[38.92,49.82],[39.17,49.86],[39.78,49.57],[40.08,49.58],[40.11,49.25],[39.69,49.01],[40.0,48.82],[39.79,48.81],[39.64,48.59],[39.84,48.54],[39.85,48.3],[39.96,48.27],[39.78,47.89],[38.9,47.86],[38.64,47.67],[38.37,47.61],[38.2,47.32],[38.28,47.28],[38.21,47.09]]]},{"a":"TUR","r":[[[41.51,41.52],[42.47,41.44],[42.61,41.58],[42.79,41.56],[43.21,41.2],[43.43,41.16],[43.63,40.93],[43.72,40.72],[43.57,40.48],[43.67,40.13],[44.4,40.0],[44.82,39.65],[44.59,39.77],[44.46,39.67],[44.39,39.42],[44.02,39.38],[44.27,38.84],[44.3,38.39],[44.45,38.33],[44.21,37.91],[44.56,37.74],[44.57,37.44],[44.8,37.27],[44.77,37.14],[44.61,37.18],[44.28,36.98],[44.11,37.3],[43.68,37.23],[42.77,37.37],[42.36,37.11],[42.2,37.3],[41.52,37.09],[40.71,37.1],[39.36,36.68],[38.77,36.69],[38.19,36.9],[37.44,36.64],[37.07,36.65],[36.66,36.8],[36.54,36.46],[36.64,36.23],[36.38,36.17],[36.35,36.0],[36.13,35.83],[35.89,35.92],[35.96,36.0],[35.81,36.31],[36.19,36.66],[36.18,36.81],[36.05,36.91],[35.39,36.58],[34.7,36.82],[33.69,36.18],[32.79,36.04],[32.38,36.18],[32.02,36.54],[31.35,36.8],[30.64,36.87],[30.45,36.27],[30.23,36.31],[29.69,36.16],[29.22,36.32],[28.97,36.72],[28.82,36.68],[28.3,36.81],[28.02,36.63],[28.08,36.75],[27.45,36.71],[28.01,36.83],[28.24,37.03],[27.26,36.98],[27.3,37.13],[27.54,37.16],[27.52,37.25],[27.22,37.39],[27.07,37.66],[27.22,37.73],[27.23,37.98],[26.29,38.28],[26.42,38.37],[26.38,38.62],[26.44,38.64],[26.59,38.56],[26.67,38.34],[26.73,38.42],[27.14,38.45],[26.91,38.48],[26.76,38.71],[27.01,38.89],[26.81,38.96],[26.85,39.12],[26.68,39.29],[26.9,39.55],[26.11,39.47],[26.18,39.99],[26.74,40.4],[27.28,40.46],[27.48,40.32],[27.73,40.33],[27.85,40.38],[27.73,40.48],[27.87,40.51],[27.99,40.49],[27.96,40.37],[29.01,40.39],[28.79,40.53],[28.96,40.63],[29.85,40.76],[29.36,40.81],[29.11,40.94],[29.05,41.01],[29.15,41.22],[31.25,41.11],[31.46,41.32],[32.31,41.73],[33.28,42.0],[34.75,41.96],[35.01,42.06],[35.15,42.03],[35.12,41.89],[35.3,41.73],[35.56,41.63],[36.05,41.68],[36.18,41.43],[36.41,41.27],[36.78,41.36],[37.07,41.18],[38.38,40.92],[39.43,41.11],[40.27,40.96],[41.08,41.26],[41.51,41.52]],[[28.01,41.97],[27.99,41.85],[28.2,41.55],[29.06,41.23],[28.96,41.01],[28.17,41.08],[27.5,40.97],[27.26,40.69],[26.77,40.5],[26.2,40.08],[26.25,40.31],[26.79,40.63],[26.11,40.61],[26.04,40.73],[26.33,40.95],[26.33,41.24],[26.62,41.4],[26.58,41.6],[26.33,41.77],[26.62,41.96],[27.24,42.09],[27.53,41.92],[28.01,41.97]]]},{"a":"SVK","r":[[[22.54,49.07],[22.14,48.57],[22.11,48.39],[21.72,48.35],[21.45,48.55],[20.49,48.53],[20.33,48.3],[19.95,48.15],[19.63,48.22],[19.47,48.11],[18.79,48.0],[18.72,47.79],[17.64,47.81],[17.09,48.04],[16.87,48.39],[17.14,48.84],[17.76,48.89],[18.09,49.07],[18.16,49.26],[18.6,49.49],[18.94,49.5],[18.97,49.4],[19.15,49.4],[19.44,49.6],[19.77,49.37],[19.8,49.19],[20.06,49.18],[20.36,49.39],[20.95,49.32],[21.08,49.42],[21.35,49.43],[21.89,49.34],[22.02,49.21],[22.54,49.07]]]},{"a":"SVN","r":[[[16.52,46.5],[16.32,46.53],[16.23,46.37],[15.64,46.2],[15.65,45.86],[15.28,45.73],[15.34,45.47],[15.24,45.44],[14.79,45.48],[14.57,45.66],[14.37,45.48],[13.62,45.48],[13.87,45.61],[13.58,45.81],[13.6,45.98],[13.49,45.99],[13.63,46.18],[13.38,46.26],[13.7,46.52],[14.55,46.4],[14.89,46.61],[15.96,46.68],[16.09,46.86],[16.28,46.86],[16.52,46.5]]]},{"a":"SRB","r":[[[21.36,44.83],[22.09,44.54],[22.5,44.71],[22.72,44.61],[22.5,44.49],[22.71,44.24],[22.42,44.01],[22.37,43.78],[22.55,43.45],[22.98,43.19],[22.71,42.88],[22.47,42.84],[22.44,42.63],[22.53,42.48],[22.42,42.33],[21.56,42.25],[21.52,42.33],[21.75,42.67],[21.39,42.75],[21.4,42.83],[20.8,43.26],[20.62,43.2],[20.62,43.03],[20.34,42.83],[19.22,43.45],[19.25,43.58],[19.45,43.56],[19.5,43.64],[19.25,43.97],[19.58,44.04],[19.12,44.36],[19.35,44.88],[19.0,44.9],[19.09,44.93],[19.06,45.14],[19.14,45.2],[19.4,45.21],[19.0,45.4],[19.06,45.51],[18.92,45.6],[18.84,45.84],[19.07,46.01],[19.28,46.0],[19.53,46.16],[20.21,46.13],[20.77,45.75],[20.79,45.47],[21.49,45.15],[21.35,45.01],[21.53,44.9],[21.36,44.83]]]},{"a":"RUS","r":[[[130.69,42.3],[130.53,42.54],[130.58,42.62],[130.42,42.73],[131.07,42.9],[131.26,43.38],[131.17,43.7],[131.26,44.07],[130.98,44.84],[131.45,44.98],[131.85,45.33],[132.94,45.03],[133.11,45.13],[133.19,45.49],[133.44,45.6],[133.51,45.88],[133.86,46.25],[133.87,46.5],[134.2,47.13],[134.17,47.3],[134.54,47.49],[134.75,47.72],[134.57,48.02],[134.67,48.25],[134.29,48.37],[133.47,48.1],[133.14,48.11],[132.71,47.95],[132.48,47.71],[130.96,47.71],[130.73,48.02],[130.8,48.34],[130.55,48.6],[130.62,48.77],[130.55,48.86],[130.2,48.89],[129.5,49.39],[129.07,49.37],[128.7,49.6],[128.0,49.57],[127.55,49.8],[127.49,49.98],[127.59,50.21],[127.34,50.35],[127.31,50.71],[126.92,51.1],[126.81,51.51],[126.34,52.36],[126.02,52.61],[126.05,52.74],[125.73,52.89],[125.65,53.04],[125.08,53.2],[124.81,53.13],[123.61,53.55],[122.34,53.49],[120.99,53.28],[120.09,52.79],[120.07,52.63],[120.66,52.57],[120.75,52.1],[120.68,51.97],[120.07,51.6],[119.16,50.41],[119.35,50.28],[119.26,50.07],[118.45,49.84],[117.87,49.51],[117.25,49.62],[116.22,50.01],[115.43,49.9],[114.74,50.23],[114.3,50.27],[113.57,50.01],[112.81,49.52],[111.34,49.36],[110.71,49.14],[109.24,49.33],[108.61,49.32],[107.97,49.65],[107.92,49.95],[107.23,49.99],[106.71,50.31],[106.22,50.3],[105.38,50.47],[104.08,50.15],[103.3,50.2],[102.29,50.59],[102.11,51.35],[101.38,51.45],[100.47,51.73],[99.92,51.76],[98.89,52.12],[98.64,51.8],[98.35,51.72],[98.22,51.51],[98.04,51.45],[97.84,51.05],[98.03,50.64],[98.28,50.53],[98.25,50.3],[98.0,50.01],[97.59,49.91],[97.36,49.74],[97.21,49.73],[96.99,49.88],[96.32,49.9],[96.07,50.0],[95.52,49.91],[94.61,50.02],[94.35,50.22],[94.25,50.56],[93.1,50.6],[92.94,50.78],[92.63,50.69],[92.35,50.86],[92.19,50.7],[91.8,50.69],[91.42,50.47],[90.05,50.09],[89.98,49.98],[89.64,49.9],[89.65,49.72],[89.24,49.63],[89.11,49.5],[88.19,49.45],[87.99,49.19],[87.42,49.08],[86.63,49.56],[86.73,49.7],[86.68,49.78],[86.18,49.5],[85.23,49.62],[85.0,49.89],[84.99,50.06],[84.32,50.24],[83.95,50.77],[83.36,50.99],[82.76,50.89],[82.49,50.73],[81.47,50.74],[81.39,50.96],[81.07,50.97],[81.13,51.19],[80.74,51.29],[80.45,51.18],[80.42,50.95],[79.99,50.77],[79.47,51.49],[77.86,53.27],[76.48,54.02],[76.42,54.15],[76.65,54.15],[76.84,54.44],[75.44,54.09],[75.22,53.89],[74.45,53.65],[74.35,53.49],[73.86,53.62],[73.41,53.45],[73.31,53.71],[73.68,53.93],[73.67,54.06],[73.23,53.96],[72.62,54.13],[72.59,54.0],[72.45,53.94],[72.19,54.33],[72.0,54.21],[71.09,54.21],[71.19,54.6],[70.74,55.31],[70.18,55.16],[69.49,55.36],[68.98,55.39],[68.21,55.16],[68.24,55.05],[68.16,54.98],[65.48,54.62],[65.09,54.34],[64.46,54.38],[61.93,53.95],[61.23,54.02],[60.98,53.62],[61.53,53.52],[61.23,53.45],[61.2,53.29],[61.66,53.23],[62.08,53.01],[61.05,52.97],[60.77,52.68],[60.99,52.34],[60.03,51.93],[60.39,51.77],[60.46,51.65],[61.55,51.32],[61.59,51.23],[61.39,50.86],[60.94,50.7],[60.42,50.68],[60.06,50.85],[59.81,50.58],[59.52,50.49],[59.45,50.62],[58.88,50.69],[58.36,51.06],[57.84,51.09],[57.65,50.93],[57.44,50.89],[57.01,51.07],[56.49,51.02],[55.69,50.58],[54.64,51.01],[54.55,50.95],[54.65,50.66],[54.56,50.54],[54.14,51.04],[53.34,51.48],[52.57,51.48],[52.22,51.71],[51.61,51.48],[51.34,51.48],[51.16,51.65],[50.79,51.73],[50.31,51.32],[49.5,51.08],[49.32,50.85],[48.81,50.6],[48.63,50.61],[48.84,50.01],[48.76,49.93],[48.33,49.86],[47.71,50.38],[47.43,50.36],[47.25,50.0],[46.89,49.7],[46.8,49.37],[47.03,49.15],[46.7,48.81],[46.61,48.57],[46.66,48.41],[47.06,48.23],[47.09,47.95],[47.29,47.74],[47.48,47.8],[48.17,47.71],[48.96,46.77],[48.88,46.71],[48.56,46.76],[48.54,46.61],[49.25,46.29],[48.68,46.09],[48.73,45.9],[48.49,45.93],[48.16,45.74],[47.7,45.69],[47.63,45.58],[47.46,45.68],[47.51,45.49],[47.08,44.82],[47.0,44.88],[46.72,44.56],[46.75,44.42],[47.02,44.34],[47.31,44.1],[47.46,43.56],[47.65,43.88],[47.46,43.04],[48.38,41.95],[48.57,41.84],[48.39,41.6],[48.06,41.46],[47.86,41.21],[47.52,41.23],[47.26,41.32],[47.21,41.46],[46.75,41.81],[46.57,41.8],[45.64,42.21],[45.73,42.48],[45.66,42.52],[45.34,42.53],[44.87,42.76],[44.77,42.62],[44.51,42.75],[43.83,42.57],[43.74,42.62],[43.78,42.75],[42.76,43.17],[41.58,43.22],[40.65,43.53],[40.15,43.57],[39.98,43.42],[38.72,44.29],[38.18,44.42],[37.85,44.7],[37.5,44.7],[37.2,44.97],[36.65,45.13],[36.62,45.19],[36.94,45.29],[36.72,45.37],[36.79,45.41],[37.21,45.27],[37.65,45.38],[37.61,45.56],[37.93,46.0],[38.01,46.05],[38.08,45.93],[38.18,46.09],[38.49,46.09],[38.08,46.39],[37.91,46.41],[37.77,46.64],[38.5,46.66],[38.44,46.81],[39.27,47.04],[39.2,47.27],[38.67,47.14],[38.55,47.15],[38.76,47.26],[38.58,47.24],[38.21,47.09],[38.28,47.28],[38.2,47.32],[38.29,47.56],[38.64,47.67],[38.82,47.84],[39.78,47.89],[39.96,48.27],[39.85,48.3],[39.84,48.54],[39.64,48.59],[39.79,48.81],[40.0,48.82],[39.69,49.01],[40.11,49.25],[40.08,49.58],[39.78,49.57],[39.17,49.86],[38.92,49.82],[38.26,50.05],[38.05,49.92],[37.7,50.11],[37.42,50.41],[36.62,50.21],[36.12,50.41],[35.59,50.37],[35.41,50.54],[35.44,50.73],[35.31,51.04],[35.16,51.06],[35.06,51.2],[34.21,51.26],[34.27,51.34],[34.12,51.68],[34.4,51.78],[33.74,52.34],[32.81,52.25],[32.44,52.31],[32.12,52.05],[31.76,52.1],[31.58,52.31],[31.56,52.76],[31.26,53.02],[31.42,53.2],[32.14,53.09],[32.7,53.34],[32.71,53.42],[32.47,53.55],[32.45,53.69],[31.75,53.81],[31.83,54.03],[31.4,54.2],[31.07,54.49],[31.15,54.63],[30.8,54.78],[30.98,55.05],[30.81,55.31],[30.91,55.57],[30.23,55.85],[29.94,55.85],[29.48,55.68],[29.35,55.78],[29.4,55.91],[29.28,55.97],[29.03,56.02],[28.79,55.94],[28.56,56.09],[28.28,56.06],[28.15,56.14],[28.17,56.39],[27.88,56.82],[27.64,56.85],[27.83,57.29],[27.35,57.55],[27.54,57.8],[27.78,57.87],[27.5,58.22],[27.43,58.79],[27.9,59.28],[28.15,59.37],[28.01,59.48],[28.06,59.78],[28.33,59.69],[28.52,59.85],[28.95,59.83],[29.15,60.0],[30.12,59.87],[30.17,59.96],[29.72,60.2],[29.07,60.19],[28.64,60.38],[28.49,60.54],[28.62,60.49],[28.65,60.61],[28.51,60.68],[27.8,60.54],[29.25,61.29],[31.19,62.48],[31.54,62.92],[31.18,63.21],[29.99,63.74],[30.21,63.8],[30.53,64.08],[30.49,64.24],[30.11,64.37],[29.99,64.52],[30.11,64.73],[29.78,64.8],[29.6,64.97],[29.83,65.15],[29.61,65.25],[29.82,65.57],[29.72,65.62],[30.1,65.68],[30.09,65.79],[29.9,66.09],[29.07,66.89],[29.94,67.55],[29.99,67.67],[29.34,68.06],[28.69,68.19],[28.47,68.49],[28.77,68.84],[28.41,68.9],[29.12,69.05],[29.39,69.3],[29.99,69.39],[30.16,69.5],[30.16,69.63],[30.86,69.54],[30.87,69.78],[31.55,69.7],[32.0,69.81],[31.98,69.95],[33.01,69.72],[32.92,69.6],[32.18,69.67],[32.09,69.63],[32.38,69.48],[33.0,69.47],[32.98,69.37],[33.45,69.43],[33.33,69.15],[33.14,69.07],[33.44,69.13],[33.68,69.31],[35.86,69.19],[37.73,68.69],[38.43,68.36],[38.83,68.32],[39.57,68.07],[39.82,68.06],[39.75,68.16],[39.81,68.15],[40.38,67.83],[40.97,67.71],[41.13,67.27],[41.36,67.21],[41.19,66.83],[40.1,66.3],[38.65,66.07],[35.51,66.4],[34.82,66.61],[34.48,66.55],[34.4,66.61],[34.45,66.65],[33.15,66.84],[32.85,67.02],[32.93,67.09],[31.9,67.16],[32.5,67.0],[32.46,66.92],[32.86,66.72],[33.18,66.68],[33.22,66.53],[33.66,66.44],[33.36,66.33],[34.11,66.23],[34.69,65.95],[34.78,65.77],[34.62,65.51],[34.41,65.4],[34.8,64.99],[34.83,64.8],[34.95,64.76],[34.86,64.71],[34.87,64.56],[35.04,64.44],[35.65,64.38],[36.15,64.19],[36.36,64.0],[37.44,63.81],[37.97,63.95],[38.06,64.09],[37.95,64.32],[37.18,64.41],[36.58,64.79],[36.53,64.94],[36.79,64.99],[36.88,65.17],[37.14,65.19],[38.01,64.88],[39.76,64.58],[40.06,64.77],[40.44,64.78],[39.8,65.35],[39.82,65.6],[40.69,65.96],[41.48,66.12],[42.21,66.52],[43.23,66.42],[43.65,66.25],[43.54,66.12],[43.84,66.14],[44.1,66.01],[44.1,66.24],[44.49,66.67],[44.43,66.94],[44.29,67.1],[43.78,67.25],[44.23,68.0],[44.2,68.25],[43.33,68.67],[44.05,68.55],[45.08,68.58],[45.89,68.48],[46.68,67.97],[46.69,67.85],[45.53,67.76],[44.9,67.41],[45.56,67.19],[45.89,66.89],[46.49,66.8],[47.66,66.98],[47.91,67.45],[47.87,67.58],[48.83,67.68],[48.88,67.73],[48.7,67.87],[48.75,67.9],[49.16,67.87],[50.7,68.32],[51.99,68.54],[52.29,68.46],[52.18,68.37],[52.4,68.35],[52.72,68.48],[52.34,68.61],[53.8,69.0],[54.49,68.99],[53.8,68.91],[53.97,68.84],[53.76,68.63],[53.93,68.44],[53.26,68.27],[54.48,68.29],[54.86,68.2],[54.92,68.37],[55.42,68.57],[56.04,68.65],[57.13,68.55],[58.17,68.89],[58.24,68.83],[59.06,69.01],[59.37,68.74],[59.11,68.62],[59.1,68.44],[59.73,68.35],[59.92,68.47],[59.9,68.71],[60.49,68.73],[60.93,68.99],[60.86,69.15],[60.66,69.11],[60.17,69.59],[60.91,69.85],[63.36,69.68],[64.19,69.53],[64.93,69.33],[64.9,69.25],[67.0,68.87],[67.73,68.51],[68.37,68.31],[68.5,68.35],[68.83,68.57],[69.14,68.95],[68.54,68.97],[68.12,69.24],[68.01,69.48],[67.62,69.58],[67.06,69.69],[66.9,69.55],[66.8,69.74],[66.93,70.01],[67.24,70.11],[67.15,70.22],[67.28,70.74],[67.14,70.84],[66.7,70.82],[66.67,70.9],[66.85,71.06],[66.64,71.08],[66.92,71.28],[68.27,71.68],[68.61,72.01],[69.04,72.67],[69.39,72.96],[69.69,72.98],[69.65,72.9],[69.74,72.88],[71.5,72.91],[72.81,72.69],[72.57,72.01],[72.28,71.7],[71.87,71.46],[72.58,71.15],[72.7,70.96],[72.7,70.46],[72.47,70.27],[72.6,69.79],[72.58,68.97],[73.55,68.57],[73.59,68.48],[73.14,68.18],[73.17,67.97],[73.07,67.77],[72.59,67.59],[71.85,67.01],[71.37,66.96],[71.54,66.68],[70.72,66.52],[70.38,66.6],[70.69,66.75],[70.28,66.69],[69.88,66.85],[69.01,66.79],[69.19,66.58],[69.98,66.4],[72.07,66.25],[72.32,66.33],[72.42,66.56],[73.79,67.0],[74.07,67.41],[74.77,67.77],[74.74,68.07],[74.39,68.42],[74.58,68.75],[75.12,68.86],[76.46,68.98],[77.24,68.47],[77.17,67.78],[77.77,67.57],[78.92,67.59],[77.59,67.75],[77.54,68.01],[77.66,68.19],[78.0,68.26],[77.65,68.9],[76.0,69.24],[75.42,69.24],[74.81,69.09],[73.98,69.11],[73.78,69.2],[73.89,69.42],[73.56,69.71],[73.58,69.8],[73.83,70.18],[74.34,70.58],[73.58,71.22],[73.09,71.44],[73.67,71.85],[74.99,72.14],[75.09,72.26],[75.06,72.55],[74.79,72.81],[75.37,72.8],[75.6,72.58],[75.59,72.46],[75.74,72.3],[75.27,71.96],[75.25,71.81],[75.5,71.65],[75.47,71.53],[75.28,71.43],[75.33,71.34],[75.73,71.27],[76.93,71.13],[77.59,71.17],[78.32,70.93],[79.02,70.95],[79.08,71.0],[78.49,71.03],[78.21,71.27],[77.48,71.31],[76.43,71.55],[76.03,71.91],[76.87,72.03],[77.55,71.84],[78.19,71.91],[78.23,71.95],[78.02,72.09],[77.49,72.07],[77.44,72.16],[78.48,72.39],[79.42,72.38],[80.76,72.09],[80.86,71.97],[81.66,71.72],[83.11,71.72],[83.23,71.67],[82.98,71.45],[82.32,71.26],[82.24,71.0],[82.34,70.81],[82.16,70.6],[82.22,70.4],[82.59,70.89],[82.87,70.95],[83.01,70.9],[83.03,70.58],[82.68,70.22],[83.08,70.09],[83.07,70.28],[83.5,70.35],[83.74,70.55],[83.15,71.1],[83.55,71.54],[83.53,71.68],[83.2,71.87],[82.65,71.93],[82.09,72.27],[80.83,72.49],[80.66,72.71],[80.84,72.95],[80.51,73.09],[80.42,73.23],[80.4,73.36],[80.6,73.47],[80.58,73.57],[85.2,73.72],[86.89,73.89],[87.03,73.82],[85.79,73.44],[85.82,73.33],[86.68,73.11],[85.97,73.35],[85.94,73.46],[87.12,73.62],[87.57,73.81],[87.21,73.88],[86.57,74.24],[86.0,74.32],[86.4,74.45],[86.9,74.33],[87.23,74.36],[86.43,74.59],[85.79,74.65],[86.2,74.82],[86.65,74.68],[86.86,74.72],[87.42,74.94],[87.47,75.01],[86.94,75.07],[87.01,75.17],[87.67,75.13],[90.18,75.59],[94.08,75.91],[92.89,75.91],[92.97,76.08],[93.1,76.03],[93.26,76.1],[95.58,76.14],[96.08,76.08],[95.65,75.89],[96.51,76.01],[96.6,75.99],[96.5,75.89],[97.35,76.03],[97.5,75.98],[98.66,76.24],[99.77,76.03],[99.44,75.8],[99.54,75.8],[99.85,75.93],[99.83,76.14],[98.87,76.51],[100.84,76.53],[101.6,76.44],[101.68,76.49],[100.93,76.56],[101.1,76.7],[100.92,76.82],[100.99,76.99],[102.61,77.51],[104.01,77.73],[105.71,77.53],[106.06,77.39],[104.2,77.1],[105.65,77.1],[105.82,77.0],[106.94,77.03],[107.43,76.93],[106.64,76.57],[106.38,76.59],[106.41,76.51],[107.72,76.52],[108.18,76.74],[111.11,76.72],[111.94,76.55],[112.09,76.48],[111.94,76.38],[112.62,76.38],[112.8,76.13],[112.66,76.05],[113.09,76.13],[113.15,76.17],[112.99,76.24],[113.27,76.25],[113.56,75.89],[113.86,75.92],[113.57,75.57],[113.39,75.68],[112.47,75.84],[112.96,75.57],[113.24,75.61],[113.73,75.45],[113.61,75.29],[112.92,75.02],[109.84,74.32],[109.91,74.26],[109.81,74.17],[109.08,74.03],[108.2,73.69],[107.27,73.62],[106.68,73.33],[106.19,73.31],[105.68,72.96],[105.14,72.78],[105.71,72.84],[106.48,73.14],[107.75,73.17],[110.77,73.69],[110.87,73.73],[110.72,73.78],[109.71,73.74],[109.67,73.8],[109.87,73.93],[110.26,74.02],[111.06,73.94],[111.13,74.05],[111.55,74.03],[111.23,73.97],[111.4,73.83],[112.15,73.71],[112.8,73.75],[112.94,73.84],[112.84,73.96],[113.03,73.91],[113.42,73.65],[113.16,73.46],[113.49,73.35],[113.47,73.05],[113.13,72.83],[113.31,72.66],[113.66,72.63],[113.22,72.81],[113.54,73.05],[113.56,73.23],[113.89,73.35],[113.51,73.5],[114.06,73.58],[115.34,73.7],[118.45,73.59],[118.94,73.48],[118.46,73.46],[118.38,73.37],[118.43,73.25],[119.75,72.98],[121.75,72.97],[122.54,72.88],[122.75,72.91],[122.53,73.02],[123.16,72.95],[123.62,73.19],[123.32,73.43],[123.42,73.64],[124.54,73.75],[125.62,73.52],[125.6,73.45],[126.25,73.55],[126.34,73.51],[126.29,73.39],[126.55,73.33],[127.03,73.55],[127.74,73.48],[128.28,73.33],[128.26,73.27],[129.1,73.11],[128.6,72.9],[129.02,72.87],[129.25,72.71],[128.42,72.54],[129.28,72.44],[129.41,72.32],[129.41,72.17],[129.28,72.09],[128.93,72.08],[127.73,72.41],[128.91,71.76],[129.12,71.82],[129.12,71.95],[129.21,71.92],[129.46,71.74],[128.84,71.66],[129.13,71.59],[129.76,71.12],[130.54,70.89],[130.76,70.96],[131.02,70.75],[131.56,70.9],[132.04,71.24],[132.0,71.35],[132.23,71.64],[132.65,71.93],[133.13,71.61],[133.69,71.43],[134.7,71.39],[135.56,71.61],[136.09,71.62],[137.12,71.42],[137.94,71.13],[137.84,71.23],[138.31,71.33],[137.92,71.38],[138.23,71.6],[138.78,71.63],[139.21,71.44],[139.98,71.49],[139.7,71.7],[139.72,71.88],[139.36,71.95],[140.19,72.19],[139.18,72.16],[139.14,72.33],[139.6,72.5],[141.08,72.59],[140.65,72.84],[140.81,72.89],[142.06,72.72],[143.52,72.7],[146.25,72.44],[146.23,72.35],[144.78,72.38],[144.17,72.26],[144.47,72.17],[146.83,72.3],[146.11,71.94],[146.01,71.95],[146.23,72.14],[145.76,72.23],[145.66,72.07],[145.76,71.94],[145.06,71.93],[144.99,71.75],[145.19,71.7],[146.07,71.81],[147.26,72.33],[148.4,72.31],[149.5,72.16],[149.96,71.99],[150.02,71.9],[149.05,71.8],[148.97,71.69],[150.06,71.51],[150.6,71.52],[150.67,71.46],[150.1,71.23],[150.97,71.38],[151.58,71.29],[152.09,71.02],[151.76,70.98],[152.51,70.83],[155.9,71.1],[157.45,71.07],[158.7,70.94],[159.35,70.79],[159.91,70.51],[160.01,70.31],[159.73,69.87],[159.83,69.78],[160.91,69.61],[161.04,69.1],[161.34,68.91],[161.13,68.65],[160.86,68.54],[161.1,68.56],[161.57,68.91],[161.48,69.2],[161.54,69.38],[162.17,69.61],[163.2,69.71],[163.95,69.74],[164.51,69.61],[166.82,69.5],[167.63,69.74],[167.86,69.73],[168.15,69.58],[168.3,69.27],[169.31,69.08],[169.61,68.79],[170.54,68.83],[171.0,69.05],[171.0,69.13],[170.58,69.58],[170.16,69.63],[170.5,69.86],[170.49,70.11],[172.56,69.97],[173.28,69.82],[173.44,69.95],[174.79,69.86],[175.92,69.9],[176.92,69.65],[178.85,69.39],[180,68.98],[180,65.07],[179.45,64.82],[178.52,64.6],[177.75,64.72],[176.88,65.08],[176.34,65.05],[177.04,65.0],[177.22,64.86],[177.07,64.79],[176.06,64.96],[175.78,64.84],[174.55,64.68],[175.68,64.78],[176.06,64.9],[176.35,64.71],[176.14,64.59],[177.43,64.76],[177.43,64.44],[177.69,64.3],[178.04,64.22],[178.23,64.36],[178.38,64.26],[178.45,64.01],[178.65,63.97],[178.73,63.67],[178.44,63.61],[178.71,63.52],[178.68,63.4],[178.79,63.54],[178.92,63.35],[179.39,63.15],[179.26,63.01],[179.51,62.86],[179.57,62.69],[179.18,62.47],[179.12,62.32],[177.29,62.6],[177.34,62.78],[177.02,62.78],[176.96,62.66],[177.16,62.56],[176.7,62.51],[174.51,61.82],[173.82,61.68],[173.62,61.72],[173.13,61.41],[172.86,61.47],[172.91,61.31],[172.4,61.17],[172.39,61.06],[170.61,60.43],[170.35,59.97],[169.98,60.07],[169.62,60.44],[169.23,60.6],[168.14,60.57],[167.23,60.41],[166.27,59.86],[166.19,59.85],[166.14,59.98],[166.35,60.48],[165.08,60.1],[165.07,59.95],[164.95,59.84],[164.53,60.06],[164.11,59.9],[164.14,59.98],[163.74,60.03],[163.36,59.78],[163.27,59.3],[162.94,59.11],[162.97,58.99],[162.14,58.45],[161.96,58.08],[162.04,57.92],[162.41,57.78],[162.39,57.72],[162.65,57.95],[163.23,57.79],[163.19,57.64],[162.78,57.36],[162.76,57.24],[162.8,56.81],[163.26,56.69],[163.34,56.23],[163.05,56.04],[162.84,56.07],[162.63,56.23],[163.04,56.52],[162.67,56.49],[162.49,56.4],[162.53,56.26],[162.08,56.09],[161.72,55.5],[161.78,55.21],[162.11,54.75],[161.62,54.52],[161.13,54.6],[160.77,54.54],[160.07,54.19],[159.84,53.78],[160.03,53.13],[159.59,53.24],[158.75,52.91],[158.47,53.03],[158.43,52.96],[158.61,52.87],[158.48,52.63],[158.49,52.38],[158.1,51.81],[156.75,50.97],[156.52,51.38],[156.36,52.51],[156.11,52.87],[155.56,55.2],[155.72,56.07],[155.98,56.7],[156.85,57.29],[156.98,57.47],[156.83,57.78],[157.45,57.8],[157.67,58.02],[158.28,58.01],[159.21,58.52],[159.85,59.13],[161.75,60.15],[162.07,60.47],[162.97,60.78],[163.71,60.92],[163.55,61.03],[164.01,61.34],[163.8,61.46],[164.02,61.71],[164.21,62.29],[164.6,62.47],[165.21,62.37],[165.4,62.49],[164.42,62.7],[163.33,62.55],[163.02,61.89],[163.01,61.79],[163.26,61.7],[163.09,61.57],[162.99,61.54],[162.86,61.71],[162.39,61.66],[160.77,60.75],[160.17,60.64],[160.38,61.03],[159.79,60.96],[159.95,61.13],[159.88,61.29],[160.25,61.65],[160.31,61.89],[159.55,61.72],[159.19,61.93],[158.07,61.75],[157.47,61.8],[157.08,61.68],[156.68,61.48],[156.63,61.27],[156.06,61.0],[155.72,60.68],[154.97,60.38],[154.29,59.83],[154.15,59.53],[154.97,59.45],[155.17,59.36],[155.16,59.19],[154.7,59.14],[154.46,59.22],[154.01,59.08],[153.7,59.22],[153.36,59.21],[153.27,59.09],[152.82,58.93],[152.32,59.03],[152.09,58.91],[151.33,58.88],[151.12,59.08],[151.99,59.16],[152.26,59.22],[152.17,59.28],[151.8,59.32],[151.35,59.56],[150.48,59.49],[150.67,59.56],[149.42,59.76],[149.07,59.63],[149.2,59.49],[148.8,59.53],[148.74,59.37],[148.96,59.37],[148.73,59.26],[148.49,59.26],[148.26,59.41],[147.51,59.27],[146.54,59.46],[146.27,59.22],[146.05,59.17],[145.55,59.41],[143.19,59.37],[142.33,59.15],[141.6,58.65],[140.99,58.42],[140.68,58.21],[140.45,57.81],[140.0,57.69],[139.51,57.36],[139.18,57.26],[138.66,56.97],[137.69,56.14],[135.54,55.11],[135.21,54.84],[135.26,54.73],[135.85,54.58],[136.8,54.62],[136.68,53.93],[136.8,53.78],[137.16,53.82],[137.26,54.03],[137.1,54.13],[137.14,54.18],[137.67,54.28],[137.34,54.1],[137.83,53.95],[137.25,53.55],[137.95,53.6],[138.53,53.96],[138.57,53.82],[138.25,53.52],[138.45,53.54],[138.7,53.87],[138.66,54.3],[139.32,54.19],[139.71,54.28],[140.18,54.05],[140.35,53.81],[140.69,53.6],[141.37,53.29],[141.4,53.18],[141.18,53.02],[140.84,53.09],[141.26,52.84],[141.25,52.55],[141.13,52.44],[141.49,52.18],[141.37,51.92],[140.93,51.62],[140.52,50.8],[140.54,50.13],[140.62,50.08],[140.46,49.91],[140.52,49.6],[140.31,49.05],[140.38,48.96],[140.11,48.42],[139.37,47.89],[139.0,47.38],[138.59,47.06],[138.34,46.54],[137.69,45.82],[136.8,45.17],[136.14,44.49],[135.87,44.37],[135.48,43.84],[135.13,43.53],[134.01,42.95],[133.16,42.7],[132.71,42.88],[132.3,42.88],[132.31,43.31],[131.87,43.1],[132.01,43.28],[131.94,43.3],[131.72,43.2],[131.16,42.63],[130.71,42.66],[130.83,42.52],[130.69,42.3]]]},{"a":"ROU","r":[[[28.21,45.45],[28.76,45.23],[28.78,45.31],[29.4,45.42],[29.71,45.26],[29.56,44.84],[29.05,44.76],[29.1,44.98],[28.89,44.92],[28.81,44.57],[28.89,44.57],[28.65,44.3],[28.59,43.74],[28.22,43.77],[27.88,43.99],[27.43,44.02],[27.09,44.17],[26.22,44.01],[25.5,43.67],[22.92,43.83],[22.87,43.95],[23.03,44.08],[22.49,44.44],[22.72,44.61],[22.5,44.71],[22.09,44.54],[21.36,44.83],[21.53,44.9],[21.35,45.01],[21.49,45.15],[20.79,45.47],[20.77,45.75],[20.24,46.11],[21.12,46.28],[22.0,47.4],[22.0,47.51],[22.29,47.73],[22.61,47.77],[23.14,48.09],[24.18,47.91],[24.58,47.93],[24.89,47.72],[25.46,47.91],[26.16,47.99],[26.31,48.2],[26.71,48.26],[26.98,48.16],[27.61,47.34],[28.07,46.98],[28.24,46.64],[28.1,45.97],[28.16,45.65],[28.07,45.6],[28.21,45.45]]]},{"a":"POL","r":[[[23.61,51.52],[23.66,51.31],[24.1,50.87],[23.98,50.79],[24.09,50.53],[23.97,50.41],[23.71,50.38],[22.71,49.61],[22.71,49.17],[22.85,49.08],[22.81,49.02],[22.02,49.21],[21.64,49.41],[21.08,49.42],[20.87,49.31],[20.36,49.39],[20.06,49.18],[19.76,49.2],[19.77,49.37],[19.44,49.6],[19.15,49.4],[18.97,49.4],[18.56,49.88],[18.03,50.04],[17.83,49.98],[17.63,50.12],[17.7,50.31],[17.42,50.25],[16.88,50.43],[16.99,50.24],[16.64,50.1],[16.21,50.42],[16.42,50.57],[16.28,50.66],[16.01,50.61],[14.99,51.01],[14.98,50.89],[14.81,50.86],[15.02,51.25],[14.91,51.46],[14.72,51.52],[14.6,51.83],[14.75,52.08],[14.55,52.36],[14.62,52.53],[14.13,52.88],[14.41,53.2],[14.26,53.73],[14.58,53.64],[14.56,53.82],[14.2,53.92],[16.19,54.29],[16.56,54.55],[18.09,54.84],[18.76,54.68],[18.44,54.74],[18.67,54.43],[18.98,54.35],[19.6,54.46],[22.89,54.39],[23.45,54.14],[23.6,53.6],[23.89,53.03],[23.9,52.7],[23.41,52.52],[23.18,52.29],[23.65,52.04],[23.54,51.71],[23.61,51.52]]]},{"a":"MNE","r":[[[19.19,43.53],[19.61,43.17],[20.35,42.85],[20.05,42.76],[20.07,42.56],[19.94,42.51],[19.79,42.48],[19.65,42.63],[19.28,42.17],[19.34,41.87],[18.44,42.52],[18.55,42.64],[18.46,43.0],[18.62,43.03],[18.67,43.23],[18.85,43.35],[19.03,43.29],[18.95,43.53],[19.19,43.53]]]},{"a":"MDA","r":[[[26.62,48.26],[26.85,48.39],[27.23,48.37],[27.55,48.48],[28.29,48.24],[28.46,48.09],[28.77,48.12],[28.92,47.95],[29.13,47.96],[29.21,47.77],[29.13,47.49],[29.54,47.27],[29.57,46.96],[29.88,46.83],[29.92,46.54],[30.13,46.42],[29.84,46.35],[29.71,46.45],[29.3,46.47],[29.2,46.38],[29.19,46.52],[28.96,46.46],[28.95,46.05],[28.49,45.67],[28.5,45.52],[28.21,45.45],[28.07,45.6],[28.16,45.65],[28.1,45.97],[28.24,46.64],[28.07,46.98],[27.61,47.34],[26.98,48.16],[26.62,48.26]]]},{"a":"MKD","r":[[[21.56,42.25],[22.24,42.36],[22.8,42.03],[23.0,41.74],[22.93,41.36],[22.78,41.33],[22.72,41.18],[22.6,41.14],[21.99,41.13],[21.58,40.87],[20.74,40.91],[20.49,41.27],[20.45,41.52],[20.55,41.86],[20.73,41.87],[20.78,42.07],[21.06,42.17],[21.29,42.1],[21.56,42.25]]]},{"a":"KOS","r":[[[20.34,42.83],[20.62,43.03],[20.62,43.2],[20.8,43.26],[21.4,42.83],[21.39,42.75],[21.75,42.65],[21.52,42.33],[21.56,42.25],[21.29,42.1],[21.06,42.17],[20.78,42.07],[20.73,41.87],[20.58,41.87],[20.49,42.22],[20.06,42.55],[20.05,42.76],[20.34,42.83]]]},{"a":"ITA","r":[[[7.02,45.93],[7.79,45.92],[8.13,46.16],[8.1,46.27],[8.42,46.45],[8.46,46.25],[8.82,46.08],[8.78,46.0],[9.02,45.85],[9.0,46.01],[9.25,46.29],[9.3,46.5],[9.43,46.48],[9.53,46.31],[9.94,46.36],[10.08,46.23],[10.15,46.25],[10.04,46.48],[10.09,46.6],[10.43,46.55],[10.45,46.86],[10.99,46.78],[11.24,46.98],[12.17,47.08],[12.15,46.94],[12.39,46.7],[13.7,46.52],[13.38,46.26],[13.63,46.18],[13.49,45.99],[13.6,45.98],[13.58,45.81],[13.87,45.61],[13.72,45.59],[13.78,45.63],[13.63,45.77],[13.47,45.71],[13.21,45.77],[13.03,45.64],[12.27,45.45],[12.23,45.24],[12.52,44.97],[12.38,44.8],[12.28,44.83],[12.25,44.72],[12.4,44.22],[13.56,43.57],[14.01,42.69],[14.54,42.24],[15.17,41.93],[16.16,41.9],[16.15,41.76],[15.91,41.62],[15.9,41.51],[17.95,40.66],[18.46,40.22],[18.39,39.9],[18.34,39.82],[18.08,39.94],[17.87,40.28],[17.4,40.34],[17.18,40.5],[16.93,40.46],[16.67,40.14],[16.52,39.75],[17.11,39.38],[17.17,39.0],[16.62,38.8],[16.55,38.41],[16.28,38.25],[16.06,37.94],[15.72,37.94],[15.64,38.18],[15.82,38.3],[15.93,38.67],[16.2,38.76],[16.21,38.94],[15.69,39.99],[14.95,40.24],[14.95,40.47],[14.77,40.67],[14.34,40.6],[14.46,40.73],[14.04,40.81],[13.73,41.24],[13.09,41.24],[12.63,41.47],[11.64,42.29],[11.1,42.42],[11.17,42.54],[10.71,42.94],[10.51,42.97],[10.52,43.2],[10.32,43.51],[10.25,43.85],[10.05,44.02],[8.77,44.42],[8.55,44.35],[8.0,43.88],[7.49,43.77],[7.68,44.08],[7.64,44.16],[7.32,44.14],[6.9,44.34],[6.84,44.51],[7.03,44.72],[6.99,44.83],[6.74,44.92],[6.63,45.07],[7.08,45.24],[7.15,45.38],[6.79,45.74],[7.02,45.93]]]},{"a":"HUN","r":[[[22.13,48.41],[22.77,48.11],[22.88,47.95],[22.61,47.77],[22.29,47.73],[22.0,47.51],[21.5,46.7],[21.04,46.24],[20.24,46.11],[19.61,46.17],[18.44,45.77],[17.96,45.77],[17.31,46.0],[16.52,46.5],[16.28,46.86],[16.09,46.86],[16.45,47.01],[16.44,47.4],[16.68,47.54],[16.42,47.67],[16.59,47.75],[17.07,47.71],[17.03,47.84],[17.15,48.01],[17.76,47.77],[18.72,47.79],[18.79,48.0],[19.47,48.11],[19.63,48.22],[19.95,48.15],[20.33,48.3],[20.49,48.53],[21.45,48.55],[21.72,48.35],[22.13,48.41]]]},{"a":"GRC","r":[[[20.08,39.43],[19.88,39.46],[19.65,39.77],[19.93,39.77],[19.85,39.67],[19.96,39.47],[20.08,39.43]],[[23.42,38.96],[23.52,38.81],[24.13,38.65],[24.28,38.22],[24.56,38.15],[24.58,38.02],[24.36,38.02],[24.04,38.39],[23.65,38.44],[23.25,38.8],[22.88,38.85],[23.26,39.03],[23.42,38.96]],[[26.41,39.33],[26.6,39.05],[26.49,39.07],[26.55,38.99],[26.47,38.97],[26.11,39.08],[26.27,39.2],[26.07,39.1],[25.84,39.2],[26.17,39.37],[26.41,39.33]],[[26.32,41.72],[26.58,41.6],[26.62,41.4],[26.33,41.24],[26.35,41.0],[26.11,40.75],[25.1,40.99],[24.79,40.86],[24.48,40.95],[24.08,40.72],[23.76,40.75],[23.87,40.42],[24.21,40.33],[24.34,40.15],[23.91,40.36],[23.73,40.33],[23.97,40.11],[23.95,39.97],[23.66,40.22],[23.43,40.26],[23.43,40.12],[23.67,39.96],[23.4,39.99],[23.31,40.22],[22.9,40.4],[22.92,40.59],[22.63,40.5],[22.59,40.04],[23.33,39.17],[23.15,39.1],[23.16,39.26],[22.92,39.31],[22.84,39.26],[22.89,39.17],[22.97,39.03],[23.07,39.04],[22.57,38.87],[23.25,38.66],[23.68,38.35],[23.97,38.27],[24.06,37.71],[23.97,37.68],[23.5,38.03],[23.04,37.88],[23.2,37.62],[23.4,37.58],[23.49,37.44],[23.16,37.33],[23.02,37.48],[22.73,37.54],[23.16,36.45],[22.72,36.79],[22.61,36.78],[22.49,36.45],[22.43,36.48],[22.38,36.7],[22.08,37.03],[21.96,36.99],[21.89,36.74],[21.74,36.86],[21.58,37.08],[21.68,37.39],[21.12,37.89],[21.4,38.2],[21.66,38.18],[21.82,38.33],[21.95,38.32],[22.92,37.96],[22.89,38.05],[23.18,38.13],[22.42,38.44],[22.32,38.36],[21.97,38.41],[21.47,38.32],[21.33,38.49],[21.3,38.37],[21.18,38.35],[20.77,38.87],[21.11,38.9],[21.12,39.03],[20.78,39.01],[20.3,39.33],[20.0,39.71],[20.25,39.68],[20.38,39.8],[20.31,39.98],[20.66,40.12],[20.81,40.45],[21.03,40.62],[20.96,40.85],[21.58,40.87],[21.99,41.13],[22.49,41.12],[22.72,41.18],[22.78,41.33],[23.64,41.39],[24.06,41.53],[24.52,41.55],[24.77,41.36],[25.25,41.24],[25.92,41.31],[26.14,41.39],[26.09,41.7],[26.32,41.72]]]},{"a":"DEU","r":[[[9.52,47.52],[8.57,47.78],[8.4,47.69],[8.57,47.64],[8.43,47.59],[7.57,47.61],[7.62,48.16],[7.84,48.64],[8.14,48.89],[8.13,48.97],[7.45,49.15],[6.74,49.16],[6.53,49.39],[6.34,49.45],[6.49,49.8],[6.26,49.87],[6.11,50.09],[6.18,50.23],[6.36,50.32],[6.34,50.45],[6.18,50.52],[6.24,50.6],[5.99,50.75],[6.05,50.9],[5.86,51.03],[6.13,51.15],[6.08,51.22],[6.2,51.45],[5.95,51.8],[6.74,51.91],[6.8,51.98],[6.72,52.08],[7.02,52.27],[7.0,52.42],[6.69,52.53],[6.75,52.63],[7.01,52.63],[7.18,52.97],[7.2,53.28],[7.05,53.38],[7.21,53.65],[8.01,53.69],[8.17,53.54],[8.11,53.47],[8.25,53.45],[8.33,53.61],[8.49,53.51],[8.5,53.39],[8.53,53.78],[8.62,53.88],[9.21,53.86],[9.78,53.55],[9.31,53.86],[8.98,53.93],[8.91,54.26],[8.64,54.29],[8.65,54.4],[8.95,54.47],[8.96,54.54],[8.67,54.9],[9.25,54.81],[9.62,54.86],[10.02,54.67],[10.03,54.58],[9.87,54.47],[10.14,54.49],[10.73,54.32],[11.01,54.38],[11.01,54.18],[10.81,54.08],[10.92,54.0],[11.4,53.94],[11.8,54.15],[12.11,54.17],[12.58,54.47],[13.03,54.41],[13.45,54.14],[13.72,54.15],[13.87,53.85],[14.26,53.73],[14.41,53.2],[14.13,52.88],[14.62,52.53],[14.55,52.36],[14.75,52.08],[14.6,51.83],[14.72,51.52],[14.94,51.44],[15.02,51.25],[14.96,51.1],[14.77,50.82],[14.61,50.86],[14.55,50.99],[14.32,51.04],[14.26,51.0],[14.37,50.9],[13.56,50.7],[12.94,50.41],[12.55,50.39],[12.28,50.18],[12.09,50.27],[12.51,49.9],[12.39,49.74],[12.63,49.46],[13.77,48.82],[13.79,48.59],[13.68,48.52],[13.49,48.58],[13.37,48.36],[12.76,48.11],[12.95,47.89],[12.9,47.72],[13.05,47.66],[13.01,47.48],[12.69,47.67],[12.21,47.72],[12.19,47.62],[11.04,47.39],[10.87,47.52],[10.44,47.55],[10.37,47.37],[10.18,47.28],[10.2,47.36],[9.97,47.51],[9.75,47.58],[9.52,47.52]]]},{"a":"CZE","r":[[[18.83,49.51],[18.6,49.49],[18.16,49.26],[18.09,49.07],[17.76,48.89],[17.14,48.84],[16.95,48.6],[16.88,48.7],[16.54,48.8],[16.06,48.75],[14.99,49.0],[14.92,48.77],[14.79,48.75],[14.69,48.6],[14.19,48.58],[12.68,49.41],[12.39,49.74],[12.51,49.9],[12.21,50.1],[12.09,50.3],[12.28,50.18],[12.55,50.39],[12.94,50.41],[13.56,50.7],[14.37,50.9],[14.28,51.03],[14.55,50.99],[14.72,50.81],[14.98,50.89],[14.99,51.01],[16.01,50.61],[16.36,50.62],[16.38,50.52],[16.21,50.42],[16.64,50.1],[16.99,50.24],[16.88,50.43],[17.42,50.25],[17.7,50.31],[17.63,50.12],[17.83,49.98],[18.03,50.04],[18.56,49.88],[18.83,49.51]]]},{"a":"HRV","r":[[[13.58,45.52],[13.88,45.43],[13.99,45.51],[14.37,45.48],[14.57,45.66],[14.79,45.48],[15.34,45.47],[15.28,45.73],[15.65,45.86],[15.61,46.17],[16.23,46.37],[16.32,46.53],[16.75,46.42],[17.31,46.0],[17.81,45.79],[18.36,45.75],[18.91,45.93],[18.84,45.84],[18.92,45.6],[19.06,45.51],[19.0,45.4],[19.4,45.19],[19.14,45.2],[19.06,45.14],[19.09,44.93],[18.94,44.87],[18.66,45.08],[18.0,45.14],[17.81,45.08],[16.92,45.28],[16.53,45.22],[16.29,45.01],[16.03,45.19],[15.79,45.18],[15.74,44.77],[16.1,44.52],[16.3,44.12],[17.27,43.45],[17.29,43.31],[17.65,43.01],[17.59,42.94],[16.9,43.39],[16.39,43.54],[15.99,43.52],[15.94,43.66],[15.19,44.17],[15.12,44.26],[15.47,44.27],[14.98,44.6],[14.85,45.08],[14.55,45.3],[14.31,45.34],[13.97,44.84],[13.86,44.84],[13.63,45.11],[13.52,45.48],[13.58,45.52]],[[14.49,44.66],[14.31,44.9],[14.33,45.16],[14.47,44.97],[14.49,44.66]],[[18.44,42.56],[18.52,42.43],[17.82,42.8],[17.05,43.01],[17.72,42.85],[17.67,42.9],[17.8,42.9],[18.44,42.56]]]},{"a":"BGR","r":[[[28.01,41.97],[27.53,41.92],[27.24,42.09],[26.62,41.96],[26.32,41.72],[26.11,41.73],[26.14,41.39],[25.92,41.31],[25.25,41.24],[24.77,41.36],[24.49,41.56],[22.92,41.34],[23.0,41.74],[22.84,41.99],[22.34,42.31],[22.52,42.44],[22.44,42.63],[22.47,42.84],[22.71,42.88],[22.98,43.19],[22.5,43.52],[22.37,43.78],[22.4,43.97],[22.71,44.24],[23.03,44.08],[22.87,43.95],[22.92,43.83],[25.5,43.67],[26.22,44.01],[27.09,44.17],[27.43,44.02],[27.88,43.99],[28.22,43.77],[28.59,43.74],[28.47,43.39],[28.13,43.4],[27.93,43.19],[27.89,42.75],[27.48,42.47],[27.71,42.35],[28.01,41.97]]]},{"a":"BIH","r":[[[19.35,44.88],[19.12,44.36],[19.58,44.04],[19.25,43.97],[19.49,43.7],[19.48,43.6],[18.95,43.53],[19.03,43.29],[18.85,43.35],[18.67,43.23],[18.62,43.03],[18.44,42.97],[18.55,42.64],[18.44,42.56],[17.59,42.94],[17.65,43.01],[17.29,43.31],[17.27,43.45],[16.3,44.12],[16.1,44.52],[15.74,44.77],[15.82,45.2],[16.03,45.19],[16.29,45.01],[16.53,45.22],[16.92,45.28],[17.81,45.08],[18.0,45.14],[18.66,45.08],[18.84,44.88],[19.35,44.88]]]},{"a":"AUT","r":[[[9.53,47.27],[9.63,47.47],[9.52,47.52],[9.75,47.58],[10.2,47.36],[10.18,47.28],[10.37,47.37],[10.44,47.55],[10.87,47.52],[11.04,47.39],[12.19,47.62],[12.21,47.72],[12.69,47.67],[13.01,47.48],[13.05,47.66],[12.9,47.72],[12.95,47.89],[12.76,48.08],[12.81,48.16],[13.37,48.36],[13.49,48.58],[13.72,48.54],[13.81,48.77],[14.05,48.6],[14.69,48.6],[14.79,48.75],[14.92,48.77],[14.99,49.0],[16.06,48.75],[16.54,48.8],[16.88,48.7],[16.95,48.6],[16.87,48.39],[17.15,48.01],[17.03,47.84],[17.07,47.71],[16.59,47.75],[16.42,47.67],[16.68,47.54],[16.44,47.4],[16.46,47.02],[16.04,46.84],[15.96,46.68],[14.89,46.61],[14.55,46.4],[12.48,46.67],[12.15,46.94],[12.17,47.08],[11.24,46.98],[10.93,46.77],[10.45,46.86],[10.35,46.98],[10.13,46.85],[9.58,47.06],[9.53,47.27]]]},{"a":"ALB","r":[[[19.34,41.87],[19.28,42.17],[19.7,42.65],[19.79,42.48],[20.06,42.55],[20.52,42.17],[20.58,41.92],[20.45,41.52],[20.49,41.27],[20.71,40.93],[20.93,40.9],[21.03,40.62],[20.81,40.45],[20.66,40.12],[20.31,39.98],[20.38,39.8],[20.21,39.65],[20.0,39.71],[19.85,40.04],[19.48,40.21],[19.32,40.41],[19.46,40.41],[19.34,40.66],[19.46,40.93],[19.44,41.42],[19.58,41.64],[19.58,41.79],[19.34,41.87]]]}];
