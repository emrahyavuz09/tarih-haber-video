// ===== Ankara Savaşı 1402: Timur ve Yıldırım Bayezid (akşam) =====
const KEY = ['ESİR', 'OSMANLI', 'TİMUR,', 'YILDIRIM', 'BAYEZİD.', 'BAYEZİD,', 'İSTANBUL', 'ANKARA\'YA', 'TEMMUZ.', 'ÇUBUK', 'OVASI.', 'ÇAYI\'NIN', 'SUSUZ', 'FİLLERİ', 'KARA', 'TATARLAR', 'SAF', 'SIRP', 'YENİÇERİLER,', 'ESİR', 'KAFESTE', 'TARTIŞMALIDIR.', 'AKŞEHİR\'DE,', 'TAHT', 'YIKILMADI...', 'KÜLLERİNDEN'];
const DURATION = 61.37 + 2.2;
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
// yeniçeri: mavi dolama, beyaz börk, mızrak
function yeniceri(ctx, x, y, s, lt = 0, aim = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(0, Math.sin(lt * 2 + x) * 1.5);
  shape(ctx, [[-34, 0], [-30, -70], [-18, -92], [18, -92], [30, -70], [34, 0]], '#2d4a7a', C.ink, 4, .6);
  line(ctx, [[-30, -40], [30, -40]], C.red, 7, .3);
  ell(ctx, 0, -112, 20, 22, C.skin, C.ink, 4);
  line(ctx, [[-10, -104], [0, -101], [10, -104]], C.ink, 4, .2);
  shape(ctx, [[-20, -128], [-18, -168], [-44, -214], [-30, -222], [8, -170], [20, -128]], '#f6f1e6', C.ink, 4, .6);
  shape(ctx, [[-22, -134], [22, -134], [22, -124], [-22, -124]], C.gold, C.ink, 3, .3);
  line(ctx, [[42, 10], [42, -250]], '#6e4a2c', 7, .2); shape(ctx, [[34, -250], [50, -250], [42, -290]], '#cfd3d6', C.ink, 3, .2); // 1402: mızrak (tüfek yok)
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
// ---- Ankara'ya özel ----
const CX = 500;
const AN = { x: 520, y: 840, lon: 31.2, lat: 39.6, k: 110 };
const PA = (lon, lat) => proj(AN, lon, lat);
function anaMap(ctx) {
  regionMap(ctx, AN, { seas: [SEA_BLACK, SEA_MED, SEA_MARMARA, AEGEAN] });
  drawLand(ctx, AN, ANATOLIA, '#e3cf9f'); drawLand(ctx, AN, THRACE, '#e3cf9f');
  mountains(ctx, AN, [[30.0, 37.6], [31.2, 37.4], [32.5, 37.2], [34.0, 37.3], [33.5, 41.2], [35.0, 41.0], [29.5, 39.9], [30.5, 40.6]]);
}
// Timur büstü: koyu sakal, bıyık, kürk kenarlı sivri başlık
function timur(ctx, x, y, s, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], o.robe || '#4a5a3a', C.ink, 6);
  shape(ctx, [[-40, 52], [-10, 260], [10, 260], [40, 52]], '#c9a24a', C.ink, 4);
  for (let i = 0; i < 4; i++) ell(ctx, 0, 110 + i * 38, 6, 6, '#7a1f1a', C.ink, 2);
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 68, 82, C.skin, C.ink, 6);
  ell(ctx, -26, -46, 6, 6, C.ink, null); ell(ctx, 26, -46, 6, 6, C.ink, null);
  line(ctx, [[-46, -64], [-12, -70]], C.ink, 8); line(ctx, [[12, -70], [46, -64]], C.ink, 8);
  line(ctx, [[0, -42], [-6, -12], [6, -10]], C.ink, 4);
  shape(ctx, [[-66, -20], [-58, 40], [-26, 96], [0, 120], [26, 96], [58, 40], [66, -20], [40, 6], [0, 12], [-40, 6]], '#2a1d15', C.ink, 4);
  shape(ctx, [[0, 6], [-46, 14], [-70, 36], [-34, 24], [0, 18], [34, 24], [70, 36], [46, 14]], '#2a1d15', C.ink, 3);
  shape(ctx, [[-62, -110], [-40, -210], [0, -250], [40, -210], [62, -110]], '#8a2a22', C.ink, 6);
  ell(ctx, 0, -250, 10, 10, C.gold, C.ink, 3);
  shape(ctx, [[-82, -120], [-80, -84], [82, -84], [84, -120]], '#6e4a2c', C.ink, 6);
  for (let i = -70; i <= 70; i += 20) line(ctx, [[i, -116], [i + 6, -90]], '#4a3020', 3);
  ctx.restore();
}
// savaş fili (yan), ph: yürüyüş evresi
function elephant(ctx, x, y, s, dir, ph) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); ctx.translate(0, Math.abs(Math.sin(ph)) * -4);
  const col = '#8a8a86';
  [[-80, 1], [-40, -1], [50, -1], [90, 1]].forEach(([lx, k]) => { const a = Math.sin(ph) * .25 * k; ctx.save(); ctx.translate(lx, -60); ctx.rotate(a); shape(ctx, [[-20, 0], [-18, 110], [18, 110], [20, 0]], col, C.ink, 4, .4); ctx.restore(); });
  ell(ctx, 0, -110, 150, 90, col, C.ink, 5);
  ell(ctx, 150, -150, 62, 58, col, C.ink, 5);
  ell(ctx, 120, -150, 40, 56, '#7a7a76', C.ink, 4);
  const tw = Math.sin(ph * 1.3) * 20;
  line(ctx, [[190, -140], [215, -90], [212 + tw * .5, -40], [200 + tw, 10]], col, 26, .5);
  line(ctx, [[180, -112], [230, -100]], '#f3efe6', 8, .2);
  ell(ctx, 168, -164, 5, 5, C.ink, null);
  shape(ctx, [[-90, -190], [60, -190], [60, -260], [-90, -260]], '#8a2a22', C.ink, 4, .4);
  shape(ctx, [[-100, -190], [70, -190], [80, -170], [-110, -170]], C.gold, C.ink, 4, .3);
  line(ctx, [[-20, -260], [-20, -360]], '#6e4a2c', 5, .2); shape(ctx, [[-20, -360], [50, -346 + Math.sin(ph * 2) * 6], [-20, -330]], '#4a5a3a', C.ink, 3, .3);
  line(ctx, [[-148, -110], [-170, -60 + Math.sin(ph) * 10]], C.ink, 5, .3);
  ctx.restore();
}
function cage(ctx, x, y, s, k = 1, sw = 0) { // demir kafes (boş)
  ctx.save(); ctx.translate(x, y); ctx.rotate(sw); ctx.scale(s, s);
  line(ctx, [[0, -420], [0, -300]], C.ink, 6, .3); ell(ctx, 0, -430, 20, 20, null, C.ink, 6);
  shape(ctx, [[-170, -300], [170, -300], [190, -270], [-190, -270]], '#4a4e54', C.ink, 5, .3);
  shape(ctx, [[-190, 0], [190, 0], [190, 26], [-190, 26]], '#4a4e54', C.ink, 5, .3);
  for (let i = 0; i < 9; i++) { const xx = -170 + i * 42.5; const p = clamp(k * 9 - i); if (p > 0) line(ctx, [[xx, -270], [xx, -270 + 270 * p]], '#3a3e44', 9, .2); }
  ctx.restore();
}
function book(ctx, x, y, s, lt, i) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-130, 0], [0, 20], [130, 0], [130, -170], [0, -150], [-130, -170]], '#f3e9d2', C.ink, 5, .5);
  line(ctx, [[0, 20], [0, -150]], C.ink, 4, .3);
  for (let r = 0; r < 5; r++) { line(ctx, [[-110, -140 + r * 26], [-20, -128 + r * 26]], 'rgba(42,29,21,.45)', 4, .5); line(ctx, [[20, -128 + r * 26], [110, -140 + r * 26]], 'rgba(42,29,21,.45)', 4, .5); }
  const f = ((lt * .8 + i * .37) % 1); ctx.save(); ctx.scale(Math.cos(f * Math.PI), 1); shape(ctx, [[0, 20], [120, 2], [120, -168], [0, -150]], '#efe2c4', C.ink, 3, .3); ctx.restore();
  ctx.restore();
}
function sun(ctx, x, y, r, lt) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(lt * .4);
  for (let i = 0; i < 12; i++) { ctx.rotate(Math.PI / 6); shape(ctx, [[r + 10, -14], [r + 60 + Math.sin(lt * 5 + i) * 10, 0], [r + 10, 14]], '#f09a2a', null); }
  ctx.restore(); ell(ctx, x, y, r, r, '#f8d25a', '#e2572b', 6);
}
function river(ctx, pts, lt, w = 70, col = '#7fb0c0', flowA = 1) {
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = C.ink; ctx.lineWidth = w + 10; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke();
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke();
  ctx.setLineDash([30, 40]); ctx.lineDashOffset = -lt * 120 * flowA; ctx.strokeStyle = 'rgba(240,250,252,.7)'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
}
function cracks(ctx, x0, y0, x1, y1, a = 1) {
  ctx.save(); ctx.globalAlpha = a; for (let i = 0; i < 14; i++) { const x = lerp(x0, x1, hash(i)), y = lerp(y0, y1, hash(i + 3)); line(ctx, [[x, y], [x + 30, y + 14], [x + 44, y - 6], [x + 70, y + 8]], 'rgba(60,40,20,.6)', 3, .8); } ctx.restore();
}
function ember(ctx, lt, x, y, n = 24) {
  for (let i = 0; i < n; i++) { const t = (lt * .5 + hash(i)) % 1; const xx = x + (hash(i + 7) - .5) * 500 + Math.sin(lt * 2 + i) * 20, yy = y - t * 700; ctx.globalAlpha = (1 - t); ell(ctx, xx, yy, 6 + hash(i) * 6, 6 + hash(i) * 6, i % 3 ? '#f8d25a' : '#f09a2a', null); }
  ctx.globalAlpha = 1;
}
function blocks(ctx, list, col) { list.forEach(([x, y]) => shape(ctx, [[x - 34, y - 18], [x + 34, y - 18], [x + 34, y + 18], [x - 34, y + 18]], col, C.ink, 3, .4)); }

const SCENES = [
  { s: 0, e: 2.37, draw(ctx, lt, d) { // HOOK — kavurucu yaz ovası: soldan Osmanlı sipahileri, sağdan Timur'un filleri, ortada toz bulutu
    shake(ctx, lt, 0, 20, .32);
    const z = lt < .3 ? lerp(1.2, 1.0, eOut(lt / .3)) : lerp(1.0, 1.06, eInOut((lt - .3) / (d - .3)));
    ctx.translate(W / 2, 1150); ctx.scale(z, z); ctx.translate(-W / 2, -1150);
    const sky = ctx.createLinearGradient(0, 0, 0, 1100); sky.addColorStop(0, '#d9783a'); sky.addColorStop(1, '#f6d58e');
    ctx.fillStyle = sky; ctx.fillRect(-300, -300, W + 600, 1500);
    sun(ctx, 540, 770, 66, lt);
    // sıcak hava titreşimi
    ctx.strokeStyle = 'rgba(255,240,200,.45)'; ctx.lineWidth = 4;
    for (let r = 0; r < 4; r++) { ctx.beginPath(); for (let x = -40; x <= W + 40; x += 20) { const y = 900 + r * 34 + Math.sin(x * .03 + lt * 6 + r) * 6; x === -40 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); }
    shape(ctx, [[-300, 1010], [100, 975], [400, 995], [700, 965], [1000, 990], [1400, 975], [1400, 1100], [-300, 1100]], '#b98a52', C.ink, 4, .8);
    shape(ctx, [[-300, 1060], [300, 1048], [700, 1070], [1400, 1052], [1400, 2200], [-300, 2200]], '#c9a15e', C.ink, 5, 1);
    ctx.strokeStyle = 'rgba(110,80,40,.35)'; ctx.lineWidth = 3;
    for (let i = 0; i < 26; i++) { const x = hash(i + 5) * W, y = 1100 + hash(i + 6) * 500; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6 + Math.sin(lt * 3 + i) * 4, y - 18); ctx.stroke(); }
    const adv = eOut(clamp((lt + .3) / (d + .3)));
    // arka sıra: flamalar ve tuğlar
    for (let i = 0; i < 3; i++) pennant(ctx, -20 + i * 110 + adv * 90, 1110, 170, lt + i, C.red);
    for (let i = 0; i < 2; i++) tug(ctx, 820 + i * 100 - adv * 60, 1110, 180, lt + i);
    // Osmanlı sipahileri (soldan)
    for (let i = 0; i < 3; i++) sipahi(ctx, lerp(-60, 120, adv) + i * 120, 1150 + (i % 2) * 14, .5, 1, lt * 15 + i * 1.7);
    for (let i = 0; i < 2; i++) sipahi(ctx, lerp(-160, 110, adv) + i * 200, 1340 + i * 20, .9, 1, lt * 16 + i * 2.1);
    // Timur'un filleri (sağdan)
    elephant(ctx, lerp(1100, 800, adv), 1150, .5, -1, lt * 6);
    elephant(ctx, lerp(1250, 960, adv), 1175, .5, -1, lt * 6 + 1);
    elephant(ctx, lerp(1120, 790, adv), 1370, .95, -1, lt * 6 + 2);
    // ortada çarpışan toz bulutu (ilk anda patlar)
    const db = eOut(clamp((lt + .1) / .4));
    for (let i = 0; i < 14; i++) { const a = hash(i + 90) * Math.PI * 2, r = (60 + hash(i + 91) * 160) * db; ctx.globalAlpha = .55 - .2 * hash(i + 92);
      ell(ctx, 530 + Math.cos(a) * r * 1.3 + Math.sin(lt * 2 + i) * 14, 1210 + Math.sin(a) * r * .5 - lt * 20, 70 + hash(i + 93) * 50, 46 + hash(i + 94) * 30, '#e8d2a2', null); }
    ctx.globalAlpha = 1;
    dust(ctx, lt, 200, 1340, 12, 'rgba(150,110,60,.45)'); dust(ctx, lt, 860, 1360, 12, 'rgba(150,110,60,.45)');
    hookText(ctx, lt + .6, 'Esir düşen tek Osmanlı sultanı!', { style: 'split', key: 'ESİR', y: 430 });
  } },
  { s: 2.37, e: 6.13, draw(ctx, lt, d) { // Doğuda Timur, batıda Bayezid
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.05, CX, 860);
    bigText(ctx, '1402', CX, 320, 150, C.red, lt, 0, F_SANS, [C.cream, 14]);
    const pT = eBack(prog(lt, 1.0, .5)), pB = eBack(prog(lt, 2.4, .5));
    if (pB > 0) padisah(ctx, 290, 860 + (1 - pB) * 140, .9 * pB, { kaftan: '#7a1f1a' });
    if (pT > 0) timur(ctx, 710, 860 + (1 - pT) * 140, .9 * pT, { dir: -1 });
    const k = 0.5 + Math.sin(lt * 5) * .5; sword(ctx, 470 - 14 * k, 560, 1.4, .55); sword(ctx, 550 + 14 * k, 560, 1.4, -.55);
    tag(ctx, 'TİMUR', 710, 1200, 52, lt, 1.1, '#4a5a3a');
    tag(ctx, 'YILDIRIM BAYEZİD', 300, 1200, 44, lt, 2.5, C.red);
  } },
  { s: 6.13, e: 8.65, draw(ctx, lt, d) { // meydan okuma: mektuplar
    camera(ctx, lt, d, 1, 1.06, 560, 840); anaMap(ctx);
    for (let i = 0; i < 3; i++) { const t = ((lt * .7 + i / 3) % 1); const a = PA(29.5, 40.0), b = PA(38.5, 39.5); const x = lerp(a[0], b[0], i % 2 ? 1 - t : t), y = lerp(a[1], b[1], t) - Math.sin(t * Math.PI) * 260; letter(ctx, x, y, .7, Math.sin(lt * 4 + i) * .3); }
    tag(ctx, 'OSMANLI', ...PA(29.5, 40.3), 44, lt, 0, C.red); tag(ctx, 'TİMUR', 900, PA(0, 39.2)[1], 44, lt, .2, '#4a5a3a');
    stampBox(ctx, 'MEYDAN OKUMA', CX, 330, 84, C.red, lt, .9, -5);
  } },
  { s: 8.65, e: 10.96, draw(ctx, lt, d) { // İstanbul kuşatmasını bırakır
    dusk(ctx, lt); pan(ctx, lt, d, 40, 0, 1, 1.05, CX, 900);
    walls(ctx, 1000, .9);
    for (let r = 0; r < 2; r++) marching(ctx, lt, 620 - r * 60, 1150 + r * 90, 10, C.red, -1, 150, 1.3);
    tug(ctx, 560 - lt * 150, 1130, 300, lt);
    dust(ctx, lt, 700 - lt * 120, 1240, 14);
    tag(ctx, 'İSTANBUL KUŞATMASI', CX, 300, 60, lt, 0, C.ink);
    stampBox(ctx, 'BIRAKILDI', CX, 470, 90, C.red, lt, 1.2, -6);
  } },
  { s: 10.96, e: 13.00, draw(ctx, lt, d) { // Ankara'ya yürür
    camera(ctx, lt, d, 1, 1.08, 520, 840); anaMap(ctx);
    const ist = PA(28.97, 41.01), ank = PA(32.85, 39.93);
    pin(ctx, ...ist, 1, lt, 0, C.red); tag(ctx, 'İSTANBUL', ist[0], ist[1] - 130, 40, lt, .05, C.red);
    const route = [ist, PA(29.9, 40.75), PA(30.4, 40.7), PA(31.6, 40.75), PA(32.6, 40.3), [ank[0] - 10, ank[1] - 10]];
    arrow(ctx, route, eInOut(prog(lt, .05, 1.6)), C.red, 16, true);
    pin(ctx, ...ank, 1.3, lt, 1.5, C.ink); tag(ctx, 'ANKARA', ank[0] + 20, ank[1] + 80, 48, lt, 1.6, C.ink);
    tag(ctx, 'ORDU ANKARA\'YA', CX, 300, 60, lt, 0, C.red);
  } },
  { s: 13.00, e: 16.52, draw(ctx, lt, d) { // 28 Temmuz, Çubuk Ovası, sıcak
    const g = ctx.createLinearGradient(0, 0, 0, 1200); g.addColorStop(0, '#f0c070'); g.addColorStop(1, '#f6e2b8'); ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, 1600);
    camera(ctx, lt, d, 1, 1.06, CX, 900);
    sun(ctx, 760, 760, 90, lt);
    shape(ctx, [[-300, 1080], [300, 1050], [700, 1080], [1400, 1040], [1400, 2300], [-300, 2300]], '#c7a865', C.ink, 5, 1.2);
    for (let i = 0; i < 5; i++) { const y = 1000 - i * 30; ctx.globalAlpha = .35; line(ctx, [[-50, y], [250, y + Math.sin(lt * 4 + i) * 10], [550, y], [850, y + Math.sin(lt * 4 + i + 2) * 10], [1150, y]], '#fff6dc', 5, 1); } ctx.globalAlpha = 1;
    sealPro(ctx, '28 Temmuz', 'Çubuk Ovası', 330, 480, 170, C.red, lt, 0, '1402');
    tag(ctx, 'YAKICI BİR YAZ GÜNÜ', CX, 1220, 56, lt, 2.2, '#8a2a22');
  } },
  { s: 16.52, e: 18.83, draw(ctx, lt, d) { // Çubuk Çayı
    ctx.drawImage(paperTex('#d9c393', 'mapland'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 860);
    river(ctx, curvePts([560, 120], [380, 800], [600, 1500]), lt, 80);
    for (let i = 0; i < 3; i++) { yurt(ctx, 820, 600 + i * 170, .9); yurt(ctx, 170, 640 + i * 170, .8); }
    pennant(ctx, 860, 520, 120, lt, '#4a5a3a'); pennant(ctx, 180, 560, 120, lt, C.red);
    tag(ctx, 'ÇUBUK ÇAYI', CX, 300, 64, lt, 0, '#3d6676');
    tag(ctx, 'İKİ ORDUNUN SUYU', CX, 1250, 54, lt, 1.0, C.ink);
  } },
  { s: 18.83, e: 21.31, draw(ctx, lt, d) { // suyu kendi tarafına çevirir
    ctx.drawImage(paperTex('#d9c393', 'mapland'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 860);
    const k = eInOut(prog(lt, .2, 1.6));
    river(ctx, curvePts([560, 120], [560, 520], [560, 700]), lt, 80);
    ctx.save(); ctx.globalAlpha = 1 - k * .85; river(ctx, curvePts([560, 700], [380, 1000], [600, 1500]), lt, 80); ctx.restore();
    cracks(ctx, 330, 900, 620, 1350, k);
    if (k > 0) river(ctx, partial(curvePts([560, 700], [760, 760], [820, 1060]), k), lt, 70);
    shape(ctx, [[490, 690], [630, 690], [630, 740], [490, 740]], '#8b6a45', C.ink, 4, .4);
    for (let i = 0; i < 3; i++) { yurt(ctx, 840, 560 + i * 170 - (i === 2 ? 0 : 0), .8); yurt(ctx, 170, 640 + i * 170, .8); }
    tag(ctx, 'TİMUR SUYU ÇEVİRDİ', CX, 300, 60, lt, 0, '#4a5a3a');
  } },
  { s: 21.31, e: 23.20, draw(ctx, lt, d) { // susuz kalır
    const g = ctx.createLinearGradient(0, 0, 0, 1200); g.addColorStop(0, '#f0b060'); g.addColorStop(1, '#f6dcb0'); ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, 1600);
    camera(ctx, lt, d, 1.0, 1.08, CX, 1000);
    sun(ctx, 700, 640, 110, lt);
    shape(ctx, [[-300, 1080], [1400, 1060], [1400, 2300], [-300, 2300]], '#c9a96a', C.ink, 5, 1.2); cracks(ctx, 0, 1120, 1000, 1500, 1);
    for (let i = 0; i < 4; i++) yeniceri(ctx, 200 + i * 190, 1280 + Math.sin(lt * 3 + i) * 3, 1.6, lt, 0);
    for (let i = 0; i < 6; i++) { const t = (lt * .6 + i / 6) % 1; ctx.globalAlpha = (1 - t) * .4; ell(ctx, 100 + i * 160, 1080 - t * 200, 30, 50, '#fff6dc', null); } ctx.globalAlpha = 1;
    stampBox(ctx, 'SUSUZ KALDI', CX, 330, 100, C.red, lt, .2, -6);
  } },
  { s: 23.20, e: 25.82, draw(ctx, lt, d) { // savaş filleri
    dusk(ctx, lt); camera(ctx, lt, d, 1, 1.07, CX, 1000); shake(ctx, lt, 1.2, 8);
    dust(ctx, lt, 700, 1240, 14);
    for (let i = 0; i < 3; i++) { const x = 1300 - ((lt * 90 + i * 470) % 1500); elephant(ctx, x, 1250 - (i % 2) * 40, .9 - (i % 2) * .15, -1, lt * 4 + i); }
    tag(ctx, 'TİMUR\'UN ORDUSUNDA', CX, 300, 58, lt, 0, '#4a5a3a');
    stampBox(ctx, 'SAVAŞ FİLLERİ', CX, 470, 84, C.red, lt, .9, -5);
  } },
  { s: 25.82, e: 27.79, draw(ctx, lt, d) { // savaş başlar
    dusk(ctx, lt); shake(ctx, lt, .3, 16); camera(ctx, lt, d, 1.0, 1.1, CX, 1000);
    dust(ctx, lt, 300, 1200, 16); dust(ctx, lt, 700, 1220, 16);
    for (let i = 0; i < 4; i++) { const x = 1250 - ((lt * 330 + i * 360) % 1600); horseArcher(ctx, x, 1080 + (i % 2) * 140, .8, -1, lt * 14 + i, '#4a5a3a'); }
    for (let i = 0; i < 3; i++) sipahi(ctx, ((lt * 300 + i * 420) % 1500) - 250, 1180 + (i % 2) * 110, .75, 1, lt * 14 + i);
    volley(ctx, lt, [900, 1000, 200], [300, 1150, 300], 24, 0, .8);
    stampBox(ctx, 'SAVAŞ BAŞLAR', CX, 360, 100, C.red, lt, .1, -6);
  } },
  { s: 27.79, e: 29.90, draw(ctx, lt, d) { // Kara Tatarlar dönüyor
    dusk(ctx, lt); camera(ctx, lt, d, 1.0, 1.06, CX, 1000);
    const turn = prog(lt, .7, .2);
    for (let i = 0; i < 4; i++) { const base = 200 + i * 180; const x = turn < 1 ? base + lt * 60 : base + 42 + (lt - .9) * 260; horseArcher(ctx, x, 1100 + (i % 2) * 140, .75, turn < 1 ? -1 : 1, lt * 12 + i, '#3a3530'); }
    dust(ctx, lt, 600, 1250, 12);
    tag(ctx, 'KARA TATARLAR', CX, 300, 66, lt, 0, '#3a3530');
    tag(ctx, 'SAF DEĞİŞTİRDİ', CX, 450, 60, lt, .9, C.red, C.cream, 2);
  } },
  { s: 29.90, e: 32.38, draw(ctx, lt, d) { // beylik askerleri geçer (kuş bakışı)
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); camera(ctx, lt, d, 1, 1.05, CX, 860);
    blocks(ctx, [[180, 1100], [300, 1100], [420, 1100], [540, 1100], [660, 1100], [780, 1100]], C.red);
    blocks(ctx, [[180, 620], [300, 620], [420, 620], [540, 620], [660, 620], [780, 620]], '#4a5a3a');
    const k = eInOut(prog(lt, .3, 1.5));
    blocks(ctx, [[lerp(180, 120, k), lerp(980, 700, k)], [lerp(300, 240, k), lerp(980, 700, k)], [lerp(660, 760, k), lerp(980, 700, k)], [lerp(780, 880, k), lerp(980, 700, k)]], '#c98a3a');
    arrow(ctx, [[210, 950], [150, 760]], k, '#c98a3a', 12); arrow(ctx, [[750, 950], [830, 760]], k, '#c98a3a', 12);
    tag(ctx, 'TİMUR', CX, 520, 46, lt, 0, '#4a5a3a'); tag(ctx, 'OSMANLI', CX, 1200, 46, lt, 0, C.red);
    tag(ctx, 'BEYLİK ASKERLERİ TİMUR\'A GEÇTİ', CX, 300, 46, lt, .3, '#8a5a1a');
  } },
  { s: 32.38, e: 34.66, draw(ctx, lt, d) { // Sırp şövalyeleri sağ kanatta direnir
    dusk(ctx, lt); shake(ctx, lt, 1.0, 10); camera(ctx, lt, d, 1, 1.08, CX, 1000);
    dust(ctx, lt, 500, 1240, 14);
    for (let r = 0; r < 2; r++) for (let i = 0; i < 3; i++) { const x = ((lt * 260 + i * 470 + r * 220) % 1600) - 300; knight(ctx, x, 1080 + r * 170, .72 + r * .1, 1, lt * 12 + i + r, '#7a2a2a'); }
    tag(ctx, 'SAĞ KANAT', CX, 300, 60, lt, 0, C.ink);
    tag(ctx, 'SIRP ŞÖVALYELERİ DİRENİR', CX, 440, 52, lt, .8, '#7a2a2a');
  } },
  { s: 34.66, e: 38.00, draw(ctx, lt, d) { // yeniçeriler merkezde
    dusk(ctx, lt, { top: '#d9b98a', bot: '#efdcb4' }); camera(ctx, lt, d, 1.0, 1.07, CX, 1000);
    tug(ctx, CX, 1060, 420, lt);
    for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) yeniceri(ctx, 150 + i * 140 + r * 70, 1180 + r * 120, .95 + r * .15, lt + i, 1);
    volley(ctx, lt, [900, 700, 200], [500, 1050, 600], 24, .3, .9);
    tag(ctx, 'MERKEZDE YENİÇERİLER', CX, 300, 58, lt, 0, C.red);
    tag(ctx, 'SULTANLARININ YANINDA', CX, 440, 52, lt, 1.6, C.ink);
  } },
  { s: 38.00, e: 41.46, draw(ctx, lt, d) { // Bayezid çarpışmayı sürdürür
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 860); shake(ctx, lt, 1.6, 10);
    ctx.save(); ctx.globalAlpha = .22; ctx.fillStyle = C.red; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .3; ctx.beginPath(); ctx.moveTo(CX, 820); ctx.arc(CX, 820, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    dust(ctx, lt, 250, 1240, 12); dust(ctx, lt, 750, 1240, 12);
    padisah(ctx, CX, 860, .95, { kaftan: '#7a1f1a' });
    const k = Math.sin(lt * 6); sword(ctx, 210 + k * 20, 1080, 1.4, .5 + k * .3); sword(ctx, 790 - k * 20, 1080, 1.4, -.5 - k * .3);
    tag(ctx, 'YILDIRIM BAYEZİD', CX, 300, 62, lt, 0, C.red);
    tag(ctx, 'BİRKAÇ BİN ASKERLE', CX, 1230, 54, lt, 1.4, C.ink, C.cream, 2);
  } },
  { s: 41.46, e: 43.98, draw(ctx, lt, d) { // esir düşer
    dusk(ctx, lt, { top: '#4a3a3a', bot: '#b0704a', ground: '#4a4030', dark: true }); camera(ctx, lt, d, 1, 1.1, CX, 950);
    const sy = lerp(820, 1000, eInOut(lt / d)); ell(ctx, CX, sy, 120, 120, '#e2873a', null);
    shape(ctx, [[-300, 1030], [1400, 1030], [1400, 2300], [-300, 2300]], '#3a3024', C.ink, 5, 1);
    for (let i = 0; i < 5; i++) horseArcher(ctx, 1200 - ((lt * 90 + i * 260) % 1500), 1090 + (i % 2) * 40, .45, -1, lt * 8 + i, '#1f1712', false);
    stampBox(ctx, 'ESİR DÜŞTÜ', CX, 360, 100, '#e0573f', lt, 1.4, -6);
  } },
  { s: 43.98, e: 47.68, draw(ctx, lt, d) { // kafes rivayeti
    ctx.drawImage(paperTex('#d8c7a2', 'cagebg'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 900);
    cage(ctx, CX, 1180, 1.25, prog(lt, .2, 1.6), Math.sin(lt * 1.6) * .04);
    boxStamp(ctx, '?', CX, 960, 120, C.red, lt, 2.0, 8);
    tag(ctx, 'SONRAKİ YÜZYILLARIN', CX, 300, 56, lt, 0, C.ink);
    stampBox(ctx, 'KAFES RİVAYETİ', CX, 450, 70, C.red, lt, 1.6, -5);
  } },
  { s: 47.68, e: 50.86, draw(ctx, lt, d) { // tarihçiler arasında tartışmalı
    bg(ctx); camera(ctx, lt, d, 1, 1.07, CX, 900);
    book(ctx, 280, 1000, 1.0, lt, 0); book(ctx, 720, 1000, 1.0, lt, 1); book(ctx, CX, 1250, .9, lt, 2);
    stampBox(ctx, 'TARTIŞMALI', CX, 680, 96, C.red, lt, 2.2, -8);
    tag(ctx, 'TARİHÇİLER ARASINDA', CX, 300, 58, lt, 0, C.ink);
    text(ctx, '(Dönemin birçok tanığı kafesten söz etmez)', CX, 440, 30, 'rgba(42,29,21,.8)', F_SANS, 700);
  } },
  { s: 50.86, e: 54.78, draw(ctx, lt, d) { // Akşehir 1403
    camera(ctx, lt, d, 1, 1.1, 480, 880); anaMap(ctx);
    const ank = PA(32.85, 39.93), ak = PA(31.42, 38.36);
    pin(ctx, ...ank, 1, lt, 0, C.ink); tag(ctx, 'ANKARA', ank[0] + 40, ank[1] - 130, 40, lt, .1, C.ink);
    arrow(ctx, curvePts(ank, [ank[0] - 60, ak[1] - 60], ak), eInOut(prog(lt, .3, 1.6)), '#7a2a2a', 12, true);
    pin(ctx, ...ak, 1.3, lt, 1.8, C.red); tag(ctx, 'AKŞEHİR', ak[0], ak[1] + 70, 48, lt, 1.9, C.red);
    sealPro(ctx, '8 Mart 1403', 'Akşehir', CX, 400, 140, C.ink, lt, 2.4, 'ESARETTE VEFAT');
  } },
  { s: 54.78, e: 58.05, draw(ctx, lt, d) { // 11 yıllık taht kavgası
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 860);
    const c = [CX, 860];
    for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + lt * .8; const x = c[0] + Math.cos(a) * 250, y = c[1] + Math.sin(a) * 170; ell(ctx, x, y - 110, 54, 40, '#f6f1e6', C.ink, 5); pawn(ctx, x, y + 40, 3.0, ['#7a1f1a', '#2f6b4f', '#3e5f8a', '#6a4a8c'][i]); }
    ell(ctx, c[0], c[1] - 30, 90, 40, null, C.gold, 8);
    crown(ctx, c[0], c[1] - 40 + Math.sin(lt * 3) * 10, .6, Math.sin(lt * 2) * .2);
    tag(ctx, '11 YIL TAHT KAVGASI', CX, 300, 62, lt, 0, C.ink);
    stampBox(ctx, 'FETRET DEVRİ', CX, 1250, 80, C.red, lt, 1.2, -5, '1402 – 1413');
  } },
  { s: 58.05, e: 60.44, draw(ctx, lt, d) { // devlet yıkılmadı
    ctx.drawImage(paperTex('#3a3530', 'night'), 0, 0); camera(ctx, lt, d, 1, 1.08, CX, 1000);
    shape(ctx, [[-300, 1240], [1400, 1240], [1400, 2300], [-300, 2300]], '#2a2420', C.ink, 4, 1);
    ember(ctx, lt, CX, 1240, 40);
    const r = eOut(prog(lt, .3, 1.6)); tug(ctx, CX, 1240 + (1 - r) * 300, 520, lt);
    fire(ctx, 300, 1240, 1.1, lt); fire(ctx, 720, 1240, 1.0, lt + .6);
    bigText(ctx, 'AMA DEVLET YIKILMADI', CX, 330, 70, C.cream, lt, .1, F_SANS, [C.red, 10]);
  } },
  { s: 60.44, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 860);
    ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = C.gold; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .3; ctx.beginPath(); ctx.moveTo(CX, 880); ctx.arc(CX, 880, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    ember(ctx, lt, CX, 1300, 30);
    tug(ctx, 200, 1240, 520, lt); tug(ctx, 800, 1240, 520, lt + 1);
    padisah(ctx, CX, 900, .85, { kaftan: '#7a1f1a' });
    bigText(ctx, 'KÜLLERİNDEN', CX, 320, 100, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'YENİDEN DOĞDU', CX, 470, 66, lt, .5, C.ink, C.cream);
  } },
];
