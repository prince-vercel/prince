'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'

export default function VisaHeader() {
    const { t, i18n } = useTranslation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState('TR') // SSR-safe default
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({})

    // Mobile menu açıkken body scroll'unu engelle
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
            document.body.classList.add('navigation-active')
        } else {
            document.body.style.overflow = 'unset'
            document.body.classList.remove('navigation-active')
            // Menü kapandığında dropdown'ları kapat
            setOpenDropdowns({})
        }
        return () => {
            document.body.style.overflow = 'unset'
            document.body.classList.remove('navigation-active')
        }
    }, [isMobileMenuOpen])

    // Client-side mount kontrolü ve language setup
    useEffect(() => {
        setMounted(true)
        const langMap: { [key: string]: string } = {
            'tr': 'TR',
            'en': 'EN',
            'es': 'ES',
            'fr': 'FR',
            'ru': 'RU'
        }
        const currentLang = langMap[i18n.language] || 'TR'
        setSelectedLanguage(currentLang)
    }, [i18n.language])

    // Memoize countries and otherLinks to prevent hydration mismatch
    const countries = useMemo(() => {
        if (!mounted || !i18n.isInitialized) {
            return [
                { title: '', href: '/visa/vize-basvurusu/ingiltere' },
                { title: '', href: '/visa/vize-basvurusu/almanya' },
                { title: '', href: '/visa/vize-basvurusu/fransa' },
                { title: '', href: '/visa/vize-basvurusu/kanada' },
                { title: '', href: '/visa/vize-basvurusu/abd' },
            ]
        }
        return [
            { title: t('visa.header.countriesList.uk'), href: '/visa/vize-basvurusu/ingiltere' },
            { title: t('visa.header.countriesList.germany'), href: '/visa/vize-basvurusu/almanya' },
            { title: t('visa.header.countriesList.france'), href: '/visa/vize-basvurusu/fransa' },
            { title: t('visa.header.countriesList.canada'), href: '/visa/vize-basvurusu/kanada' },
            { title: t('visa.header.countriesList.usa'), href: '/visa/vize-basvurusu/abd' },
        ]
    }, [t, i18n.language, i18n.isInitialized, mounted])

    const otherLinks = useMemo(() => {
        if (!mounted || !i18n.isInitialized) {
            return [
                { title: '', href: '/visa/vize-tablosu' },
                { title: '', href: '/visa/konsolosluk-harclari' },
                { title: '', href: '/visa/tirci-vizesi' },
                { title: '', href: '/visa/yabancilara-turkiye-de-oturum-izni' },
                { title: '', href: '/visa/basvuru-durumlari' },
                { title: '', href: '/visa/sundugumuz-avantajlar' },
                { title: '', href: '/visa/nasil-vize-alirim' },
                { title: '', href: '/visa/iletisim' },
                { title: '', href: '/visa/sss' },
            ]
        }
        return [
            { title: t('visa.header.visaTable'), href: '/visa/vize-tablosu' },
            { title: t('visa.header.consularFees'), href: '/visa/konsolosluk-harclari' },
            { title: t('visa.header.tirDriverVisa'), href: '/visa/tirci-vizesi' },
            { title: t('visa.header.residencePermit'), href: '/visa/yabancilara-turkiye-de-oturum-izni' },
            { title: t('visa.header.successRates'), href: '/visa/basvuru-durumlari' },
            { title: t('visa.header.advantages'), href: '/visa/sundugumuz-avantajlar' },
            { title: t('visa.header.howToGetVisa'), href: '/visa/nasil-vize-alirim' },
            { title: t('visa.header.contact'), href: '/visa/iletisim' },
            { title: t('visa.header.faq'), href: '/visa/sss' },
        ]
    }, [t, i18n.language, i18n.isInitialized, mounted])

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
                    <Link href="/" title="Prince" className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '6.5%' }}>
                        <img
                            src="/visa/assets/img/prince-logo-red.png"
                            alt="Prince"
                            style={{ justifyContent: 'center', alignItems: 'center', display: 'block' }}
                        />
                    </Link>

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
                                        <Link key={country.href} href={country.href} title={country.title} suppressHydrationWarning>
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
                                        <Link key={link.href} href={link.href} title={link.title} suppressHydrationWarning>
                                            {link.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>




                    </div>

                    <div className="header-actions">
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
                                <span suppressHydrationWarning>{selectedLanguage}</span>
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
                                    <button
                                        className={`language-option ${selectedLanguage === 'ES' ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedLanguage('ES')
                                            i18n.changeLanguage('es')
                                            setIsLanguageDropdownOpen(false)
                                        }}
                                    >
                                        ES
                                    </button>
                                    <button
                                        className={`language-option ${selectedLanguage === 'FR' ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedLanguage('FR')
                                            i18n.changeLanguage('fr')
                                            setIsLanguageDropdownOpen(false)
                                        }}
                                    >
                                        FR
                                    </button>
                                    <button
                                        className={`language-option ${selectedLanguage === 'RU' ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedLanguage('RU')
                                            i18n.changeLanguage('ru')
                                            setIsLanguageDropdownOpen(false)
                                        }}
                                    >
                                        RU
                                    </button>
                                    <button
                                        className={`language-option ${selectedLanguage === 'AR' ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedLanguage('AR')
                                            i18n.changeLanguage('ar')
                                            setIsLanguageDropdownOpen(false)
                                        }}
                                    >
                                        AR
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="cs_social_links cs_social_desktop" style={{ display: 'flex', gap: '25px' }}>
                            <a href="#">
                                <i className="fa-brands fa-facebook-f" style={{ color: '#c42721', fontSize: '24px' }}></i>
                            </a>
                            <a href="#">
                                <i className="fa-brands fa-instagram" style={{ color: '#c42721', fontSize: '24px' }}></i>
                            </a>
                            <a href="#">
                                <i className="fa-brands fa-whatsapp" style={{ color: '#c42721', fontSize: '24px' }}></i>
                            </a>
                        </div>
                        <div
                            id="hamburger"
                            className={isMobileMenuOpen ? 'is-active' : ''}
                            onClick={() => {
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                                if (!isMobileMenuOpen) {
                                    document.body.classList.add('navigation-active')
                                } else {
                                    document.body.classList.remove('navigation-active')
                                }
                            }}
                        >
                            <span className="line"></span>
                            <span className="line"></span>
                            <span className="line"></span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation */}
            <nav id="navigation">
                <div className="mobile-search">
                    <div className="mobile-search-form">
                        <input
                            type="text"
                            name="q"
                            id="mobile-search-input"
                            placeholder="Ara..."
                            autoComplete="off"
                        />
                        <button type="button" className="mobile-search-submit">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', display: 'block' }}>
                                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div id="mobile-search-results" className="mobile-search-results">
                        <div className="search-loading" style={{ display: 'none' }}>
                            <div className="spinner"></div>
                            <p>Aranıyor...</p>
                        </div>
                        <div className="mobile-search-results-content"></div>
                    </div>
                </div>
                <div className="primary-menu">
                    <div className="menu-item">
                        <Link href="/visa" title={t('visa.header.home')} onClick={() => setIsMobileMenuOpen(false)} suppressHydrationWarning>
                            {t('visa.header.home')}
                        </Link>
                    </div>
                    <div style={{ '--cat-color': '#FF9D00' } as React.CSSProperties} className={`menu-item ${openDropdowns.countries ? 'active' : ''}`}>
                        <a
                            title={t('visa.header.countries')}
                            href="javascript:;"
                            onClick={(e) => {
                                e.preventDefault()
                                setOpenDropdowns(prev => ({
                                    ...prev,
                                    countries: !prev.countries
                                }))
                            }}
                            suppressHydrationWarning
                        >
                            {t('visa.header.countries')}
                            <span className="caret-icon">
                                <Image
                                    src="/visa/assets/img/icon/caret-down.svg"
                                    alt="Caret Down"
                                    width={18}
                                    height={18}
                                    decoding="async"
                                    fetchPriority="high"
                                />
                            </span>
                        </a>
                        {openDropdowns.countries && (
                            <div className="nav-dropdown-menu">
                                {countries.map((country) => (
                                    <Link
                                        key={country.href}
                                        href={country.href}
                                        title={country.title}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        suppressHydrationWarning
                                    >
                                        {country.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="menu-item">
                        <Link href="/visa/nasil-vize-alirim" title={t('visa.header.howToGetVisa')} onClick={() => setIsMobileMenuOpen(false)} suppressHydrationWarning>
                            {t('visa.header.howToGetVisa')}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link href="/visa/blog" title={t('visa.header.blog')} onClick={() => setIsMobileMenuOpen(false)} suppressHydrationWarning>
                            {t('visa.header.blog')}
                        </Link>
                    </div>
                    <div style={{ '--cat-color': '#FF9D00' } as React.CSSProperties} className={`menu-item ${openDropdowns.otherInfo ? 'active' : ''}`}>
                        <a
                            title={t('visa.header.otherInfo')}
                            href="javascript:;"
                            onClick={(e) => {
                                e.preventDefault()
                                setOpenDropdowns(prev => ({
                                    ...prev,
                                    otherInfo: !prev.otherInfo
                                }))
                            }}
                            suppressHydrationWarning
                        >
                            {t('visa.header.otherInfo')}
                            <span className="caret-icon">
                                <Image
                                    src="/visa/assets/img/icon/caret-down.svg"
                                    alt="Caret Down"
                                    width={18}
                                    height={18}
                                    decoding="async"
                                    fetchPriority="high"
                                />
                            </span>
                        </a>
                        {openDropdowns.otherInfo && (
                            <div className="nav-dropdown-menu">
                                {otherLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        title={link.title}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        suppressHydrationWarning
                                    >
                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="menu-item">
                        <Link href="/visa/basvuru-yap" title={t('visa.header.apply')} onClick={() => setIsMobileMenuOpen(false)} suppressHydrationWarning>
                            {t('visa.header.apply')}
                        </Link>
                    </div>
                    <div style={{ '--cat-color': '#FF9D00' } as React.CSSProperties} className={`menu-item ${openDropdowns.branches ? 'active' : ''}`}>
                        <a
                            title="Şubelerimiz"
                            href="javascript:;"
                            onClick={(e) => {
                                e.preventDefault()
                                setOpenDropdowns(prev => ({
                                    ...prev,
                                    branches: !prev.branches
                                }))
                            }}
                        >
                            Şubelerimiz
                            <span className="caret-icon">
                                <Image
                                    src="/visa/assets/img/icon/caret-down.svg"
                                    alt="Caret Down"
                                    width={18}
                                    height={18}
                                    decoding="async"
                                    fetchPriority="high"
                                />
                            </span>
                        </a>
                        {openDropdowns.branches && (
                            <div className="nav-dropdown-menu">
                                {branches.map((branch) => (
                                    <Link
                                        key={branch.href}
                                        href={branch.href}
                                        title={branch.title}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {branch.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}