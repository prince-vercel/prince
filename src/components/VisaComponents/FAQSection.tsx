'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Turist vizesi nedir?',
    answer: 'Turist vizesi, bir kişinin turistik amaçlarla başka bir ülkeye seyahat etmesine izin veren resmi bir belgedir. Bu vize genellikle tatil, gezi, kültürel etkinlikler veya arkadaş ve akraba ziyareti gibi turistik faaliyetler için verilir. Turist vizesi, genellikle belirli bir süre için geçerlidir ve bu süre boyunca kişinin ülkeye giriş yapmasına ve kalmasına izin verir. Her ülkenin vize politikaları farklı olduğundan, turist vizesi başvuru süreci, gerekli belgeler ve vize süreleri ülkeye göre değişiklik gösterebilir.'
  },
  {
    question: 'Turist vizesi almak için pasaportum gerekli mi?',
    answer: 'Evet, tüm vize başvuruları için bir pasaporta ihtiyacınız var.'
  },
  {
    question: 'Turist vizesine başvurmak için neler gereklidir?',
    answer: 'Pasaportunuzun bulunması ve yurt dışına çıkış yasağınızın olmaması gerekmektedir.'
  },
  {
    question: 'Schengen vizesi nedir?',
    answer: "Avrupa Birliğine dahil olan ülkeler ve AB'ye üye olmayan İsviçre, İzlanda, Norveç ve Lichtenstein ülkelerine seyahat etmek amacıyla alınan vizedir. Tek bir ülkeye alınan schengen vizesi ile öncelikle vize aldığınız ülkeye giriş yapmak koşuluyla toplam 29 ülkeye seyahat edilebilmektedir."
  },
  {
    question: 'Çilek Vize benim için turist vizesini nasıl alır?',
    answer: 'Gidiş dönüş uçak bileti ve otel rezervasyonunuz tarafımızca konfirme olarak gösterilir, seyahat sağlık sigortanızı da biz gerçekleştiriyoruz. Vize uzmanlarımız tarafından niyet ve motivasyon mektuplarınız profesyonelce, kişiye özel hazırlanır. Başvuru formlarınızı biz dolduruyoruz. Kısacası tüm evrak takibiniz bize ait. Siz sadece konsolosluğa parmak izi, evrak teslimi için gidiyorsunuz.'
  },
  {
    question: "Çilek Vize'nin seyahat vizemi işleme koyması ne kadar sürer?",
    answer: 'Danışmanlık sözleşmesi sonrasında 24 saat içerisinde danışanımıza bir vize uzmanı atanır. Evrak hazırlığı ve randevu takibi sürecine başlanır. Bunlara ek olarak Amerika ve Schengen ülkelerinde vip randevu desteği sağlamaktayız.'
  },
  {
    question: 'Schengen Vizesinde süreç ne kadar sürüyor?',
    answer: 'Schengen vizesi alma süreci konsolosluk yoğunluğuna göre değişmektedir. Ortalama olarak 2 - 4 ay sürmektedir.'
  },
  {
    question: 'Davetiyemin olması vize sonucumu olumlu etkiler mi veya süreci kısaltır mı?',
    answer: 'Davetiyenizin olması vize sonucunuzu olumlu etkileyebilir ancak sürecinizi kısaltmaz.'
  },
  {
    question: 'Bir ülkeden aldığım Schengen vizesiyle diğer Schengen ülkelerine de gidebilir miyim?',
    answer: 'Öncelikle vizesini aldığınız ülkeye giriş yapmak koşuluyla tüm Schengen ülkelerine giriş yapabilirsiniz.'
  },
  {
    question: 'Aktif olarak çalışmıyorum, vize başvurumda sorun olur mu?',
    answer: 'Hayır sorun olmaz. Birinci dereceden bir yakınınız size sponsor olursa ya da hesabınızda gerekli miktarda para gösterirseniz başvuruda bulunabilirsiniz.'
  },
  {
    question: 'Kanada vize sonucumu beklediğim süreçte farklı bir Schengen ülkesinden vize-randevu alabilir miyim?',
    answer: 'Evet, alabilirsiniz.'
  },
  {
    question: 'Seyahat sağlık sigortasının süresi ne kadar oluyor?',
    answer: 'Seyahat planınızın süresine uygun sürede olmaktadır.'
  },
  {
    question: '18 yaşından küçüğüm, vize alabiliyor muyum?',
    answer: 'Anne ve babadan muvaffakatname olursa evet alabiliyoruz.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section section-faq">
      <div className="container">
        <div className="section-head" data-scroll-animation>
          <span className="heading-2 colorfull font-bold">🤔 Turist Vizesi SSS</span>
        </div>
        <div className="main-inner">
          <div className="accordion">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  className={`btn-accordion heading-4 ${openIndex === index ? 'active' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="accordion-icon">
                    <Image
                      src="/visa/assets/img/icon/accordion-caret.svg"
                      width={6}
                      height={9}
                      alt="Caret Down"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </button>
                {openIndex === index && (
                  <div className="accordion-inner">
                    <div className="body-sm">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="cta-card" data-scroll-animation>
            <strong className="heading-3">Başka bir sorunuz mu var?</strong>
            <div className="body-lg">
              <p>İhtiyacınız olan tüm cevapları vize uzmanlarımızdan hızlıca alabilirsiniz.</p>
            </div>
            <Link title="Vize Uzmanına Sor" href="/visa/basvuru-yap" className="btn btn-primary">
              Vize Uzmanına Sor
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

