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
import { AdminTravelLayout } from '@/src/components/AdminComponents/travel/AdminTravelLayout'

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
}

const PAGE_SIZE = 10

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

  const fetchForms = useCallback(async (loadMore = false) => {
    const q = query(
      collection(db, 'travelforms'),
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
            <p className={styles.gfStatLabel}>Toplam Kayıt: <span className={styles.gfStatValue} style={{ color: '#E8604C' }}>{total}</span></p>
          </div>
        </div>

        {forms.length === 0 ? (
          <div className={styles.gfEmpty}>Henüz başvuru yok</div>
        ) : (
          forms
            .filter(item =>
              item.name.toLowerCase().includes(filterName.toLowerCase())
            )
            .map((item, index) => (
              <div key={item.id} className={styles.gfCard}>
                {/* KAPALI HAL SATIR */}
                <div className={styles.gfCardRow}>
                  <div className={styles.gfRowNumber} style={{ color: '#E8604C', background: '#FBE9E3' }}>{index + 1}</div>
                  <div className={styles.gfRowDate}>
                    {item.createdAt?.toDate
                      ? item.createdAt.toDate().toLocaleDateString('tr-TR')
                      : '-'}
                  </div>
                  <div className={styles.gfRowName}>{item.name}</div>

                  <div className={styles.gfRowActions}>
                    <button
                      className={styles.gfIconBtn}
                      title="Sil"
                      onClick={() =>
                        openDeleteModal(item.id, item.name)
                      }
                    >
                      <i className="fas fa-trash"></i>
                    </button>

                    <button
                      className={styles.gfIconBtn}
                      title="Cevapla"
                      onClick={() => {
                        setSelectedEmail({email: item.email, name: item.name})
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
                          <label>Ad Soyad</label>
                          <div>{item.name}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>E-posta</label>
                          <div>{item.email}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Telefon</label>
                          <div>{item.phone}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Uyruk</label>
                          <div>{item.nationality}</div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.gfSection}>
                      <h3>Seyahat Bilgileri</h3>
                      <div className={styles.gfFields}>
                        <div className={styles.gfField}>
                          <label>Hedef Yer</label>
                          <div>{item.destination}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Seyahat Tarihi</label>
                          <div>{item.date || '-'}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Konaklama Süresi</label>
                          <div>{item.duration || '-'}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Kişi Sayısı</label>
                          <div>{item.guests || '-'}</div>
                        </div>
                        <div className={styles.gfField}>
                          <label>Havalimanı Transferi</label>
                          <div>{item.transfer || '-'}</div>
                        </div>
                      </div>
                    </div>

                    {item.requests && (
                      <div className={styles.gfSection}>
                        <h3>Özel Talepler</h3>
                        <div className={styles.gfFields}>
                          <div className={styles.gfField}>
                            <label>Talep</label>
                            <div style={{ whiteSpace: 'pre-line' }}>
                              {item.requests}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.contact && (
                      <div className={styles.gfSection}>
                        <h3>İletişim Tercihi</h3>
                        <div className={styles.gfFields}>
                          <div className={styles.gfField}>
                            <label>Tercih</label>
                            <div>{item.contact}</div>
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
    </AdminTravelLayout>
  )
}

export default GetForms