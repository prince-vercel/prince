/* eslint-disable react-hooks/preserve-manual-memoization */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import { AdminMedicalLayout } from '@/src/components/AdminComponents/medical/AdminMedicalLayout'
import styles from '@/src/styles/admin.module.css'
import SendEmail from '@/src/components/SendEmail'

interface Question {
  id: string
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

interface FormWithId {
  id: string
  answers: Record<string, any>
  createdAt?: any
  admin?: {
    answered: boolean
    answerText: string
    answeredAt: Date
  }
}

const PAGE_SIZE = 10

const GetForms = () => {
  const [forms, setForms] = useState<FormWithId[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteName, setDeleteName] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<{email: string, name: string} | null>(null)

  const deleteMedicalForm = async (id: string) => {
    await deleteDoc(doc(db, 'medicalforms', id))
    setForms(prev => prev.filter(f => f.id !== id))
    setShowDeleteModal(false)
    setDeleteId(null)
    setDeleteName('')
  }

  const openDeleteModal = (id: string, name: string) => {
    setDeleteId(id)
    setDeleteName(name)
    setShowDeleteModal(true)
  }

  const fetchCount = async () => {
    const snap = await getCountFromServer(collection(db, 'medicalforms'))
    setTotal(snap.data().count)
  }

  const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'questions'))
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
    }
  }

  const getQuestionText = (questionId: string): string => {
    const question = questions.find(q => q.id === questionId)
    return question ? question.questionText : questionId
  }

  const getFullName = (): string => {
    // Ad Soyad sorusunun ID'sini bul
    const nameQuestion = questions.find(q => q.questionText?.toLowerCase().includes('ad') && q.questionText?.toLowerCase().includes('soyad'))
    if (nameQuestion && forms.length > 0) {
      return forms[0].answers?.[nameQuestion.id] || 'İsim Bilinmiyor'
    }
    return 'İsim Bilinmiyor'
  }

  const fetchForms = useCallback(async () => {
    const q = query(
      collection(db, 'medicalforms'),
      orderBy('createdAt', 'desc')
    )

    const snap = await getDocs(q)
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() })) as FormWithId[]

    setForms(list)
  }, [])

const hasFetched = useRef(false)

useEffect(() => {
  if (hasFetched.current) return
  hasFetched.current = true

  fetchQuestions()
  fetchForms()
  fetchCount()
}, [])


  return (
    <AdminMedicalLayout>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <>
          <div
            className={styles.deleteModalBackdrop}
            onClick={() => setShowDeleteModal(false)}
          />
          <div className={styles.deleteModalContainer}>
            <h2 className={styles.deleteModalTitle}>Başvuruyu Sil</h2>
            <p className={styles.deleteModalText}>
              <strong>{deleteName}</strong> başvurusunu silmek istediğinize emin misiniz?
            </p>
            <p className={styles.deleteModalWarning}>
              Bu işlem geri alınamaz.
            </p>
            <div className={styles.deleteModalButtons}>
              <button
                className={styles.deleteModalCancelBtn}
                onClick={() => setShowDeleteModal(false)}
              >
                İptal
              </button>
              <button
                className={styles.deleteModalConfirmBtn}
                onClick={() => deleteId && deleteMedicalForm(deleteId)}
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </>
      )}

      <div className={styles.gfContainer}>
        <h1 className={styles.gfTitle}>Gelen Başvurular</h1>

        <div className={styles.filterWrapper}>
          <div className={styles.filterInputWrapper}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              id="nameFilter"
              type="text"
              placeholder="Kullanıcı adı yazın..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className={styles.filterInput}
            />
          </div>
          <div className={styles.gfStatBox}>
            <p className={styles.gfStatLabel}>Toplam Kayıt: <span className={styles.gfStatValue}>{total}</span></p>
          </div>
        </div>

        {forms.length === 0 ? (
          <div className={styles.gfEmpty}>Henüz başvuru yok</div>
        ) : (
          (() => {
            const totalPages = Math.ceil(total / PAGE_SIZE)
            const startIndex = (currentPage - 1) * PAGE_SIZE
            const endIndex = startIndex + PAGE_SIZE
            const paginatedForms = forms.slice(startIndex, endIndex)

            return (
              <>
                {paginatedForms
                  .filter(item => {
                    const fullName = item.answers ? Object.values(item.answers).find(v => typeof v === 'string' && v.length > 3) : ''
                    return String(fullName).toLowerCase().includes(filterName.toLowerCase())
                  })
                  .map((item, index) => {
                    // Ad Soyad'ı bul
                    const fullName = item.answers ? Object.entries(item.answers)
                      .find(([key, value]) => {
                        const q = questions.find(sq => sq.id === key)
                        return q?.questionText?.toLowerCase().includes('ad') && q?.questionText?.toLowerCase().includes('soyad')
                      })?.[1] : 'İsim Bilinmiyor'

                    // Email'i bul
                    const email = item.answers ? Object.entries(item.answers)
                      .find(([key]) => {
                        const q = questions.find(sq => sq.id === key)
                        return q?.type === 'text' && q?.questionText?.toLowerCase().includes('posta')
                      })?.[1] : 'Email Bilinmiyor'

                    return (
                      <>
                        {index === 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 16px', marginBottom: '16px',  backgroundColor: '#fafafa', borderRadius: '6px' }}>
                            <div style={{ flex: '0 0 50px', fontSize: '11px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                              Sıra
                            </div>
                            <div style={{ flex: '0 0 100px', fontSize: '11px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                              Tarih
                            </div>
                            <div style={{ flex: '1', fontSize: '11px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                              Ad
                            </div>
                            <div style={{ flex: '1.5', fontSize: '11px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                              İşlem
                            </div>
                          </div>
                        )}
                        <div key={item.id} className={styles.gfCard}>
                          {/* KAPALI HAL SATIR */}
                          <div className={styles.gfCardRow} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px' }}>
                            <div style={{ flex: '0 0 50px', fontSize: '14px', color: '#000', fontWeight: '500' }}>{startIndex + index + 1}</div>
                            <div style={{ flex: '0 0 100px', fontSize: '13px', color: '#666' }}>
                              {item.createdAt?.toDate
                                ? item.createdAt.toDate().toLocaleDateString('tr-TR')
                                : '-'}\n                            </div>\n                            <div style={{ flex: '1', fontSize: '14px', color: '#000', fontWeight: '500' }}>{fullName || 'İsim Bilinmiyor'}</div>\n\n                            <div style={{ flex: '1.2', fontSize: '14px', color: '#000', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>\n                              {(() => {\n                                const targetQuestionId = 'LGeWQVtcDgYkPGISWD0e'\n                                const answer = item.answers?.[targetQuestionId]\n                                if (!answer) return 'Cevap yok'\n                                const answerText = Array.isArray(answer) ? answer.join(', ') : String(answer)\n                                return `${answerText.substring(0, 50)}${answerText.length > 50 ? '...' : ''}`\n                              })()}\n                            </div>\n\n                            <div className={styles.gfRowActions}>\n                              <button\n                                className={styles.gfIconBtn}\n                                title=\"Sil\"\n                                onClick={() =>\n                                  openDeleteModal(item.id, String(fullName) || 'Başvuru')\n                                }\n                              >\n                                <i className=\"fas fa-trash\"></i>\n                              </button>\n\n                              <button\n                                className={styles.gfIconBtn}\n                                title=\"Cevapla\"\n                                onClick={() => {\n                                  setSelectedEmail({email: String(email) || '', name: String(fullName) || 'Başvurucu'})\n                                  setShowEmailModal(true)\n                                }}\n                              >\n                                <i className=\"fas fa-envelope\"></i>\n                              </button>\n\n                              <button\n                                className={styles.gfIconBtn}\n                                title=\"Detay\"\n                                onClick={() =>\n                                  setExpandedId(expandedId === item.id ? null : item.id)\n                                }\n                              >\n                                <i\n                                  className={`fas fa-chevron-${\n                                    expandedId === item.id ? 'up' : 'down'\n                                  }`}\n                                ></i>\n                              </button>\n                            </div>\n                          </div>\n\n                          {/* AÇIK HAL DETAY */}\n                          {expandedId === item.id && (\n                            <div className={styles.gfCardContent}>\n                              <div className={styles.gfSection}>\n                                <h3>Başvuru Detayları</h3>\n                                <div className={styles.gfFields}>\n                                  {questions.map(question => {\n                                    const answer = item.answers[question.id]\n                                    const additionalAnswer = item.answers[`${question.id}_additional`]\n                                    \n                                    if (!answer) return null\n\n                                    return (\n                                      <div key={question.id} className={styles.gfField}>\n                                        <label>{question.questionText}</label>\n                                        <div>\n                                          {Array.isArray(answer) ? answer.join(', ') : String(answer)}\n                                          {additionalAnswer && (\n                                            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>\n                                              ({question.additionalInputLabel}: {additionalAnswer})\n                                            </div>\n                                          )}\n                                        </div>\n                                      </div>\n                                    )\n                                  })}\n                                </div>\n                              </div>\n\n                              {item.admin?.answered && (\n                                <div className={styles.gfAnswerBox}>\n                                  <p className={styles.gfAnswerLabel}>Admin Cevabı</p>\n                                  <p>{item.admin.answerText}</p>\n                                </div>\n                              )}\n                            </div>\n                          )}\n                        </div>\n                      </>\n                    )\n                  })\n                )}\n\n                {totalPages > 1 && (\n                  <div className={styles.gfPagination} style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>\n                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (\n                      <button\n                        key={page}\n                        onClick={() => {\n                          setCurrentPage(page)\n                          window.scrollTo({ top: 0, behavior: 'smooth' })\n                        }}\n                        style={{\n                          padding: '8px 12px',\n                          border: page === currentPage ? '2px solid #d7b76e' : '1px solid #ddd',\n                          backgroundColor: page === currentPage ? '#fef3e2' : 'white',\n                          color: page === currentPage ? '#d7b76e' : '#000',\n                          borderRadius: '4px',\n                          cursor: 'pointer',\n                          fontWeight: page === currentPage ? 'bold' : 'normal',\n                          fontSize: '14px',\n                          transition: 'all 0.3s ease',\n                        }}\n                      >\n                        {page}\n                      </button>\n                    ))}\n                  </div>\n                )}\n              </>\n            )\n          })()\n        )}
      </div>

      {/* EMAIL MODAL */}
      <SendEmail 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        recipientEmail={selectedEmail?.email || ''}
        recipientName={selectedEmail?.name || ''}
      />
    </AdminMedicalLayout>
  )
}

export default GetForms