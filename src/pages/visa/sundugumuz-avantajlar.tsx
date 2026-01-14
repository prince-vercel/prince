'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import '../../styles/visa/SundugumuzAvantajlar.css'

export default function SundugumuzAvantajlarPage() {
    const shapesRef = useRef<HTMLDivElement>(null)

    // Parallax effect on hero shapes
    useEffect(() => {
        const shapes = shapesRef.current?.querySelectorAll('.shape')
        if (!shapes) return

        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset
                    shapes.forEach((shape, index) => {
                        const speed = (index + 1) * 0.03
                        ;(shape as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`
                    })
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="static-page">
            {/* Hero Section */}
            <section className="static-hero">
                <div className="hero-bg-shapes" ref={shapesRef}>
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
                                <span className="current">Sunduğumuz Avantajlar</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">Sunduğumuz Avantajlar</h1>

                            {/* CTA Button */}
                            <Link href="/visa/basvuru-yap" className="hero-cta">
                                <span>Başvurunuzu Başlatın</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                    <polyline points="12 5 19 12 12 19"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="static-main-content">
                <div className="container">
                    <div className="content-grid no-sidebar">
                        {/* Sağ İçerik Alanı */}
                        <main className="static-content">
                            <article className="content-article">
                                {/* Main Content */}
                                <div className="article-prose">
                                    <b>Schengen (VIP) Erken Randevu Hizmeti</b>
                                    <div>
                                        Çilek Vize olarak, Schengen bölgesine yapacağınız seyahatler için hızlı ve güvenilir vize randevuları sunuyoruz. Yunanistan, Fransa, Hollanda gibi Schengen ülkeleri için sadece 15 gün içinde randevu alabilmenizi sağlıyoruz. Macaristan ve Portekiz için ise bu süreyi 10 güne kadar indiriyoruz. Sunduğumuz VIP hizmetle, seyahat planlarınızı aksatmadan, en kısa sürede vize işlemlerinizi tamamlayabilirsiniz.
                                    </div>

                                    <b>Amerika (VIP) Erken Randevu Hizmeti</b>
                                    <div>
                                        Amerika Birleşik Devletleri'ne yapacağınız vize başvuruları için en uygun randevuyu almak artık çok daha kolay. 2025 ve sonrasına bırakılmış birçok vize randevusunu, 45 gün içinde öne çekme garantisi sunuyoruz. Amerika seyahatinizi ertelemeden, planladığınız tarihlerde yola çıkabilmeniz için profesyonel hizmet sağlıyoruz.
                                    </div>

                                    <b>Gelişmiş Randevu Sistemi</b>
                                    <div>
                                        Uzman ekibimizle 7/24 vize randevu sistemlerini aktif olarak takip ediyor, sizin için en uygun randevuyu bulmak adına sürekli çalışıyoruz. İstediğiniz randevuyu almanız için tüm süreçleri titizlikle yönetiyor ve size en iyi hizmeti sunuyoruz. Vize başvurularınızda zaman kaybetmeden, en hızlı şekilde ilerlemeniz için buradayız.
                                    </div>

                                    <b>Uzman Vize Ekibi</b>
                                    <div>
                                        Alanında uzman vize ekibiyle hizmet sunan Çilek Vize, size birçok avantaj sağlıyor.
                                    </div>

                                    <b>Online Danışmanlık</b>
                                    <div>
                                        Bursa'da bulunan ofisimiz ile sadece Bursa ve çevre illere değil, tüm Türkiye'ye online olarak hizmet edebiliyor, sürecinizi kolaylıkla yönetebiliyoruz.
                                    </div>

                                    <b>Kişiye Özel Danışmanlık</b>
                                    <div>
                                        Şirketimizde başvurusunu yaptığımız her ülke için ayrı bir vize uzmanı bulunmaktadır. Danışmanlık sürecinizi başlattıktan sonra ilgili vize uzmanımız atamanızı gerçekleştirdikten sonra, sizleri arayarak ön bilgilendirme yaparlar ve süreciniz başlamış olur.
                                    </div>

                                    <b>Zaman Tasarrufu</b>
                                    <div>
                                        Uzman ekibimiz ile görüştükten sonra vize sonucu beklemek dışında hiçbir evrak işiyle uğraşmıyorsunuz. Siz bize hayallerinizi anlatın, günlük rutininizi bozmadan işlerinizi halledelim!
                                    </div>

                                    <b>Alternatif Vize Çözümleri</b>
                                    <div>
                                        İsteklerinize ve mesleğinize en uygun vize türünü belirleyebiliyoruz.
                                    </div>

                                    <b>Dil Desteği</b>
                                    <div>
                                        Tercümesi zorunlu belgeler için yeminli tercümanımız ek ücretle tercüme işlemlerinizi yapmaktadır.
                                    </div>

                                    <b>Yurt Dışı Eğitim</b>
                                    <div>
                                        Turistik ve birçok alanda vize hizmeti sunan Çilek Vize, Amerika, Kanada, Malta ve birçok ülkede eğitim alma şansı sunuyor!
                                    </div>
                                </div>
                            </article>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    )
}
