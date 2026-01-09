/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { db } from '@/src/lib/firebase'
import { doc, setDoc, serverTimestamp, getDocs, collection, deleteDoc } from 'firebase/firestore'
import { MdDelete, MdSave, MdEdit, MdAdd } from 'react-icons/md'
import styles from '@/src/styles/admin.module.css'

interface FAQ {
  id: string
  question: string
  answer: string
}

const ContentFaq = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null)

  // Fetch FAQs on component mount
  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    try {
      const faqsRef = collection(db, 'travelcontents/faq/list')
      const snapshot = await getDocs(faqsRef)
      const faqsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FAQ[]
      setFaqs(faqsData)
    } catch (error) {
      console.error('FAQ verileri çekilirken hata:', error)
    }
  }

  const handleSave = async () => {
    if (!question || !answer) {
      alert('Soru ve cevap gereklidir')
      return
    }

    setLoading(true)
    try {
      const faqId = editingFaqId || Date.now().toString()

      await setDoc(
        doc(db, 'travelcontents/faq/list', faqId),
        {
          id: faqId,
          question,
          answer,
          updatedAt: serverTimestamp(),
          ...(editingFaqId ? {} : { createdAt: serverTimestamp() })
        },
        { merge: true }
      )

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)

      resetForm()
      await fetchFaqs()
    } catch (error) {
      console.error('Kaydedilirken hata:', error)
      alert('Kaydedilirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const deleteFaq = async (id: string) => {
    if (confirm('Bu soruyu silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'travelcontents/faq/list', id))
        await fetchFaqs()
      } catch (error) {
        console.error('Silinirken hata:', error)
        alert('Silinirken hata oluştu')
      }
    }
  }

  const editFaq = (faq: FAQ) => {
    setEditingFaqId(faq.id)
    setQuestion(faq.question)
    setAnswer(faq.answer)
    setIsEditMode(true)
  }

  const resetForm = () => {
    setQuestion('')
    setAnswer('')
    setIsEditMode(false)
    setEditingFaqId(null)
  }

  return (
    <div className={styles.contentServicesWrapper}>
      {/* Success Message */}
      {success && (
        <div className={styles.contentServicesSuccess}>
          ✓ Soru başarıyla kaydedildi
        </div>
      )}

      {/* Header */}
      <div className={styles.contentServicesHeader}>
        <h1 className={styles.contentServicesTitle} style={{fontSize:'32px'}}>
          {isEditMode ? 'Soruyu Düzenle' : 'Yeni Soru Ekle'}
        </h1>
        <p className={styles.contentServicesSubtitle} style={{fontSize:'16px'}}>
          {isEditMode ? 'Soru ve cevabını güncelleyin' : 'Sık Sorulan Sorular bölümüne yeni soru ekleyin'}
        </p>
      </div>

      {/* Form */}
      <div className={styles.contentServicesFormSection}>
        {/* Question */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px', fontWeight: '600'}}>Soru</label>
          <input
            type="text"
            placeholder="Soruyu girin"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={styles.contentServicesInput}
            style={{fontSize:'16px'}}
          />
        </div>

        {/* Answer */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px',fontWeight: '600'}}>Cevap</label>
          <textarea
            placeholder="Cevabı girin"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={styles.contentServicesTextarea}
            rows={6}
            style={{fontSize:'16px'}}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className={styles.contentServicesSaveButtonContainer}>
        <button
          onClick={handleSave}
          disabled={loading || !question || !answer}
          className={styles.contentServicesSaveBtn}
          style={{ backgroundColor: '#d7b76e', color: 'white', border: 'none' }}
        >
          <MdSave size={18} />
          {loading ? 'Kaydediliyor...' : isEditMode ? 'Güncelle' : 'Kaydet'}
        </button>
        {isEditMode && (
          <button
            onClick={resetForm}
            className={styles.contentServicesCancelBtn}
            style={{
              marginLeft: '8px',
              padding: '10px 20px',
              background: '#f3f4f6',
              color: '#666',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            İptal
          </button>
        )}
      </div>

      {/* FAQ List */}
      <div style={{ marginTop: '48px' }}>
        <h2 className={styles.contentServicesTreatmentsTitle} style={{fontSize:'24px'}}>Kayıtlı Sorular</h2>
        {faqs.length === 0 ? (
          <div className={styles.contentServicesEmptyTreatments}>
            Henüz soru eklenmemiş
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '16px',
            marginTop: '20px'
          }}>
            {faqs.map((faq) => (
              <div
                key={faq.id}
                style={{
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 12px 0', color: '#d7b76e' }}>
                  S: {faq.question}
                </h3>
                <p style={{ fontSize: '15px', color: '#666', margin: '0 0 16px 0', lineHeight: '1.6', paddingLeft: '16px' }}>
                  C: {faq.answer}
                </p>
                <div style={{ display: 'flex', gap: '8px',marginTop: '12px' }}>
                  <button
                    onClick={() => editFaq(faq)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '6px 12px',
                      background: '#d7b76e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    <MdEdit size={16} />
                    Düzenle
                  </button>
                  <button
                    onClick={() => deleteFaq(faq.id)}
                    style={{
                      flex: 1,
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
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    <MdDelete size={16} />
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentFaq