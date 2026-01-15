'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'

interface Service {
  title: string
  description: string
  image: string
  icon: string
  color: string
  href: string
  hasLink?: boolean // HTML'de 3. kartta link yok
}

export default function ServicesSection() {
  const { t } = useTranslation()

  const services: Service[] = [
    {
      title: t('visa.services.tourist.title'),
      description: t('visa.services.tourist.description'),
      image: '/visa/uploads/contents/main/1764367355_7e74c8429d5680f5f28d.webp',
      icon: '/visa/uploads/icons/1764367355_b367f9f58895e09e0ec7.svg',
      color: '#d4dcff',
      href: '/visa/blog',
      hasLink: true
    },
    {
      title: t('visa.services.work.title'),
      description: t('visa.services.work.description'),
      image: '/visa/uploads/contents/main/1764367445_d0670128a7e819c4fb67.webp',
      icon: '/visa/uploads/icons/1764367445_ae06cd22078c4b2aa2cd.svg',
      color: '#aacde1',
      href: '/visa/blog',
      hasLink: true
    },
    {
      title: t('visa.services.education.title'),
      description: t('visa.services.education.description'),
      image: '/visa/uploads/contents/main/1765240364_fd866e257cbbd3de11e3.webp',
      icon: '/visa/uploads/icons/1765240295_f0a93795a132689a07c9.svg',
      color: '#bcd9a9',
      href: '/visa/blog',
      hasLink: false // HTML'de 3. kartta link yok
    }
  ]
  // main.js'teki swiperCardSlider init fonksiyonunu çağır
  useEffect(() => {
    const initSwiper = () => {
      if (typeof window !== 'undefined' && (window as any).app?.swiperCardSlider?.init) {
        (window as any).app.swiperCardSlider.init()
      } else {
        // Script yüklenene kadar bekle
        setTimeout(initSwiper, 100)
      }
    }

    // Script yüklenmesini kontrol et
    const checkScript = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).app?.swiperCardSlider) {
        clearInterval(checkScript)
        initSwiper()
      }
    }, 50)

    // 5 saniye sonra timeout
    setTimeout(() => {
      clearInterval(checkScript)
    }, 5000)

    return () => {
      clearInterval(checkScript)
    }
  }, [])

  return (
    <section className="section">
      <div className="container">
        <div className="section-head" data-scroll-animation>
          <span className="heading-2">
            {t('visa.services.title').split('\n').map((line, i) => (
              <span key={i}>
                {i === 0 ? line : <><br /><b>{line}</b></>}
              </span>
            ))}
          </span>
        </div>
        <div className="swiper swiper-card-slider">
          <div className="swiper-wrapper">
            {services.map((service, index) => (
              <div key={index} className="swiper-slide">
                <div style={{ '--color': service.color } as React.CSSProperties} className="service-card">
                  {service.hasLink ? (
                    <Link title={service.title} href={service.href} className="img">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={330}
                        height={336}
                        decoding="async"
                        loading="lazy"
                      />
                      <span className="icon">
                        <Image
                          src="/visa/assets/img/icon/arrow-up-right-circle-solid.svg"
                          alt={service.title}
                          width={44}
                          height={44}
                          decoding="async"
                          loading="lazy"
                        />
                      </span>
                    </Link>
                  ) : (
                    <div className="img">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={330}
                        height={336}
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="content-block">
                    <span className="icon">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={30}
                        height={30}
                        decoding="async"
                        loading="lazy"
                      />
                    </span>
                    {service.hasLink ? (
                      <Link title={service.title} href={service.href} className="heading-4">
                        {service.title}
                      </Link>
                    ) : (
                      <span className="heading-4">{service.title}</span>
                    )}
                    <div className="body-sm">
                      <p>{service.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  )
}

