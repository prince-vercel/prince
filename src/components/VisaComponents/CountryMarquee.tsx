'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'

interface Country {
  nameKey: string
  icon: string
}

const countries: Country[] = [
  { nameKey: 'ingiltere', icon: '/visa/uploads/icons/1764382446_54d42ca992ddf99b4289.svg' },
  { nameKey: 'danimarka', icon: '/visa/uploads/icons/1765153526_f83b8a07cc28aaa369b4.svg' },
  { nameKey: 'belcika', icon: '/visa/uploads/icons/1765153595_1f0fef4d753b5d02bda5.svg' },
  { nameKey: 'kanada', icon: '/visa/uploads/icons/1765153740_c9d4b5f8a065e123693f.svg' },
  { nameKey: 'almanya', icon: '/visa/uploads/icons/1765153418_9fe3e271c0b72f052395.svg' },
  { nameKey: 'fransa', icon: '/visa/uploads/icons/1765240129_bad87c0bad281bf57b8b.svg' },
  { nameKey: 'italya', icon: '/visa/uploads/icons/1765154006_1b24e4173c6457dafbea.svg' },
  { nameKey: 'malta', icon: '/visa/uploads/icons/1765154164_af71177c207646d19b62.svg' },
  { nameKey: 'irlanda', icon: '/visa/uploads/icons/1765154399_b928e004b98217490022.svg' },
  { nameKey: 'ispanya', icon: '/visa/uploads/icons/1765155530_9abaf74373a4eecfd706.svg' },
  { nameKey: 'portekiz', icon: '/visa/uploads/icons/1765155591_3ba19bc8145dbfd3876b.svg' },
  { nameKey: 'amerika', icon: '/visa/uploads/icons/1765156929_355d9baa007f437c1b98.svg' },
  { nameKey: 'hollanda', icon: '/visa/uploads/icons/1765155654_8f0736e95d6e49fe7998.svg' },
  { nameKey: 'macaristan', icon: '/visa/uploads/icons/1765156553_55ca44c8baaeda593769.svg' },
  { nameKey: 'yunanistan', icon: '/visa/uploads/icons/1765155714_7b5121cce9ec1be37381.svg' },
  { nameKey: 'dubai', icon: '/visa/uploads/icons/1765156599_8f91678f3d6e03ab19dd.svg' },
  { nameKey: 'polonya', icon: '/visa/uploads/icons/1765156449_300b43b0d93d6295e952.svg' },
  { nameKey: 'bulgaristan', icon: '/visa/uploads/icons/1765156654_99758b8dda0ff9a6a5c0.svg' },
  { nameKey: 'luksemburg', icon: '/visa/uploads/icons/1765156400_dd6a1f256550f2ebc30d.svg' },
  { nameKey: 'isvec', icon: '/visa/uploads/icons/1765156702_68c6cc075f185cba9715.svg' },
  { nameKey: 'romanya', icon: '/visa/uploads/icons/1765156347_b10c8e55fde9dbf02cd3.svg' },
  { nameKey: 'slovenya', icon: '/visa/uploads/icons/1765156758_e95fed42dde3a2def473.svg' },
  { nameKey: 'estonya', icon: '/visa/uploads/icons/1765156166_747261185a0c4ec0ed26.svg' },
  { nameKey: 'letonya', icon: '/visa/uploads/icons/1765155770_7f1aa009192a673c1d96.svg' },
  { nameKey: 'litvanya', icon: '/visa/uploads/icons/1765156120_6bc007e4d7b63fcf7e7d.svg' },
  { nameKey: 'finlandiya', icon: '/visa/uploads/icons/1765155829_76dd3c52c1570b53661b.svg' },
  { nameKey: 'norvec', icon: '/visa/uploads/icons/1765156064_02bb911d41b9a01b0209.svg' },
  { nameKey: 'rusya', icon: '/visa/uploads/icons/1765155895_edf7adbc9cb1ac93d6ab.svg' },
  { nameKey: 'suudiArabistan', icon: '/visa/uploads/icons/1765156004_6e94b6b2adef49267a44.svg' },
  { nameKey: 'cin', icon: '/visa/uploads/icons/1765155942_671bb6e4477d27983ee7.svg' },
  { nameKey: 'guneyKore', icon: '/visa/uploads/icons/1765156857_f5c725d2d8679f239407.svg' },
]

export default function CountryMarquee() {
  const { t, i18n } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <>
      <style>{`
        .section-marque {
          width: 100%;
          display: flex;
          flex-wrap: nowrap;
          overflow: hidden;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 0 3rem;
          padding: 4rem 0;
        }
        .section-marque .items-huge {
          gap: 0 3rem;
          display: flex;
          flex-wrap: nowrap;
          animation: sliding 44s linear infinite;
        }
        @keyframes sliding {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
        .flag-box {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 1.2rem;
          line-height: 1.4;
          color: #231f20;
          font-weight: 500;
          gap: 1rem 0;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }
        .flag-box img {
          display: inline-block;
          border-radius: 0.4rem;
          width: 72px;
          height: 50px;
          object-fit: cover;
        }
      `}</style>
      <section className="section-marque">
        {/* HTML'deki gibi 3 ayrı items-huge div'i - CSS animasyonu için gerekli */}
        <div className="items-huge">
          {countries.map((country, index) => {
            const countryName = mounted && i18n.isInitialized
              ? t(`visa.countries.${country.nameKey}`, country.nameKey)
              : country.nameKey
            return (
              <div key={`first-${index}`} className="flag-box">
                <div title={countryName}>
                  <Image
                    src={country.icon}
                    alt={countryName}
                    width={72}
                    height={50}
                    loading="lazy"
                  />
                  <span className="text" suppressHydrationWarning>{countryName}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="items-huge">
          {countries.map((country, index) => {
            const countryName = mounted && i18n.isInitialized
              ? t(`visa.countries.${country.nameKey}`, country.nameKey)
              : country.nameKey
            return (
              <div key={`second-${index}`} className="flag-box">
                <div title={countryName}>
                  <Image
                    src={country.icon}
                    alt={countryName}
                    width={72}
                    height={50}
                    loading="lazy"
                  />
                  <span className="text" suppressHydrationWarning>{countryName}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="items-huge">
          {countries.map((country, index) => {
            const countryName = mounted && i18n.isInitialized
              ? t(`visa.countries.${country.nameKey}`, country.nameKey)
              : country.nameKey
            return (
              <div key={`third-${index}`} className="flag-box">
                <div title={countryName}>
                  <Image
                    src={country.icon}
                    alt={countryName}
                    width={72}
                    height={50}
                    loading="lazy"
                  />
                  <span className="text" suppressHydrationWarning>{countryName}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

