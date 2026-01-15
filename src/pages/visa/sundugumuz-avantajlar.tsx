'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import '../../styles/visa/SundugumuzAvantajlar.css'

export default function SundugumuzAvantajlarPage() {
    const { t, i18n } = useTranslation()
    const shapesRef = useRef<HTMLDivElement>(null)

    const advantages = useMemo(() => {
        return t('visa.pages.sundugumuzAvantajlar.advantages', { returnObjects: true }) as Array<{ title: string; description: string }>
    }, [t, i18n.language])

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
                                <Link href="/visa">{t('visa.pages.sundugumuzAvantajlar.breadcrumb')}</Link>
                                <span className="separator">/</span>
                                <span className="current">{t('visa.pages.sundugumuzAvantajlar.title')}</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">{t('visa.pages.sundugumuzAvantajlar.title')}</h1>

                            {/* CTA Button */}
                            <Link href="/visa/basvuru-yap" className="hero-cta">
                                <span>{t('visa.common.apply')}</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
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
                                    {advantages.map((advantage, index) => (
                                        <div key={index} style={{ marginBottom: '20px' }}>
                                            <b>{advantage.title}</b>
                                            <div>
                                                {advantage.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    )
}
