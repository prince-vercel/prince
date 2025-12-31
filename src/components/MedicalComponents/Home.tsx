'use client'

import Image from 'next/image'
import Link from 'next/link'

import heroImg from '@/assets/img/home_1/hero_img.png'
import heroBg from '@/assets/img/home_1/hero_bg.jpeg'
import aboutImg from '@/assets/img/home_1/about.png'

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
import dep1 from '@/assets/img/home_1/department_icon_1.svg'
import dep2 from '@/assets/img/home_1/department_icon_2.svg'
import dep3 from '@/assets/img/home_1/department_icon_3.svg'
import dep4 from '@/assets/img/home_1/department_icon_4.svg'
import dep5 from '@/assets/img/home_1/department_icon_5.svg'
import dep6 from '@/assets/img/home_1/department_icon_6.svg'
import dep7 from '@/assets/img/home_1/department_icon_1.svg'
import dep8 from '@/assets/img/home_1/department_icon_2.svg'
import dep9 from '@/assets/img/home_1/department_icon_3.svg'
import dep10 from '@/assets/img/home_1/department_icon_4.svg'
import avatar1 from '@/assets/img/home_1/avatar_1.png'
import avatar2 from '@/assets/img/home_1/avatar_2.png'
import avatar3 from '@/assets/img/home_1/avatar_3.png'
import quoteIcon from '@/assets/img/icons/quote.svg'
import { useEffect, useState } from 'react'

export default function HomePage() {
    const [activeTab, setActiveTab] = useState(2)




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
    name: 'Danışmanlık & Analiz',
    location: '1. Adım',
    avatar: avatar1,
    text: 'İlk başvurunuzdan itibaren süreciniz uzman ekibimiz tarafından titizlikle değerlendirilir. İhtiyaçlarınız analiz edilir, beklentileriniz dinlenir ve size özel en uygun tedavi planı oluşturulur.'
  },
  {
    name: 'Kişiye Özel Uygulama',
    location: '2. Adım',
    avatar: avatar2,
    text: 'Tedavi süreciniz boyunca kendinizi güvende ve konforlu hissedersiniz. Uygulamalar, alanında uzman ekip tarafından hijyenik koşullarda gerçekleştirilir ve tüm aşamalar size detaylı şekilde aktarılır.'
  },
  {
    name: 'Doğal ve Kalıcı Sonuçlar',
    location: '3. Adım',
    avatar: avatar3,
    text: 'Uygulama sonrasında cildinizdeki yenilenmeyi ve elde edilen doğal sonuçları net şekilde gözlemleyebilirsiniz. Profesyonel yaklaşımımız sayesinde hem görünümünüzde hem de özgüveninizde fark yaratan bir deneyim yaşarsınız.'
  }
]

const departments = [
  { icon: dep1, title: 'Diş', slug: 'dis' },
  { icon: dep2, title: 'Genital', slug: 'genital' },
  { icon: dep3, title: 'Göğüs', slug: 'gogus' },
  { icon: dep4, title: 'Göz', slug: 'goz' },
  { icon: dep5, title: 'Kalça', slug: 'kalca' },
  { icon: dep6, title: 'Kulak', slug: 'kulak' },
  { icon: dep7, title: 'Boyun ve Yüz', slug: 'boyun-ve-yuz' },
  { icon: dep8, title: 'Burun', slug: 'burun-estetigi' },
  { icon: dep9, title: 'Saç Ekimi', slug: 'sac-ekimi' },
  { icon: dep10, title: 'Vücut', slug: 'vucut-sekillendirme-liposuction' },
]
const words = ['Dentist', 'Crutches', 'Laboratory', 'Cardiology', 'Neurology']
const [activeIndex, setActiveIndex] = useState(0)

useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex(prev => (prev + 1) % words.length)
  }, 2500)

  return () => clearInterval(interval)
}, [])


  return (
    <>


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
  Take Best Treatment with Our{' '}
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
              We are committed to providing you with the best medical and
              healthcare services.
            </p>
<Link href="/medical/form" className="cs_btn cs_style_1" style={{marginTop:'20px'}}>
  <span>Başvuru Yap</span>
</Link>


          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-lg-6 text-end">
          <Image
            src={heroImg}
            alt="Hero"
            width={800}
            height={800}
            priority
            style={{ maxWidth: '100%', height: 'auto' }}
          />
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
      >
        <Image src={item.icon} alt={item.title} width={48} height={48} />
        <p className="cs_department_title cs_medium cs_heading_color cs_fs_20 mb-0">
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
          <h3 className="cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_fs_32">
            Of our clients
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
                    <Image src={item.avatar} alt={item.name} width={80} height={80} />
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


      {/* VALUES */}
      <section className="cs_shape_wrap" style={{ marginTop: '15vh' }}>
        <div className="container">
          <div className="cs_section_heading text-center "style={{ marginBottom: '10vh' }}>
            <h2 className="cs_section_title cs_fs_72">Our Values</h2>
          </div>

          <div className="cs_random_features">
           {[
        {
          title: 'Compassion',
          desc: 'We treat every patient with empathy, care, and genuine understanding.',
          icon: compassion,
        },
        {
          title: 'Excellence',
          desc: 'We strive for the highest standards in medical quality and service.',
          icon: excellence,
        },
        {
          title: 'Integrity',
          desc: 'We act with honesty, transparency, and strong moral principles.',
          icon: integrity,
        },
        {
          title: 'Respect',
          desc: 'We value every individual and respect their needs and choices.',
          icon: respect,
        },
        {
          title: 'Teamwork',
          desc: 'We work together across disciplines to deliver the best outcomes.',
          icon: teamwork,
        },
      ].map((item, i) => (
              <div key={i} className="cs_random_features_col">
                <div className="cs_feature cs_style_1 cs_shadow_1 cs_radius_25 cs_white_bg">
                  <h2 className="cs_feature_title cs_fs_40 cs_center" >
                    <span className="cs_feature_icon cs_accent_bg cs_center rounded-circle">
                      <Image src={item.icon} alt={item.title} width={60} height={60} />
                    </span>
                    <span >{item.title}</span>
                    
                  </h2>
                   <p className="cs_feature_desc cs_heading_color" >
              {item.desc}
            </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     


     {/* BLOG */}
<section>
  <div className="container">

    {/* HEADING */}
    <div className="cs_section_heading cs_style_1 text-center">

      <div className="cs_height_5"></div>
      <h2 className="cs_section_title cs_fs_72 m-0" >
       Blog
      </h2>
    </div>

    <div className="cs_height_72 cs_height_lg_50"></div>

    {/* POSTS */}
    <div className="row gy-4">
      {[
        {
          img: post1,
          title: 'The Benefits of Mindfulness Meditation for Stress and Anxiety',
        },
        {
          img: post2,
          title: 'Healthy Eating on a Budget: Tips and Strategies',
        },
        {
          img: post3,
          title: 'The Importance of Regular Cancer Screenings and Early Detection',
        },
      ].map((post, i) => (
        <div key={i} className="col-lg-4">
          <div className="cs_post cs_style_1">

            {/* THUMB */}
            <Link href="/blog" className="cs_post_thumb cs_view_mouse">
              <Image
                src={post.img}
                alt={post.title}
                width={400}
                height={300}
              />
            </Link>

            {/* INFO */}
            <div className="cs_post_info">
              <div>
                <div className="cs_post_meta">
                  <div className="cs_posted_by">May 1, 2023</div>

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

                <h2 className="cs_post_title cs_semibold cs_fs_32">
                  <Link href="/blog">{post.title}</Link>
                </h2>
              </div>

              <div className="cs_heading_color cs_medium">
                <Link href="/blog" className="cs_post_btn">
                  Learn More
                </Link>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>
</section>


{/* BRANDS */}
<section>
  <div className="container" style={{ marginTop: '15vh' }}>
    <div className="cs_brands cs_style_1 cs_brand_marquee">
      <div className="cs_brands_track">
        {[brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8,
          brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8
        ].map((brand, i) => (
          <div key={i} className="cs_brand cs_center">
            <Image src={brand} alt="Brand" width={120} height={60} />
          </div>
        ))}
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
