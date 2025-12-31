'use client'

import Footer from '@/src/components/MedicalComponents/Footer'
import Header from '@/src/components/MedicalComponents/Header'
import Image from 'next/image'
import banner_img from '@/assets/img/contact/banner_img.png'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <>
      <Header />
      <ol className="breadcrumb2" style={{marginLeft:'7%'}}>
          <li className="breadcrumb-item2">
            <Link href="/medical">Anasayfa</Link>
          </li>
          <li className="breadcrumb-item2">
          İletişim
          </li>
        </ol>
      <section
        className="cs_banner cs_style_5 cs_bg_filed"
        style={{ backgroundImage: 'url(/assets/img/contact/banner_bg.svg)' }}
      >
        <div className="cs_banner_img">
          <Image
            src={banner_img}
            alt="Banner"
            width={600}
            height={500}
            className="cs_main_banner_img"
          />
        </div>
        <div className="container">
          <h2 className="cs_banner_title cs_fs_72">Contact Us</h2>
          <p className="cs_banner_subtitle cs_fs_20 cs_heading_color">
            Kindly reach us to get the fastest response and treatment
          </p>
        </div>
      </section>

      <section >
<div className="container cs_mt_minus_110 cs_contact_fix">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="cs_contact_form cs_style_1 cs_white_bg cs_radius_30">
                <div className="row">
                  <div className="col-lg-6">
                    <label className="cs_input_label cs_heading_color">Name</label>
                    <input className="cs_form_field" placeholder="David John" />
                  </div>
                  <div className="col-lg-6">
                    <label className="cs_input_label cs_heading_color">Email</label>
                    <input className="cs_form_field" placeholder="example@gmail.com" />
                  </div>
                  <div className="col-lg-12">
                    <label className="cs_input_label cs_heading_color">Subject</label>
                    <input className="cs_form_field" placeholder="Your subject" />
                  </div>
                  <div className="col-lg-12">
                    <label className="cs_input_label cs_heading_color">Message</label>
                    <textarea className="cs_form_field" rows={6} placeholder="Write something..." />
                  </div>
                  <div className="col-lg-12">
                    <button className="cs_btn cs_style_1" style={{marginTop:'20px'}}>
                      <span>Submit</span>
                      <i>
                        <img src="/assets/img/icons/arrow_white.svg" />
                        <img src="/assets/img/icons/arrow_white.svg" />
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="cs_height_60" />

          <div className="cs_map">
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

        </div>
      </section>

     <Footer/>
    </>
  )
}
