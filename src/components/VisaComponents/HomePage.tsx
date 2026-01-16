'use client'

import { db } from '@/src/lib/firebase'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import '../../i18n'

import AwardsSection from './AwardsSection'
import ComparisonSection from './ComparisonSection'
import CountryMarquee from './CountryMarquee'
import FeaturedImageBlock from './FeaturedImageBlock'
import HeroSection from './HeroSection'
import ReferencesSection from './ReferencesSection'
import ServicesSection from './ServicesSection'

const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false })

export default function VisaHomePage() {
  const { t, isReady } = useSafeTranslation()

  // Chatbot state
  const [chatbotQuestions, setChatbotQuestions] = useState<any[]>([])
  const [showChatbot, setShowChatbot] = useState(false)

  useEffect(() => {
    // Firestore'dan chatbotQuestions koleksiyonunu çek
    import('firebase/firestore').then(({ collection, getDocs }) => {
      getDocs(collection(db, 'visachatbotQuestions'))
        .then(snapshot => {
          const data = snapshot.docs.map(doc => doc.data())
          setChatbotQuestions(data)
        })
        .catch(() => setChatbotQuestions([]))
    })
  }, [])

  return (
    <>
      <HeroSection />
      <CountryMarquee />
      <ServicesSection />
      <FeaturedImageBlock />
      <ComparisonSection />
      <AwardsSection />
      <ReferencesSection />

      {/* CHATBOT BUTTON & BOX */}
      <style>{`
        .chatbot-fab {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 10000;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #c42721;
          color: #fff;
          border: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .chatbot-fab:hover {
          background: #c42721;
        }
        .chatbot-close-btn {
          position: absolute;
          top: 8px;
          right: 12px;
          background: none;
          border: none;
          color: #888;
          font-size: 22px;
          cursor: pointer;
          z-index: 10002;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .visa-chatbotBox-wrapper {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 10001;
        }
        .visa-chatbotBox {
          width: 340px;
          max-width: 90vw;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          overflow: hidden;
          font-family: inherit;
          position: relative;
        }
        .visa-chatWindow {
          max-height: 500px;
          overflow-y: auto;
          padding: 20px 16px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .visa-chatMessage {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .visa-bot {
          background: #f1f5fa;
          color: #274760;
          padding: 12px 16px;
          border-radius: 12px;
          align-self: flex-start;
          font-size: 16px;
          line-height: 1.5;
          max-width: 85%;
        }
        .visa-options {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }
        .visa-optionBtn {
          background: #c42721;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 15px;
          cursor: pointer;
          transition: background 0.2s;
          flex: 1;
          min-width: calc(50% - 4px);
        }
        .visa-optionBtn:nth-child(3) {
          flex: 1 1 100%;
          min-width: 100%;
        }
        .visa-optionBtn:hover {
          background: #c42721;
        }
      `}</style>
      {chatbotQuestions.length > 0 && (
        <>
          {!showChatbot && (
            <button className="chatbot-fab" onClick={() => setShowChatbot(true)} title={isReady ? t('visa.homePage.chatbot.startChat') : ''} suppressHydrationWarning>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15.5C21 16.3284 20.3284 17 19.5 17H7.41421L4.70711 19.7071C4.07714 20.3371 3 19.8906 3 19.0001V5.5C3 4.67157 3.67157 4 4.5 4H19.5C20.3284 4 21 4.67157 21 5.5V15.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#c42721" />
                <circle cx="8" cy="10" r="1" fill="white" />
                <circle cx="12" cy="10" r="1" fill="white" />
                <circle cx="16" cy="10" r="1" fill="white" />
              </svg>
            </button>
          )}
          {showChatbot && (
            <div className="visa-chatbotBox-wrapper">
              <button className="chatbot-close-btn" onClick={() => setShowChatbot(false)} title={isReady ? t('visa.homePage.chatbot.close') : ''} suppressHydrationWarning>✕</button>
              <Chatbot />
            </div>
          )}
        </>
      )}
    </>
  )
}

