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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '40px',
          marginTop: '20px'
        }}
      >
        {contentBoxes.map((box) => {
          const isActive = activeTab === box.id

          return (
            <button
              key={box.id}
              onClick={() => setActiveTab(box.id as any)}
              style={{
                padding: '48px 60px',
                borderRadius: '14px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '18px',
                textAlign: 'center',
                border: isActive
                  ? '2px solid #E8604C'
                  : '2px solid #e5e7eb',
                background: isActive ? '#E8604C' : '#fff',
                color: isActive ? '#fff' : '#1f2937',
                boxShadow: isActive
                  ? '0 8px 20px rgba(232,96,76,0.35)'
                  : '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ color: isActive ? '#fff' : '#E8604C' }}>
                {React.cloneElement(box.icon, { size: 52 })}
              </div>

              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  margin: 0,
                  color: isActive ? '#fff' : '#1f2937',
                }}
              >
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
          <div style={{ color: '#999', fontSize: '16px' }}>
            Yukarıdan bir içerik seçin
          </div>
        )}
      </div>
      </div>
    </AdminTravelLayout>
  )
}

export default ContentsPage
