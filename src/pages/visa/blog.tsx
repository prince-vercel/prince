import Link from 'next/link';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import '../../styles/visa/Blog.css';

// Blog post data
const blogPosts = [
    {
        id: 1,
        title: "Yurtdışında Çalışmanın Avantajları ve Dezavantajları",
        image: "/visa/uploads/contents/main/6936370862074_2024e0f2dd_16674246702d19.webp",
        date: "08 Aralık 2025",
        readTime: "4 dk",
        slug: "yurtdisinda-calismanin-avantajlari-ve-dezavantajlari"
    },
    {
        id: 2,
        title: "Kariyerinizi Uluslararasılaştırmanın Yolları",
        image: "/visa/uploads/contents/main/69363708633d4_2024ddb250_166742482b42c6.webp",
        date: "08 Aralık 2025",
        readTime: "4 dk",
        slug: "kariyerinizi-uluslararasilastirmanin-yollari"
    },
    {
        id: 3,
        title: "Almanya'da Blue Card: Nedir, Kimler Başvurabilir ve Nasıl Alınır?",
        image: "/visa/uploads/contents/main/69363708649e8_2024ffe588_166b8f8ac3306c.webp",
        date: "08 Aralık 2025",
        readTime: "5 dk",
        slug: "almanya-da-blue-card-nedir-kimler-basvurabilir-ve-nasil-alinir"
    },
    {
        id: 4,
        title: "Hollanda'da Çalışmak: Yaşam, Kariyer ve Fırsatlar",
        image: "/visa/uploads/contents/main/6936370865c62_2024bde696_166b8fef82ecd1.webp",
        date: "08 Aralık 2025",
        readTime: "6 dk",
        slug: "hollanda-da-calismak-yasam-kariyer-ve-firsatlar"
    },
    {
        id: 5,
        title: "Hollanda Mutfağı: Peynir, Stroopwafel ve Daha Fazlası",
        image: "/visa/uploads/contents/main/6936370866f72_20248ee4e7_166b900512ce3e.webp",
        date: "08 Aralık 2025",
        readTime: "5 dk",
        slug: "hollanda-mutfagi-peynir-stroopwafel-ve-daha-fazlasi"
    },
    {
        id: 6,
        title: "Online Vize Danışmanlığı Nedir ?",
        image: "/visa/uploads/contents/main/6936370869dca_20247e5ba4_166b9038742062.webp",
        date: "08 Aralık 2025",
        readTime: "2 dk",
        slug: "online-vize-danismanligi-nedir"
    }
];

const popularPosts = [
    {
        id: 1,
        title: "Vize Alırken Dikkat Edilmesi Gerekenler",
        slug: "vize-alirken-dikkat-edilmesi-gerekenler"
    },
    {
        id: 2,
        title: "Yurtdışında Çalışmanın Avantajları ve Dezavantajları",
        slug: "yurtdisinda-calismanin-avantajlari-ve-dezavantajlari"
    },
    {
        id: 3,
        title: "Kariyerinizi Uluslararasılaştırmanın Yolları",
        slug: "kariyerinizi-uluslararasilastirmanin-yollari"
    },
    {
        id: 4,
        title: "Almanya'da Blue Card: Nedir, Kimler Başvurabilir ve Nasıl Alınır?",
        slug: "almanya-da-blue-card-nedir-kimler-basvurabilir-ve-nasil-alinir"
    },
    {
        id: 5,
        title: "Hollanda'da Çalışmak: Yaşam, Kariyer ve Fırsatlar",
        slug: "hollanda-da-calismak-yasam-kariyer-ve-firsatlar"
    }
];

export default function BlogPage() {
    const { t } = useTranslation();

    useEffect(() => {
        // Scroll animation for shapes
        const shapes = document.querySelectorAll('.blog-hero .shape');
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

    return (
        <div className="blog-list-page">
            {/* Hero Section with Featured Post */}
            <section className="blog-hero">
                <div className="hero-bg-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>

                <div className="container">
                    <div className="hero-badge">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        <span>{t('visa.blog.badge', 'Çilek Vize Blog')}</span>
                    </div>

                    <div className="featured-post-wrapper">
                        <div className="featured-content">
                            <h1 className="featured-title">{t('visa.blog.featured.title', 'Vize Alırken Dikkat Edilmesi Gerekenler')}</h1>

                            <div className="featured-meta">
                                <span className="meta-date">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    08 Aralık 2025
                                </span>
                                <span className="meta-read">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    {t('visa.blog.featured.readTime', '15 dk okuma')}
                                </span>
                            </div>

                            <Link href="/visa/blog/vize-alirken-dikkat-edilmesi-gerekenler" className="featured-cta">
                                <span>{t('visa.blog.readPost', 'Yazıyı Oku')}</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </div>

                        <div className="featured-image">
                            <img
                                src="/visa/uploads/contents/main/693637085e121_2024d34508_1667423b149858.webp"
                                alt={t('visa.blog.featured.title', 'Vize Alırken Dikkat Edilmesi Gerekenler')}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter Section */}
            <section className="category-section">
                <div className="container">
                    <div className="category-pills">
                        <Link href="/visa/blog" className="category-pill active">
                            <span>{t('visa.blog.all', 'Tümü')}</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Blog Content Section */}
            <section className="blog-content-section">
                <div className="container">
                    <div className="blog-layout">
                        {/* Blog Grid */}
                        <div className="blog-grid">
                            {blogPosts.map((post) => (
                                <article key={post.id} className="blog-card">
                                    <Link href={`/visa/blog/${post.slug}`} className="card-link">
                                        <div className="card-image">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                loading="lazy"
                                            />
                                            <div className="card-overlay"></div>
                                        </div>

                                        <div className="card-body">
                                            <h2 className="card-title">{post.title}</h2>

                                            <p className="card-excerpt"></p>

                                            <div className="card-footer">
                                                <div className="card-meta">
                                                    <span className="meta-date">{post.date}</span>
                                                    <span className="meta-separator">•</span>
                                                    <span className="meta-read">{post.readTime}</span>
                                                </div>
                                                <span className="card-cta">
                                                    {t('visa.blog.read', 'Oku')}
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <line x1="5" y1="12" x2="19" y2="12" />
                                                        <polyline points="12 5 19 12 12 19" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>

                        {/* Sidebar */}
                        <aside className="blog-sidebar">
                            <div className="sidebar-sticky">
                                <div className="sidebar-card popular-posts">
                                    <div className="sidebar-header">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                        <h3>{t('visa.blog.popular', 'Popüler Yazılar')}</h3>
                                    </div>
                                    <div className="popular-list">
                                        {popularPosts.map((post, index) => (
                                            <Link
                                                key={post.id}
                                                href={`/visa/blog/${post.slug}`}
                                                className="popular-item"
                                            >
                                                <span className="popular-number">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <span className="popular-title">{post.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}

