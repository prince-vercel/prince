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

interface Testimonial {
    name: string
    rating: number
    text: string
}

export default function HeroSection() {
    const { t, i18n } = useTranslation()
    const [mounted, setMounted] = useState(false)

    // Client-side mount kontrolü
    useEffect(() => {
        setMounted(true)
    }, [])

    const testimonials: Testimonial[] = useMemo(() => {
        if (!mounted || !i18n.isInitialized) {
            return []
        }
        const testimonialsData = t('visa.hero.testimonials', { returnObjects: true }) as Array<{ name: string; text: string }>
        return testimonialsData.map((testimonial) => ({
            name: testimonial.name,
            rating: 5,
            text: testimonial.text
        }))
    }, [t, i18n.language, i18n.isInitialized, mounted])

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
                image: "/visa/uploads/contents/cover/1764381535_6294c9264c4a93d44ae9.webp",
                imageMobile: "/visa/uploads/contents/cover/1764381535_b4318e2017f6811445cd.webp",
                link: "/visa/basvuru-yap"
            },
            {
                title: t('visa.hero.slides.1.title'),
                description: t('visa.hero.slides.1.description'),
                image: "/visa/uploads/contents/cover/1764381549_c671a3b0a4d6c5cbbea9.webp",
                imageMobile: "/visa/uploads/contents/cover/1764381549_e09624fd32620c2f858b.webp",
                link: "/visa/basvuru-yap"
            },
            {
                title: t('visa.hero.slides.2.title'),
                description: t('visa.hero.slides.2.description'),
                image: "/visa/uploads/contents/cover/1764381565_9f81c057ad3c5d43cf5d.webp",
                imageMobile: "/visa/uploads/contents/cover/1764381565_34ec4e3668e3930ba4dd.webp",
                link: "/visa/basvuru-yap"
            },
            {
                title: t('visa.hero.slides.3.title'),
                description: t('visa.hero.slides.3.description'),
                image: "/visa/uploads/contents/cover/1764381570_b38602b721c8da36bf95.webp",
                imageMobile: "/visa/uploads/contents/cover/1764381570_7e2cba976ef69da4c4fe.webp",
                link: "/visa/basvuru-yap"
            },
            {
                title: t('visa.hero.slides.4.title'),
                description: t('visa.hero.slides.4.description'),
                image: "/visa/uploads/contents/cover/1764381559_98a3fffebc2824556323.webp",
                imageMobile: "/visa/uploads/contents/cover/1764381559_f6be6ce09e0f316edc7d.webp",
                link: "/visa/basvuru-yap"
            },
            {
                title: t('visa.hero.slides.5.title'),
                description: t('visa.hero.slides.5.description'),
                image: "/visa/uploads/contents/cover/1764381554_9a8d717e6e834d6c08be.webp",
                imageMobile: "/visa/uploads/contents/cover/1764381554_127578092fa42c96188a.webp",
                link: "/visa/basvuru-yap"
            }
        ]
    }, [t, i18n.language, i18n.isInitialized, mounted])

    // main.js'teki heroSlider ve swiperVerticalCardSliders init fonksiyonlarını çağır
    useEffect(() => {
        const initSliders = () => {
            if (typeof window !== 'undefined' && (window as any).app) {
                // Hero slider'ı başlat
                if ((window as any).app.heroSlider?.init) {
                    (window as any).app.heroSlider.init()
                }
                // Testimonials slider'ı başlat
                if ((window as any).app.swiperVerticalCardSliders?.init) {
                    (window as any).app.swiperVerticalCardSliders.init()
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
                                    <div className="image">
                                        <picture>
                                            {slide.imageMobile && (
                                                <source media="(max-width: 768px)" srcSet={slide.imageMobile} />
                                            )}
                                            <Image
                                                src={slide.image}
                                                alt={slide.title || ''}
                                                width={833}
                                                height={811}
                                                priority={index === 0}
                                                decoding="async"
                                            />
                                        </picture>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>

                <div className="testimonialsText">
                    <div className="swiper swiper-vertical-card-sliders">
                        <div className="swiper-wrapper">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="swiper-slide">
                                    <div className="short-card">
                                        <div className="content-huge">
                                            <div className="title-huge">
                                                <span className="body-lg" suppressHydrationWarning>{testimonial.name}</span>
                                                <div className="rating-huge">
                                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                        <Image
                                                            key={i}
                                                            src="/visa/assets/img/icon/star-filled.svg"
                                                            width={14}
                                                            height={12}
                                                            alt={testimonial.name ? `${testimonial.name} rating` : 'Rating'}
                                                            loading="lazy"
                                                            decoding="async"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="body-sm">
                                                <p suppressHydrationWarning>{testimonial.text}</p>
                                                <div className="d-flex justify-content-end">
                                                    <button className="read-more btn btn-primary" style={{ display: 'none' }} suppressHydrationWarning>
                                                        {mounted && i18n.isInitialized ? t('visa.hero.readMore') : ''}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

