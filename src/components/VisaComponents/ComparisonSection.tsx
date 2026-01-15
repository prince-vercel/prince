'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import '../../i18n'

export default function ComparisonSection() {
  const { t } = useTranslation()
  
  const withCilekVize = t('visa.comparison.with.items', { returnObjects: true }) as string[]
  const withoutCilekVize = t('visa.comparison.without.items', { returnObjects: true }) as string[]
  return (
    <section className="section section-box-list">
      <div className="container">
        <div className="main-inner">
          <div className="section-head" data-scroll-animation>
            <span className="heading-2 colorfull">{t('visa.comparison.title')}</span>
          </div>
          <div className="box-list">
            <div className="properties-box featured" data-scroll-animation>
              <div className="icon">
                <span className="heading-5">{t('visa.comparison.with.title')}</span>
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
                  <span className="heading-5 semibold">{item}</span>
                </div>
              ))}
            </div>
            <div className="properties-box" data-scroll-animation>
              <div className="icon">
                <span className="heading-5">{t('visa.comparison.without.title')}</span>
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
                  <span className="heading-5 semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="btn-huge">
            <Link title={t('visa.comparison.cta')} href="/visa/basvuru-yap" className="btn btn-primary btn-has-icon">
              {t('visa.comparison.cta')}
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

