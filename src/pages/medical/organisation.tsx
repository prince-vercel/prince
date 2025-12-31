'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Header from '@/src/components/MedicalComponents/Header'
import Footer from '@/src/components/MedicalComponents/Footer'

const ITEMS_PER_PAGE = 3

const organisations = [
  {
    img: 'hotel_1.png',
    name: 'Luxury Health Hotel',
    type: 'Oteller',
    desc: 'Deniz manzaralı, sağlık turizmine uygun lüks otel.',
    stars: 5,
  },
  {
    img: 'hotel_2.png',
    name: 'City Medical Hotel',
    type: 'Oteller',
    desc: 'Merkezi konum, uygun fiyatlı konaklama.',
    stars: 4,
  },
  {
    img: 'hotel_3.png',
    name: 'Comfort Stay Hotel',
    type: 'Oteller',
    desc: 'Ameliyat sonrası konaklama için ideal.',
    stars: 3,
  },
  {
    img: 'hospital_1.png',
    name: 'MedCare Hospital',
    type: 'Hastaneler',
    desc: 'Uluslararası sertifikalı özel hastane.',
  },
  {
    img: 'hospital_2.png',
    name: 'HealthPlus Hospital',
    type: 'Hastaneler',
    desc: 'Estetik ve cerrahi alanlarında uzman.',
  },
]

export default function OrganisationPage() {
  const [activeFilter, setActiveFilter] = useState<'Tümü' | 'Oteller' | 'Hastaneler'>('Tümü')
  const [selectedStars, setSelectedStars] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const filteredItems = useMemo(() => {
    let list = organisations

    if (activeFilter !== 'Tümü') {
      list = list.filter(item => item.type === activeFilter)
    }

    if (activeFilter === 'Oteller' && selectedStars.length > 0) {
      list = list.filter(item => selectedStars.includes(item.stars!))
    }

    return list
  }, [activeFilter, selectedStars])

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredItems.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredItems, currentPage])

  return (
    <>
      <Header />

      <section>
        <div className="container" style={{ marginBottom: 20 }}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/medical">Anasayfa</Link>
            </li>
            <li className="breadcrumb-item active">Kurumlar</li>
          </ol>

          <div className="cs_banner_text">
            <h2 className="cs_banner_title cs_fs_72">
              Kurumlarımız
            </h2>
            <p className="cs_banner_subtitle cs_fs_20 cs_heading_color">
              Oteller ve hastaneler arasından ihtiyacınıza uygun olanı seçin
            </p>
          </div>
        </div>
      </section>

      <div className="cs_height_65" />

      <div className="container">
        <div className="cs_doctors_heading">
          <div className="cs_isotop_filter cs_style1">
            <p className="mb-0">Filtre</p>
            <ul className="cs_mp0">
              {(['Tümü', 'Oteller', 'Hastaneler'] as const).map(key => (
                <li key={key} className={activeFilter === key ? 'active' : ''}>
                  <button
                    onClick={() => {
                      setActiveFilter(key)
                      setSelectedStars([])
                      setCurrentPage(1)
                    }}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '30px',
                      transition: 'all .3s ease',
                      background:
                        activeFilter === key
                          ? 'linear-gradient(135deg,#86BBF1,#4f8edc)'
                          : 'transparent',
                      color: activeFilter === key ? '#fff' : 'inherit',
                    }}
                  >
                    {key}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="cs_view_box">
            <span>Showing {filteredItems.length} items</span>
          </div>
        </div>

        {activeFilter === 'Oteller' && (
          <div className="cs_white_bg cs_radius_20 p-4">

            {[3, 4, 5].map(star => (
              <label key={star} style={{ marginRight: 20, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedStars.includes(star)}
                  onChange={() => {
                    setSelectedStars(prev =>
                      prev.includes(star)
                        ? prev.filter(s => s !== star)
                        : [...prev, star]
                    )
                    setCurrentPage(1)
                  }}
                />
                <span style={{ marginLeft: 8 }}>{star} Yıldız</span>
              </label>
            ))}
          </div>
        )}

        <div className="cs_height_65" />

        <div className="row cs_gap_y_40">
          {paginatedItems.map((item, i) => (
            <div key={i} className="col-xl-4 col-lg-4 col-md-6">
              <div className="cs_team cs_style_1 cs_type_2 text-center cs_radius_20 overflow-hidden">
                <div className="cs_member_img">
                  <Image
                    src={`/assets/img/organisations/${item.img}`}
                    alt={item.name}
                    width={500}
                    height={500}
                  />
                  {item.type === 'Oteller' && (
                    <div className="cs_label cs_white_color cs_accent_bg">
                      {item.stars} Yıldız
                    </div>
                  )}
                </div>

                <div className="cs_team_meta cs_white_bg">
                  <h3 className="cs_member_name cs_fs_32">{item.name}</h3>
                  <p className="cs_member_description">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cs_height_60" />

        <ul className="cs_pagination_box">
          {Array.from({ length: totalPages }).map((_, i) => (
            <li key={i}>
              <button
                className={`cs_pagination_item ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="cs_height_200" />

      <Footer />
    </>
  )
}
