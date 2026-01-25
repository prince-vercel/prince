/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import Toast from '@/src/components/Toast'
import { useSafeTranslation } from '@/src/hooks/useSafeTranslation'
import { getCollectionName } from '@/src/lib/localization'
import i18n from '@/src/i18n'
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
  const totalSteps = 3
  const [questions, setQuestions] = useState<Question[]>([])
  const [steps, setSteps] = useState<StepName[]>([])
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [loadingQuestions, setLoadingQuestions] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Soruları ve adımları yükle
  useEffect(() => {
    const loadData = async () => {
      try {
        const [questionsSnapshot, stepsSnapshot] = await Promise.all([
          getDocs(collection(db, getCollectionName('questions', i18n.language))),
          getDocs(collection(db, getCollectionName('steps', i18n.language))),
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language, isReady, t])

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

      // Email gönderme
      const emailContent = generateEmailContent(formValues)
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'medical@princetourismagency.com',
          subject: 'Yeni Medikal Form Başvurusu',
          message: emailContent,
          recipientName: 'Prince'
        }),
      })

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
    const stepMapping = {1:1, 2:2, 3:7}
    const mappedStep = stepMapping[step as keyof typeof stepMapping] || step
    return questions.filter((q) => q.step === mappedStep).sort((a, b) => a.order - b.order)
  }

  const getStepName = (stepNumber: number): string => {
    const stepNameMapping = {1:1, 2:2, 3:7}
    const mappedStep = stepNameMapping[stepNumber as keyof typeof stepNameMapping] || stepNumber
    const step = steps.find((s) => s.number === mappedStep)
    return step ? step.name : `Adım ${stepNumber}`
  }

  // Email içeriği oluşturma
  const generateEmailContent = (values: Record<string, any>): string => {
    let content = '<h2>Yeni Medikal Form Başvurusu</h2><p>Aşağıda form detayları bulunmaktadır:</p><ul>'

    questions.forEach((question) => {
      const answer = values[question.id]
      const additionalAnswer = values[`${question.id}_additional`]

      if (answer) {
        let displayAnswer = Array.isArray(answer) ? answer.join(', ') : answer
        if (additionalAnswer) {
          displayAnswer += ` (${additionalAnswer})`
        }
        content += `<li><strong>${question.questionText}:</strong> ${displayAnswer}</li>`
      }
    })

    content += '</ul><p>Bu bildirim otomatik olarak gönderilmiştir.</p>'
    return content
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
                <div className="col-12">
                  <h3 className="medical-step-title">{getStepName(currentStep)}</h3>
                </div>
                <div className="row">
                  {getQuestionsForStep(currentStep).map((question) => renderQuestion(question))}
                </div>



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