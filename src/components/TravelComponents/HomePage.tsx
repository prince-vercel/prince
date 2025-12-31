/* eslint-disable @next/next/no-img-element */
'use client'

import hd1 from '@/assets/images/destination/hd-1.webp'
import hd2 from '@/assets/images/destination/hd-2.webp'
import hd3 from '@/assets/images/destination/hd-3.webp'
import hd4 from '@/assets/images/destination/hd-4.webp'
import heroBg from '@/assets/images/hero/hero.webp'
import t1 from '@/assets/images/icons/t1-1.svg'
import t2 from '@/assets/images/icons/t1-2.svg'
import t3 from '@/assets/images/icons/t1-3.svg'
import t4 from '@/assets/images/icons/t1-4.svg'
import p1 from '@/assets/images/packages/p1-1.webp'
import p2 from '@/assets/images/packages/p1-2.webp'
import p3 from '@/assets/images/packages/p1-3.webp'


import leaf2 from '@/assets/images/illustration/leaf-illustration-2.png'
import tree from '@/assets/images/illustration/tree-illustration.png'
import bird from '@/assets/images/illustration/bird-illustration.png'


import blog1 from '@/assets/images/blog/b1-2.webp'
import blog2 from '@/assets/images/blog/b1-2.webp'
import blog3 from '@/assets/images/blog/b1-2.webp'

export default function TravelHomePage() {
  return (
    <>
     <div className="hero_style__start">
  <div className="lg:grid grid-cols-12 xl:gap-base gap-3 mx-auto xl:px-base px-3 overflow-hidden">

    <div className="lg:col-span-3 md:col-span-6 hidden lg:flex flex-col">
      <div className="group hero-card-sm">
        <a href="#">
          <img
            src={hd1.src}
            alt="Fransa"
            className="lg:h-full w-full object-cover group-hover:scale-110 duration-500"
          />
          <div className="text-white absolute w-full lg:bottom-10 bottom-6 text-center">
            <h3 className="font-extrabold 2xl:text-xl md:text-lg text-2md leading-1.6">
              Fransa’nın Güzelliği
            </h3>
            <div className="h-[3px] w-9 bg-white rounded-md mx-auto"></div>
          </div>
        </a>
      </div>

      <div className="group hero-card-sm">
        <a href="#">
          <img
            src={hd2.src}
            alt="İsviçre"
            className="lg:h-full w-full object-cover group-hover:scale-110 duration-500"
          />
          <div className="text-white absolute w-full lg:bottom-10 bottom-6 text-center">
            <h3 className="font-extrabold 2xl:text-xl md:text-lg text-2md leading-1.6">
              Muhteşem İsviçre
            </h3>
            <div className="h-[3px] w-9 bg-white rounded-md mx-auto"></div>
          </div>
        </a>
      </div>
    </div>

    <div
      className="lg:col-span-6 md:col-span-12 xl:min-h-screen lg:py-30 py-20 bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: `url(${heroBg.src})` }}
    >
      <form className="w-full max-w-[570px]">
        <div
          className="lg:py-[50px] py-base lg:px-14 md:px-10 px-base mx-3 text-center backdrop-blur-[21px]"
          style={{
            background:
              'linear-gradient(152.97deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.12) 100%)',
          }}
        >
          <h3 className="text-white lg:text-2xl text-lg font-bold">
            Rota Bul
          </h3>

     {/* DESTINATION */}
<div className="relative lg:mt-12 mt-base">
  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-1 text-lg pointer-events-none z-10">
    <i className="bi bi-geo-alt"></i>
  </span>

  <input
    type="text"
    placeholder="Nereye gitmek istiyorsunuz?"
    className="
      relative z-0 w-full bg-white outline-0
      h-14 lg:h-17
      pl-[52px] lg:pl-[60px]
    "
  />
</div>

{/* DATE */}
<div className="relative lg:mt-10 mt-6">
  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-1 text-lg pointer-events-none z-10">
    <i className="bi bi-calendar-date"></i>
  </span>

  <input
    type="text"
    value="Tarih Seç"
    readOnly
    className="
      relative z-0 w-full bg-white outline-0
      h-14 lg:h-17
      pl-[52px] lg:pl-[60px]
    "
  />
</div>




          <button
            type="submit"
            className="lg:mt-10 mt-6 block text-center bg-primary-1 lg:h-17 h-14 w-full text-white font-medium text-md"
            style={{ borderRadius: '24px' }}
          >
            HEMEN KEŞFET
          </button>
        </div>
      </form>
    </div>

    <div className="lg:col-span-3 md:col-span-6 hidden lg:flex flex-col">
      <div className="group hero-card-sm">
        <a href="#">
          <img
            src={hd3.src}
            alt="Nepal"
            className="lg:h-full w-full object-cover group-hover:scale-110 duration-500"
          />
          <div className="text-white absolute w-full lg:bottom-10 bottom-6 text-center">
            <h3 className="font-extrabold 2xl:text-xl md:text-lg text-2md leading-1.6">
              Katmandu, Nepal
            </h3>
            <div className="h-[3px] w-9 bg-white rounded-md mx-auto"></div>
          </div>
        </a>
      </div>

      <div className="group hero-card-sm">
        <a href="#">
          <img
            src={hd4.src}
            alt="Roma"
            className="lg:h-full w-full object-cover group-hover:scale-110 duration-500"
          />
          <div className="text-white absolute w-full lg:bottom-10 bottom-6 text-center">
            <h3 className="font-extrabold 2xl:text-xl md:text-lg text-2md leading-1.6">
              Kolezyum, Roma
            </h3>
            <div className="h-[3px] w-9 bg-white rounded-md mx-auto"></div>
          </div>
        </a>
      </div>
    </div>

  </div>
</div>

<div className="swiper destination-slider-one lg:hidden px-3 mt-base">
  <div className="swiper-wrapper">

    <div className="swiper-slide">
      <div className="group hero-card-sm">
        <img src={hd1.src} alt="Fransa" />
        <div className="text-white absolute bottom-6 w-full text-center">
          <h3>Fransa’nın Güzelliği</h3>
        </div>
      </div>
    </div>

    <div className="swiper-slide">
      <div className="group hero-card-sm">
        <img src={hd2.src} alt="İsviçre" />
        <div className="text-white absolute bottom-6 w-full text-center">
          <h3>Muhteşem İsviçre</h3>
        </div>
      </div>
    </div>

    <div className="swiper-slide">
      <div className="group hero-card-sm">
        <img src={hd3.src} alt="Nepal" />
        <div className="text-white absolute bottom-6 w-full text-center">
          <h3>Katmandu, Nepal</h3>
        </div>
      </div>
    </div>

  </div>
</div>


{/*========== TOUR CATEGORY START ==========*/}
<div className="tour_type_style__one lg:pt-30 pt-24">
  <div className="container">
    <div className="text-center lg:pb-[60px] pb-[40px]">
      <h5 className="section-sub-title-v1">Tur Kategorileri</h5>
      <h2 className="section-title-v1">Popüler Tur Türleri</h2>
    </div>

    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-base">

      <div className="text-center">
        <img src={t1.src} alt="Macera" className="mx-auto" />
        <h4 className="mt-4">Macera Turları</h4>
        <p>Adrenalin dolu keşif rotaları</p>
      </div>

      <div className="text-center">
        <img src={t2.src} alt="Gemi" className="mx-auto" />
        <h4 className="mt-4">Gemi Turları</h4>
        <p>Konforlu ve keyifli deniz yolculukları</p>
      </div>

      <div className="text-center">
        <img src={t3.src} alt="Doğa" className="mx-auto" />
        <h4 className="mt-4">Doğa Yürüyüşleri</h4>
        <p>Doğa ile iç içe rotalar</p>
      </div>

      <div className="text-center">
        <img src={t4.src} alt="Balayı" className="mx-auto" />
        <h4 className="mt-4">Balayı Turları</h4>
        <p>Romantik ve özel tatiller</p>
      </div>

    </div>
  </div>
</div>
{/*========== TOUR CATEGORY END ==========*/}

{/*========== PACKAGE STYLE ONE START ==========*/}
<div className="package_style__one lg:pt-30 pt-24 lg:pb-30 pb-24 z-1 relative">

  <div className="absolute bottom-[10%] left-[2%] max-w-[13%] z-minus lg:inline-block hidden">
    <img src={leaf2.src} alt="leaf" />
  </div>

  <div className="absolute top-[7%] right-0 max-w-[14%] z-minus lg:inline-block hidden">
    <img src={tree.src} alt="tree" />
  </div>

  <div className="container">

    <div className="text-center lg:pb-[60px] pb-[40px]">
      <h5 className="section-sub-title-v1">Turlarımızı Keşfedin</h5>
      <h2 className="section-title-v1">Yeni ve En Popüler Turlar</h2>
    </div>

    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-base">

      {/* CARD 1 */}
      <div className="group/card package-card-style-one wow fadeInUp">
        <div className="overflow-hidden relative">
          <a href="#">
            <img src={p1.src} alt="Machu Picchu" className="w-full group-hover/card:scale-105 duration-300" />
          </a>
          <span className="absolute top-5 right-5 text-sm text-white rounded-full bg-[#219FFF] py-1 px-3">
            %20 İndirim
          </span>
        </div>

        <h3 className="card-title-alpha group-hover/card:text-primary-1 lg:mt-6 mt-5">
          <a href="#">Cusco & Salkantay – Machu Picchu</a>
        </h3>

        <ul className="flex flex-wrap lg:text-[15px] text-[13px] font-medium text-dark-2 mt-4 package-feature">
          <li>
            <span className="text-primary-1"><i className="bi bi-people"></i></span>
            <span>05 Kişi</span>
          </li>
          <li>
            <span className="text-primary-1"><i className="bi bi-clock"></i></span>
            <span>03 Gün</span>
          </li>
          <li>
            <span className="text-primary-1"><i className="bi bi-coin"></i></span>
            <span>Başlangıç <span className="text-primary-1 font-bold">$250</span></span>
          </li>
        </ul>

        <a href="#" className="package-explore-btn group/btn">
          <span className="mr-2">Hemen İncele</span>
          <svg className="group-hover/btn:translate-x-2 duration-200" width="27" height="14" viewBox="0 0 27 14" fill="none">
            <path d="M0.217443 6.25H18.4827V7.75H0.217443Z" fill="currentColor" />
            <path d="M20.7 12.28L25.05 7.93C25.56 7.42 25.56 6.58 25.05 6.07L20.7 1.72"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* CARD 2 */}
      <div className="group/card package-card-style-one wow fadeInUp" data-wow-delay="0.2s">
        <div className="overflow-hidden relative">
          <a href="#">
            <img src={p2.src} alt="Şarap Turu" className="w-full group-hover/card:scale-105 duration-300" />
          </a>
        </div>

        <h3 className="card-title-alpha group-hover/card:text-primary-1 lg:mt-6 mt-5">
          <a href="#">Casablanca Vadisi Şarap Turu</a>
        </h3>

        <ul className="flex flex-wrap lg:text-[15px] text-[13px] font-medium text-dark-2 mt-4 package-feature">
          <li><span className="text-primary-1"><i className="bi bi-people"></i></span><span>05 Kişi</span></li>
          <li><span className="text-primary-1"><i className="bi bi-clock"></i></span><span>03 Gün</span></li>
          <li><span className="text-primary-1"><i className="bi bi-coin"></i></span><span>$250</span></li>
        </ul>

        <a href="#" className="package-explore-btn group/btn">
          <span className="mr-2">Hemen İncele</span>
                 <svg className="group-hover/btn:translate-x-2 duration-200" width="27" height="14" viewBox="0 0 27 14" fill="none">
            <path d="M0.217443 6.25H18.4827V7.75H0.217443Z" fill="currentColor" />
            <path d="M20.7 12.28L25.05 7.93C25.56 7.42 25.56 6.58 25.05 6.07L20.7 1.72"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* CARD 3 */}
      <div className="group/card package-card-style-one wow fadeInUp" data-wow-delay="0.4s">
        <div className="overflow-hidden relative">
          <a href="#">
            <img src={p3.src} alt="Maldivler" className="w-full group-hover/card:scale-105 duration-300" />
          </a>
          <span className="absolute top-5 right-5 text-sm text-white rounded-full bg-status-success py-1 px-3">
            Macera
          </span>
        </div>

        <h3 className="card-title-alpha group-hover/card:text-primary-1 lg:mt-6 mt-5">
          <a href="#">Maldivler Macera Turu</a>
        </h3>

        <ul className="flex flex-wrap lg:text-[15px] text-[13px] font-medium text-dark-2 mt-4 package-feature">
          <li><span className="text-primary-1"><i className="bi bi-people"></i></span><span>05 Kişi</span></li>
          <li><span className="text-primary-1"><i className="bi bi-clock"></i></span><span>03 Gün</span></li>
          <li><span className="text-primary-1"><i className="bi bi-coin"></i></span><span>$250</span></li>
        </ul>

        <a href="#" className="package-explore-btn group/btn">
          <span className="mr-2">Hemen İncele</span>
                 <svg className="group-hover/btn:translate-x-2 duration-200" width="27" height="14" viewBox="0 0 27 14" fill="none">
            <path d="M0.217443 6.25H18.4827V7.75H0.217443Z" fill="currentColor" />
            <path d="M20.7 12.28L25.05 7.93C25.56 7.42 25.56 6.58 25.05 6.07L20.7 1.72"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      

    </div>
  </div>
</div>
{/*========== PACKAGE STYLE ONE END ==========*/}

{/*========== BLOG STYLE ONE START ==========*/}
<div className="blog_style_one relative z-1 ">

  <div className="absolute top-[5%] left-[1%] max-w-[9%] z-minus lg:inline-block hidden">
    <img src={bird.src} alt="illustration" />
  </div>

  <div className="container">

    <div className="text-center lg:pb-[60px] pb-[40px]">
      <h5 className="section-sub-title-v1">Blog & Haberler</h5>
      <h2 className="section-title-v1">Seyahat İpuçlarıyla Güncel Kalın!</h2>
    </div>

    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-base">

      {/* BLOG CARD 1 */}
      <div className="blog_card__one group wow fadeInUp">
        <div className="overflow-hidden">
          <a href="#">
            <img
              src={blog1.src}
              alt="blog"
              className="w-full hover:scale-105 duration-300"
            />
          </a>
        </div>

        <div className="mt-6">
          <ul className="flex items-center text-[13px] font-medium text-dark-2">
            <li className="flex items-center relative first:pl-0 pl-2 pr-2 before:content-[''] before:absolute before:h-2/3 before:w-[1px] before:bg-dark-2 before:-translate-y-1/2 before:top-1/2 before:left-0 first:before:hidden">
              <i className="bi bi-calendar-date text-[15px]"></i>
              <span className="ml-2">24 Eyl 2022 · 18:30</span>
            </li>
     
          </ul>

          <h3 className="card-title-alpha mt-4">
            <a href="#">
              Doğal bakımın en saf haliyle tanışın.
            </a>
          </h3>

          <a
            href="#"
            className="group inline-flex items-center mt-4 lg:text-md text-base text-dark-1 font-medium hover:text-primary-1 duration-200"
          >
            <span className="mr-2">Devamını Oku</span>
            <svg
              className="group-hover:translate-x-2 duration-200"
              width="27"
              height="14"
              viewBox="0 0 27 14"
              fill="none"
            >
              <path
                d="M0.217443 6.25H18.4827V7.75H0.217443Z"
                fill="currentColor"
              />
              <path
                d="M20.7001 12.2802L25.0467 7.93355C25.5601 7.42021 25.5601 6.58021 25.0467 6.06688L20.7001 1.72021"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* BLOG CARD 2 */}
      <div className="blog_card__one group wow fadeInUp" data-wow-delay="0.2s">
        <div className="overflow-hidden">
          <a href="#">
            <img
              src={blog2.src}
              alt="blog"
              className="w-full hover:scale-105 duration-300"
            />
          </a>
        </div>

        <div className="mt-6">
          <ul className="flex items-center text-[13px] font-medium text-dark-2">
            <li className="flex items-center relative first:pl-0 pl-2 pr-2 before:content-[''] before:absolute before:h-2/3 before:w-[1px] before:bg-dark-2 before:-translate-y-1/2 before:top-1/2 before:left-0 first:before:hidden">
              <i className="bi bi-calendar-date text-[15px]"></i>
              <span className="ml-2">24 Eyl 2022 · 18:30</span>
            </li>
        
          </ul>

          <h3 className="card-title-alpha mt-4">
            <a href="#">
              Dalhousie’de Mutlaka Görülmesi Gereken Yerler
            </a>
          </h3>

          <a
            href="#"
            className="group inline-flex items-center mt-4 lg:text-md text-base text-dark-1 font-medium hover:text-primary-1 duration-200"
          >
            <span className="mr-2">Devamını Oku</span>
            <svg
              className="group-hover:translate-x-2 duration-200"
              width="27"
              height="14"
              viewBox="0 0 27 14"
              fill="none"
            >
              <path d="M0.217443 6.25H18.4827V7.75H0.217443Z" fill="currentColor" />
              <path
                d="M20.7001 12.2802L25.0467 7.93355C25.5601 7.42021 25.5601 6.58021 25.0467 6.06688L20.7001 1.72021"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* BLOG CARD 3 */}
      <div className="blog_card__one group wow fadeInUp" data-wow-delay="0.4s">
        <div className="overflow-hidden">
          <a href="#">
            <img
              src={blog3.src}
              alt="blog"
              className="w-full hover:scale-105 duration-300"
            />
          </a>
        </div>

        <div className="mt-6">
          <ul className="flex items-center text-[13px] font-medium text-dark-2">
            <li className="flex items-center relative first:pl-0 pl-2 pr-2 before:content-[''] before:absolute before:h-2/3 before:w-[1px] before:bg-dark-2 before:-translate-y-1/2 before:top-1/2 before:left-0 first:before:hidden">
              <i className="bi bi-calendar-date text-[15px]"></i>
              <span className="ml-2">24 Eyl 2022 · 18:30</span>
            </li>
          
          </ul>

          <h3 className="card-title-alpha mt-4">
            <a href="#">
              %15 İndirimden Yararlanarak Rezervasyonunuzu Yapın
            </a>
          </h3>

          <a
            href="#"
            className="group inline-flex items-center mt-4 lg:text-md text-base text-dark-1 font-medium hover:text-primary-1 duration-200"
          >
            <span className="mr-2">Devamını Oku</span>
            <svg
              className="group-hover:translate-x-2 duration-200"
              width="27"
              height="14"
              viewBox="0 0 27 14"
              fill="none"
            >
              <path d="M0.217443 6.25H18.4827V7.75H0.217443Z" fill="currentColor" />
              <path
                d="M20.7001 12.2802L25.0467 7.93355C25.5601 7.42021 25.5601 6.58021 25.0467 6.06688L20.7001 1.72021"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

    </div>
  </div>
</div>
{/*========== BLOG STYLE ONE END ==========*/}


    </>
  )
}
