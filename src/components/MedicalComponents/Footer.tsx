import Image from "next/image"
import Link from "next/link"
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import '../../i18n'

export default function Footer() {
  const { t, isReady } = useSafeTranslation()
  const currentYear = new Date().getFullYear()
  return (
    <>
      <footer className="cs_footer cs_style_1 cs_heading_color">
        <div className="cs_footer_main"  >
          <div className="container d-flex flex-column align-items-center">

            <div className="row align-items-start" style={{ gap: '150px', }}>

              <div className="col-lg-4">
                <div className="cs_footer_item">
                  <p suppressHydrationWarning>
                    {isReady ? t('medical.footer.description') : ''} <br />
                  </p>

                  <ul className="cs_contact_widget">
                    <li suppressHydrationWarning>{isReady ? t('medical.footer.address') : ''}</li>
                    <li suppressHydrationWarning>+90 212 999 59 69 <br/>+90 545 770 97 77 </li>

                    <li suppressHydrationWarning>{isReady ? t('medical.footer.email') : ''}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2">
                <ul className="cs_menu_widget cs_mp0">
                  <li><Link href="/medical" suppressHydrationWarning>{isReady ? t('medical.footer.home') : ''}</Link></li>
                  <li><Link href="/medical/blog" suppressHydrationWarning>{isReady ? t('medical.footer.blog') : ''}</Link></li>
                  <li><Link href="/medical/about" suppressHydrationWarning>{isReady ? t('medical.footer.about') : ''}</Link></li>
                  <li><Link href="/medical/contact" suppressHydrationWarning>{isReady ? t('medical.footer.contact') : ''}</Link></li>
                </ul>
              </div>

              <div className="col-lg-2">
                <ul className="cs_menu_widget cs_mp0">
                  <li><Link href="/medical/faq" suppressHydrationWarning>{isReady ? t('medical.footer.faqs') : ''}</Link></li>
                  <li><Link href="/medical/privacy" suppressHydrationWarning>{isReady ? t('medical.footer.privacyPolicy') : ''}</Link></li>
                  <li><Link href="/medical/kvkk" suppressHydrationWarning>{isReady ? t('medical.footer.kvkk') : ''}</Link></li>
                  <div className="d-flex justify-content-center mb-4">
                    <Image src="/assets/logo/logo-mavi.png" alt="Logo" width={120} height={80} className="img-fluid" style={{ marginRight: '40px' }} />
                  </div>
                </ul>
              </div>



            </div>
          </div>
        </div>

        <div className="cs_footer_bottom cs_accent_bg">
          <div className="container">
            <div className="cs_footer_bottom_in">
              <div className="cs_social_links">
                <Link href="https://facebook.com/princemedical.tr"><i className="fa-brands fa-facebook-f"></i></Link>
                <Link href="https://instagram.com/princemedical.tr"><i className="fa-brands fa-instagram"></i></Link>
                <Link href="https://wa.me/905457709777"><i className="fa-brands fa-whatsapp"></i></Link>

              </div>
 
              <div className="cs_copyright" suppressHydrationWarning>
                {isReady ? t('medical.footer.copyright', { year: currentYear }) : ''}
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

      <span className="cs_scrollup">
        <i className="fa-solid fa-arrow-up"></i>
      </span>
    </>
  )
}
