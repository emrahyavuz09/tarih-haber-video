// ===== Talas Savaşı 751 ve kâğıdın yolculuğu (akşam) =====
const KEY = ['TALAS', 'KÂĞIT', 'KÂĞIDI', 'KÂĞIDIN', 'TANG', 'ABBASİ', 'ABBASİLER', 'ABBASİLERİN', 'KARLUK', 'ARKADAN', 'BEŞ', 'ESİR', 'SEMERKANT\'TA', 'BAĞDAT\'TA', 'AVRUPA\'YA', 'RİVAYETE', 'KALEMLER', 'İSLAMİYET'];
const DURATION = 63.47 + 2.2;
const OUTRO_AT = DURATION - 1.6;

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
const TANGC = '#c0562f', ABBC = '#2b2522', KARC = '#3e5f8a';

// ---------- Orta Asya haritası ----------
const CA = { x: 500, y: 780, lon: 72, lat: 41.5, k: 38 };
const PA = (lon, lat) => proj(CA, lon, lat);
const ARAL = [[58.3, 45.6], [59.3, 46.1], [60.5, 46.6], [61.3, 46.3], [61.9, 45.4], [61.6, 44.3], [60.9, 43.6], [60.0, 43.5], [59.2, 43.9], [58.4, 44.6]];
const BALKHASH = [[73.6, 46.4], [74.8, 46.95], [76.3, 46.7], [77.6, 46.5], [79.1, 46.95], [79.3, 46.5], [77.8, 46.1], [76.2, 46.25], [74.9, 46.45], [73.9, 45.9]];
const ISSYK = [[76.2, 42.4], [77.3, 42.8], [78.4, 42.65], [78.3, 42.2], [77.2, 42.1], [76.3, 42.2]];
const SYR = [[71.5, 40.9], [70.9, 40.6], [69.6, 40.3], [68.8, 41.0], [68.3, 43.3], [65.5, 44.8], [63.0, 45.8], [61.4, 46.1]];
const AMU = [[68.5, 37.1], [67.3, 37.2], [65.0, 38.3], [63.6, 39.1], [61.6, 40.9], [60.6, 41.6], [59.6, 43.2]];
const TALASR = [[73.4, 42.4], [72.4, 42.5], [71.4, 42.9], [70.6, 43.5], [70.0, 44.2]];
function caMap(ctx, lt = 0) {
  regionMap(ctx, CA, { seas: [SEA_CASPIAN, ARAL, BALKHASH, ISSYK] });
  line(ctx, SYR.map(p => PA(...p)), '#6f9fb0', 7, .8); line(ctx, AMU.map(p => PA(...p)), '#6f9fb0', 7, .8);
  [[74, 41.4], [76, 41.2], [78, 41.7], [80, 42.0], [82, 42.5], [75, 42.9], [77.5, 43.2], [72.5, 39.2], [74.2, 38.6], [71, 39.4], [73.2, 37.8], [70.6, 41.8], [69.2, 37.2], [71.2, 36.6]].forEach(([lo, la], i) => {
    const [x, y] = PA(lo, la); const h = 30 + (i % 3) * 8;
    shape(ctx, [[x - h, y + h * .7], [x, y - h * .7], [x + h, y + h * .7]], '#a8927a', C.ink, 3, .5);
    shape(ctx, [[x - h * .35, y - h * .2], [x, y - h * .7], [x + h * .35, y - h * .2], [x + h * .1, y - h * .3], [x, y - h * .15], [x - h * .1, y - h * .3]], '#f3efe6', null); });
  tag(ctx, 'TANRI DAĞLARI', ...PA(78.5, 40.6), 26, 9, 0, '#7d6a52', C.cream, 0);
  tag(ctx, 'TARIM HAVZASI', ...PA(82, 38.4), 26, 9, 0, '#a07a4a', C.cream, 0);
  // Tarım havzası (çöl) noktalı doku
  ctx.fillStyle = 'rgba(150,110,60,.25)'; for (let i = 0; i < 90; i++) { const p = PA(77 + hash(i) * 12, 37.0 + hash(i + 3) * 3.6); ctx.beginPath(); ctx.arc(p[0], p[1], 3, 0, 7); ctx.fill(); }
}
function talasRiver(ctx, p) { line(ctx, partial(TALASR.map(q => PA(...q)), p), '#4f8fa6', 11, .6); }

// ---------- Akdeniz haritası ----------
const EM = { x: 500, y: 900, lon: 13, lat: 38, k: 19 };
const PE = (lon, lat) => proj(EM, lon, lat);
const MED_FULL = [[-5.6, 36.0], [-4.4, 36.7], [-2.1, 36.7], [-0.5, 38.2], [0.2, 38.8], [-0.3, 39.5], [0.9, 41.0], [3.2, 41.9], [3.1, 43.1], [4.8, 43.4], [6.5, 43.1], [7.5, 43.8], [8.8, 44.4], [10.2, 43.9], [10.5, 42.9], [11.1, 42.4], [12.2, 41.7], [13.6, 41.2], [14.3, 40.8], [15.6, 40.0], [16.2, 38.9], [15.7, 38.0], [16.1, 38.0], [16.6, 38.5], [17.1, 39.0], [16.6, 39.7], [17.0, 40.5], [18.5, 40.1], [18.0, 40.6], [16.9, 41.1], [16.0, 41.9], [15.0, 42.0], [14.0, 42.6], [13.6, 43.5], [12.4, 44.2], [12.3, 45.3], [13.7, 45.7], [14.5, 45.2], [15.2, 44.2], [16.4, 43.5], [17.6, 43.0], [18.5, 42.4], [19.4, 41.9], [19.5, 40.8], [19.3, 40.3], [20.2, 39.6], [21.1, 37.9], [21.6, 36.8], [22.5, 36.4], [23.2, 36.4], [22.9, 37.5], [24.0, 37.6], [22.9, 38.0], [23.2, 39.2], [22.6, 40.5], [23.5, 40.2], [24.2, 40.8], [26.0, 40.6], [26.7, 40.35], [26.2, 40.05], [26.1, 39.5], [26.6, 39.3], [26.9, 38.7], [26.3, 38.25], [26.9, 38.0], [27.3, 37.3], [27.6, 36.7], [28.6, 36.7], [29.6, 36.2], [30.4, 36.25], [30.6, 36.8], [31.6, 36.7], [32.6, 36.1], [33.6, 36.2], [34.6, 36.8], [35.5, 36.6], [35.9, 36.5], [36.15, 35.9], [35.9, 35.4], [35.6, 34.6], [35.0, 33.0], [34.6, 31.5], [32.0, 31.0], [30.0, 31.4], [29.0, 30.9], [25.0, 31.6], [23.1, 32.6], [20.1, 32.1], [19.6, 30.5], [18.0, 30.8], [15.6, 31.6], [15.2, 32.4], [13.2, 32.9], [11.1, 33.3], [10.1, 34.2], [11.0, 35.6], [10.3, 36.9], [11.0, 37.1], [9.8, 37.3], [8.6, 36.9], [6.4, 37.1], [3.0, 36.8], [0.0, 35.9], [-2.2, 35.1], [-5.3, 35.9]];
const ATLANTIC = [[-30, 25], [-13, 27.5], [-9.8, 30.2], [-9.6, 33.0], [-6.8, 34.0], [-5.9, 35.8], [-6.3, 36.6], [-7.4, 37.2], [-8.9, 37.0], [-8.8, 38.7], [-9.5, 39.4], [-8.8, 41.0], [-8.9, 42.5], [-9.3, 43.2], [-8.0, 43.7], [-4.5, 43.4], [-1.8, 43.4], [-1.2, 44.7], [-1.2, 46.1], [-2.2, 47.1], [-4.5, 47.9], [-5, 48.5], [-30, 55]];
const RED_SEA = [[32.6, 29.9], [33.5, 28.0], [34.6, 26.0], [36.0, 24.0], [37.2, 21.0], [39.0, 18.0], [40.0, 16.0], [43.0, 13.0], [42.6, 15.0], [41.0, 17.5], [39.2, 21.5], [38.0, 24.0], [36.5, 26.0], [35.0, 28.0], [34.4, 29.5]];
const ISLANDS = [
  [[12.4, 37.9], [13.3, 38.2], [15.6, 38.3], [15.1, 37.3], [15.1, 36.7], [14.3, 37.0], [12.6, 37.6]],
  [[8.4, 39.0], [8.2, 40.9], [9.2, 41.2], [9.8, 40.8], [9.6, 39.2], [9.0, 39.0]],
  [[8.6, 41.5], [8.6, 42.9], [9.4, 43.0], [9.5, 41.6], [9.1, 41.4]],
  [[23.5, 35.3], [24.1, 35.6], [26.3, 35.3], [25.7, 35.0], [24.7, 34.9], [23.6, 35.2]],
  [[32.3, 34.7], [32.4, 35.1], [33.0, 35.4], [34.6, 35.7], [33.9, 35.1], [33.0, 34.6]]];
function medMap(ctx) {
  regionMap(ctx, EM, { seas: [MED_FULL, ATLANTIC, SEA_BLACK, SEA_CASPIAN, SEA_GULF, RED_SEA] });
  ISLANDS.forEach(l => drawLand(ctx, EM, l, '#d9c393'));
  line(ctx, [[31.2, 30.0], [31.0, 27.0], [32.6, 25.5], [32.9, 24.0]].map(p => PE(...p)), '#6f9fb0', 6, .6); // Nil
  line(ctx, [[38.5, 37.0], [41.0, 34.5], [44.4, 33.3], [47.5, 31.0]].map(p => PE(...p)), '#6f9fb0', 5, .6); // Fırat/Dicle
  mountains(ctx, EM, [[0, 42.6], [-3, 40.6], [8, 46], [10, 46.4], [13, 46.6], [14, 42.4], [21, 42.4], [-4, 31.6], [-6, 32.4], [36, 38.6], [42, 38.6]]);
}

// ---------- figürler ----------
// Tang generali büstü: lamel zırh, yuvarlak miğfer, kırmızı sorguç
function tangGeneral(ctx, x, y, s, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], '#8b3a22', C.ink, 6);
  for (let r = 0; r < 4; r++) for (let i = -4; i <= 4; i++) { const xx = i * 32 + (r % 2) * 16, yy = 130 + r * 32; if (Math.abs(xx) < 140 - r * 4) { ctx.beginPath(); ctx.arc(xx, yy, 14, 0, Math.PI); ctx.strokeStyle = '#d9a630'; ctx.lineWidth = 3; ctx.stroke(); } }
  shape(ctx, [[-170, 130], [-150, 80], [-96, 70], [-80, 140]], C.gold, C.ink, 5); shape(ctx, [[170, 130], [150, 80], [96, 70], [80, 140]], C.gold, C.ink, 5);
  ell(ctx, 0, 110, 28, 28, C.gold, C.ink, 4); ell(ctx, 0, 110, 12, 12, '#8b3a22', C.ink, 3);
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 64, 80, C.skin, C.ink, 6);
  line(ctx, [[-30, -46], [-14, -44]], C.ink, 5); line(ctx, [[14, -44], [30, -46]], C.ink, 5);
  line(ctx, [[-42, -66], [-12, -60]], C.ink, 6); line(ctx, [[12, -60], [42, -66]], C.ink, 6);
  line(ctx, [[0, -40], [-5, -12], [6, -10]], C.ink, 4);
  line(ctx, [[-30, 14], [-12, 8], [0, 10], [12, 8], [30, 14]], C.ink, 4); // ince bıyık
  shape(ctx, [[-8, 34], [8, 34], [4, 66], [-4, 66]], C.ink, null); // keçi sakal
  // miğfer + yanak koruyucu
  shape(ctx, [[-78, -60], [-80, -120], [-50, -168], [0, -182], [50, -168], [80, -120], [78, -60], [60, -86], [-60, -86]], '#9aa3a8', C.ink, 6);
  shape(ctx, [[-82, -84], [-96, 0], [-66, 10], [-62, -76]], '#9aa3a8', C.ink, 5); shape(ctx, [[82, -84], [96, 0], [66, 10], [62, -76]], '#9aa3a8', C.ink, 5);
  line(ctx, [[-76, -96], [76, -96]], C.gold, 8);
  line(ctx, [[0, -182], [0, -214]], C.ink, 6);
  shape(ctx, [[0, -210], [-26, -250 + Math.sin((o.t || 0) * 5) * 6], [-6, -262], [14, -244 + Math.sin((o.t || 0) * 5 + 1) * 6], [6, -212]], C.red, C.ink, 3);
  ctx.restore();
}
// Abbasi komutanı büstü: siyah kaftan ve siyah sarık (Abbasilerin rengi), sakal
function abbasiKomutan(ctx, x, y, s, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], '#2b2522', C.ink, 6);
  shape(ctx, [[-40, 52], [0, 150], [40, 52]], '#efe4cc', C.ink, 5);
  line(ctx, [[-40, 52], [-10, 260]], C.gold, 6); line(ctx, [[40, 52], [10, 260]], C.gold, 6);
  line(ctx, [[-150, 200], [150, 200]], C.gold, 10);
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 66, 80, C.skin, C.ink, 6);
  ell(ctx, -66, -36, 11, 17, C.skin, C.ink, 4); ell(ctx, 66, -36, 11, 17, C.skin, C.ink, 4);
  ell(ctx, -24, -46, 6, 7, C.ink, null); ell(ctx, 24, -46, 6, 7, C.ink, null);
  line(ctx, [[-42, -68], [-12, -63]], C.ink, 6); line(ctx, [[12, -63], [42, -68]], C.ink, 6);
  line(ctx, [[0, -40], [-5, -12], [6, -10]], C.ink, 4);
  shape(ctx, [[-62, -20], [-58, 30], [-34, 80], [0, 100], [34, 80], [58, 30], [62, -20], [38, 6], [0, 12], [-38, 6]], '#2a1d15', C.ink, 4);
  shape(ctx, [[0, 6], [-36, 12], [-54, 26], [-28, 22], [0, 16], [28, 22], [54, 26], [36, 12]], '#2a1d15', C.ink, 3);
  // siyah sarık + sarkan uç
  shape(ctx, [[70, -100], [96, -40], [104, 40], [84, 44], [78, -40], [60, -90]], '#2b2522', C.ink, 5);
  ell(ctx, 0, -116, 92, 58, '#2b2522', C.ink, 6);
  for (let i = -2; i <= 2; i++) line(ctx, [[i * 34 - 20, -160], [i * 34 + 20, -72]], 'rgba(243,233,210,.25)', 4);
  ell(ctx, 0, -130, 13, 15, C.gold, C.ink, 3);
  ctx.restore();
}
// küçük piyade (yan görünüş). kind: 'tang' | 'abb'
function soldier(ctx, x, y, s, kind, ph = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.dir || 1), s);
  const body = kind === 'tang' ? '#8b3a22' : '#2b2522';
  const a = Math.sin(ph) * .5;
  line(ctx, [[0, -40], [Math.sin(a) * 26, 0]], C.ink, 9, .3); line(ctx, [[0, -40], [-Math.sin(a) * 26, 0]], C.ink, 9, .3);
  shape(ctx, [[-18, -38], [-16, -86], [16, -86], [18, -38]], body, C.ink, 3, .4);
  if (kind === 'tang') line(ctx, [[-16, -62], [16, -62]], C.gold, 4, .2);
  ell(ctx, 0, -100, 13, 14, C.skin, C.ink, 3);
  if (kind === 'tang') { shape(ctx, [[-16, -104], [-12, -122], [0, -128], [12, -122], [16, -104]], '#9aa3a8', C.ink, 3, .3); line(ctx, [[0, -128], [-6, -144]], C.red, 5, .2); }
  else { ell(ctx, 0, -112, 17, 10, '#efe4cc', C.ink, 3); }
  if (!o.noSpear) { line(ctx, [[18, 0], [24, -170]], '#6e4a2c', 5, .2); shape(ctx, [[24, -170], [19, -150], [29, -150]], '#cfd3d6', C.ink, 2, .2); }
  if (o.shield) ell(ctx, 18, -60, 15, 22, o.shield, C.ink, 3);
  if (o.bound) line(ctx, [[-16, -60], [-60, -58]], '#8b6a45', 4, .2);
  ctx.restore();
}
function marchRow(ctx, lt, y, n, x0, gap, dir, speed, kind, s, o = {}) {
  const span = n * gap;
  for (let i = 0; i < n; i++) { let x = x0 + i * gap + dir * lt * speed; x = ((x - x0) % span + span) % span + x0; soldier(ctx, x, y + (i % 2) * 6, s, kind, lt * 9 + i, { dir, ...o }); }
}
function banner(ctx, x, y, h, lt, col, w = 90) {
  line(ctx, [[x, y], [x, y - h]], '#6e4a2c', 7, .3); ell(ctx, x, y - h - 6, 8, 8, C.gold, C.ink, 2);
  const pts = []; for (let i = 0; i <= 8; i++) { const t = i / 8; pts.push([x + t * w, y - h + Math.sin(lt * 6 + t * 4) * 8 * t]); }
  for (let i = 8; i >= 0; i--) { const t = i / 8; pts.push([x + t * w, y - h + w * .62 + Math.sin(lt * 6 + t * 4) * 8 * t]); }
  shape(ctx, pts, col, C.ink, 3, .3);
}
function ground(ctx, lt, o = {}) {
  const sky = ctx.createLinearGradient(0, 0, 0, 1100);
  sky.addColorStop(0, o.top || '#e9d9b4'); sky.addColorStop(1, o.bot || '#f3e6c6');
  ctx.fillStyle = sky; ctx.fillRect(-300, -300, W + 600, 1500);
  if (o.sun) { const sy = o.sunY || 760; const g = ctx.createRadialGradient(o.sunX || 700, sy, 20, o.sunX || 700, sy, 420); g.addColorStop(0, 'rgba(240,150,70,.8)'); g.addColorStop(1, 'rgba(240,150,70,0)'); ctx.fillStyle = g; ctx.fillRect(-300, 0, W + 600, 1200); ell(ctx, o.sunX || 700, sy, 100, 100, '#e8823a', null); }
  for (let i = 0; i < 4; i++) { const x = ((lt * 30 + i * 330) % 1500) - 250, y = 300 + (i % 2) * 130; ctx.globalAlpha = o.dark ? .12 : .5; ell(ctx, x, y, 110, 26, '#fff8e8', null); ell(ctx, x + 60, y - 18, 70, 24, '#fff8e8', null); }
  ctx.globalAlpha = 1;
  // uzak Tanrı Dağları
  shape(ctx, [[-300, 1000], [-60, 860], [120, 930], [300, 820], [520, 940], [700, 840], [900, 930], [1100, 850], [1400, 1000]], o.dark ? '#5a4a3a' : '#b9a98a', C.ink, 4, 1);
  [[300, 820], [700, 840], [-60, 860], [1100, 850]].forEach(([x, y]) => shape(ctx, [[x - 40, y + 30], [x, y], [x + 40, y + 30], [x + 14, y + 22], [x, y + 34], [x - 16, y + 22]], '#f3efe6', null));
  shape(ctx, [[-300, 1060], [200, 1040], [600, 1070], [1000, 1035], [1400, 1060], [1400, 2200], [-300, 2200]], o.ground || '#c2a86e', C.ink, 5, 1.2);
  ctx.strokeStyle = 'rgba(90,70,30,.35)'; ctx.lineWidth = 3;
  for (let i = 0; i < 36; i++) { const x = hash(i) * W, y = 1100 + hash(i + 9) * 600; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6 + Math.sin(lt * 3 + i) * 4, y - 20); ctx.stroke(); }
}
function tug(ctx, x, y, h, lt) {
  line(ctx, [[x, y], [x, y - h]], '#6e4a2c', 10, .4); ell(ctx, x, y - h - 10, 14, 14, C.gold, C.ink, 4);
  for (let i = 0; i < 7; i++) { const a = (i - 3) * 6; const sw = Math.sin(lt * 4 + i * .6) * 22; line(ctx, [[x, y - h + 10], [x + a + sw * .5 + 20, y - h + 70], [x + a + sw + 40, y - h + 150]], i % 2 ? '#2a1d15' : '#5a4632', 9, .4); }
}
function paperSheet(ctx, x, y, w, h, rot, lines = 5, col = '#f6eedb') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  shape(ctx, [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]], col, C.ink, 4, .8);
  for (let i = 0; i < lines; i++) { const yy = -h / 2 + h * (i + 1) / (lines + 1); line(ctx, [[-w * .36, yy], [w * (.36 - (i % 3) * .1), yy]], 'rgba(42,29,21,.45)', 4, .6); }
  ctx.restore();
}
function blocks(ctx, cx, cy, cols, rows, col, jit = 0, lt = 0, bw = 64, bh = 34, gx = 80, gy = 52) {
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = cx + (c - (cols - 1) / 2) * gx + Math.sin(lt * 17 + c * 3 + r) * jit, y = cy + (r - (rows - 1) / 2) * gy + Math.cos(lt * 13 + c + r * 2) * jit;
    shape(ctx, [[x - bw / 2, y - bh / 2], [x + bw / 2, y - bh / 2], [x + bw / 2, y + bh / 2], [x - bw / 2, y + bh / 2]], col, C.ink, 3, .4);
  }
}
function mosque(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-160, 0], [-160, -140], [160, -140], [160, 0]], '#e9dcc0', C.ink, 6, .8);
  shape(ctx, [[-110, -140], [-100, -210], [-60, -262], [0, -282], [60, -262], [100, -210], [110, -140]], '#5f8a7a', C.ink, 6, .8);
  line(ctx, [[0, -282], [0, -320]], C.ink, 5); ell(ctx, 0, -326, 8, 8, C.gold, C.ink, 3);
  shape(ctx, [[200, 0], [200, -330], [240, -330], [240, 0]], '#e9dcc0', C.ink, 6, .8);
  shape(ctx, [[190, -250], [250, -250], [250, -236], [190, -236]], '#bfa577', C.ink, 4, .5);
  shape(ctx, [[200, -330], [220, -390], [240, -330]], '#5f8a7a', C.ink, 5, .5);
  for (let i = -2; i <= 2; i++) { const wx = i * 56; shape(ctx, [[wx - 16, -30], [wx - 16, -86], [wx, -106], [wx + 16, -86], [wx + 16, -30]], '#5b4636', C.ink, 3, .5); }
  ctx.restore();
}
function vat(ctx, x, y, s, lt) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-200, -120], [200, -120], [180, 60], [-180, 60]], '#8b6a45', C.ink, 6, .8);
  for (let i = -150; i <= 150; i += 75) line(ctx, [[i, -118], [i * .92, 58]], '#6e4a2c', 4, .3);
  ell(ctx, 0, -120, 200, 26, '#a9c9d4', C.ink, 5);
  for (let i = 0; i < 3; i++) { const k = (lt * .8 + i / 3) % 1; ctx.globalAlpha = 1 - k; ell(ctx, -40 + i * 40, -120, 30 + k * 120, 4 + k * 14, null, '#6f9fb0', 3); } ctx.globalAlpha = 1;
  ctx.restore();
}
function mould(ctx, x, y, w, h, rot = 0, wet = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  shape(ctx, [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]], wet > 0 ? '#f3ecd8' : 'rgba(0,0,0,0)', '#6e4a2c', 10, .5);
  for (let i = 1; i < 8; i++) line(ctx, [[-w / 2 + w * i / 8, -h / 2], [-w / 2 + w * i / 8, h / 2]], 'rgba(110,74,44,.6)', 3, .2);
  ctx.restore();
}
function worker(ctx, x, y, s, armY) { // kâğıt ustası (yan görünüş, yüz detaysız)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-50, 0], [-44, -170], [-30, -200], [30, -200], [44, -170], [50, 0]], '#5a6a7a', C.ink, 5, .6);
  line(ctx, [[-44, -110], [44, -110]], '#8b6a45', 8, .3);
  ell(ctx, 0, -236, 34, 38, C.skin, C.ink, 5);
  shape(ctx, [[-36, -246], [-30, -284], [0, -296], [30, -284], [36, -246]], '#8b3a22', C.ink, 4, .5);
  line(ctx, [[20, -180], [100, -150 + armY * .5], [172, armY]], '#5a6a7a', 16, .4);
  line(ctx, [[20, -180], [100, -150 + armY * .5], [172, armY]], C.ink, 3, .4);
  ctx.restore();
}
function baghdad(ctx, x, y, s, lt) { // yuvarlak şehir (kuş bakışı)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(ctx, 0, 0, 300, 300, '#cdb68a', C.ink, 8); ell(ctx, 0, 0, 262, 262, null, C.ink, 4); ell(ctx, 0, 0, 170, 170, '#d9c393', C.ink, 5);
  for (let i = 0; i < 4; i++) { const a = Math.PI / 4 + i * Math.PI / 2; ctx.save(); ctx.rotate(a); shape(ctx, [[-30, -320], [30, -320], [30, -250], [-30, -250]], '#a5805c', C.ink, 5, .5); line(ctx, [[0, -250], [0, -170]], '#a5805c', 18, .3); ctx.restore(); }
  for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2; shape(ctx, [[Math.cos(a) * 200 - 12, Math.sin(a) * 200 - 10], [Math.cos(a) * 200 + 12, Math.sin(a) * 200 - 10], [Math.cos(a) * 200 + 12, Math.sin(a) * 200 + 10], [Math.cos(a) * 200 - 12, Math.sin(a) * 200 + 10]], '#e9dcc0', C.ink, 2, .3); }
  ell(ctx, 0, 0, 70, 70, '#5f8a7a', C.ink, 6); ell(ctx, 0, 0, 30, 30, '#7fa898', C.ink, 3);
  ctx.restore();
}
function quill(ctx, x, y, s, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[0, 0], [10, -30], [40, -120], [80, -230], [110, -300], [96, -220], [70, -130], [30, -40]], '#f6f1e6', C.ink, 4, .6);
  line(ctx, [[0, 0], [100, -290]], C.ink, 3, .3);
  for (let i = 1; i < 8; i++) line(ctx, [[i * 12, -i * 35], [i * 12 + 22, -i * 35 - 4]], 'rgba(42,29,21,.4)', 2, .3);
  shape(ctx, [[0, 0], [-4, 14], [6, 4]], C.ink, null);
  ctx.restore();
}

const SCENES = [
  { s: 0, e: 2.55, draw(ctx, lt, d) { // HOOK
    // AÇILIŞ (scroll): gün batımında karşı karşıya iki ordu, rüzgârda uçuşan kâğıtlar, üstte açılan parşömen
    ctx.save(); shake(ctx, lt, 0, 22, .4);
    const z = lt < .4 ? lerp(1.22, 1.03, eOut(lt / .4)) : lerp(1.03, 1.0, (lt - .4) / (d - .4));
    ctx.translate(W / 2, 1000); ctx.scale(z, z); ctx.translate(-W / 2, -1000);
    ground(ctx, lt * 3, { sun: true, sunX: 540, sunY: 960, top: '#c8693a', bot: '#f2c27a', ground: '#8a6a3e' });
    ctx.save(); ctx.filter = 'brightness(0.32) saturate(0.6)';
    banner(ctx, 130, 1160, 250, lt, TANGC, 100); banner(ctx, 870, 1160, 250, lt + 1, ABBC, -100);
    for (let i = 0; i < 4; i++) soldier(ctx, 110 + i * 70 + lt * 22, 1190 + (i % 2) * 12, 1.05, 'tang', lt * 9 + i, { dir: 1, shield: '#8b3a22' });
    for (let i = 0; i < 4; i++) soldier(ctx, 890 - i * 70 - lt * 22, 1190 + (i % 2) * 12, 1.05, 'abb', lt * 9 + i + 2, { dir: -1, shield: '#2b2522' });
    for (let i = 0; i < 4; i++) soldier(ctx, 80 + i * 88 + lt * 30, 1310 + (i % 2) * 10, 1.35, 'tang', lt * 9 + i * 1.3, { dir: 1 });
    for (let i = 0; i < 4; i++) soldier(ctx, 920 - i * 88 - lt * 30, 1310 + (i % 2) * 10, 1.35, 'abb', lt * 9 + i * 1.3 + 1, { dir: -1 });
    ctx.restore();
    dust(ctx, lt, 260, 1330, 10, 'rgba(90,60,30,.35)'); dust(ctx, lt + .5, 760, 1320, 10, 'rgba(90,60,30,.35)');
    // rüzgâr çizgileri
    for (let i = 0; i < 9; i++) { const k = (lt * 1.6 + i / 9) % 1; const yy = 640 + hash(i + 4) * 560; const xx = 1150 - k * 1500; ctx.globalAlpha = .55 * Math.sin(k * Math.PI); line(ctx, [[xx, yy], [xx + 160, yy - 18]], '#fff4dc', 4, .3); }
    ctx.globalAlpha = 1;
    // uçuşan kâğıt yaprakları (sağdan sola, dönerek)
    for (let i = 0; i < 8; i++) { const sp = .32 + hash(i + 11) * .25; const k = (lt * sp + hash(i) ) % 1; const x = 1150 - k * 1450; const y = 680 + hash(i + 2) * 520 + Math.sin(lt * 3 + i * 2) * 50 - k * 120;
      const sz = .7 + hash(i + 7) * .6; paperSheet(ctx, x, y, 110 * sz, 140 * sz, lt * (2 + i % 3) * (i % 2 ? 1 : -1) + i, 4); }
    // ilk anda kameraya çarpan büyük yaprak
    if (lt < .7) { const k = eOut(lt / .7); paperSheet(ctx, lerp(760, -320, k), lerp(980, 820, k), 260, 330, -.3 - k * 2.2, 6); }
    ctx.restore();
    // parşömen şerit (yazının zemini)
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    const op = eOut(clamp((lt + .6) / .5)), half = 440 * op, py0 = 268, py1 = 600;
    shape(ctx, [[500 - half, py0], [500 + half, py0], [500 + half, py1], [500 - half, py1]], '#f3e6c4', C.ink, 6, 1.2);
    for (const sx of [500 - half, 500 + half]) { shape(ctx, [[sx - 22, py0 - 22], [sx + 22, py0 - 22], [sx + 22, py1 + 22], [sx - 22, py1 + 22]], '#b88a52', C.ink, 5, .8); line(ctx, [[sx - 8, py0 - 10], [sx - 8, py1 + 10]], 'rgba(255,240,210,.5)', 4, .3); }
    ctx.restore();
    hookText(ctx, lt + .6, 'Bir savaş, kâğıdı dünyaya mı yaydı?', { style: 'scroll', key: 'KÂĞIDI', y: 434, accent: C.red, size: 84 });
  } },
  { s: 2.55, e: 5.75, draw(ctx, lt, d) { // 751, Orta Asya, Talas Irmağı
    camera(ctx, lt, d, 1, 1.12, ...PA(71.4, 42.9)); caMap(ctx, lt);
    talasRiver(ctx, eInOut(prog(lt, .2, 1.8)));
    const t = PA(71.4, 42.9); pin(ctx, t[0], t[1], 1.1, lt, 1.8, C.red);
    tag(ctx, 'ORTA ASYA', W / 2, 300, 66, lt, .9, C.ink);
    tag(ctx, 'TALAS IRMAĞI', t[0] - 30, t[1] + 80, 44, lt, 2.0, '#3d6676');
    tag(ctx, 'ARAL GÖLÜ', ...PA(61, 47.2), 30, lt, .4, '#3d6676'); tag(ctx, 'BALKAŞ GÖLÜ', ...PA(76.5, 47.4), 30, lt, .5, '#3d6676');
    sealPro(ctx, '751', 'Talas Savaşı', 300, 1160, 140, C.red, lt, .05, 'TEMMUZ');
  } },
  { s: 5.75, e: 7.85, draw(ctx, lt, d) { // Tang ordusu
    ground(ctx, lt); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    for (let i = 0; i < 3; i++) banner(ctx, 1000 - ((lt * 110 + i * 360) % 1300), 1110, 330, lt + i, TANGC, 110);
    marchRow(ctx, lt, 1180, 12, -120, 110, -1, 110, 'tang', 1.15, { shield: '#d9a630' });
    marchRow(ctx, lt, 1300, 11, -60, 120, -1, 110, 'tang', 1.35, { shield: '#d9a630' });
    tag(ctx, 'TANG ÇİNİ ORDUSU', W / 2, 330, 68, lt, 0, TANGC);
    dust(ctx, lt, 800, 1260, 10);
  } },
  { s: 7.85, e: 10.05, draw(ctx, lt, d) { // General Kao Sien-çi
    ctx.drawImage(paperTex('#e6d2a6', 'warmT'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 850);
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = TANGC; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .25; ctx.beginPath(); ctx.moveTo(W / 2, 820); ctx.arc(W / 2, 820, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    banner(ctx, 130, 1250, 620, lt, TANGC, 120); banner(ctx, 800, 1250, 620, lt + 1, TANGC, 120);
    const p = eBack(prog(lt, 0, .45)); tangGeneral(ctx, W / 2 - 20, 820 + (1 - p) * 180, 1.15 * Math.max(p, .01), { t: lt });
    tag(ctx, 'GENERAL', W / 2, 330, 56, lt, .3, C.ink);
    tag(ctx, 'KAO SİEN-Çİ (GAO XİANZHİ)', W / 2, 1210, 52, lt, .9, TANGC, C.cream, 2);
  } },
  { s: 10.05, e: 13.85, draw(ctx, lt, d) { // Abbasi ordusu, Ziyad bin Salih
    ground(ctx, lt); camera(ctx, lt, d, 1.0, 1.07, W / 2, 900);
    for (let i = 0; i < 6; i++) horseArcher(ctx, ((lt * 140 + i * 230) % 1500) - 250, 1120 + (i % 2) * 40, .55, 1, lt * 12 + i, ABBC, false);
    banner(ctx, 120 + lt * 30, 1100, 380, lt, ABBC, 110); banner(ctx, 830 + lt * 30, 1100, 380, lt + 1, ABBC, 110);
    const p = eBack(prog(lt, .1, .45)); abbasiKomutan(ctx, W / 2 - 20, 800 + (1 - p) * 180, 1.05 * Math.max(p, .01));
    tag(ctx, 'ABBASİ ORDUSU', W / 2, 320, 66, lt, 0, ABBC);
    tag(ctx, 'ZİYAD BİN SALİH', W / 2, 1100, 62, lt, 1.9, C.red, C.cream, 2);
    dust(ctx, lt, 300, 1200, 10);
  } },
  { s: 13.85, e: 16.3, draw(ctx, lt, d) { // Çin, Batı Türkistan'a hâkim olmak istiyor
    camera(ctx, lt, d, 1, 1.1, 600, 820); caMap(ctx, lt);
    const pul = .25 + Math.sin(lt * 6) * .12; ctx.save(); ctx.globalAlpha = pul; ell(ctx, ...PA(68, 42), 200, 160, '#e8b06a', null); ctx.restore();
    const kuca = PA(83, 41.7); pin(ctx, ...kuca, 1, lt, 0, TANGC); tag(ctx, 'KUÇA', kuca[0] - 10, kuca[1] - 110, 38, lt, .1, TANGC);
    arrow(ctx, curvePts(kuca, PA(77, 43.6), PA(71.4, 43.0)), eInOut(prog(lt, .2, 1.9)), TANGC, 16);
    tag(ctx, 'BATI TÜRKİSTAN', ...PA(66.5, 43.6), 46, lt, .6, C.ink);
    tag(ctx, 'ÇİN BATIYA UZANIYOR', W / 2, 300, 60, lt, 0, TANGC);
  } },
  { s: 16.3, e: 18.85, draw(ctx, lt, d) { // Abbasiler yolu kesiyor
    camera(ctx, lt, d, 1.1, 1.16, 560, 820); shake(ctx, lt, 2.05, 12); caMap(ctx, lt);
    const kuca = PA(83, 41.7), tal = PA(71.4, 42.9), merv = PA(61.8, 37.6), sem = PA(67, 39.65);
    arrow(ctx, curvePts(kuca, PA(77, 43.6), [tal[0] + 40, tal[1]]), 1, TANGC, 16);
    pin(ctx, ...merv, 1, lt, 0, ABBC); tag(ctx, 'HORASAN', merv[0] + 10, merv[1] + 70, 38, lt, .1, ABBC);
    pin(ctx, ...sem, .8, lt, .2, ABBC); tag(ctx, 'SEMERKANT', sem[0] - 40, sem[1] + 60, 32, lt, .3, ABBC);
    arrow(ctx, curvePts(merv, PA(66, 41.0), [tal[0] - 40, tal[1] + 10]), eInOut(prog(lt, .15, 1.8)), ABBC, 16);
    stampBox(ctx, 'YOL KESİLDİ', W / 2, 330, 84, C.red, lt, 2.0, -6);
  } },
  { s: 18.85, e: 20.7, draw(ctx, lt, d) { // beş gün sürdü
    ground(ctx, lt); shake(ctx, lt, .3, 8); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    const push = Math.sin(lt * 5) * 30;
    for (let i = 0; i < 5; i++) soldier(ctx, 130 + i * 60 + push, 1260 + (i % 2) * 24, 2.0, 'abb', lt * 10 + i, { dir: 1, shield: '#6e4a2c' });
    for (let i = 0; i < 5; i++) soldier(ctx, 640 + i * 60 + push, 1260 + (i % 2) * 24, 2.0, 'tang', lt * 10 + i, { dir: -1, shield: '#d9a630' });
    for (let i = 0; i < 8; i++) { const k = (lt * 1.4 + i / 8) % 1; arrowShot(ctx, lerp(300, 760, k), 950 - Math.sin(k * Math.PI) * 220 + i * 8, -0.6 + k * 1.2, 60); }
    for (let i = 0; i < 5; i++) { const p = eBack(prog(lt, .15 + i * .2, .3)); if (p > 0) { ctx.save(); ctx.translate(250 + i * 140, 560); ctx.scale(p, p); ell(ctx, 0, 0, 46, 46, '#e8a24a', C.ink, 5); for (let j = 0; j < 8; j++) { const a = j / 8 * Math.PI * 2 + lt; line(ctx, [[Math.cos(a) * 58, Math.sin(a) * 58], [Math.cos(a) * 74, Math.sin(a) * 74]], '#e8a24a', 6, .2); } ctx.restore(); } }
    stampBox(ctx, '5 GÜN', W / 2, 340, 120, C.red, lt, 1.25, -6);
  } },
  { s: 20.7, e: 23.45, draw(ctx, lt, d) { // son gün, her şeyi değiştiren an
    ground(ctx, lt, { top: '#5a3a30', bot: '#d88a50', ground: '#7a6040', dark: true, sun: true, sunY: lerp(820, 900, lt / d), sunX: 540 }); camera(ctx, lt, d, 1, 1.1, W / 2, 900);
    const k = eOut(prog(lt, .6, 1.4));
    for (let i = 0; i < 6; i++) horseArcher(ctx, 480 + i * 95 + Math.sin(lt * 2 + i) * 4, lerp(1150, 1050, k) + (i % 2) * 14, .48, -1, lt * 2 + i, '#1f1712', true);
    tug(ctx, 400, lerp(1130, 1030, k), 300, lt);
    tag(ctx, 'SON GÜN', W / 2, 330, 80, lt, 0, C.cream, C.ink);
    tag(ctx, 'HER ŞEYİ DEĞİŞTİREN AN', W / 2, 1250, 52, lt, 1.5, C.red, C.cream, 2);
  } },
  { s: 23.45, e: 26.1, draw(ctx, lt, d) { // Karluk Türkleri
    ground(ctx, lt, { top: '#d8b98a', bot: '#efd9b0' }); camera(ctx, lt, d, 1.05, 1, W / 2, 1000);
    dust(ctx, lt, 820, 1250, 16); dust(ctx, lt, 400, 1300, 12);
    for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) horseArcher(ctx, 1300 - ((lt * 360 + i * 380 + r * 170) % 1700), 1150 + r * 150, .75 + r * .15, -1, lt * 14 + i + r, r ? '#2a2420' : '#3e3328', true);
    tug(ctx, 1150 - ((lt * 360) % 1700), 1100, 300, lt);
    tag(ctx, 'KARLUK TÜRKLERİ', W / 2, 320, 72, lt, 0, KARC);
    tag(ctx, 'ABBASİLERİN YANINDA', W / 2, 470, 52, lt, 1.0, C.ink);
  } },
  { s: 26.1, e: 28.2, draw(ctx, lt, d) { // arkadan vurdu (kuş bakışı)
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); shake(ctx, lt, 1.25, 16); camera(ctx, lt, d, 1, 1.06, W / 2, 820);
    const hit = prog(lt, 1.2, .6);
    blocks(ctx, 540, 820, 4, 3, TANGC, hit * 6, lt);
    blocks(ctx, 540, 1150, 4, 1, ABBC, 0, lt);
    tag(ctx, 'TANG', 830, 820, 40, lt, 0, TANGC); tag(ctx, 'ABBASİ', 540, 1240, 40, lt, 0, ABBC);
    const pk = eInOut(prog(lt, .1, 1.1));
    arrow(ctx, curvePts([140, 420], [420, 430], [500, 690]), pk, KARC, 22); arrow(ctx, curvePts([900, 420], [660, 430], [580, 690]), pk, KARC, 22);
    tag(ctx, 'KARLUKLAR', W / 2, 420, 46, lt, .2, KARC);
    stampBox(ctx, 'ARKADAN!', W / 2, 330, 96, C.red, lt, 1.2, -6);
  } },
  { s: 28.2, e: 31.85, draw(ctx, lt, d) { // iki ateş arasında, ağır yenilgi
    ctx.drawImage(paperTex('#cdbb8a', 'plain'), 0, 0); camera(ctx, lt, d, 1.06, 1.12, W / 2, 820);
    const sq = eInOut(prog(lt, 0, 1.6));
    blocks(ctx, 540, 820, 4, 3, TANGC, 6 + sq * 6, lt, 64 - sq * 14, 34, 80 - sq * 18, 52 - sq * 12);
    blocks(ctx, 540, lerp(1150, 990, sq), 4, 1, ABBC, 0, lt);
    blocks(ctx, 540, lerp(560, 660, sq), 4, 1, KARC, 0, lt);
    for (let i = 0; i < 10; i++) { const k = (lt * 1.6 + i / 10) % 1; arrowShot(ctx, 300 + i * 50, lerp(1000, 860, k), -Math.PI / 2, 40, ABBC); arrowShot(ctx, 320 + i * 48, lerp(640, 780, k), Math.PI / 2, 40, KARC); }
    tag(ctx, 'İKİ ATEŞ ARASINDA', W / 2, 320, 66, lt, 0, C.ink);
    stampBox(ctx, 'AĞIR YENİLGİ', W / 2, 1240, 80, C.red, lt, 2.1, -5);
    shake(ctx, lt, 2.1, 10);
  } },
  { s: 31.85, e: 33.7, draw(ctx, lt, d) { // binlerce esir
    ground(ctx, lt, { top: '#cdb08a', bot: '#ead6b0' }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    for (let i = 0; i < 9; i++) { const x = 1000 - ((lt * 60 + i * 120) % 1300) + 150; soldier(ctx, x, 1260 + (i % 2) * 10, 1.7, 'tang', lt * 6 + i, { dir: -1, noSpear: true, bound: true }); }
    line(ctx, [[-50, 1160], [1200, 1165]], '#8b6a45', 5, 2);
    horseArcher(ctx, 560 + Math.sin(lt) * 20, 1090, .7, -1, lt * 6, ABBC, false);
    tag(ctx, 'BİNLERCE ESİR', W / 2, 330, 80, lt, 0, C.red);
    text(ctx, '(Kaynaklarda rakamlar çok farklı)', W / 2, 450, 32, 'rgba(42,29,21,.8)', F_SANS, 700);
  } },
  { s: 33.7, e: 37.55, draw(ctx, lt, d) { // Tang hayalinden vazgeçti
    camera(ctx, lt, d, 1.08, 1, 600, 820); caMap(ctx, lt);
    const kuca = PA(83, 41.7), tal = PA(71.4, 42.9);
    const back = eInOut(prog(lt, .3, 2.0));
    arrow(ctx, curvePts(kuca, PA(77, 43.6), [tal[0] + 40, tal[1]]), 1 - back * .98, 'rgba(192,86,47,.35)', 16, true);
    arrow(ctx, curvePts([tal[0] + 60, tal[1] + 60], PA(77, 41.0), [kuca[0] - 20, kuca[1] + 30]), back, TANGC, 16);
    pin(ctx, ...tal, 1.1, lt, 0, C.red);
    tag(ctx, 'TANG HANEDANI', W / 2, 300, 64, lt, 0, TANGC);
    stampBox(ctx, 'VAZGEÇTİ', 420, 1150, 96, C.red, lt, 2.2, -6);
  } },
  { s: 37.55, e: 39.8, draw(ctx, lt, d) { // Türkler Çin baskısından kurtuldu
    ground(ctx, lt); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    yurt(ctx, 300, 1200, 1.5); yurt(ctx, 780, 1210, 1.3);
    tug(ctx, 540, 1230, 420, lt);
    const br = eOut(prog(lt, .6, 1.1));
    for (let i = 0; i < 6; i++) { const sd = i < 3 ? -1 : 1; const k = i < 3 ? 2 - i : i - 3; const x0 = 540 + sd * (60 + k * 110); const fall = br * br * (220 + k * 120);
      chainLink(ctx, x0 + sd * br * (120 + k * 40), 640 + fall, 1.5, (k % 2 ? Math.PI / 2 : 0) + sd * br * (1.5 + k)); }
    if (br > 0 && br < .5) { for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; line(ctx, [[540 + Math.cos(a) * 30, 640 + Math.sin(a) * 30], [540 + Math.cos(a) * (60 + br * 260), 640 + Math.sin(a) * (60 + br * 260)]], C.gold, 7, .2); } }
    shake(ctx, lt, .6, 14);
    tag(ctx, 'ÇİN BASKISI SONA ERDİ', W / 2, 320, 60, lt, 0, KARC);
  } },
  { s: 39.8, e: 43.1, draw(ctx, lt, d) { // İslamiyet Türkler arasında yayıldı
    ground(ctx, lt, { top: '#e8c890', bot: '#f6e6c4', sun: true, sunX: 540, sunY: 760 }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#fff3d0'; for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2 + lt * .25; ctx.beginPath(); ctx.moveTo(540, 760); ctx.arc(540, 760, 1100, a, a + .1); ctx.fill(); } ctx.restore();
    mosque(ctx, 520, 1180, 1.25);
    yurt(ctx, 150, 1220, 1.0); yurt(ctx, 900, 1230, .9);
    for (let i = 0; i < 4; i++) horseArcher(ctx, ((lt * 120 + i * 300) % 1400) - 200, 1320, .45, 1, lt * 10 + i, '#3e3328', false);
    tag(ctx, 'İSLAMİYET', W / 2, 320, 76, lt, 0, '#3f6a5a');
    tag(ctx, 'TÜRKLER ARASINDA HIZLA YAYILDI', W / 2, 460, 46, lt, .9, C.ink);
  } },
  { s: 43.1, e: 45.2, draw(ctx, lt, d) { // Peki ya kâğıt? Rivayete göre
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.08, W / 2, 800);
    const p = eBack(prog(lt, 0, .5)); ctx.save(); ctx.translate(W / 2 - 40, 820); ctx.scale(p, p); paperSheet(ctx, 0, 0, 440, 560, Math.sin(lt * 2) * .08, 7); ctx.restore();
    for (let i = 0; i < 5; i++) { const k = (lt * .5 + i / 5) % 1; paperSheet(ctx, 120 + i * 190, 1300 - k * 1100, 80, 100, lt * 2 + i, 3); }
    bigText(ctx, 'PEKİ YA KÂĞIT?', W / 2 - 40, 330, 96, C.cream, lt, 0, F_SANS, [C.ink, 12]);
    stampBox(ctx, 'RİVAYET', W / 2 - 40, 1210, 96, C.ink, lt, 1.4, -7);
  } },
  { s: 45.2, e: 48.25, draw(ctx, lt, d) { // Semerkant kâğıt atölyesi
    ctx.drawImage(paperTex('#dcc79c', 'shop'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    shape(ctx, [[-200, 1300], [1300, 1300], [1300, 2200], [-200, 2200]], '#a08a5c', C.ink, 5);
    line(ctx, [[60, 520], [1020, 540]], '#6e4a2c', 5, .5);
    for (let i = 0; i < 5; i++) { const sw = Math.sin(lt * 3 + i) * .08; ctx.save(); ctx.translate(140 + i * 190, 528 + i * 4); ctx.rotate(sw); paperSheet(ctx, 0, 80, 130, 150, 0, 0); ctx.restore(); }
    vat(ctx, 640, 1180, 1.1, lt);
    const dip = (Math.sin(lt * 2.4) + 1) / 2; const my = lerp(960, 1080, dip);
    worker(ctx, 300, 1300, 1.25, (my - 1300) / 1.25 + 20);
    ctx.save(); ctx.beginPath(); ctx.rect(-200, 0, W + 400, 1050); ctx.clip(); mould(ctx, 640, my, 260, 150, 0, dip < .5 ? 1 : 0); ctx.restore();
    if (dip < .45) for (let i = 0; i < 6; i++) { const k = (lt * 3 + i / 6) % 1; ell(ctx, 540 + i * 40, my + 80 + k * 90, 4, 7, '#6f9fb0', null); }
    tag(ctx, 'SEMERKANT', W / 2, 320, 72, lt, 0, ABBC);
    tag(ctx, 'ÇİNLİ ESİRLER ÖĞRETTİ (RİVAYET)', W / 2, 430, 44, lt, 1.0, C.red, C.cream, 2);
  } },
  { s: 48.25, e: 51.9, draw(ctx, lt, d) { // Bazı tarihçiler: daha önce geldi
    bg(ctx); camera(ctx, lt, d, 1, 1.06, W / 2, 850);
    [[300, 820, -.12], [560, 760, .08], [780, 880, -.05], [430, 1060, .1], [700, 1110, -.1]].forEach(([x, y, r], i) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(r); shape(ctx, [[-110, -80], [90, -90], [120, -20], [100, 90], [-100, 84], [-120, 10]], '#e6d3a4', C.ink, 4, 2);
      for (let j = 0; j < 4; j++) line(ctx, [[-80, -40 + j * 30], [-20, -46 + j * 30], [30, -38 + j * 30], [70, -44 + j * 30]], 'rgba(42,29,21,.55)', 4, 1.5); ctx.restore(); });
    const a = lt * 1.6; const gx = 540 + Math.cos(a) * 190, gy = 930 + Math.sin(a) * 140;
    ctx.save(); ctx.globalAlpha = .25; ell(ctx, gx, gy, 96, 96, '#fffbe8', null); ctx.restore();
    ell(ctx, gx, gy, 100, 100, null, '#6e4a2c', 16); line(ctx, [[gx + 70, gy + 70], [gx + 180, gy + 180]], '#6e4a2c', 26, .3);
    tag(ctx, 'BAZI TARİHÇİLERE GÖRE', W / 2, 320, 58, lt, 0, C.ink);
    stampBox(ctx, '751\'DEN ÖNCE', W / 2, 470, 80, C.red, lt, 2.4, -5, 'BÖLGEDE KÂĞIT VARDI');
  } },
  { s: 51.9, e: 55.95, draw(ctx, lt, d) { // Bağdat'ta kâğıt atölyesi
    ctx.drawImage(paperTex('#d9c393', 'mapland'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    line(ctx, [[-100, 1320], [300, 1300], [700, 1330], [1200, 1300]], '#6f9fb0', 30, 1.5);
    ctx.save(); ctx.translate(560, 880); ctx.rotate(lt * .05); ctx.translate(-560, -880); baghdad(ctx, 560, 880, 1.0, lt); ctx.restore();
    const n = Math.floor(clamp(lt / 3) * 7); for (let i = 0; i < n; i++) paperSheet(ctx, 820, 1250 - i * 16, 150, 110, (hash(i) - .5) * .2, 0);
    if (lt > 0) { const k = (lt * 2.3) % 1; paperSheet(ctx, lerp(560, 820, k), lerp(880, 1250 - n * 16, k) - Math.sin(k * Math.PI) * 120, 150, 110, k * 3, 0); }
    tag(ctx, 'KESİN OLAN', W / 2, 320, 60, lt, 0, C.ink);
    sealPro(ctx, 'Bağdat', 'Kâğıt atölyesi', 230, 1190, 130, C.red, lt, 1.2, '794 civarı');
    tag(ctx, 'YAKLAŞIK 40 YIL SONRA', W / 2, 460, 48, lt, 1.0, C.red);
  } },
  { s: 55.95, e: 59.45, draw(ctx, lt, d) { // Endülüs ve Sicilya üzerinden Avrupa'ya
    camera(ctx, lt, d, 1.0, 1.08, 560, 900); medMap(ctx);
    const kah = PE(31.2, 30.0), kay = PE(10.1, 35.7), kur = PE(-4.8, 37.9), pal = PE(13.4, 38.1);
    const route = [PE(40, 32.2), PE(35, 31.6), kah, PE(22, 31.2), kay, PE(3, 35.4), PE(-2, 35.8), kur];
    arrow(ctx, route, eInOut(prog(lt, 0, 2.0)), C.red, 12, true);
    const p2 = eInOut(prog(lt, 1.3, .9)); if (p2 > 0) arrow(ctx, [kay, PE(11.6, 37.0), pal, PE(12.7, 41.6), PE(10.5, 45.2)], p2, C.red, 10, true);
    const p3 = eInOut(prog(lt, 2.1, .9)); if (p3 > 0) arrow(ctx, [kur, PE(-2, 41.0), PE(1.5, 44.5)], p3, C.red, 10, true);
    tag(ctx, 'BAĞDAT\'TAN', kah[0] + 60, kah[1] + 70, 34, lt, .1, C.ink);
    pin(ctx, ...kur, .8, lt, 1.8, C.red); tag(ctx, 'ENDÜLÜS', kur[0] + 30, kur[1] + 60, 40, lt, 1.9, C.red);
    pin(ctx, ...pal, .8, lt, 1.6, C.red); tag(ctx, 'SİCİLYA', pal[0] + 40, pal[1] + 60, 36, lt, 1.7, C.red);
    tag(ctx, 'AVRUPA', ...PE(5, 47.5), 52, lt, 2.6, C.ink);
    tag(ctx, 'KUZEY AFRİKA', ...PE(8, 31.0), 36, lt, .6, '#a07a4a');
    { const k = eInOut(prog(lt, 0, 2.0)); const q = partial(route, k); const [x, y] = q[q.length - 1]; paperSheet(ctx, x, y - 70, 70, 86, Math.sin(lt * 4) * .2, 3); }
    tag(ctx, 'KÂĞIDIN YOLCULUĞU', W / 2, 300, 62, lt, 0, C.ink);
  } },
  { s: 59.45, e: 61.3, draw(ctx, lt, d) { // kılıçlar sustu
    ground(ctx, lt, { top: '#5a3a30', bot: '#d88a50', ground: '#7a6040', dark: true, sun: true, sunX: 540, sunY: lerp(860, 940, lt / d) }); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    const k = eInOut(prog(lt, .1, 1.4));
    sword(ctx, 480 - k * 40, lerp(820, 1180, k), 2.2, lerp(.55, .05, k)); sword(ctx, 600 + k * 40, lerp(820, 1180, k), 2.2, lerp(-.55, -.05, k));
    dust(ctx, lt, 540, 1260, 12, 'rgba(60,50,40,.3)');
    tag(ctx, 'KILIÇLAR SUSTU...', W / 2, 330, 68, lt, 0, C.cream, C.ink);
  } },
  { s: 61.3, e: DURATION, draw(ctx, lt, d) { // kalemler konuşmaya başladı
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    paperSheet(ctx, W / 2 - 40, 900, 560, 620, -.03, 0);
    const k = clamp(lt / 2.6); const rows = 6; let qx = 0, qy = 0;
    for (let r = 0; r < rows; r++) { const pr = clamp(k * rows - r); if (pr <= 0) break; const y = 680 + r * 80; const pts = []; for (let i = 0; i <= 30; i++) { const t = i / 30; pts.push([W / 2 - 260 + t * 440, y + Math.sin(t * 40 + r) * 9]); } const q = partial(pts, pr); line(ctx, q, C.ink, 5, .4); [qx, qy] = q[q.length - 1]; }
    if (qx) quill(ctx, qx, qy, 1.0, .1 + Math.sin(lt * 14) * .05);
    bigText(ctx, 'KALEMLER KONUŞTU', W / 2 - 40, 360, 84, C.cream, lt, .1, F_SANS, [C.ink, 12]);
  } },
];
