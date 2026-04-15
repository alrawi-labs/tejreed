export type Lang = "en" | "tr" | "ar" | "fa" | "fr" | "de" | "es" | "it";

export const translations = {
  en: {
    dir: "ltr" as const,
    nav: {
      upload: "Upload",
      howItWorks: "How it Works",
      faq: "FAQ",
      contact: "Contact Us",
      getStarted: "GET STARTED",
    },
    hero: {
      badge: "AI-POWERED VOCAL SEPARATION",
      title1: "TEJREED:",
      title2: "AI VOCAL EXTRACTOR",
      subtitle: "Separate crystal-clear vocals from any video instantly.",
    },
    stats: [
      { value: "2M+", label: "FILES PROCESSED" },
      { value: "99.2%", label: "ACCURACY RATE" },
      { value: "<30s", label: "AVERAGE TIME" },
      { value: "4K", label: "ACTIVE USERS" },
    ],
    upload: {
      tabFile: "↑ UPLOAD FILE",
      tabYoutube: "▶ YOUTUBE",
      dragTitle: "DRAG & DROP YOUR VIDEO HERE",
      dragSub: "Or Click to Upload (MP4, MOV, AVI — Max 500MB)",
      dropIt: "DROP IT!",
      youtubePlaceholder: "Paste a YouTube link...",
      process: "PROCESS",
      fetchingInfo: "Fetching video info...",
      processingLabel: "PROCESSING",
      aiWorking: "AI is working...",
      completeTitle: "Processing Complete",
      completeSub: "Your vocals have been extracted",
      downloadVocals: "Download Vocals (MP3)",
      downloadVideo: "Download Vocal Video (MP4)",
      downloadAll: "Download Everything (ZIP)",
      processAnother: "PROCESS ANOTHER FILE",
      youtubeBlocked:
        "YouTube did not allow us to download this video automatically.",
      youtubeManual:
        "You can download the video yourself and upload it via the",
      uploadFileTab: "Upload File",
      tab: "tab.",
      downloadSavefrom: "⬇️ Download on SaveFrom.net",
      uploadFileBtn: "UPLOAD FILE →",
    },
    howItWorks: {
      tag: "Simple Process",
      title: "How It Works",
      subtitle:
        "Three steps. No account needed. No watermarks. Just clean vocals.",
      tryNow: "Try it now",
      steps: [
        {
          number: "01",
          title: "Upload Your File",
          description:
            "Drop any video or audio file — MP4, MOV, AVI, MP3, WAV and more. Up to 500MB supported. Or paste a YouTube link to process directly from the web.",
        },
        {
          number: "02",
          title: "AI Processes Your Audio",
          description:
            "Our deep learning model analyses every frequency layer in your track. It separates vocals from instrumentals with surgical precision — no artifacts, no quality loss.",
        },
        {
          number: "03",
          title: "Download Your Results",
          description:
            "Get the clean vocal track as an MP3, the vocal-synced video as an MP4, or grab everything at once in a single ZIP — ready in seconds.",
        },
      ],
    },
    faq: {
      tag: "Got Questions?",
      title: "Frequently Asked",
      subtitle: "Everything you need to know about Tejreed.",
      items: [
        {
          q: "What does the name Tejreed mean?",
          a: '"Tejreed" is an Arabic word meaning "abstraction," "stripping," or "isolation." It perfectly reflects the core function of our tool: stripping away the music and background noise to cleanly isolate the vocals.',
        },
        {
          q: "What file formats are supported?",
          a: "You can upload MP4, MOV, AVI, MKV for video, and MP3, WAV, FLAC, AAC for audio. Files up to 500MB are accepted. You can also paste a YouTube URL to process a video directly.",
        },
        {
          q: "How accurate is the vocal extraction?",
          a: "Tejreed uses state-of-the-art deep learning models trained on thousands of hours of music and speech. For most studio-quality recordings, the separation is virtually seamless. Results may vary for heavily compressed or low-quality source files.",
        },
        {
          q: "Do I need to create an account?",
          a: "No account, no sign-up, no credit card. Just upload your file and download the result. It's completely free to use.",
        },
        {
          q: "How long does processing take?",
          a: "Most files are processed within 30–90 seconds depending on file length and server load. You'll see a real-time progress bar while the AI works.",
        },
        {
          q: "Are my files stored on your servers?",
          a: "Files are processed in a temporary session and automatically deleted shortly after. We do not store, share, or use your audio or video content for any purpose.",
        },
        {
          q: "Can I use the extracted vocals commercially?",
          a: "Tejreed is a technical tool — it's your responsibility to ensure you have the appropriate rights to the source material before using the output commercially.",
        },
        {
          q: "Why did my YouTube video fail to process?",
          a: "Some YouTube videos are protected and cannot be downloaded automatically. If this happens, a fallback message will guide you to download the video manually via SaveFrom.net, then upload it through the file upload tab.",
        },
      ],
    },
    contact: {
      tag: "Get In Touch",
      title: "Contact Us",
      subtitle:
        "Have a question, found a bug, or want to collaborate? Reach out — we'd love to hear from you.",
      links: [
        {
          label: "LinkedIn",
          handle: "yasir-alrawi",
          description: "Connect professionally",
        },
        {
          label: "GitHub",
          handle: "yasir237",
          description: "Explore the source",
        },
      ],
      builtBy: "Built with ❤️ by",
    },
    footer: {
      rights: "© 2024 Tejreed. All Rights Reserved.",
    },
  },

  tr: {
    dir: "ltr" as const,
    nav: {
      upload: "Yükle",
      howItWorks: "Nasıl Çalışır",
      faq: "SSS",
      contact: "İletişim",
      getStarted: "BAŞLA",
    },
    hero: {
      badge: "YAPAY ZEKA DESTEKLİ VOKAL AYIRMA",
      title1: "TEJREED:",
      title2: "YAPAY ZEKA VOKAL ÇIKARICI",
      subtitle:
        "Herhangi bir videodan kristal netliğinde vokalleri anında ayırın.",
    },
    stats: [
      { value: "2M+", label: "İŞLENEN DOSYA" },
      { value: "99.2%", label: "DOĞRULUK ORANI" },
      { value: "<30sn", label: "ORTALAMA SÜRE" },
      { value: "4K", label: "AKTİF KULLANICI" },
    ],
    upload: {
      tabFile: "↑ DOSYA YÜKLE",
      tabYoutube: "▶ YOUTUBE",
      dragTitle: "VİDEONUZU BURAYA SÜRÜKLEYİN",
      dragSub: "Veya Tıklayarak Yükleyin (MP4, MOV, AVI — Maks 500MB)",
      dropIt: "BIRAK!",
      youtubePlaceholder: "YouTube bağlantısı yapıştırın...",
      process: "İŞLE",
      fetchingInfo: "Video bilgisi alınıyor...",
      processingLabel: "İŞLENİYOR",
      aiWorking: "Yapay zeka çalışıyor...",
      completeTitle: "İşlem Tamamlandı",
      completeSub: "Vokalleriniz başarıyla çıkarıldı",
      downloadVocals: "Vokalleri İndir (MP3)",
      downloadVideo: "Vokal Videoyu İndir (MP4)",
      downloadAll: "Tümünü İndir (ZIP)",
      processAnother: "BAŞKA DOSYA İŞLE",
      youtubeBlocked: "YouTube bu videoyu otomatik indirmemize izin vermedi.",
      youtubeManual: "Videoyu kendiniz indirip",
      uploadFileTab: "Dosya Yükleme",
      tab: "sekmesinden yükleyebilirsiniz.",
      downloadSavefrom: "⬇️ SaveFrom.net'ten İndir",
      uploadFileBtn: "DOSYA YÜKLE →",
    },
    howItWorks: {
      tag: "Basit Süreç",
      title: "Nasıl Çalışır",
      subtitle: "Üç adım. Hesap gerekmez. Filigran yok. Sadece temiz vokaller.",
      tryNow: "Hemen dene",
      steps: [
        {
          number: "01",
          title: "Dosyanızı Yükleyin",
          description:
            "MP4, MOV, AVI, MP3, WAV ve daha fazlası dahil herhangi bir video veya ses dosyası bırakın. 500MB'a kadar desteklenir. Ya da YouTube bağlantısı yapıştırarak doğrudan işleyin.",
        },
        {
          number: "02",
          title: "Yapay Zeka Sesinizi İşler",
          description:
            "Derin öğrenme modelimiz parçanızdaki her frekans katmanını analiz eder. Vokalleri enstrümanlardan cerrahi hassasiyetle ayırır — artefakt yok, kalite kaybı yok.",
        },
        {
          number: "03",
          title: "Sonuçlarınızı İndirin",
          description:
            "Temiz vokal parçasını MP3 olarak, vokal senkronlu videoyu MP4 olarak alın ya da tek bir ZIP içinde hepsini bir arada indirin — saniyeler içinde hazır.",
        },
      ],
    },
    faq: {
      tag: "Sorularınız mı Var?",
      title: "Sık Sorulan Sorular",
      subtitle: "Tejreed hakkında bilmeniz gereken her şey.",
      items: [
        {
          q: "Tejreed ne anlama geliyor?",
          a: 'Tejreed, Arapça bir kelime olup "soyutlama", "arındırma" veya "ayrıştırma" anlamına gelir. Bu isim, aracımızın müziği ve arka plan gürültüsünü arındırarak saf vokalleri ayrıştırma işlevini yansıtmaktadır.',
        },
        {
          q: "Hangi dosya formatları destekleniyor?",
          a: "Video için MP4, MOV, AVI, MKV; ses için MP3, WAV, FLAC, AAC yükleyebilirsiniz. 500MB'a kadar dosyalar kabul edilir. Ayrıca bir YouTube URL'si yapıştırarak videoyu doğrudan işleyebilirsiniz.",
        },
        {
          q: "Vokal çıkarma ne kadar doğru?",
          a: "Tejreed, binlerce saatlik müzik ve konuşma üzerinde eğitilmiş son teknoloji derin öğrenme modelleri kullanır. Çoğu stüdyo kalitesindeki kayıt için ayrım neredeyse kusursuzdur. Yoğun sıkıştırılmış veya düşük kaliteli kaynak dosyalarda sonuçlar değişebilir.",
        },
        {
          q: "Hesap oluşturmam gerekiyor mu?",
          a: "Hesap yok, kayıt yok, kredi kartı yok. Sadece dosyanızı yükleyin ve sonucu indirin. Tamamen ücretsizdir.",
        },
        {
          q: "İşlem ne kadar sürer?",
          a: "Çoğu dosya, dosya uzunluğuna ve sunucu yüküne bağlı olarak 30–90 saniye içinde işlenir. Yapay zeka çalışırken gerçek zamanlı bir ilerleme çubuğu göreceksiniz.",
        },
        {
          q: "Dosyalarım sunucularınızda saklanıyor mu?",
          a: "Dosyalar geçici bir oturumda işlenir ve kısa süre sonra otomatik olarak silinir. Ses veya video içeriğinizi herhangi bir amaçla saklamıyor, paylaşmıyor veya kullanmıyoruz.",
        },
        {
          q: "Çıkarılan vokalleri ticari olarak kullanabilir miyim?",
          a: "Tejreed teknik bir araçtır — çıktıyı ticari olarak kullanmadan önce kaynak materyale uygun haklara sahip olduğunuzdan emin olmak sizin sorumluluğunuzdadır.",
        },
        {
          q: "YouTube videom neden işlenemedi?",
          a: "Bazı YouTube videoları korumalıdır ve otomatik olarak indirilemez. Bu durumda bir geri dönüş mesajı sizi videoyu SaveFrom.net aracılığıyla manuel olarak indirmeye, ardından dosya yükleme sekmesiyle yüklemeye yönlendirecektir.",
        },
      ],
    },
    contact: {
      tag: "İletişime Geçin",
      title: "İletişim",
      subtitle:
        "Sorunuz mu var, hata mı buldunuz, iş birliği mi yapmak istiyorsunuz? Ulaşın — duymaktan memnuniyet duyarız.",
      links: [
        {
          label: "LinkedIn",
          handle: "yasir-alrawi",
          description: "Profesyonel bağlantı kurun",
        },
        {
          label: "GitHub",
          handle: "yasir237",
          description: "Kaynak kodu keşfedin",
        },
      ],
      builtBy: "❤️ ile yapıldı,",
    },
    footer: {
      rights: "© 2024 Tejreed. Tüm Hakları Saklıdır.",
    },
  },

  ar: {
    dir: "rtl" as const,
    nav: {
      upload: "رفع",
      howItWorks: "كيف يعمل",
      faq: "الأسئلة الشائعة",
      contact: "اتصل بنا",
      getStarted: "ابدأ الآن",
    },
    hero: {
      badge: "فصل الأصوات بالذكاء الاصطناعي",
      title1: "تجريد",
      title2: "مستخرج الأصوات بالذكاء الاصطناعي",
      subtitle: "افصل الأصوات الواضحة كالكريستال من أي فيديو فورياً.",
    },
    stats: [
      { value: "+2M", label: "ملفات معالجة" },
      { value: "99.2%", label: "معدل الدقة" },
      { value: "<30ث", label: "متوسط الوقت" },
      { value: "4K", label: "مستخدم نشط" },
    ],
    upload: {
      tabFile: "↑ رفع ملف",
      tabYoutube: "▶ يوتيوب",
      dragTitle: "اسحب وأفلت الفيديو هنا",
      dragSub: "أو انقر للرفع (MP4, MOV, AVI — الحد الأقصى 500MB)",
      dropIt: "أفلته!",
      youtubePlaceholder: "الصق رابط يوتيوب هنا...",
      process: "معالجة",
      fetchingInfo: "جاري جلب معلومات الفيديو...",
      processingLabel: "جاري المعالجة",
      aiWorking: "الذكاء الاصطناعي يعمل...",
      completeTitle: "اكتملت المعالجة",
      completeSub: "تم استخراج الأصوات بنجاح",
      downloadVocals: "تحميل الأصوات (MP3)",
      downloadVideo: "تحميل فيديو الأصوات (MP4)",
      downloadAll: "تحميل الكل (ZIP)",
      processAnother: "معالجة ملف آخر",
      youtubeBlocked: "لم يسمح يوتيوب لنا بتحميل هذا الفيديو تلقائياً.",
      youtubeManual: "يمكنك تحميل الفيديو بنفسك ورفعه عبر",
      uploadFileTab: "رفع ملف",
      tab: "التبويب.",
      downloadSavefrom: "⬇️ التحميل من SaveFrom.net",
      uploadFileBtn: "رفع ملف ←",
    },
    howItWorks: {
      tag: "عملية بسيطة",
      title: "كيف يعمل",
      subtitle: "ثلاث خطوات. لا حاجة لحساب. بدون علامات مائية. فقط أصوات نقية.",
      tryNow: "جربه الآن",
      steps: [
        {
          number: "01",
          title: "ارفع ملفك",
          description:
            "أفلت أي ملف فيديو أو صوتي — MP4 وMOV وAVI وMP3 وWAV والمزيد. يدعم حتى 500MB. أو الصق رابط يوتيوب للمعالجة مباشرة من الويب.",
        },
        {
          number: "02",
          title: "الذكاء الاصطناعي يعالج صوتك",
          description:
            "يحلل نموذج التعلم العميق لدينا كل طبقة ترددية في المقطع. يفصل الأصوات عن الموسيقى بدقة جراحية — بدون تشويه، بدون فقدان جودة.",
        },
        {
          number: "03",
          title: "حمّل نتائجك",
          description:
            "احصل على المقطع الصوتي النقي بصيغة MP3، أو الفيديو المزامن مع الأصوات بصيغة MP4، أو حمّل كل شيء دفعة واحدة في ملف ZIP — جاهز في ثوانٍ.",
        },
      ],
    },
    faq: {
      tag: "لديك أسئلة؟",
      title: "الأسئلة الشائعة",
      subtitle: "كل ما تحتاج معرفته عن Tejreed.",
      items: [
        {
          q: "ماذا يعني اسم تجريد؟",
          a: '"تجريد" هي كلمة عربية تعني الفصل أو الاستخلاص أو التنقية. يعكس الاسم وظيفة أداة تقنيتنا تماماً: تجريد الصوت من الموسيقى والضوضاء الخلفية لعزل الصوت البشري بوضوح.',
        },
        {
          q: "ما هي صيغ الملفات المدعومة؟",
          a: "يمكنك رفع MP4 وMOV وAVI وMKV للفيديو، وMP3 وWAV وFLAC وAAC للصوت. تُقبل الملفات حتى 500MB. يمكنك أيضاً لصق رابط يوتيوب لمعالجة الفيديو مباشرة.",
        },
        {
          q: "ما مدى دقة استخراج الأصوات؟",
          a: "يستخدم Tejreed نماذج تعلم عميق متطورة مدربة على آلاف الساعات من الموسيقى والكلام. بالنسبة لمعظم التسجيلات عالية الجودة، يكون الفصل سلساً تقريباً. قد تتفاوت النتائج مع الملفات المضغوطة بشدة أو ذات الجودة المنخفضة.",
        },
        {
          q: "هل أحتاج إلى إنشاء حساب؟",
          a: "لا حساب، لا تسجيل، لا بطاقة ائتمان. فقط ارفع ملفك وحمّل النتيجة. الاستخدام مجاني تماماً.",
        },
        {
          q: "كم يستغرق وقت المعالجة؟",
          a: "تتم معالجة معظم الملفات خلال 30-90 ثانية حسب طول الملف وحمل الخادم. ستشاهد شريط تقدم فوري بينما يعمل الذكاء الاصطناعي.",
        },
        {
          q: "هل تُخزَّن ملفاتي على خوادمكم؟",
          a: "تتم معالجة الملفات في جلسة مؤقتة وتُحذف تلقائياً بعد وقت قصير. لا نخزن محتوى الصوت أو الفيديو الخاص بك ولا نشاركه أو نستخدمه لأي غرض.",
        },
        {
          q: "هل يمكنني استخدام الأصوات المستخرجة تجارياً؟",
          a: "Tejreed أداة تقنية — تقع على عاتقك مسؤولية التأكد من امتلاكك الحقوق المناسبة للمادة المصدر قبل استخدام الناتج تجارياً.",
        },
        {
          q: "لماذا فشلت معالجة فيديو يوتيوب الخاص بي؟",
          a: "بعض مقاطع يوتيوب محمية ولا يمكن تحميلها تلقائياً. في هذه الحالة، ستوجهك رسالة بديلة لتحميل الفيديو يدوياً عبر SaveFrom.net، ثم رفعه عبر تبويب رفع الملفات.",
        },
      ],
    },
    contact: {
      tag: "تواصل معنا",
      title: "اتصل بنا",
      subtitle:
        "هل لديك سؤال، أو وجدت خطأ، أو تريد التعاون؟ تواصل معنا — يسعدنا سماعك.",
      links: [
        {
          label: "LinkedIn",
          handle: "yasir-alrawi",
          description: "تواصل مهنياً",
        },
        { label: "GitHub", handle: "yasir237", description: "استكشف المصدر" },
      ],
      builtBy: "صُنع بـ ❤️ بواسطة",
    },
    footer: {
      rights: "© 2024 Tejreed. جميع الحقوق محفوظة.",
    },
  },

  fa: {
    dir: "rtl" as const,
    nav: {
      upload: "بارگذاری",
      howItWorks: "نحوه کار",
      faq: "سوالات متداول",
      contact: "تماس با ما",
      getStarted: "شروع کنید",
    },
    hero: {
      badge: "جداسازی صدای خواننده با هوش مصنوعی",
      title1: "تجريد",
      title2: "استخراج‌کننده صدای هوش مصنوعی",
      subtitle:
        "فوراً صدای خواننده را با کیفیت کریستالی از هر ویدیویی جدا کنید.",
    },
    stats: [
      { value: "+۲M", label: "فایل پردازش شده" },
      { value: "۹۹.۲٪", label: "نرخ دقت" },
      { value: "<۳۰ثانیه", label: "میانگین زمان" },
      { value: "۴K", label: "کاربر فعال" },
    ],
    upload: {
      tabFile: "↑ بارگذاری فایل",
      tabYoutube: "▶ یوتیوب",
      dragTitle: "ویدیوی خود را اینجا رها کنید",
      dragSub: "یا برای بارگذاری کلیک کنید (MP4, MOV, AVI — حداکثر 500MB)",
      dropIt: "رها کنید!",
      youtubePlaceholder: "لینک یوتیوب را وارد کنید...",
      process: "پردازش",
      fetchingInfo: "در حال دریافت اطلاعات ویدیو...",
      processingLabel: "در حال پردازش",
      aiWorking: "هوش مصنوعی در حال کار است...",
      completeTitle: "پردازش کامل شد",
      completeSub: "صدای خواننده با موفقیت استخراج شد",
      downloadVocals: "دانلود صدای خواننده (MP3)",
      downloadVideo: "دانلود ویدیوی همگام‌سازی شده (MP4)",
      downloadAll: "دانلود همه (ZIP)",
      processAnother: "پردازش یک فایل دیگر",
      youtubeBlocked: "یوتیوب اجازه دانلود خودکار این ویدیو را به ما نداد.",
      youtubeManual: "می‌توانید ویدیو را خودتان دانلود کرده و از طریق",
      uploadFileTab: "بارگذاری فایل",
      tab: "آپلود کنید.",
      downloadSavefrom: "⬇️ دانلود از SaveFrom.net",
      uploadFileBtn: "بارگذاری فایل ←",
    },
    howItWorks: {
      tag: "روند ساده",
      title: "نحوه کار",
      subtitle:
        "سه مرحله. بدون نیاز به حساب کاربری. بدون واترمارک. فقط صدای خالص.",
      tryNow: "همین حالا امتحان کنید",
      steps: [
        {
          number: "۰۱",
          title: "فایل خود را آپلود کنید",
          description:
            "هر فایل ویدیویی یا صوتی — MP4، MOV، AVI، MP3، WAV و غیره را رها کنید. تا حجم 500MB پشتیبانی می‌شود. یا لینک یوتیوب را برای پردازش مستقیم وارد کنید.",
        },
        {
          number: "۰۲",
          title: "هوش مصنوعی صدای شما را پردازش می‌کند",
          description:
            "مدل یادگیری عمیق ما هر لایه فرکانسی در آهنگ شما را تجزیه و تحلیل می‌کند. این مدل صدای خواننده را با دقتی بی‌نظیر از سازها جدا می‌کند — بدون کاهش کیفیت.",
        },
        {
          number: "۰۳",
          title: "نتایج خود را دانلود کنید",
          description:
            "صدای خالص را به صورت فایل MP3، ویدیوی همگام‌سازی شده را به صورت MP4 دریافت کنید، یا همه را به صورت یک فایل ZIP در چند ثانیه دانلود کنید.",
        },
      ],
    },
    faq: {
      tag: "سوالی دارید؟",
      title: "سوالات متداول",
      subtitle: "هر چیزی که باید درباره Tejreed بدانید.",
      items: [
        {
          q: "معنی نام تجرید چیست؟",
          a: "«تجرید» یک کلمه عربی به معنای «انتزاع»، «جدا کردن» یا «خالص‌سازی» است. این نام دقیقاً کاربرد اصلی ابزار ما را نشان می‌دهد: جدا کردن موسیقی و صداهای پس‌زمینه برای جداسازی شفاف صدا.",
        },
        {
          q: "چه فرمت‌هایی پشتیبانی می‌شوند؟",
          a: "می‌توانید MP4، MOV، AVI، MKV برای ویدیو و MP3، WAV، FLAC، AAC برای صدا آپلود کنید. فایل‌های تا حجم 500MB پذیرفته می‌شوند. همچنین می‌توانید لینک یوتیوب را وارد کنید.",
        },
        {
          q: "دقت استخراج صدا چقدر است؟",
          a: "Tejreed از مدل‌های پیشرفته یادگیری عمیق استفاده می‌کند که با هزاران ساعت موسیقی آموزش دیده‌اند. برای اکثر فایل‌های با کیفیت استودیویی، جداسازی تقریبا بی‌نقص است. نتایج ممکن است برای فایل‌های فشرده شده متفاوت باشد.",
        },
        {
          q: "آیا نیاز به ایجاد حساب کاربری دارم؟",
          a: "بدون حساب کاربری، بدون ثبت‌نام، بدون کارت اعتباری. فقط فایل خود را آپلود کرده و نتیجه را دانلود کنید. استفاده از آن کاملاً رایگان است.",
        },
        {
          q: "پردازش چقدر طول می‌کشد؟",
          a: "بیشتر فایل‌ها در عرض ۳۰ تا ۹۰ ثانیه بسته به طول فایل و بار سرور پردازش می‌شوند. شما یک نوار پیشرفت زنده را مشاهده خواهید کرد.",
        },
        {
          q: "آیا فایل‌های من روی سرورهای شما ذخیره می‌شوند؟",
          a: "فایل‌ها در یک جلسه موقت پردازش می‌شوند و پس از مدت کوتاهی به‌طور خودکار حذف می‌شوند. ما محتوای شما را ذخیره، اشتراک‌گذاری یا استفاده نمی‌کنیم.",
        },
        {
          q: "آیا می‌توانم از صدای استخراج شده استفاده تجاری کنم؟",
          a: "Tejreed یک ابزار فنی است — این مسئولیت شماست که قبل از استفاده تجاری از خروجی، مطمئن شوید که حقوق مناسب برای مواد اولیه را دارید.",
        },
        {
          q: "چرا ویدیوی یوتیوب من پردازش نشد؟",
          a: "برخی از ویدیوهای یوتیوب محافظت شده‌اند و نمی‌توانند به‌طور خودکار دانلود شوند. در این حالت، پیامی شما را راهنمایی می‌کند تا ویدیو را به‌صورت دستی دانلود کرده و سپس آپلود کنید.",
        },
      ],
    },
    contact: {
      tag: "در تماس باشید",
      title: "تماس با ما",
      subtitle:
        "سوالی دارید، باگی پیدا کرده‌اید، یا می‌خواهید همکاری کنید؟ به ما اطلاع دهید.",
      links: [
        {
          label: "لینکدین",
          handle: "yasir-alrawi",
          description: "ارتباط حرفه‌ای",
        },
        {
          label: "گیت‌هاب",
          handle: "yasir237",
          description: "کد منبع را بررسی کنید",
        },
      ],
      builtBy: "ساخته شده با ❤️ توسط",
    },
    footer: {
      rights: "© ۲۰۲۴ Tejreed. تمامی حقوق محفوظ است.",
    },
  },

  fr: {
    dir: "ltr" as const,
    nav: {
      upload: "Importer",
      howItWorks: "Comment ça marche",
      faq: "FAQ",
      contact: "Contact",
      getStarted: "COMMENCER",
    },
    hero: {
      badge: "SÉPARATION VOCALE PAR IA",
      title1: "TEJREED :",
      title2: "EXTRACTEUR DE VOIX IA",
      subtitle:
        "Séparez instantanément les voix d'une clarté cristalline de n'importe quelle vidéo.",
    },
    stats: [
      { value: "2M+", label: "FICHIERS TRAITÉS" },
      { value: "99.2%", label: "TAUX DE PRÉCISION" },
      { value: "<30s", label: "TEMPS MOYEN" },
      { value: "4K", label: "UTILISATEURS ACTIFS" },
    ],
    upload: {
      tabFile: "↑ IMPORTER UN FICHIER",
      tabYoutube: "▶ YOUTUBE",
      dragTitle: "GLISSEZ ET DÉPOSEZ VOTRE VIDÉO ICI",
      dragSub: "Ou cliquez pour importer (MP4, MOV, AVI — Max 500Mo)",
      dropIt: "DÉPOSEZ-LE !",
      youtubePlaceholder: "Collez un lien YouTube...",
      process: "TRAITER",
      fetchingInfo: "Récupération des informations de la vidéo...",
      processingLabel: "TRAITEMENT EN COURS",
      aiWorking: "L'IA travaille...",
      completeTitle: "Traitement terminé",
      completeSub: "Vos voix ont été extraites avec succès",
      downloadVocals: "Télécharger les Voix (MP3)",
      downloadVideo: "Télécharger la Vidéo Vocale (MP4)",
      downloadAll: "Tout Télécharger (ZIP)",
      processAnother: "TRAITER UN AUTRE FICHIER",
      youtubeBlocked:
        "YouTube ne nous a pas permis de télécharger cette vidéo automatiquement.",
      youtubeManual:
        "Vous pouvez télécharger la vidéo vous-même et l'importer via l'onglet",
      uploadFileTab: "Importer un fichier",
      tab: ".",
      downloadSavefrom: "⬇️ Télécharger sur SaveFrom.net",
      uploadFileBtn: "IMPORTER UN FICHIER →",
    },
    howItWorks: {
      tag: "Processus Simple",
      title: "Comment ça marche",
      subtitle:
        "Trois étapes. Pas besoin de compte. Sans filigrane. Juste des voix pures.",
      tryNow: "Essayer maintenant",
      steps: [
        {
          number: "01",
          title: "Importez Votre Fichier",
          description:
            "Déposez n'importe quel fichier vidéo ou audio — MP4, MOV, AVI, MP3, WAV, etc. Jusqu'à 500 Mo supportés. Ou collez un lien YouTube pour un traitement direct depuis le web.",
        },
        {
          number: "02",
          title: "L'IA Traite Votre Audio",
          description:
            "Notre modèle d'apprentissage profond analyse chaque couche de fréquence. Il sépare les voix des instruments avec une précision chirurgicale — sans perte de qualité.",
        },
        {
          number: "03",
          title: "Téléchargez Vos Résultats",
          description:
            "Obtenez la piste vocale nette en MP3, la vidéo synchronisée en MP4, ou récupérez tout d'un coup dans un fichier ZIP — prêt en quelques secondes.",
        },
      ],
    },
    faq: {
      tag: "Des Questions ?",
      title: "Foire Aux Questions",
      subtitle: "Tout ce que vous devez savoir sur Tejreed.",
      items: [
        {
          q: "Que signifie le nom Tejreed ?",
          a: "« Tejreed » est un mot arabe signifiant « abstraction », « dépouillement » ou « isolation ». Il reflète parfaitement la fonction principale de notre outil : supprimer la musique et les bruits de fond pour isoler proprement les voix.",
        },
        {
          q: "Quels formats de fichiers sont supportés ?",
          a: "Vous pouvez importer des MP4, MOV, AVI, MKV pour la vidéo, et des MP3, WAV, FLAC, AAC pour l'audio. Les fichiers jusqu'à 500 Mo sont acceptés. Vous pouvez également coller une URL YouTube.",
        },
        {
          q: "Quelle est la précision de l'extraction vocale ?",
          a: "Tejreed utilise des modèles d'apprentissage profond de pointe. Pour la plupart des enregistrements de qualité studio, la séparation est parfaite. Les résultats peuvent varier pour les fichiers de basse qualité.",
        },
        {
          q: "Dois-je créer un compte ?",
          a: "Aucun compte, aucune inscription, aucune carte de crédit. Importez simplement votre fichier et téléchargez le résultat. C'est totalement gratuit.",
        },
        {
          q: "Combien de temps dure le traitement ?",
          a: "La plupart des fichiers sont traités entre 30 et 90 secondes en fonction de la taille du fichier. Vous verrez une barre de progression en temps réel.",
        },
        {
          q: "Mes fichiers sont-ils stockés sur vos serveurs ?",
          a: "Les fichiers sont traités dans une session temporaire et supprimés automatiquement peu après. Nous ne conservons ni n'utilisons votre contenu.",
        },
        {
          q: "Puis-je utiliser les voix extraites à des fins commerciales ?",
          a: "Tejreed est un outil technique — il est de votre responsabilité de vous assurer que vous disposez des droits appropriés sur le matériel source.",
        },
        {
          q: "Pourquoi ma vidéo YouTube n'a-t-elle pas pu être traitée ?",
          a: "Certaines vidéos YouTube sont protégées. Si cela se produit, un message vous guidera pour télécharger la vidéo manuellement via SaveFrom.net, puis l'importer.",
        },
      ],
    },
    contact: {
      tag: "Contactez-nous",
      title: "Nous Contacter",
      subtitle:
        "Vous avez une question, trouvé un bug ou souhaitez collaborer ? Contactez-nous !",
      links: [
        {
          label: "LinkedIn",
          handle: "yasir-alrawi",
          description: "Connexion professionnelle",
        },
        {
          label: "GitHub",
          handle: "yasir237",
          description: "Explorer le code source",
        },
      ],
      builtBy: "Fait avec ❤️ par",
    },
    footer: {
      rights: "© 2024 Tejreed. Tous droits réservés.",
    },
  },

  de: {
    dir: "ltr" as const,
    nav: {
      upload: "Hochladen",
      howItWorks: "Wie es funktioniert",
      faq: "FAQ",
      contact: "Kontakt",
      getStarted: "LOSLEGEN",
    },
    hero: {
      badge: "KI-GESTÜTZTE STIMMTRENNUNG",
      title1: "TEJREED:",
      title2: "KI-STIMMEXTRAKTOR",
      subtitle: "Trenne kristallklare Stimmen sofort aus jedem Video.",
    },
    stats: [
      { value: "2M+", label: "VERARBEITETE DATEIEN" },
      { value: "99.2%", label: "GENAUIGKEITSRATE" },
      { value: "<30s", label: "DURCHSCHNITTLICHE ZEIT" },
      { value: "4K", label: "AKTIVE NUTZER" },
    ],
    upload: {
      tabFile: "↑ DATEI HOCHLADEN",
      tabYoutube: "▶ YOUTUBE",
      dragTitle: "ZIEHE DEIN VIDEO HIERHER",
      dragSub: "Oder klicken zum Hochladen (MP4, MOV, AVI — Max 500MB)",
      dropIt: "LOSLASSEN!",
      youtubePlaceholder: "Füge einen YouTube-Link ein...",
      process: "VERARBEITEN",
      fetchingInfo: "Videoinformationen werden abgerufen...",
      processingLabel: "VERARBEITUNG LÄUFT",
      aiWorking: "KI arbeitet...",
      completeTitle: "Verarbeitung abgeschlossen",
      completeSub: "Deine Stimmen wurden extrahiert",
      downloadVocals: "Stimmen herunterladen (MP3)",
      downloadVideo: "Stimmen-Video herunterladen (MP4)",
      downloadAll: "Alles herunterladen (ZIP)",
      processAnother: "WEITERE DATEI VERARBEITEN",
      youtubeBlocked:
        "YouTube hat uns nicht erlaubt, dieses Video automatisch herunterzuladen.",
      youtubeManual:
        "Du kannst das Video selbst herunterladen und es über den Tab",
      uploadFileTab: "Datei Hochladen",
      tab: "hochladen.",
      downloadSavefrom: "⬇️ Auf SaveFrom.net herunterladen",
      uploadFileBtn: "DATEI HOCHLADEN →",
    },
    howItWorks: {
      tag: "Einfacher Prozess",
      title: "Wie es funktioniert",
      subtitle:
        "Drei Schritte. Kein Konto nötig. Keine Wasserzeichen. Nur saubere Stimmen.",
      tryNow: "Jetzt ausprobieren",
      steps: [
        {
          number: "01",
          title: "Lade deine Datei hoch",
          description:
            "Ziehe eine Video- oder Audiodatei hierher — MP4, MOV, AVI, MP3, WAV und mehr. Bis zu 500 MB unterstützt. Oder füge einen YouTube-Link ein.",
        },
        {
          number: "02",
          title: "KI verarbeitet dein Audio",
          description:
            "Unser Deep-Learning-Modell analysiert jede Frequenzschicht. Es trennt Stimmen von Instrumenten mit chirurgischer Präzision — ohne Qualitätsverlust.",
        },
        {
          number: "03",
          title: "Lade deine Ergebnisse herunter",
          description:
            "Erhalte die saubere Stimmspur als MP3, das stimmen-synchrone Video als MP4, oder lade alles auf einmal als ZIP herunter — fertig in Sekunden.",
        },
      ],
    },
    faq: {
      tag: "Hast du Fragen?",
      title: "Häufig Gestellte Fragen",
      subtitle: "Alles, was du über Tejreed wissen musst.",
      items: [
        {
          q: "Was bedeutet der Name Tejreed?",
          a: "„Tejreed“ ist ein arabisches Wort, das „Abstraktion“, „Entkleidung“ oder „Isolierung“ bedeutet. Es spiegelt die Kernfunktion unseres Tools perfekt wider: das Entfernen von Musik und Hintergrundgeräuschen, um die Stimmen sauber zu isolieren.",
        },
        {
          q: "Welche Dateiformate werden unterstützt?",
          a: "Du kannst MP4, MOV, AVI, MKV für Videos und MP3, WAV, FLAC, AAC für Audio hochladen. Dateien bis zu 500 MB werden akzeptiert. Du kannst auch eine YouTube-URL einfügen.",
        },
        {
          q: "Wie genau ist die Stimmextraktion?",
          a: "Tejreed verwendet modernste Deep-Learning-Modelle. Bei den meisten Studioaufnahmen ist die Trennung nahezu perfekt. Die Ergebnisse können bei stark komprimierten Dateien variieren.",
        },
        {
          q: "Muss ich ein Konto erstellen?",
          a: "Kein Konto, keine Anmeldung, keine Kreditkarte. Lade einfach deine Datei hoch und lade das Ergebnis herunter. Es ist völlig kostenlos.",
        },
        {
          q: "Wie lange dauert die Verarbeitung?",
          a: "Die meisten Dateien werden innerhalb von 30–90 Sekunden verarbeitet. Du siehst einen Echtzeit-Fortschrittsbalken, während die KI arbeitet.",
        },
        {
          q: "Werden meine Dateien auf euren Servern gespeichert?",
          a: "Dateien werden in einer temporären Sitzung verarbeitet und kurz danach automatisch gelöscht. Wir speichern oder teilen deine Inhalte nicht.",
        },
        {
          q: "Kann ich die extrahierten Stimmen kommerziell nutzen?",
          a: "Tejreed ist ein technisches Werkzeug — es liegt in deiner Verantwortung sicherzustellen, dass du die entsprechenden Rechte am Ausgangsmaterial besitzt.",
        },
        {
          q: "Warum konnte mein YouTube-Video nicht verarbeitet werden?",
          a: "Einige YouTube-Videos sind geschützt. In diesem Fall leitet dich eine Nachricht an, das Video manuell über SaveFrom.net herunterzuladen und dann hochzuladen.",
        },
      ],
    },
    contact: {
      tag: "Kontaktiere uns",
      title: "Kontakt",
      subtitle:
        "Hast du eine Frage, einen Fehler gefunden oder möchtest du zusammenarbeiten? Melde dich bei uns!",
      links: [
        {
          label: "LinkedIn",
          handle: "yasir-alrawi",
          description: "Beruflich vernetzen",
        },
        {
          label: "GitHub",
          handle: "yasir237",
          description: "Quellcode ansehen",
        },
      ],
      builtBy: "Mit ❤️ gemacht von",
    },
    footer: {
      rights: "© 2024 Tejreed. Alle Rechte vorbehalten.",
    },
  },

  es: {
    dir: "ltr" as const,
    nav: {
      upload: "Subir",
      howItWorks: "Cómo funciona",
      faq: "FAQ",
      contact: "Contacto",
      getStarted: "EMPEZAR",
    },
    hero: {
      badge: "SEPARACIÓN VOCAL POR IA",
      title1: "TEJREED:",
      title2: "EXTRACTOR DE VOZ POR IA",
      subtitle: "Separa al instante voces cristalinas de cualquier vídeo.",
    },
    stats: [
      { value: "2M+", label: "ARCHIVOS PROCESADOS" },
      { value: "99.2%", label: "TASA DE PRECISIÓN" },
      { value: "<30s", label: "TIEMPO MEDIO" },
      { value: "4K", label: "USUARIOS ACTIVOS" },
    ],
    upload: {
      tabFile: "↑ SUBIR ARCHIVO",
      tabYoutube: "▶ YOUTUBE",
      dragTitle: "ARRASTRA Y SUELTA TU VÍDEO AQUÍ",
      dragSub: "O haz clic para subir (MP4, MOV, AVI — Máx 500MB)",
      dropIt: "¡SUÉLTALO!",
      youtubePlaceholder: "Pega un enlace de YouTube...",
      process: "PROCESAR",
      fetchingInfo: "Obteniendo info del vídeo...",
      processingLabel: "PROCESANDO",
      aiWorking: "La IA está trabajando...",
      completeTitle: "Procesamiento completado",
      completeSub: "Tus voces han sido extraídas",
      downloadVocals: "Descargar Voces (MP3)",
      downloadVideo: "Descargar Vídeo Vocal (MP4)",
      downloadAll: "Descargar Todo (ZIP)",
      processAnother: "PROCESAR OTRO ARCHIVO",
      youtubeBlocked:
        "YouTube no nos permitió descargar este vídeo automáticamente.",
      youtubeManual:
        "Puedes descargar el vídeo tú mismo y subirlo a través de la pestaña",
      uploadFileTab: "Subir Archivo",
      tab: ".",
      downloadSavefrom: "⬇️ Descargar en SaveFrom.net",
      uploadFileBtn: "SUBIR ARCHIVO →",
    },
    howItWorks: {
      tag: "Proceso Simple",
      title: "Cómo Funciona",
      subtitle:
        "Tres pasos. Sin cuenta. Sin marcas de agua. Solo voces limpias.",
      tryNow: "Pruébalo ahora",
      steps: [
        {
          number: "01",
          title: "Sube Tu Archivo",
          description:
            "Suelta cualquier archivo de vídeo o audio — MP4, MOV, AVI, MP3, WAV y más. Soporta hasta 500MB. O pega un enlace de YouTube para procesar directamente.",
        },
        {
          number: "02",
          title: "La IA Procesa Tu Audio",
          description:
            "Nuestro modelo de aprendizaje profundo analiza cada capa de frecuencia. Separa las voces de los instrumentos con precisión quirúrgica — sin pérdida de calidad.",
        },
        {
          number: "03",
          title: "Descarga Tus Resultados",
          description:
            "Obtén la pista vocal limpia en MP3, el vídeo sincronizado en MP4, o descarga todo a la vez en un ZIP — listo en segundos.",
        },
      ],
    },
    faq: {
      tag: "¿Tienes Preguntas?",
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber sobre Tejreed.",
      items: [
        {
          q: "¿Qué significa el nombre Tejreed?",
          a: "«Tejreed» es una palabra árabe que significa «abstracción», «despojo» o «aislamiento». Refleja perfectamente la función principal de nuestra herramienta: eliminar la música y el ruido de fondo para aislar limpiamente las voces.",
        },
        {
          q: "¿Qué formatos de archivo se admiten?",
          a: "Puedes subir MP4, MOV, AVI, MKV para vídeo, y MP3, WAV, FLAC, AAC para audio. Se aceptan archivos de hasta 500MB. También puedes pegar una URL de YouTube.",
        },
        {
          q: "¿Es precisa la extracción de voz?",
          a: "Tejreed utiliza modelos de IA de última generación. Para la mayoría de grabaciones de estudio, la separación es perfecta. Los resultados pueden variar para archivos de baja calidad.",
        },
        {
          q: "¿Necesito crear una cuenta?",
          a: "Sin cuenta, sin registro, sin tarjeta de crédito. Simplemente sube tu archivo y descarga el resultado. Es totalmente gratis.",
        },
        {
          q: "¿Cuánto tarda el procesamiento?",
          a: "La mayoría de archivos se procesan entre 30–90 segundos. Verás una barra de progreso en tiempo real mientras la IA trabaja.",
        },
        {
          q: "¿Se almacenan mis archivos en sus servidores?",
          a: "Los archivos se procesan en una sesión temporal y se eliminan automáticamente poco después. No almacenamos, compartimos ni usamos tu contenido.",
        },
        {
          q: "¿Puedo usar las voces extraídas comercialmente?",
          a: "Tejreed es una herramienta técnica — es tu responsabilidad asegurarte de tener los derechos correspondientes del material original antes de su uso comercial.",
        },
        {
          q: "¿Por qué falló mi vídeo de YouTube?",
          a: "Algunos vídeos de YouTube están protegidos. Si esto sucede, un mensaje te guiará para descargar el vídeo manualmente a través de SaveFrom.net y luego subirlo.",
        },
      ],
    },
    contact: {
      tag: "Ponte en contacto",
      title: "Contáctanos",
      subtitle:
        "¿Tienes alguna pregunta, encontraste un error o quieres colaborar? Escríbenos, nos encantaría escucharte.",
      links: [
        {
          label: "LinkedIn",
          handle: "yasir-alrawi",
          description: "Conectar profesionalmente",
        },
        {
          label: "GitHub",
          handle: "yasir237",
          description: "Explorar el código fuente",
        },
      ],
      builtBy: "Hecho con ❤️ por",
    },
    footer: {
      rights: "© 2024 Tejreed. Todos los derechos reservados.",
    },
  },

  it: {
    dir: "ltr" as const,
    nav: {
      upload: "Carica",
      howItWorks: "Come Funziona",
      faq: "FAQ",
      contact: "Contattaci",
      getStarted: "INIZIA",
    },
    hero: {
      badge: "SEPARAZIONE VOCALE TRAMITE IA",
      title1: "TEJREED:",
      title2: "ESTRATTORE VOCALE IA",
      subtitle: "Separa istantaneamente voci cristalline da qualsiasi video.",
    },
    stats: [
      { value: "2M+", label: "FILE ELABORATI" },
      { value: "99.2%", label: "TASSO DI PRECISIONE" },
      { value: "<30s", label: "TEMPO MEDIO" },
      { value: "4K", label: "UTENTI ATTIVI" },
    ],
    upload: {
      tabFile: "↑ CARICA FILE",
      tabYoutube: "▶ YOUTUBE",
      dragTitle: "TRASCINA E RILASCIA IL TUO VIDEO QUI",
      dragSub: "O clicca per caricare (MP4, MOV, AVI — Max 500MB)",
      dropIt: "RILASCIA!",
      youtubePlaceholder: "Incolla un link di YouTube...",
      process: "ELABORA",
      fetchingInfo: "Recupero info video...",
      processingLabel: "ELABORAZIONE",
      aiWorking: "L'IA sta lavorando...",
      completeTitle: "Elaborazione Completata",
      completeSub: "Le tue voci sono state estratte",
      downloadVocals: "Scarica Voci (MP3)",
      downloadVideo: "Scarica Video Vocale (MP4)",
      downloadAll: "Scarica Tutto (ZIP)",
      processAnother: "ELABORA UN ALTRO FILE",
      youtubeBlocked:
        "YouTube non ci ha permesso di scaricare questo video automaticamente.",
      youtubeManual:
        "Puoi scaricare il video tu stesso e caricarlo tramite la scheda",
      uploadFileTab: "Carica File",
      tab: ".",
      downloadSavefrom: "⬇️ Scarica su SaveFrom.net",
      uploadFileBtn: "CARICA FILE →",
    },
    howItWorks: {
      tag: "Processo Semplice",
      title: "Come Funziona",
      subtitle:
        "Tre passaggi. Nessun account. Nessuna filigrana. Solo voci pulite.",
      tryNow: "Provalo ora",
      steps: [
        {
          number: "01",
          title: "Carica il Tuo File",
          description:
            "Trascina qualsiasi file video o audio — MP4, MOV, AVI, MP3, WAV e altro. Supporta fino a 500MB. Oppure incolla un link di YouTube per elaborarlo direttamente dal web.",
        },
        {
          number: "02",
          title: "L'IA Elabora il Tuo Audio",
          description:
            "Il nostro modello di deep learning analizza ogni livello di frequenza. Separa le voci dagli strumenti con precisione chirurgica — nessuna perdita di qualità.",
        },
        {
          number: "03",
          title: "Scarica i Tuoi Risultati",
          description:
            "Ottieni la traccia vocale pulita come MP3, il video sincronizzato come MP4, o scarica tutto in un singolo file ZIP — pronto in pochi secondi.",
        },
      ],
    },
    faq: {
      tag: "Hai Domande?",
      title: "Domande Frequenti",
      subtitle: "Tutto ciò che devi sapere su Tejreed.",
      items: [
        {
          q: "Cosa significa il nome Tejreed?",
          a: "«Tejreed» è una parola araba che significa «astrazione», «spogliazione» o «isolamento». Riflette perfettamente la funzione principale del nostro strumento: rimuovere la musica e i rumori di sottofondo per isolare in modo pulito le voci.",
        },
        {
          q: "Quali formati di file sono supportati?",
          a: "Puoi caricare MP4, MOV, AVI, MKV per i video e MP3, WAV, FLAC, AAC per l'audio. Sono accettati file fino a 500MB. Puoi anche incollare un URL di YouTube.",
        },
        {
          q: "Quanto è precisa l'estrazione vocale?",
          a: "Tejreed utilizza modelli di deep learning all'avanguardia. Per la maggior parte delle registrazioni di qualità da studio, la separazione è praticamente perfetta. I risultati possono variare per file di bassa qualità.",
        },
        {
          q: "Devo creare un account?",
          a: "Nessun account, nessuna registrazione, nessuna carta di credito. Carica il tuo file e scarica il risultato. È completamente gratuito.",
        },
        {
          q: "Quanto dura l'elaborazione?",
          a: "La maggior parte dei file viene elaborata in 30-90 secondi. Vedrai una barra di avanzamento in tempo reale mentre l'IA lavora.",
        },
        {
          q: "I miei file vengono archiviati sui vostri server?",
          a: "I file vengono elaborati in una sessione temporanea ed eliminati automaticamente poco dopo. Non memorizziamo né condividiamo i tuoi contenuti.",
        },
        {
          q: "Posso usare le voci estratte a fini commerciali?",
          a: "Tejreed è uno strumento tecnico — è tua responsabilità assicurarti di avere i diritti appropriati sul materiale sorgente prima di usarlo commercialmente.",
        },
        {
          q: "Perché il mio video di YouTube non è stato elaborato?",
          a: "Alcuni video di YouTube sono protetti e non possono essere scaricati automaticamente. Un messaggio ti guiderà a scaricare il video manualmente tramite SaveFrom.net, per poi caricarlo.",
        },
      ],
    },
    contact: {
      tag: "Mettiti in Contatto",
      title: "Contattaci",
      subtitle:
        "Hai una domanda, hai trovato un bug o vuoi collaborare? Scrivici, saremo felici di sentirti.",
      links: [
        {
          label: "LinkedIn",
          handle: "yasir-alrawi",
          description: "Connettiti professionalmente",
        },
        {
          label: "GitHub",
          handle: "yasir237",
          description: "Esplora il codice sorgente",
        },
      ],
      builtBy: "Creato con ❤️ da",
    },
    footer: {
      rights: "© 2024 Tejreed. Tutti i diritti riservati.",
    },
  },
};
