'use client'

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../../styles/visa/NasilVizeAlirim.css';
import '../../i18n';

export default function NasilVizeAlirimPage() {
    const { t } = useTranslation();
    return (
        <div className="static-page">
            {/* Hero Section */}
            <section className="static-hero">
                <div className="hero-bg-shapes">
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
                                <Link href="/visa">{t('visa.pages.nasilVizeAlirim.breadcrumb')}</Link>
                                <span className="separator">/</span>
                                <span className="current">{t('visa.pages.nasilVizeAlirim.title')}</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">{t('visa.pages.nasilVizeAlirim.title')}</h1>

                            {/* CTA Button */}
                            <Link href="/visa/basvuru-yap" className="hero-cta">
                                <span>{t('visa.common.apply')}</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </div>

                        {/* Sağ Kolon: Görsel */}
                        <div className="hero-image">
                            <picture>
                                <img
                                    src="/visa/uploads/contents/cover/1766008916_298ef5002edaee39d925.png"
                                    alt={t('visa.pages.nasilVizeAlirim.title')}
                                />
                            </picture>
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
                                    <h2>{t('visa.pages.nasilVizeAlirim.whatIsVisa')}</h2>
                                    <p>
                                        {t('visa.pages.nasilVizeAlirim.whatIsVisaDesc1')}
                                    </p>
                                    <p>
                                        {t('visa.pages.nasilVizeAlirim.whatIsVisaDesc2')}
                                    </p>

                                    <h2>{t('visa.pages.nasilVizeAlirim.howToGetVisa')}</h2>
                                    <p>
                                        {t('visa.pages.nasilVizeAlirim.howToGetVisaDesc1')}
                                    </p>
                                    <p>
                                        {t('visa.pages.nasilVizeAlirim.howToGetVisaDesc2')}
                                    </p>

                                    <h2>{t('visa.pages.nasilVizeAlirim.workVisa')}</h2>
                                    <p>
                                        {t('visa.pages.nasilVizeAlirim.workVisaDesc1')}
                                    </p>
                                    <p>
                                        {t('visa.pages.nasilVizeAlirim.workVisaDesc2')}
                                    </p>

                                    <h2>{t('visa.pages.nasilVizeAlirim.travelVisa')}</h2>
                                    <p>
                                        {t('visa.pages.nasilVizeAlirim.travelVisaDesc1')}
                                    </p>
                                    <p>
                                        {t('visa.pages.nasilVizeAlirim.travelVisaDesc2')}
                                    </p>
                                </div>
                            </article>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}

