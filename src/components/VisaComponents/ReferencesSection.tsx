'use client'

import { useTranslation } from 'react-i18next'
import '../../styles/visa/ReferencesSection.css'
import '../../i18n'

const references = [
  '/visa/uploads/contents/gallery/1764377449_cddfbf00a022a210eddf.svg',
  '/visa/uploads/contents/gallery/1764377465_69bd5eaf0243a68bf746.svg',
  '/visa/uploads/contents/gallery/1764377867_3403107884d2a354408f.webp',
  '/visa/uploads/contents/gallery/1764377867_ca4b595b4f2ff795c0a3.webp',
  '/visa/uploads/contents/gallery/1764377867_70f2079eee2098a5ab09.svg',
  '/visa/uploads/contents/gallery/1764377867_baa36f4570a07c7cfc52.svg',
  '/visa/uploads/contents/gallery/1764377867_bcf20d70ad21ae5d415e.webp',
  '/visa/uploads/contents/gallery/1764377867_bfe39da725b9bfbc1644.webp',
  '/visa/uploads/contents/gallery/1764377867_f2214777ba12189c3ba3.svg'
]

export default function ReferencesSection() {
  const { t } = useTranslation()
  
  // HTML'deki gibi: İlk track'te normal sırada 2 kopya, ikinci track'te ters sırada 2 kopya
  const track1Items = [...references, ...references]
  // İkinci track için ters sırada kopya oluştur (references'ı mutate etmemek için)
  const reversedRefs = [...references].reverse()
  const track2Items = [...reversedRefs, ...reversedRefs]

  return (
    <>
      <section className="section references-section-modern">
        <div className="container">
          <div className="references-header">
            <div className="header-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h2 className="references-title">{t('visa.references.title')}</h2>
            <p className="references-subtitle">{t('visa.references.subtitle')}</p>
          </div>
        </div>

        <div className="references-marquee-wrapper">
          <div className="marquee-track marquee-track-1">
            <div className="marquee-content">
              {track1Items.map((ref, index) => (
                <div key={`track1-${index}`} className="reference-item">
                  <img
                    src={ref}
                    alt={`Referans - ${index}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="marquee-track marquee-track-2">
            <div className="marquee-content reverse">
              {track2Items.map((ref, index) => (
                <div key={`track2-${index}`} className="reference-item">
                  <img
                    src={ref}
                    alt={`Referans - ${index}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

