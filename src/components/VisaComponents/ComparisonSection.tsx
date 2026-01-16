'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import '../../i18n'

export default function ComparisonSection() {
  const { t, isReady } = useSafeTranslation()

  const withCilekVize = useMemo(() => {
    if (!isReady) return []
    return t('visa.comparison.with.items', { returnObjects: true }) as string[]
  }, [t, isReady])

  const withoutCilekVize = useMemo(() => {
    if (!isReady) return []
    return t('visa.comparison.without.items', { returnObjects: true }) as string[]
  }, [t, isReady])
  return (
    <section className="section section-box-list">
      <div className="container">
        <div className="main-inner">
          <div className="section-head" data-scroll-animation>
            <span className="heading-2 colorfull" suppressHydrationWarning>
              {isReady ? t('visa.comparison.title') : ''}
            </span>
          </div>
          <div className="box-list">
            <div className="properties-box featured" data-scroll-animation>
              <div className="icon">
                <span className="heading-5" suppressHydrationWarning>
                  {isReady ? t('visa.comparison.with.title') : ''}
                </span>
              </div>
              {withCilekVize.map((item, index) => (
                <div key={index} className="item">
                  <div className="icon">
                    <Image
                      src="/visa/assets/img/icon/check.svg"
                      alt="..."
                      width={30}
                      height={30}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <span className="heading-5 semibold" suppressHydrationWarning>{item}</span>
                </div>
              ))}
            </div>
            <div className="properties-box" data-scroll-animation>
              <div className="icon">
                <span className="heading-5" suppressHydrationWarning>
                  {isReady ? t('visa.comparison.without.title') : ''}
                </span>
              </div>
              {withoutCilekVize.map((item, index) => (
                <div key={index} className="item">
                  <div className="icon">
                    <Image
                      src="/visa/assets/img/icon/minus-circle.svg"
                      alt="..."
                      width={30}
                      height={30}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <span className="heading-5 semibold" suppressHydrationWarning>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="btn-huge">
            <Link
              title={isReady ? t('visa.comparison.cta') : ''}
              href="/visa/basvuru-yap"
              className="btn btn-primary btn-has-icon"
              suppressHydrationWarning
            >
              {isReady ? t('visa.comparison.cta') : ''}
              <span className="icon">
                <Image
                  src="/visa/assets/img/icon/target-link.svg"
                  alt="Target"
                  width={53}
                  height={53}
                  decoding="async"
                  loading="lazy"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

