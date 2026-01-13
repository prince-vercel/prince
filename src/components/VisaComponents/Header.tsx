'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function VisaHeader() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Search overlay açıkken body scroll'unu engelle
    useEffect(() => {
        if (isSearchOpen || isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isSearchOpen, isMobileMenuOpen])


    const countries = [
        { title: 'İngiltere', href: '/visa/vize-basvurusu/ingiltere' },
        { title: 'Almanya', href: '/visa/vize-basvurusu/almanya' },
        { title: 'Fransa', href: '/visa/vize-basvurusu/fransa' },
        { title: 'Kanada', href: '/visa/vize-basvurusu/kanada' },
        { title: 'ABD', href: '/visa/vize-basvurusu/abd' },
    ]

    const otherLinks = [
        { title: 'Hakkımızda', href: '/visa/hakkimizda' },
        { title: 'Vize Tablosu', href: '/visa/vize-tablosu' },
        { title: 'Marka Kataloglarımız ve Sözleşmelerimiz', href: '/visa/marka-kataloglarimiz' },
        { title: 'Vize Başvuru Başarı Oranları', href: '/visa/basvuru-durumlari' },
        { title: 'Sunduğumuz Avantajlar', href: '/visa/sundugumuz-avantajlar' },
        { title: 'Garantili Vize Aldığımız Ülkeler', href: '/visa/garantili-vize-aldigimiz-ulkeler' },
        { title: 'Nasıl Vize Alırım?', href: '/visa/nasil-vize-alirim' },
        { title: 'Tırcı ( Şöför ) Vizesi', href: '/visa/tirci-sofor-vizesi' },
        { title: 'Konsolosluk Harçları', href: '/visa/konsolosluk-ve-araci-kurum-odemeleri' },
        { title: 'Yabancılara Türkiye Oturum İzni', href: '/visa/yabancilara-turkiye-de-oturum-izni' },
        { title: 'İletişim', href: '/visa/iletisim' },
        { title: 'Sıkça Sorulan Sorular', href: '/visa/sss' },
    ]

    const branches = [
        { title: 'Bursa Genel Merkez', href: '/visa/subelerimiz/bursa' },
        { title: 'Ankara', href: '/visa/subelerimiz/ankara' },
        { title: 'İzmir', href: '/visa/subelerimiz/izmir' },
        { title: 'İstanbul Mecidiyeköy', href: '/visa/subelerimiz/istanbul' },
        { title: 'Mersin', href: '/visa/subelerimiz/mersin' },
    ]

    // main.js'teki header script'lerini başlat
    useEffect(() => {
        // main.js yüklenene kadar bekle
        const initHeader = () => {
            if (typeof window !== 'undefined' && (window as any).app?.header?.init) {
                (window as any).app.header.init()
            } else {
                // Eğer app henüz yüklenmemişse, DOMContentLoaded'ı bekle
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', initHeader)
                } else {
                    // Script yüklenene kadar bekle
                    setTimeout(initHeader, 100)
                }
            }
        }

        // Script yüklenmesini kontrol et
        const checkScript = setInterval(() => {
            if (typeof window !== 'undefined' && (window as any).app?.header) {
                clearInterval(checkScript)
                initHeader()
            }
        }, 50)

        // 5 saniye sonra timeout
        setTimeout(() => {
            clearInterval(checkScript)
        }, 5000)

        return () => {
            clearInterval(checkScript)
        }
    }, [])

    // Overlay ve mega-menu için hover event'leri (CSS animasyonları için)
    useEffect(() => {
        const overlay = document.getElementById('overlay')
        if (overlay) {
            const menuItems = document.querySelectorAll('#header .menu-item')
            const handlers: Array<{ item: Element; handleMouseOver: () => void; handleMouseOut: () => void }> = []

            menuItems.forEach((item) => {
                const dropdown = item.querySelector('.mega-menu-dropdown-box')
                if (dropdown) {
                    const handleMouseOver = () => {
                        overlay.classList.add('show')
                        dropdown.classList.add('active')
                    }
                    const handleMouseOut = () => {
                        overlay.classList.remove('show')
                        dropdown.classList.remove('active')
                    }
                    item.addEventListener('mouseenter', handleMouseOver)
                    item.addEventListener('mouseleave', handleMouseOut)
                    handlers.push({ item, handleMouseOver, handleMouseOut })
                }
            })

            return () => {
                handlers.forEach(({ item, handleMouseOver, handleMouseOut }) => {
                    item.removeEventListener('mouseenter', handleMouseOver)
                    item.removeEventListener('mouseleave', handleMouseOut)
                })
            }
        }
    }, [])

    return (
        <>
            <div id="overlay"></div>
            <header id="header">
                <div className="container">
                    <Link href="/visa" title="Çilek Vize" className="logo">
                        <Image
                            src="/visa/assets/img/logo/logo30f4.svg"
                            alt="Çilek Vize"
                            width={259}
                            height={100}
                            priority
                        />
                    </Link>

                    <div className="primary-menu">
                        <div className="menu-item">
                            <Link href="/visa" title="Anasayfa">
                                Anasayfa
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link
                                href="#"
                                title="Hizmet Verdiğimiz Ülkeler"
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                Hizmet Verdiğimiz Ülkeler
                                <span className="caret-icon">
                                    <Image
                                        src="/visa/assets/img/icon/caret-down.svg"
                                        alt="Caret Down"
                                        width={18}
                                        height={18}
                                        priority
                                    />
                                    <Image
                                        src="/visa/assets/img/icon/caret-down-primary.svg"
                                        alt="Caret Down"
                                        width={18}
                                        height={18}
                                        priority
                                    />
                                </span>
                            </Link>
                            <div style={{ '--cat-color': '#FF9D00' } as React.CSSProperties} className="mega-menu-dropdown-box type-1">
                                <div>
                                    {countries.map((country) => (
                                        <Link key={country.href} href={country.href} title={country.title}>
                                            {country.title}
                                        </Link>
                                    ))}
                                    <Image
                                        src="/visa/assets/img/logo-transparent.svg"
                                        alt="Logo"
                                        width={150}
                                        height={193}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="menu-item">
                            <Link href="/visa/nasil-vize-alirim" title="Nasıl Vize Alırım ?">
                                Nasıl Vize Alırım ?
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link href="/visa/blog" title="Blog">
                                Blog
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link
                                href="#"
                                title="Diğer Bilgilendirmeler"
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                Diğer Bilgilendirmeler
                                <span className="caret-icon">
                                    <Image
                                        src="/visa/assets/img/icon/caret-down.svg"
                                        alt="Caret Down"
                                        width={18}
                                        height={18}
                                        priority
                                    />
                                    <Image
                                        src="/visa/assets/img/icon/caret-down-primary.svg"
                                        alt="Caret Down"
                                        width={18}
                                        height={18}
                                        priority
                                    />
                                </span>
                            </Link>
                            <div style={{ '--cat-color': '#FF9D00' } as React.CSSProperties} className="mega-menu-dropdown-box type-1">
                                <div>
                                    {otherLinks.map((link) => (
                                        <Link key={link.href} href={link.href} title={link.title}>
                                            {link.title}
                                        </Link>
                                    ))}
                                    <Image
                                        src="/visa/assets/img/logo-transparent.svg"
                                        alt="Logo"
                                        width={150}
                                        height={193}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="menu-item">
                            <Link href="/visa/basvuru-yap" title="Başvuru Yap">
                                Başvuru Yap
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link
                                href="#"
                                title="Şubelerimiz"
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                Şubelerimiz
                                <span className="caret-icon">
                                    <Image
                                        src="/visa/assets/img/icon/caret-down.svg"
                                        alt="Caret Down"
                                        width={18}
                                        height={18}
                                        priority
                                    />
                                    <Image
                                        src="/visa/assets/img/icon/caret-down-primary.svg"
                                        alt="Caret Down"
                                        width={18}
                                        height={18}
                                        priority
                                    />
                                </span>
                            </Link>
                            <div style={{ '--cat-color': '#FF9D00' } as React.CSSProperties} className="mega-menu-dropdown-box type-1">
                                <div>
                                    {branches.map((branch) => (
                                        <Link key={branch.href} href={branch.href} title={branch.title}>
                                            {branch.title}
                                        </Link>
                                    ))}
                                    <Image
                                        src="/visa/assets/img/logo-transparent.svg"
                                        alt="Logo"
                                        width={150}
                                        height={193}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="header-actions">
                        <div className="search-container">
                            <button
                                id="search-toggle"
                                className="search-toggle"
                                aria-label="Ara"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <span className="search-label">Ara</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M21 21L16.65 16.65"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <div className={`search-overlay ${isSearchOpen ? 'active' : ''}`} id="search-overlay">
                                <div className="search-form-container">
                                    <div className="search-form">
                                        <input
                                            type="text"
                                            name="q"
                                            id="search-input"
                                            placeholder="Ülke, vize veya blog yazısı ara..."
                                            autoComplete="off"
                                        />
                                        <button type="button" className="search-submit">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M21 21L16.65 16.65"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            className="search-close"
                                            id="search-close"
                                            onClick={() => setIsSearchOpen(false)}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M18 6L6 18"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M6 6L18 18"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div id="search-results" className="search-results-container">
                                        <div className="search-loading" style={{ display: 'none' }}>
                                            <div className="spinner"></div>
                                            <p>Aranıyor...</p>
                                        </div>
                                        <div className="search-results-content"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            id="hamburger"
                            className={isMobileMenuOpen ? 'is-active' : ''}
                            onClick={() => {
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                                document.body.classList.toggle('navigation-active')
                            }}
                        >
                            <span className="line"></span>
                            <span className="line"></span>
                            <span className="line"></span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                        <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
                            ×
                        </button>
                        <nav className="mobile-nav">
                            <Link href="/visa" onClick={() => setIsMobileMenuOpen(false)}>
                                Anasayfa
                            </Link>
                            <div className="mobile-menu-section">
                                <button onClick={(e) => {
                                    const target = e.currentTarget.parentElement
                                    target?.classList.toggle('active')
                                }}>
                                    Hizmet Verdiğimiz Ülkeler
                                </button>
                                <div className="mobile-submenu">
                                    {countries.map((country) => (
                                        <Link
                                            key={country.href}
                                            href={country.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {country.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <Link href="/visa/nasil-vize-alirim" onClick={() => setIsMobileMenuOpen(false)}>
                                Nasıl Vize Alırım ?
                            </Link>
                            <Link href="/visa/blog" onClick={() => setIsMobileMenuOpen(false)}>
                                Blog
                            </Link>
                            <div className="mobile-menu-section">
                                <button onClick={(e) => {
                                    const target = e.currentTarget.parentElement
                                    target?.classList.toggle('active')
                                }}>
                                    Diğer Bilgilendirmeler
                                </button>
                                <div className="mobile-submenu">
                                    {otherLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <Link href="/visa/basvuru-yap" onClick={() => setIsMobileMenuOpen(false)}>
                                Başvuru Yap
                            </Link>
                            <div className="mobile-menu-section">
                                <button onClick={(e) => {
                                    const target = e.currentTarget.parentElement
                                    target?.classList.toggle('active')
                                }}>Şubelerimiz</button>
                                <div className="mobile-submenu">
                                    {branches.map((branch) => (
                                        <Link
                                            key={branch.href}
                                            href={branch.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {branch.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}

