import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import '../../styles/visa/Hakkimizda.css';

export default function HakkimizdaPage() {
    const { t } = useTranslation();

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section id="about-title-section">

                <div className="about-title-section-logo">
                    <h1>{t('visa.pages.hakkimizda.heroTitle', 'Evraklarla Uğraşmadan Vize Başvurunuzu Prince ile Tamamlayın!')}</h1>
                </div>
            </section>

            {/* Info Section */}
            <section id="about-info-section">
                <div className="container">
                    <div className="content">
                        <div className="heading-3 colorfull">
                            <strong>Profesyonel Vize Danışmanlığı</strong>
                        </div>
                        <p>
                            Prince Invest Group; Avrupa, Afrika, Orta Doğu ve Körfez bölgelerinde Sağlık Hizmetleri ve Sağlık Turizmi, Turizm & Travel ve Vize Danışmanlığı alanlarında faaliyet gösteren çok uluslu bir holdingdir.
                        </p>
                        <p>
                            Günümüz dünyasında uluslararası seyahat ve göç süreçleri her geçen gün daha karmaşık bir yapıya bürünmektedir. Eğitim, turizm, çalışma ya da aile birleşimi gibi nedenlerle yurt dışına çıkmak isteyen bireyler, vize başvuruları sırasında yoğun evrak süreçleri ve karmaşık prosedürlerle karşılaşmaktadır. Bu durum, başvuru sürecini zorlayıcı ve zaman alıcı hale getirmektedir. Vize başvurularında başarıya ulaşmak isteyen kişiler için profesyonel danışmanlık desteği büyük önem taşımaktadır. Prince Visa olarak tam da bu noktada devreye giriyor, süreci sizin adınıza güvenle yönetiyoruz.
                        </p>
                        <p>
                            Uluslararası seyahat ve göç süreçleri, ülkelerin farklı uygulamaları ve sürekli güncellenen prosedürleri nedeniyle giderek daha karmaşık bir yapıya sahiptir. Turistik, ticari, eğitim, çalışma ve aile birleşimi gibi farklı amaçlarla yapılan vize başvurularında, sürecin doğru ve eksiksiz şekilde yönetilmesi büyük önem taşımaktadır.
                        </p>
                        <p>
                            <strong>Prince Visa, tüm vize türlerinde uzman danışman kadrosu ile profesyonel vize danışmanlığı hizmeti sunmaktadır.</strong> Başvuru süreci, her başvuru sahibinin seyahat amacı ve kişisel durumu dikkate alınarak, birebir danışmanlık anlayışıyla yönetilmektedir.
                        </p>
                       
                            <p>- Turistik vize başvuruları</p>
                            <p>- Ticari ve iş amaçlı vizeler</p>
                            <p>- Eğitim ve öğrenci vizeleri</p>
                            <p>- Çalışma ve uzun süreli vizeler</p>
                            <p>- Aile birleşimi ve özel amaçlı vizeler</p>
                        
                        <p>
                            Danışmanlarımız; gerekli evrakların hazırlanması, başvuru formlarının doğru şekilde doldurulması, randevu süreçlerinin planlanması ve dosya takibi gibi tüm aşamalarda başvuru sahiplerine birebir destek sağlar. Özellikle turistik ve ticari vizelerde, sürecin daha hızlı ve sorunsuz ilerlemesi için titizlikle çalışılmaktadır.
                        </p>
                        <p>
                            <strong>Prince Visa olarak amacımız, vize başvuru sürecini daha anlaşılır, güvenli ve stressiz hale getirmek; başvuruların en doğru şekilde tamamlanmasına destek olmaktır.</strong> Şeffaf iletişim anlayışımız ve profesyonel yaklaşımımızla, vize süreçlerinizde güvenilir bir çözüm ortağı olmayı hedefliyoruz.
                        </p>
                    </div>
                </div>
            </section>

            {/* Box List / Comparison Section */}
            <section className="section section-box-list">
                <div className="container">
                    <div className="main-inner">
                        <div className="section-head">
                            <span className="heading-2 colorfull">{t('visa.pages.hakkimizda.comparison.title', 'Karmaşık vize başvurularına elveda')}</span>
                        </div>
                        <div className="box-list">
                            <div className="properties-box featured">
                                <div className="icon">
                                    <span className="heading-5">{t('visa.comparison.withCilekVize', 'Prince İle')}</span>
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
                                    <span className="heading-5 semibold">{t('visa.pages.hakkimizda.comparison.with.items.fast', 'Vize başvuru süreçleri hızlı ve basittir.')}</span>
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
                                    <span className="heading-5 semibold">{t('visa.pages.hakkimizda.comparison.with.items.approval', 'Başvuruların hızlı bir şekilde onaylanması')}</span>
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
                                    <span className="heading-5 semibold">{t('visa.pages.hakkimizda.comparison.with.items.support', 'Seyahat destek ve tavsiye hizmeti sunulur.')}</span>
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
                                    <span className="heading-5 semibold">{t('visa.pages.hakkimizda.comparison.with.items.price', 'Tek sabit fiyat ile bütçenizi koruyarak işlem yapma imkanı.')}</span>
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
                                    <span className="heading-5 semibold">{t('visa.pages.hakkimizda.comparison.with.items.professional', 'Başvuru sürecindeki aşamalarda profesyonel destek.')}</span>
                                </div>
                            </div>
                            <div className="properties-box">
                                <div className="icon">
                                    <span className="heading-5">{t('visa.comparison.withoutCilekVize', 'Prince Olmadan')}</span>
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
                                    <span className="heading-5 semibold">{t('visa.pages.hakkimizda.comparison.without.items.complex', 'Vize evraklarıyla uğraşmak karmaşık olabilir.')}</span>
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
                                    <span className="heading-5 semibold">{t('visa.pages.hakkimizda.comparison.without.items.risk', 'Hata yapma ve vize reddi riski artabilir.')}</span>
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
                                    <span className="heading-5 semibold">{t('visa.pages.hakkimizda.comparison.without.items.timeline', 'Başvuru onayı için belirsiz bir zaman çizelgesi olabilir.')}</span>
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
                                    <span className="heading-5 semibold">{t('visa.pages.hakkimizda.comparison.without.items.cost', 'Farklı firmalara yüksek ücretler ödemek gerekebilir.')}</span>
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
                                    <span className="heading-5 semibold">{t('visa.pages.hakkimizda.comparison.without.items.wrong', 'Yanlış evrakları hazırlamak zorunda kalırsınız.')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="btn-huge">
                            <Link
                                title={t('visa.common.apply')}
                                href="/visa/basvuru-yap"
                                className="btn btn-primary btn-has-icon"
                            >
                                {t('visa.common.apply')}
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
        </div>
    );
}

