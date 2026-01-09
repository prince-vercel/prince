/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import Link from 'next/link'

import heroImg from '@/assets/img/home_1/hero_img.png'
import heroBg from '@/assets/img/home_1/hero_bg.jpeg'

import compassion from '@/assets/img/home_1/compassion.svg'
import excellence from '@/assets/img/home_1/excellence.svg'
import integrity from '@/assets/img/home_1/integrity.svg'
import respect from '@/assets/img/home_1/respect.svg'
import teamwork from '@/assets/img/home_1/teamwork.svg'

import post1 from '@/assets/img/home_1/post_1.jpeg'
import post2 from '@/assets/img/home_1/post_2.jpeg'
import post3 from '@/assets/img/home_1/post_3.jpeg'

import brand1 from '@/assets/img/brand_1.png'
import brand2 from '@/assets/img/brand_2.png'
import brand3 from '@/assets/img/brand_3.png'
import brand4 from '@/assets/img/brand_4.png'
import brand5 from '@/assets/img/brand_5.png'
import brand6 from '@/assets/img/brand_6.png'
import brand7 from '@/assets/img/brand_7.png'
import brand8 from '@/assets/img/brand_8.png'
import dep1 from '@/assets/img/home_1/tooth.png'
import dep2 from '@/assets/img/home_1/department_icon_3.svg'
import dep3 from '@/assets/img/home_1/breast (1).png'
import dep4 from '@/assets/img/home_1/visibility.png'
import dep5 from '@/assets/img/home_1/hip.png'
import dep6 from '@/assets/img/home_1/ear.png'
import dep7 from '@/assets/img/home_1/face.png'
import dep8 from '@/assets/img/home_1/healthcare.png'
import dep9 from '@/assets/img/home_1/hair.png'
import dep10 from '@/assets/img/home_1/stretch-marks.png'
import step1 from '@/assets/img/home_1/airplane-mode.png'
import step2 from '@/assets/img/home_1/health-screening.png'
import step3 from '@/assets/img/home_1/slumber.png'
import herok from '@/assets/img/home_1/hero150k.png'

import quoteIcon from '@/assets/img/icons/quote.svg'
import { useEffect, useState } from 'react'
import { MdAssignment, MdMedicalServices, MdCheckCircle } from 'react-icons/md'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import { Blog, Result } from '@/src/types/medical'


export default function HomePage() {
    const [activeTab, setActiveTab] = useState(2)
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loadingBlogs, setLoadingBlogs] = useState(true)
    const [results, setResults] = useState<Result[]>([])
    const [loadingResults, setLoadingResults] = useState(true)
    const [brands, setBrands] = useState<any[]>([])
    const [loadingBrands, setLoadingBrands] = useState(true)
    const [partners, setPartners] = useState<any[]>([])
    const [loadingPartners, setLoadingPartners] = useState(true)




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
    name: 'Varış & VIP Transfer ve Otel Konaklaması',
    location: '1. Adım',
    icon: <MdAssignment size={80} color="#307BC4" />,
    image: step1,
    text: 'Dönüşümünüz havaalanına indiğiniz an başlıyor! Yurt dışından geliyorsanız özel VIP transferimiz sizi karşılayarak otelinize veya kliniğimize güvenli ve konforlu bir şekilde ulaştırır.'
  },
  {
    name: 'Kişiye Özel Muayene ve Hazırlık',
    location: '2. Adım',
    icon: <MdMedicalServices size={80} color="#307BC4" />,
    image: step2,
    text: 'İşlem öncesinde uzmanlarımızla birebir muayene yaparak beklentilerinizi dinliyoruz. Gerekli testleri gerçekleştirip size en uygun tedavi planını oluşturuyoruz.'
  },
  {
    name: 'İşlem Sonrası Bakım ve İyileşme',
    location: '3. Adım',
    icon: <MdCheckCircle size={80} color="#307BC4" />,
    image: step3,
    text: 'İşlem tamamlandıktan sonra iyileşme sürecinizde yanınızdayız. Tedavinize bağlı olarak, konforlu dinlenme odalarımızda vakit geçirebilir veya otelinize dönerek detaylı bakım talimatlarını alabilirsiniz.'
  }
]

const departments = [
  { icon: dep9, title: 'Saç Ekimi', slug: 'sac-ekimi' },
  { icon: dep1, title: 'Diş', slug: 'dis' },
  { icon: dep10, title: 'Vücut', slug: 'vucut-sekillendirme-liposuction' },
  { icon: dep8, title: 'Burun', slug: 'burun-estetigi' },
  { icon: dep7, title: 'Boyun ve Yüz', slug: 'boyun-ve-yuz' },
  { icon: dep5, title: 'Kalça', slug: 'kalca' },
  { icon: dep4, title: 'Göz', slug: 'goz' },
  { icon: dep6, title: 'Kulak', slug: 'kulak' },
  { icon: dep3, title: 'Göğüs', slug: 'gogus' },
  { icon: dep2, title: 'Genital', slug: 'genital' },

]
const words = ['Estetik', 'Yenilenme', 'Güzellik', 'Sağlık']
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
      const querySnapshot = await getDocs(collection(db, 'medicalblogs'))
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
      console.error('Blog yükleme hatası:', error)
    } finally {
      setLoadingBlogs(false)
    }
  }

  fetchBlogs()
}, [])

// Firebase'den results'ları çek
useEffect(() => {
  const fetchResults = async () => {
    try {
      const allResults: Result[] = []
      const categories = ['dis', 'genital', 'gogus', 'goz', 'kalca', 'kulak', 'boyun-ve-yuz', 'burun', 'sac-ekimi', 'vucut-sekillendirme-liposuction']
      
      const fetchPromises = categories.map(async (categoryKey) => {
        const resultsRef = collection(db, `medicalcontents/results/${categoryKey}`)
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
      console.error('Results yükleme hatası:', error)
    } finally {
      setLoadingResults(false)
    }
  }

  fetchResults()
}, [])


// Firebase'den partners'ları çek
useEffect(() => {
  const fetchPartners = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'medicalcontents/partner/partners'))
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
  src={heroBg}
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
           <h1 className="cs_hero_title cs_white_color cs_fs_84">
  En İyi Tedaviyi Bizimle Alın{' '}
  <span className="cd-headline slide cs_accent_color">
    <span className="cd-words-wrapper">
      {words.map((word, i) => (
        <b
          key={word}
          className={i === activeIndex ? 'is-visible' : 'is-hidden'}
        >
          {word}
        </b>
      ))}
    </span>
  </span>
</h1>

            <p className="cs_hero_subtitle cs_fs_20 cs_heading_color">
              Size en iyi tıbbi ve sağlık hizmetlerini sunuyoruz.
            </p>
<Link href="/medical/form" className="cs_btn cs_style_1" style={{marginTop:'20px'}}>
  <span>Başvuru Yap</span>
</Link>


          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-lg-6 text-end" style={{ position: 'relative' }}>
          <Image
            src={heroImg}
            alt="Hero"
            width={800}
            height={700}
            priority
            style={{ maxWidth: '85%', height: 'auto',marginRight:'20px' }}
          />
          <div className="float-animation" style={{ position: 'absolute', top: '45%', right: '20px' }}>
            <Image
              src={herok}
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
          height={48}
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
          <h2 className="cs_section_title cs_fs_72 m-0">Süreçler</h2>
          <div className="cs_height_5"></div>
          <h3 className="cs_section_subtitle cs_accent_color cs_semibold m-0 cs_fs_32">
            Tedavi Sürecimiz
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
                <Image src={quoteIcon} alt="Quote" width={40} height={40} />
                <p>{reviews[activeTab].text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

{/* RESULTS */}
<section>
  <div className="container" style={{ margin: '12vh' }}>
    {/* HEADING */}
    <div className="cs_section_heading cs_style_1 text-center " style={{ marginTop: '5vh' }}>
      <h2 className="cs_section_title cs_fs_72 m-0 " >
       Mutlu Sonuçlar
      </h2>
    </div>
    <div className="cs_height_72 cs_height_lg_50"></div>

    {/* RESULTS */}
    <div className="row cs_gap_y_40">
      {loadingResults ? (
        <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
          <p>Sonuçlar yükleniyor...</p>
        </div>
      ) : results.length === 0 ? (
        <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
          <p>Henüz sonuç yok.</p>
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
      <Link href="/medical/results" className="cs_text_btn_2">
        <span className="cs_text_btn_text">Tüm Sonuçları Gör</span>
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
      <h2 className="cs_section_title cs_fs_72 m-0 " >
       Biliyor muydunuz?
      </h2>
    </div>
    <div className="cs_height_72 cs_height_lg_50"></div>

    {/* POSTS */}
    <div className="row gy-4">
      {loadingBlogs ? (
        <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
          <p>Bloglar yükleniyor...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
          <p>Henüz blog yok.</p>
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
                  <Link href={`/medical/blog/${post.id}`} className="cs_post_btn">
                    Devamını Oku
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
            <p>İş ortakları yükleniyor...</p>
          </div>
        ) : partners.length === 0 ? (
          <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
            <p>Henüz iş ortağı yok.</p>
          </div>
        ) : (
          partners.concat(partners).map((partner, i) => (
            <div key={i} className="cs_brand cs_center" style={{ marginRight: '40px' }}>
              <Image 
                src={partner.imageUrl} 
                alt={partner.title || 'Partner'} 
                width={90} 
                height={45}
                style={{ 
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
</section>

      

      {/* SCROLL UP */}
      <span className="cs_scrollup">
        <i className="fa-solid fa-arrow-up" />
      </span>
    </>
  )
}
