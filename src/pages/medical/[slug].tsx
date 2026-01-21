'use client'

import { db } from '@/src/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { TreatmentItem } from '@/src/types/types'
import { getCollectionName } from '@/src/lib/localization'
import i18n from '@/src/i18n'


const slugToTurkishTitle = (slug: string) => {
  const map: Record<string, string> = {
    dis: 'Diş',
    genital: 'Genital',
    gogus: 'Göğüs',
    goz: 'Göz',
    kalca: 'Kalça',
    kulak: 'Kulak',
    'boyun-ve-yuz': 'Boyun ve Yüz',
    burun: 'Burun',
    'sac-ekimi': 'Saç Ekimi',
    'vucut-sekillendirme-liposuction':
      'Vücut Şekillendirme ve Liposuction',
  }

  return map[slug] ?? slug
}


export default function MedicalDetailPage() {
  const router = useRouter()
  const { slug } = router.query

  const [treatments, setTreatments] = useState<TreatmentItem[]>([])
  const [content, setContent] = useState({
    title: '',
    description: '',
    image: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [language, setLanguage] = useState(i18n.language)

  useEffect(() => {
    const handleLanguageChange = () => setLanguage(i18n.language)
    i18n.on('languageChanged', handleLanguageChange)
    return () => i18n.off('languageChanged', handleLanguageChange)
  }, [])

  useEffect(() => {
    if (!slug) return

    const fetchContent = async () => {
      setIsLoading(true)
      setError('')
      try {
        const collectionName = getCollectionName('medicalcontents', language)
        const docRef = doc(db, collectionName, String(slug))
        const snapshot = await getDoc(docRef)

        if (snapshot.exists()) {
          const data = snapshot.data()
          setContent({
            title: data.title || '',
            description: data.description || '',
            image: data.image || ''
          })
          setTreatments(data.treatments || [])
        } else {
          setError('İçerik bulunamadı')
          setTreatments([])
        }
      } catch (err) {
        console.error('Veri çekilirken hata:', err)
        setError('Veri çekilirken hata oluştu')
        setTreatments([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [slug, language])

  return (
    <>
      <section style={{ background: '#4f8edc', padding: '20px 0 20px 0' }}>
        <div className="container" style={{ marginBottom: '20px', marginTop: '-45px' }}>
          <ol className="breadcrumb2" style={{ color: '#fff', marginLeft: '0' }}>
            <li className="breadcrumb-item2" style={{ color: '#fff' }}>
              <Link href="/medical" style={{ color: '#fff' }}>Anasayfa</Link>
            </li>
            <li className="breadcrumb-item2 active" style={{ color: '#fff' }}>{slugToTurkishTitle(String(slug))}</li>
          </ol>

          <div className="cs_banner_text">

            <p className="cs_banner_subtitle cs_fs_20" style={{ color: '#fff' }}>
              Detaylı bilgi ve tedavi seçenekleri.
            </p>
          </div>
        </div>
      </section>

      <section className="cs_shape_wrap">
        <div className="container"  >
          <div className="row align-items-center justify-content-center mt-5">
            <div className="col-lg-4">
              <div className="cs_section_heading cs_style_1">
                <h2 className="cs_section_title cs_fs_72 m-0">    {content.title}</h2>
                <div className="cs_height_54"></div>
                <p style={{ whiteSpace: 'pre-wrap' }}>
                  {content.description}
                </p>
                <div className="cs_height_120"></div>
              </div>
            </div>
            <div className="col-lg-7 offset-lg-1">
              {content.image ? (
                <Image
                  src={content.image}
                  alt={slugToTurkishTitle(String(slug))}
                  width={400}
                  height={200}
                  quality={60}
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    display: 'block'
                  }}
                />
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="department-services" style={{ margin: '30px' }}>

        <div className="container"  style={{padding:'0 50px'}}>
          <div className="cs_section_heading cs_style_1 text-center">

            <div className="cs_height_5"></div>
            <h2 className="cs_section_title cs_fs_72 mt-5">
              Tedaviler
            </h2>
          </div>


          <div className="cs_iconbox_12_wrap">
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '40px', width: '100%' }}>
                <p>Tedaviler yükleniyor...</p>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '40px', width: '100%', color: '#dc2626' }}>
                <p>{error}</p>
              </div>
            ) : treatments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', width: '100%' }}>
                <p>Tedavi listesi bulunamadı</p>
              </div>
            ) : (
              treatments.map((item, i) => (
                <div key={i}>
                  <div className="cs_iconbox cs_style_12">
                    <div className="cs_iconbox_info cs_radius_20">
                      <span className="cs_iconbox_circle cs_accent_bg"></span>

                      <h2 className="cs_iconbox_title cs_semibold">
                        {item.title}
                      </h2>

                      <p
                        className="cs_iconbox_subtitle mb-0 cs_heading_color"
                        style={{ fontSize: '13px', width: '100%', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}
                      >
                        {item.description}
                      </p>
                    </div>

                    <div className="cs_iconbox_icon cs_center">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={160}
                          height={160}
                          quality={100}
                          loading="eager"
                          sizes="150px"
                          style={{
                            objectFit: 'cover',
                            borderRadius: '50%',
                            width: '150px',
                            height: '150px'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '150px',
                          height: '150px',
                          borderRadius: '50%',
                          background: '#e5e7eb'
                        }} />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* TREATMENTS */}
      <section>
        <div className="container" style={{padding:'0 50px',marginTop:'50px'}}>
          <div className="cs_section_heading cs_style_1">
            <h3 className="cs_section_subtitle cs_accent_color cs_fs_32">
              YÖNTEM TÜRLERİ
            </h3>
            <div className="cs_height_5"></div>
            <h2 className="cs_section_title cs_fs_72">
              Yöntemler
            </h2>
          </div>


          <div
            className="cs_iconbox_8_wrap cs_radius_30"
            style={{
              background: 'linear-gradient(154deg, #d2eaef 0%, #86bbf1 100%)',
              padding: '10px 30px',
              marginBottom: '20px',
            }}
          >
            <div className="row">
              {[
                {
                  icon: '/assets/img/departments/icon_9.svg',
                  title: 'Hasta Destek',
                  desc: 'Hastalarımıza süreç boyunca danışmanlık ve rehberlik hizmeti.',
                },
                {
                  icon: '/assets/img/departments/icon_10.svg',
                  title: 'Estetik Uygulamalar',
                  desc: 'Doğal ve güvenli medikal estetik çözümleri.',
                },
                {
                  icon: '/assets/img/departments/icon_11.svg',
                  title: 'Sağlık Hizmetleri',
                  desc: 'Uzman kadro ile kapsamlı sağlık çözümleri',
                },
                {
                  icon: '/assets/img/departments/icon_12.svg',
                  title: 'Gelişim Taramaları',
                  desc: 'Erken tanı için düzenli sağlık kontrolleri.',
                },
              ].map((item, i) => (
                <div key={i} className="col-xl-3 col-md-6">
                  <div className="cs_iconbox cs_style_8 text-center cs_radius_20">
                    <div className="cs_iconbox_icon rounded-circle cs_center">
                      <Image src={item.icon} alt={item.title} width={100} height={100} />
                    </div>
                    <h2 className="cs_iconbox_title cs_fs_32">
                      {item.title}
                    </h2>
                    <p className="cs_iconbox_subtitle m-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APPOINTMENT */}
      <section className="cs_shape_wrap">
        <div className="cs_shape_2">
      
        </div>


        <div
          className="container cs_radius_30"
          style={{
          }}
        >

          <div className="d-flex align-items-center justify-content-center">

            <div className="cs_section_heading cs_style_1 text-center">
              <h3 className="cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_fs_32">
              </h3>
              <div className="cs_animated_btn_wrap">

                <Link
                  href="/medical/form"
                  className="cs_btn cs_style_1 cs_center cs_animated_btn mt-2"
                  style={{
                    padding: '30px 60px',
                    fontSize: '20px',
                    fontWeight: '600',
                    minHeight: '70px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span>       Başvuru Ekle
                    →</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>


    </>
  )
}
