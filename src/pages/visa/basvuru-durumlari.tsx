'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import '../../styles/visa/BasvuruDurumlari.css'

export default function BasvuruDurumlariPage() {
    const { t, i18n } = useTranslation()

    // Tablo verileri
    const tableData = useMemo(() => [
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.germany.country', 'Almanya'),
            applications: '2.453',
            rates: t('visa.pages.basvuruDurumlari.table.rows.germany.rates', '%57 Turist - %24 Çalışma - %11 Akraba Ziyareti - %8 Ticari')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.italy.country', 'İtalya'),
            applications: '2.184',
            rates: t('visa.pages.basvuruDurumlari.table.rows.italy.rates', '%78 Turist - %2 Çalışma - %6 Arkadaş - %14 Eğitim')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.france.country', 'Fransa'),
            applications: '2.061',
            rates: t('visa.pages.basvuruDurumlari.table.rows.france.rates', '%45 Turist - %35 Çalışma - %18 Arkadaş Ziyareti - %2 Ticari')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.netherlands.country', 'Hollanda'),
            applications: '1.874',
            rates: t('visa.pages.basvuruDurumlari.table.rows.netherlands.rates', '%82 Turist - %1 Çalışma - %14 Arkadaş Ziyareti - %3 Ticari')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.greece.country', 'Yunanistan'),
            applications: '1.799',
            rates: t('visa.pages.basvuruDurumlari.table.rows.greece.rates', '%95 Turist - %5 Ticari')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.usa.country', 'Amerika'),
            applications: '1.784',
            rates: t('visa.pages.basvuruDurumlari.table.rows.usa.rates', '%99 Turist - %1 Diğer')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.canada.country', 'Kanada'),
            applications: '1.619',
            rates: t('visa.pages.basvuruDurumlari.table.rows.canada.rates', '%84 Turist - %10 Ticari - %6 Diğer')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.uk.country', 'İngiltere'),
            applications: '1.120',
            rates: t('visa.pages.basvuruDurumlari.table.rows.uk.rates', '%65 Turist - %17 Eğitim - %15 Ticari - %3 Diğer')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.spain.country', 'İspanya'),
            applications: '1.403',
            rates: t('visa.pages.basvuruDurumlari.table.rows.spain.rates', '%72 Turist - %19 Ticari - %9 Diğer')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.poland.country', 'Polonya'),
            applications: '964',
            rates: t('visa.pages.basvuruDurumlari.table.rows.poland.rates', '%38 Turist - %44 Çalışma - %16 Eğitim %2 Diğer')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.australia.country', 'Avustralya'),
            applications: '911',
            rates: t('visa.pages.basvuruDurumlari.table.rows.australia.rates', '%45 Turist - %45 Eğitim - %10 Diğer')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.dubai.country', 'Dubai'),
            applications: '1.814',
            rates: t('visa.pages.basvuruDurumlari.table.rows.dubai.rates', '%100 Turist - %100 Başarı Oranı')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.russia.country', 'Rusya'),
            applications: '624',
            rates: t('visa.pages.basvuruDurumlari.table.rows.russia.rates', '%100 Turist - %100 Başarı Oranı')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.belgium.country', 'Belçika'),
            applications: '720',
            rates: t('visa.pages.basvuruDurumlari.table.rows.belgium.rates', '%50 Turist - %24 Arkadaş Ziyareti - %26 Diğer')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.austria.country', 'Avusturya'),
            applications: '1.180',
            rates: t('visa.pages.basvuruDurumlari.table.rows.austria.rates', '%25 Turist- % 63 Arkadaş Ziyareti - %12 Diğer')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.hungary.country', 'Macaristan'),
            applications: '627',
            rates: t('visa.pages.basvuruDurumlari.table.rows.hungary.rates', '%65 Turist - %18 Ticari - %5 Eğitim - %12 Diğer')
        },
        {
            country: t('visa.pages.basvuruDurumlari.table.rows.portugal.country', 'Portekiz'),
            applications: '328',
            rates: t('visa.pages.basvuruDurumlari.table.rows.portugal.rates', '%90 Turist - %10 Diğer')
        }
    ], [t, i18n.language])
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

    // Table responsive wrapper
    useEffect(() => {
        const textContainers = document.querySelectorAll('.article-prose')
        textContainers.forEach((container) => {
            const tables = container.querySelectorAll('table')
            tables.forEach((table) => {
                if (!table.parentElement?.classList.contains('table-responsive')) {
                    const wrapper = document.createElement('div')
                    wrapper.className = 'table-responsive'
                    table.parentNode?.insertBefore(wrapper, table)
                    wrapper.appendChild(table)
                }
            })
        })
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
                                <Link href="/visa">{t('visa.pages.basvuruDurumlari.breadcrumb')}</Link>
                                <span className="separator">/</span>
                                <span className="current">{t('visa.pages.basvuruDurumlari.title')}</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">{t('visa.pages.basvuruDurumlari.title')}</h1>

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
                                    <table border={1} cellPadding={1} cellSpacing={1} style={{ margin: 0, padding: 0, border: 0, width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                                                    <b>{t('visa.pages.basvuruDurumlari.table.country')}</b>
                                                </td>
                                                <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                                                    <b>{t('visa.pages.basvuruDurumlari.table.applications')}</b>
                                                </td>
                                                <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                                                    <b>{t('visa.pages.basvuruDurumlari.table.rates')}</b>
                                                </td>
                                            </tr>
                                            {tableData.map((row, index) => (
                                                <tr key={index}>
                                                    <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                                                        {row.country}
                                                    </td>
                                                    <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                                                        {row.applications}
                                                    </td>
                                                    <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                                                        <p style={{ marginRight: 0, marginBottom: '10px', marginLeft: 0, padding: 0, border: 0 }}>
                                                            {row.rates}
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p style={{ textAlign: 'center', marginRight: 0, marginBottom: '10px', marginLeft: 0, padding: 0, border: 0 }}>
                                        <b><br /></b>
                                    </p>
                                    <p style={{ textAlign: 'center', marginRight: 0, marginBottom: '10px', marginLeft: 0, padding: 0, border: 0 }}>
                                        <b>{t('visa.pages.basvuruDurumlari.table.updateNote', 'Veriler 6 aylık olarak güncellenmektedir.')}</b>
                                    </p>
                                </div>
                            </article>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    )
}
