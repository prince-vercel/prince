import Link from "next/link"

export default function Footer() {
  return (
    <>
      <footer className="cs_footer cs_style_1 cs_heading_color">
        <div className="cs_footer_main">
          <div className="container">
            <div className="row">

              <div className="col-lg-4">
                <div className="cs_footer_item">
                  <p>
                    Prince Medikal & <br />
                    Estetik Merkezi
                  </p>

                  <ul className="cs_contact_widget">
                    <li>Kağıthane / İstanbul</li>
                    <li>+90 212 000 00 00</li>
                    <li>info@prince.com</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2">
                <ul className="cs_menu_widget cs_mp0">
                  <li><Link href="/medical">Anasayfa</Link></li>
                  <li><Link href="/medical/organisation">Kurumlar</Link></li>
                  <li><Link href="/medical/blog">Blog</Link></li>
                  <li><Link href="/medical/about">Hakkımızda</Link></li>
                  <li><Link href="/medical/contact">İletişim</Link></li>
                </ul>
              </div>

              <div className="col-lg-2">
                <ul className="cs_menu_widget cs_mp0">
                  <li><Link href="#">Sık Sorulan Sorular</Link></li>
                  <li><Link href="#">Gizlilik Politikası</Link></li>
                  <li><Link href="#">KVKK & Aydınlatma</Link></li>
                </ul>
              </div>

              <div className="col-lg-4">
                <div className="cs_newsletter cs_style1">
                  <h2 className="cs_newsletter_title">Bize Katılın</h2>
                  <p>
                    Kampanyalar, yenilikler ve sağlık içerikleri için e-posta listemize
                    kayıt olun.
                  </p>

                  <form
                    className="cs_newsletter_form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="email"
                      className="cs_newsletter_input"
                      placeholder="E-posta adresiniz"
                    />
                    <button className="cs_btn cs_style_1">
                      <span>Gönder</span>
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
                <Link href="#"><i className="fa-brands fa-youtube"></i></Link>
                <Link href="#"><i className="fa-brands fa-instagram"></i></Link>
              </div>

              <div className="cs_copyright">
                © Happencode. Tüm hakları saklıdır.
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
