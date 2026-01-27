'use client'

import Toast from '@/src/components/Toast'
import { db } from '@/src/lib/firebase'
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import { getCollectionName } from '../../lib/localization'
import i18n from '../../i18n'
import '../../i18n'

// Update Question interface to include globalId
interface Question {
  id: string
  globalId: string // Added globalId as the primary key
  questionText: string
  type: 'select' | 'checkbox' | 'text' | 'date' | 'radio'
  options: string[]
  step: number
  required: boolean
  order: number
  createdAt?: Date
  triggerValue?: string
  additionalInputLabel?: string
  additionalInputType?: 'text' | 'date'
}

interface StepName {
  id: string
  number: number
  name: string
}

const Form = () => {
  const { t, isReady } = useSafeTranslation()
  const [step, setStep] = useState(0)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [steps, setSteps] = useState<StepName[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<Record<string, string>>({})

  // Fetch questions from Firestore
  useEffect(() => {
    const loadQuestionsAndSteps = async () => {
      try {
        setLoading(true)
        // Fetch steps
        const stepsCollection = getCollectionName('travelsteps', i18n.language)
        const stepsRef = collection(db, stepsCollection)
        const stepsSnapshot = await getDocs(stepsRef)
        let stepsData = stepsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as StepName[]

        // Add default step names if missing
        if (stepsData.length === 0) {
          stepsData = Array.from({ length: 5 }, (_, i) => ({
            id: `default-step-${i + 1}`,
            number: i + 1,
            name: `` // Updated to "Adım X" instead of just the number
          }))
        }

        setSteps(stepsData.sort((a, b) => a.number - b.number))

        // Fetch questions
        const questionsCollection = getCollectionName('travelquestions', i18n.language)
        const questionsRef = collection(db, questionsCollection)
        const questionsSnapshot = await getDocs(questionsRef)
        const questionsData = questionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Question[]
        questionsData.sort((a, b) => (a.step === b.step ? a.order - b.order : a.step - b.step))
        setQuestions(questionsData)

        // Initialize formData with globalId
        const initialData: Record<string, string> = {}
        questionsData.forEach(q => {
          initialData[q.globalId] = ''
        })
        setFormData(initialData)

        setLoading(false)
      } catch (error) {
        const errorMsg = isReady ? t('travel.pages.form.errors.loadingQuestions') : 'Sorular yüklenirken hata:'
        console.error(errorMsg, error)
        setLoading(false)
      }
    }
    loadQuestionsAndSteps()
  }, [i18n.language])

  const requiredQuestions = questions.filter(q => q.required)
  const filledFields = Object.values(formData).filter(val => val !== '').length
  const progressPercent = requiredQuestions.length > 0 ? Math.round((filledFields / requiredQuestions.length) * 100) : 0

  // Email içeriği oluşturma
  const generateEmailContent = (values: Record<string, string>): string => {
    let content = '<h2>Yeni Seyahat Form Başvurusu</h2><p>Aşağıda form detayları bulunmaktadır:</p><ul>'

    questions.forEach((question) => {
      const answer = values[question.id]
      if (answer) {
        let displayAnswer = answer
        if (question.type === 'checkbox') {
          displayAnswer = answer.split(',').filter(v => v).join(', ')
        }
        content += `<li><strong>${question.questionText}:</strong> ${displayAnswer}</li>`
      }
    })

    content += '</ul><p>Bu bildirim otomatik olarak gönderilmiştir.</p>'
    return content
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    // Check all required fields
    const missingRequired = requiredQuestions.some(q => !formData[q.globalId] || formData[q.globalId].trim() === '')
    if (missingRequired) {
      setError(true)
      setTimeout(() => setError(false), 3000)
      return
    }

    try {
      await addDoc(collection(db, 'travelforms'), {
        answers: formData, // Use formData directly
        createdAt: serverTimestamp(),
        lang: i18n.language // Include language in the submission
      })

      // Email gönderme
      const emailContent = generateEmailContent(formData)
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'tourism@princetourismagency.com',
          subject: 'Yeni Turizm Form Başvurusu',
          message: emailContent,
          recipientName: 'Prince'
        }),
      })

      setSuccess(true)
      // Reset form data
      const initialData: Record<string, string> = {}
      questions.forEach(q => {
        initialData[q.globalId] = ''
      })
      setFormData(initialData)
      setStep(0)

      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      const errorMsg = isReady ? t('travel.pages.form.errors.submitError') : 'Form gönderme hatası:'
      console.error(errorMsg, error)
      alert(isReady ? t('travel.pages.form.errorAlert') : 'Form gönderilirken bir hata oluştu!')
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <p suppressHydrationWarning>{isReady ? t('travel.pages.form.loading') : ''}</p>
      </div>
    )
  }

  return (
    <>

      <ol className="breadcrumb2" style={{ color: 'black', marginLeft: '10%' }}>
        <li className="breadcrumb-item2">
          <Link href="/travel" suppressHydrationWarning>{isReady ? t('travel.pages.breadcrumb.home') : ''}</Link>
        </li>
        <li className="breadcrumb-item2" suppressHydrationWarning> {isReady ? t('travel.pages.form.breadcrumb') : ''}</li>
      </ol>

      <div className="lg:p-25 p-25">
        <div className="container">

          {/* TITLE */}
          <div className="text-center mb-8 mt-5">
            <h1 className="text-3xl lg:text-5xl font-extrabold text-dark-1 tracking-tight" suppressHydrationWarning>
              {isReady ? (() => {
                const title = t('travel.pages.form.title')
                const parts = title.split('Tatili')
                return (
                  <>
                    {parts[0]}<span className="text-primary-1">Tatili</span>{parts[1]}
                  </>
                )
              })() : ''}
            </h1>
            <p className="text-base lg:text-lg text-dark-3 max-w-2xl mx-auto" suppressHydrationWarning>
              {isReady ? t('travel.pages.form.subtitle') : ''}
            </p>
          </div>


          <div className="flex items-center justify-between pb-10 pt-10 overflow-x-auto">
            {steps.map((s, index) => (
              <div key={s.id}>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex justify-center items-center lg:h-10 lg:w-10 w-9 h-9 rounded-full transition-all whitespace-nowrap
                    ${step >= s.number - 1 ? 'bg-primary-1 text-white scale-105' : 'bg-stock-1 text-dark-3'}`}>
                    {String(s.number).padStart(2, '0')}
                  </span>
                  <p className="text-sm lg:text-base whitespace-nowrap">{s.name}</p>
                </div>
              
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-8 lg:gap-12">



            {/* FORM */}
            <div className="lg:col-span-8 col-span-12">
              <div
                key={step}
                className="grid grid-cols-2 lg:gap-7 gap-5 form-step-animate"
              >
                {questions
                  .filter(q => q.step === step + 1)
                  .map((question) => {
                    const isRequired = question.required
                    return (
                      <div
                        key={question.id}
                        className={(question.type === 'text' && (question.questionText.toLowerCase().includes('özel') || question.questionText.toLowerCase().includes('special'))) ? 'col-span-2' : 'col-span-2 lg:col-span-1'}
                      >
                        <label className="flex items-center gap-2 text-dark-2 font-medium mb-2">
                          {isRequired && <span className="text-red-500">*</span>}
                          {question.questionText}
                        </label>

                        {question.type === 'text' && (
                          <input
                            type="text"
                            name={question.globalId} // Updated to globalId
                            value={formData[question.globalId] || ''} // Updated to globalId
                            onChange={handleInputChange}
                            className="input_style__primary w-full"
                            placeholder={question.questionText}
                          />
                        )}

                        {question.type === 'date' && (
                          <input
                            type="date"
                            name={question.globalId} // Updated to globalId
                            value={formData[question.globalId] || ''} // Updated to globalId
                            onChange={handleInputChange}
                            className="input_style__primary w-full"
                          />
                        )}

                        {question.type === 'select' && (
                          <select
                            name={question.globalId} // Updated to globalId
                            value={formData[question.globalId] || ''} // Updated to globalId
                            onChange={handleInputChange}
                            className="input_style__primary w-full"
                          >
                            <option value="" suppressHydrationWarning>{isReady ? t('travel.pages.form.selectPlaceholder') : ''}</option>
                            {question.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}

                        {question.type === 'radio' && (
                          <div className="flex flex-col gap-2 mt-2">
                            {question.options.map((option) => (
                              <label key={option} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name={question.globalId} // Updated to globalId
                                  value={option}
                                  checked={formData[question.globalId] === option}
                                  onChange={handleInputChange}
                                  className="cursor-pointer"
                                />
                                <span className="text-dark-2">{option}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {question.type === 'checkbox' && (
                          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '8px' }}>
                            {question.options.map((opt) => {
                              const selectedValues = formData[question.globalId]?.split(',').filter(Boolean) || []
                              const isSelected = selectedValues.includes(opt)
                              return (
                                <label
                                  key={opt}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    padding: '8px 12px',
                                    border: `2px solid ${isSelected ? '#d7b76e' : '#ddd'}`,
                                    borderRadius: '6px',
                                    backgroundColor: isSelected ? '#fef3e2' : 'transparent',
                                    transition: 'all 0.2s ease',
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    value={opt}
                                    checked={isSelected}
                                    onChange={() => {
                                      const newValues = isSelected
                                        ? selectedValues.filter(v => v !== opt)
                                        : [...selectedValues, opt]
                                      setFormData(prev => ({
                                        ...prev,
                                        [question.globalId]: newValues.join(',') // Updated to globalId
                                      }))
                                    }}
                                    style={{ display: 'none' }}
                                  />
                                  <span>{opt}</span>
                                </label>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>

              {/* BUTTONS */}
              <div className="mt-10 flex justify-between items-center">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="btn_primary__v1 outlined"
                    suppressHydrationWarning
                  >
                    {isReady ? t('travel.pages.form.previous') : ''}
                  </button>
                )}

                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="btn_primary__v1"
                    suppressHydrationWarning
                  >
                    {isReady ? t('travel.pages.form.next') : ''}
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="btn_primary__v1" suppressHydrationWarning>
                    {isReady ? t('travel.pages.form.submit') : ''}
                  </button>
                )}
              </div>

              {/* SUCCESS TOAST NOTIFICATION */}
              {success && <Toast type="success" message={isReady ? t('travel.pages.form.success') : ''} />}

              {/* ERROR TOAST NOTIFICATION */}
              {error && <Toast type="error" message={isReady ? t('travel.pages.form.error') : ''} />}

              {/* TRUST */}
              <div className="mt-4 flex items-center gap-2 text-sm text-dark-3">
                <i className="bi bi-shield-lock text-primary-1"></i>
                <span suppressHydrationWarning>{isReady ? t('travel.pages.form.privacy') : ''}</span>
              </div>
            </div>

            {/* STICKY SUMMARY */}
            <div className="lg:col-span-4 col-span-12 hidden lg:block">
              <div className="sticky top-20 max-w-[360px] border-2 border-primary-1 rounded-lg p-6 bg-gradient-to-br from-white">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h5 className="font-bold text-dark-1 text-lg flex items-center gap-2" suppressHydrationWarning>
                    <i className="bi bi-clipboard-check text-primary-1"></i>
                    {isReady ? t('travel.pages.form.summary.title') : ''}
                  </h5>
                  {/* PROGRESS */}
                  <div className="flex justify-center">
                    <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
                      <svg className="transform -rotate-90" width="80" height="80" viewBox="0 0 96 96">
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
                          stroke="url(#progressGradient)"
                          strokeWidth="6"
                          strokeDasharray={`${(progressPercent / 100) * 2 * Math.PI * 40} ${2 * Math.PI * 40}`}
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />
                        <defs>
                          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f2e2bdff" />
                            <stop offset="100%" stopColor="#d7b76e" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-sm font-bold text-primary-1">{progressPercent}</span>
                        <span className="text-xs text-dark-3 font-medium">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="text-sm text-dark-2 space-y-3 border-l-4 border-primary-1 pl-4">
                  {Object.entries(formData)
                    .filter(([_, value]) => value && value.trim() !== '')
                    .map(([key, value]) => {
                      const question = questions.find(q => q.id === key);
                      const label = question ? question.questionText : key;
                      let displayValue = value;
                      // Checkboxlar için okunabilir gösterim ve label düzeltme
                      if (question && question.type === 'checkbox') {
                        const selected = value.split(',').filter(v => v);
                        // Eğer option label'ı varsa onu göster
                        displayValue = selected.length > 0
                          ? selected.map(opt => {
                            // Eğer options içinde label varsa onu göster
                            const optionLabel = question.options.find(o => o === opt) || opt;
                            return optionLabel;
                          }).join(', ')
                          : '';
                      }
                      // Kısaltılmış gösterim (ör: requests)
                      if (key === 'requests' && value.length > 30) {
                        displayValue = value.substring(0, 30) + '...';
                      }
                      return (
                        <li key={key} className="flex items-center gap-2">
                          <i className="bi bi-check2-circle text-gray-400 text-base"></i>
                          <span><strong>{label}:</strong> {displayValue}</span>
                        </li>
                      );
                    })}
                  {Object.values(formData).every(val => !val || val.trim() === '') && (
                    <li className="text-dark-3 italic" suppressHydrationWarning>{isReady ? t('travel.pages.form.summary.empty') : ''}</li>
                  )}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* MICRO ANIMATION */}
      <style jsx>{`
        .form-step-animate {
          animation: fadeSlide 0.4s ease;
        }
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default Form
