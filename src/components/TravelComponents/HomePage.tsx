/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'



import { db } from '@/src/lib/firebase'
import { getCollectionName } from '@/src/lib/localization'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import i18n from 'i18next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import '../../i18n'
import Chatbot from './Chatbot'

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/İ/g, 'i')
    .trim()
}

interface Blog {
  id: string
  title: string
  desc: string
  imageUrl: string
  createdAt?: Date
}

interface Tour {
  id: string
  isFavorite?: boolean
  mainImageUrl?: string
  imageUrl?: string
  title: string
  duration?: string
  price?: string
  [key: string]: any
}

export default function TravelHomePage() {
  const router = useRouter()
  const { t, isReady } = useSafeTranslation()
  const [date, setDate] = useState('')
  const [destination, setDestination] = useState('')
  const dateRef = useRef<HTMLInputElement>(null)
  const [packages, setPackages] = useState<any[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [banners, setBanners] = useState<any[]>([])
  const [partners, setPartners] = useState<any[]>([])
  const [loadingPartners, setLoadingPartners] = useState(true)

  // Chatbot state
  const [chatbotQuestions, setChatbotQuestions] = useState<any[]>([])
  const [showChatbot, setShowChatbot] = useState(false)
  useEffect(() => {
    // Firestore'dan chatbotQuestions koleksiyonunu çek
    import('firebase/firestore').then(({ collection, getDocs }) => {
      getDocs(collection(db, getCollectionName('travelchatbotQuestions', i18n.language)))
        .then(snapshot => {
          const data = snapshot.docs.map(doc => doc.data())
          setChatbotQuestions(data)
        })
        .catch(() => setChatbotQuestions([]))
    })
  }, [i18n.language])

  // Firebase'den partners'ları çek
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, getCollectionName('travelcontents', i18n.language) + '/partner/partners'))
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
        const errorMsg = isReady ? t('travel.homePage.errors.loadingPartners') : 'Partners yükleme hatası:'
        console.error(errorMsg, error)
      } finally {
        setLoadingPartners(false)
      }
    }

    fetchPartners()
  }, [isReady, t, i18n.language])

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const q = query(collection(db, getCollectionName('travelcontents', i18n.language), 'images', 'banners'), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        const bannersList = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setBanners(bannersList)
      } catch (error) {
        const errorMsg = isReady ? t('travel.homePage.errors.loadingBanners') : 'Banner yükleme hatası:'
        console.error(errorMsg, error)
      }
    }

    fetchBanners()
  }, [isReady, t, i18n.language])

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const q = query(collection(db, getCollectionName('traveltours', i18n.language)), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        const tours: Tour[] = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Tour))
        // Sadece favorilere eklediğim turları göster
        const favoriteTours = tours.filter(tour => tour.isFavorite === true).slice(0, 3)
        setPackages(favoriteTours)
      } catch (error) {
        const errorMsg = isReady ? t('travel.homePage.errors.loadingTours') : 'Tur yükleme hatası:'
        console.error(errorMsg, error)
      }
    }

    fetchTours()
  }, [isReady, t, i18n.language])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, getCollectionName('travelblogs', i18n.language)), orderBy('createdAt', 'desc'), limit(3))
        const snap = await getDocs(q)
        const blogsData: Blog[] = []
        snap.forEach((doc) => {
          blogsData.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
          } as Blog)
        })
        setBlogs(blogsData)
      } catch (error) {
        const errorMsg = isReady ? t('travel.homePage.errors.loadingBlogs') : 'Blog yükleme hatası:'
        console.error(errorMsg, error)
      }
    }

    fetchBlogs()
  }, [isReady, t, i18n.language])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (destination.trim()) {
      params.append('destination', normalizeText(destination))
    }
    if (date) {
      params.append('date', date)
    }
    router.push(`/travel/all?${params.toString()}`)
  }

  return (
    <>
      <div className="hero_style__start" style={{ marginTop: '60px' }}>
        <div className="lg:grid grid-cols-12 xl:gap-base gap-3 mx-auto xl:px-base px-3 overflow-hidden">

          <div className="lg:col-span-3 md:col-span-6 hidden lg:flex flex-col gap-1">
            {banners.length > 0 ? (
              banners.slice(0, 3).map((banner, index) => (
                <div key={banner.id} className="group hero-card-sm" style={{ height: '260px', marginTop: index > 0 ? '15px' : '0' }}>
                  <a href="#">
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="lg:h-full w-full object-cover group-hover:scale-110 duration-500"
                    />
                    <div className="text-white absolute w-full lg:bottom-10 bottom-6 text-center">
                      <h4 className="font-bold text-lg text-white">{banner.title}</h4>
                      <div className="h-[3px] w-9 bg-white rounded-md mx-auto mt-2"></div>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <>



              </>
            )}
          </div>



          <div
            className="lg:col-span-6 md:col-span-12 xl:min-h-[370px] lg:min-h-[350px] lg:py-16 py-12 bg-cover bg-center bg-no-repeat flex justify-center items-center"
            style={{ backgroundImage: `url(/assets/images/hero/hero.webp)` }}
          >
            <form className="w-full max-w-[570px]" onSubmit={handleSearchSubmit}>
              <div
                className="lg:py-[40px] py-base lg:px-14 md:px-10 px-base mx-3 text-center backdrop-blur-[21px]"
                style={{
                  background:
                    'linear-gradient(152.97deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.12) 100%)',
                }}
              >
                <h3 className="text-white lg:text-2xl text-lg font-bold" suppressHydrationWarning>
                  {isReady ? t('travel.homePage.search.title') : ''}
                </h3>

                {/* DESTINATION */}
                <div className="relative lg:mt-12 mt-base">
                  <span className="absolute left-5 lg:left-4 top-1/2 -translate-y-1/2 text-primary-1 text-lg pointer-events-none z-10">
                    <i className="bi bi-geo-alt"></i>
                  </span>

                  <input
                    type="text"
                    placeholder={isReady ? t('travel.homePage.search.destinationPlaceholder') : ''}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="
      relative z-0 w-full bg-white outline-0
      h-14 lg:h-17
      pl-12 lg:pl-[60px] pr-3
    "
                    suppressHydrationWarning
                  />
                </div>

                {/* DATE */}
                <div className="relative lg:mt-10 mt-6">
                  <span className="absolute left-5 lg:left-4 top-1/2 -translate-y-1/2 text-primary-1 text-lg pointer-events-none z-10">
                    <i className="bi bi-calendar-date"></i>
                  </span>

                  <input
                    type="text"
                    value={date ? date : (isReady ? t('travel.homePage.search.datePlaceholder') : '')}
                    readOnly
                    className="
                relative z-0 w-full bg-white outline-0 cursor-pointer
                h-14 lg:h-17
                pl-12 lg:pl-[60px] pr-3
              "  suppressHydrationWarning />

                  <input
                    ref={dateRef}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                    className="
                    absolute top-0 left-0 z-20 w-full h-full
                    opacity-0 cursor-pointer
                    pl-12 lg:pl-[60px]
                  "  />
                </div>





                <button
                  type="submit"
                  className="lg:mt-10 mt-6 block text-center bg-primary-1 lg:h-17 h-14 w-full text-white font-medium text-md"
                  style={{ borderRadius: '24px' }}
                  suppressHydrationWarning
                >
                  {isReady ? t('travel.homePage.search.submit') : ''}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-3 md:col-span-6 hidden lg:flex flex-col gap-1">
            {banners.length > 0 ? (
              banners.slice(3, 6).map((banner, index) => (
                <div key={banner.id} className="group hero-card-sm" style={{ height: '260px', marginTop: index > 0 ? '15px' : '0' }}>
                  <a href="#">
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="lg:h-full w-full object-cover group-hover:scale-110 duration-500"
                    />
                    <div className="text-white absolute w-full lg:bottom-10 bottom-6 text-center">
                      <h4 className="font-bold text-lg text-white">{banner.title}</h4>
                      <div className="h-[3px] w-9 bg-white rounded-md mx-auto mt-2"></div>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <>


              </>
            )}
          </div>

        </div>
      </div>

      {/* ALT BANNERLAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-base gap-3 mx-auto xl:px-base px-3 overflow-hidden mt-3">
        {banners.length > 6 ? (
          banners.slice(6, 10).map((banner, index) => (
            <div key={banner.id} className="group hero-card-sm relative overflow-hidden" style={{ height: '260px' }}>
              <a href="#">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="h-full w-full object-cover group-hover:scale-110 duration-500"
                />
                <div className="absolute w-full bottom-6 text-center text-white">
                  <h4 className="font-bold text-lg text-white">{banner.title}</h4>
                  <div className="h-[3px] w-9 bg-white rounded-md mx-auto mt-2"></div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>




      {/*========== TOUR CATEGORY START ==========*/}
      <div className="tour_type_style__one lg:pt-30 pt-24">
        <div className="container">
          <div className="text-center lg:pb-[60px] pb-[40px]">
            <h5 className="section-sub-title-v1" suppressHydrationWarning>{isReady ? t('travel.homePage.categories.subtitle') : ''}</h5>
            <h2 className="section-title-v1" suppressHydrationWarning>{isReady ? t('travel.homePage.categories.title') : ''}</h2>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-base">

            <div className="text-center">
              <img src="/assets/images/icons/t1-3.svg" alt={isReady ? t('travel.homePage.categories.cityDayTrip.alt') : ''} className="mx-auto" suppressHydrationWarning />
              <h4 className="mt-4" suppressHydrationWarning>{isReady ? t('travel.homePage.categories.cityDayTrip.title') : ''}</h4>
              <p suppressHydrationWarning>{isReady ? t('travel.homePage.categories.cityDayTrip.description') : ''}</p>
            </div>

            <div className="text-center">
              <img src="/assets/images/icons/t1-2.svg" alt={isReady ? t('travel.homePage.categories.outdoorDayTrip.alt') : ''} className="mx-auto" suppressHydrationWarning />
              <h4 className="mt-4" suppressHydrationWarning>{isReady ? t('travel.homePage.categories.outdoorDayTrip.title') : ''}</h4>
              <p suppressHydrationWarning>{isReady ? t('travel.homePage.categories.outdoorDayTrip.description') : ''}</p>
            </div>

            <div className="text-center">
              <img src="/assets/images/icons/t1-1.svg" alt={isReady ? t('travel.homePage.categories.accommodationPackages.alt') : ''} className="mx-auto" suppressHydrationWarning />
              <h4 className="mt-4" suppressHydrationWarning>{isReady ? t('travel.homePage.categories.accommodationPackages.title') : ''}</h4>
              <p suppressHydrationWarning>{isReady ? t('travel.homePage.categories.accommodationPackages.description') : ''}</p>
            </div>

            <div className="text-center">
              <img src="/assets/images/icons/t1-4.svg" alt={isReady ? t('travel.homePage.categories.internationalTours.alt') : ''} className="mx-auto" suppressHydrationWarning />
              <h4 className="mt-4" suppressHydrationWarning>{isReady ? t('travel.homePage.categories.internationalTours.title') : ''}</h4>
              <p suppressHydrationWarning>{isReady ? t('travel.homePage.categories.internationalTours.description') : ''}</p>
            </div>

          </div>
        </div>
      </div>
      {/*========== TOUR CATEGORY END ==========*/}

      {/*========== PACKAGE STYLE ONE START ==========*/}
      <div className="package_style__one lg:pt-30 pt-24 lg:pb-30 pb-24 z-1 relative">

        <div className="absolute bottom-[10%] left-[2%] max-w-[13%] z-minus lg:inline-block hidden">
          <img src="/assets/images/illustration/leaf-illustration-2.png" alt="leaf" />
        </div>

        <div className="absolute top-[7%] right-0 max-w-[14%] z-minus lg:inline-block hidden">
          <img src="/assets/images/illustration/tree-illustration.png" alt="tree" />
        </div>

        <div className="container">

          <div className="text-center lg:pb-[60px] pb-[40px]">
            <h5 className="section-sub-title-v1" suppressHydrationWarning>{isReady ? t('travel.homePage.packages.subtitle') : ''}</h5>
            <h2 className="section-title-v1" suppressHydrationWarning>{isReady ? t('travel.homePage.packages.title') : ''}</h2>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-base">

            {packages.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500" suppressHydrationWarning>
                {isReady ? t('travel.homePage.packages.noTours') : ''}
              </div>
            ) : (
              packages.map((item, index) => (
                <div
                  key={item.id}
                  className="wow fadeInUp overflow-hidden bg-white"
                  style={{ borderRadius: '16px' }}
                  data-wow-delay={index > 0 ? `${index * 0.2}s` : undefined}
                >
                  {/* IMAGE */}
                  <div className="relative" style={{ height: '250px' }}>
                    <a href={`/travel/all/${item.id}`} className="block w-full h-full">
                      <img
                        src={item.mainImageUrl || item.imageUrl}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        className="hover:scale-105 duration-300"
                      />
                    </a>

                    {item.discount && (
                      <span
                        className="absolute top-4 left-4 bg-red-600 text-white font-bold px-3 py-1"
                        style={{ borderRadius: '8px' }}
                      >
                        -{item.discount} €
                      </span>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-xl mb-2">
                      {item.title}
                    </h3>
                    <h4 className="font-extrabold text-lg">
                      {item.country}
                    </h4>

                    <p className="text-sm font-semibold mt-1">
                      {item.route}
                    </p>

                    <div className="mt-1 text-sm font-semibold">
                      <i className="bi bi-geo-alt mr-1"></i> {item.location}
                    </div>

                    <div className="flex justify-between mt-2 text-xs font-semibold">
                      <span><strong>GİDİŞ:</strong> {item.startDate}</span>
                      <span><strong>DÖNÜŞ:</strong> {item.endDate}</span>
                    </div>
                  </div>

                  {/* PRICE BAR */}
                  <div
                    className="flex justify-center items-center gap-4 text-white"
                    style={{
                      background: '#d7b76e',
                      padding: '14px'
                    }}
                  >
                    {item.oldPrice && (
                      <span className="line-through opacity-80 text-base">
                        {item.oldPrice} €
                      </span>
                    )}
                    <span className="text-xl font-extrabold" style={{ fontSize: '25px' }}>
                      {item.price} €
                    </span>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </div>
      {/*========== PACKAGE STYLE ONE END ==========*/}



      {/* PARTNERS */}
      <div className="container" style={{ marginBottom: '20vh' }}>
        <div className="cs_brands cs_style_1 cs_brand_marquee">
          <div className="cs_brands_track">
            {loadingPartners ? (
              <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                <p suppressHydrationWarning>{isReady ? t('travel.homePage.packages.loadingPartners') : ''}</p>
              </div>
            ) : partners.length === 0 ? (
              <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                <p suppressHydrationWarning>{isReady ? t('travel.homePage.packages.noPartners') : ''}</p>
              </div>
            ) : (
              partners.concat(partners).map((partner: any, i: number) => (
                <div key={i} className="cs_brand cs_center" style={{ marginRight: '40px' }}>
                  <img
                    src={partner.imageUrl}
                    alt={partner.title || (isReady ? t('travel.homePage.partners.defaultAlt') : 'Partner')}
                    style={{
                      width: '100px',
                      height: '100px',
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

      {/*========== BLOG STYLE ONE START ==========*/}
      <div className="blog_style_one relative z-1 ">


        <div className="container">

          <div className="text-center lg:pb-[60px] pb-[40px]">
            <h5 className="section-sub-title-v1" suppressHydrationWarning>{isReady ? t('travel.homePage.blog.subtitle') : ''}</h5>
            <h2 className="section-title-v1" suppressHydrationWarning>{isReady ? t('travel.homePage.blog.title') : ''}</h2>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-base">

            {blogs.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500" suppressHydrationWarning>
                {isReady ? t('travel.homePage.blog.noBlogs') : ''}
              </div>
            ) : (
              blogs.map((blog, index) => (
                <div key={blog.id} className="blog_card__one group wow fadeInUp" data-wow-delay={index > 0 ? `${index * 0.2}s` : undefined}>
                  <div className="overflow-hidden" style={{ height: '280px' }}>
                    <a href={`/travel/blog/${blog.id}`} className="block w-full h-full">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        className="hover:scale-105 duration-300"
                      />
                    </a>
                  </div>

                  <div className="mt-6">
                    <ul className="flex items-center text-[13px] font-medium text-dark-2">
                      <li className="flex items-center relative first:pl-0 pl-2 pr-2 before:content-[''] before:absolute before:h-2/3 before:w-[1px] before:bg-dark-2 before:-translate-y-1/2 before:top-1/2 before:left-0 first:before:hidden">
                        <i className="bi bi-calendar-date text-[15px]"></i>
                        <span className="ml-2">{blog.createdAt?.toLocaleDateString('tr-TR')}</span>
                      </li>
                    </ul>

                    <h3 className="card-title-alpha mt-4">
                      <a href={`/travel/blog/${blog.id}`}>
                        {blog.title}
                      </a>
                    </h3>

                    <a
                      href={`/travel/blog/${blog.id}`}
                      className="group inline-flex items-center mt-4 lg:text-md text-base text-dark-1 font-medium hover:text-primary-1 duration-200"
                      suppressHydrationWarning
                    >
                      <span className="mr-2" suppressHydrationWarning>{isReady ? t('travel.homePage.blog.readMore') : ''}</span>
                      <svg
                        className="group-hover:translate-x-2 duration-200"
                        width="27"
                        height="14"
                        viewBox="0 0 27 14"
                        fill="none"
                      >
                        <path
                          d="M0.217443 6.25H18.4827V7.75H0.217443Z"
                          fill="currentColor"
                        />
                        <path
                          d="M20.7001 12.2802L25.0467 7.93355C25.5601 7.42021 25.5601 6.58021 25.0467 6.06688L20.7001 1.72021"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/*========== BLOG STYLE ONE END ==========*/}

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
          background: #d7b76e;
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
          background: #a88c4d;
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
            <button className="chatbot-fab" onClick={() => setShowChatbot(true)} title={isReady ? t('travel.homePage.chatbot.startChat') : ''} suppressHydrationWarning>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15.5C21 16.3284 20.3284 17 19.5 17H7.41421L4.70711 19.7071C4.07714 20.3371 3 19.8906 3 19.0001V5.5C3 4.67157 3.67157 4 4.5 4H19.5C20.3284 4 21 4.67157 21 5.5V15.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#d7b76e" />
                <circle cx="8" cy="10" r="1" fill="white" />
                <circle cx="12" cy="10" r="1" fill="white" />
                <circle cx="16" cy="10" r="1" fill="white" />
              </svg>
            </button>
          )}
          {showChatbot && (
            <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 10001 }}>
              <div style={{ position: 'relative' }}>
                <button className="chatbot-close-btn" onClick={() => setShowChatbot(false)} title={isReady ? t('travel.homePage.chatbot.close') : ''} suppressHydrationWarning>✕</button>
                <Chatbot />
              </div>
            </div>
          )}
        </>
      )}

    </>
  )
}
