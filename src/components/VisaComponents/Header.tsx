'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function VisaHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState('TR')

    // Mobile menu açıkken body scroll'unu engelle
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])


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
        { title: 'Vize Başvuru Başarı Oranları', href: '/visa/basvuru-durumlari' },
        { title: 'Sunduğumuz Avantajlar', href: '/visa/sundugumuz-avantajlar' },
        { title: 'Nasıl Vize Alırım?', href: '/visa/nasil-vize-alirim' },
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
                    <Link href="/visa" title="Çilek Vize" className="logo" style={{ width: "9%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                            src="/assets/img/logo.png"
                            alt="Çilek Vize"
                            width="100%"
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                        />
                    </Link>

                    {/* Language Dropdown */}
                    <div className="language-selector">
                        <button
                            className={`language-selector-btn ${isLanguageDropdownOpen ? 'active' : ''}`}
                            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                            onBlur={() => {
                                // Delay to allow click on dropdown items
                                setTimeout(() => setIsLanguageDropdownOpen(false), 200)
                            }}
                        >
                            <span>{selectedLanguage}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        {isLanguageDropdownOpen && (
                            <div className="language-dropdown">
                                <button
                                    className={`language-option ${selectedLanguage === 'TR' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedLanguage('TR')
                                        setIsLanguageDropdownOpen(false)
                                    }}
                                >
                                    TR
                                </button>
                                <button
                                    className={`language-option ${selectedLanguage === 'EN' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedLanguage('EN')
                                        setIsLanguageDropdownOpen(false)
                                    }}
                                >
                                    EN
                                </button>
                            </div>
                        )}
                    </div>

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
                                </div>
                            </div>
                        </div>

                        <div className="menu-item">
                            <Link href="/visa/nasil-vize-alirim" title="Nasıl Vize Alırım ?">
                                Nasıl Vize Alırım ?
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link href="/visa/basvuru-yap" title="Başvuru Yap">
                                Başvuru Yap
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link href="/visa/blog" title="Blog">
                                Blog
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link href="/visa/hakkimizda" title="Hakkımızda">
                                Hakkımızda
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
                                </div>
                            </div>
                        </div>




                    </div>

                    <div className="header-actions">
                        <div className="social-icons">
                            <a
                                title="WhatsApp"
                                href="https://wa.me/905508887071"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <Image
                                    src="/visa/assets/img/icon/whatsapp.svg"
                                    alt="WhatsApp"
                                    width={18}
                                    height={18}
                                    loading="lazy"
                                />
                            </a>
                            <a
                                title="Facebook"
                                href="https://www.facebook.com/cilekvize"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <Image
                                    src="/visa/assets/img/icon/social/facebook.svg"
                                    alt="Facebook"
                                    width={18}
                                    height={18}
                                    loading="lazy"
                                />
                            </a>
                            <a
                                title="Instagram"
                                href="https://www.instagram.com/turkiyeninvizecisi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <Image
                                    src="/visa/assets/img/icon/social/instagram.svg"
                                    alt="Instagram"
                                    width={18}
                                    height={18}
                                    loading="lazy"
                                />
                            </a>
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
                            <Link href="/visa/hakkimizda" onClick={() => setIsMobileMenuOpen(false)}>
                                Hakkımızda
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}

