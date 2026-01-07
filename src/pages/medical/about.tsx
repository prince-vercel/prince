"use client";

import Image from "next/image";
import Header from "@/src/components/MedicalComponents/Header";
import bannerImg from "@/assets/img/about/banner_img.png";

import whyChooseUs from "@/assets/img/about/why_choose_us.jpeg";
import professionalIcon from "@/assets/img/icons/professional.svg";
import comprehensiveIcon from "@/assets/img/icons/comprehensive.svg";
import patientIcon from "@/assets/img/icons/patient.svg";
import facilitiesIcon from "@/assets/img/icons/facilities.svg";
import calendarIcon from "@/assets/img/icons/calendar_white.svg";
import arrowIcon from "@/assets/img/icons/arrow_white.svg";
import Footer from "./../../components/MedicalComponents/Footer";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { db } from "@/src/lib/firebase";
import { getDocs, collection } from "firebase/firestore";

interface FAQ {
  id: string
  question: string
  answer: string
}

const services = [
  {
    title: "Tanı testleri",
    desc: "Kan testleri, görüntüleme çalışmaları ve sağlık durumlarını tanılamak için diğer testler",
  },
  {
    title: "Rehabilitasyon hizmetleri",
    desc: "Fizyoterapia, meslek terapisi ve iyileşme hizmetleri",
  },
  {
    title: "Koruyucu bakım",
    desc: "Yıllık kontroller, bağışıklamalar ve sağlık taramaları",
  },
  {
    title: "Kronik hastalık tedavisi",
    desc: "Hastalık yönetimi ve uzun vadeli tedavi planları",
  },
  {
    title: "Ruh sağlığı hizmetleri",
    desc: "Danışmanlık, terapi ve psikolojik destek",
  },
];

export default function AboutPage() {
  const counters = useMemo(
    () => [
      { end: 25000, label: "Mutlu Hastalar", suffix: "+" },
      { end: 120, label: "Uzman Doktor", suffix: "+" },
      { end: 15, label: "Yıl Deneyim", suffix: "+" },
      { end: 50, label: "Ödüller", suffix: "+" },
    ],
    []
  );
  const [activeFaq, setActiveFaq] = useState<number | null>(2);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [faqLoading, setFaqLoading] = useState(true);

  const [values, setValues] = useState(counters.map(() => 0));

  // Fetch FAQs from Firestore
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setFaqLoading(true)
        const faqsRef = collection(db, 'medicalcontents/faq/list')
        const snapshot = await getDocs(faqsRef)
        const faqsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FAQ[]
        setFaqs(faqsData)
      } catch (error) {
        console.error('FAQ verileri çekilirken hata:', error)
      } finally {
        setFaqLoading(false)
      }
    }

    fetchFaqs()
  }, [])

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setValues(
        counters.map((item) =>
          Math.min(Math.round((item.end / steps) * currentStep), item.end)
        )
      );

      if (currentStep >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [counters]);
  return (
    <>
      <section style={{ background: '#4f8edc', padding: '20px 0 20px 0' }}>
        <div className="container" style={{ marginBottom: '20px', marginTop: '-45px' }}>
          <ol className="breadcrumb2" style={{ color: '#fff', marginLeft: '0' }}>
            <li className="breadcrumb-item2" style={{ color: '#fff' }}>
              <Link href="/medical" style={{ color: '#fff' }}>Anasayfa</Link>
            </li>
            <li className="breadcrumb-item2 active" style={{ color: '#fff' }}>Hakkımızda</li>
          </ol>

          <div className="cs_banner_text">
            <h2 className="cs_banner_title cs_fs_72" style={{ color: '#fff' }}>
              Hakkımızda
            </h2>
            <p className="cs_banner_subtitle cs_fs_20" style={{ color: '#fff' }}>
              Sağlığınız ve güzelliğiniz bizim önceliğimiz.
            </p>
          </div>
        </div>
      </section>
      <section className="cs_shape_wrap">

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
                 <h2 className="cs_section_title cs_fs_72 m-0 " style={{ fontWeight: 'bold' }}>
                  Neden Bizi Seçmelisiniz ?
               </h2>
              </div>

             <div className="cs_height_85 cs_height_xl_70 cs_height_lg_50"></div>

             <div className="row">
            <div className="col-md-6">
                 <div className="cs_iconbox cs_style_6">
                  <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                     <Image
                      src={professionalIcon}
                       alt=""
                     width={32}
                        height={32}
                     />
                 </div>

                    <p className="cs_iconbox_subtitle m-0" style={{ fontSize: '15px' }}>
                   Prince Medical olarak, uluslararası hastalara Türkiye’nin dünya standartlarındaki
                    sağlık hizmetlerini güvenli, şeffaf ve konforlu bir şekilde sunmak amacıyla kurulduk. 
                    Alanında uzman doktorlar ve tam donanımlı sağlık kuruluşlarıyla iş birliği yaparak, 
                    hastalarımıza en yüksek kalite standartlarında tedavi süreçleri sunuyoruz.

                   </p>
                 </div>
                  <div className="cs_height_85 cs_height_xl_60 cs_height_lg_35"></div>
               </div>

            <div className="col-md-6">
                  <div className="cs_iconbox cs_style_6">
                     <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                      <Image
                        src={comprehensiveIcon}
                       alt=""
                      width={32}
                        height={32}
                      />
                     </div>
                   <p className="cs_iconbox_subtitle m-0" style={{ fontSize: '15px' }}>
                   Medical turizm alanındaki deneyimimizle; estetik cerrahi, saç ekimi, diş tedavileri ve birçok branşta kişiye özel çözümler geliştiriyoruz. Tedavi sürecinin her aşamasında, hastalarımızın ihtiyaçlarını önceliklendiriyor; danışmanlıktan tedavi sonrasına kadar uçtan uca hizmet sağlıyoruz.
                    </p>
                  </div>
                  <div className="cs_height_85 cs_height_xl_60 cs_height_lg_35"></div>
                </div>
                 <div className="col-md-6">
                  <div className="cs_iconbox cs_style_6">
                     <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                       <Image src={patientIcon} alt="" width={32} height={32} />
                     </div>
                     <p className="cs_iconbox_subtitle m-0" style={{ fontSize: '15px' }}>
                    Yurt dışından gelen misafirlerimiz için seyahat planlaması, konaklama, VIP transfer ve çok dilli hasta koordinasyonu hizmetleri sunarak, tedavi sürecini stressiz ve güvenli hale getiriyoruz.
                     </p>
                   </div>
                   <div className="cs_height_85 cs_height_xl_60 cs_height_lg_35"></div>
                </div>

                <div className="col-md-6">
                  <div className="cs_iconbox cs_style_6">
                    <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                      <Image
                         src={facilitiesIcon}
                         alt=""
                         width={32}
                         height={32}
                       />
                     </div>
                     <p className="cs_iconbox_subtitle m-0" style={{ fontSize: '15px' }}>
              Prince Medical olarak temel prensibimiz; etik değerlere bağlı, hasta memnuniyetini esas alan ve sürdürülebilir sağlık çözümleri üretmektir. Sağlığınız bizim için bir hizmet değil, bir sorumluluktur.
                     </p>
                   </div>
                 </div>
              </div>
             </div>
           </div>
        </div>
      </section>
           
     <section
         className="cs_counter cs_style_1"
         style={{ marginTop: "15vh", marginBottom: "15vh" }}
      >
        <div className="container">
           <div className="row text-center">
           {counters.map((item, i) => (
              <div key={i} className="col-lg-3 col-6">
                 <h2
                   className="cs_counter_number"
                   style={{ fontSize: "30px", fontWeight: "500" }}
                >
                  {item.end >= 1000
                    ? `${Math.floor(values[i] / 1000)}K${item.suffix}`
                    : `${values[i]}${item.suffix}`}
                </h2>
                <p
                  className="cs_counter_title"
                 style={{ fontSize: "18px", fontWeight: "600" }}
              >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
         </div>
       </section>



<section className="cs_section_spacing">
         <div className="container">
           <div className="row">
           <div className="col-md-6 col-xl-4">
             <div className="cs_section_heading cs_style_1">
               <h3 className="cs_section_subtitle text-uppercase cs_accent_color cs_fs_32" style={{ fontWeight: '600' }}>
                 HİZMETLER
               </h3>
               <div className="cs_height_5"></div>
               <h4 className="cs_section_title cs_fs_48">
                 En İyi Hizmetlerimizi Sunuyoruz
               </h4>
             </div>
             <div className="cs_height_70 cs_height_lg_50"></div>
           </div>
            {services.map((item, i) => (
              <div key={i} className="col-md-6 col-xl-4">
              <div className="cs_iconbox cs_style_4">
                  <div className="cs_iconbox_icon cs_accent_bg rounded-circle cs_center">
                     <Image src={calendarIcon} alt="" width={20} height={20} />
                  </div>
                  <h2 className="cs_iconbox_title cs_fs_32">{item.title}</h2>

                  <p className="cs_iconbox_subtitle m-0">{item.desc}</p>

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


      <section
     className="cs_shape_wrap cs_faq_section"
     style={{ marginBottom: 0 }}
     id="faqs"
   >


     <div className="container">
       <div className="row">
         <div className="col-xxl-4">
           <div className="cs_section_heading cs_style_1">
             <h3 className="cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_fs_32">
               İnsanlar Genellikle
             </h3>
             <div className="cs_height_5"></div>
             <h2 className="cs_section_title cs_fs_72 m-0">Soruyorlar</h2>
           </div>
           <div className="cs_height_70 cs_height_lg_50"></div>
         </div>
       </div>

       <div className="row">
         <div className="col-xxl-8 offset-xxl-4">
           <div className="cs_accordians cs_style1 cs_type_1 cs_heading_color">
             {faqLoading ? (
               <div style={{ textAlign: 'center', padding: '40px', width: '100%' }}>
                 <p>Sorular yükleniyor...</p>
               </div>
             ) : faqs.length === 0 ? (
               <div style={{ textAlign: 'center', padding: '40px', width: '100%' }}>
                 <p>Henüz soru eklenmemiş</p>
               </div>
             ) : (
               faqs.map((item, i) => {
                 const isActive = activeFaq === i;

                 return (
                   <div
                     key={item.id}
                     className={`cs_accordian ${isActive ? "active" : ""}`}
                   >
                     <h2
                       className="cs_accordian_head cs_heading_color"
                       onClick={() => setActiveFaq(isActive ? null : i)}
                       style={{ cursor: "pointer" }}
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
                               ? "rotate(180deg)"
                               : "rotate(0deg)",
                             transition: "transform 0.3s ease",
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
                         {React.createElement("p", null, item.answer)}
                       </div>
                     )}
                   </div>
                 );
               })
             )}
           </div>
         </div>
       </div>
     </div>
   </section>
    </>
  );
}