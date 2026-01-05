/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { db } from '@/src/lib/firebase'
import { doc, setDoc, serverTimestamp, getDoc, getDocs, collection, deleteDoc } from 'firebase/firestore'
import { storage } from '@/src/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { MdAdd, MdDelete, MdSave, MdCloudUpload, MdEdit } from 'react-icons/md'
import styles from '@/src/styles/admin.module.css'

interface Treatment {
  title: string
  description: string
  image: string
  imageFile?: File
}

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

const ContentServices = () => {
  const [activeTab, setActiveTab] = useState<SpecialtyKey>('dis')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [existingImageUrl, setExistingImageUrl] = useState('')

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

  const handleTabChange = async (newSlug: SpecialtyKey) => {
    setActiveTab(newSlug)
    await fetchContentBySlug(newSlug)
  }

  const fetchContentBySlug = async (slug: SpecialtyKey) => {
    try {
      const ref = doc(db, 'medicalcontents', slug)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        const data = snap.data()
        setTitle(data.title || '')
        setDescription(data.description || '')
        setExistingImageUrl(data.image || '')
        setImagePreview(data.image || '')
        setTreatments(data.treatments || [])
        setIsEditMode(true)
      } else {
        setIsEditMode(false)
        setTitle('')
        setDescription('')
        setImageFile(null)
        setImagePreview('')
        setTreatments([])
        setExistingImageUrl('')
      }
    } catch (error) {
      console.error('Veri çekilirken hata:', error)
    }
  }

  const handleTreatmentImageChange = (index: number, file: File) => {
    const updated = [...treatments]
    updated[index] = { ...updated[index], imageFile: file }
    setTreatments(updated)
  }

  const addTreatment = () => {
    setTreatments([...treatments, { title: '', description: '', image: '' }])
  }

  type TreatmentStringKey = Exclude<keyof Treatment, 'imageFile'>

  const updateTreatment = (
    index: number,
    field: TreatmentStringKey,
    value: string
  ) => {
    const updated = [...treatments]
    updated[index] = { ...updated[index], [field]: value } as Treatment
    setTreatments(updated)
  }

  const removeTreatment = (index: number) => {
    setTreatments(treatments.filter((_, i) => i !== index))
  }

  const deleteService = async () => {
    if (confirm('Bu hizmeti ve tüm tedavilerini silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'medicalcontents', activeTab))
        alert('Hizmet başarıyla silindi')
        // Form sıfırla
        setTitle('')
        setDescription('')
        setImageFile(null)
        setImagePreview('')
        setTreatments([])
        setIsEditMode(false)
        setExistingImageUrl('')
      } catch (error) {
        console.error('Silinirken hata:', error)
        alert('Silinirken hata oluştu')
      }
    }
  }

  const handleSave = async () => {
    if (!title || (!imageFile && !existingImageUrl)) {
      alert('Başlık ve görsel gereklidir')
      return
    }

    setLoading(true)
    try {
      let mainImageUrl = existingImageUrl

      if (imageFile) {
        const imageRef = ref(storage, `medicalcontents/services/${activeTab}/${Date.now()}-main`)
        await uploadBytes(imageRef, imageFile)
        mainImageUrl = await getDownloadURL(imageRef)
      }

      const treatmentsWithUrls = await Promise.all(
        treatments.map(async (treatment) => {
          let imageUrl = treatment.image || ''

          if (treatment.imageFile) {
            const treatmentImageRef = ref(
              storage,
              `medicalcontents/services/${activeTab}/${Date.now()}-${treatment.title}`
            )
            await uploadBytes(treatmentImageRef, treatment.imageFile)
            imageUrl = await getDownloadURL(treatmentImageRef)
          }

          return {
            title: treatment.title,
            description: treatment.description,
            image: imageUrl
          }
        })
      )

      await setDoc(
        doc(db, 'medicalcontents', activeTab),
        {
          slug: activeTab,
          title,
          description,
          image: mainImageUrl,
          treatments: treatmentsWithUrls,
          updatedAt: serverTimestamp(),
          ...(isEditMode ? {} : { createdAt: serverTimestamp() })
        },
        { merge: true }
      )

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)

      setTitle('')
      setDescription('')
      setImageFile(null)
      setImagePreview('')
      setTreatments([])
      setIsEditMode(false)
      setExistingImageUrl('')
    } catch (error) {
      console.error('Hata:', error)
      alert('Kaydedilirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.contentServicesWrapper}>
      {/* Tabs */}
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
          ✓ Başarıyla kaydedildi
        </div>
      )}

      {/* Header */}
      <div className={styles.contentServicesHeader}>
        <h1 className={styles.contentServicesTitle}>
          {isEditMode ? ` Güncelle` : `Yeni Ekle`}
        </h1>
        <p className={styles.contentServicesSubtitle}>
          {isEditMode ? 'Hizmet bilgilerini güncelleyin' : 'Yeni hizmet ekleyin'}
        </p>
      </div>

      {/* Form Section */}
      <div className={styles.contentServicesFormSection}>
        {/* Title */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel}>
            Hizmet Başlığı
          </label>
          <input
            type="text"
            placeholder="Hizmet başlığını girin"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.contentServicesInput}
          />
        </div>

        {/* Description */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel}>
            Açıklama
          </label>
          <textarea
            placeholder="Hizmet hakkında detaylı açıklama yazın"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.contentServicesTextarea}
          />
        </div>

        {/* Image */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel}>
            Ana Görsel
          </label>
          <div
            onClick={() => document.getElementById('imageInput')?.click()}
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
                  {imageFile?.name}
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
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.contentServicesImageInput}
            />
          </div>
        </div>
      </div>

      {/* Treatments Section */}
      <div className={styles.contentServicesTreatmentsSection}>
        <div className={styles.contentServicesTreatmentsHeader}>
          <h2 className={styles.contentServicesTreatmentsTitle}>
            Tedaviler
          </h2>
          <button
            onClick={addTreatment}
            className={styles.contentServicesAddBtn}
          >
            <MdAdd size={18} />
            Tedavi Ekle
          </button>
        </div>

        {treatments.length === 0 ? (
          <div className={styles.contentServicesEmptyTreatments}>
            Henüz tedavi eklenmemiş. Yukarıdaki butona tıklayarak tedavi ekleyin.
          </div>
        ) : (
          <div className={styles.contentServicesTreatmentsList}>
            {treatments.map((t, i) => (
              <div
                key={i}
                className={styles.contentServicesTreatmentCard}
              >
                <div className={styles.contentServicesTreatmentCardHeader}>
                  <h3 className={styles.contentServicesTreatmentCardTitle}>
                    Tedavi #{i + 1}
                  </h3>
                  <button
                    onClick={() => removeTreatment(i)}
                    className={styles.contentServicesDeleteBtn}
                  >
                    <MdDelete size={16} />
                    Sil
                  </button>
                </div>

                {/* Treatment Title */}
                <div className={styles.contentServicesTreatmentFieldGroup}>
                  <label className={styles.contentServicesTreatmentLabel}>
                    Tedavi Başlığı
                  </label>
                  <input
                    type="text"
                    placeholder="Tedavi adı"
                    value={t.title}
                    onChange={(e) => updateTreatment(i, 'title', e.target.value)}
                    className={styles.contentServicesTreatmentInput}
                  />
                </div>

                {/* Treatment Description */}
                <div className={styles.contentServicesTreatmentFieldGroup}>
                  <label className={styles.contentServicesTreatmentLabel}>
                    Tedavi Açıklaması
                  </label>
                  <textarea
                    placeholder="Tedavi hakkında detaylı açıklama"
                    value={t.description}
                    onChange={(e) => updateTreatment(i, 'description', e.target.value)}
                    className={styles.contentServicesTreatmentTextarea}
                  />
                </div>

                {/* Treatment Image */}
                <div>
                  <label className={styles.contentServicesTreatmentLabel}>
                    Tedavi Görseli
                  </label>
                  
                  {t.image && !treatments[i].imageFile && (
                    <div className={styles.contentServicesTreatmentExistingImage}>
                      <img
                        src={t.image}
                        alt="Mevcut Görsel"
                        className={styles.contentServicesTreatmentExistingImageImg}
                      />
                      <p className={styles.contentServicesTreatmentExistingImageText}>
                        Mevcut görsel
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        handleTreatmentImageChange(i, file)
                      }
                    }}
                    className={styles.contentServicesTreatmentImageFile}
                  />
                  {treatments[i].imageFile && (
                    <div className={styles.contentServicesTreatmentNewImageNotice}>
                      <p className={styles.contentServicesTreatmentNewImageText}>
                        ✓ Yeni: {treatments[i].imageFile?.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className={styles.contentServicesSaveButtonContainer}>
        <button
          onClick={handleSave}
          disabled={loading || !title || (!imageFile && !existingImageUrl)}
          className={styles.contentServicesSaveBtn}
        >
          <MdSave size={18} />
          {loading ? 'Kaydediliyor...' : isEditMode ? 'Güncelle' : 'Kaydet'}
        </button>
        {isEditMode && (
          <button
            onClick={deleteService}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              background: '#fee2e2',
              color: '#dc2626',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'background 0.2s',
              marginLeft: '12px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#fecaca'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#fee2e2'}
          >
            <MdDelete size={18} />
            Hizmeti Sil
          </button>
        )}
      </div>
    </div>
  )
}

export default ContentServices
