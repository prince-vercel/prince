'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from '@/src/styles/admin.module.css'
import { MdLocalHospital, MdFlightTakeoff, MdVerifiedUser, MdEdit } from 'react-icons/md'
import ImageManagerModal from '@/src/components/ImageManagerModal'

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
    title: 'Prince Vize Danışmanlığı',
    desc: 'Vize başvuruları ve belge yönetimi',
    href: '/admin/visa',
    color: '#c42127',
    lightColor: '#f19680',
    icon: <MdVerifiedUser size={48} />,
  },
    {
    title: 'Prince Turizm ve Travel',
    desc: 'Prince Seyahat turizm yönetimi',
    href: '/admin/travel',
    color: '#d7b76e',
    lightColor: '#F19680',
    icon: <MdFlightTakeoff size={48} />,
  },
]

export default function Boxes() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState('')

  const handleEditClick = (section: string) => {
    setSelectedSection(section)
    setModalOpen(true)
  }

  const handleImageUpdate = (section: string, url: string) => {
    // Optionally update local state or reload
    console.log(`Image updated for ${section}: ${url}`)
  }
  return (
    <div className={styles.adminPageWrapper}>
    

      <div className={styles.adminBoxGrid}>
        {boxes.map((box) => (
          <div key={box.title} className={styles.adminBoxContainer}>
            <Link
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
            <button 
              className={styles.editImageButton} 
              onClick={() => handleEditClick(box.href.split('/').pop() || '')}
              title="Görsel Yönetimi"
            >
              <MdEdit size={16} />
            </button>
          </div>
        ))}
      </div>

      <ImageManagerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        section={selectedSection}
        onImageUpdate={handleImageUpdate}
      />
    </div>
  )
}
