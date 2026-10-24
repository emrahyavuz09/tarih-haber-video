// ===== Çaldıran 1514 (akşam) =====
const KEY = ['ÇALDIRAN', 'YAVUZ', 'SELİM,', 'ŞAH', 'İSMAİL', 'İSMAİL\'İN', 'TOPLAR', 'TOPLAR.', 'TOPÇUSU', 'YENİÇERİLER.', 'YENİÇERİ', 'TEBRİZ\'E', 'BARUT', 'BARUT,', 'DOĞU', 'ZİNCİRLENMİŞ', 'İPEK', 'HÜCUMA', 'SÜVARİLERİYDİ.'];
const DURATION = 64.58 + 2.2;
const OUTRO_AT = DURATION - 1.6;
const EM = { x: 540, y: 820, lon: 38, lat: 39.5, k: 42 };
const VAN = [[42.3, 38.9], [43.0, 38.95], [43.6, 38.55], [43.3, 38.3], [42.5, 38.45]];
const URMIA = [[45.2, 38.2], [45.9, 37.9], [45.7, 37.3], [45.3, 37.5]];
const EAST = [[38, 41], [41.5, 41.5], [43.5, 41.1], [44.6, 39.8], [44.3, 38.3], [42.5, 37.2], [40, 37.2], [38, 38]];
const P = (lo, la) => proj(EM, lo, la);
const CAL = [44.0, 39.1], TEB = [46.3, 38.08], IST = [28.97, 41.01], BUR = [29.06, 40.18], HAL = [37.16, 36.2];

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
function eastMap(ctx) {
  regionMap(ctx, EM, { seas: [SEA_BLACK, SEA_MED, SEA_MARMARA, SEA_CASPIAN, VAN, URMIA] });
  mountains(ctx, EM, [[40, 39.8], [41.5, 40.5], [43, 39.7], [36, 38.2], [38.5, 38.6], [42, 37.9], [45, 39.5], [33, 37.3], [35, 40.3]]);
}
function plain(ctx, lt, o = {}) {
  const sky = ctx.createLinearGradient(0, 0, 0, 1100);
  sky.addColorStop(0, o.top || '#e6d3a8'); sky.addColorStop(1, o.bot || '#f1e3c2');
  ctx.fillStyle = sky; ctx.fillRect(-300, -300, W + 600, 1500);
  for (let i = 0; i < 4; i++) { const x = ((lt * 28 + i * 330) % 1500) - 250, y = 300 + (i % 2) * 130; ctx.globalAlpha = o.dark ? .12 : .45; ell(ctx, x, y, 110, 26, '#fff8e8', null); ell(ctx, x + 60, y - 18, 70, 24, '#fff8e8', null); }
  ctx.globalAlpha = 1;
  // uzak dağlar (Çaldıran ovası)
  shape(ctx, [[-300, 1040], [80, 900], [260, 960], [470, 870], [700, 950], [900, 880], [1400, 1000], [1400, 1100], [-300, 1100]], o.mount || '#b9a887', null);
  shape(ctx, [[-300, 1050], [200, 1030], [600, 1060], [1000, 1025], [1400, 1050], [1400, 2200], [-300, 2200]], o.ground || '#b7a06a', C.ink, 5, 1.2);
  ctx.strokeStyle = 'rgba(70,55,25,.35)'; ctx.lineWidth = 3;
  for (let i = 0; i < 36; i++) { const x = hash(i) * W, y = 1080 + hash(i + 9) * 600; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6 + Math.sin(lt * 3 + i) * 4, y - 20); ctx.stroke(); }
}
// ---- figürler ----
function yavuz(ctx, x, y, s, o = {}) { // Yavuz Sultan Selim: sakalsız, uzun bıyık, selimî kavuk
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], o.kaftan || '#7a1f1a', C.ink, 6);
  shape(ctx, [[-120, 74], [-40, 52], [-20, 260], [-90, 260]], '#8a6a48', C.ink, 5); shape(ctx, [[120, 74], [40, 52], [20, 260], [90, 260]], '#8a6a48', C.ink, 5);
  for (let i = 0; i < 4; i++) ell(ctx, 0, 110 + i * 38, 7, 7, C.gold, C.ink, 2);
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 66, 80, C.skin, C.ink, 6);
  ell(ctx, -66, -36, 11, 16, C.skin, C.ink, 4); ell(ctx, 66, -36, 11, 16, C.skin, C.ink, 4);
  ell(ctx, -24, -46, 6, 7, C.ink, null); ell(ctx, 24, -46, 6, 7, C.ink, null);
  line(ctx, [[-44, -64], [-12, -68]], C.ink, 8); line(ctx, [[12, -68], [44, -64]], C.ink, 8);
  line(ctx, [[0, -42], [-6, -12], [6, -10]], C.ink, 4);
  // uzun, yana uzanan bıyık
  shape(ctx, [[0, 2], [-30, -2], [-70, 10], [-108, 30], [-120, 52], [-92, 34], [-56, 22], [-22, 14], [0, 12], [22, 14], [56, 22], [92, 34], [120, 52], [108, 30], [70, 10], [30, -2]], '#3b2a1e', C.ink, 3, 1);
  line(ctx, [[-12, 34], [0, 36], [12, 34]], C.ink, 4);
  // selimî kavuk (uzun, silindirik sarık)
  shape(ctx, [[-80, -96], [-90, -200], [-82, -228], [-50, -246], [0, -252], [50, -246], [82, -228], [90, -200], [80, -96]], '#f6f1e6', C.ink, 6, .8);
  for (let i = 0; i < 4; i++) line(ctx, [[-84, -112 - i * 28], [84, -130 - i * 28]], 'rgba(42,29,21,.3)', 3);
  ell(ctx, 0, -150, 14, 18, '#b7342a', C.ink, 3); line(ctx, [[0, -168], [10, -270]], '#2a1d15', 4);
  ctx.restore();
}
function sah(ctx, x, y, s, o = {}) { // Safevî hükümdarı: sarık + kırmızı külah, bıyıklı (nötr, saygılı)
  turkmenBey(ctx, x, y, s, { robe: '#3e5f8a', taj: '#b7342a', young: true, dir: o.dir || 1 });
}
function rider(ctx, x, y, s, dir, ph, cap = '#b7342a', body = '#3a2e24') { // Safevî süvarisi
  horseArcher(ctx, x, y, s, dir, ph, body, false);
  ctx.save(); ctx.translate(x, y + Math.sin(ph * 2) * 4 * s); ctx.scale(s * dir, s);
  shape(ctx, [[-14, -186], [-8, -232], [8, -232], [16, -186]], cap, C.ink, 3, .3);
  line(ctx, [[30, -120], [120, -170]], '#9aa3a8', 6, .2);
  ctx.restore();
}
function yeniceri(ctx, x, y, s, lt = 0, aim = 0, flash = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(0, Math.sin(lt * 2 + x) * 1.5);
  shape(ctx, [[-34, 0], [-30, -70], [-18, -92], [18, -92], [30, -70], [34, 0]], '#2d4a7a', C.ink, 4, .6);
  line(ctx, [[-30, -40], [30, -40]], C.red, 7, .3);
  ell(ctx, 0, -112, 20, 22, C.skin, C.ink, 4);
  line(ctx, [[-10, -104], [0, -101], [10, -104]], C.ink, 4, .2);
  shape(ctx, [[-20, -128], [-18, -168], [-44, -214], [-30, -222], [8, -170], [20, -128]], '#f6f1e6', C.ink, 4, .6);
  shape(ctx, [[-22, -134], [22, -134], [22, -124], [-22, -124]], C.gold, C.ink, 3, .3);
  const a = -0.25 * aim; const ex = -10 + Math.cos(a) * 110, ey = -60 + Math.sin(a) * 110; line(ctx, [[-10, -60], [ex, ey]], '#4a3020', 7, .2);
  if (flash > 0 && flash < 1) { ctx.globalAlpha = 1 - flash; shape(ctx, [[ex, ey - 8], [ex + 40, ey - 22], [ex + 30, ey], [ex + 46, ey + 16], [ex, ey + 8]], '#f8d25a', '#e2572b', 3, 2); ctx.globalAlpha = 1; }
  ctx.restore();
}
function cannon(ctx, x, y, s, fire = 0, dir = 1) {
  ctx.save(); ctx.translate(x - Math.sin(clamp(fire) * Math.PI) * 18 * s * dir, y); ctx.scale(s * dir, s);
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
function wagon(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-90, -30], [90, -30], [80, -110], [-80, -110]], '#8b6a45', C.ink, 5, .5);
  for (let i = -60; i <= 60; i += 30) line(ctx, [[i, -34], [i, -106]], '#6e4a2c', 4, .2);
  [-55, 55].forEach(wx => { ell(ctx, wx, -14, 30, 30, '#6e4a2c', C.ink, 5); ell(ctx, wx, -14, 6, 6, C.ink, null); });
  ctx.restore();
}
function tug(ctx, x, y, h, lt, col = '#2a1d15') {
  line(ctx, [[x, y], [x, y - h]], '#6e4a2c', 10, .4); ell(ctx, x, y - h - 10, 14, 14, C.gold, C.ink, 4);
  for (let i = 0; i < 7; i++) { const a = (i - 3) * 6; const sw = Math.sin(lt * 4 + i * .6) * 22; line(ctx, [[x, y - h + 10], [x + a + sw * .5 + 20, y - h + 70], [x + a + sw + 40, y - h + 150]], i % 2 ? col : '#5a4632', 9, .4); }
}
function block(ctx, x, y, w, h, col, a = 1) { ctx.save(); ctx.globalAlpha = a; shape(ctx, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, C.ink, 3, .5); ctx.restore(); }
function camel(ctx, x, y, s, ph) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const L = (hx, a) => line(ctx, [[hx, -40], [hx + Math.sin(a) * 14, 0]], '#8a6a48', 9, .3);
  L(-40, ph); L(-20, -ph); L(30, -ph); L(50, ph);
  ell(ctx, 0, -60, 70, 30, '#b8925a', C.ink, 4); ell(ctx, -10, -88, 30, 22, '#b8925a', C.ink, 4);
  line(ctx, [[60, -66], [86, -110], [104, -112]], '#b8925a', 14, .3);
  shape(ctx, [[-40, -92], [20, -92], [20, -70], [-40, -70]], C.red, C.ink, 3, .3);
  ctx.restore();
}
function chest(ctx, x, y, s, lt) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-110, 0], [110, 0], [110, -100], [-110, -100]], '#7a4a2a', C.ink, 6, .5);
  shape(ctx, [[-110, -100], [110, -100], [96, -150], [-96, -150]], '#8b5a32', C.ink, 6, .5);
  line(ctx, [[-110, -60], [110, -60]], C.gold, 8, .2);
  for (let i = 0; i < 9; i++) ell(ctx, -80 + i * 20, -104 - (i % 3) * 8, 14, 7, C.gold, C.ink, 2);
  for (let i = 0; i < 5; i++) { const a = lt * 3 + i * 1.3; const k = Math.abs(Math.sin(a)); ctx.globalAlpha = k; line(ctx, [[-60 + i * 30, -170 - k * 20], [-60 + i * 30, -190 - k * 20]], '#fff3c0', 4, .2); }
  ctx.globalAlpha = 1; ctx.restore();
}

const SCENES = [
  { s: 0, e: 2.2, draw(ctx, lt, d) { // HOOK — top ateşi, duman, toplara hücum eden süvariler
    ctx.save();
    shake(ctx, lt, 0, 26, .35); shake(ctx, lt, 1.0, 16, .3);
    const z = lerp(1.7, 1.3, eOut(clamp(lt / .3))) + lt * .04; ctx.translate(500, 1320); ctx.scale(z, z); ctx.translate(-500, -1320);
    plain(ctx, lt, { top: '#c98a52', bot: '#e8c48e', mount: '#a98a62', ground: '#a88d58' });
    // hücum eden süvariler (sağdan sola)
    for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { const x = 1250 - ((lt * 330 + i * 260 + r * 130) % 1100); if (x < 560) continue; rider(ctx, x, 1130 + r * 150, .7 + r * .15, -1, lt * 14 + i + r); }
    dust(ctx, lt, 820, 1260, 16, 'rgba(150,120,80,.4)');
    // Osmanlı tuğları (rüzgârda)
    tug(ctx, 200, 1240, 470, lt * 1.5);
    // araba siperi + toplar (solda)
    wagon(ctx, 250, 1325, .85); wagon(ctx, 420, 1335, .85);
    line(ctx, [[315, 1305], [355, 1305]], '#555', 5, .2);
    cannon(ctx, 260, 1150, 1.05, prog(lt, 1.0, .45));
    cannon(ctx, 330, 1255, 1.35, clamp(lt / .45));
    // uçan gülle
    const bk = clamp(lt / .5); if (bk < 1) ell(ctx, 480 + bk * 520, 1180 - Math.sin(bk * Math.PI) * 80, 14, 14, '#2a1d15', null);
    smoke(ctx, lt, 480, 1190, 0, 12); smoke(ctx, lt, 390, 1100, 1.0, 9); smoke(ctx, lt + 1.2, 300, 980, 0, 8, 'rgba(120,100,80,.45)');
    ctx.restore();
    // namlu parlaması
    const fl = Math.max(1 - lt / .1, 0) * .6 + Math.max(0, 1 - Math.abs(lt - 1.03) / .08) * .5; if (fl > 0) { ctx.save(); ctx.globalAlpha = fl * .45; ctx.fillStyle = '#fff1c8'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    hookText(ctx, lt + .6, 'Topu olmayan bir ordu, toplara karşı hücuma kalktı!', { style: 'slam', key: 'toplara', y: 410, size: 82 });
  } },
  { s: 2.2, e: 4.5, draw(ctx, lt, d) { // süvari hücumu, 1514
    plain(ctx, lt); shake(ctx, lt, 1.6, 10); camera(ctx, lt, d, 1, 1.08, W / 2, 1000);
    dust(ctx, lt, 600, 1200, 16);
    for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) { const x = 1300 - ((lt * 360 + i * 300 + r * 140) % 1700); rider(ctx, x, 1120 + r * 170, .85 + r * .15, -1, lt * 14 + i + r); }
    bigText(ctx, '1514', W / 2, 400, 170, C.red, lt, 0, F_SANS, [C.cream, 14]);
  } },
  { s: 4.5, e: 6.95, draw(ctx, lt, d) { // Yavuz Sultan Selim
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 860);
    ctx.save(); ctx.globalAlpha = .22; ctx.fillStyle = C.gold;
    for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .25; ctx.beginPath(); ctx.moveTo(W / 2, 860); ctx.arc(W / 2, 860, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    tug(ctx, 150, 1200, 560, lt); tug(ctx, 860, 1200, 560, lt + 1.5);
    const p = eBack(prog(lt, .05, .5)); if (p > 0) yavuz(ctx, W / 2 - 20, 920 + (1 - p) * 140, 1.0 * p);
    tag(ctx, 'YAVUZ SULTAN SELİM', W / 2, 1260, 60, lt, .3, C.red, C.cream, 2);
  } },
  { s: 6.95, e: 9.8, draw(ctx, lt, d) { // doğuya, Şah İsmail'in üzerine (harita)
    camera(ctx, lt, d, 1, 1.08, 640, 820); eastMap(ctx);
    const ist = P(...IST), cal = P(...CAL), teb = P(...TEB);
    pin(ctx, ...ist, 1, lt, 0, C.red); tag(ctx, 'İSTANBUL', ist[0] + 20, ist[1] - 110, 36, lt, .1, C.red);
    const route = [ist, P(32.8, 39.9), P(36, 39.75), P(39.5, 39.75), P(41.3, 39.9), [cal[0] - 6, cal[1] + 6]];
    arrow(ctx, route, eInOut(prog(lt, .2, 2.1)), C.red, 12, true);
    pin(ctx, ...teb, 1.1, lt, .6, '#3e5f8a'); tag(ctx, 'TEBRİZ', teb[0] - 40, teb[1] + 60, 38, lt, .7, '#3e5f8a');
    tag(ctx, 'SAFEVİ HÜKÜMDARI ŞAH İSMAİL', W / 2, 300, 50, lt, .9, '#3e5f8a');
    tag(ctx, 'DOĞUYA SEFER', W / 2, 1200, 60, lt, .3, C.ink, C.cream, 2);
  } },
  { s: 9.8, e: 13.65, draw(ctx, lt, d) { // yol uzun, erzak az, askerler yorgun
    plain(ctx, lt, { top: '#e8c890', bot: '#f3dcb0' }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    const g = ctx.createRadialGradient(780, 420, 20, 780, 420, 300); g.addColorStop(0, 'rgba(255,200,90,.8)'); g.addColorStop(1, 'rgba(255,200,90,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 1100); ell(ctx, 780, 420, 70, 70, '#f2b44a', null);
    for (let i = 0; i < 8; i++) { const x = ((lt * 45 + i * 140) % 1200) - 100; yeniceri(ctx, x, 1280 + Math.abs(Math.sin(lt * 3 + i)) * -4, 1.25, lt); }
    camel(ctx, ((lt * 45 + 600) % 1200) - 100, 1100, 1.3, Math.sin(lt * 4));
    dust(ctx, lt, 300, 1260, 10);
    tag(ctx, 'YOL ÇOK UZUNDU', W / 2, 300, 64, lt, 0, C.ink);
    stampBox(ctx, 'ERZAK AZALDI', W / 2, 520, 86, C.red, lt, 1.1, -5);
  } },
  { s: 13.65, e: 17.65, draw(ctx, lt, d) { // 23 Ağustos, Çaldıran Ovası: iki ordu karşı karşıya (kuş bakışı)
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    const k = eInOut(prog(lt, 1.8, 1.6));
    for (let i = 0; i < 6; i++) block(ctx, 130 + i * 120, 1060, 100, 56, C.red);
    for (let i = 0; i < 6; i++) block(ctx, 130 + i * 120, lerp(640, 760, k), 100, 56, '#3e5f8a');
    for (let i = 0; i < 6; i++) { const x = 180 + i * 120 + Math.sin(lt * 3 + i) * 3; line(ctx, [[x, 1060], [x, 990]], '#6e4a2c', 5, .3); shape(ctx, [[x, 990], [x + 50, 1000 + Math.sin(lt * 6 + i) * 6], [x, 1014]], C.red, C.ink, 2, .3); }
    tag(ctx, 'OSMANLI', W / 2 - 40, 1180, 46, lt, .3, C.red); tag(ctx, 'SAFEVİ', W / 2 - 40, 560, 46, lt, .5, '#3e5f8a');
    sealPro(ctx, '23 Ağustos', 'Çaldıran Ovası', W / 2 - 40, 900, 130, C.ink, lt, .1, '1514');
  } },
  { s: 17.65, e: 21.1, draw(ctx, lt, d) { // Yavuz ordusunu dizdi: merkezde yeniçeriler
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    const ins = (i, t0) => eOut(prog(lt, t0 + i * .08, .5));
    block(ctx, 120, lerp(1300, 1000, ins(0, .1)), 180, 90, '#7a3b26'); block(ctx, 680, lerp(1300, 1000, ins(1, .1)), 180, 90, '#7a3b26');
    block(ctx, 340, lerp(1300, 980, ins(0, .6)), 300, 120, '#2d4a7a');
    for (let i = 0; i < 6; i++) yeniceri(ctx, 370 + i * 50, lerp(1400, 1080, ins(i, .6)), .5, lt);
    tag(ctx, 'SAĞ KANAT', 770, 1150, 34, lt, .4, '#7a3b26'); tag(ctx, 'SOL KANAT', 210, 1150, 34, lt, .4, '#7a3b26');
    tag(ctx, 'MERKEZDE YENİÇERİLER', W / 2, 760, 54, lt, 1.3, '#2d4a7a');
    tag(ctx, 'SAVAŞ DÜZENİ', W / 2, 300, 66, lt, 0, C.ink);
  } },
  { s: 21.1, e: 23.2, draw(ctx, lt, d) { // arabalardan duvar
    plain(ctx, lt); camera(ctx, lt, d, 1, 1.07, W / 2, 1000);
    for (let i = 0; i < 5; i++) yeniceri(ctx, 150 + i * 190, 1100, 1.3, lt, 1);
    for (let i = 0; i < 4; i++) { const k = eOut(prog(lt, i * .2, .6)); wagon(ctx, lerp(-300, 150 + i * 255, k), 1290, 1.45); }
    stampBox(ctx, 'ARABALARDAN DUVAR', W / 2, 400, 78, C.red, lt, .6, -5);
  } },
  { s: 23.2, e: 25.75, draw(ctx, lt, d) { // zincirlenmiş toplar
    plain(ctx, lt); shake(ctx, lt, 1.2, 10); camera(ctx, lt, d, 1, 1.08, W / 2, 1050);
    const xs = [180, 500, 820];
    xs.forEach((x, i) => cannon(ctx, x, 1220, 1.7));
    const k = eInOut(prog(lt, .2, 1.2));
    for (let i = 0; i < xs.length - 1; i++) { const n = 5; for (let j = 0; j < n; j++) { const t = (j + .5) / n; if (t > k) continue; chainLink(ctx, lerp(xs[i] + 60, xs[i + 1] - 100, t), 1250 + Math.sin(t * Math.PI) * 30, .6, j % 2 ? 0 : Math.PI / 2); } }
    tag(ctx, 'ARKASINDA', W / 2, 300, 60, lt, 0, C.ink);
    stampBox(ctx, 'ZİNCİRLİ TOPLAR', W / 2, 480, 84, C.red, lt, 1.2, -5);
  } },
  { s: 25.75, e: 28.2, draw(ctx, lt, d) { // Şah İsmail ve süvarileri
    plain(ctx, lt, { top: '#d7c7a6', bot: '#efe1c0' }); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    for (let i = 0; i < 4; i++) { const x = ((lt * 220 + i * 330) % 1500) - 250; rider(ctx, x, 1290, .55, 1, lt * 13 + i); }
    const p = eBack(prog(lt, 0, .5)); if (p > 0) sah(ctx, W / 2 - 20, 860 + (1 - p) * 140, .95 * p);
    tag(ctx, 'ŞAH İSMAİL', W / 2, 300, 66, lt, .1, '#3e5f8a');
    tag(ctx, 'GÜCÜ: HIZLI SÜVARİLER', W / 2, 1150, 50, lt, .8, C.ink, C.cream, 2);
  } },
  { s: 28.2, e: 30.45, draw(ctx, lt, d) { // ama topçusu yoktu
    plain(ctx, lt); camera(ctx, lt, d, 1.05, 1, W / 2, 1000);
    for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { const x = ((lt * 300 + i * 360 + r * 170) % 1600) - 250; rider(ctx, x, 1160 + r * 150, .55 + r * .1, 1, lt * 14 + i + r); }
    dust(ctx, lt, 400, 1250, 12);
    ctx.save(); ctx.translate(W / 2 - 40, 640); const k = eOut(prog(lt, .3, .5)); ctx.globalAlpha = .9; cannon(ctx, 0, 0, 1.4); ctx.restore();
    const x1 = eOut(prog(lt, .9, .4)); if (x1 > 0) { line(ctx, partial([[340, 520], [620, 760]], x1), C.red, 18); line(ctx, partial([[620, 520], [340, 760]], x1), C.red, 18); }
    stampBox(ctx, 'TOPÇUSU YOK', W / 2, 330, 96, C.red, lt, 1.2, -6);
  } },
  { s: 30.45, e: 33.85, draw(ctx, lt, d) { // şiddetli süvari hücumu
    plain(ctx, lt); shake(ctx, lt, .8, 12); shake(ctx, lt, 2.2, 12); camera(ctx, lt, d, 1, 1.12, 540, 1050);
    dust(ctx, lt, 700, 1200, 18); dust(ctx, lt, 300, 1260, 14);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 5; i++) { const x = 1300 - ((lt * 380 + i * 330 + r * 120) % 1700); rider(ctx, x, 960 + r * 160, .7 + r * .15, -1, lt * 15 + i + r, ['#b7342a', '#7a3b26', '#b7342a'][r], ['#4a3a2a', '#3a2e24', '#2a1d15'][r]); }
    tag(ctx, 'SAFEVİ SÜVARİSİ', W / 2, 300, 64, lt, 0, '#3e5f8a');
    stampBox(ctx, 'HÜCUM!', W / 2, 500, 130, C.red, lt, .7, -7);
  } },
  { s: 33.85, e: 36.4, draw(ctx, lt, d) { // sol kanat ağır kayıp
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); shake(ctx, lt, 1.0, 10); camera(ctx, lt, d, 1, 1.06, 300, 900);
    const k = eOut(prog(lt, .6, 1.4));
    for (let i = 0; i < 4; i++) { const m = eInOut(prog(lt, i * .12, 1.2)); block(ctx, 90 + i * 70, lerp(470, 880, m) + (i % 2) * 40, 60, 46, '#3e5f8a'); }
    for (let i = 0; i < 4; i++) block(ctx, 110 + (i % 2) * 80 - k * 40 * i, 1000 + Math.floor(i / 2) * 70 + k * (50 + i * 30), 70, 56, '#7a3b26', 1 - k * .55);
    block(ctx, 340, 980, 300, 120, '#2d4a7a'); block(ctx, 680, 1000, 180, 90, '#7a3b26');
    for (let i = 0; i < 4; i++) arrow(ctx, curvePts([260 + i * 50, 420], [180 + i * 40, 700], [180 + i * 30, 960]), eInOut(prog(lt, i * .15, .9)), '#3e5f8a', 12);
    dust(ctx, lt, 200, 1050, 16);
    for (let i = 0; i < 5; i++) { const t = (lt * .9 + i * .2) % 1; arrowShot(ctx, 80 + i * 60 + t * 120, 700 + t * 300, 1.1, 60, C.ink); }
    tag(ctx, 'OSMANLI SOL KANADI', W / 2, 300, 58, lt, 0, C.ink);
    stampBox(ctx, 'AĞIR KAYIP', 560, 700, 88, C.red, lt, 1.0, -6);
  } },
  { s: 36.4, e: 38.9, draw(ctx, lt, d) { // toplar ateş açtı
    plain(ctx, lt); shake(ctx, lt, .2, 18); shake(ctx, lt, .9, 14); camera(ctx, lt, d, 1.06, 1, W / 2, 1050);
    [180, 500, 820].forEach((x, i) => { cannon(ctx, x, 1230, 1.7, prog(lt, .15 + i * .3, .5)); smoke(ctx, lt, x + 160, 1150, .15 + i * .3, 8); });
    for (let i = 0; i < 2; i++) chainLink(ctx, 340 + i * 320, 1250, .6, 0);
    stampBox(ctx, 'ATEŞ!', W / 2, 400, 150, C.red, lt, .1, -6);
  } },
  { s: 38.9, e: 41.3, draw(ctx, lt, d) { // tüfekler gürledi, ova duman
    plain(ctx, lt); shake(ctx, lt, .3, 10); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    for (let i = 0; i < 5; i++) { const f = ((lt * 1.2 + i * .17) % 1); yeniceri(ctx, 130 + i * 175, 1290, 1.45, lt, 1, f < .4 ? f / .4 : 0); }
    for (let i = 0; i < 5; i++) smoke(ctx, (lt + i * .3) % 2.6, 290 + i * 175, 1070, 0, 5);
    const fog = clamp(lt / d); ctx.fillStyle = `rgba(235,228,214,${fog * .45})`; ctx.fillRect(-200, 700, W + 400, 700);
    tag(ctx, 'YENİÇERİ TÜFEKLERİ', W / 2, 300, 62, lt, 0, '#2d4a7a');
    tag(ctx, 'OVA BARUT DUMANINDA', W / 2, 460, 54, lt, .9, C.ink);
  } },
  { s: 41.3, e: 43.7, draw(ctx, lt, d) { // süvari dalgaları dağıldı
    plain(ctx, lt); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    const back = eOut(prog(lt, .2, 1.4));
    for (let i = 0; i < 5; i++) rider(ctx, 300 + i * 150 + back * (300 + i * 80), 1130 + (i % 2) * 150, .85, 1, lt * 14 + i);
    smoke(ctx, (lt % 2.4), 200, 1100, 0, 8); smoke(ctx, ((lt + 1.2) % 2.4), 120, 1200, 0, 8);
    dust(ctx, lt, 700, 1250, 14);
    stampBox(ctx, 'HÜCUMLAR DAĞILDI', W / 2, 400, 80, C.red, lt, .5, -5);
  } },
  { s: 43.7, e: 46.9, draw(ctx, lt, d) { // Şah İsmail yaralandı, çekildi
    plain(ctx, lt, { top: '#4a3a3a', bot: '#b0704a', ground: '#4a4030', mount: '#5a4a40', dark: true }); camera(ctx, lt, d, 1, 1.08, W / 2, 1000);
    const k = eInOut(lt / d);
    for (let i = 0; i < 3; i++) smoke(ctx, (lt + i * .8) % 2.4, 120 + i * 90, 1000, 0, 6, 'rgba(200,190,175,.55)');
    for (let i = 0; i < 3; i++) rider(ctx, lerp(150 - i * 140, 760 - i * 150, k), 1150 + i * 60, .75, 1, lt * 12 + i, '#b7342a', '#2a1d15');
    rider(ctx, lerp(260, 820, k), 1290, 1.25, 1, lt * 12);
    dust(ctx, lt, lerp(150, 700, k), 1290, 14, 'rgba(60,50,40,.35)');
    tag(ctx, 'ŞAH İSMAİL YARALANDI', W / 2, 300, 58, lt, 0, C.cream, C.ink);
    tag(ctx, 'SAVAŞ ALANINDAN ÇEKİLDİ', W / 2, 460, 52, lt, 1.2, '#3e5f8a', C.cream);
  } },
  { s: 46.9, e: 48.4, draw(ctx, lt, d) { // Safevi ordusu dağıldı (kuş bakışı)
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    const k = eOut(prog(lt, .1, 1.2));
    for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * .45; block(ctx, 470 + Math.cos(a) * k * 360 - 50, 760 + Math.sin(a) * k * 300, 100, 56, '#3e5f8a', 1 - k * .5); }
    for (let i = 0; i < 6; i++) block(ctx, 130 + i * 120, 1060, 100, 56, C.red);
    stampBox(ctx, 'SAFEVİ ORDUSU DAĞILDI', W / 2, 330, 64, C.red, lt, .2, -5);
  } },
  { s: 48.4, e: 51.2, draw(ctx, lt, d) { // kamp ve hazine
    plain(ctx, lt); camera(ctx, lt, d, 1, 1.07, W / 2, 1000);
    [[180, 1040], [880, 1040]].forEach(([x, y]) => { shape(ctx, [[x - 120, y], [x, y - 170], [x + 120, y]], '#3e5f8a', C.ink, 5, .6); shape(ctx, [[x - 26, y], [x, y - 60], [x + 26, y]], '#2a1d15', null); });
    chest(ctx, W / 2 - 40, 1230, 1.3, lt);
    const up = eOut(prog(lt, .4, 1)); tug(ctx, 540, 1060, 200 + up * 200, lt);
    tag(ctx, 'KAMP VE HAZİNE', W / 2, 300, 66, lt, 0, C.ink);
    tag(ctx, 'OSMANLI\'NIN ELİNDE', W / 2, 450, 56, lt, 1.2, C.red);
  } },
  { s: 51.2, e: 54.5, draw(ctx, lt, d) { // Tebriz'e giriş
    camera(ctx, lt, d, 1.0, 1.15, 880, 880); eastMap(ctx);
    const cal = P(...CAL), teb = P(...TEB);
    pin(ctx, ...cal, .9, lt, 0, C.ink); tag(ctx, 'ÇALDIRAN', cal[0] - 60, cal[1] - 120, 36, lt, .1, C.ink);
    arrow(ctx, curvePts(cal, [cal[0] + 60, cal[1] + 20], [teb[0] - 10, teb[1] - 20], 20), eInOut(prog(lt, .2, 1.2)), C.red, 12);
    pin(ctx, ...teb, 1.2, lt, 1.3, C.red);
    sealPro(ctx, 'Tebriz', 'Safevi başkenti', 420, 480, 130, C.red, lt, 1.5, 'EYLÜL 1514');
  } },
  { s: 54.5, e: 58.0, draw(ctx, lt, d) { // Doğu Anadolu Osmanlı'ya geçti
    camera(ctx, lt, d, 1, 1.06, 640, 820); eastMap(ctx);
    const pu = eOut(prog(lt, .3, 1)) * (.5 + Math.sin(lt * 5) * .12);
    ctx.save(); ctx.globalAlpha = pu; drawLand(ctx, EM, EAST, C.red); ctx.restore(); drawLand(ctx, EM, EAST, null);
    ['DİYARBAKIR|40.2|37.9', 'ERZURUM|41.27|39.9'].forEach((s0, i) => { const [n, lo, la] = s0.split('|'); const p = P(+lo, +la); pin(ctx, ...p, .8, lt, .8 + i * .3, C.ink); tag(ctx, n, p[0], p[1] + 46, 30, lt, .9 + i * .3, C.ink); });
    tag(ctx, 'DOĞU ANADOLU', W / 2, 300, 66, lt, 0, C.red);
    tag(ctx, 'OSMANLI\'YA GEÇTİ', W / 2, 1200, 60, lt, 1.4, C.ink, C.cream, 2);
  } },
  { s: 58.0, e: 61.3, draw(ctx, lt, d) { // ipek yolları
    camera(ctx, lt, d, 1, 1.05, 540, 820); eastMap(ctx);
    const teb = P(...TEB), bur = P(...BUR), hal = P(...HAL);
    ctx.save(); ctx.setLineDash([22, 14]); ctx.lineDashOffset = -lt * 60;
    line(ctx, partial(curvePts(teb, P(38, 41.2), bur, 40), eInOut(prog(lt, .1, 1.5))), C.gold, 10, .5);
    line(ctx, partial(curvePts(teb, P(41, 36.6), hal, 40), eInOut(prog(lt, .4, 1.5))), C.gold, 10, .5); ctx.restore();
    [[teb, 'TEBRİZ'], [bur, 'BURSA'], [hal, 'HALEP']].forEach(([p, n], i) => { pin(ctx, ...p, .9, lt, .1 + i * .4, C.red); tag(ctx, n, p[0], p[1] + 46, 32, lt, .2 + i * .4, C.ink); });
    const q = partial(curvePts(teb, P(38, 41.2), bur, 40), (lt * .25) % 1); camel(ctx, q[q.length - 1][0], q[q.length - 1][1] + 10, .4, Math.sin(lt * 6));
    tag(ctx, 'İPEK YOLLARI OSMANLI DENETİMİNDE', W / 2, 300, 46, lt, 0, C.red);
  } },
  { s: 61.3, e: 63.4, draw(ctx, lt, d) { // tek bir günde...
    plain(ctx, lt, { top: '#c99a6a', bot: '#e8c890' }); camera(ctx, lt, d, 1, 1.08, W / 2, 1000);
    [230, 640].forEach((x, i) => { cannon(ctx, x, 1230, 1.7, prog(lt, .2 + i * .5, .5)); smoke(ctx, lt, x + 160, 1140, .2 + i * .5, 8); });
    tug(ctx, 880, 1250, 520, lt);
    bigText(ctx, 'TEK BİR GÜNDE...', W / 2, 400, 96, C.cream, lt, 0, F_SANS, [C.ink, 12]);
  } },
  { s: 63.4, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    cannon(ctx, W / 2 - 60, 1150, 1.8, prog(lt, .3, .6)); smoke(ctx, lt, W / 2 + 120, 1060, .3, 8, 'rgba(243,233,210,.7)');
    bigText(ctx, 'BARUT', W / 2, 360, 130, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'DOĞUNUN KADERİNİ DEĞİŞTİRDİ', W / 2, 520, 52, lt, .5, C.ink, C.cream);
  } },
];
