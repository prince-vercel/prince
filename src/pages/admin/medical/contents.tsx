/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminMedicalLayout } from '@/src/components/AdminComponents/medical/AdminMedicalLayout'
import ContentServices from '@/src/components/AdminComponents/medical/ContentServices'
import ContentOrganizations from '@/src/components/AdminComponents/medical/ContentOrganizations'
import ContentResults from '@/src/components/AdminComponents/medical/ContentResults'
import ContentFaq from '@/src/components/AdminComponents/medical/ContentFaq'
import { useState } from 'react'
import React from 'react'
import styles from '@/src/styles/admin.module.css'
import {
  MdAdd,
  MdApartment,
  MdStar,
  MdArticle,
  MdHelpOutline
} from 'react-icons/md'
import ContentBlog from '@/src/components/AdminComponents/medical/ContentBlog'

const ContentsPage = () => {
  const [activeTab, setActiveTab] = useState<
    'services' | 'organizations' | 'results' | 'blog' | 'faq' | null
  >(null)

  const contentBoxes = [
    {
      id: 'services',
      title: 'Hizmetler',
      icon: <MdAdd size={40} />
    },
    {
      id: 'organizations',
      title: 'Kuruluşlarımız',
      icon: <MdApartment size={40} />
    },
    {
      id: 'results',
      title: 'Mutlu Sonuçlar',
      icon: <MdStar size={40} />
    },
    {
      id: 'blog',
      title: 'Blog Yazıları',
      icon: <MdArticle size={40} />
    },
    {
      id: 'faq',
      title: 'SSS',
      icon: <MdHelpOutline size={40} />
    }
  ] as const

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <ContentServices />
      case 'organizations':
        return <ContentOrganizations />
      case 'results':
        return <ContentResults />
      case 'blog':
        return <ContentBlog />
      case 'faq':
        return <ContentFaq />
      default:
        return null
    }
  }

  return (
    <AdminMedicalLayout>
      <div className={styles.gfContainer}>
      {/* HEADER */}
      <h1 className={styles.gfTitle}>
        İçerik Yönetimi
      </h1>


      {/* BOXES */}
      <div className={styles.contentsPageGrid}>
        {contentBoxes.map((box) => {
          const isActive = activeTab === box.id

          return (
            <button
              key={box.id}
              onClick={() => setActiveTab(box.id as any)}
              className={`${styles.contentsPageButton} ${
                isActive ? styles.contentsPageButtonActive : ''
              }`}
            >
              <div className={styles.contentsPageButtonIcon}>
                {React.cloneElement(box.icon, { size: 52 })}
              </div>

              <h3 className={styles.contentsPageButtonTitle}>
                {box.title}
              </h3>
            </button>
          )
        })}
      </div>

      {/* CONTENT */}
      <div>
        {activeTab ? (
          renderContent()
        ) : (
          <div className={styles.contentsPageEmpty}>
            Yukarıdan bir içerik seçin
          </div>
        )}
      </div>
      </div>
    </AdminMedicalLayout>
  )
}

export default ContentsPage
