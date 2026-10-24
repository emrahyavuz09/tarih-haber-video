# Tarih Haber — günlük video otomasyonu

Kanal: **Tarih Haber** (YouTube @TarihHaberyt, Instagram @tarihhaber, Facebook). Türkçe tarih kısa videoları, **her gün 1 video**.
Bu depo, videoyu sıfırdan üreten çizim motorunu ve her günün bölümünü tutar. Her sabahki görev bu dosyadaki adımları uygular.
Kullanıcı bilgisayarını açmaz: her şey bulutta, bağlayıcılarla (ElevenLabs, Metricool) yapılır.

## Sabitler
- ElevenLabs sesi: **Cavit P. - Energetic, Dynamic, Fast-Paced** → `voice_id: lxZLq5dcyw12UangGJgN`, model `eleven_v4`
- Metricool marka: `blogId: 7618441`, saat dilimi `Europe/Istanbul`
- Video medya adresi: `https://raw.githubusercontent.com/emrahyavuz09/tarih-haber-video/media/videos/<klasör>.mp4`
- Format: 1080x1920, 30 fps, 45–65 sn (sıkıştırılmış ses sonrası)

## Görsel üslup (değiştirme)
Eski kâğıt dokusu, krem/kırmızı/koyu kahve palet, el çizimi titreyen çizgiler, basit karakterler (büst), haritalar,
mühürler, yırtık kâğıt etiketler, kelime kelime altyazı (konuşulan kelime kırmızı). Örnek: `episodes/2026-10-24-malazgirt-1071/scenes.js`.

## Zorunlu kurallar
1. **HOOK / AÇILIŞ:** Metnin ilk cümlesi en fazla ~2,5 sn, merak uyandıran bir soru ya da şok edici bilgi.
   Açılış sahnesi HER VİDEODA FARKLI ve konunun kendisinden olmalı (aynı kırmızı kart YASAK, `hookCard` kullanma):
   konuya özel hareketli bir görüntü (ör. uçan ok yakın çekim, batan gemi, dalgalanan bayrak, açılan ferman) + üstünde
   `hookText(ctx, lt, 'hook cümlesi', {style, key, y, accent})`. Stiller: slam, marker, zoom, split, stencil, scroll. ('news' / SON DAKİKA bandı YASAK — kullanıcı kesinlikle istemiyor.)
   Art arda iki video aynı stili ve aynı arka plan rengini kullanmaz; `topics.md`'deki son videoların stiline bak ve satıra kullandığın stili yaz.
   İlk karede (lt=0) hem görüntü hem yazı dolu olmalı, ilk 0,3 sn'de güçlü bir hareket (darbe, yakınlaşma, patlama) olmalı.
2. **Taşma / güvenli alan:** Instagram ve Shorts arayüzü kenarları kapatır. Tüm yazılar, etiketler ve önemli figürler
   x **70–930**, y **190–1330** içinde kalmalı (sağdaki ~150 px beğen/yorum butonlarına ayrılmış). Altyazı otomatik olarak y≈1430'da.
   `tag`, `bigText`, `stamp`, `boxStamp`, `bubble`, `pin` kenarlara otomatik sıkıştırılır ve gerekirse küçülür; düz `text()` sıkıştırılmaz, dikkatli kullan.
   Arka plan süsleri (harita denizleri, gökyüzü, zemin) kenara taşabilir.
3. **Doğruluk:** Her bilgi en az 2 güvenilir kaynakla doğrulanır. Tartışmalı rakamları kesin söyleme ("kat kat kalabalık" gibi).
   Uydurma alıntı yok; rivayet ise öyle söyle. Kaynaklar YouTube açıklamasının en altına yazılır.
4. **Seslendirme metni:** Sayılar yazıyla ("bin yetmiş bir"), noktalama tempoyu belirler (hızlı ses: kısa cümleler, "..." gerilim için).
   Akşam (büyük olay) videoları 130–160 kelime, sabah (kısa şaşırtıcı bilgi) videoları 95–115 kelime. Son cümle güçlü bir kapanış.
   Kanal imzası `@tarihhaber` render tarafından otomatik eklenir (sol üst, küçük, yarı saydam); sahnelerde o köşeye (x<330, y<240) önemli öğe koyma.
5. **Milli değerler (çok önemli):** Türk Bayrağı yalnızca `turkFlag` / `flagPole` ile çizilir (resmî oranlar ve renk #E30A17).
   Bayrak asla ters, yamuk, yerde, yırtık, yanarken ya da olumsuz bir sahnenin parçası olarak gösterilmez. Hilal ve yıldız elle çizilmez.
   **Atatürk ASLA çizilmez — ne yüz, ne büst, ne silüet** (yanlış çizim çok eleştiri getirir; kullanıcının kesin isteği).
   Atatürk'ün geçtiği sahneler sembollerle anlatılır: Türk Bayrağı (`flagPole`), ilk Meclis binası (`meclis`), kutlayan halk (`crowd`),
   tarih mühürleri (`stamp`, `tag`), haritalar. Adı yazı etiketlerinde ve seslendirmede geçebilir.
   Ondan bir söz aktarılırsa kelimesi kelimesine doğru ve kaynaklı olmalıdır (yazı olarak, konuşma balonu olmadan).
   Hz. Muhammed, peygamberler ve sahabeler de hiçbir şekilde çizilmez.
   Osmanlı padişahları (`padisah()`), Türk hükümdarları ve şehitler onurlu çizilir. Türk milletini, devletini ya da kurucularını küçük düşüren
   espri, ifade ya da görsel yok. Tartışmalı siyasi konulara girilmez. Şüpheye düşersen daha saygılı olanı seç.
6. **TEMPO ve AKSİYON (çok önemli):** Video hızlı ve akıcı olmalı, dikkat hiç düşmemeli.
   - **Hızlı giriş:** İlk karede hook yazısı zaten ekranda (gecikme yok). Hook cümlesi ≤ 2 sn, ikinci sahneye ~2. saniyede geç.
     Metin selam/giriş cümlesiyle başlamaz, doğrudan olayın en çarpıcı anıyla başlar.
   - **Boşluksuz ses:** Ses indirildikten sonra MUTLAKA `python3 engine/tighten.py episodes/<klasör>` çalıştır (sahneleri yazmadan ÖNCE):
     uzun sessizlikleri kısaltır, sesi x1.04 hafifçe hızlandırır (konuşmaya dokunmaz, yalnızca gerçek sessizlikleri kısaltır) ve `words.json`'u günceller. Metinde "..." en fazla 2 kez.
   - **Her sahnede aksiyon:** Hiçbir sahne durağan değil; sahne boyunca en az bir şey sürekli hareket eder: dörtnala atlar (`horseArcher`),
     yürüyen birlikler (`marching`), uçan oklar (`arrowShot`), çizilerek ilerleyen harita okları (`arrow` + `partial`), dalgalanan bayrak,
     ateş (`fire`), toz (`dust`), düşen/dönen nesneler, kamera kayması (`pan`). Darbe anlarında (mühür, savaş, düşüş) `shake` kullan.
     Sadece yazı/etiket belirmesi aksiyon sayılmaz.
   - **Kısa sahneler:** Her sahne 1,8–4 sn → video başına 16–24 sahne. 1 sn'den uzun hareketsiz an olmaz.
7. **KALİTE (amatör görünüm yok):** Mühür/damga için yalnızca `sealPro(ctx, 'orta yazı', 'halka yazısı', x, y, r, renk, lt, gecikme, 'alt satır')`
   ve `stampBox(ctx, 'YAZI', x, y, boyut, renk, lt, gecikme, açı, 'alt satır')` kullan (temiz geometri + mürekkep dokusu).
   Yazı içeren grafikler titrek elle çizilmez. Kompozisyon dengeli olmalı: öğeler üst üste binmez, boş yer bırakılmaz, her sahnenin tek bir
   odak noktası olur. "İlkokul çizimi" gibi duran bir öğe (çarpık şekil, sıkışık yazı, rastgele yerleşim) görürsen yeniden tasarla.
8. Konu tekrarı yok: `topics.md` listesine bak. Dönemleri çeşitlendir (Hun, Göktürk, Selçuklu, Osmanlı, Cumhuriyet, dünya tarihi, ilginç olaylar).

## Günlük adımlar
0. **Hazırlık:** Depo `/home/claude/tarih-haber-video` altında değilse `add_repo` (emrahyavuz09/tarih-haber-video, push) ile ekle ve klonla.
   `git config user.name "Claude"; git config user.email "noreply@anthropic.com"`.
1. **Konu:** `topics.md`'yi oku. Gerekirse WebSearch ile bugünün tarihine denk gelen olaylara ve Türk tarih kanallarında tutan konulara bak.
   Görsel olarak anlatılabilir (harita, savaş düzeni, karakterler), merak uyandıran bir konu seç. Klasör: `episodes/YYYY-MM-DD-kisa-ad/`.
2. **Araştırma:** WebSearch/WebFetch ile en az 2 kaynak. Önemli bilgileri ve kaynak URL'lerini `notes.md`'ye yaz.
3. **Metin:** `script.txt` (kurallar 1, 3, 4, 5, 6).
4. **Ses (ElevenLabs bağlayıcısı):** Önce `creative_generate_speech` ile `estimate_only: true` çağır. Kredi yetersizlik hatası dönerse DUR:
   video yayınlama, kullanıcıya "ElevenLabs kredin yetersiz, yükleme yap" bildirimi gönder. Tahmini krediyi `credits.md`'ye (tarih, kredi) ekle;
   bu dosyada `Aylık kota:` yazıyorsa ve ayın toplamı kotanın %80'ini geçtiyse özet mesajında uyar.
   Sonra `creative_create_flow` → `creative_generate_speech` (voice_id ve model yukarıda, prompt = script, **`generations_count: 1`** — kullanıcı tek okuma istedi)
   → `creative_get_flow_run_status` ile tamamlanana kadar bekle → ilk okumanın `content_url`'ini `voice.mp3` olarak indir (curl).
   Aynı okumayı `creative_add_flow_asset_node` (generation_id) ile düğüme koy → `creative_transcribe_audio` (eleven_scribe_v1, connect_from)
   → bitince `words_download_url`'i `words.json` olarak indir. Üretimi asla yeniden deneme (kredi harcar).
   Hemen ardından `python3 engine/tighten.py episodes/<klasör>` (kural 6).
5. **Sahneler:** `scenes.js` yaz. `SCENES = [{s, e, draw(ctx, lt, d)}]`, `KEY = [...]` (BÜYÜK HARF anahtar kelimeler), `DURATION = son kelime bitişi + 2.2`,
   `OUTRO_AT = DURATION - 1.6`. Sahne sınırlarını (sıkıştırılmış) `words.json` zamanlarına göre koy; 16–24 sahne, her biri 1,8–4 sn, her birinde sürekli aksiyon (kural 6).
   İlk sahne konuya özel hareketli görüntü + hookText (kural 1). Kütüphane (`engine/lib.js`): `bg, camera(sahne dosyasında tanımla), tag, bigText, stamp, boxStamp, bubble, pin, arrow,
   curvePts, shape, ell, line, pawn, sword, alparslan, diyojen (taçlı hükümdar şablonu), padisah, turkFlag, flagPole, meclis, crowd, crown, horseArcher, arrowShot, yurt, chainLink,
   drawSea, drawLand, proj, ANATOLIA, THRACE, mountains, paperTex, shake, pan, marching, dust, fire, hookCard, sealPro, stampBox`. Yeni figür gerekiyorsa lib.js'e genel fonksiyon olarak ekle (sonraki günler de kullanır).
6. **Kontrol:** `node engine/render.js episodes/<klasör> stills` → kareleri tek bir temas sayfasında birleştir (PIL) ve **Read ile bak**.
   Taşma, üst üste binme, okunmayan yazı, boş ya da durağan sahne varsa düzelt ve tekrar bak. Temiz olana kadar yayına geçme.
7. **Video:** `bash engine/build.sh episodes/<klasör>` → `final.mp4`. Süreyi ve birkaç kareyi kontrol et.
8. **Metinler (`meta.json`):**
   - `youtube`: `title` (≤ 70 karakter, merak + anahtar kelime), `description` (hook cümlesi, 2–3 cümle özet, 3–5 hashtag, en altta "Kaynaklar:" listesi), `tags` (8–15)
   - `instagram`: `caption` (ilk satır hook, 2–3 kısa satır, yorum getiren bir soru, 10–15 hashtag)
   - `facebook`: `title` + `text` (hikâye anlatır gibi 3–4 cümle, paylaşmaya davet, 3–5 hashtag)
   Üç metin birbirinin kopyası olmasın.
   **Üç platformda da metnin en altına** (YouTube'da Kaynaklar listesinin altına) şu kısa notu ekle:
   `Not: Videoda kullanılan görseller temsili çizimlerdir. Tarihî kişilerin gerçek görünümlerini birebir yansıtmayabilir.`
9. **Medya yükle:** `final.mp4`'ü `media` dalına `videos/<klasör>.mp4` olarak koy ve gönder:
   `git fetch origin media && git worktree add /tmp/media origin/media` (dal yoksa `git worktree add --orphan -b media /tmp/media`),
   kopyala, commit, `git push origin HEAD:media`. Sonra `curl -sI <medya adresi>` ile 200 döndüğünü doğrula.
10. **Saatler:** Her ağ için (`instagram`, `facebook`, `youtube`) `getBestTimeToPostByNetwork` (bugün 00:00–23:59). Bugün, şimdiden en az 60 dk sonra
    ve 11:00–23:00 arasındaki en yüksek değerli saati seç. Veri yoksa: Instagram 20:00, Facebook 19:30, YouTube 18:30.
11. **Planla (Metricool `createScheduledPost`, her ağ için AYRI gönderi):**
    - Instagram: `providers [{network:"instagram"}]`, `instagramData {type:"REEL", showReelOnFeed:true, isAiGenerated:true}`, text = caption
    - Facebook: `providers [{network:"facebook"}]`, `facebookData {type:"REEL", title}`, text = facebook text
    - YouTube: **Metricool KULLANMA** (kullanıcı isteği, 24 Eki 2026). YouTube Studio'ya tarayıcıdan manuel yükle ve planla (başlık, açıklama, etiketler, "çocuklara özel değil", "değiştirilmiş içerik: hayır", Planla: tarih+saat).
    - Hepsinde `media: [medya adresi]`, `autoPublish: true`, `publicationDate {dateTime, timezone:"Europe/Istanbul"}`.
12. **Kayıt:** `topics.md`'ye satır ekle (tarih, konu, saatler). `stills/`, `music.wav`, `voice.mp3`, `final.mp4` main'e girmez (.gitignore).
    `scenes.js, script.txt, notes.md, meta.json, words.json, timeline.json` commit + `git push origin main`.
13. **Rapor:** Kullanıcıya kısa Türkçe özet gönder (SendUserMessage ve PushNotification varsa): konu, hook, üç platformun saati, Metricool planner linkleri.
    Bir adım başarısız olursa (kredi bitti, bağlayıcı yok, push reddedildi) yayınlama yapma, ne olduğunu açıkça bildir.
