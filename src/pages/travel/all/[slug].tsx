/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import heroImg from '@/assets/images/hero/h1.webp'
import breadcrumbShape from '@/assets/images/illustration/breadcrunb__shape.png'
import birdWhite from '@/assets/images/illustration/bird-illustration-w.png'
import bird from '@/assets/images/illustration/bird-illustration.png'
import tree from '@/assets/images/illustration/tree-illustration.png'

import g1 from '@/assets/images/gallary/g1.webp'
import g2 from '@/assets/images/gallary/g2.webp'
import g3 from '@/assets/images/gallary/g3.webp'
import g4 from '@/assets/images/gallary/g4.webp'
import g5 from '@/assets/images/gallary/g5.webp'
import g6 from '@/assets/images/gallary/g6.webp'
import g7 from '@/assets/images/gallary/g7.webp'
import g8 from '@/assets/images/gallary/g8.webp'
import g9 from '@/assets/images/gallary/g9.webp'

import Header from '@/src/components/TravelComponents/Header'
import Footer from '@/src/components/TravelComponents/Footer'

const packagesList = [
  { slug: 'cusco-machu-picchu', title: 'Cusco & Salkantay – Machu Picchu' },
  { slug: 'casablanca-sarap-turu', title: 'Casablanca Vadisi Şarap Turu' },
  { slug: 'maldivler-macera-turu', title: 'Maldivler Macera Turu' },
]

export default function TravelDetailPage() {
  const router = useRouter()
  const { slug } = router.query
  const [activeTab, setActiveTab] = useState<'booking' | 'enquiry'>('booking')
const [openFaq, setOpenFaq] = useState<number | null>(null)

const currentPackage = packagesList.find(p => p.slug === slug)
const pageTitle = currentPackage?.title || 'Paket Detayı'

  return (
    <>

      {/* BREADCRUMB */}
      <div className="paralax-container lg:py-36 py-20 relative overflow-hidden">
        <div
          className="jarallax absolute inset-0 z-minus before:content-[''] before:absolute before:inset-0 before:bg-[#030610] before:bg-opacity-50 before:z-minus"
          data-jarallax
        >
          <img className="jarallax-img" src={heroImg.src} alt="Kapak" />
        </div>

        <img src={breadcrumbShape.src} className="absolute bottom-0 left-0 z-1 lg:w-[12.5%] w-[20%]" alt="" />
        <img src={birdWhite.src} className="absolute top-[10%] right-[4%] z-1 w-[7.5%]" alt="" />

        <div className="container relative z-2">
          <nav aria-label="breadcrumb">
                    <ol className="breadcrumb2" style={{color:'white'}}>
            <li className="breadcrumb-item2">
              <Link href="/travel">Anasayfa</Link>
            </li>
            <li className="breadcrumb-item2">/ Seyahat Detayı</li>
          </ol>
          </nav>

          <h2 className="xl:text-[54px] mt-2 lg:text-4xl md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]">
            {pageTitle}
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className=" relative z-1">
        <img src={tree.src} className="absolute top-1/2 -translate-y-1/2 right-0 max-w-[14%] z-minus hidden lg:block" alt="" />
        <img src={bird.src} className="absolute top-[5%] left-[1%] max-w-[9%] z-minus hidden lg:block" alt="" />

        <div className="container">
          <div className="grid grid-cols-12 gap-base">

            {/* SOL TARAF */}
            <div className="lg:col-span-8 col-span-12">
<ul className="bg-white lg:px-base lg:py-4 py-4 flex lg:overflow-hidden lg:mt-[-40px] mt-base border">

  {/* INFORMATION */}
  <li className="grow py-1 border-r border-primary-1 last:border-none px-5">
    <a href="#information" className="flex items-center justify-center text-dark-2 hover:text-primary-1 font-medium duration-200">
      <div className="shrink-0 mr-2">
        <i className="bi bi-info-circle text-lg"></i>
      </div>
      <span className="whitespace-nowrap">Bilgiler</span>
    </a>
  </li>

  {/* TOUR PLAN */}
  <li className="grow py-1 border-r border-primary-1 last:border-none px-5">
    <a href="#plan" className="flex items-center justify-center text-dark-2 hover:text-primary-1 font-medium duration-200">
      <div className="shrink-0 mr-2">
        <i className="bi bi-calendar-check text-lg"></i>
      </div>
      <span className="whitespace-nowrap">Tur Planı</span>
    </a>
  </li>

  {/* FAQ */}
  <li className="grow py-1 border-r border-primary-1 last:border-none px-5">
    <a href="#faq" className="flex items-center justify-center text-dark-2 hover:text-primary-1 font-medium duration-200">
      <div className="shrink-0 mr-2">
        <i className="bi bi-question-circle text-lg"></i>
      </div>
      <span className="whitespace-nowrap">SSS</span>
    </a>
  </li>

  {/* GALLERY */}
  <li className="grow py-1 border-r border-primary-1 last:border-none px-5">
    <a href="#gallery" className="flex items-center justify-center text-dark-2 hover:text-primary-1 font-medium duration-200">
      <div className="shrink-0 mr-2">
        <i className="bi bi-images text-lg"></i>
      </div>
      <span className="whitespace-nowrap">Galeri</span>
    </a>
  </li>

</ul>



              <div className="pack__disc" id="Information">
  <div className="flex justify-between items-center gap-2 flex-wrap lg:pt-12 pt-8 lg:pb-4">
    <h2 className="font-sans lg:text-[45px] md:text-xl text-lg font-semibold">
      $175/<span className="lg:text-lg text-md font-normal">Kişi Başına</span>
    </h2>

  </div>

  <h5 className="lg:text-lg text-base text-dark-1 font-semibold leading-[1.5] mb-6">
    Bu inanılmaz tur paketinde muhteşem doğa manzaraları ve tarihi yerler keşfetme fırsatı bulacaksınız.
  </h5>

  <p>
    Dünya üzerindeki en tuhaf yerler aynı zamanda en yüce yerlerdir. Tur sırasında rehberimiz tarafından detaylı bilgiler verilerek ziyaretler gerçekleştirilecektir.
  </p>

  <ul className="pack__list mt-4">
    <li><i className="bi bi-clock"></i> 4 Gün / 5 Gece</li>
    <li><i className="bi bi-person"></i> Maksimum Kişi: 10</li>
    <li><i className="bi bi-map"></i> Kuzey Transilvanya</li>
  </ul>

  {/* PRICE INCLUDES */}
  <ul className="mt-base">
    <li className="lg:flex lg:pt-6 pt-5 pb-5 border-t border-stock-1">
      <div className="lg:w-1/3 font-medium">Fiyata Dahil Olanlar</div>
      <div className="lg:w-2/3 mt-4 lg:mt-0">
        <ul className="grid grid-cols-2 gap-3">
          {[
            '3 Gece Konaklama',
            'Havalimanı Transferi',
            'Günde 2 Öğün',
            'Kutu Öğle Yemeği, Akşam Yemeği ve Atıştırmalıklar.',
            'Tur Sırasında Ulaşım',
          ].map(item => (
            <li key={item} className="flex items-center text-sm">
              <i className="bi bi-check2 text-primary-1 mr-2"></i>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </li>

    {/* PRICE EXCLUDES */}
    <li className="lg:flex lg:pt-6 pt-5 pb-5 border-t border-stock-1">
      <div className="lg:w-1/3 font-medium">Fiyata Dahil Olmayan Şeyler</div>
      <div className="lg:w-2/3 mt-4 lg:mt-0">
        <ul className="grid grid-cols-2 gap-3">
          {[
            'Kalkış Vergileri',
            'Havalimanı Transferi',
            'Giriş Ücretleri',
            'Kutu Öğle Yemeği, Akşam Yemeği ve Atıştırmalıklar.',
          ].map(item => (
            <li key={item} className="flex items-center text-sm">
              <i className="bi bi-check2 text-primary-1 mr-2"></i>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </li>
  </ul>

  {/* TOUR PLAN */}
  <div className="lg:pt-10 pt-8 pb-8" id="plan">
    <h3 className="text-dark-1 font-semibold text-2xl mb-4">Tur Planı</h3>

    {[
      { day: '01', title: 'Edinburgh\'a Hoş Geldiniz' },
      { day: '02', title: 'Macera Başlıyor' },
      { day: '03', title: 'Tarihi Tur' },
      { day: '04', title: 'Dönüş' },
    ].map(d => (
      <div key={d.day} className="flex single__count mt-6">
        <div className="day__count shrink-0 relative z-10" style={{ paddingTop: '20px' }}>
          <style>{`
            .single__count .day__count::before {
              top: 20px !important;
            }
          `}</style>
          <div className="w-10 h-10 rounded-full border border-primary-1 flex items-center justify-center font-semibold text-primary-1 bg-white">
            {d.day}
          </div>
        </div>
        <div className="ml-4 pb-8">
          <h5 className="font-semibold text-dark-1 text-lg">{d.title}</h5>
          <p>
            Bu gün boyunca rehberimiz eşliğinde özel olarak hazırlanmış bir rota izleyerek bölgenin en güzel yerlerini keşfedeceksiniz.
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
{/* FAQ */}
<div className="pt-2 pb-5" id="faq">
  <h3 className="text-dark-1 font-semibold text-2xl mb-2">Sıkça Sorulan Sorular</h3>
  <p className="text-dark-1 font-medium mb-4">
    Bu turun detayları, ücretlendirmesi, zaman dilimi ve diğer önemli bilgiler aşağıda bulunmaktadır. Sorularınız varsa lütfen bizimle iletişime geçiniz.
  </p>

  <div className="accordion lg:space-y-6 space-y-5">
    {[
      {
        q: 'En iyi düğün turları yapılan yerler nerelerdir?',
        a: 'Dünya üzerindeki en tuhaf yerler aynı zamanda en yüce yerlerdir: Yemen\'deki UFO benzeri ejderha kanı ağaçlarından Yellowstone\'daki gökkuşağı renkli sıcak kaynağına kadar.',
      },
      {
        q: 'Ziyaret etmek için en sürreal yerler nelerdir?',
        a: 'Dünya üzerindeki en tuhaf yerler aynı zamanda en yüce yerlerdir: Yemen\'deki UFO benzeri ejderha kanı ağaçlarından Yellowstone\'daki gökkuşağı renkli sıcak kaynağına kadar.',
      },
      {
        q: 'Bangladeş\'te ziyaret etmek için en sürreal yerler nelerdir?',
        a: 'Dünya üzerindeki en tuhaf yerler aynı zamanda en yüce yerlerdir: Yemen\'deki UFO benzeri ejderha kanı ağaçlarından Yellowstone\'daki gökkuşağı renkli sıcak kaynağına kadar.',
      },
    ].map((item, i) => (
      <div key={i} className="single__accordion border border-stock-1">
        <button
          type="button"
          onClick={() =>
            setOpenFaq(openFaq === i ? null : i)
          }
          className="toggle px-5 py-3 leading-1.5 text-2md text-start w-full text-dark-1 font-serif font-semibold"
        >
          {String(i + 1).padStart(2, '0')}. {item.q}
        </button>

        {openFaq === i && (
          <div className="inner px-5 pb-5">
            <p className="text-base font-sans text-dark-3 leading-1.9 !pb-0">
              {item.a}
            </p>
          </div>
        )}
      </div>
    ))}
  </div>
</div>

{/* GALLERY */}
<div className="lg:pt-10 pt-8" id="gallery">
  <h3 className="text-dark-1 font-semibold text-2xl mb-2">Galeri</h3>
  <p className="text-dark-1 font-medium mb-4">
    Bu turun muhteşem anılarını içeren fotoğraflar aşağıda bulunmaktadır. Her resmi büyütmek için tıklayabilirsiniz.
  </p>

  <div className="masonry-container">
    {[g1, g2, g3, g4, g5, g6, g7, g8, g9].map((img, i) => (
      <div
        key={i}
        className="masonry-item relative group overflow-hidden"
      >
        <img
          src={img.src}
          alt="details"
          className="object-cover duration-200 group-hover:scale-[103%]"
        />

        <a
          href={img.src}
          data-fancybox="details"
          className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-200 hover:opacity-100 justify-center items-center"
        >
          <div className="lg:h-10 lg:w-10 w-9 h-9 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
            <i className="bi bi-camera"></i>
          </div>
        </a>
      </div>
    ))}
  </div>
</div>
 

            </div>

            {/* SAĞ TARAF */}
          <div className="lg:col-span-4 col-span-12">

  <ul id="tabs-nav" className="booking-tabs flex gap-4 pb-6">
    <li
      className={`tab-link basis-1/2 ${activeTab === 'booking' ? 'active' : ''}`}
      onClick={() => setActiveTab('booking')}
    >
      Rezervasyon
    </li>
    <li
      className={`tab-link basis-1/2 ${activeTab === 'enquiry' ? 'active' : ''}`}
      onClick={() => setActiveTab('enquiry')}
    >
      Bilgi Talep
    </li>
  </ul>

  {activeTab === 'booking' && (
    <div className="tab-content active">
      <form
        autoComplete="off"
        className="lg:px-base px-5 lg:pt-6 lg:pb-base pt-4 pb-5 bg-white border-primary-1 border"
      >
   



        <a href="/travel/form" className="btn_primary__v1 !w-full justify-center mt-5 hover:text-white">
          Şimdi Rezervasyon Yap
        </a>
      </form>
    </div>
  )}

  {activeTab === 'enquiry' && (
    <div className="tab-content active">
      <form className="lg:px-base px-5 lg:py-base py-5 bg-white border-primary-1 border">
        <h4 className="lg:text-lg text-2md text-dark-1 font-semibold">
          Şimdi Bilgi Talep Et
        </h4>

        <p className="regular-text-v1 mt-2">
          Aşağıdaki formu doldurarak turumuzla ilgili detaylı bilgi talep edebilirsiniz. Ekibimiz kısa sürede sizinle iletişime geçecektir.
        </p>

        <div className="lg:mt-base mt-5">
          <input className="input_style__primary" placeholder="Adınız" />
        </div>

        <div className="lg:mt-base mt-5">
          <input className="input_style__primary" placeholder="Email" />
        </div>

        <div className="lg:mt-base mt-5">
          <input className="input_style__primary" placeholder="Telefon Numarası" />
        </div>

        <div className="lg:mt-base mt-5">
          <textarea
            rows={6}
            className="input_style__primary"
            placeholder="Ek Açıklama..."
          />
        </div>

        <button className="btn_primary__v1 !w-full justify-center mt-5">
          Bilgi Talep Et
        </button>
      </form>
    </div>
  )}

  <aside className="widget widget_social lg:mt-[50px] mt-10">
    <h4 className="text-dark-1 lg:text-[25px] text-2md font-semibold mb-1">
      Sosyal Bağlantılar
    </h4>
             <div className="cs_social_links cs_social_desktop">
  <a href="#">
    <i className="fa-brands fa-facebook-f" style={{ color: '#E8604C'  }}></i>
  </a>
  <a href="#">
    <i className="fa-brands fa-youtube" style={{ color: '#E8604C'  }}></i>
  </a>
  <a href="#">
    <i className="fa-brands fa-instagram" style={{ color: '#E8604C'  }}></i>
  </a>
</div>
  </aside>
</div>


          </div>
        </div>
      </div>

    </>
  )
}
