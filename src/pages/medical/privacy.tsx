import { useSafeTranslation } from '@/src/hooks/useSafeTranslation'
import '@/src/i18n'

const privacy = () => {
  const { t, isReady } = useSafeTranslation()
  return (
    <div className="privacy-container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', marginTop: '80px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', color: '#333' }} suppressHydrationWarning>
        {isReady ? t('medical.pages.privacy.title') : 'Gizlilik Politikası'}
      </h1>

      <p style={{ marginBottom: '20px', lineHeight: '1.8', color: '#555' }} suppressHydrationWarning>
        {isReady ? t('medical.pages.privacy.intro') : 'Prince olarak, ziyaretçilerimizin ve kullanıcılarımızın gizliliğini korumaya büyük önem veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde hangi kişisel verilerin toplandığını, nasıl kullanıldığını, korunduğunu ve haklarınızı açıklamaktadır.'}
      </p>

      {/* Section 1 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        1. {isReady ? t('medical.pages.privacy.section1.title') : 'Toplanan Bilgiler'}
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }} suppressHydrationWarning>{isReady ? t('medical.pages.privacy.section1.intro') : 'Web sitemizi kullandığınızda aşağıdaki bilgiler toplanabilir:'}</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        {(isReady ? t('medical.pages.privacy.section1.items', { returnObjects: true }) : ['Ad, soyad', 'E-posta adresi', 'Telefon numarası', 'IP adresi', 'Cihaz, tarayıcı ve kullanım bilgileri', 'Çerez (cookie) verileri', 'İletişim veya başvuru formları aracılığıyla iletilen bilgiler']).map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Section 2 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        2. {isReady ? t('medical.pages.privacy.section2.title') : 'Kişisel Verilerin Toplanma Yöntemi'}
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }} suppressHydrationWarning>{isReady ? t('medical.pages.privacy.section2.intro') : 'Kişisel verileriniz aşağıdaki yollarla toplanmaktadır:'}</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        {(isReady ? t('medical.pages.privacy.section2.items', { returnObjects: true }) : ['Web sitemizi ziyaret ettiğinizde', 'Üyelik oluşturduğunuzda', 'İletişim formlarını doldurduğunuzda', 'Hizmetlerimizden yararlandığınızda']).map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p style={{ marginBottom: '20px', color: '#555' }} suppressHydrationWarning>
        {isReady ? t('medical.pages.privacy.section2.note') : 'Veriler otomatik veya otomatik olmayan yollarla toplanmaktadır.'}
      </p>

      {/* Section 3 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        3. {isReady ? t('medical.pages.privacy.section3.title') : 'Kişisel Verilerin Kullanım Amaçları'}
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }} suppressHydrationWarning>{isReady ? t('medical.pages.privacy.section3.intro') : 'Toplanan veriler aşağıdaki amaçlarla kullanılabilir:'}</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        {(isReady ? t('medical.pages.privacy.section3.items', { returnObjects: true }) : ['Hizmetlerin sunulması ve geliştirilmesi', 'Kullanıcı taleplerinin karşılanması', 'İletişim faaliyetlerinin yürütülmesi', 'Yasal yükümlülüklerin yerine getirilmesi', 'Sistem güvenliğinin sağlanması', 'Pazarlama ve analiz faaliyetleri (izin verilmesi halinde)']).map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Section 4 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        4. {isReady ? t('medical.pages.privacy.section4.title') : 'Kişisel Verilerin Paylaşılması'}
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }} suppressHydrationWarning>{isReady ? t('medical.pages.privacy.section4.intro') : 'Kişisel verileriniz aşağıdaki durumlarda paylaşılabilir:'}</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        {(isReady ? t('medical.pages.privacy.section4.items', { returnObjects: true }) : ['Yasal zorunluluklar halinde yetkili kamu kurumlarıyla', 'Hizmet alınan üçüncü taraflarla (hosting, altyapı, e-posta hizmetleri vb.)', 'Açık rızanız bulunması halinde']).map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Section 5 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        5. {isReady ? t('medical.pages.privacy.section5.title') : 'Kişisel Verilerin Saklanması ve Güvenliği'}
      </h2>
      <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.8' }} suppressHydrationWarning>
        {isReady ? t('medical.pages.privacy.section5.text') : 'Kişisel verileriniz, ilgili mevzuatta öngörülen süreler boyunca saklanmakta ve yetkisiz erişime karşı gerekli teknik ve idari tedbirler alınmaktadır.'}
      </p>

      {/* Section 6 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        6. {isReady ? t('medical.pages.privacy.section6.title') : 'Çerezler (Cookies)'}
      </h2>
      <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.8' }} suppressHydrationWarning>
        {isReady ? t('medical.pages.privacy.section6.text') : 'Web sitemizde kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan çerezleri reddedebilir veya silebilirsiniz.'}
      </p>

      {/* Section 7 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        7. {isReady ? t('medical.pages.privacy.section7.title') : 'Gizlilik Politikası Güncellemeleri'}
      </h2>
      <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.8' }} suppressHydrationWarning>
        {isReady ? t('medical.pages.privacy.section7.text') : 'Bu Gizlilik Politikası gerektiğinde güncellenebilir. Güncel metin her zaman web sitemizde yayınlanır.'}
      </p>

      <p style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f4f8', borderLeft: '4px solid #4f8edc', color: '#555', lineHeight: '1.8' }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: isReady ? t('medical.pages.privacy.contact') : 'Sorularınız için <strong>info@princetourismagency.com</strong> e-posta adresimize yazabilirsiniz.' }} />
    </div>
  )
}

export default privacy