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
import { AdminMedicalLayout } from '@/src/components/AdminComponents/medical/AdminMedicalLayout'
import SendEmail from '@/src/components/AdminComponents/SendEmail'

interface ContactWithId {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: any
}

const PAGE_SIZE = 5

const ContactForms = () => {
  const [forms, setForms] = useState<ContactWithId[]>([])
  const [lastDoc, setLastDoc] = useState<any>(null)
  const [total, setTotal] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<{email: string, name: string} | null>(null)
  const [filterName, setFilterName] = useState('')

  const fetchCount = async () => {
    const snap = await getCountFromServer(collection(db, 'medicalcontact'))
    setTotal(snap.data().count)
  }

 const fetchForms = useCallback(async (loadMore = false) => {
  const q = query(
    collection(db, 'medicalcontact'),
    orderBy('createdAt', 'desc'),
    ...(loadMore && lastDoc ? [startAfter(lastDoc)] : []),
    limit(PAGE_SIZE)
  )

  const snap = await getDocs(q)
  const list = snap.docs.map(d => ({ id: d.id, ...d.data() })) as ContactWithId[]

  setLastDoc(snap.docs[snap.docs.length - 1])
  setForms(prev => loadMore ? [...prev, ...list] : list)
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
      <div className={styles.gfContainer}>
        <h1 className={styles.gfTitle}>İletişim Mesajları</h1>
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
              style={{fontSize:'16px'}}
            />
          </div>
          <div className={styles.gfStatBox}>
            <p className={styles.gfStatLabel} style={{fontSize:'16px'}}>Toplam Kayıt: <span className={styles.gfStatValue}>{total}</span></p>
          </div>
        </div>

        {forms
          .filter(item =>
            item.name.toLowerCase().includes(filterName.toLowerCase())
          )
          .map((item, index) => (
          <div key={item.id} className={styles.gfCard}>
            <div className={styles.gfCardRow}>
              <div className={styles.gfRowNumber} style={{fontSize:'16px'}}>{index + 1}</div>
              <div className={styles.gfRowDate} style={{fontSize:'15px'}}>
                {item.createdAt?.toDate?.().toLocaleDateString('tr-TR')}
              </div>
              <div className={styles.gfRowName} style={{fontSize:'16px'}}>{item.name}</div>

              <div className={styles.gfRowActions}>
                <button
                  className={styles.gfIconBtn}
                  onClick={() =>
                    setExpandedId(expandedId === item.id ? null : item.id)
                  }
                  title="Detayları göster/gizle"
                >
                  <i className={`fas fa-chevron-${expandedId === item.id ? 'up' : 'down'}`}></i>
                </button>

                <button
                  className={styles.gfIconBtn}
                  onClick={() => {
                    setSelectedEmail({email: item.email, name: item.name})
                    setShowEmailModal(true)
                  }}
                  title="Cevap gönder"
                >
                  <i className="fas fa-envelope"></i>
                </button>

                <button
                  className={styles.gfIconBtn}
                  onClick={() => deleteDoc(doc(db, 'medicalcontact', item.id))}
                  title="Sil"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>

            {expandedId === item.id && (
              <div className={styles.gfCardContent}>
                <div className={styles.gfField}>
                  <label style={{fontSize:'15px'}}>Email</label>
                  <div style={{fontSize:'16px'}}>{item.email}</div>
                </div>
                <div className={styles.gfField}>
                  <label style={{fontSize:'15px'}}>Konu</label>
                  <div style={{fontSize:'16px'}}>{item.subject}</div>
                </div>
                <div className={styles.gfField}>
                  <label style={{fontSize:'15px'}}>Mesaj</label>
                  <div style={{ whiteSpace: 'pre-line', fontSize:'16px' }}>{item.message}</div>
                </div>
              </div>
            )}
          </div>
        ))}

        {forms.length < total && (
          <div className={styles.gfPagination}>
            <button onClick={() => fetchForms(true)} style={{fontSize:'16px'}}>
              Daha Fazla Yükle ({forms.length}/{total})
            </button>
          </div>
        )}
      </div>

      <SendEmail 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        recipientEmail={selectedEmail?.email || ''}
        recipientName={selectedEmail?.name || ''}
      />
    </AdminMedicalLayout>
  )
}

export default ContactForms
