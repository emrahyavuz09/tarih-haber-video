// alim büstü (temsili): beyaz sarık, sakal, kaftan
function alim(ctx, x, y, s, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], o.robe || '#2d5a7a', C.ink, 6);
  shape(ctx, [[-40, 52], [0, 150], [40, 52]], C.cream, C.ink, 5);
  line(ctx, [[-60, 70], [-30, 260]], C.gold, 6); line(ctx, [[60, 70], [30, 260]], C.gold, 6);
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 66, 80, C.skin, C.ink, 6);
  ell(ctx, -66, -36, 11, 17, C.skin, C.ink, 4); ell(ctx, 66, -36, 11, 17, C.skin, C.ink, 4);
  ell(ctx, -24, -46, 6, 7, C.ink, null); ell(ctx, 24, -46, 6, 7, C.ink, null);
  line(ctx, [[-42, -66], [-12, -63]], '#5a5048', 6); line(ctx, [[12, -63], [42, -66]], '#5a5048', 6);
  line(ctx, [[0, -40], [-5, -12], [6, -10]], C.ink, 4);
  shape(ctx, [[-62, -20], [-58, 30], [-34, 86], [0, 104], [34, 86], [58, 30], [62, -20], [38, 6], [0, 12], [-38, 6]], '#8a8478', C.ink, 4);
  shape(ctx, [[0, 6], [-36, 12], [-54, 26], [-28, 22], [0, 16], [28, 22], [54, 26], [36, 12]], '#6e675c', C.ink, 3);
  ell(ctx, 0, -126, 96, 58, '#f6f1e6', C.ink, 6);
  for (let i = -2; i <= 2; i++) line(ctx, [[i * 32 - 22, -170], [i * 32 + 22, -80]], 'rgba(42,29,21,.3)', 3);
  shape(ctx, [[-30, -170], [-24, -196], [24, -196], [30, -170]], '#2d5a7a', C.ink, 4);
  ctx.restore();
}

function quill(ctx, x, y, s, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[0, 0], [10, -40], [30, -130], [44, -210], [20, -170], [6, -110], [-6, -40]], '#f6f1e6', C.ink, 4, .6);
  line(ctx, [[0, 0], [30, -190]], C.ink, 3, .2); shape(ctx, [[-3, 4], [3, 4], [0, 18]], C.ink, null);
  ctx.restore();
}

function coin(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s * Math.max(.15, Math.abs(Math.cos(rot))), s); ell(ctx, 0, 0, 40, 40, C.gold, C.ink, 4); ell(ctx, 0, 0, 28, 28, null, '#a87a1a', 3); ctx.restore(); }

function sparkle(ctx, lt, x, y, r) { for (let i = 0; i < 8; i++) { const k = (lt * .8 + i / 8) % 1; const a = i * 2.4; ctx.save(); ctx.globalAlpha = 1 - k; const px = x + Math.cos(a) * r * k, py = y + Math.sin(a) * r * k; line(ctx, [[px - 10, py], [px + 10, py]], C.gold, 4, .1); line(ctx, [[px, py - 10], [px, py + 10]], C.gold, 4, .1); ctx.restore(); } }

// ===== Lale Devri'nde lale soğanı (sabah) =====
const KEY = ['LALE', 'DEVRİ', 'FERMAN', 'SOĞAN', 'SOĞANI', 'SERVET', 'NARH', 'TAVAN', 'SEKİZ', 'DOKUZA', 'YİRMİ', 'LÂLEZÂRÎ', 'KAPLUMBAĞALARIN', 'MUMLAR', 'DEVLET'];
const DURATION = 41.39 + 2.2;
const OUTRO_AT = DURATION - 1.6;
const CX = W / 2 - 40; // güvenli alan ortası
function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
const TCOL = ['#c8352b', '#d9a630', '#8e3b8c', '#e06a2c', '#f0e4c8', '#b02a4a'];
// Osmanlı lalesi (lâle-i rûmî): uzun, badem biçimli, iğne uçlu taç yapraklar. x,y: sap dibi. grow 0..1
function tulip(ctx, x, y, s, col = C.red, sway = 0, grow = 1, h = 260) {
  if (grow <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(sway * .07); ctx.scale(s, s);
  const g = eOut(grow); const hh = h * g;
  line(ctx, curvePts([0, 0], [10, -hh * .5], [0, -hh], 12), '#3f6b35', 9, .4);
  shape(ctx, [[0, -10], [-34, -60], [-62, -150 * g], [-44, -170 * g], [-20, -110 * g], [0, -50]], '#5c8a45', C.ink, 3, .4);
  shape(ctx, [[0, -20], [30, -70], [46, -130 * g], [30, -140 * g], [12, -90 * g], [0, -60]], '#5c8a45', C.ink, 3, .4);
  const fp = eBack(prog(grow, .45, .55)); if (fp > 0) {
    ctx.translate(0, -hh); ctx.scale(fp, fp);
    const petal = (rot, c, k = 1) => { ctx.save(); ctx.rotate(rot); shape(ctx, [[0, 6], [-22 * k, -30], [-18 * k, -90], [0, -150], [18 * k, -90], [22 * k, -30]], c, C.ink, 3.5, .5); ctx.restore(); };
    const dark = 'rgba(0,0,0,.18)';
    petal(-.42, col, .9); petal(.42, col, .9);
    ctx.save(); ctx.globalAlpha = .9; petal(-.42, dark, .9); petal(.42, dark, .9); ctx.restore();
    petal(-.16, col); petal(.16, col); petal(0, col, 1.05);
    line(ctx, [[0, -10], [0, -110]], 'rgba(42,29,21,.25)', 3, .3);
  }
  ctx.restore();
}
// lale soğanı
function bulb(ctx, x, y, s, rot = 0, glow = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  if (glow > 0) { const g = ctx.createRadialGradient(0, -50, 10, 0, -50, 200); g.addColorStop(0, `rgba(255,214,120,${.6 * glow})`); g.addColorStop(1, 'rgba(255,214,120,0)'); ctx.fillStyle = g; ctx.fillRect(-220, -270, 440, 440); }
  for (let i = -3; i <= 3; i++) line(ctx, [[i * 9, 8], [i * 14, 40 + Math.abs(i) * 4]], '#8a6a48', 4, .5);
  shape(ctx, [[-52, 0], [-62, -40], [-46, -86], [-16, -116], [0, -140], [16, -116], [46, -86], [62, -40], [52, 0], [0, 12]], '#c8955f', C.ink, 5, .6);
  line(ctx, [[-30, -6], [-40, -50], [-14, -110]], 'rgba(90,55,25,.55)', 4, .4); line(ctx, [[28, -6], [38, -52], [12, -110]], 'rgba(90,55,25,.55)', 4, .4);
  shape(ctx, [[-6, -134], [0, -168], [6, -134]], '#5c8a45', C.ink, 3, .3);
  ctx.restore();
}
function vase(ctx, x, y, s, col = '#2d5a7a') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-40, 0], [-56, -50], [-46, -100], [-18, -130], [-18, -170], [18, -170], [18, -130], [46, -100], [56, -50], [40, 0]], col, C.ink, 5, .5);
  line(ctx, [[-50, -60], [50, -60]], C.gold, 6, .3); line(ctx, [[-44, -90], [44, -90]], C.cream, 4, .3);
  ctx.restore();
}
// İstanbul silueti (kubbe + minare), y: zemin çizgisi
function skyline(ctx, y, col = '#3b2a1e', off = 0) {
  ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = col;
  const mosque = (x, s) => {
    ctx.fillRect(x - 150 * s, y - 90 * s, 300 * s, 90 * s);
    ctx.beginPath(); ctx.arc(x, y - 90 * s, 110 * s, Math.PI, 0); ctx.fill();
    [-1, 1].forEach(k => { ctx.beginPath(); ctx.arc(x + k * 110 * s, y - 90 * s, 40 * s, Math.PI, 0); ctx.fill(); });
    ctx.fillRect(x - 4 * s, y - 230 * s, 8 * s, 30 * s);
    [-1, 1].forEach(k => { const mx = x + k * 190 * s; ctx.fillRect(mx - 10 * s, y - 300 * s, 20 * s, 300 * s); ctx.fillRect(mx - 16 * s, y - 220 * s, 32 * s, 10 * s);
      ctx.beginPath(); ctx.moveTo(mx - 12 * s, y - 300 * s); ctx.lineTo(mx, y - 360 * s); ctx.lineTo(mx + 12 * s, y - 300 * s); ctx.fill(); });
  };
  mosque(240 + off, .8); mosque(720 + off, 1.05); mosque(1180 + off, .7);
  ctx.fillRect(-300, y, W + 600, 900); ctx.restore();
}
// ferman (açılan tomar). u: 0..1 açılma
function ferman(ctx, x, y, s, u) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const h = 40 + 520 * eOut(u);
  shape(ctx, [[-260, -h / 2], [260, -h / 2], [260, h / 2], [-260, h / 2]], '#f4e6c4', C.ink, 5, .5);
  const rows = Math.floor((h - 120) / 44);
  for (let i = 0; i < rows; i++) { const yy = -h / 2 + 150 + i * 44; const w = 200 - (i % 3) * 30; line(ctx, [[-w, yy], [w, yy + 3]], 'rgba(42,29,21,.55)', 5, .8); }
  // üst süsleme (tezhip bandı)
  if (h > 140) { shape(ctx, [[-200, -h / 2 + 30], [200, -h / 2 + 30], [200, -h / 2 + 100], [-200, -h / 2 + 100]], null, C.gold, 5, .3); for (let i = -3; i <= 3; i++) ell(ctx, i * 52, -h / 2 + 65, 14, 14, i % 2 ? C.gold : C.red, C.ink, 2); }
  [-1, 1].forEach(k => { shape(ctx, [[-280, k * h / 2 - 22], [280, k * h / 2 - 22], [280, k * h / 2 + 22], [-280, k * h / 2 + 22]], '#d8c39a', C.ink, 5, .4); ell(ctx, -284, k * h / 2, 12, 22, '#b89c6c', C.ink, 3); ell(ctx, 284, k * h / 2, 12, 22, '#b89c6c', C.ink, 3); });
  ctx.restore();
}
// terazi; tilt -1..1
function scale(ctx, x, y, s, tilt, left, right) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-90, 380], [90, 380], [60, 340], [-60, 340]], '#6e4a2c', C.ink, 5, .3);
  line(ctx, [[0, 340], [0, -10]], '#6e4a2c', 14, .3); ell(ctx, 0, -14, 16, 16, C.gold, C.ink, 4);
  const a = tilt * .22; const ex = Math.cos(a) * 260, ey = Math.sin(a) * 260;
  line(ctx, [[-ex, -14 - ey], [ex, -14 + ey]], '#8b6a45', 12, .3);
  [[-ex, -14 - ey, left], [ex, -14 + ey, right]].forEach(([px, py, fn]) => {
    line(ctx, [[px, py], [px - 80, py + 150]], C.ink, 3, .2); line(ctx, [[px, py], [px + 80, py + 150]], C.ink, 3, .2);
    ctx.beginPath(); ctx.moveTo(px - 100, py + 150); ctx.quadraticCurveTo(px, py + 210, px + 100, py + 150); ctx.closePath(); ctx.fillStyle = C.gold; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.stroke();
    if (fn) fn(px, py + 150);
  });
  ctx.restore();
}
// kaplumbağa (sırtında mum), ph: yürüme evresi
function turtle(ctx, x, y, s, ph, lt) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  [[-70, 1], [60, -1], [-40, -1], [40, 1]].forEach(([lx, k], i) => { const sw = Math.sin(ph + i * 1.6) * 12; ell(ctx, lx + sw, 22, 20, 16, '#7f9a5a', C.ink, 3); });
  shape(ctx, [[100, -10], [140, -24], [160, -10], [150, 8], [110, 10]], '#7f9a5a', C.ink, 4, .3);
  ell(ctx, 146, -12, 4, 4, C.ink, null);
  ctx.beginPath(); ctx.moveTo(-110, 14); ctx.quadraticCurveTo(0, -150, 110, 14); ctx.closePath(); ctx.fillStyle = '#6e5a2c'; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.stroke();
  [[-50, -20], [0, -40], [50, -20], [-20, -2], [24, -2]].forEach(([hx, hy]) => ell(ctx, hx, hy, 18, 13, '#8c7340', 'rgba(42,29,21,.6)', 3));
  shape(ctx, [[-12, -64], [12, -64], [12, -150], [-12, -150]], '#f6f1e6', C.ink, 3, .3);
  const f = 1 + Math.sin(lt * 18 + x) * .15;
  const g = ctx.createRadialGradient(0, -175, 4, 0, -175, 90); g.addColorStop(0, 'rgba(255,220,130,.55)'); g.addColorStop(1, 'rgba(255,220,130,0)'); ctx.fillStyle = g; ctx.fillRect(-100, -270, 200, 200);
  shape(ctx, [[-9, -152], [-6, -170 * f], [0, -190 * f], [6, -170 * f], [9, -152]], '#f8c84a', '#e0572b', 3, .4);
  ctx.restore();
}
// kandil (cam kandil), fl: titreşim
function kandil(ctx, x, y, s, lt, i = 0) {
  const f = .75 + .25 * Math.sin(lt * 13 + i * 2.1);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const g = ctx.createRadialGradient(0, 0, 4, 0, 0, 110); g.addColorStop(0, `rgba(255,214,120,${.55 * f})`); g.addColorStop(1, 'rgba(255,214,120,0)'); ctx.fillStyle = g; ctx.fillRect(-120, -120, 240, 240);
  ell(ctx, 0, 6, 26, 20, 'rgba(220,240,240,.55)', C.ink, 3);
  shape(ctx, [[-4, -2], [0, -26 * f], [4, -2]], '#f8d25a', '#e0572b', 2, .3);
  ctx.restore();
}
function rosette(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-30, 20], [-46, 120], [-20, 104], [-6, 130], [-2, 20]], C.red, C.ink, 3, .3); shape(ctx, [[30, 20], [46, 120], [20, 104], [6, 130], [2, 20]], C.red, C.ink, 3, .3);
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ell(ctx, Math.cos(a) * 46, Math.sin(a) * 46, 18, 18, C.gold, C.ink, 3); }
  ell(ctx, 0, 0, 44, 44, C.gold, C.ink, 4); ell(ctx, 0, 0, 30, 30, C.red, C.ink, 3);
  ctx.restore();
}
function garden(ctx, lt, n, y0, gp = 1, s = .9) {
  for (let i = 0; i < n; i++) { const x = 90 + i * (800 / (n - 1)); tulip(ctx, x, y0 + (i % 2) * 40, s, TCOL[i % TCOL.length], Math.sin(lt * 2.4 + i), gp * 1.6 - i * .05); }
}
function petals(ctx, lt, n = 12, col = C.red) {
  for (let i = 0; i < n; i++) { const k = (lt * .25 + hash(i)) % 1; const x = lerp(-80, W + 80, k) + Math.sin(lt * 2 + i) * 40; const y = 260 + hash(i + 7) * 900 + Math.sin(lt * 3 + i) * 30;
    ctx.save(); ctx.translate(x, y); ctx.rotate(lt * 2 + i); ctx.globalAlpha = .85; shape(ctx, [[0, 14], [-9, 0], [0, -22], [9, 0]], TCOL[i % 4], C.ink, 2, .2); ctx.restore(); }
}

function coinFlat(ctx, x, y, s) { ell(ctx, x, y + 6 * s, 40 * s, 13 * s, '#a87a1a', C.ink, 3); ell(ctx, x, y, 40 * s, 13 * s, C.gold, C.ink, 3); }
const SCENES = [
  { s: 0, e: 2.85, draw(ctx, lt, d) { // HOOK
    ctx.save(); hookCard(ctx, lt, d, 'Bir çiçek soğanı için ferman!', 'Lale Devri'); ctx.restore();
    bulb(ctx, CX, 1250, 1.05 + Math.sin(lt * 6) * .04, Math.sin(lt * 5) * .25, .8);
  } },
  { s: 2.85, e: 5.1, draw(ctx, lt, d) { // Lale Devri
    bg(ctx, '#e8dcc0'); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    const sky = ctx.createRadialGradient(CX, 900, 50, CX, 900, 700); sky.addColorStop(0, 'rgba(255,225,150,.45)'); sky.addColorStop(1, 'rgba(255,225,150,0)'); ctx.fillStyle = sky; ctx.fillRect(-200, 200, W + 400, 1400);
    shape(ctx, [[-200, 1220], [W + 200, 1220], [W + 200, 2200], [-200, 2200]], '#8b7a4a', C.ink, 5, 1);
    for (let i = 0; i < 7; i++) tulip(ctx, 110 + i * 130, 1230 + (i % 2) * 30, 1.05 - (i % 2) * .15, TCOL[i % TCOL.length], Math.sin(lt * 2.6 + i), prog(lt, i * .1, 1.0));
    bigText(ctx, 'LALE DEVRİ', CX, 400, 120, C.red, lt, .05, F_SERIF, [C.cream, 10]);
    tag(ctx, 'III. AHMED DÖNEMİ', CX, 545, 46, lt, .5, C.ink);
  } },
  { s: 5.1, e: 8.75, draw(ctx, lt, d) { // 1718–1730, İstanbul
    const g = ctx.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, '#e9b07a'); g.addColorStop(1, '#f6dcae'); ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400);
    camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    ell(ctx, 760, 600, 110, 110, '#f7e2a6', null);
    ctx.save(); ctx.translate(-lt * 30, 0); skyline(ctx, 1130, '#4a3226'); ctx.restore();
    ctx.fillStyle = '#4a3226'; ctx.fillRect(-300, 1130, W + 600, 900);
    for (let i = 0; i < 5; i++) line(ctx, [[120 + i * 170 - (lt * 40) % 170, 1180 + i % 2 * 30], [190 + i * 170 - (lt * 40) % 170, 1180 + i % 2 * 30]], 'rgba(243,233,210,.35)', 4, .3);
    petals(ctx, lt, 14);
    sealPro(ctx, '1718–1730', 'Lale Devri', CX - 90, 450, 175, C.red, lt, 0);
    tag(ctx, 'İSTANBUL', CX, 1250, 64, lt, 1.4, C.cream, C.ink);
    tag(ctx, 'HERKESİN AKLI LALEDE', CX, 720, 50, lt, 2.4, C.red);
  } },
  { s: 8.75, e: 10.95, draw(ctx, lt, d) { // yarışmalar
    bg(ctx, '#e2cfa6'); camera(ctx, lt, d, 1.05, 1, W / 2, 950);
    shape(ctx, [[-100, 1120], [W + 100, 1120], [W + 100, 1190], [-100, 1190]], '#8b6a45', C.ink, 6, .6);
    [[260, '#2d5a7a', C.red], [CX, '#7a3b26', C.gold], [740, '#2f6b4f', '#8e3b8c']].forEach(([x, vc, tc], i) => {
      const k = i === 1 ? 1.15 : .95; tulip(ctx, x, 1120 - 170 * k, k, tc, Math.sin(lt * 3 + i), 1, 220); vase(ctx, x, 1120, k, vc);
      text(ctx, String(i + 1), x, 1155, 40, C.cream);
    });
    const p = eInOut(prog(lt, .5, 1.1)); const rx = lerp(150, CX + 70, p), ry = lerp(300, 930, p) - Math.sin(p * Math.PI) * 120;
    rosette(ctx, rx, ry, .9, lt * 4 * (1 - p) + Math.sin(lt * 6) * .1);
    tag(ctx, 'YENİ TÜRLER İÇİN', CX, 330, 52, lt, 0, C.ink);
    stampBox(ctx, 'YARIŞMALAR', CX, 480, 78, C.red, lt, .35, -4);
  } },
  { s: 10.95, e: 14.1, draw(ctx, lt, d) { // 839 tür
    bg(ctx, '#e8dcc0'); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    const cols = 7, rows = 5; const n = Math.min(cols * rows, Math.floor(prog(lt, .1, 2.2) * cols * rows));
    for (let i = 0; i < cols * rows; i++) { const c = i % cols, r = Math.floor(i / cols); const x = 110 + c * 128 + (r % 2) * 30, y = 820 + r * 115;
      if (i < n || i === n) tulip(ctx, x, y, .42, TCOL[(i * 7) % TCOL.length], Math.sin(lt * 3 + i), i < n ? 1 : (prog(lt, .1, 2.2) * cols * rows) % 1, 220); }
    const cnt = Math.round(839 * eOut(prog(lt, .1, 2.3)));
    ctx.save(); tornRect(ctx, CX - 260, 380, 520, 260, C.cream, 9); ctx.restore();
    bigText(ctx, String(cnt), CX, 490, 170, C.red, lt, 0, F_SANS, [C.ink, 10]);
    text(ctx, 'LALE ÇEŞİDİ', CX, 600, 46, C.ink);
  } },
  { s: 14.1, e: 16.85, draw(ctx, lt, d) { // asıl servet soğanda
    bg(ctx, '#ddc89c'); shake(ctx, lt, 2.05, 12); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    const fade = 1 - .55 * prog(lt, 1.2, .5);
    ctx.save(); ctx.globalAlpha = fade; tulip(ctx, 270, 1200, 1.0, C.red, Math.sin(lt * 2.5), 1); ctx.restore();
    const xp = eOut(prog(lt, 1.3, .4)); if (xp > 0) { line(ctx, partial([[150, 700], [390, 1150]], xp), C.red, 16, .5); line(ctx, partial([[390, 700], [150, 1150]], xp), C.red, 16, .5); }
    tag(ctx, 'ÇİÇEK DEĞİL', 270, 1270, 48, lt, 1.3, C.ink);
    const bp = eBack(prog(lt, .5, .5)); if (bp > 0) { bulb(ctx, 700, 1080, 1.4 * bp, Math.sin(lt * 4) * .15, 1);
      for (let i = 0; i < 6; i++) { const a = lt * 2.2 + i / 6 * Math.PI * 2; coin(ctx, 700 + Math.cos(a) * 200, 990 + Math.sin(a) * 70, .6 * bp, lt * 6 + i); } }
    tag(ctx, 'ASIL SERVET', CX, 360, 66, lt, 0, C.ink);
    stampBox(ctx, 'SOĞAN!', 700, 1280, 70, C.red, lt, 2.0, -5);
  } },
  { s: 16.85, e: 18.75, draw(ctx, lt, d) { // fiyatlar yükseldi
    bg(ctx, '#e8dcc0'); camera(ctx, lt, d, 1, 1.1, 300, 1000);
    line(ctx, [[150, 1250], [150, 450]], C.ink, 7, .5); line(ctx, [[150, 1250], [900, 1250]], C.ink, 7, .5);
    const pts = [[160, 1200], [300, 1150], [420, 1080], [520, 1000], [620, 860], [720, 700], [820, 470]];
    arrow(ctx, pts, eInOut(prog(lt, 0, 1.6)), C.red, 14);
    for (let i = 0; i < 5; i++) { const h = Math.floor(clamp(lt * 4 - i * .6) * (3 + i * 2)); for (let k = 0; k < h; k++) coinFlat(ctx, 260 + i * 130, 1225 - k * 18, .9); }
    bulb(ctx, 840, 420 + Math.sin(lt * 5) * 10, .55, Math.sin(lt * 4) * .2, .7);
    tag(ctx, 'FİYATLAR UÇTU', CX, 330, 62, lt, .2, C.red);
  } },
  { s: 18.75, e: 21.65, draw(ctx, lt, d) { // 1722 ferman
    bg(ctx, '#ddc89c'); shake(ctx, lt, 2.1, 16); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    ferman(ctx, CX, 860, 1.2, prog(lt, .1, 1.1));
    sealPro(ctx, 'FERMAN', 'Devlet-i Aliyye', CX + 10, 1040, 120, C.red, lt, 1.9, '1722', -8);
    tag(ctx, '1722', CX, 330, 70, lt, 0, C.ink);
  } },
  { s: 21.65, e: 24.8, draw(ctx, lt, d) { // narh = tavan fiyat
    bg(ctx, '#e8dcc0'); shake(ctx, lt, 1.0, 18); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    const ceil = 640; const drop = eOut(prog(lt, .7, .3)); const cy = lerp(220, ceil, drop);
    const rise = Math.max(lerp(1240, 470, eInOut(prog(lt, 0, 1.4))), cy + 40);
    for (let y = 1240, k = 0; y > rise; y -= 24, k++) coinFlat(ctx, CX - 120, y, 1.4);
    bulb(ctx, CX + 150, 1240, 1.0, Math.sin(lt * 5) * .12, .5);
    const bounce = lt > 1.0 ? Math.sin((lt - 1) * 22) * 8 * Math.max(0, 1 - (lt - 1) * 2) : 0;
    shape(ctx, [[140, cy - 24 + bounce], [860, cy - 24 + bounce], [860, cy + 24 + bounce], [140, cy + 24 + bounce]], C.red, C.ink, 6, .6);
    for (let i = 0; i < 8; i++) line(ctx, [[180 + i * 90, cy - 24 + bounce], [210 + i * 90, cy - 70 + bounce]], C.ink, 5, .3);
    tag(ctx, 'TAVAN', 760, cy + 75 + bounce, 46, lt, .9, C.ink);
    stampBox(ctx, 'NARH', CX, 380, 110, C.red, lt, 1.1, -6, 'tavan fiyat');
  } },
  { s: 24.8, e: 27.2, draw(ctx, lt, d) { // pahalıya satan cezalandırılır
    bg(ctx, '#ddc89c'); shake(ctx, lt, 1.25, 16); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    const tilt = Math.sin(lt * 3.2) * .6 * (1 - prog(lt, 1.1, .3)) + .8 * prog(lt, 1.1, .3);
    scale(ctx, CX, 750, 1.15, tilt, (x, y) => bulb(ctx, x, y - 6, .55, 0), (x, y) => { for (let i = 0; i < 5; i++) coinFlat(ctx, x - 40 + (i % 3) * 40, y - 14 - Math.floor(i / 3) * 14, .55); });
    tag(ctx, 'DAHA PAHALIYA SATAN', CX, 330, 54, lt, 0, C.ink);
    stampBox(ctx, 'CEZA!', CX, 1260, 110, C.red, lt, 1.15, -7);
  } },
  { s: 27.2, e: 29.4, draw(ctx, lt, d) { // Şeyh Mehmed Lâlezârî
    bg(ctx, '#e2cfa6'); camera(ctx, lt, d, 1, 1.06, W / 2, 850);
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = C.gold; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .25; ctx.beginPath(); ctx.moveTo(CX, 820); ctx.arc(CX, 820, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    const p = eBack(prog(lt, 0, .45)); if (p > 0) alim(ctx, CX - 60, 900 + (1 - p) * 160, 1.2 * p, { robe: '#7a3b26' });
    tulip(ctx, 790, 1260, .8, C.red, Math.sin(lt * 3), 1);
    quill(ctx, 300 + Math.sin(lt * 8) * 24, 1210 + Math.cos(lt * 11) * 10, 1.0, -.4);
    tag(ctx, 'ŞEYH MEHMED LÂLEZÂRÎ', CX, 1300, 56, lt, .3, C.red, C.cream, 2);
    tag(ctx, 'MÎZÂNÜ\'L-EZHÂR', CX, 330, 50, lt, .9, C.ink);
  } },
  { s: 29.4, e: 31.45, draw(ctx, lt, d) { // ideal lale ölçüsü
    bg(ctx, '#f0e4c8'); camera(ctx, lt, d, 1, 1.08, W / 2, 850);
    ctx.save(); ctx.strokeStyle = 'rgba(62,95,138,.25)'; ctx.lineWidth = 2; for (let x = 100; x < 940; x += 60) { ctx.beginPath(); ctx.moveTo(x, 400); ctx.lineTo(x, 1300); ctx.stroke(); } for (let y = 400; y < 1320; y += 60) { ctx.beginPath(); ctx.moveTo(100, y); ctx.lineTo(920, y); ctx.stroke(); } ctx.restore();
    const gp = prog(lt, 0, 1.3); tulip(ctx, CX, 1280, 2.0, C.red, Math.sin(lt * 2) * .3, gp, 260);
    const mp = eOut(prog(lt, 1.0, .6)); if (mp > 0) { line(ctx, partial([[CX + 230, 770], [CX + 230, 450]], mp), C.blue, 6, .3); line(ctx, [[CX + 210, 770], [CX + 250, 770]], C.blue, 6, .3); if (mp >= 1) line(ctx, [[CX + 210, 450], [CX + 250, 450]], C.blue, 6, .3); }
    ctx.save(); ctx.setLineDash([16, 12]); const ap = eInOut(prog(lt, 1.0, .8)); if (ap > 0) { ctx.beginPath(); ctx.ellipse(CX, 610, 175, 220, 0, -Math.PI / 2, -Math.PI / 2 + ap * Math.PI * 2); ctx.strokeStyle = C.blue; ctx.lineWidth = 5; ctx.stroke(); } ctx.restore();
    tag(ctx, 'DEĞERLİ BİR LALE NASIL OLMALI?', CX, 330, 48, lt, 0, C.ink);
  } },
  { s: 31.45, e: 33.55, draw(ctx, lt, d) { // ~20 özellik
    bg(ctx, '#ddc89c'); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    ctx.save(); tornRect(ctx, 110, 420, 560, 880, '#f6ecd4', 31); ctx.restore();
    const n = Math.min(20, Math.floor(prog(lt, .05, 1.6) * 20) + 1);
    for (let i = 0; i < 10; i++) for (let c = 0; c < 2; c++) { const k = c * 10 + i; if (k >= n) continue; const x = 160 + c * 260, y = 480 + i * 80;
      shape(ctx, [[x, y - 22], [x + 44, y - 22], [x + 44, y + 22], [x, y + 22]], null, C.ink, 3, .3);
      line(ctx, [[x + 8, y], [x + 20, y + 14], [x + 42, y - 18]], C.red, 7, .4);
      line(ctx, [[x + 60, y], [x + 200 - (k % 3) * 30, y + 2]], 'rgba(42,29,21,.5)', 5, .6); }
    quill(ctx, 160 + ((n - 1) >= 10 ? 260 : 0) + 210, 480 + ((n - 1) % 10) * 80 + 10, .8, .5);
    tulip(ctx, 800, 1280, .9, C.red, Math.sin(lt * 3), 1);
    bigText(ctx, String(n), 800, 560, 150, C.red, lt, 0, F_SANS, [C.ink, 10]);
    tag(ctx, 'ÖZELLİK', 800, 690, 46, lt, .1, C.ink);
    tag(ctx, 'YAKLAŞIK', 800, 430, 38, lt, .1, C.red);
  } },
  { s: 33.55, e: 36.3, draw(ctx, lt, d) { // gece eğlenceleri, kandiller
    ctx.drawImage(paperTex('#1f2a3e', 'night'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 1000);
    ell(ctx, 760, 470, 80, 80, '#f3e6b8', null); ell(ctx, 790, 450, 70, 70, '#1f2a3e', null);
    for (let i = 0; i < 18; i++) { const tw = .4 + .6 * Math.abs(Math.sin(lt * 3 + i)); ctx.globalAlpha = tw; ell(ctx, 100 + hash(i) * 820, 300 + hash(i + 3) * 400, 3, 3, '#fff6d8', null); } ctx.globalAlpha = 1;
    shape(ctx, [[-200, 1180], [W + 200, 1180], [W + 200, 2200], [-200, 2200]], '#2c3a2a', null);
    for (let i = 0; i < 7; i++) { const x = 100 + i * 130; tulip(ctx, x, 1200 + (i % 2) * 40, .85, TCOL[i % 4], Math.sin(lt * 2 + i), 1); }
    for (let i = 0; i < 6; i++) { const p = prog(lt, .2 + i * .15, .3); if (p > 0) { ctx.globalAlpha = p; kandil(ctx, 165 + i * 130, 1130 + (i % 2) * 40, 1, lt, i); ctx.globalAlpha = 1; } }
    tag(ctx, 'LALE BAHÇELERİNDE', CX, 760, 56, lt, 0, C.gold, C.ink);
    tag(ctx, 'GECE EĞLENCELERİ', CX, 880, 52, lt, .4, C.cream, C.ink, 2);
  } },
  { s: 36.3, e: 38.85, draw(ctx, lt, d) { // kaplumbağaların sırtında mumlar
    ctx.drawImage(paperTex('#1f2a3e', 'night'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    shape(ctx, [[-200, 1080], [W + 200, 1080], [W + 200, 2200], [-200, 2200]], '#3a4a32', null);
    for (let i = 0; i < 6; i++) { const x = 100 + i * 165; tulip(ctx, x, 1020, .62, TCOL[i % 4], Math.sin(lt * 2 + i), 1); }
    [[0, 1190, 1.3], [1, 1300, 1.1]].forEach(([k, y, s]) => { const x = ((k ? 820 : 120) + (k ? -1 : 1) * 0 + lt * 70 * (k ? -1 : 1)); ctx.save(); if (k) { ctx.translate(x, 0); ctx.scale(-1, 1); ctx.translate(-x, 0); } turtle(ctx, x, y, s, lt * 6 + k, lt); ctx.restore(); });
    turtle(ctx, 380 + lt * 55, 1110, .9, lt * 6 + 2, lt);
    tag(ctx, 'KAPLUMBAĞALARIN SIRTINDA', CX, 360, 52, lt, 0, C.gold, C.ink);
    tag(ctx, 'MUMLAR YANDI', CX, 500, 64, lt, .5, C.red, C.cream, 3);
  } },
  { s: 38.85, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = C.gold; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .2; ctx.beginPath(); ctx.moveTo(CX, 1000); ctx.arc(CX, 1000, 1100, a, a + .12); ctx.fill(); } ctx.restore();
    tulip(ctx, CX, 1330, 1.3, '#f0e4c8', Math.sin(lt * 2.2) * .6, 1, 240);
    bigText(ctx, 'BİR ÇİÇEĞİN FİYATINI', CX, 340, 64, C.cream, lt, .05, F_SANS, [C.ink, 10]);
    sealPro(ctx, 'Devlet belirledi', 'Lale Devri', CX, 590, 150, C.ink, lt, 1.4, '1722', -8);
  } },
];
