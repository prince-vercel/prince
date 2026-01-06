/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import { MedicalFormData } from '@/src/types/medical'

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

// Step Indicator Component
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
    gap: '10px'
  }}>
    {Array.from({ length: totalSteps }).map((_, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: index < currentStep ? '#4f8edc' : index === currentStep - 1 ? '#4f8edc' : '#e0e0e0',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '600',
          fontSize: '14px',
          transition: 'all 0.3s ease'
        }}>
          {index < currentStep - 1 ? '✓' : index + 1}
        </div>
        {index < totalSteps - 1 && (
          <div style={{
            flex: 1,
            height: '3px',
            backgroundColor: index < currentStep - 1 ? '#4f8edc' : '#e0e0e0',
            margin: '0 10px',
            transition: 'background-color 0.3s ease'
          }}></div>
        )}
      </div>
    ))}
  </div>
)

export default function AppointmentSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6

  // Form states
  const [travelTime, setTravelTime] = useState('')
  const [chronicDisease, setChronicDisease] = useState('')
  const [airport, setAirport] = useState('')
  const [operation, setOperation] = useState('')
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
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [chronicDiseaseDetail, setChronicDiseaseDetail] = useState('')
  const [otherAirport, setOtherAirport] = useState('')
  const [otherOperation, setOtherOperation] = useState('')
  const [extraInfo, setExtraInfo] = useState('')

  const validateForm = (formData: any) => {
    const required = [
      { name: 'fullName', label: 'Ad Soyad' },
      { name: 'birthDate', label: 'Doğum Tarihi' },
      { name: 'phone', label: 'Telefon' },
      { name: 'email', label: 'E-posta' },
      { name: 'nationality', label: 'Uyruk' }
    ]

    for (const field of required) {
      if (!formData[field.name]) {
        return false
      }
    }

    return true
  }

  const validateStep = (step: number): boolean => {
    const fullNameInput = (document.querySelector('input[name="fullName"]') as HTMLInputElement)?.value || ''
    const birthDateInput = (document.querySelector('input[name="birthDate"]') as HTMLInputElement)?.value || ''
    const phoneInput = (document.querySelector('input[name="phone"]') as HTMLInputElement)?.value || ''
    const emailInput = (document.querySelector('input[name="email"]') as HTMLInputElement)?.value || ''
    const nationalityInput = (document.querySelector('input[name="nationality"]') as HTMLInputElement)?.value || ''

    if (step === 1) {
      if (!fullNameInput || !birthDateInput || !phoneInput || !emailInput || !nationalityInput || !gender) {
        setErrorMessage('Lütfen tüm alanları doldurunuz')
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
        return false
      }
    } else if (step === 2) {
      if (!chronicDisease || !heartDisease || !diabetes || !hypertension || !cancer) {
        setErrorMessage('Lütfen tüm alanları doldurunuz')
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
        return false
      }
      if (chronicDisease === 'Evet' && !chronicDiseaseDetail) {
        setErrorMessage('Kronik Hastalık Detayı zorunludur')
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
        return false
      }
    } else if (step === 3) {
      if (!smoking || !alcohol || !drugs) {
        setErrorMessage('Lütfen tüm alanları doldurunuz')
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
        return false
      }
    } else if (step === 4) {
      if (!medication || !allergy || !surgery || !anesthesia || !pregnancy || !breastfeeding) {
        setErrorMessage('Lütfen tüm alanları doldurunuz')
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
        return false
      }
    } else if (step === 5) {
      if (!travelTime || !personCount || !ticketStatus || !airport || !hotelNeed || !vipTransfer || !vehicleChoice) {
        setErrorMessage('Lütfen tüm alanları doldurunuz')
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
        return false
      }
      if (travelTime === 'Net Tarih' && !travelDate) {
        setErrorMessage('Seyahat Tarihi zorunludur')
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
        return false
      }
      if (airport === 'Diğer' && !otherAirport) {
        setErrorMessage('Havalimanı Adı zorunludur')
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
        return false
      }
    } else if (step === 6) {
      if (!operation || !consultation || !firstSurgery) {
        setErrorMessage('Lütfen tüm alanları doldurunuz')
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
        return false
      }
      if (operation === 'Diğer' && !otherOperation) {
        setErrorMessage('İşlem Detayı zorunludur')
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
        return false
      }
    }

    return true
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateStep(currentStep)) return

    const formData = {
      fullName: (e.target as any).fullName?.value || '',
      phone: (e.target as any).phone?.value || '',
      email: (e.target as any).email?.value || '',
      nationality: (e.target as any).nationality?.value || '',
      birthDate: (e.target as any).birthDate?.value || ''
    }

    if (!validateForm(formData)) return

    const payload: MedicalFormData = {
      personal: {
        gender,
        phone: formData.phone,
        email: formData.email,
        nationality: formData.nationality,
        birthDate: formData.birthDate,
        fullName: formData.fullName
      },
      medical: {
        chronicDisease,
        chronicDiseaseDetail,
        heartDisease,
        diabetes,
        hypertension,
        cancer,
        medication,
        allergy,
        surgery,
        anesthesia,
        pregnancy,
        breastfeeding
      },
      habits: {
        smoking,
        alcohol,
        drugs
      },
      travel: {
        travelTime,
        travelDate,
        personCount,
        ticketStatus,
        airport,
        otherAirport,
        hotelNeed,
        vipTransfer,
        vehicleChoice
      },
      operation: {
        operation,
        otherOperation,
        consultation,
        firstSurgery
      },
      extraInfo,
      createdAt: serverTimestamp()
    }

    try {
      await addDoc(collection(db, 'medicalforms'), payload)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      ;(e.target as HTMLFormElement).reset()
      
      // Tüm state'leri reset et
      setCurrentStep(1)
      setTravelTime('')
      setChronicDisease('')
      setAirport('')
      setOperation('')
      setGender('')
      setHeartDisease('')
      setDiabetes('')
      setHypertension('')
      setCancer('')
      setSmoking('')
      setAlcohol('')
      setDrugs('')
      setMedication('')
      setAllergy('')
      setSurgery('')
      setAnesthesia('')
      setPregnancy('')
      setBreastfeeding('')
      setPersonCount('')
      setTicketStatus('')
      setHotelNeed('')
      setVipTransfer('')
      setVehicleChoice('')
      setConsultation('')
      setFirstSurgery('')
      setTravelDate('')
      setChronicDiseaseDetail('')
      setOtherAirport('')
      setOtherOperation('')
      setExtraInfo('')
    } catch (error) {
      console.error('Form gönderirken hata oluştu:', error)
      setErrorMessage('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }

  return (
    <>
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#4f8edc',
          color: '#fff',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '14px',
          fontWeight: '500',
          zIndex: 9999,
          animation: 'slideIn 0.3s ease-out'
        }}>
          ✓ Formu başarıyla gönderdin!
        </div>
      )}

      {showError && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#ef4444',
          color: '#fff',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '14px',
          fontWeight: '500',
          zIndex: 9999,
          animation: 'slideIn 0.3s ease-out'
        }}>
          ✗ {errorMessage}
        </div>
      )}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      <section style={{ background: '#4f8edc', padding: '20px 0 20px 0' }}>
        <div className="container" style={{ marginBottom: '20px', marginTop: '-45px' }}>
          <ol className="breadcrumb2" style={{ color: '#fff', marginLeft: '0' }}>
            <li className="breadcrumb-item2" style={{ color: '#fff' }}>
              <Link href="/medical" style={{ color: '#fff' }}>Anasayfa</Link>
            </li>
            <li className="breadcrumb-item2 active" style={{ color: '#fff' }}>Başvuru</li>
          </ol>

          <div className="cs_banner_text">
            <h2 className="cs_banner_title cs_fs_72" style={{ color: '#fff' }}>
              Başvuru Formu
            </h2>
            <p className="cs_banner_subtitle cs_fs_20" style={{ color: '#fff' }}>
              Aşağıdaki formu doldurarak randevu talebinizi oluşturunuz.
            </p>
          </div>
        </div>
      </section>
      <section className="cs_appointment_section_1 cs_bg_filed">
        <div className="container">
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            padding: '40px',
            border: '1px solid #e8e8e8',
            marginTop: '-15px'
          }}>


            {/* Step Indicator */}
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

            <form className="row" onSubmit={handleSubmit}>
            {/* Step 1: Kişisel Bilgiler */}
            {currentStep === 1 && (
              <>
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
                  <input type="text" name="fullName" className="cs_form_field" required />
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">Doğum Tarihi</label>
                  <input type="date" name="birthDate" className="cs_form_field" required />
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Cinsiyet</label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Kadın" selected={gender === 'Kadın'} onClick={() => setGender('Kadın')} />
                      <CheckboxOption label="Erkek" selected={gender === 'Erkek'} onClick={() => setGender('Erkek')} />
                      <CheckboxOption label="Belirtmek İstemiyorum" selected={gender === 'Belirtmek İstemiyorum'} onClick={() => setGender('Belirtmek İstemiyorum')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">Uyruk</label>
                  <input type="text" name="nationality" className="cs_form_field" required />
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">Telefon (WhatsApp)</label>
                  <input type="text" name="phone" className="cs_form_field" required />
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">E-posta</label>
                  <input type="email" name="email" className="cs_form_field" required />
                  <div className="cs_height_42"></div>
                </div>
              </>
            )}

            {/* Step 2: Medikal Geçmiş */}
            {currentStep === 2 && (
              <>
                <div className="col-12">
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '28px',
                    color: '#1a1a1a'
                  }}>Medikal Geçmiş</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Kronik Hastalığınız Var mı?</label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={chronicDisease === 'Hayır'} onClick={() => setChronicDisease('Hayır')} />
                      <CheckboxOption label="Evet" selected={chronicDisease === 'Evet'} onClick={() => setChronicDisease('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                {chronicDisease === 'Evet' && (
                  <div className="col-lg-6">
                    <label className="cs_input_label cs_heading_color">Kronik Hastalık Detayı</label>
                    <input
                      type="text"
                      className="cs_form_field"
                      value={chronicDiseaseDetail}
                      onChange={(e) => setChronicDiseaseDetail(e.target.value)}
                      placeholder="Lütfen belirtiniz..."
                    />
                    <div className="cs_height_42"></div>
                  </div>
                )}
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Kalp Rahatsızlığı</label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={heartDisease === 'Hayır'} onClick={() => setHeartDisease('Hayır')} />
                      <CheckboxOption label="Evet" selected={heartDisease === 'Evet'} onClick={() => setHeartDisease('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Diyabet</label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={diabetes === 'Hayır'} onClick={() => setDiabetes('Hayır')} />
                      <CheckboxOption label="Tip 1" selected={diabetes === 'Tip 1'} onClick={() => setDiabetes('Tip 1')} />
                      <CheckboxOption label="Tip 2" selected={diabetes === 'Tip 2'} onClick={() => setDiabetes('Tip 2')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Yüksek Tansiyon</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={hypertension === 'Hayır'} onClick={() => setHypertension('Hayır')} />
                      <CheckboxOption label="Evet" selected={hypertension === 'Evet'} onClick={() => setHypertension('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Kanser Geçmişi</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={cancer === 'Hayır'} onClick={() => setCancer('Hayır')} />
                      <CheckboxOption label="Evet" selected={cancer === 'Evet'} onClick={() => setCancer('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
              </>
            )}

            {/* Step 3: Yaşam Alışkanlıkları */}
            {currentStep === 3 && (
              <>
                <div className="col-12">
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '28px',
                    color: '#1a1a1a'
                  }}>Yaşam Alışkanlıkları</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Sigara Kullanımı</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={smoking === 'Hayır'} onClick={() => setSmoking('Hayır')} />
                      <CheckboxOption label="Evet" selected={smoking === 'Evet'} onClick={() => setSmoking('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Alkol Kullanımı</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={alcohol === 'Hayır'} onClick={() => setAlcohol('Hayır')} />
                      <CheckboxOption label="Ara Sıra" selected={alcohol === 'Ara Sıra'} onClick={() => setAlcohol('Ara Sıra')} />
                      <CheckboxOption label="Düzenli" selected={alcohol === 'Düzenli'} onClick={() => setAlcohol('Düzenli')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Uyuşturucu Madde Kullanımı</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={drugs === 'Hayır'} onClick={() => setDrugs('Hayır')} />
                      <CheckboxOption label="Evet" selected={drugs === 'Evet'} onClick={() => setDrugs('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
              </>
            )}

            {/* Step 4: İlaçlar & Alerjiler */}
            {currentStep === 4 && (
              <>
                <div className="col-12">
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '28px',
                    color: '#1a1a1a'
                  }}>İlaçlar, Alerjiler & Cerrahi Geçmiş</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Düzenli İlaç Kullanımı</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={medication === 'Hayır'} onClick={() => setMedication('Hayır')} />
                      <CheckboxOption label="Evet" selected={medication === 'Evet'} onClick={() => setMedication('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>İlaç / Anestezi Alerjisi</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={allergy === 'Hayır'} onClick={() => setAllergy('Hayır')} />
                      <CheckboxOption label="Evet" selected={allergy === 'Evet'} onClick={() => setAllergy('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>

                <div className="col-12">
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '28px',
                    marginTop: '40px',
                    color: '#1a1a1a'
                  }}>Cerrahi Geçmiş</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Daha Önce Ameliyat Oldunuz mu?</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={surgery === 'Hayır'} onClick={() => setSurgery('Hayır')} />
                      <CheckboxOption label="Evet" selected={surgery === 'Evet'} onClick={() => setSurgery('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Anestezi Komplikasyonu</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={anesthesia === 'Hayır'} onClick={() => setAnesthesia('Hayır')} />
                      <CheckboxOption label="Evet" selected={anesthesia === 'Evet'} onClick={() => setAnesthesia('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>

                <div className="col-12">
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '28px',
                    marginTop: '40px',
                    color: '#1a1a1a'
                  }}>Kadın Hastalar İçin</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Hamilelik Durumu</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={pregnancy === 'Hayır'} onClick={() => setPregnancy('Hayır')} />
                      <CheckboxOption label="Evet" selected={pregnancy === 'Evet'} onClick={() => setPregnancy('Evet')} />
                      <CheckboxOption label="Şüpheli" selected={pregnancy === 'Şüpheli'} onClick={() => setPregnancy('Şüpheli')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Emzirme Durumu</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={breastfeeding === 'Hayır'} onClick={() => setBreastfeeding('Hayır')} />
                      <CheckboxOption label="Evet" selected={breastfeeding === 'Evet'} onClick={() => setBreastfeeding('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
              </>
            )}

            {/* Step 5: Seyahat & Konaklama */}
            {currentStep === 5 && (
              <>
                <div className="col-12">
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '28px',
                    color: '#1a1a1a'
                  }}>Seyahat Bilgileri</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Türkiye Seyahat Zamanı</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Net Tarih" selected={travelTime === 'Net Tarih'} onClick={() => setTravelTime('Net Tarih')} />
                      <CheckboxOption label="Esnek" selected={travelTime === 'Esnek'} onClick={() => setTravelTime('Esnek')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                {travelTime === 'Net Tarih' && (
                  <div className="col-lg-6">
                    <label className="cs_input_label cs_heading_color">Seyahat Tarihi</label>
                    <input
                      type="date"
                      className="cs_form_field"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                    />
                    <div className="cs_height_42"></div>
                  </div>
                )}
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Kişi Sayısı</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Yalnız" selected={personCount === 'Yalnız'} onClick={() => setPersonCount('Yalnız')} />
                      <CheckboxOption label="1 Refakatçi" selected={personCount === '1 Refakatçi'} onClick={() => setPersonCount('1 Refakatçi')} />
                      <CheckboxOption label="2 veya Daha Fazla" selected={personCount === '2 veya Daha Fazla'} onClick={() => setPersonCount('2 veya Daha Fazla')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Uçak Bileti Durumu</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Var" selected={ticketStatus === 'Var'} onClick={() => setTicketStatus('Var')} />
                      <CheckboxOption label="Yok" selected={ticketStatus === 'Yok'} onClick={() => setTicketStatus('Yok')} />
                      <CheckboxOption label="Almayı Planlıyorum" selected={ticketStatus === 'Almayı Planlıyorum'} onClick={() => setTicketStatus('Almayı Planlıyorum')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Varış Havalimanı</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="İstanbul Havalimanı" selected={airport === 'İstanbul Havalimanı'} onClick={() => setAirport('İstanbul Havalimanı')} />
                      <CheckboxOption label="Sabiha Gökçen" selected={airport === 'Sabiha Gökçen'} onClick={() => setAirport('Sabiha Gökçen')} />
                      <CheckboxOption label="Diğer" selected={airport === 'Diğer'} onClick={() => setAirport('Diğer')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                {airport === 'Diğer' && (
                  <div className="col-lg-6">
                    <label className="cs_input_label cs_heading_color">Havalimanı Adı</label>
                    <input
                      type="text"
                      className="cs_form_field"
                      value={otherAirport}
                      onChange={(e) => setOtherAirport(e.target.value)}
                      placeholder="Havalimanı adını giriniz..."
                    />
                    <div className="cs_height_42"></div>
                  </div>
                )}

                <div className="col-12">
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '28px',
                    marginTop: '40px',
                    color: '#1a1a1a'
                  }}>Konaklama & Transfer</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Otel İhtiyacı</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Evet" selected={hotelNeed === 'Evet'} onClick={() => setHotelNeed('Evet')} />
                      <CheckboxOption label="Hayır" selected={hotelNeed === 'Hayır'} onClick={() => setHotelNeed('Hayır')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>VIP Transfer</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Evet" selected={vipTransfer === 'Evet'} onClick={() => setVipTransfer('Evet')} />
                      <CheckboxOption label="Hayır" selected={vipTransfer === 'Hayır'} onClick={() => setVipTransfer('Hayır')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Araç Tercihi</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Vito" selected={vehicleChoice === 'Vito'} onClick={() => setVehicleChoice('Vito')} />
                      <CheckboxOption label="Sprinter" selected={vehicleChoice === 'Sprinter'} onClick={() => setVehicleChoice('Sprinter')} />
                      <CheckboxOption label="Fark Etmez" selected={vehicleChoice === 'Fark Etmez'} onClick={() => setVehicleChoice('Fark Etmez')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
              </>
            )}

            {/* Step 6: Operasyon & Açıklama */}
            {currentStep === 6 && (
              <>
                <div className="col-12">
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
                    required
                  >
                    <option value="">Lütfen Seçiniz</option>
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
                    <input
                      type="text"
                      className="cs_form_field"
                      value={otherOperation}
                      onChange={(e) => setOtherOperation(e.target.value)}
                      placeholder="İşlemi belirtiniz..."
                    />
                    <div className="cs_height_42"></div>
                  </div>
                )}
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Daha Önce Danışma Aldınız mı?</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={consultation === 'Hayır'} onClick={() => setConsultation('Hayır')} />
                      <CheckboxOption label="Evet" selected={consultation === 'Evet'} onClick={() => setConsultation('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>İlk Ameliyatınız mı?</label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Evet" selected={firstSurgery === 'Evet'} onClick={() => setFirstSurgery('Evet')} />
                      <CheckboxOption label="Hayır" selected={firstSurgery === 'Hayır'} onClick={() => setFirstSurgery('Hayır')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>

                <div className="col-12">
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '28px',
                    marginTop: '40px',
                    color: '#1a1a1a'
                  }}>Ek Bilgiler</h3>
                </div>
                
                <div className="col-lg-12">
                  <label className="cs_input_label cs_heading_color">Doktorun Bilmesi Gereken Ek Bilgi</label>
                  <textarea
                    name="extraInfo"
                    className="cs_form_field"
                    rows={4}
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                  ></textarea>
                  <div className="cs_height_42"></div>
                </div>
              </>
            )}
            {/* Navigation Buttons */}
            <div className="col-12">
              <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'space-between',
                marginTop: '40px'
              }}>
                {currentStep > 1 && (
                  <button 
                    type="button"
                    onClick={handlePreviousStep}
                    className="cs_btn cs_style_1"
                    style={{
                      background: '#e8e8e8',
                      color: '#333'
                    }}
                  >
                    <span>← Geri</span>
                  </button>
                )}
                
                {currentStep < totalSteps ? (
                  <button 
                    type="button"
                    onClick={handleNextStep}
                    className="cs_btn cs_style_1"
                    style={{ marginLeft: currentStep === 1 ? 'auto' : 0 }}
                  >
                    <span>İleri →</span>
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="cs_btn cs_style_1"
                    style={{ marginLeft: 'auto' }}
                  >
                    <span>✓ Formu Gönder</span>
                  </button>
                )}
              </div>
            </div>
            </form>
          </div>
        </div>
        <div className="cs_height_120"></div>
      </section>
    </>
  )
}