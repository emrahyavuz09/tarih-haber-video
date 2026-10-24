// ===== Kafes usulü: Şehzadeler sarayda (sabah) =====
const KEY = ['KAFES', 'ŞEHZADE', 'ŞEHZADELER', 'SANCAĞA', 'MEHMED', 'AHMED', 'MUSTAFA', 'ŞİMŞİRLİK', 'YAŞLISINA', 'TECRÜBESİZ', 'SÜLEYMAN', 'OTUZ', 'KIRK', 'RİVAYETE', 'BEDEL', 'ÖLDÜRÜLECEĞİNİ'];
const DURATION = 44.98 + 2.2;
const OUTRO_AT = DURATION - 1.6;
const TR = { x: 500, y: 800, lon: 33.6, lat: 39.4, k: 54 };

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
// ---- figürler ----
// genç şehzade büstü: küçük sarık, ince bıyık, kaftan
function sehzade(ctx, x, y, s, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  const k = o.kaftan || '#7a1f1a';
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], k, C.ink, 6);
  shape(ctx, [[-40, 52], [0, 150], [40, 52]], '#f3efe6', C.ink, 5);
  for (let i = 0; i < 3; i++) ell(ctx, 0, 170 + i * 30, 6, 6, C.gold, C.ink, 2);
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 64, 78, C.skin, C.ink, 6);
  ell(ctx, -64, -36, 11, 16, C.skin, C.ink, 4); ell(ctx, 64, -36, 11, 16, C.skin, C.ink, 4);
  if (o.worried) { line(ctx, [[-42, -62], [-12, -72]], C.ink, 6); line(ctx, [[12, -72], [42, -62]], C.ink, 6); }
  else { line(ctx, [[-42, -68], [-12, -64]], C.ink, 6); line(ctx, [[12, -64], [42, -68]], C.ink, 6); }
  const look = o.look || 0;
  ell(ctx, -24 + look, -46, 6, 7, C.ink, null); ell(ctx, 24 + look, -46, 6, 7, C.ink, null);
  line(ctx, [[0, -40], [-5, -12], [6, -10]], C.ink, 4);
  if (o.beard) { shape(ctx, [[-60, -20], [-56, 24], [-32, 66], [0, 82], [32, 66], [56, 24], [60, -20], [36, 6], [0, 12], [-36, 6]], o.beard, C.ink, 4); }
  line(ctx, [[-24, 8], [0, 4], [24, 8]], '#4a3020', 5);
  if (!o.beard) line(ctx, [[-12, 28], [0, 26], [12, 28]], C.ink, 4);
  // sarık
  ell(ctx, 0, -126, 82, 54, '#f6f1e6', C.ink, 6);
  for (let i = -2; i <= 2; i++) line(ctx, [[i * 26 - 14, -170], [i * 26 + 14, -84]], 'rgba(42,29,21,.3)', 3);
  shape(ctx, [[-20, -172], [-16, -198], [16, -198], [20, -172]], k, C.ink, 4);
  ctx.restore();
}
// ahşap kafes (çapraz lata) — x,y sol üst, w,h, cover 0..1 (yukarıdan aşağı iner)
function lattice(ctx, x, y, w, h, cover = 1, col = '#6e4a2c') {
  if (cover <= 0) return;
  const hh = h * cover;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, hh); ctx.clip();
  ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
  const st = 54;
  for (let i = -h; i < w + h; i += st) {
    [[[x + i, y], [x + i + h, y + h]], [[x + i + h, y], [x + i, y + h]]].forEach(seg => {
      ctx.lineWidth = 16; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(...seg[0]); ctx.lineTo(...seg[1]); ctx.stroke();
      ctx.lineWidth = 10; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(...seg[0]); ctx.lineTo(...seg[1]); ctx.stroke();
    });
  }
  ctx.restore();
  ctx.save(); ctx.lineWidth = 22; ctx.strokeStyle = C.ink; ctx.strokeRect(x, y, w, h); ctx.lineWidth = 14; ctx.strokeStyle = '#8b6a45'; ctx.strokeRect(x, y, w, h); ctx.restore();
}
function candle(ctx, x, y, s, lt) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const g = ctx.createRadialGradient(0, -120, 10, 0, -120, 260); g.addColorStop(0, 'rgba(255,214,140,.55)'); g.addColorStop(1, 'rgba(255,214,140,0)');
  ctx.fillStyle = g; ctx.fillRect(-300, -400, 600, 560);
  shape(ctx, [[-50, 0], [50, 0], [40, -20], [-40, -20]], '#b8892f', C.ink, 4, .4);
  shape(ctx, [[-22, -20], [22, -20], [22, -110], [-22, -110]], '#f3ead6', C.ink, 4, .4);
  const f = Math.sin(lt * 13) * 4, h = 46 + Math.sin(lt * 9) * 6;
  shape(ctx, [[-12, -112], [-8 + f * .3, -112 - h * .5], [f, -112 - h], [8 + f * .3, -112 - h * .5], [12, -112]], '#f8c84a', '#e2572b', 3, 1);
  ctx.restore();
}
// kemerli kapı (open 0..1): içeri ışık girer
function archDoor(ctx, x, y, w, h, open, lt) {
  const arch = []; for (let i = 0; i <= 16; i++) { const a = Math.PI + i / 16 * Math.PI; arch.push([x + Math.cos(a) * w / 2, y - h + w / 2 + Math.sin(a) * w / 2]); }
  const pts = [[x - w / 2, y], ...arch, [x + w / 2, y]];
  shape(ctx, pts, open > 0 ? '#f8e2a8' : '#3b2a1e', C.ink, 6, .6);
  if (open > 0) { ctx.save(); ctx.globalAlpha = .35 * open; ctx.fillStyle = '#ffe9b0'; ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w * 1.6, y + 500); ctx.lineTo(x - w * 1.6, y + 500); ctx.fill(); ctx.restore(); }
  const dw = w / 2 * (1 - open * .85);
  shape(ctx, [[x - w / 2, y], [x - w / 2, y - h + w / 2], [x - w / 2 + dw, y - h + w / 2], [x - w / 2 + dw, y]], '#6e4a2c', C.ink, 5, .5);
  shape(ctx, [[x + w / 2, y], [x + w / 2, y - h + w / 2], [x + w / 2 - dw, y - h + w / 2], [x + w / 2 - dw, y]], '#6e4a2c', C.ink, 5, .5);
}
function roomBg(ctx, dark = '#3b2c22') { // loş saray odası: çini duvar
  ctx.drawImage(paperTex(dark, 'room' + dark), 0, 0);
  for (let y = 300; y < 1100; y += 120) for (let x = 0; x < W + 120; x += 120) { const o = (y / 120) % 2 ? 60 : 0; ell(ctx, x + o, y, 30, 30, null, 'rgba(120,170,190,.22)', 4); }
  shape(ctx, [[-50, 1100], [W + 50, 1100], [W + 50, 2000], [-50, 2000]], '#5a4030', C.ink, 5, .8);
  for (let i = 0; i < 6; i++) line(ctx, [[-50, 1160 + i * 110], [W + 50, 1160 + i * 110]], 'rgba(30,20,12,.35)', 3, .5);
}
function boxwood(ctx, x, y, s, lt, i = 0) { // şimşir (yuvarlak budanmış ağaç)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(lt * 2 + i) * .03);
  line(ctx, [[0, 0], [0, -70]], '#5a4030', 12, .4);
  ell(ctx, 0, -130, 70, 76, '#5f7a3a', C.ink, 5); ell(ctx, -22, -150, 22, 20, '#7a9650', null); ell(ctx, 24, -110, 18, 16, '#7a9650', null);
  ctx.restore();
}
function haremBuilding(ctx, x, y, s, lt) { // Topkapı harem kanadı: kubbeler, bacalar, kafesli pencereler
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-380, 0], [-380, -300], [380, -300], [380, 0]], '#e9dcc0', C.ink, 6, .8);
  shape(ctx, [[-400, -300], [400, -300], [380, -330], [-380, -330]], '#a5805c', C.ink, 5, .6);
  [[-220, 90], [0, 120], [220, 90]].forEach(([dx, r]) => { shape(ctx, curvePts([dx - r, -330], [dx, -330 - r * 1.6], [dx + r, -330], 20), '#8fa3a8', C.ink, 5, .6); line(ctx, [[dx, -330 - r * .8], [dx, -330 - r * .8 - 50]], C.gold, 6, .2); });
  [-330, 330].forEach(dx => { shape(ctx, [[dx - 18, -330], [dx - 18, -460], [dx + 18, -460], [dx + 18, -330]], '#e9dcc0', C.ink, 4, .5); shape(ctx, [[dx - 26, -460], [dx, -500], [dx + 26, -460]], '#8fa3a8', C.ink, 4, .5); });
  for (let i = -2; i <= 2; i++) { const wx = i * 140 - 45; shape(ctx, [[wx, -60], [wx, -200], [wx + 90, -200], [wx + 90, -60]], '#4a3628', C.ink, 4, .5); lattice(ctx, wx, -200, 90, 140, 1); }
  ctx.restore();
}
function balance(ctx, x, y, s, tilt, lt) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-90, 0], [90, 0], [60, -30], [-60, -30]], '#8b6a45', C.ink, 5, .5);
  line(ctx, [[0, -30], [0, -400]], '#8b6a45', 14, .3); ell(ctx, 0, -410, 18, 18, C.gold, C.ink, 4);
  const a = tilt; const L = 300; const lx = -Math.cos(a) * L, ly = -400 - Math.sin(a) * L, rx = Math.cos(a) * L, ry = -400 + Math.sin(a) * L;
  line(ctx, [[lx, ly], [rx, ry]], '#6e4a2c', 12, .3);
  [[lx, ly], [rx, ry]].forEach(([px, py]) => { line(ctx, [[px, py], [px - 80, py + 170]], C.ink, 3, .2); line(ctx, [[px, py], [px + 80, py + 170]], C.ink, 3, .2); shape(ctx, curvePts([px - 100, py + 170], [px, py + 240], [px + 100, py + 170], 14), '#b8892f', C.ink, 5, .4); });
  ctx.restore();
  return [[x + lx * s, y + (ly + 170) * s], [x + rx * s, y + (ry + 170) * s]];
}

const SCENES = [
  { s: 0, e: 2.1, draw(ctx, lt, d) { // HOOK
    ctx.save(); hookCard(ctx, lt + .5, d + .5, 'Bu şehzade öldürüleceğini sandı!', 'Kafes usulü'); ctx.restore();
    const k = eInOut(prog(lt, 0, d)); lattice(ctx, 390, 1130, 220, 170, .35 + k * .65);
  } },
  { s: 2.1, e: 4.75, draw(ctx, lt, d) { // tahta çağrıldı: kapı açılıyor, şehzade korkuyla bakıyor
    roomBg(ctx); shake(ctx, lt, .9, 10); camera(ctx, lt, d, 1, 1.08, 540, 900);
    const op = eOut(prog(lt, .6, 1.2)); archDoor(ctx, 760, 1100, 260, 560, op, lt);
    for (let i = 0; i < 2; i++) { const p = eOut(prog(lt, 1.3 + i * .2, .8)); if (p > 0) { ctx.save(); ctx.globalAlpha = p; pawn(ctx, 700 + i * 120, 1080, 2.4, '#2a1d15'); ctx.restore(); } }
    sehzade(ctx, 330, 920, 1.0, { worried: true, look: 10 });
    candle(ctx, 160, 1250, .9, lt);
    tag(ctx, 'TAHTA ÇAĞRILDI', W / 2, 330, 64, lt, .1, C.cream, C.ink);
    stampBox(ctx, 'ÖLÜM MÜ, TAHT MI?', W / 2, 500, 70, C.red, lt, 1.4, -5);
  } },
  { s: 4.75, e: 8.2, draw(ctx, lt, d) { // eskiden sancağa çıkarlardı
    camera(ctx, lt, d, 1, 1.08, 400, 760);
    regionMap(ctx, TR, { seas: [SEA_BLACK, SEA_MED, SEA_MARMARA] });
    mountains(ctx, TR, [[35, 38.3], [37, 38.6], [39.5, 39.4], [31.5, 37.7], [33, 37.3], [41.5, 40.3]]);
    const ist = proj(TR, 28.97, 41.01);
    const cities = [['MANİSA', 27.43, 38.61], ['AMASYA', 35.83, 40.65], ['KONYA', 32.48, 37.87], ['TRABZON', 39.72, 41.0]];
    pin(ctx, ...ist, 1, lt, 0, C.red); tag(ctx, 'İSTANBUL', ist[0] + 40, ist[1] - 110, 38, lt, .1, C.red);
    cities.forEach(([n, lo, la], i) => {
      const p = proj(TR, lo, la); const t0 = .3 + i * .45;
      arrow(ctx, curvePts([ist[0], ist[1] + 10], [(ist[0] + p[0]) / 2, Math.min(ist[1], p[1]) - 60], p, 30), eInOut(prog(lt, t0, .7)), C.red, 7, true);
      pin(ctx, ...p, .8, lt, t0 + .6, C.ink); tag(ctx, n, p[0], p[1] + (n === 'AMASYA' ? -120 : 46), 32, lt, t0 + .65, C.ink);
    });
    tag(ctx, 'SANCAĞA ÇIKMA', W / 2, 330, 70, lt, 0, C.ink);
    tag(ctx, 'YÖNETMEYİ ORADA ÖĞRENİRLERDİ', W / 2, 1220, 46, lt, 1.9, C.red, C.cream, 2);
  } },
  { s: 8.2, e: 11.15, draw(ctx, lt, d) { // son sancakbeyi: III. Mehmed (Manisa)
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 860);
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = C.gold;
    for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .25; ctx.beginPath(); ctx.moveTo(W / 2, 860); ctx.arc(W / 2, 860, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    const p = eBack(prog(lt, .1, .5)); if (p > 0) padisah(ctx, 420, 900 + (1 - p) * 120, .95 * p, { kaftan: '#2f5a7a' });
    sealPro(ctx, 'Manisa', 'Son sancakbeyi şehzade', 760, 560, 150, C.red, lt, 1.2, 'III. MEHMED');
    tag(ctx, 'SANCAĞA ÇIKAN SON PADİŞAH', W / 2, 330, 54, lt, 0, C.ink);
    tag(ctx, 'III. MEHMED', 420, 1230, 64, lt, 1.6, C.red, C.cream, 2);
  } },
  { s: 11.15, e: 13.55, draw(ctx, lt, d) { // 1603: I. Ahmed tahta
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1.04, 1, W / 2, 900);
    ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#ffe2a0';
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 - lt * .3; ctx.beginPath(); ctx.moveTo(500, 900); ctx.arc(500, 900, 1000, a, a + .14); ctx.fill(); } ctx.restore();
    throne(ctx, 500, 1240, 1.15, '#2f6b4f');
    const p = eBack(prog(lt, .4, .5)); if (p > 0) sehzade(ctx, 500, 900 + (1 - p) * 140, .95 * p, { kaftan: '#2f6b4f' });
    bigText(ctx, '1603', W / 2, 330, 150, C.cream, lt, 0, F_SANS, [C.ink, 14]);
    tag(ctx, 'I. AHMED TAHTA ÇIKTI', W / 2, 1290, 54, lt, 1.0, C.ink, C.cream, 2);
  } },
  { s: 13.55, e: 15.3, draw(ctx, lt, d) { // kardeşi Mustafa'yı öldürtmedi
    bg(ctx); camera(ctx, lt, d, 1, 1.06, W / 2, 860);
    sehzade(ctx, 280, 900, .8, { kaftan: '#2f6b4f' }); sehzade(ctx, 720, 900, .8, { kaftan: '#6a4a8c', dir: -1 });
    const k = eInOut(prog(lt, .2, 1.1)); // kılıç kına giriyor (aşağı iner, döner)
    ctx.save(); ctx.globalAlpha = 1 - k * .7; sword(ctx, 500, lerp(520, 700, k), 2.2, lerp(0, Math.PI, k)); ctx.restore();
    tag(ctx, 'I. AHMED', 280, 1210, 46, lt, .1, '#2f6b4f'); tag(ctx, 'ŞEHZADE MUSTAFA', 720, 1210, 44, lt, .2, '#6a4a8c');
    stampBox(ctx, 'ÖLDÜRTMEDİ', W / 2, 360, 100, C.red, lt, .9, -6);
  } },
  { s: 15.3, e: 19.5, draw(ctx, lt, d) { // Şimşirlik: sarayın özel dairesi
    const sky = ctx.createLinearGradient(0, 0, 0, 1200); sky.addColorStop(0, '#e6d3a8'); sky.addColorStop(1, '#f1e3c2'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    pan(ctx, lt, d, -60, 0, 1, 1.1, 540, 900);
    for (let i = 0; i < 3; i++) { const x = ((lt * 30 + i * 420) % 1500) - 250; ell(ctx, x, 420 + i * 40, 110, 26, '#fff8e8', null); }
    shape(ctx, [[-300, 1100], [1400, 1100], [1400, 2200], [-300, 2200]], '#9aa463', C.ink, 5, 1);
    haremBuilding(ctx, 500, 1080, 1.0, lt);
    [90, 230, 770, 910].forEach((x, i) => boxwood(ctx, x, 1250 + (i % 2) * 30, .95, lt, i));
    tag(ctx, 'TOPKAPI SARAYI', W / 2, 300, 62, lt, 0, C.ink);
    stampBox(ctx, 'ŞİMŞİRLİK', W / 2, 470, 90, C.red, lt, 1.9, -5);
  } },
  { s: 19.5, e: 22.2, draw(ctx, lt, d) { // "kafes" diye anılacaktı
    roomBg(ctx, '#4a3628'); const cl = eInOut(prog(lt, .2, 1.2)); shake(ctx, lt, 1.4, 14); camera(ctx, lt, d, 1, 1.07, W / 2, 820);
    shape(ctx, [[220, 1140], [220, 520], [860, 520], [860, 1140]], '#d8c9a0', C.ink, 6, .6); // pencere (dışarısı)
    for (let i = 0; i < 2; i++) { const x = ((lt * 140 + i * 300) % 760) + 200; line(ctx, [[x - 18, 700 + i * 90], [x, 690 + i * 90 + Math.sin(lt * 12) * 8], [x + 18, 700 + i * 90]], C.ink, 4, .3); }
    sehzade(ctx, 540, 1000, .75, { worried: true });
    lattice(ctx, 220, 520, 640, 620, cl);
    bigText(ctx, 'KAFES', W / 2, 330, 150, C.cream, lt, 1.3, F_SANS, [C.ink, 14]);
    tag(ctx, 'SONRADAN VERİLEN AD', W / 2, 1250, 48, lt, 1.6, C.red, C.cream, 2);
  } },
  { s: 22.2, e: 26.35, draw(ctx, lt, d) { // taht: babadan oğula değil, en yaşlıya
    bg(ctx); camera(ctx, lt, d, 1, 1.05, W / 2, 860);
    const fx = W / 2 - 40;
    padisah(ctx, fx, 640, .55, { kaftan: '#2f6b4f' });
    // oğul (eski yol) — çarpı
    sehzade(ctx, 260, 1050, .5, { kaftan: '#3e5f8a' }); tag(ctx, 'OĞUL', 260, 1250, 40, lt, .1, '#3e5f8a');
    sehzade(ctx, 760, 1050, .55, { kaftan: '#6a4a8c', beard: '#7a7068' }); tag(ctx, 'EN YAŞLI', 760, 1250, 40, lt, 1.8, C.red);
    arrow(ctx, [[fx - 80, 820], [330, 900]], eInOut(prog(lt, .1, .6)), '#3e5f8a', 10);
    const x1 = eOut(prog(lt, .9, .4)); if (x1 > 0) { line(ctx, partial([[200, 830], [330, 960]], x1), C.red, 16); line(ctx, partial([[330, 830], [200, 960]], x1), C.red, 16); }
    arrow(ctx, [[fx + 80, 820], [700, 900]], eInOut(prog(lt, 1.5, .6)), C.red, 12);
    const ck = eInOut(prog(lt, 1.9, 1.2)); crown(ctx, lerp(fx, 760, ck), lerp(420, 770, ck) - Math.sin(ck * Math.PI) * 120, .5, Math.sin(lt * 4) * .08);
    tag(ctx, 'EKBER VE ERŞED USULÜ', W / 2, 300, 54, lt, 0, C.ink);
  } },
  { s: 26.35, e: 30.15, draw(ctx, lt, d) { // sonuç: dış dünyayı tanımayan, tecrübesiz padişahlar
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); camera(ctx, lt, d, 1.06, 1, W / 2, 860);
    // pencere dışı: dünya akıp gidiyor
    ctx.save(); ctx.beginPath(); ctx.rect(180, 480, 720, 600); ctx.clip();
    drawSea(ctx, [180, 780, 720, 300]); ctx.fillStyle = '#e8d6aa'; ctx.fillRect(180, 480, 720, 300);
    for (let i = 0; i < 3; i++) { const x = ((lt * 110 + i * 300) % 1100) - 50; shape(ctx, [[x - 70, 860], [x + 70, 860], [x + 50, 900], [x - 50, 900]], '#6e4a2c', C.ink, 4, .4); line(ctx, [[x, 860], [x, 760]], C.ink, 5); shape(ctx, [[x + 4, 770], [x + 60, 840], [x + 4, 840]], C.cream, C.ink, 3, .4); }
    marching(ctx, lt, 160, 760, 6, '#5a4632', 1, 80, .9);
    ctx.restore();
    lattice(ctx, 180, 480, 720, 600, 1);
    bigText(ctx, 'PEKİ SONUÇ?', W / 2, 330, 96, C.red, lt, 0, F_SANS, [C.cream, 12]);
    stampBox(ctx, 'TECRÜBESİZ PADİŞAHLAR', W / 2, 1210, 62, C.ink, lt, 2.2, -4);
  } },
  { s: 30.15, e: 33.45, draw(ctx, lt, d) { // II. Süleyman: otuz yılı aşkın
    roomBg(ctx); camera(ctx, lt, d, 1, 1.08, W / 2, 860);
    candle(ctx, 830, 1230, .9, lt);
    sehzade(ctx, 400, 930, .95, { beard: lerp(0, 1, prog(lt, 0, 2.5)) > .5 ? '#8a8078' : '#4a3020' });
    lattice(ctx, 120, 600, 560, 640, 1);
    const yr = Math.round(lerp(1648, 1687, eInOut(prog(lt, .3, 2.4))));
    ctx.save(); tornRect(ctx, 650, 640, 280, 150, C.cream, 9); text(ctx, String(yr), 790, 718, 92, C.red); ctx.restore();
    tag(ctx, 'II. SÜLEYMAN', W / 2, 320, 70, lt, 0, C.cream, C.ink);
    stampBox(ctx, 'OTUZ YILI AŞKIN', W / 2, 470, 70, C.red, lt, 2.2, -4);
  } },
  { s: 33.45, e: 36.2, draw(ctx, lt, d) { // rivayete göre: tahta çağrılınca
    roomBg(ctx, '#2e221a'); shake(ctx, lt, .5, 8); camera(ctx, lt, d, 1, 1.1, 700, 900);
    const op = eOut(prog(lt, .1, 1)); archDoor(ctx, 720, 1120, 300, 700, op, lt);
    for (let i = 0; i < 3; i++) { const p = eOut(prog(lt, .7 + i * .2, .9)); if (p > 0) { ctx.save(); ctx.globalAlpha = p; pawn(ctx, 610 + i * 110, 1100, 2.2, '#1f1712'); ctx.restore(); } }
    sehzade(ctx, 280, 960, .9, { worried: true, beard: '#8a8078', look: 12 });
    tag(ctx, 'RİVAYETE GÖRE', W / 2, 330, 70, lt, 0, C.cream, C.ink);
  } },
  { s: 36.2, e: 40.1, draw(ctx, lt, d) { // söz
    ctx.drawImage(paperTex('#3b2c22', 'dark'), 0, 0); camera(ctx, lt, d, 1, 1.05, W / 2, 800);
    candle(ctx, W / 2 - 40, 1260, 1.0, lt);
    ctx.save(); ctx.translate(500, 720); ctx.rotate(-.015); tornRect(ctx, -390, -300, 780, 600, '#f1e6cc', 31); ctx.restore();
    const lines = ['"Kırk yıldır', 'her gün ölmektense,', 'bir gün evvel', 'ölmek yeğdir."'];
    lines.forEach((l, i) => { const a = clamp(prog(lt, .1 + i * .55, .35)); ctx.save(); ctx.globalAlpha = a; text(ctx, l, 500, 520 + i * 110, 66, i === 3 ? C.red : C.ink, F_SERIF, 700); ctx.restore(); });
    text(ctx, '— II. Süleyman (rivayet)', 500, 980, 34, 'rgba(42,29,21,.8)', F_SANS, 700);
    tag(ctx, 'TAHTA ÇAĞRILDIĞINDA', W / 2, 300, 56, lt, 0, C.red);
  } },
  { s: 40.1, e: 41.95, draw(ctx, lt, d) { // kardeş katlini azaltan usul: terazi
    bg(ctx); camera(ctx, lt, d, 1, 1.06, W / 2, 880);
    const tilt = lerp(.25, -.22, eInOut(prog(lt, .1, 1.2))) + Math.sin(lt * 5) * .02;
    const [L, R] = balance(ctx, W / 2 - 40, 1290, 1.0, tilt, lt);
    sword(ctx, L[0], L[1] - 10, .9, Math.PI / 2);
    ctx.save(); ctx.translate(R[0], R[1] - 30); lattice(ctx, -70, -90, 140, 90, 1); ctx.restore();
    tag(ctx, 'KARDEŞ KATLİ AZALDI', W / 2, 330, 60, lt, 0, C.ink);
    tag(ctx, 'AMA...', W / 2, 480, 60, lt, 1.0, C.red, C.cream, 2);
  } },
  { s: 41.95, e: 43.95, draw(ctx, lt, d) { // saray duvarlarının ardında
    ctx.drawImage(paperTex('#b7a07a', 'wall'), 0, 0); pan(ctx, lt, d, 80, 0, 1.12, 1.0, 540, 900);
    for (let r = 0; r < 14; r++) for (let c = -1; c < 10; c++) { const x = c * 130 + (r % 2) * 65, y = 200 + r * 80; shape(ctx, [[x, y], [x + 126, y], [x + 126, y + 76], [x, y + 76]], '#cdb68a', 'rgba(42,29,21,.55)', 3, .6); }
    shape(ctx, [[300, 1100], [300, 620], [780, 620], [780, 1100]], '#2e221a', C.ink, 8, .5);
    ctx.save(); ctx.globalAlpha = .7 + Math.sin(lt * 8) * .2; candle(ctx, 540, 1080, .8, lt); ctx.restore();
    lattice(ctx, 300, 620, 480, 480, 1);
    tag(ctx, 'SARAY DUVARLARININ ARDINDA', W / 2, 330, 52, lt, .1, C.ink);
  } },
  { s: 43.95, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 800);
    const cl = eInOut(prog(lt, 0, 1.4));
    shape(ctx, [[260, 1150], [260, 600], [820, 600], [820, 1150]], '#3b2a1e', C.ink, 6, .5);
    candle(ctx, 540, 1120, .9, lt);
    lattice(ctx, 260, 600, 560, 550, cl);
    bigText(ctx, 'YENİ BİR BEDEL', W / 2, 360, 100, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'KAFES USULÜ', W / 2, 1260, 56, lt, .8, C.ink, C.cream, 2);
  } },
];
