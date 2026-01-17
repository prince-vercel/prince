/* eslint-disable react-hooks/set-state-in-effect */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import '../../styles/visa/Blog.css';
import { db } from '@/src/lib/firebase';
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore';
import { getCollectionName } from '@/src/lib/localization';

// Blog post veri tipi
interface BlogPost {
    id: string;
    title: string;
    desc: string;
    imageUrl: string;
    slug: string;
    date: string;
    readTime: string;
}

interface PopularPost {
    id: string;
    title: string;
    slug: string;
}


export default function BlogPage() {
    const { t, i18n } = useTranslation();
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [popularPosts, setPopularPosts] = useState<PopularPost[]>([]);

    // Slug oluşturma fonksiyonu
    const createSlug = (title: string): string => {
        return title
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const fetchPopularPosts = async () => {
        try {
            const currentLang = (i18n.language || 'tr') as 'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru';
            const blogsRef = collection(db, getCollectionName('visablogs', currentLang));
            const q = query(blogsRef, orderBy('createdAt', 'desc'), limit(5));
            const snapshot = await getDocs(q);
            
            const posts: PopularPost[] = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    title: data.title || '',
                    slug: createSlug(data.title || '')
                };
            });
            
            setPopularPosts(posts);
        } catch (error) {
            console.error('Popüler yazılar çekilirken hata:', error);
            // Hata durumunda boş array set et
            setPopularPosts([]);
        }
    };

    const fetchBlogPosts = async () => {
        try {
            const currentLang = (i18n.language || 'tr') as 'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru';
            const blogsRef = collection(db, getCollectionName('visablogs', currentLang));
            const q = query(blogsRef, orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            
            const posts: BlogPost[] = snapshot.docs.map(doc => {
                const data = doc.data();
                const createdAt = data.createdAt?.toDate?.() || new Date();
                const dateStr = createdAt.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
                
                return {
                    id: doc.id,
                    title: data.title || '',
                    desc: data.desc || '',
                    imageUrl: data.imageUrl || '',
                    slug: createSlug(data.title || ''),
                    date: dateStr,
                    readTime: '5 dk' // Varsayılan okuma süresi
                };
            });
            
            setBlogPosts(posts);
        } catch (error) {
            console.error('Blog yazıları çekilirken hata:', error);
            setBlogPosts([]);
        }
    };

    useEffect(() => {
        fetchBlogPosts();
        fetchPopularPosts();
    }, [i18n.language]);

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
                        <span suppressHydrationWarning>{t('visa.blog.badge', 'Prince Blog')}</span>
                    </div>

                    <div className="featured-post-wrapper">
                        <div className="featured-content">
                            <h1 className="featured-title" suppressHydrationWarning>
                                {t('visa.blog.featured.title', 'Vize Alırken Dikkat Edilmesi Gerekenler')}
                            </h1>

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
                                    <span suppressHydrationWarning>
                                        {t('visa.blog.featured.readTime', '15 dk okuma')}
                                    </span>
                                </span>
                            </div>

                            <Link href="/visa/blog/vize-alirken-dikkat-edilmesi-gerekenler" className="featured-cta">
                                <span suppressHydrationWarning>{t('visa.blog.readPost', 'Yazıyı Oku')}</span>
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
                            <span suppressHydrationWarning>{t('visa.blog.all', 'Tümü')}</span>
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
                            {blogPosts.length > 0 ? (
                                blogPosts.map((post) => (
                                    <article key={post.id} className="blog-card">
                                        <Link href={`/visa/blog/${post.slug}`} className="card-link">
                                            <div className="card-image">
                                                <img
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    loading="lazy"
                                                />
                                                <div className="card-overlay"></div>
                                            </div>

                                            <div className="card-body">
                                                <h2 className="card-title">{post.title}</h2>

                                                <p className="card-excerpt">{post.desc.substring(0, 100)}...</p>

                                                <div className="card-footer">
                                                    <div className="card-meta">
                                                        <span className="meta-date">{post.date}</span>
                                                        <span className="meta-separator">•</span>
                                                        <span className="meta-read">{post.readTime}</span>
                                                    </div>
                                                    <span className="card-cta">
                                                        <span suppressHydrationWarning>
                                                            {t('visa.blog.read', 'Oku')}
                                                        </span>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <line x1="5" y1="12" x2="19" y2="12" />
                                                            <polyline points="12 5 19 12 12 19" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                ))
                            ) : (
                                <p style={{ color: '#666', fontSize: '16px', textAlign: 'center', width: '100%' }}>
                                    Henüz blog yazısı bulunmamaktadır.
                                </p>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="blog-sidebar">
                            <div className="sidebar-sticky">
                                <div className="sidebar-card popular-posts">
                                    <div className="sidebar-header">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                        <h3 suppressHydrationWarning>{t('visa.blog.popular', 'Popüler Yazılar')}</h3>
                                    </div>
                                    <div className="popular-list">
                                        {popularPosts.length > 0 ? (
                                            popularPosts.map((post, index) => (
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
                                            ))
                                        ) : (
                                            <p style={{ color: '#666', fontSize: '14px', padding: '10px' }}>
                                                Henüz popüler yazı bulunmamaktadır.
                                            </p>
                                        )}
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