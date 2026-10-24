// ===== Hezârfen Ahmed Çelebi'nin uçuşu (sabah) — rivayet, tek kaynak: Evliya Çelebi =====
const KEY = ['BOĞAZ\'I', 'UÇARAK', 'TEK', 'KAYNAĞI', 'EVLİYA', 'HEZÂRFEN', 'BİN', 'OKMEYDANI\'NDA', 'KARTAL', 'LODOS', 'GALATA', 'BOŞLUĞA', 'SÜZÜLEREK', 'ÜSKÜDAR\'DA', 'DOĞANCILAR', 'MURAD', 'ALTIN', 'TEHLİKELİ', 'CEZAYİR\'E', 'EFSANE', 'GERÇEK', 'İLHAM'];
const DURATION = 46.28 + 2.2;
const OUTRO_AT = DURATION - 1.6;
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
const MEDM = { x: 520, y: 840, lon: 16, lat: 38.5, k: 22 };
function medMap(ctx, m) {
  ctx.drawImage(paperTex('#d9c393', 'mapland'), 0, 0); ctx.fillStyle = '#d9c393'; ctx.fillRect(-500, -500, W + 1000, 500); ctx.fillRect(-500, H, W + 1000, 500); ctx.fillRect(-500, 0, 500, H); ctx.fillRect(W, 0, 500, H);
  [MED, SEA_BLACK, SEA_MARMARA].forEach(s => seaArea(ctx, m, s));
  ISLANDS.forEach(p => drawLand(ctx, m, p, '#d9c393'));
}
// İstanbul (Haliç + Boğaz ağzı) — gerçek kıyı noktalarından sadeleştirilmiş
const IST = { x: 470, y: 820, lon: 28.99, lat: 41.025, k: 9000 };
const IST_SEA = [[28.90, 40.95], [28.93, 40.995], [28.95, 41.0], [28.965, 41.0], [28.98, 41.003], [28.985, 41.012], [28.987, 41.016], [28.972, 41.018], [28.96, 41.026], [28.95, 41.034], [28.94, 41.042], [28.93, 41.05], [28.92, 41.06], [28.935, 41.055], [28.95, 41.043], [28.96, 41.035], [28.966, 41.029], [28.975, 41.0235], [28.978, 41.022], [28.984, 41.028], [28.993, 41.035], [29.0, 41.04], [29.007, 41.043], [29.02, 41.055], [29.03, 41.09], [29.05, 41.09], [29.04, 41.055], [29.03, 41.037], [29.017, 41.029], [29.008, 41.022], [29.01, 41.012], [29.02, 41.002], [29.025, 40.99], [29.03, 40.97], [29.1, 40.95]];
function istMap(ctx) {
  ctx.drawImage(paperTex('#d9c393', 'mapland'), 0, 0); ctx.fillStyle = '#d9c393'; ctx.fillRect(-500, -500, W + 1000, 500); ctx.fillRect(-500, H, W + 1000, 500);
  seaArea(ctx, IST, IST_SEA);
}
function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
// kanatlı adam (yüz detayı yok): f = kanat çırpma açısı (-1..1)
function flyer(ctx, x, y, s, rot, f = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const wing = (sd) => {
    const F = f * 60; const p = [[sd * 18, -150], [sd * 110, -200 - F * .5], [sd * 230, -232 - F], [sd * 270, -222 - F], [sd * 252, -196 - F * .9]];
    for (let i = 0; i < 6; i++) { const k = i / 5; p.push([sd * lerp(240, 50, k), lerp(-188, -118, k) - F * (1 - k) * .8 + 18]); p.push([sd * lerp(222, 40, k), lerp(-178, -112, k) - F * (1 - k) * .8]); }
    shape(ctx, p, o.wing || '#e8d8b4', C.ink, 4, .5);
    for (let i = 1; i < 5; i++) { const k = i / 5; line(ctx, [[sd * lerp(40, 150, k), -140 - F * k * .3], [sd * lerp(60, 240, k), -200 - F * k]], 'rgba(110,74,44,.55)', 3, .2); }
  };
  wing(-1); wing(1);
  line(ctx, [[-10, -40], [-14 + f * 4, 20]], '#3b2a1e', 10, .3); line(ctx, [[10, -40], [14 - f * 4, 20]], '#3b2a1e', 10, .3);
  shape(ctx, [[-30, -30], [-26, -130], [-14, -150], [14, -150], [26, -130], [30, -30]], o.robe || '#7a3b26', C.ink, 4, .4);
  line(ctx, [[-26, -80], [26, -80]], C.gold, 6, .2);
  ell(ctx, 0, -172, 20, 22, C.skin, C.ink, 4);
  ell(ctx, 0, -192, 24, 13, '#f6f1e6', C.ink, 4); ell(ctx, 0, -200, 9, 7, C.red, null);
  ctx.restore();
}
function galata(ctx, x, y, s) { // Galata Kulesi
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-90, 0], [-80, -480], [80, -480], [90, 0]], '#cdb68a', C.ink, 6, .6);
  for (let yy = -40; yy > -480; yy -= 40) line(ctx, [[-86 + (-yy / 480) * 8, yy], [86 - (-yy / 480) * 8, yy]], 'rgba(42,29,21,.25)', 3, .3);
  [-300, -180, -60].forEach(wy => shape(ctx, [[-14, wy], [-14, wy - 50], [0, wy - 62], [14, wy - 50], [14, wy]], '#4a3a2c', C.ink, 3, .3));
  shape(ctx, [[-104, -480], [104, -480], [104, -530], [-104, -530]], '#bfa577', C.ink, 6, .5);
  for (let i = -3; i <= 3; i++) shape(ctx, [[i * 28 - 10, -484], [i * 28 - 10, -514], [i * 28, -524], [i * 28 + 10, -514], [i * 28 + 10, -484]], '#3a2a20', null, 0, .2);
  shape(ctx, [[-112, -530], [112, -530], [104, -546], [-104, -546]], '#a5805c', C.ink, 5, .4);
  shape(ctx, [[-96, -546], [0, -720], [96, -546]], '#5d6f7a', C.ink, 6, .5);
  line(ctx, [[0, -720], [0, -760]], C.ink, 5, .2); ell(ctx, 0, -764, 8, 8, C.gold, C.ink, 3);
  ctx.restore();
}
function skyGrad(ctx, a = '#e6d3a8', b = '#f3e6c6') { const g = ctx.createLinearGradient(0, 0, 0, 1200); g.addColorStop(0, a); g.addColorStop(1, b); ctx.fillStyle = g; ctx.fillRect(-400, -400, W + 800, H + 800); }
function clouds(ctx, lt, sp = 30, a = .5) { for (let i = 0; i < 4; i++) { const x = ((lt * sp + i * 330) % 1500 + 1500) % 1500 - 250, y = 300 + (i % 2) * 130; ctx.globalAlpha = a; ell(ctx, x, y, 110, 26, '#fff8e8', null); ell(ctx, x + 60, y - 18, 70, 24, '#fff8e8', null); } ctx.globalAlpha = 1; }
function waterBand(ctx, y0, lt, col = '#7fa6b4') {
  ctx.fillStyle = col; ctx.fillRect(-400, y0, W + 800, H);
  ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 4;
  for (let r = 0; r < 10; r++) for (let i = 0; i < 9; i++) { const x = ((i * 150 + r * 70 + lt * 40 * (r % 2 ? 1 : -1)) % 1500 + 1500) % 1500 - 200, y = y0 + 34 + r * 64; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 20, y - 10, x + 40, y); ctx.stroke(); }
}
function dome(ctx, cx, by, r, col) { const p = []; for (let i = 0; i <= 18; i++) { const a = Math.PI + i / 18 * Math.PI; p.push([cx + Math.cos(a) * r, by + Math.sin(a) * r * .9]); } shape(ctx, p, col, C.ink, 4, .6); line(ctx, [[cx, by - r * .9], [cx, by - r * .9 - 26]], C.ink, 4, .2); }
function minaret(ctx, x, by, h, col) { shape(ctx, [[x - 10, by], [x - 10, by - h], [x + 10, by - h], [x + 10, by]], col, C.ink, 4, .4); shape(ctx, [[x - 12, by - h], [x, by - h - 60], [x + 12, by - h]], '#5d6f7a', C.ink, 3, .3); }
function camii(ctx, x, by, s, col = '#cdb68a') {
  ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
  minaret(ctx, -190, 0, 300, col); minaret(ctx, 190, 0, 300, col);
  shape(ctx, [[-160, 0], [-160, -90], [160, -90], [160, 0]], col, C.ink, 5, .6);
  dome(ctx, -105, -90, 46, col); dome(ctx, 105, -90, 46, col);
  shape(ctx, [[-90, -90], [-90, -130], [90, -130], [90, -90]], col, C.ink, 5, .6); dome(ctx, 0, -130, 96, col);
  ctx.restore();
}
function kitap(ctx, x, y, s, lt, flip = true) { // açık kitap, sayfa çevrilir
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-300, 20], [0, 50], [300, 20], [300, 40], [0, 70], [-300, 40]], '#6e3a24', C.ink, 5, .4);
  shape(ctx, [[-290, -200], [0, -170], [0, 50], [-290, 20]], '#f3e7c8', C.ink, 5, .5);
  shape(ctx, [[290, -200], [0, -170], [0, 50], [290, 20]], '#f3e7c8', C.ink, 5, .5);
  for (let i = 0; i < 6; i++) { line(ctx, [[-250, -150 + i * 30 + i * 2], [-40, -130 + i * 30]], 'rgba(59,42,30,.6)', 4, .8); line(ctx, [[40, -130 + i * 30], [250, -150 + i * 30 + i * 2]], 'rgba(59,42,30,.6)', 4, .8); }
  if (flip) { const k = (lt * .8) % 1; const ang = k * Math.PI; const cx = Math.cos(ang) * 290; shape(ctx, [[0, -170], [cx, -200 + Math.sin(ang) * -40], [cx, 20 + Math.sin(ang) * -40], [0, 50]], '#fbf3dc', C.ink, 4, .4); }
  ctx.restore();
}
function kese(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-30, -90], [30, -90], [24, -70], [80, -30], [96, 30], [70, 80], [0, 96], [-70, 80], [-96, 30], [-80, -30], [-24, -70]], '#8b2a20', C.ink, 6, .6);
  line(ctx, [[-34, -72], [34, -72]], C.gold, 8, .2); ell(ctx, 0, 14, 26, 26, C.gold, C.ink, 4);
  ctx.restore();
}
function coin(ctx, x, y, r, rot) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.abs(Math.cos(rot)) * .9 + .1, 1); ell(ctx, 0, 0, r, r, C.gold, C.ink, 3); ell(ctx, 0, 0, r * .6, r * .6, null, '#a07a20', 2); ctx.restore(); }
function terazi(ctx, x, y, s, ang, lt) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-90, 300], [90, 300], [60, 270], [-60, 270]], '#6e4a2c', C.ink, 5, .4);
  line(ctx, [[0, 270], [0, -40]], '#6e4a2c', 14, .3); ell(ctx, 0, -50, 16, 16, C.gold, C.ink, 4);
  const dx = Math.cos(ang) * 260, dy = Math.sin(ang) * 260;
  line(ctx, [[-dx, -dy - 40], [dx, dy - 40]], '#6e4a2c', 12, .3);
  [[-dx, -dy - 40, 'GERÇEK', '#2f6b4f'], [dx, dy - 40, 'EFSANE', '#6a4a8c']].forEach(([px, py, t, c]) => {
    line(ctx, [[px, py], [px - 70, py + 140]], C.ink, 3, .2); line(ctx, [[px, py], [px + 70, py + 140]], C.ink, 3, .2);
    shape(ctx, [[px - 100, py + 140], [px + 100, py + 140], [px + 70, py + 180], [px - 70, py + 180]], C.gold, C.ink, 5, .4);
    ctx.save(); ctx.translate(px, py + 100); ctx.rotate(-2 * Math.PI / 180); tornRect(ctx, -95, -30, 190, 60, c, t.length * 9); text(ctx, t, 0, 3, 36, C.cream); ctx.restore();
  });
  ctx.restore();
}
function eagle(ctx, x, y, s, lt) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const f = Math.sin(lt * 6) * 30;
  shape(ctx, [[0, 0], [-60, -20 - f], [-140, -10 - f * 1.4], [-90, 10], [-30, 12], [30, 12], [90, 10], [140, -10 - f * 1.4], [60, -20 - f]], '#4a3020', null, 0, .4);
  ell(ctx, 0, 6, 26, 12, '#4a3020', null); ell(ctx, 30, 0, 10, 9, '#efe4cc', null); ctx.restore(); }
function padisahMini(ctx, x, y, s, lt) { padisah(ctx, x, y, s, { kaftan: '#7a1f1a', beard: '#2a1d15' }); }
function kosk(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-200, 0], [-200, -160], [200, -160], [200, 0]], '#e8d6b0', C.ink, 5, .5);
  for (let i = -3; i <= 3; i++) shape(ctx, [[i * 52 - 16, -20], [i * 52 - 16, -110], [i * 52, -128], [i * 52 + 16, -110], [i * 52 + 16, -20]], '#3e5f8a', C.ink, 3, .3);
  shape(ctx, [[-240, -160], [0, -240], [240, -160]], '#7a3b26', C.ink, 5, .5); dome(ctx, 0, -230, 40, '#5d6f7a'); ctx.restore(); }

const SCENES = [
  { s: 0, e: 2.53, draw(ctx, lt, d) { // HOOK
    ctx.save(); hookCard(ctx, lt, d, 'Bir Osmanlı Boğaz\'ı uçarak geçti!', 'Hezârfen · Rivayet'); ctx.restore();
    flyer(ctx, lerp(-100, 1150, lt / d), 1330 + Math.sin(lt * 3) * 12, .6, -.12, Math.sin(lt * 4) * .3);
  } },
  { s: 2.53, e: 5.08, draw(ctx, lt, d) { // tek kaynak
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    kitap(ctx, W / 2 - 40, 1000, 1.2, lt);
    const mx = W / 2 - 40 + Math.sin(lt * 2.2) * 200, my = 880 + Math.cos(lt * 3) * 50;
    ell(ctx, mx, my, 110, 110, 'rgba(220,235,240,.35)', C.ink, 12); line(ctx, [[mx + 78, my + 78], [mx + 170, my + 170]], '#6e4a2c', 24, .3);
    tag(ctx, 'DİKKAT', W / 2, 320, 70, lt, 0, C.ink);
    stampBox(ctx, 'TEK KAYNAK', W / 2, 520, 110, C.red, lt, 1.5, -6);
  } },
  { s: 5.08, e: 6.93, draw(ctx, lt, d) { // Evliya Çelebi, Seyahatnâme
    ctx.drawImage(paperTex('#d9c49a', 'evliya'), 0, 0); camera(ctx, lt, d, 1.08, 1, W / 2, 900);
    kitap(ctx, W / 2 - 40, 1050, 1.25, lt, false);
    const qx = W / 2 + 60 + Math.sin(lt * 9) * 60, qy = 880 + Math.cos(lt * 9) * 12;
    ctx.save(); ctx.translate(qx, qy); ctx.rotate(-.6); shape(ctx, [[0, 0], [-16, -90], [-4, -230], [24, -180], [14, -60]], '#f6f1e6', C.ink, 4, .4); line(ctx, [[0, 0], [8, -150]], '#8a7a60', 3, .2); ctx.restore();
    line(ctx, partial([[120, 880], [200, 870], [280, 885], [360, 872], [440, 880]], clamp(lt / d * 1.2)), '#3b2a1e', 5, .6);
    tag(ctx, 'SEYYAH EVLİYA ÇELEBİ', W / 2, 330, 62, lt, 0, '#2f6b4f');
    tag(ctx, 'SEYAHATNÂME', W / 2, 470, 54, lt, .5, C.ink, C.cream, 2);
  } },
  { s: 6.93, e: 8.85, draw(ctx, lt, d) { // 17. yüzyıl İstanbul
    skyGrad(ctx); pan(ctx, lt, d, -40, 0, 1, 1.08, W / 2, 1000); clouds(ctx, lt, 40);
    camii(ctx, 280, 1060, .8); galata(ctx, 760, 1060, .62);
    waterBand(ctx, 1060, lt);
    for (let i = 0; i < 2; i++) { const x = ((lt * 110 + i * 600) % 1400) - 200; ctx.save(); ctx.translate(x, 1180 + i * 90 + Math.sin(lt * 3 + i) * 5); shape(ctx, [[-90, -16], [90, -16], [66, 16], [-66, 16]], '#7a4a2c', C.ink, 4, .4); line(ctx, [[0, -16], [0, -110]], '#4a3020', 5, .2); shape(ctx, [[0, -106], [60, -40], [0, -36]], '#efe4cc', C.ink, 3, .3); ctx.restore(); }
    bigText(ctx, '17. YÜZYIL', W / 2, 360, 130, C.red, lt, 0, F_SANS, [C.cream, 14]);
    tag(ctx, 'İSTANBUL', W / 2, 520, 62, lt, .6, C.ink);
  } },
  { s: 8.85, e: 12.55, draw(ctx, lt, d) { // Hezârfen Ahmed Çelebi
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 850);
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = C.gold; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .25; ctx.beginPath(); ctx.moveTo(W / 2, 820); ctx.arc(W / 2, 820, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    // çevresinde dönen bilgi simgeleri
    for (let i = 0; i < 5; i++) { const a = lt * .9 + i / 5 * Math.PI * 2; const x = W / 2 - 40 + Math.cos(a) * 340, y = 800 + Math.sin(a) * 300;
      ctx.save(); ctx.translate(x, y);
      if (i === 0) { shape(ctx, [[-36, -26], [36, -26], [36, 26], [-36, 26]], '#6e3a24', C.ink, 4, .3); line(ctx, [[0, -26], [0, 26]], C.gold, 3, .1); }
      else if (i === 1) { ell(ctx, 0, 0, 34, 34, '#cfe0e4', C.ink, 4); line(ctx, [[-34, 0], [34, 0]], C.ink, 3, .1); line(ctx, [[0, -34], [0, 34]], C.ink, 3, .1); }
      else if (i === 2) { line(ctx, [[0, -40], [-26, 34]], C.ink, 6, .2); line(ctx, [[0, -40], [26, 34]], C.ink, 6, .2); ell(ctx, 0, -40, 8, 8, C.gold, C.ink, 3); }
      else if (i === 3) { shape(ctx, [[0, -36], [10, -10], [36, -10], [14, 6], [22, 34], [0, 18], [-22, 34], [-14, 6], [-36, -10], [-10, -10]], C.gold, C.ink, 3, .3); }
      else { shape(ctx, [[-30, 30], [0, -40], [30, 30]], '#e8d8b4', C.ink, 4, .3); }
      ctx.restore(); }
    const p = eBack(prog(lt, 0, .5)); if (p > 0) turkmenBey(ctx, W / 2 - 40, 860 + (1 - p) * 160, .95 * p, { robe: '#7a3b26', taj: '#2f6b4f' });
    tag(ctx, 'BİLGİSİYLE ÜNLÜ', W / 2, 320, 62, lt, .1, C.ink);
    tag(ctx, 'HEZÂRFEN AHMED ÇELEBİ', W / 2, 1250, 60, lt, 1.9, C.red, C.cream, 2);
  } },
  { s: 12.55, e: 14.55, draw(ctx, lt, d) { // bin bilgili
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.08, W / 2, 800);
    for (let i = 0; i < 18; i++) { const k = (lt * .5 + hash(i)) % 1; ctx.globalAlpha = Math.sin(k * Math.PI) * .6; coin(ctx, hash(i + 2) * 900 + 60, 1300 - k * 1000, 18, lt * 4 + i); } ctx.globalAlpha = 1;
    bigText(ctx, 'HEZÂRFEN', W / 2, 560, 130, C.cream, lt, 0, F_SANS, [C.ink, 14]);
    const n = Math.round(lerp(1, 1000, eOut(prog(lt, .3, 1.3))));
    bigText(ctx, '= ' + n, W / 2, 780, 150, C.gold, lt, .2, F_SANS, [C.ink, 14]);
    tag(ctx, '"BİN BİLGİLİ"', W / 2, 1000, 72, lt, .9, C.ink, C.cream);
  } },
  { s: 14.55, e: 17.39, draw(ctx, lt, d) { // Okmeydanı
    skyGrad(ctx, '#e9d9b4', '#f3e6c6'); camera(ctx, lt, d, 1, 1.08, W / 2, 1000); clouds(ctx, lt, 50);
    shape(ctx, [[-300, 1080], [200, 1000], [600, 1040], [1400, 980], [1400, 2200], [-300, 2200]], '#9aa463', C.ink, 5, 1.2);
    for (let i = 0; i < 30; i++) { const x = hash(i) * W, y = 1100 + hash(i + 9) * 300; line(ctx, [[x, y], [x + 6 + Math.sin(lt * 4 + i) * 6, y - 22]], '#5f6a3a', 3, .2); }
    const run = eInOut(prog(lt, .2, d - .2)); const hop = Math.max(0, Math.sin(run * Math.PI)) * 120;
    flyer(ctx, lerp(200, 720, run), 1150 - hop, .9, -.1 * run, Math.sin(lt * 8) * .5);
    tag(ctx, 'EVLİYA ÇELEBİ\'YE GÖRE', W / 2, 320, 58, lt, 0, '#2f6b4f');
    tag(ctx, 'OKMEYDANI', W / 2, 470, 70, lt, .9, C.ink, C.cream, 2);
  } },
  { s: 17.39, e: 20.8, draw(ctx, lt, d) { // kartal kanadı, defalarca
    skyGrad(ctx, '#e9d9b4', '#f3e6c6'); camera(ctx, lt, d, 1.06, 1, W / 2, 900); clouds(ctx, lt, 60);
    shape(ctx, [[-300, 1180], [400, 1150], [1400, 1170], [1400, 2200], [-300, 2200]], '#9aa463', C.ink, 5, 1.2);
    eagle(ctx, ((lt * 150) % 1400) - 200, 560 + Math.sin(lt * 2) * 30, 1.0, lt);
    const ph = (lt * .9) % 1; const hop = Math.sin(ph * Math.PI) * 260;
    flyer(ctx, 300 + lt * 110, 1170 - hop, 1.0, -.15, Math.sin(lt * 10) * .6);
    for (let i = 0; i < 3; i++) { const t0 = i / .9; const kx = 300 + t0 * 110; if (lt > t0) dust(ctx, lt - t0, kx, 1180, 5); }
    tag(ctx, 'KARTAL KANADINA BENZER', W / 2, 320, 58, lt, 0, C.ink);
    stampBox(ctx, 'DEFALARCA', W / 2, 1290, 86, C.red, lt, 2.2, -5);
  } },
  { s: 20.8, e: 23.44, draw(ctx, lt, d) { // büyük gün, lodos
    skyGrad(ctx, '#dcc39a', '#efdcb8'); camera(ctx, lt, d, 1, 1.08, W / 2, 900); clouds(ctx, lt, 260, .6);
    for (let i = 0; i < 10; i++) { const x = ((lt * 900 + i * 230) % 1700) - 300, y = 420 + i * 80; ctx.globalAlpha = .7; line(ctx, [[x, y], [x + 160, y - 10], [x + 230, y + 8]], '#fff8e8', 7, .3); } ctx.globalAlpha = 1;
    line(ctx, [[300, 1240], [300, 760]], '#6e4a2c', 10, .3);
    const fw = Math.sin(lt * 14) * 20; shape(ctx, [[300, 760], [460, 790 + fw], [600, 770 - fw], [470, 820 + fw * .5], [300, 860]], C.red, C.ink, 4, .5);
    waterBand(ctx, 1240, lt * 3);
    stampBox(ctx, 'BÜYÜK GÜN', W / 2, 330, 110, C.red, lt, .1, -6);
    tag(ctx, 'LODOS ESİYOR', 640, 1100, 64, lt, 1.4, '#3d6676', C.cream, 3);
  } },
  { s: 23.44, e: 26.4, draw(ctx, lt, d) { // Galata Kulesi'nden atlar
    skyGrad(ctx, '#d9c4a0', '#f1e3c2'); clouds(ctx, lt, 80);
    const camY = lerp(0, 260, eInOut(prog(lt, 0, 1.8))); ctx.translate(0, camY);
    shake(ctx, lt, 2.35, 12);
    galata(ctx, 470, 1420, 1.25);
    const jump = prog(lt, 2.35, .6);
    const fx = 470 + jump * 380, fy = 1420 - 1.25 * 546 - 30 + jump * jump * 120 - Math.sin(jump * Math.PI) * 80;
    flyer(ctx, fx, fy, .8, jump * -.5, jump > 0 ? Math.sin(lt * 10) * .4 : .2);
    ctx.translate(0, -camY);
    tag(ctx, 'GALATA KULESİ', W / 2, 320, 70, lt, 0, C.ink);
    if (lt > 2.35) stampBox(ctx, 'BOŞLUĞA!', W / 2, 500, 100, C.red, lt, 2.35, -6);
  } },
  { s: 26.4, e: 29.02, draw(ctx, lt, d) { // Boğaz'ı süzülerek geçer (harita)
    camera(ctx, lt, d, 1, 1.08, 520, 820); istMap(ctx);
    const g = proj(IST, 28.9741, 41.0256), u = proj(IST, 29.0167, 41.0236), sb = proj(IST, 28.984, 41.0135);
    const path = curvePts(g, [(g[0] + u[0]) / 2, g[1] - 200], u);
    const k = eInOut(prog(lt, .1, 2.2));
    ctx.save(); ctx.setLineDash([20, 14]); line(ctx, partial(path, k), C.red, 9, .3); ctx.restore();
    const q = partial(path, Math.max(.02, k)); const hp = q[q.length - 1];
    flyer(ctx, hp[0], hp[1] + 30, .32, -.1, Math.sin(lt * 8) * .3);
    pin(ctx, ...g, .9, lt, 0, C.ink); pin(ctx, ...u, .9, lt, 1.6, C.red);
    tag(ctx, 'GALATA', g[0] - 60, g[1] + 70, 40, lt, .1, C.ink);
    tag(ctx, 'ÜSKÜDAR', u[0], u[1] + 80, 40, lt, 1.7, C.red);
    tag(ctx, 'HALİÇ', ...proj(IST, 28.955, 41.04), 32, lt, .4, '#3d6676', C.cream, -30);
    tag(ctx, 'BOĞAZ', ...proj(IST, 29.022, 41.05), 34, lt, .5, '#3d6676', C.cream, 60);
    tag(ctx, 'SÜZÜLEREK', W / 2, 320, 72, lt, 0, C.red);
    tag(ctx, '~3,5 KM', W / 2, 1230, 54, lt, 1.0, C.ink, C.cream, 2);
  } },
  { s: 29.02, e: 30.9, draw(ctx, lt, d) { // Doğancılar Meydanı'na iner
    skyGrad(ctx, '#e6d3a8', '#f3e6c6'); camera(ctx, lt, d, 1, 1.06, W / 2, 1000); clouds(ctx, lt, 30);
    shape(ctx, [[-300, 1160], [1400, 1160], [1400, 2200], [-300, 2200]], '#c9b27a', C.ink, 5, 1);
    for (let i = 0; i < 5; i++) { const x = 90 + i * 210; ell(ctx, x, 980, 70, 90, '#6f8a50', C.ink, 4); line(ctx, [[x, 1060], [x, 1160]], '#6e4a2c', 12, .3); }
    const k = eOut(prog(lt, 0, 1.2));
    flyer(ctx, lerp(-60, 520, k), lerp(600, 1160, k), 1.0, lerp(-.5, 0, k), k < 1 ? Math.sin(lt * 10) * .4 : -.3);
    if (k > .95) dust(ctx, lt - 1.2, 520, 1170, 8);
    [[170, '#2f6b4f'], [840, '#3e5f8a']].forEach(([x, c], i) => { const j = Math.max(0, Math.sin(lt * 8 + i)) * 14; pawn(ctx, x, 1240 - j, 2.2, c); });
    tag(ctx, 'DOĞANCILAR MEYDANI', W / 2, 330, 62, lt, 0, C.red);
  } },
  { s: 30.9, e: 33.3, draw(ctx, lt, d) { // IV. Murad Sarayburnu'ndan izler
    skyGrad(ctx, '#e6d3a8', '#f3e6c6'); camera(ctx, lt, d, 1, 1.06, W / 2, 900); clouds(ctx, lt, 30);
    flyer(ctx, 520 + lt * 140, 640 + Math.sin(lt * 2) * 30, .4, -.1, Math.sin(lt * 6) * .3);
    kosk(ctx, 700, 1200, .75);
    waterBand(ctx, 1200, lt);
    const p = eBack(prog(lt, 0, .5)); if (p > 0) padisah(ctx, 300, 995 + (1 - p) * 160, .78 * p, { kaftan: '#7a1f1a', beard: '#2a1d15' });
    tag(ctx, 'IV. MURAD İZLİYOR', W / 2, 300, 62, lt, .1, C.red);
    tag(ctx, 'SARAYBURNU', W / 2, 1290, 56, lt, .9, C.ink, C.cream, 2);
  } },
  { s: 33.3, e: 35.1, draw(ctx, lt, d) { // bir kese altın
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); shake(ctx, lt, .55, 10); camera(ctx, lt, d, 1, 1.08, W / 2, 850);
    const k = eOut(prog(lt, 0, .55)); kese(ctx, W / 2 - 40, lerp(300, 880, k), 1.8, Math.sin(lt * 3) * .06);
    for (let i = 0; i < 14; i++) { const t0 = .55 + i * .04; const p = prog(lt, t0, .9); if (p <= 0) continue; const a = -Math.PI / 2 + (hash(i) - .5) * 2.4; const x = W / 2 - 40 + Math.cos(a) * 340 * p, y = 920 + Math.sin(a) * 260 * p + p * p * 420; coin(ctx, x, y, 22, lt * 8 + i); }
    stampBox(ctx, 'BİR KESE ALTIN', W / 2, 330, 96, C.red, lt, .4, -5);
  } },
  { s: 35.1, e: 37.08, draw(ctx, lt, d) { // tehlikeli bulur
    ctx.drawImage(paperTex('#5a4030', 'inside'), 0, 0); shake(ctx, lt, 1.0, 14); camera(ctx, lt, d, 1.1, 1, W / 2, 850);
    const g = ctx.createRadialGradient(W / 2, 800, 40, W / 2, 800, 700); g.addColorStop(0, 'rgba(220,90,50,.4)'); g.addColorStop(1, 'rgba(220,90,50,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.globalAlpha = .85; flyer(ctx, W / 2 - 40, 1150 + Math.sin(lt * 3) * 10, 1.5, 0, Math.sin(lt * 4) * .2, { wing: '#b8a888', robe: '#4a2a20' }); ctx.restore();
    tag(ctx, 'AMA SONRA...', W / 2, 330, 66, lt, 0, C.cream, C.ink);
    stampBox(ctx, 'TEHLİKELİ', W / 2, 560, 120, C.red, lt, .9, -7);
  } },
  { s: 37.08, e: 39.08, draw(ctx, lt, d) { // Cezayir'e sürgün
    camera(ctx, lt, d, 1, 1.06, 520, 840); medMap(ctx, MEDM);
    const a = proj(MEDM, 28.97, 41.0), b = proj(MEDM, 3.06, 36.75);
    pin(ctx, ...a, .8, lt, 0, C.ink); pin(ctx, ...b, 1.1, lt, 1.3, C.red);
    arrow(ctx, [a, proj(MEDM, 25.5, 37.6), proj(MEDM, 20, 36.2), proj(MEDM, 12, 37.6), proj(MEDM, 6, 37.6), [b[0] + 20, b[1] - 10]], eInOut(prog(lt, .1, 1.5)), C.red, 10, true);
    tag(ctx, 'İSTANBUL', a[0] - 60, a[1] - 110, 36, lt, .1, C.ink);
    tag(ctx, 'CEZAYİR', b[0] + 60, b[1] + 70, 44, lt, 1.4, C.red);
    stampBox(ctx, 'SÜRGÜN', W / 2, 330, 110, C.red, lt, .2, -6);
  } },
  { s: 39.08, e: 42.13, draw(ctx, lt, d) { // gerçek mi efsane mi
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.05, W / 2, 850);
    terazi(ctx, W / 2 - 40, 900, 1.15, Math.sin(lt * 2.4) * .2, lt);
    bigText(ctx, 'GERÇEK Mİ, EFSANE Mİ?', W / 2, 330, 76, C.ink, lt, 0, F_SANS, [C.cream, 10]);
    tag(ctx, 'KESİN BİLİNMİYOR', W / 2, 1290, 60, lt, 1.6, C.red, C.cream, 2);
  } },
  { s: 42.13, e: 44.67, draw(ctx, lt, d) { // rivayet: gün batımında süzülüş
    skyGrad(ctx, '#c9703f', '#f0c27a'); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    const sg = ctx.createRadialGradient(560, 940, 20, 560, 940, 420); sg.addColorStop(0, 'rgba(255,220,140,.8)'); sg.addColorStop(1, 'rgba(255,220,140,0)'); ctx.fillStyle = sg; ctx.fillRect(0, 300, W, 900); ell(ctx, 560, 960, 110, 110, '#f6d27a', null);
    ctx.save(); ctx.globalAlpha = .9; camii(ctx, 250, 1080, .7, '#5a3a2a'); galata(ctx, 800, 1080, .5); ctx.restore();
    waterBand(ctx, 1080, lt, '#7a5a5a');
    flyer(ctx, lerp(100, 820, lt / d), 640 + Math.sin(lt * 2) * 20, .6, -.12, Math.sin(lt * 3) * .2, { wing: '#3a2a20', robe: '#2a1d15' });
    tag(ctx, 'BİR RİVAYET', W / 2, 320, 66, lt, 0, C.cream, C.ink);
  } },
  { s: 44.67, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    ctx.save(); ctx.globalAlpha = .15; ctx.fillStyle = C.gold; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .2; ctx.beginPath(); ctx.moveTo(W / 2, 1000); ctx.arc(W / 2, 1000, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    flyer(ctx, W / 2 - 40 + Math.sin(lt * 1.5) * 60, 1060 + Math.sin(lt * 2) * 20, 1.1, Math.sin(lt * 1.5) * .08, Math.sin(lt * 3) * .3);
    bigText(ctx, 'GÖKYÜZÜNE BAKANLARA', W / 2, 380, 72, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'İLHAM VERİYOR', W / 2, 520, 66, lt, .6, C.ink, C.cream);
  } },
];
