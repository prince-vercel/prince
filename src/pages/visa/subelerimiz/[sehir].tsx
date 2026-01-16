import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../i18n';
import '../../../styles/visa/Subelerimiz.css';

// Mock Data - Şehirlere göre şube bilgileri
interface BranchData {
    id: number;
    slug: string;
    name: string;
    phone: string;
    whatsapp: string;
    address: string;
    addressShort: string;
    mapEmbedUrl: string;
    content: string;
    image?: string;
}

const branchesData: Record<string, BranchData> = {
    bursa: {
        id: 3,
        slug: 'bursa',
        name: 'Bursa Genel Merkez',
        phone: '08508887071',
        whatsapp: '908508887071',
        address: 'Muradiye, Beşikçiler Cd. No:73A, 16000 Osmangazi/Bursa (Eski THY ofisi)',
        addressShort: 'Muradiye, Beşikçiler Cd. No:73A, 16000 Osmangazi/B...',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.69341484524!2d29.041219400000003!3d40.1936359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0c12cd2dc90db%3A0x6a83fde658118ea0!2zw4dpbGVrIFZpemUgRGFuxLHFn21hbmzEsWs!5e0!3m2!1str!2str!4v1765631710788!5m2!1str!2str',
        content: `<p>Türkiye'nin en büyük ve en güvenilir vize danışmanlık firmalarından biri olan <strong>Prince</strong>, <strong>Bursa Genel Merkezi</strong> ile vize başvuru sürecinde sizlere en hızlı ve güvenilir hizmeti sunmaktadır. 40'tan fazla uzman personeli ile dünya genelindeki tüm ülkelerin vize başvurularında profesyonel danışmanlık sağlayarak, vize işlemlerinizin eksiksiz ve sorunsuz tamamlanmasını garanti ediyoruz.</p>
        <h3><strong>Bursa Genel Merkezimizle Profesyonel ve Güvenilir Hizmet</strong></h3>
        <p>Bursa'daki genel merkezimiz, vize danışmanlık sektöründe uzun yıllara dayanan deneyimi ve alanında uzman ekibiyle vize başvuru sürecinizde size rehberlik eder. Prince olarak, <strong>turistik, ticari, öğrenci, aile birleşimi, yatırımcı, çalışma ve tır şoförü vizesi</strong> gibi tüm vize türlerinde hizmet veriyoruz. ABD, Kanada, İngiltere, Schengen ülkeleri, Avustralya, Çin, Dubai ve daha birçok ülkeye yönelik vize başvurularınızda en güncel prosedürlere uygun olarak danışmanlık sağlıyoruz.</p>
        <h3><strong>Türkiye'nin Her Yerinden Online Destek ve Call Center Hizmeti</strong></h3>
        <p>Vize başvurusu sürecini en hızlı ve kolay hale getirmek için <strong>online destek hizmetimizle Türkiye'nin her noktasından</strong> başvuru yapabilirsiniz. <strong>0850 888 70 71</strong> numaralı çağrı merkezimiz aracılığıyla tüm danışanlarımıza destek sunuyoruz. Vize süreciyle ilgili sorularınızı uzman ekibimize danışabilir, gerekli belgeler ve başvuru aşamaları hakkında detaylı bilgi alabilirsiniz. Call center hizmetimiz sayesinde, Bursa dışındaki danışanlarımız da vize işlemlerini <strong>uzaktan ve eksiksiz</strong> bir şekilde tamamlayabilir.</p>
        <h3><strong>Bursa Genel Merkezimize Bekliyoruz</strong></h3>
        <p>Yüz yüze danışmanlık hizmeti almak ve vize sürecinizi birebir görüşmelerle planlamak isteyen danışanlarımızı Bursa'daki genel merkezimize bekliyoruz. Deneyimli ekibimiz, <strong>kişiye özel danışmanlık hizmeti sunarak vize başvurularınızı sorunsuz bir şekilde sonuçlandırmanız için sizinle birlikte çalışıyor.</strong></p>
        <h3><strong>Neden Prince?</strong></h3>
        <p><strong>40'tan fazla uzman personel</strong> ile en kapsamlı vize danışmanlığı</p>
        <p><strong>Tüm vize türlerinde ve tüm ülkelerde profesyonel destek</strong></p>
        <p><strong>Türkiye'nin her yerinden online başvuru ve destek hizmeti</strong></p>
        <p><strong>Yüz yüze görüşme imkânı ile güvenilir ve birebir danışmanlık</strong></p>
        <p><strong>Call center desteği (0850 888 70 71)</strong></p>
        <h3><strong>Hemen Bilgi Alın!</strong></h3>
        <h3>&nbsp;<strong>Prince Bursa Genel Merkezi</strong>&nbsp;-&nbsp; <strong>0850 888 70 71</strong></h3>
        <p>Vize işlemlerinizde en güvenilir rehberiniz olan Prince ile <strong>hızlı, kolay ve güvenilir</strong> bir başvuru süreci yaşayın. Profesyonel ekibimizle <strong>hayallerinize bir adım daha yaklaşın!</strong></p>`
    },
    ankara: {
        id: 1,
        slug: 'ankara',
        name: 'Ankara',
        phone: '08508887071',
        whatsapp: '908508887071',
        address: 'Kızılay, Atatürk Bulvarı No:123, 06420 Çankaya/Ankara',
        addressShort: 'Kızılay, Atatürk Bulvarı No:123, 06420 Çankaya/A...',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.1234567890!2d32.8597!3d39.9334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0x626e1e1e1e1e1e1e!2sAnkara!5e0!3m2!1str!2str!4v1234567890!5m2!1str!2str',
        content: `<p>Prince <strong>Ankara Şubesi</strong> ile başkentteki danışanlarımıza profesyonel vize danışmanlık hizmeti sunuyoruz. Deneyimli ekibimiz ve modern ofisimizle tüm vize işlemlerinizde yanınızdayız.</p>
        <h3><strong>Ankara Şubemizle Güvenilir Hizmet</strong></h3>
        <p>Ankara'daki şubemiz, merkezi konumu ve uzman personeli ile vize başvuru sürecinizde size rehberlik eder. Tüm vize türlerinde profesyonel destek sağlıyoruz.</p>
        <h3><strong>Neden Prince Ankara?</strong></h3>
        <p><strong>Merkezi konum</strong> - Kızılay'da kolay ulaşım</p>
        <p><strong>Uzman ekip</strong> - Deneyimli danışmanlarımız</p>
        <p><strong>Hızlı işlem</strong> - Kısa sürede sonuç</p>`
    },
    izmir: {
        id: 2,
        slug: 'izmir',
        name: 'İzmir',
        phone: '08508887071',
        whatsapp: '908508887071',
        address: 'Alsancak, Kordon Boyu No:456, 35220 Konak/İzmir',
        addressShort: 'Alsancak, Kordon Boyu No:456, 35220 Konak/İ...',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.1234567890!2d27.1428!3d38.4237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b95c5e1e1e1e1e%3A0x626e1e1e1e1e1e1e!2sİzmir!5e0!3m2!1str!2str!4v1234567890!5m2!1str!2str',
        content: `<p>Prince <strong>İzmir Şubesi</strong> ile Ege Bölgesi'ndeki danışanlarımıza hizmet veriyoruz. Deniz kenarındaki konumumuz ve uzman ekibimizle vize işlemlerinizde yanınızdayız.</p>
        <h3><strong>İzmir Şubemizle Profesyonel Destek</strong></h3>
        <p>İzmir'deki şubemiz, modern ofisimiz ve deneyimli personelimiz ile tüm vize başvurularınızda size yardımcı oluyor.</p>
        <h3><strong>Neden Prince İzmir?</strong></h3>
        <p><strong>Ege'nin merkezi</strong> - Alsancak'ta konum</p>
        <p><strong>Uzman danışmanlar</strong> - Profesyonel ekip</p>
        <p><strong>Hızlı çözüm</strong> - Etkili işlem süreci</p>`
    },
    istanbul: {
        id: 4,
        slug: 'istanbul',
        name: 'İstanbul Mecidiyeköy',
        phone: '08508887071',
        whatsapp: '908508887071',
        address: 'Mecidiyeköy, Büyükdere Cad. No:789, 34394 Şişli/İstanbul',
        addressShort: 'Mecidiyeköy, Büyükdere Cad. No:789, 34394 Şişli/İ...',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.1234567890!2d28.9857!3d41.0691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca059b11077e81f!2sMecidiyeköy!5e0!3m2!1str!2str!4v1234567890!5m2!1str!2str',
        content: `<p>Prince <strong>İstanbul Mecidiyeköy Şubesi</strong> ile metropoldeki danışanlarımıza hizmet veriyoruz. İş merkezlerine yakın konumumuz ve uzman ekibimizle vize işlemlerinizde yanınızdayız.</p>
        <h3><strong>İstanbul Mecidiyeköy Şubemizle Güvenilir Hizmet</strong></h3>
        <p>Mecidiyeköy'deki şubemiz, merkezi konumu ve deneyimli personeli ile tüm vize başvurularınızda size yardımcı oluyor.</p>
        <h3><strong>Neden Prince İstanbul?</strong></h3>
        <p><strong>Merkezi konum</strong> - Mecidiyeköy'de kolay ulaşım</p>
        <p><strong>Uzman ekip</strong> - Profesyonel danışmanlar</p>
        <p><strong>Hızlı işlem</strong> - Etkili çözüm süreci</p>`
    },
    mersin: {
        id: 5,
        slug: 'mersin',
        name: 'Mersin',
        phone: '08508887071',
        whatsapp: '908508887071',
        address: 'Akdeniz, Atatürk Cad. No:321, 33110 Akdeniz/Mersin',
        addressShort: 'Akdeniz, Atatürk Cad. No:321, 33110 Akdeniz/M...',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.1234567890!2d34.6415!3d36.8009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1527f4e1e1e1e1e%3A0x626e1e1e1e1e1e1e!2sMersin!5e0!3m2!1str!2str!4v1234567890!5m2!1str!2str',
        content: `<p>Prince <strong>Mersin Şubesi</strong> ile Akdeniz Bölgesi'ndeki danışanlarımıza hizmet veriyoruz. Deneyimli ekibimiz ve modern ofisimizle vize işlemlerinizde yanınızdayız.</p>
        <h3><strong>Mersin Şubemizle Profesyonel Destek</strong></h3>
        <p>Mersin'deki şubemiz, uzman personeli ve merkezi konumu ile tüm vize başvurularınızda size yardımcı oluyor.</p>
        <h3><strong>Neden Prince Mersin?</strong></h3>
        <p><strong>Akdeniz'in merkezi</strong> - Merkezi konum</p>
        <p><strong>Uzman danışmanlar</strong> - Deneyimli ekip</p>
        <p><strong>Hızlı çözüm</strong> - Etkili işlem süreci</p>`
    }
};

// Tüm şubeler listesi (diğer şubeler bölümü için)
const allBranches = Object.values(branchesData);

export default function SubelerimizPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const { sehir } = router.query;
    const formRef = useRef<HTMLFormElement>(null);

    // Seçili şube bilgilerini al
    const currentBranch = sehir && typeof sehir === 'string' ? branchesData[sehir] : null;

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        interest_branch: currentBranch?.name || ''
    });

    // Diğer şubeler (mevcut şehir hariç)
    const otherBranches = currentBranch
        ? allBranches.filter(b => b.slug !== currentBranch.slug)
        : allBranches;

    // Şube bulunamazsa 404
    if (!currentBranch) {
        return (
            <div className="branch-page">
                <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>
                    <h1>{t('visa.branches.notFound.title', 'Şube Bulunamadı')}</h1>
                    <p>{t('visa.branches.notFound.description', 'Aradığınız şube bulunamadı.')}</p>
                    <Link href="/visa">{t('visa.branches.notFound.backHome', 'Ana Sayfaya Dön')}</Link>
                </div>
            </div>
        );
    }

    // Parallax animasyonu için shapes
    useEffect(() => {
        const shapes = document.querySelectorAll('.branch-hero-v2 .shape');
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    shapes.forEach((shape, index) => {
                        const speed = (index + 1) * 0.03;
                        (shape as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Custom select işlevselliği
    useEffect(() => {
        const initCustomSelects = () => {
            document.querySelectorAll('.select-group select').forEach(select => {
                const wrapper = select.parentElement;
                if (!wrapper) return;

                // Zaten custom select oluşturulmuşsa atla
                if (wrapper.querySelector('.custom-select-display')) return;

                const display = document.createElement('div');
                display.classList.add('custom-select-display');
                const selectEl = select as HTMLSelectElement;
                const selectedOption = selectEl.options[selectEl.selectedIndex];
                display.textContent = selectedOption?.textContent || '';
                if (!selectEl.value) {
                    display.classList.add('placeholder');
                }

                const dropdown = document.createElement('div');
                dropdown.classList.add('custom-select-dropdown');

                Array.from((select as HTMLSelectElement).options).forEach(option => {
                    const optionEl = document.createElement('div');
                    optionEl.classList.add('custom-select-option');
                    optionEl.textContent = option.textContent;
                    optionEl.dataset.value = option.value;

                    if (option.selected) {
                        optionEl.classList.add('selected');
                    }

                    optionEl.addEventListener('click', (e) => {
                        e.stopPropagation();
                        (select as HTMLSelectElement).value = option.value;
                        display.textContent = option.textContent;
                        display.classList.remove('placeholder');
                        document.querySelectorAll('.custom-select-option.selected').forEach(s => s.classList.remove('selected'));
                        optionEl.classList.add('selected');
                        dropdown.classList.remove('open');
                        display.classList.remove('active');
                        (select as HTMLSelectElement).dispatchEvent(new Event('change', { bubbles: true }));
                        setFormData(prev => ({ ...prev, interest_branch: option.value }));
                    });
                    dropdown.appendChild(optionEl);
                });

                const arrow = wrapper.querySelector('.select-arrow');
                if (arrow) {
                    wrapper.insertBefore(display, arrow);
                } else {
                    wrapper.appendChild(display);
                }
                wrapper.appendChild(dropdown);

                display.addEventListener('click', (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('.custom-select-dropdown.open').forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('open');
                            (d.previousElementSibling as HTMLElement)?.classList.remove('active');
                        }
                    });
                    dropdown.classList.toggle('open');
                    display.classList.toggle('active');
                });
            });

            document.addEventListener('click', (e) => {
                if (!(e.target as HTMLElement).closest('.select-group')) {
                    document.querySelectorAll('.custom-select-dropdown.open').forEach(d => d.classList.remove('open'));
                    document.querySelectorAll('.custom-select-display.active').forEach(d => d.classList.remove('active'));
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    document.querySelectorAll('.custom-select-dropdown.open').forEach(d => d.classList.remove('open'));
                    document.querySelectorAll('.custom-select-display.active').forEach(d => d.classList.remove('active'));
                }
            });
        };

        initCustomSelects();

        // Form data'yı güncelle
        if (currentBranch) {
            setFormData(prev => ({
                ...prev,
                interest_branch: currentBranch.name
            }));
        }
    }, [currentBranch]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isLoading) return;

        setIsLoading(true);
        const submitBtn = formRef.current?.querySelector('.submit-btn') as HTMLButtonElement;
        if (submitBtn) submitBtn.classList.add('loading');

        try {
            // Form submission logic here
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert(t('visa.branches.form.success', 'Bilgi talebiniz başarıyla gönderildi!'));
            setFormData({ name: '', surname: '', phone: '', interest_branch: currentBranch?.name || '' });
        } catch (error) {
            console.error('Form submission error:', error);
            alert(t('visa.branches.form.error', 'Bir hata oluştu. Lütfen tekrar deneyin.'));
        } finally {
            setIsLoading(false);
            if (submitBtn) submitBtn.classList.remove('loading');
        }
    };

    return (
        <div className="branch-page">
            {/* Hero Section */}
            <section className="branch-hero-v2">
                <div className="hero-bg-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>

                <div className="container">
                    <div className="hero-wrapper">
                        {/* Sol Taraf: Ana İçerik */}
                        <div className="hero-content">
                            <div className="breadcrumb-nav">
                                <Link href="/visa">{t('visa.common.home')}</Link>
                                <span className="separator">/</span>
                                <Link href="/visa/subelerimiz/bursa">{t('visa.branches.title', 'Şubelerimiz')}</Link>
                                <span className="separator">/</span>
                                <span className="current">{currentBranch.name}</span>
                            </div>

                            <h1 className="hero-title-v2">
                                <span className="title-accent">Prince</span>
                                <span className="title-main">{currentBranch.name}</span>
                            </h1>

                            <div className="hero-cta-group">
                                <a href="#bilgi-formu" className="btn-primary-v2">
                                    <span>{t('visa.branches.getInfo', 'Hemen Bilgi Al')}</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                                <a href={`tel:${currentBranch.phone}`} className="btn-secondary-v2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <span>{t('visa.branches.callNow', 'Hemen Ara')}</span>
                                </a>
                            </div>
                        </div>

                        {/* Sağ Taraf: İletişim Kartları */}
                        <div className="hero-cards-v2">
                            <div className="contact-cards-grid">
                                <div className="contact-card-v2 card-phone">
                                    <div className="card-icon-wrapper">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </div>
                                    <div className="card-info">
                                        <span className="card-label">{t('visa.branches.phone', 'Telefon')}</span>
                                        <a href={`tel:${currentBranch.phone}`} className="card-value">
                                            {currentBranch.phone}
                                        </a>
                                    </div>
                                    <div className="card-arrow">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="contact-card-v2 card-location">
                                    <div className="card-icon-wrapper">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div className="card-info">
                                        <span className="card-label">{t('visa.branches.address', 'Adres')}</span>
                                        <span className="card-value card-value-truncate">{currentBranch.addressShort}</span>
                                    </div>
                                    <div className="card-arrow">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                <a href={`https://wa.me/${currentBranch.whatsapp}`} target="_blank" rel="noopener noreferrer" className="contact-card-v2 card-whatsapp">
                                    <div className="card-icon-wrapper">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </div>
                                    <div className="card-info">
                                        <span className="card-label">{t('visa.branches.whatsapp', 'WhatsApp')}</span>
                                        <span className="card-value">{t('visa.branches.writeNow', 'Hemen Yazın')}</span>
                                    </div>
                                    <div className="card-arrow">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="branch-main-content">
                <div className="container">
                    <div className="content-grid">
                        {/* Sol Sidebar */}
                        <aside className="sidebar-v2">
                            <div className="sidebar-sticky">
                                {/* Bilgi Formu */}
                                <div className="form-card" id="bilgi-formu">
                                    <div className="form-card-header">
                                        <div className="form-icon-wrapper">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <line x1="16" y1="13" x2="8" y2="13" />
                                                <line x1="16" y1="17" x2="8" y2="17" />
                                                <polyline points="10 9 9 9 8 9" />
                                            </svg>
                                        </div>
                                        <div className="form-header-text">
                                            <h3>Ön Bilgi Formu</h3>
                                            <p>Size özel teklif alalım</p>
                                        </div>
                                    </div>

                                    <form ref={formRef} onSubmit={handleSubmit}>
                                        <input type="hidden" name="branch_id" value={currentBranch.id} />
                                        <input type="hidden" name="branch_name" value={currentBranch.name} />
                                        <input type="hidden" name="branch_slug" value={currentBranch.slug} />

                                        <div className="form-row">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="form-name"
                                                    required
                                                    placeholder=" "
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor="form-name">{t('visa.branches.form.firstName', 'Adınız')}</label>
                                                <span className="input-border"></span>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    name="surname"
                                                    id="form-surname"
                                                    required
                                                    placeholder=" "
                                                    value={formData.surname}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor="form-surname">{t('visa.branches.form.lastName', 'Soyadınız')}</label>
                                                <span className="input-border"></span>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="input-group">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    id="form-phone"
                                                    required
                                                    placeholder=" "
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor="form-phone">{t('visa.branches.form.phone', 'Telefon Numarası')}</label>
                                                <span className="input-border"></span>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="select-group">
                                                <select
                                                    name="interest_branch"
                                                    id="form-branch"
                                                    required
                                                    value={formData.interest_branch}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, interest_branch: e.target.value }))}
                                                >
                                                    <option value="" disabled></option>
                                                    {allBranches.map(branch => (
                                                        <option
                                                            key={branch.slug}
                                                            value={branch.name}
                                                        >
                                                            {branch.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <label htmlFor="form-branch">{t('visa.branches.form.branch', 'İlgilendiğiniz Şube')}</label>
                                                <span className="select-arrow">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="6 9 12 15 18 9" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <label className="checkbox-wrapper">
                                                <input type="checkbox" name="privacy" required />
                                                <span className="checkmark"></span>
                                                <span className="checkbox-text">
                                                    <a href="/visa/gizlilik-politikasi" target="_blank" rel="noopener noreferrer">{t('visa.branches.form.privacyPolicy', 'Gizlilik Politikası')}</a>{t('visa.branches.form.privacyAccept', "'nı okudum, kabul ediyorum.")}
                                                </span>
                                            </label>
                                        </div>

                                        <button type="submit" className="submit-btn" disabled={isLoading}>
                                            <span className="btn-text">{t('visa.branches.form.submit', 'Bilgi Al')}</span>
                                            <span className="btn-icon">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <line x1="22" y1="2" x2="11" y2="13" />
                                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                                </svg>
                                            </span>
                                            <span className="btn-loader">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="20" />
                                                </svg>
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </aside>

                        {/* Ana İçerik */}
                        <main className="main-article">
                            {/* Açıklama */}
                            <article className="content-block intro-block">
                                <div className="article-prose" dangerouslySetInnerHTML={{ __html: currentBranch.content }} />
                            </article>

                            {/* Harita */}
                            <section className="map-section-v2">
                                <div className="section-header">
                                    <span className="section-icon">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                                            <line x1="8" y1="2" x2="8" y2="18" />
                                            <line x1="16" y1="6" x2="16" y2="22" />
                                        </svg>
                                    </span>
                                    <h2 className="section-title-v2">Konumumuz</h2>
                                </div>

                                <div className="address-box">
                                    <div className="address-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <p>{currentBranch.address}</p>
                                </div>

                                <div className="map-container-v2">
                                    <iframe
                                        src={currentBranch.mapEmbedUrl}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </section>

                            {/* Diğer Şubeler */}
                            <section className="other-branches-v2">
                                <div className="section-header">
                                    <span className="section-icon">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                    </span>
                                    <h2 className="section-title-v2">Diğer Şubelerimiz</h2>
                                </div>

                                <div className="branches-slider">
                                    <div className="branches-track">
                                        {otherBranches.map(branch => (
                                            <Link
                                                key={branch.slug}
                                                href={`/visa/subelerimiz/${branch.slug}`}
                                                className="branch-card-v2"
                                            >
                                                <div className="branch-card-image">
                                                    {branch.image ? (
                                                        <img src={branch.image} alt={branch.name} loading="lazy" />
                                                    ) : (
                                                        <div className="branch-card-placeholder">
                                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                                                <polyline points="9 22 9 12 15 12 15 22" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                    <div className="branch-card-gradient"></div>
                                                </div>
                                                <div className="branch-card-body">
                                                    <h3>{branch.name}</h3>
                                                    <span className="branch-card-cta">
                                                        Detaylar
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}

