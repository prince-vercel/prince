'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import Image from 'next/image'
import Link from 'next/link'

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
        const snapshot = await getDocs(collection(db, 'home_images'))
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
  }, [])

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="logo-wrapper">
          <Image src="/logo.png" alt="Logo" width={90} height={80} priority />
        </div>
      </header>

      <div className="image-row">
        <Link
          href="/medical"
          className="image-card"
          style={{
            backgroundImage: `url(${images.medical || '/assets/images/medikal.jpeg'})`,
          }}
        >
          <div className="overlay-dark" />
          <div className="title">
            Prince <br />
            Medikal Estetik & <br />
            Sağlık Hizmetleri
          </div>
        </Link>

         <Link
          href="/visa"
          className="image-card"
          style={{
            backgroundImage: `url(${images.visa || '/assets/images/vize.jpeg'})`,
          }}
        >
          <div className="overlay-dark" />
          <div className="title">
            Prince <br />
            Vize Danışmanlığı
          </div>
        </Link>
        <Link
          href="/travel"
          className="image-card"
          style={{
            backgroundImage: `url(${images.travel || '/assets/images/seyahat.jpeg'})`,
          }}
        >
          <div className="overlay-dark" />
          <div className="title">
            Prince <br />
            Turizm & Travel
          </div>
        </Link>
       

      </div>
    </div>
  )
}
