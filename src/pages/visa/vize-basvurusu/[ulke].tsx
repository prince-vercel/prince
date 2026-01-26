import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../i18n';
import '../../../styles/visa/UlkeVizeBasvurusu.css';

interface NavLink {
    title: string;
    href: string;
    key?: string;
}

interface NavContent {
    title: string;
    content: string;
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
        name: 'visa.countries.ingiltere',
        icon: '/visa/uploads/icons/1764382446_54d42ca992ddf99b4289.svg',
        heroImage: '/visa/uploads/contents/main/1764382497_103fbb272638992bc7ed.jpg',
        heroImageMobile: '/visa/uploads/contents/main/mobile/1764382512_91fad356020f88b602c2.webp',
        excerpt: '', // Will be set dynamically with translation
        content: '', // Will be set dynamically with translation
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/ingiltere', key: 'generalInfo' },
            { title: '', href: '/visa/ingiltere-turist-vizesi', key: 'touristVisa' },
            { title: '', href: '/visa/ingiltere-egitim-vizesi', key: 'educationVisa' },
            { title: '', href: '/visa/ingiltere-yatirimci-vizesi', key: 'investorVisa' },
            { title: '', href: '/visa/ingiltere-diger-vize-turleri', key: 'otherVisas' },
            { title: '', href: '/visa/ingiltere-calisma-vizesi', key: 'workVisa' },
            { title: '', href: '/visa/ingiltere-aile-birlesimi-vizesi', key: 'familyVisa' },
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
        name: '', // Will be set dynamically with translation
        icon: '/visa/uploads/icons/almanya_bayrak.svg',
        heroImage: '/visa/uploads/countries/almanya.avif',
        excerpt: '', // Will be set dynamically with translation
        content: '', // Will be set dynamically with translation
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/almanya', key: 'generalInfo' },
            { title: '', href: '/visa/almanya-schengen-vizesi', key: 'schengenVisa' },
            { title: '', href: '/visa/almanya-calisma-vizesi', key: 'workVisa' },
        ],
        videos: [],
        gallery: []
    },
    fransa: {
        slug: 'fransa',
        name: 'visa.countries.fransa',
        icon: '/visa/uploads/icons/fransa.svg',
        heroImage: '/visa/uploads/countries/fransa.jpg',
        excerpt: '', // Will be set dynamically with translation
        content: '', // Will be set dynamically with translation
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/fransa', key: 'generalInfo' },
            { title: '', href: '/visa/fransa-schengen-vizesi', key: 'schengenVisa' },
        ],
        videos: [],
        gallery: []
    },
    kanada: {
        slug: 'kanada',
        name: '', // Will be set dynamically with translation
        icon: '/visa/uploads/icons/kanada_bayrak.svg',
        heroImage: '/visa/uploads/countries/kanada.png',
        excerpt: '', // Will be set dynamically with translation
        content: '', // Will be set dynamically with translation
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/kanada', key: 'generalInfo' },
            { title: '', href: '/visa/kanada-turist-vizesi', key: 'touristVisa' },
        ],
        videos: [],
        gallery: []
    },
    abd: {
        slug: 'abd',
        name: 'visa.countries.amerika',
        icon: '/visa/uploads/icons/amerika.svg',
        heroImage: '/visa/uploads/countries/amerika.jpg',
        excerpt: '', // Will be set dynamically with translation
        content: '', // Will be set dynamically with translation
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/abd', key: 'generalInfo' },
            { title: '', href: '/visa/abd-turist-vizesi', key: 'touristVisa' },
        ],
        videos: [],
        gallery: []
    },
    danimarka: {
        slug: 'danimarka',
        name: '',
        icon: '/visa/uploads/icons/1765153526_f83b8a07cc28aaa369b4.svg',
        heroImage: '/visa/uploads/countries/danimarkajpg.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/danimarka', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    belcika: {
        slug: 'belcika',
        name: 'visa.countries.belcika',
        icon: '/visa/uploads/icons/1765153595_1f0fef4d753b5d02bda5.svg',
        heroImage: '/visa/uploads/countries/belcika.webp',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/belcika', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    italya: {
        slug: 'italya',
        name: '',
        icon: '/visa/uploads/icons/1765154006_1b24e4173c6457dafbea.svg',
        heroImage: '/visa/uploads/countries/italya.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/italya', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    malta: {
        slug: 'malta',
        name: 'visa.countries.malta',
        icon: '/visa/uploads/icons/1765154164_af71177c207646d19b62.svg',
        heroImage: '/visa/uploads/countries/malta.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/malta', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    irlanda: {
        slug: 'irlanda',
        name: '',
        icon: '/visa/uploads/icons/1765154399_b928e004b98217490022.svg',
        heroImage: '/visa/uploads/countries/irlanda.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/irlanda', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    ispanya: {
        slug: 'ispanya',
        name: 'visa.countries.ispanya',
        icon: '/visa/uploads/icons/1765155530_9abaf74373a4eecfd706.svg',
        heroImage: '/visa/uploads/countries/ispanya.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/ispanya', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    portekiz: {
        slug: 'portekiz',
        name: '',
        icon: '/visa/uploads/icons/1765155591_3ba19bc8145dbfd3876b.svg',
        heroImage: '/visa/uploads/countries/portekiz.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/portekiz', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    hollanda: {
        slug: 'hollanda',
        name: 'visa.countries.hollanda',
        icon: '/visa/uploads/icons/1765155654_8f0736e95d6e49fe7998.svg',
        heroImage: '/visa/uploads/countries/hollanda.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/hollanda', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    macaristan: {
        slug: 'macaristan',
        name: '',
        icon: '/visa/uploads/icons/1765156553_55ca44c8baaeda593769.svg',
        heroImage: '/visa/uploads/countries/macaristan.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/macaristan', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    yunanistan: {
        slug: 'yunanistan',
        name: 'visa.countries.yunanistan',
        icon: '/visa/uploads/icons/1765155714_7b5121cce9ec1be37381.svg',
        heroImage: '/visa/uploads/countries/yunanistan.webp',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/yunanistan', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    dubai: {
        slug: 'dubai',
        name: '',
        icon: '/visa/uploads/icons/1765156599_8f91678f3d6e03ab19dd.svg',
        heroImage: '/visa/uploads/countries/dubai.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/dubai', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    polonya: {
        slug: 'polonya',
        name: 'visa.countries.polonya',
        icon: '/visa/uploads/icons/1765156449_300b43b0d93d6295e952.svg',
        heroImage: '/visa/uploads/countries/polonya.webp',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/polonya', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    bulgaristan: {
        slug: 'bulgaristan',
        name: '',
        icon: '/visa/uploads/icons/1765156654_99758b8dda0ff9a6a5c0.svg',
        heroImage: '/visa/uploads/countries/bulgaristan.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/bulgaristan', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    luksemburg: {
        slug: 'luksemburg',
        name: 'visa.countries.luksemburg',
        icon: '/visa/uploads/icons/1765156400_dd6a1f256550f2ebc30d.svg',
        heroImage: '/visa/uploads/countries/luksemburg.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/luksemburg', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    isvec: {
        slug: 'isvec',
        name: '',
        icon: '/visa/uploads/icons/1765156702_68c6cc075f185cba9715.svg',
        heroImage: '/visa/uploads/countries/isveç.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/isvec', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    romanya: {
        slug: 'romanya',
        name: 'visa.countries.romanya',
        icon: '/visa/uploads/icons/1765156347_b10c8e55fde9dbf02cd3.svg',
        heroImage: '/visa/uploads/countries/romanya.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/romanya', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    slovenya: {
        slug: 'slovenya',
        name: '',
        icon: '/visa/uploads/icons/1765156758_e95fed42dde3a2def473.svg',
        heroImage: '/visa/uploads/countries/slovenya.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/slovenya', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    estonya: {
        slug: 'estonya',
        name: 'visa.countries.estonya',
        icon: '/visa/uploads/icons/1765156166_747261185a0c4ec0ed26.svg',
        heroImage: '/visa/uploads/countries/estonya.webp',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/estonya', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    letonya: {
        slug: 'letonya',
        name: '',
        icon: '/visa/uploads/icons/1765155770_7f1aa009192a673c1d96.svg',
        heroImage: '/visa/uploads/countries/letonya.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/letonya', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    litvanya: {
        slug: 'litvanya',
        name: 'visa.countries.litvanya',
        icon: '/visa/uploads/icons/1765156120_6bc007e4d7b63fcf7e7d.svg',
        heroImage: '/visa/uploads/countries/litvanya.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/litvanya', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    finlandiya: {
        slug: 'finlandiya',
        name: '',
        icon: '/visa/uploads/icons/1765155829_76dd3c52c1570b53661b.svg',
        heroImage: '/visa/uploads/countries/finlandiya.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/finlandiya', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    norvec: {
        slug: 'norvec',
        name: 'visa.countries.norvec',
        icon: '/visa/uploads/icons/1765156064_02bb911d41b9a01b0209.svg',
        heroImage: '/visa/uploads/countries/norvec.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/norvec', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    rusya: {
        slug: 'rusya',
        name: '',
        icon: '/visa/uploads/icons/1765155895_edf7adbc9cb1ac93d6ab.svg',
        heroImage: '/visa/uploads/countries/rusya.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/rusya', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    'suudi-arabistan': {
        slug: 'suudi-arabistan',
        name: 'visa.countries.suudiArabistan',
        icon: '/visa/uploads/icons/1765156004_6e94b6b2adef49267a44.svg',
        heroImage: '/visa/uploads/countries/suudiarabistan.png',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/suudi-arabistan', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    cin: {
        slug: 'cin',
        name: 'visa.countries.cin',
        icon: '/visa/uploads/icons/1765155942_671bb6e4477d27983ee7.svg',
        heroImage: '/visa/uploads/countries/çin.jpg',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/cin', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    },
    'guney-kore': {
        slug: 'guney-kore',
        name: 'visa.countries.guneyKore',
        icon: '/visa/uploads/icons/1765156857_f5c725d2d8679f239407.svg',
        heroImage: '/visa/uploads/countries/guneykore.webp',
        excerpt: '',
        content: '',
        navLinks: [
            { title: '', href: '/visa/vize-basvurusu/guney-kore', key: 'generalInfo' },
        ],
        videos: [],
        gallery: []
    }
};

// Get localized content for each nav link type
const getNavContent = (countrySlug: string, navKey: string, t: any): NavContent => {
    const title = t(`visa.pages.countryApplication.navLinks.${countrySlug}.${navKey}`, '');
    const comingSoon = t('visa.pages.countryApplication.contentComingSoon', 'Content will be added soon.');
    const content = t(`visa.pages.countryApplication.navContent.${countrySlug}.${navKey}`, `<p>${comingSoon}</p>`);

    return {
        title: title || '',
        content: content
    };
};

export default function UlkeVizeBasvurusuPage() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { ulke } = router.query;
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedNavKey, setSelectedNavKey] = useState<string>('generalInfo');

    const countrySlug = ulke && typeof ulke === 'string' ? ulke : null;
    const countryData = countrySlug ? countriesData[countrySlug] : null;

    // Get content for selected nav link
    const selectedNavContent = useMemo(() => {
        if (!countrySlug || !selectedNavKey) return null;
        return getNavContent(countrySlug, selectedNavKey, t);
    }, [countrySlug, selectedNavKey, t, i18n.language]);

    // Set localized country name, nav links, excerpt and content
    const currentCountry = useMemo(() => {
        if (!countryData || !countrySlug) return null;

        // Helper function to get translation with proper fallback
        const getTranslation = (key: string, fallback: string = '') => {
            if (!i18n.isInitialized) {
                return fallback;
            }

            // Use t() with fallback as second parameter (react-i18next syntax)
            const translation = t(key, fallback);

            // If translation returns the key itself, it means translation not found - use fallback
            if (translation === key) {
                return fallback || '';
            }

            return translation || fallback || '';
        };

        return {
            ...countryData,
            name: getTranslation(countryData.name || `visa.countries.${countrySlug}`, countrySlug),
            excerpt: getTranslation(`visa.pages.countryApplication.content.${countrySlug}.excerpt`, countryData.excerpt || ''),
            content: getTranslation(`visa.pages.countryApplication.content.${countrySlug}.content`, countryData.content || ''),
            navLinks: countryData.navLinks.map(link => {
                if (!link.key) return link;
                const translationKey = `visa.pages.countryApplication.navLinks.${countrySlug}.${link.key}`;
                const translatedTitle = getTranslation(translationKey, '');
                return {
                    ...link,
                    title: translatedTitle || ''
                };
            })
        };
    }, [countryData, countrySlug, t, i18n.language, i18n.isInitialized]);

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
                    <h1>{t('visa.pages.countryApplication.notFound', 'Ülke bulunamadı')}</h1>
                    <Link href="/visa">{t('visa.pages.countryApplication.backHome', 'Ana Sayfaya Dön')}</Link>
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
                                <Link href="/visa">{t('visa.common.home')}</Link>
                                <span className="separator">/</span>
                                <span className="current">{currentCountry.name}</span>
                            </nav>

                            {/* Country Icon + Title */}
                            <div className="hero-title-wrapper">
                                <div className="country-icon">
                                    <img src={currentCountry.icon} alt={currentCountry.name} />
                                </div>
                                <h1 className="hero-title">{currentCountry.name} {t('visa.pages.countryApplication.guide', 'Vize Başvuru Rehberi')}</h1>
                            </div>

                            {/* Excerpt */}
                            <div className="hero-excerpt">
                                {currentCountry.excerpt}
                            </div>

                            {/* CTA Button */}
                            <Link href="/visa/basvuru-yap" className="hero-cta">
                                <span>{t('visa.common.apply')}</span>
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
                                            <h3>{currentCountry.name} {t('visa.pages.countryApplication.visaApplication')}</h3>
                                        </div>
                                        <nav className="nav-links">
                                            {currentCountry.navLinks.map((link, index) => {
                                                const isActive = link.key === selectedNavKey;
                                                return (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => link.key && setSelectedNavKey(link.key)}
                                                        className={`nav-item ${isActive ? 'active' : ''}`}
                                                    >
                                                        <span className="nav-text">{link.title}</span>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="9 18 15 12 9 6" />
                                                        </svg>
                                                    </button>
                                                );
                                            })}
                                        </nav>
                                    </div>
                                )}
                            </div>
                        </aside>

                        {/* Sağ İçerik Alanı */}
                        <main className="country-content">
                            <article className="content-article">
                                {/* Nav Content Title */}
                                {selectedNavContent && (
                                    <h2 className="nav-content-title">{selectedNavContent.title}</h2>
                                )}

                                {/* Main Content */}
                                <div
                                    className="article-prose"
                                    dangerouslySetInnerHTML={{
                                        __html: selectedNavContent?.content || currentCountry.content
                                    }}
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
                                            {t('visa.pages.countryApplication.gallery', 'Galeri')}
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
                    <button className="video-modal-close" onClick={closeVideoModal} aria-label={t('visa.common.close')}>
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
                    {selectedImage && <img src={selectedImage} alt={t('visa.pages.countryApplication.galleryImageAlt')} />}
                    <button className="lightbox-close" onClick={closeLightbox} aria-label={t('visa.common.close')}>
                        ×
                    </button>
                </div>
            </div>
        </div>
    );
}

