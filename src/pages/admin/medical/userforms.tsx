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
import { MedicalFormData } from '@/src/types/medical'
import styles from '@/src/styles/admin.module.css'
import SendEmail from '@/src/components/AdminComponents/SendEmail'

interface FormWithId extends MedicalFormData {
  id: string
  admin?: {
    answered: boolean
    answerText: string
    answeredAt: Date
  }
}

const PAGE_SIZE = 5

const GetForms = () => {
  const [forms, setForms] = useState<FormWithId[]>([])
  const [lastDoc, setLastDoc] = useState<any>(null)
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

  const fetchForms = useCallback(async (loadMore = false) => {
    const q = query(
      collection(db, 'medicalforms'),
      orderBy('createdAt', 'desc'),
      ...(loadMore && lastDoc ? [startAfter(lastDoc)] : []),
      limit(PAGE_SIZE)
    )

    const snap = await getDocs(q)
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() })) as FormWithId[]

    setLastDoc(snap.docs[snap.docs.length - 1])
    setForms(loadMore ? [...forms, ...list] : list)
  }, [lastDoc])

const hasFetched = useRef(false)

useEffect(() => {
  if (hasFetched.current) return
  hasFetched.current = true

  fetchForms()
  fetchCount()
}, [fetchForms])


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
          forms
            .filter(item =>
              item.personal.fullName.toLowerCase().includes(filterName.toLowerCase())
            )
            .map((item, index) => (
              <div key={item.id} className={styles.gfCard}>
                {/* KAPALI HAL SATIR */}
                <div className={styles.gfCardRow}>
                  <div className={styles.gfRowNumber}>{index + 1}</div>
                  <div className={styles.gfRowDate}>
                    {item.createdAt?.toDate
                      ? item.createdAt.toDate().toLocaleDateString('tr-TR')
                      : '-'}
                  </div>
                  <div className={styles.gfRowName}>{item.personal.fullName}</div>

                  <div className={styles.gfRowActions}>
                    <button
                      className={styles.gfIconBtn}
                      title="Sil"
                      onClick={() =>
                        openDeleteModal(item.id, item.personal.fullName)
                      }
                    >
                      <i className="fas fa-trash"></i>
                    </button>

                    <button
                      className={styles.gfIconBtn}
                      title="Cevapla"
                      onClick={() => {
                        setSelectedEmail({email: item.personal.email, name: item.personal.fullName})
                        setShowEmailModal(true)
                      }}
                    >
                      <i className="fas fa-envelope"></i>
                    </button>

                    <button
                      className={styles.gfIconBtn}
                      title="Detay"
                      onClick={() =>
                        setExpandedId(expandedId === item.id ? null : item.id)
                      }
                    >
                      <i
                        className={`fas fa-chevron-${
                          expandedId === item.id ? 'up' : 'down'
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                {/* AÇIK HAL DETAY */}
                {expandedId === item.id && (
                  <div className={styles.gfCardContent}>
                    <div className={styles.gfSection}>
                      <h3>Kişisel Bilgiler</h3>
                      <div className={styles.gfFields}>
                        <div className={styles.gfField}>
                          <label>Email</label>
                          <div>{item.personal.email}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Telefon</label>
                          <div>{item.personal.phone}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Cinsiyet</label>
                          <div>{item.personal.gender}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Doğum Tarihi</label>
                          <div>{item.personal.birthDate}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Uyruk</label>
                          <div>{item.personal.nationality}</div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.gfSection}>
                      <h4>Medikal Geçmiş</h4>
                      <div className={styles.gfFields}>
                        <div className={styles.gfField}>
                          <label>Kronik Hastalık</label>
                          <div>{item.medical.chronicDisease}</div>
                        </div>
                        {item.medical.chronicDisease === 'Evet' &&
                          item.medical.chronicDiseaseDetail && (
                            <div className={styles.gfField}>
                              <label>Kronik Hastalık Detayı</label>
                              <div>{item.medical.chronicDiseaseDetail}</div>
                            </div>
                          )}
                        <div className={styles.gfField}>
                          <label>Kalp Rahatsızlığı</label>
                          <div>{item.medical.heartDisease}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Diyabet</label>
                          <div>{item.medical.diabetes}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Yüksek Tansiyon</label>
                          <div>{item.medical.hypertension}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Kanser Geçmişi</label>
                          <div>{item.medical.cancer}</div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.gfSection}>
                      <h4>İşlem Detayları</h4>
                      <div className={styles.gfFields}>
                        <div className={styles.gfField}>
                          <label>İşlem</label>
                          <div>
                            {item.operation.operation}
                            {item.operation.otherOperation &&
                              ` (${item.operation.otherOperation})`}
                          </div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Danışma Alındı mı</label>
                          <div>{item.operation.consultation}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>İlk Ameliyat mı</label>
                          <div>{item.operation.firstSurgery}</div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.gfSection}>
                      <h4>Seyahat Bilgileri</h4>
                      <div className={styles.gfFields}>
                        <div className={styles.gfField}>
                          <label>Seyahat Zamanı</label>
                          <div>{item.travel.travelTime}</div>
                        </div>
                        {item.travel.travelDate && (
                          <div className={styles.gfField}>
                            <label>Seyahat Tarihi</label>
                            <div>{item.travel.travelDate}</div>
                          </div>
                        )}
                        <div className={styles.gfField}>
                          <label>Kişi Sayısı</label>
                          <div>{item.travel.personCount}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Uçak Bileti</label>
                          <div>{item.travel.ticketStatus}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Varış Havalimanı</label>
                          <div>
                            {item.travel.airport}
                            {item.travel.otherAirport &&
                              ` (${item.travel.otherAirport})`}
                          </div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Otel İhtiyacı</label>
                          <div>{item.travel.hotelNeed}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>VIP Transfer</label>
                          <div>{item.travel.vipTransfer}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Araç Tercihi</label>
                          <div>{item.travel.vehicleChoice}</div>
                        </div>
                      </div>
                    </div>

                    {item.admin?.answered && (
                      <div className={styles.gfAnswerBox}>
                        <p className={styles.gfAnswerLabel}>Admin Cevabı</p>
                        <p>{item.admin.answerText}</p>
                      </div>
                    )}

                    {item.extraInfo && (
                      <div className={styles.gfSection}>
                        <h4>Ek Bilgiler</h4>
                        <div className={styles.gfField}>
                          <label>Doktor Notu</label>
                          <div style={{ whiteSpace: 'pre-line' }}>
                            {item.extraInfo}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
        )}

        {forms.length < total && (
          <div className={styles.gfPagination}>
            <button onClick={() => fetchForms(true)}>
              Daha Fazla Yükle ({forms.length}/{total})
            </button>
          </div>
        )}
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