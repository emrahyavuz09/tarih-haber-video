// ===== Süleymaniye'nin is odası (sabah) =====
const KEY = ['SÜLEYMANİYE', 'SİNAN', 'KANDİL', 'KAPKARA', 'KUBBEYİ', 'HAVA', 'ODASI', 'MÜREKKEP', 'RİVAYETE', 'DUMAN', 'YAZIYA', 'HATTATIN'];
const DURATION = 45.33 + 2.2;
const OUTRO_AT = DURATION - 1.6;
const CX = 500; // güvenli alan ortası
const STONE = '#d9c9a3', STONE_D = '#bfa97c', LEAD = '#6f7f86';

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = CX, cy = 800) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
// ---- arka planlar ----
function sky(ctx, lt, a = '#e9d6ab', b = '#f4e7c8') {
  const g = ctx.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, a); g.addColorStop(1, b); ctx.fillStyle = g; ctx.fillRect(-400, -400, W + 800, H + 800);
  for (let i = 0; i < 4; i++) { const x = ((lt * 30 + i * 340) % 1500) - 250, y = 280 + (i % 2) * 120; ctx.globalAlpha = .5; ell(ctx, x, y, 110, 26, '#fff8e8', null); ell(ctx, x + 60, y - 18, 70, 24, '#fff8e8', null); }
  ctx.globalAlpha = 1;
}
function interior(ctx, lt, glow = 1) { // loş cami içi: sıcak duvar + sivri kemerler
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3a2a1e'); g.addColorStop(.6, '#5a4430'); g.addColorStop(1, '#2e2219'); ctx.fillStyle = g; ctx.fillRect(-400, -400, W + 800, H + 800);
  ctx.globalAlpha = .55;
  [[-60, 1500, 300], [380, 1500, 300], [820, 1500, 300]].forEach(([x, y, w]) => { shape(ctx, [[x, y], [x, y - 520], [x + w * .1, y - 640], [x + w / 2, y - 740], [x + w * .9, y - 640], [x + w, y - 520], [x + w, y]], '#4a3826', 'rgba(20,12,6,.6)', 5, .4); });
  ctx.globalAlpha = 1;
  if (glow) { const r = ctx.createRadialGradient(CX, 760, 40, CX, 760, 760); r.addColorStop(0, `rgba(255,200,110,${.32 * glow})`); r.addColorStop(1, 'rgba(255,200,110,0)'); ctx.fillStyle = r; ctx.fillRect(-400, -400, W + 800, H + 800); }
}
function water(ctx, y0, lt, col = '#86a9b3') {
  ctx.fillStyle = col; ctx.fillRect(-400, y0, W + 800, H);
  ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 4;
  for (let r = 0; r < 9; r++) for (let i = 0; i < 9; i++) { const x = ((i * 150 + r * 70 + lt * 40 * (r % 2 ? 1 : -1)) % 1500 + 1500) % 1500 - 200, y = y0 + 30 + r * 60; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 20, y - 10, x + 40, y); ctx.stroke(); }
}
// ---- figürler ----
function flame(ctx, x, y, s, lt, seed = 0) {
  const f = Math.sin(lt * 17 + seed) * .12 + Math.sin(lt * 29 + seed * 2) * .08;
  const g = ctx.createRadialGradient(x, y - 20 * s, 2, x, y - 20 * s, 90 * s); g.addColorStop(0, 'rgba(255,214,120,.55)'); g.addColorStop(1, 'rgba(255,214,120,0)');
  ctx.fillStyle = g; ctx.fillRect(x - 100 * s, y - 120 * s, 200 * s, 200 * s);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s * (1 + f)); ctx.rotate(f * .3);
  const tear = (w, h, c) => { ctx.beginPath(); ctx.moveTo(0, -h); ctx.bezierCurveTo(w * .7, -h * .45, w, -h * .1, 0, 0); ctx.bezierCurveTo(-w, -h * .1, -w * .7, -h * .45, 0, -h); ctx.fillStyle = c; ctx.fill(); };
  tear(18, 56, '#e2572b'); tear(12, 42, '#f09a2a'); tear(7, 26, '#fff0b0');
  ctx.restore();
}
function kandil(ctx, x, y, s, lt, lit = 1, seed = 0, chain = 220) { // asma cam kandil
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  [-34, 0, 34].forEach(dx => line(ctx, [[dx * .2, -chain], [dx, -40]], '#3a2c20', 3, .2));
  ell(ctx, 0, -chain, 8, 8, C.gold, C.ink, 2);
  // cam gövde
  ctx.beginPath(); ctx.moveTo(-46, -40); ctx.quadraticCurveTo(-56, 20, -20, 46); ctx.lineTo(20, 46); ctx.quadraticCurveTo(56, 20, 46, -40); ctx.closePath();
  ctx.fillStyle = 'rgba(214,232,214,.75)'; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.stroke();
  shape(ctx, [[-52, -48], [52, -48], [46, -36], [-46, -36]], C.gold, C.ink, 3, .3); // ağız halkası
  ell(ctx, 0, 14, 34, 12, 'rgba(205,160,60,.75)', null); // zeytinyağı
  ell(ctx, 0, 50, 12, 6, C.gold, C.ink, 2);
  ctx.restore();
  if (lit > 0) { ctx.save(); ctx.globalAlpha = lit; flame(ctx, x, y - 4 * s, s * .8, lt, seed); ctx.restore(); }
}
function soot(ctx, lt, x, y, n = 10, drift = 0, s = 1, col = 'rgba(30,24,20,.55)', speed = .5) { // yükselen kara is
  for (let i = 0; i < n; i++) {
    const t = (lt * speed + i / n) % 1; const wob = Math.sin(t * 7 + i) * 18 * s;
    const xx = x + wob + drift * t * t, yy = y - t * 300 * s; ctx.globalAlpha = Math.sin(t * Math.PI) * .9;
    ell(ctx, xx, yy, (10 + t * 34) * s, (8 + t * 26) * s, col, null);
  }
  ctx.globalAlpha = 1;
}
function avize(ctx, cx, cy, rx, n, lt) { // büyük kandil halkası
  [-1, 1].forEach(k => line(ctx, [[cx + k * rx * .9, cy - 2], [cx + k * 80, -200]], '#2a1d15', 4, .2));
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; if (Math.sin(a) < 0) kandil(ctx, cx + Math.cos(a) * rx, cy + Math.sin(a) * rx * .22 + 130, .55, lt, 1, i, 130); }
  ctx.beginPath(); ctx.ellipse(cx, cy, rx, rx * .22, 0, 0, 7); ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 14; ctx.stroke(); ctx.strokeStyle = C.gold; ctx.lineWidth = 5; ctx.stroke();
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; if (Math.sin(a) >= 0) kandil(ctx, cx + Math.cos(a) * rx, cy + Math.sin(a) * rx * .22 + 130, .6, lt, 1, i + 9, 130); }
}
function minaret(ctx, x, by, h, n) { // ince Osmanlı minaresi, n şerefe
  shape(ctx, [[x - 13, by], [x - 13, by - h], [x + 13, by - h], [x + 13, by]], STONE, C.ink, 4, .3);
  for (let i = 0; i < n; i++) { const y = by - h * (.45 + i * .22); shape(ctx, [[x - 22, y], [x + 22, y], [x + 18, y + 12], [x - 18, y + 12]], STONE_D, C.ink, 3, .2); }
  shape(ctx, [[x - 15, by - h], [x, by - h - 90], [x + 15, by - h]], LEAD, C.ink, 3, .2);
  line(ctx, [[x, by - h - 90], [x, by - h - 112]], C.gold, 4, .1);
}
function dome(ctx, cx, by, r, col = LEAD) {
  const p = []; for (let i = 0; i <= 24; i++) { const a = Math.PI + i / 24 * Math.PI; p.push([cx + Math.cos(a) * r, by + Math.sin(a) * r * .82]); }
  shape(ctx, p, col, C.ink, 4, .3); line(ctx, [[cx, by - r * .82], [cx, by - r * .82 - 30]], C.gold, 4, .1);
}
function suleymaniye(ctx, x, by, s) { // simetrik silüet: merkez kubbe, yarım kubbeler, 4 minare
  ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
  minaret(ctx, -330, 0, 380, 2); minaret(ctx, 330, 0, 380, 2); minaret(ctx, -250, 0, 500, 3); minaret(ctx, 250, 0, 500, 3);
  shape(ctx, [[-220, 0], [-220, -120], [220, -120], [220, 0]], STONE, C.ink, 5, .3);
  for (let i = -3; i <= 3; i++) { const wx = i * 56; shape(ctx, [[wx - 14, -30], [wx - 14, -70], [wx, -86], [wx + 14, -70], [wx + 14, -30]], '#5a4632', C.ink, 3, .2); }
  dome(ctx, -165, -120, 46); dome(ctx, 165, -120, 46);
  shape(ctx, [[-150, -120], [-150, -170], [150, -170], [150, -120]], STONE, C.ink, 5, .3);
  dome(ctx, -105, -170, 70); dome(ctx, 105, -170, 70);
  shape(ctx, [[-96, -170], [-96, -232], [96, -232], [96, -170]], STONE, C.ink, 5, .3);
  for (let i = -3; i <= 3; i++) ell(ctx, i * 24, -205, 6, 14, '#5a4632', null);
  dome(ctx, 0, -232, 132);
  ctx.restore();
}
function sinan(ctx, x, y, s, o = {}) { // Mimar Sinan (temsilî): büyük beyaz kavuk, kır sakal
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], '#4a5a3a', C.ink, 6);
  shape(ctx, [[-40, 52], [0, 150], [40, 52]], C.cream, C.ink, 5);
  line(ctx, [[-150, 200], [150, 200]], C.gold, 10);
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 66, 80, C.skin, C.ink, 6);
  ell(ctx, -66, -36, 11, 17, C.skin, C.ink, 4); ell(ctx, 66, -36, 11, 17, C.skin, C.ink, 4);
  const bl = o.blink ? .2 : 1; ell(ctx, -24, -46, 6, 7 * bl, C.ink, null); ell(ctx, 24, -46, 6, 7 * bl, C.ink, null);
  line(ctx, [[-42, -66], [-12, -64]], '#8a8580', 6); line(ctx, [[12, -64], [42, -66]], '#8a8580', 6);
  line(ctx, [[0, -40], [-5, -12], [6, -10]], C.ink, 4);
  shape(ctx, [[-62, -20], [-58, 30], [-34, 84], [0, 104], [34, 84], [58, 30], [62, -20], [38, 6], [0, 12], [-38, 6]], '#d8d4cc', C.ink, 4);
  shape(ctx, [[0, 6], [-36, 12], [-54, 26], [-28, 22], [0, 16], [28, 22], [54, 26], [36, 12]], '#c4bfb6', C.ink, 3);
  // büyük yuvarlak kavuk
  ell(ctx, 0, -150, 112, 82, '#f6f1e6', C.ink, 6);
  for (let i = -3; i <= 3; i++) line(ctx, [[i * 30 - 26, -222], [i * 30 + 26, -88]], 'rgba(42,29,21,.3)', 3);
  shape(ctx, [[-30, -226], [-24, -250], [24, -250], [30, -226]], '#4a5a3a', C.ink, 4, .3);
  ctx.restore();
}
function gonye(ctx, x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); shape(ctx, [[0, 0], [160, 0], [160, 26], [26, 26], [26, 160], [0, 160]], '#c9a46a', C.ink, 4, .2); for (let i = 1; i < 6; i++) line(ctx, [[i * 26, 0], [i * 26, 12]], C.ink, 3, 0); ctx.restore(); }
function pergel(ctx, x, y, s, open) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ell(ctx, 0, 0, 12, 12, C.gold, C.ink, 3); ctx.save(); ctx.rotate(open); line(ctx, [[0, 0], [0, 190]], '#5a4a3a', 9, 0); ctx.restore(); ctx.save(); ctx.rotate(-open); line(ctx, [[0, 0], [0, 190]], '#5a4a3a', 9, 0); ctx.restore(); ctx.restore(); }
function paper(ctx, x, y, w, h, rot = 0, col = '#f6eedb') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); shape(ctx, [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]], col, C.ink, 4, .4); ctx.restore(); }
function hokka(ctx, x, y, s) { // pirinç mürekkep hokkası (yuvarlak gövde, dar boyun)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(ctx, 0, 4, 120, 22, 'rgba(40,25,15,.35)', null);
  ctx.beginPath(); ctx.moveTo(-50, -150); ctx.bezierCurveTo(-60, -120, -130, -110, -128, -50); ctx.bezierCurveTo(-126, -5, -70, 2, 0, 2); ctx.bezierCurveTo(70, 2, 126, -5, 128, -50); ctx.bezierCurveTo(130, -110, 60, -120, 50, -150); ctx.closePath();
  ctx.fillStyle = '#b8892f'; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-60, -70, 22, 40, -.4, 0, 7); ctx.fillStyle = 'rgba(255,240,190,.45)'; ctx.fill();
  line(ctx, [[-122, -60], [122, -60]], '#7a5a1e', 5, .1);
  shape(ctx, [[-62, -150], [62, -150], [58, -170], [-58, -170]], '#d9a630', C.ink, 4, .1);
  ell(ctx, 0, -170, 58, 13, '#14100c', C.ink, 4);
  ctx.restore();
}
function kalem(ctx, x, y, s, rot) { // kamış kalem
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-8, 0], [8, 0], [10, -300], [-10, -300]], '#c79a5a', C.ink, 3, .2);
  shape(ctx, [[-8, 0], [8, 0], [2, 34], [-2, 34]], '#1a1410', C.ink, 2, .1);
  for (let i = 1; i < 4; i++) line(ctx, [[-9, -i * 75], [9, -i * 75]], '#8a6a3a', 3, .1);
  ctx.restore();
}
function inkStroke(ctx, pts, p, lw = 14) { // kalemle çekilen hat benzeri kalın-ince mürekkep çizgisi
  const q = partial(pts, p); if (q.length < 2) return;
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#1a1410';
  for (let i = 1; i < q.length; i++) { const dx = q[i][0] - q[i - 1][0], dy = q[i][1] - q[i - 1][1]; const ang = Math.atan2(dy, dx); ctx.lineWidth = lw * (.35 + .65 * Math.abs(Math.sin(ang - .6))); ctx.beginPath(); ctx.moveTo(...q[i - 1]); ctx.lineTo(...q[i]); ctx.stroke(); }
  ctx.restore();
  return q[q.length - 1];
}
function smooth(pts, n = 10) { const o = []; for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)]; for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t; o.push([0, 1].map(j => .5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3))); } } o.push(pts[pts.length - 1]); return o; }
function flowArrow(ctx, pts, lt, col = '#e8e0cc', lw = 10) { // akan, kesikli hava akımı
  ctx.save(); ctx.setLineDash([26, 18]); ctx.lineDashOffset = -lt * 120; line(ctx, pts, col, lw, .3); ctx.restore();
  const a = pts[pts.length - 2], b = pts[pts.length - 1]; const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  shape(ctx, [[b[0] + Math.cos(ang) * 26, b[1] + Math.sin(ang) * 26], [b[0] + Math.cos(ang + 2.4) * 26, b[1] + Math.sin(ang + 2.4) * 26], [b[0] + Math.cos(ang - 2.4) * 26, b[1] + Math.sin(ang - 2.4) * 26]], col, null);
}
function along(pts, t) { const q = partial(pts, clamp(t)); return q[q.length - 1] || pts[0]; }
function section(ctx, lt, o = {}) { // caminin kesit çizimi
  const by = 1250;
  shape(ctx, [[60, by], [60, 860], [940, 860], [940, by]], '#e8d9b6', C.ink, 6, .3);
  const dp = []; for (let i = 0; i <= 30; i++) { const a = Math.PI + i / 30 * Math.PI; dp.push([500 + Math.cos(a) * 300, 860 + Math.sin(a) * 300]); }
  shape(ctx, [...dp], '#e8d9b6', C.ink, 6, .3);
  ctx.save(); ctx.beginPath(); dp.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.clip();
  for (let i = 0; i < 16; i++) { const a = Math.PI + (i + .5) / 16 * Math.PI; line(ctx, [[500, 860], [500 + Math.cos(a) * 300, 860 + Math.sin(a) * 300]], 'rgba(122,59,38,.25)', 3, .1); }
  ctx.restore();
  for (let i = 0; i < 5; i++) shape(ctx, [[160 + i * 160 - 16, 860], [160 + i * 160 - 16, 800], [160 + i * 160, 784], [160 + i * 160 + 16, 800], [160 + i * 160 + 16, 860]], '#5a4632', C.ink, 3, .2);
  // giriş tarafı (sağ): kapı + üstünde küçük oda
  shape(ctx, [[860, by], [860, 1110], [890, 1070], [920, 1110], [920, by]], '#5a4632', C.ink, 4, .2);
  shape(ctx, [[830, 1040], [830, 930], [940, 930], [940, 1040]], o.room ? '#3a2e26' : '#cbb88f', C.ink, 5, .2);
  shape(ctx, [[0, by], [1080, by], [1080, by + 30], [0, by + 30]], '#a89060', C.ink, 4, .2);
}

const SCENES = [
  { s: 0, e: 2.95, draw(ctx, lt, d) { // HOOK — kubbe altında yüzlerce kandil, kubbeye yükselen is kıvrımları
    ctx.save();
    const z = lerp(1.45, 1.0, eOut(clamp(lt / .3))) + lt * .025; const ty = lerp(160, 0, eOut(clamp(lt / .5)));
    ctx.translate(CX, 1000 + ty); ctx.scale(z, z); ctx.translate(-CX, -1000);
    interior(ctx, lt, 1.2); ctx.translate(0, 170);
    // kubbe iç yüzeyi + pencere kuşağı
    ctx.save(); ctx.beginPath(); ctx.ellipse(CX, 720, 620, 760, 0, Math.PI, 0); ctx.closePath();
    const dg = ctx.createRadialGradient(CX, 260, 30, CX, 600, 640); dg.addColorStop(0, '#6a5038'); dg.addColorStop(1, '#2c2018'); ctx.fillStyle = dg; ctx.fill();
    ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.stroke(); ctx.restore();
    for (let i = 1; i < 12; i++) { const a = Math.PI + (i + .5) / 13 * Math.PI; const wx = CX + Math.cos(a) * 560, wy = 720 + Math.sin(a) * 540 * .12 + 0;
      const ww = 22, wh = 46; shape(ctx, [[wx - ww, wy], [wx - ww, wy - wh], [wx, wy - wh - 18], [wx + ww, wy - wh], [wx + ww, wy]], '#f6dfa0', C.ink, 3, .2); }
    line(ctx, [[CX - 620, 720], [CX + 620, 720]], '#3a2a1a', 14, .2);
    // yükselen is kıvrımları (kubbeye doğru)
    [[250, 980], [420, 1010], [580, 1010], [750, 980], [330, 870], [670, 870]].forEach(([x, y], i) => soot(ctx, lt + i * .3, x, y, 7, (CX - x) * .5, 1.25, 'rgba(22,16,12,.5)', .55));
    // uzak ve yakın kandil halkaları
    ctx.save(); ctx.globalAlpha = .85; avize(ctx, CX, 760, 270, 14, lt); ctx.restore();
    avize(ctx, CX, 930, 420, 18, lt + 1);
    ctx.restore();
    hookText(ctx, lt + .6, 'Bu camide, kandillerin isi bile boşa gitmedi!', { style: 'marker', key: 'İS', y: 410, size: 84 });
  } },
  { s: 2.95, e: 5.05, draw(ctx, lt, d) { // İstanbul, Süleymaniye
    camera(ctx, lt, d, 1, 1.08, CX, 900); sky(ctx, lt, '#e7cf9f', '#f4e4c0');
    const sun = ctx.createRadialGradient(780, 420, 10, 780, 420, 260); sun.addColorStop(0, 'rgba(255,205,110,.9)'); sun.addColorStop(1, 'rgba(255,205,110,0)'); ctx.fillStyle = sun; ctx.fillRect(400, 100, 760, 640);
    shape(ctx, [[-300, 1120], [-100, 1010], [200, 960], [500, 945], [800, 965], [1100, 1020], [1400, 1100], [1400, 1300], [-300, 1300]], '#b49c6c', C.ink, 5, .6);
    for (let i = 0; i < 14; i++) { const hx = -60 + i * 90, hy = 1060 + (i % 3) * 30; shape(ctx, [[hx, hy], [hx, hy - 40], [hx + 30, hy - 62], [hx + 60, hy - 40], [hx + 60, hy]], i % 2 ? '#c99a6a' : '#d8b98a', C.ink, 3, .3); }
    water(ctx, 1200, lt);
    const p = eOut(prog(lt, 0, .7)); suleymaniye(ctx, CX, 960 + (1 - p) * 60, 1.05);
    for (let i = 0; i < 3; i++) { const t = (lt * .35 + i * .33) % 1; const gx = -100 + t * 1300, gy = 520 + i * 60 + Math.sin(t * 20) * 10; line(ctx, [[gx - 22, gy - 8], [gx, gy], [gx + 22, gy - 8]], C.ink, 4, .2); }
    tag(ctx, 'İSTANBUL', CX, 260, 54, lt, 0, C.red);
    tag(ctx, 'SÜLEYMANİYE CAMİİ', CX, 1300, 60, lt, .9, C.ink, C.cream, 2);
  } },
  { s: 5.05, e: 7.95, draw(ctx, lt, d) { // Mimar Sinan, 1557
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 900);
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = C.gold;
    for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .25; ctx.beginPath(); ctx.moveTo(CX, 980); ctx.arc(CX, 980, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    const pg = eInOut(prog(lt, .1, 2.4));
    pergel(ctx, 160, 420, 1.1, .25 + Math.sin(lt * 2) * .08); gonye(ctx, 760, 900, 1.0, -.2 + Math.sin(lt * 1.5) * .05);
    const p = eBack(prog(lt, .05, .5)); if (p > 0) sinan(ctx, CX, 1000 + (1 - p) * 140, 1.0 * p, { blink: (lt % 2.2) > 2.05 });
    sealPro(ctx, '1557', 'Süleymaniye Camii', 720, 450, 145, C.red, lt, 1.4, 'TAMAMLANDI');
    tag(ctx, 'MİMAR SİNAN', CX, 1290, 64, lt, .3, C.red, C.cream, 2);
    void pg;
  } },
  { s: 7.95, e: 11.1, draw(ctx, lt, d) { // yüzlerce kandil
    interior(ctx, lt); camera(ctx, lt, d, 1, 1.1, CX, 760);
    avize(ctx, CX, 700, 380, 16, lt);
    avize(ctx, CX, 380, 230, 10, lt + .7);
    tag(ctx, 'YÜZLERCE KANDİL', CX, 1250, 64, lt, .5, C.gold, C.ink, 2);
  } },
  { s: 11.1, e: 14.55, draw(ctx, lt, d) { // her kandil kapkara is
    interior(ctx, lt, .6); camera(ctx, lt, d, 1, 1.12, CX, 1000);
    kandil(ctx, CX, 1120, 2.4, lt, 1, 3, 260);
    soot(ctx, lt, CX, 960, 16, 60, 2.0, 'rgba(18,12,10,.7)', .55);
    soot(ctx, lt + .4, CX + 10, 960, 10, -80, 1.6, 'rgba(40,32,28,.55)', .5);
    tag(ctx, 'KAPKARA İS', CX, 320, 90, lt, 1.4, C.red, C.cream, -4);
  } },
  { s: 14.55, e: 18.05, draw(ctx, lt, d) { // kubbe kararabilirdi
    interior(ctx, lt, .5); camera(ctx, lt, d, 1, 1.05, CX, 800);
    const cx = CX, cy = 900, r = 420;
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 0); ctx.closePath(); ctx.fillStyle = '#efe2c2'; ctx.fill(); ctx.clip();
    for (let i = 0; i < 24; i++) { const a = Math.PI + (i + .5) / 24 * Math.PI; line(ctx, [[cx, cy], [cx + Math.cos(a) * r, cy + Math.sin(a) * r]], 'rgba(122,59,38,.35)', 4, .1); }
    [120, 220, 320].forEach((rr, k) => { ctx.beginPath(); ctx.arc(cx, cy, rr, Math.PI, 0); ctx.strokeStyle = k === 1 ? C.red : '#3e5f8a'; ctx.lineWidth = 12; ctx.stroke(); });
    for (let i = 0; i < 10; i++) { const a = Math.PI + (i + .5) / 10 * Math.PI; ell(ctx, cx + Math.cos(a) * 270, cy + Math.sin(a) * 270, 14, 14, C.gold, C.ink, 3); }
    const k = eInOut(prog(lt, .4, 2.6)); // is yayılıyor
    const g = ctx.createRadialGradient(cx, cy - r, 20, cx, cy - r * .4, r * 1.2); g.addColorStop(0, `rgba(25,18,14,${.85 * k})`); g.addColorStop(1, `rgba(25,18,14,${.25 * k})`);
    ctx.fillStyle = g; ctx.fillRect(cx - r, cy - r, r * 2, r); ctx.restore();
    ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 0); ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.stroke();
    shape(ctx, [[cx - r - 20, cy], [cx + r + 20, cy], [cx + r + 20, cy + 26], [cx - r - 20, cy + 26]], STONE_D, C.ink, 4, .2);
    [260, 500, 740].forEach((x, i) => { kandil(ctx, x, 1180, .9, lt, 1, i, 200); soot(ctx, lt + i * .3, x, 1110, 8, 0, 1.2, 'rgba(18,12,10,.55)', .6); });
    tag(ctx, 'KUBBE VE SÜSLEMELER', CX, 300, 56, lt, 0, C.ink);
    tag(ctx, 'KARARABİLİRDİ', CX, 1290, 66, lt, 1.9, C.red, C.cream, -3);
  } },
  { s: 18.05, e: 20.4, draw(ctx, lt, d) { // çözüm: hava
    sky(ctx, lt, '#d8e3df', '#eef0e2'); camera(ctx, lt, d, 1, 1.07, CX, 900);
    for (let i = 0; i < 6; i++) { const y = 420 + i * 140; const off = ((lt * 260 + i * 170) % 1400) - 300; const pts = []; for (let k = 0; k <= 20; k++) pts.push([off + k * 22, y + Math.sin(k * .5 + lt * 4 + i) * 22]); line(ctx, pts, 'rgba(90,120,130,.7)', 8, .2); ell(ctx, off + 440, y + Math.sin(10 + lt * 4 + i) * 22, 14, 14, null, 'rgba(90,120,130,.7)', 6); }
    const p = eBack(prog(lt, 0, .45)); if (p > 0) sinan(ctx, CX, 1020, .95 * p);
    stampBox(ctx, 'ÇÖZÜM: HAVA', CX, 330, 96, C.red, lt, 1.0, -6);
  } },
  { s: 20.4, e: 24.0, draw(ctx, lt, d) { // hava akımı dumanı tek yöne taşıyor (kesit)
    ctx.drawImage(paperTex('#e2d3ae', 'plain2'), 0, 0); camera(ctx, lt, d, 1, 1.05, CX, 1000);
    ctx.translate(CX, 1050); ctx.scale(.86, .86); ctx.translate(-CX, -1050);
    section(ctx, lt);
    const lamps = [280, 420, 580, 720];
    lamps.forEach((x, i) => kandil(ctx, x, 1100, .55, lt, 1, i, 120));
    const path = smooth([[280, 1040], [380, 900], [560, 820], [760, 900], [880, 980]], 12);
    flowArrow(ctx, path, lt, '#7a9aa6', 9);
    for (let i = 0; i < 14; i++) { const t = (lt * .35 + i / 14) % 1; const q = along(path, t); ctx.globalAlpha = .75; ell(ctx, q[0] + Math.sin(i) * 14, q[1] + Math.cos(i * 2) * 10, 16, 12, 'rgba(25,18,14,.8)', null); }
    ctx.globalAlpha = 1;
    tag(ctx, 'HAVA AKIMI', CX, 300, 70, lt, 0, '#3e5f8a');
    tag(ctx, 'TEK BİR YÖNE', CX, 460, 54, lt, 1.2, C.ink);
  } },
  { s: 24.0, e: 26.22, draw(ctx, lt, d) { // ana kapının üstündeki oda
    sky(ctx, lt); camera(ctx, lt, d, 1, 1.1, 500, 760);
    shape(ctx, [[60, 1400], [60, 500], [940, 500], [940, 1400]], STONE, C.ink, 6, .3);
    for (let r = 0; r < 9; r++) line(ctx, [[60, 560 + r * 96], [940, 560 + r * 96]], 'rgba(122,100,60,.35)', 3, .1);
    // taç kapı
    shape(ctx, [[230, 1400], [230, 760], [770, 760], [770, 1400]], '#e8d9b6', C.ink, 6, .2);
    shape(ctx, [[320, 1400], [320, 1040], [360, 960], [500, 900], [640, 960], [680, 1040], [680, 1400]], '#c9b384', C.ink, 5, .2);
    for (let r = 0; r < 4; r++) for (let c = 0; c <= r; c++) { const x = 500 + (c - r / 2) * 70, y = 920 + r * 44; shape(ctx, [[x - 30, y + 40], [x - 30, y + 14], [x, y], [x + 30, y + 14], [x + 30, y + 40]], '#ddca9c', 'rgba(42,29,21,.6)', 3, .1); }
    shape(ctx, [[390, 1400], [390, 1150], [440, 1100], [500, 1085], [560, 1100], [610, 1150], [610, 1400]], '#4a3826', C.ink, 5, .2);
    // üstte oda penceresi
    const k = .6 + Math.sin(lt * 6) * .2;
    shape(ctx, [[420, 700], [420, 600], [580, 600], [580, 700]], `rgba(40,30,24,${k})`, C.ink, 5, .2);
    for (let i = 0; i < 3; i++) line(ctx, [[450 + i * 50, 600], [450 + i * 50, 700]], C.ink, 4, .1);
    for (let i = 0; i < 10; i++) { const t = (lt * .6 + i / 10) % 1; ctx.globalAlpha = (1 - t) * .8; ell(ctx, lerp(150 + (i % 3) * 300, 500, t), lerp(1150, 650, t), 14 * (1 - t) + 6, 10 * (1 - t) + 5, 'rgba(25,18,14,.9)', null); }
    ctx.globalAlpha = 1;
    pin(ctx, 500, 590, 1.2, lt, .5, C.red);
    tag(ctx, 'ANA KAPININ ÜSTÜ', CX, 300, 62, lt, .1, C.ink);
  } },
  { s: 26.22, e: 28.12, draw(ctx, lt, d) { // İS ODASI
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); camera(ctx, lt, d, 1.04, 1, CX, 900); shake(ctx, lt, .45, 14);
    // oda kesiti: duvarlarda biriken is
    shape(ctx, [[160, 1280], [160, 620], [840, 620], [840, 1280]], '#e8d9b6', C.ink, 7, .2);
    const k = eOut(prog(lt, 0, 1.6));
    ctx.save(); ctx.beginPath(); ctx.rect(160, 620, 680, 660); ctx.clip();
    const g = ctx.createLinearGradient(0, 620, 0, 1280); g.addColorStop(0, `rgba(20,14,10,${.9 * k})`); g.addColorStop(.6, `rgba(20,14,10,${.45 * k})`); g.addColorStop(1, 'rgba(20,14,10,0)'); ctx.fillStyle = g; ctx.fillRect(160, 620, 680, 660);
    ctx.restore();
    for (let i = 0; i < 4; i++) { const hx = 230 + i * 180; ell(ctx, hx, 1280, 26, 10, '#2a1d15', C.ink, 3); soot(ctx, lt + i * .25, hx, 1260, 6, 0, 1.0, 'rgba(20,14,10,.7)', .7); }
    stampBox(ctx, 'İS ODASI', CX, 380, 130, C.red, lt, .35, -6);
  } },
  { s: 28.12, e: 30.92, draw(ctx, lt, d) { // anlatılana göre: is toplandı
    ctx.drawImage(paperTex('#d9c8a0', 'warm2'), 0, 0); camera(ctx, lt, d, 1, 1.07, CX, 1000);
    shape(ctx, [[100, 1000], [900, 1000], [900, 400], [100, 400]], '#3a2e26', C.ink, 6, .3); // isli duvar
    for (let r = 0; r < 6; r++) { line(ctx, [[100, 400 + r * 100], [900, 400 + r * 100]], 'rgba(120,100,80,.5)', 4, .2); for (let c = 0; c < 5; c++) { const bx = 100 + c * 180 + (r % 2) * 90; line(ctx, [[bx, 400 + r * 100], [bx, 500 + r * 100]], 'rgba(120,100,80,.5)', 4, .2); } }
    { const g = ctx.createLinearGradient(0, 400, 0, 1000); g.addColorStop(0, 'rgba(12,8,6,.75)'); g.addColorStop(1, 'rgba(12,8,6,.2)'); ctx.fillStyle = g; ctx.fillRect(100, 400, 800, 600); }
    // kazıyıcı (tahta spatula) duvarı sıyırıyor, aşağı is dökülüyor
    const sx = 260 + ((lt * 260) % 480), sy = 640 + Math.sin(lt * 5) * 60;
    ctx.save(); ctx.translate(sx, sy); ctx.rotate(.5); shape(ctx, [[-10, 0], [10, 0], [12, 200], [-12, 200]], '#a07a4a', C.ink, 4, .2); shape(ctx, [[-40, -40], [40, -40], [10, 0], [-10, 0]], '#c9a46a', C.ink, 4, .2); ctx.restore();
    for (let i = 0; i < 12; i++) { const t = (lt * 1.1 + i / 12) % 1; ell(ctx, sx - 20 + hash(i) * 40, sy + t * (1180 - sy), 6, 6, '#14100c', null); }
    // toplama kabı
    ell(ctx, CX, 1200, 220, 40, '#4a3826', C.ink, 5); shape(ctx, [[280, 1200], [320, 1290], [680, 1290], [720, 1200]], '#7a5a3a', C.ink, 5, .3);
    ell(ctx, CX, 1200, 190, 30, '#14100c', null);
    tag(ctx, 'ANLATILANA GÖRE', CX, 300, 64, lt, 0, C.red);
  } },
  { s: 30.92, e: 32.78, draw(ctx, lt, d) { // mürekkep
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.08, CX, 1000);
    hokka(ctx, CX, 1180, 2.0);
    // dönen karıştırma çubuğu + girdap
    ctx.save(); ctx.beginPath(); ctx.ellipse(CX, 840, 100, 22, 0, 0, 7); ctx.clip();
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(CX, 840, 30 + i * 30, 8 + i * 7, 0, lt * 6 + i, lt * 6 + i + 3.5); ctx.strokeStyle = 'rgba(120,110,100,.6)'; ctx.lineWidth = 4; ctx.stroke(); }
    ctx.restore();
    const a = lt * 6; line(ctx, [[CX + Math.cos(a) * 50, 840 + Math.sin(a) * 12], [CX + Math.cos(a) * 50 + 120, 560]], '#a07a4a', 14, .2);
    for (let i = 0; i < 8; i++) { const t = (lt * .9 + i / 8) % 1; ctx.globalAlpha = 1 - t; ell(ctx, 200 + i * 20 + t * 220, 500 + t * 360, 10, 10, '#14100c', null); }
    ctx.globalAlpha = 1;
    stampBox(ctx, 'MÜREKKEP', CX, 330, 120, C.red, lt, .3, -6);
  } },
  { s: 32.78, e: 35.55, draw(ctx, lt, d) { // rivayet: belge yok
    ctx.drawImage(paperTex('#d9c8a0', 'warm2'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 900);
    for (let i = 0; i < 4; i++) { const t = (lt * .35 + i * .25) % 1; const x = [150, 270, 730, 845][i] + Math.sin(t * 6 + i) * 40, y = 420 + t * 900; paper(ctx, x, y, 150, 190, Math.sin(t * 5 + i) * .6, '#efe4c8'); for (let l = 0; l < 4; l++) line(ctx, [[x - 50, y - 50 + l * 30], [x + 40, y - 50 + l * 30]], 'rgba(42,29,21,.25)', 4, .2); }
    sealPro(ctx, 'Rivayet', 'belgelerle kesin değil', CX, 820, 230, C.red, lt, .4, 'TEMKİNLE');
    tag(ctx, 'BELGE YOK, ANLATI VAR', CX, 300, 56, lt, 0, C.ink);
  } },
  { s: 35.55, e: 37.42, draw(ctx, lt, d) { // ama fikir çarpıcı
    interior(ctx, lt, .8); camera(ctx, lt, d, 1.08, 1, CX, 900); shake(ctx, lt, .2, 12);
    const r = ctx.createRadialGradient(CX, 860, 30, CX, 860, 520); r.addColorStop(0, 'rgba(255,220,140,.6)'); r.addColorStop(1, 'rgba(255,220,140,0)'); ctx.fillStyle = r; ctx.fillRect(-200, 200, W + 400, 1300);
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2 + lt * .6; const r0 = 260 + Math.sin(lt * 6 + i) * 20; line(ctx, [[CX + Math.cos(a) * r0, 900 + Math.sin(a) * r0], [CX + Math.cos(a) * (r0 + 80), 900 + Math.sin(a) * (r0 + 80)]], 'rgba(255,214,120,.8)', 8, .1); }
    kandil(ctx, CX, 1000, 1.8, lt, 1, 2, 240);
    bigText(ctx, 'ÇARPICI FİKİR', CX, 330, 100, C.cream, lt, 0, F_SANS, [C.ink, 12]);
  } },
  { s: 37.42, e: 40.6, draw(ctx, lt, d) { // ışıktan duman, dumandan yazı
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.05, CX, 900);
    paper(ctx, 640, 900, 470, 600, .03, '#f6eedb');
    for (let i = 0; i < 4; i++) line(ctx, [[440, 690 + i * 140], [840, 704 + i * 140]], 'rgba(183,52,42,.25)', 3, .1);
    kandil(ctx, 200, 1150, 1.1, lt, 1, 5, 200);
    const path = smooth([[200, 1060], [180, 900], [260, 760], [380, 720], [470, 760]], 12);
    for (let i = 0; i < 14; i++) { const t = (lt * .45 + i / 14) % 1; const q = along(path, t); ctx.globalAlpha = .8 * (1 - t * .5); ell(ctx, q[0], q[1], 14 + t * 10, 10 + t * 8, 'rgba(20,14,10,.8)', null); }
    ctx.globalAlpha = 1;
    const strokes = [
      smooth([[480, 780], [560, 760], [640, 790], [720, 760], [800, 780]], 10),
      smooth([[500, 900], [540, 860], [600, 920], [660, 860], [740, 910], [800, 880]], 10),
      smooth([[480, 1030], [580, 1000], [620, 1050], [700, 1010], [800, 1040]], 10),
      smooth([[520, 1150], [600, 1120], [680, 1160], [780, 1130]], 10)];
    let tip = null; strokes.forEach((s, i) => { const p = eInOut(prog(lt, .3 + i * .6, .7)); if (p > 0) tip = inkStroke(ctx, s, p, 16) || tip; });
    if (tip) kalem(ctx, tip[0], tip[1] - 34, .8, .5);
    tag(ctx, 'DUMAN YAZIYA DÖNÜŞÜYOR', CX, 300, 54, lt, 0, C.ink);
  } },
  { s: 40.6, e: 42.5, draw(ctx, lt, d) { // kandil söndü, is kaldı
    interior(ctx, lt, clamp(1 - lt / .8) * .8); camera(ctx, lt, d, 1, 1.1, CX, 1000);
    const lit = clamp(1 - prog(lt, .3, .4));
    kandil(ctx, CX, 1100, 2.2, lt, lit, 4, 260);
    soot(ctx, lt, CX, 960, 14, 40, 1.8, 'rgba(200,190,180,.45)', .45);
    tag(ctx, 'KANDİL SÖNDÜ', CX, 300, 64, lt, 0, C.cream, C.ink);
    tag(ctx, 'İS KALDI', CX, 460, 70, lt, .8, C.red, C.cream);
  } },
  { s: 42.5, e: DURATION, draw(ctx, lt, d) { // hattatın kalemi
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, CX, 900);
    paper(ctx, CX, 960, 640, 520, -.03, '#f3e9d2');
    const strokes = [smooth([[260, 860], [380, 830], [480, 880], [600, 830], [740, 870]], 10), smooth([[260, 1000], [360, 960], [460, 1030], [580, 970], [740, 1010]], 10), smooth([[300, 1100], [420, 1080], [560, 1120], [700, 1090]], 10)];
    let tip = null; strokes.forEach((s, i) => { const p = eInOut(prog(lt, .1 + i * .7, .8)); if (p > 0) tip = inkStroke(ctx, s, p, 18) || tip; });
    hokka(ctx, 800, 1290, .9);
    if (tip) kalem(ctx, tip[0], tip[1] - 34, 1.0, .45);
    bigText(ctx, 'İSTEN YAZIYA', CX, 380, 110, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'BİR HATTATIN KALEMİNDE', CX, 540, 50, lt, .6, C.ink, C.cream);
  } },
];
