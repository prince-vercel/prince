import Link from "next/link"
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import '../../i18n'

export default function Footer() {
  const { t, isReady } = useSafeTranslation()
  const currentYear = new Date().getFullYear()
  return (
    <>
      <footer className="cs_footer cs_style_1 cs_heading_color">
        <div className="cs_footer_main">
          <div className="container">
            <div className="row">

              <div className="col-lg-4">
                <div className="cs_footer_item">
                  <p suppressHydrationWarning>
                    {isReady ? t('medical.footer.description') : ''} <br />
                  </p>

                  <ul className="cs_contact_widget">
                    <li suppressHydrationWarning>{isReady ? t('medical.footer.address') : ''}</li>
                    <li suppressHydrationWarning>{isReady ? t('medical.footer.phone') : ''}</li>
                    <li suppressHydrationWarning>{isReady ? t('medical.footer.email') : ''}</li>
                    <li suppressHydrationWarning>{isReady ? t('medical.footer.medicalEmail') : ''}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2">
                <ul className="cs_menu_widget cs_mp0">
                  <li><Link href="/medical" suppressHydrationWarning>{isReady ? t('medical.footer.home') : ''}</Link></li>
                  <li><Link href="/medical/organisation" suppressHydrationWarning>{isReady ? t('medical.footer.organisation') : ''}</Link></li>
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
                </ul>
              </div>

              <div className="col-lg-4">
                <div className="cs_newsletter cs_style1">
                  <h2 className="cs_newsletter_title" suppressHydrationWarning>{isReady ? t('medical.footer.newsletter.title') : ''}</h2>
                  <p suppressHydrationWarning>
                    {isReady ? t('medical.footer.newsletter.description') : ''}
                  </p>

                  <form
                    className="cs_newsletter_form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="email"
                      className="cs_newsletter_input"
                      placeholder={isReady ? t('medical.footer.newsletter.placeholder') : ''}
                      suppressHydrationWarning
                    />
                    <button className="cs_btn cs_style_1" suppressHydrationWarning>
                      <span>{isReady ? t('medical.footer.newsletter.submit') : ''}</span>
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="cs_footer_bottom cs_accent_bg">
          <div className="container">
            <div className="cs_footer_bottom_in">
              <div className="cs_social_links">
                <Link href="#"><i className="fa-brands fa-facebook-f"></i></Link>
                <Link href="#"><i className="fa-brands fa-instagram"></i></Link>
                 <Link href="#"><i className="fa-brands fa-whatsapp"></i></Link>

              </div>

              <div className="cs_copyright" suppressHydrationWarning>
                {isReady ? t('medical.footer.copyright', { year: currentYear }) : ''}
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
