'use client'

import Image from 'next/image'
import Link from 'next/link'

interface Country {
  name: string
  icon: string
  href: string
}

const countries: Country[] = [
  { name: 'İngiltere', icon: '/visa/uploads/icons/1764382446_54d42ca992ddf99b4289.svg', href: '/visa/ingiltere' },
  { name: 'Danimarka', icon: '/visa/uploads/icons/1765153526_f83b8a07cc28aaa369b4.svg', href: '/visa/danimarka' },
  { name: 'Belçika', icon: '/visa/uploads/icons/1765153595_1f0fef4d753b5d02bda5.svg', href: '/visa/belcika' },
  { name: 'Kanada', icon: '/visa/uploads/icons/1765153740_c9d4b5f8a065e123693f.svg', href: '/visa/kanada' },
  { name: 'Almanya', icon: '/visa/uploads/icons/1765153418_9fe3e271c0b72f052395.svg', href: '/visa/almanya' },
  { name: 'Fransa', icon: '/visa/uploads/icons/1765240129_bad87c0bad281bf57b8b.svg', href: '/visa/fransa' },
  { name: 'İtalya', icon: '/visa/uploads/icons/1765154006_1b24e4173c6457dafbea.svg', href: '/visa/italya' },
  { name: 'Malta', icon: '/visa/uploads/icons/1765154164_af71177c207646d19b62.svg', href: '/visa/malta' },
  { name: 'İrlanda', icon: '/visa/uploads/icons/1765154399_b928e004b98217490022.svg', href: '/visa/irlanda' },
  { name: 'İspanya', icon: '/visa/uploads/icons/1765155530_9abaf74373a4eecfd706.svg', href: '/visa/ispanya' },
  { name: 'Portekiz', icon: '/visa/uploads/icons/1765155591_3ba19bc8145dbfd3876b.svg', href: '/visa/portekiz' },
  { name: 'Amerika', icon: '/visa/uploads/icons/1765156929_355d9baa007f437c1b98.svg', href: '/visa/amerika' },
  { name: 'Hollanda', icon: '/visa/uploads/icons/1765155654_8f0736e95d6e49fe7998.svg', href: '/visa/hollanda' },
  { name: 'Macaristan', icon: '/visa/uploads/icons/1765156553_55ca44c8baaeda593769.svg', href: '/visa/macaristan' },
  { name: 'Yunanistan', icon: '/visa/uploads/icons/1765155714_7b5121cce9ec1be37381.svg', href: '/visa/yunanistan' },
  { name: 'Dubai', icon: '/visa/uploads/icons/1765156599_8f91678f3d6e03ab19dd.svg', href: '/visa/dubai' },
  { name: 'Polonya', icon: '/visa/uploads/icons/1765156449_300b43b0d93d6295e952.svg', href: '/visa/polonya' },
  { name: 'Bulgaristan', icon: '/visa/uploads/icons/1765156654_99758b8dda0ff9a6a5c0.svg', href: '/visa/bulgaristan' },
  { name: 'Lüksemburg', icon: '/visa/uploads/icons/1765156400_dd6a1f256550f2ebc30d.svg', href: '/visa/luksemburg' },
  { name: 'İsveç', icon: '/visa/uploads/icons/1765156702_68c6cc075f185cba9715.svg', href: '/visa/isvec' },
  { name: 'Romanya', icon: '/visa/uploads/icons/1765156347_b10c8e55fde9dbf02cd3.svg', href: '/visa/romanya' },
  { name: 'Slovenya', icon: '/visa/uploads/icons/1765156758_e95fed42dde3a2def473.svg', href: '/visa/slovenya' },
  { name: 'Estonya', icon: '/visa/uploads/icons/1765156166_747261185a0c4ec0ed26.svg', href: '/visa/estonya' },
  { name: 'Letonya', icon: '/visa/uploads/icons/1765155770_7f1aa009192a673c1d96.svg', href: '/visa/letonya' },
  { name: 'Litvanya', icon: '/visa/uploads/icons/1765156120_6bc007e4d7b63fcf7e7d.svg', href: '/visa/litvanya' },
  { name: 'Finlandiya', icon: '/visa/uploads/icons/1765155829_76dd3c52c1570b53661b.svg', href: '/visa/finlandiya' },
  { name: 'Norveç', icon: '/visa/uploads/icons/1765156064_02bb911d41b9a01b0209.svg', href: '/visa/norvec' },
  { name: 'Rusya', icon: '/visa/uploads/icons/1765155895_edf7adbc9cb1ac93d6ab.svg', href: '/visa/rusya' },
  { name: 'Suudi Arabistan', icon: '/visa/uploads/icons/1765156004_6e94b6b2adef49267a44.svg', href: '/visa/suudi-arabistan' },
  { name: 'Çin', icon: '/visa/uploads/icons/1765155942_671bb6e4477d27983ee7.svg', href: '/visa/cin' },
  { name: 'Güney Kore', icon: '/visa/uploads/icons/1765156857_f5c725d2d8679f239407.svg', href: '/visa/guney-kore' },
]

export default function CountryMarquee() {
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
          margin-top: 4rem;
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
          min-width: 7.2rem;
        }
        .flag-box a {
          text-decoration: none;
          color: inherit;
        }
        .flag-box a:hover {
          color: #007bff;
        }
      `}</style>
      <section className="section-marque">
      {/* HTML'deki gibi 3 ayrı items-huge div'i - CSS animasyonu için gerekli */}
      <div className="items-huge">
        {countries.map((country, index) => (
          <div key={`first-${index}`} className="flag-box">
            <Link title={country.name} href={country.href}>
              <Image
                src={country.icon}
                alt={country.name}
                width={72}
                height={50}
                loading="lazy"
              />
              <span className="text">{country.name}</span>
            </Link>
          </div>
        ))}
      </div>
      <div className="items-huge">
        {countries.map((country, index) => (
          <div key={`second-${index}`} className="flag-box">
            <Link title={country.name} href={country.href}>
              <Image
                src={country.icon}
                alt={country.name}
                width={72}
                height={50}
                loading="lazy"
              />
              <span className="text">{country.name}</span>
            </Link>
          </div>
        ))}
      </div>
      <div className="items-huge">
        {countries.map((country, index) => (
          <div key={`third-${index}`} className="flag-box">
            <Link title={country.name} href={country.href}>
              <Image
                src={country.icon}
                alt={country.name}
                width={72}
                height={50}
                loading="lazy"
              />
              <span className="text">{country.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}

