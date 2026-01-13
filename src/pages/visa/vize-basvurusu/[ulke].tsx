import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../../../styles/visa/UlkeVizeBasvurusu.css';

interface NavLink {
    title: string;
    href: string;
}

interface Video {
    id: string;
    youtubeId: string;
    title: string;
    thumbnail: string;
}

interface GalleryImage {
    src: string;
    alt: string;
}

interface CountryData {
    slug: string;
    name: string;
    icon: string;
    heroImage: string;
    heroImageMobile?: string;
    excerpt: string;
    content: string;
    navLinks: NavLink[];
    videos: Video[];
    gallery: GalleryImage[];
}

const countriesData: Record<string, CountryData> = {
    ingiltere: {
        slug: 'ingiltere',
        name: 'İngiltere',
        icon: '/visa/uploads/icons/1764382446_54d42ca992ddf99b4289.svg',
        heroImage: '/visa/uploads/contents/main/1764382497_103fbb272638992bc7ed.webp',
        heroImageMobile: '/visa/uploads/contents/main/mobile/1764382512_91fad356020f88b602c2.webp',
        excerpt: 'İngiltere\'ye turist olarak gitmek isteyenler için alınması gereken vizeye "Standart Ziyaretçi Vizesi" (Standard Visitor Visa) denir. Bu vize, turistik geziler, aile veya arkadaş ziyareti, iş görüşmeleri veya kısa süreli eğitim programları gibi amaçlarla İngiltere\'yi ziyaret etmek isteyen kişiler için uygundur.',
        content: `<p>İngiltere, Birleşik Krallık'ın (United Kingdom - UK) dört ülkesinden biridir ve Avrupa'nın batısında yer alır. Zengin tarihi, kültürü ve ekonomisiyle dünya genelinde önemli bir yere sahiptir. İşte İngiltere hakkında genel bilgiler:</p>
        <h3><strong>Coğrafya</strong></h3>
        <ul>
            <li><strong>Konum:</strong> İngiltere, Büyük Britanya Adası'nın güneydoğusunda yer alır ve kuzeyde İskoçya, batıda Galler ile komşudur. Ayrıca, İrlanda Denizi, Kelt Denizi, Kuzey Denizi ve İngiliz Kanalı ile çevrilidir.</li>
            <li><strong>Başkent:</strong> Londra, hem İngiltere'nin hem de Birleşik Krallık'ın başkentidir. Dünya çapında finans, kültür ve tarih açısından önemli bir merkezdir.</li>
            <li><strong>İklim:</strong> Ilıman okyanusal iklim görülür. Kışlar genellikle soğuk, yazlar ise ılıktır. Yıl boyunca yağışlıdır.</li>
        </ul>
        <h3><strong>Tarih</strong></h3>
        <ul>
            <li><strong>Tarih Öncesi ve Antik Dönem:</strong> Stonehenge gibi anıtlar, İngiltere'nin tarih öncesi çağlardan beri yerleşim gördüğünü gösterir. Roma İmparatorluğu döneminde İngiltere, Britannia adıyla bilinir.</li>
            <li><strong>Orta Çağ:</strong> 1066'da Normanlar'ın İngiltere'yi fethi, ülkenin tarihinde önemli bir dönüm noktasıdır.</li>
            <li><strong>Modern Dönem:</strong> 16. ve 17. yüzyıllarda İngiltere, denizcilikte ve sömürgecilikte öncü bir rol üstlenmiştir. Sanayi Devrimi de 18. yüzyılda burada başlamıştır.</li>
        </ul>
        <h3><strong>Kültür</strong></h3>
        <ul>
            <li><strong>Dil:</strong> Resmi dil İngilizce'dir ve dünya çapında en yaygın konuşulan dillerden biridir.</li>
            <li><strong>Sanat ve Edebiyat:</strong> William Shakespeare, Charles Dickens, J.K. Rowling gibi dünyaca ünlü yazarlar İngiltere'dendir. Londra, birçok sanat galerisine ve tiyatroya ev sahipliği yapar.</li>
            <li><strong>Müzik:</strong> The Beatles, Rolling Stones gibi gruplar İngiltere'den çıkmıştır ve dünya müziğine büyük etkisi olmuştur.</li>
            <li><strong>Spor:</strong> Futbol, İngiltere'de en popüler spordur. Premier League, dünyanın en prestijli futbol liglerinden biridir. Ayrıca kriket ve rugby de oldukça popülerdir.</li>
        </ul>
        <h3><strong>Ekonomi</strong></h3>
        <ul>
            <li><strong>Genel Bakış:</strong> İngiltere, dünyanın en büyük ekonomilerinden birine sahiptir. Londra, uluslararası finans merkezi olarak tanınır.</li>
            <li><strong>Endüstriler:</strong> Finans, teknoloji, otomotiv, havacılık ve ilaç sanayisi öne çıkan sektörler arasındadır.</li>
            <li><strong>Para Birimi:</strong> İngiliz Sterlini (GBP).</li>
        </ul>
        <h3><strong>Yönetim</strong></h3>
        <ul>
            <li><strong>Hükümet:</strong> İngiltere, anayasal monarşi ve parlamenter demokrasi ile yönetilir. Kraliçe veya kral devletin başıdır, ancak politik gücü sınırlıdır.</li>
            <li><strong>Parlamento:</strong> İngiltere'nin yasama organı olan Parlamento, iki meclisten oluşur: Avam Kamarası ve Lordlar Kamarası.</li>
        </ul>
        <p>İngiltere, tarihi mirası, kültürel zenginliği ve ekonomik gücü ile dünya çapında önemli bir ülke olmaya devam etmektedir. Her yıl milyonlarca turist, Londra'nın ikonik yapıları, tarihi kaleleri ve güzel kırsal alanlarını görmek için İngiltere'yi ziyaret etmektedir.</p>`,
        navLinks: [
            { title: 'İngiltere Genel Bilgi', href: '/visa/vize-basvurusu/ingiltere' },
            { title: 'İngiltere Turist Vizesi', href: '/visa/ingiltere-turist-vizesi' },
            { title: 'İngiltere Eğitim Vizesi', href: '/visa/ingiltere-egitim-vizesi' },
            { title: 'İngiltere Yatırımcı Vizesi', href: '/visa/ingiltere-yatirimci-vizesi' },
            { title: 'İngiltere Diğer Vize Türleri', href: '/visa/ingiltere-diger-vize-turleri' },
            { title: 'İngiltere Çalışma Vizesi', href: '/visa/ingiltere-calisma-vizesi' },
            { title: 'İngiltere Aile Birleşimi Vizesi', href: '/visa/ingiltere-aile-birlesimi-vizesi' },
        ],
        videos: [
            {
                id: '1',
                youtubeId: 'SnJSz1a7aMo',
                title: 'İngiltere Çalışma Vizesi',
                thumbnail: '/visa/uploads/contents/testimonial/2024213a9d_166b9d8e18198d.webp'
            },
            {
                id: '2',
                youtubeId: 'SnJSz1a7aMo',
                title: '🎉 İngiltere Vizesi için %20 İndirim Fırsatı! 🇬🇧✈️',
                thumbnail: '/visa/uploads/contents/testimonial/202441355a_167651fd9e052a.webp'
            }
        ],
        gallery: [
            { src: '/visa/uploads/contents/gallery/1764387127_7e46fb408df79cde0c08.jpg', alt: 'İngiltere - 1' },
            { src: '/visa/uploads/contents/gallery/1764387127_a02af2b06955e9e24b9f.jpg', alt: 'İngiltere - 2' },
            { src: '/visa/uploads/contents/gallery/1764387127_28b7e38d09b52695534e.jpg', alt: 'İngiltere - 3' },
            { src: '/visa/uploads/contents/gallery/1764387127_19587e47eb953d396faa.jpg', alt: 'İngiltere - 4' },
            { src: '/visa/uploads/contents/gallery/1764387127_c66c2bb59262aeda2880.jpg', alt: 'İngiltere - 5' },
        ]
    },
    almanya: {
        slug: 'almanya',
        name: 'Almanya',
        icon: '/visa/uploads/icons/almanya.svg',
        heroImage: '/visa/uploads/contents/main/almanya.webp',
        excerpt: 'Almanya\'ya seyahat etmek isteyen Türk vatandaşları için Schengen vizesi gereklidir. Almanya, Avrupa\'nın en güçlü ekonomilerinden biri olup, zengin kültürel mirası ve modern şehirleriyle dikkat çeker.',
        content: `<p>Almanya, Orta Avrupa'da yer alan federal bir cumhuriyettir. Avrupa Birliği'nin en büyük ekonomisine sahip olan Almanya, teknoloji, otomotiv ve mühendislik alanlarında dünya lideridir.</p>
        <h3><strong>Coğrafya</strong></h3>
        <ul>
            <li><strong>Konum:</strong> Orta Avrupa'da yer alır ve dokuz ülke ile sınır komşusudur.</li>
            <li><strong>Başkent:</strong> Berlin, hem Almanya'nın başkenti hem de en büyük şehridir.</li>
            <li><strong>İklim:</strong> Ilıman okyanusal iklim görülür.</li>
        </ul>
        <h3><strong>Ekonomi</strong></h3>
        <ul>
            <li><strong>Genel Bakış:</strong> Almanya, dünyanın dördüncü büyük ekonomisidir.</li>
            <li><strong>Endüstriler:</strong> Otomotiv, makine, kimya ve teknoloji sektörleri öne çıkar.</li>
            <li><strong>Para Birimi:</strong> Euro (EUR).</li>
        </ul>`,
        navLinks: [
            { title: 'Almanya Genel Bilgi', href: '/visa/vize-basvurusu/almanya' },
            { title: 'Almanya Schengen Vizesi', href: '/visa/almanya-schengen-vizesi' },
            { title: 'Almanya Çalışma Vizesi', href: '/visa/almanya-calisma-vizesi' },
        ],
        videos: [],
        gallery: []
    },
    fransa: {
        slug: 'fransa',
        name: 'Fransa',
        icon: '/visa/uploads/icons/fransa.svg',
        heroImage: '/visa/uploads/contents/main/fransa.webp',
        excerpt: 'Fransa\'ya seyahat için Schengen vizesi gereklidir. Fransa, dünyanın en çok ziyaret edilen ülkelerinden biri olup, zengin tarihi, kültürü ve mutfağıyla ünlüdür.',
        content: `<p>Fransa, Batı Avrupa'da yer alan bir ülkedir. Başkenti Paris, dünyanın en romantik şehirlerinden biri olarak bilinir.</p>
        <h3><strong>Kültür</strong></h3>
        <ul>
            <li><strong>Sanat:</strong> Louvre Müzesi, dünyanın en büyük sanat müzelerinden biridir.</li>
            <li><strong>Mutfak:</strong> Fransız mutfağı, UNESCO'nun İnsanlığın Somut Olmayan Kültürel Mirası listesindedir.</li>
        </ul>`,
        navLinks: [
            { title: 'Fransa Genel Bilgi', href: '/visa/vize-basvurusu/fransa' },
            { title: 'Fransa Schengen Vizesi', href: '/visa/fransa-schengen-vizesi' },
        ],
        videos: [],
        gallery: []
    },
    kanada: {
        slug: 'kanada',
        name: 'Kanada',
        icon: '/visa/uploads/icons/kanada.svg',
        heroImage: '/visa/uploads/contents/main/kanada.webp',
        excerpt: 'Kanada\'ya seyahat için vize gereklidir. Kanada, dünyanın en büyük ikinci ülkesi olup, doğal güzellikleri, yüksek yaşam standartları ve çok kültürlü yapısıyla tanınır.',
        content: `<p>Kanada, Kuzey Amerika'da yer alan bir ülkedir. İki resmi dili vardır: İngilizce ve Fransızca.</p>
        <h3><strong>Coğrafya</strong></h3>
        <ul>
            <li><strong>Konum:</strong> Kuzey Amerika'nın kuzeyinde yer alır.</li>
            <li><strong>Başkent:</strong> Ottawa</li>
            <li><strong>İklim:</strong> Çeşitli iklim bölgeleri görülür.</li>
        </ul>`,
        navLinks: [
            { title: 'Kanada Genel Bilgi', href: '/visa/vize-basvurusu/kanada' },
            { title: 'Kanada Turist Vizesi', href: '/visa/kanada-turist-vizesi' },
        ],
        videos: [],
        gallery: []
    },
    abd: {
        slug: 'abd',
        name: 'ABD',
        icon: '/visa/uploads/icons/abd.svg',
        heroImage: '/visa/uploads/contents/main/abd.webp',
        excerpt: 'Amerika Birleşik Devletleri\'ne seyahat için vize gereklidir. ABD, dünyanın en büyük ekonomisine sahip olup, çeşitli kültürleri ve fırsatları barındırır.',
        content: `<p>Amerika Birleşik Devletleri, Kuzey Amerika'da yer alan federal bir cumhuriyettir.</p>
        <h3><strong>Ekonomi</strong></h3>
        <ul>
            <li><strong>Genel Bakış:</strong> Dünyanın en büyük ekonomisi</li>
            <li><strong>Para Birimi:</strong> Amerikan Doları (USD)</li>
        </ul>`,
        navLinks: [
            { title: 'ABD Genel Bilgi', href: '/visa/vize-basvurusu/abd' },
            { title: 'ABD Turist Vizesi', href: '/visa/abd-turist-vizesi' },
        ],
        videos: [],
        gallery: []
    }
};

export default function UlkeVizeBasvurusuPage() {
    const router = useRouter();
    const { ulke } = router.query;
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const currentCountry = ulke && typeof ulke === 'string' ? countriesData[ulke] : null;

    // Scroll animation for shapes
    useEffect(() => {
        const shapes = document.querySelectorAll('.country-hero .shape');
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    shapes.forEach((shape, index) => {
                        const speed = (index + 1) * 0.03;
                        (shape as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Video modal handlers
    const openVideoModal = (video: Video) => {
        setSelectedVideo(video);
        setIsVideoModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeVideoModal = () => {
        setIsVideoModalOpen(false);
        setSelectedVideo(null);
        document.body.style.overflow = '';
    };

    // Lightbox handlers
    const openLightbox = (src: string) => {
        setSelectedImage(src);
        setIsLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
        setSelectedImage(null);
        document.body.style.overflow = '';
    };

    // Close modals on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isVideoModalOpen) closeVideoModal();
                if (isLightboxOpen) closeLightbox();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isVideoModalOpen, isLightboxOpen]);

    if (!currentCountry) {
        return (
            <div className="country-page">
                <div className="container">
                    <h1>Ülke bulunamadı</h1>
                    <Link href="/visa">Ana Sayfaya Dön</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="country-page">
            {/* Hero Section */}
            <section className="country-hero">
                <div className="hero-bg-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>

                <div className="container">
                    <div className="hero-grid">
                        {/* Sol Kolon: İçerik */}
                        <div className="hero-content">
                            {/* Breadcrumb */}
                            <nav className="breadcrumb-nav">
                                <Link href="/visa">Ana Sayfa</Link>
                                <span className="separator">/</span>
                                <span className="current">{currentCountry.name}</span>
                            </nav>

                            {/* Country Icon + Title */}
                            <div className="hero-title-wrapper">
                                <div className="country-icon">
                                    <img src={currentCountry.icon} alt={currentCountry.name} />
                                </div>
                                <h1 className="hero-title">{currentCountry.name} Vize Başvuru Rehberi</h1>
                            </div>

                            {/* Excerpt */}
                            <div className="hero-excerpt">
                                {currentCountry.excerpt}
                            </div>

                            {/* CTA Button */}
                            <Link href="/visa/basvuru-yap" className="hero-cta">
                                <span>Başvurunuzu Başlatın</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </div>

                        {/* Sağ Kolon: Görsel */}
                        <div className="hero-image">
                            <picture>
                                {currentCountry.heroImageMobile && (
                                    <source media="(max-width: 768px)" srcSet={currentCountry.heroImageMobile} />
                                )}
                                <img src={currentCountry.heroImage} alt={currentCountry.name} />
                            </picture>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="country-main-content">
                <div className="container">
                    <div className="content-grid">
                        {/* Sol Sidebar */}
                        <aside className="country-sidebar">
                            <div className="sidebar-sticky">
                                {/* Ülke Navigasyonu */}
                                {currentCountry.navLinks.length > 0 && (
                                    <div className="sidebar-card nav-card">
                                        <div className="card-header">
                                            <div className="header-icon">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="2" y1="12" x2="22" y2="12" />
                                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                                </svg>
                                            </div>
                                            <h3>{currentCountry.name} Vize Başvurusu</h3>
                                        </div>
                                        <nav className="nav-links">
                                            {currentCountry.navLinks.map((link, index) => {
                                                const isActive = router.asPath === link.href;
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={link.href}
                                                        className={`nav-item ${isActive ? 'active' : ''}`}
                                                    >
                                                        <span className="nav-text">{link.title}</span>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="9 18 15 12 9 6" />
                                                        </svg>
                                                    </Link>
                                                );
                                            })}
                                        </nav>
                                    </div>
                                )}

                                {/* WhatsApp CTA */}
                                <div className="sidebar-card whatsapp-card">
                                    <div className="whatsapp-content">
                                        <div className="whatsapp-icon">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </div>
                                        <div className="whatsapp-text">
                                            <h4>Hemen Yazın</h4>
                                            <p>Sorularınız için bize ulaşın</p>
                                        </div>
                                    </div>
                                    <a
                                        href="https://wa.me/9085088870710"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="whatsapp-btn"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        <span>WhatsApp ile Yazın</span>
                                    </a>
                                </div>

                                {/* Video Testimonials */}
                                {currentCountry.videos.length > 0 && (
                                    <div className="sidebar-card video-card">
                                        <div className="card-header">
                                            <div className="header-icon video-icon">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                </svg>
                                            </div>
                                            <h3>{currentCountry.name} Danışanlarımızın Deneyimleri</h3>
                                        </div>
                                        <div className="video-grid">
                                            {currentCountry.videos.map((video) => (
                                                <a
                                                    key={video.id}
                                                    href="#"
                                                    className="video-item"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        openVideoModal(video);
                                                    }}
                                                >
                                                    <div className="video-thumbnail">
                                                        <img src={video.thumbnail} alt={video.title} loading="lazy" />
                                                        <div className="play-overlay">
                                                            <div className="play-btn">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="video-title">{video.title.length > 40 ? `${video.title.substring(0, 40)}...` : video.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </aside>

                        {/* Sağ İçerik Alanı */}
                        <main className="country-content">
                            <article className="content-article">
                                {/* Main Content */}
                                <div
                                    className="article-prose"
                                    dangerouslySetInnerHTML={{ __html: currentCountry.content }}
                                />

                                {/* Gallery */}
                                {currentCountry.gallery.length > 0 && (
                                    <div className="gallery-section">
                                        <h3 className="section-title">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                            Galeri
                                        </h3>
                                        <div className="gallery-grid">
                                            {currentCountry.gallery.map((image, index) => (
                                                <a
                                                    key={index}
                                                    href="#"
                                                    className="gallery-item"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        openLightbox(image.src);
                                                    }}
                                                >
                                                    <img src={image.src} alt={image.alt} loading="lazy" />
                                                    <div className="gallery-overlay">
                                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <circle cx="11" cy="11" r="8" />
                                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                                            <line x1="11" y1="8" x2="11" y2="14" />
                                                            <line x1="8" y1="11" x2="14" y2="11" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </article>
                        </main>
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            <div className={`video-modal ${isVideoModalOpen ? 'active' : ''}`}>
                <div className="video-modal-overlay" onClick={closeVideoModal}></div>
                <div className="video-modal-container">
                    <button className="video-modal-close" onClick={closeVideoModal} aria-label="Kapat">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <div className="video-modal-content">
                        <div className="video-wrapper">
                            {selectedVideo && (
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <div className={`lightbox-overlay ${isLightboxOpen ? 'active' : ''}`} onClick={closeLightbox}>
                <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                    {selectedImage && <img src={selectedImage} alt="Galeri görseli" />}
                    <button className="lightbox-close" onClick={closeLightbox} aria-label="Kapat">
                        ×
                    </button>
                </div>
            </div>
        </div>
    );
}

