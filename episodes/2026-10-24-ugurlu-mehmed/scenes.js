// ===== Uğurlu Mehmed: Fatih'e kılıç çeken şehzade, Fatih'in damadı =====
const KEY = ['ŞEHZADE', 'DAMADI', 'OTLUKBELİ', 'UĞURLU', 'HALİL', 'İSYAN', 'ŞİRAZ', 'RAKİBİNE', 'GEVHERHAN', 'SİVAS', 'ERZİNCAN', 'GÖDE', 'TORUNU', 'DEDESİ', 'TAHT'];
const MAPE = { x: 540, y: 860, lon: 39.6, lat: 39.2, k: 62 };   // Doğu Anadolu
const MAPI = { x: 500, y: 800, lon: 49, lat: 34, k: 60 };        // İran
const MAPW = { x: 500, y: 760, lon: 38, lat: 37.5, k: 34 };      // Anadolu + Irak
const DURATION = 69.84 + 2.2;
const OUTRO_AT = DURATION - 1.6;

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
const P = (m, lon, lat) => proj(m, lon, lat);

const SCENES = [
  { s: 0, e: 4.45, draw(ctx, lt, d) {
    hookCard(ctx, lt, d, "Fatih'e kılıç çeken şehzade...", "Fatih'in damadı oldu!");
  } },
  { s: 4.45, e: 7.3, draw(ctx, lt, d) { // 1473 Otlukbeli
    camera(ctx, lt, d, 1, 1.07, 560, 820);
    regionMap(ctx, MAPE, { seas: [SEA_BLACK], lands: [ANATOLIA] });
    mountains(ctx, MAPE, [[38, 38.6], [41.5, 40.4], [42.6, 39.6], [37.2, 39.2], [43.5, 38.5], [36.5, 40.2]]);
    bigText(ctx, '1473', W / 2, 400, 200, C.red, lt, 0, F_SANS, [C.cream, 14]);
    const o = P(MAPE, 40.4, 39.8);
    pin(ctx, ...o, 1.3, lt, 1.6, C.red);
    tag(ctx, 'OTLUKBELİ', o[0], o[1] + 80, 62, lt, 1.8, C.ink);
  } },
  { s: 7.3, e: 12.95, draw(ctx, lt, d) { // Uzun Hasan vs Fatih
    bg(ctx); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    tag(ctx, 'OTLUKBELİ SAVAŞI', W / 2, 290, 60, lt, 0, C.ink);
    const pa = eBack(prog(lt, 2.4, .45)), pb = eBack(prog(lt, .6, .45));
    if (pa > 0) padisah(ctx, 290, 940, .95 * pa);
    if (pb > 0) turkmenBey(ctx, 750, 940, .95 * pb, { robe: '#2d5a7a' });
    if (lt > 3.2) { const k = eOut(prog(lt, 3.2, .4)); sword(ctx, 520 - 40 * k, 700, 1.2, .55 * k); sword(ctx, 560 + 40 * k, 700, 1.2, -.55 * k); }
    tag(ctx, 'FATİH', 290, 1260, 56, lt, 2.6, C.red);
    tag(ctx, 'UZUN HASAN', 750, 1260, 52, lt, 1.4, '#2d5a7a');
    stamp(ctx, 'OSMANLI', 540, 520, 115, C.red, lt, 4.6, 'KAZANDI');
  } },
  { s: 12.95, e: 18.1, draw(ctx, lt, d) { // Uğurlu kumandan
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    for (let i = 0; i < 4; i++) { const x = ((lt * 140 + i * 260) % 1300) - 150; horseArcher(ctx, x, 1170, .62, 1, lt * 14 + i * 2, '#5a4632'); }
    const p = eBack(prog(lt, 0, .5));
    turkmenBey(ctx, W / 2, 760 + (1 - p) * 250, 1.0 * Math.max(p, .01), { young: true, robe: C.red });
    tag(ctx, "UZUN HASAN'IN OĞLU", W / 2, 300, 56, lt, 2.7, C.ink);
    tag(ctx, 'UĞURLU MEHMED', W / 2, 1255, 70, lt, 3.4, C.red, C.cream, 2);
  } },
  { s: 18.1, e: 24.1, draw(ctx, lt, d) { // Taht, veliaht Halil
    bg(ctx); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    throne(ctx, W / 2, 1180, .95);
    turkmenBey(ctx, 230, 1060, .62, { young: true, robe: C.red });
    if (lt > 3.0) turkmenBey(ctx, 820, 1060, .62 * eBack(prog(lt, 3.0, .4)), { young: true, robe: '#3e7a52' });
    const m = eInOut(prog(lt, 4.2, .8));
    crown(ctx, lerp(540, 820, m), lerp(650, 830, m) + Math.sin(lt * 3) * 6, .7, 0);
    tag(ctx, 'ASIL DERDİ: TAHT', W / 2, 300, 62, lt, .5, C.ink);
    tag(ctx, 'UĞURLU', 230, 1265, 48, lt, .2, C.red);
    tag(ctx, 'HALİL', 800, 1265, 48, lt, 4.6, '#3e7a52');
    stamp(ctx, 'VELİAHT', 820, 560, 105, C.red, lt, 5.0);
  } },
  { s: 24.1, e: 29.5, draw(ctx, lt, d) { // isyan, Şiraz, kaybetti
    camera(ctx, lt, d, 1, 1.06, 560, 850);
    regionMap(ctx, MAPI, { seas: [SEA_CASPIAN, SEA_GULF] });
    mountains(ctx, MAPI, [[47, 35], [48.5, 33.5], [50, 32], [51.5, 30.5], [53, 34], [45.5, 36.5], [50.5, 36.2]]);
    const t = P(MAPI, 46.3, 38.1), is = P(MAPI, 51.7, 32.7), sh = P(MAPI, 52.5, 29.6);
    pin(ctx, ...t, 1, lt, .1, '#2d5a7a'); tag(ctx, 'TEBRİZ', t[0], t[1] + 60, 42, lt, .2, '#2d5a7a');
    pin(ctx, ...is, .9, lt, .6, C.ink);
    pin(ctx, ...sh, 1.2, lt, 2.6, C.red); tag(ctx, 'ŞİRAZ', sh[0] - 40, sh[1] + 70, 52, lt, 2.7, C.red);
    arrow(ctx, curvePts([is[0] - 10, is[1] - 30], [is[0] + 90, is[1] + 80], [sh[0] - 10, sh[1] - 90]), eInOut(prog(lt, 2.4, 1.0)), C.red, 11);
    boxStamp(ctx, 'İSYAN!', W / 2, 300, 120, C.red, lt, 1.5);
    stamp(ctx, 'KAYBETTİ', 330, 1020, 120, C.red, lt, 4.4);
  } },
  { s: 29.5, e: 32.2, draw(ctx, lt, d) { // Nereye kaçtı?
    ctx.drawImage(paperTex('#1b1712', 'dark'), 0, 0); camera(ctx, lt, d, 1, 1.08, W / 2, 800);
    const gl = ctx.createRadialGradient(W / 2, 800, 40, W / 2, 800, 650); gl.addColorStop(0, 'rgba(255,240,200,0.25)'); gl.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H);
    bigText(ctx, '?', W / 2, 760, 520, C.red, lt, 0, F_SANS, [C.cream, 16]);
    tag(ctx, 'NEREYE KAÇTI?', W / 2, 1180, 72, lt, .3, C.cream, C.ink);
  } },
  { s: 32.2, e: 35.9, draw(ctx, lt, d) { // babasının rakibine: Fatih
    camera(ctx, lt, d, 1, 1.05, 520, 800);
    regionMap(ctx, MAPW, { seas: [SEA_BLACK, SEA_MED, SEA_MARMARA, SEA_CASPIAN, SEA_GULF], lands: [THRACE, ANATOLIA] });
    const a = P(MAPW, 47, 34), b = P(MAPW, 34.5, 39.4);
    ctx.save(); ctx.globalAlpha = .4 * eOut(prog(lt, 1.7, .6)); drawLand(ctx, MAPW, ANATOLIA, C.red); drawLand(ctx, MAPW, THRACE, C.red); ctx.restore();
    arrow(ctx, curvePts(a, [(a[0] + b[0]) / 2 + 40, a[1] + 120], b), eInOut(prog(lt, .1, 1.5)), C.red, 12, true);
    tag(ctx, "BABASININ EN BÜYÜK RAKİBİ", W / 2, 320, 54, lt, 0, C.ink);
    tag(ctx, 'OSMANLI', ...P(MAPW, 33, 38.4), 46, lt, 1.8, C.red);
    if (lt > 2.0) padisah(ctx, 290, 1110, .55 * eBack(prog(lt, 2.0, .4)));
    tag(ctx, 'FATİH SULTAN MEHMED', 640, 1200, 50, lt, 2.1, C.red, C.cream, 2);
  } },
  { s: 35.9, e: 38.4, draw(ctx, lt, d) { // geri çevirmedi
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    ctx.save(); ctx.globalAlpha = .22 * eOut(prog(lt, 0, .6)); ctx.fillStyle = C.gold;
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + lt * .15; ctx.beginPath(); ctx.moveTo(300, 800); ctx.arc(300, 800, 900, a, a + .13); ctx.fill(); } ctx.restore();
    padisah(ctx, 300, 930, 1.0);
    const p = eOut(prog(lt, .2, .6)); turkmenBey(ctx, lerp(980, 770, p), 990, .82, { young: true, robe: C.red });
    tag(ctx, 'GERİ ÇEVİRMEDİ', W / 2, 300, 66, lt, .9, C.ink);
    tag(ctx, 'FATİH', 300, 1260, 52, lt, .1, C.red);
    tag(ctx, 'UĞURLU', 770, 1260, 52, lt, .5, C.ink);
  } },
  { s: 38.4, e: 42.5, draw(ctx, lt, d) { // Gevherhan, Sivas valiliği
    bg(ctx); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    const p = eBack(prog(lt, 0, .5)); if (p > 0) rings(ctx, W / 2, 720, 1.5 * p);
    tag(ctx, "FATİH'İN KIZI GEVHERHAN", W / 2, 330, 54, lt, .3, C.red);
    stamp(ctx, 'DAMAT', 790, 1000, 100, C.red, lt, 1.4);
    tag(ctx, 'SİVAS VALİSİ', W / 2, 1250, 70, lt, 2.7, C.ink, C.cream, 2);
  } },
  { s: 42.5, e: 48.1, draw(ctx, lt, d) { // 1477 söylenti
    ctx.drawImage(paperTex('#cbb68a', 'rumor'), 0, 0); camera(ctx, lt, d, 1, 1.05, W / 2, 800);
    tag(ctx, 'AMA HİKÂYE BİTMEDİ', W / 2, 300, 58, lt, 0, C.ink);
    bigText(ctx, '1477', W / 2, 520, 170, C.red, lt, 2.0, F_SANS, [C.cream, 14]);
    for (let i = 0; i < 6; i++) {
      const q = eOut(prog(lt, 3.2 + i * .12, .6)); if (q <= 0) continue;
      const tx = 220 + (i % 3) * 300, ty = 820 + Math.floor(i / 3) * 230;
      letter(ctx, lerp(i % 2 ? 1250 : -200, tx, q), lerp(1500, ty, q), 1.0, (i - 2.5) * .12);
    }
    tag(ctx, '"UZUN HASAN ÖLDÜ!"', W / 2, 700, 56, lt, 3.4, C.cream, C.ink);
    boxStamp(ctx, 'SÖYLENTİ', W / 2, 1260, 100, C.red, lt, 4.3);
  } },
  { s: 48.1, e: 51.65, draw(ctx, lt, d) { // Erzincan
    camera(ctx, lt, d, 1, 1.08, 450, 860);
    regionMap(ctx, MAPE, { seas: [SEA_BLACK], lands: [ANATOLIA] });
    mountains(ctx, MAPE, [[38, 38.6], [41.5, 40.4], [42.6, 39.6], [37.2, 39.2], [43.5, 38.5], [36.5, 40.2]]);
    const sv = P(MAPE, 37.0, 39.75), ez = P(MAPE, 39.5, 39.75);
    pin(ctx, ...sv, 1, lt, 0, C.ink); tag(ctx, 'SİVAS', sv[0] - 30, sv[1] - 130, 44, lt, .1, C.ink);
    arrow(ctx, curvePts([sv[0] + 20, sv[1] - 40], [(sv[0] + ez[0]) / 2, sv[1] - 160], [ez[0] - 10, ez[1] - 70]), eInOut(prog(lt, .1, 1.4)), C.red, 11);
    pin(ctx, ...ez, 1.3, lt, 1.6, C.red);
    tag(ctx, 'TAHTA KOŞTU', W / 2, 330, 62, lt, .2, C.ink);
    const dk = eOut(prog(lt, 2.6, .6));
    if (dk > 0) { ctx.fillStyle = `rgba(20,16,12,${dk * .6})`; ctx.fillRect(-300, -300, W + 600, H + 600); }
    tag(ctx, 'ERZİNCAN', ez[0] + 40, ez[1] + 80, 58, lt, 1.9, C.red);
    tag(ctx, 'ÖLDÜRÜLDÜ', W / 2, 1180, 58, lt, 2.7, C.cream, C.ink);
  } },
  { s: 51.65, e: 56.3, draw(ctx, lt, d) { // Göde Ahmed tahtta
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    ctx.save(); ctx.globalAlpha = .22 * eOut(prog(lt, 0, .6)); ctx.fillStyle = C.gold;
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + lt * .15; ctx.beginPath(); ctx.moveTo(W / 2, 850); ctx.arc(W / 2, 850, 900, a, a + .13); ctx.fill(); } ctx.restore();
    throne(ctx, W / 2, 1230, 1.0);
    const p = eBack(prog(lt, 1.3, .5)); if (p > 0) turkmenBey(ctx, W / 2, 1010, .78 * p, { young: true, robe: '#6a4a8c' });
    tag(ctx, 'YILLAR SONRA', W / 2, 300, 56, lt, 0, C.ink);
    tag(ctx, 'GÖDE AHMED', W / 2, 430, 74, lt, 1.5, C.red, C.cream, 2);
    stamp(ctx, 'TEBRİZ', 840, 640, 95, C.red, lt, 2.4, '1497');
  } },
  { s: 56.3, e: 59.5, draw(ctx, lt, d) { // soy ağacı
    bg(ctx); drawTree(ctx, lt, false);
  } },
  { s: 59.5, e: 64.65, draw(ctx, lt, d) { // iki rakip, aynı torun
    bg(ctx); camera(ctx, lt, d, 1, 1.04, W / 2, 900); drawTree(ctx, 10, true, lt);
  } },
  { s: 64.65, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    const k = eInOut(prog(lt, 2.0, 1.2));
    sword(ctx, 470 - 120 * k, 1080, 2.0, .6 - .6 * k); sword(ctx, 610 + 120 * k, 1080, 2.0, -.6 + .6 * k);
    bigText(ctx, 'DÜŞMANLAR SAVAŞIR...', W / 2, 420, 84, C.cream, lt, .2, F_SANS, [C.ink, 12]);
    tag(ctx, 'TARİH BİRLEŞTİRİR', W / 2, 580, 70, lt, 1.9, C.ink, C.cream);
    const r = eBack(prog(lt, 3.8, .5)); if (r > 0) rings(ctx, W / 2, 860, .9 * r);
  } },
];

// soy ağacı: Fatih + Uzun Hasan -> Gevherhan + Uğurlu -> Göde Ahmed
function drawTree(ctx, lt, rivals, lt2 = 0) {
  const L = 270, R = 790;
  padisah(ctx, L, 570, .55 * eBack(prog(lt, 0, .4)) + .001);
  turkmenBey(ctx, R, 570, .55 * eBack(prog(lt, 1.3, .4)) + .001, { robe: '#2d5a7a' });
  tag(ctx, 'FATİH', L, 780, 48, lt, .2, C.red);
  tag(ctx, 'UZUN HASAN', R, 780, 44, lt, 1.5, '#2d5a7a');
  const q = prog(lt, 1.8, .8);
  if (q > 0) { line(ctx, partial([[L, 820], [L, 880]], q), C.ink, 6); line(ctx, partial([[R, 820], [R, 880]], q), C.ink, 6); }
  tag(ctx, 'GEVHERHAN', L, 920, 44, lt, 2.0, C.cream, C.ink);
  tag(ctx, 'UĞURLU', R, 920, 44, lt, 2.1, C.cream, C.ink);
  const q2 = prog(lt, 2.3, .6);
  if (q2 > 0) { line(ctx, partial([[L + 130, 920], [R - 110, 920]], q2), C.red, 7); line(ctx, partial([[540, 920], [540, 1000]], prog(lt, 2.6, .3)), C.red, 7); }
  if (lt > 2.4) rings(ctx, 540, 920, .28);
  const pc = eBack(prog(lt, 2.7, .4)); if (pc > 0) turkmenBey(ctx, 540, 1090, .44 * pc, { young: true, robe: '#6a4a8c' });
  tag(ctx, 'GÖDE AHMED', 540, 1268, 52, lt, 2.9, C.red, C.cream, 2);
  if (rivals) {
    const k = eOut(prog(lt2, .4, .4));
    if (k > 0) { sword(ctx, 500 - 30 * k, 560, 1.1, .6 * k); sword(ctx, 580 + 30 * k, 560, 1.1, -.6 * k); }
    tag(ctx, "OTLUKBELİ'NDE RAKİP", W / 2, 300, 56, lt2, .5, C.ink);
    stamp(ctx, 'İKİ DEDE', 810, 1110, 120, C.red, lt2, 3.6, 'BİR TORUN', -8);
  }
}
