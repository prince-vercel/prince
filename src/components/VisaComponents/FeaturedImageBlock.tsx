'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import '../../i18n'

export default function FeaturedImageBlock() {
  const { t } = useTranslation()
  
  const features = t('visa.featured.features', { returnObjects: true }) as string[]
  
  // Icon paths'i ekle
  const featuresWithIcons = [
    { title: features[0], icon: '/visa/uploads/icons/1765240574_dfce9e0f1e5bc7e1c524.svg' },
    { title: features[1], icon: '/visa/uploads/icons/1765240574_e56f5f0af6ab942ee106.svg' },
    { title: features[2], icon: '/visa/uploads/icons/1765240574_ca2ff7d8096738745f67.svg' },
    { title: features[3], icon: '/visa/uploads/icons/1765240574_1d9915c577aa7dc8f8ea.svg' },
    { title: features[4], icon: '/visa/uploads/icons/1765240574_bdc92e3562e859d8ee05.svg' },
    { title: features[5], icon: '/visa/uploads/icons/1765240574_a73bd471175491f12fc7.svg' },
  ]
  return (
    <section className="section">
      <div className="container">
        <div className="section-head" data-scroll-animation>
          <span className="heading-2 colorfull">
            {t('visa.featured.title')}
          </span>
        </div>
        <div className="featured-image-block">
          <div className="img">
            <Image
              src="/visa/uploads/contents/main/1764368714_c0efee420e7155ec8653.webp"
              alt={t('visa.featured.title')}
              width={965}
              height={677}
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className="content" data-scroll-animation>
            <div className="heading-3 colorfull">
              <p>
                <strong>
                  {(() => {
                    const desc = t('visa.featured.description')
                    const parts = desc.split('hızlı, kolay ve tek')
                    return (
                      <>
                        {parts[0]}
                        <span style={{ color: '#ff0000' }}>hızlı, kolay ve tek</span>
                        {parts[1]}
                      </>
                    )
                  })()}
                </strong>
              </p>
            </div>
            <div className="list-huge">
              {featuresWithIcons.map((feature, index) => (
                <div key={index} className="icon-list-item">
                  <span className="icon">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={30}
                      height={30}
                      decoding="async"
                      loading="lazy"
                    />
                  </span>
                  <span className="body semibold">{feature.title}</span>
                </div>
              ))}
            </div>
            <Link title={t('visa.featured.cta')} href="/visa/basvuru-yap" className="btn btn-primary">
              {t('visa.featured.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

