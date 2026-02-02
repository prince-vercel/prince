import Image from 'next/image'
import Link from 'next/link'
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import '../../i18n'

export default function VisaFooter() {
    const { t, isReady } = useSafeTranslation()
    const currentYear = new Date().getFullYear()

    return (
        <>
            <style>{`
                .visa-footer-wrapper .cs_footer_item a:hover,
                .visa-footer-wrapper .cs_menu_widget a:hover {
                    color: #C42127 !important;
                }
            `}</style>
            <div className="visa-footer-wrapper">
                <footer className="cs_footer cs_style_1 cs_heading_color" style={{ padding: '80px 0 0', backgroundColor: '#fff'}}>
                    <div className="cs_footer_main" style={{ padding: '60px 0' }}>
                        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
                            <div className="row" style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -15px', gap:'150px' }}>
                                <div className="col-lg-4" style={{ flex: '0 0 33.333333%', maxWidth: '33.333333%', padding: '0 15px' }}>
                                    <div className="cs_footer_item" style={{ marginBottom: '30px' }}>
                                        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', marginBottom: '20px' }} suppressHydrationWarning>
                                            {isReady ? t('visa.footer.description').split('\n').map((line: string, i: number) => (
                                                <span key={i}>{line}{i === 0 && <br />}</span>
                                            )) : ''}
                                        </p>
                                        <ul className="cs_contact_widget" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            <li style={{ fontSize: '16px', lineHeight: '1.8', color: '#666', marginBottom: '10px' }} suppressHydrationWarning>
                                                {isReady ? t('visa.footer.address') : ''}
                                            </li>
                                            <li style={{ fontSize: '16px', lineHeight: '1.8', color: '#666', marginBottom: '10px' }} suppressHydrationWarning>
                                               +90 212 999 59 69

                                            </li>
                                            <li style={{ fontSize: '16px', lineHeight: '1.8', color: '#666', marginBottom: '10px' }} suppressHydrationWarning>
                                                <a href={`mailto:${isReady ? t('visa.footer.email') : ''}`} style={{ color: '#666', textDecoration: 'none' }}>
                                                    {isReady ? t('visa.footer.email') : ''}
                                                </a>
                                            </li>
                                            <li style={{ fontSize: '16px', lineHeight: '1.8', color: '#666', marginBottom: '10px' }} suppressHydrationWarning>

                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-2" style={{ flex: '0 0 16.666667%', maxWidth: '16.666667%', padding: '0 15px' }}>
                                    <ul className="cs_menu_widget cs_mp0" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        <li style={{ marginBottom: '12px' }}>
                                            <Link href="/visa" style={{ fontSize: '16px', color: '#333', textDecoration: 'none', transition: 'color 0.3s' }} suppressHydrationWarning>
                                                {isReady ? t('visa.footer.home') : ''}
                                            </Link>
                                        </li>
                                        <li style={{ marginBottom: '12px' }}>
                                            <Link href="/visa/nasil-vize-alirim" style={{ fontSize: '16px', color: '#333', textDecoration: 'none', transition: 'color 0.3s' }} suppressHydrationWarning>
                                                {isReady ? t('visa.footer.howToGetVisa') : ''}
                                            </Link>
                                        </li>
                                        <li style={{ marginBottom: '12px' }}>
                                            <Link href="/visa/blog" style={{ fontSize: '16px', color: '#333', textDecoration: 'none', transition: 'color 0.3s' }} suppressHydrationWarning>
                                                {isReady ? t('visa.footer.blog') : ''}
                                            </Link>
                                        </li>
                                        <li style={{ marginBottom: '12px' }}>
                                            <Link href="/visa/hakkimizda" style={{ fontSize: '16px', color: '#333', textDecoration: 'none', transition: 'color 0.3s' }} suppressHydrationWarning>
                                                {isReady ? t('visa.footer.about') : ''}
                                            </Link>
                                        </li>
                                        <li style={{ marginBottom: '12px' }}>
                                            <Link href="/visa/iletisim" style={{ fontSize: '16px', color: '#333', textDecoration: 'none', transition: 'color 0.3s' }} suppressHydrationWarning>
                                                {isReady ? t('visa.footer.contact') : ''}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-lg-2" style={{ flex: '0 0 16.666667%', maxWidth: '16.666667%', padding: '0 15px' }}>
                                    <ul className="cs_menu_widget cs_mp0" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        <li style={{ marginBottom: '12px' }}>
                                            <Link href="/visa/sss" style={{ fontSize: '16px', color: '#333', textDecoration: 'none', transition: 'color 0.3s' }} suppressHydrationWarning>
                                                {isReady ? t('visa.footer.faq') : ''}
                                            </Link>
                                        </li>
                                        <li style={{ marginBottom: '12px' }}>
                                            <Link href="/visa/gizlilik-politikasi" style={{ fontSize: '16px', color: '#333', textDecoration: 'none', transition: 'color 0.3s' }} suppressHydrationWarning>
                                                {isReady ? t('visa.footer.privacy') : ''}
                                            </Link>
                                        </li>
                                        <li style={{ marginBottom: '12px' }}>
                                            <Link href="/visa/kisisel-verilerin-korunma-kanunu" style={{ fontSize: '16px', color: '#333', textDecoration: 'none', transition: 'color 0.3s' }} suppressHydrationWarning>
                                                {isReady ? t('visa.footer.kvkk') : ''}
                                            </Link>
                                        </li>
                                         <div className="d-flex justify-content-center">
                                                      <Image src="/visa/assets/img/prince-logo-red.png" alt="Logo" width={120} height={80} className="img-fluid" style={{marginRight:'40px'}} />
                                                    </div>
                                    </ul>
                                </div>

                               
                            </div>
                        </div>
                    </div>

                    <div className="cs_footer_bottom cs_accent_bg" style={{ backgroundColor: '#C42127', padding: '25px 0' }}>
                        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
                            <div className="cs_footer_bottom_in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                                <div className="cs_social_links" style={{ display: 'flex', gap: '10px' }}>
                                    <a
                                        title="WhatsApp"
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: 'white',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'white'
                                        }}
                                    >
                                        <Image
                                            src="/visa/assets/img/icon/whatsapp.svg"
                                            alt="WhatsApp"
                                            width={18}
                                            height={18}
                                            loading="lazy"
                                        />
                                    </a>
                                    <a
                                        title="Facebook"
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: 'white',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'white'
                                        }}
                                    >
                                        <Image
                                            src="/visa/assets/img/icon/social/facebook.svg"
                                            alt="Facebook"
                                            width={18}
                                            height={18}
                                            loading="lazy"
                                        />
                                    </a>
                                    <a
                                        title="Instagram"
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: 'white',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'white'
                                        }}
                                    >
                                        <Image
                                            src="/visa/assets/img/icon/social/instagram.svg"
                                            alt="Instagram"
                                            width={18}
                                            height={18}
                                            loading="lazy"
                                        />
                                    </a>
                                </div>

                                <div className="cs_copyright" style={{ color: 'white', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }} suppressHydrationWarning>
                                    {isReady ? t('visa.footer.copyright', { year: currentYear }) : ''}
                                  
                                </div>
                                   <Image
                                                  src="/assets/images/tursab.png" // Görsel yolunu buraya koy
                                                  alt="Small Logo"
                                                  width={150} // Increased width
                                                  height={100} // Increased height
                                                  style={{ objectFit: 'contain' }}
                                                  loading="lazy"
                                                />
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
