import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSafeTranslation } from '../../../hooks/useSafeTranslation';
import '../../../i18n';
import '../../../styles/visa/Blog.css';

// Blog post data - Bu veriler gerçek uygulamada Firebase'den gelecek
const blogPostsData: { [key: string]: any } = {
    'vize-alirken-dikkat-edilmesi-gerekenler': {
        id: 0,
        title: "Vize Alırken Dikkat Edilmesi Gerekenler",
        image: "/visa/uploads/contents/main/693637085e121_2024d34508_1667423b149858.webp",
        date: "08 Aralık 2025",
        readTime: "15 dk",
        content: `
            <p>Vize başvurusu yaparken dikkat edilmesi gereken önemli noktalar bulunmaktadır. Bu yazıda, vize başvuru sürecinde karşılaşabileceğiniz sorunları ve çözümlerini ele alacağız.</p>
            
            <h2>Başvuru Öncesi Hazırlık</h2>
            <p>Vize başvurusu yapmadan önce tüm gerekli belgelerinizi hazırlamanız çok önemlidir. Eksik belge ile yapılan başvurular genellikle reddedilir.</p>
            
            <h2>Belgelerin Doğruluğu</h2>
            <p>Tüm belgelerinizin güncel ve doğru olması gerekmektedir. Pasaport sürenizin yeterli olması, fotoğraflarınızın güncel olması gibi detaylar başvurunuzun kabul edilmesinde kritik rol oynar.</p>
            
            <h2>Başvuru Süreci</h2>
            <p>Başvuru sürecinde dikkatli olmanız ve tüm adımları eksiksiz tamamlamanız gerekmektedir. Online başvuru formlarını doldururken bilgilerinizi dikkatli kontrol edin.</p>
        `
    },
    'yurtdisinda-calismanin-avantajlari-ve-dezavantajlari': {
        id: 1,
        title: "Yurtdışında Çalışmanın Avantajları ve Dezavantajları",
        image: "/visa/uploads/contents/main/6936370862074_2024e0f2dd_16674246702d19.webp",
        date: "08 Aralık 2025",
        readTime: "4 dk",
        content: `
            <p>Yurtdışında çalışmak birçok kişi için hayal olabilir. Bu yazıda yurtdışında çalışmanın avantaj ve dezavantajlarını inceleyeceğiz.</p>
            
            <h2>Avantajlar</h2>
            <p>Yurtdışında çalışmanın en büyük avantajlarından biri farklı kültürler tanıma fırsatıdır. Ayrıca genellikle daha yüksek maaşlar ve kariyer gelişimi imkanları sunar.</p>
            
            <h2>Dezavantajlar</h2>
            <p>Ancak yurtdışında çalışmanın bazı dezavantajları da vardır. Aile ve arkadaşlardan uzak kalmak, dil bariyeri ve kültürel uyum sorunları bunlardan bazılarıdır.</p>
        `
    },
    'kariyerinizi-uluslararasilastirmanin-yollari': {
        id: 2,
        title: "Kariyerinizi Uluslararasılaştırmanın Yolları",
        image: "/visa/uploads/contents/main/69363708633d4_2024ddb250_166742482b42c6.webp",
        date: "08 Aralık 2025",
        readTime: "4 dk",
        content: `
            <p>Kariyerinizi uluslararası düzeyde geliştirmek için birçok yol bulunmaktadır. Bu yazıda bu yolları detaylı olarak inceleyeceğiz.</p>
            
            <h2>Dil Öğrenmek</h2>
            <p>Uluslararası kariyer için en önemli adımlardan biri yabancı dil öğrenmektir. İngilizce başta olmak üzere, hedef ülkenin dilini öğrenmek büyük avantaj sağlar.</p>
            
            <h2>Uluslararası Deneyim</h2>
            <p>Farklı ülkelerde çalışma deneyimi kazanmak kariyerinizi güçlendirir. Bu deneyim hem kişisel hem de profesyonel gelişiminize katkı sağlar.</p>
        `
    },
    'almanya-da-blue-card-nedir-kimler-basvurabilir-ve-nasil-alinir': {
        id: 3,
        title: "Almanya'da Blue Card: Nedir, Kimler Başvurabilir ve Nasıl Alınır?",
        image: "/visa/uploads/contents/main/69363708649e8_2024ffe588_166b8f8ac3306c.webp",
        date: "08 Aralık 2025",
        readTime: "5 dk",
        content: `
            <p>Almanya Blue Card, yüksek nitelikli yabancı çalışanlar için tasarlanmış bir oturma ve çalışma iznidir. Bu yazıda Blue Card hakkında detaylı bilgi bulacaksınız.</p>
            
            <h2>Blue Card Nedir?</h2>
            <p>Blue Card, Avrupa Birliği genelinde geçerli olan ve yüksek nitelikli çalışanlar için tasarlanmış bir oturma iznidir. Almanya'da çalışmak isteyen nitelikli profesyoneller için ideal bir seçenektir.</p>
            
            <h2>Kimler Başvurabilir?</h2>
            <p>Üniversite mezunu olan ve Almanya'da iş teklifi alan kişiler Blue Card için başvurabilir. Ayrıca belirli bir maaş eşiğini karşılamak gerekmektedir.</p>
            
            <h2>Nasıl Alınır?</h2>
            <p>Blue Card başvurusu için öncelikle Almanya'da bir iş teklifi almanız gerekmektedir. Ardından gerekli belgelerle konsolosluğa başvuru yapabilirsiniz.</p>
        `
    },
    'hollanda-da-calismak-yasam-kariyer-ve-firsatlar': {
        id: 4,
        title: "Hollanda'da Çalışmak: Yaşam, Kariyer ve Fırsatlar",
        image: "/visa/uploads/contents/main/6936370865c62_2024bde696_166b8fef82ecd1.webp",
        date: "08 Aralık 2025",
        readTime: "6 dk",
        content: `
            <p>Hollanda, yüksek yaşam standartları ve iş fırsatları ile dikkat çeken bir ülkedir. Bu yazıda Hollanda'da çalışma ve yaşam hakkında bilgiler bulacaksınız.</p>
            
            <h2>Yaşam Standartları</h2>
            <p>Hollanda, dünyanın en yüksek yaşam standartlarına sahip ülkelerinden biridir. Sağlık sistemi, eğitim ve altyapı konularında öncü bir ülkedir.</p>
            
            <h2>İş Fırsatları</h2>
            <p>Hollanda'da özellikle teknoloji, finans ve lojistik sektörlerinde birçok iş fırsatı bulunmaktadır. Çok uluslu şirketlerin merkezleri genellikle Amsterdam ve Rotterdam'da bulunur.</p>
        `
    },
    'hollanda-mutfagi-peynir-stroopwafel-ve-daha-fazlasi': {
        id: 5,
        title: "Hollanda Mutfağı: Peynir, Stroopwafel ve Daha Fazlası",
        image: "/visa/uploads/contents/main/6936370866f72_20248ee4e7_166b900512ce3e.webp",
        date: "08 Aralık 2025",
        readTime: "5 dk",
        content: `
            <p>Hollanda mutfağı, dünya çapında ünlü peynirleri ve lezzetli tatlıları ile tanınır. Bu yazıda Hollanda mutfağının en önemli lezzetlerini keşfedeceğiz.</p>
            
            <h2>Peynir</h2>
            <p>Hollanda, dünyanın en büyük peynir üreticilerinden biridir. Gouda, Edam ve Leiden gibi peynirler dünya çapında ünlüdür.</p>
            
            <h2>Stroopwafel</h2>
            <p>Stroopwafel, Hollanda'nın en ünlü tatlısıdır. İki ince waffle arasına karamel benzeri bir şurup konularak yapılır ve genellikle kahve veya çay ile servis edilir.</p>
        `
    },
    'online-vize-danismanligi-nedir': {
        id: 6,
        title: "Online Vize Danışmanlığı Nedir ?",
        image: "/visa/uploads/contents/main/6936370869dca_20247e5ba4_166b9038742062.webp",
        date: "08 Aralık 2025",
        readTime: "2 dk",
        content: `
            <p>Online vize danışmanlığı, vize başvuru sürecinizi dijital platformlar üzerinden yönetmenizi sağlayan modern bir hizmettir.</p>
            
            <h2>Avantajları</h2>
            <p>Online vize danışmanlığının en büyük avantajları zamandan tasarruf etmek ve evden çıkmadan başvuru yapabilmektir. Ayrıca tüm süreç dijital olarak takip edilebilir.</p>
            
            <h2>Nasıl Çalışır?</h2>
            <p>Online vize danışmanlığı hizmeti, başvuru formlarınızı doldurmanıza, belgelerinizi yüklemenize ve başvuru durumunuzu takip etmenize yardımcı olur.</p>
        `
    }
};

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

export default function BlogDetailPage() {
    const router = useRouter();
    const { slug } = router.query;
    const { t, isReady } = useSafeTranslation();
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        if (slug && typeof slug === 'string' && isReady) {
            // Try to get localized content first
            const localizedPost = t(`visa.blog.posts.${slug}`, { returnObjects: true }) as any;
            if (localizedPost && localizedPost.title) {
                setPost({
                    ...localizedPost,
                    image: blogPostsData[slug]?.image || '/visa/uploads/contents/main/default.webp'
                });
            } else {
                // Fallback to static data
                const blogPost = blogPostsData[slug];
                if (blogPost) {
                    setPost(blogPost);
                }
            }
        }
    }, [slug, isReady, t]);

    if (!slug || !post) {
        return (
            <div className="blog-detail-page">
                <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
                    <h1 suppressHydrationWarning>{isReady ? t('visa.blog.detail.notFound', 'Blog yazısı bulunamadı') : ''}</h1>
                    <Link href="/visa/blog" style={{ color: '#C42127', textDecoration: 'none', marginTop: '20px', display: 'inline-block' }} suppressHydrationWarning>
                        {isReady ? t('visa.blog.detail.backToList', 'Blog listesine dön') : ''}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="blog-detail-page">
            <style>{`
                .blog-detail-page {
                    --color-primary: #C42127;
                    --color-primary-dark: #A31B20;
                    --color-primary-light: #FEF0EF;
                    --color-text-primary: #1A1A2E;
                    --color-text-secondary: #4A4A68;
                    --color-text-muted: #8E8EA9;
                    --color-bg-primary: #FFFFFF;
                    --color-bg-secondary: #F8F9FC;
                    --color-border: #E8EAF0;
                    padding-top: 40px;
                    padding-bottom: 80px;
                    min-height: 100vh;
                }

                .blog-detail-page .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                .blog-detail-breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 32px;
                    font-size: 14px;
                    color: var(--color-text-muted);
                }

                .blog-detail-breadcrumb a {
                    color: var(--color-text-secondary);
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .blog-detail-breadcrumb a:hover {
                    color: var(--color-primary);
                }

                .blog-detail-breadcrumb .separator {
                    color: var(--color-text-muted);
                }

                .blog-detail-header {
                    margin-bottom: 48px;
                }

                .blog-detail-title {
                    font-size: 48px;
                    font-weight: 700;
                    line-height: 1.2;
                    color: var(--color-text-primary);
                    margin-bottom: 24px;
                }

                .blog-detail-meta {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    flex-wrap: wrap;
                    margin-bottom: 32px;
                }

                .blog-detail-meta-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--color-text-secondary);
                    font-size: 16px;
                }

                .blog-detail-meta-item svg {
                    width: 18px;
                    height: 18px;
                    color: var(--color-primary);
                }


                .blog-detail-layout {
                    display: grid;
                    grid-template-columns: 1fr 360px;
                    gap: 48px;
                }

                .blog-detail-content {
                    background: var(--color-bg-primary);
                    padding: 48px;
                    border-radius: 16px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                }

                .blog-detail-content h2 {
                    font-size: 32px;
                    font-weight: 700;
                    color: var(--color-text-primary);
                    margin-top: 40px;
                    margin-bottom: 20px;
                }

                .blog-detail-content h3 {
                    font-size: 24px;
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin-top: 32px;
                    margin-bottom: 16px;
                }

                .blog-detail-content p {
                    font-size: 18px;
                    line-height: 1.8;
                    color: var(--color-text-secondary);
                    margin-bottom: 24px;
                }

                .blog-detail-content ul,
                .blog-detail-content ol {
                    margin-left: 24px;
                    margin-bottom: 24px;
                }

                .blog-detail-content li {
                    font-size: 18px;
                    line-height: 1.8;
                    color: var(--color-text-secondary);
                    margin-bottom: 12px;
                }

                .blog-detail-sidebar {
                    position: sticky;
                    top: 100px;
                    height: fit-content;
                }

                .sidebar-card {
                    background: var(--color-bg-primary);
                    border-radius: 16px;
                    padding: 32px;
                    margin-bottom: 24px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                }

                .sidebar-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 24px;
                }

                .sidebar-header svg {
                    width: 24px;
                    height: 24px;
                    color: var(--color-primary);
                }

                .sidebar-header h3 {
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--color-text-primary);
                    margin: 0;
                }

                .popular-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .popular-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    padding: 16px;
                    border-radius: 12px;
                    text-decoration: none;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }

                .popular-item:hover {
                    background: var(--color-bg-secondary);
                    border-color: var(--color-border);
                }

                .popular-number {
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--color-primary);
                    min-width: 32px;
                }

                .popular-title {
                    font-size: 15px;
                    line-height: 1.5;
                    color: var(--color-text-primary);
                    flex: 1;
                }

                .blog-detail-share {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 24px;
                    background: var(--color-bg-secondary);
                    border-radius: 12px;
                    margin-top: 48px;
                }

                .blog-detail-share-label {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--color-text-primary);
                }

                .blog-detail-share-buttons {
                    display: flex;
                    gap: 12px;
                }

                .share-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    background: var(--color-bg-primary);
                    border: 1px solid var(--color-border);
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                }

                .share-button:hover {
                    background: var(--color-primary);
                    border-color: var(--color-primary);
                }

                .share-button:hover svg {
                    color: white;
                }

                .share-button svg {
                    width: 20px;
                    height: 20px;
                    color: var(--color-text-secondary);
                    transition: color 0.2s;
                }

                @media (max-width: 1024px) {
                    .blog-detail-layout {
                        grid-template-columns: 1fr;
                    }

                    .blog-detail-sidebar {
                        position: static;
                    }

                    .blog-detail-title {
                        font-size: 36px;
                    }

                    .blog-detail-content {
                        padding: 32px 24px;
                    }
                }

                .blog-detail-image-wrapper {
                    position: relative;
                    width: 100%;
                    height: 500px;
                    margin-bottom: 48px;
                    border-radius: 16px;
                    overflow: hidden;
                }

                @media (max-width: 768px) {
                    .blog-detail-title {
                        font-size: 28px;
                    }

                    .blog-detail-image-wrapper {
                        height: 300px;
                    }

                    .blog-detail-content {
                        padding: 24px 16px;
                    }
                }
            `}</style>

            <div className="container">
                {/* Breadcrumb */}
                <div className="blog-detail-breadcrumb">
                    <Link href="/visa" suppressHydrationWarning>{isReady ? t('visa.footer.home', 'Anasayfa') : ''}</Link>
                    <span className="separator">/</span>
                    <Link href="/visa/blog" suppressHydrationWarning>{isReady ? t('visa.footer.blog', 'Blog') : ''}</Link>
                    <span className="separator">/</span>
                    <span suppressHydrationWarning>{isReady && post.title ? post.title : ''}</span>
                </div>

                <div className="blog-detail-layout">
                    {/* Main Content */}
                    <div className="blog-detail-content-wrapper">
                        <div className="blog-detail-header">
                            <h1 className="blog-detail-title" suppressHydrationWarning>{isReady && post.title ? post.title : ''}</h1>
                            <div className="blog-detail-meta">
                                <div className="blog-detail-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <span suppressHydrationWarning>{isReady && post.date ? post.date : ''}</span>
                                </div>
                                <div className="blog-detail-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    <span suppressHydrationWarning>{isReady && post.readTime ? `${post.readTime} ${t('visa.blog.detail.readTime', 'okuma')}` : ''}</span>
                                </div>
                            </div>
                        </div>

                        <div className="blog-detail-image-wrapper">
                            <Image
                                src={post.image || '/visa/uploads/contents/main/default.webp'}
                                alt={isReady && post.title ? post.title : 'Blog post'}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>

                        <div className="blog-detail-content">
                            {isReady && post.content ? (
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            ) : (
                                <div suppressHydrationWarning>Loading...</div>
                            )}

                            {/* Share Section */}
                            <div className="blog-detail-share">
                                <span className="blog-detail-share-label" suppressHydrationWarning>{isReady ? t('visa.blog.detail.share', 'Paylaş') : ''}:</span>
                                <div className="blog-detail-share-buttons">
                                    <a href="#" className="share-button" title="Facebook">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="share-button" title="Twitter">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="share-button" title="LinkedIn">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                            <rect x="2" y="9" width="4" height="12" />
                                            <circle cx="4" cy="4" r="2" />
                                        </svg>
                                    </a>
                                    <a href="#" className="share-button" title="WhatsApp">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="blog-detail-sidebar">
                        <div className="sidebar-card popular-posts">
                            <div className="sidebar-header">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                <h3 suppressHydrationWarning>{isReady ? t('visa.blog.popular', 'Popüler Yazılar') : ''}</h3>
                            </div>
                            <div className="popular-list">
                                {popularPosts.map((popularPost, index) => {
                                    const localizedTitle = isReady ? (t(`visa.blog.posts.${popularPost.slug}.title`, popularPost.title) as string) : popularPost.title;
                                    return (
                                        <Link
                                            key={popularPost.id}
                                            href={`/visa/blog/${popularPost.slug}`}
                                            className="popular-item"
                                        >
                                            <span className="popular-number">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="popular-title" suppressHydrationWarning>{localizedTitle}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
