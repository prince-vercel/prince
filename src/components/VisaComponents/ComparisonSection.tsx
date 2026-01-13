'use client'


import Image from 'next/image'
import Link from 'next/link'

const withCilekVize = [
  'Vize başvuru süreçleri hızlı ve basittir.',
  'Başvuruların hızlı bir şekilde onaylanması',
  'Seyahat destek ve tavsiye hizmeti sunulur.',
  'Tek sabit fiyat ile bütçenizi koruyarak işlem yapma imkanı.',
  'Başvuru sürecindeki aşamalarda profesyonel destek.'
]

const withoutCilekVize = [
  'Vize evraklarıyla uğraşmak karmaşık olabilir.',
  'Hata yapma ve vize reddi riski artabilir.',
  'Başvuru onayı için belirsiz bir zaman çizelgesi olabilir.',
  'Farklı firmalara yüksek ücretler ödemek gerekebilir.',
  'Yanlış evrakları hazırlamak zorunda kalırsınız.'
]

export default function ComparisonSection() {
  return (
    <section className="section section-box-list">
      <div className="container">
        <div className="main-inner">
          <div className="section-head" data-scroll-animation>
            <span className="heading-2 colorfull">Karmaşık vize başvurularına elveda</span>
          </div>
          <div className="box-list">
            <div className="properties-box featured" data-scroll-animation>
              <div className="icon">
                <span className="heading-5">Çilek Vize İle</span>
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
                <span className="heading-5">Çilek Vize Olmadan</span>
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
            <Link title="Başvurunuzu Başlatın" href="/visa/basvuru-yap" className="btn btn-primary btn-has-icon">
              Başvurunuzu Başlatın
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

