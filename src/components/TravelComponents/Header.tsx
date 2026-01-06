'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import logo from '@/assets/logo/logo-black.png'
import closeIcon from '@/assets/img/icons/close.svg'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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
      <header className="cs_site_header cs_style1 cs_sticky_header cs_heading_color">
        <div className="cs_main_header">
          <div className="container">
            <div className="cs_main_header_in">
              
              {/* LEFT */}
              <div className="cs_main_header_left">
                <Link href="/" className="cs_site_branding">
                  <Image src={logo} alt="Pro Health Logo" width={120} height={50} />
                </Link>

                <nav className="cs_nav">
                  <ul className="cs_nav_list">
                    <li><Link href="/travel" className="font-semibold hover:text-primary-1 transition-colors duration-200" style={{ color: pathname === '/travel' ? '#E8604C' : 'inherit' }}>Anasayfa</Link></li>
                    <li><Link href="/travel/all" className="font-semibold hover:text-primary-1 transition-colors duration-200" style={{ color: pathname === '/travel/all' ? '#E8604C' : 'inherit' }}>Seyahatler</Link></li>
                    <li><Link href="/travel/form" className="font-semibold hover:text-primary-1 transition-colors duration-200" style={{ color: pathname === '/travel/form' ? '#E8604C' : 'inherit' }}>Başvuru</Link></li>
                    <li><Link href="/travel/blog" className="font-semibold hover:text-primary-1 transition-colors duration-200" style={{ color: pathname === '/travel/blog' ? '#E8604C' : 'inherit' }}>Blog</Link></li>
                    <li><Link href="/travel/about" className="font-semibold hover:text-primary-1 transition-colors duration-200" style={{ color: pathname === '/travel/about' ? '#E8604C' : 'inherit' }}>Hakkımızda</Link></li>
                    <li><Link href="/travel/contact" className="font-semibold hover:text-primary-1 transition-colors duration-200" style={{ color: pathname === '/travel/contact' ? '#E8604C' : 'inherit' }}>İletişim</Link></li>
                  </ul>
                </nav>
              </div>

              {/* RIGHT */}
              <div className="cs_social_links cs_social_desktop">
  <a href="#">
    <i className="fa-brands fa-facebook-f" style={{ color: '#E8604C'  }}></i>
  </a>
  <a href="#">
    <i className="fa-brands fa-youtube" style={{ color: '#E8604C'  }}></i>
  </a>
  <a href="#">
    <i className="fa-brands fa-instagram" style={{ color: '#E8604C'  }}></i>
  </a>
</div>
              <div className="cs_main_header_right">

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
        </div>
      </header>

      {/* SIDEBAR */}
      <div className={`cs_sidenav ${isSidebarOpen ? 'active' : ''}`}>
        <div className="cs_sidenav_overlay" onClick={() => setIsSidebarOpen(false)} />
        
        <div className="cs_sidenav_in">
          <button className="cs_close" onClick={() => setIsSidebarOpen(false)}>
            <Image src={closeIcon} alt="Close" width={20} height={20} />
          </button>

          {/* MOBILE MENU */}
          <ul className="cs_mobile_menu">
            <li><Link href="/travel" className="font-semibold hover:text-primary-1 transition-colors duration-200" onClick={() => setIsSidebarOpen(false)}>Anasayfa</Link></li>
            <li><Link href="/travel/all" className="font-semibold hover:text-primary-1 transition-colors duration-200" onClick={() => setIsSidebarOpen(false)}>Seyahatler</Link></li>
            <li><Link href="/travel/form" className="font-semibold hover:text-primary-1 transition-colors duration-200" onClick={() => setIsSidebarOpen(false)}>Başvuru</Link></li>
            <li><Link href="/travel/blog" className="font-semibold hover:text-primary-1 transition-colors duration-200" onClick={() => setIsSidebarOpen(false)}>Blog</Link></li>
            <li><Link href="/travel/about" className="font-semibold hover:text-primary-1 transition-colors duration-200" onClick={() => setIsSidebarOpen(false)}>Hakkımızda</Link></li>
            <li><Link href="/travel/contact" className="font-semibold hover:text-primary-1 transition-colors duration-200" onClick={() => setIsSidebarOpen(false)}>İletişim</Link></li>
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
                <Image src={closeIcon} alt="Close" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="cs_sidenav_overlay" onClick={() => setIsSearchOpen(false)} />
      </div>
    </>
  )
}