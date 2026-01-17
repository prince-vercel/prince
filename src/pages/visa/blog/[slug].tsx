import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSafeTranslation } from '../../../hooks/useSafeTranslation';
import '../../../i18n';
import '../../../styles/visa/Blog.css';
import { db } from '@/src/lib/firebase';
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore';
import { getCollectionName } from '../../../lib/localization';

export default function BlogDetailPage() {
    const router = useRouter();
    const { slug } = router.query;
    const { t, isReady, i18n } = useSafeTranslation();
    const [post, setPost] = useState<any>(null);
    const [popularPosts, setPopularPosts] = useState<any[]>([]);

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

    const fetchPost = async () => {
        if (!slug || typeof slug !== 'string') return;

        try {
            const currentLang = (i18n.language || 'tr') as 'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru';
            const blogsRef = collection(db, getCollectionName('visablogs', currentLang));
            const snapshot = await getDocs(blogsRef);
            
            const foundPost = snapshot.docs.find(doc => {
                const data = doc.data();
                const postSlug = createSlug(data.title || '');
                return postSlug === slug;
            });

            if (foundPost) {
                const data = foundPost.data();
                const createdAt = data.createdAt?.toDate?.() || new Date();
                const dateStr = createdAt.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
                
                setPost({
                    id: foundPost.id,
                    title: data.title || '',
                    desc: data.desc || '',
                    image: data.imageUrl || '/visa/uploads/contents/main/default.webp',
                    date: dateStr,
                    readTime: '5 dk',
                    content: data.desc || '' // Content olarak desc kullanıyoruz
                });
            }
        } catch (error) {
            console.error('Blog yazısı çekilirken hata:', error);
        }
    };

    const fetchPopularPosts = async () => {
        try {
            const currentLang = (i18n.language || 'tr') as 'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru';
            const blogsRef = collection(db, getCollectionName('visablogs', currentLang));
            const q = query(blogsRef, orderBy('createdAt', 'desc'), limit(5));
            const snapshot = await getDocs(q);
            
            const posts = snapshot.docs.map(doc => {
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
            setPopularPosts([]);
        }
    };

    useEffect(() => {
        if (slug && typeof slug === 'string') {
            fetchPost();
            fetchPopularPosts();
        }
    }, [slug, i18n.language]);

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
                    font-size: 18px;
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
                                {popularPosts.map((popularPost, index) => (
                                    <Link
                                        key={popularPost.id}
                                        href={`/visa/blog/${popularPost.slug}`}
                                        className="popular-item"
                                    >
                                        <span className="popular-number">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="popular-title">{popularPost.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
