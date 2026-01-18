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

export default function YabancilaraTurkiyeDeOturumIzniPage() {
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
                                <span className="current">{t('visa.header.residencePermit')}</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">{t('visa.header.residencePermit')}</h1>
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
                                        {t('visa.pages.residencePermit.intro')}
                                    </p>

                                    {/* Tüm İçerik Tek Kutuda */}
                                    <div style={{ marginTop: '32px', padding: '32px', backgroundColor: '#F8F9FC', borderRadius: '8px', border: '1px solid #E8EAF0' }}>
                                        {/* Oturum İzni Türleri */}
                                        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.residencePermit.types.title')}
                                        </h2>
                                        <p style={{ marginBottom: '24px', lineHeight: '1.8', color: '#444' }}>
                                            {t('visa.pages.residencePermit.types.intro')}
                                        </p>

                                        {/* Kısa Dönem Oturum İzni */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <h3 style={{ marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                                {t('visa.pages.residencePermit.types.shortTerm.title')}
                                            </h3>
                                            <p style={{ marginBottom: '8px', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.shortTerm.whoFor')}:</strong> {t('visa.pages.residencePermit.types.shortTerm.whoForDesc')}
                                            </p>
                                            <p style={{ marginBottom: '8px', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.shortTerm.duration')}:</strong> {t('visa.pages.residencePermit.types.shortTerm.durationDesc')}
                                            </p>
                                            <p style={{ marginBottom: '0', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.shortTerm.documents')}:</strong> {t('visa.pages.residencePermit.types.shortTerm.documentsDesc')}
                                            </p>
                                        </div>

                                        {/* Aile İkamet İzni */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <h3 style={{ marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                                {t('visa.pages.residencePermit.types.family.title')}
                                            </h3>
                                            <p style={{ marginBottom: '8px', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.family.whoFor')}:</strong> {t('visa.pages.residencePermit.types.family.whoForDesc')}
                                            </p>
                                            <p style={{ marginBottom: '8px', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.family.duration')}:</strong> {t('visa.pages.residencePermit.types.family.durationDesc')}
                                            </p>
                                            <p style={{ marginBottom: '0', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.family.documents')}:</strong> {t('visa.pages.residencePermit.types.family.documentsDesc')}
                                            </p>
                                        </div>

                                        {/* Öğrenci İkamet İzni */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <h3 style={{ marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                                {t('visa.pages.residencePermit.types.student.title')}
                                            </h3>
                                            <p style={{ marginBottom: '8px', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.student.whoFor')}:</strong> {t('visa.pages.residencePermit.types.student.whoForDesc')}
                                            </p>
                                            <p style={{ marginBottom: '8px', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.student.duration')}:</strong> {t('visa.pages.residencePermit.types.student.durationDesc')}
                                            </p>
                                            <p style={{ marginBottom: '0', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.student.documents')}:</strong> {t('visa.pages.residencePermit.types.student.documentsDesc')}
                                            </p>
                                        </div>

                                        {/* Uzun Dönem Oturum İzni */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <h3 style={{ marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                                {t('visa.pages.residencePermit.types.longTerm.title')}
                                            </h3>
                                            <p style={{ marginBottom: '8px', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.longTerm.whoFor')}:</strong> {t('visa.pages.residencePermit.types.longTerm.whoForDesc')}
                                            </p>
                                            <p style={{ marginBottom: '8px', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.longTerm.duration')}:</strong> {t('visa.pages.residencePermit.types.longTerm.durationDesc')}
                                            </p>
                                            <p style={{ marginBottom: '0', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.longTerm.documents')}:</strong> {t('visa.pages.residencePermit.types.longTerm.documentsDesc')}
                                            </p>
                                        </div>

                                        {/* İnsani İkamet İzni */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <h3 style={{ marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                                {t('visa.pages.residencePermit.types.humanitarian.title')}
                                            </h3>
                                            <p style={{ marginBottom: '8px', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.humanitarian.whoFor')}:</strong> {t('visa.pages.residencePermit.types.humanitarian.whoForDesc')}
                                            </p>
                                            <p style={{ marginBottom: '8px', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.humanitarian.duration')}:</strong> {t('visa.pages.residencePermit.types.humanitarian.durationDesc')}
                                            </p>
                                            <p style={{ marginBottom: '0', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.humanitarian.documents')}:</strong> {t('visa.pages.residencePermit.types.humanitarian.documentsDesc')}
                                            </p>
                                        </div>

                                        {/* İş ve Çalışma İzni */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <h3 style={{ marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                                {t('visa.pages.residencePermit.types.work.title')}
                                            </h3>
                                            <p style={{ marginBottom: '8px', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.work.whoFor')}:</strong> {t('visa.pages.residencePermit.types.work.whoForDesc')}
                                            </p>
                                            <p style={{ marginBottom: '8px', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.work.duration')}:</strong> {t('visa.pages.residencePermit.types.work.durationDesc')}
                                            </p>
                                            <p style={{ marginBottom: '0', lineHeight: '1.8', color: '#444' }}>
                                                <strong>{t('visa.pages.residencePermit.types.work.documents')}:</strong> {t('visa.pages.residencePermit.types.work.documentsDesc')}
                                            </p>
                                        </div>

                                        {/* Başvuru Süreci */}
                                        <h2 style={{ marginTop: '40px', marginBottom: '24px', fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.residencePermit.applicationProcess.title')}
                                        </h2>

                                        <h3 style={{ marginTop: '24px', marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.residencePermit.applicationProcess.application.title')}
                                        </h3>
                                        <p style={{ marginBottom: '16px', lineHeight: '1.8', color: '#444' }}>
                                            {t('visa.pages.residencePermit.applicationProcess.application.description')}
                                        </p>

                                        <h3 style={{ marginTop: '24px', marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.residencePermit.applicationProcess.prepareDocuments.title')}
                                        </h3>
                                        <p style={{ marginBottom: '16px', lineHeight: '1.8', color: '#444' }}>
                                            {t('visa.pages.residencePermit.applicationProcess.prepareDocuments.description')}
                                        </p>

                                        <h3 style={{ marginTop: '24px', marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.residencePermit.applicationProcess.appointment.title')}
                                        </h3>
                                        <p style={{ marginBottom: '16px', lineHeight: '1.8', color: '#444' }}>
                                            {t('visa.pages.residencePermit.applicationProcess.appointment.description')}
                                        </p>

                                        <h3 style={{ marginTop: '24px', marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.residencePermit.applicationProcess.evaluation.title')}
                                        </h3>
                                        <p style={{ marginBottom: '16px', lineHeight: '1.8', color: '#444' }}>
                                            {t('visa.pages.residencePermit.applicationProcess.evaluation.description')}
                                        </p>

                                        <h3 style={{ marginTop: '24px', marginBottom: '12px', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.residencePermit.applicationProcess.card.title')}
                                        </h3>
                                        <p style={{ marginBottom: '24px', lineHeight: '1.8', color: '#444' }}>
                                            {t('visa.pages.residencePermit.applicationProcess.card.description')}
                                        </p>

                                        {/* Yenileme */}
                                        <h2 style={{ marginTop: '40px', marginBottom: '24px', fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.residencePermit.renewal.title')}
                                        </h2>
                                        <p style={{ marginBottom: '24px', lineHeight: '1.8', color: '#444' }}>
                                            {t('visa.pages.residencePermit.renewal.description')}
                                        </p>

                                        {/* İptal */}
                                        <h2 style={{ marginTop: '40px', marginBottom: '24px', fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.residencePermit.cancellation.title')}
                                        </h2>
                                        <p style={{ marginBottom: '24px', lineHeight: '1.8', color: '#444' }}>
                                            {t('visa.pages.residencePermit.cancellation.description')}
                                        </p>

                                        {/* Sonuç */}
                                        <h2 style={{ marginTop: '40px', marginBottom: '24px', fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                                            {t('visa.pages.residencePermit.conclusion.title')}
                                        </h2>
                                        <p style={{ marginBottom: '24px', lineHeight: '1.8', color: '#444' }}>
                                            {t('visa.pages.residencePermit.conclusion.description')}
                                        </p>

                                        {/* Not */}
                                        <div style={{ marginTop: '32px', padding: '20px', backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #E8EAF0' }}>
                                            <p style={{ margin: 0, lineHeight: '1.8', color: '#444', fontWeight: 500 }}>
                                                <strong>{t('visa.pages.residencePermit.note.title')}:</strong> {t('visa.pages.residencePermit.note.description')}
                                            </p>
                                        </div>
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
