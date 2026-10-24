// ===== Seyit Onbaşı ve top mermisi, 18 Mart 1915 (sabah) =====
const KEY = ['MERMİSİNİ...', 'SIRTINDA', 'MART,', 'ÇANAKKALE', 'BOĞAZI.', 'MECİDİYE', 'TABYASI\'NI', 'VİNCİ', 'BOZULUR.', 'SEYİT,', 'SIRTLANIR.', 'OKKA,', 'KİLO', 'GÜRLER!', 'RİVAYETE', 'ZIRHLISINI', 'ÜÇ', 'ONBAŞILIĞA', 'KOCA', 'SEYİT', 'KALDIRAMADI.', 'TAHTA', 'GEÇİLMEDİ.', 'KAHRAMANLAR'];
const DURATION = 45.85 + 2.2;
const OUTRO_AT = DURATION - 1.6;
const CX = 500;
function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
// ---- Çanakkale Boğazı haritası ----
const DM = { x: 500, y: 820, lon: 26.42, lat: 40.2, k: 1500 };
const PD = (lon, lat) => proj(DM, lon, lat);
const STRAIT = [[25.6, 40.5], [26.28, 40.30], [26.27, 40.23], [26.24, 40.17], [26.20, 40.10], [26.18, 40.045], [26.22, 40.07], [26.27, 40.10], [26.33, 40.12], [26.37, 40.14], [26.385, 40.16], [26.41, 40.20], [26.46, 40.24], [26.52, 40.30], [26.60, 40.36], [26.68, 40.41], [26.75, 40.46], [26.85, 40.55], [26.95, 40.5], [26.80, 40.40], [26.70, 40.36], [26.63, 40.32], [26.55, 40.26], [26.47, 40.20], [26.42, 40.16], [26.40, 40.13], [26.37, 40.10], [26.33, 40.06], [26.27, 40.02], [26.19, 40.0], [26.15, 39.9], [26.1, 39.6], [25.6, 39.6]];
function straitMap(ctx) {
  ctx.drawImage(paperTex('#d9c393', 'mapland'), 0, 0); ctx.fillStyle = '#d9c393'; ctx.fillRect(-400, -400, W + 800, 400); ctx.fillRect(-400, H, W + 800, 400);
  seaArea(ctx, DM, STRAIT);
  [[26.30, 40.20], [26.33, 40.27], [26.25, 40.13], [26.50, 40.10], [26.55, 40.18], [26.62, 40.24]].forEach(([lo, la]) => { const [x, y] = PD(lo, la); line(ctx, [[x - 16, y + 10], [x, y - 12], [x + 16, y + 10]], '#7d6a52', 4, 1); });
}
// ---- figürler ----
// top mermisi (yatay): uzunluk ~220*s; nose sağda
function shell(ctx, x, y, s, rot = 0, wood = false) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const body = wood ? '#b88a52' : '#8d9296', band = wood ? '#8a6234' : '#b8742e';
  shape(ctx, [[-110, -38], [40, -38], [80, -30], [108, -12], [116, 0], [108, 12], [80, 30], [40, 38], [-110, 38]], body, C.ink, 5, .4);
  shape(ctx, [[-86, -38], [-70, -38], [-70, 38], [-86, 38]], band, C.ink, 3, .2);
  shape(ctx, [[-110, -38], [-100, -38], [-100, 38], [-110, 38]], band, C.ink, 3, .2);
  if (wood) for (let i = 0; i < 4; i++) line(ctx, [[-60, -24 + i * 16], [60, -20 + i * 16]], 'rgba(90,55,25,.5)', 3, 1.2);
  else line(ctx, [[-60, -22], [50, -22]], 'rgba(255,255,255,.35)', 6, .2);
  ctx.restore();
}
// Seyit (arkadan görünüm, yüz yok): kabalak, haki üniforma, geniş omuz. lift 0..1: mermi yerden omza
function seyit(ctx, x, y, s, lift = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const kh = '#7d7450', khD = '#5f583c';
  // bacaklar + çizmeler (dolak)
  const st = o.step || 0;
  shape(ctx, [[-62, -10], [-56, -190], [-6, -190], [-14, -10 + st]], khD, C.ink, 5, .5);
  shape(ctx, [[14, -10 - st], [6, -190], [56, -190], [62, -10]], khD, C.ink, 5, .5);
  shape(ctx, [[-66, 0], [-62, -60], [-12, -60], [-10, 0 + st]], '#8f8566', C.ink, 4, .4);
  shape(ctx, [[10, 0 - st], [12, -60], [62, -60], [66, 0]], '#8f8566', C.ink, 4, .4);
  for (let i = 0; i < 3; i++) { line(ctx, [[-62, -50 + i * 16], [-12, -40 + i * 16]], 'rgba(42,29,21,.35)', 3, .3); line(ctx, [[12, -40 + i * 16], [62, -50 + i * 16]], 'rgba(42,29,21,.35)', 3, .3); }
  // gövde (sırt)
  shape(ctx, [[-96, -180], [-110, -330], [-80, -400], [80, -400], [110, -330], [96, -180]], kh, C.ink, 6, .6);
  line(ctx, [[0, -390], [0, -190]], 'rgba(42,29,21,.3)', 4, .4);
  shape(ctx, [[-100, -200], [100, -200], [100, -176], [-100, -176]], '#5a4a32', C.ink, 4, .3); // kemer
  // baş (arkadan) + kabalak
  shape(ctx, [[-26, -400], [-22, -430], [22, -430], [26, -400]], C.skin, C.ink, 4, .3);
  ell(ctx, 0, -470, 50, 50, kh, C.ink, 5);
  shape(ctx, [[-56, -480], [-52, -520], [-30, -540], [30, -540], [52, -520], [56, -480], [40, -458], [-40, -458]], '#6e6545', C.ink, 5, .5);
  for (let i = -2; i <= 2; i++) line(ctx, [[i * 20, -536], [i * 22, -462]], 'rgba(42,29,21,.3)', 3, .3);
  // kollar + mermi
  const sy = lerp(-40, -450, eInOut(lift)), sx = lerp(130, 10, eInOut(lift));
  const hl = [sx - 90, sy + 30], hr = [sx + 70, sy + 30];
  line(ctx, [[-96, -380], [-150, -300 + (1 - lift) * 120], hl], kh, 30, .5);
  line(ctx, [[96, -380], [150, -300 + (1 - lift) * 120], hr], kh, 30, .5);
  shell(ctx, sx, sy, 1.15, lift > .5 ? -.05 : 0, o.wood);
  ell(ctx, ...hl, 18, 16, C.skin, C.ink, 3); ell(ctx, ...hr, 18, 16, C.skin, C.ink, 3);
  ctx.restore();
}
// zırhlı savaş gemisi (yan görünüm, gri), dir 1 sağa
function battleship(ctx, x, y, s, dir = 1, lt = 0, fireAt = -1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-300, -20], [300, -30], [330, -60], [-290, -50]], '#7c848a', C.ink, 5, .5);
  shape(ctx, [[-300, -20], [-270, 30], [270, 30], [300, -30]], '#4f565c', C.ink, 5, .5);
  shape(ctx, [[-150, -50], [-150, -100], [120, -100], [120, -50]], '#8d959b', C.ink, 4, .4);
  shape(ctx, [[-40, -100], [-40, -150], [40, -150], [40, -100]], '#8d959b', C.ink, 4, .4);
  [[-80, -100], [70, -100]].forEach(([fx, fy]) => shape(ctx, [[fx - 20, fy], [fx - 16, fy - 90], [fx + 16, fy - 90], [fx + 20, fy]], '#5a6066', C.ink, 4, .3));
  line(ctx, [[0, -150], [0, -230]], C.ink, 5, .2);
  [[-220, -60], [200, -60]].forEach(([tx, ty]) => { ell(ctx, tx, ty - 6, 40, 20, '#6c747a', C.ink, 4); line(ctx, [[tx, ty - 10], [tx + (tx > 0 ? 90 : -90), ty - 22]], C.ink, 9, .2); });
  for (let i = 0; i < 3; i++) { const k = ((lt * .6 + i / 3) % 1); ctx.globalAlpha = (1 - k) * .55; ell(ctx, -80 + k * -60, -200 - k * 120, 24 + k * 30, 18 + k * 20, '#555', null); ell(ctx, 70 + k * -60, -200 - k * 120, 24 + k * 30, 18 + k * 20, '#555', null); }
  ctx.globalAlpha = 1;
  if (fireAt >= 0) { const f = (lt - fireAt) % 1.2; if (f > 0 && f < .3) { ctx.globalAlpha = 1 - f / .3; shape(ctx, [[290, -82], [360, -110], [340, -82], [380, -60], [290, -70]], '#f8d25a', '#e2572b', 4, 2); ctx.globalAlpha = 1; } }
  ctx.restore();
}
function sea(ctx, y, lt, col = '#7fa5b2') {
  shape(ctx, [[-300, y], [1400, y], [1400, 2300], [-300, 2300]], col, C.ink, 4, 1);
  for (let i = 0; i < 6; i++) { const yy = y + 30 + i * 50; line(ctx, [[-100 + ((lt * 50 + i * 80) % 160), yy], [500, yy + Math.sin(lt * 2 + i) * 6], [1200, yy]], 'rgba(235,245,248,.45)', 4, 1); }
}
function burst(ctx, x, y, s, k) { // patlama, k 0..1
  if (k <= 0 || k >= 1) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * (0.6 + k), s * (0.6 + k)); ctx.globalAlpha = 1 - k;
  const pts = []; for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2, r = i % 2 ? 50 : 100; pts.push([Math.cos(a) * r, Math.sin(a) * r]); }
  shape(ctx, pts, '#f8d25a', '#e2572b', 5, 3); ell(ctx, 0, 0, 40, 40, '#fff2c0', null); ctx.restore();
}
function splash(ctx, x, y, s, k) {
  if (k <= 0 || k >= 1) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = 1 - k;
  for (let i = -3; i <= 3; i++) line(ctx, [[i * 12, 0], [i * 26, -40 - k * 160 * (1 - Math.abs(i) / 4)]], '#e8f3f6', 10, 1); ctx.restore();
}
// kıyı topu (ağır sahil topu), elev: namlu açısı
function coastGun(ctx, x, y, s, fire = 0, elev = -.25) {
  ctx.save(); ctx.translate(x - Math.sin(clamp(fire) * Math.PI) * 26 * s, y); ctx.scale(s, s);
  shape(ctx, [[-170, 0], [-150, -90], [110, -90], [140, 0]], '#7a6e58', C.ink, 6, .6);
  ell(ctx, -30, -100, 70, 70, '#6c6a5c', C.ink, 6);
  ctx.save(); ctx.translate(-30, -110); ctx.rotate(elev);
  shape(ctx, [[-90, -36], [300, -24], [300, 24], [-90, 36]], '#5c6066', C.ink, 6, .5);
  shape(ctx, [[280, -30], [320, -30], [320, 30], [280, 30]], '#4a4e54', C.ink, 5, .3);
  if (fire > 0 && fire < 1) { ctx.globalAlpha = 1 - fire; shape(ctx, [[320, -20], [400 + fire * 60, -60], [380, -10], [430 + fire * 80, 20], [320, 16]], '#f8d25a', '#e2572b', 5, 3); ctx.globalAlpha = 1; }
  ctx.restore();
  ctx.restore();
}
function smoke(ctx, lt, x, y, t0, n = 10, c = 'rgba(235,228,214,.8)') {
  const k = lt - t0; if (k < 0) return;
  for (let i = 0; i < n; i++) { const a = hash(i + x) * Math.PI * 2; const r = 20 + k * (60 + hash(i) * 70); ctx.globalAlpha = clamp(1 - k / 3.2) * .85; ell(ctx, x + Math.cos(a) * r * .8 + k * 40, y + Math.sin(a) * r * .4 - k * 30, 34 + k * 30, 26 + k * 22, c, null); }
  ctx.globalAlpha = 1;
}
function rampart(ctx, y, lt) { // tabya: toprak sed + kum torbaları
  shape(ctx, [[-300, 2300], [-300, y], [200, y - 30], [700, y - 10], [1400, y - 40], [1400, 2300]], '#a8905f', C.ink, 5, 1.2);
  for (let r = 0; r < 2; r++) for (let i = -1; i < 14; i++) { const x = i * 80 + (r ? 40 : 0); ell(ctx, x, y - 20 - r * 34, 42, 18, '#c9b183', C.ink, 3); }
}
function sky(ctx, top = '#d8c39a', bot = '#efe1c0') {
  const g = ctx.createLinearGradient(0, 0, 0, 1200); g.addColorStop(0, top); g.addColorStop(1, bot);
  ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, 1600);
}
function crane(ctx, x, y, s, fall = 0) { // mermi vinci
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-20, 0], [-14, -420], [14, -420], [20, 0]], '#6c6a5c', C.ink, 5, .4);
  ctx.save(); ctx.translate(0, -400); ctx.rotate(fall * 1.1);
  shape(ctx, [[0, -12], [260, -30], [260, -6], [0, 12]], '#6c6a5c', C.ink, 5, .4);
  line(ctx, [[250, -12], [250 + fall * 20, 140 + fall * 60]], C.ink, 4, .5);
  ctx.restore(); ctx.restore();
}
function camera1915(ctx, x, y, s, flash = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  line(ctx, [[0, 0], [-80, 260]], '#6e4a2c', 10, .3); line(ctx, [[0, 0], [80, 260]], '#6e4a2c', 10, .3); line(ctx, [[0, 0], [0, 270]], '#6e4a2c', 10, .3);
  shape(ctx, [[-70, -120], [70, -120], [70, 0], [-70, 0]], '#3b2a1e', C.ink, 5, .4);
  shape(ctx, [[70, -100], [150, -110], [150, -10], [70, -20]], '#5a4632', C.ink, 4, .4);
  ell(ctx, 160, -60, 26, 40, '#2a2420', C.ink, 4); ell(ctx, 160, -60, 12, 20, '#6f8a9a', null);
  line(ctx, [[-40, -120], [-40, -190]], C.ink, 5, .2); shape(ctx, [[-80, -190], [0, -190], [-10, -210], [-70, -210]], '#cfd3d6', C.ink, 3, .2);
  if (flash > 0) { ctx.globalAlpha = flash; ell(ctx, -40, -210, 120 * flash + 30, 90 * flash + 20, '#fff8d8', null); ctx.globalAlpha = 1; }
  ctx.restore();
}
function chevron(ctx, x, y, s, p) { // onbaşı rütbesi (temsili kol şeridi)
  ctx.save(); ctx.translate(x, y); ctx.scale(s * eBack(p), s * eBack(p));
  shape(ctx, [[-120, -150], [120, -150], [120, 150], [-120, 150]], '#7d7450', C.ink, 6, .5);
  for (let i = 0; i < 2; i++) shape(ctx, [[-90, -30 + i * 70], [0, -90 + i * 70], [90, -30 + i * 70], [90, 0 + i * 70], [0, -60 + i * 70], [-90, 0 + i * 70]], C.red, C.ink, 4, .3);
  ctx.restore();
}

const SCENES = [
  { s: 0, e: 2.55, draw(ctx, lt, d) { // HOOK — dev mermiye yakın çekimden geri çekilme: Seyit (arkadan) mermiyi sırtlamış, tabya topu ateşliyor
    shake(ctx, lt, 0, 18, .3); shake(ctx, lt, 1.3, 12, .3);
    const z = lt < .4 ? lerp(1.9, 1.0, eOut(lt / .4)) : lerp(1.0, 1.05, eInOut((lt - .4) / (d - .4)));
    ctx.translate(330, 880); ctx.scale(z, z); ctx.translate(-330, -880);
    sky(ctx, '#5b5049', '#d9a66c');
    // ufukta yükselen duman sütunları
    [[140, .38], [560, .3], [960, .34]].forEach(([x0, a], j) => { for (let i = 0; i < 9; i++) { const k = ((i / 9) + lt * .18 + j * .1) % 1; ctx.globalAlpha = a * (1 - k); ell(ctx, x0 + k * 140 + Math.sin(lt + i) * 10, 1000 - k * 420, 40 + k * 70, 30 + k * 46, '#3e3631', null); } }); ctx.globalAlpha = 1;
    sea(ctx, 1010, lt, '#6f8f98');
    battleship(ctx, 800 - lt * 25, 1022, .34, -1, lt, .2);
    splash(ctx, 610, 1030, .7, ((lt + .3) % 1.1) / 1.1); splash(ctx, 880, 1040, .5, ((lt + .85) % 1.3) / 1.3);
    burst(ctx, 700, 960, .45, ((lt + .1) % 1.4) / .5);
    rampart(ctx, 1260, lt);
    // tabya topu ateşler (periyodik), namlu dumanı
    const f = ((lt + .05) % 1.3) / .35;
    coastGun(ctx, 690, 1270, .72, f < 1 ? f : 0, -.32);
    smoke(ctx, lt + 1.2, 900, 1080, 0, 10, 'rgba(232,226,212,.8)'); smoke(ctx, (lt + .05) % 1.3, 920, 1070, 0, 8, 'rgba(240,234,220,.85)');
    // uçuşan toz/kıvılcım
    for (let i = 0; i < 14; i++) { const k = (lt * .7 + hash(i + 50)) % 1; ctx.globalAlpha = (1 - k) * .8; ell(ctx, 120 + hash(i + 51) * 760 + k * 80, 1300 - k * 420, 5, 5, '#f3c56a', null); } ctx.globalAlpha = 1;
    // Seyit (arkadan, yüz yok) mermiyi sırtlamış, adım atıyor
    seyit(ctx, 320 + Math.sin(lt * 5) * 6, 1450, 1.18, 1, { step: Math.sin(lt * 8) * 10 });
    hookText(ctx, lt + .6, 'Dev top mermisini... sırtında taşıdı!', { style: 'zoom', key: 'SIRTINDA', y: 430 });
  } },
  { s: 2.55, e: 5.83, draw(ctx, lt, d) { // 18 Mart 1915, Çanakkale Boğazı
    camera(ctx, lt, d, 1, 1.1, 480, 880); straitMap(ctx);
    const kb = PD(26.38, 40.15);
    for (let i = 0; i < 4; i++) { const k = clamp(lt / d); const p = PD(26.12 + i * .04 + k * .1, 39.93 + (i % 2) * .03 + k * .07); ctx.save(); ctx.translate(...p); ctx.rotate(-.6); shape(ctx, [[-30, -8], [30, -8], [40, 0], [30, 8], [-30, 8]], '#5a6066', C.ink, 3, .3); ctx.restore(); }
    pin(ctx, ...kb, 1.3, lt, .9, C.red); tag(ctx, 'RUMELİ MECİDİYE TABYASI', kb[0] - 90, kb[1] - 150, 38, lt, 1.1, C.red);
    tag(ctx, 'ÇANAKKALE BOĞAZI', CX, 1260, 52, lt, 2.2, '#3d6676', C.cream, 2);
    sealPro(ctx, '18 Mart', 'Çanakkale Boğazı', CX, 400, 150, C.red, lt, 0, '1915');
  } },
  { s: 5.83, e: 9.31, draw(ctx, lt, d) { // donanma tabyayı ateşe boğar
    sky(ctx); camera(ctx, lt, d, 1, 1.07, CX, 900); shake(ctx, lt, 1.3, 12); shake(ctx, lt, 2.6, 10);
    sea(ctx, 820, lt);
    battleship(ctx, 260 + lt * 15, 840, .6, 1, lt, .2); battleship(ctx, 760 + lt * 10, 800, .42, 1, lt + .4, .6);
    rampart(ctx, 1150, lt);
    [1.3, 2.6].forEach((t0, i) => { burst(ctx, 330 + i * 330, 1110, 1.2, prog(lt, t0, .6)); smoke(ctx, lt, 330 + i * 330, 1080, t0, 8, 'rgba(90,80,70,.45)'); });
    tag(ctx, 'DÜŞMAN DONANMASI', CX, 300, 64, lt, 0, C.ink);
    stampBox(ctx, 'TABYA ATEŞ ALTINDA', CX, 470, 64, C.red, lt, 1.2, -5);
  } },
  { s: 9.31, e: 12.83, draw(ctx, lt, d) { // vinç bozulur, arkadaşları yaralı
    sky(ctx, '#bfae8a', '#e3d3ae'); camera(ctx, lt, d, 1.0, 1.06, CX, 900); shake(ctx, lt, .5, 14);
    rampart(ctx, 1180, lt);
    crane(ctx, 320, 1160, 1.2, eOut(prog(lt, .5, .8)));
    burst(ctx, 540, 760, 1.2, prog(lt, .4, .6)); smoke(ctx, lt, 520, 740, .5, 10, 'rgba(80,70,60,.5)');
    fire(ctx, 760, 1150, 1, lt); fire(ctx, 840, 1160, .7, lt + .5);
    tag(ctx, 'MERMİ VİNCİ BOZULDU', CX, 300, 60, lt, 0, C.ink);
    tag(ctx, 'ARKADAŞLARININ ÇOĞU YARALI', CX, 440, 50, lt, 1.6, C.red, C.cream, 2);
  } },
  { s: 12.83, e: 15.32, draw(ctx, lt, d) { // Seyit mermiyi sırtlanır
    sky(ctx, '#cdb68a', '#efe1c0'); camera(ctx, lt, d, 1.0, 1.08, CX, 1000);
    ctx.save(); ctx.globalAlpha = .22; ctx.fillStyle = C.gold; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + lt * .3; ctx.beginPath(); ctx.moveTo(CX, 700); ctx.arc(CX, 700, 1000, a, a + .13); ctx.fill(); } ctx.restore();
    rampart(ctx, 1250, lt);
    seyit(ctx, CX - 40, 1290, 1.25, eInOut(prog(lt, .6, 1.4)));
    dust(ctx, lt, CX - 40, 1290, 10);
    tag(ctx, 'TOPÇU ERİ SEYİT', CX, 300, 64, lt, 0, C.red);
  } },
  { s: 15.32, e: 18.04, draw(ctx, lt, d) { // 215 okka
    bg(ctx); camera(ctx, lt, d, 1, 1.06, CX, 900);
    const sw = Math.sin(lt * 2.4) * .08 * (1 - prog(lt, 0, 2.5)) + .14;
    ctx.save(); ctx.translate(CX, 1060); line(ctx, [[0, 230], [0, -120]], '#6e4a2c', 16, .3); shape(ctx, [[-120, 240], [120, 240], [90, 210], [-90, 210]], '#6e4a2c', C.ink, 4, .3);
    ctx.rotate(sw); line(ctx, [[-300, -120], [300, -120]], '#6e4a2c', 14, .3);
    [[-300, 1], [300, -1]].forEach(([px, k]) => { ctx.save(); ctx.translate(px, -120); ctx.rotate(-sw); line(ctx, [[-90, 160], [0, 0], [90, 160]], C.ink, 3, .3); shape(ctx, [[-110, 160], [110, 160], [90, 190], [-90, 190]], '#b8892f', C.ink, 4, .3);
      if (k > 0) shell(ctx, 0, 112, .8); else { for (let i = 0; i < 3; i++) shape(ctx, [[-60 + i * 40, 160], [-60 + i * 40, 90 - i * 10], [-30 + i * 40, 90 - i * 10], [-30 + i * 40, 160]], '#5a5048', C.ink, 3, .2); } ctx.restore(); });
    ctx.restore();
    tag(ctx, 'KAYNAKLARA GÖRE', CX, 300, 56, lt, 0, C.ink);
    stampBox(ctx, '215 OKKA', CX, 520, 120, C.red, lt, 1.6, -6);
  } },
  { s: 18.04, e: 20.97, draw(ctx, lt, d) { // ~276 kilo, yürüyüş
    sky(ctx); pan(ctx, lt, d, -60, 0, 1, 1.05, CX, 1000);
    rampart(ctx, 1250, lt);
    const ph = lt * 6; seyit(ctx, CX + 60 + Math.sin(ph) * 6, 1290 + Math.abs(Math.sin(ph)) * -10, 1.0, 1, { step: Math.sin(ph) * 14 });
    dust(ctx, lt, CX + 60, 1290, 8);
    bigText(ctx, '≈ 276 KİLO', CX, 360, 120, C.red, lt, .4, F_SANS, [C.cream, 14]);
    tag(ctx, 'FARKLI RAKAMLAR DA VAR', CX, 520, 44, lt, 1.2, C.ink);
  } },
  { s: 20.97, e: 23.89, draw(ctx, lt, d) { // namluya sürülür, top gürler
    sky(ctx, '#d0b98c', '#f0e2c2'); camera(ctx, lt, d, 1.0, 1.08, CX, 1000); shake(ctx, lt, 1.5, 18);
    sea(ctx, 860, lt);
    rampart(ctx, 1180, lt);
    const load = eInOut(prog(lt, 0, 1.1));
    if (load < 1) shell(ctx, lerp(120, 360, load), 1020 - load * 30, .6, -.2);
    coastGun(ctx, 420, 1150, 1.1, prog(lt, 1.5, .6), -.22);
    smoke(ctx, lt, 830, 900, 1.6, 10);
    tag(ctx, 'MERMİ NAMLUYA', CX, 300, 60, lt, 0, C.ink);
    stampBox(ctx, 'TOP YENİDEN GÜRLER!', CX, 470, 70, C.red, lt, 1.5, -5);
  } },
  { s: 23.89, e: 27.59, draw(ctx, lt, d) { // rivayete göre zırhlıyı vurdu
    sky(ctx, '#d8c39a', '#efe1c0'); camera(ctx, lt, d, 1.0, 1.08, 600, 900);
    sea(ctx, 980, lt);
    battleship(ctx, 690, 1000 + Math.sin(lt * 1.5) * 4, .7, -1, lt);
    const p = prog(lt, .2, 2.0); if (p > 0 && p < 1) { const x = lerp(80, 640, p), y = lerp(1100, 920, p) - Math.sin(p * Math.PI) * 420; ctx.save(); ctx.translate(x, y); ctx.rotate(Math.atan2(-Math.cos(p * Math.PI) * 420 * Math.PI - 180, 560)); ell(ctx, 0, 0, 26, 12, C.ink, null); ctx.restore(); line(ctx, partial(curvePts([80, 1100], [360, 500], [640, 920]), p), 'rgba(42,29,21,.25)', 4, 1); }
    burst(ctx, 650, 930, 1.3, prog(lt, 2.2, .7)); shake(ctx, lt, 2.2, 14); smoke(ctx, lt, 650, 900, 2.3, 10, 'rgba(80,70,60,.5)');
    tag(ctx, 'RİVAYETE GÖRE', CX, 300, 66, lt, 0, C.red);
    tag(ctx, 'BİR İNGİLİZ ZIRHLISI VURULDU', CX, 440, 48, lt, 2.4, C.ink);
  } },
  { s: 27.59, e: 30.75, draw(ctx, lt, d) { // 3 savaş gemisi kaybedildi
    sky(ctx, '#bca98a', '#e3d3ae'); camera(ctx, lt, d, 1.0, 1.05, CX, 900);
    const wy = 1000;
    [[230, .2], [520, .9], [800, 1.6]].forEach(([x, t0], i) => { const k = eInOut(prog(lt, t0, 1.3));
      ctx.save(); ctx.beginPath(); ctx.rect(-300, -300, W + 600, wy + 300 + 2); ctx.clip(); ctx.translate(x, wy + 10 + k * 180); ctx.rotate(k * (i % 2 ? -.5 : .5)); battleship(ctx, 0, 0, .46, i % 2 ? 1 : -1, lt + i); ctx.restore();
      splash(ctx, x, wy, 1, prog(lt, t0 + .3, 1)); });
    sea(ctx, wy, lt);
    for (let i = 0; i < 3; i++) { const k = prog(lt, [.2, .9, 1.6][i] + .2, 1.2); if (k > 0) { ctx.globalAlpha = 1 - k; ell(ctx, [230, 520, 800][i], wy + 20, 40 + k * 140, 8 + k * 24, null, '#e8f3f6', 3); ctx.globalAlpha = 1; } }
    tag(ctx, 'O GÜN DÜŞMAN', CX, 300, 60, lt, 0, C.ink);
    stampBox(ctx, '3 SAVAŞ GEMİSİ KAYBETTİ', CX, 470, 60, C.red, lt, 1.9, -5);
    text(ctx, '(Gemilerin batmasında mayınların payı büyüktü)', CX, 1290, 28, 'rgba(42,29,21,.8)', F_SANS, 700);
  } },
  { s: 30.75, e: 33.12, draw(ctx, lt, d) { // onbaşılığa yükseldi
    bg(ctx); camera(ctx, lt, d, 1, 1.08, CX, 850);
    ctx.save(); ctx.globalAlpha = .22; ctx.fillStyle = C.gold; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + lt * .4; ctx.beginPath(); ctx.moveTo(CX, 860); ctx.arc(CX, 860, 1000, a, a + .13); ctx.fill(); } ctx.restore();
    chevron(ctx, CX, 860 + Math.sin(lt * 3) * 8, 1.3, prog(lt, .1, .5));
    tag(ctx, 'BU KAHRAMANLIKLA', CX, 300, 56, lt, 0, C.ink);
    stampBox(ctx, 'ONBAŞI', CX, 1220, 110, C.red, lt, 1.0, -6);
  } },
  { s: 33.12, e: 34.89, draw(ctx, lt, d) { // Koca Seyit
    sky(ctx, '#d9b98a', '#f0e2c2'); camera(ctx, lt, d, 1.06, 1, CX, 1000);
    rampart(ctx, 1250, lt);
    flagPole(ctx, 660, 1230, 640, 170, .8, lt);
    seyit(ctx, 330, 1290, 1.0, 1);
    bigText(ctx, 'KOCA SEYİT', CX, 330, 110, C.red, lt, .2, F_SANS, [C.cream, 14]);
  } },
  { s: 34.89, e: 38.49, draw(ctx, lt, d) { // yeniden kaldırması istendi
    bg(ctx, '#e2d3b0'); camera(ctx, lt, d, 1, 1.07, CX, 1000);
    shape(ctx, [[-300, 1250], [1400, 1250], [1400, 2300], [-300, 2300]], '#b7a06a', C.ink, 5, 1);
    const tr = Math.max(0, Math.sin(lt * 5)) * .12 * prog(lt, .8, .3);
    seyit(ctx, CX, 1290, 1.2, tr);
    tag(ctx, 'SAVAŞTAN SONRA', CX, 300, 60, lt, 0, C.ink);
    tag(ctx, 'MERMİYİ YENİDEN KALDIR!', CX, 440, 54, lt, 1.0, '#3d6676');
  } },
  { s: 38.49, e: 41.65, draw(ctx, lt, d) { // kaldıramadı, tahta mermiyle fotoğraf
    bg(ctx, '#e2d3b0'); camera(ctx, lt, d, 1, 1.05, CX, 900);
    const fl = prog(lt, 1.4, .5); const flash = fl > 0 && fl < 1 ? 1 - fl : 0;
    // fotoğraf çerçevesi (sepya)
    ctx.save(); ctx.translate(640, 880); ctx.rotate(.04 + Math.sin(lt * 1.5) * .01);
    shape(ctx, [[-230, -330], [230, -330], [230, 330], [-230, 330]], '#f6efe0', C.ink, 5, .3);
    shape(ctx, [[-200, -300], [200, -300], [200, 260], [-200, 260]], '#c9b08a', C.ink, 3, .2);
    seyit(ctx, 0, 240, .58, 1, { wood: true });
    ctx.restore();
    camera1915(ctx, 200, 980, .9, flash);
    if (flash > 0) { ctx.fillStyle = `rgba(255,250,230,${flash * .6})`; ctx.fillRect(-200, -200, W + 400, H + 400); }
    stampBox(ctx, 'KALDIRAMADI', CX, 330, 90, C.red, lt, 0, -6);
    tag(ctx, 'TAHTA MERMİYLE FOTOĞRAF', CX, 1290, 50, lt, 1.7, C.ink);
  } },
  { s: 41.65, e: 44.07, draw(ctx, lt, d) { // Çanakkale geçilmedi
    camera(ctx, lt, d, 1.0, 1.08, 480, 880); straitMap(ctx);
    const nx = PD(26.39, 40.15); const k = eOut(prog(lt, .1, .7));
    ctx.save(); ctx.setLineDash([22, 14]); line(ctx, [[nx[0] - 40 * k - 20, nx[1] - 60 * k], [nx[0] + 60 * k + 20, nx[1] + 80 * k]], C.red, 14, .5); ctx.restore();
    for (let i = 0; i < 3; i++) { const t = (lt * .5 + i * .2) % 1; const p = PD(26.2 + t * .1, 39.97 + t * .07); ctx.save(); ctx.translate(...p); ctx.rotate(-.6); shape(ctx, [[-30, -8], [30, -8], [40, 0], [30, 8], [-30, 8]], '#5a6066', C.ink, 3, .3); ctx.restore(); }
    flagPole(ctx, nx[0] - 140, nx[1] + 20, 300, 110, .8, lt);
    stampBox(ctx, 'ÇANAKKALE GEÇİLMEDİ', CX, 360, 74, C.red, lt, .1, -5);
  } },
  { s: 44.07, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 900);
    ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = C.gold; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .3; ctx.beginPath(); ctx.moveTo(CX, 900); ctx.arc(CX, 900, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    shape(ctx, [[-300, 1260], [1400, 1230], [1400, 2300], [-300, 2300]], '#6a2a22', C.ink, 5, 1);
    flagPole(ctx, 660, 1250, 620, 170, .8, lt);
    seyit(ctx, 320, 1300, 1.0, 1);
    bigText(ctx, 'SEYİT GİBİ', CX, 330, 96, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'KAHRAMANLAR VARDI', CX, 480, 64, lt, .6, C.ink, C.cream);
  } },
];
