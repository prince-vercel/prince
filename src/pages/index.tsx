/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import Image from 'next/image'
import Link from 'next/link'
import { getCollectionName } from '@/src/lib/localization'
import i18n from '@/src/i18n'
import '@/src/styles/Home.css'

type HomeImages = {
  medical?: string
  visa?: string
  travel?: string
}

export default function HomePage() {
  const [images, setImages] = useState<HomeImages>({})
  const [selectedLanguage, setSelectedLanguage] = useState('TR')
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const collectionName = getCollectionName('home_images', i18n.language)
        const snapshot = await getDocs(collection(db, collectionName))
        const data: HomeImages = {}

        snapshot.forEach((doc) => {
          data[doc.id as keyof HomeImages] = doc.data().imageUrl
        })

        setImages(data)
      } catch (error) {
        console.error('Home images fetch error:', error)
      }
    }

    fetchImages()
  }, [i18n.language])

  useEffect(() => {
    const langMap: { [key: string]: string } = {
      tr: 'TR',
      en: 'EN',
      es: 'ES',
      fr: 'FR',
      ru: 'RU',
      ar: 'AR',
    }
    const currentLang = langMap[i18n.language] || 'TR'
    setSelectedLanguage(currentLang)
  }, [i18n.language])

  return (
    <div className="page-wrapper">
      <header className="header">
      <div
  className="logo-wrapper"
  style={{
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  }}
>
  <Image src="/site-header-logo.png" alt="Logo" width={500} height={250} priority />
</div>

        <div className="header-actions">
          <div className="language-selector">
            <button
              className={`language-selector-btn ${isLanguageDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsLanguageDropdownOpen((prev) => !prev)}
              onBlur={() => {
                setTimeout(() => setIsLanguageDropdownOpen(false), 200)
              }}
            >
              <span>{selectedLanguage}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {isLanguageDropdownOpen && (
              <div className="language-dropdown">
                <button
                  className={`language-option ${selectedLanguage === 'TR' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLanguage('TR')
                    i18n.changeLanguage('tr')
                    setIsLanguageDropdownOpen(false)
                  }}
                >
                  TR
                </button>
                <button
                  className={`language-option ${selectedLanguage === 'EN' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLanguage('EN')
                    i18n.changeLanguage('en')
                    setIsLanguageDropdownOpen(false)
                  }}
                >
                  EN
                </button>
                <button
                  className={`language-option ${selectedLanguage === 'ES' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLanguage('ES')
                    i18n.changeLanguage('es')
                    setIsLanguageDropdownOpen(false)
                  }}
                >
                  ES
                </button>
                <button
                  className={`language-option ${selectedLanguage === 'FR' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLanguage('FR')
                    i18n.changeLanguage('fr')
                    setIsLanguageDropdownOpen(false)
                  }}
                >
                  FR
                </button>
                <button
                  className={`language-option ${selectedLanguage === 'RU' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLanguage('RU')
                    i18n.changeLanguage('ru')
                    setIsLanguageDropdownOpen(false)
                  }}
                >
                  RU
                </button>
                <button
                  className={`language-option ${selectedLanguage === 'AR' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLanguage('AR')
                    i18n.changeLanguage('ar')
                    setIsLanguageDropdownOpen(false)
                  }}
                >
                  AR
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="image-row">
        <Link
          href="/medical"
          className="image-card"
          style={{
            backgroundImage: `url(${images.medical})`,
          }}
        >
          <div className="overlay-dark" />
          <div className="title">
            {i18n.t('home.medicalTitle.line1', 'Prince')} <br />
            {i18n.t('home.medicalTitle.line2', 'Medikal Estetik &')} <br />
            {i18n.t('home.medicalTitle.line3', 'Sağlık Hizmetleri')}
          </div>
        </Link>

        <Link
          href="/visa"
          className="image-card"
          style={{
            backgroundImage: `url(${images.visa})`,
          }}
        >
          <div className="overlay-dark" />
          <div className="title">
            {i18n.t('home.visaTitle.line1', 'Prince')} <br />
            {i18n.t('home.visaTitle.line2', 'Vize Danışmanlığı')}
          </div>
        </Link>
        <Link
          href="/travel"
          className="image-card"
          style={{
            backgroundImage: `url(${images.travel})`,
          }}
        >
          <div className="overlay-dark" />
          <div className="title">
            {i18n.t('home.travelTitle.line1', 'Prince')} <br />
            {i18n.t('home.travelTitle.line2', 'Turizm & Travel')}
          </div>
        </Link>
      </div>
    </div>
  )
}
