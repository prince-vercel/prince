/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import React from 'react'
import styles from '@/src/styles/admin.module.css'
import {
  MdAdd,
  MdStar,
  MdArticle,
  MdHelpOutline,
  MdQuestionAnswer,
  MdImage,
  MdPeople
} from 'react-icons/md'
import { AdminTravelLayout } from '@/src/components/AdminComponents/travel/AdminTravelLayout'
import ContentTours from '@/src/components/AdminComponents/travel/ContentTours'
import ContentFaq from '@/src/components/AdminComponents/travel/ContentFaq'
import ContentTestimonials from '@/src/components/AdminComponents/travel/ContentTestimonials'
import ContentBlog from '@/src/components/AdminComponents/travel/ContentBlog'
import ContentImages from '@/src/components/AdminComponents/travel/ContentImages'
import ContentPartner from '@/src/components/AdminComponents/travel/ContentPartner'
import FormAsks from '@/src/components/AdminComponents/travel/FormAsks'

const ContentsPage = () => {
  const [activeTab, setActiveTab] = useState<
    'tours' | 'reviews' | 'blog' | 'faq' | 'testimonials' | 'images' | 'partners' | 'questions' | null
  >(null)
  const [hoveredBox, setHoveredBox] = useState<string | null>(null)

  const contentBoxes = [
    {
      id: 'tours',
      title: 'Turlar',
      icon: <MdAdd size={40} />
    },
    {
      id: 'images',
      title: 'Anasayfa Bannerları',
      icon: <MdImage size={40} />
    },{
      id: 'questions',
      title: 'Başvuru Soruları',
      icon: <MdQuestionAnswer size={40} />
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
    },
     {
          id: 'partners',
          title: 'Ortaklar',
          icon: <MdPeople size={40} />
        }
  ] as const

  const renderContent = () => {
    switch (activeTab) {
      case 'tours':
        return <ContentTours />
      case 'images':
        return <ContentImages />
      case 'testimonials':
        return <ContentTestimonials />
      case 'blog':
        return <ContentBlog/>
      case 'faq':
        return <ContentFaq/>
      case 'partners':
       return <ContentPartner/>
      case 'questions':
        return <FormAsks />
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
                background: isActive ? '#d7b76e' : '#fff',
                border: isActive || hoveredBox === box.id ? '2px solid #d7b76e' : '2px solid #e5e7eb',
                color: isActive ? '#fff' : '#1f2937',
                boxShadow: isActive
                  ? '0 8px 20px rgba(215,183,110,0.3)'
                  : hoveredBox === box.id ? '0 4px 12px rgba(215,183,110,0.15)' : '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div className={styles.contentsPageButtonIcon} style={{ color: isActive ? '#fff' : '#d7b76e' }}>
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
