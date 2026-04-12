# Tejreed — AI Vocal Extractor (Next.js Frontend)

## Kurulum

```bash
cd tejreed
npm install
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışır.

## Backend

FastAPI backend'in `http://localhost:5000` adresinde çalışıyor olması gerekiyor.  
Backend portunu değiştirmek için `components/UploadZone.tsx` dosyasındaki `API_BASE` sabitini güncelleyin:

```ts
const API_BASE = 'http://localhost:5000'
```

## Klasör Yapısı

```
tejreed/
├── app/
│   ├── layout.tsx        # Root layout + fonts (Orbitron, Space Mono)
│   ├── page.tsx          # Ana sayfa
│   └── globals.css       # Global stiller + animasyonlar
├── components/
│   ├── Navbar.tsx        # Navigasyon (responsive)
│   ├── WaveBackground.tsx # Canvas tabanlı animasyonlu dalgalar
│   ├── Particles.tsx     # Yüzen parçacık efekti
│   ├── UploadZone.tsx    # Drag&drop + YouTube + ilerleme + sonuç
│   ├── StatsBar.tsx      # İstatistik kartları
│   └── Footer.tsx        # Alt bilgi
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Özellikler

- 🎨 Canvas tabanlı animasyonlu dalga arka planı
- 🌟 Yüzen parçacık efektleri + grid overlay
- 📁 Drag & Drop dosya yükleme (video & ses)
- ▶️ YouTube URL desteği + video bilgisi önizleme
- 📊 Server-Sent Events (SSE) ile gerçek zamanlı ilerleme
- 📥 Sonuç indirme (ses / video / zip)
- 📱 Tam responsive tasarım
- 🔤 Orbitron + Space Mono fontları
