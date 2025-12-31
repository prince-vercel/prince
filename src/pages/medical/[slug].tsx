'use client'

import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

import departmentImg from '@/assets/img/departments/department_img_1.png'
import icon9 from '@/assets/img/departments/icon_9.svg'
import icon10 from '@/assets/img/departments/icon_10.svg'
import icon11 from '@/assets/img/departments/icon_11.svg'
import icon12 from '@/assets/img/departments/icon_12.svg'
import appointmentImg from '@/assets/img/home_1/appointment.jpeg'
import fillingImg from '@/assets/img/dis/dentist-examining-female-patient-with-tools.jpg'
import implantImg from '@/assets/img/dis/close-up-doctor-checking-patient.jpg'
import hollywoodImg from '@/assets/img/dis/beautiful-girl-sitting-dentist-s-office.jpg'
import laminateImg from '@/assets/img/dis/woman-smiling-while-male-dentist-keeping-teeth-color-range.jpg'
import orthoImg from '@/assets/img/dis/smiling-young-woman-with-braces-teeth.jpg'
import canalImg from '@/assets/img/dis/dentist-examining-female-patient-with-tools.jpg'
import zirconiumImg from '@/assets/img/dis/woman-smiling-while-male-dentist-keeping-teeth-color-range (1).jpg'


import Header from '@/src/components/MedicalComponents/Header'
import Footer from '@/src/components/MedicalComponents/Footer'

const slugToTurkishTitle = (slug: string) => {
  const map: Record<string, string> = {
    dis: 'Diş',
    genital: 'Genital',
    gogus: 'Göğüs',
    goz: 'Göz',
    kalca: 'Kalça',
    kulak: 'Kulak',
    'boyun-ve-yuz': 'Boyun ve Yüz',
    burun: 'Burun',
    'sac-ekimi': 'Saç Ekimi',
    'vucut-sekillendirme-liposuction':
      'Vücut Şekillendirme ve Liposuction',
  }

  return map[slug] ?? slug
}


const departmentServices: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { title: string; desc: string; image: any }[]
> = {
  dis: [
    {
      title: 'Diş Dolgusu',
      desc: 'Çürük veya hasar görmüş dişlerin estetik ve fonksiyonel olarak onarılması.',
      image: fillingImg,
    },
    {
      title: 'Diş İmplantı',
      desc: 'Eksik dişlerin yerine uygulanan, doğal diş görünümüne sahip kalıcı implant çözümleri.',
      image: implantImg,
    },
    {
      title: 'Hollywood Smile',
      desc: 'Daha estetik ve simetrik bir gülüş elde etmek için yapılan kapsamlı gülüş tasarımı.',
      image: hollywoodImg,
    },
    {
      title: 'Lamine Kaplama (Porselen Lamina)',
      desc: 'Dişlerin ön yüzeyine uygulanan ince porselen kaplamalar ile estetik görünüm sağlanması.',
      image: laminateImg,
    },
    {
      title: 'Ortodontik Tedavi',
      desc: 'Diş ve çene bozukluklarını düzeltmeye yönelik tel ve şeffaf plak tedavileri.',
      image: orthoImg,
    },
    {
      title: 'Kanal Tedavisi',
      desc: 'Diş kökünde oluşan enfeksiyonların temizlenmesi ve dişin kurtarılmasını sağlayan tedavi.',
      image: canalImg,
    },
    {
      title: 'Zirkonyum Kaplama',
      desc: 'Dayanıklı yapısı ve doğal görünümü ile estetik diş kaplama uygulamaları.',
      image: zirconiumImg,
    },
  ],
}




export default function MedicalDetailPage() {
  const router = useRouter()
  const { slug } = router.query

  if (!slug) return null

  const title = slugToTurkishTitle(String(slug))

  return (
    <>
      <Header />

        <div className="container">
              <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/medical">Anasayfa</Link>
          </li>
     
              <li className="breadcrumb-item active">{title}</li>
            </ol>
        </div>

      <div className="cs_height_135 cs_height_lg_100"></div>

      <section className="cs_shape_wrap" >
        <div className="container">
          <div className="row align-items-center mt-5">
            <div className="col-lg-4">
              <div className="cs_section_heading cs_style_1">
                <h2 className="cs_section_title cs_fs_72 m-0">{title}</h2>
                <div className="cs_height_54"></div>
                <p>
                  {title} bölümü modern tıbbi tedaviler ve hasta odaklı sağlık
                  çözümleri sunmaktadır.
                </p>
                <div className="cs_height_120"></div>
              </div>
            </div>
            <div className="col-lg-7 offset-lg-1">
              <Image src={departmentImg} alt={title} />
            </div>
          </div>
        </div>
      </section>

    <section id="department-services" style={{margin:'30px'}}>
  <div className="cs_height_190 cs_height_xl_150 cs_height_lg_105"></div>

  <div className="container">
    <div className="cs_section_heading cs_style_1 text-center">

      <div className="cs_height_5"></div>
      <h2 className="cs_section_title cs_fs_72 m-0">
        Treatments & Procedures
      </h2>
    </div>

    <div className="cs_height_72 cs_height_lg_50"></div>

    <div className="cs_iconbox_12_wrap">
      {(departmentServices[String(slug)] ?? []).map((item, i) => (
        <div key={i}>
          <div className="cs_iconbox cs_style_12">
            <div className="cs_iconbox_info cs_radius_20">
              <span className="cs_iconbox_circle cs_accent_bg"></span>

              <h2 className="cs_iconbox_title cs_fs_32 cs_semibold">
                {item.title}
              </h2>

              <p className="cs_iconbox_subtitle mb-0 cs_heading_color">
                {item.desc}
              </p>
            </div>

            <div className="cs_iconbox_icon cs_center">
  <Image
    src={item.image}
    alt={item.title}
    width={80}
    height={80}
    style={{
      objectFit: 'cover',
      borderRadius: '50%',
    }}
  />
</div>

          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* TREATMENTS */}
      <section>
        <div className="cs_height_170 cs_height_xl_145 cs_height_lg_90"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1">
            <h3 className="cs_section_subtitle cs_accent_color cs_fs_32">
              TEDAVİ TÜRLERİ
            </h3>
            <div className="cs_height_5"></div>
            <h2 className="cs_section_title cs_fs_72">
              Treatments
            </h2>
          </div>

          <div className="cs_height_30"></div>

          <div
            className="cs_iconbox_8_wrap cs_radius_30"
            style={{
              background: 'linear-gradient(154deg, #d2eaef 0%, #86bbf1 100%)',
              padding: '10px 40px',
              marginBottom: '20px',
            }}
          >
            <div className="row">
              {[
                {
                  icon: icon9,
                  title: 'Aşı Uygulamaları',
                  desc: 'Hastalıklara karşı koruyucu aşı hizmetleri.',
                },
                {
                  icon: icon10,
                  title: 'Akut Hastalıklar',
                  desc: 'Enfeksiyon ve ani gelişen rahatsızlıkların tedavisi.',
                },
                {
                  icon: icon11,
                  title: 'Kronik Tedaviler',
                  desc: 'Uzun süreli hastalıkların takibi ve tedavisi.',
                },
                {
                  icon: icon12,
                  title: 'Gelişim Taramaları',
                  desc: 'Erken tanı için düzenli sağlık kontrolleri.',
                },
              ].map((item, i) => (
                <div key={i} className="col-xl-3 col-md-6">
                  <div className="cs_iconbox cs_style_8 text-center cs_radius_20">
                    <div className="cs_iconbox_icon rounded-circle cs_center">
                      <Image src={item.icon} alt={item.title} />
                    </div>
                    <h2 className="cs_iconbox_title cs_fs_32">
                      {item.title}
                    </h2>
                    <p className="cs_iconbox_subtitle m-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

        {/* APPOINTMENT */}
<section className="cs_shape_wrap">
  <div className="cs_shape_2">
    <svg
      width="1089"
      height="1002"
      viewBox="0 0 1089 1002"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.2"
        d="M444.57 826.314C529.104 1065.89 739.237 1008.47 834.547 949.171C981.567 843.507 997.742 626.309 999.967 542.103C1001.75 474.739 1058.26 303.318 1086.29 226.028C1115.11 -40.9119 843.814 0.833657 795.515 6.26561C747.215 11.6976 593.662 71.4673 441.083 40.606C319.02 15.917 205.529 28.8791 164.042 38.4462C-13.0065 100.952 -2.22156 200.043 3.13034 242.954C8.48234 285.864 53.2821 366.319 234.465 453.073C379.411 522.475 435.469 730.386 444.57 826.314Z"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="844.274"
          y1="950.214"
          x2="424.319"
          y2="-69.4782"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#86BBF1" />
          <stop offset="1" stopColor="#D2EAEF" />
        </linearGradient>
      </defs>
    </svg>
  </div>

  <div className="cs_height_190 cs_height_xl_145 cs_height_lg_105"></div>

<div
  className="container cs_radius_30"
  style={{
    background: 'linear-gradient(135deg, #f4f9fd 0%, #e8f2fb 100%)',
    padding: '80px 40px',
  }}
>
    
<div className="d-flex align-items-center justify-content-center">

  <div className="cs_section_heading cs_style_1 text-center">
    <h3 className="cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_fs_32">
      BOOK AN
    </h3>
    <div className="cs_height_5"></div>
    <h2 className="cs_section_title cs_fs_72 m-0">Appointment</h2>
    <div className="cs_animated_btn_wrap">
  <Link href="/medical/form" className="cs_btn cs_style_1 cs_center cs_animated_btn">
    <span>→</span>
  </Link>
</div>

  </div>
</div>

  </div>
</section>


      <Footer />
    </>
  )
}
