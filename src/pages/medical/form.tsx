'use client'
import { useState } from 'react'
import Footer from '@/src/components/MedicalComponents/Footer'
import Header from '@/src/components/MedicalComponents/Header'
import Image from 'next/image'
import Link from 'next/link'

// CheckboxOption component'ini dışarıda tanımla
const CheckboxOption = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <div 
    onClick={onClick}
    style={{
      padding: '8px 10px',
      border: selected ? '2px solid #0066cc' : '2px solid #e0e0e0',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: selected ? '#e6f2ff' : '#fff',
      marginBottom: '10px',
      marginRight: '10px',
      fontWeight: selected ? '500' : '400',
      color: selected ? '#0066cc' : '#333',
      fontSize: '14px',
      display: 'inline-block',
      textAlign: 'center',
      marginLeft:'10px',
      marginTop:'10px'
    }}
  >
    {label}
  </div>
)

export default function AppointmentSection() {
  const [travelTime, setTravelTime] = useState('Net Tarih')
  const [chronicDisease, setChronicDisease] = useState('Hayır')
  const [airport, setAirport] = useState('İstanbul Havalimanı')
  const [operation, setOperation] = useState('Saç Ekimi')
  const [gender, setGender] = useState('')
  const [heartDisease, setHeartDisease] = useState('')
  const [diabetes, setDiabetes] = useState('')
  const [hypertension, setHypertension] = useState('')
  const [cancer, setCancer] = useState('')
  const [smoking, setSmoking] = useState('')
  const [alcohol, setAlcohol] = useState('')
  const [drugs, setDrugs] = useState('')
  const [medication, setMedication] = useState('')
  const [allergy, setAllergy] = useState('')
  const [surgery, setSurgery] = useState('')
  const [anesthesia, setAnesthesia] = useState('')
  const [pregnancy, setPregnancy] = useState('')
  const [breastfeeding, setBreastfeeding] = useState('')
  const [personCount, setPersonCount] = useState('')
  const [ticketStatus, setTicketStatus] = useState('')
  const [hotelNeed, setHotelNeed] = useState('')
  const [vipTransfer, setVipTransfer] = useState('')
  const [vehicleChoice, setVehicleChoice] = useState('')
  const [consultation, setConsultation] = useState('')
  const [firstSurgery, setFirstSurgery] = useState('')

  return (
    <>
      <Header/>
      <section className="cs_appointment_section_1 cs_bg_filed">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/medical">Anasayfa</Link>
            </li>
          <li className="breadcrumb-item active">Başvuru</li>
          </ol>
          <div className="cs_height_132"></div>
          
          <div className="cs_appointment_img">
            <Image 
              src="/assets/img/home_2/appointment_img.png" 
              alt="Appointment" 
              width={600} 
              height={600} 
            />
          </div>

          <div style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            padding: '40px',
            marginTop: '40px',
            border: '1px solid #e8e8e8'
          }}>
            <form className="row">
              
              {/* 1️⃣ Kişisel Bilgiler */}
              <div className="col-12">
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '28px',
                  marginTop: '8px',
                  color: '#1a1a1a'
                }}>Kişisel Bilgiler</h3>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Ad Soyad</label>
                <input type="text" className="cs_form_field" />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Doğum Tarihi</label>
                <input type="date" className="cs_form_field" />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Cinsiyet</label>
                <CheckboxOption label="Kadın" selected={gender === 'Kadın'} onClick={() => setGender('Kadın')} />
                <CheckboxOption label="Erkek" selected={gender === 'Erkek'} onClick={() => setGender('Erkek')} />
                <CheckboxOption label="Belirtmek İstemiyorum" selected={gender === 'Belirtmek İstemiyorum'} onClick={() => setGender('Belirtmek İstemiyorum')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Uyruk</label>
                <input type="text" className="cs_form_field" />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Telefon (WhatsApp)</label>
                <input type="text" className="cs_form_field" />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">E-posta</label>
                <input type="email" className="cs_form_field" />
                <div className="cs_height_42"></div>
              </div>

              {/* 2️⃣ Medikal Geçmiş */}
              <div className="col-12" style={{marginTop:'10px'}}>
                <div className="cs_height_60"></div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '28px',
                  color: '#1a1a1a'
                }}>Medikal Geçmiş</h3>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Kronik Hastalığınız Var mı?</label>
                <CheckboxOption label="Hayır" selected={chronicDisease === 'Hayır'} onClick={() => setChronicDisease('Hayır')} />
                <CheckboxOption label="Evet" selected={chronicDisease === 'Evet'} onClick={() => setChronicDisease('Evet')} />
                <div className="cs_height_42"></div>
              </div>
              
              {chronicDisease === 'Evet' && (
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">Kronik Hastalık Detayı</label>
                  <input type="text" className="cs_form_field" placeholder="Lütfen belirtiniz..." />
                  <div className="cs_height_42"></div>
                </div>
              )}
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Kalp Rahatsızlığı</label>
                <CheckboxOption label="Hayır" selected={heartDisease === 'Hayır'} onClick={() => setHeartDisease('Hayır')} />
                <CheckboxOption label="Evet" selected={heartDisease === 'Evet'} onClick={() => setHeartDisease('Evet')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Diyabet</label>
                <CheckboxOption label="Hayır" selected={diabetes === 'Hayır'} onClick={() => setDiabetes('Hayır')} />
                <CheckboxOption label="Tip 1" selected={diabetes === 'Tip 1'} onClick={() => setDiabetes('Tip 1')} />
                <CheckboxOption label="Tip 2" selected={diabetes === 'Tip 2'} onClick={() => setDiabetes('Tip 2')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Yüksek Tansiyon</label>
                <CheckboxOption label="Hayır" selected={hypertension === 'Hayır'} onClick={() => setHypertension('Hayır')} />
                <CheckboxOption label="Evet" selected={hypertension === 'Evet'} onClick={() => setHypertension('Evet')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Kanser Geçmişi</label>
                <CheckboxOption label="Hayır" selected={cancer === 'Hayır'} onClick={() => setCancer('Hayır')} />
                <CheckboxOption label="Evet" selected={cancer === 'Evet'} onClick={() => setCancer('Evet')} />
                <div className="cs_height_42"></div>
              </div>

              {/* 3️⃣ Yaşam Alışkanlıkları */}
              <div className="col-12" style={{marginTop:'10px'}}>
                <div className="cs_height_60"></div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '28px',
                  color: '#1a1a1a'
                }}>Yaşam Alışkanlıkları</h3>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Sigara Kullanımı</label>
                <CheckboxOption label="Hayır" selected={smoking === 'Hayır'} onClick={() => setSmoking('Hayır')} />
                <CheckboxOption label="Evet" selected={smoking === 'Evet'} onClick={() => setSmoking('Evet')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Alkol Kullanımı</label>
                <CheckboxOption label="Hayır" selected={alcohol === 'Hayır'} onClick={() => setAlcohol('Hayır')} />
                <CheckboxOption label="Ara Sıra" selected={alcohol === 'Ara Sıra'} onClick={() => setAlcohol('Ara Sıra')} />
                <CheckboxOption label="Düzenli" selected={alcohol === 'Düzenli'} onClick={() => setAlcohol('Düzenli')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Uyuşturucu Madde Kullanımı</label>
                <CheckboxOption label="Hayır" selected={drugs === 'Hayır'} onClick={() => setDrugs('Hayır')} />
                <CheckboxOption label="Evet" selected={drugs === 'Evet'} onClick={() => setDrugs('Evet')} />
                <div className="cs_height_42"></div>
              </div>

              {/* 4️⃣ İlaçlar & Alerjiler */}
              <div className="col-12" style={{marginTop:'10px'}}>
                <div className="cs_height_60"></div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '28px',
                  color: '#1a1a1a'
                }}>İlaçlar & Alerjiler</h3>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Düzenli İlaç Kullanımı</label>
                <CheckboxOption label="Hayır" selected={medication === 'Hayır'} onClick={() => setMedication('Hayır')} />
                <CheckboxOption label="Evet" selected={medication === 'Evet'} onClick={() => setMedication('Evet')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">İlaç / Anestezi Alerjisi</label>
                <CheckboxOption label="Hayır" selected={allergy === 'Hayır'} onClick={() => setAllergy('Hayır')} />
                <CheckboxOption label="Evet" selected={allergy === 'Evet'} onClick={() => setAllergy('Evet')} />
                <div className="cs_height_42"></div>
              </div>

              {/* 5️⃣ Cerrahi Geçmiş */}
              <div className="col-12" style={{marginTop:'10px'}}>
                <div className="cs_height_60"></div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '28px',
                  color: '#1a1a1a'
                }}>Cerrahi Geçmiş</h3>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Daha Önce Ameliyat Oldunuz mu?</label>
                <CheckboxOption label="Hayır" selected={surgery === 'Hayır'} onClick={() => setSurgery('Hayır')} />
                <CheckboxOption label="Evet" selected={surgery === 'Evet'} onClick={() => setSurgery('Evet')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Anestezi Komplikasyonu</label>
                <CheckboxOption label="Hayır" selected={anesthesia === 'Hayır'} onClick={() => setAnesthesia('Hayır')} />
                <CheckboxOption label="Evet" selected={anesthesia === 'Evet'} onClick={() => setAnesthesia('Evet')} />
                <div className="cs_height_42"></div>
              </div>

              {/* 6️⃣ Kadın Hastalar */}
              <div className="col-12" style={{marginTop:'10px'}}>
                <div className="cs_height_60"></div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '28px',
                  color: '#1a1a1a'
                }}>Kadın Hastalar İçin</h3>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Hamilelik Durumu</label>
                <CheckboxOption label="Hayır" selected={pregnancy === 'Hayır'} onClick={() => setPregnancy('Hayır')} />
                <CheckboxOption label="Evet" selected={pregnancy === 'Evet'} onClick={() => setPregnancy('Evet')} />
                <CheckboxOption label="Şüpheli" selected={pregnancy === 'Şüpheli'} onClick={() => setPregnancy('Şüpheli')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Emzirme Durumu</label>
                <CheckboxOption label="Hayır" selected={breastfeeding === 'Hayır'} onClick={() => setBreastfeeding('Hayır')} />
                <CheckboxOption label="Evet" selected={breastfeeding === 'Evet'} onClick={() => setBreastfeeding('Evet')} />
                <div className="cs_height_42"></div>
              </div>

              {/* 7️⃣ Ek Bilgiler */}
              <div className="col-12" style={{marginTop:'10px'}}>
                <div className="cs_height_60"></div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '28px',
                  color: '#1a1a1a'
                }}>Ek Bilgiler</h3>
              </div>
              
              <div className="col-lg-12">
                <label className="cs_input_label cs_heading_color">Doktorun Bilmesi Gereken Ek Bilgi</label>
                <textarea className="cs_form_field" rows={4}></textarea>
                <div className="cs_height_42"></div>
              </div>

              {/* 8️⃣ Seyahat Bilgileri */}
              <div className="col-12" style={{marginTop:'10px'}}>
                <div className="cs_height_60"></div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '28px',
                  color: '#1a1a1a'
                }}>Seyahat Bilgileri</h3>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Türkiye Seyahat Zamanı</label>
                <CheckboxOption label="Net Tarih" selected={travelTime === 'Net Tarih'} onClick={() => setTravelTime('Net Tarih')} />
                <CheckboxOption label="Esnek" selected={travelTime === 'Esnek'} onClick={() => setTravelTime('Esnek')} />
                <div className="cs_height_42"></div>
              </div>
              
              {travelTime === 'Net Tarih' && (
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">Seyahat Tarihi</label>
                  <input type="date" className="cs_form_field" />
                  <div className="cs_height_42"></div>
                </div>
              )}
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Kişi Sayısı</label>
                <CheckboxOption label="Yalnız" selected={personCount === 'Yalnız'} onClick={() => setPersonCount('Yalnız')} />
                <CheckboxOption label="1 Refakatçi" selected={personCount === '1 Refakatçi'} onClick={() => setPersonCount('1 Refakatçi')} />
                <CheckboxOption label="2 veya Daha Fazla" selected={personCount === '2 veya Daha Fazla'} onClick={() => setPersonCount('2 veya Daha Fazla')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Uçak Bileti Durumu</label>
                <CheckboxOption label="Var" selected={ticketStatus === 'Var'} onClick={() => setTicketStatus('Var')} />
                <CheckboxOption label="Yok" selected={ticketStatus === 'Yok'} onClick={() => setTicketStatus('Yok')} />
                <CheckboxOption label="Almayı Planlıyorum" selected={ticketStatus === 'Almayı Planlıyorum'} onClick={() => setTicketStatus('Almayı Planlıyorum')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Varış Havalimanı</label>
                <CheckboxOption label="İstanbul Havalimanı" selected={airport === 'İstanbul Havalimanı'} onClick={() => setAirport('İstanbul Havalimanı')} />
                <CheckboxOption label="Sabiha Gökçen" selected={airport === 'Sabiha Gökçen'} onClick={() => setAirport('Sabiha Gökçen')} />
                <CheckboxOption label="Diğer" selected={airport === 'Diğer'} onClick={() => setAirport('Diğer')} />
                <div className="cs_height_42"></div>
              </div>
              
              {airport === 'Diğer' && (
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">Havalimanı Adı</label>
                  <input type="text" className="cs_form_field" placeholder="Havalimanı adını giriniz..." />
                  <div className="cs_height_42"></div>
                </div>
              )}

              {/* 9️⃣ Konaklama & Transfer */}
              <div className="col-12" style={{marginTop:'10px'}}>
                <div className="cs_height_60"></div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '28px',
                  color: '#1a1a1a'
                }}>Konaklama & Transfer</h3>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Otel İhtiyacı</label>
                <CheckboxOption label="Evet" selected={hotelNeed === 'Evet'} onClick={() => setHotelNeed('Evet')} />
                <CheckboxOption label="Hayır" selected={hotelNeed === 'Hayır'} onClick={() => setHotelNeed('Hayır')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">VIP Transfer</label>
                <CheckboxOption label="Evet" selected={vipTransfer === 'Evet'} onClick={() => setVipTransfer('Evet')} />
                <CheckboxOption label="Hayır" selected={vipTransfer === 'Hayır'} onClick={() => setVipTransfer('Hayır')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Araç Tercihi</label>
                <CheckboxOption label="Vito" selected={vehicleChoice === 'Vito'} onClick={() => setVehicleChoice('Vito')} />
                <CheckboxOption label="Sprinter" selected={vehicleChoice === 'Sprinter'} onClick={() => setVehicleChoice('Sprinter')} />
                <CheckboxOption label="Fark Etmez" selected={vehicleChoice === 'Fark Etmez'} onClick={() => setVehicleChoice('Fark Etmez')} />
                <div className="cs_height_42"></div>
              </div>

              {/* 🔟 Operasyon Detayları */}
              <div className="col-12" style={{marginTop:'10px'}}>
                <div className="cs_height_60"></div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '28px',
                  color: '#1a1a1a'
                }}>Operasyon Detayları</h3>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">İlgilenilen İşlem</label>
                <select 
                  className="cs_select cs_select_fix"
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                >
                  <option>Saç Ekimi</option>
                  <option>Burun Estetiği</option>
                  <option>Meme Estetiği</option>
                  <option>Liposuction</option>
                  <option>BBL</option>
                  <option>Yüz Germe</option>
                  <option>Diş Tedavisi</option>
                  <option>Diğer</option>
                </select>
                <div className="cs_height_42"></div>
              </div>
              
              {operation === 'Diğer' && (
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">İşlem Detayı</label>
                  <input type="text" className="cs_form_field" placeholder="İşlemi belirtiniz..." />
                  <div className="cs_height_42"></div>
                </div>
              )}
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">Daha Önce Danışma Aldınız mı?</label>
                <CheckboxOption label="Hayır" selected={consultation === 'Hayır'} onClick={() => setConsultation('Hayır')} />
                <CheckboxOption label="Evet" selected={consultation === 'Evet'} onClick={() => setConsultation('Evet')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-6">
                <label className="cs_input_label cs_heading_color">İlk Ameliyatınız mı?</label>
                <CheckboxOption label="Evet" selected={firstSurgery === 'Evet'} onClick={() => setFirstSurgery('Evet')} />
                <CheckboxOption label="Hayır" selected={firstSurgery === 'Hayır'} onClick={() => setFirstSurgery('Hayır')} />
                <div className="cs_height_42"></div>
              </div>
              
              <div className="col-lg-12">
                <div className="cs_height_20"></div>
                <button className="cs_btn cs_style_1" type="submit">
                  <span>Formu Gönder</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="cs_height_120"></div>
      </section>
      <Footer/>
      <div className="cs_height_200 cs_height_xl_150 cs_height_lg_110"></div>
    </>
  )
}