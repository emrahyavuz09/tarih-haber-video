// ===== Mohaç 1526: İki saatte biten savaş (akşam) =====
const KEY = ['MOHAÇ', 'KANUNİ', 'SÜLEYMAN', 'LAYOŞ', 'KRALLIK', 'İKİ', 'SAAT', 'SAATTE', 'YENİÇERİLER', 'TOPLAR', 'ÇEMBERE', 'ÇELE', 'BUDİN', 'HABSBURGLAR', 'DİSİPLİNLİ', 'ŞÖVALYELERİ', 'BÖLÜNDÜ'];
const DURATION = 60.04 + 2.2;
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
function clockFace(ctx, x, y, r, ang1, ang2) {
  ell(ctx, x, y, r + 16, r + 16, '#b8892f', C.ink, 6); ell(ctx, x, y, r, r, C.cream, C.ink, 5);
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; line(ctx, [[x + Math.cos(a) * r * .82, y + Math.sin(a) * r * .82], [x + Math.cos(a) * r * .94, y + Math.sin(a) * r * .94]], C.ink, i % 3 ? 4 : 8, .2); }
  line(ctx, [[x, y], [x + Math.cos(ang1) * r * .5, y + Math.sin(ang1) * r * .5]], C.ink, 12, .2);
  line(ctx, [[x, y], [x + Math.cos(ang2) * r * .8, y + Math.sin(ang2) * r * .8]], C.red, 7, .2);
  ell(ctx, x, y, 12, 12, C.ink, null);
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
function budin(ctx, x, y, s) { // tepe üstünde kale-şehir
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-420, 120], [-300, 20], [-120, -20], [100, -10], [300, 30], [420, 120]], '#a08a5c', C.ink, 5, 1);
  shape(ctx, [[-260, 20], [-260, -110], [240, -110], [240, 20]], '#cdb68a', C.ink, 6, .8);
  for (let i = -260; i < 240; i += 40) shape(ctx, [[i, -110], [i, -134], [i + 22, -134], [i + 22, -110]], '#cdb68a', C.ink, 4, .5);
  [[-260, -190], [240, -190], [-20, -250]].forEach(([tx, th]) => { shape(ctx, [[tx - 40, 20], [tx - 40, th], [tx + 40, th], [tx + 40, 20]], '#bfa577', C.ink, 6, .8); shape(ctx, [[tx - 52, th], [tx, th - 70], [tx + 52, th]], '#7a3b26', C.ink, 5, .6); });
  shape(ctx, [[-40, 20], [-40, -50], [-20, -70], [20, -70], [40, -50], [40, 20]], '#3b2a1e', C.ink, 4, .5);
  ctx.restore();
}

const SCENES = [
  { s: 0, e: 2.2, draw(ctx, lt, d) { // HOOK
    ctx.save(); hookCard(ctx, lt + .5, d + .5, 'Bir krallık, iki saatte çöktü!', 'Mohaç 1526'); ctx.restore();
    const k = eInOut(prog(lt, 0, d)); crown(ctx, 540, lerp(1140, 1230, k), .9, lerp(-.05, .5, k));
  } },
  { s: 2.2, e: 5.1, draw(ctx, lt, d) { // 1526, Kanuni
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 850);
    ctx.save(); ctx.globalAlpha = .22; ctx.fillStyle = C.gold;
    for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .2; ctx.beginPath(); ctx.moveTo(W / 2, 820); ctx.arc(W / 2, 820, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    bigText(ctx, '1526', W / 2, 340, 170, C.red, lt, 0, F_SANS, [C.cream, 14]);
    tug(ctx, 170, 1180, 560, lt); tug(ctx, 900, 1180, 560, lt + 1.5);
    const p = eBack(prog(lt, 1.3, .5)); if (p > 0) padisah(ctx, W / 2, 870 + (1 - p) * 160, 1.0 * p, { kaftan: '#7a1f1a' });
    tag(ctx, 'KANUNİ SULTAN SÜLEYMAN', W / 2, 1250, 56, lt, 1.5, C.red, C.cream, 2);
  } },
  { s: 5.1, e: 8.0, draw(ctx, lt, d) { // Tuna boyunca Macaristan'a
    camera(ctx, lt, d, 1, 1.1, 620, 860); euroMap(ctx);
    const ist = P(28.97, 41.01), mo = P(18.68, 45.99), bel = P(20.46, 44.82);
    pin(ctx, ...ist, 1, lt, 0, C.red); tag(ctx, 'İSTANBUL', ist[0] - 40, ist[1] + 70, 40, lt, .1, C.red);
    const route = [ist, P(26.55, 41.67), P(23.3, 42.7), P(21.9, 43.3), bel, P(19.4, 45.3), [mo[0] + 10, mo[1] + 10]];
    arrow(ctx, route, eInOut(prog(lt, .2, 2.1)), C.red, 12, true);
    pin(ctx, ...mo, 1.3, lt, 2.2, C.ink); tag(ctx, 'MOHAÇ', mo[0] - 10, mo[1] - 140, 50, lt, 2.3, C.ink);
    tag(ctx, 'TUNA', ...P(24.5, 44.25), 36, lt, .6, '#3d6676');
    tag(ctx, 'MACARİSTAN\'A', W / 2, 300, 64, lt, .4, C.ink);
  } },
  { s: 8.0, e: 11.2, draw(ctx, lt, d) { // II. Layoş
    dusk(ctx, lt); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    for (let i = 0; i < 4; i++) { const x = ((lt * 120 + i * 300) % 1400) - 200; knight(ctx, x, 1270, .5, 1, lt * 8 + i * 1.6, '#3e5f8a'); }
    const p = eBack(prog(lt, 0, .45)); if (p > 0) layos(ctx, W / 2, 800 + (1 - p) * 200, 1.15 * p);
    tag(ctx, 'MACAR KRALI', W / 2, 300, 60, lt, .2, C.ink);
    tag(ctx, 'II. LAYOŞ', W / 2, 1110, 76, lt, 1.9, '#3e5f8a', C.cream, 2);
  } },
  { s: 11.2, e: 14.0, draw(ctx, lt, d) { // zırhlı şövalyeler, 20 yaşında
    dusk(ctx, lt); camera(ctx, lt, d, 1.06, 1, 540, 900);
    for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { const x = ((lt * 150 + i * 330 + r * 160) % 1500) - 250; knight(ctx, x, 1060 + r * 200, .8 + r * .15, 1, lt * 9 + i * 1.2 + r, r ? '#3e5f8a' : '#7a3b26'); }
    tag(ctx, 'ZIRHLI ŞÖVALYELER', W / 2, 330, 66, lt, 0, '#3e5f8a');
    stampBox(ctx, 'KRAL 20 YAŞINDA', W / 2, 560, 76, C.red, lt, 1.1, -5);
  } },
  { s: 14.0, e: 17.0, draw(ctx, lt, d) { // 29 Ağustos, Mohaç Ovası
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 820);
    shape(ctx, [[880, 0], [930, 300], [900, 600], [960, 900], [920, 1200], [980, 1500], [980, 1920], [1200, 1920], [1200, 0]], C.sea, C.ink, 5, 1.5);
    for (let i = 0; i < 14; i++) { const x = 760 + hash(i) * 120, y = 950 + hash(i + 5) * 300; line(ctx, [[x, y], [x + Math.sin(lt * 3 + i) * 6, y - 30]], '#6f8a50', 4, .3); }
    tag(ctx, 'TUNA', 980, 520, 36, lt, .2, '#3d6676', C.cream, 85);
    // ordular (kuş bakışı)
    for (let i = 0; i < 6; i++) { const x = 120 + i * 112; shape(ctx, [[x, 1060], [x + 96, 1060], [x + 96, 1120], [x, 1120]], C.red, C.ink, 4, .5); pennant(ctx, x + 48, 1060, 90, lt, C.red); }
    for (let i = 0; i < 5; i++) { const x = 160 + i * 124; shape(ctx, [[x, 780], [x + 100, 780], [x + 100, 840], [x, 840]], '#3e5f8a', C.ink, 4, .5); pennant(ctx, x + 50, 780, 90, lt + 1, '#3e5f8a'); }
    const adv = eInOut(prog(lt, .8, 2)); arrow(ctx, [[440, 870], [440, 870 + adv * 120]], adv, '#3e5f8a', 14);
    tag(ctx, 'MACAR ORDUSU', 440, 640, 46, lt, .6, '#3e5f8a'); tag(ctx, 'OSMANLI ORDUSU', 440, 1230, 46, lt, .8, C.red);
    sealPro(ctx, '29 Ağustos', 'Mohaç Ovası', W / 2, 400, 150, C.red, lt, .1, '1526');
  } },
  { s: 17.0, e: 20.2, draw(ctx, lt, d) { // ağır süvari hücumu
    dusk(ctx, lt); shake(ctx, lt, 2.0, 10); camera(ctx, lt, d, 1.0, 1.1, 540, 1000);
    dust(ctx, lt, 700, 1200, 16); dust(ctx, lt, 300, 1260, 12);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) { const x = 1250 - ((lt * 330 + i * 360 + r * 120) % 1600); knight(ctx, x, 1020 + r * 140, .7 + r * .12, -1, lt * 14 + i + r, ['#7a3b26', '#3e5f8a', '#5a6a3a'][r]); }
    tag(ctx, 'AĞIR SÜVARİ', W / 2, 300, 72, lt, 0, '#3e5f8a');
    stampBox(ctx, 'HÜCUM!', W / 2, 500, 120, C.red, lt, 1.9, -7);
  } },
  { s: 20.2, e: 23.5, draw(ctx, lt, d) { // ilk saflar sarsıldı, asıl duvar arkada
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    const push = eOut(prog(lt, 0, 1.2));
    for (let i = 0; i < 6; i++) { const x = 190 + i * 110 + Math.sin(lt * 20 + i) * 4 * (1 - push); shape(ctx, [[x, 760 + push * 120], [x + 80, 760 + push * 120], [x + 80, 800 + push * 120], [x, 800 + push * 120]], '#c96a5a', C.ink, 3, .5); }
    arrow(ctx, [[540, 380], [540, 560 + push * 140]], prog(lt, 0, .9), '#3e5f8a', 30);
    for (let i = 0; i < 5; i++) { const x = 200 + i * 145; cannon(ctx, x + 40, 1130, .7, 0); }
    for (let i = 0; i < 10; i++) yeniceri(ctx, 175 + i * 72, 1250, .62, lt);
    const wl = eOut(prog(lt, 1.5, .5)); if (wl > 0) { ctx.save(); ctx.globalAlpha = wl; ctx.setLineDash([22, 14]); line(ctx, [[140, 1000], [920, 1000]], C.red, 8); ctx.restore(); }
    tag(ctx, 'İLK SAFLAR SARSILDI', W / 2, 300, 60, lt, 0, C.ink);
    tag(ctx, 'ASIL DUVAR ARKADA', W / 2, 950, 58, lt, 1.6, C.red, C.cream, 2);
  } },
  { s: 23.5, e: 27.2, draw(ctx, lt, d) { // yeniçeriler ve toplar bekliyor
    dusk(ctx, lt); camera(ctx, lt, d, 1, 1.08, W / 2, 1000);
    const k = eInOut(prog(lt, 0, d)); for (let i = 0; i < 5; i++) knight(ctx, lerp(-120, 200, k) + i * 120 - 300 + 300, 960 + (i % 2) * 30, .38, 1, lt * 12 + i, '#3e5f8a');
    dust(ctx, lt, lerp(0, 250, k), 980, 10);
    for (let i = 0; i < 2; i++) cannon(ctx, 700 + i * 60, 1130 + i * 130, 1.35, 0);
    for (let i = 0; i < 4; i++) yeniceri(ctx, 170 + i * 105, 1300, 1.15, lt, 1);
    tag(ctx, 'YENİÇERİLER VE TOPLAR', W / 2, 300, 58, lt, .1, C.red);
    tag(ctx, 'DOĞRU ANI BEKLEDİ', W / 2, 440, 54, lt, 2.6, C.ink);
  } },
  { s: 27.2, e: 30.1, draw(ctx, lt, d) { // ATEŞ: hücum dağıldı
    dusk(ctx, lt); shake(ctx, lt, .25, 18); shake(ctx, lt, 1.1, 12); camera(ctx, lt, d, 1.04, 1, W / 2, 1000);
    const back = eOut(prog(lt, 1.0, 1.6)); for (let i = 0; i < 5; i++) knight(ctx, 230 - back * 380 + i * 110 - 200, 960 + (i % 2) * 30, .38, back > .05 ? -1 : 1, lt * 14 + i, '#3e5f8a', back < .05);
    for (let i = 0; i < 2; i++) { cannon(ctx, 700 + i * 60, 1130 + i * 130, 1.35, prog(lt, .2 + i * .15, .5)); smoke(ctx, lt, 600 + i * 70, 1080 + i * 120, .2 + i * .15); }
    for (let i = 0; i < 4; i++) { yeniceri(ctx, 170 + i * 105, 1300, 1.15, lt, 1); smoke(ctx, lt, 290 + i * 105, 1210, .9 + (i % 2) * .15, 4); }
    stampBox(ctx, 'ATEŞ!', W / 2, 330, 130, C.red, lt, .2, -6);
    tag(ctx, 'HÜCUM DAĞILDI', W / 2, 560, 58, lt, 1.6, C.ink);
  } },
  { s: 30.1, e: 34.1, draw(ctx, lt, d) { // kanatlar çembere aldı
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 860);
    const c = [W / 2 - 40, 820];
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; const r = 120 + Math.sin(lt * 3 + i) * 6; shape(ctx, [[c[0] + Math.cos(a) * r - 26, c[1] + Math.sin(a) * r - 16], [c[0] + Math.cos(a) * r + 26, c[1] + Math.sin(a) * r - 16], [c[0] + Math.cos(a) * r + 26, c[1] + Math.sin(a) * r + 16], [c[0] + Math.cos(a) * r - 26, c[1] + Math.sin(a) * r + 16]], '#3e5f8a', C.ink, 3, .4); }
    const pL = eInOut(prog(lt, .2, 2.2)), pR = eInOut(prog(lt, .4, 2.2));
    arrow(ctx, curvePts([200, 1180], [110, 760], [400, 520]), pL, C.red, 16);
    arrow(ctx, curvePts([780, 1180], [880, 760], [580, 520]), pR, C.red, 16);
    const ring = eOut(prog(lt, 2.4, .8)); if (ring > 0) { ctx.save(); ctx.setLineDash([24, 14]); ctx.beginPath(); ctx.arc(c[0], c[1], 260, -Math.PI / 2, -Math.PI / 2 + ring * Math.PI * 2); ctx.strokeStyle = C.red; ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < 6; i++) shape(ctx, [[220 + i * 110, 1180], [290 + i * 110, 1180], [290 + i * 110, 1220], [220 + i * 110, 1220]], C.red, C.ink, 3, .5);
    tag(ctx, 'KANATLARDAN OSMANLI SÜVARİSİ', W / 2, 300, 50, lt, 0, C.red);
    stampBox(ctx, 'ÇEMBER', c[0], c[1], 74, C.red, lt, 3.1, -6);
  } },
  { s: 34.1, e: 36.45, draw(ctx, lt, d) { // ~2 saat
    bg(ctx); camera(ctx, lt, d, 1, 1.08, W / 2, 800);
    const k = eInOut(prog(lt, 0, 1.8)); const h = -Math.PI / 2 + Math.PI * 2 * (3 + k * 2) / 12, m = -Math.PI / 2 + k * Math.PI * 4;
    clockFace(ctx, W / 2 - 40, 800, 280, h, m);
    tag(ctx, 'SAVAŞ SÜRESİ', W / 2, 300, 62, lt, 0, C.ink);
    stampBox(ctx, 'YAKLAŞIK 2 SAAT', W / 2, 1230, 80, C.red, lt, 1.3, -5);
  } },
  { s: 36.45, e: 38.3, draw(ctx, lt, d) { // kral kaçıyor (akşam)
    dusk(ctx, lt, { top: '#4a3a3a', bot: '#b0704a', ground: '#4a4030', dark: true }); camera(ctx, lt, d, 1, 1.08, W / 2, 900);
    for (let i = 0; i < 18; i++) { const x = hash(i) * W, y = 1080 + hash(i + 3) * 250; line(ctx, [[x, y], [x + Math.sin(lt * 4 + i) * 10, y - 70]], '#2f3a22', 5, .3); }
    knight(ctx, lerp(900, 420, eInOut(lt / d)), 1160, 1.25, -1, lt * 14, '#3e5f8a', false);
    dust(ctx, lt, lerp(1000, 520, eInOut(lt / d)), 1130, 10, 'rgba(60,50,40,.35)');
    tag(ctx, 'KAÇMAYA ÇALIŞAN KRAL', W / 2, 330, 60, lt, .1, C.cream, C.ink);
  } },
  { s: 38.3, e: 40.25, draw(ctx, lt, d) { // Çele deresi, boğuldu
    ctx.drawImage(paperTex('#3a3530', 'marsh'), 0, 0); camera(ctx, lt, d, 1, 1.08, W / 2, 850);
    shape(ctx, [[-100, 860], [300, 820], [700, 870], [1200, 830], [1200, 2300], [-100, 2300]], '#55707a', C.ink, 5, 1.2);
    for (let i = 0; i < 3; i++) { const k = (lt * .7 + i / 3) % 1; ctx.globalAlpha = 1 - k; ell(ctx, 520, 1000, 60 + k * 300, 16 + k * 80, null, '#cfe0e4', 4); } ctx.globalAlpha = 1;
    const sink = eInOut(prog(lt, .1, 1.6));
    ctx.save(); ctx.beginPath(); ctx.rect(-200, 0, W + 400, 1000); ctx.clip(); crown(ctx, 520, lerp(820, 1080, sink), .9, Math.sin(lt * 3) * .12); ctx.restore();
    for (let i = 0; i < 20; i++) { const x = (i * 57) % 1080, y = 860 + (i % 3) * 30; line(ctx, [[x, y], [x + Math.sin(lt * 3 + i) * 12, y - 110 - (i % 4) * 20]], '#2f3a22', 6, .3); }
    tag(ctx, 'ÇELE DERESİ', W / 2, 330, 70, lt, 0, C.cream, C.ink);
    tag(ctx, 'KRAL LAYOŞ BOĞULDU', W / 2, 1250, 56, lt, .6, C.red, C.cream, 2);
  } },
  { s: 40.25, e: 43.25, draw(ctx, lt, d) { // soylular meydanda kaldı
    dusk(ctx, lt, { top: '#6a4a3a', bot: '#d09a60', ground: '#6a5a3e', dark: true }); camera(ctx, lt, d, 1.05, 1, W / 2, 900);
    [[230, 1140, -.5], [470, 1190, .35], [700, 1130, -.25], [860, 1210, .6]].forEach(([x, y, r]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(r); line(ctx, [[-120, 0], [120, 0]], '#4a3020', 8, .3); ctx.restore(); });
    [[340, 1170], [780, 1160]].forEach(([x, y], i) => { line(ctx, [[x, y], [x + 40, y - 150]], '#4a3020', 6, .3); shape(ctx, [[x + 40, y - 150], [x + 120, y - 130 + Math.sin(lt * 2 + i) * 6], [x + 36, y - 112]], '#3e5f8a', C.ink, 3, .4); });
    smoke(ctx, (lt % 3), 300, 1050, 0, 8, 'rgba(90,80,70,.4)'); smoke(ctx, ((lt + 1.5) % 3), 760, 1040, 0, 8, 'rgba(90,80,70,.4)');
    tag(ctx, 'MACAR SOYLULARINDAN', W / 2, 330, 58, lt, 0, C.cream, C.ink);
    stampBox(ctx, 'YÜZLERCESİ', W / 2, 560, 96, '#e0573f', lt, 1.0, -6);
  } },
  { s: 43.25, e: 47.15, draw(ctx, lt, d) { // Budin, 11 Eylül
    dusk(ctx, lt); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    shape(ctx, [[-200, 1150], [1300, 1100], [1300, 1260], [-200, 1300]], C.sea, C.ink, 4, 1);
    budin(ctx, 600, 1000, 1.0);
    marching(ctx, lt, -60, 1180, 9, C.red, 1, 70, 1.0);
    pennant(ctx, 120 + lt * 70, 1150, 120, lt, C.red);
    sealPro(ctx, '11 Eylül 1526', 'Budin', 280, 470, 150, C.red, lt, .2, 'DİRENİŞSİZ');
    tag(ctx, 'BUDİN', 730, 620, 60, lt, 1.2, C.ink);
  } },
  { s: 47.15, e: 49.95, draw(ctx, lt, d) { // Orta Avrupa'nın kaderi
    camera(ctx, lt, d, 1.1, 1, 430, 700); euroMap(ctx);
    const pu = .45 + Math.sin(lt * 5) * .15; ctx.save(); ctx.globalAlpha = pu; drawLand(ctx, EU, HUNGARY, C.red); ctx.restore(); drawLand(ctx, EU, HUNGARY, null);
    const mo = P(18.68, 45.99); pin(ctx, ...mo, 1.2, lt, .1, C.ink);
    tag(ctx, 'ORTA AVRUPA\'NIN KADERİ', W / 2, 300, 58, lt, .2, C.ink);
    tag(ctx, 'DEĞİŞTİ', W / 2, 1180, 64, lt, 1.6, C.red, C.cream, 2);
  } },
  { s: 49.95, e: 53.1, draw(ctx, lt, d) { // Macaristan bölündü
    camera(ctx, lt, d, 1, 1.08, 430, 700); euroMap(ctx);
    const k = eOut(prog(lt, .3, .8));
    const band = (x0, x1, y0, y1, col) => { ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.clip(); ctx.globalAlpha = .65 * k; drawLand(ctx, EU, HUNGARY, col); ctx.restore(); };
    const xa = P(18.3, 46)[0], xb = P(21.9, 46)[0], yn = P(20, 48.0)[1];
    band(-400, xa, -400, 2400, '#8a6aa8'); band(xa, 1400, -400, yn, '#8a6aa8'); band(xa, xb, yn, 2400, C.red); band(xb, 1400, yn, 2400, '#6f8a50');
    drawLand(ctx, EU, HUNGARY, null);
    const sp = prog(lt, .1, .7); if (sp > 0) { line(ctx, partial([[xa, P(0, 45)[1]], [xa, yn], [xb + 200, yn]], sp), C.ink, 6, 2); line(ctx, partial([[xb, yn], [xb, P(0, 44.6)[1]]], sp), C.ink, 6, 2); }
    shake(ctx, lt, .3, 10);
    tag(ctx, 'MACARİSTAN BÖLÜNDÜ', W / 2, 300, 62, lt, 0, C.ink);
    tag(ctx, 'HABSBURG', P(16.8, 47.6)[0], P(16.8, 47.6)[1] - 40, 38, lt, 1.0, '#6a4a8c');
    tag(ctx, 'OSMANLI', P(20.0, 46.3)[0], P(20.0, 46.3)[1], 40, lt, 1.3, C.red);
    tag(ctx, 'ERDEL', P(23.8, 46.6)[0], P(23.8, 46.6)[1], 38, lt, 1.6, '#4f6a34');
    text(ctx, '(Sonraki yıllarda oluşan durum, temsili)', W / 2, 1270, 30, 'rgba(42,29,21,.75)', F_SANS, 700);
  } },
  { s: 53.1, e: 56.15, draw(ctx, lt, d) { // ~150 yıllık mücadele
    bg(ctx); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    padisah(ctx, 280, 930, .95, { kaftan: '#7a1f1a' });
    diyojen(ctx, 770, 930, .95, { robe: '#6a4a8c', dir: -1 });
    const k = 0.5 + Math.sin(lt * 5) * .5; sword(ctx, 500 - 20 * k, 640, 1.2, .55); sword(ctx, 580 + 20 * k, 640, 1.2, -.55);
    tag(ctx, 'OSMANLI', 280, 1240, 50, lt, .1, C.red); tag(ctx, 'HABSBURGLAR', 770, 1240, 46, lt, .3, '#6a4a8c');
    stampBox(ctx, 'YAKLAŞIK 150 YIL', W / 2, 330, 80, C.red, lt, 1.6, -5);
  } },
  { s: 56.15, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    hourglass(ctx, W / 2 - 40, 920, 1.0, clamp(lt / 4.5), lt);
    bigText(ctx, 'İKİ SAATLİK SAVAŞ...', W / 2, 360, 84, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'BİR BUÇUK ASIRLIK HESAPLAŞMA', W / 2, 520, 54, lt, 1.7, C.ink, C.cream);
  } },
];
