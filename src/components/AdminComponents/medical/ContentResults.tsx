/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { db } from '@/src/lib/firebase'
import { doc, setDoc, serverTimestamp, getDoc, getDocs, collection, deleteDoc } from 'firebase/firestore'
import { storage } from '@/src/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { MdDelete, MdSave, MdCloudUpload, MdEdit } from 'react-icons/md'
import styles from '@/src/styles/admin.module.css'

const medicalSpecialties = {
  dis: 'Diş',
  genital: 'Genital',
  gogus: 'Göğüs',
  goz: 'Göz',
  kalca: 'Kalça',
  kulak: 'Kulak',
  'boyun-ve-yuz': 'Boyun ve Yüz',
  burun: 'Burun',
  'sac-ekimi': 'Saç Ekimi',
  'vucut-sekillendirme-liposuction': 'Vücut Şekillendirme ve Liposuction',
}

type SpecialtyKey = keyof typeof medicalSpecialties

interface Result {
  id: string
  title: string
  description: string
  image: string
  category: SpecialtyKey
}

const ContentResults = () => {
  const [activeTab, setActiveTab] = useState<SpecialtyKey>('dis')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingResultId, setEditingResultId] = useState<string | null>(null)

  // Fetch results on component mount
  useEffect(() => {
    fetchResultsByCategory(activeTab)
  }, [activeTab])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageReset = () => {
    setImageFile(null)
    setImagePreview('')
  }

  const handleTabChange = async (newCategory: SpecialtyKey) => {
    setActiveTab(newCategory)
    resetForm()
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setImageFile(null)
    setImagePreview('')
    setIsEditMode(false)
    setEditingResultId(null)
  }

  const fetchResultsByCategory = async (category: SpecialtyKey) => {
    try {
      const resultsRef = collection(db, `medicalcontents/results/${category}`)
      const snapshot = await getDocs(resultsRef)
      const resultsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Result[]
      setResults(resultsData)
    } catch (error) {
      console.error('Sonuçlar çekilirken hata:', error)
    }
  }

  const handleSave = async () => {
    if (!title || !description || (!imageFile && !imagePreview)) {
      alert('Başlık, açıklama ve görsel gereklidir')
      return
    }

    setLoading(true)
    try {
      const resultId = editingResultId || Date.now().toString()
      let imageUrl = imagePreview

      if (imageFile) {
        const imageRef = ref(storage, `medicalcontents/results/${activeTab}/${resultId}`)
        await uploadBytes(imageRef, imageFile)
        imageUrl = await getDownloadURL(imageRef)
      }

      await setDoc(
        doc(db, `medicalcontents/results/${activeTab}`, resultId),
        {
          id: resultId,
          title,
          description,
          image: imageUrl,
          category: activeTab,
          updatedAt: serverTimestamp(),
          ...(editingResultId ? {} : { createdAt: serverTimestamp() })
        },
        { merge: true }
      )

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)

      resetForm()
      await fetchResultsByCategory(activeTab)
    } catch (error) {
      console.error('Kaydedilirken hata:', error)
      alert('Kaydedilirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const deleteResult = async (id: string) => {
    if (confirm('Bu sonucu silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, `medicalcontents/results/${activeTab}`, id))
        await fetchResultsByCategory(activeTab)
      } catch (error) {
        console.error('Silinirken hata:', error)
        alert('Silinirken hata oluştu')
      }
    }
  }

  const editResult = (result: Result) => {
    setEditingResultId(result.id)
    setTitle(result.title)
    setDescription(result.description)
    setImagePreview(result.image)
    setIsEditMode(true)
  }

  return (
    <div className={styles.contentServicesWrapper}>
      {/* Category Tabs */}
      <div className={styles.contentServicesTabsContainer}>
        {Object.entries(medicalSpecialties).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleTabChange(key as SpecialtyKey)}
            style={{
              padding: '4px 16px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === key ? '3px solid #307bc4' : 'transparent',
              color: activeTab === key ? '#307bc4' : '#666',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              transition: 'all 0.2s',
              marginBottom: '-2px',
              whiteSpace: 'nowrap'
            }}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Success Message */}
      {success && (
        <div className={styles.contentServicesSuccess}>
          ✓ Sonuç başarıyla kaydedildi
        </div>
      )}

      {/* Header */}
      <div className={styles.contentServicesHeader}>
        <h1 className={styles.contentServicesTitle} style={{fontSize:'32px'}}>
          {isEditMode ? `${medicalSpecialties[activeTab]} Sonucu Düzenle` : `${medicalSpecialties[activeTab]} Sonuçları`}
        </h1>
        <p className={styles.contentServicesSubtitle} style={{fontSize:'16px'}}>
          {isEditMode ? 'Sonuç bilgilerini güncelleyin' : 'Yeni sonuç ekleyin'}
        </p>
      </div>

      {/* Form */}
      <div className={styles.contentServicesFormSection}>
        {/* Title */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px'}}>Başlık</label>
          <input
            type="text"
            placeholder="Sonuç başlığını girin"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.contentServicesInput}
            style={{fontSize:'16px'}}
          />
        </div>

        {/* Description */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px'}}>Açıklama</label>
          <textarea
            placeholder="Sonuç açıklamasını girin"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.contentServicesTextarea}
            rows={4}
            style={{fontSize:'16px'}}
          />
        </div>

        {/* Image Upload */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px'}}>Görsel</label>
          <div
            onClick={() => document.getElementById('resultImageInput')?.click()}
            className={styles.contentServicesImageUploadContainer}
            style={imagePreview ? { background: '#f0f9ff' } : {}}
          >
            {imagePreview ? (
              <div>
                <div className={styles.contentServicesImagePreviewWrapper}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className={styles.contentServicesImagePreview}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleImageReset()
                    }}
                    className={styles.contentServicesImageRemoveBtn}
                  >
                    ✕
                  </button>
                </div>
                <p className={styles.contentServicesImageFileName}>
                  {imageFile?.name || 'Mevcut görsel'}
                </p>
              </div>
            ) : (
              <div>
                <MdCloudUpload size={32} className={styles.contentServicesImageUploadIcon} />
                <p className={styles.contentServicesImageUploadText}>
                  Görsel yüklemek için tıklayın
                </p>
                <p className={styles.contentServicesImageUploadSubtext}>
                  PNG, JPG, GIF (Max 5MB)
                </p>
              </div>
            )}
            <input
              id="resultImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.contentServicesImageInput}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className={styles.contentServicesSaveButtonContainer}>
        <button
          onClick={handleSave}
          disabled={loading || !title || !description || (!imageFile && !imagePreview)}
          className={styles.contentServicesSaveBtn}
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

      {/* Results List */}
      <div style={{ marginTop: '48px' }}>
        <h2 className={styles.contentServicesTreatmentsTitle} style={{fontSize:'24px'}}>
          {medicalSpecialties[activeTab]} Sonuçları
        </h2>
        {results.length === 0 ? (
          <div className={styles.contentServicesEmptyTreatments}>
            Henüz sonuç eklenmemiş
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
            marginTop: '20px'
          }}>
            {results.map((result) => (
              <div
                key={result.id}
                style={{
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '16px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <img
                  src={result.image}
                  alt={result.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginBottom: '12px'
                  }}
                />
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>
                  {result.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#666', margin: '0 0 12px 0', lineHeight: '1.5' }}>
                  {result.description}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => editResult(result)}
                    style={{
                      flex: 1,
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
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    <MdEdit size={16} />
                    Düzenle
                  </button>
                  <button
                    onClick={() => deleteResult(result.id)}
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

export default ContentResults