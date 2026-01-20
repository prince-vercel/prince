'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import '../../i18n'
import i18n from '../../i18n'

export default function Header() {
  const { t, isReady } = useSafeTranslation()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('TR')

  useEffect(() => {
    if (isReady) {
      const langMap: { [key: string]: string } = {
        'tr': 'TR',
        'en': 'EN',
        'es': 'ES',
        'fr': 'FR',
        'ru': 'RU',
        'ar': 'AR'
      }
      const currentLang = langMap[i18n.language] || 'TR'
      setSelectedLanguage(currentLang)
    }
  }, [isReady, i18n.language])

  useEffect(() => {
    // Sidebar ve search'ü kapat
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSidebarOpen(false)
    setIsSearchOpen(false)

    // Sayfayı en üste scroll et - çoklu yöntem
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  // Sidebar açıkken body scroll'unu engelle
  useEffect(() => {
    if (isSidebarOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen, isSearchOpen])

  return (
    <>
      {/* HEADER */}
      <header className="cs_site_header cs_style1 cs_sticky_header cs_heading_color" style={{ width: '100%' }}>
        <div className="cs_main_header" style={{ width: '100%' }}>
          <div className="cs_main_header_in" style={{ width: '100%', maxWidth: '100%', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* LEFT - Logo */}
            <div className="cs_main_header_left" style={{ flex: '0 0 auto' }}>
              <Link href="/" className="cs_site_branding">
                <Image src="/assets/logo/logo-mavi.png" alt="Logo" width={110} height={35} />
              </Link>
            </div>

            {/* CENTER - Navigation */}
            <nav className="cs_nav" style={{ flex: '1', justifyContent: 'center' }}>
              <ul className="cs_nav_list" style={{ display: 'flex', margin: 0, padding: 0 }}>
                <li><Link href="/medical" className="font-semibold" suppressHydrationWarning>{isReady ? t('medical.header.home') : ''}</Link></li>
                <li><Link href="/medical/organisation" className="font-semibold" suppressHydrationWarning>{isReady ? t('medical.header.organisation') : ''}</Link></li>
                <li><Link href="/medical/results" className="font-semibold" suppressHydrationWarning>{isReady ? t('medical.header.results') : ''}</Link></li>
                <li><Link href="/medical/form" className="font-semibold" suppressHydrationWarning>{isReady ? t('medical.header.form') : ''}</Link></li>
                <li><Link href="/medical/blog" className="font-semibold" suppressHydrationWarning>{isReady ? t('medical.header.blog') : ''}</Link></li>
                <li><Link href="/medical/about" className="font-semibold" suppressHydrationWarning>{isReady ? t('medical.header.about') : ''}</Link></li>
                <li><Link href="/medical/contact" className="font-semibold" suppressHydrationWarning>{isReady ? t('medical.header.contact') : ''}</Link></li>
              </ul>
            </nav>

            {/* RIGHT - Language Dropdown & Socials */}
            <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Language Dropdown */}
              <div className="language-selector" style={{ position: 'relative' }}>
                <button
                  className={`language-selector-btn ${isLanguageDropdownOpen ? 'active' : ''}`}
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  onBlur={() => {
                    setTimeout(() => setIsLanguageDropdownOpen(false), 200)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    border: '1px solid #307BC4',
                    borderRadius: '8px',
                    background: 'transparent',
                    color: '#307BC4',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  <span suppressHydrationWarning>{selectedLanguage}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {isLanguageDropdownOpen && (
                  <div className="language-dropdown" style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    background: 'white',
                    border: '1px solid #307BC4',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    minWidth: '100px'
                  }}>
                    <button
                      className={`language-option ${selectedLanguage === 'TR' ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedLanguage('TR')
                        i18n.changeLanguage('tr')
                        setIsLanguageDropdownOpen(false)
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 16px',
                        textAlign: 'left',
                        background: selectedLanguage === 'TR' ? '#307BC4' : 'transparent',
                        color: selectedLanguage === 'TR' ? 'white' : '#333',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px'
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
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 16px',
                        textAlign: 'left',
                        background: selectedLanguage === 'EN' ? '#307BC4' : 'transparent',
                        color: selectedLanguage === 'EN' ? 'white' : '#333',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px'
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
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 16px',
                        textAlign: 'left',
                        background: selectedLanguage === 'ES' ? '#307BC4' : 'transparent',
                        color: selectedLanguage === 'ES' ? 'white' : '#333',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px'
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
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 16px',
                        textAlign: 'left',
                        background: selectedLanguage === 'FR' ? '#307BC4' : 'transparent',
                        color: selectedLanguage === 'FR' ? 'white' : '#333',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px'
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
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 16px',
                        textAlign: 'left',
                        background: selectedLanguage === 'RU' ? '#307BC4' : 'transparent',
                        color: selectedLanguage === 'RU' ? 'white' : '#333',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px'
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
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 16px',
                        textAlign: 'left',
                        background: selectedLanguage === 'AR' ? '#307BC4' : 'transparent',
                        color: selectedLanguage === 'AR' ? 'white' : '#333',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px'
                      }}
                    >
                      AR
                    </button>
                  </div>
                )}
              </div>

              {/* SOCIALS – DESKTOP */}
              <div className="cs_social_links cs_social_desktop">
                <a href="#"><i className="fa-brands fa-facebook-f" style={{ color: '#307BC4' }}></i></a>
                <a href="#"><i className="fa-brands fa-youtube" style={{ color: '#307BC4' }}></i></a>
                <a href="#"><i className="fa-brands fa-instagram" style={{ color: '#307BC4' }}></i></a>
              </div>

              {/* MOBILE MENU TOGGLE */}
              <div className="cs_toolbox">
                <button
                  type="button"
                  className="cs_toolbox_btn cs_sidebar_toggle_btn"
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Open menu"
                >
                  <i className="fa-solid fa-bars"></i>
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <div className={`cs_sidenav ${isSidebarOpen ? 'active' : ''}`}>
        <div className="cs_sidenav_overlay" onClick={() => setIsSidebarOpen(false)} />

        <div className="cs_sidenav_in">
          <button className="cs_close" onClick={() => setIsSidebarOpen(false)}>
            <Image src="/assets/img/icons/close.svg" alt="Close" width={20} height={20} />
          </button>

          {/* MOBILE MENU */}
          <ul className="cs_mobile_menu">
            <li><Link href="/medical" className="font-semibold" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('medical.header.home') : ''}</Link></li>
            <li><Link href="/medical/organisation" className="font-semibold" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('medical.header.organisation') : ''}</Link></li>
            <li><Link href="/medical/results" className="font-semibold" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('medical.header.results') : ''}</Link></li>
            <li><Link href="/medical/form" className="font-semibold" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('medical.header.form') : ''}</Link></li>
            <li><Link href="/medical/blog" className="font-semibold" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('medical.header.blog') : ''}</Link></li>
            <li><Link href="/medical/about" className="font-semibold" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('medical.header.about') : ''}</Link></li>
            <li><Link href="/medical/contact" className="font-semibold" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('medical.header.contact') : ''}</Link></li>
          </ul>

          {/* SOCIALS – MOBILE (EN ALTTA) */}
          <div className="cs_social_links cs_social_mobile">
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-youtube"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className={`cs_header_search ${isSearchOpen ? 'active' : ''}`}>
        <div className="cs_header_search_in">
          <div className="container">
            <div className="cs_header_search_box">
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Doktor Ara" />
                <button type="submit" />
              </form>
              <button className="cs_close" onClick={() => setIsSearchOpen(false)}>
                <Image src="/assets/img/icons/close.svg" alt="Close" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="cs_sidenav_overlay" onClick={() => setIsSearchOpen(false)} />
      </div>
    </>
  )
}