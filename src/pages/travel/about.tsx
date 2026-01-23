/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import 'swiper/css'
import 'swiper/css/navigation'

import { db } from '@/src/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { useEffect, useRef, useState } from "react"
import Swiper from "swiper"
import { Autoplay, Navigation } from "swiper/modules"
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import { getCollectionName } from '../../lib/localization'
import i18n from '../../i18n'
import '../../i18n'



export default function AboutPage() {
  const { t, isReady } = useSafeTranslation()
  const swiperRef = useRef<Swiper | null>(null)
  const [partners, setPartners] = useState<any[]>([])
  const [loadingPartners, setLoadingPartners] = useState(true)
  const [testimonials, setTestimonials] = useState<any[]>([])


  // Firebase'den partners'ları çek
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const baseCollection = getCollectionName('travelcontents', i18n.language)
        const querySnapshot = await getDocs(collection(db, `${baseCollection}/partner/partners`))
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
        const errorMsg = isReady ? t('travel.pages.about.errors.loadingPartners') : 'Partners yükleme hatası:'
        console.error(errorMsg, error)
      } finally {
        setLoadingPartners(false)
      }
    }

    fetchPartners()
  }, [isReady, t, i18n.language])

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const baseCollection = getCollectionName('travelcontents', i18n.language)
        const snapshot = await getDocs(collection(db, `${baseCollection}/testimonials/list`))
        const testimonialsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          name: doc.data().name,
          avatar: { src: doc.data().imageUrl },
        }))
        setTestimonials(testimonialsData)
      } catch (error) {
        const errorMsg = isReady ? t('travel.pages.about.errors.loadingTestimonials') : 'Yorum verileri çekilirken hata:'
        console.error(errorMsg, error)
      }
    }

    fetchTestimonials()
  }, [isReady, t, i18n.language])

  useEffect(() => {
    const swiper = new Swiper('.testimonial-slider-one', {
      modules: [Navigation, Autoplay],
      slidesPerView: 1,
      loop: true,
      allowTouchMove: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
    })

    swiperRef.current = swiper

    setTimeout(() => {
      const nextBtn = document.querySelector('.testi-next')
      const prevBtn = document.querySelector('.testi-prev')

      if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault()
          swiper.slideNext()
        })

        prevBtn.addEventListener('click', (e) => {
          e.preventDefault()
          swiper.slidePrev()
        })
      }
    }, 50)

    return () => {
      swiper.destroy(true, true)
    }
  }, [])


  return (
    <>
      {/*========== BREADCRUMB STYLE START ==========*/}
      <div className="paralax-container lg:py-20 py-12 relative overflow-hidden" style={{ backgroundColor: '#d7b76e' }}>
        <div className="absolute inset-0 z-minus before:content-[''] before:absolute before:inset-0 before:bg-[#030610] before:bg-opacity-50">
        </div>

        <img
          src="/assets/images/illustration/breadcrunb__shape.png"
          alt=""
          className="absolute bottom-0 left-0 z-1 lg:w-[12.5%] w-[20%]"
        />


        <div className="container relative z-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb2" style={{ color: 'white' }}>
              <li className="breadcrumb-item2">
                <Link href="/travel" suppressHydrationWarning>{isReady ? t('travel.pages.breadcrumb.home') : ''}</Link>
              </li>
              <li className="breadcrumb-item2" suppressHydrationWarning> {isReady ? t('travel.pages.about.breadcrumb') : ''}</li>
            </ol>
          </nav>

          <h2 className="l:text-[54px] pb-5 lg:text-4xl md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]" suppressHydrationWarning>
            {isReady ? t('travel.pages.about.title') : ''}
          </h2>
        </div>
      </div>
      {/*========== BREADCRUMB STYLE END ==========*/}

      {/*========== ABOUT US STYLE ONE START ==========*/}
      <div className="relative z-1 bg-gradient-to-t to-[#ffffff] from-white lg:pt-30 pt-24">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 max-w-[14%] z-minus lg:inline-block hidden">
          <img src="/assets/images/illustration/tree-illustration.png" alt="leaf" />
        </div>

        <div className="container">
          <div className="grid lg:grid-cols-2 gap-base items-center">
            <div className="relative wow fadeInLeft" data-wow-delay="0.2s">
              <img src="/assets/images/about/about1-1.webp" alt="about-img" />
            </div>

            <div>
              <h5 className="section-sub-title-v1" suppressHydrationWarning>{isReady ? t('travel.pages.about.subtitle') : ''}</h5>
              <h2 className="section-title-v1 max-w-xl" suppressHydrationWarning>
                {isReady ? t('travel.pages.about.heading') : ''}
              </h2>

              <div className="mt-7 xl:pl-24 lg:pl-20 relative before:content-[''] before:left-0 before:top-4 before:bg-[#d9d9d9] before:w-[10%] before:h-[1px] lg:before:absolute">
                <p className="regular-text-v1" suppressHydrationWarning>
                  Prince Invest Group; Avrupa, Afrika, Orta Doğu ve Körfez bölgelerinde Sağlık Hizmetleri ve Sağlık Turizmi, Turizm & Travel ve Vize Danışmanlığı alanlarında faaliyet gösteren çok uluslu bir holdingdir.
                </p>
                <h5 className="font-sans text-dark-1 text-md font-medium mt-4" suppressHydrationWarning>
                  Türkiye'nin büyüleyici güzelliğine keyifli bir kaçış arayanlar için, turizm & travel hizmetlerimiz ile ülkemizin zengin kültürünü, tarihini ve doğa harikalarını sergileyen özenle hazırlanmış deneyimler sunar. Uzman rehberliğimizle Türkiye'nin büyüleyici destinasyonlarını keşfedin. Prince Tourism & Travel, dünyanın en seçkin destinasyonlarına da en uygun fiyatlarla paket turlar, tatiller ve kültür turları düzenlemektedir. Prince Tourism & Travel, 16472 belge numarasıyla TÜRSAB'a kayıtlıdır.
                </h5>
              </div>

              <ul className="pt-6 lg:text-md text-base text-dark-1">
               Prince Tourism & Travel, bireysel (münferit) ve kurumsal misafirlerine yönelik olarak, yurt içi ve yurt dışı seyahatlerde uçtan uca profesyonel hizmetler sunan, yetkili bir seyahat acentesidir.
              </ul>

              <div className="mt-10">
                <a href="package-details.html" className="btn_primary__v1" suppressHydrationWarning>
                  {isReady ? t('travel.pages.about.moreInfo') : ''}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7.42505 16.5999L12.8584 11.1666C13.5 10.5249 13.5 9.4749 12.8584 8.83324L7.42505 3.3999"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*========== ABOUT US STYLE ONE END ==========*/}

      {/*========== FEATURED PACKAGE STYLE ONE START==========*/}
      <div className="featured_package__style lg:pt-30 pt-24 relative z-1">
        <div className="absolute top-[10%] left-[2%] max-w-[12%] z-minus lg:inline-block hidden">
          <img src="/assets/images/illustration/leaf-illustration.png" alt="leaf" />
        </div>

        <div className="container">
          <div className="text-center lg:pb-[60px] pb-[40px]">
            <h2 className="section-title-v1" suppressHydrationWarning>{isReady ? t('travel.pages.about.featuredPackages.title') : ''}</h2>
          </div>
        </div>

        <div className="pb-3 overflow-hidden">
          {/* FIRST PACKAGE */}
          <div className="flex 2xl:gap-x-12 gap-base lg:items-center col-span-10 2xl:ml-right-container lg:flex-row flex-col">
            <div className="xl:max-w-xl lg:max-w-lg shrink-0 order-2 lg:order-1 wow fadeInLeft">
              <p className="text-dark-2 leading-1.7 font-medium mt-5" suppressHydrationWarning>
                Yurt içi ve yurt dışı paket turlar, kişiye özel seyahat planlamaları, şirketlere özel tur ve organizasyonlar ile her ölçekte seyahat ihtiyacına uygun çözümler üretmekteyiz.
              </p>

              <p className="regular-text-v1 mt-[14px]" suppressHydrationWarning>
               Tatil amaçlı seyahatlerden iş gezilerine, kısa süreli kaçamaklardan uzun süreli konaklamalara kadar tüm süreçler, deneyimli ekibimiz tarafından titizlikle planlanır.
              </p>

              <ul className="pt-2 font-medium text-dark-2 text-base">
                <li>- Yurt içi ve yurt dışı turlar</li>
                <li>- Günlük İstanbul turları (rehberlik hizmeti ücretsizdir)</li>
                <li>- Kişiye özel turlar ve seyahat programları</li>
                <li>- Şirketlere özel turlar ve kurumsal seyahat organizasyonları</li>
                <li>- Kurumsal seyahat ve iş gezisi planlamaları</li>
                <li>- İstanbul içi ve Türkiye genelinde otel rezervasyonları</li>
                <li>- Sapanca, bungalov ve doğa konseptli konaklamalar</li>
                <li>Yurt dışı otel rezervasyonları</li>
                <li>Yurt içi ve yurt dışı uçak biletleri</li>
                <li>Havalimanı ve şehir içi transfer hizmetleri</li>
              </ul>

              <div className="mt-2 font-medium text-dark-2">
                Her seyahat, misafirlerimizin beklenti ve ihtiyaçları doğrultusunda; konfor, zaman ve bütçe dengesi gözetilerek planlanır. İster bireysel ister kurumsal olsun, tüm organizasyonlarda güvenilir ve sorunsuz bir hizmet anlayışı sunmayı hedefliyoruz.

Prince Tourism & Travel, 16472 belge numarası ile TÜRSAB’a kayıtlı, yetkili ve güvenilir bir seyahat acentesidir.
              </div>
            </div>

            <div className="order-1 lg:order-2 wow fadeInRight">
              <img src="/assets/images/packages/fp1-1.webp" alt="fp" />
            </div>
          </div>


        </div>
      </div>
      {/*========== FEATURED PACKAGE STYLE ONE END==========*/}


      {/* PARTNERS */}
      <div className="container" style={{ marginTop: '15vh' }}>
        <div className="cs_brands cs_style_1 cs_brand_marquee">
          <div className="cs_brands_track">
            {loadingPartners ? (
              <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                <p suppressHydrationWarning>{isReady ? t('travel.pages.about.partners.loading') : ''}</p>
              </div>
            ) : partners.length === 0 ? (
              <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                <p suppressHydrationWarning>{isReady ? t('travel.pages.about.partners.noPartners') : ''}</p>
              </div>
            ) : (
              partners.concat(partners).map((partner: any, i: number) => (
                <div key={i} className="cs_brand cs_center" style={{ marginRight: '40px' }}>
                  <img
                    src={partner.imageUrl}
                    alt={partner.title || 'Partner'}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                      filter: 'grayscale(100%)',
                      opacity: 0.8
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/*========== TESTIMONIAL STYLE ONE START==========*/}
      <div className="testimonial_style__one lg:pt-30 pt-24 relative ">
        <div className="container relative " >

          <div className="text-center lg:pb-[60px] pb-[40px]">
            <h5 className="section-sub-title-v1" suppressHydrationWarning>{isReady ? t('travel.pages.about.testimonials.subtitle') : ''}</h5>
            <h2 className="section-title-v1" suppressHydrationWarning>{isReady ? t('travel.pages.about.testimonials.title') : ''}</h2>
          </div>

          <div className="swiper testimonial-slider-one relative px-12 lg:px-20">
            <div className="swiper-wrapper">
              {testimonials.map((item, i) => (
                <div key={i} className="swiper-slide">
                  <div className="max-w-[970px] text-center mx-auto">

                    <p className="font-serif text-2md lg:text-[25px] text-dark-2 leading-1.8 italic">
                      {item.text}
                    </p>

                    <h5 className="lg:text-[25px] text-2md font-semibold text-dark-1 mt-base">
                      {item.name}
                    </h5>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '10px' }}>
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star" style={{ color: '#ffd700', fontSize: '16px' }} />
                      ))}
                    </div>

                    <div className="relative inline-block mt-6">
                      <div className="h-[38px] w-[38px] bg-primary-1 rounded-full border-2 border-white absolute top-0 left-0 -translate-x-1/3 text-white flex justify-center items-center">

                      </div>

                      <img
                        src={item.avatar.src}
                        alt="reviewer"
                        className="h-20 w-20 object-cover rounded-full"
                      />
                    </div>

                  </div>
                </div>
              ))}
            </div>


          </div>

        </div>
      </div>


    </>
  )
}
