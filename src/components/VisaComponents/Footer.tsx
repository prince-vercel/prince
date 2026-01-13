import Image from 'next/image'
import Link from 'next/link'

export default function VisaFooter() {
    return (
        <footer id="footer">
            <div className="container">
                <div className="main-inner">
                    <div className="left-side">
                        {/* Top Section: Logo + Phone + Social */}
                        <div className="left-side-top">
                            <div className="footer-card">
                                <span className="logo">
                                    <Image
                                        src="/visa/assets/img/logo/logo.svg"
                                        alt="Çilek Vize"
                                        width={104}
                                        height={50}
                                        loading="lazy"
                                    />
                                </span>
                                <div className="body-sm">
                                    <p>
                                        Çilek Vize ile Resmi Belgelerinizi<br />
                                        Hızlı bir şekilde alın..
                                    </p>
                                </div>
                            </div>
                            <div className="footer-social-box">
                                <a
                                    title="0850 888 70 71"
                                    href="tel:0850 888 70 71"
                                    className="link-elem heading-4"
                                >
                                    <span className="icon">
                                        <Image
                                            src="/visa/assets/img/icon/phone-green.svg"
                                            alt="Phone"
                                            width={28}
                                            height={28}
                                            loading="lazy"
                                        />
                                    </span>
                                    0850 888 70 71
                                </a>
                                <div className="social-list">
                                    <a
                                        title="Facebook"
                                        href="https://www.facebook.com/cilekvize"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/visa/assets/img/icon/social/facebook.svg"
                                            alt="Facebook"
                                            width={9}
                                            height={15}
                                            loading="lazy"
                                        />
                                    </a>
                                    <a
                                        title="Instagram"
                                        href="https://www.instagram.com/turkiyeninvizecisi"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/visa/assets/img/icon/social/instagram.svg"
                                            alt="Instagram"
                                            width={15}
                                            height={15}
                                            loading="lazy"
                                        />
                                    </a>
                                    <a
                                        title="X"
                                        href="https://x.com/cilekvize?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/visa/assets/img/icon/social/x.svg"
                                            alt="X"
                                            width={19}
                                            height={15}
                                            loading="lazy"
                                        />
                                    </a>
                                    <a
                                        title="LinkedIn"
                                        href="https://www.linkedin.com/company/cilekvize/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/visa/assets/img/icon/linkedin.svg"
                                            alt="LinkedIn"
                                            width={19}
                                            height={15}
                                            loading="lazy"
                                        />
                                    </a>
                                    <a
                                        title="YouTube"
                                        href="https://www.youtube.com/channel/UCszeNMk_76nfPkl8YPLjqSw"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/visa/assets/img/icon/youtube.svg"
                                            alt="YouTube"
                                            width={19}
                                            height={15}
                                            loading="lazy"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Center Section: Menu Columns */}
                        <div className="left-side-center">
                            <div className="menu-col">
                                <span className="body-sm">Çilek Vize Hakkında</span>
                                <ul className="primary-list">
                                    <li>
                                        <Link href="#" title="Neden Çilek Vize?">
                                            <i className="icofont-minus"></i>
                                            Neden Çilek Vize?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/hakkimizda" title="Hakkımızda">
                                            <i className="icofont-minus"></i>
                                            Hakkımızda
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/iletisim" title="Bize Ulaşın - İletişim">
                                            <i className="icofont-minus"></i>
                                            Bize Ulaşın - İletişim
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="menu-col">
                                <span className="body-sm">Popüler Destinasyonlar</span>
                                <ul className="primary-list">
                                    <li>
                                        <Link href="/visa/ingiltere" title="İngiltere">
                                            <i className="icofont-minus"></i>
                                            İngiltere
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/almanya" title="Almanya">
                                            <i className="icofont-minus"></i>
                                            Almanya
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/amerika" title="Amerika">
                                            <i className="icofont-minus"></i>
                                            Amerika
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/fransa" title="Fransa">
                                            <i className="icofont-minus"></i>
                                            Fransa
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/hollanda" title="Hollanda">
                                            <i className="icofont-minus"></i>
                                            Hollanda
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/italya" title="İtalya">
                                            <i className="icofont-minus"></i>
                                            İtalya
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/kanada" title="Kanada">
                                            <i className="icofont-minus"></i>
                                            Kanada
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/yunanistan" title="Yunanistan">
                                            <i className="icofont-minus"></i>
                                            Yunanistan
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/ispanya" title="İspanya">
                                            <i className="icofont-minus"></i>
                                            İspanya
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="menu-col">
                                <span className="body-sm">Bilgi Bankası</span>
                                <ul className="primary-list">
                                    <li>
                                        <Link
                                            href="/visa/schengen-vizesi-nedir-nasil-alinir"
                                            title="Schengen Vizesi Nedir? Nasıl Alınır?"
                                        >
                                            <i className="icofont-minus"></i>
                                            Schengen Vizesi Nedir? Nasıl Alınır?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/visa/en-kolay-schengen-vizesi-veren-ulkeler"
                                            title="En Kolay Schengen Vizesi Veren Ülkeler"
                                        >
                                            <i className="icofont-minus"></i>
                                            En Kolay Schengen Vizesi Veren Ülkeler
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/visa/cascade-kurali-nedir"
                                            title="Cascade Kuralı Nedir?"
                                        >
                                            <i className="icofont-minus"></i>
                                            Cascade Kuralı Nedir?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/c-tipi-vize-nedir" title="C Tipi Vize Nedir?">
                                            <i className="icofont-minus"></i>
                                            C Tipi Vize Nedir?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/d-tipi-vize-nedir" title="D Tipi Vize Nedir?">
                                            <i className="icofont-minus"></i>
                                            D Tipi Vize Nedir?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/visa/muvafakatname-nedir" title="Muvafakatname Nedir?">
                                            <i className="icofont-minus"></i>
                                            Muvafakatname Nedir?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/visa/idata-vize-randevusu-alamiyorum"
                                            title="iData Vize Randevusu Alamıyorum, Ne Yapmalıyım?"
                                        >
                                            <i className="icofont-minus"></i>
                                            iData Vize Randevusu Alamıyorum, Ne Yapmalıyım?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/visa/kosmos-vize-randevusu-alamiyorum"
                                            title="Kosmos Vize Randevusu Alamıyorum, Ne Yapmalıyım?"
                                        >
                                            <i className="icofont-minus"></i>
                                            Kosmos Vize Randevusu Alamıyorum, Ne Yapmalıyım?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/visa/yunanistan-vizesi-kac-gunde-cikar"
                                            title="Yunanistan Vizesi Kaç Günde Çıkar?"
                                        >
                                            <i className="icofont-minus"></i>
                                            Yunanistan Vizesi Kaç Günde Çıkar?
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Section: Sponsorship + Legal Links + Copyright */}
                        <div className="left-side-bottom">
                            {/* Sponsorship/Reference Box */}
                            <div
                                className="footer-sponsorship-box w-100"
                                style={{ justifyContent: 'space-between' }}
                            >
                                <div className="align-items-center d-flex justify-content-between justify-content-center footerReferanceArae">
                                    <div className="footerReferanceItem align-items-center d-flex flex-column justify-content-center">
                                        <Image
                                            src="/visa/assets/img/bursaspor.webp"
                                            alt="Bursaspor"
                                            width={71}
                                            height={81}
                                            loading="lazy"
                                        />
                                        <p
                                            className="text-center"
                                            style={{
                                                marginTop: '5px',
                                                fontSize: '9px',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Official Partner of <br /> Bursaspor
                                        </p>
                                    </div>
                                    <div className="footerReferanceItem align-items-center d-flex flex-column justify-content-center">
                                        <Image
                                            src="/visa/assets/img/adanademir.webp"
                                            alt="Adana Demir Spor"
                                            width={71}
                                            height={81}
                                            loading="lazy"
                                        />
                                        <p
                                            className="text-center"
                                            style={{
                                                marginTop: '5px',
                                                fontSize: '9px',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Official Partner of <br /> Adana Demir Spor
                                        </p>
                                    </div>
                                    <div className="footerReferanceItem align-items-center d-flex flex-column justify-content-center">
                                        <Image
                                            src="/visa/assets/img/kocaeli.webp"
                                            alt="Kocaelispor"
                                            width={71}
                                            height={81}
                                            loading="lazy"
                                        />
                                        <p
                                            className="text-center"
                                            style={{
                                                marginTop: '5px',
                                                fontSize: '9px',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Official Partner of <br /> Kocaelispor
                                        </p>
                                    </div>
                                </div>
                                <a
                                    title="Türsab"
                                    href="https://www.tursab.org.tr/tr/ddsv"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src="/visa/assets/img/tursab-dds-14846.png"
                                        alt="Türsab"
                                        width={200}
                                        height={100}
                                        loading="lazy"
                                    />
                                </a>
                            </div>

                            {/* Legal Links */}
                            <ul className="primary-list type-1">
                                <li>
                                    <Link href="/visa/cerez-politikasi" title="Çerez Politikası">
                                        Çerez Politikası
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/visa/kisisel-verilerin-korunma-kanunu"
                                        title="Kişisel Verilerin Korunma Kanunu"
                                    >
                                        Kişisel Verilerin Korunma Kanunu
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/visa/gizlilik-politikasi" title="Gizlilik Politikası">
                                        Gizlilik Politikası
                                    </Link>
                                </li>
                            </ul>

                            {/* Copyright */}
                            <div className="footer-copyright-box">
                                <p>
                                    Copyright &copy; {new Date().getFullYear()} Çilek Vize Tüm hakları
                                    saklıdır. Tasarım ve Kodlama: TheFabrika.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: CTA Box */}
                    <div className="right-side">
                        <div className="footer-feature-box">
                            <div className="content-huge">
                                <span className="body">Başvurunuzu şimdi başlatın!</span>
                                <div className="body-sm">
                                    <p>
                                        Önce randevu sonra ücret ödemesi garantisi ile belgelerinizi hızlı
                                        bir şekilde alın. Çilek Vize ile tüm işlemleriniz kolaylıkla
                                        tamamlanıyor!
                                    </p>
                                </div>
                                <Link
                                    href="/visa/basvuru-yap"
                                    title="Başvurunuzu Başlatın"
                                    className="btn btn-primary"
                                >
                                    Başvurunuzu Başlatın
                                </Link>
                            </div>
                            <div className="pattern">
                                <Image
                                    src="/visa/assets/img/pattern/comment-green.svg"
                                    alt="Comment"
                                    width={300}
                                    height={300}
                                    loading="lazy"
                                />
                            </div>
                            <div className="image">
                                <Image
                                    src="/visa/assets/img/small-images/person-keeps-passport-and-phone5e1f.png"
                                    alt="Person"
                                    width={308}
                                    height={358}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

