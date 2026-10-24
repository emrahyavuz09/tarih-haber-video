// ===== Kanuni'nin ölümü gizlendi: Zigetvar 1566 (akşam) =====
const KEY = ['PADİŞAH', 'KANUNİ', 'SÜLEYMAN', 'ZİGETVAR', 'SOKULLU', 'SIR,', 'SUSMA', 'İYİLEŞTİĞİ', 'DÜŞTÜ', 'SELİM', 'SELİM\'E', 'BELGRAD\'A', 'BELGRAD\'DA', 'KIRK', 'SEKİZ', 'HAFIZLAR', 'ZAFERLE', 'GİZLİCE', 'SON'];
const DURATION = 62.91 + 2.2;
const OUTRO_AT = DURATION - 1.6;
const EU = { x: 540, y: 820, lon: 21, lat: 45, k: 48 };
const EU2 = { x: 540, y: 900, lon: 24, lat: 43, k: 40 };
const ADRIATIC = [[12.2, 45.5], [13.7, 45.7], [14.5, 45.2], [15.2, 44.2], [16.4, 43.5], [17.6, 43.0], [18.5, 42.4], [19.4, 41.9], [19.5, 40.8], [19.3, 40.3], [18.5, 40.1], [16.9, 41.1], [16.0, 41.9], [15.0, 42.0], [14.0, 42.6], [13.6, 43.5], [12.4, 44.2], [5, 44], [5, 46]];
const AEGEAN = [[22.6, 40.5], [23.5, 40.2], [24.2, 40.8], [26.0, 40.6], [26.7, 40.35], [26.2, 40.05], [26.1, 39.5], [26.6, 39.3], [26.9, 38.7], [26.3, 38.25], [26.9, 38.0], [27.3, 37.3], [24, 37], [22.9, 38], [23.2, 39.2]];
const DANUBE = [[16.37, 48.2], [17.1, 48.1], [18.0, 47.75], [18.9, 47.8], [19.05, 47.5], [18.95, 46.8], [18.85, 46.3], [18.68, 45.99], [19.0, 45.4], [20.0, 45.25], [20.46, 44.82], [21.4, 44.7], [22.5, 44.6], [22.9, 44.0], [24.0, 43.7], [25.9, 43.8], [27.2, 44.1], [28.2, 45.4], [29.6, 45.2]];
const GREECE = [[19.4, 41.9], [20.5, 42], [22.6, 41.3], [24, 41], [26, 40.9], [26, 40.6], [24.2, 40.8], [23.5, 40.2], [22.6, 40.5], [23.2, 39.2], [22.9, 38], [24, 37.6], [22.5, 36.4], [21.6, 36.8], [21.1, 37.9], [20.2, 39.6], [19.3, 40.3], [19.5, 40.8]];
const ZIG = [17.79, 46.05], IST = [28.97, 41.01], BEL = [20.46, 44.82], KUT = [29.98, 39.42];

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
function euroMap(ctx, m) {
  regionMap(ctx, m, { seas: [SEA_BLACK, SEA_MED, SEA_MARMARA, ADRIATIC, AEGEAN] });
  drawLand(ctx, m, GREECE, '#d9c393');
  line(ctx, DANUBE.map(p => proj(m, ...p)), '#6f9fb0', 9, .8);
  mountains(ctx, m, [[24, 45.6], [25.5, 45.5], [23, 46.6], [24.5, 47.4], [22.5, 42.4], [24.5, 42.0], [20.5, 43.2], [18.5, 43.8], [26, 42.8], [31, 39.5], [33, 38.5]]);
}
function plain(ctx, lt, o = {}) { // ova / ordugâh zemini
  const sky = ctx.createLinearGradient(0, 0, 0, 1100);
  sky.addColorStop(0, o.top || '#e6d3a8'); sky.addColorStop(1, o.bot || '#f1e3c2');
  ctx.fillStyle = sky; ctx.fillRect(-300, -300, W + 600, 1500);
  if (o.stars) for (let i = 0; i < 40; i++) { ctx.globalAlpha = .4 + .5 * Math.abs(Math.sin(lt * 2 + i)); ell(ctx, hash(i) * W, 220 + hash(i + 4) * 600, 3, 3, '#f6ecd0', null); }
  ctx.globalAlpha = 1;
  if (!o.stars) for (let i = 0; i < 4; i++) { const x = ((lt * 28 + i * 330) % 1500) - 250, y = 300 + (i % 2) * 130; ctx.globalAlpha = .45; ell(ctx, x, y, 110, 26, '#fff8e8', null); ell(ctx, x + 60, y - 18, 70, 24, '#fff8e8', null); }
  ctx.globalAlpha = 1;
  shape(ctx, [[-300, 1050], [200, 1030], [600, 1060], [1000, 1025], [1400, 1050], [1400, 2200], [-300, 2200]], o.ground || '#b7a06a', C.ink, 5, 1.2);
  ctx.strokeStyle = 'rgba(70,55,25,.35)'; ctx.lineWidth = 3;
  for (let i = 0; i < 36; i++) { const x = hash(i) * W, y = 1080 + hash(i + 9) * 600; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6 + Math.sin(lt * 3 + i) * 4, y - 20); ctx.stroke(); }
}
// ---- figürler ----
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
function rider(ctx, x, y, s, dir, ph) { // ulak: atlı haberci
  horse(ctx, x, y, s, dir, ph, '#3a2e24', .7);
  ctx.save(); ctx.translate(x, y + Math.sin(ph * 2) * 3 * s); ctx.scale(s * dir, s);
  shape(ctx, [[-16, -74], [-22, -150], [16, -156], [24, -78]], '#2d4a7a', C.ink, 3, .4);
  ell(ctx, 0, -172, 18, 20, C.skin, C.ink, 3);
  shape(ctx, [[-18, -184], [-14, -214], [16, -214], [20, -184]], C.red, C.ink, 3, .4);
  shape(ctx, [[-22, -140], [-60, -128 + Math.sin(ph) * 8], [-66, -100], [-24, -110]], C.red, null); // pelerin
  ctx.restore();
}
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
function cannon(ctx, x, y, s, fire = 0) {
  ctx.save(); ctx.translate(x - Math.sin(clamp(fire) * Math.PI) * 18 * s, y); ctx.scale(s, s);
  shape(ctx, [[-70, -20], [-60, -36], [80, -54], [96, -50], [96, -26], [80, -24], [-60, -6]], '#b8892f', C.ink, 4, .6);
  shape(ctx, [[-90, 0], [-40, -20], [40, -16], [30, 6]], '#6e4a2c', C.ink, 4, .5);
  ell(ctx, -6, 4, 34, 34, '#8b6a45', C.ink, 5); ell(ctx, -6, 4, 8, 8, C.ink, null);
  if (fire > 0 && fire < 1) { ctx.globalAlpha = 1 - fire; shape(ctx, [[96, -38], [150 + fire * 40, -70], [140, -38], [170 + fire * 60, -20], [100, -30]], '#f8d25a', '#e2572b', 4, 3); ctx.globalAlpha = 1; }
  ctx.restore();
}
function smoke(ctx, lt, x, y, t0, n = 10, c = 'rgba(235,228,214,.8)') {
  const k = lt - t0; if (k < 0) return;
  for (let i = 0; i < n; i++) { const a = hash(i + x) * Math.PI * 2; const r = 20 + k * (60 + hash(i) * 70); ctx.globalAlpha = clamp(1 - k / 3.2) * .85; ell(ctx, x + Math.cos(a) * r * .8 + k * 40, y + Math.sin(a) * r * .4 - k * 30, 34 + k * 30, 26 + k * 22, c, null); }
  ctx.globalAlpha = 1;
}
function tug(ctx, x, y, h, lt, col = '#2a1d15') {
  line(ctx, [[x, y], [x, y - h]], '#6e4a2c', 10, .4); ell(ctx, x, y - h - 10, 14, 14, C.gold, C.ink, 4);
  for (let i = 0; i < 7; i++) { const a = (i - 3) * 6; const sw = Math.sin(lt * 4 + i * .6) * 22; line(ctx, [[x, y - h + 10], [x + a + sw * .5 + 20, y - h + 70], [x + a + sw + 40, y - h + 150]], i % 2 ? col : '#5a4632', 9, .4); }
}
function pennant(ctx, x, y, h, lt, col) {
  line(ctx, [[x, y], [x, y - h]], '#6e4a2c', 6, .3);
  const w = Math.sin(lt * 6 + x) * 10; shape(ctx, [[x, y - h], [x + 80, y - h + 18 + w], [x, y - h + 40]], col, C.ink, 3, .4);
}
function castle(ctx, x, y, s) { // Zigetvar: su içinde kale
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-420, 80], [-380, 20], [380, 20], [420, 80], [420, 140], [-420, 140]], '#7fa7b3', C.ink, 5, 1);
  shape(ctx, [[-260, 30], [-260, -110], [240, -110], [240, 30]], '#cdb68a', C.ink, 6, .8);
  for (let i = -260; i < 240; i += 40) shape(ctx, [[i, -110], [i, -134], [i + 22, -134], [i + 22, -110]], '#cdb68a', C.ink, 4, .5);
  [[-260, -190], [240, -190], [-20, -250]].forEach(([tx, th]) => { shape(ctx, [[tx - 40, 30], [tx - 40, th], [tx + 40, th], [tx + 40, 30]], '#bfa577', C.ink, 6, .8); shape(ctx, [[tx - 52, th], [tx, th - 70], [tx + 52, th]], '#7a3b26', C.ink, 5, .6); });
  shape(ctx, [[-40, 30], [-40, -50], [-20, -70], [20, -70], [40, -50], [40, 30]], '#3b2a1e', C.ink, 4, .5);
  ctx.restore();
}
// otağ (padişah çadırı); glow: içerideki mum ışığı 0..1, cur: perde kapanma 0..1
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
function pasa(ctx, x, y, s, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], o.kaftan || '#e9e2cf', C.ink, 6);
  shape(ctx, [[-120, 74], [-40, 52], [-20, 260], [-90, 260]], '#6e4a2c', C.ink, 5); shape(ctx, [[120, 74], [40, 52], [20, 260], [90, 260]], '#6e4a2c', C.ink, 5);
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 66, 80, C.skin, C.ink, 6);
  ell(ctx, -24, -46, 6, 7, C.ink, null); ell(ctx, 24, -46, 6, 7, C.ink, null);
  line(ctx, [[-42, -66], [-12, -64]], C.ink, 7); line(ctx, [[12, -64], [42, -66]], C.ink, 7);
  line(ctx, [[0, -42], [-6, -12], [6, -10]], C.ink, 4);
  shape(ctx, [[-62, -24], [-58, 26], [-34, 74], [0, 92], [34, 74], [58, 26], [62, -24], [38, 4], [0, 10], [-38, 4]], '#4a3a2e', C.ink, 4);
  shape(ctx, [[0, 4], [-38, 14], [-54, 30], [-28, 24], [0, 18], [28, 24], [54, 30], [38, 14]], '#4a3a2e', C.ink, 3);
  // kallavi
  shape(ctx, [[-80, -96], [-92, -220], [-70, -250], [70, -250], [92, -220], [80, -96]], '#f6f1e6', C.ink, 6, .8);
  line(ctx, [[-84, -120], [86, -205]], C.gold, 14, .4);
  shape(ctx, [[-30, -250], [-24, -268], [24, -268], [30, -250]], '#7a1f1a', C.ink, 4);
  ctx.restore();
}
function carriage(ctx, x, y, s, lt) { // kapalı araba
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-170, -60], [170, -60], [150, -20], [-150, -20]], '#6e4a2c', C.ink, 5, .5);
  shape(ctx, [[-150, -60], [-150, -200], [-110, -250], [110, -250], [150, -200], [150, -60]], '#2a2420', C.ink, 6, .5);
  line(ctx, [[-150, -200], [150, -200]], C.gold, 6, .3);
  [-100, 100].forEach(wx => { ctx.save(); ctx.translate(wx, -10); ctx.rotate(lt * 4); ell(ctx, 0, 0, 44, 44, '#8b6a45', C.ink, 6); for (let k = 0; k < 4; k++) line(ctx, [[0, 0], [Math.cos(k * .785) * 40, Math.sin(k * .785) * 40]], C.ink, 4, .2); ctx.restore(); });
  line(ctx, [[170, -40], [260, -40]], '#4a3020', 6, .2);
  ctx.restore();
  horse(ctx, x + 330 * s, y, s * .95, 1, lt * 6, '#3a2e24', .35);
}
function scroll(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-90, -110], [90, -110], [90, 110], [-90, 110]], '#f1e6cc', C.ink, 5, .6);
  for (let i = 0; i < 6; i++) line(ctx, [[-60, -70 + i * 26], [60 - (i % 3) * 18, -70 + i * 26]], 'rgba(42,29,21,.55)', 4, .4);
  ell(ctx, -90, 0, 16, 112, '#d9c393', C.ink, 4); ell(ctx, 90, 0, 16, 112, '#d9c393', C.ink, 4);
  ell(ctx, 30, 82, 20, 20, C.red, C.ink, 3);
  ctx.restore();
}
function rahle(ctx, x, y, s) { // rahle üzerinde kapalı/açık mushaf (yalnız kitap, figür yok)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  line(ctx, [[-110, 0], [110, -170]], '#6e4a2c', 16, .3); line(ctx, [[110, 0], [-110, -170]], '#6e4a2c', 16, .3);
  shape(ctx, [[-160, -170], [0, -150], [0, -260], [-160, -280]], '#f1e6cc', C.ink, 5, .5);
  shape(ctx, [[160, -170], [0, -150], [0, -260], [160, -280]], '#f1e6cc', C.ink, 5, .5);
  for (let i = 0; i < 4; i++) { line(ctx, [[-140, -250 + i * 22], [-20, -232 + i * 22]], 'rgba(42,29,21,.45)', 3, .2); line(ctx, [[20, -232 + i * 22], [140, -250 + i * 22]], 'rgba(42,29,21,.45)', 3, .2); }
  shape(ctx, [[-170, -166], [0, -146], [170, -166], [170, -158], [0, -138], [-170, -158]], '#2f6b4f', C.ink, 3, .3);
  ctx.restore();
}
function calendarPage(ctx, x, y, n, label) {
  tornRect(ctx, x - 150, y - 170, 300, 340, C.cream, n + 3);
  shape(ctx, [[x - 150, y - 170], [x + 150, y - 170], [x + 150, y - 100], [x - 150, y - 100]], C.red, null);
  text(ctx, label, x, y - 135, 34, C.cream);
  text(ctx, String(n), x, y + 30, 150, C.ink);
}

function yMarch(ctx, lt, y, s, n, speed = 80, gap = 120) { // yürüyen yeniçeri sırası (sürekli akar)
  const span = n * gap; for (let i = 0; i < n; i++) { const x = ((lt * speed + i * gap) % span) - 120; yeniceri(ctx, x, y + Math.abs(Math.sin(lt * 8 + i)) * -5, s, lt, 1); }
}
const SCENES = [
  { s: 0, e: 2.2, draw(ctx, lt, d) { // HOOK — gece ordugâh, otağda titreyen mum, perdeler kapanıyor (saygılı, gizemli)
    ctx.save();
    shake(ctx, lt, 0, 18, .3);
    const z = lerp(1.35, 1.0, eOut(clamp(lt / .3))) + lt * .035; ctx.translate(500, 1150); ctx.scale(z, z); ctx.translate(-500, -1150);
    plain(ctx, lt, { top: '#0d1222', bot: '#2b2a3a', ground: '#3b3224', stars: true });
    ell(ctx, 800, 640, 40, 40, '#efe6c8', null);
    ctx.save(); ctx.globalAlpha = .18; ell(ctx, 800, 640, 80, 80, '#efe6c8', null); ctx.restore();
    // sürüklenen bulut (rüzgâr)
    for (let i = 0; i < 3; i++) { const x = ((lt * 160 + i * 420) % 1500) - 300, y = 600 + i * 60; ctx.globalAlpha = .28; ell(ctx, x, y, 150, 22, '#8a8aa0', null); ell(ctx, x + 70, y - 14, 90, 20, '#8a8aa0', null); }
    ctx.globalAlpha = 1;
    // uzak çadırlar (karanlık)
    [[140, 1080, .32], [880, 1075, .3], [330, 1060, .22], [690, 1058, .22]].forEach(([x, y, s]) => { ctx.save(); ctx.globalAlpha = .75; otag(ctx, x, y, s, lt, .25, .9); ctx.restore(); });
    // otağ: içeride titreyen mum, perdeler yavaşça kapanıyor
    otag(ctx, 500, 1250, 1.0, lt, 1, .25 + eInOut(prog(lt, .4, 1.6)) * .45);
    tug(ctx, 150, 1300, 420, lt * 1.6); tug(ctx, 850, 1300, 420, lt * 1.6 + 1);
    // nöbetçiler
    yeniceri(ctx, 290, 1300, .95, lt); yeniceri(ctx, 710, 1300, .95, lt + 1);
    dust(ctx, lt, 500, 1330, 10, 'rgba(160,150,140,.25)');
    ctx.restore();
    // karanlık vinyet + mum titreşimi
    const g = ctx.createRadialGradient(500, 1050, 200, 500, 1000, 900); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,' + (.55 + Math.sin(lt * 9) * .04) + ')');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    hookText(ctx, lt + .6, 'Padişah ölmüştü... ama ordunun bundan haberi yoktu!', { style: 'split', key: 'ölmüştü', y: 420, size: 82 });
  } },
  { s: 2.2, e: 4.85, draw(ctx, lt, d) { // ordugâh, 1566
    plain(ctx, lt); camera(ctx, lt, d, 1, 1.07, W / 2, 1000);
    [[150, 1040, .45], [880, 1030, .42]].forEach(([x, y, s]) => otag(ctx, x, y, s, lt));
    otag(ctx, 520, 1040, .6, lt);
    yMarch(ctx, lt, 1290, .85, 11, 90, 110);
    tug(ctx, 320, 1100, 360, lt); tug(ctx, 720, 1100, 360, lt + 1);
    bigText(ctx, '1566', W / 2, 360, 170, C.red, lt, .9, F_SANS, [C.cream, 14]);
    tag(ctx, 'ORDU HABERSİZ', W / 2, 520, 56, lt, .1, C.ink);
  } },
  { s: 4.85, e: 7.0, draw(ctx, lt, d) { // Kanuni
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 860);
    ctx.save(); ctx.globalAlpha = .22; ctx.fillStyle = C.gold;
    for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .25; ctx.beginPath(); ctx.moveTo(W / 2, 860); ctx.arc(W / 2, 860, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    tug(ctx, 150, 1200, 560, lt); tug(ctx, 860, 1200, 560, lt + 1.5);
    const p = eBack(prog(lt, .05, .5)); if (p > 0) padisah(ctx, W / 2 - 20, 900 + (1 - p) * 140, 1.05 * p, { kaftan: '#7a1f1a', beard: '#d6d0c6' });
    tag(ctx, 'KANUNİ SULTAN SÜLEYMAN', W / 2, 1260, 56, lt, .4, C.red, C.cream, 2);
  } },
  { s: 7.0, e: 9.1, draw(ctx, lt, d) { // 70'ini aşmış, son sefer
    plain(ctx, lt); camera(ctx, lt, d, 1.06, 1, W / 2, 1000); dust(ctx, lt, 400, 1180, 12);
    yMarch(ctx, lt, 1150, .6, 14, 70, 90); yMarch(ctx, lt + 3, 1300, .85, 11, 90, 115);
    tug(ctx, 200 + lt * 100, 1100, 340, lt); tug(ctx, 520 + lt * 100, 1100, 340, lt + 1);
    sealPro(ctx, 'Son Sefer', 'Kanuni Sultan Süleyman', W / 2, 520, 170, C.red, lt, .2, '1566');
    tag(ctx, 'YAŞI 70\'İ AŞMIŞ', W / 2, 300, 58, lt, 0, C.ink);
  } },
  { s: 9.1, e: 11.7, draw(ctx, lt, d) { // hedef Zigetvar (harita)
    camera(ctx, lt, d, 1, 1.1, 480, 780); euroMap(ctx, EU);
    const ist = proj(EU, ...IST), zg = proj(EU, ...ZIG), bel = proj(EU, ...BEL);
    pin(ctx, ...ist, 1, lt, 0, C.red); tag(ctx, 'İSTANBUL', ist[0] - 60, ist[1] + 70, 38, lt, .1, C.red);
    const route = [ist, proj(EU, 26.55, 41.67), proj(EU, 23.3, 42.7), proj(EU, 21.9, 43.3), bel, proj(EU, 19.0, 45.6), [zg[0] + 8, zg[1] + 8]];
    arrow(ctx, route, eInOut(prog(lt, .2, 1.8)), C.red, 12, true);
    pin(ctx, ...zg, 1.3, lt, 1.9, C.ink); tag(ctx, 'ZİGETVAR', zg[0] + 40, zg[1] - 140, 50, lt, 2.0, C.ink);
    tag(ctx, 'HEDEF: MACARİSTAN', W / 2, 300, 62, lt, .2, C.ink);
  } },
  { s: 11.7, e: 15.0, draw(ctx, lt, d) { // kuşatma
    plain(ctx, lt); shake(ctx, lt, .5, 10); shake(ctx, lt, 1.9, 10); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    castle(ctx, 560, 900, .95);
    for (let i = 0; i < 3; i++) { const f = prog(lt, .4 + i * .7, .5); cannon(ctx, 170 + i * 260, 1210, 1.0, f); smoke(ctx, lt, 280 + i * 260, 1160, .4 + i * .7, 6); }
    for (let i = 0; i < 6; i++) { const p = ((lt * .9 + i / 6) % 1); arrowShot(ctx, lerp(200, 560, p) + i * 50, lerp(1100, 760, p) - Math.sin(p * Math.PI) * 120, -0.8, 50); }
    tag(ctx, 'KUŞATMA SÜRÜYOR', W / 2, 330, 64, lt, 0, C.ink);
  } },
  { s: 15.0, e: 17.6, draw(ctx, lt, d) { // Eylül'ün ilk haftası, bir gece — çadır, mum, perde kapanır
    plain(ctx, lt, { top: '#14213a', bot: '#3a3550', ground: '#2f2a22', stars: true }); camera(ctx, lt, d, 1, 1.1, W / 2, 900);
    ell(ctx, 790, 420, 60, 60, '#efe6c8', null); ell(ctx, 818, 404, 56, 56, '#14213a', null);
    const cur = eInOut(prog(lt, .6, 1.6)); otag(ctx, W / 2 - 30, 1150, 1.15, lt, 1 - cur * .7, cur);
    tag(ctx, 'EYLÜL 1566, BİR GECE', W / 2, 300, 58, lt, 0, C.cream, C.ink);
    tag(ctx, 'KANUNİ HAKK\'A YÜRÜDÜ', W / 2, 1270, 56, lt, 1.3, C.ink, C.cream, 2);
  } },
  { s: 17.6, e: 20.7, draw(ctx, lt, d) { // Sokullu harekete geçti
    ctx.drawImage(paperTex('#3b2c22', 'dark'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 860);
    const g = ctx.createRadialGradient(W / 2, 800, 50, W / 2, 800, 600 + Math.sin(lt * 9) * 20); g.addColorStop(0, 'rgba(255,214,140,.45)'); g.addColorStop(1, 'rgba(255,214,140,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const p = eBack(prog(lt, 0, .5)); if (p > 0) pasa(ctx, W / 2 - 20, 920 + (1 - p) * 140, 1.0 * p);
    tag(ctx, 'SADRAZAM', W / 2, 300, 60, lt, .1, C.cream, C.ink);
    tag(ctx, 'SOKULLU MEHMED PAŞA', W / 2, 1260, 58, lt, .5, C.red, C.cream, 2);
  } },
  { s: 20.7, e: 24.0, draw(ctx, lt, d) { // haber yayılırsa ordu dağılabilir
    plain(ctx, lt, { top: '#cdbb8a', bot: '#e6d3a8' }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    const k = eInOut(prog(lt, .8, 2)); const r = rng(5);
    for (let i = 0; i < 18; i++) { const bx = 160 + (i % 6) * 125, by = 1080 + Math.floor(i / 6) * 90; const a = r() * Math.PI * 2; yeniceri(ctx, bx + Math.cos(a) * k * 260, by + Math.sin(a) * k * 60, .55, lt + i); }
    dust(ctx, lt, 540, 1150, 14);
    tag(ctx, 'HABER YAYILIRSA...', W / 2, 330, 64, lt, 0, C.ink);
    stampBox(ctx, 'ORDU DAĞILABİLİRDİ', W / 2, 560, 70, C.red, lt, 1.0, -5);
  } },
  { s: 24.0, e: 26.6, draw(ctx, lt, d) { // susma emri
    ctx.drawImage(paperTex('#3b2c22', 'dark'), 0, 0); shake(ctx, lt, 1.0, 12); camera(ctx, lt, d, 1, 1.08, W / 2, 860);
    const g = ctx.createRadialGradient(W / 2 - 40, 820, 30, W / 2 - 40, 820, 520 + Math.sin(lt * 9) * 16); g.addColorStop(0, 'rgba(255,214,140,.4)'); g.addColorStop(1, 'rgba(255,214,140,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    scroll(ctx, W / 2 - 40, 820, 2.1, Math.sin(lt * 2) * .02);
    sealPro(ctx, 'SIR', 'Yalnızca birkaç kişi', W / 2 - 40, 840, 160, C.red, lt, .8, 'SUSMA EMRİ');
    tag(ctx, 'ÖLÜMÜ BİLENLERE', W / 2, 300, 58, lt, 0, C.cream, C.ink);
  } },
  { s: 26.6, e: 29.8, draw(ctx, lt, d) { // yatağa başkası yatırıldı — çadır önünde nöbet
    plain(ctx, lt, { top: '#2a2a3a', bot: '#4a3e40', ground: '#3a3226', stars: true }); camera(ctx, lt, d, 1.06, 1, W / 2, 1000);
    otag(ctx, W / 2 - 30, 1100, 1.0, lt, .7, .6);
    const k = Math.sin(lt * 1.6); yeniceri(ctx, 180 + k * 60, 1250, 1.0, lt, 1); yeniceri(ctx, 820 - k * 60, 1250, 1.0, lt, 1);
    tag(ctx, 'PADİŞAHIN YATAĞINDA', W / 2, 300, 56, lt, 0, C.cream, C.ink);
    stampBox(ctx, 'BAŞKASI', W / 2, 470, 96, '#e0573f', lt, 1.3, -6);
  } },
  { s: 29.8, e: 32.8, draw(ctx, lt, d) { // askerlere: sultan iyileşiyor
    plain(ctx, lt); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    for (let i = 0; i < 9; i++) { const j = Math.max(0, Math.sin(lt * 7 + i * 1.3)) * 14; yeniceri(ctx, 150 + i * 88, 1260 - j, .85, lt); }
    rider(ctx, lerp(-150, 1200, lt / d), 1080, .9, 1, lt * 14);
    tag(ctx, 'ASKERLERE HABER', W / 2, 330, 62, lt, 0, C.ink);
    stampBox(ctx, 'SULTAN İYİLEŞİYOR', W / 2, 540, 72, C.red, lt, .9, -5);
  } },
  { s: 32.8, e: 35.0, draw(ctx, lt, d) { // Zigetvar düştü
    plain(ctx, lt); shake(ctx, lt, 1.1, 16); camera(ctx, lt, d, 1.08, 1, W / 2, 900);
    castle(ctx, 560, 950, 1.0);
    const up = eOut(prog(lt, .3, 1.2)); tug(ctx, 540, 700 - up * 90 + 90, 200 + up * 0, lt);
    smoke(ctx, (lt % 2.5), 300, 800, 0, 8, 'rgba(120,110,100,.5)'); smoke(ctx, ((lt + 1.2) % 2.5), 760, 780, 0, 8, 'rgba(120,110,100,.5)');
    stampBox(ctx, 'ZİGETVAR DÜŞTÜ', W / 2, 360, 92, C.red, lt, 1.0, -6);
  } },
  { s: 35.0, e: 38.2, draw(ctx, lt, d) { // padişah adına fermanlar
    bg(ctx); camera(ctx, lt, d, 1, 1.06, W / 2, 860);
    for (let i = 0; i < 5; i++) { const p = ((lt * .45 + i / 5) % 1); scroll(ctx, lerp(W / 2 - 40, 140 + i * 190, p), lerp(820, 380 + (i % 2) * 760, p), .5 + p * .2, (i - 2) * .3 * p); }
    scroll(ctx, W / 2 - 40, 820, 1.6, 0);
    sealPro(ctx, 'Ferman', 'Padişah adına', W / 2 + 10, 900, 110, C.red, lt, .9, '');
    tag(ctx, 'PADİŞAH ADINA EMİRLER', W / 2, 300, 58, lt, 0, C.ink);
  } },
  { s: 38.2, e: 41.7, draw(ctx, lt, d) { // gizlice ulak: Zigetvar -> Kütahya
    camera(ctx, lt, d, 1, 1.06, 540, 900); euroMap(ctx, EU2);
    const zg = proj(EU2, ...ZIG), ku = proj(EU2, ...KUT);
    const path = curvePts(zg, [proj(EU2, 24.5, 43.5)[0], proj(EU2, 24.5, 43.5)[1]], ku, 40);
    const k = eInOut(prog(lt, .2, 2.6)); arrow(ctx, path, k, C.red, 9, true);
    pin(ctx, ...zg, 1, lt, 0, C.ink); tag(ctx, 'ZİGETVAR', zg[0] + 30, zg[1] - 130, 40, lt, .1, C.ink);
    pin(ctx, ...ku, 1.1, lt, 2.5, C.red); tag(ctx, 'KÜTAHYA', ku[0] - 30, ku[1] + 60, 42, lt, 2.6, C.red);
    const q = partial(path, Math.max(.02, k)); const pp = q[q.length - 1]; rider(ctx, pp[0], pp[1] - 10, .38, 1, lt * 16);
    tag(ctx, 'ŞEHZADE SELİM\'E GİZLİ ULAK', W / 2, 300, 54, lt, .1, C.red);
  } },
  { s: 41.7, e: 45.7, draw(ctx, lt, d) { // kapalı araba ile Belgrad'a
    plain(ctx, lt, { top: '#b6a68a', bot: '#d8c8a2' }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    dust(ctx, lt, 300, 1180, 12);
    yMarch(ctx, lt, 1310, .75, 12, 70, 105);
    carriage(ctx, 260 + lt * 60, 1160, .9, lt);
    tug(ctx, 120 + lt * 60, 1150, 320, lt);
    tag(ctx, 'BELGRAD\'A DOĞRU', W / 2, 330, 64, lt, 0, C.ink);
    tag(ctx, 'KAPALI ARABADA TABUT', W / 2, 480, 50, lt, .9, C.red);
  } },
  { s: 45.7, e: 49.7, draw(ctx, lt, d) { // 42–48 gün saklandı
    bg(ctx); shake(ctx, lt, 2.6, 12); camera(ctx, lt, d, 1, 1.06, W / 2, 860);
    const n = Math.round(lerp(1, 42, eInOut(prog(lt, .1, 2.2))));
    for (let i = 3; i >= 1; i--) { ctx.save(); ctx.translate(i * 12, i * 12); calendarPage(ctx, W / 2 - 40, 820, Math.max(1, n - i), 'GÜN'); ctx.restore(); }
    const fl = (lt * 6) % 1; ctx.save(); ctx.translate(W / 2 - 40, 650); ctx.rotate(-fl * .8); ctx.translate(-(W / 2 - 40), -650); ctx.globalAlpha = 1 - fl; calendarPage(ctx, W / 2 - 40, 820, n, 'GÜN'); ctx.restore();
    calendarPage(ctx, W / 2 - 40, 820, n, 'GÜN');
    tag(ctx, 'SIR SAKLANDI', W / 2, 300, 64, lt, 0, C.ink);
    stampBox(ctx, '42 İLE 48 GÜN ARASI', W / 2, 1200, 64, C.red, lt, 2.6, -5);
  } },
  { s: 49.7, e: 53.95, draw(ctx, lt, d) { // hafızlar Kur'an okumaya başladı
    ctx.drawImage(paperTex('#3b2c22', 'dark'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    const g = ctx.createRadialGradient(W / 2 - 40, 900, 40, W / 2 - 40, 900, 520 + Math.sin(lt * 8) * 18); g.addColorStop(0, 'rgba(255,214,140,.5)'); g.addColorStop(1, 'rgba(255,214,140,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    rahle(ctx, W / 2 - 40, 1150, 1.4);
    for (let i = 0; i < 2; i++) { const t = (lt * .6 + i * .5) % 1; ctx.globalAlpha = 1 - t; ell(ctx, W / 2 - 40, 760, 120 + t * 260, 40 + t * 90, null, '#ffe2a0', 4); } ctx.globalAlpha = 1;
    tag(ctx, 'HAFIZLAR KUR\'AN OKUDU', W / 2, 300, 58, lt, 0, C.cream, C.ink);
    tag(ctx, 'ORDU GERÇEĞİ ANLADI', W / 2, 1270, 56, lt, 2.4, C.red, C.cream, 2);
  } },
  { s: 53.95, e: 56.1, draw(ctx, lt, d) { // Belgrad
    plain(ctx, lt, { top: '#cbb894', bot: '#e8d8b4' }); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    castle(ctx, 600, 960, .85);
    yMarch(ctx, lt, 1300, .7, 12, 70, 100);
    pennant(ctx, 100 + lt * 80, 1170, 120, lt, '#2a2420');
    sealPro(ctx, 'Belgrad', 'Cenaze alayı', 260, 470, 140, C.red, lt, .2, '1566');
  } },
  { s: 56.1, e: 58.55, draw(ctx, lt, d) { // II. Selim siyahlar içinde
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 860);
    tug(ctx, 150, 1220, 520, lt); tug(ctx, 860, 1220, 520, lt + 1.2);
    const p = eBack(prog(lt, .05, .5)); if (p > 0) padisah(ctx, W / 2 - 20, 900 + (1 - p) * 140, 1.0 * p, { kaftan: '#1f1b19', beard: '#a0703a' });
    tag(ctx, 'YENİ PADİŞAH', W / 2, 300, 60, lt, 0, C.ink);
    tag(ctx, 'II. SELİM, SİYAHLAR İÇİNDE', W / 2, 1260, 52, lt, .5, C.red, C.cream, 2);
  } },
  { s: 58.55, e: 61.6, draw(ctx, lt, d) { // 46 yıl
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1.05, 1, W / 2, 860);
    ctx.save(); ctx.globalAlpha = .22; ctx.fillStyle = C.gold;
    for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 - lt * .25; ctx.beginPath(); ctx.moveTo(380, 900); ctx.arc(380, 900, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    padisah(ctx, 360, 930, .9, { kaftan: '#7a1f1a', beard: '#d6d0c6' });
    sealPro(ctx, '46 Yıl', 'Kanuni Sultan Süleyman', 740, 560, 150, C.red, lt, .4, '1520–1566');
    tag(ctx, 'KIRK ALTI YILLIK SALTANAT', W / 2, 300, 56, lt, 0, C.ink);
  } },
  { s: 61.6, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    tug(ctx, 260, 1250, 640, lt); tug(ctx, 780, 1250, 640, lt + 1.2);
    otag(ctx, W / 2, 1250, .7, lt, .8, 0);
    bigText(ctx, 'SON SEFER...', W / 2, 360, 100, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'SON ZAFER', W / 2, 520, 70, lt, .7, C.ink, C.cream);
  } },
];
