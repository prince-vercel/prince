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
                <div className="image">
                    <img
                        src="/visa/uploads/contents/cover/1763937127_70e331bafdcc4c55539d.webp"
                        alt={t('visa.pages.hakkimizda.heroTitle', 'Evraklarla Uğraşmadan Vize Başvurunuzu Çilek Vize ile Tamamlayın!')}
                        width={1728}
                        height={462}
                        fetchPriority="high"
                    />
                    <div className="gradient"></div>
                </div>
                <div className="about-title-section-logo">
                    <img
                        src="/visa/uploads/contents/main/1763937997_ffa4d69cc741b45632f5.webp"
                        alt={t('visa.pages.hakkimizda.heroTitle', 'Evraklarla Uğraşmadan Vize Başvurunuzu Çilek Vize ile Tamamlayın!')}
                    />
                    <h1>{t('visa.pages.hakkimizda.heroTitle', 'Evraklarla Uğraşmadan Vize Başvurunuzu Çilek Vize ile Tamamlayın!')}</h1>
                </div>
            </section>

            {/* Info Section */}
            <section id="about-info-section">
                <div className="container">
                    <div className="content">
                        <div className="heading-3 colorfull">
                            <p>{t('visa.pages.hakkimizda.content.intro', 'Günümüz dünyasında, uluslararası seyahat ve göçmenlik süreçleri giderek daha karmaşık hale gelmektedir. İş, eğitim, turizm veya aile birleşimi gibi nedenlerle yurt dışına çıkmak isteyen bireyler, vize başvuruları sırasında karşılaştıkları karmaşık prosedürler ve belgeler nedeniyle çoğu zaman zorlanmaktadır. Vize başvuru sürecindeki bu zorlukları aşmak ve başvurularının başarı şansını artırmak isteyen kişiler için profesyonel vize danışmanlık hizmetleri büyük bir önem taşımaktadır. İşte bu noktada, Çilek Vize olarak biz devreye giriyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.mission.title', 'Firmamızın Amacı ve Misyonu')}</strong><br />{t('visa.pages.hakkimizda.content.mission.text', 'Çilek Vize, uluslararası vize başvurularında bireylere ve kurumlara profesyonel danışmanlık hizmeti sunan, alanında uzmanlaşmış bir firmadır. Misyonumuz, müşterilerimizin vize başvuru süreçlerini en hızlı, en doğru ve en etkili şekilde yönetmelerini sağlamaktır. Bu kapsamda, her müşterimizin ihtiyaçlarına özel çözümler sunuyor ve başvurularının başarıya ulaşması için titizlikle çalışıyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.services.title', 'Hizmetlerimiz;')}</strong><br />{t('visa.pages.hakkimizda.content.services.subtitle', '1. Vize Türleri ve Başvuru Süreçleri:')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.services.tourist.title', 'Turist Vizeleri:')}</strong> {t('visa.pages.hakkimizda.content.services.tourist.text', 'Turistik amaçlarla yurt dışına seyahat etmek isteyen müşterilerimize, başvurulacak ülkenin vize gereklilikleri, seyahat sağlık sigortası, rezervasyonlar ve gerekli belgeler hakkında kapsamlı bilgi sağlıyoruz. Başvuru sürecini baştan sona yöneterek, müşterilerimizin sorunsuz bir şekilde vizelerini almasını sağlıyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.services.education.title', 'Eğitim Vizeleri:')}</strong> {t('visa.pages.hakkimizda.content.services.education.text', 'Yurt dışında eğitim almak isteyen öğrenciler için başvurulacak okul ve ülkenin gereksinimlerine uygun olarak, eğitim vizesi başvuru sürecini yönetiyoruz. Belgelerin doğru şekilde hazırlanmasından, okul kabul mektubu ve mali yeterlilik belgelerine kadar tüm detayları gözden geçiriyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.services.work.title', 'İş Vizeleri:')}</strong> {t('visa.pages.hakkimizda.content.services.work.text', 'Yurt dışında çalışmak isteyen profesyoneller için iş vizesi başvuru sürecinde gerekli tüm belgelerin hazırlanması, işverenle koordinasyon ve konsolosluk görüşmeleri konusunda danışmanlık hizmeti sunuyoruz. Çalışma izni, iş sözleşmesi ve diğer ilgili belgelerin eksiksiz olmasını sağlıyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.services.family.title', 'Aile Birleşimi Vizeleri:')}</strong> {t('visa.pages.hakkimizda.content.services.family.text', 'Aile bireylerini yurt dışına taşımak isteyen müşterilerimiz için aile birleşimi vizesi başvurusunu detaylı bir şekilde ele alıyoruz. Aile bağlarını kanıtlayan belgelerin hazırlanması, konsolosluk görüşmelerine hazırlık ve başvuru takibi gibi hizmetler sunuyoruz.')}</p>
                            <p>{t('visa.pages.hakkimizda.content.process.title', '2. Vize Başvuru Süreci Yönetimi:')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.process.documentation.title', 'Dokümantasyon:')}</strong> {t('visa.pages.hakkimizda.content.process.documentation.text', 'Vize başvuru sürecinin en kritik aşaması olan dokümantasyonun doğru ve eksiksiz bir şekilde hazırlanmasını sağlıyoruz. Müşterilerimizin ihtiyaç duyduğu tüm belgeleri temin etmelerine yardımcı oluyor, eksik veya hatalı dokümanların düzeltilmesi için destek veriyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.process.forms.title', 'Başvuru Formları:')}</strong> {t('visa.pages.hakkimizda.content.process.forms.text', 'Vize başvuru formlarının doldurulması sürecinde müşterilerimize rehberlik ediyoruz. Hatalı veya eksik doldurulmuş formların vize başvurularını riske atabileceğinin farkında olarak, formların doğru ve eksiksiz bir şekilde tamamlanmasını sağlıyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.process.appointment.title', 'Randevu ve Takip:')}</strong> {t('visa.pages.hakkimizda.content.process.appointment.text', 'Konsolosluk ve büyükelçilik randevularının alınmasından, başvuruların takibine kadar tüm süreci yönetiyoruz. Müşterilerimizin başvuru süreçlerinde herhangi bir aksaklık yaşamaması için sürekli olarak süreçleri izliyor ve gerekli durumlarda müdahalelerde bulunuyoruz.')}</p>
                            <p>{t('visa.pages.hakkimizda.content.rejection.title', '3. Vize Reddi Sonrası Destek:')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.rejection.appeal.title', 'İtiraz ve Yeniden Başvuru:')}</strong> {t('visa.pages.hakkimizda.content.rejection.appeal.text', 'Vize başvurusu reddedilen müşterilerimize, ret nedenlerini analiz ederek itiraz süreçlerinde destek veriyoruz. Yeniden başvuru yapma durumunda ise gerekli düzeltmeleri yaparak, başvurunun kabul edilme şansını artırıyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.rejection.alternatives.title', 'Alternatif Çözümler:')}</strong> {t('visa.pages.hakkimizda.content.rejection.alternatives.text', 'Vize reddi sonrası alternatif seyahat veya göç seçenekleri sunarak, müşterilerimizin hedeflerine ulaşmalarını sağlıyoruz.')}</p>
                            <p>{t('visa.pages.hakkimizda.content.personalized.title', '4. Kişiselleştirilmiş Danışmanlık:')}</p>
                            <p>{t('visa.pages.hakkimizda.content.personalized.text', 'Her müşterimizin ihtiyaçları farklıdır ve bu nedenle sunduğumuz hizmetler de kişiselleştirilmiştir. Müşterilerimizin hedeflerine, seyahat planlarına ve kişisel durumlarına uygun olarak özel çözümler sunuyoruz. Onların vize başvuru süreçlerini en verimli şekilde yönetmeleri için yanlarında oluyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.team.title', 'Uzman Ekibimiz')}</strong><br />{t('visa.pages.hakkimizda.content.team.text', 'Çilek Vize olarak, alanında uzman ve deneyimli bir ekip ile çalışıyoruz. Ekibimiz, uluslararası vize başvuruları konusunda geniş bir bilgi birikimine ve deneyime sahiptir. Her biri, konsolosluk prosedürleri, yasal gereklilikler ve uluslararası göç politikaları konusunda derinlemesine bilgi sahibidir. Müşterilerimize en güncel ve doğru bilgileri sunarak, onların vize başvuru süreçlerini başarıya ulaştırmayı hedefliyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.why.title', 'Neden Çilek Vize ?')}</strong><br /><strong>{t('visa.pages.hakkimizda.content.why.reliability.title', 'Güvenilirlik:')}</strong> {t('visa.pages.hakkimizda.content.why.reliability.text', 'Yılların deneyimi ile müşterilerimize en güvenilir ve etkili danışmanlık hizmetlerini sunuyoruz. Tüm süreçlerde şeffaflığı ve dürüstlüğü ilke ediniyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.why.success.title', 'Başarı Oranı:')}</strong> {t('visa.pages.hakkimizda.content.why.success.text', 'Yüksek başarı oranımız, hizmet kalitemizin bir göstergesidir. Müşterilerimizin vize başvurularını en yüksek standartlarda yöneterek, başarılı sonuçlar elde ediyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.why.personal.title', 'Kişiye Özel Hizmet:')}</strong> {t('visa.pages.hakkimizda.content.why.personal.text', 'Her müşteri bizim için özeldir ve her birinin ihtiyaçlarına özel çözümler sunarız. Danışmanlık sürecimizi, müşterilerimizin kişisel durumlarına ve hedeflerine uygun şekilde tasarlıyoruz.')}</p>
                            <p><strong>{t('visa.pages.hakkimizda.content.why.support.title', 'Destek ve Rehberlik:')}</strong> {t('visa.pages.hakkimizda.content.why.support.text', 'Başvuruların her aşamasında müşterilerimize tam destek sağlıyoruz. Gerekli tüm belgeleri hazırlamaktan, konsolosluk görüşmelerine kadar her adımda yanlarındayız.')}</p>
                            <p><br />{t('visa.pages.hakkimizda.content.conclusion', 'Çilek Vize olarak, uluslararası seyahat ve yurt dışı çalışma süreçlerinde müşterilerimizin en güvenilir yol arkadaşı olmayı amaçlıyoruz. Vize başvurularının karmaşık yapısını, deneyimimiz ve uzmanlığımızla basitleştiriyor ve müşterilerimize sorunsuz bir süreç sunuyoruz. Her müşterimizin hayatını kolaylaştırmak ve hedeflerine ulaşmalarını sağlamak için burada olmaktan gurur duyuyoruz. Müşterilerimizin memnuniyeti, başarımızın en büyük ödülüdür.')}</p>
                        </div>
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
                                    <span className="heading-5">{t('visa.comparison.withCilekVize', 'Çilek Vize İle')}</span>
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
                                    <span className="heading-5">{t('visa.comparison.withoutCilekVize', 'Çilek Vize Olmadan')}</span>
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

