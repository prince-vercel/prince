/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { db } from '@/src/lib/firebase'
import { Result } from '@/src/types/types'
import { collection, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useSafeTranslation } from '@/src/hooks/useSafeTranslation'
import { getCollectionName } from '@/src/lib/localization'
import i18n from '@/src/i18n'
import '@/src/i18n'






const GALLERY_PER_PAGE = 9


export default function ResultsPage() {
  const { t, isReady } = useSafeTranslation()
  
  const medicalSpecialties = {
    dis: isReady ? t('medical.pages.results.filters.dental') : 'Diş',
    genital: isReady ? t('medical.pages.results.filters.genital') : 'Genital',
    gogus: isReady ? t('medical.pages.results.filters.breast') : 'Göğüs',
    goz: isReady ? t('medical.pages.results.filters.eye') : 'Göz',
    kalca: isReady ? t('medical.pages.results.filters.hip') : 'Kalça',
    kulak: isReady ? t('medical.pages.results.filters.ear') : 'Kulak',
    'boyun-ve-yuz': isReady ? t('medical.pages.results.filters.neckFace') : 'Boyun ve Yüz',
    burun: isReady ? t('medical.pages.results.filters.nose') : 'Burun',
    'sac-ekimi': isReady ? t('medical.pages.results.filters.hairTransplant') : 'Saç Ekimi',
    'vucut-sekillendirme-liposuction': isReady ? t('medical.pages.results.filters.body') : 'Vücut Şekillendirme ve Liposuction',
  }

  const categoryMap: Record<string, string> = {
    all: isReady ? t('medical.pages.results.filters.all') : 'Tümü',
    ...medicalSpecialties,
  }

  const [results, setResults] = useState<Result[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState('all')
  const [galleryPage, setGalleryPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch results from Firestore on component mount
  useEffect(() => {
    fetchAllResults()
    fetchTestimonials()
  }, [i18n.language])

  // Fetch testimonials from Firebase
  const fetchTestimonials = async () => {
    try {
      setLoadingTestimonials(true)
      const baseCollection = getCollectionName('medicalcontents', i18n.language)
      const testimonialsRef = collection(db, `${baseCollection}/testimonials/list`)
      const snapshot = await getDocs(testimonialsRef)
      const testimonialsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as any[]
      setTestimonials(testimonialsData)
    } catch (error) {
      console.error(isReady ? t('medical.pages.results.testimonials.error') : 'Yorum verileri çekilirken hata:', error)
    } finally {
      setLoadingTestimonials(false)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchAllResults = async () => {
    try {
      setLoading(true)
      const allResults: Result[] = []
      const baseCollection = getCollectionName('medicalcontents', i18n.language)

      // Fetch from all medical specialty categories in parallel
      const fetchPromises = Object.keys(medicalSpecialties).map(async (categoryKey) => {
        const resultsRef = collection(db, `${baseCollection}/results/${categoryKey}`)
        const snapshot = await getDocs(resultsRef)
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          category: categoryKey,
          ...doc.data(),
        })) as Result[]
      })

      const allCategoryResults = await Promise.all(fetchPromises)
      allCategoryResults.forEach(categoryResults => allResults.push(...categoryResults))

      setResults(allResults)
    } catch (error) {
      console.error(isReady ? t('medical.pages.results.error') : 'Sonuçlar çekilirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const next = () => {
    if (startIndex < testimonials.length - 2) setStartIndex(startIndex + 1)
  }

  const prev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1)
  }

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 2)

  // Filter results by category
  const filteredGallery =
    activeFilter === 'all'
      ? results
      : results.filter(item => item.category === activeFilter)

  const totalGalleryPages = Math.ceil(filteredGallery.length / GALLERY_PER_PAGE)

  const paginatedGallery = filteredGallery.slice(
    (galleryPage - 1) * GALLERY_PER_PAGE,
    galleryPage * GALLERY_PER_PAGE
  )

  return (
    <>

      <section style={{ background: '#4f8edc', padding: '20px 0 20px 0' }}>
        <div className="container" style={{ marginBottom: '20px', marginTop: '-45px' }}>
          <ol className="breadcrumb2" style={{ color: '#fff', marginLeft: '0' }}>
            <li className="breadcrumb-item2" style={{ color: '#fff' }}>
              <Link href="/medical" style={{ color: '#fff' }} suppressHydrationWarning>{isReady ? t('medical.pages.breadcrumb.home') : ''}</Link>
            </li>
            <li className="breadcrumb-item2 active" style={{ color: '#fff' }} suppressHydrationWarning>{isReady ? t('medical.pages.breadcrumb.results') : ''}</li>
          </ol>

          <div className="cs_banner_text">
            <h2 className="cs_banner_title cs_fs_72" style={{ color: '#fff' }} suppressHydrationWarning>
              {isReady ? t('medical.pages.results.title') : ''}
            </h2>
            <p className="cs_banner_subtitle cs_fs_20" style={{ color: '#fff' }} suppressHydrationWarning>
              {isReady ? t('medical.pages.results.subtitle') : ''}
            </p>
          </div>
        </div>
      </section>

      <div className="container">

        <div className="cs_height_200 cs_height_xl_150 cs_height_lg_110" />

        <div style={{ marginTop: 50 }}>
          <div className="cs_doctors_heading">
            <div className="cs_isotop_filter cs_style1" ref={dropdownRef}>
              <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{
                    padding: '10px 44px 10px 16px',
                    borderRadius: isDropdownOpen ? '30px 30px 0 0' : '30px',
                    border: '1px solid #e8e8e8',
                    minWidth: '260px',
                    cursor: 'pointer',
                    appearance: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    background: '#fff',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundImage:
                      'url("data:image/svg+xml;utf8,<svg fill=\'%23666\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '20px',
                    paddingRight: '44px',
                  }}
                >
                  {categoryMap[activeFilter as keyof typeof categoryMap]}
                </button>

                {isDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      background: '#fff',
                      border: '1px solid #e8e8e8',
                      borderTop: 'none',
                      borderRadius: '0 0 30px 30px',
                      marginTop: '-1px',
                      maxHeight: '300px',
                      overflowY: 'auto',
                      zIndex: 10,
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {Object.entries(categoryMap).map(([key, label]) => (
                      <div
                        key={key}
                        onClick={() => {
                          setActiveFilter(key)
                          setGalleryPage(1)
                          setIsDropdownOpen(false)
                        }}
                        style={{
                          padding: '12px 16px',
                          cursor: 'pointer',
                          background: activeFilter === key ? '#f0f5ff' : '#fff',
                          color: activeFilter === key ? '#4f8edc' : '#333',
                          fontWeight: activeFilter === key ? '600' : '400',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f0f5ff'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = activeFilter === key ? '#f0f5ff' : '#fff'
                        }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="cs_view_box">
              <span suppressHydrationWarning> {filteredGallery.length} {isReady ? t('medical.pages.results.items') : 'Öğe'} </span>
            </div>
          </div>

          <div className="cs_height_40" />

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p suppressHydrationWarning>{isReady ? t('medical.pages.results.loading') : ''}</p>
            </div>
          ) : filteredGallery.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p suppressHydrationWarning>{isReady ? t('medical.pages.results.noResults') : ''}</p>
            </div>
          ) : (
            <>
              <div className="row cs_gap_y_40 cs_filter_wrapper">
                {paginatedGallery.map((item) => (
                  <div key={item.id} className="col-xl-4 col-lg-4 col-md-6 cs_filter_item">
                    <div style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', padding: '16px' }}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={250}
                        quality={75}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '12px'
                        }}
                      />
                      <h4 style={{ fontSize: '18px', fontWeight: '600', margin: '12px 0 8px 0' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '16px', color: '#666', margin: 0, lineHeight: '1.5' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {totalGalleryPages > 0 && (
                <ul className="cs_pagination_box mt-5">
                  {Array.from({ length: totalGalleryPages }).map((_, i) => (
                    <li key={i}>
                      <button
                        className={`cs_pagination_item ${galleryPage === i + 1 ? 'active' : ''}`}
                        onClick={() => setGalleryPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

        <div className="row" style={{ marginTop: 80 }}>
          <div className="col-lg-5">
            <div className="cs_section_heading cs_style_1">
              <h3 className="cs_section_subtitle cs_accent_color cs_fs_32" suppressHydrationWarning>{isReady ? t('medical.pages.results.testimonials.title') : ''}</h3>
              <h2 className="cs_section_title cs_fs_72" suppressHydrationWarning>
                {isReady ? t('medical.pages.results.testimonials.title') : ''}
              </h2>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="cs_testimonial_carousel_2">
              <div className="cs_slider_navigation cs_style_1">
                <div
                  className="cs_slider_prev cs_center cs_shadow_2"
                  onClick={prev}
                  style={{ cursor: 'pointer', opacity: startIndex === 0 ? 0.4 : 1 }}
                >
                  <Image src="/assets/img/icons/left_arrow_blue.svg" alt="Prev" width={100} height={100} />
                </div>
                <div
                  className="cs_slider_next cs_center cs_shadow_2"
                  onClick={next}
                  style={{
                    cursor: 'pointer',
                    opacity: startIndex >= testimonials.length - 2 ? 0.4 : 1,
                  }}
                >
                  <Image src="/assets/img/icons/right_arrow_blue.svg" alt="Next" width={100} height={100} />
                </div>
              </div>

              <div className="cs_height_60" />

              <div className="row" style={{ marginTop: 30 }}>
                {loadingTestimonials ? (
                  <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                    <p suppressHydrationWarning>{isReady ? t('medical.pages.results.testimonials.loading') : ''}</p>
                  </div>
                ) : testimonials.length === 0 ? (
                  <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                    <p suppressHydrationWarning>{isReady ? t('medical.pages.results.testimonials.noTestimonials') : ''}</p>
                  </div>
                ) : (
                  visibleTestimonials.map((item, i) => (
                    <div key={i} className="col-md-6">
                      <div className="cs_testimonial cs_style_4 cs_radius_20" style={{ minHeight: 280, padding: 30 }}>
                        <div className="cs_testimonial_meta">
                          <div className="cs_testimonial_avatar">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="cs_fs_24 cs_semibold m-0">{item.name}</h3>
                          </div>
                        </div>

                        <div className="cs_testimonial_text cs_heading_color cs_fs_20" style={{ minHeight: 120 }}>
                          <p>“{item.text}”</p>
                        </div>

                        <div className="cs_rating cs_accent_color">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <i key={i} className="fa-solid fa-star" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>
        </div>
      </div>


    </>
  )
}
