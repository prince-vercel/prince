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

export default function TirciVizesiPage() {
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
                                <span className="current">{t('visa.header.tirDriverVisa')}</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">{t('visa.header.tirDriverVisa')}</h1>
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
                                        {t('visa.pages.tirDriverVisa.intro')}
                                    </p>

                                    {/* Genel Bilgilendirme */}
                                    <h2 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                                        {t('visa.pages.tirDriverVisa.generalInfo.title')}
                                    </h2>
                                    <p style={{ marginBottom: '24px', lineHeight: '1.8', color: '#444' }}>
                                        {t('visa.pages.tirDriverVisa.generalInfo.description')}
                                    </p>

                                    {/* Vize Türü ve Başvuru Koşulları */}
                                    <h2 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                                        {t('visa.pages.tirDriverVisa.visaType.title')}
                                    </h2>

                                    <h3 style={{ marginTop: '24px', marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                        {t('visa.pages.tirDriverVisa.visaType.typeC.title')}
                                    </h3>
                                    <p style={{ marginBottom: '16px', lineHeight: '1.8', color: '#444' }}>
                                        {t('visa.pages.tirDriverVisa.visaType.typeC.description')}
                                    </p>

                                    <h3 style={{ marginTop: '24px', marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                        {t('visa.pages.tirDriverVisa.visaType.typeD.title')}
                                    </h3>
                                    <p style={{ marginBottom: '24px', lineHeight: '1.8', color: '#444' }}>
                                        {t('visa.pages.tirDriverVisa.visaType.typeD.description')}
                                    </p>

                                    {/* Gerekli Belgeler */}
                                    <h2 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                                        {t('visa.pages.tirDriverVisa.requiredDocuments.title')}
                                    </h2>
                                    <ul style={{ paddingLeft: '24px', lineHeight: '1.8', color: '#444', marginBottom: '24px' }}>
                                        <li style={{ marginBottom: '8px' }}>
                                            <strong>{t('visa.pages.tirDriverVisa.requiredDocuments.passport.title')}:</strong> {t('visa.pages.tirDriverVisa.requiredDocuments.passport.description')}
                                        </li>
                                        <li style={{ marginBottom: '8px' }}>
                                            <strong>{t('visa.pages.tirDriverVisa.requiredDocuments.applicationForm.title')}:</strong> {t('visa.pages.tirDriverVisa.requiredDocuments.applicationForm.description')}
                                        </li>
                                        <li style={{ marginBottom: '8px' }}>
                                            <strong>{t('visa.pages.tirDriverVisa.requiredDocuments.photo.title')}:</strong> {t('visa.pages.tirDriverVisa.requiredDocuments.photo.description')}
                                        </li>
                                        <li style={{ marginBottom: '8px' }}>
                                            <strong>{t('visa.pages.tirDriverVisa.requiredDocuments.workCertificate.title')}:</strong> {t('visa.pages.tirDriverVisa.requiredDocuments.workCertificate.description')}
                                        </li>
                                        <li style={{ marginBottom: '8px' }}>
                                            <strong>{t('visa.pages.tirDriverVisa.requiredDocuments.invitation.title')}:</strong> {t('visa.pages.tirDriverVisa.requiredDocuments.invitation.description')}
                                        </li>
                                        <li style={{ marginBottom: '8px' }}>
                                            <strong>{t('visa.pages.tirDriverVisa.requiredDocuments.insurance.title')}:</strong> {t('visa.pages.tirDriverVisa.requiredDocuments.insurance.description')}
                                        </li>
                                        <li style={{ marginBottom: '8px' }}>
                                            <strong>{t('visa.pages.tirDriverVisa.requiredDocuments.vehicleDocuments.title')}:</strong> {t('visa.pages.tirDriverVisa.requiredDocuments.vehicleDocuments.description')}
                                        </li>
                                        <li style={{ marginBottom: '8px' }}>
                                            <strong>{t('visa.pages.tirDriverVisa.requiredDocuments.workPermit.title')}:</strong> {t('visa.pages.tirDriverVisa.requiredDocuments.workPermit.description')}
                                        </li>
                                    </ul>

                                    {/* Başvuru Süreci */}
                                    <h2 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                                        {t('visa.pages.tirDriverVisa.applicationProcess.title')}
                                    </h2>
                                    <p style={{ marginBottom: '24px', lineHeight: '1.8', color: '#444' }}>
                                        {t('visa.pages.tirDriverVisa.applicationProcess.description')}
                                    </p>

                                    {/* Vize Süresi ve Yenileme */}
                                    <h2 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                                        {t('visa.pages.tirDriverVisa.visaDuration.title')}
                                    </h2>
                                    <p style={{ marginBottom: '24px', lineHeight: '1.8', color: '#444' }}>
                                        {t('visa.pages.tirDriverVisa.visaDuration.description')}
                                    </p>

                                    {/* Özel Durumlar */}
                                    <h2 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                                        {t('visa.pages.tirDriverVisa.specialCases.title')}
                                    </h2>
                                    <p style={{ marginBottom: '24px', lineHeight: '1.8', color: '#444' }}>
                                        {t('visa.pages.tirDriverVisa.specialCases.description')}
                                    </p>

                                    {/* Not Bölümü */}
                                    <div style={{ marginTop: '40px', padding: '24px', backgroundColor: '#F8F9FC', borderRadius: '8px', border: '1px solid #E8EAF0' }}>
                                        <p style={{ margin: 0, lineHeight: '1.8', color: '#444', fontWeight: 500 }}>
                                            <strong>{t('visa.pages.tirDriverVisa.note.title')}:</strong> {t('visa.pages.tirDriverVisa.note.description')}
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
