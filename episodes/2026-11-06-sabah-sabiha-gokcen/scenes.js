// ===== Sabiha Gökçen: dünyanın ilk kadın savaş pilotu (sabah) =====
// Not: Atatürk çizilmez (yalnızca adı geçer). Pilot yüz detayı olmadan, arkadan/uzaktan çizilir.
const KEY = ['SABİHA', 'GÖKÇEN', 'GÖKÇEN"', '"GÖKÇEN"', 'TÜRK', 'KIZIYDI!', 'TÜRKKUŞU\'NUN', 'TÜRKKUŞU\'NDA', 'ESKİŞEHİR\'DE', 'BRÖVESİNİ', 'SAVAŞ', 'PİLOTU', 'PİLOTU,', 'BALKAN', 'BAŞÖĞRETMEN', 'GÖKYÜZÜ,', 'HAVALİMANI', 'BURSA\'DA'];
const DURATION = 46.33 + 2.2;
const OUTRO_AT = DURATION - 1.6;

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
// ---- gökyüzü zemini ----
function sky(ctx, lt, o = {}) {
  const g = ctx.createLinearGradient(0, 0, 0, 1500);
  g.addColorStop(0, o.top || '#9cc3cf'); g.addColorStop(1, o.bot || '#f1e3c2');
  ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, H + 600);
  if (o.sun) { const sx = o.sunX || 760, sy = o.sunY || 600; const r = ctx.createRadialGradient(sx, sy, 20, sx, sy, 460); r.addColorStop(0, 'rgba(255,220,150,.85)'); r.addColorStop(1, 'rgba(255,220,150,0)'); ctx.fillStyle = r; ctx.fillRect(-300, -300, W + 600, H + 600); ell(ctx, sx, sy, 90, 90, '#f6c46a', null); }
  for (let i = 0; i < 6; i++) { const sp = o.fast ? 160 : 40; const x = ((lt * sp + i * 260 + hash(i) * 200) % 1600) - 300, y = 260 + (i % 3) * 230 + hash(i + 2) * 60; ctx.globalAlpha = .75; cloud(ctx, x, y, .7 + hash(i + 5) * .6); }
  ctx.globalAlpha = 1;
  // kâğıt dokusu (hafif)
  ctx.save(); ctx.globalAlpha = .28; ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(paperTex('#e8dcc0', '#e8dcc0'), 0, 0); ctx.restore();
}
function cloud(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ell(ctx, 0, 0, 110, 34, '#fff8ea', null); ell(ctx, -50, -16, 60, 34, '#fff8ea', null); ell(ctx, 40, -26, 70, 42, '#fff8ea', null); ctx.restore(); }
function hills(ctx, y = 1180, col = '#a9b27a') { shape(ctx, [[-300, y], [100, y - 50], [400, y - 10], [760, y - 60], [1100, y - 20], [1400, y], [1400, 2300], [-300, 2300]], col, C.ink, 5, 1.2); }
// ---- figürler ----
// 1930'ların çift kanatlı uçağı (yan görünüş, sağa bakar). lt: pervane dönüşü
function biplane(ctx, x, y, s, rot = 0, lt = 0, col = '#d8d2bf') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  // alt kanat + gövde + üst kanat
  shape(ctx, [[-60, 22], [90, 22], [96, 34], [-54, 34]], '#b9b29c', C.ink, 4, .5);
  shape(ctx, [[-210, -20], [-160, -36], [60, -40], [130, -30], [150, -6], [130, 16], [60, 22], [-160, 0]], col, C.ink, 5, .6);
  shape(ctx, [[-210, -20], [-236, -78], [-206, -80], [-170, -30]], col, C.ink, 4, .5); // dikey kuyruk
  shape(ctx, [[-226, -60], [-210, -60], [-206, -32], [-222, -32]], C.red, null); // kırmızı kuyruk bandı
  shape(ctx, [[-200, -8], [-250, -2], [-246, 8], [-190, 4]], col, C.ink, 4, .4); // yatay kuyruk
  shape(ctx, [[-30, -40], [10, -66], [60, -66], [70, -40]], '#3b3f44', C.ink, 4, .5); // kokpit
  line(ctx, [[-50, -40], [-50, -92]], C.ink, 4, .3); line(ctx, [[60, -40], [70, -92]], C.ink, 4, .3);
  shape(ctx, [[-80, -92], [110, -92], [116, -80], [-74, -80]], '#c9c2aa', C.ink, 4, .5);
  shape(ctx, [[0, -12], [40, -12], [40, 2], [0, 2]], C.red, null);
  line(ctx, [[30, 30], [20, 64]], C.ink, 4, .3); ell(ctx, 18, 70, 14, 14, '#3b3f44', C.ink, 3);
  // pervane (dönüyor)
  ell(ctx, 150, -6, 10, 10, '#6e4a2c', C.ink, 3); const k = Math.cos(lt * 40); line(ctx, [[156, -6 - 60 * k], [156, -6 + 60 * k]], 'rgba(42,29,21,.8)', 8, .2);
  ctx.globalAlpha = .25; ell(ctx, 158, -6, 6, 62, '#2a1d15', null); ctx.globalAlpha = 1;
  ctx.restore();
}
function glider(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-170, 0], [-120, -10], [60, -14], [110, -4], [60, 8], [-120, 6]], '#ece4d0', C.ink, 4, .5);
  shape(ctx, [[-170, 0], [-190, -50], [-168, -50], [-140, -6]], '#ece4d0', C.ink, 4, .4);
  shape(ctx, [[-120, -30], [140, -30], [146, -22], [-114, -22]], '#d9cfb4', C.ink, 4, .4);
  line(ctx, [[-10, -22], [0, -8]], C.ink, 3, .2); line(ctx, [[40, -22], [30, -8]], C.ink, 3, .2);
  ell(ctx, 50, -10, 16, 9, '#3b3f44', C.ink, 3);
  shape(ctx, [[-186, -44], [-172, -44], [-170, -28], [-182, -28]], C.red, null);
  ctx.restore();
}
function jet(ctx, x, y, s, rot = 0, col = '#f1efe9') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-200, -10], [120, -18], [180, -6], [120, 10], [-200, 8]], col, C.ink, 5, .5);
  shape(ctx, [[-20, 0], [-90, 70], [-60, 70], [40, 4]], '#cfd3d6', C.ink, 4, .4);
  shape(ctx, [[-170, -10], [-220, -80], [-190, -80], [-130, -12]], col, C.ink, 4, .4);
  shape(ctx, [[-214, -70], [-196, -70], [-178, -46], [-196, -46]], C.red, null);
  ell(ctx, -130, -22, 34, 12, '#cfd3d6', C.ink, 3);
  for (let i = 0; i < 6; i++) ell(ctx, 40 - i * 34, -6, 6, 5, '#3b3f44', null);
  shape(ctx, [[130, -14], [160, -10], [150, -4], [126, -6]], '#3b3f44', null);
  ctx.restore();
}
// Pilot — ARKADAN görünüş (yüz yok): deri kask, gözlük kayışı, dalgalanan beyaz atkı
function pilotBack(ctx, x, y, s, lt) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const w = Math.sin(lt * 7);
  shape(ctx, [[30, -300], [120 + w * 20, -300 + w * 18], [220 + w * 30, -270 + w * 30], [200 + w * 26, -240 + w * 24], [110, -268], [30, -272]], '#f6f1e6', C.ink, 4, .5); // atkı
  shape(ctx, [[-120, 0], [-130, -200], [-100, -270], [-40, -296], [40, -296], [100, -270], [130, -200], [120, 0]], '#6e4a2c', C.ink, 6, .6); // ceket
  line(ctx, [[0, -290], [0, -10]], '#4a3020', 4, .4); line(ctx, [[-120, -120], [120, -120]], '#4a3020', 10, .4);
  shape(ctx, [[-96, -230], [-150, -160], [-130, -96], [-104, -100], [-116, -160]], '#6e4a2c', C.ink, 5, .5); // kol (bel)
  shape(ctx, [[96, -230], [150, -160], [130, -96], [104, -100], [116, -160]], '#6e4a2c', C.ink, 5, .5);
  shape(ctx, [[-40, -296], [-30, -320], [30, -320], [40, -296]], '#f6f1e6', C.ink, 4, .4); // atkı yakası
  ell(ctx, 0, -370, 56, 62, '#5a3a22', C.ink, 6); // deri kask (arkadan)
  line(ctx, [[0, -430], [0, -312]], '#3e2a1a', 4, .3);
  line(ctx, [[-56, -378], [56, -378]], '#2a1d15', 9, .3); // gözlük kayışı
  shape(ctx, [[-62, -350], [-74, -300], [-50, -306], [-44, -340]], '#5a3a22', C.ink, 4, .4); shape(ctx, [[62, -350], [74, -300], [50, -306], [44, -340]], '#5a3a22', C.ink, 4, .4); // kulaklık
  ctx.restore();
}
function wingsBadge(ctx, x, y, s, shine = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  [-1, 1].forEach(sd => { for (let i = 0; i < 5; i++) { const L = 260 - i * 34; shape(ctx, [[sd * 60, -30 + i * 18], [sd * L, -60 + i * 26], [sd * (L - 24), -40 + i * 26], [sd * 60, -14 + i * 18]], i % 2 ? '#d9a630' : '#e9bf55', C.ink, 4, .3); } });
  ell(ctx, 0, 0, 70, 70, '#d9a630', C.ink, 6); ell(ctx, 0, 0, 50, 50, '#E30A17', C.ink, 4);
  if (shine > 0) { ctx.save(); ctx.globalAlpha = .6 * Math.sin(shine * Math.PI); ctx.beginPath(); ctx.ellipse(-280 + shine * 560, 0, 30, 110, .4, 0, 7); ctx.fillStyle = '#fffbe8'; ctx.fill(); ctx.restore(); }
  ctx.restore();
}
function bursa(ctx, lt) { // Uludağ + kubbeler
  shape(ctx, [[-300, 900], [100, 700], [300, 560], [460, 520], [620, 580], [900, 720], [1400, 880], [1400, 1300], [-300, 1300]], '#8fa08a', C.ink, 5, 1.2);
  shape(ctx, [[300, 560], [380, 530], [460, 520], [540, 545], [620, 580], [560, 600], [470, 575], [380, 600]], '#f6f1e6', null);
  shape(ctx, [[-300, 1140], [1400, 1120], [1400, 2300], [-300, 2300]], '#c2a86e', C.ink, 5, 1);
  // Ulu Cami benzeri çok kubbeli yapı
  shape(ctx, [[180, 1140], [180, 990], [820, 990], [820, 1140]], '#e9dcc0', C.ink, 6, .8);
  for (let r = 0; r < 1; r++) for (let i = 0; i < 5; i++) { const cx = 244 + i * 128; ctx.beginPath(); ctx.arc(cx, 990, 58, Math.PI, 0); ctx.fillStyle = '#8fa3a8'; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.stroke(); line(ctx, [[cx, 932], [cx, 908]], C.ink, 4, .2); }
  [[130, 1140], [870, 1140]].forEach(([mx, my]) => { shape(ctx, [[mx - 22, my], [mx - 22, my - 330], [mx + 22, my - 330], [mx + 22, my]], '#e9dcc0', C.ink, 5, .6); shape(ctx, [[mx - 22, my - 330], [mx, my - 400], [mx + 22, my - 330]], '#8fa3a8', C.ink, 4, .4); shape(ctx, [[mx - 32, my - 250], [mx + 32, my - 250], [mx + 32, my - 236], [mx - 32, my - 236]], '#bfa577', C.ink, 3, .3); });
  for (let i = 0; i < 5; i++) { const x = 270 + i * 128; shape(ctx, [[x - 18, 1140], [x - 18, 1070], [x, 1050], [x + 18, 1070], [x + 18, 1140]], '#5b4636', C.ink, 3, .4); }
}
function hangar(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-200, 0); ctx.lineTo(-200, -120); ctx.quadraticCurveTo(0, -260, 200, -120); ctx.lineTo(200, 0); ctx.closePath(); ctx.fillStyle = '#b8b2a0'; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.stroke();
  for (let i = -160; i <= 160; i += 40) line(ctx, [[i, 0], [i, -120 - (1 - (i / 200) ** 2) * 70]], 'rgba(42,29,21,.3)', 3, .3);
  shape(ctx, [[-120, 0], [-120, -110], [120, -110], [120, 0]], '#3b3f44', C.ink, 5, .5);
  ctx.restore();
}
function windsock(ctx, x, y, lt) {
  line(ctx, [[x, y], [x, y - 200]], '#6e4a2c', 6, .3);
  for (let i = 0; i < 4; i++) { const a = Math.sin(lt * 6 + i) * 6; shape(ctx, [[x + i * 34, y - 200 + a * .2 - (4 - i) * 2], [x + (i + 1) * 34, y - 196 + a - (3 - i) * 2], [x + (i + 1) * 34, y - 170 + a + (3 - i) * 2], [x + i * 34, y - 166 + a * .2 + (4 - i) * 2]], i % 2 ? '#f6f1e6' : '#e2572b', C.ink, 3, .3); }
}
function trail(ctx, pts, col = 'rgba(255,255,255,.8)') { ctx.save(); ctx.setLineDash([2, 18]); line(ctx, pts, col, 10, .2); ctx.restore(); }
function airport(ctx, lt) {
  shape(ctx, [[-300, 1160], [1400, 1160], [1400, 2300], [-300, 2300]], '#9a9a8a', C.ink, 5, 1);
  for (let i = 0; i < 10; i++) shape(ctx, [[-100 + i * 140 - ((lt * 200) % 140), 1240], [-30 + i * 140 - ((lt * 200) % 140), 1240], [-30 + i * 140 - ((lt * 200) % 140), 1252], [-100 + i * 140 - ((lt * 200) % 140), 1252]], '#f3efe6', null);
  shape(ctx, [[120, 1160], [140, 1000], [940, 1000], [960, 1160]], '#d9d4c4', C.ink, 6, .8);
  ctx.beginPath(); ctx.moveTo(120, 1000); ctx.quadraticCurveTo(540, 900, 960, 1000); ctx.fillStyle = '#b8c4c8'; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.stroke();
  for (let i = 0; i < 12; i++) shape(ctx, [[160 + i * 64, 1030], [200 + i * 64, 1030], [200 + i * 64, 1130], [160 + i * 64, 1130]], '#7fa3b0', C.ink, 3, .3);
  shape(ctx, [[790, 1000], [800, 700], [840, 700], [850, 1000]], '#d9d4c4', C.ink, 5, .6);
  shape(ctx, [[760, 700], [880, 700], [860, 630], [780, 630]], '#7fa3b0', C.ink, 5, .5);
  shape(ctx, [[770, 630], [870, 630], [850, 610], [790, 610]], '#d9d4c4', C.ink, 4, .4);
}
const BAL = { x: 540, y: 820, lon: 23.5, lat: 41.5, k: 70 };
const PB = (lon, lat) => proj(BAL, lon, lat);
const ADRIATIC = [[12.2, 45.5], [13.7, 45.7], [14.5, 45.2], [15.2, 44.2], [16.4, 43.5], [17.6, 43.0], [18.5, 42.4], [19.4, 41.9], [19.5, 40.8], [19.3, 40.3], [18.5, 40.1], [16.9, 41.1], [16.0, 41.9], [15.0, 42.0], [14.0, 42.6], [13.6, 43.5], [12.4, 44.2], [5, 44], [5, 46]];
const AEGEAN = [[22.6, 40.5], [23.5, 40.2], [24.2, 40.8], [26.0, 40.6], [26.7, 40.35], [26.2, 40.05], [26.1, 39.5], [26.6, 39.3], [26.9, 38.7], [26.3, 38.25], [26.9, 38.0], [27.3, 37.3], [27.6, 36.7], [24, 35], [21, 35], [21.6, 36.8], [22.5, 36.4], [23.2, 36.4], [22.9, 37.5], [24.0, 37.6], [22.9, 38.0], [23.2, 39.2]];
const IONIAN = [[19.3, 40.3], [20.2, 39.6], [21.1, 37.9], [21.6, 36.8], [21, 35], [15, 35], [16.6, 38.5], [17.1, 39.0], [16.6, 39.7], [17.0, 40.5], [18.5, 40.1]];
const DANUBE = [[18.9, 45.9], [19.0, 45.4], [20.0, 45.25], [20.46, 44.82], [21.4, 44.7], [22.5, 44.6], [22.9, 44.0], [24.0, 43.7], [25.9, 43.8], [27.2, 44.1], [28.2, 45.4], [29.6, 45.2]];
function balkanMap(ctx) {
  regionMap(ctx, BAL, { seas: [SEA_BLACK, SEA_MARMARA, ADRIATIC, AEGEAN, IONIAN] });
  line(ctx, DANUBE.map(p => PB(...p)), '#6f9fb0', 8, .6);
  mountains(ctx, BAL, [[24, 42.0], [25.5, 42.6], [23, 42.6], [21, 42.4], [20.5, 41.2], [22, 40.0], [24.5, 45.5], [22.5, 44.6], [19.5, 43.6]]);
}

const SCENES = [
  { s: 0, e: 2.3, draw(ctx, lt, d) { // HOOK
    ctx.save(); hookCard(ctx, lt, d, 'Dünyanın ilk kadın savaş pilotu', 'BİR TÜRK KIZIYDI'); ctx.restore();
    biplane(ctx, lerp(-250, 1300, lt / d), 1210 - Math.sin(lt * 2) * 30, .8, -.05, lt);
    trail(ctx, [[-400, 1215], [lerp(-450, 1100, lt / d), 1215 - Math.sin(lt * 2) * 30]], 'rgba(243,233,210,.7)');
  } },
  { s: 2.3, e: 4.95, draw(ctx, lt, d) { // Adı Sabiha Gökçen
    sky(ctx, lt, { fast: true }); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    hills(ctx, 1220);
    flagPole(ctx, 160, 1210, 420, 150, .7, lt);
    const a = lt * 1.6; biplane(ctx, 600 + Math.cos(a) * 180, 720 + Math.sin(a) * 120, 1.25, Math.sin(a) * .15, lt);
    tag(ctx, 'SABİHA GÖKÇEN', W / 2, 330, 84, lt, .9, C.red, C.cream, -2);
  } },
  { s: 4.95, e: 7.15, draw(ctx, lt, d) { // 1913 Bursa
    sky(ctx, lt, { top: '#b9cfd3' }); camera(ctx, lt, d, 1, 1.08, W / 2, 900); bursa(ctx, lt);
    for (let i = 0; i < 5; i++) { const k = (lt * .5 + i / 5) % 1; ctx.save(); ctx.translate(lerp(100, 980, k), 470 + Math.sin(k * 10 + i) * 30); line(ctx, [[-14, -6], [0, 0], [14, -6]], C.ink, 4, .2); ctx.restore(); }
    tag(ctx, 'BURSA', 540, 330, 80, lt, 0, C.ink);
    sealPro(ctx, '1913', 'Doğum yılı', 790, 820, 120, C.red, lt, .5, 'BURSA');
  } },
  { s: 7.15, e: 11.1, draw(ctx, lt, d) { // Atatürk'ün manevi kızı (sembolle)
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 850);
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = '#E30A17'; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .2; ctx.beginPath(); ctx.moveTo(W / 2, 820); ctx.arc(W / 2, 820, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    flagPole(ctx, 300, 1250, 700, 260, .8, lt);
    tag(ctx, '12 YAŞINDA', W / 2, 330, 64, lt, .1, C.ink);
    tag(ctx, 'ATATÜRK\'ÜN MANEVİ KIZI', W / 2, 1150, 58, lt, 1.0, C.red, C.cream, 2);
    sealPro(ctx, '1925', 'Bursa ziyareti', 780, 960, 120, C.ink, lt, 2.0, '');
  } },
  { s: 11.1, e: 14.9, draw(ctx, lt, d) { // Soyadı Kanunu: kâğıda "Gökçen"
    bg(ctx); camera(ctx, lt, d, 1, 1.07, W / 2, 850);
    ctx.save(); ctx.translate(W / 2 - 40, 860); ctx.rotate(-.03);
    shape(ctx, [[-300, -240], [300, -240], [300, 240], [-300, 240]], '#f6eedb', C.ink, 5, .8);
    for (let i = 0; i < 6; i++) line(ctx, [[-250, -150 + i * 66], [250, -150 + i * 66]], 'rgba(62,95,138,.2)', 3, .3);
    const k = clamp((lt - 1.8) / 1.4);
    ctx.save(); ctx.beginPath(); ctx.rect(-260, -150, 520 * k, 300); ctx.clip(); ctx.font = `italic 700 150px ${F_SERIF}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = C.navy; ctx.fillText('Gökçen', 0, 10); ctx.restore();
    if (k > 0 && k < 1) { ctx.save(); ctx.translate(-260 + 520 * k, 30 + Math.sin(lt * 30) * 12); ctx.rotate(.5); shape(ctx, [[0, 0], [10, -24], [24, -200], [6, -200], [-8, -24]], '#2a2d33', C.ink, 3, .3); ctx.restore(); }
    ctx.restore();
    sealPro(ctx, '1934', 'Soyadı Kanunu', 250, 440, 110, C.red, lt, .1, '');
    tag(ctx, 'SOYADINI ATATÜRK VERDİ', 600, 1230, 50, lt, .8, C.ink);
  } },
  { s: 14.9, e: 17.6, draw(ctx, lt, d) { // Gökle ilgili bir isim... kaderi oldu
    const up = eInOut(lt / d) * 500; ctx.translate(0, up * .0); sky(ctx, lt, { top: '#7fb0c4', bot: '#e8eef0', sun: true, sunX: 700, sunY: 560 }); camera(ctx, lt, d, 1, 1.12, W / 2, 700);
    bigText(ctx, 'GÖKÇEN', W / 2 - 40, lerp(1050, 760, eOut(prog(lt, 0, 1.6))), 170, C.cream, lt, 0, F_SANS, [C.navy, 16]);
    tag(ctx, 'GÖKLE İLGİLİ BİR İSİM', W / 2, 330, 58, lt, .3, C.navy);
    biplane(ctx, lerp(-200, 1250, prog(lt, .8, 1.9)), lerp(1100, 950, prog(lt, .8, 1.9)), .8, -.12, lt);
    tag(ctx, 'VE KADERİ OLDU', W / 2, 1150, 56, lt, 1.6, C.red, C.cream, 2);
  } },
  { s: 17.6, e: 21.25, draw(ctx, lt, d) { // 1935 Türkkuşu
    sky(ctx, lt, { top: '#a8c8d2' }); camera(ctx, lt, d, 1, 1.06, W / 2, 900); hills(ctx, 1220, '#b9b27a');
    const k = lt / d; glider(ctx, lerp(150, 760, k), 760 + Math.sin(lt * 1.8) * 50, 1.6, Math.sin(lt * 1.8 + 1) * .08);
    glider(ctx, lerp(-200, 400, k), 1000 + Math.sin(lt * 2 + 2) * 30, .8, .05);
    sealPro(ctx, '1935', 'Türkkuşu', 260, 450, 110, C.red, lt, .1, '');
    tag(ctx, 'İLK KADIN ÖĞRENCİ', 640, 1150, 60, lt, 2.6, C.red, C.cream, 2);
    tag(ctx, 'TÜRKKUŞU', 680, 360, 70, lt, .6, C.navy);
  } },
  { s: 21.25, e: 24.45, draw(ctx, lt, d) { // Eskişehir askerî uçuş eğitimi
    sky(ctx, lt, { top: '#b4ccd0' }); camera(ctx, lt, d, 1, 1.06, W / 2, 1000);
    shape(ctx, [[-300, 1120], [1400, 1110], [1400, 2300], [-300, 2300]], '#b7a86e', C.ink, 5, 1);
    hangar(ctx, 270, 1120, 1.0); windsock(ctx, 860, 1120, lt);
    const k = eInOut(prog(lt, .4, 2.6)); biplane(ctx, lerp(250, 1100, k), lerp(1080, 760, k * k), 1.05, -k * .35, lt);
    dust(ctx, lt, lerp(150, 700, k), 1110, 8);
    tag(ctx, 'ESKİŞEHİR', W / 2, 330, 76, lt, 0, C.ink);
    tag(ctx, 'ASKERÎ UÇUŞ EĞİTİMİ', W / 2, 470, 54, lt, .8, C.red);
  } },
  { s: 24.45, e: 26.65, draw(ctx, lt, d) { // 30 Ağustos 1937
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.08, W / 2, 800);
    const fl = eInOut(prog(lt, .1, .7));
    ctx.save(); ctx.translate(W / 2 - 40, 820);
    shape(ctx, [[-240, -300], [240, -300], [240, 300], [-240, 300]], '#f6eedb', C.ink, 6, .8);
    shape(ctx, [[-240, -300], [240, -300], [240, -170], [-240, -170]], C.red, C.ink, 6, .8);
    text(ctx, 'AĞUSTOS', 0, -232, 64, C.cream); text(ctx, '30', 0, 40, 260, C.ink, F_SANS);
    text(ctx, '1937', 0, 220, 64, C.red);
    if (fl < 1) { ctx.save(); ctx.translate(0, -170); ctx.scale(1, 1 - fl); ctx.globalAlpha = 1 - fl * .6; shape(ctx, [[-240, 0], [240, 0], [240, 470], [-240, 470]], '#f6eedb', C.ink, 5, .8); text(ctx, '29', 0, 210, 260, C.ink); ctx.restore(); }
    ctx.restore();
    biplane(ctx, lerp(-200, 1300, lt / d), 330 + Math.sin(lt * 2) * 20, .6, 0, lt);
  } },
  { s: 26.65, e: 28.65, draw(ctx, lt, d) { // Askerî pilot brövesi
    ctx.drawImage(paperTex('#2f3a4a', 'navy'), 0, 0); camera(ctx, lt, d, 1.0, 1.1, W / 2, 800); shake(ctx, lt, .45, 10);
    ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#f6c46a'; for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2 + lt * .4; ctx.beginPath(); ctx.moveTo(W / 2 - 40, 820); ctx.arc(W / 2 - 40, 820, 1000, a, a + .1); ctx.fill(); } ctx.restore();
    const p = eBack(prog(lt, 0, .45)); wingsBadge(ctx, W / 2 - 40, 820, 1.4 * Math.max(.01, p), prog(lt, .6, 1.0));
    tag(ctx, 'ASKERÎ PİLOT BRÖVESİ', W / 2 - 40, 1180, 60, lt, .5, C.gold, C.ink, -2);
    tag(ctx, '30 AĞUSTOS 1937', W / 2 - 40, 400, 56, lt, .1, C.cream, C.ink, 2);
  } },
  { s: 28.65, e: 31.15, draw(ctx, lt, d) { // dünyanın ilk kadın savaş pilotu
    sky(ctx, lt, { top: '#e7b47a', bot: '#f6e3c0', sun: true, sunX: 620, sunY: 560 }); camera(ctx, lt, d, 1.04, 1.0, W / 2, 1000);
    shape(ctx, [[-300, 1180], [1400, 1170], [1400, 2300], [-300, 2300]], '#b7a86e', C.ink, 5, 1);
    biplane(ctx, 690, 1150, 1.1, 0, lt * .15);
    flagPole(ctx, 880, 1180, 560, 150, .7, lt);
    pilotBack(ctx, 330, 1330, 1.05, lt);
    stampBox(ctx, 'DÜNYADA BİR İLK', W / 2, 330, 84, C.red, lt, .9, -6);
  } },
  { s: 31.15, e: 34.8, draw(ctx, lt, d) { // 1938 Balkan uçuşu
    camera(ctx, lt, d, 1, 1.06, W / 2, 820); balkanMap(ctx);
    const loop = [PB(28.82, 40.98), PB(23.7, 38.0), PB(20.46, 44.8), PB(26.1, 44.43), PB(23.3, 42.7), PB(28.82, 40.98)];
    const pts = []; for (let i = 0; i < loop.length - 1; i++) { const a = loop[i], b = loop[i + 1]; const m = [(a[0] + b[0]) / 2 + (b[1] - a[1]) * .15, (a[1] + b[1]) / 2 - (b[0] - a[0]) * .15]; curvePts(a, m, b, 20).forEach(q => pts.push(q)); }
    const k = eInOut(prog(lt, .2, 3.2)); arrow(ctx, pts, k, C.red, 10, true);
    const q = partial(pts, Math.max(k, .01)); const e = q[q.length - 1], f = q[Math.max(0, q.length - 3)];
    ctx.save(); ctx.translate(e[0], e[1]); const ang = Math.atan2(e[1] - f[1], e[0] - f[0]); ctx.scale(Math.cos(ang) < 0 ? -1 : 1, 1); biplane(ctx, 0, -10, .5, Math.cos(ang) < 0 ? -Math.atan2(e[1] - f[1], -(e[0] - f[0])) : ang, lt); ctx.restore();
    pin(ctx, ...loop[0], .9, lt, 0, C.red); tag(ctx, 'İSTANBUL', loop[0][0] - 20, loop[0][1] + 60, 36, lt, .1, C.red);
    tag(ctx, 'BALKAN UÇUŞU', W / 2, 300, 70, lt, 0, C.ink);
    text(ctx, '(Temsili rota)', W / 2, 410, 30, 'rgba(42,29,21,.75)', F_SANS, 700);
    sealPro(ctx, '1938', 'Balkan uçuşu', 790, 1170, 115, C.red, lt, .6, 'TEK BAŞINA');
  } },
  { s: 34.8, e: 37.9, draw(ctx, lt, d) { // başöğretmen: pilot yetiştirdi
    sky(ctx, lt, { top: '#a8c8d2', fast: true }); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    const bob = i => Math.sin(lt * 2 + i) * 14;
    biplane(ctx, 600, 640 + bob(0), .9, 0, lt);
    [[-1, 1], [1, 1], [-1, 2], [1, 2]].forEach(([sd, r], i) => { const x = 600 - r * 190, y = 640 + sd * r * 140; glider(ctx, x, y + bob(i + 1), .75, 0); });
    tag(ctx, 'TÜRKKUŞU BAŞÖĞRETMENİ', W / 2, 330, 58, lt, 0, C.navy);
    tag(ctx, 'PİLOT YETİŞTİRDİ', W / 2, 1180, 60, lt, 1.2, C.red, C.cream, 2);
  } },
  { s: 37.9, e: 39.85, draw(ctx, lt, d) { // 83 yaşında bile uçtu
    sky(ctx, lt, { top: '#86b4c8', fast: true }); camera(ctx, lt, d, 1, 1.08, W / 2, 800);
    const k = lt / d; jet(ctx, lerp(150, 900, k), lerp(1000, 640, k), 1.3, -.32);
    trail(ctx, [[lerp(-300, 400, k), lerp(1260, 900, k)], [lerp(-100, 650, k), lerp(1150, 800, k)]]);
    stampBox(ctx, '83 YAŞINDA', W / 2, 330, 104, C.red, lt, .1, -6);
    sealPro(ctx, '1996', 'Son uçuşu', 280, 1180, 100, C.ink, lt, .8, '');
  } },
  { s: 39.85, e: 42.95, draw(ctx, lt, d) { // İstanbul'daki havalimanı
    sky(ctx, lt, { top: '#9cc3cf' }); camera(ctx, lt, d, 1, 1.05, W / 2, 1000); airport(ctx, lt);
    const k = eInOut(prog(lt, .3, 2.6)); jet(ctx, lerp(-100, 1000, k), lerp(1200, 620, k * k), 1.0, -k * .35);
    tag(ctx, 'İSTANBUL', W / 2, 330, 72, lt, 0, C.ink);
    tag(ctx, 'SABİHA GÖKÇEN HAVALİMANI', W / 2, 470, 52, lt, .7, C.red, C.cream, 2);
  } },
  { s: 42.95, e: 45.0, draw(ctx, lt, d) { // Gökyüzü,
    sky(ctx, lt, { top: '#e09a66', bot: '#f6dcb0', sun: true, sunX: 560, sunY: 760 }); camera(ctx, lt, d, 1, 1.1, 560, 760);
    hills(ctx, 1200, '#8a7a5a');
    const k = lt / d; biplane(ctx, lerp(200, 520, k), lerp(980, 780, k), lerp(1.1, .45, k), -.2, lt);
    flagPole(ctx, 180, 1200, 460, 140, .7, lt);
    tag(ctx, 'GÖKYÜZÜ...', W / 2, 330, 80, lt, 0, C.cream, C.ink);
  } },
  { s: 45.0, e: DURATION, draw(ctx, lt, d) { // bir soyadından fazlası
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    const pts = []; for (let i = 0; i <= 80; i++) { const a = -Math.PI / 2 + i / 80 * Math.PI * 2; pts.push([W / 2 - 40 + Math.cos(a) * 260, 860 + Math.sin(a) * 200]); }
    const k = clamp(lt / 2.2); const q = partial(pts, Math.max(k, .01)); trail(ctx, q, 'rgba(243,233,210,.85)');
    const e = q[q.length - 1], f = q[Math.max(0, q.length - 2)]; const ang = Math.atan2(e[1] - f[1], e[0] - f[0]);
    biplane(ctx, e[0], e[1], .6, ang, lt);
    bigText(ctx, 'BİR SOYADINDAN', W / 2 - 40, 330, 80, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    bigText(ctx, 'ÇOK DAHA FAZLASI', W / 2 - 40, 440, 80, C.cream, lt, .3, F_SANS, [C.ink, 12]);
  } },
];
