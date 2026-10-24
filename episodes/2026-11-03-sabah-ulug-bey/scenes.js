// ===== Uluğ Bey ve Semerkant rasathanesi (sabah) =====
const KEY = ['ULUĞ', 'BEY', 'KIRK', 'TİMUR\'UN', 'SEMERKANT\'IN', 'YILDIZLARDI.', 'RASATHANE', 'ALİ', 'KUŞÇU', 'BİN', 'BATLAMYUS\'UN', 'DÜZELTTİ.', 'ÖLDÜRÜLDÜ.', 'ARKEOLOG', 'KRATERDE', 'YILDIZLARI'];
const DURATION = 44.36 + 2.2;
const OUTRO_AT = DURATION - 1.6;
const CA = { x: 540, y: 860, lon: 60, lat: 42, k: 42 };
const ARAL = [[58.2, 46.5], [59.5, 46.1], [61.0, 45.4], [61.6, 44.2], [60.2, 43.5], [58.6, 43.6], [58.1, 45.0]];
const AMU = [[67.5, 37.2], [66, 37.6], [64.5, 38.6], [63, 39.8], [61.5, 41.2], [60.2, 42.4], [59.6, 43.6]];
const SYR = [[71.5, 41.0], [69.5, 40.5], [68.6, 41.5], [67.5, 42.6], [66, 43.9], [62.5, 45.5], [61.2, 46.0]];

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
function night(ctx, lt, n = 70, top = '#0f1a30', bot = '#2a3350') {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, H + 600);
  for (let i = 0; i < n; i++) { ctx.globalAlpha = .35 + .55 * Math.abs(Math.sin(lt * 1.7 + i * 1.3)); const r = 2 + hash(i + 3) * 3; star(ctx, hash(i) * W, 200 + hash(i + 7) * 1000, r, '#f6ecd0'); }
  ctx.globalAlpha = 1;
}
function star(ctx, x, y, r, col = '#f6ecd0') {
  ctx.fillStyle = col; ctx.beginPath();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 - Math.PI / 2; const rr = i % 2 ? r * .4 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  ctx.closePath(); ctx.fill();
}
// meridyen yayı (Fahrî sekstant) — kesit görünüş. cx,cy: merkez (yayın üstü), R yarıçap (px), p: çizim ilerlemesi
function meridianArc(ctx, cx, cy, R, p = 1, lt = 0) {
  const a0 = Math.PI * .5 - .55, a1 = Math.PI * .5 + .55;
  const pts = []; for (let i = 0; i <= 40; i++) { const a = lerp(a1, a0, i / 40); pts.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R]); }
  const inner = pts.map(([x, y]) => [cx + (x - cx) * .9, cy + (y - cy) * .9]);
  const q = Math.max(2, Math.round(40 * p));
  shape(ctx, [...pts.slice(0, q + 1), ...inner.slice(0, q + 1).reverse()], '#d8c7a0', C.ink, 6, .6);
  for (let i = 0; i <= q; i += 2) line(ctx, [pts[i], [cx + (pts[i][0] - cx) * .95, cy + (pts[i][1] - cy) * .95]], C.ink, i % 10 ? 2 : 4, .2);
}
function observatory(ctx, x, y, s, k = 1) { // üç katlı silindirik rasathane (çini kaplı); k: yükselme 0..1
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const h = 330 * k, R = 250, e = 46;
  ctx.save(); ctx.beginPath(); ctx.rect(-400, -h - e - 10, 800, h + e + 60); ctx.clip();
  ctx.beginPath(); ctx.moveTo(-R, -330); ctx.lineTo(-R, 0); ctx.ellipse(0, 0, R, e, 0, Math.PI, 0, true); ctx.lineTo(R, -330); ctx.ellipse(0, -330, R, e, 0, 0, Math.PI, false); ctx.closePath();
  const g = ctx.createLinearGradient(-R, 0, R, 0); g.addColorStop(0, '#b9a274'); g.addColorStop(.45, '#efdcb0'); g.addColorStop(1, '#9c865c'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.stroke();
  for (let r = 0; r < 3; r++) { const yy = -r * 110; ctx.beginPath(); ctx.ellipse(0, yy - 6, R, e, 0, 0, Math.PI); ctx.strokeStyle = '#2f5a74'; ctx.lineWidth = 12; ctx.stroke();
    for (let i = -4; i <= 4; i++) { const t = i / 4.6; const wx = Math.sin(t * 1.3) * R * .98; const ww = 20 * Math.cos(t * 1.3); const by = yy - 26 + Math.cos(t * 1.3) * e * .7;
      shape(ctx, [[wx - ww, by], [wx - ww, by - 52], [wx, by - 70], [wx + ww, by - 52], [wx + ww, by]], '#3f6f8a', C.ink, 3, .3); } }
  ctx.beginPath(); ctx.ellipse(0, -330, R, e, 0, 0, Math.PI * 2); ctx.fillStyle = '#c9b48a'; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -330, R * .5, e * .5, 0, 0, Math.PI * 2); ctx.fillStyle = '#6e5a3e'; ctx.fill(); ctx.stroke();
  ctx.restore();
  ctx.restore();
}
function hill(ctx, col = '#a89060') { shape(ctx, [[-300, 1180], [120, 1100], [420, 1010], [700, 1010], [980, 1100], [1400, 1180], [1400, 2200], [-300, 2200]], col, C.ink, 5, 1.2); }
function moon(ctx, x, y, r) {
  ell(ctx, x, y, r, r, '#e9e2cc', C.ink, 6);
  [[-.3, -.25, .22], [.35, .1, .16], [-.1, .4, .13], [.25, -.45, .1], [-.5, .2, .09]].forEach(([dx, dy, rr]) => ell(ctx, x + dx * r, y + dy * r, rr * r, rr * r, '#cfc6ac', 'rgba(42,29,21,.5)', 3));
}
function scholar(ctx, x, y, s, robe, taj) { turkmenBey(ctx, x, y, s, { robe, taj, beard: '#5a4632' }); }
function shovelDigger(ctx, x, y, s, lt) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const a = Math.sin(lt * 6) * .35;
  shape(ctx, [[-30, 0], [-26, -90], [-14, -110], [14, -110], [26, -90], [30, 0]], '#6e6a4a', C.ink, 4, .5);
  ell(ctx, 0, -134, 22, 24, C.skin, C.ink, 4);
  shape(ctx, [[-30, -146], [30, -146], [24, -168], [-24, -168]], '#e8dfc4', C.ink, 3, .4); ell(ctx, 0, -146, 40, 8, '#e8dfc4', C.ink, 3);
  ctx.save(); ctx.translate(10, -80); ctx.rotate(.9 + a); line(ctx, [[0, 0], [0, 120]], '#6e4a2c', 7, .2); shape(ctx, [[-16, 120], [16, 120], [12, 156], [-12, 156]], '#9aa3a8', C.ink, 3, .3); ctx.restore();
  ctx.restore();
}

const SCENES = [
  { s: 0, e: 2.1, draw(ctx, lt, d) { // HOOK — yıldızlı gece, dev meridyen yayı, kayan yıldızlar
    ctx.save();
    const z = lerp(1.45, 1.0, eOut(clamp(lt / .3))) + lt * .03; ctx.translate(500, 1150); ctx.scale(z, z); ctx.translate(-500, -1150);
    night(ctx, lt, 0, '#070d1f', '#26304e');
    // dönen gökyüzü (yıldız izleri)
    ctx.save(); ctx.translate(500, 560); ctx.rotate(lt * .12);
    for (let i = 0; i < 110; i++) { const r = 80 + hash(i) * 900, a = hash(i + 50) * 6.283; ctx.globalAlpha = .3 + .6 * Math.abs(Math.sin(lt * 2 + i));
      ctx.strokeStyle = 'rgba(246,236,208,.25)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, r, a, a + .18); ctx.stroke();
      star(ctx, Math.cos(a + .18) * r, Math.sin(a + .18) * r, 2 + hash(i + 9) * 4); }
    ctx.restore(); ctx.globalAlpha = 1;
    moon(ctx, 810, 650, 46);
    // kayan yıldızlar
    [[0, -100, 260, 1], [.7, 1000, 520, -1], [1.3, -100, 720, 1]].forEach(([t0, x0, y0, dir]) => { const k = clamp((lt - t0) / .55); if (k <= 0 || k >= 1) return;
      const x = x0 + dir * k * 1300, y = y0 + k * 330; const gr = ctx.createLinearGradient(x, y, x - dir * 260, y - 66); gr.addColorStop(0, 'rgba(255,245,210,.95)'); gr.addColorStop(1, 'rgba(255,245,210,0)');
      ctx.strokeStyle = gr; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - dir * 260, y - 66); ctx.stroke(); star(ctx, x, y, 14, '#fff6d8'); });
    hill(ctx, '#2e281f');
    // dev sekstant yayı + gözlem çizgisi (süpürür)
    meridianArc(ctx, 500, 720, 620, 1, lt);
    const a = Math.PI * .5 + Math.sin(lt * 1.6) * .42; const tx = 500 + Math.cos(a) * 572, ty = 720 + Math.sin(a) * 572;
    const sx = 500 - Math.cos(a) * 150, sy = 720 - Math.sin(a) * 150;
    const sa0 = clamp((lt - .22) / .15); line(ctx, [[lerp(500, sx, sa0), lerp(720, sy, sa0)], [tx, ty]], 'rgba(247,201,72,.6)', 5, 0);
    ell(ctx, 500, 720, 10, 10, C.gold, C.ink, 3);
    ell(ctx, tx, ty, 16, 16, C.gold, C.ink, 4);
    const sa = clamp((lt - .22) / .15); ctx.save(); ctx.globalAlpha = sa * (.35 + .3 * Math.abs(Math.sin(lt * 5))); ell(ctx, sx, sy, 34, 34, '#fff3c4', null); ctx.globalAlpha = sa;
    star(ctx, sx, sy, 24, C.gold); ctx.restore();
    ctx.restore();
    hookText(ctx, lt + .6, 'Bu hükümdar, gökyüzünü kırk metrelik bir aletle ölçtü!', { style: 'zoom', key: 'kırk', y: 410, size: 80 });
  } },
  { s: 2.1, e: 4.4, draw(ctx, lt, d) { // dev yay
    night(ctx, lt); camera(ctx, lt, d, 1, 1.08, W / 2, 900);
    hill(ctx, '#3a3226');
    meridianArc(ctx, 500, 260, 880, eOut(prog(lt, 0, 1.2)));
    const a = lerp(Math.PI * .5 + .5, Math.PI * .5 - .5, (lt / d)); star(ctx, 500 + Math.cos(a) * 760, 260 + Math.sin(a) * 760 - 60, 22, C.gold);
    pawn(ctx, 300, 1160, 1.2, C.red);
    bigText(ctx, '40 METRE!', W / 2, 420, 130, C.cream, lt, .4, F_SANS, [C.red, 14]);
  } },
  { s: 4.4, e: 6.7, draw(ctx, lt, d) { // Timur'un torunu Uluğ Bey
    night(ctx, lt, 50, '#1d2440', '#4a4060'); camera(ctx, lt, d, 1, 1.07, W / 2, 860);
    const p = eBack(prog(lt, 0, .5)); if (p > 0) turkmenBey(ctx, W / 2 - 20, 920 + (1 - p) * 120, 1.0 * p, { robe: '#2d5a7a', taj: '#2f6b4f', beard: '#4a3020' });
    tag(ctx, 'TİMUR\'UN TORUNU', W / 2, 300, 62, lt, .1, C.cream, C.ink);
    tag(ctx, 'ULUĞ BEY', W / 2, 1250, 76, lt, .5, C.red, C.cream, 2);
  } },
  { s: 6.7, e: 8.8, draw(ctx, lt, d) { // asıl tutkusu yıldızlar
    night(ctx, lt, 90); camera(ctx, lt, d, 1.08, 1, W / 2, 800);
    const cons = [[260, 560], [380, 470], [520, 520], [640, 430], [760, 520], [700, 660], [560, 700]];
    line(ctx, partial(cons, eInOut(prog(lt, 0, 1.6))), 'rgba(246,236,208,.75)', 4, .3);
    cons.forEach(([x, y], i) => { const k = eBack(prog(lt, i * .18, .3)); if (k > 0) star(ctx, x, y, 22 * k, C.gold); });
    const sx = lerp(900, 150, (lt % 1.4) / 1.4); line(ctx, [[sx, 300 + (900 - sx) * .25], [sx + 120, 300 + (900 - sx - 120) * .25]], 'rgba(255,240,200,.8)', 5, .2);
    // medrese silüeti
    shape(ctx, [[-50, 1300], [-50, 1040], [140, 1040], [140, 940], [220, 940], [220, 1040], [380, 1040], [400, 960], [540, 900], [680, 960], [700, 1040], [860, 1040], [860, 940], [940, 940], [940, 1040], [1130, 1040], [1130, 1300]], '#14182a', C.ink, 4, .5);
    bigText(ctx, 'ASIL TUTKUSU', W / 2, 300, 80, C.cream, lt, 0, F_SANS, [C.ink, 10]);
    tag(ctx, 'YILDIZLAR', W / 2, 820, 70, lt, .9, C.gold, C.ink);
  } },
  { s: 8.8, e: 11.1, draw(ctx, lt, d) { // harita: Semerkant, 1420'ler
    camera(ctx, lt, d, 1, 1.1, 650, 860);
    regionMap(ctx, CA, { seas: [SEA_CASPIAN, ARAL] });
    line(ctx, AMU.map(p => proj(CA, ...p)), '#6f9fb0', 8, .8); line(ctx, SYR.map(p => proj(CA, ...p)), '#6f9fb0', 8, .8);
    mountains(ctx, CA, [[70, 39], [72, 38.5], [68.5, 38.8], [73, 40], [66, 36.5], [69, 36.2]]);
    const sm = proj(CA, 66.96, 39.65);
    for (let i = 0; i < 3; i++) { const k = ((lt * .7 + i / 3) % 1); ctx.globalAlpha = 1 - k; ell(ctx, sm[0], sm[1] - 40, 30 + k * 150, 20 + k * 100, null, C.red, 5); } ctx.globalAlpha = 1;
    pin(ctx, ...sm, 1.3, lt, .1, C.red); tag(ctx, 'SEMERKANT', sm[0] - 40, sm[1] + 70, 46, lt, .3, C.red);
    tag(ctx, 'HAZAR', ...proj(CA, 51, 41.5), 34, lt, .2, '#3d6676');
    tag(ctx, 'ARAL', ...proj(CA, 59.8, 44.8), 30, lt, .3, '#3d6676');
    sealPro(ctx, '1420\'ler', 'Semerkant rasathanesi', 330, 470, 140, C.red, lt, .7, '');
  } },
  { s: 11.1, e: 13.3, draw(ctx, lt, d) { // tepeye dev rasathane
    const sky = ctx.createLinearGradient(0, 0, 0, 1200); sky.addColorStop(0, '#e6d3a8'); sky.addColorStop(1, '#f3e6c6'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    for (let i = 0; i < 3; i++) { const x = ((lt * 40 + i * 420) % 1500) - 250; ell(ctx, x, 420 + i * 50, 110, 26, '#fff8e8', null); }
    hill(ctx);
    observatory(ctx, 560, 1020, 1.0, eOut(prog(lt, .1, 1.3)));
    dust(ctx, lt, 560, 1030, 12);
    tag(ctx, 'ŞEHRİN DIŞINDA, TEPEDE', W / 2, 300, 56, lt, 0, C.ink);
    stampBox(ctx, 'DEV RASATHANE', W / 2, 460, 80, C.red, lt, 1.2, -5);
  } },
  { s: 13.3, e: 17.2, draw(ctx, lt, d) { // yay biçimli alet: yarıçap ~40 m
    bg(ctx); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    const cx = 500, cy = 330, R = 900;
    meridianArc(ctx, cx, cy, R, 1);
    const a = Math.PI / 2 + Math.sin(lt * 1.2) * .3;
    const rp = eInOut(prog(lt, .4, 1.4));
    ctx.save(); ctx.setLineDash([20, 14]); line(ctx, [[cx, cy], [cx + Math.cos(a) * R * .9 * rp, cy + Math.sin(a) * R * .9 * rp]], C.red, 8, .2); ctx.restore();
    ell(ctx, cx, cy, 14, 14, C.red, C.ink, 3);
    stampBox(ctx, 'YARIÇAP ≈ 40 M', W / 2, 760, 76, C.red, lt, 1.9, -4);
    tag(ctx, 'YAY BİÇİMLİ ALET', W / 2, 300, 56, lt, 0, C.ink);
  } },
  { s: 17.2, e: 20.1, draw(ctx, lt, d) { // devrinin en büyüklerinden
    night(ctx, lt, 60, '#1d2440', '#3a3a50'); camera(ctx, lt, d, 1.1, 1, 420, 1100);
    hill(ctx, '#3a3226');
    meridianArc(ctx, 520, 200, 1000, 1);
    for (let i = 0; i < 3; i++) pawn(ctx, 200 + i * 40 + Math.sin(lt * 2 + i) * 6, 1150, .9, ['#b7342a', '#2d5a7a', '#6e4a2c'][i]);
    arrow(ctx, [[200, 1050], [200, 1000]], 1, C.gold, 6);
    tag(ctx, 'İNSAN', 200, 960, 34, lt, .3, C.gold, C.ink);
    tag(ctx, 'DEVRİNİN EN BÜYÜKLERİNDEN', W / 2, 330, 56, lt, .6, C.cream, C.ink);
  } },
  { s: 20.1, e: 22.75, draw(ctx, lt, d) { // Ali Kuşçu ve bilginler
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    scholar(ctx, 230, 1000, .6, '#6a4a8c', '#3e5f8a'); scholar(ctx, 790, 1000, .6, '#2f6b4f', '#7a1f1a');
    const p = eBack(prog(lt, 0, .5)); if (p > 0) scholar(ctx, 510, 920, .85 * p, '#7a3b26', C.red);
    for (let i = 0; i < 6; i++) { const a = lt * .9 + i * 1.05; star(ctx, 510 + Math.cos(a) * 330, 560 + Math.sin(a) * 90, 16, C.gold); }
    tag(ctx, 'ALİ KUŞÇU', 510, 1250, 64, lt, .3, C.red, C.cream, 2);
    tag(ctx, 'VE BİLGİNLER', W / 2, 300, 58, lt, .1, C.ink);
  } },
  { s: 22.75, e: 24.8, draw(ctx, lt, d) { // ~1000 yıldız
    night(ctx, lt, 10); camera(ctx, lt, d, 1, 1.08, W / 2, 800);
    const n = Math.round(lerp(10, 1000, eInOut(prog(lt, 0, 1.7))));
    for (let i = 0; i < Math.min(260, n / 3.8); i++) { const x = 100 + hash(i * 3.1) * 820, y = 450 + hash(i * 5.7) * 700; star(ctx, x, y, 3 + hash(i) * 5, i % 9 ? '#f6ecd0' : C.gold); if (i % 7 === 0) { ctx.save(); ctx.globalAlpha = .4; ell(ctx, x, y, 10, 10, null, '#f6ecd0', 2); ctx.restore(); } }
    ctx.save(); tornRect(ctx, W / 2 - 230, 230, 460, 160, C.cream, 11); text(ctx, '≈ ' + n, W / 2, 312, 96, C.red); ctx.restore();
    tag(ctx, 'YILDIZIN YERİ ÖLÇÜLDÜ', W / 2, 1240, 54, lt, .5, C.ink, C.cream, 2);
  } },
  { s: 24.8, e: 28.4, draw(ctx, lt, d) { // Batlamyus'un hataları düzeltildi
    bg(ctx); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    ctx.save(); ctx.translate(500, 800); ctx.rotate(-.02); tornRect(ctx, -360, -380, 720, 760, '#f1e6cc', 21); ctx.restore();
    text(ctx, 'BATLAMYUS', 500, 490, 56, C.ink, F_SERIF, 700);
    const rows = [['Yıldız 1', '23° 40\'', '23° 10\''], ['Yıldız 2', '41° 15\'', '40° 50\''], ['Yıldız 3', '67° 20\'', '66° 55\''], ['Yıldız 4', '12° 05\'', '11° 45\'']];
    rows.forEach(([n, a, b], i) => { const y = 600 + i * 120; text(ctx, n, 300, y, 40, 'rgba(42,29,21,.8)', F_SERIF, 700); text(ctx, a, 560, y, 44, C.ink, F_SERIF, 700);
      const k = eOut(prog(lt, .6 + i * .45, .3)); if (k > 0) { line(ctx, partial([[490, y], [630, y]], k), C.red, 6, .3); ctx.save(); ctx.globalAlpha = k; text(ctx, b, 740, y - 4, 44, C.red, F_SERIF, 700); ctx.restore(); } });
    text(ctx, '(temsilî değerler)', 500, 1110, 30, 'rgba(42,29,21,.6)', F_SANS, 700);
    stampBox(ctx, 'DÜZELTİLDİ', W / 2, 300, 96, C.red, lt, 2.5, -6);
  } },
  { s: 28.4, e: 32.1, draw(ctx, lt, d) { // 1449: oğlunun emriyle öldürüldü (saygılı: söner mum)
    ctx.drawImage(paperTex('#2a1d15', 'vdark'), 0, 0); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    const k = prog(lt, 1.6, 1.2);
    const g = ctx.createRadialGradient(W / 2 - 40, 900, 20, W / 2 - 40, 900, 500 * (1 - k * .8) + Math.sin(lt * 10) * 10); g.addColorStop(0, 'rgba(255,214,140,.45)'); g.addColorStop(1, 'rgba(255,214,140,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    shape(ctx, [[W / 2 - 100, 1200], [W / 2 + 20, 1200], [W / 2 + 10, 1180], [W / 2 - 90, 1180]], '#b8892f', C.ink, 4, .4);
    shape(ctx, [[W / 2 - 62, 1180], [W / 2 - 18, 1180], [W / 2 - 18, 1000], [W / 2 - 62, 1000]], '#f3ead6', C.ink, 4, .4);
    if (k < 1) { ctx.save(); ctx.globalAlpha = 1 - k; const f = Math.sin(lt * 13) * 5; shape(ctx, [[W / 2 - 54, 1000], [W / 2 - 50 + f * .3, 970], [W / 2 - 40 + f, 930], [W / 2 - 30 + f * .3, 970], [W / 2 - 26, 1000]], '#f8c84a', '#e2572b', 3, 1); ctx.restore(); }
    if (k > 0) for (let i = 0; i < 6; i++) { const t = (lt * .6 + i / 6) % 1; ctx.globalAlpha = (1 - t) * .5 * k; ell(ctx, W / 2 - 40 + Math.sin(t * 6 + i) * 30, 980 - t * 400, 14 + t * 30, 10 + t * 20, '#8a8078', null); } ctx.globalAlpha = 1;
    bigText(ctx, '1449', W / 2, 560, 150, '#e0573f', lt, .1, F_SANS, [C.cream, 10]);
    tag(ctx, 'OĞLUNUN EMRİYLE ÖLDÜRÜLDÜ', W / 2, 300, 52, lt, .4, C.cream, C.ink);
  } },
  { s: 32.1, e: 34.8, draw(ctx, lt, d) { // rasathane yıkılıp gömüldü
    const sky = ctx.createLinearGradient(0, 0, 0, 1200); sky.addColorStop(0, '#cdbb8a'); sky.addColorStop(1, '#e6d3a8'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    shake(ctx, lt, .4, 12); camera(ctx, lt, d, 1, 1.06, W / 2, 900);
    const k = eInOut(prog(lt, .2, 2.0));
    ctx.save(); ctx.translate(0, k * 330); observatory(ctx, 560, 1020, 1.0, 1 - k * .2); ctx.restore();
    hill(ctx);
    dust(ctx, lt, 560, 1010, 16, 'rgba(110,90,60,.4)'); dust(ctx, lt + .5, 380, 1040, 10, 'rgba(110,90,60,.35)');
    tag(ctx, 'YIKILDI', W / 2, 300, 70, lt, 0, C.ink);
    stampBox(ctx, 'TOPRAĞA GÖMÜLDÜ', W / 2, 470, 76, C.red, lt, 1.4, -5);
  } },
  { s: 34.8, e: 38.95, draw(ctx, lt, d) { // 1908: arkeolog buldu
    const sky = ctx.createLinearGradient(0, 0, 0, 1200); sky.addColorStop(0, '#e6d3a8'); sky.addColorStop(1, '#f3e6c6'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    camera(ctx, lt, d, 1, 1.07, W / 2, 1000);
    shape(ctx, [[-300, 900], [1400, 900], [1400, 2200], [-300, 2200]], '#a89060', C.ink, 5, 1);
    // kazı çukuru ve ortaya çıkan yay
    const k = eOut(prog(lt, .3, 2.6));
    shape(ctx, [[180, 900], [220, 1260], [760, 1260], [800, 900]], '#6e5a3e', C.ink, 4, .8);
    ctx.save(); ctx.beginPath(); ctx.rect(180, 900 + (1 - k) * 360, 640, 400); ctx.clip(); meridianArc(ctx, 490, 300, 900, 1); ctx.restore();
    shovelDigger(ctx, 860, 900, 1.6, lt);
    for (let i = 0; i < 5; i++) { const t = (lt * 1.2 + i / 5) % 1; ell(ctx, 820 - t * 120, 900 - Math.sin(t * Math.PI) * 120, 8, 6, '#6e5a3e', null); }
    sealPro(ctx, '1908', 'Kalıntılar bulundu', 300, 470, 140, C.red, lt, .2, 'VYATKİN');
    tag(ctx, 'BİR ARKEOLOG', 700, 330, 56, lt, .6, C.ink);
  } },
  { s: 38.95, e: 41.5, draw(ctx, lt, d) { // tahttan çok yıldızlar
    night(ctx, lt, 80, '#1d2440', '#4a4060'); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    const k = eInOut(prog(lt, 0, 2));
    ctx.save(); ctx.globalAlpha = 1 - k * .7; throne(ctx, 260, 1240, .9, '#2f6b4f'); ctx.restore();
    for (let i = 0; i < 7; i++) { const a = -lt * .5 + i * .9; star(ctx, 700 + Math.cos(a) * 170, 760 + Math.sin(a) * 170, 18 + 6 * Math.sin(lt * 3 + i), C.gold); }
    ell(ctx, 700, 760, 60, 60, '#f3e9d2', C.ink, 5); star(ctx, 700, 760, 34, C.gold);
    tag(ctx, 'TAHT', 260, 1260, 44, lt, .1, '#2f6b4f'); tag(ctx, 'YILDIZLAR', 700, 1000, 50, lt, .5, C.gold, C.ink);
    tag(ctx, 'TAHTTAN ÇOK...', W / 2, 330, 70, lt, .1, C.cream, C.ink);
  } },
  { s: 41.5, e: 44.0, draw(ctx, lt, d) { // Ay'daki krater
    night(ctx, lt, 60); camera(ctx, lt, d, 1, 1.12, 560, 760);
    moon(ctx, W / 2 - 40, 800, 330);
    const cr = [W / 2 - 40 - .3 * 330, 800 - .25 * 330];
    for (let i = 0; i < 2; i++) { const t = (lt * .8 + i * .5) % 1; ctx.globalAlpha = 1 - t; ell(ctx, cr[0], cr[1], 72 + t * 80, 72 + t * 80, null, C.red, 5); } ctx.globalAlpha = 1;
    pin(ctx, cr[0], cr[1], 1.0, lt, .4, C.red);
    tag(ctx, 'ULUGH BEIGH KRATERİ', W / 2, 1200, 54, lt, .8, C.red, C.cream, 2);
    tag(ctx, 'AY\'DA ONUN ADI', W / 2, 300, 58, lt, 0, C.cream, C.ink);
  } },
  { s: 44.0, e: DURATION, draw(ctx, lt, d) { // kapanış
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0); camera(ctx, lt, d, 1, 1.06, W / 2, 800);
    for (let i = 0; i < 9; i++) { const a = lt * .4 + i * .7; star(ctx, W / 2 - 40 + Math.cos(a) * 300, 860 + Math.sin(a) * 260, 18, '#f3e9d2'); }
    meridianArc(ctx, W / 2 - 40, 520, 520, eOut(prog(lt, 0, 1)));
    bigText(ctx, 'ULUĞ BEY', W / 2, 340, 120, C.cream, lt, .1, F_SANS, [C.ink, 12]);
    tag(ctx, 'YILDIZLARIN HÜKÜMDARI', W / 2, 1240, 54, lt, .7, C.ink, C.cream, 2);
  } },
];
