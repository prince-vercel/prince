'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import '../../i18n'

export default function Header() {
  const pathname = usePathname()
  const { t, isReady, i18n } = useSafeTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('TR')

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

  // Language change handler
  useEffect(() => {
    if (isReady) {
      const langMap: { [key: string]: string } = {
        'tr': 'TR',
        'en': 'EN',
        'es': 'ES',
        'fr': 'FR',
        'ru': 'RU'
      }
      const currentLang = langMap[i18n.language] || 'TR'
      setSelectedLanguage(currentLang)
    }
  }, [i18n.language, isReady])

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
      <header className="cs_site_header cs_style1 cs_sticky_header cs_heading_color">
        <div className="cs_main_header">
          <div className="container">
            <div className="cs_main_header_in">

              {/* LEFT */}
              <div className="cs_main_header_left">
                <Link href="/" className="cs_site_branding" style={{ textAlign: 'left', justifyContent: 'flex-start', marginRight: 'auto' }}>
                  <Image src="/assets/logo/logo-goldd.png" alt="Logo" width={110} height={35} />
                </Link>

                <nav className="cs_nav">
                  <ul className="cs_nav_list">
                    <li><Link href="/travel" className="font-semibold hover:text-primary-1 transition-colors duration-200" style={{ color: pathname === '/travel' ? '#d7b76e' : 'inherit' }} suppressHydrationWarning>{isReady ? t('travel.header.home') : ''}</Link></li>
                    <li><Link href="/travel/all" className="font-semibold hover:text-primary-1 transition-colors duration-200" style={{ color: pathname === '/travel/all' ? '#d7b76e' : 'inherit' }} suppressHydrationWarning>{isReady ? t('travel.header.tours') : ''}</Link></li>
                    <li><Link href="/travel/form" className="font-semibold hover:text-primary-1 transition-colors duration-200" style={{ color: pathname === '/travel/form' ? '#d7b76e' : 'inherit' }} suppressHydrationWarning>{isReady ? t('travel.header.reservation') : ''}</Link></li>
                    <li><Link href="/travel/blog" className="font-semibold hover:text-primary-1 transition-colors duration-200" style={{ color: pathname === '/travel/blog' ? '#d7b76e' : 'inherit' }} suppressHydrationWarning>{isReady ? t('travel.header.blog') : ''}</Link></li>
                    <li><Link href="/travel/about" className="font-semibold hover:text-primary-1 transition-colors duration-200" style={{ color: pathname === '/travel/about' ? '#d7b76e' : 'inherit' }} suppressHydrationWarning>{isReady ? t('travel.header.about') : ''}</Link></li>
                    <li><Link href="/travel/contact" className="font-semibold hover:text-primary-1 transition-colors duration-200" style={{ color: pathname === '/travel/contact' ? '#d7b76e' : 'inherit' }} suppressHydrationWarning>{isReady ? t('travel.header.contact') : ''}</Link></li>
                  </ul>
                </nav>
              </div>

              {/* RIGHT */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
                      justifyContent: 'space-between',
                      gap: '8px',
                      padding: '8px 16px',
                      border: '1px solid #d7b76e',
                      borderRadius: '8px',
                      background: 'transparent',
                      color: '#d7b76e',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    <span suppressHydrationWarning>{selectedLanguage}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto' }}>
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
                      border: '1px solid #d7b76e',
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
                          background: selectedLanguage === 'TR' ? '#d7b76e' : 'transparent',
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
                          background: selectedLanguage === 'EN' ? '#d7b76e' : 'transparent',
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
                          background: selectedLanguage === 'ES' ? '#d7b76e' : 'transparent',
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
                          background: selectedLanguage === 'FR' ? '#d7b76e' : 'transparent',
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
                          background: selectedLanguage === 'RU' ? '#d7b76e' : 'transparent',
                          color: selectedLanguage === 'RU' ? 'white' : '#333',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '14px',
                          borderBottomLeftRadius: '8px',
                          borderBottomRightRadius: '8px'
                        }}
                      >
                        RU
                      </button>
                    </div>
                  )}
                </div>
                <div className="cs_social_links cs_social_desktop">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f" style={{ color: '#d7b76e' }}></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-instagram" style={{ color: '#d7b76e' }}></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-whatsapp" style={{ color: '#d7b76e' }}></i>
                  </a>
                </div>
              </div>
              <div className="cs_main_header_right">

                <div className="cs_toolbox">

                  <button
                    type="button"
                    className="cs_toolbox_btn cs_sidebar_toggle_btn"
                    onClick={() => setIsSidebarOpen(true)}
                    aria-label={isReady ? t('travel.header.openMenu') : 'Open menu'}
                  >
                    <i className="fa-solid fa-bars"></i>
                  </button>

                </div>
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
            <li><Link href="/travel" className="font-semibold hover:text-primary-1 transition-colors duration-200" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('travel.header.home') : ''}</Link></li>
            <li><Link href="/travel/all" className="font-semibold hover:text-primary-1 transition-colors duration-200" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('travel.header.tours') : ''}</Link></li>
            <li><Link href="/travel/form" className="font-semibold hover:text-primary-1 transition-colors duration-200" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('travel.header.reservation') : ''}</Link></li>
            <li><Link href="/travel/blog" className="font-semibold hover:text-primary-1 transition-colors duration-200" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('travel.header.blog') : ''}</Link></li>
            <li><Link href="/travel/about" className="font-semibold hover:text-primary-1 transition-colors duration-200" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('travel.header.about') : ''}</Link></li>
            <li><Link href="/travel/contact" className="font-semibold hover:text-primary-1 transition-colors duration-200" onClick={() => setIsSidebarOpen(false)} suppressHydrationWarning>{isReady ? t('travel.header.contact') : ''}</Link></li>
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
                <input type="text" placeholder={isReady ? t('travel.common.search') : 'Search'} suppressHydrationWarning />
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