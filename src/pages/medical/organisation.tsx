'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/src/lib/firebase'
import { getDocs, collection } from 'firebase/firestore'

const ITEMS_PER_PAGE = 3

interface Hotel {
  id: string
  name: string
  location: string
  stars: number
  image: string
}

interface Hospital {
  id: string
  name: string
  location: string
  image: string
}

interface OrganisationItem {
  id: string
  name: string
  location: string
  type: 'Oteller' | 'Hastaneler'
  desc: string
  image: string
  stars?: number
}

export default function OrganisationPage() {
  const [activeFilter, setActiveFilter] = useState<'Tümü' | 'Oteller' | 'Hastaneler'>('Tümü')
  const [selectedStars, setSelectedStars] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [organisations, setOrganisations] = useState<OrganisationItem[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch data on mount
  useEffect(() => {
    fetchOrganisations()
  }, [])

  const fetchOrganisations = async () => {
    try {
      setLoading(true)
      const allOrganisations: OrganisationItem[] = []

      // Fetch hotels
      const hotelsRef = collection(db, 'medicalcontents/hotels/list')
      const hotelsSnapshot = await getDocs(hotelsRef)
      const hotels = hotelsSnapshot.docs.map((doc) => {
        const data = doc.data() as Hotel
        return {
          id: data.id,
          name: data.name,
          location: data.location,
          type: 'Oteller' as const,
          desc: `${data.location}`,
          image: data.image,
          stars: data.stars,
        }
      })
      allOrganisations.push(...hotels)

      // Fetch hospitals
      const hospitalsRef = collection(db, 'medicalcontents/hospitals/list')
      const hospitalsSnapshot = await getDocs(hospitalsRef)
      const hospitals = hospitalsSnapshot.docs.map((doc) => {
        const data = doc.data() as Hospital
        return {
          id: data.id,
          name: data.name,
          location: data.location,
          type: 'Hastaneler' as const,
          desc: `${data.location}`,
          image: data.image,
        }
      })
      allOrganisations.push(...hospitals)

      setOrganisations(allOrganisations)
    } catch (error) {
      console.error('Kurumlar çekilirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = useMemo(() => {
    let list = organisations

    if (activeFilter !== 'Tümü') {
      list = list.filter(item => item.type === activeFilter)
    }

    if (activeFilter === 'Oteller' && selectedStars.length > 0) {
      list = list.filter(item => item.stars && selectedStars.includes(item.stars))
    }

    return list
  }, [activeFilter, selectedStars, organisations])

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredItems.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredItems, currentPage])

  return (
    <>


      <section style={{ background: '#4f8edc', padding: '20px 0 20px 0' }}>
        <div className="container" style={{ marginBottom: '20px', marginTop: '-45px' }}>
          <ol className="breadcrumb2" style={{ color: '#fff', marginLeft: '0' }}>
            <li className="breadcrumb-item2" style={{ color: '#fff' }}>
              <Link href="/medical" style={{ color: '#fff' }}>Anasayfa</Link>
            </li>
            <li className="breadcrumb-item2 active" style={{ color: '#fff' }}>Kurumlar</li>
          </ol>

          <div className="cs_banner_text">
            <h2 className="cs_banner_title cs_fs_72" style={{ color: '#fff' }}>
              Kurumlarımız
            </h2>
            <p className="cs_banner_subtitle cs_fs_20" style={{ color: '#fff' }}>
              Oteller ve hastaneler arasından ihtiyacınıza uygun olanı seçin.
            </p>
          </div>
        </div>
      </section>

      <div className="cs_height_65" />

      <div className="container">
        <div className="cs_doctors_heading">
          <div className="cs_isotop_filter cs_style1 mb-5 mt-3">
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
                      borderRadius: '16px',
                      transition: 'all .3s ease',
                      background:
                        activeFilter === key
                          ? '#4f8edc'
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
            <span>{filteredItems.length} Öğe</span>
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
      style={{ width: '16px', height: '16px', cursor: 'pointer' }}

                />
                <span style={{ marginLeft: 8 }}>{star} Yıldız</span>
              </label>
            ))}
          </div>
        )}

        <div className="cs_height_65" />

        <div className="row cs_gap_y_40">
          {loading ? (
            <div style={{ width: '100%', textAlign: 'center', padding: '40px' }}>
              <p>Yükleniyor...</p>
            </div>
          ) : paginatedItems.length === 0 ? (
            <div style={{ width: '100%', textAlign: 'center', padding: '40px' }}>
              <p>Bu kriterlere uygun kurum bulunamadı</p>
            </div>
          ) : (
            paginatedItems.map((item) => (
              <div key={item.id} className="col-xl-4 col-lg-4 col-md-6">
                <div className="cs_team cs_style_1 cs_type_2 text-center cs_radius_20 overflow-hidden">
                  <div className="cs_member_img" style={{ height: '250px', overflow: 'hidden' }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={250}
                      height={300}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {item.type === 'Oteller' && item.stars && (
                      <div className="cs_label cs_white_color cs_accent_bg">
                        {item.stars} Yıldız
                      </div>
                    )}
                  </div>

                  <div className="cs_team_meta cs_white_bg" style={{ padding: '12px 15px' }}>
                    <h3 className="cs_member_name cs_fs_32" style={{ fontSize: '18px', marginBottom: '6px', fontWeight: '500' }}>{item.name}</h3>
                    <p className="cs_member_description" style={{ fontSize: '14px', marginBottom: 0 }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))
          )}
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

      <section className="cs_footer_margin_0">
        <div className="container">
          <div className="cs_banner cs_style_9 cs_white_bg cs_radius_30">
            <div className="cs_banner_img">
              <Image
                src="/assets/img/doctors/banner_img_3.png"
                alt="Banner"
                width={600}
                height={400}
              />
            </div>

            <h2 className="cs_banner_title cs_fs_72">
              Sağlığınızı Geri <br /> Planda Bırakmayın!
            </h2>

            <p className="cs_banner_subtitle cs_fs_20 cs_medium m-0">
              Bugün deneyimli tıbbi profesyonellerimizden <br />
              biriyle randevu alın!
            </p>
          </div>
        </div>
      </section>
      <div className="cs_height_200" />

-    </>
  )
}
