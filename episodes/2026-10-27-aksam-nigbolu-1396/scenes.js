// ===== Niğbolu 1396: Yıldırım Bayezid ve Haçlı ordusu (akşam) =====
const KEY = ['HAÇLI', 'KAYIKLA', 'SİGİSMUND', 'SİGİSMUND\'U', 'FRANSIZ', 'ALMAN', 'MACAR', 'TUNA', 'NİĞBOLU', 'YILDIRIM', 'BAYEZİD', 'BALKANLAR\'I', 'KAZIKLAR', 'SİPAHİLERİNİ', 'KUŞATILAN', 'LAZAREVİÇ\'İN', 'NEVERS', 'FİDYEYLE', 'ESİR', 'SON', 'YILDIRIM\'I'];
const DURATION = 64.16 + 2.2;
const OUTRO_AT = DURATION - 1.6;
const EU = { x: 540, y: 820, lon: 21, lat: 45, k: 48 };
const ADRIATIC = [[12.2, 45.5], [13.7, 45.7], [14.5, 45.2], [15.2, 44.2], [16.4, 43.5], [17.6, 43.0], [18.5, 42.4], [19.4, 41.9], [19.5, 40.8], [19.3, 40.3], [18.5, 40.1], [16.9, 41.1], [16.0, 41.9], [15.0, 42.0], [14.0, 42.6], [13.6, 43.5], [12.4, 44.2], [5, 44], [5, 46]];
const AEGEAN = [[22.6, 40.5], [23.5, 40.2], [24.2, 40.8], [26.0, 40.6], [26.7, 40.35], [26.2, 40.05], [26.1, 39.5], [26.6, 39.3], [26.9, 38.7], [26.3, 38.25], [26.9, 38.0], [27.3, 37.3], [24, 37], [22.9, 38], [23.2, 39.2]];
const DANUBE = [[16.37, 48.2], [17.1, 48.1], [18.0, 47.75], [18.9, 47.8], [19.05, 47.5], [18.95, 46.8], [18.85, 46.3], [18.68, 45.99], [19.0, 45.4], [20.0, 45.25], [20.46, 44.82], [21.4, 44.7], [22.5, 44.6], [22.9, 44.0], [24.0, 43.7], [25.9, 43.8], [27.2, 44.1], [28.2, 45.4], [29.6, 45.2]];
const HUNGARY = [[16.1, 47.8], [17.2, 48.0], [17.5, 48.8], [19.0, 49.4], [21.0, 49.4], [22.5, 49.0], [24.0, 47.9], [26.0, 47.4], [26.4, 46.2], [25.5, 45.4], [22.7, 44.6], [21.4, 44.8], [20.3, 44.8], [19.0, 44.9], [16.5, 45.2], [15.6, 45.5], [16.1, 46.5]];
const P = (lon, lat) => proj(EU, lon, lat);
const GREECE = [[19.4, 41.9], [20.5, 42], [22.6, 41.3], [24, 41], [26, 40.9], [26, 40.6], [24.2, 40.8], [23.5, 40.2], [22.6, 40.5], [23.2, 39.2], [22.9, 38], [24, 37.6], [22.5, 36.4], [21.6, 36.8], [21.1, 37.9], [20.2, 39.6], [19.3, 40.3], [19.5, 40.8]];

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
function euroMap(ctx) {
  regionMap(ctx, EU, { seas: [SEA_BLACK, SEA_MED, SEA_MARMARA, ADRIATIC, AEGEAN] });
  drawLand(ctx, EU, GREECE, '#d9c393');
  ctx.save(); line(ctx, DANUBE.map(p => P(...p)), '#6f9fb0', 9, .8); ctx.restore();
  mountains(ctx, EU, [[24, 45.6], [25.5, 45.5], [23, 46.6], [24.5, 47.4], [22.5, 42.4], [24.5, 42.0], [20.5, 43.2], [18.5, 43.8], [26, 42.8], [21, 48.8]]);
}
function dusk(ctx, lt, o = {}) { // ova zemini
  const sky = ctx.createLinearGradient(0, 0, 0, 1100);
  sky.addColorStop(0, o.top || '#e6d3a8'); sky.addColorStop(1, o.bot || '#f1e3c2');
  ctx.fillStyle = sky; ctx.fillRect(-300, -300, W + 600, 1500);
  for (let i = 0; i < 4; i++) { const x = ((lt * 28 + i * 330) % 1500) - 250, y = 300 + (i % 2) * 130; ctx.globalAlpha = o.dark ? .12 : .45; ell(ctx, x, y, 110, 26, '#fff8e8', null); ell(ctx, x + 60, y - 18, 70, 24, '#fff8e8', null); }
  ctx.globalAlpha = 1;
  shape(ctx, [[-300, 1050], [200, 1030], [600, 1060], [1000, 1025], [1400, 1050], [1400, 2200], [-300, 2200]], o.ground || '#b7a06a', C.ink, 5, 1.2);
  ctx.strokeStyle = 'rgba(70,55,25,.35)'; ctx.lineWidth = 3;
  for (let i = 0; i < 36; i++) { const x = hash(i) * W, y = 1080 + hash(i + 9) * 600; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6 + Math.sin(lt * 3 + i) * 4, y - 20); ctx.stroke(); }
}
// ---- figürler ----
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
function budin(ctx, x, y, s) { // tepe üstünde kale-şehir
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-420, 120], [-300, 20], [-120, -20], [100, -10], [300, 30], [420, 120]], '#a08a5c', C.ink, 5, 1);
  shape(ctx, [[-260, 20], [-260, -110], [240, -110], [240, 20]], '#cdb68a', C.ink, 6, .8);
  for (let i = -260; i < 240; i += 40) shape(ctx, [[i, -110], [i, -134], [i + 22, -134], [i + 22, -110]], '#cdb68a', C.ink, 4, .5);
  [[-260, -190], [240, -190], [-20, -250]].forEach(([tx, th]) => { shape(ctx, [[tx - 40, 20], [tx - 40, th], [tx + 40, th], [tx + 40, 20]], '#bfa577', C.ink, 6, .8); shape(ctx, [[tx - 52, th], [tx, th - 70], [tx + 52, th]], '#7a3b26', C.ink, 5, .6); });
  shape(ctx, [[-40, 20], [-40, -50], [-20, -70], [20, -70], [40, -50], [40, 20]], '#3b2a1e', C.ink, 4, .5);
  ctx.restore();
}
// ---- Niğbolu'ya özel ----
const OTT1396 = [[22.5, 41.0], [21.5, 41.8], [22.5, 42.6], [22.8, 43.8], [24.5, 43.7], [25.9, 43.8], [27.2, 44.1], [28.6, 43.8], [28.0, 42.0], [29.0, 41.25], [28.6, 40.98], [26.8, 40.6], [26.0, 40.6], [24.2, 40.8], [23.5, 40.2], [22.6, 40.5]];
const BW = { x: 520, y: 860, lon: 23.5, lat: 43.2, k: 78 }; // Balkan yakın
const PB = (lon, lat) => proj(BW, lon, lat);
function balkanMap(ctx) {
  regionMap(ctx, BW, { seas: [SEA_BLACK, SEA_MED, SEA_MARMARA, ADRIATIC, AEGEAN] });
  drawLand(ctx, BW, GREECE, '#d9c393');
  line(ctx, DANUBE.map(p => PB(...p)), '#6f9fb0', 10, .8);
  mountains(ctx, BW, [[23.5, 42.7], [24.5, 42.75], [25.5, 42.7], [26.2, 42.75], [22.8, 42.2], [24.0, 41.7], [25.0, 41.6]]);
}
// sipahi: kırmızı pelerinli, sarıklı, mızraklı atlı
function sipahi(ctx, x, y, s, dir, ph, lance = true) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); ctx.translate(0, Math.sin(ph * 2) * 4);
  horseBody(ctx, ph, '#4a3020');
  shape(ctx, [[-96, -70], [70, -70], [80, -20], [-90, -20]], C.red, C.ink, 4, .5);
  shape(ctx, [[-20, -70], [-26, -150], [18, -156], [24, -72]], '#2d4a7a', C.ink, 4, .5);
  shape(ctx, [[-22, -140], [-70, -96 + Math.sin(ph) * 8], [-30, -80]], C.red, C.ink, 3, .5);
  ell(ctx, 0, -176, 20, 22, C.skin, C.ink, 4); ell(ctx, 0, -198, 26, 14, '#f6f1e6', C.ink, 4); ell(ctx, 0, -210, 9, 9, C.red, null);
  if (lance) { line(ctx, [[-30, -100], [200, -170]], '#6e4a2c', 7, .2); shape(ctx, [[196, -176], [226, -180], [200, -160]], '#cfd3d6', C.ink, 2, .3); shape(ctx, [[150, -158], [190, -150 + Math.sin(ph * 2) * 6], [160, -146]], C.red, null); }
  ctx.restore();
}
function kayikKral(ctx, x, y, s, lt) { // kayıkta kaçan kral
  ctx.save(); ctx.translate(x, y + Math.sin(lt * 3) * 6); ctx.rotate(Math.sin(lt * 2) * .04); ctx.scale(s, s);
  const a = Math.sin(lt * 6) * .5;
  line(ctx, [[-10, -40], [-10 - Math.cos(a) * 140, 30 + Math.sin(a) * 20]], '#6e4a2c', 8, .2); line(ctx, [[30, -40], [30 + Math.cos(a) * 140, 30 - Math.sin(a) * 20]], '#6e4a2c', 8, .2);
  shape(ctx, [[-170, -30], [170, -30], [130, 20], [-130, 20]], '#7a4a2c', C.ink, 5, .5); line(ctx, [[-160, -24], [160, -24]], C.gold, 4, .2);
  pawn(ctx, -60, -30, 1.4, '#5a6a4a'); pawn(ctx, 50, -30, 1.6, '#3e5f8a');
  crown(ctx, 50, -112, .32, -.1);
  ctx.restore();
}
function walls(ctx, y, s = 1) { // İstanbul surları (temsili)
  shape(ctx, [[-200, y], [-200, y - 160 * s], [1300, y - 160 * s], [1300, y]], '#cdb68a', C.ink, 6, .8);
  for (let x = -200; x < 1300; x += 44) shape(ctx, [[x, y - 160 * s], [x, y - 186 * s], [x + 24, y - 186 * s], [x + 24, y - 160 * s]], '#cdb68a', C.ink, 4, .4);
  for (let i = 0; i < 5; i++) { const x = 40 + i * 240; shape(ctx, [[x - 50, y], [x - 50, y - 260 * s], [x + 50, y - 260 * s], [x + 50, y]], '#bfa577', C.ink, 6, .6); for (let k = -50; k < 50; k += 30) shape(ctx, [[x + k, y - 260 * s], [x + k, y - 284 * s], [x + k + 18, y - 284 * s], [x + k + 18, y - 260 * s]], '#bfa577', C.ink, 3, .3); }
  for (let yy = y - 40; yy > y - 160 * s; yy -= 40) line(ctx, [[-200, yy], [1300, yy]], 'rgba(42,29,21,.2)', 3, .3);
}
function bolt(ctx, x, y, s, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[0, -120], [-40, 10], [-6, 10], [-30, 120], [44, -24], [8, -24], [30, -120]], '#f8d25a', C.ink, 5, .5); ctx.restore(); }
function stake(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.rotate(.5); ctx.scale(s, s); shape(ctx, [[-8, 0], [8, 0], [6, -110], [0, -140], [-6, -110]], '#8b6a45', C.ink, 4, .4); ctx.restore(); }
function volley(ctx, lt, from, to, n, t0, dur, color = C.ink) {
  for (let i = 0; i < n; i++) {
    const st = t0 + (i % 12) * .05 + Math.floor(i / 12) * .5, p = prog(lt, st, dur); if (p <= 0 || p >= 1) continue;
    const fx = from[0] + (hash(i) - .5) * from[2], fy = from[1] + (hash(i + 3) - .5) * 60;
    const tx = to[0] + (hash(i + 7) - .5) * to[2], ty = to[1] + (hash(i + 11) - .5) * 60;
    const x = lerp(fx, tx, p), y = lerp(fy, ty, p) - Math.sin(p * Math.PI) * 220;
    const dx = tx - fx, dy = (ty - fy) - Math.cos(p * Math.PI) * 220 * Math.PI;
    arrowShot(ctx, x, y, Math.atan2(dy, dx), 60, color);
  }
}
function coin(ctx, x, y, r, rot) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.abs(Math.cos(rot)) * .9 + .1, 1); ell(ctx, 0, 0, r, r, C.gold, C.ink, 3); ell(ctx, 0, 0, r * .6, r * .6, null, '#a07a20', 2); ctx.restore(); }
function hill(ctx, lt, col = '#a8905f') { // yamaç
  shape(ctx, [[-300, 1400], [-300, 1100], [200, 1000], [500, 760], [800, 640], [1400, 600], [1400, 1400]], col, C.ink, 5, 1.2);
  for (let i = 0; i < 20; i++) { const x = hash(i) * W, y = 900 + hash(i + 4) * 400; line(ctx, [[x, y], [x + 5 + Math.sin(lt * 3 + i) * 4, y - 20]], '#6f6a40', 3, .2); }
}
function fortress(ctx, x, y, s, lt) { // Niğbolu Kalesi (tepe üstünde, temsili)
  budin(ctx, x, y, s);
  pennant(ctx, x - 20 * s, y - 320 * s, 90 * s, lt, C.red);
}
function chest(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-130, 0], [-130, -110], [130, -110], [130, 0]], '#7a4a2c', C.ink, 6, .6);
  shape(ctx, [[-140, -110], [-120, -170], [120, -170], [140, -110]], '#8b5a34', C.ink, 6, .6);
  [-90, 90].forEach(k => line(ctx, [[k, 0], [k, -170]], C.gold, 10, .2));
  shape(ctx, [[-18, -90], [18, -90], [18, -50], [-18, -50]], C.gold, C.ink, 4, .3);
  ctx.restore();
}
const CX = 500;
const NIK = [24.9, 43.7];
const SCENES = [
  { s: 0, e: 2.37, draw(ctx, lt, d) { // HOOK
    ctx.save(); hookCard(ctx, lt, d, 'Haçlı kralı bir kayıkla kaçtı!', 'Niğbolu 1396'); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(0, 1150, W, 400); ctx.clip();
    for (let i = 0; i < 3; i++) line(ctx, [[-50, 1250 + i * 40], [300, 1240 + i * 40 + Math.sin(lt * 3 + i) * 8], [700, 1252 + i * 40], [1150, 1244 + i * 40]], 'rgba(243,233,210,.5)', 5, 1);
    ctx.restore();
    kayikKral(ctx, lerp(300, 640, lt / d), 1230, .75, lt);
  } },
  { s: 2.37, e: 5.28, draw(ctx, lt, d) { // 1396, Sigismund
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 850);
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = '#3e5f8a';
    for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .25; ctx.beginPath(); ctx.moveTo(CX, 860); ctx.arc(CX, 860, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    bigText(ctx, '1396', CX, 330, 170, C.red, lt, 0, F_SANS, [C.cream, 14]);
    pennant(ctx, 170, 1200, 520, lt, '#3e5f8a'); pennant(ctx, 820, 1200, 520, lt + 1, '#3e5f8a');
    const p = eBack(prog(lt, .5, .5)); if (p > 0) diyojen(ctx, CX, 880 + (1 - p) * 160, 1.0 * p, { robe: '#3e5f8a' });
    tag(ctx, 'MACAR KRALI SİGİSMUND', CX, 1260, 56, lt, 1.0, '#3e5f8a', C.cream, 2);
  } },
  { s: 5.28, e: 8.12, draw(ctx, lt, d) { // Avrupa ayağa kalkar
    camera(ctx, lt, d, 1, 1.08, 420, 760); euroMap(ctx);
    const buda = P(19.05, 47.5), nik = P(...NIK);
    pin(ctx, ...buda, 1.1, lt, 0, '#3e5f8a'); tag(ctx, 'BUDİN', buda[0] + 40, buda[1] - 130, 38, lt, .1, '#3e5f8a');
    [[[-200, 360], [80, 520], [buda[0] - 30, buda[1] - 10]], [[-200, 760], [60, 720], [buda[0] - 30, buda[1] + 10]], [[-120, 1150], [110, 960], [buda[0] - 10, buda[1] + 30]]].forEach((r, i) => arrow(ctx, curvePts(...r), eInOut(prog(lt, .1 + i * .35, 1.4)), '#3e5f8a', 12));
    pin(ctx, ...nik, 1.1, lt, 1.8, C.red);
    tag(ctx, 'AVRUPA AYAĞA KALKTI', CX, 300, 60, lt, .3, '#3e5f8a');
    tag(ctx, 'OSMANLI\'YA KARŞI', CX, 1250, 54, lt, 1.4, C.red, C.cream, 2);
  } },
  { s: 8.12, e: 11.34, draw(ctx, lt, d) { // Fransız, Alman, Macar
    dusk(ctx, lt); camera(ctx, lt, d, 1, 1.06, CX, 900); dust(ctx, lt, 300, 1230, 12);
    const cols = ['#2c4d8f', '#7a3b26', '#3e5f8a'];
    for (let r = 0; r < 3; r++) for (let i = 0; i < 3; i++) { const x = ((lt * (140 + r * 20) + i * 440 + r * 170) % 1500) - 250; knight(ctx, x, 940 + r * 170, .62 + r * .12, 1, lt * 9 + i * 1.3 + r, cols[r]); }
    tag(ctx, 'FRANSIZ ŞÖVALYELERİ', CX, 300, 56, lt, 0, '#2c4d8f');
    tag(ctx, 'ALMAN', 300, 450, 52, lt, 1.4, '#7a3b26');
    tag(ctx, 'MACAR', 700, 450, 52, lt, 2.1, '#3e5f8a');
  } },
  { s: 11.34, e: 14.38, draw(ctx, lt, d) { // Tuna boyunca
    camera(ctx, lt, d, 1, 1.07, 420, 800); balkanMap(ctx);
    const nik = PB(...NIK);
    const route = DANUBE.slice(4, 17).map(p => PB(...p)); route[route.length - 1] = nik;
    const r2 = [...DANUBE.slice(4, 15).map(p => PB(...p)), [nik[0] - 30, nik[1]]];
    arrow(ctx, r2, eInOut(prog(lt, .2, 2.4)), '#3e5f8a', 16, true);
    const k = eInOut(prog(lt, .2, 2.4)); const pp = partial(r2, k); const hd = pp[pp.length - 1];
    if (k > 0) marching(ctx, 0, hd[0] - 30, hd[1] - 40, 4, '#3e5f8a', 1, 0, .9);
    tag(ctx, 'TUNA', ...PB(21.6, 44.2), 38, lt, .3, '#3d6676');
    pin(ctx, ...nik, 1.3, lt, 2.4, C.red); tag(ctx, 'NİĞBOLU', nik[0], nik[1] + 70, 46, lt, 2.5, C.red);
    tag(ctx, 'BÜYÜK HAÇLI ORDUSU', CX, 300, 60, lt, 0, '#3e5f8a');
  } },
  { s: 14.38, e: 17.39, draw(ctx, lt, d) { // kuşatma, kale direnir
    dusk(ctx, lt); camera(ctx, lt, d, 1, 1.06, CX, 900); shake(ctx, lt, 2.0, 10);
    fortress(ctx, 560, 900, 1.05, lt);
    for (let i = 0; i < 14; i++) { const t = ((lt * .9 + i / 14) % 1); const x = lerp(120 + (i % 7) * 40, 450 + (i % 5) * 50, t), y = lerp(1300, 800, t) - Math.sin(t * Math.PI) * 160; arrowShot(ctx, x, y, -0.9 + t * .9, 50); }
    for (let i = 0; i < 2; i++) for (let k = 0; k < 7; k++) pawn(ctx, 110 + k * 70 + Math.sin(lt * 6 + k) * 4, 1250 + i * 70, 1.4, '#3e5f8a');
    for (let i = 0; i < 5; i++) pawn(ctx, 380 + i * 90, 770 + Math.abs(Math.sin(lt * 5 + i)) * -6, 1.0, C.red);
    tag(ctx, 'NİĞBOLU KALESİ', CX, 300, 64, lt, 0, C.ink);
    stampBox(ctx, 'KALE DİRENİR', CX, 470, 84, C.red, lt, 1.9, -6);
  } },
  { s: 17.39, e: 20.70, draw(ctx, lt, d) { // Yıldırım Bayezid geliyor
    ctx.drawImage(paperTex('#3a3530', 'night'), 0, 0); camera(ctx, lt, d, 1, 1.07, CX, 860);
    ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = C.gold; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + lt * .3; ctx.beginPath(); ctx.moveTo(CX, 800); ctx.arc(CX, 800, 1000, a, a + .14); ctx.fill(); } ctx.restore();
    const fl = (lt * 2.2) % 1; bolt(ctx, 180, 560, 1.2, fl < .5 ? 1 : .3); bolt(ctx, 830, 600, 1.0, fl >= .5 ? 1 : .3);
    shake(ctx, lt, 1.66, 12);
    const p = eBack(prog(lt, 1.5, .5)); if (p > 0) padisah(ctx, CX, 850 + (1 - p) * 160, 1.0 * p, { kaftan: '#7a1f1a' });
    horseArcher(ctx, lerp(-200, 1200, (lt / d)), 1300, .7, 1, lt * 14, C.cream, false);
    tag(ctx, 'HABER YAYILDI', CX, 300, 58, lt, 0, C.cream, C.ink);
    bigText(ctx, 'YILDIRIM BAYEZİD', CX, 1180, 82, C.cream, lt, 1.7, F_SANS, [C.red, 12]);
  } },
  { s: 20.70, e: 23.39, draw(ctx, lt, d) { // İstanbul kuşatmasını bırakır
    dusk(ctx, lt); pan(ctx, lt, d, 40, 0, 1, 1.05, CX, 900);
    walls(ctx, 1000, .9);
    const k = lt; for (let r = 0; r < 2; r++) marching(ctx, k, 620 - r * 60, 1150 + r * 90, 10, C.red, -1, 150, 1.3);
    tug(ctx, 560 - lt * 150, 1130, 300, lt);
    dust(ctx, lt, 700 - lt * 120, 1240, 14);
    tag(ctx, 'İSTANBUL KUŞATMASI', CX, 300, 60, lt, 0, C.ink);
    stampBox(ctx, 'HEMEN BIRAKILDI', CX, 470, 76, C.red, lt, 1.6, -6);
  } },
  { s: 23.39, e: 26.07, draw(ctx, lt, d) { // Balkanları aşar
    camera(ctx, lt, d, 1, 1.08, 600, 860); balkanMap(ctx);
    const ist = PB(28.97, 41.01), nik = PB(...NIK);
    pin(ctx, ...ist, 1, lt, 0, C.red); tag(ctx, 'İSTANBUL', ist[0] - 60, ist[1] + 70, 40, lt, .1, C.red);
    const route = [ist, PB(27.5, 41.3), PB(26.55, 41.67), PB(25.6, 42.3), PB(25.3, 42.75), PB(25.6, 43.08), [nik[0] + 20, nik[1] + 20]];
    arrow(ctx, route, eInOut(prog(lt, .1, 2.0)), C.red, 16, true);
    pin(ctx, ...nik, 1.3, lt, 2.0, C.ink); tag(ctx, 'NİĞBOLU', nik[0], nik[1] - 140, 46, lt, 2.1, C.ink);
    tag(ctx, 'BALKANLAR', ...PB(24.6, 42.45), 40, lt, .5, '#7d6a52');
    tag(ctx, 'HIZLA KUZEYE', CX, 300, 62, lt, 0, C.red);
  } },
  { s: 26.07, e: 28.82, draw(ctx, lt, d) { // 25 Eylül, Fransız şövalyeleri
    dusk(ctx, lt); camera(ctx, lt, d, 1.0, 1.08, CX, 1000);
    for (let i = 0; i < 4; i++) { const x = 1250 - ((lt * 110 + i * 330) % 1600); knight(ctx, x, 1180 + (i % 2) * 50, .85, -1, lt * 7 + i, '#2c4d8f'); }
    for (let i = 0; i < 4; i++) pennant(ctx, 1250 - ((lt * 110 + i * 330 + 160) % 1600), 1080, 220, lt, i % 2 ? '#2c4d8f' : C.gold);
    sealPro(ctx, '25 Eylül', 'Niğbolu Savaşı', CX, 520, 170, C.red, lt, 0, '1396');
    tag(ctx, 'GURURLU FRANSIZ ŞÖVALYELERİ', CX, 820, 48, lt, 1.0, '#2c4d8f');
  } },
  { s: 28.82, e: 31.05, draw(ctx, lt, d) { // dinlemeden hücum
    dusk(ctx, lt); shake(ctx, lt, 1.25, 12); camera(ctx, lt, d, 1.0, 1.1, CX, 1000);
    dust(ctx, lt, 700, 1200, 16); dust(ctx, lt, 300, 1260, 12);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) { const x = 1250 - ((lt * 340 + i * 360 + r * 120) % 1600); knight(ctx, x, 1000 + r * 140, .68 + r * .12, -1, lt * 14 + i + r, ['#2c4d8f', '#7a3b26', '#2c4d8f'][r]); }
    tag(ctx, 'SİGİSMUND\'U DİNLEMEDEN', CX, 300, 56, lt, 0, '#3e5f8a');
    stampBox(ctx, 'HÜCUM!', CX, 520, 130, C.red, lt, 1.2, -7);
  } },
  { s: 31.05, e: 33.76, draw(ctx, lt, d) { // ön saflar, kazıklar
    dusk(ctx, lt); camera(ctx, lt, d, 1.05, 1.0, CX, 1000);
    const k = eOut(prog(lt, 0, 1.6));
    for (let i = 0; i < 9; i++) pawn(ctx, 160 + i * 85 - k * 160 * (i % 2 ? 1 : .6), 900 + (i % 3) * 30, 1.2, '#c96a5a');
    for (let i = 0; i < 9; i++) stake(ctx, 140 + i * 90, 1210, 1.1);
    const slow = lerp(260, 90, eOut(prog(lt, 1.4, .8)));
    for (let i = 0; i < 3; i++) { const x = 1150 - ((lt * slow + i * 330) % 1100); knight(ctx, x, 1340 - (i % 2) * 30, .55, -1, lt * (slow / 25) + i, '#2c4d8f'); }
    tag(ctx, 'ÖN SAFLAR GEÇİLDİ', CX, 300, 58, lt, 0, C.ink);
    stampBox(ctx, 'SİVRİ KAZIKLAR', CX, 600, 80, C.red, lt, 1.75, -5);
  } },
  { s: 33.76, e: 35.69, draw(ctx, lt, d) { // ok yağmuru
    dusk(ctx, lt, { top: '#cfb98a', bot: '#e6d3a8' }); camera(ctx, lt, d, 1, 1.06, CX, 900); shake(ctx, lt, .6, 8);
    for (let i = 0; i < 6; i++) pawn(ctx, 640 + (i % 3) * 90, 1150 + Math.floor(i / 3) * 80 - Math.abs(Math.sin(lt * 8 + i)) * 6, 1.6, C.red);
    for (let i = 0; i < 3; i++) knight(ctx, 120 + i * 150, 1260 + (i % 2) * 40, .55, 1, lt * 4 + i, '#2c4d8f');
    volley(ctx, lt, [700, 1060, 200], [260, 1180, 300], 36, 0, .9, C.ink);
    tag(ctx, 'OK YAĞMURU', CX, 300, 70, lt, 0, C.red);
    tag(ctx, 'HÜCUM YAVAŞLADI', CX, 470, 52, lt, 1.1, C.ink);
  } },
  { s: 35.69, e: 39.29, draw(ctx, lt, d) { // yokuş, sipahiler
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 900); hill(ctx, lt);
    const up = eInOut(prog(lt, 0, 2.4));
    for (let i = 0; i < 3; i++) { const t = clamp(up * .7 + i * .1); knight(ctx, lerp(80, 420, t) - i * 60, lerp(1240, 960, t) + i * 70, .5, 1, lt * 5 + i, '#2c4d8f'); }
    const sp = eOut(prog(lt, 2.0, 1.2));
    if (sp > 0) for (let i = 0; i < 3; i++) sipahi(ctx, lerp(1250, 760, sp) + i * 120, 720 + i * 50, .6, -1, lt * 12 + i);
    tug(ctx, 860, 700, 260, lt);
    tag(ctx, 'YOKUŞU TIRMANDILAR', CX, 300, 58, lt, 0, '#2c4d8f');
    tag(ctx, 'BAYEZİD\'İN SİPAHİLERİ', CX, 450, 56, lt, 2.4, C.red, C.cream, 2);
  } },
  { s: 39.29, e: 41.72, draw(ctx, lt, d) { // kanatlardan kuşatma, dağılma
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 860);
    const c = [CX, 860]; const sc = eOut(prog(lt, 1.3, 1.0));
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; const r = 110 + Math.sin(lt * 3 + i) * 6 + sc * 140 * hash(i + 2); const x = c[0] + Math.cos(a) * r, y = c[1] + Math.sin(a) * r; ctx.save(); ctx.translate(x, y); ctx.rotate(sc * (hash(i) - .5) * 2); shape(ctx, [[-26, -16], [26, -16], [26, 16], [-26, 16]], '#2c4d8f', C.ink, 3, .4); ctx.restore(); }
    arrow(ctx, curvePts([170, 1230], [80, 800], [380, 560]), eInOut(prog(lt, 0, 1.3)), C.red, 16);
    arrow(ctx, curvePts([830, 1230], [920, 800], [620, 560]), eInOut(prog(lt, .1, 1.3)), C.red, 16);
    const ring = eOut(prog(lt, 1.1, .7)); if (ring > 0) { ctx.save(); ctx.setLineDash([24, 14]); ctx.beginPath(); ctx.arc(c[0], c[1], 300, -Math.PI / 2, -Math.PI / 2 + ring * Math.PI * 2); ctx.strokeStyle = C.red; ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); }
    tag(ctx, 'KANATLARDAN KUŞATMA', CX, 300, 58, lt, 0, C.red);
    stampBox(ctx, 'HAÇLILAR DAĞILDI', CX, 1260, 72, C.red, lt, 1.5, -5);
  } },
  { s: 41.72, e: 45.66, draw(ctx, lt, d) { // Lazareviç'in Sırp süvarileri
    dusk(ctx, lt); camera(ctx, lt, d, 1, 1.07, CX, 1000); shake(ctx, lt, 2.6, 10);
    dust(ctx, lt, 400, 1250, 14);
    for (let r = 0; r < 2; r++) for (let i = 0; i < 3; i++) { const x = ((lt * 230 + i * 470 + r * 220) % 1600) - 300; knight(ctx, x, 1060 + r * 180, .7 + r * .12, 1, lt * 12 + i + r, '#7a2a2a', true); }
    for (let i = 0; i < 3; i++) pennant(ctx, 830 + i * 60, 1000, 260, lt + i, C.red);
    tag(ctx, 'STEFAN LAZAREVİÇ', CX, 300, 60, lt, 0, '#7a2a2a');
    tag(ctx, 'SIRP SÜVARİLERİ', CX, 440, 54, lt, .9, C.ink);
    stampBox(ctx, 'OSMANLI SAFLARINDA', CX, 620, 64, C.red, lt, 2.3, -5);
  } },
  { s: 45.66, e: 48.70, draw(ctx, lt, d) { // Sigismund Tuna'da kayıkla kaçar
    ctx.drawImage(paperTex('#4a4a52', 'dusk2'), 0, 0); camera(ctx, lt, d, 1, 1.07, CX, 1000);
    shape(ctx, [[-200, 860], [300, 830], [700, 870], [1300, 840], [1300, 2300], [-200, 2300]], '#55707a', C.ink, 5, 1.2);
    for (let i = 0; i < 6; i++) { const y = 920 + i * 60; line(ctx, [[-100 + (lt * 60 + i * 90) % 200, y], [400 + (lt * 60) % 200, y + Math.sin(lt * 2 + i) * 6], [1200, y]], 'rgba(207,224,228,.45)', 4, 1); }
    smoke(ctx, (lt % 2.5), 140, 820, 0, 8, 'rgba(90,80,70,.5)'); fire(ctx, 120, 860, .9, lt); fire(ctx, 260, 850, .7, lt + 1);
    kayikKral(ctx, lerp(260, 760, eInOut(lt / d)), 1120, 1.15, lt);
    tag(ctx, 'TUNA', 820, 940, 40, lt, .2, '#3d6676');
    tag(ctx, 'SİGİSMUND KAÇTI', CX, 300, 64, lt, .1, C.cream, C.ink);
  } },
  { s: 48.70, e: 51.42, draw(ctx, lt, d) { // Nevers Kontu esir
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 900);
    knight(ctx, CX - 20, 1150, 1.25, 1, Math.sin(lt * 2) * .4, '#2c4d8f', false);
    for (let i = 0; i < 7; i++) { const t = eOut(prog(lt, 1.6 + i * .06, .5)); chainLink(ctx, lerp(200 + i * 90, 260 + i * 70, t), lerp(560, 860, t) + (i % 2) * 6, 1, (i % 2) * 1.57 + (1 - t) * 3); }
    tag(ctx, 'FRANSIZ KOMUTAN', CX, 300, 58, lt, 0, '#2c4d8f');
    tag(ctx, 'NEVERS KONTU', CX, 440, 62, lt, .5, C.ink);
    stampBox(ctx, 'ESİR', 760, 1250, 96, C.red, lt, 1.8, -8);
  } },
  { s: 51.42, e: 53.48, draw(ctx, lt, d) { // fidye
    bg(ctx); camera(ctx, lt, d, 1, 1.08, CX, 900);
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = C.gold; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + lt * .4; ctx.beginPath(); ctx.moveTo(CX, 1000); ctx.arc(CX, 1000, 900, a, a + .14); ctx.fill(); } ctx.restore();
    chest(ctx, CX, 1200, 1.3);
    for (let i = 0; i < 16; i++) { const t = ((lt * .9 + hash(i)) % 1); coin(ctx, CX - 150 + hash(i + 5) * 300, lerp(500, 1000, t), 30, lt * 6 + i); }
    for (let i = 0; i < 9; i++) coin(ctx, CX - 120 + i * 30, 990 - (i % 3) * 14, 28, i);
    stampBox(ctx, 'YÜKLÜ BİR FİDYE', CX, 330, 78, C.red, lt, .4, -5);
  } },
  { s: 53.48, e: 57.09, draw(ctx, lt, d) { // son büyük Haçlı savaşı
    dusk(ctx, lt, { top: '#d9b98a', bot: '#efdcb4', ground: '#9a8656' }); camera(ctx, lt, d, 1.05, 1, CX, 900); shake(ctx, lt, .35, 10);
    [[200, 0], [420, .6], [640, 1.2], [840, 1.8]].forEach(([x, t0], i) => { const f = eInOut(prog(lt, .8 + t0 * .4, 1.0)); ctx.save(); ctx.translate(x, 1230); ctx.rotate(f * (i % 2 ? 1.2 : -1.2)); pennant(ctx, 0, 0, 300, lt + i, '#2c4d8f'); ctx.restore(); });
    smoke(ctx, (lt % 3), 300, 1100, 0, 8, 'rgba(90,80,70,.4)'); smoke(ctx, ((lt + 1.5) % 3), 760, 1080, 0, 8, 'rgba(90,80,70,.4)');
    sealPro(ctx, 'Son Büyük Savaş', 'Klasik Haçlı Seferleri', CX, 520, 190, C.red, lt, .2, 'Niğbolu 1396');
  } },
  { s: 57.09, e: 60.08, draw(ctx, lt, d) { // Balkanlar'da güçlü
    camera(ctx, lt, d, 1.08, 1, 520, 860); balkanMap(ctx);
    const pu = .4 + Math.sin(lt * 5) * .15; ctx.save(); ctx.globalAlpha = pu; drawLand(ctx, BW, OTT1396, C.red); ctx.restore();
    const dl = DANUBE.slice(9, 18).map(p => PB(...p)); line(ctx, partial(dl, eInOut(prog(lt, .2, 1.8))), C.red, 14, 1);
    tug(ctx, ...PB(25.3, 42.4), 220, lt);
    tag(ctx, 'OSMANLI', ...PB(24.4, 41.6), 50, lt, .3, C.red);
    tag(ctx, 'BALKANLAR\'DA ARTIK ÇOK GÜÇLÜ', CX, 300, 50, lt, .1, C.ink);
  } },
  { s: 60.08, e: 62.07, draw(ctx, lt, d) { // bir kral kayıkla kaçtı
    ctx.drawImage(paperTex('#2f3440', 'nightriver'), 0, 0); camera(ctx, lt, d, 1, 1.1, CX, 1000);
    ell(ctx, 760, 420, 70, 70, '#f3e9d2', null);
    shape(ctx, [[-200, 900], [1300, 900], [1300, 2300], [-200, 2300]], '#3d5560', C.ink, 4, 1);
    for (let i = 0; i < 4; i++) { const k = (lt * .7 + i / 4) % 1; ctx.globalAlpha = 1 - k; ell(ctx, 760, 1000 + i * 4, 40 + k * 260, 6 + k * 30, null, '#cfe0e4', 3); } ctx.globalAlpha = 1;
    kayikKral(ctx, lerp(380, 600, eInOut(lt / d)), 1100, lerp(.9, .7, lt / d), lt);
    bigText(ctx, 'BİR KRAL KAYIKLA KAÇTI...', CX, 330, 66, C.cream, lt, .1, F_SANS, [C.ink, 10]);
  } },
  { s: 62.07, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 800);
    ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = C.gold; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .3; ctx.beginPath(); ctx.moveTo(CX, 880); ctx.arc(CX, 880, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    const fl = (lt * 2) % 1; bolt(ctx, 170, 820, 1.0, fl < .5 ? 1 : .35); bolt(ctx, 840, 820, 1.0, fl >= .5 ? 1 : .35);
    padisah(ctx, CX, 920, .95, { kaftan: '#7a1f1a' });
    bigText(ctx, 'AVRUPA', CX, 330, 96, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'YILDIRIM\'I UNUTMADI', CX, 480, 64, lt, .7, C.ink, C.cream);
  } },
];
