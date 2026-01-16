import { useSafeTranslation } from '@/src/hooks/useSafeTranslation'
import '@/src/i18n'

const kvkk = () => {
  const { t, isReady } = useSafeTranslation()
  return (
    <div className="kvkk-container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', marginTop: '80px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', color: '#333' }} suppressHydrationWarning>
        {isReady ? t('medical.pages.kvkk.title') : 'KVKK Aydınlatma Metni'}
      </h1>

      <p style={{ marginBottom: '20px', lineHeight: '1.8', color: '#555' }} suppressHydrationWarning>
        {isReady ? t('medical.pages.kvkk.intro') : '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, veri sorumlusu sıfatıyla Pro Health, kişisel verilerinizi aşağıda açıklanan kapsamda işlemektedir.'}
      </p>

      {/* Section 1 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        1. {isReady ? t('medical.pages.kvkk.section1.title') : 'Veri Sorumlusu'}
      </h2>
      <div style={{ marginBottom: '20px', paddingLeft: '20px', color: '#555' }}>
        <p suppressHydrationWarning><strong>{isReady ? t('medical.pages.kvkk.section1.companyName') : 'Firma Adı:'}</strong> prince</p>
        <p suppressHydrationWarning><strong>{isReady ? t('medical.pages.kvkk.section1.email') : 'E-posta:'}</strong> info@princetourismagency.com</p>
      </div>

      {/* Section 2 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        2. {isReady ? t('medical.pages.kvkk.section2.title') : 'İşlenen Kişisel Veriler'}
      </h2>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        {(isReady ? t('medical.pages.kvkk.section2.items', { returnObjects: true }) : ['Kimlik bilgileri (ad, soyad)', 'İletişim bilgileri (e-posta, telefon)', 'İşlem güvenliği bilgileri (IP, log kayıtları)', 'Kullanıcı işlem bilgileri']).map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Section 3 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        3. {isReady ? t('medical.pages.kvkk.section3.title') : 'Kişisel Verilerin İşlenme Amaçları'}
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }} suppressHydrationWarning>{isReady ? t('medical.pages.kvkk.section3.intro') : 'Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:'}</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        {(isReady ? t('medical.pages.kvkk.section3.items', { returnObjects: true }) : ['Hizmetlerin yürütülmesi', 'İletişim faaliyetlerinin gerçekleştirilmesi', 'Talep ve şikayetlerin değerlendirilmesi', 'Hukuki yükümlülüklerin yerine getirilmesi', 'Bilgi güvenliği süreçlerinin yürütülmesi']).map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Section 4 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        4. {isReady ? t('medical.pages.kvkk.section4.title') : 'Kişisel Verilerin Aktarılması'}
      </h2>
      <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.8' }} suppressHydrationWarning>
        {isReady ? t('medical.pages.kvkk.section4.text') : 'Kişisel verileriniz yetkili kamu kurum ve kuruluşlarına ile hizmet alınan üçüncü kişilere, KVKKnın 8. ve 9. maddelerine uygun olarak aktarılabilir.'}
      </p>

      {/* Section 5 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        5. {isReady ? t('medical.pages.kvkk.section5.title') : 'Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi'}
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }} suppressHydrationWarning>{isReady ? t('medical.pages.kvkk.section5.intro') : 'Kişisel verileriniz aşağıdaki yollarla toplanmaktadır:'}</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        {(isReady ? t('medical.pages.kvkk.section5.items', { returnObjects: true }) : ['Web sitesi', 'Elektronik formlar', 'Çerezler']).map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p style={{ marginBottom: '20px', color: '#555' }} suppressHydrationWarning>
        {isReady ? t('medical.pages.kvkk.section5.note') : 'Kişisel verileriniz KVKKnın 5. maddesinde belirtilen hukuki sebeplere dayanılarak işlenmektedir.'}
      </p>

      {/* Section 6 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }} suppressHydrationWarning>
        6. {isReady ? t('medical.pages.kvkk.section6.title') : 'KVKK Kapsamındaki Haklarınız'}
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }} suppressHydrationWarning>{isReady ? t('medical.pages.kvkk.section6.intro') : 'KVKKnın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:'}</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        {(isReady ? t('medical.pages.kvkk.section6.items', { returnObjects: true }) : ['Kişisel verilerinizin işlenip işlenmediğini öğrenme', 'İşlenmişse buna ilişkin bilgi talep etme', 'İşlenme amacını öğrenme', 'Yanlış veya eksik işlenmişse düzeltilmesini isteme', 'Silinmesini veya yok edilmesini isteme', 'İşlemlerin üçüncü kişilere bildirilmesini isteme', 'Otomatik sistemler ile analiz edilmesine itiraz etme', 'Zarara uğramanız halinde tazminat talep etme']).map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f4f8', borderLeft: '4px solid #4f8edc', color: '#555', lineHeight: '1.8' }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: isReady ? t('medical.pages.kvkk.contact') : 'Başvurularınızı <strong>info@princetourismagency.com</strong> e-posta adresimiz üzerinden iletebilirsiniz.' }} />
    </div>
  )
}

export default kvkk
