import React from 'react'

const kvkk = () => {
  return (
    <div className="kvkk-container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto',marginTop:'80px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', color: '#333' }}>
        KVKK Aydınlatma Metni
      </h1>

      <p style={{ marginBottom: '20px', lineHeight: '1.8', color: '#555' }}>
        6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, veri sorumlusu sıfatıyla Pro Health, kişisel verilerinizi aşağıda açıklanan kapsamda işlemektedir.
      </p>

      {/* Section 1 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#d7b76e' }}>
        1. Veri Sorumlusu
      </h2>
      <div style={{ marginBottom: '20px', paddingLeft: '20px', color: '#555' }}>
        <p><strong>Firma Adı:</strong> prince</p>
        <p><strong>E-posta:</strong> info@princetourismagency.com</p>
      </div>

      {/* Section 2 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#d7b76e' }}>
        2. İşlenen Kişisel Veriler
      </h2>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        <li>Kimlik bilgileri (ad, soyad)</li>
        <li>İletişim bilgileri (e-posta, telefon)</li>
        <li>İşlem güvenliği bilgileri (IP, log kayıtları)</li>
        <li>Kullanıcı işlem bilgileri</li>
      </ul>

      {/* Section 3 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#d7b76e' }}>
        3. Kişisel Verilerin İşlenme Amaçları
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }}>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        <li>Hizmetlerin yürütülmesi</li>
        <li>İletişim faaliyetlerinin gerçekleştirilmesi</li>
        <li>Talep ve şikayetlerin değerlendirilmesi</li>
        <li>Hukuki yükümlülüklerin yerine getirilmesi</li>
        <li>Bilgi güvenliği süreçlerinin yürütülmesi</li>
      </ul>

      {/* Section 4 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#d7b76e' }}>
        4. Kişisel Verilerin Aktarılması
      </h2>
      <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.8' }}>
        Kişisel verileriniz yetkili kamu kurum ve kuruluşlarına ile hizmet alınan üçüncü kişilere, KVKKnın 8. ve 9. maddelerine uygun olarak aktarılabilir.
      </p>

      {/* Section 5 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#d7b76e' }}>
        5. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }}>Kişisel verileriniz aşağıdaki yollarla toplanmaktadır:</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        <li>Web sitesi</li>
        <li>Elektronik formlar</li>
        <li>Çerezler</li>
      </ul>
      <p style={{ marginBottom: '20px', color: '#555' }}>
        Kişisel verileriniz KVKKnın 5. maddesinde belirtilen hukuki sebeplere dayanılarak işlenmektedir.
      </p>

      {/* Section 6 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#d7b76e' }}>
        6. KVKK Kapsamındaki Haklarınız
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }}>KVKKnın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme</li>
        <li>İşlenme amacını öğrenme</li>
        <li>Yanlış veya eksik işlenmişse düzeltilmesini isteme</li>
        <li>Silinmesini veya yok edilmesini isteme</li>
        <li>İşlemlerin üçüncü kişilere bildirilmesini isteme</li>
        <li>Otomatik sistemler ile analiz edilmesine itiraz etme</li>
        <li>Zarara uğramanız halinde tazminat talep etme</li>
      </ul>

      <p style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f4f8', borderLeft: '4px solid #d7b76e', color: '#555', lineHeight: '1.8' }}>
        Başvurularınızı <strong>info@princetourismagency.com</strong> e-posta adresimiz üzerinden iletebilirsiniz.
      </p>
    </div>
  )
}

export default kvkk
