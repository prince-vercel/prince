'use client'

import Link from 'next/link'
import Image from 'next/image'
import logoBlack from '@/assets/logo/logo-black.png'
import styles from '@/src/styles/admin.module.css'

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0'
}

const boxes = [
  {
    title: 'Medikal',
    desc: 'Medikal İçerik ve Başvuru Yönetimi',
    href: '/admin/medical',
    color: '#307BC4',
    lightColor: '#5BA3D0',
  },
  {
    title: 'Seyahat',
    desc: 'Seyahat İçerik ve Başvuru Yönetimi',
    href: '/admin/travel',
    color: '#E8604C',
    lightColor: '#F19680',
  },
  {
    title: 'Vize',
    desc: 'Vize İçerik ve Başvuru Yönetimi',
    href: '/admin/visa',
    color: '#3A9D7A',
    lightColor: '#5DB896',
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
              background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(${hexToRgb(box.lightColor)}, 0.15) 100%)`
            }}
          >

            <h3
              className={styles.adminBoxTitle}
              style={{ color: box.color }}
            >
              {box.title}
            </h3>

            <p
              className={styles.adminBoxDesc}
              style={{ color: box.color }}
            >
              {box.desc}
            </p>

            <span
              className={styles.adminBoxLink}
              style={{ color: box.color }}
            >
              Yönet  →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
