'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import '../../styles/visa/BasvuruDurumlari.css'

// Tablo verileri
const tableData = [
    {
        country: 'Almanya',
        applications: '2.453',
        rates: '%57 Turist - %24 Çalışma - %11 Akraba Ziyareti - %8 Ticari'
    },
    {
        country: 'İtalya',
        applications: '2.184',
        rates: '%78 Turist - %2 Çalışma - %6 Arkadaş - %14 Eğitim'
    },
    {
        country: 'Fransa',
        applications: '2.061',
        rates: '%45 Turist - %35 Çalışma - %18 Arkadaş Ziyareti - %2 Ticari'
    },
    {
        country: 'Hollanda',
        applications: '1.874',
        rates: '%82 Turist - %1 Çalışma - %14 Arkadaş Ziyareti - %3 Ticari'
    },
    {
        country: 'Yunanistan',
        applications: '1.799',
        rates: '%95 Turist - %5 Ticari'
    },
    {
        country: 'Amerika',
        applications: '1.784',
        rates: '%99 Turist - %1 Diğer'
    },
    {
        country: 'Kanada',
        applications: '1.619',
        rates: '%84 Turist - %10 Ticari - %6 Diğer'
    },
    {
        country: 'İngiltere',
        applications: '1.120',
        rates: '%65 Turist - %17 Eğitim - %15 Ticari - %3 Diğer'
    },
    {
        country: 'İspanya',
        applications: '1.403',
        rates: '%72 Turist - %19 Ticari - %9 Diğer'
    },
    {
        country: 'Polonya',
        applications: '964',
        rates: '%38 Turist - %44 Çalışma - %16 Eğitim %2 Diğer'
    },
    {
        country: 'Avustralya',
        applications: '911',
        rates: '%45 Turist - %45 Eğitim - %10 Diğer'
    },
    {
        country: 'Dubai',
        applications: '1.814',
        rates: '%100 Turist - %100 Başarı Oranı'
    },
    {
        country: 'Rusya',
        applications: '624',
        rates: '%100 Turist - %100 Başarı Oranı'
    },
    {
        country: 'Belçika',
        applications: '720',
        rates: '%50 Turist - %24 Arkadaş Ziyareti - %26 Diğer'
    },
    {
        country: 'Avusturya',
        applications: '1.180',
        rates: '%25 Turist- % 63 Arkadaş Ziyareti - %12 Diğer'
    },
    {
        country: 'Macaristan',
        applications: '627',
        rates: '%65 Turist - %18 Ticari - %5 Eğitim - %12 Diğer'
    },
    {
        country: 'Portekiz',
        applications: '328',
        rates: '%90 Turist - %10 Diğer'
    }
]

export default function BasvuruDurumlariPage() {
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
                                <Link href="/visa">Ana Sayfa</Link>
                                <span className="separator">/</span>
                                <span className="current">Vize Başvuru Başarı Oranları</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">Vize Başvuru Başarı Oranları</h1>

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
                                    <table border={1} cellPadding={1} cellSpacing={1} style={{ margin: 0, padding: 0, border: 0, width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                                                    <b>Ülkeler</b>
                                                </td>
                                                <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                                                    <b>Başvuru</b> <b>Sayısı</b>
                                                </td>
                                                <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                                                    <b>Başvuru Yapılan</b> <b>Vize Türü</b> <b>Oranı</b>
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
                                        <b>Veriler 6 aylık olarak güncellenmektedir.</b>
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
