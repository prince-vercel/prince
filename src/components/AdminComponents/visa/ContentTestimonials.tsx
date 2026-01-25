/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { db } from '@/src/lib/firebase'
import { doc, setDoc, serverTimestamp, getDocs, collection, deleteDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { MdDelete, MdSave, MdEdit, MdAdd } from 'react-icons/md'
import styles from '@/src/styles/admin.module.css'
import LanguageSelector from '../../LanguageSelector'
import { getCollectionName } from '../../../lib/localization'

interface Testimonial {
  id: string
  name: string
  text: string
  imageUrl: string
}

const ContentTestimonials = () => {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru' | 'es' | 'ar' | 'ru'>('tr')

  // Fetch Testimonials on component mount
  useEffect(() => {
    fetchTestimonials()
  }, [selectedLanguage])

  const fetchTestimonials = async () => {
    try {
      const testimonialsRef = collection(db, getCollectionName('visacontents/testimonials/list', selectedLanguage))
      const snapshot = await getDocs(testimonialsRef)
      const testimonialsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Testimonial[]
      setTestimonials(testimonialsData)
    } catch (error) {
      console.error('Yorum verileri çekilirken hata:', error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const storage = getStorage()
      const storageRef = ref(storage, `testimonials/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setImageUrl(url)
      setSelectedFile(file)
    } catch (error) {
      console.error('Görsel yükleme hatası:', error)
      alert('Görsel yükleme başarısız oldu')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSave = async () => {
    if (!name || !text || !imageUrl) {
      alert('Ad, metin ve görsel gereklidir')
      return
    }

    setLoading(true)
    try {
      const testimonialId = editingTestimonialId || Date.now().toString()

      await setDoc(
        doc(db, getCollectionName('visacontents/testimonials/list', selectedLanguage), testimonialId),
        {
          id: testimonialId,
          name,
          text,
          imageUrl,
          updatedAt: serverTimestamp(),
          ...(editingTestimonialId ? {} : { createdAt: serverTimestamp() })
        },
        { merge: true }
      )

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)

      resetForm()
      await fetchTestimonials()
    } catch (error) {
      console.error('Kaydedilirken hata:', error)
      alert('Kaydedilirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const deleteTestimonial = async (id: string, imageUrl: string) => {
    if (confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      try {
        // Görsel sil
        const storage = getStorage()
        const imageRef = ref(storage, imageUrl)
        try {
          await deleteObject(imageRef)
        } catch (err) {
          console.log('Görsel zaten silinmiş')
        }

        // Veri sil
        await deleteDoc(doc(db, getCollectionName('visacontents/testimonials/list', selectedLanguage), id))
        await fetchTestimonials()
      } catch (error) {
        console.error('Silinirken hata:', error)
        alert('Silinirken hata oluştu')
      }
    }
  }

  const editTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonialId(testimonial.id)
    setName(testimonial.name)
    setText(testimonial.text)
    setImageUrl(testimonial.imageUrl)
    setIsEditMode(true)
  }

  const resetForm = () => {
    setName('')
    setText('')
    setImageUrl('')
    setSelectedFile(null)
    setIsEditMode(false)
    setEditingTestimonialId(null)
  }

  return (
    <div className={styles.contentServicesWrapper}>
      {/* Success Message */}
      {success && (
        <div className={styles.contentServicesSuccess}>
          ✓ Yorum başarıyla kaydedildi
        </div>
      )}
 {/* Language Selector */}
      <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />

      {/* Header */}
      <div className={styles.contentServicesHeader}>
        <h1 className={styles.contentServicesTitle} style={{fontSize:'32px'}}>
          {isEditMode ? 'Yorumu Düzenle' : 'Yeni Yorum Ekle'}
        </h1>
        <p className={styles.contentServicesSubtitle} style={{fontSize:'16px'}}>
          {isEditMode ? 'Yorum bilgilerini güncelleyin' : 'Müşteri yorumları bölümüne yeni yorum ekleyin'}
        </p>
      </div>

     
      {/* Form */}
      <div className={styles.contentServicesFormSection}>
        {/* Name */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px', fontWeight: '600'}}>Ad</label>
          <input
            type="text"
            placeholder="Müşteri adını girin"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.contentServicesInput}
            style={{fontSize:'16px'}}
          />
        </div>

        {/* Text */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px', fontWeight: '600'}}>Yorum Metni</label>
          <textarea
            placeholder="Yorum metnini girin"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.contentServicesTextarea}
            rows={6}
            style={{fontSize:'16px'}}
          />
        </div>

        {/* Image Upload */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px',  fontWeight: '600'}}>Profil Görseli (1:1)</label>
          <div style={{
            border: '2px dashed #ddd',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
              disabled={uploadingImage}
            />
            <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'block' }}>
              {uploadingImage ? 'Yükleniyor...' : imageUrl ? '✓ Görsel yüklendi (değiştirmek için tıklayın)' : 'Görsel seçmek için tıklayın'}
            </label>
          </div>

          {imageUrl && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <img 
                src={imageUrl} 
                alt="preview" 
                style={{ maxWidth: '150px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className={styles.contentServicesSaveButtonContainer}>
        <button
          onClick={handleSave}
          disabled={loading || !name || !text || !imageUrl || uploadingImage}
          className={styles.contentServicesSaveBtn}
          style={{ backgroundColor: '#c42721', color: 'white', border: 'none' }}
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

      {/* Testimonials List */}
      <div style={{ marginTop: '48px' }}>
        <h2 className={styles.contentServicesTreatmentsTitle} style={{fontSize:'24px'}}>Kayıtlı Yorumlar</h2>
        {testimonials.length === 0 ? (
          <div className={styles.contentServicesEmptyTreatments}>
            Henüz yorum eklenmemiş
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                style={{
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <img 
                  src={testimonial.imageUrl} 
                  alt={testimonial.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '16px'
                  }}
                />
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 12px 0', color: '#307bc4' }}>
                  {testimonial.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0', lineHeight: '1.6', minHeight: '80px' }}>
                  "{testimonial.text}"
                </p>
                <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '12px' }}>
                  <button
                    onClick={() => editTestimonial(testimonial)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '6px 12px',
                      background: '#c42721',
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
                    onClick={() => deleteTestimonial(testimonial.id, testimonial.imageUrl)}
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

export default ContentTestimonials
