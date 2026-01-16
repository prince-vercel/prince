/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

import { db } from "@/src/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSafeTranslation } from "@/src/hooks/useSafeTranslation";
import { getCollectionName } from "@/src/lib/localization";
import i18n from "@/src/i18n";
import "@/src/i18n";


export default function AboutPage() {
  const { t, isReady } = useSafeTranslation()
  const counters = useMemo(
    () => [
      { end: 25000, label: isReady ? t('medical.pages.about.counters.happyPatients') : "Mutlu Hastalar", suffix: "+" },
      { end: 120, label: isReady ? t('medical.pages.about.counters.expertDoctors') : "Uzman Doktor", suffix: "+" },
      { end: 15, label: isReady ? t('medical.pages.about.counters.yearsExperience') : "Yıl Deneyim", suffix: "+" },
      { end: 50, label: isReady ? t('medical.pages.about.counters.awards') : "Ödüller", suffix: "+" },
    ],
    [t, isReady]
  );

  const [partners, setPartners] = useState<any[]>([])
  const [loadingPartners, setLoadingPartners] = useState(true)
  const [values, setValues] = useState(counters.map(() => 0));


  // Firebase'den partners'ları çek
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const baseCollection = getCollectionName('medicalcontents', i18n.language)
        const querySnapshot = await getDocs(collection(db, `${baseCollection}/partner/partners`))
        const partnersData: any[] = []
        querySnapshot.forEach((doc) => {
          partnersData.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        // Düzenlemeye göre sırala
        setPartners(partnersData.sort((a, b) => (a.order || 0) - (b.order || 0)))
      } catch (error) {
        console.error(isReady ? t('medical.homePage.errors.loadingPartners') : 'Partners yükleme hatası:', error)
      } finally {
        setLoadingPartners(false)
      }
    }

    fetchPartners()
  }, [i18n.language])
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
              <Link href="/medical" style={{ color: '#fff' }} suppressHydrationWarning>{isReady ? t('medical.pages.breadcrumb.home') : ''}</Link>
            </li>
            <li className="breadcrumb-item2 active" style={{ color: '#fff' }} suppressHydrationWarning>{isReady ? t('medical.pages.breadcrumb.about') : ''}</li>
          </ol>

          <div className="cs_banner_text">
            <h2 className="cs_banner_title cs_fs_72" style={{ color: '#fff' }} suppressHydrationWarning>
              {isReady ? t('medical.pages.about.title') : ''}
            </h2>
            <p className="cs_banner_subtitle cs_fs_20" style={{ color: '#fff' }} suppressHydrationWarning>
              {isReady ? t('medical.pages.about.subtitle') : ''}
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
                  src="/assets/img/about/why_choose_us.jpeg"
                  alt="Why Choose Us"
                  width={500}
                  height={500}
                  className="cs_radius_30"
                />
              </div>
            </div>

            <div className="col-xl-7">
              <div className="cs_section_heading cs_style_1">
                <h2 className="cs_section_title cs_fs_72 m-0 " style={{ fontWeight: 'bold' }} suppressHydrationWarning>
                  {isReady ? t('medical.pages.about.whyChooseUs') : ''}
                </h2>
              </div>

              <div className="cs_height_85 cs_height_xl_70 cs_height_lg_50"></div>

              <div className="row">
                <div className="col-md-6">
                  <div className="cs_iconbox cs_style_6">
                    <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                      <Image
                        src="/assets/img/icons/professional.svg"
                        alt=""
                        width={32}
                        height={32}
                      />
                    </div>

                    <p className="cs_iconbox_subtitle m-0" style={{ fontSize: '15px' }} suppressHydrationWarning>
                      {isReady ? t('medical.pages.about.description1') : ''}
                    </p>
                  </div>
                  <div className="cs_height_85 cs_height_xl_60 cs_height_lg_35"></div>
                </div>

                <div className="col-md-6">
                  <div className="cs_iconbox cs_style_6">
                    <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                      <Image
                        src="/assets/img/icons/comprehensive.svg"
                        alt=""
                        width={32}
                        height={32}
                      />
                    </div>
                    <p className="cs_iconbox_subtitle m-0" style={{ fontSize: '15px' }} suppressHydrationWarning>
                      {isReady ? t('medical.pages.about.description2') : ''}
                    </p>
                  </div>
                  <div className="cs_height_85 cs_height_xl_60 cs_height_lg_35"></div>
                </div>
                <div className="col-md-6">
                  <div className="cs_iconbox cs_style_6">
                    <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                      <Image src="/assets/img/icons/patient.svg" alt="" width={32} height={32} />
                    </div>
                    <p className="cs_iconbox_subtitle m-0" style={{ fontSize: '15px' }} suppressHydrationWarning>
                      {isReady ? t('medical.pages.about.description3') : ''}
                    </p>
                  </div>
                  <div className="cs_height_85 cs_height_xl_60 cs_height_lg_35"></div>
                </div>

                <div className="col-md-6">
                  <div className="cs_iconbox cs_style_6">
                    <div className="cs_iconbox_icon cs_center cs_accent_bg rounded-circle">
                      <Image
                        src="/assets/img/icons/facilities.svg"
                        alt=""
                        width={32}
                        height={32}
                      />
                    </div>
                    <p className="cs_iconbox_subtitle m-0" style={{ fontSize: '15px' }} suppressHydrationWarning>
                      {isReady ? t('medical.pages.about.description4') : ''}
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




      {/* PARTNERS */}
      <section>
        <div className="container" style={{ marginTop: '20vh' }}>
          <div className="cs_brands cs_style_1 cs_brand_marquee">
            <div className="cs_brands_track">
              {loadingPartners ? (
                <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                  <p suppressHydrationWarning>{isReady ? t('medical.pages.about.partners.loading') : ''}</p>
                </div>
              ) : partners.length === 0 ? (
                <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                  <p suppressHydrationWarning>{isReady ? t('medical.pages.about.partners.noPartners') : ''}</p>
                </div>
              ) : (
                partners.concat(partners).map((partner, i) => (
                  <div key={i} className="cs_brand cs_center" style={{ marginRight: '40px' }}>
                    <Image
                      src={partner.imageUrl}
                      alt={partner.title || 'Partner'}
                      width={90}
                      height={45}
                      style={{
                        objectFit: 'contain',
                        filter: 'grayscale(100%)',
                        opacity: 0.8
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>




    </>
  );
}