/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { AdminTravelLayout } from '@/src/components/AdminComponents/travel/AdminTravelLayout'
import ContentTours from '@/src/components/AdminComponents/travel/ContentTours'
import ContentFaq from '@/src/components/AdminComponents/travel/ContentFaq'
import ContentTestimonials from '@/src/components/AdminComponents/travel/ContentTestimonials'
import ContentBlog from '@/src/components/AdminComponents/travel/ContentBlog'

const ContentsPage = () => {
  const [activeTab, setActiveTab] = useState<
    'tours' | 'reviews' | 'blog' | 'faq' | 'testimonials' | null
  >(null)
  const [hoveredBox, setHoveredBox] = useState<string | null>(null)

  const contentBoxes = [
    {
      id: 'tours',
      title: 'Turlar',
      icon: <MdAdd size={40} />
    },
    {
      id: 'testimonials',
      title: 'Yorumlar',
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
      case 'tours':
        return <ContentTours />
      case 'testimonials':
        return <ContentTestimonials />
      case 'blog':
        return <ContentBlog/>
      case 'faq':
        return <ContentFaq/>
      default:
        return null
    }
  }

  return (
    <AdminTravelLayout>
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
              onMouseEnter={() => setHoveredBox(box.id as string)}
              onMouseLeave={() => setHoveredBox(null)}
              className={styles.contentsPageButton}
              style={{
                background: isActive ? '#E8604C' : '#fff',
                border: isActive || hoveredBox === box.id ? '2px solid #E8604C' : '2px solid #e5e7eb',
                color: isActive ? '#fff' : '#1f2937',
                boxShadow: isActive
                  ? '0 8px 20px rgba(232,96,76,0.35)'
                  : hoveredBox === box.id ? '0 4px 12px rgba(232,96,76,0.15)' : '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div className={styles.contentsPageButtonIcon} style={{ color: isActive ? '#fff' : '#E8604C' }}>
                {React.cloneElement(box.icon, { size: 52 })}
              </div>

              <h3 className={styles.contentsPageButtonTitle} style={{ color: isActive ? '#fff' : '#1f2937' }}>
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
    </AdminTravelLayout>
  )
}

export default ContentsPage
