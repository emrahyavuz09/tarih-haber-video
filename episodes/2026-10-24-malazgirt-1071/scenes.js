// ===== Malazgirt 1071 sahneleri =====
const KEY = ['1071', 'BİN', 'YETMİŞ', 'ANADOLU', 'ALPARSLAN', 'KEFEN', 'TUZAĞA', 'HİLAL', 'ESİR', 'BAĞIŞLADI', 'KAPILARINI', 'KAT', 'YURDUN', 'ÖLDÜRÜRDÜM'];
const MAP = { x: 500, y: 820, lon: 35.4, lat: 39, k: 47 };
const MTS = [[33, 37.4], [35, 37.6], [37, 38.2], [40, 39.6], [41.5, 40.4], [43, 38.8], [31, 37.8], [36, 40.8], [39, 38.5]];

function camera(ctx, lt, d, z0 = 1, z1 = 1.06, cx = W / 2, cy = 760) {
  const z = lerp(z0, z1, eInOut(lt / d)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
}
const BLACK_SEA = [[28.0,41.95],[28.0,43.5],[29.6,45.3],[30.8,46.6],[33.4,46.1],[33.5,44.5],[36.6,45.3],[38.3,44.4],[39.8,43.4],[41.6,42.6],[41.6,41.55],[41.0,41.3],[39.8,41.0],[38.4,40.95],[37.0,41.2],[36.1,41.65],[35.2,42.05],[33.8,42.0],[32.6,41.85],[31.4,41.3],[30.3,41.2],[29.0,41.25]];
const MED = [[10,43],[19,42],[22.5,40.6],[24,40.9],[26.0,40.6],[26.7,40.35],[26.2,40.05],[26.1,39.5],[26.6,39.3],[26.9,38.7],[26.3,38.25],[26.9,38.0],[27.3,37.3],[27.6,36.7],[28.6,36.7],[29.6,36.2],[30.4,36.25],[30.6,36.8],[31.6,36.7],[32.6,36.1],[33.6,36.2],[34.6,36.8],[35.5,36.6],[35.9,36.5],[36.15,35.9],[35.9,35.4],[35.6,34.6],[35.0,33.0],[34.6,31.5],[32,31.0],[29,30.9],[10,30]];
const MARMARA = [[26.6,40.45],[27.5,40.42],[29.0,40.9],[28.6,40.98],[27.5,40.95],[26.8,40.62]];
function seaPoly(ctx, poly) {
  const pts = poly.map(p => proj(MAP, ...p));
  ctx.save(); wpath(ctx, pts, true, 1.4); ctx.clip(); drawSea(ctx, [-300, -300, W + 600, H + 600]); ctx.restore();
  shape(ctx, pts, null, C.ink, 4, 1.4);
}
function baseMap(ctx, fillByz = 0, fillTurk = 0, lt = 0) {
  ctx.drawImage(paperTex('#d9c393', 'mapland'), 0, 0); ctx.fillStyle = '#d9c393'; ctx.fillRect(-400, -400, W + 800, 400); ctx.fillRect(-400, H, W + 800, 400);
  seaPoly(ctx, BLACK_SEA); seaPoly(ctx, MED); seaPoly(ctx, MARMARA);
  drawLand(ctx, MAP, THRACE); drawLand(ctx, MAP, ANATOLIA);
  if (fillByz > 0) { ctx.save(); ctx.globalAlpha = .55 * fillByz; drawLand(ctx, MAP, ANATOLIA, C.purple); drawLand(ctx, MAP, THRACE, C.purple); ctx.restore(); }
  if (fillTurk > 0) { // doğudan batıya kırmızı yayılma
    ctx.save(); const xr = lerp(proj(MAP, 45, 39)[0], proj(MAP, 25.5, 39)[0], fillTurk);
    ctx.beginPath(); ctx.rect(xr, 0, W * 2, H); ctx.clip(); ctx.globalAlpha = .7; drawLand(ctx, MAP, ANATOLIA, C.red); ctx.restore();
  }
  mountains(ctx, MAP, MTS);
  ctx.globalAlpha = .55; text(ctx, 'KARADENİZ', ...proj(MAP, 34.5, 43.3), 40, '#3d6676', F_SERIF, 700); text(ctx, 'AKDENİZ', ...proj(MAP, 31.5, 34.3), 40, '#3d6676', F_SERIF, 700); ctx.globalAlpha = 1;
}

const SCENES = [
  { s: 0, e: 1.7, draw(ctx, lt, d) { // YIL 1071
    ctx.drawImage(paperTex('#a8352b', 'redbg'), 0, 0);
    camera(ctx, lt, d, 1, 1.08);
    tag(ctx, 'YIL', W / 2, 560, 70, lt, 0);
    const n = Math.round(lerp(1000, 1071, eOut(prog(lt, .1, 1.0))));
    bigText(ctx, String(n), W / 2, 790, 300, C.cream, lt, .05, F_SANS, [C.ink, 14]);
    ctx.globalAlpha = .7; text(ctx, 'MALAZGİRT', W / 2, 1000, 64, C.ink); ctx.globalAlpha = 1;
  } },
  { s: 1.7, e: 6.55, draw(ctx, lt, d) { // Bizans Türkleri silmek için yola çıktı
    camera(ctx, lt, d, 1.0, 1.06, 470, 820);
    baseMap(ctx, eOut(prog(lt, 0, .8)));
    crown(ctx, ...proj(MAP, 31.5, 39.6), .7 * eBack(prog(lt, .3, .4)));
    tag(ctx, 'BİZANS', ...proj(MAP, 31.5, 38.5), 54, lt, .5, C.purple);
    const c = proj(MAP, 28.97, 41.01), m = proj(MAP, 42.53, 39.14);
    pin(ctx, ...c, 1, lt, .4, C.purple);
    pin(ctx, ...m, 1.2, lt, 2.6, C.red);
    tag(ctx, 'MALAZGİRT', m[0] - 40, m[1] + 70, 46, lt, 2.8, C.red);
    arrow(ctx, curvePts(c, [(c[0] + m[0]) / 2, c[1] - 170], [m[0] - 30, m[1] - 70]), eInOut(prog(lt, 3.0, 1.6)), C.purple, 12, true);
    tag(ctx, 'TÜRKLERİ SİLMEK İÇİN', W / 2, 330, 58, lt, 1.2, C.ink);
  } },
  { s: 6.55, e: 9.2, draw(ctx, lt, d) { // Romen Diyojen
    bg(ctx); camera(ctx, lt, d, 1, 1.07);
    const p = eBack(prog(lt, 0, .45));
    diyojen(ctx, W / 2, 840 + (1 - p) * 300, 1.55 * Math.max(p, .01));
    tag(ctx, 'BİZANS İMPARATORU', W / 2, 300, 58, lt, .2, C.ink);
    tag(ctx, 'ROMEN DİYOJEN', W / 2, 1250, 70, lt, 1.2, C.purple, C.cream, 2);
  } },
  { s: 9.2, e: 12.1, draw(ctx, lt, d) { // kat kat kalabalık
    bg(ctx); camera(ctx, lt, d, 1.05, 1);
    const r = rng(5); const n = Math.floor(lerp(0, 120, eOut(prog(lt, 0, 1.6))));
    for (let i = 0; i < 120; i++) { const x = 90 + r() * 580, y = 420 + r() * 820; if (i < n) pawn(ctx, x, y, 1.25, C.blue, '#cfd3d6'); }
    const r2 = rng(9); for (let i = 0; i < 14; i++) { const x = 770 + r2() * 150, y = 640 + r2() * 420; if (lt > .4 + i * .05) pawn(ctx, x, y, 1.25, C.red); }
    line(ctx, [[735, 400], [735, 1260]], C.ink, 4);
    tag(ctx, 'BİZANS', 370, 330, 56, lt, .1, C.blue);
    tag(ctx, 'SELÇUKLU', 900, 560, 48, lt, .4, C.red);
    bigText(ctx, 'KAT KAT', W / 2, 760, 150, C.red, lt, 1.4, F_SANS, [C.cream, 16]);
  } },
  { s: 12.1, e: 15.25, draw(ctx, lt, d) { // Sultan Alparslan
    ctx.drawImage(paperTex('#e2cfa6', 'warm'), 0, 0); camera(ctx, lt, d, 1, 1.07);
    // ışık hüzmesi
    ctx.save(); ctx.globalAlpha = .25 * eOut(prog(lt, 0, .6)); ctx.fillStyle = C.gold;
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + lt * .15; ctx.beginPath(); ctx.moveTo(W / 2, 760); ctx.arc(W / 2, 760, 900, a, a + .13); ctx.fill(); } ctx.restore();
    const p = eBack(prog(lt, 0, .5));
    alparslan(ctx, W / 2, 860 + (1 - p) * 300, 1.55 * Math.max(p, .01));
    tag(ctx, 'SELÇUKLU SULTANI', W / 2, 280, 56, lt, .3, C.ink);
    tag(ctx, 'ALPARSLAN', W / 2, 1260, 84, lt, 1.4, C.red, C.cream, 2);
  } },
  { s: 15.25, e: 18.3, draw(ctx, lt, d) { // 26 Ağustos Cuma
    bg(ctx); camera(ctx, lt, d, 1, 1.06);
    // güneş doğuyor
    const sy = lerp(1150, 860, eOut(prog(lt, 0, 2.5)));
    ell(ctx, W / 2, sy, 150, 150, C.gold, C.ink, 6);
    for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + lt * .3; line(ctx, [[W / 2 + Math.cos(a) * 185, sy + Math.sin(a) * 185], [W / 2 + Math.cos(a) * 240, sy + Math.sin(a) * 240]], C.ink, 6); }
    shape(ctx, [[-50, 1060], [250, 970], [520, 1030], [800, 950], [1130, 1020], [1130, 1300], [-50, 1300]], C.green, C.ink, 6);
    // takvim yaprağı
    const p = eBack(prog(lt, .05, .45));
    ctx.save(); ctx.translate(W / 2, 470); ctx.rotate(-.04); ctx.scale(p, p);
    shape(ctx, [[-230, -190], [230, -190], [230, 200], [-230, 200]], C.cream, C.ink, 7);
    shape(ctx, [[-230, -190], [230, -190], [230, -100], [-230, -100]], C.red, C.ink, 7);
    text(ctx, 'AĞUSTOS 1071', 0, -144, 50, C.cream);
    text(ctx, '26', 0, 40, 220, C.ink);
    ctx.restore();
    tag(ctx, 'CUMA SABAHI', W / 2, 1200, 64, lt, 1.6, C.ink);
  } },
  { s: 18.3, e: 25.45, draw(ctx, lt, d) { // beyaz kefen
    ctx.fillStyle = '#1b1712'; ctx.fillRect(0, 0, W, H);
    camera(ctx, lt, d, 1, 1.1, W / 2, 820);
    const gl = ctx.createRadialGradient(W / 2, 820, 50, W / 2, 820, 700); gl.addColorStop(0, 'rgba(255,240,200,0.32)'); gl.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H);
    const p = eOut(prog(lt, 0, .8)); ctx.globalAlpha = p;
    alparslan(ctx, W / 2, 900, 1.5, { robe: '#f6f1e6', plain: true, hat: '#f6f1e6', mouth: (lt > 3.9 && lt < 6.9) ? (Math.sin(lt * 22) * .5 + .5) : 0 });
    ctx.globalAlpha = 1;
    tag(ctx, 'BEYAZ KEFEN', W / 2, 330, 64, lt, 1.0, C.cream, C.ink);
    if (lt > 3.9) bubble(ctx, '"Şehit düşersem, bu benim kefenim olsun!"', W / 2, 330, 860, 52, lt, 3.9, 'left');
  } },
  { s: 25.45, e: 30.9, draw(ctx, lt, d) { // atlı okçular, sahte geri çekilme
    bg(ctx); camera(ctx, lt, d, 1.04, 1);
    shape(ctx, [[-50, 1150], [1130, 1150], [1130, 1400], [-50, 1400]], '#cdb98a', C.ink, 5);
    for (let i = 0; i < 9; i++) line(ctx, [[i * 140, 1200 + (i % 3) * 40], [i * 140 + 40, 1200 + (i % 3) * 40]], '#8a7650', 4);
    const turn = 3.4; const back = lt > turn;
    const dir = back ? -1 : 1;
    const xOff = back ? -eInOut(prog(lt, turn, 2)) * 260 : lerp(-260, 60, eOut(prog(lt, 0, 2.6)));
    [[260, 1120, .95], [560, 1080, .8], [820, 1135, 1.0]].forEach(([x, y, s], i) => horseArcher(ctx, x + xOff, y, s, dir, lt * 14 + i * 2));
    // ok yağmuru
    if (!back) for (let i = 0; i < 18; i++) {
      const st = .9 + i * .1; const q = prog(lt, st, .9); if (q <= 0 || q >= 1) continue;
      const x0 = 250 + (i * 97) % 600, x1 = x0 + 420, y0 = 900, ym = 360;
      const x = lerp(x0, x1, q), y = (1 - q) * (1 - q) * y0 + 2 * (1 - q) * q * ym + q * q * 1000;
      const dx = x1 - x0, dy = 2 * (1 - q) * (ym - y0) + 2 * q * (1000 - ym);
      arrowShot(ctx, x, y, Math.atan2(dy, dx));
    }
    tag(ctx, 'OK YAĞMURU', W / 2, 330, 64, lt, 1.6, C.red);
    if (back) tag(ctx, 'GERİ ÇEKİLİYOR GİBİ...', W / 2, 480, 56, lt, turn + .1, C.ink);
  } },
  { s: 30.9, e: 34.8, draw(ctx, lt, d) { // tuzak: Bizans peşine düşer
    bg(ctx, '#e3d3ae'); camera(ctx, lt, d, 1, 1.05);
    const adv = eInOut(prog(lt, 0, 2.6));
    // Türk birlikleri yukarı çekiliyor
    for (let i = 0; i < 5; i++) { const x = 220 + i * 160, y = lerp(560, 330, adv); shape(ctx, [[x - 50, y - 22], [x + 50, y - 22], [x + 50, y + 22], [x - 50, y + 22]], C.red, C.ink, 5); }
    // Bizans bloğu takip ediyor
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) { const x = 220 + c * 160, y = lerp(1180, 820, adv) + r * 70; shape(ctx, [[x - 56, y - 22], [x + 56, y - 22], [x + 56, y + 22], [x - 56, y + 22]], C.blue, C.ink, 5); }
    for (let c = 0; c < 5; c++) { const x = 220 + c * 160; arrow(ctx, [[x, lerp(1100, 760, adv)], [x, lerp(1000, 640, adv)]], 1, C.blue, 8); }
    // gizli kanatlar (pusu)
    ctx.globalAlpha = .45 + .55 * prog(lt, 2.4, .5);
    [[70, 760], [70, 900], [1010, 760], [1010, 900]].forEach(([x, y]) => shape(ctx, [[x - 26, y - 50], [x + 26, y - 50], [x + 26, y + 50], [x - 26, y + 50]], C.red, C.ink, 5));
    ctx.globalAlpha = 1;
    tag(ctx, 'PEŞLERİNE DÜŞTÜLER', W / 2, 230, 54, lt, .2, C.ink);
    boxStamp(ctx, 'TUZAK!', W / 2, 1000, 130, C.red, lt, 2.75);
  } },
  { s: 34.8, e: 38.4, draw(ctx, lt, d) { // hilal taktiği
    bg(ctx, '#e3d3ae'); camera(ctx, lt, d, 1, 1.07, W / 2, 900);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) { const x = 220 + c * 160, y = 820 + r * 70 + Math.sin(lt * 8 + c + r) * 3; shape(ctx, [[x - 56, y - 22], [x + 56, y - 22], [x + 56, y + 22], [x - 56, y + 22]], C.blue, C.ink, 5); }
    const cl = eInOut(prog(lt, .2, 2.2));
    const N = 16; const span = lerp(.25, .98, cl);
    for (let i = 0; i < N; i++) {
      const f = i / (N - 1); const a = -Math.PI / 2 + (f - .5) * 2 * Math.PI * span;
      const x = W / 2 + Math.cos(a) * 450, y = 925 + Math.sin(a) * 400;
      ctx.save(); ctx.translate(x, y); ctx.rotate(a + Math.PI / 2); shape(ctx, [[-40, -20], [40, -20], [40, 20], [-40, 20]], C.red, C.ink, 5); ctx.restore();
    }
    const arcP = []; for (let i = 0; i <= 40; i++) { const a = -Math.PI / 2 + (i / 40 - .5) * 2 * Math.PI * span; arcP.push([W / 2 + Math.cos(a) * 520, 925 + Math.sin(a) * 470]); }
    ctx.save(); ctx.setLineDash([22, 16]); line(ctx, arcP, C.red, 7); ctx.restore();
    tag(ctx, 'HİLAL TAKTİĞİ', W / 2, 230, 70, lt, .1, C.red);
    if (lt > 2.4) stamp(ctx, 'ÇEMBER', 860, 1250, 105, C.red, lt, 2.4);
  } },
  { s: 38.4, e: 42.8, draw(ctx, lt, d) { // Uz ve Peçenekler taraf değiştirdi
    bg(ctx, '#e3d3ae'); camera(ctx, lt, d, 1.0, 1.04, W / 2, 900);
    for (let i = 0; i < 16; i++) { const a = -Math.PI / 2 + (i / 15 - .5) * 2 * Math.PI * .98; const x = W / 2 + Math.cos(a) * 450, y = 925 + Math.sin(a) * 400; ctx.save(); ctx.translate(x, y); ctx.rotate(a + Math.PI / 2); shape(ctx, [[-40, -20], [40, -20], [40, 20], [-40, 20]], C.red, C.ink, 5); ctx.restore(); }
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
      const x = 220 + c * 160, y = 820 + r * 70; const sw = (r >= 2 && c >= 3) || (r === 3 && c === 0);
      const k = sw ? prog(lt, 2.4 + (c + r) * .08, .3) : 0;
      const col = k > .5 ? C.red : C.blue; const sy = 1 - Math.sin(k * Math.PI) * .9;
      ctx.save(); ctx.translate(x, y); ctx.scale(1, sy); shape(ctx, [[-56, -22], [56, -22], [56, 22], [-56, 22]], col, C.ink, 5); ctx.restore();
    }
    tag(ctx, 'UZ VE PEÇENEKLER', W / 2, 230, 62, lt, .3, C.ink);
    tag(ctx, 'TARAF DEĞİŞTİRDİ!', W / 2, 1300, 62, lt, 2.7, C.red);
  } },
  { s: 42.8, e: 46.05, draw(ctx, lt, d) { // imparator esir
    ctx.drawImage(paperTex('#1d2840', 'night'), 0, 0); camera(ctx, lt, d, 1, 1.06);
    const r = rng(3); for (let i = 0; i < 90; i++) { ctx.globalAlpha = .4 + .6 * hash(i + Math.floor(lt * 4)); ctx.fillStyle = '#f3e9d2'; ctx.fillRect(r() * W, r() * 1100, 4, 4); } ctx.globalAlpha = 1;
    ell(ctx, 820, 330, 70, 70, '#f3e9d2', null); ell(ctx, 850, 310, 60, 60, '#1d2840', null);
    shape(ctx, [[-50, 1150], [1130, 1150], [1130, 1500], [-50, 1500]], '#2c2a24', null);
    const fall = prog(lt, .2, 1.1); const cy = lerp(360, 1110, fall * fall); const rot = fall * 2.6;
    crown(ctx, W / 2, Math.min(cy, 1110), 1.3, fall < 1 ? rot : 2.75);
    if (fall >= 1) for (let i = 0; i < 6; i++) chainLink(ctx, 230 + i * 120, 1230, 1.1 * eBack(prog(lt, 1.4 + i * .06, .3)), i % 2 ? .0 : 1.57);
    tag(ctx, 'İMPARATOR', W / 2, 520, 64, lt, 1.9, '#f3e9d2', C.ink);
    boxStamp(ctx, 'ESİR!', W / 2, 700, 170, C.red, lt, 2.1, -6);
    tag(ctx, 'AKŞAM', W / 2, 220, 60, lt, 0, '#f3e9d2', C.ink);
  } },
  { s: 46.05, e: 53.55, draw(ctx, lt, d) { // diyalog
    bg(ctx); camera(ctx, lt, d, 1, 1.05, W / 2, 900);
    const talkA = lt > 1.45 && lt < 4.2, talkD = lt > 5.85 && lt < 7.5;
    alparslan(ctx, 290, 1130, 1.22, { mouth: talkA ? Math.sin(lt * 24) * .5 + .5 : 0 });
    diyojen(ctx, 800, 1160, 1.12, { dir: -1, noCrown: true, sad: true, mouth: talkD ? Math.sin(lt * 24) * .5 + .5 : 0 });
    for (let i = 0; i < 3; i++) chainLink(ctx, 730 + i * 70, 1330, .75, i % 2 ? 0 : 1.57);
    bubble(ctx, '"Ben senin yerinde olsaydım, ne yapardın?"', 440, 430, 760, 50, lt, 1.45, 'left');
    bubble(ctx, '"Seni öldürürdüm!"', 690, 700, 560, 58, lt, 5.85, 'right', '#f7e2dc', C.red);
  } },
  { s: 53.55, e: 57.15, draw(ctx, lt, d) { // bağışladı, serbest bıraktı
    bg(ctx); camera(ctx, lt, d, 1, 1.06);
    alparslan(ctx, W / 2, 720, 1.1);
    const br = eOut(prog(lt, 1.9, .5));
    [0, 1, 2].forEach(i => chainLink(ctx, 300 + i * 90 - br * 120, 1170 + br * 30 * (i - 1), 1, i % 2 ? 0 : 1.57));
    [0, 1, 2].forEach(i => chainLink(ctx, 600 + i * 90 + br * 120, 1170 - br * 30 * (i - 1), 1, i % 2 ? 1.57 : 0));
    if (br > 0) for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28; line(ctx, [[540 + Math.cos(a) * 60 * (1 + br), 1170 + Math.sin(a) * 60 * (1 + br)], [540 + Math.cos(a) * 100 * (1 + br), 1170 + Math.sin(a) * 100 * (1 + br)]], C.gold, 7); }
    stamp(ctx, 'BAĞIŞLADI', 820, 330, 140, C.red, lt, .9, 'ALPARSLAN');
    tag(ctx, 'SERBEST!', W / 2, 1310, 70, lt, 2.2, C.ink);
  } },
  { s: 57.15, e: 60.65, draw(ctx, lt, d) { // Anadolu'nun kapıları
    camera(ctx, lt, d, 1.06, 1.0, 470, 820);
    baseMap(ctx, 0, eInOut(prog(lt, .9, 2.6)) * .98);
    const m = proj(MAP, 42.53, 39.14);
    // kapı açılıyor
    const op = eOut(prog(lt, .3, .9));
    ctx.save(); ctx.translate(m[0], m[1]);
    shape(ctx, [[-90, 70], [-90, -70], [-60, -110], [60, -110], [90, -70], [90, 70]], '#8b6a45', C.ink, 6);
    ctx.save(); ctx.scale(1 - op * .85, 1); shape(ctx, [[-70, 70], [-70, -80], [0, -96], [0, 70]], '#5e3f22', C.ink, 5); ctx.restore();
    ctx.save(); ctx.scale(1 - op * .85, 1); shape(ctx, [[70, 70], [70, -80], [0, -96], [0, 70]], '#5e3f22', C.ink, 5); ctx.restore();
    ctx.restore();
    for (let i = 0; i < 3; i++) { const y0 = m[1] - 60 + i * 60; arrow(ctx, curvePts([m[0] + 160, y0], [m[0] - 200, y0 - 80 + i * 40], [m[0] - 520 + i * 60, y0 + 20 - i * 30]), eInOut(prog(lt, 1 + i * .25, 1.6)), C.red, 11); }
    tag(ctx, "ANADOLU'NUN KAPILARI", W / 2, 330, 60, lt, .2, C.ink);
    tag(ctx, 'AÇILDI', W / 2, 440, 76, lt, 2.5, C.red);
  } },
  { s: 60.65, e: 67.0, draw(ctx, lt, d) { // bin yıllık yurt
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#e9a65a'); g.addColorStop(.55, '#f3d8a0'); g.addColorStop(1, '#e8dcc0'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = .5; ctx.drawImage(paperTex(C.paper, C.paper), 0, 0); ctx.globalAlpha = 1;
    camera(ctx, lt, d, 1, 1.08, W / 2, 900);
    ell(ctx, W / 2, 980, 220, 220, '#f6c45a', null);
    shape(ctx, [[-50, 1060], [300, 980], [600, 1040], [900, 960], [1130, 1010], [1130, 1500], [-50, 1500]], '#b9a26a', C.ink, 6);
    [[200, 1080, .9], [380, 1060, 1.1], [760, 1050, 1], [930, 1070, .8]].forEach(([x, y, s], i) => { const p = eBack(prog(lt, .2 + i * .15, .4)); if (p > 0) yurt(ctx, x, y, s * p); });
    horseArcher(ctx, 560, 1170, .9, 1, 0, C.ink, false);
    bigText(ctx, 'BİN YILLIK YURT', W / 2, 420, 96, C.red, lt, .4, F_SANS, [C.cream, 14]);
    tag(ctx, '26 AĞUSTOS 1071', W / 2, 560, 56, lt, 1.2, C.ink);
    if (lt > 4.6) { const p = eOut(prog(lt, 4.6, .6)); ctx.fillStyle = `rgba(27,23,18,${p * .85})`; ctx.fillRect(-200, -200, W + 400, H + 400); bigText(ctx, 'TARİH HABER', W / 2, 860, 100, C.cream, lt, 4.8); text(ctx, 'Takip et, tarih kaçmasın', W / 2, 980, 44, `rgba(243,233,210,${prog(lt, 5.1, .4)})`, F_SANS, 700); }
  } },
];
const DURATION = 67.0;
