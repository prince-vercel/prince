'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'

export default function VisaHeader() {
    const { t, i18n } = useTranslation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language === 'en' ? 'EN' : 'TR')

    // Mobile menu açıkken body scroll'unu engelle
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    // Language change handler
    useEffect(() => {
        const currentLang = i18n.language === 'en' ? 'EN' : 'TR'
        setSelectedLanguage(currentLang)
    }, [i18n.language])


    const countries = [
        { title: t('visa.header.countriesList.uk'), href: '/visa/vize-basvurusu/ingiltere' },
        { title: t('visa.header.countriesList.germany'), href: '/visa/vize-basvurusu/almanya' },
        { title: t('visa.header.countriesList.france'), href: '/visa/vize-basvurusu/fransa' },
        { title: t('visa.header.countriesList.canada'), href: '/visa/vize-basvurusu/kanada' },
        { title: t('visa.header.countriesList.usa'), href: '/visa/vize-basvurusu/abd' },
    ]

    const otherLinks = [
        { title: t('visa.header.aboutUs'), href: '/visa/hakkimizda' },
        { title: t('visa.header.visaTable'), href: '/visa/vize-tablosu' },
        { title: t('visa.header.successRates'), href: '/visa/basvuru-durumlari' },
        { title: t('visa.header.advantages'), href: '/visa/sundugumuz-avantajlar' },
        { title: t('visa.header.howToGetVisa'), href: '/visa/nasil-vize-alirim' },
        { title: t('visa.header.contact'), href: '/visa/iletisim' },
        { title: t('visa.header.faq'), href: '/visa/sss' },
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
                    <Link href="/" title="Çilek Vize" className="logo" style={{ width: "9%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                        i18n.changeLanguage('tr')
                                        setIsLanguageDropdownOpen(false)
                                    }}
                                >
                                    TR
                                </button>
                                <button
                                    className={`language-option ${selectedLanguage === 'EN' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedLanguage('EN')
                                        i18n.changeLanguage('en')
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
                            <Link href="/visa" title={t('visa.header.home')} suppressHydrationWarning>
                                {t('visa.header.home')}
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link
                                href="#"
                                title={t('visa.header.countries')}
                                suppressHydrationWarning
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                {t('visa.header.countries')}
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
                            <Link href="/visa/nasil-vize-alirim" title={t('visa.header.howToGetVisa')} suppressHydrationWarning>
                                {t('visa.header.howToGetVisa')}
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link href="/visa/basvuru-yap" title={t('visa.header.apply')} suppressHydrationWarning>
                                {t('visa.header.apply')}
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link href="/visa/blog" title={t('visa.header.blog')} suppressHydrationWarning>
                                {t('visa.header.blog')}
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link href="/visa/hakkimizda" title={t('visa.header.about')} suppressHydrationWarning>
                                {t('visa.header.about')}
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link
                                href="#"
                                title={t('visa.header.otherInfo')}
                                suppressHydrationWarning
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                {t('visa.header.otherInfo')}
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
                                {t('visa.header.home')}
                            </Link>
                            <div className="mobile-menu-section">
                                <button onClick={(e) => {
                                    const target = e.currentTarget.parentElement
                                    target?.classList.toggle('active')
                                }}>
                                    {t('visa.header.countries')}
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
                                {t('visa.header.howToGetVisa')}
                            </Link>
                            <Link href="/visa/blog" onClick={() => setIsMobileMenuOpen(false)}>
                                {t('visa.header.blog')}
                            </Link>
                            <div className="mobile-menu-section">
                                <button onClick={(e) => {
                                    const target = e.currentTarget.parentElement
                                    target?.classList.toggle('active')
                                }}>
                                    {t('visa.header.otherInfo')}
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
                                {t('visa.header.apply')}
                            </Link>
                            <Link href="/visa/hakkimizda" onClick={() => setIsMobileMenuOpen(false)}>
                                {t('visa.header.about')}
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}

