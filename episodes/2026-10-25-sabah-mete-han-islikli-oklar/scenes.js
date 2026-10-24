// ===== Mete Han'ın ıslıklı okları (sabah) =====
const KEY = ['ISLIK', 'ISLIKLI', 'METE', 'TUMAN', 'HUN', 'ON BİN', 'ATLI', 'SİMA', 'ÇİEN', 'TEREDDÜT', 'ŞAŞMADI', 'TAHTINA', 'ONLU', 'DİSİPLİN', 'İMPARATORLUK', 'DOKUZDA'];
const DURATION = 48.95 + 2.2;
const OUTRO_AT = DURATION - 1.6;
const ASIA = { x: 560, y: 820, lon: 105, lat: 42, k: 26 };

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}

// ---- bölüme özel figürler ----
// bozkır zemini: gök, uzak tepeler, çimen; bulutlar akar
function steppe(ctx, lt, o = {}) {
  const sky = ctx.createLinearGradient(0, 0, 0, 1150);
  sky.addColorStop(0, o.dark ? '#2a2620' : '#e9d9b4'); sky.addColorStop(1, o.dark ? '#5a4632' : '#f3e6c6');
  ctx.fillStyle = sky; ctx.fillRect(-300, -300, W + 600, 1500);
  if (o.sun) { const g = ctx.createRadialGradient(700, 640, 20, 700, 640, 420); g.addColorStop(0, 'rgba(240,170,80,.75)'); g.addColorStop(1, 'rgba(240,170,80,0)'); ctx.fillStyle = g; ctx.fillRect(-300, 0, W + 600, 1200); ell(ctx, 700, 640, 110, 110, '#e8a24a', null); }
  for (let i = 0; i < 4; i++) { const x = ((lt * 30 + i * 330) % 1500) - 250, y = 300 + (i % 2) * 130; ctx.globalAlpha = o.dark ? .12 : .5; ell(ctx, x, y, 110, 26, '#fff8e8', null); ell(ctx, x + 60, y - 18, 70, 24, '#fff8e8', null); }
  ctx.globalAlpha = 1;
  shape(ctx, [[-300, 1060], [-100, 990], [150, 1030], [380, 960], [620, 1020], [860, 950], [1100, 1010], [1400, 980], [1400, 2200], [-300, 2200]], o.dark ? '#3b3022' : '#c9b27a', C.ink, 5, 1.2);
  shape(ctx, [[-300, 1120], [200, 1100], [600, 1130], [1000, 1095], [1400, 1120], [1400, 2200], [-300, 2200]], o.dark ? '#2f281c' : '#b39a5c', null);
  ctx.strokeStyle = o.dark ? 'rgba(0,0,0,.3)' : 'rgba(90,70,30,.35)'; ctx.lineWidth = 3;
  for (let i = 0; i < 40; i++) { const x = hash(i) * W, y = 1140 + hash(i + 9) * 600; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6 + Math.sin(lt * 3 + i) * 4, y - 22); ctx.stroke(); }
}
// Hun hükümdarı büstü: sivri keçe börk (kürk kenarlı). o: {robe, old (ak sakal), young (bıyık), dir}
function hunBey(ctx, x, y, s, o = {}) {
  const dir = o.dir || 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  const robe = o.robe || '#7a3b26';
  shape(ctx, [[-170, 260], [-160, 120], [-110, 70], [-40, 52], [40, 52], [110, 70], [160, 120], [170, 260]], robe, C.ink, 6);
  shape(ctx, [[-40, 52], [-10, 150], [-60, 260], [-100, 260], [-110, 80]], '#8a6a48', C.ink, 5); // kürk yaka
  shape(ctx, [[40, 52], [10, 150], [60, 260], [100, 260], [110, 80]], '#8a6a48', C.ink, 5);
  line(ctx, [[-150, 205], [150, 205]], C.gold, 10);
  shape(ctx, [[-26, 60], [-24, 20], [24, 20], [26, 60]], C.skin, C.ink, 5);
  ell(ctx, 0, -40, 68, 82, C.skin, C.ink, 6);
  ell(ctx, -68, -36, 11, 17, C.skin, C.ink, 4); ell(ctx, 68, -36, 11, 17, C.skin, C.ink, 4);
  ell(ctx, -25, -46, 6, 7, C.ink, null); ell(ctx, 25, -46, 6, 7, C.ink, null);
  const bc = o.old ? '#d8d2c4' : '#3a2618';
  line(ctx, [[-44, -68], [-12, -63]], o.old ? '#9a948a' : C.ink, 7); line(ctx, [[12, -63], [44, -68]], o.old ? '#9a948a' : C.ink, 7);
  line(ctx, [[0, -42], [-6, -12], [6, -10]], C.ink, 4);
  if (o.old) {
    shape(ctx, [[-64, -18], [-58, 30], [-34, 86], [0, 108], [34, 86], [58, 30], [64, -18], [38, 8], [0, 14], [-38, 8]], bc, C.ink, 4);
    shape(ctx, [[0, 6], [-40, 10], [-62, 34], [-30, 22], [0, 16], [30, 22], [62, 34], [40, 10]], bc, C.ink, 3);
  } else {
    shape(ctx, [[0, 4], [-30, 6], [-58, 24], [-66, 44], [-46, 30], [-20, 18], [0, 14], [20, 18], [46, 30], [66, 44], [58, 24], [30, 6]], '#2a1d15', C.ink, 2, .8);
    ell(ctx, 0, 30, 12, 3, C.ink, C.ink, 3);
  }
  // sivri börk + kürk kenar
  shape(ctx, [[-66, -98], [-48, -186], [-12, -246], [10, -256], [32, -230], [58, -176], [70, -98]], o.hat || '#b7342a', C.ink, 6);
  line(ctx, [[-30, -110], [4, -240]], 'rgba(42,29,21,.35)', 3); line(ctx, [[30, -110], [12, -240]], 'rgba(42,29,21,.35)', 3);
  shape(ctx, [[-84, -112], [-82, -78], [84, -78], [86, -112]], '#6e4a2c', C.ink, 6);
  for (let i = -70; i <= 70; i += 20) line(ctx, [[i, -106], [i + 6, -84]], '#4a3020', 3);
  ell(ctx, 10, -256, 11, 11, C.gold, C.ink, 4);
  ctx.restore();
}
// eyerli at (binicisiz) — horseArcher ile aynı temiz silüet dili. ph: evre, amp: bacak hareketi
function horse(ctx, x, y, s, dir = 1, ph = 0, color = '#3a2e24', amp = .25) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  const L = (ang, hx, hy) => { const a2 = ang * .6 - .3; const kx = hx + Math.sin(ang) * 46, ky = hy + Math.cos(ang) * 46; line(ctx, [[hx, hy], [kx, ky], [kx + Math.sin(a2) * 46, ky + Math.cos(a2) * 46]], color, 12, .5); };
  const sw = Math.sin(ph) * amp, cw = Math.cos(ph) * amp;
  L(sw, 55, -10); L(-sw, 70, -10); L(cw, -60, -10); L(-cw, -45, -10);
  ell(ctx, 0, -40, 92, 40, color, null);
  const hb = Math.sin(ph * .8) * 3;
  shape(ctx, [[44, -70], [72, -112], [98, -146], [120, -160 + hb], [146, -154 + hb], [166, -130 + hb], [164, -118 + hb], [142, -122 + hb], [122, -110], [104, -76], [92, -30]], color, null);
  shape(ctx, [[116, -154 + hb], [122, -180 + hb], [132, -156 + hb]], color, null);
  line(ctx, [[48, -78], [76, -118], [104, -152 + hb]], '#1a120c', 9, .4);
  ell(ctx, 140, -142 + hb, 3.5, 3.5, '#f3e9d2', null);
  shape(ctx, [[-88, -50], [-128, -34 + Math.sin(ph * 1.3) * 10], [-138, 14 + Math.sin(ph * 1.3) * 12], [-104, -32]], '#1a120c', null);
  shape(ctx, [[-38, -78], [34, -78], [40, -40], [-44, -40]], C.red, C.ink, 3, .4);
  line(ctx, [[-40, -48], [36, -48]], C.gold, 5, .3);
  ctx.restore();
}
// ıslıklı ok: uçta delikli kemik düdük; t: ses dalgası animasyonu
function whistleArrow(ctx, x, y, ang, s = 1, t = 0, sound = true) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  if (sound) for (let i = 0; i < 4; i++) { const k = ((t * 2.2 + i / 4) % 1); ctx.globalAlpha = (1 - k) * .8; ctx.beginPath(); ctx.arc(-40 - k * 240, 0, 30 + k * 60, -0.7, 0.7); ctx.strokeStyle = C.red; ctx.lineWidth = 6; ctx.stroke(); }
  ctx.globalAlpha = 1;
  line(ctx, [[-260, 0], [40, 0]], '#6e4a2c', 9, .3);
  shape(ctx, [[-260, 0], [-300, -30], [-240, -30], [-210, 0]], C.red, C.ink, 3, .4);
  shape(ctx, [[-260, 0], [-300, 30], [-240, 30], [-210, 0]], C.red, C.ink, 3, .4);
  ell(ctx, 30, 0, 34, 22, '#efe4cc', C.ink, 5);
  [-8, 12, 32].forEach(hx => ell(ctx, hx + 2, -6, 5, 6, C.ink, null));
  shape(ctx, [[60, 0], [100, 0], [62, -16]], '#cfd3d6', C.ink, 3, .3); shape(ctx, [[60, 0], [100, 0], [62, 16]], '#cfd3d6', C.ink, 3, .3);
  ctx.restore();
}
// hedef tahtası
function target(ctx, x, y, r) { [[1, '#efe4cc'], [.72, C.red], [.46, '#efe4cc'], [.22, C.red]].forEach(([k, c]) => ell(ctx, x, y, r * k, r * k, c, C.ink, 5)); line(ctx, [[x, y + r], [x - r * .6, y + r * 2]], '#6e4a2c', 10); line(ctx, [[x, y + r], [x + r * .6, y + r * 2]], '#6e4a2c', 10); }
// tuğ (at kuyruğu sancak), rüzgârda dalgalanır
function tug(ctx, x, y, h, lt) {
  line(ctx, [[x, y], [x, y - h]], '#6e4a2c', 10, .4); ell(ctx, x, y - h - 10, 14, 14, C.gold, C.ink, 4);
  for (let i = 0; i < 7; i++) { const a = (i - 3) * 6; const sw = Math.sin(lt * 4 + i * .6) * 22; line(ctx, [[x, y - h + 10], [x + a + sw * .5 + 20, y - h + 70], [x + a + sw + 40, y - h + 150]], i % 2 ? '#2a1d15' : '#5a4632', 9, .4); }
}
// okçu piyon sırası (yay çekili)
function archerRow(ctx, lt, y, n, x0, gap, s, color = '#5a4632', hes = [], skip = []) {
  for (let i = 0; i < n; i++) { if (skip.includes(i)) continue;
    const h = hes.includes(i); const bob = Math.sin(lt * 6 + i) * 3; const shake2 = h ? Math.sin(lt * 40 + i) * 4 : 0;
    const x = x0 + i * gap + shake2;
    pawn(ctx, x, y + bob, s, h ? '#8b7f6c' : color);
    ctx.beginPath(); ctx.arc(x + 20 * s, y - 24 * s + bob, 22 * s, -1.2, 1.2); ctx.strokeStyle = C.ink; ctx.lineWidth = 4 * s; ctx.stroke();
  }
}
// bir sürü ok aynı hedefe uçar
function volley(ctx, lt, from, to, n, t0, dur, color = C.ink) {
  for (let i = 0; i < n; i++) {
    const st = t0 + i * .03, p = prog(lt, st, dur); if (p <= 0 || p >= 1) continue;
    const fx = from[0] + (hash(i) - .5) * from[2], fy = from[1] + (hash(i + 3) - .5) * 60;
    const tx = to[0] + (hash(i + 7) - .5) * 60, ty = to[1] + (hash(i + 11) - .5) * 60;
    const x = lerp(fx, tx, p), y = lerp(fy, ty, p) - Math.sin(p * Math.PI) * 140;
    const ang = Math.atan2((ty - fy) - Math.cos(p * Math.PI) * 140 * Math.PI, tx - fx);
    arrowShot(ctx, x, y, ang, 60, color);
  }
}
function stuck(ctx, to, n, color = C.ink) { for (let i = 0; i < n; i++) { const tx = to[0] + (hash(i + 7) - .5) * 60, ty = to[1] + (hash(i + 11) - .5) * 60; line(ctx, [[tx, ty], [tx - 50, ty + 6 - hash(i) * 12]], color, 4, .2); } }

const SCENES = [
  { s: 0, e: 2.3, draw(ctx, lt, d) { // HOOK — gün batımı bozkır, ekrana vınlayarak gelen ıslıklı ok
    shake(ctx, lt, 0, 18, .32);
    const z = lt < .3 ? lerp(1.16, 1.0, eOut(lt / .3)) : lerp(1.0, 1.05, eInOut((lt - .3) / (d - .3)));
    ctx.translate(W / 2, 900); ctx.scale(z, z); ctx.translate(-W / 2, -900);
    const sky = ctx.createLinearGradient(0, 0, 0, 1250); sky.addColorStop(0, '#2b1c26'); sky.addColorStop(.5, '#a6493a'); sky.addColorStop(1, '#f0a24c');
    ctx.fillStyle = sky; ctx.fillRect(-200, -200, W + 400, 1500);
    const sg = ctx.createRadialGradient(540, 1150, 30, 540, 1150, 560); sg.addColorStop(0, 'rgba(255,214,130,.9)'); sg.addColorStop(1, 'rgba(255,170,80,0)'); ctx.fillStyle = sg; ctx.fillRect(-200, 400, W + 400, 1100);
    ell(ctx, 540, 1150, 170, 170, '#f6c66a', null);
    shape(ctx, [[-300, 1190], [-60, 1140], [200, 1175], [440, 1125], [700, 1170], [940, 1115], [1200, 1160], [1400, 1140], [1400, 2200], [-300, 2200]], '#5a3322', C.ink, 5, 1.2);
    shape(ctx, [[-300, 1250], [300, 1230], [700, 1260], [1100, 1235], [1400, 1250], [1400, 2200], [-300, 2200]], '#3a2216', null);
    shape(ctx, [[-300, 1500], [300, 1470], [700, 1495], [1100, 1465], [1400, 1490], [1400, 2200], [-300, 2200]], '#22140d', null);
    // ufuktaki atlı okçular
    for (let i = 0; i < 9; i++) { const x = ((lt * 300 + i * 170) % 1600) - 300; horseArcher(ctx, x, 1215 + (i % 3) * 18, .3 + (i % 3) * .03, 1, lt * 16 + i * 1.3, '#2a170f'); }
    dust(ctx, lt, 280, 1220, 10, 'rgba(240,170,90,.25)'); dust(ctx, lt, 760, 1220, 10, 'rgba(240,170,90,.25)');
    // ön planda dörtnala geçen büyük atlı okçular
    for (let i = 0; i < 3; i++) { const x = ((lt * 520 + i * 520) % 1560) - 260; horseArcher(ctx, x, 1400 + (i % 2) * 40, .95, 1, lt * 18 + i * 2, '#140b07'); }
    dust(ctx, lt, ((lt * 520) % 1560) - 380, 1420, 12, 'rgba(150,95,60,.35)');
    // ardındaki yüzlerce ok
    for (let i = 0; i < 110; i++) { const p = ((lt * .75 + hash(i + 40)) % 1); const x0 = 90 + hash(i) * 780, k = .35 + hash(i + 5) * .5;
      const x = x0 + p * 260 * k, y = 1200 - p * 640 - Math.sin(p * Math.PI) * 60; ctx.save(); ctx.globalAlpha = .85; ctx.translate(x, y); ctx.scale(k, k); arrowShot(ctx, 0, 0, -1.05 + p * .35, 70, '#1a100b'); ctx.restore(); }
    // hız çizgileri (gökyüzünde)
    ctx.save(); ctx.strokeStyle = 'rgba(255,240,210,.4)'; ctx.lineWidth = 4;
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2 + hash(i) * .3; const r0 = 300 + ((lt * 900 + hash(i) * 400) % 420); const ex = 560 + Math.cos(a) * r0, ey = 860 + Math.sin(a) * r0 * .7; if (ey > 1120 || ey < 560) continue; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(560 + Math.cos(a) * (r0 + 110), 860 + Math.sin(a) * (r0 + 110) * .7); ctx.stroke(); }
    ctx.restore();
    // ıslıklı ok kameraya doğru büyüyerek gelir
    const p = eOut(clamp((lt + .2) / d)); const sc = lerp(.8, 1.85, p);
    whistleArrow(ctx, lerp(470, 680, p), lerp(880, 840, p) + Math.sin(lt * 30) * 3 * (1 - p), lerp(-.14, .04, p), sc, lt * 1.6, true);
    hookText(ctx, lt + .6, 'Bu ok ıslık çalınca, on bin atlı ateş ederdi!', { style: 'zoom', key: 'ISLIK', y: 430 });
  } },
  { s: 2.3, e: 4.2, draw(ctx, lt, d) { // on bin atlı ateş
    shake(ctx, lt, .3, 10); camera(ctx, lt, d, 1.05, 1.12, 540, 900);
    steppe(ctx, lt);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) { const x = ((lt * 260 + i * 230 + r * 110) % 1500) - 300; horseArcher(ctx, x, 1180 + r * 120, .5 + r * .08, 1, lt * 14 + i * 1.7 + r, ['#6e5a42', '#4a3a2a', '#2a1d15'][r]); }
    for (let i = 0; i < 40; i++) { const p = ((lt * .9 + hash(i)) % 1); const x = lerp(100 + hash(i + 2) * 500, 1100, p), y = lerp(1000, 450, p) + Math.sin(p * 3) * 40; arrowShot(ctx, x, y, -0.55, 60); }
    stampBox(ctx, '10.000 ATLI', W / 2, 330, 96, C.red, lt, .2, -6);
  } },
  { s: 4.2, e: 6.05, draw(ctx, lt, d) { // Asya Hunları, MÖ 3. yy
    camera(ctx, lt, d, 1, 1.08, 560, 800);
    ctx.drawImage(paperTex('#d9c393', 'mapland'), 0, 0);
    const hun = [[90, 50], [100, 51.5], [112, 50], [120, 46], [118, 42], [110, 40.5], [102, 39.5], [95, 41], [88, 44]].map(p => proj(ASIA, ...p));
    const china = [[104, 37], [112, 39], [120, 40], [122, 36], [121, 31], [114, 29], [106, 30], [102, 33]].map(p => proj(ASIA, ...p));
    const ph = eOut(prog(lt, 0, .8));
    ctx.save(); ctx.globalAlpha = .55 * ph; shape(ctx, hun, C.red, C.ink, 5, 1.4); ctx.restore(); shape(ctx, hun, null, C.ink, 5, 1.4);
    shape(ctx, china, '#cdbb92', C.ink, 4, 1.4);
    const wall = [[98, 39.3], [104, 39.8], [110, 40.4], [116, 40.6], [120, 40.2]].map(p => proj(ASIA, ...p));
    ctx.save(); ctx.setLineDash([14, 10]); line(ctx, partial(wall, prog(lt, .6, 1)), '#7d6a52', 8); ctx.restore();
    for (let i = 0; i < 4; i++) yurt(ctx, ...proj(ASIA, 96 + i * 5.5, 46.5 + (i % 2) * 1.6), .55);
    for (let i = 0; i < 4; i++) { const p = ((lt * .5 + i / 4) % 1); horseArcher(ctx, lerp(200, 880, p), proj(ASIA, 100, 43.3)[1] + (i % 2) * 40, .28, 1, lt * 14 + i, '#2a1d15'); }
    tag(ctx, 'ASYA HUNLARI', W / 2, 330, 74, lt, 0, C.red);
    tag(ctx, 'ÇİN', ...proj(ASIA, 112, 34), 46, lt, .4, C.ink);
    tag(ctx, 'M.Ö. 3. YÜZYIL', W / 2, 1210, 60, lt, .7, C.ink, C.cream, 2);
  } },
  { s: 6.05, e: 8.9, draw(ctx, lt, d) { // Tuman Han, oğlu Mete'ye 10.000 atlı
    steppe(ctx, lt); camera(ctx, lt, d, 1, 1.05, W / 2, 800);
    for (let i = 0; i < 5; i++) { const x = ((lt * 200 + i * 260) % 1400) - 200; horseArcher(ctx, x, 1250, .45, 1, lt * 14 + i * 2, '#4a3a2a'); }
    const pa = eBack(prog(lt, 0, .45)), pb = eBack(prog(lt, .9, .45));
    if (pa > 0) hunBey(ctx, 300, 820, 1.08 * pa, { old: true, robe: '#5a3a6a' });
    if (pb > 0) hunBey(ctx, 760, 860, .95 * pb, { young: true, dir: -1 });
    tag(ctx, 'TUMAN HAN', 300, 1130, 54, lt, .2, C.ink);
    tag(ctx, 'OĞLU METE', 760, 1130, 54, lt, 1.0, C.red);
    const k = eInOut(prog(lt, 1.6, .9)); if (k > 0) arrow(ctx, [[440, 520], [530, 450], [620, 500]], k, C.red, 12);
    tag(ctx, '10.000 ATLI', W / 2, 300, 62, lt, 1.8, C.red, C.cream, -2);
  } },
  { s: 8.9, e: 11.8, draw(ctx, lt, d) { // ıslık çalan ok yaptırır
    bg(ctx); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    const p = eOut(prog(lt, 0, 1.4));
    whistleArrow(ctx, lerp(260, 600, p), 760 + Math.sin(lt * 4) * 12, -0.05, 1.5, lt, true);
    tag(ctx, 'ISLIKLI OK', W / 2, 330, 84, lt, .15, C.red);
    tag(ctx, 'UÇARKEN ISLIK ÇALAR', W / 2, 1150, 54, lt, 1.4, C.ink, C.cream, 2);
    const rings = prog(lt, 1.0, 1); if (rings > 0) for (let i = 0; i < 3; i++) { const k = (lt * 1.2 + i / 3) % 1; ctx.globalAlpha = (1 - k) * .5; ell(ctx, 660, 760, 60 + k * 300, 40 + k * 200, null, C.red, 4); } ctx.globalAlpha = 1;
  } },
  { s: 11.8, e: 13.9, draw(ctx, lt, d) { // emri kesindir
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.08, W / 2, 850);
    tug(ctx, 860, 1180, 600, lt); tug(ctx, 200, 1180, 600, lt + 1);
    const p = eBack(prog(lt, 0, .45)); if (p > 0) hunBey(ctx, W / 2, 860, 1.05 * p, { young: true });
    stampBox(ctx, 'EMİR', W / 2, 330, 120, C.red, lt, .4, -6, 'TEREDDÜT YOK');
    shake(ctx, lt, .45, 8);
  } },
  { s: 13.9, e: 15.95, draw(ctx, lt, d) { // ıslıklı ok nereye uçarsa, bütün oklar oraya
    steppe(ctx, lt); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    const T = [820, 760]; target(ctx, ...T, 110);
    const p = prog(lt, .1, .7);
    if (p < 1) whistleArrow(ctx, lerp(120, T[0] - 50, p), lerp(900, T[1], p) - Math.sin(p * Math.PI) * 120, -0.2, .45, lt);
    else line(ctx, [[T[0] - 10, T[1]], [T[0] - 110, T[1] + 6]], '#6e4a2c', 8);
    volley(ctx, lt, [180, 1100, 260], T, 26, .7, .7);
    if (lt > 1.45) stuck(ctx, T, 26);
    archerRow(ctx, lt, 1250, 8, 110, 70, 1.2);
    tag(ctx, 'BÜTÜN OKLAR ORAYA!', W / 2, 330, 62, lt, .8, C.red);
  } },
  { s: 15.95, e: 18.1, draw(ctx, lt, d) { // Sima Çien'e göre (Shiji)
    ctx.drawImage(paperTex('#cbb68a', 'rumor'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    const w = lerp(40, 640, eInOut(prog(lt, 0, 1.0))); const cx = W / 2 - 40, top = 520, bot = 1060;
    shape(ctx, [[cx - w / 2, top], [cx + w / 2, top], [cx + w / 2, bot], [cx - w / 2, bot]], '#efe2bf', C.ink, 4, .8);
    ctx.save(); ctx.beginPath(); ctx.rect(cx - w / 2 + 20, top, w - 40, bot - top); ctx.clip();
    for (let c = 0; c < 9; c++) for (let r = 0; r < 9; r++) { const x = cx + 260 - c * 64, y = top + 50 + r * 54; const h1 = hash(c * 13 + r);
      ctx.strokeStyle = 'rgba(42,29,21,.75)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x - 14, y); ctx.lineTo(x + 14, y); ctx.moveTo(x, y - 14); ctx.lineTo(x + (h1 - .5) * 16, y + 16); if (h1 > .5) { ctx.moveTo(x - 12, y + 10); ctx.lineTo(x + 12, y + 8); } ctx.stroke(); }
    ctx.restore();
    [cx - w / 2, cx + w / 2].forEach(x => { shape(ctx, [[x - 16, top - 30], [x + 16, top - 30], [x + 16, bot + 30], [x - 16, bot + 30]], '#7a3b26', C.ink, 4, .5); ell(ctx, x, top - 34, 22, 10, C.gold, C.ink, 3); ell(ctx, x, bot + 34, 22, 10, C.gold, C.ink, 3); });
    tag(ctx, 'ÇİNLİ TARİHÇİ SİMA ÇİEN', W / 2, 330, 56, lt, .2, C.ink);
    stampBox(ctx, 'RİVAYET', W / 2, 1250, 74, C.red, lt, 1.0, -5, 'TARİH KAYITLARI (SHİJİ)');
  } },
  { s: 18.1, e: 20.5, draw(ctx, lt, d) { // önce kendi atını hedef gösterdi
    steppe(ctx, lt); camera(ctx, lt, d, 1, 1.07, 560, 860);
    horse(ctx, 600, 1020, 1.9, -1, lt * 2, '#6b4a2e', .1);
    const p = prog(lt, .4, .9); whistleArrow(ctx, lerp(120, 260, eOut(p)), 640, 0.05, .55, lt);
    tag(ctx, 'METE’NİN DEĞERLİ ATI', W / 2, 330, 58, lt, .1, C.ink);
    const r = 1 + Math.sin(lt * 6) * .05; ctx.save(); ctx.globalAlpha = .8; ell(ctx, 600, 900, 330 * r, 220 * r, null, C.red, 6); ctx.restore();
    stampBox(ctx, 'İLK HEDEF', W / 2, 1270, 70, C.red, lt, 1.2, -5);
  } },
  { s: 20.5, e: 22.9, draw(ctx, lt, d) { // tereddüt edenler cezalandırıldı
    bg(ctx); shake(ctx, lt, 1.25, 14); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    const out = eInOut(prog(lt, 1.4, .8));
    archerRow(ctx, lt, 760, 7, 150, 120, 2.0, '#4a3a2a');
    archerRow(ctx, lt, 1000, 7, 150, 120, 2.0, '#5a4632', [], [2, 5]);
    [2, 5].forEach(i => { const x = 150 + i * 120; ctx.save(); ctx.globalAlpha = 1 - out; pawn(ctx, x + Math.sin(lt * 40) * 4, 1000 + out * 160, 2.0, '#8b7f6c'); ctx.restore();
      if (out < .5) bigText(ctx, '?', x, 870, 80, C.red, lt, .3); });
    tag(ctx, 'TEREDDÜT EDENLER', W / 2, 330, 64, lt, 0, C.ink);
    stampBox(ctx, 'AĞIR CEZA', W / 2, 1180, 96, C.red, lt, 1.2, -7);
  } },
  { s: 22.9, e: 26.9, draw(ctx, lt, d) { // en sevdiği hanımı... yine
    ctx.drawImage(paperTex('#3a2e24', 'dusk'), 0, 0); camera(ctx, lt, d, 1, 1.08, W / 2, 850);
    const g = ctx.createRadialGradient(W / 2, 900, 30, W / 2, 900, 600); g.addColorStop(0, 'rgba(255,214,140,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    yurt(ctx, W / 2, 1060, 3.2);
    fire(ctx, 840, 1080, .8, lt); dust(ctx, lt, 840, 980, 8, 'rgba(200,190,170,.25)');
    whistleArrow(ctx, lerp(-100, 330, eOut(prog(lt, .3, 1.2))), 640 + Math.sin(lt * 9) * 6, 0, .8, lt);
    tag(ctx, 'EN SEVDİĞİ HANIMI', W / 2, 330, 62, lt, .2, C.cream, C.ink);
    stampBox(ctx, 'YİNE CEZA', W / 2, 1240, 84, '#e0573f', lt, 2.6, -6);
  } },
  { s: 26.9, e: 29.6, draw(ctx, lt, d) { // av sırasında babasının atı
    steppe(ctx, lt); camera(ctx, lt, d, 1.04, 1, 540, 900);
    for (let i = 0; i < 4; i++) { const x = ((lt * 300 + i * 280) % 1500) - 300; horseArcher(ctx, x, 1230 + (i % 2) * 70, .55, 1, lt * 15 + i * 1.3, '#4a3a2a'); }
    horse(ctx, 640, 1000, 1.6, -1, lt * 2.4, '#2a1d15', .14);
    dust(ctx, lt, 300, 1250, 10);
    tag(ctx, 'AV GÜNÜ', W / 2, 330, 70, lt, 0, C.ink);
    tag(ctx, 'BABASININ ATI', 600, 610, 58, lt, 1.1, C.red, C.cream, 2);
  } },
  { s: 29.6, e: 31.45, draw(ctx, lt, d) { // hiçbir ok şaşmadı
    steppe(ctx, lt); shake(ctx, lt, 1.0, 10); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    const T = [790, 820]; target(ctx, ...T, 120);
    volley(ctx, lt, [160, 1150, 300], T, 34, 0, .7);
    if (lt > .9) stuck(ctx, T, 34);
    archerRow(ctx, lt, 1260, 9, 110, 70, 1.15);
    stampBox(ctx, 'HİÇBİR OK ŞAŞMADI', W / 2, 330, 64, C.red, lt, .9, -5);
  } },
  { s: 31.45, e: 34.0, draw(ctx, lt, d) { // son hedef: babası
    ctx.drawImage(paperTex('#1b1712', 'dark'), 0, 0); camera(ctx, lt, d, 1, 1.1, W / 2, 800);
    const gl = ctx.createRadialGradient(W / 2, 820, 40, W / 2, 820, 650); gl.addColorStop(0, 'rgba(255,240,200,0.22)'); gl.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H);
    throne(ctx, W / 2, 1180, .95, '#5a3a6a');
    const p = eOut(prog(lt, .6, 1.4)); whistleArrow(ctx, lerp(-200, 380, p), 520, 0.02, .6, lt);
    tag(ctx, 'SON HEDEF', W / 2, 330, 80, lt, 0, C.red);
    tag(ctx, 'BABASI TUMAN HAN', W / 2, 1270, 60, lt, .9, C.cream, C.ink);
  } },
  { s: 34.0, e: 37.6, draw(ctx, lt, d) { // MÖ 209 tahta çıktı
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 850);
    ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = C.gold;
    for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .2; ctx.beginPath(); ctx.moveTo(W / 2, 880); ctx.arc(W / 2, 880, 1000, a, a + .12); ctx.fill(); } ctx.restore();
    tug(ctx, 150, 1260, 620, lt); tug(ctx, 900, 1260, 620, lt + 2);
    throne(ctx, W / 2, 1260, 1.0, C.red);
    const p = eBack(prog(lt, 1.6, .5)); if (p > 0) hunBey(ctx, W / 2, 1020 + (1 - p) * 120, .8 * p, { young: true });
    sealPro(ctx, 'M.Ö. 209', 'Hun Tahtı', 760, 450, 160, C.red, lt, .2, 'METE HAN');
    tag(ctx, 'METE TAHTTA', 300, 330, 56, lt, 2.1, C.ink);
  } },
  { s: 37.6, e: 41.5, draw(ctx, lt, d) { // onluk, yüzlük, binlik, on binlik
    bg(ctx); camera(ctx, lt, d, 1, 1.04, W / 2, 900);
    const steps = [[.6, '10', 'ONLUK'], [1.35, '100', 'YÜZLÜK'], [2.1, '1.000', 'BİNLİK'], [2.75, '10.000', 'TÜMEN']];
    const lvl = steps.filter(s => lt >= s[0]).length;
    const L = [[5, 2, 1.7, 140, 170], [10, 10, 1.0, 78, 56], [20, 16, .5, 40, 34], [34, 26, .3, 24, 21]][Math.max(0, lvl - 1)];
    const [cols, rows, s2, sx, sy] = L; const x0 = W / 2 - 40 - (cols - 1) * sx / 2, y0 = 820 - (rows - 1) * sy / 2 + 40;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = x0 + c * sx + Math.sin(lt * 4 + r) * 3, y = y0 + r * sy;
      pawn(ctx, x, y + Math.abs(Math.sin(lt * 8 + c + r)) * -5 * s2, s2, (r + c) % 4 ? '#5a4632' : C.red); }
    steps.forEach((s, i) => { if (lt >= s[0]) tag(ctx, s[1] + ' · ' + s[2], W / 2, 330, 76, lt, s[0], i === lvl - 1 ? C.red : C.ink); });
    if (lvl > 0) { const cur = steps[lvl - 1]; ctx.save(); ctx.globalAlpha = 0; ctx.restore(); }
    tag(ctx, 'ONLU SİSTEM', W / 2, 1270, 62, lt, .1, C.ink, C.cream, 2);
  } },
  { s: 41.5, e: 45.4, draw(ctx, lt, d) { // yüzyıllarca yaşadı
    steppe(ctx, lt); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    for (let i = 0; i < 7; i++) { const x = ((lt * 240 + i * 210) % 1500) - 300; horseArcher(ctx, x, 1230 + (i % 3) * 50, .5, 1, lt * 14 + i * 1.5, ['#2a1d15', '#4a3a2a', '#6e5a42'][i % 3]); }
    const pts = [[140, 760], [400, 700], [660, 740], [900, 680]];
    arrow(ctx, pts, eInOut(prog(lt, .2, 2.2)), C.red, 12);
    ['M.Ö. 209', '', '', ''].forEach((s, i) => { if (s) tag(ctx, s, pts[i][0] + 40, pts[i][1] + 80, 44, lt, .2, C.ink); });
    tag(ctx, 'TÜRK ORDULARINDA', W / 2, 330, 62, lt, .3, C.ink);
    stampBox(ctx, 'YÜZYILLARCA', W / 2, 520, 92, C.red, lt, 2.4, -6);
  } },
  { s: 45.4, e: DURATION, draw(ctx, lt, d) { // kapanış
    steppe(ctx, lt, { dark: true, sun: true }); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    for (let i = 0; i < 6; i++) { const x = ((lt * 230 + i * 240) % 1500) - 300; horseArcher(ctx, x, 1150 + (i % 2) * 60, .55, 1, lt * 14 + i * 1.8, '#140f0b'); }
    tug(ctx, 860, 1130, 420, lt);
    whistleArrow(ctx, lerp(-200, 1300, (lt % 2.2) / 2.2), 860, -0.08, .55, lt);
    bigText(ctx, 'BİR ISLIK...', W / 2, 360, 104, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'BİR İMPARATORLUK KURDU', W / 2, 520, 60, lt, 1.9, C.red, C.cream);
  } },
];
