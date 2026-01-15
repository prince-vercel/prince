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



export default function AboutPage() {
  const swiperRef = useRef<Swiper | null>(null)
  const [partners, setPartners] = useState<any[]>([])
  const [loadingPartners, setLoadingPartners] = useState(true)
  const [testimonials, setTestimonials] = useState<any[]>([])


  // Firebase'den partners'ları çek
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'travelcontents/partner/partners'))
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
        console.error('Partners yükleme hatası:', error)
      } finally {
        setLoadingPartners(false)
      }
    }

    fetchPartners()
  }, [])

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'travelcontents/testimonials/list'))
        const testimonialsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          name: doc.data().name,
          avatar: { src: doc.data().imageUrl },
        }))
        setTestimonials(testimonialsData)
      } catch (error) {
        console.error('Yorum verileri çekilirken hata:', error)
      }
    }

    fetchTestimonials()
  }, [])

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
                <Link href="/travel">Anasayfa</Link>
              </li>
              <li className="breadcrumb-item2"> Hakkımızda</li>
            </ol>
          </nav>

          <h2 className="l:text-[54px] pb-5 lg:text-4xl md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]">
            En İyi Seyahat Yolu
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
              <h5 className="section-sub-title-v1">Hakkımızda</h5>
              <h2 className="section-title-v1 max-w-xl">
                Tatilleriniz için Profesyonel Planlayıcılarız
              </h2>

              <div className="mt-7 xl:pl-24 lg:pl-20 relative before:content-[''] before:left-0 before:top-4 before:bg-[#d9d9d9] before:w-[10%] before:h-[1px] lg:before:absolute">
                <p className="regular-text-v1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do
                  eiusmod tem por incididunt ut labore et dolore magna aliqua.
                </p>
                <h5 className="font-sans text-dark-1 text-md font-medium mt-4">
                  Destinasyon Uzmanlarımızla Doğrudan +1 546 378 654&apos;ten Konuşun
                </h5>
              </div>

              <ul className="pt-6 lg:text-md text-base">
                {[
                  'Tüm yerler ve aktiviteler tarafımızdan dikkatle seçilmiştir.',
                  'Ödül kazanan bir ajansız',
                  '80.000&apos;den fazla müşteri tarafından güvenilir',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center font-sans text-dark-3 mt-4"
                  >
                    <div className="text-primary-1 flex-shrink-0 text-2md">
                      <i className="bi bi-check-circle"></i>
                    </div>
                    <span className="ml-3">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <a href="package-details.html" className="btn_primary__v1">
                  Daha Fazla Bilgi
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
        <div className="absolute top-[10%] left-[2%] max-w-[9%] z-minus lg:inline-block hidden">
          <img src="/assets/images/illustration/leaf-illustration.png" alt="leaf" />
        </div>

        <div className="container">
          <div className="text-center lg:pb-[60px] pb-[40px]">
            <h5 className="section-sub-title-v1">Öne Çıkan Paketler</h5>
            <h2 className="section-title-v1">Öne Çıkan Paketlerimize Göz Atın</h2>
          </div>
        </div>

        <div className="px-3 overflow-hidden">
          {/* FIRST PACKAGE */}
          <div className="flex 2xl:gap-x-12 gap-base lg:items-center col-span-10 2xl:ml-right-container lg:flex-row flex-col">
            <div className="xl:max-w-xl lg:max-w-lg shrink-0 order-2 lg:order-1 wow fadeInLeft">
              <h5 className="text-2md text-primary-1 leading-1.5 font-sans font-bold">
                $1.200&apos;den başlayan
              </h5>

              <h3 className="font-serif font-medium lg:text-xl text-lg leading-1.35 mt-2 text-dark-1">
                Yaz Dönüşü X MEKSİKA
              </h3>

              <p className="text-dark-2 leading-1.7 font-medium mt-5">
                Afro-Latin kültürünü keşfetmek ve Kolombiya&apos;nın Bağımsızlık Hafta Sonu&apos;nu kutlamak için bize katılın!
              </p>

              <p className="regular-text-v1 mt-[14px]">
                Duis id interdum ex, eu accumsan massa. Fusce vel nibh diam. Nulla ultrices ex at erat pharetra.
              </p>

              <ul className="pt-2 lg:text-md text-base">
                <li className="flex items-center font-sans text-dark-3 mt-4">
                  <div className="text-primary-1 text-2md flex-shrink-0">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <span className="ml-3">Profesyonel Tur Rehberi</span>
                </li>

                <li className="flex items-center font-sans text-dark-3 mt-4">
                  <div className="text-primary-1 text-2md flex-shrink-0">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <span className="ml-3">
                    Yeni malzeme/parça taşımak için nakliye maliyeti
                  </span>
                </li>

                <li className="flex items-center font-sans text-dark-3 mt-4">
                  <div className="text-primary-1 text-2md flex-shrink-0">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <span className="ml-3">
                    Yeni malzeme/parça taşımak için nakliye maliyeti
                  </span>
                </li>
              </ul>

              <div className="mt-12">
                <a href="package-details.html" className="btn_primary__v1">
                  Şimdi Rezervasyon Yap
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
                <p>İş ortakları yükleniyor...</p>
              </div>
            ) : partners.length === 0 ? (
              <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                <p>Henüz iş ortağı yok.</p>
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
            <h5 className="section-sub-title-v1">Yorumlar</h5>
            <h2 className="section-title-v1">Yolcularımız Neler Söylüyor</h2>
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
