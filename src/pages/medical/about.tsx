'use client'

import Image from 'next/image'
import Header from '@/src/components/MedicalComponents/Header'
import bannerImg from '@/assets/img/about/banner_img.png'

import whyChooseUs from '@/assets/img/about/why_choose_us.jpeg'
import professionalIcon from '@/assets/img/icons/professional.svg'
import comprehensiveIcon from '@/assets/img/icons/comprehensive.svg'
import patientIcon from '@/assets/img/icons/patient.svg'
import facilitiesIcon from '@/assets/img/icons/facilities.svg'
import calendarIcon from '@/assets/img/icons/calendar_white.svg'
import arrowIcon from '@/assets/img/icons/arrow_white.svg'
import Footer from './../../components/MedicalComponents/Footer';
import { useEffect, useState } from 'react'
import Link from 'next/link'
const faqs = [
  {
    question: 'What services does ProHealth offer?',
    answer:
      'We offer comprehensive medical services including diagnostics, preventive care, rehabilitation, and specialized treatments.',
  },
  {
    question: 'How do I schedule an appointment with ProHealth?',
    answer:
      'You can easily schedule an appointment through our website, by phone, or by visiting our medical center.',
  },
  {
    question: 'Do you accept insurance?',
    answer:
      'Yes, we work with many major insurance providers. Please contact us to confirm your coverage.',
  },
  {
    question: 'What should I bring to my appointment?',
    answer:
      'Please bring your ID, insurance card, medical records if available, and a list of current medications.',
  },
  {
    question: 'How do I request a prescription refill?',
    answer:
      'Prescription refills can be requested through our patient portal or by contacting our support team.',
  },
]

const services = [
  {
    title: 'Diagnostic testing',
    desc: 'Blood tests, imaging studies, and other tests to diagnose health conditions',
  },
  {
    title: 'Rehabilitation services',
    desc: 'Physical therapy, occupational therapy, and recovery services',
  },
  {
    title: 'Preventive care',
    desc: 'Annual checkups, immunizations, and health screenings',
  },
  {
    title: 'Chronic condition treatment',
    desc: 'Disease management and long-term treatment plans',
  },
  {
    title: 'Mental health services',
    desc: 'Counseling, therapy, and psychological support',
  },
]

export default function AboutPage() {
    const counters = [
  { end: 25000, label: 'Happy Patients', suffix: '+' },
  { end: 120, label: 'Expert Doctors', suffix: '+' },
  { end: 15, label: 'Years Experience', suffix: '+' },
  { end: 50, label: 'Awards', suffix: '+' },
]
const [activeFaq, setActiveFaq] = useState<number | null>(2)

const [values, setValues] = useState(counters.map(() => 0))

useEffect(() => {
  const duration = 2000
  const steps = 60
  const interval = duration / steps

  let currentStep = 0

  const timer = setInterval(() => {
    currentStep++
    setValues(
      counters.map((item) =>
        Math.min(Math.round((item.end / steps) * currentStep), item.end)
      )
    )

    if (currentStep >= steps) clearInterval(timer)
  }, interval)

  return () => clearInterval(timer)
}, [])
  return (
    <>
      <Header />
      <ol className="breadcrumb2" style={{marginLeft:'7%'}}>
          <li className="breadcrumb-item2">
            <Link href="/medical">Anasayfa</Link>
          </li>
          <li className="breadcrumb-item2">
           Hakkımızda
          </li>
        </ol>
      <section
        className="cs_banner cs_style_3"
      >
        
        <div className="cs_banner_img">
          <Image
            src={bannerImg}
            alt="About Banner"
            width={600}
            height={600}
            priority
            className="cs_main_banner_img"
          />
        </div>

        <div className="container">
       
          <div className="cs_banner_text">
            <h2 className="cs_banner_title cs_fs_72">
              Welcome to <br /> ProHealth Medical & Healthcare Center
            </h2>
            <p className="cs_banner_subtitle cs_fs_20 cs_heading_color">
              Your Partner in Health and Wellness
            </p>
          </div>
        </div>
      </section>

<section className="cs_section_spacing">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-4">
              <div className="cs_section_heading cs_style_1">
                <h3 className="cs_section_subtitle text-uppercase cs_accent_color cs_fs_32">
                  SERVICES
                </h3>
                <div className="cs_height_5"></div>
                <h2 className="cs_section_title cs_fs_72">
                  Provides Our Best Services
                </h2>
              </div>
              <div className="cs_height_70 cs_height_lg_50"></div>
            </div>

            {services.map((item, i) => (
              <div key={i} className="col-md-6 col-xl-4">
                <div className="cs_iconbox cs_style_4">
                  <div className="cs_iconbox_icon cs_accent_bg rounded-circle cs_center">
                    <Image src={calendarIcon} alt="" width={20} height={20} />
                  </div>

                  <h2 className="cs_iconbox_title cs_fs_32">
                    {item.title}
                  </h2>

                  <p className="cs_iconbox_subtitle m-0">
                    {item.desc}
                  </p>

                  <a href="#" className="cs_iconbox_btn cs_center">
                    <Image src={arrowIcon} alt="" />
                    <Image src={arrowIcon} alt="" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTERS */}
<section className="cs_counter cs_style_1" style={{ marginTop: '15vh', marginBottom: '15vh' }}>
  <div className="container">
    <div className="row text-center">
      {counters.map((item, i) => (
        <div key={i} className="col-lg-3 col-6">
          <h2 className="cs_counter_number">
            {item.end >= 1000
              ? `${Math.floor(values[i] / 1000)}K${item.suffix}`
              : `${values[i]}${item.suffix}`}
          </h2>
          <p className="cs_counter_title">{item.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>
      <section className="cs_shape_wrap">
  <div className="cs_shape_1 cs_position_1"></div>
  <div className="cs_height_175 cs_height_xl_125 cs_height_lg_85"></div>

  <div className="container">
    <div className="row flex-xl-row flex-column-reverse">
      
      <div className="col-xl-5">
        <div className="cs_pr_95 text-center cs_img_filed">
          <Image
            src={whyChooseUs}
            alt="Why Choose Us"
            width={500}
            height={500}
            className="cs_radius_30"
          />
        </div>
      </div>

      <div className="col-xl-7">
        <div className="cs_section_heading cs_style_1">
          <h2 className="cs_section_title cs_fs_72 m-0">
            Why Choose Us
          </h2>
        </div>

        <div className="cs_height_85 cs_height_xl_70 cs_height_lg_50"></div>

        <div className="row">
          
          <div className="col-md-6">
            <div className="cs_iconbox cs_style_6">
              <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                <Image src={professionalIcon} alt="" width={40} height={40} />
              </div>
              <h2 className="cs_iconbox_title cs_fs_32 cs_semibold">
                Experienced Medical Professionals
              </h2>
              <p className="cs_iconbox_subtitle m-0">
                Our team includes experienced doctors, nurses, <br />
                and other healthcare professionals who are <br />
                dedicated to providing the best possible care to <br />
                our patients.
              </p>
            </div>
            <div className="cs_height_85 cs_height_xl_60 cs_height_lg_35"></div>
          </div>

          <div className="col-md-6">
            <div className="cs_iconbox cs_style_6">
              <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                <Image src={comprehensiveIcon} alt="" width={40} height={40} />
              </div>
              <h2 className="cs_iconbox_title cs_fs_32 cs_semibold">
                Comprehensive <br /> Services
              </h2>
              <p className="cs_iconbox_subtitle m-0">
                We offer a wide range of healthcare services, <br />
                from preventive care to specialized treatment <br />
                for complex conditions.
              </p>
            </div>
            <div className="cs_height_85 cs_height_xl_60 cs_height_lg_35"></div>
          </div>

          <div className="col-md-6">
            <div className="cs_iconbox cs_style_6">
              <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                <Image src={patientIcon} alt="" width={40} height={40} />
              </div>
              <h2 className="cs_iconbox_title cs_fs_32 cs_semibold">
                Patient-centered <br /> Approach
              </h2>
              <p className="cs_iconbox_subtitle m-0">
                We believe in treating each patient as an <br />
                individual, and we take the time to understand <br />
                your unique health needs and concerns.
              </p>
            </div>
            <div className="cs_height_85 cs_height_xl_60 cs_height_lg_35"></div>
          </div>

          <div className="col-md-6">
            <div className="cs_iconbox cs_style_6">
              <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                <Image src={facilitiesIcon} alt="" width={40} height={40} />
              </div>
              <h2 className="cs_iconbox_title cs_fs_32 cs_semibold">
                State-of-the-art <br /> Facilities
              </h2>
              <p className="cs_iconbox_subtitle m-0">
                Our healthcare center is equipped with the <br />
                latest technology and equipment to provide our <br />
                patients with the most advanced care possible.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>
<section className="cs_shape_wrap cs_faq_section">
  <div className="cs_shape_1 cs_position_3"></div>

  <div className="cs_height_190 cs_height_xl_145 cs_height_lg_105"></div>

  <div className="container">
    <div className="row">
      <div className="col-xxl-4">
        <div className="cs_section_heading cs_style_1">
          <h3 className="cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_fs_32">
            What People
          </h3>
          <div className="cs_height_5"></div>
          <h2 className="cs_section_title cs_fs_72 m-0">
            Usually Asked
          </h2>
        </div>
        <div className="cs_height_70 cs_height_lg_50"></div>
      </div>
    </div>

    <div className="row">
      <div className="col-xxl-8 offset-xxl-4">
        <div className="cs_accordians cs_style1 cs_type_1 cs_heading_color">
          {faqs.map((item, i) => {
            const isActive = activeFaq === i

            return (
              <div
                key={i}
                className={`cs_accordian ${isActive ? 'active' : ''}`}
              >
                <h2
                  className="cs_accordian_head cs_heading_color"
                  onClick={() =>
                    setActiveFaq(isActive ? null : i)
                  }
                  style={{ cursor: 'pointer' }}
                >
                  {item.question}

                  <span className="cs_accordian_arrow">
                    <svg
                      width="23"
                      height="13"
                      viewBox="0 0 23 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        transform: isActive
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <path
                        d="M22.9996 1.52904L11.5264 12.4967L0.00121875 1.37918"
                        fill="#307BC4"
                      />
                    </svg>
                  </span>
                </h2>

                {isActive && (
                  <div className="cs_accordian_body">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </div>

</section>
   <Footer />
    </>
  )
}
