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
import styles from '@/src/styles/admin.module.css'
import SendEmail from '@/src/components/SendEmail'
import { MdDelete, MdEmail, MdExpandMore, MdExpandLess } from 'react-icons/md'
import { AdminTravelLayout } from '@/src/components/AdminComponents/travel/AdminTravelLayout'

interface Question {
  id: string
  questionText: string
  type: 'select' | 'checkbox' | 'text' | 'date' | 'radio'
  options: string[]
  step: number
  required: boolean
  order: number
  createdAt?: Date
  additionalInputLabel?: string
}

interface TravelFormData {
  name: string
  nationality: string
  phone: string
  email: string
  destination: string
  date: string
  duration: string
  guests: string
  transfer: string
  requests: string
  contact: string
  createdAt?: any
}

interface FormWithId extends TravelFormData {
  id: string
  answers?: Record<string, any>
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

  const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'travelquestions'))
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

  const deleteMedicalForm = async (id: string) => {
    await deleteDoc(doc(db, 'travelforms', id))
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
    const snap = await getCountFromServer(collection(db, 'travelforms'))
    setTotal(snap.data().count)
  }

  const fetchForms = useCallback(async () => {
    const q = query(
      collection(db, 'travelforms'),
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
    <AdminTravelLayout>
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
            <p className={styles.gfStatLabel}>Toplam Kayıt: <span className={styles.gfStatValue} style={{ color: '#d7b76e' }}>{total}</span></p>
          </div>
        </div>

        {forms.length === 0 ? (
          <div className={styles.gfEmpty}>Henüz başvuru yok</div>
        ) : (
          <>
            {(() => {
              const totalPages = Math.ceil(total / PAGE_SIZE)
              const startIndex = (currentPage - 1) * PAGE_SIZE
              const endIndex = startIndex + PAGE_SIZE
              const paginatedForms = forms.slice(startIndex, endIndex)

              return (
                <>
                  {paginatedForms
                    .filter(item => {
                      const nameData = item.answers?.['3Ep6SK3ytFKskW6XacTN'] || item.name || ''
                      return String(nameData).toLowerCase().includes(filterName.toLowerCase())
                    })
                    .map((item, index) => {
                      const nameData = item.answers?.['3Ep6SK3ytFKskW6XacTN'] || item.name || 'İsim Bilinmiyor'
                      const locationData = item.answers?.['2PbarmXMOjCuAQNFLpbA'] || item.destination || 'Yer Bilinmiyor'
                      
                      const email = item.email || ''

                      return (
                        <>
                          {index === 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 16px', marginBottom: '16px', backgroundColor: '#fafafa', borderRadius: '6px' }}>
                              <div style={{ flex: '0 0 50px', fontSize: '11px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                                Sıra
                              </div>
                              <div style={{ flex: '0 0 100px', fontSize: '11px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                                Tarih
                              </div>
                              <div style={{ flex: '1', fontSize: '11px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                                Ad
                              </div>
                              <div style={{ flex: '1.7', fontSize: '11px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                                Yer
                              </div>
                           
                            </div>
                          )}
                          <div key={item.id} className={styles.gfCard}>
                            {/* KAPALI HAL SATIR */}
                            <div className={styles.gfCardRow}>
                              <div className={styles.gfRowNumber} style={{ color: '#d7b76e', background: '#f5edde' }}>{startIndex + index + 1}</div>
                              <div className={styles.gfRowDate}>
                                {item.createdAt?.toDate
                                  ? item.createdAt.toDate().toLocaleDateString('tr-TR')
                                  : '-'}
                              </div>
                              <div className={styles.gfRowName}>{nameData}</div>

                              <div style={{ flex: '1.2', fontSize: '14px', color: '#000', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {locationData}
                              </div>

                              <div className={styles.gfRowActions}>
                                <button
                                  className={styles.gfIconBtn}
                                  title="Sil"
                                  onClick={() =>
                                    openDeleteModal(item.id, nameData)
                                  }
                                >
                                  <MdDelete size={20} color="#888" />
                                </button>

                                <button
                                  className={styles.gfIconBtn}
                                  title="Cevapla"
                                  onClick={() => {
                                    setSelectedEmail({email: email, name: nameData})
                                    setShowEmailModal(true)
                                  }}
                                >
                                  <MdEmail size={20} color="#888" />
                                </button>

                                <button
                                  className={styles.gfIconBtn}
                                  title="Detay"
                                  onClick={() =>
                                    setExpandedId(expandedId === item.id ? null : item.id)
                                  }
                                >
                                  {expandedId === item.id ? (
                                    <MdExpandLess size={20} color="#888" />
                                  ) : (
                                    <MdExpandMore size={20} color="#888" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* AÇIK HAL DETAY */}
                            {expandedId === item.id && (
                              <div className={styles.gfCardContent}>
                                <div className={styles.gfSection}>
                                  <h3>Başvuru Detayları</h3>
                                  <div className={styles.gfFields}>
                                    {questions.map(question => {
                                      const answer = item.answers?.[question.id]
                                      const additionalAnswer = item.answers?.[`${question.id}_additional`]
                                      
                                      if (!answer) return null

                                      return (
                                        <div key={question.id} className={styles.gfField}>
                                          <label>{question.questionText}</label>
                                          <div>
                                            {Array.isArray(answer) ? answer.join(', ') : String(answer)}
                                            {additionalAnswer && (
                                              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                                                ({question.additionalInputLabel}: {additionalAnswer})
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )
                    })}

                  {totalPages > 1 && (
                    <div className={styles.gfPagination} style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => {
                            setCurrentPage(page)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                          style={{
                            padding: '8px 12px',
                            border: page === currentPage ? '2px solid #d7b76e' : '1px solid #ddd',
                            backgroundColor: page === currentPage ? '#fef3e2' : 'white',
                            color: page === currentPage ? '#d7b76e' : '#000',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: page === currentPage ? 'bold' : 'normal',
                            fontSize: '14px',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )
            })()}
          </>
        )}
      </div>

      {/* EMAIL MODAL */}
      <SendEmail 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        recipientEmail={selectedEmail?.email || ''}
        recipientName={selectedEmail?.name || ''}
      />
    </AdminTravelLayout>
  )
}

export default GetForms