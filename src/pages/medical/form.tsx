/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import { MedicalFormData } from '@/src/types/types'
import Toast from '@/src/components/Toast'
import { useSafeTranslation } from '@/src/hooks/useSafeTranslation'
import '@/src/i18n'

interface Question {
  id: string
  questionText: string
  type: 'select' | 'checkbox' | 'text' | 'date' | 'radio'
  options: string[]
  step: number
  required: boolean
  order: number
  createdAt: Date
  triggerValue?: string
  additionalInputLabel?: string
  additionalInputType?: 'text' | 'date'
}

interface StepName {
  id: string
  number: number
  name: string
}

// CheckboxOption component'ini dışarıda tanımla
const CheckboxOption = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className={`medical-checkbox-option ${selected ? 'selected' : ''}`}
  >
    {label}
  </div>
)

// Step Indicator Component
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="medical-step-indicator">
    {Array.from({ length: totalSteps }).map((_, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <div className={`medical-step-circle ${index < currentStep - 1 ? 'completed' : index === currentStep - 1 ? 'active' : ''}`}>
          {index < currentStep - 1 ? '✓' : index + 1}
        </div>
        {index < totalSteps - 1 && (
          <div className={`medical-step-line ${index < currentStep - 1 ? 'active' : ''}`}></div>
        )}
      </div>
    ))}
  </div>
)

export default function AppointmentSection() {
  const { t, isReady } = useSafeTranslation()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 7
  const [questions, setQuestions] = useState<Question[]>([])
  const [steps, setSteps] = useState<StepName[]>([])
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [loadingQuestions, setLoadingQuestions] = useState(true)

  // Soruları ve adımları yükle
  useEffect(() => {
    const loadData = async () => {
      try {
        const [questionsSnapshot, stepsSnapshot] = await Promise.all([
          getDocs(collection(db, 'questions')),
          getDocs(collection(db, 'steps')),
        ])

        const questionsData: Question[] = []
        questionsSnapshot.forEach((doc) => {
          questionsData.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
          } as Question)
        })
        setQuestions(questionsData.sort((a, b) => a.step - b.step || a.order - b.order))

        const stepsData: StepName[] = []
        stepsSnapshot.forEach((doc) => {
          stepsData.push({
            id: doc.id,
            ...doc.data(),
          } as StepName)
        })
        setSteps(stepsData.sort((a, b) => a.number - b.number))
      } catch (error) {
        console.error(isReady ? t('medical.pages.form.errorAlert') : 'Veriler yüklenirken hata:', error)
      } finally {
        setLoadingQuestions(false)
      }
    }
    loadData()
  }, [])

  // Form states - Personal Information
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [nationality, setNationality] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  // Form states - Other
  const [travelTime, setTravelTime] = useState('')
  const [chronicDisease, setChronicDisease] = useState('')
  const [airport, setAirport] = useState('')
  const [operation, setOperation] = useState('')
  const [gender, setGender] = useState('')
  const [heartDisease, setHeartDisease] = useState('')
  const [diabetes, setDiabetes] = useState('')
  const [bloodClotting, setBloodClotting] = useState('')
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
      { name: 'fullName', label: 'Ad Soyad', value: fullName },
      { name: 'birthDate', label: 'Doğum Tarihi', value: birthDate },
      { name: 'phone', label: 'Telefon', value: phone },
      { name: 'email', label: 'E-posta', value: email },
      { name: 'nationality', label: 'Uyruk', value: nationality }
    ]

    for (const field of required) {
      if (!field.value) {
        return false
      }
    }

    return true
  }

  const validateStep = (step: number): boolean => {
    const stepQuestions = getQuestionsForStep(step)
    const requiredQuestions = stepQuestions.filter((q) => q.required)

    for (const question of requiredQuestions) {
      const value = formValues[question.id]
      if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'string' && !value.trim())) {
        setErrorMessage(`"${question.questionText}" zorunludur`)
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

  const handleSubmitButton = async () => {
    // Tüm steps'i valide et
    for (let step = 1; step <= totalSteps; step++) {
      const stepQuestions = getQuestionsForStep(step)
      const requiredQuestions = stepQuestions.filter((q) => q.required)

      for (const question of requiredQuestions) {
        const value = formValues[question.id]
        if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'string' && !value.trim())) {
          setCurrentStep(step)
          setErrorMessage(`${getStepName(step)}: "${question.questionText}" ${isReady ? t('medical.pages.form.required') : 'zorunludur'}`)
          setShowError(true)
          setTimeout(() => setShowError(false), 3000)
          return
        }
      }
    }

    const payload = {
      answers: formValues,
      createdAt: serverTimestamp(),
    }

    try {
      await addDoc(collection(db, 'medicalforms'), payload)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)

      // Tüm state'leri reset et
      setCurrentStep(1)
      setFormValues({})
    } catch (error) {
      console.error(isReady ? t('medical.pages.form.errorAlert') : 'Form gönderirken hata oluştu:', error)
      setErrorMessage(isReady ? t('medical.pages.form.error') : 'Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const getQuestionsForStep = (step: number): Question[] => {
    return questions.filter((q) => q.step === step).sort((a, b) => a.order - b.order)
  }

  const getStepName = (stepNumber: number): string => {
    const step = steps.find((s) => s.number === stepNumber)
    return step ? step.name : `Adım ${stepNumber}`
  }

  // Soru input render function
  const renderQuestion = (question: Question) => {
    const value = formValues[question.id] || ''
    const isRequired = question.required

    const handleChange = (newValue: any) => {
      setFormValues((prev) => ({
        ...prev,
        [question.id]: newValue,
      }))
    }

    switch (question.type) {
      case 'select':
        return (
          <div key={question.id} className="col-lg-6">
            <label style={{ marginBottom: '8px', display: 'block', fontSize: '16px', fontWeight: '500' }}>
              {question.questionText}
              {isRequired && ' *'}
            </label>
            <select
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
              className="cs_form_field"
            >
              <option value="">Seçiniz...</option>
              {question.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            
            {/* Koşullu Ek Input */}
            {question.triggerValue && value === question.triggerValue && question.additionalInputLabel && (
              <div style={{ marginTop: '12px' }}>
                <label style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500' }}>
                  {question.additionalInputLabel}
                </label>
                <input
                  type={question.additionalInputType === 'date' ? 'date' : 'text'}
                  value={formValues[`${question.id}_additional`] || ''}
                  onChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      [`${question.id}_additional`]: e.target.value,
                    }))
                  }}
                  placeholder={question.additionalInputLabel}
                  className="cs_form_field"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            )}
          </div>
        )

      case 'radio':
        return (
          <div key={question.id} className="col-12">
            <label style={{ marginBottom: '12px', display: 'block', fontSize: '14px', fontWeight: '500' }}>
              {question.questionText}
              {isRequired && ' *'}
            </label>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {question.options.map((opt) => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name={question.id}
                    value={opt}
                    checked={value === opt}
                    onChange={(e) => handleChange(e.target.value)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            
            {/* Koşullu Ek Input */}
            {question.triggerValue && value === question.triggerValue && question.additionalInputLabel && (
              <div style={{ marginTop: '16px' }}>
                <label style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500' }}>
                  {question.additionalInputLabel}
                </label>
                <input
                  type={question.additionalInputType === 'date' ? 'date' : 'text'}
                  value={formValues[`${question.id}_additional`] || ''}
                  onChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      [`${question.id}_additional`]: e.target.value,
                    }))
                  }}
                  placeholder={question.additionalInputLabel}
                  className="cs_form_field"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            )}
          </div>
        )

      case 'checkbox':
        return (
          <div key={question.id} className="col-12">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
              <label style={{ marginBottom: 0, fontSize: '14px', fontWeight: '500' }}>
                {question.questionText}
                {isRequired && ' *'}
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                {question.options.map((opt) => (
                  <label 
                    key={opt} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      border: `2px solid ${Array.isArray(value) && value.includes(opt) ? '#307BC4' : '#ddd'}`,
                      borderRadius: '6px',
                      backgroundColor: Array.isArray(value) && value.includes(opt) ? '#e0f2fe' : 'transparent',
                      transition: 'all 0.2s ease',
                      marginBottom: '8px',
                    }}
                  >
                    <input
                      type="checkbox"
                      value={opt}
                      checked={Array.isArray(value) ? value.includes(opt) : false}
                      onChange={(e) => {
                        const newValue = Array.isArray(value) ? value : []
                        if (e.target.checked) {
                          handleChange([...newValue, opt])
                        } else {
                          handleChange(newValue.filter((v: any) => v !== opt))
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="cs_height_42"></div>
          </div>
        )

      case 'text':
        return (
          <div key={question.id} className="col-lg-6">
            <label style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500' }}>
              {question.questionText}
              {isRequired && ' *'}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={question.questionText}
              className="cs_form_field"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )

      case 'date':
        return (
          <div key={question.id} className="col-lg-6">
            <label style={{ marginBottom: '8px', display: 'block', fontSize: '14px', fontWeight: '500' }}>
              {question.questionText}
              {isRequired && ' *'}
            </label>
            <input
              type="date"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              className="cs_form_field"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )

      default:
        return null
    }
  }

  // Özet için ilerlemey yüzdesini hesapla
  const calculateProgressPercent = () => {
    const filledCount = Object.values(formValues).filter((v) => {
      if (Array.isArray(v)) return v.length > 0
      return v && v !== ''
    }).length

    // Tüm soruları say (ek input'ları hariç)
    const allQuestions = questions.filter(q => !q.id.includes('_additional'))
    return allQuestions.length > 0 ? Math.round((filledCount / allQuestions.length) * 100) : 0
  }

  const progressPercent = calculateProgressPercent()

  if (loadingQuestions) {
    return (
      <section className="cs_appointment_section_1 cs_bg_filed">
        <div className="container">
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <p suppressHydrationWarning>{isReady ? t('medical.pages.form.loading') : ''}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {showSuccess && (
        <Toast type="success" message={isReady ? t('medical.pages.form.success') : ''} />
      )}

      {showError && (
        <Toast type="error" message={errorMessage} />
      )}
      <section style={{ background: '#4f8edc', padding: '20px 0 20px 0' }}>
        <div className="container" style={{ marginBottom: '20px', marginTop: '-45px' }}>
          <ol className="breadcrumb2" style={{ color: '#fff', marginLeft: '0' }}>
            <li className="breadcrumb-item2" style={{ color: '#fff' }}>
              <Link href="/medical" style={{ color: '#fff' }} suppressHydrationWarning>{isReady ? t('medical.pages.breadcrumb.home') : ''}</Link>
            </li>
            <li className="breadcrumb-item2 active" style={{ color: '#fff' }} suppressHydrationWarning>{isReady ? t('medical.pages.breadcrumb.form') : ''}</li>
          </ol>

          <div className="cs_banner_text">
            <h2 className="cs_banner_title cs_fs_72" style={{ color: '#fff' }} suppressHydrationWarning>
              {isReady ? t('medical.pages.form.title') : ''}
            </h2>
            <p className="cs_banner_subtitle cs_fs_20" style={{ color: '#fff' }} suppressHydrationWarning>
              {isReady ? t('medical.pages.form.subtitle') : ''}
            </p>
          </div>
        </div>
      </section>
      <section className="cs_appointment_section_1 cs_bg_filed" >
        <div className="container">
          <div className="medical-form-container ">

            {/* Step Indicator */}
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

            <div className="row g-4 justify-center">
              {/* FORM CONTENT - Left Side */}
              <div className="col-lg-8">
                <form 
                  onSubmit={handleSubmit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                    }
                  }}
                >
                {/* Dinamik Steps */}
                {getQuestionsForStep(currentStep).length > 0 ? (
                  <>
                    <div className="col-12">
                      <h3 className="medical-step-title">{getStepName(currentStep)}</h3>
                    </div>
                    <div className="row">
                      {getQuestionsForStep(currentStep).map((question) => renderQuestion(question))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Fallback - eski içerik */}
                {/* Step 1: Kişisel Bilgiler */}
                {currentStep === 1 && (
                  <>
                    <div className="col-12">
                      <h3 className="medical-step-title" suppressHydrationWarning>{isReady ? t('medical.pages.form.stepTitle') : ''}</h3>
                    </div>
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color" suppressHydrationWarning>{isReady ? t('medical.pages.form.labels.fullName') : ''} <span style={{ color: '#ff0000' }}>*</span></label>
                  <input 
                    type="text" 
                    className="cs_form_field" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required 
                  />
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color" suppressHydrationWarning>{isReady ? t('medical.pages.form.labels.birthDate') : ''} <span style={{ color: '#ff0000' }}>*</span></label>
                  <input 
                    type="date" 
                    className="cs_form_field" 
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required 
                  />
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }} suppressHydrationWarning>{isReady ? t('medical.pages.form.labels.gender') : ''} <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label={isReady ? t('medical.pages.form.genderOptions.female') : 'Kadın'} selected={gender === 'Kadın'} onClick={() => setGender('Kadın')} />
                      <CheckboxOption label={isReady ? t('medical.pages.form.genderOptions.male') : 'Erkek'} selected={gender === 'Erkek'} onClick={() => setGender('Erkek')} />
                      <CheckboxOption label={isReady ? t('medical.pages.form.genderOptions.preferNotToSay') : 'Belirtmek İstemiyorum'} selected={gender === 'Belirtmek İstemiyorum'} onClick={() => setGender('Belirtmek İstemiyorum')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">Uyruk <span style={{ color: '#ff0000' }}>*</span></label>
                  <input 
                    type="text" 
                    className="cs_form_field" 
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    required 
                  />
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">Telefon (WhatsApp) <span style={{ color: '#ff0000' }}>*</span></label>
                  <input 
                    type="text" 
                    className="cs_form_field" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                  />
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">E-posta <span style={{ color: '#ff0000' }}>*</span></label>
                  <input 
                    type="email" 
                    className="cs_form_field" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                  <div className="cs_height_42"></div>
                </div>
              </>
            )}

            {/* Step 2: Operasyon Detayları */}
            {currentStep === 2 && (
              <>
                <div className="col-12">
                  <h3 className="medical-step-title">Operasyon Detayları</h3>
                </div>
                <div className="col-lg-6">
                  <label className="cs_input_label cs_heading_color">İlgilenilen İşlem <span style={{ color: '#ff0000' }}>*</span></label>
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
                    <label className="cs_input_label cs_heading_color">İşlem Detayı <span style={{ color: '#ff0000' }}>*</span></label>
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
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Daha Önce Danışma Aldınız mı? <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={consultation === 'Hayır'} onClick={() => setConsultation('Hayır')} />
                      <CheckboxOption label="Evet" selected={consultation === 'Evet'} onClick={() => setConsultation('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>İlk Ameliyatınız mı? <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Evet" selected={firstSurgery === 'Evet'} onClick={() => setFirstSurgery('Evet')} />
                      <CheckboxOption label="Hayır" selected={firstSurgery === 'Hayır'} onClick={() => setFirstSurgery('Hayır')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
              </>
            )}

            {/* Step 3: Medikal Geçmiş */}
            {currentStep === 3 && (
              <>
                <div className="col-12">
                  <h3 className="medical-step-title">Medikal Geçmiş</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Kronik Hastalığınız Var mı? <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={chronicDisease === 'Hayır'} onClick={() => setChronicDisease('Hayır')} />
                      <CheckboxOption label="Evet" selected={chronicDisease === 'Evet'} onClick={() => setChronicDisease('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                {chronicDisease === 'Evet' && (
                  <div className="col-lg-6">
                    <label className="cs_input_label cs_heading_color">Kronik Hastalık Detayı <span style={{ color: '#ff0000' }}>*</span></label>
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
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Kalp Rahatsızlığı <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={heartDisease === 'Hayır'} onClick={() => setHeartDisease('Hayır')} />
                      <CheckboxOption label="Evet" selected={heartDisease === 'Evet'} onClick={() => setHeartDisease('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Kan Pıhtılaşması Problemi <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={bloodClotting === 'Hayır'} onClick={() => setBloodClotting('Hayır')} />
                      <CheckboxOption label="Evet" selected={bloodClotting === 'Evet'} onClick={() => setBloodClotting('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Yüksek Tansiyon <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={hypertension === 'Hayır'} onClick={() => setHypertension('Hayır')} />
                      <CheckboxOption label="Evet" selected={hypertension === 'Evet'} onClick={() => setHypertension('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Kanser Geçmişi <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={cancer === 'Hayır'} onClick={() => setCancer('Hayır')} />
                      <CheckboxOption label="Evet" selected={cancer === 'Evet'} onClick={() => setCancer('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
              </>
            )}

            {/* Step 4: Yaşam Alışkanlıkları */}
            {currentStep === 4 && (
              <>
                <div className="col-12">
                  <h3 className="medical-step-title">Yaşam Alışkanlıkları</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Sigara Kullanımı <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={smoking === 'Hayır'} onClick={() => setSmoking('Hayır')} />
                      <CheckboxOption label="Evet" selected={smoking === 'Evet'} onClick={() => setSmoking('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Alkol Kullanımı <span style={{ color: '#ff0000' }}>*</span></label>
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
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Uyuşturucu Madde Kullanımı <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={drugs === 'Hayır'} onClick={() => setDrugs('Hayır')} />
                      <CheckboxOption label="Evet" selected={drugs === 'Evet'} onClick={() => setDrugs('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
              </>
            )}

            {/* Step 5: İlaçlar & Alerjiler */}
            {currentStep === 5 && (
              <>
                <div className="col-12">
                  <h3 className="medical-step-title">İlaçlar, Alerjiler & Cerrahi Geçmiş</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Düzenli İlaç Kullanımı <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={medication === 'Hayır'} onClick={() => setMedication('Hayır')} />
                      <CheckboxOption label="Evet" selected={medication === 'Evet'} onClick={() => setMedication('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>İlaç / Anestezi Alerjisi <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={allergy === 'Hayır'} onClick={() => setAllergy('Hayır')} />
                      <CheckboxOption label="Evet" selected={allergy === 'Evet'} onClick={() => setAllergy('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>

                <div className="col-12">
                  <h3 className="medical-step-title-secondary">Cerrahi Geçmiş</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Daha Önce Ameliyat Oldunuz mu? <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={surgery === 'Hayır'} onClick={() => setSurgery('Hayır')} />
                      <CheckboxOption label="Evet" selected={surgery === 'Evet'} onClick={() => setSurgery('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Anestezi Komplikasyonu <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Hayır" selected={anesthesia === 'Hayır'} onClick={() => setAnesthesia('Hayır')} />
                      <CheckboxOption label="Evet" selected={anesthesia === 'Evet'} onClick={() => setAnesthesia('Evet')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>

                <div className="col-12">
                  <h3 className="medical-step-title-secondary">Kadın Hastalar İçin</h3>
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

            {/* Step 6: Seyahat & Konaklama */}
            {currentStep === 6 && (
              <>
                <div className="col-12">
                  <h3 className="medical-step-title">Seyahat Bilgileri</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Türkiye Seyahat Zamanı <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Net Tarih" selected={travelTime === 'Net Tarih'} onClick={() => setTravelTime('Net Tarih')} />
                      <CheckboxOption label="Esnek" selected={travelTime === 'Esnek'} onClick={() => setTravelTime('Esnek')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                {travelTime === 'Net Tarih' && (
                  <div className="col-lg-6">
                    <label className="cs_input_label cs_heading_color">Seyahat Tarihi <span style={{ color: '#ff0000' }}>*</span></label>
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
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Kişi Sayısı <span style={{ color: '#ff0000' }}>*</span></label>
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
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Uçak Bileti Durumu <span style={{ color: '#ff0000' }}>*</span></label>
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
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Havalimanı <span style={{ color: '#ff0000' }}>*</span></label>
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
                    <label className="cs_input_label cs_heading_color">Havalimanı Adı <span style={{ color: '#ff0000' }}>*</span></label>
                    <input
                      type="text"
                      className="cs_form_field"
                      value={otherAirport}
                      onChange={(e) => setOtherAirport(e.target.value)}
                      placeholder="Havalimanı adını giriniz..."
                    />
                    <div className="cs_height_42"></div>
                    <div className="cs_height_24"></div>
                  </div>
                )}

                <div className="col-12">
                  <h3 className="medical-step-title-secondary">Konaklama & Transfer</h3>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Otel İhtiyacı <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Evet" selected={hotelNeed === 'Evet'} onClick={() => setHotelNeed('Evet')} />
                      <CheckboxOption label="Hayır" selected={hotelNeed === 'Hayır'} onClick={() => setHotelNeed('Hayır')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>VIP Transfer <span style={{ color: '#ff0000' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
                      <CheckboxOption label="Evet" selected={vipTransfer === 'Evet'} onClick={() => setVipTransfer('Evet')} />
                      <CheckboxOption label="Hayır" selected={vipTransfer === 'Hayır'} onClick={() => setVipTransfer('Hayır')} />
                    </div>
                  </div>
                  <div className="cs_height_42"></div>
                </div>
                
                <div className="col-lg-6">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
                    <label className="cs_input_label cs_heading_color" style={{ marginBottom: 0 }}>Araç Tercihi <span style={{ color: '#ff0000' }}>*</span></label>
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

            {/* Step 7: Ek Bilgiler */}
            {currentStep === 7 && (
              <>
                <div className="col-12">
                  <h3 className="medical-step-title">Ek Bilgiler</h3>
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
                  </>
                )}

            {/* Navigation Buttons */}
            <div className="col-12">
              <div className="medical-form-nav-buttons">
                {currentStep > 1 && (
                  <button 
                    type="button"
                    onClick={handlePreviousStep}
                    className="cs_btn cs_style_1 medical-form-btn-secondary"
                  >
                    <span suppressHydrationWarning>← {isReady ? t('medical.pages.form.buttons.previous') : 'Geri'}</span>
                  </button>
                )}
                
                {currentStep < totalSteps ? (
                  <button 
                    type="button"
                    onClick={handleNextStep}
                    className={`cs_btn cs_style_1 ${currentStep === 1 ? 'medical-form-btn-push-right' : 'medical-form-btn-push-left'}`}
                  >
                    <span suppressHydrationWarning>{isReady ? t('medical.pages.form.buttons.next') : 'İleri'} →</span>
                  </button>
                ) : (
                  <button 
                    type="button"
                    onClick={handleSubmitButton}
                    className="cs_btn cs_style_1 medical-form-btn-push-right"
                  >
                    <span suppressHydrationWarning>✓ {isReady ? t('medical.pages.form.buttons.submit') : 'Formu Gönder'}</span>
                  </button>
                )}
              </div>
            </div>

                </form>
                  <div className="mt-4 flex items-center gap-2 text-sm text-dark-3">
                <i className="bi bi-shield-lock"></i>
                <span suppressHydrationWarning>{isReady ? t('medical.pages.form.privacy') : 'Bilgileriniz gizlidir ve üçüncü kişilerle paylaşılmaz.'}</span>
              </div>
              </div>

              {/* STICKY SUMMARY - Right Side */}
              <div className="col-lg-4 hidden lg:block">
                <div className="sticky top-20 border-2 border-gray-300 rounded-lg p-6 bg-white shadow-md">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <h5 className="font-bold text-lg flex items-center gap-2" suppressHydrationWarning>
                      <i className="bi bi-clipboard-check" style={{ color: '#307BC4' }}></i>
                      {isReady ? t('medical.pages.form.summary.title') : 'Form Özeti'}
                    </h5>
                    {/* PROGRESS CIRCLE */}
                    <div className="flex justify-center">
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="transform -rotate-90" width="64" height="64" viewBox="0 0 96 96">
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="6"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            fill="none"
                            stroke="#307BC4"
                            strokeWidth="6"
                            strokeDasharray={`${(progressPercent / 100) * 2 * Math.PI * 40} ${2 * Math.PI * 40}`}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dasharray 0.5s ease' }}
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-xs font-bold" style={{ color: '#307BC4' }}>{progressPercent}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="text-sm space-y-2 border-l-4 border-blue-500 pl-3 max-h-[600px] overflow-y-auto">
                    {questions.map((question) => {
                      const answer = formValues[question.id]
                      const additionalAnswer = formValues[`${question.id}_additional`]
                      
                      if (!answer) return null

                      return (
                        <li key={question.id} className="flex items-center gap-2 text-gray-700 text-xs">
                          <i className="bi bi-check-circle text-blue-500 text-sm"></i>
                          <span>
                            <strong>{question.questionText.substring(0, 20)}:</strong> {Array.isArray(answer) ? answer.join(', ') : String(answer).substring(0, 20)}{String(answer).length > 20 ? '...' : ''}
                            {additionalAnswer && (
                              <div style={{ fontSize: '12px', color: '#999', marginTop: '4px', paddingLeft: '8px', borderLeft: '2px solid #ddd' }}>
                                → {question.additionalInputLabel}: {String(additionalAnswer).substring(0, 15)}{String(additionalAnswer).length > 15 ? '...' : ''}
                              </div>
                            )}
                          </span>
                        </li>
                      )
                    })}
                    {Object.keys(formValues).length === 0 && (
                      <li className="text-gray-500 italic text-xs" suppressHydrationWarning>{isReady ? t('medical.pages.form.summary.empty') : 'Bilgileri doldurmaya başlayın...'}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_120"></div>
      </section>
    </>
  )
}