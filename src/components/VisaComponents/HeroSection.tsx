/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import { db } from '@/src/lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { getCollectionName } from '../../lib/localization'

interface HeroSlide {
    title: string
    description: string
    image: string
    imageMobile?: string
    link: string
}

export default function HeroSection() {
    const { t, i18n } = useTranslation()
    const [mounted, setMounted] = useState(false)
    const [slides, setSlides] = useState<HeroSlide[]>([])

    // Client-side mount kontrolü
    useEffect(() => {
        setMounted(true)
    }, [])

    // Fetch slides from Firebase
    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const q = query(collection(db, getCollectionName('visabannercontents', i18n.language), 'images', 'banner'), orderBy('createdAt', 'desc'))
                const querySnapshot = await getDocs(q)
                const slidesData: HeroSlide[] = []
                
                querySnapshot.docs.forEach(doc => {
                    const data = doc.data()
                    if (data.descriptions && data.descriptions.length > 0) {
                        data.descriptions.forEach((desc: { title: string; desc: string }) => {
                            slidesData.push({
                                title: desc.title,
                                description: desc.desc,
                                image: data.imageUrl,
                                imageMobile: data.imageUrl,
                                link: '/visa/basvuru-yap'
                            })
                        })
                    }
                })
                
                setSlides(slidesData)
            } catch (error) {
                console.error('Error fetching slides:', error)
                // No fallback, just empty
                setSlides([])
            }
        }
        
        if (mounted && i18n.isInitialized) {
            fetchSlides()
        }
    }, [mounted, i18n.language, i18n.isInitialized])

    // main.js'teki heroSlider init fonksiyonunu çağır
    useEffect(() => {
        const initSliders = () => {
            if (typeof window !== 'undefined' && (window as any).app) {
                // Hero slider'ı başlat
                if ((window as any).app.heroSlider?.init) {
                    (window as any).app.heroSlider.init()
                }
            } else {
                // Script yüklenene kadar bekle
                setTimeout(initSliders, 100)
            }
        }

        // Script yüklenmesini kontrol et
        const checkScript = setInterval(() => {
            if (typeof window !== 'undefined' && (window as any).app?.heroSlider) {
                clearInterval(checkScript)
                initSliders()
            }
        }, 50)

        // 5 saniye sonra timeout
        setTimeout(() => {
            clearInterval(checkScript)
        }, 5000)

        return () => {
            clearInterval(checkScript)
        }
    }, [])

    return (
        <section id="hero">
            <div className="container">
                <div id="hero-slider" className="swiper">
                    <div className="swiper-wrapper">
                        {slides.map((slide, index) => (
                            <div key={index} className="swiper-slide">
                                <div className="hero-slide-card">
                                    <div className="image-background">
                                        <picture>
                                            {slide.imageMobile && (
                                                <source media="(max-width: 768px)" srcSet={slide.imageMobile} />
                                            )}
                                            <Image
                                                src={slide.image}
                                                alt={slide.title || ''}
                                                fill
                                                priority={index === 0}
                                                decoding="async"
                                                style={{
                                                    objectFit: 'cover',
                                                    objectPosition: 'center'
                                                }}
                                            />
                                        </picture>
                                    </div>
                                    <div className="content">
                                        <span className="body"></span>
                                        <strong className="heading-1" suppressHydrationWarning>{slide.title}</strong>
                                        <div className="body-lg">
                                            <p suppressHydrationWarning>{slide.description}</p>
                                        </div>
                                        <Link
                                            title={mounted && i18n.isInitialized ? t('visa.hero.slides.0.cta') : ''}
                                            href={slide.link}
                                            className="btn btn-primary btn-has-icon"
                                            suppressHydrationWarning
                                        >
                                            {mounted && i18n.isInitialized ? t('visa.hero.slides.0.cta') : ''}
                                            <span className="icon">
                                                <Image
                                                    src="/visa/assets/img/icon/target-link.svg"
                                                    width={53}
                                                    height={53}
                                                    alt="Target"
                                                    decoding="async"
                                                />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        </section>
    )
}

