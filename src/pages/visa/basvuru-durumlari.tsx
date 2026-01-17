'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { db } from '../../lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { getCollectionName } from '../../lib/localization'
import '../../i18n'
import '../../styles/visa/BasvuruDurumlari.css'

interface VisaStatItem {
  id: string
  country: string
  applicationCount: number
  visaTypeText: string
}

export default function BasvuruDurumlariPage() {
    const { t, i18n } = useTranslation()
    const [tableData, setTableData] = useState<VisaStatItem[]>([])
    const [loading, setLoading] = useState(true)
    const shapesRef = useRef<HTMLDivElement>(null)

    // Fetch data from database
    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionName = getCollectionName('visaStats', i18n.language as 'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru')
                const q = query(collection(db, collectionName), orderBy('applicationCount', 'desc'))
                const querySnapshot = await getDocs(q)
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as VisaStatItem[]
                setTableData(data)
            } catch (error) {
                console.error('Error fetching visa stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [i18n.language])

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
                                            {loading ? (
                                                <tr>
                                                    <td colSpan={3} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                                                        Yükleniyor...
                                                    </td>
                                                </tr>
                                            ) : tableData.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                                                        Veri bulunamadı
                                                    </td>
                                                </tr>
                                            ) : (
                                                tableData.map((row, index) => (
                                                    <tr key={index}>
                                                        <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                                                            {row.country}
                                                        </td>
                                                        <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                                                            {row.applicationCount.toLocaleString()}
                                                        </td>
                                                        <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                                                            <p style={{ marginRight: 0, marginBottom: '10px', marginLeft: 0, padding: 0, border: 0 }}>
                                                                {row.visaTypeText}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
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
