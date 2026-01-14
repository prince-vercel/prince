'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../styles/visa/SSS.css'
import '../../i18n'

interface FAQItem {
    question: string
    answer: string
}

export default function SSSPage() {
    const { t } = useTranslation()
    const faqs: FAQItem[] = t('visa.faq.questions', { returnObjects: true }) as FAQItem[]
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="sss-page">
            {/* Hero Section */}
            <section className="sss-hero">
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
                                <Link href="/visa">{t('visa.pages.sss.breadcrumb')}</Link>
                                <span className="separator">/</span>
                                <span className="current">{t('visa.pages.sss.title')}</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">{t('visa.pages.sss.title')}</h1>
                            <p className="hero-subtitle">
                                {t('visa.pages.sss.subtitle')}
                            </p>

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
                                    alt={t('visa.pages.sss.title')}
                                />
                            </picture>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="sss-main-content">
                <div className="container">
                    <div className="section-head" data-scroll-animation>
                        <span className="heading-2 colorfull font-bold">{t('visa.faq.title')}</span>
                    </div>
                    <div className="main-inner">
                        <div className="accordion">
                            {faqs.map((faq, index) => (
                                <div key={index}>
                                    <button
                                        className={`btn-accordion heading-4 ${openIndex === index ? 'active' : ''}`}
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <span className="heading-4">{faq.question}</span>
                                        <span className="accordion-icon">
                                            <Image
                                                src="/visa/assets/img/icon/accordion-caret.svg"
                                                width={6}
                                                height={9}
                                                alt="Caret Down"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </span>
                                    </button>
                                    {openIndex === index && (
                                        <div className="accordion-inner">
                                            <div className="body-sm">
                                                <p>{faq.answer}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
