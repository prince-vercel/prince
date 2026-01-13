'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

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

const heroSlides: HeroSlide[] = [
    {
        title: "Avrupa'ya 15 Günde Adım Atın !",
        description: "Çilek Vize bünyesinde schengen randevunuzu 15 gün içinde alıyoruz. Önce işlem sonra ücret garantisi!",
        image: "/visa/uploads/contents/cover/1764381535_6294c9264c4a93d44ae9.webp",
        imageMobile: "/visa/uploads/contents/cover/1764381535_b4318e2017f6811445cd.webp",
        link: "/visa/basvuru-yap"
    },
    {
        title: "Amerika Vize Randevunuzu 30 Günde Alıyoruz",
        description: "Çilek Vize olarak Amerika vize randevunuzu 30 gün içinde alıyoruz ve buna garanti veriyoruz. Önce işlem sonra ücret garantisi!",
        image: "/visa/uploads/contents/cover/1764381549_c671a3b0a4d6c5cbbea9.webp",
        imageMobile: "/visa/uploads/contents/cover/1764381549_e09624fd32620c2f858b.webp",
        link: "/visa/basvuru-yap"
    },
    {
        title: "Vize Karmaşasına Son Verin!",
        description: "Yeni maceranızın kapısını çalarken vize başvuruları stres mi yaratıyor? Sorun değil! Çilek Vize adım adım yanınızda, başvurularınızı kolaylaştırmak için burada!",
        image: "/visa/uploads/contents/cover/1764381565_9f81c057ad3c5d43cf5d.webp",
        imageMobile: "/visa/uploads/contents/cover/1764381565_34ec4e3668e3930ba4dd.webp",
        link: "/visa/basvuru-yap"
    },
    {
        title: "En İyi Vize Danışmanlık Firmasıyla Güvenli Adımlar!",
        description: "Vize başvuruları ile uğraşmak sizi strese mi sokuyor? Çilek Vize işte burada, tüm başvurularınızı kolaylaştırmak için!",
        image: "/visa/uploads/contents/cover/1764381570_b38602b721c8da36bf95.webp",
        imageMobile: "/visa/uploads/contents/cover/1764381570_7e2cba976ef69da4c4fe.webp",
        link: "/visa/basvuru-yap"
    },
    {
        title: "İtalya'nın Büyüsünü Keşfedin",
        description: "Tarihi ve kültürel zenginlikleriyle İtalya'da yaşamak veya seyahat etmek mi istiyorsunuz? Vize başvurunuzu uzman ekibimizle birlikte güvenle yapın. İtalya'nın büyüsünü yakalayın!",
        image: "/visa/uploads/contents/cover/1764381559_98a3fffebc2824556323.webp",
        imageMobile: "/visa/uploads/contents/cover/1764381559_f6be6ce09e0f316edc7d.webp",
        link: "/visa/basvuru-yap"
    },
    {
        title: "Amerika Rüyasına Adım Atın!",
        description: "Amerika'ya seyahat, eğitim veya iş için mi gitmek istiyorsunuz? Vize sürecinizi kolaylaştırmak için buradayız. Profesyonel danışmanlık hizmetimizle Amerikan rüyasına adım atın!",
        image: "/visa/uploads/contents/cover/1764381554_9a8d717e6e834d6c08be.webp",
        imageMobile: "/visa/uploads/contents/cover/1764381554_127578092fa42c96188a.webp",
        link: "/visa/basvuru-yap"
    }
]

const testimonials: Testimonial[] = [
    {
        name: "Pelin Civelek",
        rating: 5,
        text: "Çilek Vize'den ABD vizesi için danışmanlık aldım . Zeynep hanımın desteği ile 1,5 sene sonraya verilen randevumu 1 ay sonraya alabildiler, evraklarımız hazırlarkende destek oldukları için vizemi başvurduktan 1,5 ay sonra sorunsuzca aldım. Destekleri için teşekkürler özellikle de Zeynep hanıma"
    },
    {
        name: "Ogün Şen",
        rating: 5,
        text: "Merhaba arkadaşlar uzun araştırmalar sonucu karar verip çilek vize ailesi ile iletişime geçtim ve işlemlere başladım. Danışmanım olarak çilek vize ailesinden Elif hanım ile görüşmelerimizi tamamladık güler yüzlü ve bilgili olmaları güvenli hissettirdi eminimki bu süre zarfında her türlü bilgiyi , gelişmeleri ve sonuçları tarafıma ileteceklerdir. Gönül rahatlığıyla uğrayıp bilgi alabilirsiniz. Teşekkürler ."
    },
    {
        name: "Nisan Gökdemirel",
        rating: 5,
        text: "Şirket olarak toplu basvuru yapmak istedigimiz bir danismanlik sirketi arayışındaydık. Cilek vize ile hızla geri bildirim aldığımız bir deneyim oldu. Süreçlerimiz özenle takip ediliyor. Özellikle Ezgi Hanım'a ilgisi ve özeni için çok teşekkür ediyoruz."
    },
    {
        name: "Burçin Gül",
        rating: 5,
        text: "Yakın zamanda Fransa'dan red aldığım için bir danışmanlık şirketiyle yoluma devam etmeye karar verip buldum aslında Çilek Vize'yi. Farklı bir ülkeden red yediğim için tekrardan red alır mıyım, param ve onca çabam boşa gider mi gibi onlarca soru vardı aklımda. Ancak danışmanım Irmak Hanım özenle cevapladı her bir sorum. Beni ikna etti. Ayrıca ailemin de içini rahatlatıp tekrardan vize başvurusunda bulunmam konusunda cesaretlendirdi. Süreç benim için farklı bir ülkeden red almamdan kaynaklı oldukça gericiydi ama Irmak Hanım her yardıma ihtiyacım olduğunda bir tık uzağımdaydı. 2 haftanın sonunda İsveç'ten vizem geldi. Her şey için Çilek Vize'ye, danışmanım Irmak Hanım'a ve Nalan Hanım'a teşekkür ederim."
    },
    {
        name: "Handan Evcimen",
        rating: 5,
        text: "Kanada süreci için çilek vize'den destek aldım, başta soru işaretleri ve endişeler vardı kafamda fakat bu süreçte ırmak hanım ile işlemlerimizi sürdürdük kendisi alanında profesyonel ve ilgili bir danışan yardımları için kendisine bir kere daha teşekkür ediyorum iyi ki çilek vize"
    }
]

export default function HeroSection() {
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
                                        <strong className="heading-1">{slide.title}</strong>
                                        <div className="body-lg">
                                            <p>{slide.description}</p>
                                        </div>
                                        <Link
                                            title="Başvurunuzu Başlatın"
                                            href={slide.link}
                                            className="btn btn-primary btn-has-icon"
                                        >
                                            Başvurunuzu Başlatın
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
                                                alt={slide.title}
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
                                                <span className="body-lg">{testimonial.name}</span>
                                                <div className="rating-huge">
                                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                        <Image
                                                            key={i}
                                                            src="/visa/assets/img/icon/star-filled.svg"
                                                            width={14}
                                                            height={12}
                                                            alt={`${testimonial.name} rating`}
                                                            loading="lazy"
                                                            decoding="async"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="body-sm">
                                                <p>{testimonial.text}</p>
                                                <div className="d-flex justify-content-end">
                                                    <button className="read-more btn btn-primary" style={{ display: 'none' }}>
                                                        Devamını Oku
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

