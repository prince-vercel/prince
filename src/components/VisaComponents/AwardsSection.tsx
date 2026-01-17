/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import i18n from '@/src/i18n'
import '@/src/i18n'
import '../../styles/visa/AwardsSection.css'
import { db } from '../../lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { getCollectionName } from '@/src/lib/localization'

interface Award {
  title: string
  image: string
  status: 'approved' | 'pending'
}

export default function AwardsSection() {
  const { t, isReady } = useSafeTranslation()
  const [awards, setAwards] = useState<Award[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru'>('tr')

  // Update selected language when i18n changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setSelectedLanguage(lng as 'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru')
    }

    // Set initial language
    setSelectedLanguage(i18n.language as 'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru')

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChange)

    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [])

  // Fetch awards from database
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const q = query(collection(db, getCollectionName('visacontents', selectedLanguage), 'images', 'visa'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        const awardsList = querySnapshot.docs.map(doc => ({
          title: doc.data().title,
          image: doc.data().imageUrl,
          status: 'approved' as const
        })) as Award[]
        setAwards(awardsList)
      } catch (err: any) {
        console.error('Error fetching awards:', err)
      }
    }
    fetchAwards()
  }, [selectedLanguage])

  // HTML'deki script'leri başlat: Swiper ve LightGallery
  useEffect(() => {
    const initAwards = () => {
      if (typeof window === 'undefined') return

      // Swiper başlat - HTML'deki script'teki gibi
      const awardsSwiper = document.querySelector('.awards-swiper')
      if (awardsSwiper && (window as any).Swiper) {
        // Eğer zaten başlatılmışsa destroy et
        if ((awardsSwiper as any).swiper) {
          (awardsSwiper as any).swiper.destroy(true, true)
        }

        new (window as any).Swiper('.awards-swiper', {
          slidesPerView: 'auto',
          spaceBetween: 24,
          grabCursor: true,
          navigation: {
            nextEl: '.awards-nav-next',
            prevEl: '.awards-nav-prev',
          },
          pagination: {
            el: '.awards-pagination',
            clickable: true,
          },
          breakpoints: {
            320: {
              spaceBetween: 16,
            },
            768: {
              spaceBetween: 20,
            },
            1024: {
              spaceBetween: 24,
            },
          },
        })
      }

      // LightGallery başlat - HTML'deki script'teki gibi
      const lgContainer = document.getElementById('awards-lightgallery')
      if (lgContainer && (window as any).lightGallery) {
        const lgZoom = (window as any).lgZoom
        const lgThumbnail = (window as any).lgThumbnail

        // Eğer zaten başlatılmışsa destroy et
        if ((lgContainer as any).lgInstance) {
          ; (lgContainer as any).lgInstance.destroy()
        }

        ; (window as any).lightGallery(lgContainer, {
          selector: '.award-card',
          plugins: lgZoom && lgThumbnail ? [lgZoom, lgThumbnail] : [],
          speed: 400,
          download: false,
          counter: true,
          zoom: true,
          scale: 1,
          thumbnail: true,
          animateThumb: true,
          zoomFromOrigin: true,
          allowMediaOverlap: true,
          toggleThumb: true,
          mobileSettings: {
            controls: true,
            showCloseIcon: true,
          },
        })
      }
    }

    // DOMContentLoaded beklemek yerine direkt kontrol et
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initAwards, 100)
      })
    } else {
      setTimeout(initAwards, 100)
    }

    // Script yüklenmesini kontrol et
    const checkScripts = setInterval(() => {
      if (
        typeof window !== 'undefined' &&
        (window as any).Swiper
      ) {
        clearInterval(checkScripts)
        setTimeout(initAwards, 200)
      }
    }, 100)

    // 10 saniye sonra timeout
    setTimeout(() => {
      clearInterval(checkScripts)
    }, 10000)

    return () => {
      clearInterval(checkScripts)
    }
  }, [])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <section className="section awards-section-modern">
        <div className="container">
          <div className="awards-header">
            <div className="header-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <h2 className="awards-title" suppressHydrationWarning>
              {isReady ? t('visa.awards.title') : ''}
            </h2>
            <p className="awards-subtitle" suppressHydrationWarning>
              {isReady ? t('visa.awards.subtitle') : ''}
            </p>
          </div>

          <div className="awards-swiper-wrapper">
            <div className="swiper awards-swiper" id="awards-lightgallery">
              <div className="swiper-wrapper">
                {awards.map((award, index) => (
                  <div key={index} className="swiper-slide">
                    <a
                      title={award.title || ''}
                      href={award.image}
                      className="award-card"
                      data-lg-size="1600-2400"
                      data-sub-html={award.title ? `<h4>${award.title}</h4>` : ''}
                      suppressHydrationWarning
                    >
                      <div className="award-image-wrapper">
                        <img
                          src={award.image}
                          alt={award.title || ''}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="award-hover-overlay">
                          <div className="zoom-btn">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" y1="21" x2="16.65" y2="16.65" />
                              <line x1="11" y1="8" x2="11" y2="14" />
                              <line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="award-content">
                        <div className="award-title-section">
                          <h3 className="award-title-text" suppressHydrationWarning>
                            {award.title ? award.title.toUpperCase() : ''}
                          </h3>
                          <div className="award-congrats" suppressHydrationWarning>
                            {isReady ? t('visa.awards.congrats') : ''}
                          </div>
                          <p className="award-thanks" suppressHydrationWarning>
                            {isReady ? t('visa.awards.thanks') : ''}
                          </p>
                          <p className="award-description" suppressHydrationWarning>
                            {isReady ? t('visa.awards.description') : ''}
                          </p>
                        </div>
                        <div className="award-info">
                          <span className="award-badge" suppressHydrationWarning>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {isReady ? t('visa.awards.approved') : ''}
                          </span>
                          <h3 className="award-name" suppressHydrationWarning>
                            {award.title}
                          </h3>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="awards-nav awards-nav-prev"
              aria-label={isReady ? t('visa.awards.prev') : ''}
              suppressHydrationWarning
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="awards-nav awards-nav-next"
              aria-label={isReady ? t('visa.awards.next') : ''}
              suppressHydrationWarning
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="awards-pagination"></div>
        </div>
      </section>
    </>
  )
}

