'use client'

import { db } from '@/src/lib/firebase'
import { Hospital, Hotel, OrganisationItem } from '@/src/types/types'
import { collection, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useSafeTranslation } from '@/src/hooks/useSafeTranslation'
import { getCollectionName } from '@/src/lib/localization'
import i18n from '@/src/i18n'
import '@/src/i18n'

const ITEMS_PER_PAGE = 3


export default function OrganisationPage() {
  const { t, isReady } = useSafeTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [organisations, setOrganisations] = useState<OrganisationItem[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch data on mount
  useEffect(() => {
    fetchOrganisations()
  }, [i18n.language])

  const fetchOrganisations = async () => {
    try {
      setLoading(true)
      const allOrganisations: OrganisationItem[] = []
      const baseCollection = getCollectionName('medicalcontents', i18n.language)

      // Fetch hotels
      const hotelsRef = collection(db, `${baseCollection}/hotels/list`)
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
        }
      })
      allOrganisations.push(...hotels)

      setOrganisations(allOrganisations)
    } catch (error) {
      console.error(isReady ? t('medical.pages.organisation.error') : 'Kurumlar çekilirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = useMemo(() => {
    return organisations
  }, [organisations])

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
              <Link href="/medical" style={{ color: '#fff' }} suppressHydrationWarning>{isReady ? t('medical.pages.breadcrumb.home') : ''}</Link>
            </li>
            <li className="breadcrumb-item2 active" style={{ color: '#fff' }} suppressHydrationWarning>{isReady ? t('medical.header.organisation') : ''}</li>
          </ol>

          <div className="cs_banner_text">
            <h2 className="cs_banner_title cs_fs_72" style={{ color: '#fff' }} suppressHydrationWarning>
              {isReady ? t('medical.pages.organisation.title') : ''}
            </h2>

          </div>
        </div>
      </section>

      <div className="cs_height_65" />

      <div className="container" style={{marginTop:'25px'}}>


        <div className="cs_height_65" />

        <div className="row cs_gap_y_40">
          {loading ? (
            <div style={{ width: '100%', textAlign: 'center', padding: '40px' }}>
              <p suppressHydrationWarning>{isReady ? t('medical.pages.organisation.loading') : ''}</p>
            </div>
          ) : paginatedItems.length === 0 ? (
            <div style={{ width: '100%', textAlign: 'center', padding: '40px' }}>
              <p suppressHydrationWarning>{isReady ? t('medical.pages.organisation.noOrganisations') : ''}</p>
            </div>
          ) : (
            paginatedItems.map((item) => (
              <div key={item.id} className="col-xl-4 col-lg-4 col-md-6">
                <div className="cs_team cs_style_1 cs_type_2 cs_radius_10 overflow-hidden">
                  <div className="cs_member_img" style={{ height: '250px', overflow: 'hidden' }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={250}
                      height={300}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div className="cs_team_meta cs_white_bg" style={{ padding: '12px 15px', textAlign: 'center' }}>
                    <h3 className="cs_member_name cs_fs_32" style={{ fontSize: '18px', marginBottom: '6px', fontWeight: '500' }}>{item.name}</h3>
                    <p className="cs_member_description" style={{ fontSize: '14px', marginBottom: 0, color: '#666' }}>{item.desc}</p>
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
                width={300}
                height={200}
              />
            </div>

            <h2 className="cs_banner_title cs_fs_72" suppressHydrationWarning>
              {isReady ? t('medical.pages.organisation.banner.title') : ''}
            </h2>

            <p className="cs_banner_subtitle cs_fs_20 cs_medium m-0" suppressHydrationWarning>
              {isReady ? t('medical.pages.organisation.banner.subtitle') : ''}
            </p>
          </div>
        </div>
      </section>
      <div className="cs_height_200" />

      -    </>
  )
}
