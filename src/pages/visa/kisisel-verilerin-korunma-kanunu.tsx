'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import '../../styles/visa/VizeTablosu.css'

export default function KisiselVerilerinKorunmaKanunuPage() {
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
                                <Link href="/visa">{t('visa.common.home', 'Ana Sayfa')}</Link>
                                <span className="separator">/</span>
                                <span className="current">{t('visa.pages.kisiselVerilerinKorunmaKanunu.title', 'Kişisel Verilerin Korunması Kanunu')}</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">{t('visa.pages.kisiselVerilerinKorunmaKanunu.title', 'Kişisel Verilerin Korunması Kanunu')}</h1>
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
                                    {/* KVKK İçeriği */}
                                    <div>
                                        <h2>{t('visa.pages.kisiselVerilerinKorunmaKanunu.heading', 'KVKK')}</h2>
                                        <p>
                                            {t('visa.pages.kisiselVerilerinKorunmaKanunu.content', 'Prince Vize olarak, kişisel verilerinizin güvenliği bizim için önemlidir. 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verilerinizin işlenmesi, saklanması ve korunması konusunda gerekli tüm önlemleri almaktayız.')}
                                        </p>
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
