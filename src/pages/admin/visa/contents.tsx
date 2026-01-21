/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import React from 'react'
import styles from '@/src/styles/admin.module.css'
import {
  MdStar,
  MdArticle,
  MdHelpOutline,
  MdQuestionAnswer,
  MdImage,
  MdChat,
  MdPublic
} from 'react-icons/md'
import { AdminVisaLayout } from '@/src/components/AdminComponents/visa/AdminVisaLayout'
import ContentVisa from '@/src/components/AdminComponents/visa/ContentVisa'
import FormAsks from '@/src/components/AdminComponents/visa/FormAsks'
import ContentAdmin from '@/src/components/AdminComponents/visa/ContentChatBot'
import ContentTestimonials from '@/src/components/AdminComponents/visa/ContentTestimonials'
import ContentBlog from '@/src/components/AdminComponents/visa/ContentBlog'
import ContentVisaTable from '@/src/components/AdminComponents/visa/ContentVisaTable'
import ContentFaq from '@/src/components/AdminComponents/visa/ContentFaq'
import ContentSucces from '@/src/components/AdminComponents/visa/ContentSucces'
import ContentCountries from '@/src/components/AdminComponents/visa/ContentCountries'
import ContentBanner from '@/src/components/AdminComponents/visa/ContentBanner'

const ContentsPage = () => {
  const [activeTab, setActiveTab] = useState<
     'reviews' | 'blog' | 'faq' | 'banner'| 'testimonials' | 'visa' | 'visa-table' | 'questions' | 'chatbot' | 'success-rates' | 'countries' | null
  >(null)
  const [hoveredBox, setHoveredBox] = useState<string | null>(null)

  const contentBoxes = [
     {
      id: 'banner',
      title: 'Banner',
      icon: <MdImage size={40} />
    },
    {
      id: 'visa',
      title: 'Vizelerimiz',
      icon: <MdPublic size={40} />
    },
    {
      id: 'visa-table',
      title: 'Vize Tablosu',
      icon: <MdArticle size={40} />
    },
     {
      id: 'success-rates',
      title: 'Vize Başarı Oranları',
      icon: <MdStar size={40} />
    },
   // {
    //  id: 'countries',
   //   title: 'Hizmet Verdiğimiz Ülkeler',
  //    icon: <MdPublic size={40} />
   // },
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


  ] as const

  const renderContent = () => {
    switch (activeTab) {
      case 'testimonials':
        return <ContentTestimonials/>
      case 'blog':
        return <ContentBlog/>
      case 'chatbot':
        return <ContentAdmin/>
      case 'faq':
        return <ContentFaq/>
      case 'questions':
        return <FormAsks/>
      case 'visa':
        return <ContentVisa />
      case 'visa-table':
        return <ContentVisaTable />
      case 'success-rates':
        return <ContentSucces/>
      case 'countries':
        return <ContentCountries/>
       case 'banner':
        return <ContentBanner/>
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
                background: isActive ? '#c42127' : '#fff',
                border: isActive || hoveredBox === box.id ? '2px solid #c42127' : '2px solid #e5e7eb',
                color: isActive ? '#fff' : '#1f2937',
                boxShadow: isActive
                  ? '0 8px 20px rgba(204,0,0,0.3)'
                  : hoveredBox === box.id ? '0 4px 12px rgba(204,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div className={styles.contentsPageButtonIcon} style={{ color: isActive ? '#fff' : '#c42127' }}>
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
