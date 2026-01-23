'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import '../../styles/visa/VizeTablosu.css'

export default function GizlilikPolitikasiPage() {
    const { t } = useTranslation()
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
                            ; (shape as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`
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
                                <Link href="/visa">{t('visa.common.home', 'Ana Sayfa')}</Link>
                                <span className="separator">/</span>
                                <span className="current">{t('visa.pages.gizlilikPolitikasi.title', 'Gizlilik Politikası')}</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">{t('visa.pages.gizlilikPolitikasi.title', 'Gizlilik Politikası')}</h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="static-main-content">
                <div className="container">
                    <div className="content-grid no-sidebar">
                        {/* İçerik Alanı */}
                        <main className="static-content">
                            <article className="content-article">
                                {/* Main Content */}
                                <div className="article-prose">
                                    {/* Giriş Metni */}
                                    <div style={{ marginBottom: '32px' }}>
                                        <p style={{ fontSize: '16px', color: '#4A4A68', marginBottom: '16px' }}>
                                            <strong>{t('visa.pages.gizlilikPolitikasi.companyName', 'PRINCE GRUP DANIŞMANLIK TURİZM SEYAHAT EĞİTİM MEDYA SANAYİ VE TİCARET LİMİTED ŞİRKETİ')}</strong>
                                        </p>
                                        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A2E', marginBottom: '16px' }}>
                                            {t('visa.pages.gizlilikPolitikasi.mainTitle', 'Kurumsal Bilgilendirme ve Gizlilik Politikası')}
                                        </h2>
                                        <p style={{ marginBottom: '16px' }}>
                                            {t('visa.pages.gizlilikPolitikasi.intro1', 'PRINCE GRUP DANIŞMANLIK TURİZM SEYAHAT EĞİTİM MEDYA SANAYİ VE TİCARET LİMİTED ŞİRKETİ ("Prince Vize" olarak anılacaktır), vize danışmanlığı ve seyahat hizmetleri alanında faaliyet göstermekte olup, müşterilerinin kişisel verilerinin gizliliğine ve güvenliğine büyük önem vermektedir.')}
                                        </p>
                                        <p>
                                            {t('visa.pages.gizlilikPolitikasi.intro2', 'Bu metin; web sitemiz, dijital formlarımız, telefon görüşmeleri ve reklam kanalları aracılığıyla toplanan kişisel verilerin hangi amaçlarla İşlendiğini, nasıl korunduğunu ve haklarınızı açıklamak amacıyla hazırlanmıştır.')}
                                        </p>
                                    </div>

                                    {/* 1. Toplanan Kişisel Veriler */}
                                    <h2>{t('visa.pages.gizlilikPolitikasi.section1.title', '1. Toplanan Kişisel Veriler')}</h2>
                                    <p>{t('visa.pages.gizlilikPolitikasi.section1.intro', 'Tarafımızca aşağıdaki kişisel veriler işlenebilmektedir:')}</p>
                                    <ul>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section1.item1', 'Ad ve soyad')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section1.item2', 'Telefon numarası')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section1.item3', 'E-posta adresi')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section1.item4', 'Başvurulan vize türü ve ülke bilgisi')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section1.item5', 'Şube tercihi (İzmir, Bursa vb.)')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section1.item6', 'Talep ve mesaj içerikleri')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section1.item7', 'Web sitesi ve reklam kaynaklı teknik veriler (UTM, cihaz türü vb.)')}</li>
                                    </ul>

                                    {/* 2. Kişisel Verilerin Toplanma Yöntemi */}
                                    <h2>{t('visa.pages.gizlilikPolitikasi.section2.title', '2. Kişisel Verilerin Toplanma Yöntemi')}</h2>
                                    <p>{t('visa.pages.gizlilikPolitikasi.section2.intro', 'Kişisel verileriniz;')}</p>
                                    <ul>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section2.item1', 'Web sitemizde yer alan başvuru ve bilgi formları')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section2.item2', 'Google Ads reklamları (arama, telefon, form uzantıları)')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section2.item3', 'Telefon görüşmeleri')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section2.item4', 'WhatsApp ve diğer iletişim kanalları')}</li>
                                    </ul>
                                    <p>{t('visa.pages.gizlilikPolitikasi.section2.outro', 'aracılığıyla otomatik veya kısmen otomatik yollarla toplanmaktadır.')}</p>

                                    {/* 3. Kişisel Verilerin İşlenme Amaçları */}
                                    <h2>{t('visa.pages.gizlilikPolitikasi.section3.title', '3. Kişisel Verilerin İşlenme Amaçları')}</h2>
                                    <p>{t('visa.pages.gizlilikPolitikasi.section3.intro', 'Toplanan kişisel verileriniz:')}</p>
                                    <ul>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section3.item1', 'Vize danışmanlığı hizmeti sunulması')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section3.item2', 'Randevu sürecinin başlatılması ve takibi')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section3.item3', 'Talep edilen hizmet hakkında bilgilendirme yapılması')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section3.item4', 'Telefon ile geri dönüş sağlanması')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section3.item5', 'Hizmet kalitesinin artırılması')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section3.item6', 'Yasal yükümlülüklerin yerine getirilmesi')}</li>
                                    </ul>
                                    <p>{t('visa.pages.gizlilikPolitikasi.section3.outro', 'amaçlarıyla sınırlı olarak işlenmektedir.')}</p>

                                    {/* 4. Kişisel Verilerin Korunması */}
                                    <h2>{t('visa.pages.gizlilikPolitikasi.section4.title', '4. Kişisel Verilerin Korunması')}</h2>
                                    <p><strong>{t('visa.pages.gizlilikPolitikasi.section4.brand', 'Prince Vize:')}</strong></p>
                                    <ul>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section4.item1', 'Kişisel verilerin yetkisiz erişime karşı korunması')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section4.item2', 'Veri güvenliğinin sağlanması')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section4.item3', 'Hukuka aykırı kullanımların önlenmesi')}</li>
                                    </ul>
                                    <p>{t('visa.pages.gizlilikPolitikasi.section4.outro1', 'amacıyla gerekli tüm teknik ve idari tedbirleri almaktadır.')}</p>
                                    <p style={{ marginTop: '16px' }}>
                                        {t('visa.pages.gizlilikPolitikasi.section4.outro2', 'Kişisel verileriniz, üçüncü kişilerle İzinsiz paylaşılmaz, yalnızca yasal zorunluluklar veya hizmetin gereği halinde paylaşılabilir.')}
                                    </p>

                                    {/* 5. KVKK Kapsamındaki Haklarınız */}
                                    <h2>{t('visa.pages.gizlilikPolitikasi.section5.title', '5. KVKK Kapsamındaki Haklarınız')}</h2>
                                    <p>{t('visa.pages.gizlilikPolitikasi.section5.intro', '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında;')}</p>
                                    <ul>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section5.item1', 'Kişisel verilerinizin işlenip işlenmediğini öğrenme')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section5.item2', 'İşlenmişse buna ilişkin bilgi talep etme')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section5.item3', 'Yanlış veya eksik işlenmiş verilerin düzeltilmesini isteme')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section5.item4', 'Verilerin silinmesini veya yok edilmesini talep etme')}</li>
                                        <li>{t('visa.pages.gizlilikPolitikasi.section5.item5', 'İşlemenin kanuna aykırı olması halinde zararın giderilmesini talep etme')}</li>
                                    </ul>
                                    <p>{t('visa.pages.gizlilikPolitikasi.section5.outro1', 'haklarına sahipsiniz.')}</p>
                                    <p style={{ marginTop: '16px' }}>
                                        {t('visa.pages.gizlilikPolitikasi.section5.outro2', 'Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.')}
                                    </p>

                                    {/* 6. İletişim Bilgileri */}
                                    <h2>{t('visa.pages.gizlilikPolitikasi.section6.title', '6. İletişim Bilgileri')}</h2>
                                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                        <li style={{ marginBottom: '12px' }}>
                                            <strong>{t('visa.pages.gizlilikPolitikasi.section6.label1', 'Şirket Ünvanı:')}</strong> {t('visa.pages.gizlilikPolitikasi.companyName', 'PRINCE GRUP DANIŞMANLIK TURİZM SEYAHAT EĞİTİM MEDYA SANAYİ VE TİCARET LİMİTED ŞİRKETİ')}
                                        </li>
                                        <li style={{ marginBottom: '12px' }}>
                                            <strong>{t('visa.pages.gizlilikPolitikasi.section6.label2', 'Marka:')}</strong> {t('visa.pages.gizlilikPolitikasi.section6.brand', 'Prince Vize')}
                                        </li>
                                        <li style={{ marginBottom: '12px' }}>
                                            <strong>{t('visa.pages.gizlilikPolitikasi.section6.label3', 'Web:')}</strong>{' '}
                                            <a
                                                href="https://www.cilekvize.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#C42127', textDecoration: 'none', borderBottom: '1px solid rgba(196, 33, 39, 0.3)' }}
                                            >
                                                https://www.cilekvize.com
                                            </a>
                                        </li>
                                        <li style={{ marginBottom: '12px' }}>
                                            <strong>{t('visa.pages.gizlilikPolitikasi.section6.label4', 'Telefon:')}</strong> 0850 888 70 71
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    )
}
