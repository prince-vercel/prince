'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import Image from 'next/image'
import Link from 'next/link'
import { getCollectionName } from '@/src/lib/localization'
import i18n from '@/src/i18n'

type HomeImages = {
  medical?: string
  visa?: string
  travel?: string
}

export default function HomePage() {
  const [images, setImages] = useState<HomeImages>({})

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

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="logo-wrapper">
          <Image src="/site-header-logo.png" alt="Logo" width={480} height={250} priority />
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
            Medikal Estetik & <br />
            Sağlık Hizmetleri
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
            Vize Danışmanlığı
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
            Turizm & Travel
          </div>
        </Link>
       

      </div>
    </div>
  )
}
