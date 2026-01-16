/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useRef } from 'react'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import { storage } from '@/src/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import styles from '@/src/styles/admin.module.css'
  import { MdEdit, MdDelete, MdLocationOn, MdDateRange, MdImage, MdStar, MdStarOutline, MdChat } from 'react-icons/md'
import SendEmail from '../../SendEmail'
import LanguageSelector from '../../LanguageSelector'
import { getCollectionName } from '@/src/lib/localization'

interface Tour {
  id: string
  title: string
  description: string
  duration: string
  maxPeople: number
  location: string
  price: number
  includedInPrice: string
  notIncludedInPrice: string
  days?: string[]
  startDate?: string
  endDate?: string
  tourPlan: Array<{ day: number; content: string }>
  faq: Array<{ question: string; answer: string }>
  mainImageUrl?: string
  galleryImageUrls?: string[]
  imageUrl?: string
  isFavorite?: boolean
  createdAt: any
}

interface FormData {
  title: string
  description: string
  duration: string
  maxPeople: number
  location: string
  price: number
  includedInPrice: string
  notIncludedInPrice: string
  days: string[]
  startDate?: string
  endDate?: string
  tourPlan: Array<{ day: number; content: string }>
  faq: Array<{ question: string; answer: string }>
  mainImageUrl: string
  galleryImageUrls: string[]
}

const ContentTours = () => {
  const [tours, setTours] = useState<Tour[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [selectedTourEnquiries, setSelectedTourEnquiries] = useState<string | null>(null)
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [enquiryPage, setEnquiryPage] = useState(1)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<{ email: string; name: string } | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru'>('tr')
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    duration: '4 Gün 5 Gece',
    maxPeople: 10,
    location: '',
    price: 0,
    includedInPrice: '',
    notIncludedInPrice: '',
    days: ['Her Gün'],
    startDate: '',
    endDate: '',
    tourPlan: [{ day: 1, content: '' }],
    faq: [{ question: '', answer: '' }],
    mainImageUrl: '',
    galleryImageUrls: []
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchTours()
  }, [selectedLanguage])

  const fetchTours = async () => {
    try {
      const q = query(collection(db, getCollectionName('traveltours', selectedLanguage)), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setTours(snap.docs.map(d => ({ id: d.id, ...d.data() })) as Tour[])
    } catch (error) {
      console.error('Tur yükleme hatası:', error)
    }
  }

  const fetchEnquiries = async (tourId: string) => {
    try {
      const q = query(collection(db, getCollectionName('traveltours', selectedLanguage), tourId, 'enquiries'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setEnquiries(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (error) {
      console.error('Enquiry yükleme hatası:', error)
    }
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaq = [...formData.faq]
    newFaq[index][field] = value
    setFormData(prev => ({ ...prev, faq: newFaq }))
  }

  const addFaqItem = () => {
    setFormData(prev => ({
      ...prev,
      faq: [...prev.faq, { question: '', answer: '' }]
    }))
  }

  const removeFaqItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faq: prev.faq.filter((_, i) => i !== index)
    }))
  }

  const handleTourPlanChange = (index: number, field: 'day' | 'content', value: any) => {
    const newPlan = [...formData.tourPlan]
    if (field === 'day') {
      newPlan[index][field] = parseInt(value)
    } else {
      newPlan[index][field] = value
    }
    setFormData(prev => ({ ...prev, tourPlan: newPlan }))
  }

  const addTourPlanDay = () => {
    const maxDay = Math.max(...formData.tourPlan.map(p => p.day), 0)
    setFormData(prev => ({
      ...prev,
      tourPlan: [...prev.tourPlan, { day: maxDay + 1, content: '' }]
    }))
  }

  const removeTourPlanDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tourPlan: prev.tourPlan.filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setUploadingImage(true)
      try {
        const newUrls: string[] = []
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          const timestamp = Date.now()
          const storageRef = ref(storage, `tours/${timestamp}_${i}_${file.name}`)
          const snapshot = await uploadBytes(storageRef, file)
          const downloadUrl = await getDownloadURL(snapshot.ref)
          newUrls.push(downloadUrl)
        }
        setFormData(prev => ({ ...prev, galleryImageUrls: [...prev.galleryImageUrls, ...newUrls] }))
      } catch (error) {
        console.error('Görsel yükleme hatası:', error)
        alert('Görsel yükleme başarısız oldu')
      } finally {
        setUploadingImage(false)
      }
    }
  }

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadingImage(true)
      try {
        const timestamp = Date.now()
        const storageRef = ref(storage, `tours/${timestamp}_main_${file.name}`)
        const snapshot = await uploadBytes(storageRef, file)
        const downloadUrl = await getDownloadURL(snapshot.ref)
        setFormData(prev => ({ ...prev, mainImageUrl: downloadUrl }))
      } catch (error) {
        console.error('Görsel yükleme hatası:', error)
        alert('Görsel yükleme başarısız oldu')
      } finally {
        setUploadingImage(false)
      }
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, mainImageUrl: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImageByIndex = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImageUrls: prev.galleryImageUrls.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingId) {
        await updateDoc(doc(db, getCollectionName('traveltours', selectedLanguage), editingId), {
          ...formData,
          updatedAt: serverTimestamp()
        })
        setSuccess('Tur başarıyla güncellendi!')
      } else {
        await addDoc(collection(db, getCollectionName('traveltours', selectedLanguage)), {
          ...formData,
          createdAt: serverTimestamp()
        })
        setSuccess('Tur başarıyla eklendi!')
      }

      setFormData({
        title: '',
        description: '',
        duration: '4 Gün 5 Gece',
        maxPeople: 10,
        location: '',
        price: 0,
        includedInPrice: '',
        notIncludedInPrice: '',
        days: ['Her Gün'],
        startDate: '',
        endDate: '',
        tourPlan: [{ day: 1, content: '' }],
        faq: [{ question: '', answer: '' }],
        mainImageUrl: '',
        galleryImageUrls: []
      })
      setEditingId(null)
      setShowForm(false)
      fetchTours()

      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Hata:', error)
      alert('İşlem başarısız oldu')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (tour: Tour) => {
    setFormData({
      title: tour.title,
      description: tour.description,
      duration: tour.duration,
      maxPeople: tour.maxPeople,
      location: tour.location,
      price: tour.price,
      includedInPrice: tour.includedInPrice,
      notIncludedInPrice: tour.notIncludedInPrice,
      days: tour.days || ['Her Gün'],
      startDate: tour.startDate || '',
      endDate: tour.endDate || '',
      tourPlan: tour.tourPlan,
      faq: tour.faq,
      mainImageUrl: tour.mainImageUrl || tour.imageUrl || '',
      galleryImageUrls: tour.galleryImageUrls || []
    })
    setEditingId(tour.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu turu silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, getCollectionName('traveltours', selectedLanguage), id))
        setSuccess('Tur silindi!')
        fetchTours()
        setTimeout(() => setSuccess(''), 3000)
      } catch (error) {
        console.error('Silme hatası:', error)
        alert('Silme işlemi başarısız oldu')
      }
    }
  }

  const toggleFavorite = async (id: string, currentFavorite: boolean) => {
    try {
      await updateDoc(doc(db, getCollectionName('traveltours', selectedLanguage), id), {
        isFavorite: !currentFavorite
      })
      fetchTours()
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Favori güncelleme hatası:', error)
      alert('İşlem başarısız oldu')
    }
  }

  return (
    <div className={styles.tourWrapper}>
      {success && <div className={styles.tourSuccess}>{success}</div>}
<LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
      {!showForm ? (
        <div>
          <div className={styles.tourHeader}>
            <h2 className={styles.tourTitle}>Turlar</h2>
            <button
              onClick={() => {
                setShowForm(true)
                setEditingId(null)
                setFormData({
                  title: '',
                  description: '',
                  duration: '4 Gün 5 Gece',
                  maxPeople: 10,
                  location: '',
                  price: 0,
                  includedInPrice: '',
                  notIncludedInPrice: '',
                  days: ['Her Gün'],
                  startDate: '',
                  endDate: '',
                  tourPlan: [{ day: 1, content: '' }],
                  faq: [{ question: '', answer: '' }],
                  mainImageUrl: '',
                  galleryImageUrls: []
                })
              }}
              className={styles.tourAddBtn} 
            >
              + Yeni Tur Ekle
            </button>
          </div>

          <div className={styles.tourList}>
            {tours.length === 0 ? (
              <div className={styles.tourEmpty}>Henüz tur eklenmemiş</div>
            ) : (
              tours.map(tour => (
                <div key={tour.id} className={styles.tourCard}>
                  <div className={styles.tourCardHeader}>
                    <div>
                      <h3 className={styles.tourCardTitle}>{tour.title}</h3>
                      <p className={styles.tourCardLocation}>
                        <MdLocationOn style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                        {tour.location}
                      </p>
                      {(tour.startDate || tour.endDate) && (
                        <p className={styles.tourCardLocation} style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                          <MdDateRange style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                          {tour.startDate && tour.endDate ? 
                            `${new Date(tour.startDate || '').toLocaleDateString('tr-TR')} - ${new Date(tour.endDate || '').toLocaleDateString('tr-TR')}` :
                            tour.startDate ? 
                              `Başlangıç: ${new Date(tour.startDate || '').toLocaleDateString('tr-TR')}` :
                              `Bitiş: ${new Date(tour.endDate || '').toLocaleDateString('tr-TR')}`
                          }
                        </p>
                      )}
                      {!tour.startDate && !tour.endDate && tour.days && tour.days.length > 0 && (
                        <p className={styles.tourCardLocation} style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                          <MdDateRange style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                          {tour.days.join(', ')}
                        </p>
                      )}
                    </div>
                    <div className={styles.tourCardActions}>
                      <button
                        onClick={() => toggleFavorite(tour.id, tour.isFavorite || false)}
                        className={styles.tourEditBtn}
                        title={tour.isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                        style={{ color: tour.isFavorite ? '#fbbf24' : '#ccc', transition: 'color 0.2s', background: 'white' }}
                      >
                        {tour.isFavorite ? <MdStar size={25} /> : <MdStarOutline size={25} />}
                      </button>
                      <button
                        onClick={() => handleEdit(tour)}
                        className={styles.tourEditBtn}
                        title="Düzenle"
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTourEnquiries(selectedTourEnquiries === tour.id ? null : tour.id)
                          if (selectedTourEnquiries !== tour.id) {
                            setEnquiryPage(1)
                            fetchEnquiries(tour.id)
                          }
                        }}
                        className={styles.tourEditBtn}
                        title="Gelen Talepleri Görünt"
                      >
                        <MdChat size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(tour.id)}
                        className={styles.tourDeleteBtn}
                        title="Sil"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </div>
                  <p className={styles.tourCardDesc}>{tour.description.substring(0, 150)}...</p>

                  {/* ENQUİRİES SECTION */}
                  {selectedTourEnquiries === tour.id && (
                    <div style={{
                      marginTop: '16px',
                      padding: '16px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      border: '1px solid #eee'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h5 style={{ fontSize: '16px', fontWeight: 'bold', color: '#030610', margin: 0 }}>
                          Gelen Bilgi Talepleri ({enquiries.length})
                        </h5>
                        <button
                          onClick={() => setSelectedTourEnquiries(null)}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '20px',
                            cursor: 'pointer',
                            color: '#999'
                          }}
                        >
                          ✕
                        </button>
                      </div>

                      {enquiries.length === 0 ? (
                        <p style={{ color: '#999', margin: 0 }}>Henüz talep gelmemiş</p>
                      ) : (
                        <>
                          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {enquiries
                              .slice((enquiryPage - 1) * 10, enquiryPage * 10)
                              .map((enquiry: any, idx: number) => (
                                <div
                                  key={enquiry.id}
                                  style={{
                                    borderBottom: '1px solid #ddd',
                                    paddingBottom: '12px',
                                    marginBottom: '12px'
                                  }}
                                >
                                  {/* Header Line: Name | Email | Phone */}
                                  <h6 style={{ marginBottom: '8px', fontWeight: 'bold', color: '#030610', margin: '0 0 8px 0', fontSize: '14px' }}>
                                    {(enquiryPage - 1) * 10 + idx + 1}. {enquiry.name} | <span style={{ fontWeight: 'normal', color: '#555' }}>{enquiry.email}</span> | <span style={{ fontWeight: 'normal', color: '#555' }}>{enquiry.phone}</span>
                                  </h6>

                                  {/* Message with SendEmail button */}
                                  {enquiry.message && (
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '8px' }}>
                                      <p style={{ margin: 0, fontSize: '13px', color: '#333', flex: 1, whiteSpace: 'pre-wrap' }}>
                                        <strong>Mesaj:</strong> {enquiry.message}
                                      </p>
                                      <div style={{ minWidth: '120px' }}>
                                        <button
                                          onClick={() => {
                                            setSelectedEmail({ email: enquiry.email, name: enquiry.name })
                                            setEmailModalOpen(true)
                                          }}
                                          style={{
                                            padding: '6px 12px',
                                            backgroundColor: '#d7b76e',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                          }}
                                        >
                                          Cevap
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  {/* Date */}
                                  <p style={{ fontSize: '11px', color: '#999', margin: '8px 0 0 0' }}>
                                    {enquiry.createdAt?.toDate?.().toLocaleString('tr-TR') || 'Bilinmiyor'}
                                  </p>
                                </div>
                              ))}
                          </div>

                          {/* PAGINATION */}
                          {Math.ceil(enquiries.length / 10) > 1 && (
                            <div style={{
                              marginTop: '12px',
                              paddingTop: '12px',
                              borderTop: '1px solid #ddd',
                              display: 'flex',
                              gap: '8px',
                              justifyContent: 'center'
                            }}>
                              {Array.from({ length: Math.ceil(enquiries.length / 10) }, (_, i) => i + 1).map(
                                page => (
                                  <button
                                    key={page}
                                    onClick={() => setEnquiryPage(page)}
                                    style={{
                                      padding: '6px 10px',
                                      border: enquiryPage === page ? '2px solid #d7b76e' : '1px solid #ddd',
                                      borderRadius: '4px',
                                      backgroundColor: enquiryPage === page ? '#ffe8e8' : 'white',
                                      color: enquiryPage === page ? '#d7b76e' : '#555',
                                      cursor: 'pointer',
                                      fontSize: '12px',
                                      fontWeight: enquiryPage === page ? 'bold' : 'normal'
                                    }}
                                  >
                                    {page}
                                  </button>
                                )
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.tourForm}>
          <div className={styles.tourFormHeader}>
            <h3>{editingId ? 'Turu Düzenle' : 'Yeni Tur Ekle'}</h3>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}
              className={styles.tourFormClose}
            >
              ✕
            </button>
          </div>

          <div className={styles.tourFormContent}>
            {/* Kapak Görseli */}
            <div className={styles.tourFormGroup}>
              <label>Kapak Görseli (En Üstte Gösterilecek)</label>
              <div className={styles.tourImageUploadBox}>
                {formData.mainImageUrl ? (
                  <div className={styles.tourImagePreview}>
                    <img src={formData.mainImageUrl} alt="Kapak" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className={styles.tourImageRemoveBtn}
                      title="Görseli Kaldır"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className={styles.tourImageUploadLabel}>
                    <MdImage size={32} />
                    <p>{uploadingImage ? 'Yükleniyor...' : 'Kapak görseli seçmek için tıklayın'}</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageUpload}
                      disabled={uploadingImage}
                      className={styles.tourImageInput}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Galeri Görselleri */}
            <div className={styles.tourFormGroup}>
              <label>Galeri Görselleri (Birden Fazla Eklenebilir)</label>
              <div className={styles.tourImageUploadBox}>
                {formData.galleryImageUrls.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
                    {formData.galleryImageUrls.map((url, idx) => (
                      <div key={idx} className={styles.tourImagePreview}>
                        <img src={url} alt={`Galeri ${idx + 1}`} />
                        <button
                          type="button"
                          onClick={() => removeImageByIndex(idx)}
                          className={styles.tourImageRemoveBtn}
                          title="Görseli Kaldır"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <label className={styles.tourImageUploadLabel} style={{ gridColumn: 'span 1' }}>
                      <MdImage size={32} />
                      <p style={{ fontSize: '12px' }}>{uploadingImage ? 'Yükleniyor...' : 'Resim Ekle'}</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className={styles.tourImageInput}
                      />
                    </label>
                  </div>
                ) : (
                  <label className={styles.tourImageUploadLabel}>
                    <MdImage size={32} />
                    <p>{uploadingImage ? 'Yükleniyor...' : 'Galeri görselleri seçmek için tıklayın (birden fazla seçebilirsiniz)'}</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className={styles.tourImageInput}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Başlık */}
            <div className={styles.tourFormGroup}>
              <label>Tur Başlığı</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => handleInputChange('title', e.target.value)}
                placeholder="Tur başlığını girin"
              />
            </div>

            {/* Açıklama */}
            <div className={styles.tourFormGroup}>
              <label>Açıklama</label>
              <textarea
                value={formData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                placeholder="Tur açıklamasını girin"
                rows={4}
              />
            </div>

            {/* 2 Kolon */}
            <div className={styles.tourFormRow}>
              <div className={styles.tourFormGroup}>
                <label>Konum/Şehir</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => {
                    const capitalized = e.target.value
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')
                    handleInputChange('location', capitalized)
                  }}
                  placeholder="Şehir/Destinasyon"
                />
              </div>
              <div className={styles.tourFormGroup}>
                <label>Fiyat (€)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={e => handleInputChange('price', parseInt(e.target.value))}
                  placeholder="500"
                />
              </div>
            </div>

            {/* Fiyata Dahil Olanlar */}
            <div className={styles.tourFormGroup}>
              <label>Fiyata Dahil Olanlar</label>
              <textarea
                value={formData.includedInPrice}
                onChange={e => handleInputChange('includedInPrice', e.target.value)}
                placeholder={" Otel konaklama\n Rehber hizmeti\n..."}
                rows={4}
              />
            </div>

            {/* Fiyata Dahil Olmayanlar */}
            <div className={styles.tourFormGroup}>
              <label>Fiyata Dahil Olmayanlar</label>
              <textarea
                value={formData.notIncludedInPrice}
                onChange={e => handleInputChange('notIncludedInPrice', e.target.value)}
                placeholder={"Kişisel harcamalar\nSigorta\n..."}
                rows={4}
              />
            </div>

            {/* Tarih Aralığı */}
            <div className={styles.tourFormGroup}>
              <label>Tarih Aralığı (İsteğe Bağlı)</label>
              <div className={styles.tourFormRow}>
                <div className={styles.tourFormGroup}>
                  <label>Başlangıç Tarihi</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={e => handleInputChange('startDate', e.target.value)}
                    className="w-full h-12 border border-gray-300 px-3 outline-0"
                    style={{ borderRadius: '4px', borderColor: '#ccc' }}
                  />
                </div>
                <div className={styles.tourFormGroup}>
                  <label>Bitiş Tarihi</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={e => handleInputChange('endDate', e.target.value)}
                    className="w-full h-12 border border-gray-300 px-3 outline-0"
                    style={{ borderRadius: '4px', borderColor: '#ccc' }}
                  />
                </div>
              </div>
            </div>



            {/* Tur Planı */}
            <div className={styles.tourFormGroup}>
              <div className={styles.tourPlanHeader}>
                <label>Tur Planı</label>
                <button
                  type="button"
                  onClick={addTourPlanDay}
                  className={styles.tourPlanAddBtn}
                >
                  + Gün Ekle
                </button>
              </div>

              {formData.tourPlan.map((plan, index) => (
                <div key={index} className={styles.tourPlanItem}>
                  <div className={styles.tourPlanDayRow}>
                    <div className={styles.tourPlanDayInput}>
                      <label>Gün</label>
                      <input
                        type="number"
                        min="1"
                        value={plan.day}
                        onChange={e => handleTourPlanChange(index, 'day', e.target.value)}
                        placeholder="1"
                      />
                    </div>
                    {formData.tourPlan.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTourPlanDay(index)}
                        className={styles.tourPlanRemoveBtn}
                      >
                        ✕ Sil
                      </button>
                    )}
                  </div>
                  <textarea
                    value={plan.content}
                    onChange={e => handleTourPlanChange(index, 'content', e.target.value)}
                    placeholder="Bu günün programını yazın..."
                    rows={4}
                    className={styles.tourPlanContent}
                  />
                </div>
              ))}
            </div>

            {/* SSS */}
            <div className={styles.tourFormGroup}>
              <div className={styles.tourFaqHeader}>
                <label>Sıkça Sorulan Sorular</label>
                <button
                  type="button"
                  onClick={addFaqItem}
                  className={styles.tourFaqAddBtn}
                >
                  + Soru Ekle
                </button>
              </div>

              {formData.faq.map((item, index) => (
                <div key={index} className={styles.tourFaqItem}>
                  <input
                    type="text"
                    value={item.question}
                    onChange={e => handleFaqChange(index, 'question', e.target.value)}
                    placeholder="Soruyu yazın"
                    className={styles.tourFaqQuestion}
                  />
                  <textarea
                    value={item.answer}
                    onChange={e => handleFaqChange(index, 'answer', e.target.value)}
                    placeholder="Cevabı yazın"
                    rows={3}
                    className={styles.tourFaqAnswer}
                  />
                  {formData.faq.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFaqItem(index)}
                      className={styles.tourFaqRemoveBtn}
                    >
                      ✕ Soru Sil
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tourFormActions}>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}
              className={styles.tourBtnCancel}
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={styles.tourBtnSave}
            >
              {loading ? 'Kaydediliyor...' : editingId ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      )}

      {/* SendEmail Modal */}
      <SendEmail
        isOpen={emailModalOpen}
        onClose={() => {
          setEmailModalOpen(false)
          setSelectedEmail(null)
        }}
        recipientEmail={selectedEmail?.email || ''}
        recipientName={selectedEmail?.name || ''}
      />
    </div>
  )
}

export default ContentTours