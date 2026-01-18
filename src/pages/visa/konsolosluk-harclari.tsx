/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import '../../styles/visa/VizeTablosu.css'

declare global {
    interface Window {
        grecaptcha: any;
        Swal: any;
    }
}

export default function KonsoloslukHarclariPage() {
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
                                <Link href="/visa">{t('visa.common.home')}</Link>
                                <span className="separator">/</span>
                                <span className="current">{t('visa.header.consularFees')}</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">{t('visa.header.consularFees')}</h1>
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
                                    {/* Giriş Paragrafı */}
                                    <p style={{ marginBottom: '24px', lineHeight: '1.8', color: '#444' }}>
                                        {t('visa.pages.consularFees.intro')}
                                    </p>

                                    {/* Başlık */}
                                    <h2 style={{ marginTop: '32px', marginBottom: '24px', fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                                        {t('visa.pages.consularFees.title')}
                                    </h2>

                                    {/* Schengen Vizesi */}
                                    <div style={{ marginBottom: '32px' }}>
                                        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.consularFees.schengen.title')}
                                        </h3>
                                        <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: '#444' }}>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.schengen.adults')}
                                            </li>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.schengen.children6to12')}
                                            </li>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.schengen.childrenUnder6')}
                                            </li>
                                        </ul>
                                    </div>

                                    {/* ABD Vizesi */}
                                    <div style={{ marginBottom: '32px' }}>
                                        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.consularFees.usa.title')}
                                        </h3>
                                        <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: '#444' }}>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.usa.b1b2')}
                                            </li>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.usa.f1')}
                                            </li>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.usa.h1b')}
                                            </li>
                                        </ul>
                                    </div>

                                    {/* İngiltere Vizesi */}
                                    <div style={{ marginBottom: '32px' }}>
                                        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.consularFees.uk.title')}
                                        </h3>
                                        <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: '#444' }}>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.uk.standard6months')}
                                            </li>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.uk.twoYear')}
                                            </li>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.uk.fiveYear')}
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Kanada Vizesi */}
                                    <div style={{ marginBottom: '32px' }}>
                                        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.consularFees.canada.title')}
                                        </h3>
                                        <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: '#444' }}>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.canada.singleEntry')}
                                            </li>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.canada.multipleEntry')}
                                            </li>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.canada.family')}
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Avustralya Vizesi */}
                                    <div style={{ marginBottom: '32px' }}>
                                        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.consularFees.australia.title')}
                                        </h3>
                                        <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: '#444' }}>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.australia.evisitor')}
                                            </li>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.australia.visitor')}
                                            </li>
                                            <li style={{ marginBottom: '8px' }}>
                                                {t('visa.pages.consularFees.australia.workHoliday')}
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Notlar Bölümü */}
                                    <div style={{ marginTop: '40px', padding: '24px', backgroundColor: '#F8F9FC', borderRadius: '8px', border: '1px solid #E8EAF0' }}>
                                        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.consularFees.notes.title')}
                                        </h3>
                                        <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: '#444', margin: 0 }}>
                                            <li style={{ marginBottom: '12px' }}>
                                                {t('visa.pages.consularFees.notes.note1')}
                                            </li>
                                            <li style={{ marginBottom: '12px' }}>
                                                {t('visa.pages.consularFees.notes.note2')}
                                            </li>
                                            <li style={{ marginBottom: '12px' }}>
                                                {t('visa.pages.consularFees.notes.note3')}
                                            </li>
                                            <li style={{ marginBottom: '12px' }}>
                                                {t('visa.pages.consularFees.notes.note4')}
                                            </li>
                                            <li style={{ marginBottom: '0' }}>
                                                {t('visa.pages.consularFees.notes.note5')}
                                            </li>
                                        </ul>
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
