// ===== IV. Murad'ın kahve ve tütün yasağı (sabah) =====
const KEY = ['KAHVE', 'KAHVEYİ', 'YASAKLADI', 'CİBALİ', 'YANGIN', 'TÜTÜN', 'MURAD', 'FETVA', 'KAHVEHANELER', 'EYÜP', 'YİRMİ', 'HAYIR', 'İSYAN', 'RİVAYETE', 'CEZALAR', 'GEVŞEDİ', 'KALDI'];
const DURATION = 44.92 + 2.2;
const OUTRO_AT = DURATION - 1.6;

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
// ---- bölüme özel figürler ----
// Türk kahvesi fincanı + tabak, tüten buhar
function fincan(ctx, x, y, s, lt, steam = true, sl = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(ctx, 0, 46, 170, 30, '#efe6d2', C.ink, 6); ell(ctx, 0, 42, 110, 16, null, 'rgba(42,29,21,.35)', 3);
  ctx.beginPath(); ctx.arc(104, -24, 30, -1.5, 1.5); ctx.strokeStyle = C.ink; ctx.lineWidth = 20; ctx.stroke(); ctx.strokeStyle = '#f6f1e6'; ctx.lineWidth = 10; ctx.stroke();
  shape(ctx, [[-96, -74], [96, -74], [86, -6], [62, 32], [-62, 32], [-86, -6]], '#f6f1e6', C.ink, 6, 1);
  shape(ctx, [[-93, -52], [93, -52], [90, -32], [-90, -32]], C.red, null, 0, .6);
  for (let i = -3; i <= 3; i++) ell(ctx, i * 24, -12, 6, 6, C.gold, null);
  ell(ctx, 0, -74, 96, 17, '#3b2416', C.ink, 6);
  ell(ctx, -20, -77, 40, 5, 'rgba(200,150,90,.5)', null);
  if (steam) for (let i = 0; i < 3; i++) {
    const k = (lt * .55 + i / 3) % 1; const pts = [];
    for (let j = 0; j < 14; j++) pts.push([-40 + i * 40 + Math.sin(j * .7 + lt * 4 + i * 2) * 16, -100 - (j * 15 + k * 70) * sl]);
    ctx.globalAlpha = Math.sin(k * Math.PI) * .8; line(ctx, pts, '#fff8ea', 9, .4); ctx.globalAlpha = 1;
  }
  ctx.restore();
}
// uzun Osmanlı tütün çubuğu; duman lüleden çıkar
function cubuk(ctx, x, y, s, rot, lt, smoke = true) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  line(ctx, [[-300, 0], [196, 0]], '#6e4a2c', 14, .3); line(ctx, [[-300, -3], [196, -3]], 'rgba(255,235,200,.3)', 3, .2);
  for (let i = -220; i < 180; i += 90) line(ctx, [[i, -7], [i, 7]], C.gold, 5, .2);
  shape(ctx, [[-344, -10], [-300, -12], [-300, 12], [-344, 10]], C.gold, C.ink, 4, .4);
  shape(ctx, [[188, -8], [252, -8], [266, -78], [196, -78]], '#a5482c', C.ink, 5, .6);
  ell(ctx, 231, -78, 36, 10, '#3b2416', C.ink, 4); ell(ctx, 231, -80, 18, 4, '#f09a2a', null);
  ctx.restore();
  if (smoke) { // duman dönmeden çiz (yukarı yükselir)
    const bx = x + (231 * Math.cos(rot) + 78 * Math.sin(rot)) * s, by = y + (231 * Math.sin(rot) - 78 * Math.cos(rot)) * s;
    for (let i = 0; i < 7; i++) { const k = (lt * .5 + i / 7) % 1; ctx.globalAlpha = (1 - k) * .7; ell(ctx, bx + Math.sin(k * 6 + i) * 30 * s, by - k * 380 * s, (16 + k * 50) * s, (12 + k * 36) * s, 'rgba(225,220,210,1)', null); }
    ctx.globalAlpha = 1;
  }
}
// cami silüeti (kubbe + minareler)
function dome(ctx, cx, by, r, col) { const p = []; for (let i = 0; i <= 18; i++) { const a = Math.PI + i / 18 * Math.PI; p.push([cx + Math.cos(a) * r, by + Math.sin(a) * r * .9]); } shape(ctx, p, col, C.ink, 4, .6); line(ctx, [[cx, by - r * .9], [cx, by - r * .9 - 26]], C.ink, 4, .2); }
function minaret(ctx, x, by, h, col) { shape(ctx, [[x - 10, by], [x - 10, by - h], [x + 10, by - h], [x + 10, by]], col, C.ink, 4, .4); shape(ctx, [[x - 16, by - h * .7], [x + 16, by - h * .7], [x + 16, by - h * .7 + 10], [x - 16, by - h * .7 + 10]], col, C.ink, 3, .3); shape(ctx, [[x - 12, by - h], [x, by - h - 60], [x + 12, by - h]], '#5d6f7a', C.ink, 3, .3); }
function camii(ctx, x, by, s, col = '#cdb68a') {
  ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
  minaret(ctx, -190, 0, 300, col); minaret(ctx, 190, 0, 300, col);
  shape(ctx, [[-160, 0], [-160, -90], [160, -90], [160, 0]], col, C.ink, 5, .6);
  dome(ctx, -105, -90, 46, col); dome(ctx, 105, -90, 46, col);
  shape(ctx, [[-90, -90], [-90, -130], [90, -130], [90, -90]], col, C.ink, 5, .6);
  dome(ctx, 0, -130, 96, col);
  for (let i = -3; i <= 3; i++) shape(ctx, [[i * 40 - 10, -20], [i * 40 - 10, -56], [i * 40, -66], [i * 40 + 10, -56], [i * 40 + 10, -20]], '#5b4636', null, 0, .3);
  ctx.restore();
}
// ahşap Osmanlı evi (cumbalı)
function evAhsap(ctx, x, y, s, col = '#c48a55', roof = '#7a3b26') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-80, 0], [-80, -120], [80, -120], [80, 0]], col, C.ink, 5, .6);
  shape(ctx, [[-104, -120], [104, -120], [104, -240], [-104, -240]], '#d9a46a', C.ink, 5, .6);
  for (let i = -100; i <= 100; i += 20) line(ctx, [[i, -122], [i, -238]], 'rgba(42,29,21,.25)', 2, .2);
  shape(ctx, [[-126, -240], [0, -312], [126, -240]], roof, C.ink, 5, .6);
  [-56, 0, 56].forEach(wx => shape(ctx, [[wx - 18, -150], [wx + 18, -150], [wx + 18, -206], [wx - 18, -206]], '#4a3a2c', C.ink, 3, .3));
  shape(ctx, [[-22, 0], [-22, -76], [22, -76], [22, 0]], '#6e4a2c', C.ink, 4, .4);
  shape(ctx, [[-66, -60], [-40, -60], [-40, -96], [-66, -96]], '#4a3a2c', C.ink, 3, .3);
  ctx.restore();
}
// kahvehane cephesi; shut: 0 açık, 1 kepenk tamamen kapalı
function kahvehane(ctx, x, y, s, lt, shut = 0, crowdIn = true) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-330, 0], [-330, -420], [330, -420], [330, 0]], '#c9a27a', C.ink, 6, .8);
  shape(ctx, [[-360, -420], [0, -500], [360, -420]], '#7a3b26', C.ink, 6, .8);
  // tabela (temiz yazı)
  ctx.fillStyle = '#2a1d15'; ctx.fillRect(-190, -400, 380, 74); ctx.strokeStyle = C.gold; ctx.lineWidth = 5; ctx.strokeRect(-182, -392, 364, 58);
  text(ctx, 'KAHVEHANE', 0, -362, 44, C.gold);
  // tente (çizgili)
  for (let i = 0; i < 10; i++) { const x0 = -330 + i * 66; shape(ctx, [[x0, -310], [x0 + 66, -310], [x0 + 70, -250], [x0 - 4, -250]], i % 2 ? C.cream : C.red, C.ink, 3, .4); }
  // iç mekân
  shape(ctx, [[-290, 0], [-290, -240], [290, -240], [290, 0]], '#4a3324', C.ink, 5, .5);
  const lamp = .75 + Math.sin(lt * 6) * .08; ctx.fillStyle = `rgba(240,170,80,${.35 * lamp})`; ctx.fillRect(-290, -240, 580, 240);
  if (crowdIn) for (let i = 0; i < 5; i++) { const px = -220 + i * 110, bob = Math.sin(lt * 5 + i * 1.3) * 4; adam(ctx, px, -20 + bob, 1.4, ['#2f6b4f', '#7a3b26', '#3e5f8a', '#6e4a2c', '#5a3a6a'][i]); }
  // kepenk
  if (shut > 0) { const h = 240 * clamp(shut); shape(ctx, [[-292, -240], [292, -240], [292, -240 + h], [-292, -240 + h]], '#8b6a45', C.ink, 5, .4); for (let yy = -240 + 24; yy < -240 + h; yy += 24) line(ctx, [[-290, yy], [290, yy]], '#5a4030', 3, .2); }
  ctx.restore();
}
// oturan / ayaktaki adam (sarıklı, yüz detayı yok)
function adam(ctx, x, y, s, col, turban = '#f6f1e6') {
  pawn(ctx, x, y, s, col);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(ctx, 0, -46, 14, 8, turban, C.ink, 2.5); ell(ctx, 0, -52, 6, 5, C.red, null);
  ctx.restore();
}
// pelerinli gece yolcusu (yüzsüz, kapüşon), elinde fener
function pelerinli(ctx, x, y, s, lt) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const b = Math.abs(Math.sin(lt * 5)) * -6; ctx.translate(0, b);
  const st = Math.sin(lt * 5) * 14;
  line(ctx, [[-14, -40], [-14 - st, 0]], '#1a120c', 14, .3); line(ctx, [[14, -40], [14 + st, 0]], '#1a120c', 14, .3);
  shape(ctx, [[-60, -30], [-48, -170], [-30, -220], [30, -220], [48, -170], [64, -30]], '#2b2420', C.ink, 4, .6);
  shape(ctx, [[-36, -214], [-40, -262], [-20, -296], [20, -296], [40, -262], [36, -214]], '#2b2420', C.ink, 4, .6);
  ell(ctx, 2, -252, 22, 26, '#120c08', null);
  // fener
  const sw = Math.sin(lt * 5) * .25; ctx.save(); ctx.translate(58, -120); ctx.rotate(sw);
  line(ctx, [[0, 0], [0, 40]], C.ink, 4, .2);
  const g = ctx.createRadialGradient(0, 70, 4, 0, 70, 140); g.addColorStop(0, 'rgba(255,210,120,.55)'); g.addColorStop(1, 'rgba(255,210,120,0)'); ctx.fillStyle = g; ctx.fillRect(-150, -70, 300, 280);
  shape(ctx, [[-18, 40], [18, 40], [22, 96], [-22, 96]], '#f8d25a', C.ink, 4, .3); shape(ctx, [[-24, 40], [0, 24], [24, 40]], '#6e4a2c', C.ink, 3, .3);
  ctx.restore(); ctx.restore();
}
function nightSky(ctx, lt) {
  const g = ctx.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, '#141b2c'); g.addColorStop(1, '#3a3a4a'); ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, H + 600);
  for (let i = 0; i < 40; i++) { ctx.globalAlpha = .4 + .6 * Math.abs(Math.sin(lt * 2 + i)); ell(ctx, hash(i) * W, 220 + hash(i + 3) * 600, 3, 3, '#f3e9d2', null); } ctx.globalAlpha = 1;
  const mx = 780 - lt * 8; ell(ctx, mx, 420, 70, 70, '#f3e9d2', null); ell(ctx, mx + 28, 404, 62, 62, '#141b2c', null);
}
function padlock(ctx, x, y, s, open = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.save(); ctx.translate(0, -open * 70); ctx.beginPath(); ctx.arc(0, -70, 62, Math.PI, 0); ctx.lineTo(62, -10); ctx.moveTo(-62, -70); ctx.lineTo(-62, -10 + open * 60); ctx.strokeStyle = C.ink; ctx.lineWidth = 32; ctx.stroke(); ctx.strokeStyle = '#9aa3a8'; ctx.lineWidth = 20; ctx.stroke(); ctx.restore();
  shape(ctx, [[-100, -40], [100, -40], [100, 120], [-100, 120]], C.gold, C.ink, 7, .5);
  ell(ctx, 0, 24, 18, 18, C.ink, null); shape(ctx, [[-8, 28], [8, 28], [12, 80], [-12, 80]], C.ink, null);
  ctx.restore();
}
function ferman(ctx, x, y, s, k, lt) { // açılan rulo (fetva)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const h = lerp(20, 560, eOut(k));
  shape(ctx, [[-230, -h / 2], [230, -h / 2], [230, h / 2], [-230, h / 2]], '#f3e7c8', C.ink, 5, .6);
  const rows = Math.floor((h - 60) / 52);
  for (let i = 0; i < rows; i++) { const yy = -h / 2 + 50 + i * 52; const len = 340 - (i % 3) * 40; const pts = []; for (let j = 0; j <= 20; j++) pts.push([-170 + j / 20 * len, yy + Math.sin(j * 1.7 + i) * 5]); line(ctx, partial(pts, clamp((lt - .3 - i * .12) * 2.5)), '#3b2a1e', 6, .3); }
  [-h / 2, h / 2].forEach(yy => { shape(ctx, [[-260, yy - 20], [260, yy - 20], [260, yy + 20], [-260, yy + 20]], '#a5805c', C.ink, 5, .4); ell(ctx, -266, yy, 14, 24, C.gold, C.ink, 4); ell(ctx, 266, yy, 14, 24, C.gold, C.ink, 4); });
  ctx.restore();
}
function tug(ctx, x, y, h, lt, col = '#2a1d15') {
  line(ctx, [[x, y], [x, y - h]], '#6e4a2c', 10, .4); ell(ctx, x, y - h - 10, 14, 14, C.gold, C.ink, 4);
  for (let i = 0; i < 7; i++) { const a = (i - 3) * 6; const sw = Math.sin(lt * 4 + i * .6) * 22; line(ctx, [[x, y - h + 10], [x + a + sw * .5 + 20, y - h + 70], [x + a + sw + 40, y - h + 150]], i % 2 ? col : '#5a4632', 9, .4); }
}
function kayik(ctx, x, y, s, lt) { ctx.save(); ctx.translate(x, y + Math.sin(lt * 3 + x) * 5); ctx.rotate(Math.sin(lt * 2 + x) * .03); ctx.scale(s, s);
  shape(ctx, [[-120, -20], [120, -20], [90, 20], [-90, 20]], '#7a4a2c', C.ink, 5, .5); line(ctx, [[-110, -16], [110, -16]], C.gold, 4, .2);
  pawn(ctx, -20, -20, .9, '#3e5f8a'); line(ctx, [[0, -40], [70, 30]], '#6e4a2c', 6, .3); ctx.restore(); }
function water(ctx, y0, lt, col = '#7fa6b4') {
  ctx.fillStyle = col; ctx.fillRect(-300, y0, W + 600, H);
  ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 4;
  for (let r = 0; r < 8; r++) for (let i = 0; i < 9; i++) { const x = ((i * 150 + r * 70 + lt * 40 * (r % 2 ? 1 : -1)) % 1500) - 200, y = y0 + 40 + r * 70; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 20, y - 10, x + 40, y); ctx.stroke(); }
}
function smokeCol(ctx, lt, x, y, n = 8, c = 'rgba(70,60,55,.5)', sc = 1) {
  for (let i = 0; i < n; i++) { const k = (lt * .4 + i / n) % 1; ctx.globalAlpha = (1 - k) * .9; ell(ctx, x + Math.sin(k * 5 + i) * 40 * sc + k * 120 * sc, y - k * 600 * sc, (40 + k * 90) * sc, (30 + k * 60) * sc, c, null); }
  ctx.globalAlpha = 1;
}
function warmBg(ctx, lt) { ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); }

const SCENES = [
  { s: 0, e: 2.32, draw(ctx, lt, d) { // HOOK
    ctx.save(); hookCard(ctx, lt, d, 'Bir padişah kahveyi yasakladı!', 'IV. Murad · 1633'); ctx.restore();
    fincan(ctx, 470, 1250 + Math.sin(lt * 3) * 6, .85, lt, true, .35);
  } },
  { s: 2.32, e: 4.3, draw(ctx, lt, d) { // 1633, İstanbul
    const g = ctx.createLinearGradient(0, 0, 0, 1100); g.addColorStop(0, '#e6d3a8'); g.addColorStop(1, '#f1e3c2'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    pan(ctx, lt, d, -30, 0, 1, 1.08, W / 2, 900);
    for (let i = 0; i < 4; i++) { const x = ((lt * 40 + i * 330) % 1500) - 250, y = 520 + (i % 2) * 90; ctx.globalAlpha = .5; ell(ctx, x, y, 110, 26, '#fff8e8', null); ell(ctx, x + 60, y - 18, 70, 24, '#fff8e8', null); } ctx.globalAlpha = 1;
    camii(ctx, 300, 1020, .9, '#cdb68a'); camii(ctx, 760, 1040, .7, '#c2a97a');
    [[100, 1060], [520, 1060], [950, 1060]].forEach(([hx, hy]) => evAhsap(ctx, hx, hy, .5));
    water(ctx, 1060, lt);
    kayik(ctx, ((lt * 120) % 1400) - 100, 1170, 1.3, lt); kayik(ctx, 1150 - ((lt * 90) % 1400), 1290, 1.1, lt + 1);
    bigText(ctx, '1633', W / 2, 360, 170, C.red, lt, 0, F_SANS, [C.cream, 14]);
    tag(ctx, 'İSTANBUL', W / 2, 540, 66, lt, 1.1, C.ink);
  } },
  { s: 4.3, e: 6.63, draw(ctx, lt, d) { // Cibali'de yangın çıkar
    const g = ctx.createLinearGradient(0, 0, 0, 1100); g.addColorStop(0, '#e9c79a'); g.addColorStop(1, '#f1dcb6'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    camera(ctx, lt, d, 1, 1.12, 560, 900);
    for (let i = 0; i < 5; i++) evAhsap(ctx, 80 + i * 210, 1060 - (i % 2) * 20, .82, i % 2 ? '#b98050' : '#c48a55');
    water(ctx, 1060, lt, '#6f98a8');
    kayik(ctx, 300 + Math.sin(lt) * 30, 1170, 1.0, lt);
    const f = eOut(prog(lt, .2, 1.4));
    if (f > 0) { smokeCol(ctx, lt, 520, 760, 8, 'rgba(70,60,55,.5)', .6 + f * .6); fire(ctx, 500, 830, .6 + f * 1.2, lt); fire(ctx, 560, 840, .4 + f * .9, lt + .5); }
    pin(ctx, 520, 640, 1.2, lt, .1, C.red);
    tag(ctx, 'CİBALİ', W / 2, 330, 74, lt, 0, C.red);
    stampBox(ctx, 'YANGIN!', W / 2, 1270, 90, C.red, lt, 1.2, -6);
  } },
  { s: 6.63, e: 8.65, draw(ctx, lt, d) { // şehrin koca bir bölümü kül olur
    const g = ctx.createLinearGradient(0, 0, 0, 1200); g.addColorStop(0, '#5a2a1e'); g.addColorStop(1, '#d0703a'); ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400);
    shake(ctx, lt, .2, 14); shake(ctx, lt, 1.2, 10); camera(ctx, lt, d, 1.06, 1, W / 2, 1000);
    camii(ctx, 540, 1060, .9, '#6a4a3a');
    for (let i = 0; i < 6; i++) { const x = 40 + i * 200; evAhsap(ctx, x, 1300, 1.0, '#5a3a2a', '#3a2418'); }
    for (let i = 0; i < 6; i++) { const x = 40 + i * 200; smokeCol(ctx, lt + i * .3, x, 1000, 6, 'rgba(40,30,28,.55)', .9); fire(ctx, x, 1010, 1.4 + Math.sin(lt * 3 + i) * .15, lt + i); }
    ctx.fillStyle = '#3a2a20'; ctx.fillRect(-200, 1300, W + 400, 800);
    for (let i = 0; i < 26; i++) { const k = (lt * .7 + hash(i)) % 1; ctx.globalAlpha = 1 - k; ell(ctx, hash(i + 4) * W, 1100 - k * 700, 5, 5, '#f8d25a', null); } ctx.globalAlpha = 1;
    tag(ctx, '2 EYLÜL 1633', W / 2, 330, 70, lt, 0, C.cream, C.ink);
    bigText(ctx, 'ŞEHİR KÜL OLDU', W / 2, 500, 96, C.cream, lt, .6, F_SANS, [C.ink, 12]);
  } },
  { s: 8.65, e: 11.89, draw(ctx, lt, d) { // söylenti: tütün içenler
    warmBg(ctx, lt); camera(ctx, lt, d, 1, 1.08, W / 2, 860);
    evAhsap(ctx, 760, 1290, .75); const hf = eOut(prog(lt, 1.0, 1.5)); if (hf > 0) fire(ctx, 760, 1060, .3 + hf * .9, lt);
    cubuk(ctx, 400, 960, 1.3, -.12, lt);
    // düşen kıvılcımlar
    for (let i = 0; i < 10; i++) { const k = (lt * .9 + i / 10) % 1; const bx = 700 + (hash(i) - .5) * 80, by = 850 + k * 220; ctx.globalAlpha = 1 - k; ell(ctx, bx + Math.sin(k * 8 + i) * 20, by, 7, 7, '#f09a2a', null); } ctx.globalAlpha = 1;
    tag(ctx, 'SÖYLENTİYE GÖRE', W / 2, 320, 64, lt, 0, C.ink);
    stampBox(ctx, 'SUÇLU: TÜTÜN?', W / 2, 520, 78, C.red, lt, 1.4, -5);
  } },
  { s: 11.89, e: 14.55, draw(ctx, lt, d) { // Genç padişah IV. Murad
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 850);
    ctx.save(); ctx.globalAlpha = .22; ctx.fillStyle = C.gold;
    for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .25; ctx.beginPath(); ctx.moveTo(W / 2, 820); ctx.arc(W / 2, 820, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    tug(ctx, 160, 1200, 580, lt); tug(ctx, 860, 1200, 580, lt + 1.5);
    const p = eBack(prog(lt, 0, .5)); if (p > 0) padisah(ctx, W / 2, 860 + (1 - p) * 160, 1.0 * p, { kaftan: '#7a1f1a', beard: '#2a1d15' });
    tag(ctx, 'GENÇ PADİŞAH', W / 2, 320, 62, lt, .1, C.ink);
    tag(ctx, 'IV. MURAD', W / 2, 1250, 76, lt, .9, C.red, C.cream, 2);
  } },
  { s: 14.55, e: 18.53, draw(ctx, lt, d) { // fetva
    warmBg(ctx, lt); camera(ctx, lt, d, 1, 1.05, W / 2, 800);
    ferman(ctx, W / 2 - 40, 800, 1.2, prog(lt, 0, .8), lt);
    tag(ctx, 'ŞEYHÜLİSLAM FETVASI', W / 2, 320, 60, lt, 0, C.ink);
    sealPro(ctx, 'Kötü bir yenilik', 'Kahve ve tütün', 620, 1050, 150, C.red, lt, 1.9, 'BİD\'AT', -8);
    fincan(ctx, 220, 1250, .55, lt); cubuk(ctx, 600, 1290, .45, -.1, lt, true);
  } },
  { s: 18.53, e: 21.25, draw(ctx, lt, d) { // kahvehaneler kapatılır
    warmBg(ctx, lt); camera(ctx, lt, d, 1, 1.07, W / 2, 950);
    ctx.fillStyle = '#b39a6c'; ctx.fillRect(-200, 1160, W + 400, 800);
    kahvehane(ctx, 500, 1160, 1.18, lt, eInOut(prog(lt, .3, 1.3)));
    shake(ctx, lt, 1.6, 10);
    stampBox(ctx, 'KAPATILDI', W / 2, 330, 104, C.red, lt, 1.6, -6);
    tag(ctx, 'TÜTÜN YASAK', W / 2, 1270, 60, lt, 1.9, C.ink);
  } },
  { s: 21.25, e: 24.71, draw(ctx, lt, d) { // Eyüp'te 120 dükkân yıkılır
    ctx.drawImage(paperTex('#d8c49a', 'eyup'), 0, 0); camera(ctx, lt, d, 1.05, 1, W / 2, 1000);
    ctx.fillStyle = '#b39a6c'; ctx.fillRect(-200, 1100, W + 400, 800);
    for (let i = 0; i < 6; i++) { const x = 120 + i * 140, t0 = .4 + i * .32; const k = eInOut(prog(lt, t0, .45));
      ctx.save(); ctx.translate(x + 60, 1100); ctx.rotate(k * (i % 2 ? 1.45 : -1.45) * .9); ctx.globalAlpha = 1 - k * .5;
      shape(ctx, [[-60, 0], [-60, -170], [60, -170], [60, 0]], i % 2 ? '#c9a27a' : '#bf9466', C.ink, 4, .5);
      shape(ctx, [[-72, -170], [0, -210], [72, -170]], '#7a3b26', C.ink, 4, .5);
      shape(ctx, [[-40, 0], [-40, -100], [40, -100], [40, 0]], '#4a3324', C.ink, 3, .4); ctx.restore();
      if (k > 0 && k < 1) dust(ctx, lt - t0, x + 60, 1100, 6); }
    const n = Math.round(lerp(0, 120, eOut(prog(lt, .3, 2.4))));
    bigText(ctx, String(n), W / 2, 470, 210, C.red, lt, 0, F_SANS, [C.cream, 16]);
    tag(ctx, 'KAHVE DÜKKÂNI YIKILDI', W / 2, 640, 56, lt, .4, C.ink);
    tag(ctx, 'EYÜP VE ÇEVRESİ', W / 2, 1240, 60, lt, .1, C.red, C.cream, 2);
  } },
  { s: 24.71, e: 27.7, draw(ctx, lt, d) { // asıl sebep? Hayır.
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); shake(ctx, lt, 2.55, 14); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    ctx.fillStyle = '#b39a6c'; ctx.fillRect(-200, 1100, W + 400, 800);
    evAhsap(ctx, 230, 1100, .9); fire(ctx, 230, 860, .9, lt);
    kahvehane(ctx, 680, 1100, .62, lt);
    const mk = eInOut(prog(lt, .2, 2.0)); const mx = lerp(230, 680, mk) + Math.sin(lt * 5) * 14, my = 880 + Math.cos(lt * 4) * 14 - Math.sin(mk * Math.PI) * 120;
    ell(ctx, mx, my, 120, 120, 'rgba(220,235,240,.35)', C.ink, 12); line(ctx, [[mx + 84, my + 84], [mx + 190, my + 190]], '#6e4a2c', 26, .3);
    bigText(ctx, 'SADECE YANGIN MI?', W / 2, 360, 84, C.ink, lt, 0, F_SANS, [C.cream, 10]);
    stampBox(ctx, 'HAYIR!', W / 2, 1230, 120, C.red, lt, 2.5, -7);
  } },
  { s: 27.7, e: 29.62, draw(ctx, lt, d) { // dedikodu
    ctx.drawImage(paperTex('#5a4030', 'inside'), 0, 0); camera(ctx, lt, d, 1, 1.1, W / 2, 1000);
    const lamp = .5 + Math.sin(lt * 7) * .06; const g = ctx.createRadialGradient(W / 2, 700, 40, W / 2, 700, 700); g.addColorStop(0, `rgba(240,170,80,${lamp})`); g.addColorStop(1, 'rgba(240,170,80,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    shape(ctx, [[180, 1060], [720, 1060], [700, 1100], [200, 1100]], '#8b6a45', C.ink, 5, .5);
    [[220, '#2f6b4f'], [370, '#7a3b26'], [530, '#3e5f8a'], [680, '#6e4a2c']].forEach(([x, c], i) => adam(ctx, x, 1060 + Math.sin(lt * 6 + i) * 4, 3.2, c));
    [300, 600].forEach((x, i) => fincan(ctx, x, 1040, .22, lt + i));
    bubble(ctx, 'Duydun mu?', 300, 600, 440, 52, lt, .1, 'left');
    bubble(ctx, 'Psst!', 650, 720, 260, 56, lt, .7, 'right');
    tag(ctx, 'DEDİKODU', W / 2, 320, 74, lt, 0, C.cream, C.ink);
  } },
  { s: 29.62, e: 31.89, draw(ctx, lt, d) { // isyan sözleri
    ctx.drawImage(paperTex('#4a3024', 'inside2'), 0, 0); shake(ctx, lt, .9, 10); camera(ctx, lt, d, 1.1, 1, W / 2, 1000);
    const g = ctx.createRadialGradient(W / 2, 760, 40, W / 2, 760, 700); g.addColorStop(0, 'rgba(220,90,50,.45)'); g.addColorStop(1, 'rgba(220,90,50,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 7; i++) { const x = 140 + i * 115, j = Math.max(0, Math.sin(lt * 8 + i * 1.3)) * 22; adam(ctx, x, 1150 - j, 2.8, ['#2f6b4f', '#7a3b26', '#3e5f8a', '#6e4a2c', '#5a3a6a', '#7a1f1a', '#4a5a3a'][i]);
      if (i % 2 === 0) { ctx.save(); ctx.translate(x + 30, 1040 - j); ctx.rotate(-.2 + Math.sin(lt * 8 + i) * .25); line(ctx, [[0, 0], [24, -80]], '#efc39b', 12, .3); ell(ctx, 26, -88, 14, 14, '#efc39b', C.ink, 3); ctx.restore(); } }
    tag(ctx, 'İSYAN SÖZLERİ', W / 2, 330, 76, lt, 0, C.red);
    tag(ctx, 'DEVLET İÇİN TEHLİKE', W / 2, 560, 60, lt, .8, C.cream, C.ink, 3);
  } },
  { s: 31.89, e: 35.86, draw(ctx, lt, d) { // rivayet: kılık değiştirip gece dolaşırdı
    nightSky(ctx, lt); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    for (let i = 0; i < 6; i++) evAhsap(ctx, ((i * 220 - lt * 40) % 1400 + 1400) % 1400 - 160, 1140, .85, '#3a3040', '#241a24');
    ctx.fillStyle = '#2a2430'; ctx.fillRect(-200, 1140, W + 400, 800);
    for (let i = 0; i < 10; i++) line(ctx, [[i * 130 - ((lt * 40) % 130), 1170], [i * 130 + 60 - ((lt * 40) % 130), 1170]], '#4a4250', 6, .3);
    pelerinli(ctx, lerp(160, 520, eInOut(lt / d)), 1180, 1.25, lt);
    tag(ctx, 'RİVAYETE GÖRE', W / 2, 320, 64, lt, 0, C.cream, C.ink);
    tag(ctx, 'KILIK DEĞİŞTİRİP GECE DEVRİYESİ', W / 2, 1270, 46, lt, 1.4, C.red, C.cream, 2);
  } },
  { s: 35.86, e: 38.4, draw(ctx, lt, d) { // ağır cezalar
    ctx.drawImage(paperTex('#d8c49a', 'eyup'), 0, 0); shake(ctx, lt, .9, 16); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    const br = eOut(prog(lt, .85, .9));
    ctx.save(); ctx.beginPath(); ctx.rect(-200, -200, 560, 2400); ctx.clip(); cubuk(ctx, 460 - br * 40, 860 + br * 280, 1.1, -.1 - br * .6, lt, br < .2); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(360, -200, 1000, 2400); ctx.clip(); cubuk(ctx, 460 + br * 60, 860 + br * 220, 1.1, -.1 + br * .7, lt, br < .2); ctx.restore();
    if (br > 0 && br < 1) dust(ctx, lt - .85, 380, 900, 8, 'rgba(90,70,50,.4)');
    tag(ctx, 'TÜTÜN İÇENLERE', W / 2, 320, 64, lt, 0, C.ink);
    stampBox(ctx, 'AĞIR CEZA', W / 2, 1230, 110, C.red, lt, .85, -6);
  } },
  { s: 38.4, e: 41.05, draw(ctx, lt, d) { // yasak gevşedi
    warmBg(ctx, lt); camera(ctx, lt, d, 1, 1.08, W / 2, 850);
    const op = eOut(prog(lt, .7, .9)); const fall = eInOut(prog(lt, 1.5, 1));
    ctx.save(); ctx.translate(0, fall * 500); ctx.rotate(fall * .4); padlock(ctx, W / 2 - 40 + fall * 60, 820, 1.6, op); ctx.restore();
    chainLink(ctx, 230 - fall * 160, 820, 1.2, .3); chainLink(ctx, 690 + fall * 160, 820, 1.2, -.3);
    tag(ctx, 'IV. MURAD\'DAN SONRA', W / 2, 320, 62, lt, 0, C.ink);
    stampBox(ctx, 'YASAK GEVŞEDİ', W / 2, 1230, 84, C.red, lt, 1.2, -5);
  } },
  { s: 41.05, e: 42.88, draw(ctx, lt, d) { // kahvehaneler yeniden açıldı
    warmBg(ctx, lt); camera(ctx, lt, d, 1.08, 1, W / 2, 950);
    ctx.fillStyle = '#b39a6c'; ctx.fillRect(-200, 1160, W + 400, 800);
    kahvehane(ctx, 500, 1160, 1.18, lt, 1 - eInOut(prog(lt, .1, .9)));
    for (let i = 0; i < 3; i++) adam(ctx, -40 + ((lt * 160 + i * 90) % 600), 1240, 2.2, ['#2f6b4f', '#7a1f1a', '#3e5f8a'][i]);
    stampBox(ctx, 'YENİDEN AÇIK', W / 2, 330, 96, '#2f6b4f', lt, .7, -5);
  } },
  { s: 42.88, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    fincan(ctx, W / 2 - 40, 1020, 1.6, lt);
    bigText(ctx, 'YASAKLAR GEÇTİ...', W / 2, 380, 92, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'KAHVE KALDI', W / 2, 540, 72, lt, 1.0, C.ink, C.cream);
  } },
];
