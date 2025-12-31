'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Header from '@/src/components/MedicalComponents/Header'
import Footer from '@/src/components/MedicalComponents/Footer'

import avatar1 from '@/assets/img/home_4/avatar_1.png'
import avatar2 from '@/assets/img/home_4/avatar_2.png'
import avatar3 from '@/assets/img/home_4/avatar_3.png'
import avatar4 from '@/assets/img/home_4/avatar_4.png'
import avatar5 from '@/assets/img/home_4/avatar_5.png'

import g1 from '@/assets/img/doctors/doctor_1.png'
import g2 from '@/assets/img/doctors/doctor_2.png'
import g3 from '@/assets/img/doctors/doctor_1.png'
import g4 from '@/assets/img/doctors/doctor_2.png'
import g5 from '@/assets/img/doctors/doctor_1.png'
import g6 from '@/assets/img/doctors/doctor_2.png'
import g7 from '@/assets/img/doctors/doctor_1.png'
import g8 from '@/assets/img/doctors/doctor_2.png'
import g9 from '@/assets/img/doctors/doctor_1.png'
import g10 from '@/assets/img/doctors/doctor_2.png'
import g11 from '@/assets/img/doctors/doctor_1.png'
import g12 from '@/assets/img/doctors/doctor_2.png'

import leftArrow from '@/assets/img/icons/left_arrow_blue.svg'
import rightArrow from '@/assets/img/icons/right_arrow_blue.svg'

const GALLERY_PER_PAGE = 9

export default function ResultsPage() {
  const testimonials = [
    { name: 'Allen Duarte', city: 'California, USA', avatar: avatar1, text: 'I had a great experience with ProHealth. The staff were friendly and professional.' },
    { name: 'Sophia Torres', city: 'New York, USA', avatar: avatar2, text: 'I recently had to bring my child to ProHealth and was impressed with the care.' },
    { name: 'John Dupont', city: 'Manhattan, USA', avatar: avatar3, text: 'ProHealth has been a game-changer for me. Doctors are caring and skilled.' },
    { name: 'Emily Carter', city: 'Boston, USA', avatar: avatar4, text: 'Amazing service and very professional staff. Highly recommended.' },
    { name: 'Michael Brown', city: 'Chicago, USA', avatar: avatar5, text: 'From start to finish, everything was smooth and reassuring.' },
  ]

  const categoryMap: Record<string, string> = {
    all: 'Tümü',
    dis: 'Diş',
    genital: 'Genital',
    gogus: 'Göğüs',
    goz: 'Göz',
    kalca: 'Kalça',
    kulak: 'Kulak',
    'boyun-ve-yuz': 'Boyun ve Yüz',
    burun: 'Burun',
    'sac-ekimi': 'Saç Ekimi',
    'vucut-sekillendirme-liposuction': 'Vücut Şekillendirme ve Liposuction',
  }

  const galleryItems = [
    { img: g1, category: 'dis' },
    { img: g2, category: 'burun' },
    { img: g3, category: 'sac-ekimi' },
    { img: g4, category: 'goz' },
    { img: g5, category: 'kalca' },
    { img: g6, category: 'vucut-sekillendirme-liposuction' },
    { img: g7, category: 'dis' },
    { img: g8, category: 'burun' },
    { img: g9, category: 'sac-ekimi' },
    { img: g10, category: 'goz' },
    { img: g11, category: 'kalca' },
    { img: g12, category: 'vucut-sekillendirme-liposuction' },
  ]

  const [startIndex, setStartIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState('all')
  const [galleryPage, setGalleryPage] = useState(1)

  const next = () => {
    if (startIndex < testimonials.length - 2) setStartIndex(startIndex + 1)
  }

  const prev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1)
  }

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 2)

  const filteredGallery =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === activeFilter)

  const totalGalleryPages = Math.ceil(filteredGallery.length / GALLERY_PER_PAGE)

  const paginatedGallery = filteredGallery.slice(
    (galleryPage - 1) * GALLERY_PER_PAGE,
    galleryPage * GALLERY_PER_PAGE
  )

  return (
    <>
      <Header />

      <div className="cs_height_190 cs_height_xl_150 cs_height_lg_105" />

      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/medical">Anasayfa</Link>
          </li>
          <li className="breadcrumb-item active">Mutlu Sonuçlar</li>
        </ol>

        <div className="cs_height_200 cs_height_xl_150 cs_height_lg_110" />

        <div style={{ marginTop: 50 }}>
          <div className="cs_doctors_heading">
            <div className="cs_isotop_filter cs_style1">
              <select
                value={activeFilter}
                onChange={e => {
                  setActiveFilter(e.target.value)
                  setGalleryPage(1)
                }}
                style={{
                  padding: '10px 44px 10px 16px',
                  borderRadius: '30px',
                  border: '1px solid #ddd',
                  minWidth: '260px',
                  cursor: 'pointer',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  backgroundImage:
                    'url("data:image/svg+xml;utf8,<svg fill=\'%23666\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  backgroundSize: '20px',
                }}
              >
                {Object.entries(categoryMap).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="cs_view_box">
              <span>Showing {filteredGallery.length} items</span>
            </div>
          </div>

          <div className="cs_height_40" />

          <div className="row cs_gap_y_40 cs_filter_wrapper">
            {paginatedGallery.map((item, i) => (
              <div key={i} className="col-xl-4 col-lg-4 col-md-6 cs_filter_item">
                <div className="cs_radius_20 overflow-hidden">
                  <Image
                    src={item.img}
                    alt="Gallery"
                    width={600}
                    height={500}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {totalGalleryPages > 1 && (
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
        </div>

        <div className="row" style={{ marginTop: 80 }}>
          <div className="col-lg-5">
            <div className="cs_section_heading cs_style_1">
              <h3 className="cs_section_subtitle cs_accent_color cs_fs_32">WHAT OUR PATIENTS SAY</h3>
              <h2 className="cs_section_title cs_fs_72">
                Discover the Stories of Health and Healing
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
                  <Image src={leftArrow} alt="Prev" />
                </div>
                <div
                  className="cs_slider_next cs_center cs_shadow_2"
                  onClick={next}
                  style={{
                    cursor: 'pointer',
                    opacity: startIndex >= testimonials.length - 2 ? 0.4 : 1,
                  }}
                >
                  <Image src={rightArrow} alt="Next" />
                </div>
              </div>

              <div className="cs_height_60" />

              <div className="row" style={{ marginTop: 30 }}>
                {visibleTestimonials.map((item, i) => (
                  <div key={i} className="col-md-6">
                    <div className="cs_testimonial cs_style_4 cs_radius_20" style={{ minHeight: 340, padding: 40 }}>
                      <div className="cs_testimonial_meta">
                        <div className="cs_testimonial_avatar">
                          <Image src={item.avatar} alt={item.name} />
                        </div>
                        <div>
                          <h3 className="cs_fs_24 cs_semibold m-0">{item.name}</h3>
                          <p className="cs_heading_color m-0">{item.city}</p>
                        </div>
                      </div>

                      <div className="cs_testimonial_text cs_heading_color cs_fs_20" style={{ minHeight: 120 }}>
                        <p>“{item.text}”</p>
                      </div>

                      <div className="cs_rating cs_accent_color">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fa-solid fa-star" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
