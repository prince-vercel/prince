import Link from "next/link"
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import '../../i18n'
import Image from "next/image"

export default function Footer() {
  const { t, isReady } = useSafeTranslation()
  return (
    <>
      <style>{`
        .cs_footer_item a:hover,
        .cs_menu_widget a:hover {
          color: #d7b76e !important;
        }
      `}</style>
           <footer className="cs_footer cs_style_1 cs_heading_color">
        <div className="cs_footer_main"  >
          <div className="container d-flex flex-column">
      
            <div className="row align-items-start" style={{gap:'150px', }}>

              <div className="col-lg-4">
                <div className="cs_footer_item">
                  <p suppressHydrationWarning>
                    {isReady ? t('travel.footer.description') : ''} <br />
                 
                  </p>

                  <ul className="cs_contact_widget">
                    <li suppressHydrationWarning>{isReady ? t('travel.footer.address') : ''}</li>
                    <li suppressHydrationWarning>{isReady ? t('travel.footer.phone') : ''}</li>
                    <li suppressHydrationWarning>{isReady ? t('travel.footer.email') : ''}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2">
                <ul className="cs_menu_widget cs_mp0">
                  <li><Link href="/travel" suppressHydrationWarning>{isReady ? t('travel.footer.home') : ''}</Link></li>
                  <li><Link href="/travel/all" suppressHydrationWarning>{isReady ? t('travel.footer.tours') : ''}</Link></li>
                  <li><Link href="/travel/blog" suppressHydrationWarning>{isReady ? t('travel.footer.blog') : ''}</Link></li>
                  <li><Link href="/travel/about" suppressHydrationWarning>{isReady ? t('travel.footer.about') : ''}</Link></li>
                  <li><Link href="/travel/contact" suppressHydrationWarning>{isReady ? t('travel.footer.contact') : ''}</Link></li>
                </ul>
              </div>

              <div className="col-lg-2">
                <ul className="cs_menu_widget cs_mp0">
                  <li><Link href="/travel/faqs" suppressHydrationWarning>{isReady ? t('travel.footer.faq') : ''}</Link></li>
                  <li><Link href="/travel/privacy" suppressHydrationWarning>{isReady ? t('travel.footer.privacy') : ''}</Link></li>
                  <li><Link href="/travel/kvkk" suppressHydrationWarning>{isReady ? t('travel.footer.kvkk') : ''}</Link></li>
                  <div className="d-flex justify-content-center mb-4">
                            <Image src="/assets/logo/logo-goldd.png" alt="Logo" width={120} height={80} className="img-fluid" />
                          </div>
                </ul>
              </div>

            

            </div>
          </div>
        </div>

        <div className="cs_footer_bottom cs_accent_bg"style={{ backgroundColor: '#d7b76e' }}
>
          <div className="container">
            <div className="cs_footer_bottom_in">
              <div className="cs_social_links">
                <Link href="#"><i className="fa-brands fa-facebook-f" style={{ color: 'white' }}></i></Link>
                <Link href="#"><i className="fa-brands fa-instagram" style={{ color: 'white' }}></i></Link>
                <Link href="#"><i className="fa-brands fa-whatsapp" style={{ color: 'white' }}></i></Link>
              </div>

              <div className="cs_copyright" suppressHydrationWarning>
                {isReady ? t('travel.footer.copyright') : ''}
              </div>
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
