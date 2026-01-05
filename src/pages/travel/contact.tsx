/* eslint-disable @next/next/no-img-element */
'use client'

import Footer from "@/src/components/TravelComponents/Footer"
import Header from "@/src/components/TravelComponents/Header"

import breadcrumbBg from "@/assets/images/backgrounds/breadcrumb-bg.webp"
import breadcrumbShape from "@/assets/images/illustration/breadcrunb__shape.png"
import birdWhite from "@/assets/images/illustration/bird-illustration-w.png"
import tree from "@/assets/images/illustration/tree-illustration.png"
import bird from "@/assets/images/illustration/bird-illustration.png"

import insta1 from "@/assets/images/instagram/insta-1.webp"
import insta2 from "@/assets/images/instagram/insta-2.webp"
import insta3 from "@/assets/images/instagram/insta-3.webp"
import insta4 from "@/assets/images/instagram/insta-4.webp"
import insta5 from "@/assets/images/instagram/insta-5.webp"
import Link from "next/link"

const instaImages = [insta1, insta2, insta3, insta4, insta5]

export default function ContactPage() {
  return (
    <>
      {/*========== BREADCRUMB STYLE START ==========*/}
      <div className="paralax-container lg:py-36 py-20 relative overflow-hidden">
        <div
          className="jarallax absolute inset-0 z-minus before:content-[''] before:absolute before:inset-0 before:bg-[#030610] before:bg-opacity-50 before:z-minus"
          data-jarallax=""
        >
          <img
            className="jarallax-img"
            src={breadcrumbBg.src}
            alt="placeholder"
          />
        </div>

        <img
          src={breadcrumbShape.src}
          alt="placeholder"
          className="absolute bottom-0 left-0 z-1 lg:w-[12.5%] w-[20%]"
        />
        <img
          src={birdWhite.src}
          alt="placeholder"
          className="absolute top-[10%] right-[4%] z-1 w-[7.5%]"
        />

        <div className="container relative z-2">
          <nav aria-label="breadcrumb">
                  <ol className="breadcrumb2" style={{color:'white'}}>
            <li className="breadcrumb-item2">
              <Link href="/travel">Anasayfa</Link>
            </li>
            <li className="breadcrumb-item2"> İletişim</li>
          </ol>
          </nav>

          <h2 className="xl:text-[54px] mt-2 lg:text-4xl md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]">
            Bize İletişim Kurmaktan Çekinmeyin
          </h2>
        </div>
      </div>
      {/*========== BREADCRUMB STYLE END ==========*/}

      {/*========== CONTACT US STYLE START ==========*/}
      <div className="lg:pt-30 pt-24 relative z-1">
        <div className="absolute top-[7%] right-0 max-w-[14%] z-minus lg:inline-block hidden">
          <img
            src={tree.src}
            alt="leaf"
          />
        </div>
        <div className="absolute top-[5%] left-[1%] max-w-[9%] z-minus lg:inline-block hidden">
          <img
            src={bird.src}
            alt="leaf"
          />
        </div>

        <div className="container">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-base">
            <div className="shadow-custom-1 bg-white lg:py-8 py-7 px-base wow fadeInUp">
              <div className="flex">
                <div className="mr-[15px] shrink-0 lg:text-3xl text-2xl text-[#219FFF]">
                  <i className="bi bi-envelope-at"></i>
                </div>
                <div>
                  <h4 className="text-dark-1 lg:text-2md text-md font-semibold">
                    E-posta Gönder
                  </h4>
                  <ul className="text-dark-3 space-y-1 text-base font-medium mt-2">
                    <li>
                      <a
                        href="mailto:info@supportcompany.com"
                        className="hover:text-primary-1 duration-200"
                      >
                        info@supportcompany.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:info@exmple.com"
                        className="hover:text-primary-1 duration-200"
                      >
                        info@exmple.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="shadow-custom-1 bg-white lg:py-8 py-7 px-base wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="flex">
                <div className="mr-[15px] shrink-0 lg:text-3xl text-2xl text-[#17BD8D]">
                  <i className="bi bi-telephone-forward"></i>
                </div>
                <div>
                  <h4 className="text-dark-1 lg:text-2md text-md font-semibold">
                    Bizi Arayın
                  </h4>
                  <ul className="text-dark-3 space-y-1 text-base font-medium mt-2">
                    <li>
                      <a
                        href="tel:+770434501097"
                        className="hover:text-primary-1 duration-200"
                      >
                        +7704345017
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+866-398-5917"
                        className="hover:text-primary-1 duration-200"
                      >
                        +866-398-5917
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="shadow-custom-1 bg-white lg:py-8 py-7 px-base wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="flex">
                <div className="mr-[15px] shrink-0 lg:text-3xl text-2xl text-[#F53D6B]">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div>
                  <h4 className="text-dark-1 lg:text-2md text-md font-semibold">
                    Adres
                  </h4>
                  <ul className="text-dark-3 space-y-1 text-base font-medium mt-2">
                    <li>
                      4517 Washington Ave. Manchester, Kentucky 39495
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pt-30 pt-24">
            <div className="text-center lg:pb-[60px] pb-[40px]">
              <h5 className="section-sub-title-v1">İletişim Kurun</h5>
              <h2 className="section-title-v1">
                Bize İletişim Kurmaktan Çekinmeyin
              </h2>
            </div>

            <div className="max-w-[870px] mx-auto">
              <form>
                <div className="grid grid-cols-2 gap-base">
                  <div className="lg:col-span-1 col-span-2">
                    <input
                      type="text"
                      placeholder="Adınız"
                      className="input_style__primary"
                    />
                  </div>
                  <div className="lg:col-span-1 col-span-2">
                    <input
                      type="text"
                      placeholder="Telefon Numaranız"
                      className="input_style__primary"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="email"
                      placeholder="Konunuz"
                      className="input_style__primary"
                    />
                  </div>
                  <div className="col-span-2">
                    <textarea
                      rows={6}
                      className="input_style__primary"
                      placeholder="Konunuz..."
                    ></textarea>
                  </div>
                  <div className="col-span-2">
                    <button type="submit" className="btn_primary__v1">
                      Daha Fazla Bilgi
                      <i className="bi bi-chevron-right ml-2"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
       <div className="cs_map" style={{margin:'50px'}}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.847370035419!2d28.97754807653835!3d41.08531567134069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabf3df8a0d3f9%3A0x1f6c2c7e6b9b7c2c!2sDAP%20Yap%C4%B1%20Z%20Ofis!5e0!3m2!1str!2str!4v1710000000000"
    width="100%"
    height="450"
    style={{ border: 0 }}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    allowFullScreen
  />
</div>

      
      {/*========== CONTACT US STYLE END ==========*/}

    </>
  )
}
