// ===== Ankara neden başkent oldu? 13 Ekim 1923 (sabah) — Atatürk ÇİZİLMEZ =====
const KEY = ['İSTANBUL', 'ANKARA?', 'MART,', 'İŞGAL', 'DURDURULUR.', 'TEMSİL', 'HEYETİ', 'ANKARA\'DADIR.', 'NİSAN', 'MECLİSİ,', 'ANKARA\'DA', 'MÜCADELE', 'ORTASINDADIR.', 'DENİZDEN', 'ULAŞAMAZ.', 'DEMİRYOLU', 'CEPHELERE', 'ZAFER', 'BAŞKENTİ', 'EKİM', 'İSMET', 'TEKLİF', 'ANKARA', 'ŞEHRİDİR.', 'KABUL', 'BOZKIRIN', 'BAŞKENTİ', 'OLUR!'];
const DURATION = 45.85 + 2.2;
const OUTRO_AT = DURATION - 1.6;
const CX = 500;
function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
const AEGEAN = [[22.6, 40.5], [23.5, 40.2], [24.2, 40.8], [26.0, 40.6], [26.7, 40.35], [26.2, 40.05], [26.1, 39.5], [26.6, 39.3], [26.9, 38.7], [26.3, 38.25], [26.9, 38.0], [27.3, 37.3], [24, 37], [22.9, 38], [23.2, 39.2]];
const TM = { x: 500, y: 820, lon: 33.0, lat: 39.3, k: 80 };
const PT = (lon, lat) => proj(TM, lon, lat);
function trMap(ctx) {
  regionMap(ctx, TM, { seas: [SEA_BLACK, SEA_MED, SEA_MARMARA, AEGEAN] });
  drawLand(ctx, TM, ANATOLIA, '#e3cf9f'); drawLand(ctx, TM, THRACE, '#e3cf9f');
  mountains(ctx, TM, [[30.0, 37.6], [31.5, 37.3], [33.0, 37.2], [35.0, 37.6], [33.5, 41.3], [35.5, 41.0], [38.5, 40.4], [40.5, 39.6], [37.5, 38.6]]);
}
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
function smoke(ctx, lt, x, y, t0, n = 10, c = 'rgba(235,228,214,.8)') {
  const k = lt - t0; if (k < 0) return;
  for (let i = 0; i < n; i++) { const a = hash(i + x) * Math.PI * 2; const r = 20 + k * (60 + hash(i) * 70); ctx.globalAlpha = clamp(1 - k / 3.2) * .85; ell(ctx, x + Math.cos(a) * r * .8 + k * 40, y + Math.sin(a) * r * .4 - k * 30, 34 + k * 30, 26 + k * 22, c, null); }
  ctx.globalAlpha = 1;
}
function sky(ctx, top = '#d8c39a', bot = '#efe1c0') {
  const g = ctx.createLinearGradient(0, 0, 0, 1200); g.addColorStop(0, top); g.addColorStop(1, bot);
  ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, 1600);
}
function skyline(ctx, x, y, s) { // İstanbul silueti (temsili)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const c = '#5a4a5a';
  shape(ctx, [[-600, 0], [-600, -60], [600, -50], [600, 0]], c, null);
  const dome = (dx, r, h) => { shape(ctx, [[dx - r, -60], [dx - r, -60 - h], [dx + r, -60 - h], [dx + r, -60]], c, null); ctx.beginPath(); ctx.arc(dx, -60 - h, r, Math.PI, 0); ctx.fillStyle = c; ctx.fill(); };
  dome(-260, 80, 50); dome(-150, 40, 30); dome(-360, 40, 30); dome(220, 90, 60); dome(330, 40, 30); dome(110, 40, 30);
  [[-380, 260], [-140, 240], [100, 280], [350, 260], [-470, 200], [470, 210]].forEach(([mx, h]) => { shape(ctx, [[mx - 9, -50], [mx - 9, -50 - h], [mx, -80 - h], [mx + 9, -50 - h], [mx + 9, -50]], c, null); });
  ctx.restore();
}
function train(ctx, x, y, s, lt, dir = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  for (let i = 0; i < 3; i++) { const cx = -260 - i * 230; shape(ctx, [[cx - 100, -20], [cx - 100, -130], [cx + 100, -130], [cx + 100, -20]], i % 2 ? '#7a3b26' : '#5a4632', C.ink, 5, .4); for (let w = 0; w < 3; w++) shape(ctx, [[cx - 80 + w * 58, -110], [cx - 80 + w * 58, -70], [cx - 40 + w * 58, -70], [cx - 40 + w * 58, -110]], '#e3cf9f', C.ink, 3, .2); [-60, 60].forEach(wx => { ell(ctx, cx + wx, -10, 22, 22, '#3a3530', C.ink, 4); line(ctx, [[cx + wx, -10], [cx + wx + Math.cos(lt * 12) * 18, -10 + Math.sin(lt * 12) * 18]], C.cream, 4, .1); }); }
  shape(ctx, [[-120, -20], [-120, -170], [-20, -170], [-20, -110], [120, -110], [150, -60], [150, -20]], '#2a2420', C.ink, 5, .4);
  shape(ctx, [[60, -110], [60, -180], [96, -180], [96, -110]], '#2a2420', C.ink, 4, .3);
  shape(ctx, [[-130, -170], [-10, -170], [-10, -186], [-130, -186]], '#7a3b26', C.ink, 4, .3);
  [[-80, 34], [20, 30], [110, 26]].forEach(([wx, r]) => { ell(ctx, wx, -10, r, r, '#3a3530', C.ink, 4); line(ctx, [[wx, -10], [wx + Math.cos(lt * 12) * r * .8, -10 + Math.sin(lt * 12) * r * .8]], C.cream, 4, .1); });
  shape(ctx, [[150, -40], [190, -10], [150, -10]], '#7a3b26', C.ink, 3, .2);
  ctx.restore();
  for (let i = 0; i < 8; i++) { const t = (lt * 1.2 + i / 8) % 1; ctx.globalAlpha = (1 - t) * .7; ell(ctx, x + dir * (78 - t * 260) * s, y + (-200 - t * 160) * s, (24 + t * 50) * s, (18 + t * 34) * s, '#e8e2d6', null); } ctx.globalAlpha = 1;
}
function rails(ctx, y, lt, off = 0) {
  line(ctx, [[-300, y], [1400, y]], '#4a3a2a', 8, .3); line(ctx, [[-300, y + 22], [1400, y + 22]], '#4a3a2a', 8, .3);
  for (let i = -4; i < 30; i++) { const x = ((i * 70 - off) % 2000 + 2000) % 2000 - 300; line(ctx, [[x, y - 8], [x - 10, y + 32]], '#6e4a2c', 10, .3); }
}
function rays(ctx, lt, cx, cy, col = C.gold, a = .2) {
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; for (let i = 0; i < 14; i++) { const an = i / 14 * Math.PI * 2 + lt * .3; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, 1100, an, an + .12); ctx.fill(); } ctx.restore();
}
function steppe(ctx, lt, y = 1050) {
  sky(ctx, '#e9c88e', '#f4e5c4');
  shape(ctx, [[-300, y], [200, y - 30], [600, y + 10], [1000, y - 20], [1400, y], [1400, 2300], [-300, 2300]], '#c7a865', C.ink, 5, 1.2);
  for (let i = 0; i < 40; i++) { const x = hash(i) * 1200 - 60, yy = y + 40 + hash(i + 9) * 600; line(ctx, [[x, yy], [x + 8 + Math.sin(lt * 3 + i) * 7, yy - 26]], '#8a7a40', 4, .2); }
}
function kale(ctx, x, y, s) { // Ankara Kalesi tepesi (temsili)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-420, 0], [-260, -120], [-120, -200], [120, -210], [280, -110], [420, 0]], '#a08a5c', C.ink, 5, 1);
  shape(ctx, [[-200, -170], [-200, -280], [200, -280], [200, -180]], '#bfa577', C.ink, 5, .6);
  for (let i = -200; i < 200; i += 40) shape(ctx, [[i, -280], [i, -304], [i + 22, -304], [i + 22, -280]], '#bfa577', C.ink, 3, .3);
  [-200, -60, 80, 200].forEach(tx => shape(ctx, [[tx - 30, -180], [tx - 30, -330], [tx + 30, -330], [tx + 30, -180]], '#b39a6a', C.ink, 5, .5));
  for (let i = 0; i < 12; i++) { const hx = -380 + i * 64, hy = -40 - Math.sin(i / 11 * Math.PI) * 120; shape(ctx, [[hx - 24, hy + 40], [hx - 24, hy], [hx, hy - 22], [hx + 24, hy], [hx + 24, hy + 40]], i % 2 ? '#d9c393' : '#cdb68a', C.ink, 3, .3); }
  ctx.restore();
}
function doc(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-300, -380], [300, -380], [300, 380], [-300, 380]], '#f6efe0', C.ink, 5, .4);
  line(ctx, [[-240, -300], [240, -300]], 'rgba(42,29,21,.5)', 4, .3);
  ctx.restore();
}
function quill(ctx, x, y, s, lt) {
  ctx.save(); ctx.translate(x + Math.sin(lt * 9) * 14, y + Math.cos(lt * 7) * 6); ctx.rotate(-.6); ctx.scale(s, s);
  shape(ctx, [[0, 0], [-20, -60], [-10, -200], [20, -260], [30, -180], [12, -60]], '#f3efe6', C.ink, 4, .4);
  line(ctx, [[0, 0], [16, -230]], C.ink, 3, .2); ctx.restore();
}

const SCENES = [
  { s: 0, e: 2.65, draw(ctx, lt, d) { // HOOK
    // Sabah ışığında bozkır: uzakta Meclis ve bayrak, önde hızla geçen buharlı tren (hızlı yakınlaşma + sarsıntı)
    ctx.save(); shake(ctx, lt, 0, 18, .3);
    const zi = lerp(1.35, 1, eOut(lt / .3)) * lerp(1, 1.05, eInOut(lt / d)); ctx.translate(W / 2, 1000); ctx.scale(zi, zi); ctx.translate(-W / 2, -1000);
    sky(ctx, '#f0c983', '#f8ead0');
    const sg = ctx.createRadialGradient(840, 990, 20, 840, 990, 560); sg.addColorStop(0, 'rgba(255,240,180,1)'); sg.addColorStop(.22, 'rgba(255,214,130,.5)'); sg.addColorStop(1, 'rgba(255,214,130,0)');
    ctx.fillStyle = sg; ctx.fillRect(200, 400, 1300, 1200);
    rays(ctx, lt, 840, 990, '#fff3c4', .2);
    ell(ctx, 840, 990, 80, 80, '#ffeaa8', null);
    for (let i = 0; i < 5; i++) { const bx = ((i * 260 - lt * 40) % 1300 + 1300) % 1300 - 150, by = 700 + (i % 3) * 40; ctx.globalAlpha = .6; line(ctx, [[bx, by], [bx + 14, by - 9], [bx + 28, by]], C.ink, 3, .3); }
    ctx.globalAlpha = 1;
    shape(ctx, [[-300, 1010], [200, 985], [600, 1020], [1000, 995], [1400, 1010], [1400, 2300], [-300, 2300]], '#c9a866', C.ink, 5, 1.2);
    for (let i = 0; i < 40; i++) { const x = hash(i) * 1200 - 60, yy = 1060 + hash(i + 9) * 600; line(ctx, [[x, yy], [x + 8 + Math.sin(lt * 3 + i) * 7, yy - 26]], '#8a7a40', 4, .2); }
    meclis(ctx, 560, 1000, .55, lt);
    rails(ctx, 1222, lt, lt * 520);
    const tx = lerp(330, 1180, lt / d);
    train(ctx, tx, 1215, .62, lt * 1.6);
    dust(ctx, lt * 2.5, tx - 420, 1210, 12, 'rgba(150,120,70,.35)');
    ctx.restore();
    hookText(ctx, lt + 0.6, 'İstanbul varken başkent neden Ankara?', { style: 'marker', key: 'ANKARA', y: 420 });
  } },
  { s: 2.65, e: 4.66, draw(ctx, lt, d) { // 16 Mart 1920
    sky(ctx, '#a8a0a0', '#d8cdb8'); camera(ctx, lt, d, 1, 1.06, CX, 900);
    skyline(ctx, 520, 1020, 1.0);
    sea(ctx, 1020, lt, '#7f98a2');
    battleship(ctx, lerp(1250, 760, eOut(lt / d)), 1110, .45, -1, lt);
    sealPro(ctx, '16 Mart 1920', 'İstanbul', CX, 430, 160, C.red, lt, .1, 'İŞGAL');
  } },
  { s: 4.66, e: 8.06, draw(ctx, lt, d) { // İstanbul işgal, Meclis durdurulur
    sky(ctx, '#8f8888', '#cfc4ae'); camera(ctx, lt, d, 1.0, 1.08, CX, 1000);
    skyline(ctx, 520, 960, 1.0);
    sea(ctx, 960, lt, '#73909a');
    battleship(ctx, 300 + lt * 20, 1080, .42, 1, lt); battleship(ctx, 800 - lt * 15, 1200, .5, -1, lt + 1);
    tag(ctx, 'İSTANBUL İŞGAL EDİLDİ', CX, 300, 58, lt, 0, C.ink);
    stampBox(ctx, 'MECLİS DURDURULDU', CX, 470, 70, C.red, lt, 1.6, -5);
  } },
  { s: 8.06, e: 11.98, draw(ctx, lt, d) { // Temsil Heyeti çoktan Ankara'da
    camera(ctx, lt, d, 1, 1.08, 520, 820); trMap(ctx);
    const sv = PT(37.02, 39.75), an = PT(32.85, 39.93), ist = PT(28.97, 41.01);
    pin(ctx, ...ist, .9, lt, 0, '#5a6066'); tag(ctx, 'İSTANBUL', ist[0] + 30, ist[1] - 120, 34, lt, .1, '#5a6066');
    pin(ctx, ...sv, .9, lt, .2, C.ink); tag(ctx, 'SİVAS', sv[0], sv[1] + 60, 34, lt, .3, C.ink);
    arrow(ctx, curvePts(sv, [(sv[0] + an[0]) / 2, an[1] - 120], [an[0] + 20, an[1] - 6]), eInOut(prog(lt, .3, 1.6)), C.red, 14, true);
    pin(ctx, ...an, 1.4, lt, 1.8, C.red); tag(ctx, 'ANKARA', an[0], an[1] + 80, 52, lt, 1.9, C.red);
    tag(ctx, 'MUSTAFA KEMAL PAŞA VE TEMSİL HEYETİ', CX, 300, 40, lt, .4, C.ink);
    sealPro(ctx, '27 Aralık 1919', 'Ankara\'ya geliş', CX, 1180, 120, C.red, lt, 2.4, '');
  } },
  { s: 11.98, e: 14.10, draw(ctx, lt, d) { // 23 Nisan 1920
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.07, CX, 820); rays(ctx, lt, CX, 820, '#E30A17', .14);
    flagPole(ctx, 150, 1280, 400, 120, .8, lt); flagPole(ctx, 690, 1280, 400, 120, .8, lt + 1);
    sealPro(ctx, '23 Nisan 1920', 'Türkiye Büyük Millet Meclisi', CX, 560, 210, C.red, lt, .1, 'ANKARA');
  } },
  { s: 14.10, e: 16.50, draw(ctx, lt, d) { // Meclis Ankara'da açılır
    sky(ctx, '#e9cf9e', '#f4e5c4'); camera(ctx, lt, d, 1.0, 1.06, CX, 1000);
    shape(ctx, [[-300, 1140], [1400, 1140], [1400, 2300], [-300, 2300]], '#c7a865', C.ink, 5, 1);
    meclis(ctx, CX - 20, 1120, 1.2, lt);
    crowd(ctx, lt, 90, 880, 1180, 20, 1.6);
    tag(ctx, 'BÜYÜK MİLLET MECLİSİ', CX, 300, 58, lt, 0, C.red);
  } },
  { s: 16.50, e: 19.14, draw(ctx, lt, d) { // Milli Mücadele buradan yönetilir
    camera(ctx, lt, d, 1.05, 1, 520, 820); trMap(ctx);
    const an = PT(32.85, 39.93);
    [[PT(30.5, 39.8), 0], [PT(29.98, 40.0), .2], [PT(30.3, 38.7), .4], [PT(41.0, 40.2), .6], [PT(37.0, 37.2), .8]].forEach(([to, dl]) => arrow(ctx, [an, to], eOut(prog(lt, dl, .9)), C.red, 12, true));
    const pu = 1 + Math.sin(lt * 6) * .12; ctx.save(); ctx.globalAlpha = .3; ell(ctx, an[0], an[1], 60 * pu, 60 * pu, C.red, null); ctx.restore();
    pin(ctx, ...an, 1.4, lt, 0, C.red);
    tag(ctx, 'MİLLİ MÜCADELE\'NİN KALBİ', CX, 300, 54, lt, .2, C.red);
    tag(ctx, 'ANKARA', an[0], an[1] + 80, 50, lt, .3, C.ink);
  } },
  { s: 19.14, e: 21.10, draw(ctx, lt, d) { // Anadolu'nun ortasında
    camera(ctx, lt, d, 1, 1.1, 500, 820); trMap(ctx);
    const an = PT(32.85, 39.93);
    for (let i = 0; i < 3; i++) { const k = (lt * .8 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - k; ell(ctx, an[0], an[1], 40 + k * 380, 30 + k * 300, null, C.red, 6); ctx.restore(); }
    pin(ctx, ...an, 1.5, lt, 0, C.red);
    stampBox(ctx, 'ANADOLU\'NUN ORTASINDA', CX, 330, 62, C.red, lt, .3, -4);
  } },
  { s: 21.10, e: 24.80, draw(ctx, lt, d) { // denizden uzak, toplar ulaşamaz
    camera(ctx, lt, d, 1, 1.05, 500, 820); trMap(ctx);
    const an = PT(32.85, 39.93);
    const ships = [[PT(29.2, 41.6), -1], [PT(26.0, 39.0), 1], [PT(31.0, 36.2), 1], [PT(35.5, 42.3), -1]];
    ships.forEach(([p, dir], i) => {
      battleship(ctx, p[0], p[1], .22, dir, lt + i, .3 + i * .2);
      const k = eOut(prog(lt, .4 + i * .3, 1.0)); const tx = lerp(p[0], an[0], .45), ty = lerp(p[1], an[1], .45);
      if (k > 0) { ctx.save(); ctx.setLineDash([14, 12]); line(ctx, partial(curvePts(p, [(p[0] + tx) / 2, Math.min(p[1], ty) - 120], [tx, ty]), k), '#5a6066', 5, .3); ctx.restore(); if (k >= 1) ell(ctx, tx, ty, 18 + Math.sin(lt * 8) * 3, 18, 'rgba(90,96,102,.5)', null); }
    });
    pin(ctx, ...an, 1.4, lt, 0, C.red);
    tag(ctx, 'DENİZDEN UZAK', CX, 300, 62, lt, 0, '#3d6676');
    stampBox(ctx, 'GÜVENLİ', an[0], an[1] + 150, 72, C.red, lt, 2.4, -6);
  } },
  { s: 24.80, e: 27.77, draw(ctx, lt, d) { // demiryolu cephelere bağlar
    steppe(ctx, lt, 1000); camera(ctx, lt, d, 1, 1.05, CX, 1000);
    for (let i = 0; i < 4; i++) { const x = ((-lt * 140 + i * 360) % 1440 + 1440) % 1440 - 200; line(ctx, [[x, 1180], [x, 980]], '#6e4a2c', 6, .3); line(ctx, [[x - 30, 1000], [x + 30, 1000]], '#6e4a2c', 5, .3); }
    rails(ctx, 1230, lt, lt * 260);
    train(ctx, 560 + Math.sin(lt * 20) * 2, 1222, 1.1, lt);
    tag(ctx, 'DEMİRYOLU', CX, 300, 70, lt, 0, C.ink);
    tag(ctx, 'BATIDAKİ CEPHELERE', CX, 450, 56, lt, 1.4, C.red, C.cream, 2);
  } },
  { s: 27.77, e: 30.86, draw(ctx, lt, d) { // zafer, sıra başkentte
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.07, CX, 900); rays(ctx, lt, CX, 760, '#E30A17', .14);
    shape(ctx, [[-300, 1180], [1400, 1180], [1400, 2300], [-300, 2300]], '#c7a865', C.ink, 5, 1);
    flagPole(ctx, 380, 1180, 640, 190, .8, lt);
    crowd(ctx, lt, 90, 880, 1200, 22, 1.5);
    stampBox(ctx, 'ZAFER', CX, 330, 120, C.red, lt, .1, -6);
    tag(ctx, 'SIRA BAŞKENTTE', CX, 1290, 54, lt, 1.2, C.ink);
  } },
  { s: 30.86, e: 32.91, draw(ctx, lt, d) { // 9 Ekim 1923
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.08, CX, 820); rays(ctx, lt, CX, 820);
    doc(ctx, CX, 900 + (1 - eOut(prog(lt, 0, .6))) * 300, .9, Math.sin(lt * 2) * .03);
    sealPro(ctx, '9 Ekim 1923', 'Kanun teklifi', CX, 860, 170, C.red, lt, .5, 'TBMM');
  } },
  { s: 32.91, e: 36.13, draw(ctx, lt, d) { // İsmet Paşa ve arkadaşları, tek maddelik teklif
    bg(ctx); camera(ctx, lt, d, 1, 1.06, CX, 900);
    doc(ctx, CX, 900, 1.0, -.02);
    const k = prog(lt, .2, 2.6); for (let r = 0; r < 8; r++) { const p = clamp(k * 8 - r); if (p > 0) line(ctx, [[250, 640 + r * 70], [250 + 500 * p, 640 + r * 70]], 'rgba(42,29,21,.55)', 6, .8); }
    const qx = 250 + 500 * ((k * 8) % 1), qy = 640 + Math.min(7, Math.floor(k * 8)) * 70; quill(ctx, qx, qy, 1, lt);
    tag(ctx, 'İSMET PAŞA VE ARKADAŞLARI', CX, 300, 50, lt, 0, C.ink);
    stampBox(ctx, 'TEK MADDE', CX, 1250, 76, C.red, lt, 1.4, -5);
  } },
  { s: 36.13, e: 39.38, draw(ctx, lt, d) { // teklif metni
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.07, CX, 860);
    doc(ctx, CX, 860, 1.0, Math.sin(lt * 1.5) * .015);
    text(ctx, 'MADDE 1', CX, 560, 46, C.red, F_SANS, 700);
    const L = ['Türkiye Devleti\'nin', 'idare merkezi', 'Ankara', 'şehridir.'];
    L.forEach((s, i) => { const p = prog(lt, .1 + i * .55, .4); if (p > 0) { ctx.save(); ctx.globalAlpha = p; text(ctx, s, CX, 700 + i * 110 + (1 - p) * 20, i === 2 ? 96 : 58, i === 2 ? C.red : C.ink, F_SERIF, 700); ctx.restore(); } });
    text(ctx, '(sadeleştirilmiş metin)', CX, 1180, 28, 'rgba(42,29,21,.7)', F_SANS, 700);
  } },
  { s: 39.38, e: 41.82, draw(ctx, lt, d) { // 13 Ekim kabul
    sky(ctx, '#e9cf9e', '#f4e5c4'); camera(ctx, lt, d, 1.0, 1.06, CX, 1000); shake(ctx, lt, .9, 12);
    shape(ctx, [[-300, 1180], [1400, 1180], [1400, 2300], [-300, 2300]], '#c7a865', C.ink, 5, 1);
    meclis(ctx, CX - 20, 1170, 1.1, lt);
    crowd(ctx, lt, 90, 880, 1220, 18, 1.4);
    stampBox(ctx, 'KABUL EDİLDİ', CX, 330, 96, C.red, lt, .9, -6, '13 Ekim 1923');
  } },
  { s: 41.82, e: 43.89, draw(ctx, lt, d) { // bozkırın ortasındaki şehir
    steppe(ctx, lt, 1060); pan(ctx, lt, d, -50, 0, 1.0, 1.08, CX, 1000);
    kale(ctx, 560, 1080, 1.1);
    flagPole(ctx, 520, 1080 - 330 * 1.1, 160, 90, .8, lt);
    for (let i = 0; i < 3; i++) { const x = ((lt * 50 + i * 400) % 1400) - 200; ell(ctx, x, 360 + i * 60, 90, 22, 'rgba(255,248,232,.6)', null); }
    tag(ctx, 'BOZKIRIN ORTASINDAKİ ŞEHİR', CX, 300, 50, lt, 0, '#8a5a1a');
  } },
  { s: 43.89, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 900); rays(ctx, lt, CX, 900, C.gold, .18);
    shape(ctx, [[-300, 1200], [1400, 1200], [1400, 2300], [-300, 2300]], '#6a2a22', C.ink, 5, 1);
    meclis(ctx, CX - 20, 1190, 1.25, lt);
    bigText(ctx, 'BAŞKENT ANKARA', CX, 330, 96, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'GENÇ TÜRKİYE\'NİN KALBİ', CX, 470, 56, lt, .6, C.ink, C.cream);
  } },
];
