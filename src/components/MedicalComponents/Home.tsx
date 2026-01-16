/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { db } from '@/src/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MdAssignment, MdCheckCircle, MdMedicalServices } from 'react-icons/md'

import { getCollectionName } from '@/src/lib/localization'
import { Blog, Result } from '@/src/types/types'
import i18n from 'i18next'
import dynamic from 'next/dynamic'
import { useEffect as useEffectReact } from 'react'
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import '../../i18n'
import CountryMarquee from '../VisaComponents/CountryMarquee'

const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false })


export default function HomePage() {
  const { t, isReady } = useSafeTranslation()
  const [activeTab, setActiveTab] = useState(2)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loadingBlogs, setLoadingBlogs] = useState(true)
  const [results, setResults] = useState<Result[]>([])
  const [loadingResults, setLoadingResults] = useState(true)
  const [brands, setBrands] = useState<any[]>([])
  const [loadingBrands, setLoadingBrands] = useState(true)

  const [partners, setPartners] = useState<any[]>([])
  const [loadingPartners, setLoadingPartners] = useState(true)

  // Chatbot state
  const [chatbotQuestions, setChatbotQuestions] = useState<any[]>([])
  const [showChatbot, setShowChatbot] = useState(false)
  useEffectReact(() => {
    // Firestore'dan chatbotQuestions koleksiyonunu çek
    import('firebase/firestore').then(({ collection, getDocs }) => {
      getDocs(collection(db, getCollectionName('medicalchatbotQuestions', i18n.language)))
        .then(snapshot => {
          const data = snapshot.docs.map(doc => doc.data())
          setChatbotQuestions(data)
        })
        .catch(() => setChatbotQuestions([]))
    })
  }, [i18n.language])




  const scrollSlider = (dir: string) => {
    const slider = document.querySelector('.cs_slider_activate')
    if (!slider) return

    const scrollAmount = 260
    slider.scrollBy({
      left: dir === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }
  const reviews = [
    {
      name: isReady ? t('medical.homePage.processes.steps.step1.title') : 'Varış & VIP Transfer ve Otel Konaklaması',
      location: isReady ? t('medical.homePage.processes.steps.step1.location') : '1. Adım',
      icon: <MdAssignment size={80} color="#307BC4" />,
      image: '/assets/img/home_1/airplane-mode.png',
      text: isReady ? t('medical.homePage.processes.steps.step1.text') : 'Dönüşümünüz havaalanına indiğiniz an başlıyor! Yurt dışından geliyorsanız özel VIP transferimiz sizi karşılayarak otelinize veya kliniğimize güvenli ve konforlu bir şekilde ulaştırır.'
    },
    {
      name: isReady ? t('medical.homePage.processes.steps.step2.title') : 'Kişiye Özel Muayene ve Hazırlık',
      location: isReady ? t('medical.homePage.processes.steps.step2.location') : '2. Adım',
      icon: <MdMedicalServices size={80} color="#307BC4" />,
      image: '/assets/img/home_1/health-screening.png',
      text: isReady ? t('medical.homePage.processes.steps.step2.text') : 'İşlem öncesinde uzmanlarımızla birebir muayene yaparak beklentilerinizi dinliyoruz. Gerekli testleri gerçekleştirip size en uygun tedavi planını oluşturuyoruz.'
    },
    {
      name: isReady ? t('medical.homePage.processes.steps.step3.title') : 'İşlem Sonrası Bakım ve İyileşme',
      location: isReady ? t('medical.homePage.processes.steps.step3.location') : '3. Adım',
      icon: <MdCheckCircle size={80} color="#307BC4" />,
      image: '/assets/img/home_1/slumber.png',
      text: isReady ? t('medical.homePage.processes.steps.step3.text') : 'İşlem tamamlandıktan sonra iyileşme sürecinizde yanınızdayız. Tedavinize bağlı olarak, konforlu dinlenme odalarımızda vakit geçirebilir veya otelinize dönerek detaylı bakım talimatlarını alabilirsiniz.'
    }
  ]

  const departments = [
    { icon: '/assets/img/home_1/hair.png', title: isReady ? t('medical.homePage.departments.hairTransplant') : 'Saç Ekimi', slug: 'sac-ekimi' },
    { icon: '/assets/img/home_1/tooth.png', title: isReady ? t('medical.homePage.departments.dental') : 'Diş', slug: 'dis' },
    { icon: '/assets/img/home_1/stretch-marks.png', title: isReady ? t('medical.homePage.departments.body') : 'Vücut', slug: 'vucut-sekillendirme-liposuction' },
    { icon: '/assets/img/home_1/healthcare.png', title: isReady ? t('medical.homePage.departments.nose') : 'Burun', slug: 'burun-estetigi' },
    { icon: '/assets/img/home_1/face.png', title: isReady ? t('medical.homePage.departments.neckFace') : 'Boyun ve Yüz', slug: 'boyun-ve-yuz' },
    { icon: '/assets/img/home_1/hip.png', title: isReady ? t('medical.homePage.departments.hip') : 'Kalça', slug: 'kalca' },
    { icon: '/assets/img/home_1/visibility.png', title: isReady ? t('medical.homePage.departments.eye') : 'Göz', slug: 'goz' },
    { icon: '/assets/img/home_1/ear.png', title: isReady ? t('medical.homePage.departments.ear') : 'Kulak', slug: 'kulak' },
    { icon: '/assets/img/home_1/breast (1).png', title: isReady ? t('medical.homePage.departments.breast') : 'Göğüs', slug: 'gogus' },
    { icon: '/assets/img/home_1/department_icon_3.svg', title: isReady ? t('medical.homePage.departments.genital') : 'Genital', slug: 'genital' },

  ]
  const words = [
    isReady ? t('medical.homePage.hero.words.aesthetic') : 'Estetik',
    isReady ? t('medical.homePage.hero.words.renewal') : 'Yenilenme',
    isReady ? t('medical.homePage.hero.words.beauty') : 'Güzellik',
    isReady ? t('medical.homePage.hero.words.health') : 'Sağlık'
  ]
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % words.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  // Firebase'den blogları çek
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, getCollectionName('medicalblogs', i18n.language)))
        const blogsData: Blog[] = []
        querySnapshot.forEach((doc) => {
          blogsData.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
          } as Blog)
        })
        // Son 3 blogı göster
        setBlogs(blogsData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 3))
      } catch (error) {
        const errorMsg = isReady ? t('medical.homePage.errors.loadingBlogs') : 'Blog yükleme hatası:'
        console.error(errorMsg, error)
      } finally {
        setLoadingBlogs(false)
      }
    }

    fetchBlogs()
  }, [isReady, t, i18n.language])

  // Firebase'den results'ları çek
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const allResults: Result[] = []
        const categories = ['dis', 'genital', 'gogus', 'goz', 'kalca', 'kulak', 'boyun-ve-yuz', 'burun', 'sac-ekimi', 'vucut-sekillendirme-liposuction']

        const fetchPromises = categories.map(async (categoryKey) => {
          const resultsRef = collection(db, `${getCollectionName('medicalcontents', i18n.language)}/results/${categoryKey}`)
          const snapshot = await getDocs(resultsRef)
          return snapshot.docs.map((doc) => ({
            id: doc.id,
            category: categoryKey,
            ...doc.data(),
          })) as Result[]
        })

        const allCategoryResults = await Promise.all(fetchPromises)
        allCategoryResults.forEach(categoryResults => allResults.push(...categoryResults))

        // Son 3 sonucu göster
        setResults(allResults.slice(0, 3))
      } catch (error) {
        const errorMsg = isReady ? t('medical.homePage.errors.loadingResults') : 'Results yükleme hatası:'
        console.error(errorMsg, error)
      } finally {
        setLoadingResults(false)
      }
    }

    fetchResults()
  }, [isReady, t, i18n.language])


  // Firebase'den partners'ları çek
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, getCollectionName('medicalcontents', i18n.language) + '/partner/partners'))
        const partnersData: any[] = []
        querySnapshot.forEach((doc) => {
          partnersData.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        // Düzenlemeye göre sırala
        setPartners(partnersData.sort((a, b) => (a.order || 0) - (b.order || 0)))
      } catch (error) {
        const errorMsg = isReady ? t('medical.homePage.errors.loadingPartners') : 'Partners yükleme hatası:'
        console.error(errorMsg, error)
      } finally {
        setLoadingPartners(false)
      }
    }

    fetchPartners()
  }, [isReady, t, i18n.language])


  return (
    <>
      <style>{`
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }
      .float-animation {
        animation: float 3s ease-in-out infinite;
      }
    `}</style>


      {/* HERO */}
      <section className="cs_hero cs_style_1">
        <div className="cs_hero_wrap">
          <Image
            src="/assets/img/home_1/hero_bg.jpeg"
            alt="Hero Background"
            fill
            priority
            sizes="80vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row align-items-center" style={{ minHeight: '100vh' }}>

              {/* LEFT CONTENT */}
              <div className="col-lg-6">
                <div className="cs_hero_text">
                  <h1 className="cs_hero_title cs_white_color cs_fs_84" suppressHydrationWarning>
                    {isReady ? t('medical.homePage.hero.title') : ''}{' '}
                    <span className="cd-headline slide cs_accent_color">
                      <span className="cd-words-wrapper">
                        {words.map((word, i) => (
                          <b
                            key={word}
                            className={i === activeIndex ? 'is-visible' : 'is-hidden'}
                            suppressHydrationWarning
                          >
                            {word}
                          </b>
                        ))}
                      </span>
                    </span>
                  </h1>

                  <p className="cs_hero_subtitle cs_fs_20 cs_heading_color" suppressHydrationWarning>
                    {isReady ? t('medical.homePage.hero.subtitle') : ''}
                  </p>
                  <Link href="/medical/form" className="cs_btn cs_style_1" style={{ marginTop: '20px' }} suppressHydrationWarning>
                    <span>{isReady ? t('medical.homePage.hero.applyButton') : ''}</span>
                  </Link>


                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="col-lg-6 text-end" style={{ position: 'relative' }}>
                <Image
                  src="/assets/img/home_1/hero_img.png"
                  alt="Hero"
                  width={800}
                  height={700}
                  priority
                  style={{ maxWidth: '85%', height: 'auto', marginRight: '20px' }}
                />
                <div className="float-animation" style={{ position: 'absolute', top: '45%', right: '20px' }}>
                  <Image
                    src="/assets/img/home_1/hero150k.png"
                    alt="Hero Accent"
                    width={200}
                    height={200}
                    priority
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section>

        <div className="container">
          <div className="cs_departments cs_style_1">

            {/* BG */}
            <div
              className="cs_departments_bg cs_radius_25"
            />


            {/* LIST */}
            <div className="cs_department_list">
              <div className="cs_department_carousel cs_gap_20">

                <div className="cs_slider_activate">
                  {departments.map((item, i) => (
                    <div key={i} className="cs_slide">
                      <Link
                        href={`/medical/${item.slug}`}
                        className="cs_department cs_shadow_1 cs_radius_20 cs_white_bg"
                        style={{
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          const img = e.currentTarget.querySelector('img')
                          const p = e.currentTarget.querySelector('p')
                          if (img) {
                            img.style.filter = 'brightness(0) saturate(100%) invert(100%)'
                          }
                          if (p) {
                            p.style.color = 'white'
                          }
                        }}
                        onMouseLeave={(e) => {
                          const img = e.currentTarget.querySelector('img')
                          const p = e.currentTarget.querySelector('p')
                          if (img) {
                            img.style.filter = 'brightness(0) saturate(100%) invert(0%)'
                          }
                          if (p) {
                            p.style.color = '#000000'
                          }
                        }}
                      >
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={48}
                          height={40}
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(0%)',
                            transition: 'filter 0.3s ease'
                          }}
                        />
                        <p
                          className="cs_department_title cs_medium cs_fs_20 mb-0"
                          style={{
                            color: '#000000',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          {item.title}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>




                <div className="cs_slider_nav">
                  <button
                    className="cs_slider_btn prev"
                    onClick={() => scrollSlider('prev')}
                  >
                    ‹
                  </button>

                  <button
                    className="cs_slider_btn next"
                    onClick={() => scrollSlider('next')}
                  >
                    ›
                  </button>
                </div>


              </div>
            </div>

          </div>
        </div>
      </section>
      <section>
        <div className="container" style={{ marginTop: '12vh' }}>
          <div className="cs_section_heading cs_style_1 text-center">
            <h2 className="cs_section_title cs_fs_72 m-0" suppressHydrationWarning>{isReady ? t('medical.homePage.processes.title') : ''}</h2>
            <div className="cs_height_5"></div>
            <h3 className="cs_section_subtitle cs_accent_color cs_semibold m-0 cs_fs_32" suppressHydrationWarning>
              {isReady ? t('medical.homePage.processes.subtitle') : ''}
            </h3>
          </div>

          <div className="cs_height_72 cs_height_lg_50"></div>

          <div className="cs_tabs cs_style1">
            <ul className="cs_tab_links">
              {reviews.map((item, index) => (
                <li
                  key={index}
                  className={activeTab === index ? 'active' : ''}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="cs_tab_link_in">
                    <div className="cs_testimonial_1_avatar">
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '35px',
                        height: '35px'
                      }}>
                        {reviews[index].image && (
                          <Image
                            src={reviews[index].image}
                            alt={reviews[index].name}
                            width={40}
                            height={40}
                            style={{ objectFit: 'contain' }}
                          />
                        )}
                      </div>
                      <div className="cs_testimonial_1_avatar_right">
                        <h3 className="cs_fs_24 cs_semibold mb-0">{item.name}</h3>
                        <p className="cs_heading_color mb-0">{item.location}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cs_tab_body">
              <div className="cs_tab active">
                <div className="cs_testimonial cs_style_1">
                  <Image src="/assets/img/icons/quote.svg" alt="Quote" width={40} height={40} />
                  <p>{reviews[activeTab].text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="cs_section_heading cs_style_1 text-center " style={{ marginTop: '8vh' }}>
          <h2 className="cs_section_title cs_fs_72 m-0 " suppressHydrationWarning>
            {isReady ? t('medical.homePage.languages.title') : ''}
          </h2>
        </div>
        <CountryMarquee />
      </section>
      {/* RESULTS */}
      <section>
        <div className="container" style={{ margin: '12vh' }}>
          {/* HEADING */}
          <div className="cs_section_heading cs_style_1 text-center " style={{ marginTop: '5vh' }}>
            <h2 className="cs_section_title cs_fs_72 m-0 " suppressHydrationWarning>
              {isReady ? t('medical.homePage.results.title') : ''}
            </h2>
          </div>
          <div className="cs_height_72 cs_height_lg_50"></div>

          {/* RESULTS */}
          <div className="row cs_gap_y_40">
            {loadingResults ? (
              <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                <p suppressHydrationWarning>{isReady ? t('medical.homePage.results.loading') : ''}</p>
              </div>
            ) : results.length === 0 ? (
              <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                <p suppressHydrationWarning>{isReady ? t('medical.homePage.results.noResults') : ''}</p>
              </div>
            ) : (
              results.map((item) => (
                <div key={item.id} className="col-xl-4 col-lg-4 col-md-6">
                  <div className="cs_result_card">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={250}
                      quality={75}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        marginBottom: '12px'
                      }}
                    />
                    <h4 style={{ fontSize: '18px', fontWeight: '600', margin: '12px 0 8px 0', color: '#274760' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '16px', color: '#666', margin: 0, lineHeight: '1.5', flex: 1 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link href="/medical/results" className="cs_text_btn_2" suppressHydrationWarning>
              <span className="cs_text_btn_text" suppressHydrationWarning>{isReady ? t('medical.homePage.results.viewAll') : ''}</span>
              <span className="cs_text_btn_icon">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        </div>
      </section>



      {/* BLOG */}
      <section>
        <div className="container">
          {/* HEADING */}
          <div className="cs_section_heading cs_style_1 text-center " style={{ marginTop: '5vh' }}>
            <h2 className="cs_section_title cs_fs_72 m-0 " suppressHydrationWarning>
              {isReady ? t('medical.homePage.blog.title') : ''}
            </h2>
          </div>
          <div className="cs_height_72 cs_height_lg_50"></div>

          {/* POSTS */}
          <div className="row gy-4">
            {loadingBlogs ? (
              <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                <p suppressHydrationWarning>{isReady ? t('medical.homePage.blog.loading') : ''}</p>
              </div>
            ) : blogs.length === 0 ? (
              <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                <p suppressHydrationWarning>{isReady ? t('medical.homePage.blog.noBlogs') : ''}</p>
              </div>
            ) : (
              blogs.map((post) => (
                <div key={post.id} className="col-lg-4">
                  <div className="cs_post cs_style_1">

                    {/* THUMB */}
                    <Link href={`/medical/blog/${post.id}`} className="cs_post_thumb cs_view_mouse">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={320}
                        height={240}
                      />
                    </Link>

                    {/* INFO */}
                    <div className="cs_post_info">
                      <div>
                        <div className="cs_post_meta">
                          <div className="cs_posted_by">{post.createdAt?.toLocaleDateString('tr-TR')}</div>

                          <div className="cs_post_social">
                            <a href="#" className="cs_center rounded-circle">
                              <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                            <a href="#" className="cs_center rounded-circle">
                              <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" className="cs_center rounded-circle">
                              <i className="fa-brands fa-twitter"></i>
                            </a>
                          </div>
                        </div>

                        <h2 className="cs_post_title cs_semibold cs_fs_24">
                          <Link href={`/medical/blog/${post.id}`}>{post.title}</Link>
                        </h2>
                      </div>

                      <div className="cs_heading_color cs_medium">
                        <Link href={`/medical/blog/${post.id}`} className="cs_post_btn" suppressHydrationWarning>
                          {isReady ? t('medical.homePage.blog.readMore') : ''}
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* PARTNERS */}
      <section>
        <div className="container" style={{ marginTop: '20vh' }}>
          <div className="cs_brands cs_style_1 cs_brand_marquee">
            <div className="cs_brands_track">
              {loadingPartners ? (
                <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                  <p suppressHydrationWarning>{isReady ? t('medical.homePage.partners.loading') : ''}</p>
                </div>
              ) : partners.length === 0 ? (
                <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                  <p suppressHydrationWarning>{isReady ? t('medical.homePage.partners.noPartners') : ''}</p>
                </div>
              ) : (
                partners.concat(partners).map((partner, i) => (
                  <div key={i} className="cs_brand cs_center" style={{ marginRight: '40px' }}>
                    <Image
                      src={partner.imageUrl}
                      alt={partner.title || (isReady ? t('medical.homePage.partners.defaultAlt') : 'Partner')}
                      width={90}
                      height={45}
                      style={{
                        objectFit: 'contain',
                        filter: 'grayscale(100%)',
                        opacity: 0.8
                      }}
                      suppressHydrationWarning
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>



      {/* SCROLL UP */}
      <span className="cs_scrollup">
        <i className="fa-solid fa-arrow-up" />
      </span>

      {/* CHATBOT BUTTON & BOX */}
      <style>{`
        .chatbot-fab {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 10000;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #307bc4;
          color: #fff;
          border: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .chatbot-fab:hover {
          background: #205a8c;
        }
        .chatbot-close-btn {
          position: absolute;
          top: 8px;
          right: 12px;
          background: none;
          border: none;
          color: #888;
          font-size: 22px;
          cursor: pointer;
        }
      `}</style>
      {chatbotQuestions.length > 0 && (
        <>
          {!showChatbot && (
            <button className="chatbot-fab" onClick={() => setShowChatbot(true)} title={isReady ? t('medical.homePage.chatbot.startChat') : ''} suppressHydrationWarning>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15.5C21 16.3284 20.3284 17 19.5 17H7.41421L4.70711 19.7071C4.07714 20.3371 3 19.8906 3 19.0001V5.5C3 4.67157 3.67157 4 4.5 4H19.5C20.3284 4 21 4.67157 21 5.5V15.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#307bc4" />
                <circle cx="8" cy="10" r="1" fill="white" />
                <circle cx="12" cy="10" r="1" fill="white" />
                <circle cx="16" cy="10" r="1" fill="white" />
              </svg>
            </button>
          )}
          {showChatbot && (
            <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 10001 }}>
              <div style={{ position: 'relative' }}>
                <button className="chatbot-close-btn" onClick={() => setShowChatbot(false)} title={isReady ? t('medical.homePage.chatbot.close') : ''} suppressHydrationWarning>✕</button>
                <Chatbot />
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
