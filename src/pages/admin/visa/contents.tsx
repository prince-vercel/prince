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
  MdPeople,
  MdChat
} from 'react-icons/md'
import { AdminTravelLayout } from '@/src/components/AdminComponents/travel/AdminTravelLayout'
import ContentTours from '@/src/components/AdminComponents/travel/ContentTours'
import ContentFaq from '@/src/components/AdminComponents/travel/ContentFaq'
import ContentTestimonials from '@/src/components/AdminComponents/travel/ContentTestimonials'
import ContentBlog from '@/src/components/AdminComponents/travel/ContentBlog'
import ContentImages from '@/src/components/AdminComponents/travel/ContentImages'
import ContentPartner from '@/src/components/AdminComponents/travel/ContentPartner'
import FormAsks from '@/src/components/AdminComponents/travel/FormAsks'
import ContentAdmin from '@/src/components/AdminComponents/travel/ContentChatBot'
import { AdminVisaLayout } from '@/src/components/AdminComponents/visa/AdminVisaLayout'

const ContentsPage = () => {
  const [activeTab, setActiveTab] = useState<
     'reviews' | 'blog' | 'faq' | 'testimonials' | 'partners' | 'questions' | 'chatbot' | null
  >(null)
  const [hoveredBox, setHoveredBox] = useState<string | null>(null)

  const contentBoxes = [
    {
      id: 'questions',
      title: 'Başvuru Soruları',
      icon: <MdQuestionAnswer size={40} />
    },
     {
       id: 'chatbot',
       title: 'ChatBot',
       icon: <MdChat size={40} />
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
    },

  ] as const

  const renderContent = () => {
    switch (activeTab) {
      case 'testimonials':
      case 'blog':
      case 'chatbot':
      case 'faq':
      case 'partners':
      case 'questions':
      default:
        return null
    }
  }

  return (
    <AdminVisaLayout>
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
                background: isActive ? '#cc0000' : '#fff',
                border: isActive || hoveredBox === box.id ? '2px solid #cc0000' : '2px solid #e5e7eb',
                color: isActive ? '#fff' : '#1f2937',
                boxShadow: isActive
                  ? '0 8px 20px rgba(204,0,0,0.3)'
                  : hoveredBox === box.id ? '0 4px 12px rgba(204,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div className={styles.contentsPageButtonIcon} style={{ color: isActive ? '#fff' : '#cc0000' }}>
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
    </AdminVisaLayout>
  )
}

export default ContentsPage
