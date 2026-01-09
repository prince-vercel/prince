import React from 'react'

const privacy = () => {
  return (
    <div className="privacy-container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto',marginTop:'80px'  }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', color: '#333' }}>
        Gizlilik Politikası
      </h1>

      <p style={{ marginBottom: '20px', lineHeight: '1.8', color: '#555' }}>
        Prince olarak, ziyaretçilerimizin ve kullanıcılarımızın gizliliğini korumaya büyük önem veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde hangi kişisel verilerin toplandığını, nasıl kullanıldığını, korunduğunu ve haklarınızı açıklamaktadır.
      </p>

      {/* Section 1 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }}>
        1. Toplanan Bilgiler
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }}>Web sitemizi kullandığınızda aşağıdaki bilgiler toplanabilir:</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        <li>Ad, soyad</li>
        <li>E-posta adresi</li>
        <li>Telefon numarası</li>
        <li>IP adresi</li>
        <li>Cihaz, tarayıcı ve kullanım bilgileri</li>
        <li>Çerez (cookie) verileri</li>
        <li>İletişim veya başvuru formları aracılığıyla iletilen bilgiler</li>
      </ul>

      {/* Section 2 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }}>
        2. Kişisel Verilerin Toplanma Yöntemi
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }}>Kişisel verileriniz aşağıdaki yollarla toplanmaktadır:</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        <li>Web sitemizi ziyaret ettiğinizde</li>
        <li>Üyelik oluşturduğunuzda</li>
        <li>İletişim formlarını doldurduğunuzda</li>
        <li>Hizmetlerimizden yararlandığınızda</li>
      </ul>
      <p style={{ marginBottom: '20px', color: '#555' }}>
        Veriler otomatik veya otomatik olmayan yollarla toplanmaktadır.
      </p>

      {/* Section 3 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }}>
        3. Kişisel Verilerin Kullanım Amaçları
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }}>Toplanan veriler aşağıdaki amaçlarla kullanılabilir:</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        <li>Hizmetlerin sunulması ve geliştirilmesi</li>
        <li>Kullanıcı taleplerinin karşılanması</li>
        <li>İletişim faaliyetlerinin yürütülmesi</li>
        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
        <li>Sistem güvenliğinin sağlanması</li>
        <li>Pazarlama ve analiz faaliyetleri (izin verilmesi halinde)</li>
      </ul>

      {/* Section 4 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }}>
        4. Kişisel Verilerin Paylaşılması
      </h2>
      <p style={{ marginBottom: '10px', color: '#555' }}>Kişisel verileriniz aşağıdaki durumlarda paylaşılabilir:</p>
      <ul style={{ marginBottom: '20px', paddingLeft: '40px', color: '#555', lineHeight: '1.8' }}>
        <li>Yasal zorunluluklar halinde yetkili kamu kurumlarıyla</li>
        <li>Hizmet alınan üçüncü taraflarla (hosting, altyapı, e-posta hizmetleri vb.)</li>
        <li>Açık rızanız bulunması halinde</li>
      </ul>

      {/* Section 5 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }}>
        5. Kişisel Verilerin Saklanması ve Güvenliği
      </h2>
      <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.8' }}>
        Kişisel verileriniz, ilgili mevzuatta öngörülen süreler boyunca saklanmakta ve yetkisiz erişime karşı gerekli teknik ve idari tedbirler alınmaktadır.
      </p>

      {/* Section 6 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }}>
        6. Çerezler (Cookies)
      </h2>
      <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.8' }}>
        Web sitemizde kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan çerezleri reddedebilir veya silebilirsiniz.
      </p>

      {/* Section 7 */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#4f8edc' }}>
        7. Gizlilik Politikası Güncellemeleri
      </h2>
      <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.8' }}>
        Bu Gizlilik Politikası gerektiğinde güncellenebilir. Güncel metin her zaman web sitemizde yayınlanır.
      </p>

      <p style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f4f8', borderLeft: '4px solid #4f8edc', color: '#555', lineHeight: '1.8' }}>
        Sorularınız için <strong>info@princetourismagency.com</strong> e-posta adresimize yazabilirsiniz.
      </p>
    </div>
  )
}

export default privacy