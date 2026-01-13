import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import '../../styles/visa/Hakkimizda.css';

interface VideoTestimonial {
    id: string;
    youtubeId: string;
    title: string;
    thumbnail: string;
    description: string;
}

const videoTestimonials: VideoTestimonial[] = [
    {
        id: '1',
        youtubeId: 'h6UFJ-IbG78',
        title: '🎄 2025\'e Özel Çilek Vize Yılbaşı Ağacı! 🍓 KARTONGİLLER 🎅🤶',
        thumbnail: '/visa/uploads/contents/testimonial/2024e15014_1676518cc370b6.webp',
        description: 'Yeni yıl ruhunu ofisimize taşıdık ve biraz da yaratıcılığımızı konuşturduk! ?✨ İşte Çilek Vize ailesi olarak bir araya gelip kendimizden bir yılbaşı ağacı yaptığımız bu eğlenceli proje! ?\r\n 2025 yılına girerken dileğimiz, hayallerinize giden tüm yolların açık olması!'
    },
    {
        id: '2',
        youtubeId: 'EMhFql9dUKw',
        title: 'Almanya Turist Vizesi',
        thumbnail: '/visa/uploads/contents/testimonial/202404b627_166b4b69113590.webp',
        description: 'Almanya\'ya giden danışanımız Baran Bey\'den video var.'
    },
    {
        id: '3',
        youtubeId: 'm0F02YsgE5Y',
        title: '🎉 ÇEKİLİŞ ZAMANI! 🎉',
        thumbnail: '/visa/uploads/contents/testimonial/2024cc8fc2_16765224c1874a.webp',
        description: 'Çilek Vize  ve Lider İnsan Kaynakları iş birliğiyle 3 şanslı kişiye ÜCRETSİZ VİZE DANIŞMANLIĞI hediye ediyoruz!'
    },
    {
        id: '4',
        youtubeId: '3M2w5Q9onos',
        title: 'Rusya Vizesi Çilek Vize ile Artık Çok Daha Kolay! 🍓',
        thumbnail: '/visa/uploads/contents/testimonial/2024f09d35_16765162916091.webp',
        description: 'Sadece 1 haftada Rusya vizenizi alıyoruz! Hızlı, güvenilir ve profesyonel hizmetimizle sizi gereksiz bekleyişlerden kurtarıyoruz. ✈️'
    },
    {
        id: '5',
        youtubeId: 'lyRt0sFz3bk',
        title: ' @TaklitMan   Gösterisinde Tüm Çilek Vize Ekibi Olarak Oradaydık😎',
        thumbnail: '/visa/uploads/contents/testimonial/2024933253_16764332e2c662.webp',
        description: 'Güzel bir gösteri de güzel bir çekiliş yaptık?️\r\n2 SEYİRCİMİZ ÜCRETSİZ DANIŞMANLIK KAZANDI?✨\r\nEğlendiğimiz bir günü sizinle paylaşmaktan mutluyuz!\r\n☎️0850 888 7071 www.cilekvize.com'
    },
    {
        id: '6',
        youtubeId: '-l351uPdXWs',
        title: 'Avustralya Turist Vizesi',
        thumbnail: '/visa/uploads/contents/testimonial/2024163132_166b4b8e3d7673.webp',
        description: 'Avustralya\'ya giden danışanımız Cansu Hanım.'
    },
    {
        id: '7',
        youtubeId: '0Hppfr7h7vo',
        title: 'Hayalinizdeki İtalya Seyahati İçin İlk Adımı Atın! 🍓',
        thumbnail: '/visa/uploads/contents/testimonial/20242bd26f_16765156928859.webp',
        description: 'İtalya vizesiyle ilgili tüm süreçlerde yanınızdayız! Hızlı ve güvenilir bir hizmetle vize işlemlerinizi kolaylaştırıyoruz. Şimdi bizimle iletişime geçin ve hayallerinizdeki İtalya yolculuğuna başlayın! ✈️'
    },
    {
        id: '8',
        youtubeId: 'HrHePaF8r_k',
        title: 'Avusturya Aile Birleşimi Vizesi',
        thumbnail: '/visa/uploads/contents/testimonial/202406c5e9_166b4bffd56af8.webp',
        description: 'Aile Birleşimi Vizesi ile yurt dışına giden danışanımız  Batuhan bey.'
    },
    {
        id: '9',
        youtubeId: 'b_-aKPC1TeY',
        title: 'VİZE BAŞVURULARINDA BİLMENİZ GEREKENLER! En Sık Sorulan Sorular ve Cevaplar Neler?',
        thumbnail: '/visa/uploads/contents/testimonial/2024b69bc2_167643362238ee.webp',
        description: 'Vize başvurusu süreci karmaşık mı geliyor? Endişelenmeyin! Bu videoda, vize süreçlerinde en çok merak edilen sorulara ve kritik ipuçlarına değiniyoruz.\r\n'
    },
    {
        id: '10',
        youtubeId: 'SnJSz1a7aMo',
        title: 'İngiltere Çalışma Vizesi',
        thumbnail: '/visa/uploads/contents/testimonial/2024213a9d_166b9d8e18198d.webp',
        description: 'Çalışma vizesi hizmeti alarak ailesiyle birlikte İngiltere\'ya giden danışanımız.'
    },
    {
        id: '11',
        youtubeId: 'Y3-T3RPmxY8',
        title: 'ÇİLEK VİZE ile ONLİNE VİZE BAŞVURU SÜRECİ – Kolay ve Hızlı!',
        thumbnail: '/visa/uploads/contents/testimonial/2024224af3_1676433e25c32f.webp',
        description: 'Çilek Vize ile online vize başvurusu artık çok kolay!\r\nBu videoda, vize işlemlerinizi hızlı ve sorunsuz bir şekilde tamamlamanız için adım adım rehberlik sunuyoruz.'
    },
    {
        id: '12',
        youtubeId: '13yqUjxG9N0',
        title: 'Vize alamayan yoktur, Çilek vize\'ye gelmeyen vardır 😎✈️',
        thumbnail: '/visa/uploads/contents/testimonial/20243162d5_1676524ecf00d9.webp',
        description: 'Daha fazla bilgi ve başvuru için✨\r\n☎️0850 888 7071\r\nwww.cilekvize.com'
    },
    {
        id: '13',
        youtubeId: 'ttYEH4Mpkjw',
        title: 'Hollanda\'ya giden danışanımızdan video!',
        thumbnail: '/visa/uploads/contents/testimonial/202443613b_166bcbdf8e737f.webp',
        description: ''
    },
    {
        id: '14',
        youtubeId: 'SnJSz1a7aMo',
        title: '🎉 İngiltere Vizesi için %20 İndirim Fırsatı! 🇬🇧✈️',
        thumbnail: '/visa/uploads/contents/testimonial/202441355a_167651fd9e052a.webp',
        description: 'Çilek Vize olarak İngiltere vize danışmanlığında %20 indirim kampanyasıyla karşınızdayız!  Başvurunuzu sorunsuz ve hızlı bir şekilde tamamlamak için bu fırsatı kaçırmayın. ? Kampanyamız yalnızca 20 Kasım\'a kadar geçerli!'
    },
    {
        id: '15',
        youtubeId: 'e3G_cd7lVcQ',
        title: 'Kanada\'ya giden danışanımızın videosu...',
        thumbnail: '/visa/uploads/contents/testimonial/2024b9b86e_166bcc31649c37.webp',
        description: ''
    },
    {
        id: '16',
        youtubeId: 'lmppFHoDjsI',
        title: 'Hollanda\'ya giden danışanımız!',
        thumbnail: '/visa/uploads/contents/testimonial/2024622c5c_166c2fbcf4b4c9.webp',
        description: ''
    }
];

export default function HakkimizdaPage() {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
    const videoModalRef = useRef<HTMLDivElement>(null);
    const videoIframeRef = useRef<HTMLIFrameElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Video modal handlers
    const openVideoModal = (video: VideoTestimonial) => {
        setSelectedVideo(video);
        setIsVideoModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeVideoModal = () => {
        setIsVideoModalOpen(false);
        setSelectedVideo(null);
        if (videoIframeRef.current) {
            videoIframeRef.current.src = '';
        }
        document.body.style.overflow = '';
    };

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isVideoModalOpen) {
                closeVideoModal();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isVideoModalOpen]);

    // Update iframe src when modal opens
    useEffect(() => {
        if (isVideoModalOpen && selectedVideo && videoIframeRef.current) {
            const isShort = selectedVideo.youtubeId.length === 11;
            const embedUrl = isShort
                ? `https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&mute=0&controls=1&loop=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&playlist=${selectedVideo.youtubeId}`
                : `https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&mute=0&controls=1&loop=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`;

            videoIframeRef.current.src = embedUrl;
            if (videoModalRef.current) {
                if (isShort) {
                    videoModalRef.current.classList.add('is-short');
                } else {
                    videoModalRef.current.classList.remove('is-short');
                }
            }
        }
    }, [isVideoModalOpen, selectedVideo]);

    // Horizontal scroll for video slider
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const handleMouseDown = (e: MouseEvent) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            slider.classList.remove('active');
        };

        const handleMouseUp = () => {
            isDown = false;
            slider.classList.remove('active');
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        };

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mouseleave', handleMouseLeave);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mousemove', handleMouseMove);

        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mouseleave', handleMouseLeave);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section id="about-title-section">
                <div className="image">
                    <img
                        src="/visa/uploads/contents/cover/1763937127_70e331bafdcc4c55539d.webp"
                        alt="Evraklarla Uğraşmadan Vize Başvurunuzu Çilek Vize ile Tamamlayın!"
                        width={1728}
                        height={462}
                        fetchPriority="high"
                    />
                    <div className="gradient"></div>
                </div>
                <div className="about-title-section-logo">
                    <img
                        src="/visa/uploads/contents/main/1763937997_ffa4d69cc741b45632f5.webp"
                        alt="Evraklarla Uğraşmadan Vize Başvurunuzu Çilek Vize ile Tamamlayın!"
                    />
                    <h1>Evraklarla Uğraşmadan Vize Başvurunuzu Çilek Vize ile Tamamlayın!</h1>
                </div>
            </section>

            {/* Info Section */}
            <section id="about-info-section">
                <div className="container">
                    <div className="content">
                        <div className="heading-3 colorfull">
                            <p>Günümüz dünyasında, uluslararası seyahat ve göçmenlik süreçleri giderek daha karmaşık hale gelmektedir. İş, eğitim, turizm veya aile birleşimi gibi nedenlerle yurt dışına çıkmak isteyen bireyler, vize başvuruları sırasında karşılaştıkları karmaşık prosedürler ve belgeler nedeniyle çoğu zaman zorlanmaktadır. Vize başvuru sürecindeki bu zorlukları aşmak ve başvurularının başarı şansını artırmak isteyen kişiler için profesyonel vize danışmanlık hizmetleri büyük bir önem taşımaktadır. İşte bu noktada, Çilek Vize olarak biz devreye giriyoruz.</p>
                            <p><strong>Firmamızın Amacı ve Misyonu</strong><br />Çilek Vize, uluslararası vize başvurularında bireylere ve kurumlara profesyonel danışmanlık hizmeti sunan, alanında uzmanlaşmış bir firmadır. Misyonumuz, müşterilerimizin vize başvuru süreçlerini en hızlı, en doğru ve en etkili şekilde yönetmelerini sağlamaktır. Bu kapsamda, her müşterimizin ihtiyaçlarına özel çözümler sunuyor ve başvurularının başarıya ulaşması için titizlikle çalışıyoruz.</p>
                            <p><strong>Hizmetlerimiz;</strong><br />1. Vize Türleri ve Başvuru Süreçleri:</p>
                            <p><strong>Turist Vizeleri:</strong> Turistik amaçlarla yurt dışına seyahat etmek isteyen müşterilerimize, başvurulacak ülkenin vize gereklilikleri, seyahat sağlık sigortası, rezervasyonlar ve gerekli belgeler hakkında kapsamlı bilgi sağlıyoruz. Başvuru sürecini baştan sona yöneterek, müşterilerimizin sorunsuz bir şekilde vizelerini almasını sağlıyoruz.</p>
                            <p><strong>Eğitim Vizeleri:</strong> Yurt dışında eğitim almak isteyen öğrenciler için başvurulacak okul ve ülkenin gereksinimlerine uygun olarak, eğitim vizesi başvuru sürecini yönetiyoruz. Belgelerin doğru şekilde hazırlanmasından, okul kabul mektubu ve mali yeterlilik belgelerine kadar tüm detayları gözden geçiriyoruz.</p>
                            <p><strong>İş Vizeleri:</strong> Yurt dışında çalışmak isteyen profesyoneller için iş vizesi başvuru sürecinde gerekli tüm belgelerin hazırlanması, işverenle koordinasyon ve konsolosluk görüşmeleri konusunda danışmanlık hizmeti sunuyoruz. Çalışma izni, iş sözleşmesi ve diğer ilgili belgelerin eksiksiz olmasını sağlıyoruz.</p>
                            <p><strong>Aile Birleşimi Vizeleri:</strong> Aile bireylerini yurt dışına taşımak isteyen müşterilerimiz için aile birleşimi vizesi başvurusunu detaylı bir şekilde ele alıyoruz. Aile bağlarını kanıtlayan belgelerin hazırlanması, konsolosluk görüşmelerine hazırlık ve başvuru takibi gibi hizmetler sunuyoruz.</p>
                            <p>2. Vize Başvuru Süreci Yönetimi:</p>
                            <p><strong>Dokümantasyon:</strong> Vize başvuru sürecinin en kritik aşaması olan dokümantasyonun doğru ve eksiksiz bir şekilde hazırlanmasını sağlıyoruz. Müşterilerimizin ihtiyaç duyduğu tüm belgeleri temin etmelerine yardımcı oluyor, eksik veya hatalı dokümanların düzeltilmesi için destek veriyoruz.</p>
                            <p><strong>Başvuru Formları:</strong> Vize başvuru formlarının doldurulması sürecinde müşterilerimize rehberlik ediyoruz. Hatalı veya eksik doldurulmuş formların vize başvurularını riske atabileceğinin farkında olarak, formların doğru ve eksiksiz bir şekilde tamamlanmasını sağlıyoruz.</p>
                            <p><strong>Randevu ve Takip:</strong> Konsolosluk ve büyükelçilik randevularının alınmasından, başvuruların takibine kadar tüm süreci yönetiyoruz. Müşterilerimizin başvuru süreçlerinde herhangi bir aksaklık yaşamaması için sürekli olarak süreçleri izliyor ve gerekli durumlarda müdahalelerde bulunuyoruz.</p>
                            <p>3. Vize Reddi Sonrası Destek:</p>
                            <p><strong>İtiraz ve Yeniden Başvuru:</strong> Vize başvurusu reddedilen müşterilerimize, ret nedenlerini analiz ederek itiraz süreçlerinde destek veriyoruz. Yeniden başvuru yapma durumunda ise gerekli düzeltmeleri yaparak, başvurunun kabul edilme şansını artırıyoruz.</p>
                            <p><strong>Alternatif Çözümler:</strong> Vize reddi sonrası alternatif seyahat veya göç seçenekleri sunarak, müşterilerimizin hedeflerine ulaşmalarını sağlıyoruz.</p>
                            <p>4. Kişiselleştirilmiş Danışmanlık:</p>
                            <p>Her müşterimizin ihtiyaçları farklıdır ve bu nedenle sunduğumuz hizmetler de kişiselleştirilmiştir. Müşterilerimizin hedeflerine, seyahat planlarına ve kişisel durumlarına uygun olarak özel çözümler sunuyoruz. Onların vize başvuru süreçlerini en verimli şekilde yönetmeleri için yanlarında oluyoruz.</p>
                            <p><strong>Uzman Ekibimiz</strong><br />Çilek Vize olarak, alanında uzman ve deneyimli bir ekip ile çalışıyoruz. Ekibimiz, uluslararası vize başvuruları konusunda geniş bir bilgi birikimine ve deneyime sahiptir. Her biri, konsolosluk prosedürleri, yasal gereklilikler ve uluslararası göç politikaları konusunda derinlemesine bilgi sahibidir. Müşterilerimize en güncel ve doğru bilgileri sunarak, onların vize başvuru süreçlerini başarıya ulaştırmayı hedefliyoruz.</p>
                            <p><strong>Neden Çilek Vize ?</strong><br /><strong>Güvenilirlik:</strong> Yılların deneyimi ile müşterilerimize en güvenilir ve etkili danışmanlık hizmetlerini sunuyoruz. Tüm süreçlerde şeffaflığı ve dürüstlüğü ilke ediniyoruz.</p>
                            <p><strong>Başarı Oranı:</strong> Yüksek başarı oranımız, hizmet kalitemizin bir göstergesidir. Müşterilerimizin vize başvurularını en yüksek standartlarda yöneterek, başarılı sonuçlar elde ediyoruz.</p>
                            <p><strong>Kişiye Özel Hizmet:</strong> Her müşteri bizim için özeldir ve her birinin ihtiyaçlarına özel çözümler sunarız. Danışmanlık sürecimizi, müşterilerimizin kişisel durumlarına ve hedeflerine uygun şekilde tasarlıyoruz.</p>
                            <p><strong>Destek ve Rehberlik:</strong> Başvuruların her aşamasında müşterilerimize tam destek sağlıyoruz. Gerekli tüm belgeleri hazırlamaktan, konsolosluk görüşmelerine kadar her adımda yanlarındayız.</p>
                            <p><br />Çilek Vize olarak, uluslararası seyahat ve yurt dışı çalışma süreçlerinde müşterilerimizin en güvenilir yol arkadaşı olmayı amaçlıyoruz. Vize başvurularının karmaşık yapısını, deneyimimiz ve uzmanlığımızla basitleştiriyor ve müşterilerimize sorunsuz bir süreç sunuyoruz. Her müşterimizin hayatını kolaylaştırmak ve hedeflerine ulaşmalarını sağlamak için burada olmaktan gurur duyuyoruz. Müşterilerimizin memnuniyeti, başarımızın en büyük ödülüdür.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Testimonials - Shorts Slider */}
            <section className="section section-shorts">
                <div className="container">
                    <div className="section-head type-1">
                        <span className="heading-2">Bizi danışanlarımızdan dinleyin!</span>
                    </div>
                </div>
                <div className="swiper swiper-vertical-card-sliders" ref={sliderRef}>
                    <div className="swiper-wrapper">
                        {videoTestimonials.map((video) => (
                            <div key={video.id} className="swiper-slide">
                                <div className="short-card">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        decoding="async"
                                        loading="lazy"
                                    />
                                    <a
                                        title={video.title}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openVideoModal(video);
                                        }}
                                        className="btn-elem"
                                    >
                                        <span>
                                            <img
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
                                                {[...Array(5)].map((_, i) => (
                                                    <img
                                                        key={i}
                                                        src="/visa/assets/img/icon/star-filled.svg"
                                                        width={14}
                                                        height={12}
                                                        alt={video.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {video.description && (
                                            <div className="body-sm">
                                                {video.description.split('\r\n').map((line, i) => (
                                                    <span key={i}>
                                                        {line}
                                                        {i < video.description.split('\r\n').length - 1 && <br />}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Box List / Comparison Section */}
            <section className="section section-box-list">
                <div className="container">
                    <div className="main-inner">
                        <div className="section-head">
                            <span className="heading-2 colorfull">Karmaşık vize başvurularına elveda</span>
                        </div>
                        <div className="box-list">
                            <div className="properties-box featured">
                                <div className="icon">
                                    <span className="heading-5">Çilek Vize İle</span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img
                                            src="/visa/assets/img/icon/check.svg"
                                            alt="..."
                                            width={30}
                                            height={30}
                                            decoding="async"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="heading-5 semibold">Vize başvuru süreçleri hızlı ve basittir.</span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img
                                            src="/visa/assets/img/icon/check.svg"
                                            alt="..."
                                            width={30}
                                            height={30}
                                            decoding="async"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="heading-5 semibold">Başvuruların hızlı bir şekilde onaylanması</span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img
                                            src="/visa/assets/img/icon/check.svg"
                                            alt="..."
                                            width={30}
                                            height={30}
                                            decoding="async"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="heading-5 semibold">Seyahat destek ve tavsiye hizmeti sunulur.</span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img
                                            src="/visa/assets/img/icon/check.svg"
                                            alt="..."
                                            width={30}
                                            height={30}
                                            decoding="async"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="heading-5 semibold">Tek sabit fiyat ile bütçenizi koruyarak işlem yapma imkanı.</span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img
                                            src="/visa/assets/img/icon/check.svg"
                                            alt="..."
                                            width={30}
                                            height={30}
                                            decoding="async"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="heading-5 semibold">Başvuru sürecindeki aşamalarda profesyonel destek.</span>
                                </div>
                            </div>
                            <div className="properties-box">
                                <div className="icon">
                                    <span className="heading-5">Çilek Vize Olmadan</span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img
                                            src="/visa/assets/img/icon/minus-circle.svg"
                                            alt="..."
                                            width={30}
                                            height={30}
                                            decoding="async"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="heading-5 semibold">Vize evraklarıyla uğraşmak karmaşık olabilir.</span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img
                                            src="/visa/assets/img/icon/minus-circle.svg"
                                            alt="..."
                                            width={30}
                                            height={30}
                                            decoding="async"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="heading-5 semibold">Hata yapma ve vize reddi riski artabilir.</span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img
                                            src="/visa/assets/img/icon/minus-circle.svg"
                                            alt="..."
                                            width={30}
                                            height={30}
                                            decoding="async"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="heading-5 semibold">Başvuru onayı için belirsiz bir zaman çizelgesi olabilir.</span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img
                                            src="/visa/assets/img/icon/minus-circle.svg"
                                            alt="..."
                                            width={30}
                                            height={30}
                                            decoding="async"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="heading-5 semibold">Farklı firmalara yüksek ücretler ödemek gerekebilir.</span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <img
                                            src="/visa/assets/img/icon/minus-circle.svg"
                                            alt="..."
                                            width={30}
                                            height={30}
                                            decoding="async"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="heading-5 semibold">Yanlış evrakları hazırlamak zorunda kalırsınız.</span>
                                </div>
                            </div>
                        </div>
                        <div className="btn-huge">
                            <Link
                                title="Başvurunuzu Başlatın"
                                href="/visa/basvuru-yap"
                                className="btn btn-primary btn-has-icon"
                            >
                                Başvurunuzu Başlatın
                                <span className="icon">
                                    <img
                                        src="/visa/assets/img/icon/target-link.svg"
                                        alt="Target"
                                        width={53}
                                        height={53}
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            <div
                id="iframe-modal"
                className={`full-modal ${isVideoModalOpen ? 'active' : ''}`}
                ref={videoModalRef}
            >
                <div
                    id="iframe-modal-overlay"
                    className="full-shadow"
                    onClick={closeVideoModal}
                ></div>
                <button
                    className="close-modal-btn"
                    aria-label="Modalı Kapat"
                    onClick={closeVideoModal}
                >
                    <img
                        src="/visa/assets/img/icon/modal-close.svg"
                        width={15}
                        height={15}
                        alt="Close"
                    />
                </button>
                <div className="modal-inner">
                    <div className="inner-huge">
                        {selectedVideo && (
                            <iframe
                                ref={videoIframeRef}
                                src=""
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

