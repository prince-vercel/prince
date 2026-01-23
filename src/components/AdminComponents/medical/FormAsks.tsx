/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import styles from '@/src/styles/admin.module.css'
import { MdDelete, MdEdit, MdSave, MdAdd } from 'react-icons/md'
import LanguageSelector from '../../LanguageSelector'
import { getCollectionName } from '@/src/lib/localization'

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

const FormAsks = () => {
    // Step name helper
    const getStepName = (stepNum: number) => {
      const step = steps.find((s) => s.number === stepNum)
      return step?.name || `Adım ${stepNum}`
    }
  const [questions, setQuestions] = useState<Question[]>([])
  const [steps, setSteps] = useState<StepName[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showStepsForm, setShowStepsForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru' | 'es' | 'ar' | 'ru'>('tr')

  const [formData, setFormData] = useState({
    id: '', // Added question ID field
    questionText: '',
    type: 'select' as 'select' | 'checkbox' | 'text' | 'date' | 'radio',
    options: '',
    step: 1,
    required: true,
    order: 1,
    triggerValue: '',
    additionalInputLabel: '',
    additionalInputType: 'text' as 'text' | 'date',
  })

  const loadQuestions = async () => {
    try {
      const collectionName = getCollectionName('questions', selectedLanguage)
      const querySnapshot = await getDocs(collection(db, collectionName))
      const questionsData: Question[] = []
      querySnapshot.forEach((doc) => {
        questionsData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        } as Question)
      })
      setQuestions(questionsData.sort((a, b) => a.step - b.step || a.order - b.order))
    } catch (error) {
      console.error('Soru yükleme hatası:', error)
      showNotification('error', 'Sorular yüklenirken hata oluştu')
    }
  }

  const loadSteps = async () => {
    try {
      const collectionName = getCollectionName('steps', selectedLanguage)
      const querySnapshot = await getDocs(collection(db, collectionName))
      const stepsData: StepName[] = []
      querySnapshot.forEach((doc) => {
        stepsData.push({
          id: doc.id,
          ...doc.data(),
        } as StepName)
      })
      setSteps(stepsData.sort((a, b) => a.number - b.number))
    } catch (error) {
      console.error('Adımlar yükleme hatası:', error)
    }
  }

  // Soruları ve adımları yükle
  useEffect(() => {
    loadQuestions()
    loadSteps()
  }, [loadQuestions, loadSteps])

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const parseOptions = (optionsString: string): string[] => {
    if (!optionsString.trim()) return []
    return optionsString.split(',').map((opt) => opt.trim()).filter((opt) => opt)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.questionText.trim()) {
      showNotification('error', 'Soru metni zorunludur')
      return
    }

    if (!formData.id.trim()) {
      showNotification('error', 'Soru ID zorunludur')
      return
    }

    const options = formData.type !== 'text' && formData.type !== 'date' ? parseOptions(formData.options) : []

    if (formData.type !== 'text' && formData.type !== 'date' && options.length === 0) {
      showNotification('error', 'Lütfen en az bir seçenek ekleyiniz')
      return
    }

    setLoading(true)
    try {
      const questionData: any = {
        id: formData.id, // Added question ID
        questionText: formData.questionText,
        type: formData.type,
        options: options,
        step: formData.step,
        required: formData.required,
        order: formData.order,
      }

      // Koşullu alanları sadece dolduysa ekle
      if (formData.triggerValue?.trim()) {
        questionData.triggerValue = formData.triggerValue
      }
      if (formData.additionalInputLabel?.trim()) {
        questionData.additionalInputLabel = formData.additionalInputLabel
      }
      if (formData.additionalInputType) {
        questionData.additionalInputType = formData.additionalInputType
      }

      if (editingId) {
        const collectionName = getCollectionName('questions', selectedLanguage)
        await updateDoc(doc(db, collectionName, editingId), questionData)
        showNotification('success', 'Soru başarıyla güncellendi')
      } else {
        const collectionName = getCollectionName('questions', selectedLanguage)
        await addDoc(collection(db, collectionName), {
          ...questionData,
          createdAt: new Date(),
        })
        showNotification('success', 'Soru başarıyla eklendi')
      }

      setFormData({
        id: '', // Reset question ID
        questionText: '',
        type: 'select',
        options: '',
        step: 1,
        required: true,
        order: 1,
        triggerValue: '',
        additionalInputLabel: '',
        additionalInputType: 'text',
      })
      setEditingId(null)
      setShowForm(false)
      loadQuestions()
    } catch (error) {
      console.error('Soru işlemi hatası:', error)
      showNotification('error', 'Soru işlemi sırasında hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (questionId: string) => {
    if (!confirm('Bu soruyu silmek istediğinize emin misiniz?')) return

    try {
      const collectionName = getCollectionName('questions', selectedLanguage)
      await deleteDoc(doc(db, collectionName, questionId))
      showNotification('success', 'Soru başarıyla silindi')
      loadQuestions()
    } catch (error) {
      console.error('Soru silme hatası:', error)
      showNotification('error', 'Soru silinirken hata oluştu')
    }
  }

  const handleEdit = (question: Question) => {
    setEditingId(question.id)
    setFormData({
      id: question.id, // Set question ID for editing
      questionText: question.questionText,
      type: question.type,
      options: question.options.join(', '),
      step: question.step,
      required: question.required,
      order: question.order,
      triggerValue: question.triggerValue || '',
      additionalInputLabel: question.additionalInputLabel || '',
      additionalInputType: question.additionalInputType || 'text',
    })
    setShowForm(true)
  }

  const handleSaveSteps = async () => {
    try {
      const collectionName = getCollectionName('steps', selectedLanguage)
      const updatedSteps = [...steps]
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        if (step.id) {
          await updateDoc(doc(db, collectionName, step.id), {
            name: step.name,
          })
        } else {
          const docRef = await addDoc(collection(db, collectionName), {
            number: step.number,
            name: step.name,
          })
          updatedSteps[i] = { ...step, id: docRef.id }
        }
      }
      setSteps(updatedSteps)
      showNotification('success', 'Adım isimleri başarıyla kaydedildi')
      setShowStepsForm(false)
      loadSteps()
    } catch (error) {
      console.error('Adım kaydetme hatası:', error)
      showNotification('error', 'Adım kaydedilirken hata oluştu')
    }
  }

  // JSON İçe Aktar
  const handleImportJSON = async (jsonData: any) => {
    if (!Array.isArray(jsonData)) {
      showNotification('error', 'Geçersiz JSON formatı. Bir dizi bekleniyor.')
      return
    }

    setLoading(true)
    try {
      const collectionName = getCollectionName('questions', selectedLanguage)
      const batch = writeBatch(db)

      jsonData.forEach((item) => {
        const docRef = doc(collection(db, collectionName))
        batch.set(docRef, {
          ...item,
          createdAt: new Date(),
        })
      })

      await batch.commit()
      showNotification('success', 'JSON başarıyla içe aktarıldı')
      loadQuestions()
    } catch (error) {
      console.error('JSON içe aktarma hatası:', error)
      showNotification('error', 'JSON içe aktarılırken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(questions, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'questions.json'
    link.click()

    URL.revokeObjectURL(url)
  }

  const groupedQuestions = questions.reduce(
    (acc, q) => {
      const stepKey = q.step
      if (!acc[stepKey]) acc[stepKey] = []
      acc[stepKey].push(q)
      return acc
    },
    {} as Record<number, Question[]>
  )

  return (
    <div style={{ padding: '20px' }}>
      {/* Bildirim */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '6px',
            backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
          }}
        >
          {notification.message}
        </div>
      )}
  <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={(lang) => {
          setSelectedLanguage(lang)
          loadQuestions()
          loadSteps()
        }}
      />
      {/* Başlık ve Butonlar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', gap: '10px', flexWrap: 'wrap' }}>
    
        <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>Soru Yönetimi</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowStepsForm(!showStepsForm)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            <MdEdit size={18} />
            Adım İsimleri Düzenle
          </button>
          <button
            onClick={() => {
              setEditingId(null)
              setFormData({
                id: '', // Reset question ID
                questionText: '',
                type: 'select',
                options: '',
                step: 1,
                required: true,
                order: 1,
                triggerValue: '',
                additionalInputLabel: '',
                additionalInputType: 'text',
              })
              setShowForm(!showForm)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#307BC4',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            <MdAdd size={18} />
            Yeni Soru Ekle
          </button>
        </div>
      </div>

      {/* Adım İsimleri Form */}
      {showStepsForm && (
        <div
          style={{
            backgroundColor: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '30px',
            border: '1px solid #e5e7eb',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Adım İsimleri</h3>
          <div style={{ display: 'grid', gap: '16px', marginBottom: '20px' }}>
            {Array.from({ length: 7 }).map((_, i) => {
              const stepNum = i + 1
              const currentStep = steps.find((s) => s.number === stepNum)
              return (
                <div key={stepNum} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px', alignItems: 'center' }}>
                  <label style={{ fontWeight: '600', fontSize: '14px' }}>
                    Adım {stepNum}:
                  </label>
                  <input
                    type="text"
                    placeholder={`Adım ${stepNum} ismi`}
                    value={currentStep?.name || ''}
                    onChange={(e) => {
                      setSteps((prev) => {
                        const existing = prev.find((s) => s.number === stepNum)
                        if (existing) {
                          return prev.map((s) =>
                            s.number === stepNum ? { ...s, name: e.target.value } : s
                          )
                        } else {
                          return [
                            ...prev,
                            { id: '', number: stepNum, name: e.target.value },
                          ]
                        }
                      })
                    }}
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowStepsForm(false)}
              style={{
                padding: '10px 24px',
                background: '#e5e7eb',
                color: '#1f2937',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              İptal
            </button>
            <button
              onClick={handleSaveSteps}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              <MdSave size={18} />
              Kaydet
            </button>
          </div>
        </div>
      )}
      {/* Form */}
      {showForm && (
        <div
          style={{
            backgroundColor: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '30px',
            border: '1px solid #e5e7eb',
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Soru ID */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                Soru ID *
              </label>
              <input
                type="text"
                placeholder="Soru ID giriniz..."
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
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

            {/* Soru Metni */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                Soru Metni *
              </label>
              <input
                type="text"
                placeholder="Soru yazınız..."
                value={formData.questionText}
                onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
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

            {/* Soru Tipi */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                Soru Tipi *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as any })
                }
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="select">Açılır Liste (Select)</option>
                <option value="radio">Radyo Buton (Radio)</option>
                <option value="checkbox">Checkbox (Çoklu Seçim)</option>
                <option value="text">Metin Girişi</option>
                <option value="date">Tarih Seçimi</option>
              </select>
            </div>

            {/* Seçenekler */}
            {formData.type !== 'text' && formData.type !== 'date' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                  Seçenekler (virgülle ayırınız) *
                </label>
                <textarea
                  placeholder="Örn: Evet, Hayır, Bilmiyorum"
                  value={formData.options}
                  onChange={(e) => setFormData({ ...formData, options: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    minHeight: '80px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            )}

            {/* Step */}
            <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                  Adım (Step) *
                </label>
                <select
                  value={formData.step}
                  onChange={(e) => setFormData({ ...formData, step: parseInt(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                >
                  {Array.from({ length: 7 }).map((_, i) => {
                    const stepNum = i + 1
                    return (
                      <option key={stepNum} value={stepNum}>
                        {getStepName(stepNum)}
                      </option>
                    )
                  })}
                </select>
              </div>

              {/* Sıra */}
              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                  Sıra (Order)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
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
            </div>

            {/* Zorunlu Mu */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.required}
                  onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontWeight: '500' }}>Zorunlu soru</span>
              </label>
            </div>

            {/* Ek Input Alanları */}
            <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '6px', border: '1px solid #d1d5db' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600' }}>Koşullu Ek Input (İsteğe Bağlı)</h4>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                  Tetikleme Değeri (Örn: &quot;Diğer&quot;, &quot;Evet&quot;)
                </label>
                <input
                  type="text"
                  placeholder="Bu değer seçilirse ek input açılacak"
                  value={formData.triggerValue}
                  onChange={(e) => setFormData({ ...formData, triggerValue: e.target.value })}
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

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                  Ek Input Label (Örn: &quot;Lütfen belirtiniz...&quot;)
                </label>
                <input
                  type="text"
                  placeholder="Ek input'un etiketini yazınız"
                  value={formData.additionalInputLabel}
                  onChange={(e) => setFormData({ ...formData, additionalInputLabel: e.target.value })}
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

              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                  Ek Input Tipi
                </label>
                <select
                  value={formData.additionalInputType}
                  onChange={(e) => setFormData({ ...formData, additionalInputType: e.target.value as 'text' | 'date' })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="text">Metin</option>
                  <option value="date">Tarih</option>
                </select>
              </div>
            </div>

            {/* Butonlar */}
            <div className={styles.contentServicesSaveButtonContainer}>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({
                    id: '', // Reset question ID
                    questionText: '',
                    type: 'select',
                    options: '',
                    step: 1,
                    required: true,
                    order: 1,
                    triggerValue: '',
                    additionalInputLabel: '',
                    additionalInputType: 'text',
                  })
                }}
                style={{
                  padding: '10px 24px',
                  background: '#e5e7eb',
                  color: '#1f2937',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                }}
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className={styles.contentServicesSaveBtn}
              >
                <MdSave size={18} />
                {loading ? 'Yükleniyor...' : editingId ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}

     
     

      {/* Soruları Step'e Göre Gruplandır */}
      <div>
        {Object.keys(groupedQuestions)
          .map((stepKey) => parseInt(stepKey))
          .sort((a, b) => a - b)
          .map((stepNum) => (
            <div key={stepNum} style={{ marginBottom: '40px' }}>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  paddingBottom: '25px',
                  borderBottom: '2px solid #307BC4',
                  color: '#307BC4',
                }}
              >
                {getStepName(stepNum)}
              </h3>

              <div
                style={{
                  display: 'grid',
                  gap: '16px',
                }}
              >
                {groupedQuestions[stepNum]
                  .sort((a, b) => a.order - b.order)
                  .map((question) => (
                    <div
                      key={question.id}
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '16px',
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                          {question.questionText}
                        </h4>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#6b7280' }}>
                          <span
                            style={{
                              backgroundColor: '#e0f2fe',
                              color: '#0369a1',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontWeight: '600',
                            }}
                          >
                            {question.type === 'select'
                              ? 'Açılır Liste'
                              : question.type === 'radio'
                              ? 'Radio'
                              : question.type === 'checkbox'
                              ? 'Checkbox'
                              : question.type === 'text'
                              ? 'Metin'
                              : 'Tarih'}
                          </span>
                          {question.required && (
                            <span
                              style={{
                                backgroundColor: '#fee2e2',
                                color: '#dc2626',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontWeight: '600',
                              }}
                            >
                              Zorunlu
                            </span>
                          )}
                          {question.options.length > 0 && (
                            <span style={{ padding: '4px 8px', color: '#666' }}>
                              {question.options.length} seçenek
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleEdit(question)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            padding: '6px 12px',
                            background: '#e0f2fe',
                            color: '#0369a1',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '500',
                          }}
                        >
                          <MdEdit size={14} />
                          Düzenle
                        </button>

                        <button
                          onClick={() => handleDelete(question.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            padding: '6px 12px',
                            background: '#fee2e2',
                            color: '#dc2626',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '500',
                          }}
                        >
                          <MdDelete size={14} />
                          Sil
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>

      {questions.length === 0 && !showForm && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          <p style={{ fontSize: '16px' }}>Henüz soru yok. Yeni bir soru ekleyin.</p>
        </div>
      )}
    </div>
  )
}

export default FormAsks