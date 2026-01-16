'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'

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

    // Client-side mount kontrolü
    useEffect(() => {
        setMounted(true)
    }, [])

    const heroSlides: HeroSlide[] = useMemo(() => {
        if (!mounted || !i18n.isInitialized) {
            return [
                { title: '', description: '', image: '', link: '/visa/basvuru-yap' },
                { title: '', description: '', image: '', link: '/visa/basvuru-yap' },
                { title: '', description: '', image: '', link: '/visa/basvuru-yap' },
                { title: '', description: '', image: '', link: '/visa/basvuru-yap' },
                { title: '', description: '', image: '', link: '/visa/basvuru-yap' },
                { title: '', description: '', image: '', link: '/visa/basvuru-yap' }
            ]
        }
        return [
            {
                title: t('visa.hero.slides.0.title'),
                description: t('visa.hero.slides.0.description'),
                image: "/visa/uploads/contents/cover/banner prince.jpg",
                imageMobile: "/visa/uploads/contents/cover/banner prince.jpg",
                link: "/visa/basvuru-yap"
            },
            {
                title: t('visa.hero.slides.1.title'),
                description: t('visa.hero.slides.1.description'),
                image: "/visa/uploads/contents/cover/banner prince.jpg",
                imageMobile: "/visa/uploads/contents/cover/banner prince.jpg",
                link: "/visa/basvuru-yap"
            },
            {
                title: t('visa.hero.slides.2.title'),
                description: t('visa.hero.slides.2.description'),
                image: "/visa/uploads/contents/cover/banner prince.jpg",
                imageMobile: "/visa/uploads/contents/cover/banner prince.jpg",
                link: "/visa/basvuru-yap"
            },
            {
                title: t('visa.hero.slides.3.title'),
                description: t('visa.hero.slides.3.description'),
                image: "/visa/uploads/contents/cover/banner prince.jpg",
                imageMobile: "/visa/uploads/contents/cover/banner prince.jpg",
                link: "/visa/basvuru-yap"
            },
            {
                title: t('visa.hero.slides.4.title'),
                description: t('visa.hero.slides.4.description'),
                image: "/visa/uploads/contents/cover/banner prince.jpg",
                imageMobile: "/visa/uploads/contents/cover/banner prince.jpg",
                link: "/visa/basvuru-yap"
            },
            {
                title: t('visa.hero.slides.5.title'),
                description: t('visa.hero.slides.5.description'),
                image: "/visa/uploads/contents/cover/banner prince.jpg",
                imageMobile: "/visa/uploads/contents/cover/banner prince.jpg",
                link: "/visa/basvuru-yap"
            }
        ]
    }, [t, i18n.language, i18n.isInitialized, mounted])

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
                        {heroSlides.map((slide, index) => (
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

