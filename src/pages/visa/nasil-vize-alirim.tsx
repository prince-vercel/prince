import Link from 'next/link';
import '../../styles/visa/NasilVizeAlirim.css';

export default function NasilVizeAlirimPage() {
    return (
        <div className="static-page">
            {/* Hero Section */}
            <section className="static-hero">
                <div className="hero-bg-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>

                <div className="container">
                    <div className="hero-grid">
                        {/* Sol Kolon: İçerik */}
                        <div className="hero-content">
                            {/* Breadcrumb */}
                            <nav className="breadcrumb-nav">
                                <Link href="/visa">Ana Sayfa</Link>
                                <span className="separator">/</span>
                                <span className="current">Nasıl Vize Alırım ?</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">Nasıl Vize Alırım ?</h1>

                            {/* CTA Button */}
                            <Link href="/visa/basvuru-yap" className="hero-cta">
                                <span>Başvurunuzu Başlatın</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </div>

                        {/* Sağ Kolon: Görsel */}
                        <div className="hero-image">
                            <picture>
                                <img
                                    src="/visa/uploads/contents/cover/1766008916_298ef5002edaee39d925.png"
                                    alt="Nasıl Vize Alırım ?"
                                />
                            </picture>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="static-main-content">
                <div className="container">
                    <div className="content-grid no-sidebar">
                        {/* Sağ İçerik Alanı */}
                        <main className="static-content">
                            <article className="content-article">
                                {/* Main Content */}
                                <div className="article-prose">
                                    <h2>Vize Nedir?</h2>
                                    <p>
                                        Vize, bir ülkeye giriş yapmak için konsolosluklardan veya giriş noktalarından alınan resmi bir izin belgesidir.
                                        Farklı amaçlara hizmet eden çeşitli vize türleri bulunmaktadır. Örneğin, çalışma vizesi, seyahat vizesi ve eğitim vizesi gibi
                                        farklı vize türleri, kişinin seyahat amacına göre değişiklik göstermektedir.
                                    </p>
                                    <p>
                                        Her ülkenin kendi vize politikaları ve gereksinimleri bulunmaktadır. Vize başvurusu yapmadan önce,
                                        gidilecek ülkenin vize şartlarını ve gerekli belgeleri öğrenmek önemlidir.
                                    </p>

                                    <h2>Vize Nasıl Alınır?</h2>
                                    <p>
                                        Vize başvurusu yapmadan önce, profesyonel bir danışmanlık hizmeti almanızı öneririz.
                                        Öncelikle hangi vize türüne ihtiyacınız olduğunu belirlemelisiniz. Ardından, doğru belgeleri toplamalı ve
                                        seyahat amacınızı net bir şekilde belirtmelisiniz. Vize başvuru sürecinde dikkat edilmesi gereken birçok detay bulunmaktadır.
                                    </p>
                                    <p>
                                        Detaylı bilgi için bizimle iletişime geçebilirsiniz. Uzman ekibimiz, vize başvuru sürecinizde size rehberlik edecek ve
                                        tüm adımları birlikte tamamlayacağız.
                                    </p>

                                    <h2>Yurtdışı çalışma için vize başvuruları</h2>
                                    <p>
                                        Yurtdışında çalışmak, kariyerinizi geliştirmek ve yeni deneyimler kazanmak için harika bir fırsattır.
                                        Farklı ülkelerde çalışma fırsatları, mesleki gelişiminize katkı sağlayabilir ve yeni bir dil öğrenmenize yardımcı olabilir.
                                    </p>
                                    <p>
                                        Yurtdışında çalışmak için vize başvurusu yapmadan önce, hedef ülkenin çalışma vize şartlarını detaylı bir şekilde araştırmalısınız.
                                        İyi bir vize danışmanlığı hizmeti almak, başvuru sürecinizi kolaylaştıracaktır. Ayrıca, kültürel adaptasyon için en az bir yıl kalış süresi
                                        önerilmektedir.
                                    </p>

                                    <h2>Seyahat Vizesi Başvuruları</h2>
                                    <p>
                                        Seyahat vizesi, turistik amaçlı seyahatler için gerekli olan vize türüdür. Birçok ülke, turistler için farklı vize politikaları uygulamaktadır.
                                        Bazı ülkeler vize muafiyeti sunarken, bazıları için önceden vize başvurusu yapılması gerekmektedir.
                                    </p>
                                    <p>
                                        Seyahat vizesi başvurusu yaparken, seyahat amacınızı net bir şekilde belirtmeli ve gerekli tüm belgeleri eksiksiz olarak hazırlamalısınız.
                                        Pasaport geçerliliği, seyahat sigortası ve konaklama rezervasyonları gibi belgeler genellikle istenmektedir.
                                    </p>
                                </div>
                            </article>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}

