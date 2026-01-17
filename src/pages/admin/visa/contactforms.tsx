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
import { AdminVisaLayout } from '@/src/components/AdminComponents/visa/AdminVisaLayout'
import { MdDelete, MdEmail, MdExpandLess, MdExpandMore } from 'react-icons/md'

interface ContactWithId {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: any
}

const PAGE_SIZE = 10

const ContactForms = () => {
  const [forms, setForms] = useState<ContactWithId[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<{email: string, name: string} | null>(null)
  const [filterName, setFilterName] = useState('')

  const fetchCount = async () => {
    const snap = await getCountFromServer(collection(db, 'visacontact'))
    setTotal(snap.data().count)
  }

 const fetchForms = useCallback(async () => {
  const q = query(
    collection(db, 'visacontact'),
    orderBy('createdAt', 'desc')
  )

  const snap = await getDocs(q)
  const list = snap.docs.map(d => ({ id: d.id, ...d.data() })) as ContactWithId[]

  setForms(list)
}, [])


const hasFetched = useRef(false)

useEffect(() => {
  if (hasFetched.current) return
  hasFetched.current = true

  fetchForms()
  fetchCount()
}, [fetchForms])


  return (
    <AdminVisaLayout>
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
              placeholder="Ad soyad yazın..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className={styles.filterInput}
              style={{fontSize:'16px'}}
            />
          </div>
          <div className={styles.gfStatBox}>
            <p className={styles.gfStatLabel} style={{fontSize:'16px',}}>Toplam Kayıt: <span className={styles.gfStatValue} style={{ color: '#c42127' }}>{total}</span></p>
          </div>
        </div>

        {(() => {
          const totalPages = Math.ceil(total / PAGE_SIZE)
          const startIndex = (currentPage - 1) * PAGE_SIZE
          const endIndex = startIndex + PAGE_SIZE
          const paginatedForms = forms.slice(startIndex, endIndex)

          return (
            <>
              {paginatedForms
                .filter(item =>
                  `${item.first_name} ${item.last_name}`.toLowerCase().includes(filterName.toLowerCase())
                )
                .map((item, index) => (
                <div key={item.id} className={styles.gfCard}>
                  <div className={styles.gfCardRow}>
                    <div className={styles.gfRowNumber} style={{fontSize:'16px',color: '#c42127', background: '#f5e1de'}}>{startIndex + index + 1}</div>
                    <div className={styles.gfRowDate} style={{fontSize:'15px'}}>
                      {item.createdAt?.toDate?.().toLocaleDateString('tr-TR')}
                    </div>
                    <div className={styles.gfRowName} style={{fontSize:'16px'}}>{item.first_name} {item.last_name}</div>

                    <div className={styles.gfRowActions}>
                          <button
                        className={styles.gfIconBtn}
                        onClick={() => {
                          setSelectedEmail({email: item.email, name: `${item.first_name} ${item.last_name}`})
                          setShowEmailModal(true)
                        }}
                        title="Cevap gönder"
                      >
                        <MdEmail size={20} color="#888" />
                      </button>

                      <button
                        className={styles.gfIconBtn}
                        onClick={() => deleteDoc(doc(db, 'visacontact', item.id))}
                        title="Sil"
                      >
                        <MdDelete size={20} color="#888" />
                      </button>
                      <button
                        className={styles.gfIconBtn}
                        onClick={() =>
                          setExpandedId(expandedId === item.id ? null : item.id)
                        }
                        title="Detayları göster/gizle"
                      >
                        {expandedId === item.id ? (
                          <MdExpandLess size={20} color="#888" />
                        ) : (
                          <MdExpandMore size={20} color="#888" />
                        )}
                      </button>

                    </div>
                  </div>

                  {expandedId === item.id && (
                    <div className={styles.gfCardContent}>
                      <div className={styles.gfField}>
                        <label style={{fontSize:'15px'}}>Ad Soyad</label>
                        <div style={{fontSize:'16px'}}>{item.first_name} {item.last_name}</div>
                      </div>
                      <div className={styles.gfField}>
                        <label style={{fontSize:'15px'}}>E-posta</label>
                        <div style={{fontSize:'16px'}}>{item.email}</div>
                      </div>
                      <div className={styles.gfField}>
                        <label style={{fontSize:'15px'}}>Telefon</label>
                        <div style={{fontSize:'16px'}}>{item.phone}</div>
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
                        border: page === currentPage ? '2px solid #c42127' : '1px solid #ddd',
                        backgroundColor: page === currentPage ? '#fef3e2' : 'white',
                        color: page === currentPage ? '#c42127' : '#000',
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
      </div>

      <SendEmail 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        recipientEmail={selectedEmail?.email || ''}
        recipientName={selectedEmail?.name || ''}
      />
    </AdminVisaLayout>
  )
}

export default ContactForms
