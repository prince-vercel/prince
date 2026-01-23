'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'

export default function FeaturedImageBlock() {
  const { t, i18n } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Client-side mount kontrolü
  useEffect(() => {
    setMounted(true)
  }, [])

  const features = useMemo(() => {
    if (!mounted || !i18n.isInitialized) {
      return []
    }
    return t('visa.featured.features', { returnObjects: true }) as string[]
  }, [t, i18n.language, i18n.isInitialized, mounted])

  // Icon paths'i ekle
  const featuresWithIcons = useMemo(() => {
    if (!mounted || !i18n.isInitialized || features.length === 0) {
      return [
        { title: '', icon: '/visa/uploads/icons/1765240574_dfce9e0f1e5bc7e1c524.svg' },
        { title: '', icon: '/visa/uploads/icons/1765240574_e56f5f0af6ab942ee106.svg' },
        { title: '', icon: '/visa/uploads/icons/1765240574_ca2ff7d8096738745f67.svg' },
        { title: '', icon: '/visa/uploads/icons/1765240574_1d9915c577aa7dc8f8ea.svg' },
        { title: '', icon: '/visa/uploads/icons/1765240574_bdc92e3562e859d8ee05.svg' },
        { title: '', icon: '/visa/uploads/icons/1765240574_a73bd471175491f12fc7.svg' },
      ]
    }
    return [
      { title: features[0], icon: '/visa/uploads/icons/1765240574_dfce9e0f1e5bc7e1c524.svg' },
      { title: features[1], icon: '/visa/uploads/icons/1765240574_e56f5f0af6ab942ee106.svg' },
      { title: features[2], icon: '/visa/uploads/icons/1765240574_ca2ff7d8096738745f67.svg' },
      { title: features[3], icon: '/visa/uploads/icons/1765240574_1d9915c577aa7dc8f8ea.svg' },
      { title: features[4], icon: '/visa/uploads/icons/1765240574_bdc92e3562e859d8ee05.svg' },
      { title: features[5], icon: '/visa/uploads/icons/1765240574_a73bd471175491f12fc7.svg' },
    ]
  }, [features, mounted, i18n.isInitialized])
  return (
    <section className="section">
      <div className="container">
        <div className="section-head" data-scroll-animation>
          <span className="heading-2 colorfull" suppressHydrationWarning>
            {mounted && i18n.isInitialized ? t('visa.featured.title') : ''}
          </span>
        </div>
        <div className="featured-image-block">
          <div className="img">
            <Image
              src="/visa/uploads/contents/main/banner-2.jpeg"
              alt={mounted && i18n.isInitialized ? t('visa.featured.title') : ''}
              width={965}
              height={677}
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className="content" data-scroll-animation>
            <div className="heading-3 colorfull">
              <p>
                <strong suppressHydrationWarning>
                  {mounted && i18n.isInitialized
                    ? (() => {
                      const desc = t('visa.featured.description') as string
                      const highlight = t('visa.featured.highlight') as string

                      const index = desc.indexOf(highlight)

                      // Eğer highlight metni description içinde yoksa,
                      // sonuna ekleyerek göster.
                      if (index === -1) {
                        return (
                          <>
                            {desc}{' '}
                            <span style={{ color: '#ff0000' }}>{highlight}</span>
                          </>
                        )
                      }

                      const before = desc.slice(0, index)
                      const after = desc.slice(index + highlight.length)

                      return (
                        <>
                          {before}
                          <span style={{ color: '#ff0000' }}>{highlight}</span>
                          {after}
                        </>
                      )
                    })()
                    : ''}
                </strong>
              </p>
            </div>
            <div className="list-huge">
              {featuresWithIcons.map((feature, index) => (
                <div key={index} className="icon-list-item">
                  <span className="icon">
                    <Image
                      src={feature.icon}
                      alt={feature.title || ''}
                      width={30}
                      height={30}
                      decoding="async"
                      loading="lazy"
                    />
                  </span>
                  <span className="body semibold" suppressHydrationWarning>{feature.title}</span>
                </div>
              ))}
            </div>
            <Link
              title={mounted && i18n.isInitialized ? t('visa.featured.cta') : ''}
              href="/visa/basvuru-yap"
              className="btn btn-primary"
              suppressHydrationWarning
            >
              {mounted && i18n.isInitialized ? t('visa.featured.cta') : ''}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

