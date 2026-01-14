'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'

interface VideoTestimonial {
    title: string
    description: string
    thumbnail: string
    youtubeId: string
    rating: number
}

const videoTestimonials: VideoTestimonial[] = [
    {
        title: "🎄 2025'e Özel Çilek Vize Yılbaşı Ağacı! 🍓 KARTONGİLLER 🎅🤶",
        description: "Yeni yıl ruhunu ofisimize taşıdık ve biraz da yaratıcılığımızı konuşturduk! ✨ İşte Çilek Vize ailesi olarak bir araya gelip kendimizden bir yılbaşı ağacı yaptığımız bu eğlenceli proje! 🎄 2025 yılına girerken dileğimiz, hayallerinize giden tüm yolların açık olması!",
        thumbnail: '/visa/uploads/contents/testimonial/2024e15014_1676518cc370b6.webp',
        youtubeId: 'h6UFJ-IbG78',
        rating: 5
    },
    {
        title: 'Almanya Turist Vizesi',
        description: "Almanya'ya giden danışanımız Baran Bey'den video var.",
        thumbnail: '/visa/uploads/contents/testimonial/202404b627_166b4b69113590.webp',
        youtubeId: 'EMhFql9dUKw',
        rating: 5
    },
    {
        title: '🎉 ÇEKİLİŞ ZAMANI! 🎉',
        description: 'Çilek Vize  ve Lider İnsan Kaynakları iş birliğiyle 3 şanslı kişiye ÜCRETSİZ VİZE DANIŞMANLIĞI hediye ediyoruz!',
        thumbnail: '/visa/uploads/contents/testimonial/2024cc8fc2_16765224c1874a.webp',
        youtubeId: 'm0F02YsgE5Y',
        rating: 5
    },
    {
        title: 'Rusya Vizesi Çilek Vize ile Artık Çok Daha Kolay! 🍓',
        description: 'Sadece 1 haftada Rusya vizenizi alıyoruz! Hızlı, güvenilir ve profesyonel hizmetimizle sizi gereksiz bekleyişlerden kurtarıyoruz. ✈️',
        thumbnail: '/visa/uploads/contents/testimonial/2024f09d35_16765162916091.webp',
        youtubeId: '3M2w5Q9onos',
        rating: 5
    }
]

export default function VideoTestimonials() {
    const { t } = useTranslation()
    
    // main.js'teki swiperVerticalCardSliders ve iframeModal init fonksiyonlarını çağır
    useEffect(() => {
        const initSliders = () => {
            if (typeof window !== 'undefined' && (window as any).app) {
                // Video testimonials slider'ı başlat
                if ((window as any).app.swiperVerticalCardSliders?.init) {
                    (window as any).app.swiperVerticalCardSliders.init()
                }

                // iframe modal için event listener'ları manuel olarak ekle
                // main.js'teki trigger fonksiyonu e.target kullanıyor ama e.currentTarget kullanmalıyız
                const modalLinks = document.querySelectorAll('[data-iframe-modal]')
                modalLinks.forEach((link) => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault()
                        const target = e.currentTarget as HTMLElement
                        if ((window as any).app?.iframeModal?.open) {
                            (window as any).app.iframeModal.open(target)
                        }
                    })
                })

                // Overlay ve close button için event listener'lar
                const overlay = document.getElementById('iframe-modal-overlay')
                if (overlay && (window as any).app?.iframeModal?.shadow) {
                    overlay.addEventListener('click', () => {
                        if ((window as any).app?.iframeModal?.closeModal) {
                            (window as any).app.iframeModal.closeModal()
                        }
                    })
                }

                const closeButtons = document.querySelectorAll('[data-iframe-modal-close]')
                closeButtons.forEach((btn) => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault()
                        if ((window as any).app?.iframeModal?.closeModal) {
                            (window as any).app.iframeModal.closeModal()
                        }
                    })
                })
            } else {
                // Script yüklenene kadar bekle
                setTimeout(initSliders, 100)
            }
        }

        // Script yüklenmesini kontrol et
        const checkScript = setInterval(() => {
            if (typeof window !== 'undefined' && (window as any).app?.swiperVerticalCardSliders) {
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
        <>
            <section className="section section-shorts">
                <div className="container">
                    <div className="section-head type-1" data-scroll-animation>
                        <span className="heading-2">{t('visa.videoTestimonials.title')}</span>
                    </div>
                </div>
                <div className="swiper swiper-vertical-card-sliders">
                    <div className="swiper-wrapper">
                        {videoTestimonials.map((video, index) => (
                            <div key={index} className="swiper-slide">
                                <div className="short-card">
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title}
                                        decoding="async"
                                        loading="lazy"
                                        width={400}
                                        height={600}
                                    />
                                    <a
                                        title={video.title}
                                        href={`${video.youtubeId}.html`}
                                        data-iframe-modal=""
                                        data-youtube="true"
                                        className="btn-elem"
                                    >
                                        <span>
                                            <Image
                                                src="/visa/assets/img/icon/play.svg"
                                                width={42}
                                                height={42}
                                                alt={video.title}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </span>
                                    </a>
                                    <div className="content-huge">
                                        <div className="title-huge">
                                            <span className="body-lg">{video.title}</span>
                                            <div className="rating-huge">
                                                {Array.from({ length: video.rating }).map((_, i) => (
                                                    <Image
                                                        key={i}
                                                        src="/visa/assets/img/icon/star-filled.svg"
                                                        width={14}
                                                        height={12}
                                                        alt={`${video.title} rating`}
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="body-sm">{video.description}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

