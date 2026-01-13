'use client'

import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    icon: '/visa/uploads/icons/1765240574_dfce9e0f1e5bc7e1c524.svg',
    title: 'Müşteri Hizmetleri'
  },
  {
    icon: '/visa/uploads/icons/1765240574_e56f5f0af6ab942ee106.svg',
    title: 'Hizmet Sözleşmesi'
  },
  {
    icon: '/visa/uploads/icons/1765240574_ca2ff7d8096738745f67.svg',
    title: 'Vize Uzmanları İletişim'
  },
  {
    icon: '/visa/uploads/icons/1765240574_1d9915c577aa7dc8f8ea.svg',
    title: 'Vize Süreci'
  },
  {
    icon: '/visa/uploads/icons/1765240574_bdc92e3562e859d8ee05.svg',
    title: 'Evrak Başvuru'
  },
  {
    icon: '/visa/uploads/icons/1765240574_a73bd471175491f12fc7.svg',
    title: 'Sonuç'
  }
]

export default function FeaturedImageBlock() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head" data-scroll-animation>
          <span className="heading-2 colorfull">
            Vize belgelerini hızlandırmak hiç bu kadar kolay olmamıştı.
          </span>
        </div>
        <div className="featured-image-block">
          <div className="img">
            <Image
              src="/visa/uploads/contents/main/1764368714_c0efee420e7155ec8653.webp"
              alt="Vize belgelerini hızlandırmak hiç bu kadar kolay olmamıştı."
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
                  Saatlerce doğru evrak listesini aramaya son! Çilek Vize ile tüm resmi belgelerinizi{' '}
                  <span style={{ color: '#ff0000' }}>hızlı, kolay ve tek</span> bir kurumdan ayarlayıp vizeye başvurabilirsiniz. Vize uzmanlarından hemen bilgi alın.
                </strong>
              </p>
            </div>
            <div className="list-huge">
              {features.map((feature, index) => (
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
            <Link title="Başvurunuzu Başlatın" href="/visa/basvuru-yap" className="btn btn-primary">
              Başvurunuzu Başlatın
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

