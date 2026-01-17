/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import '../../styles/visa/BasvuruYap.css'
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import { getCollectionName } from '@/src/lib/localization'
import Toast from '@/src/components/Toast'

interface Question {
  id: string
  questionText: string
  type: 'select' | 'checkbox' | 'text' | 'date' | 'radio'
  options: string[]
  step: number
  required: boolean
  order: number
  triggerValue?: string
  additionalInputLabel?: string
  additionalInputType?: 'text' | 'date'
}

interface StepName {
  number: number
  name: string
}

type AnswersState = Record<string, any>

export default function BasvuruYapPage() {
  const { t, i18n } = useTranslation()

  const [questions, setQuestions] = useState<Question[]>([])
  const [steps, setSteps] = useState<StepName[]>([])
  const [answers, setAnswers] = useState<AnswersState>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  useEffect(() => {
    const shapes = document.querySelectorAll('.visa-hero .shape')
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset
        shapes.forEach((shape, index) => {
          const speed = (index + 1) * 0.03
          ;(shape as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`
        })
        ticking = false
      })
      ticking = true
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadData = async () => {
      const lang = (i18n.language || 'tr') as any

      const qSnap = await getDocs(collection(db, getCollectionName('visaquestions', lang)))
      const sSnap = await getDocs(collection(db, getCollectionName('visasteps', lang)))

      const qs = qSnap.docs
        .map((d) => {
          const data = d.data() as any
          return {
            id: d.id,
            questionText: data.questionText || '',
            type: data.type,
            options: Array.isArray(data.options) ? data.options : [],
            step: Number(data.step || 1),
            required: Boolean(data.required),
            order: Number(data.order || 1),
            triggerValue: data.triggerValue || '',
            additionalInputLabel: data.additionalInputLabel || '',
            additionalInputType: data.additionalInputType || 'text',
          } as Question
        })
        .sort((a, b) => a.step - b.step || a.order - b.order)

      const ss = sSnap.docs
        .map((d) => d.data() as any)
        .map((x) => ({
          number: Number(x.number || 1),
          name: String(x.name || `Adım ${x.number || 1}`),
        }))
        .sort((a, b) => a.number - b.number)

      setQuestions(qs)
      setSteps(ss)

      const firstStep = ss[0]?.number || qs[0]?.step || 1
      setCurrentStep(firstStep)
      setAnswers({})
    }

    loadData()
  }, [i18n.language])

  const stepNumbers = useMemo(() => {
    const fromSteps = steps.map((s) => s.number)
    const fromQs = Array.from(new Set(questions.map((q) => q.step))).sort((a, b) => a - b)
    const merged = Array.from(new Set([...fromSteps, ...fromQs])).sort((a, b) => a - b)
    return merged.length ? merged : [1]
  }, [steps, questions])

  const currentStepQuestions = useMemo(() => {
    return questions
      .filter((q) => q.step === currentStep)
      .sort((a, b) => a.order - b.order)
  }, [questions, currentStep])

  const getStepName = (n: number) => steps.find((s) => s.number === n)?.name || `Adım ${n}`

  const setAnswerValue = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const setExtraValue = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [`${questionId}__extra`]: value }))
  }

  const getExtraValue = (questionId: string) => answers[`${questionId}__extra`]

  const isFilled = (q: Question) => {
    const v = answers[q.id]
    if (q.type === 'checkbox') return Array.isArray(v) && v.length > 0
    return v !== undefined && v !== null && String(v).trim() !== ''
  }

  const isQuestionCompleted = (q: Question) => {
    if (!q.required) return true
    if (!isFilled(q)) return false
    if (!q.triggerValue) return true

    if (q.type === 'checkbox') {
      if (Array.isArray(answers[q.id]) && answers[q.id].includes(q.triggerValue)) {
        const extra = getExtraValue(q.id)
        return extra !== undefined && extra !== null && String(extra).trim() !== ''
      }
    } else {
      if (answers[q.id] === q.triggerValue) {
        const extra = getExtraValue(q.id)
        return extra !== undefined && extra !== null && String(extra).trim() !== ''
      }
    }

    return true
  }

  const canGoNext = useMemo(() => {
    return currentStepQuestions.every(isQuestionCompleted)
  }, [currentStepQuestions, answers])

const completedStep = (stepNum: number) => {
    // Henüz ulaşılmamış step'ler için false dön
    if (stepNum > currentStep) return false
    
    const qs = questions.filter((q) => q.step === stepNum)
    if (!qs.length) return false
    return qs.every((q) => {
      if (!q.required) return true
      if (!isFilled(q)) return false
      if (q.triggerValue) {
        if (q.type === 'checkbox') {
          if (Array.isArray(answers[q.id]) && answers[q.id].includes(q.triggerValue)) {
            const extra = getExtraValue(q.id)
            return extra !== undefined && extra !== null && String(extra).trim() !== ''
          }
        } else if (answers[q.id] === q.triggerValue) {
          const extra = getExtraValue(q.id)
          return extra !== undefined && extra !== null && String(extra).trim() !== ''
        }
      }
      return true
    })
  }
  const calculateProgress = () => {
    const requiredQs = questions.filter((q) => q.required)
    if (!requiredQs.length) return 0
    const filled = requiredQs.filter(isQuestionCompleted).length
    return Math.round((filled / requiredQs.length) * 100)
  }

  const getFilledFields = () => {
    const filled: Array<{ key: string; label: string; value: string }> = []

    questions.forEach((q) => {
      const v = answers[q.id]
      if (v === undefined || v === null) return
      if (Array.isArray(v) && v.length === 0) return
      if (!Array.isArray(v) && String(v).trim() === '') return

      let displayValue = Array.isArray(v) ? v.join(', ') : String(v)

      if (q.type === 'date' && displayValue) {
        const date = new Date(displayValue)
        if (!Number.isNaN(date.getTime())) {
          displayValue = date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
        }
      }

      if (displayValue.length > 70) displayValue = displayValue.substring(0, 70) + '...'

      filled.push({
        key: q.id,
        label: q.questionText,
        value: displayValue,
      })

      if (q.triggerValue) {
        if (q.type === 'checkbox') {
          if (Array.isArray(answers[q.id]) && answers[q.id].includes(q.triggerValue)) {
            const extra = getExtraValue(q.id)
            if (extra !== undefined && extra !== null && String(extra).trim() !== '') {
              filled.push({
                key: `${q.id}__extra`,
                label: q.additionalInputLabel || t('visa.pages.basvuruYap.fields.message', 'Ek bilgi'),
                value: String(extra),
              })
            }
          }
        } else if (answers[q.id] === q.triggerValue) {
          const extra = getExtraValue(q.id)
          if (extra !== undefined && extra !== null && String(extra).trim() !== '') {
            filled.push({
              key: `${q.id}__extra`,
              label: q.additionalInputLabel || t('visa.pages.basvuruYap.fields.message', 'Ek bilgi'),
              value: String(extra),
            })
          }
        }
      }
    })

    return filled
  }

  const renderQuestion = (q: Question) => {
    const v = answers[q.id]

    if (q.type === 'text') {
      return (
        <div className="form-group full-width">
          <div className="input-wrapper">
            <input
              type="text"
              name={q.id}
              id={q.id}
              value={v || ''}
              onChange={(e) => setAnswerValue(q.id, e.target.value)}
              placeholder=" "
              required={q.required}
            />
            <label htmlFor={q.id}>
              {q.questionText} {q.required ? <span className="required">*</span> : null}
            </label>
          </div>

          {q.triggerValue && v === q.triggerValue ? (
            <div className="input-wrapper" style={{ marginTop: '12px' }}>
              <input
                type={q.additionalInputType || 'text'}
                name={`${q.id}__extra`}
                id={`${q.id}__extra`}
                value={getExtraValue(q.id) || ''}
                onChange={(e) => setExtraValue(q.id, e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor={`${q.id}__extra`}>{q.additionalInputLabel || t('visa.pages.basvuruYap.fields.message', 'Ek bilgi')}</label>
            </div>
          ) : null}
        </div>
      )
    }

    if (q.type === 'date') {
      return (
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="date"
              name={q.id}
              id={q.id}
              value={v || ''}
              onChange={(e) => setAnswerValue(q.id, e.target.value)}
              placeholder=" "
              required={q.required}
            />
            <label htmlFor={q.id}>
              {q.questionText} {q.required ? <span className="required">*</span> : null}
            </label>
          </div>

          {q.triggerValue && v === q.triggerValue ? (
            <div className="input-wrapper" style={{ marginTop: '12px' }}>
              <input
                type={q.additionalInputType || 'text'}
                name={`${q.id}__extra`}
                id={`${q.id}__extra`}
                value={getExtraValue(q.id) || ''}
                onChange={(e) => setExtraValue(q.id, e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor={`${q.id}__extra`}>{q.additionalInputLabel || t('visa.pages.basvuruYap.fields.message', 'Ek bilgi')}</label>
            </div>
          ) : null}
        </div>
      )
    }

    if (q.type === 'select') {
      return (
        <div className="form-group">
          <div className="select-wrapper">
            <select
              name={q.id}
              id={q.id}
              value={v || ''}
              onChange={(e) => setAnswerValue(q.id, e.target.value)}
              required={q.required}
            >
              <option value="" disabled>
                {t('visa.common.select', 'Seçiniz')}
              </option>
              {q.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <label htmlFor={q.id}>
              {q.questionText} {q.required ? <span className="required">*</span> : null}
            </label>
            <span className="select-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>

          {q.triggerValue && v === q.triggerValue ? (
            <div className="input-wrapper" style={{ marginTop: '12px' }}>
              <input
                type={q.additionalInputType || 'text'}
                name={`${q.id}__extra`}
                id={`${q.id}__extra`}
                value={getExtraValue(q.id) || ''}
                onChange={(e) => setExtraValue(q.id, e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor={`${q.id}__extra`}>{q.additionalInputLabel || t('visa.pages.basvuruYap.fields.message', 'Ek bilgi')}</label>
            </div>
          ) : null}
        </div>
      )
    }

    if (q.type === 'radio') {
      return (
        <div className="form-group">
          <label className="group-label">
            {q.questionText} {q.required ? <span className="required">*</span> : null}
          </label>
          <div className="radio-cards">
            {q.options.map((opt) => (
              <label key={opt} className="radio-card">
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  checked={v === opt}
                  onChange={() => setAnswerValue(q.id, opt)}
                  required={q.required}
                />
                <span className="radio-card-content">
                  <span className="radio-indicator"></span>
                  <span className="radio-text">{opt}</span>
                </span>
              </label>
            ))}
          </div>

          {q.triggerValue && v === q.triggerValue ? (
            <div className="input-wrapper" style={{ marginTop: '12px' }}>
              <input
                type={q.additionalInputType || 'text'}
                name={`${q.id}__extra`}
                id={`${q.id}__extra`}
                value={getExtraValue(q.id) || ''}
                onChange={(e) => setExtraValue(q.id, e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor={`${q.id}__extra`}>{q.additionalInputLabel || t('visa.pages.basvuruYap.fields.message', 'Ek bilgi')}</label>
            </div>
          ) : null}
        </div>
      )
    }

    return (
      <div className="form-group full-width">
        <label className="group-label">
          {q.questionText} {q.required ? <span className="required">*</span> : null}
        </label>
        <div className="radio-cards" style={{ display: 'grid', gap: '10px' }}>
          {q.options.map((opt) => {
            const arr: string[] = Array.isArray(v) ? v : []
            const checked = arr.includes(opt)
            return (
              <label key={opt} className="radio-card">
                <input
                  type="checkbox"
                  name={`${q.id}[]`}
                  checked={checked}
                  onChange={() => {
                    const next = checked ? arr.filter((x) => x !== opt) : [...arr, opt]
                    setAnswerValue(q.id, next)
                  }}
                />
                <span className="radio-card-content">
                  <span className="radio-indicator"></span>
                  <span className="radio-text">{opt}</span>
                </span>
              </label>
            )
          })}
        </div>

        {q.triggerValue && Array.isArray(v) && v.includes(q.triggerValue) ? (
          <div className="input-wrapper" style={{ marginTop: '12px' }}>
            <input
              type={q.additionalInputType || 'text'}
              name={`${q.id}__extra`}
              id={`${q.id}__extra`}
              value={getExtraValue(q.id) || ''}
              onChange={(e) => setExtraValue(q.id, e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor={`${q.id}__extra`}>{q.additionalInputLabel || t('visa.pages.basvuruYap.fields.message', 'Ek bilgi')}</label>
          </div>
        ) : null}
      </div>
    )
  }

  const goToStep = (stepNum: number) => {
    setCurrentStep(stepNum)
  }

  const goNext = () => {
    const idx = stepNumbers.indexOf(currentStep)
    if (idx < 0) return
    const next = stepNumbers[idx + 1]
    if (!next) return
    setCurrentStep(next)
  }

  const goPrev = () => {
    const idx = stepNumbers.indexOf(currentStep)
    if (idx <= 0) return
    const prev = stepNumbers[idx - 1]
    if (!prev) return
    setCurrentStep(prev)
  }

  const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9\s\-\+\(\)]/g, '')
    setAnswerValue(e.target.name, e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return

    const requiredMissing = questions.some((q) => q.required && !isQuestionCompleted(q))
    if (requiredMissing) {
      setToastType('error')
      setToastMessage(t('visa.pages.basvuruYap.error', 'Lütfen zorunlu alanları doldurun.'))
      setShowToast(true)
      return
    }

    setIsLoading(true)
    const loadingOverlay = document.getElementById('loadingOverlay')
    const submitBtn = document.querySelector('.submit-btn') as HTMLButtonElement | null
    if (loadingOverlay) loadingOverlay.classList.add('active')
    if (submitBtn) submitBtn.classList.add('loading')

    try {
      const payload = {
        createdAt: serverTimestamp(),
        answers,
        questionsSnapshot: questions.map((q) => ({
          id: q.id,
          questionText: q.questionText,
          type: q.type,
          step: q.step,
          order: q.order,
          required: q.required,
        })),
        stepNamesSnapshot: steps,
        uiLanguage: i18n.language || 'tr',
      }

      await addDoc(collection(db, 'visaforms'), payload)

      if ((window as any).Swal) {
        ;(window as any).Swal.fire({
          icon: 'success',
          title: t('visa.common.success', 'Başarılı!'),
          text: t('visa.pages.basvuruYap.success', 'Başvurunuz alınmıştır.'),
          confirmButtonColor: '#C42127',
          confirmButtonText: t('visa.common.ok', 'Tamam'),
        })
      } else {
        alert(t('visa.pages.basvuruYap.success', 'Başvurunuz alınmıştır.'))
      }

      setAnswers({})
      setCurrentStep(stepNumbers[0] || 1)
    } catch (error) {
      setToastType('error')
      setToastMessage(t('visa.pages.basvuruYap.error', 'Bir hata oluştu. Lütfen tekrar deneyin.'))
      setShowToast(true)
    } finally {
      setIsLoading(false)
      if (loadingOverlay) loadingOverlay.classList.remove('active')
      if (submitBtn) submitBtn.classList.remove('loading')
    }
  }

  return (
    <div className="visa-app-page">
      <section className="visa-hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-accent">Prince</span>
              <span className="title-main">{t('visa.pages.basvuruYap.title', 'Başvuru Yap')}</span>
            </h1>
            <p className="hero-subtitle">{t('visa.pages.basvuruYap.subtitle', 'Bilgilerinizi doldurun, sizinle iletişime geçelim.')}</p>
          </div>
        </div>
      </section>

      <section className="visa-main-content">
        <div className="container">
          <div className="form-layout-wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '40px', alignItems: 'start' }}>
            <div className="form-content-column">
              <div className="progress-container">
                <div className="progress-steps">
                  {stepNumbers.map((stepNum, idx) => (
                    <div key={stepNum} style={{ display: 'flex', alignItems: 'center' }}>
                      <div
                        className={`step-item ${currentStep === stepNum ? 'active' : ''} ${completedStep(stepNum) ? 'completed' : ''}`}
                        data-step={stepNum}
                        onClick={() => goToStep(stepNum)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="step-circle">
                          <span className="step-number">{stepNum}</span>
                          <svg className="step-check" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="step-label">{getStepName(stepNum)}</span>
                      </div>
                      {idx !== stepNumbers.length - 1 ? <div className="step-line"></div> : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-wrapper">
                <form id="visaApplicationForm" onSubmit={handleSubmit} noValidate>
                  <div className="form-section" data-section={currentStep}>
                    <div className="section-header">
                      <div className="section-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </div>
                      <div className="section-title-wrapper">
                        <h2 className="section-title">{getStepName(currentStep)}</h2>
                        <p className="section-desc">{t('visa.pages.basvuruYap.sections.dynamicDesc', 'Lütfen bilgilerinizi doldurun.')}</p>
                      </div>
                    </div>

                    <div className="form-grid">
                      {currentStepQuestions.map((q) => {
                        if (q.type === 'text' && (q.questionText || '').toLowerCase().includes('telefon')) {
                          const v = answers[q.id] || ''
                          return (
                            <div key={q.id} className="form-group">
                              <div className="input-wrapper">
                                <input
                                  type="tel"
                                  name={q.id}
                                  id={q.id}
                                  value={v}
                                  onChange={handlePhoneInput}
                                  placeholder=" "
                                  required={q.required}
                                />
                                <label htmlFor={q.id}>
                                  {q.questionText} {q.required ? <span className="required">*</span> : null}
                                </label>
                              </div>
                            </div>
                          )
                        }
                        return <div key={q.id}>{renderQuestion(q)}</div>
                      })}

                      {currentStepQuestions.length === 0 ? (
                        <div style={{ padding: '16px', color: '#999' }}>
                          {t('visa.pages.basvuruYap.noQuestions', 'Bu adım için soru bulunamadı.')}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="submit-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <button type="button" className="submit-btn" onClick={goPrev} disabled={isLoading || stepNumbers.indexOf(currentStep) === 0} style={{ width: '120px', fontSize: '14px', padding: '10px 16px' }}>
                      <span className="btn-content">
                        <span className="btn-text">{t('visa.common.back', 'Geri')}</span>
                      </span>
                    </button>

                    {stepNumbers.indexOf(currentStep) < stepNumbers.length - 1 ? (
                      <button type="button" className={`submit-btn ${isLoading ? 'loading' : ''}`} onClick={goNext} disabled={isLoading || !canGoNext} style={{ width: '120px', fontSize: '14px', padding: '10px 16px' }}>
                        <span className="btn-content">
                          <span className="btn-text">{t('visa.common.next', 'Devam')}</span>
                          <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </span>
                        <span className="btn-loader">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        </span>
                      </button>
                    ) : (
                      <button type="submit" className={`submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading || !canGoNext} style={{ width: '120px', fontSize: '14px', padding: '10px 16px' }}>
                        <span className="btn-content">
                          <span className="btn-text">{t('visa.pages.basvuruYap.submit', 'Gönder')}</span>
                          <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </span>
                        <span className="btn-loader">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        </span>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="form-summary-sidebar" style={{ position: 'sticky', top: '100px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
              <div className="summary-card" style={{
                border: '2px solid #C42127',
                borderRadius: '12px',
                padding: '24px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginTop:'20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
                  <h5 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#1A1A2E',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C42127" strokeWidth="2">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    {t('visa.pages.basvuruYap.summary.title', 'Başvuru Özeti')}
                  </h5>
                  <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
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
                        stroke="#C42127"
                        strokeWidth="6"
                        strokeDasharray={`${(calculateProgress() / 100) * 2 * Math.PI * 40} ${2 * Math.PI * 40}`}
                        strokeLinecap="round"
                        style={{ transition: 'all 0.5s ease' }}
                      />
                    </svg>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#C42127' }}>{calculateProgress()}</span>
                      <span style={{ fontSize: '10px', color: '#666', fontWeight: 500 }}>%</span>
                    </div>
                  </div>
                </div>

                <ul style={{
                  fontSize: '14px',
                  color: '#333',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  borderLeft: '4px solid #C42127',
                  paddingLeft: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {getFilledFields().map(({ key, label, value }) => (
                    <li key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C42127" strokeWidth="2" style={{ marginTop: '2px', flexShrink: 0 }}>
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span>
                        <strong style={{ color: '#1A1A2E' }}>{label}:</strong> {value}
                      </span>
                    </li>
                  ))}
                  {getFilledFields().length === 0 && (
                    <li style={{ color: '#999', fontStyle: 'italic' }}>
                      {t('visa.pages.basvuruYap.summary.startFilling', 'Henüz bilgi girmediniz.')}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="loading-overlay" id="loadingOverlay">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>{t('visa.common.submitting', 'Başvurunuz gönderiliyor...')}</p>
        </div>
      </div>
      {showToast && <Toast type={toastType} message={toastMessage} />}
    </div>
  )
}
