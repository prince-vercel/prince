'use client'

import Link from 'next/link'
import Image from 'next/image'
import logoBlack from '@/assets/logo/logo-black.png'
import styles from '@/src/styles/admin.module.css'
import { MdLocalHospital, MdFlightTakeoff, MdVerifiedUser } from 'react-icons/md'

const boxes = [
  {
    title: 'Prince Medikal Estetik & Sağlık Hizmetleri',
    desc: 'Sağlık hizmetleri, kuruluşlar ve başvurular',
    href: '/admin/medical',
    color: '#307BC4',
    lightColor: '#5BA3D0',
    icon: <MdLocalHospital size={48} />,
  },
  {
    title: 'Prince Turizm ve Travel',
    desc: 'Prince Vize Danışmanlığı',
    href: '/admin/travel',
    color: '#d7b76e',
    lightColor: '#F19680',
    icon: <MdFlightTakeoff size={48} />,
  },
  {
    title: 'Vize Danışmanlığı',
    desc: 'Vize başvuruları ve belge yönetimi',
    href: '/admin/visa',
    color: '#3A9D7A',
    lightColor: '#5DB896',
    icon: <MdVerifiedUser size={48} />,
  },
]

export default function Boxes() {
  return (
    <div className={styles.adminPageWrapper}>
      <h1 className={styles.adminTitle}>
        <Image
          src={logoBlack}
          alt="Prince Logo"
          width={110}
          height={110}
          className={styles.logo}
        />
        Prince Admin Paneli
      </h1>

      <div className={styles.adminBoxGrid}>
        {boxes.map((box) => (
          <Link
            key={box.title}
            href={box.href}
            className={styles.adminBox}
            style={{ 
              borderColor: box.color,
              '--color-start': box.color,
              '--color-end': box.lightColor,
            } as React.CSSProperties & { '--color-start': string; '--color-end': string }}
          >
            <div style={{ color: box.color, marginBottom: '12px' }}>
              {box.icon}
            </div>

            <h3
              className={styles.adminBoxTitle}
              style={{ color: box.color }}
            >
              {box.title}
            </h3>

            <p
              className={styles.adminBoxDesc}
              style={{ color: '#6b7280' }}
            >
              {box.desc}
            </p>

            <span
              className={styles.adminBoxLink}
              style={{ color: box.color }}
            >
              Yönet →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
