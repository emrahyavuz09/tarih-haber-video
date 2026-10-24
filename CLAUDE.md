# Tarih Haber — günlük video otomasyonu

Kanal: **Tarih Haber** (YouTube @TarihHaberyt, Instagram @tarihhaber, Facebook). Türkçe tarih kısa videoları, **her gün 1 video**.
Bu depo, videoyu sıfırdan üreten çizim motorunu ve her günün bölümünü tutar. Her sabahki görev bu dosyadaki adımları uygular.
Kullanıcı bilgisayarını açmaz: her şey bulutta, bağlayıcılarla (ElevenLabs, Metricool) yapılır.

## Sabitler
- ElevenLabs sesi: **Cavit P. - Energetic, Dynamic, Fast-Paced** → `voice_id: lxZLq5dcyw12UangGJgN`, model `eleven_v4`
- Metricool marka: `blogId: 7618441`, saat dilimi `Europe/Istanbul`
- Video medya adresi: `https://raw.githubusercontent.com/emrahyavuz09/tarih-haber-video/media/videos/<klasör>.mp4`
- Format: 1080x1920, 30 fps, 55–75 sn

## Görsel üslup (değiştirme)
Eski kâğıt dokusu, krem/kırmızı/koyu kahve palet, el çizimi titreyen çizgiler, basit karakterler (büst), haritalar,
mühürler, yırtık kâğıt etiketler, kelime kelime altyazı (konuşulan kelime kırmızı). Örnek: `episodes/2026-10-24-malazgirt-1071/scenes.js`.

## Zorunlu kurallar
1. **HOOK:** Metnin ilk cümlesi en fazla ~2,5 sn sürecek, merak uyandıran bir soru ya da şok edici bir bilgi olmalı
   (ör. "Bir sultan savaşa kefen giyerek girdi. Neden?"). İlk sahne **her zaman** `hookCard(ctx, lt, d, 'büyük cümle', 'alt vurgu')` olur.
2. **Taşma / güvenli alan:** Instagram ve Shorts arayüzü kenarları kapatır. Tüm yazılar, etiketler ve önemli figürler
   x **70–930**, y **190–1330** içinde kalmalı (sağdaki ~150 px beğen/yorum butonlarına ayrılmış). Altyazı otomatik olarak y≈1430'da.
   `tag`, `bigText`, `stamp`, `boxStamp`, `bubble`, `pin` kenarlara otomatik sıkıştırılır ve gerekirse küçülür; düz `text()` sıkıştırılmaz, dikkatli kullan.
   Arka plan süsleri (harita denizleri, gökyüzü, zemin) kenara taşabilir.
3. **Doğruluk:** Her bilgi en az 2 güvenilir kaynakla doğrulanır. Tartışmalı rakamları kesin söyleme ("kat kat kalabalık" gibi).
   Uydurma alıntı yok; rivayet ise öyle söyle. Kaynaklar YouTube açıklamasının en altına yazılır.
4. **Seslendirme metni:** Sayılar yazıyla ("bin yetmiş bir"), noktalama tempoyu belirler (hızlı ses: kısa cümleler, "..." gerilim için).
   130–170 kelime. Son cümle güçlü bir kapanış.
5. **Milli değerler (çok önemli):** Türk Bayrağı yalnızca `turkFlag` / `flagPole` ile çizilir (resmî oranlar ve renk #E30A17).
   Bayrak asla ters, yamuk, yerde, yırtık, yanarken ya da olumsuz bir sahnenin parçası olarak gösterilmez. Hilal ve yıldız elle çizilmez.
   Atatürk yalnızca `ataturk()` şablonuyla, her zaman ağırbaşlı, saygın ve kahramanca çizilir: karikatür, komik ifade, abartı ya da alay yok.
   Ağzı konuşurken bile oynatılmaz, alıntı balonu kullanılırsa sözü kelimesi kelimesine doğru ve kaynaklı olmalıdır.
   Osmanlı padişahları (`padisah()`), Türk hükümdarları ve şehitler onurlu çizilir. Türk milletini, devletini ya da kurucularını küçük düşüren
   espri, ifade ya da görsel yok. Tartışmalı siyasi konulara girilmez. Şüpheye düşersen daha saygılı olanı seç.
6. Konu tekrarı yok: `topics.md` listesine bak. Dönemleri çeşitlendir (Hun, Göktürk, Selçuklu, Osmanlı, Cumhuriyet, dünya tarihi, ilginç olaylar).

## Günlük adımlar
0. **Hazırlık:** Depo `/home/claude/tarih-haber-video` altında değilse `add_repo` (emrahyavuz09/tarih-haber-video, push) ile ekle ve klonla.
   `git config user.name "Claude"; git config user.email "noreply@anthropic.com"`.
1. **Konu:** `topics.md`'yi oku. Gerekirse WebSearch ile bugünün tarihine denk gelen olaylara ve Türk tarih kanallarında tutan konulara bak.
   Görsel olarak anlatılabilir (harita, savaş düzeni, karakterler), merak uyandıran bir konu seç. Klasör: `episodes/YYYY-MM-DD-kisa-ad/`.
2. **Araştırma:** WebSearch/WebFetch ile en az 2 kaynak. Önemli bilgileri ve kaynak URL'lerini `notes.md`'ye yaz.
3. **Metin:** `script.txt` (kurallar 1, 3, 4, 5).
4. **Ses (ElevenLabs bağlayıcısı):** Önce `creative_generate_speech` ile `estimate_only: true` çağır. Kredi yetersizlik hatası dönerse DUR:
   video yayınlama, kullanıcıya "ElevenLabs kredin yetersiz, yükleme yap" bildirimi gönder. Tahmini krediyi `credits.md`'ye (tarih, kredi) ekle;
   bu dosyada `Aylık kota:` yazıyorsa ve ayın toplamı kotanın %80'ini geçtiyse özet mesajında uyar.
   Sonra `creative_create_flow` → `creative_generate_speech` (voice_id ve model yukarıda, prompt = script, **`generations_count: 1`** — kullanıcı tek okuma istedi)
   → `creative_get_flow_run_status` ile tamamlanana kadar bekle → ilk okumanın `content_url`'ini `voice.mp3` olarak indir (curl).
   Aynı okumayı `creative_add_flow_asset_node` (generation_id) ile düğüme koy → `creative_transcribe_audio` (eleven_scribe_v1, connect_from)
   → bitince `words_download_url`'i `words.json` olarak indir. Üretimi asla yeniden deneme (kredi harcar).
5. **Sahneler:** `scenes.js` yaz. `SCENES = [{s, e, draw(ctx, lt, d)}]`, `KEY = [...]` (BÜYÜK HARF anahtar kelimeler), `DURATION = son kelime bitişi + 2.2`,
   `OUTRO_AT = DURATION - 1.6`. Sahne sınırlarını `words.json` zamanlarına göre koy; 12–16 sahne, her biri 2,5–7 sn.
   İlk sahne hookCard. Kütüphane (`engine/lib.js`): `bg, camera(sahne dosyasında tanımla), tag, bigText, stamp, boxStamp, bubble, pin, arrow,
   curvePts, shape, ell, line, pawn, sword, alparslan, diyojen (taçlı hükümdar şablonu), padisah, ataturk ({kalpak:true} Kurtuluş Savaşı), turkFlag, flagPole, crown, horseArcher, arrowShot, yurt, chainLink,
   drawSea, drawLand, proj, ANATOLIA, THRACE, mountains, paperTex`. Yeni figür gerekiyorsa lib.js'e genel fonksiyon olarak ekle (sonraki günler de kullanır).
6. **Kontrol:** `node engine/render.js episodes/<klasör> stills` → kareleri tek bir temas sayfasında birleştir (PIL) ve **Read ile bak**.
   Taşma, üst üste binme, okunmayan yazı, boş sahne varsa düzelt ve tekrar bak. Temiz olana kadar yayına geçme.
7. **Video:** `bash engine/build.sh episodes/<klasör>` → `final.mp4`. Süreyi ve birkaç kareyi kontrol et.
8. **Metinler (`meta.json`):**
   - `youtube`: `title` (≤ 70 karakter, merak + anahtar kelime), `description` (hook cümlesi, 2–3 cümle özet, 3–5 hashtag, en altta "Kaynaklar:" listesi), `tags` (8–15)
   - `instagram`: `caption` (ilk satır hook, 2–3 kısa satır, yorum getiren bir soru, 10–15 hashtag)
   - `facebook`: `title` + `text` (hikâye anlatır gibi 3–4 cümle, paylaşmaya davet, 3–5 hashtag)
   Üç metin birbirinin kopyası olmasın.
   **Üç platformda da metnin en altına** (YouTube'da Kaynaklar listesinin altına) şu kısa notu ekle:
   `🎨 Bu içerikler özgün çizimlerle hazırlanmaktadır.`
9. **Medya yükle:** `final.mp4`'ü `media` dalına `videos/<klasör>.mp4` olarak koy ve gönder:
   `git fetch origin media && git worktree add /tmp/media origin/media` (dal yoksa `git worktree add --orphan -b media /tmp/media`),
   kopyala, commit, `git push origin HEAD:media`. Sonra `curl -sI <medya adresi>` ile 200 döndüğünü doğrula.
10. **Saatler:** Her ağ için (`instagram`, `facebook`, `youtube`) `getBestTimeToPostByNetwork` (bugün 00:00–23:59). Bugün, şimdiden en az 60 dk sonra
    ve 11:00–23:00 arasındaki en yüksek değerli saati seç. Veri yoksa: Instagram 20:00, Facebook 19:30, YouTube 18:30.
11. **Planla (Metricool `createScheduledPost`, her ağ için AYRI gönderi):**
    - Instagram: `providers [{network:"instagram"}]`, `instagramData {type:"REEL", showReelOnFeed:true, isAiGenerated:true}`, text = caption
    - Facebook: `providers [{network:"facebook"}]`, `facebookData {type:"REEL", title}`, text = facebook text
    - YouTube: `providers [{network:"youtube"}]`, `youtubeData {title, type:"short", privacy:"public", tags, category:"EDUCATION", madeForKids:false, isAiGeneratedContent:false}`, text = description
    - Hepsinde `media: [medya adresi]`, `autoPublish: true`, `publicationDate {dateTime, timezone:"Europe/Istanbul"}`.
12. **Kayıt:** `topics.md`'ye satır ekle (tarih, konu, saatler). `stills/`, `music.wav`, `voice.mp3`, `final.mp4` main'e girmez (.gitignore).
    `scenes.js, script.txt, notes.md, meta.json, words.json, timeline.json` commit + `git push origin main`.
13. **Rapor:** Kullanıcıya kısa Türkçe özet gönder (SendUserMessage ve PushNotification varsa): konu, hook, üç platformun saati, Metricool planner linkleri.
    Bir adım başarısız olursa (kredi bitti, bağlayıcı yok, push reddedildi) yayınlama yapma, ne olduğunu açıkça bildir.
