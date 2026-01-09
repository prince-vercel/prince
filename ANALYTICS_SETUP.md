# Google Analytics Real Data Integration Setup

Analytics'in gerçek verileri göstermesi için aşağıdaki adımları izleyin.

## 1️⃣ Package Yükleme

```bash
npm install @google-analytics/data
```

## 2️⃣ Google Cloud Console Kurulumu

### a) Google Cloud Projesi Oluştur
1. [Google Cloud Console](https://console.cloud.google.com/) aç
2. Yeni bir proje oluştur veya mevcut projeyi seç
3. Proje adı: `prince-web-analytics` (örnek)

### b) Google Analytics Data API'yi Enable Et
1. API Library'e git (Search: "Google Analytics Data API")
2. "Enable" butonuna tıkla
3. Aktivasyonu bekle (~2 dakika)

### c) Service Account Oluştur
1. Credentials → Create Credentials → Service Account
2. Service Account Details doldur:
   - Name: `prince-web-dashboard`
   - Description: `Analytics data for dashboard`
3. "Create and Continue" → Rol: `Viewer` seç → "Done"

### d) Service Account Key Oluştur
1. Oluşturulan Service Account'a tıkla
2. "Keys" sekmesine git
3. "Add Key" → "Create new key" → JSON
4. JSON dosyası indir (bu çok önemli!)

## 3️⃣ Google Analytics Property Setup

### a) GA4'te Service Account Ekle
1. [Google Analytics](https://analytics.google.com/) aç
2. Admin → Property → Property Users → Invite user
3. Service Account email'ini gir (JSON'dan bulabilirsin)
4. Rol: `Viewer` seç
5. Invite

### b) Property ID'sini Bulun
1. Admin → Property Settings
2. Property ID'sini kopyala (örnek: `123456789`)

## 4️⃣ Environment Variables Setup

### .env.local dosyası oluştur

Proje root'unda `.env.local` dosyası oluştur:

```env
# Google Analytics Configuration
GOOGLE_ANALYTICS_PROPERTY_ID=YOUR_GA4_PROPERTY_ID

# Service Account Credentials (JSON'ı tek satırda yapıştır)
GOOGLE_ANALYTICS_CREDENTIALS={"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"service-account@...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

### JSON Formatını Nasıl Hazırlamak?

İndirdiğin JSON dosyasını `.env.local`'e eklemek için:

1. JSON dosyasını metin editörüyle aç
2. Tüm içeriği kopyala
3. Tek bir satıra dönüştür (tüm yeni satırları kaldır)
4. `GOOGLE_ANALYTICS_CREDENTIALS=` sonrasına yapıştır

Veya Python/Node.js kullanarak:

```javascript
const fs = require('fs');
const json = fs.readFileSync('downloaded-key.json', 'utf8');
const encoded = JSON.stringify(json);
console.log(`GOOGLE_ANALYTICS_CREDENTIALS=${encoded}`);
```

## 5️⃣ Test Et

```bash
npm run dev
```

Admin Dashboard'a git:
- `/admin/travel` → Tüm metrikleri gerçek verilerle görmelisin

### Eğer hala mock veriler görünüyorsa:

1. Server konsolunda hataları kontrol et
2. Environment variables doğru ayarlanmış mı kontrol et
3. Service Account'a GA4 property'de access var mı kontrol et

## 📊 Hangi Verileri Gösterir?

✅ Sayfa Görüntüleme (Page Views)
✅ Benzersiz Ziyaretçi (Unique Visitors)
✅ Hemen Çık Oranı (Bounce Rate %)
✅ Ort. Oturum Süresi (Avg Session Duration)
✅ En Çok Ziyaret Edilen Sayfalar
✅ Cihaz Dağılımı (Mobile/Desktop/Tablet)

## 🔒 Güvenlik Notları

- `.env.local` dosyasını GIT'e commit'leme!
- Private key'i hiç paylaşma
- Service Account'a sadece "Viewer" izni ver

## 📞 Sorun Giderme

| Problem | Çözüm |
|---------|-------|
| "Property ID not configured" | GOOGLE_ANALYTICS_PROPERTY_ID ayarlanmış mı kontrol et |
| "Credentials error" | JSON formatı doğru mu, escape characters var mı kontrol et |
| Mock veriler gösteriliyor | Service Account GA4'te Viewer rolü ile mi ekli? |
| 401 Unauthorized | Credentials JSON geçerli mi kontrol et |

## 📖 Kaynaklar

- [Google Analytics Data API Docs](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Service Account Setup](https://cloud.google.com/docs/authentication/getting-started)
- [GA4 User Management](https://support.google.com/analytics/answer/9304153)
