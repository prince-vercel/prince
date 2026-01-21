/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
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
import { MdDelete, MdEdit } from 'react-icons/md'
import LanguageSelector from '../../LanguageSelector'
import { getCollectionName } from '../../../lib/localization'

interface Image {
  id: string
  descriptions: { title: string; desc: string }[]
  imageUrl: string
  createdAt: any
}

const ContentBanner = () => {
  const [images, setImages] = useState<Image[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    descriptions: [{ title: '', desc: '' }],
    imageUrl: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru' | 'es' | 'ar' | 'ru'>('tr')

  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, getCollectionName('visabannercontents', selectedLanguage), 'images', 'banner'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        const imagesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Image[]
        setImages(imagesList)
      } catch (err: any) {
        console.error('Error fetching images:', err)
        setError('Görseller yüklenirken hata oluştu')
      }
    }
    fetchImages()
  }, [selectedLanguage])

  // Handle image file selection
  const handleImageSelect = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  // Handle multiple image file selection
  const handleMultipleImageSelect = (e: any) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files) as File[]
      setSelectedFiles(fileArray)
    }
  }

  // Upload image to Firebase Storage
  const uploadImageToStorage = async (file: File) => {
    try {
      setUploadingImage(true)
      const timestamp = Date.now()
      const filename = `visa-hero-${timestamp}-${file.name}`
      const storageRef = ref(storage, `visaheroes/${filename}`)
      
      await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(storageRef)
      
      return downloadURL
    } catch (err: any) {
      console.error('Error uploading image:', err)
      setError('Görsel yüklenirken hata oluştu')
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    if (!selectedFile && !formData.imageUrl) {
      setError('Bir görsel seçmelisiniz')
      return
    }

    try {
      setLoading(true)
      setError('')
      setSuccess('')

      let imageUrl = formData.imageUrl

      if (selectedFile) {
        const uploadedUrl = await uploadImageToStorage(selectedFile)
        if (!uploadedUrl) {
          setLoading(false)
          return
        }
        imageUrl = uploadedUrl
      }

      if (editingId) {
        // Update existing image
        const docRef = doc(db, getCollectionName('visabannercontents', selectedLanguage), 'images', 'banner', editingId)
        await updateDoc(docRef, {
          descriptions: formData.descriptions,
          imageUrl: imageUrl,
          updatedAt: serverTimestamp()
        })
        setSuccess('Görsel güncellendi')
      } else {
        // Add new image
        await addDoc(collection(db, getCollectionName('visabannercontents', selectedLanguage), 'images', 'banner'), {
          descriptions: formData.descriptions,
          imageUrl: imageUrl,
          createdAt: serverTimestamp()
        })
        setSuccess('Görsel eklendi')
      }

      // Refresh images
      const q = query(collection(db, getCollectionName('visabannercontents', selectedLanguage), 'images', 'banner'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const imagesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Image[]
      setImages(imagesList)

      // Reset form
      setFormData({ descriptions: [{ title: '', desc: '' }], imageUrl: '' })
      setSelectedFile(null)
      setShowForm(false)
      setEditingId(null)
    } catch (err: any) {
      console.error('Error saving image:', err)
      setError('Görsel kaydedilirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  // Handle edit
  const handleEdit = (image: Image) => {
    setFormData({
      descriptions: image.descriptions || [{ title: '', desc: '' }],
      imageUrl: image.imageUrl
    })
    setEditingId(image.id)
    setShowForm(true)
    setSelectedFile(null)
  }

  // Handle bulk image upload
  const handleBulkSubmit = async (e: any) => {
    e.preventDefault()
    
    if (selectedFiles.length === 0) {
      setError('Lütfen en az bir görsel seçin')
      return
    }

    try {
      setLoading(true)
      setError('')
      setSuccess('')

      let uploadedCount = 0
      
      for (const file of selectedFiles) {
        try {
          const uploadedUrl = await uploadImageToStorage(file)
          if (uploadedUrl) {
            await addDoc(collection(db, getCollectionName('visacontents', selectedLanguage), 'images', 'visa'), {
              title: file.name.split('.')[0] || 'Vize Görseli',
              imageUrl: uploadedUrl,
              createdAt: serverTimestamp()
            })
            uploadedCount++
          }
        } catch (err) {
          console.error(`Hata: ${file.name}`, err)
        }
      }

      setSuccess(`${uploadedCount} görsel başarıyla eklendi`)

      // Refresh images
      const q = query(collection(db, getCollectionName('visacontents', selectedLanguage), 'images', 'visa'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const imagesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Image[]
      setImages(imagesList)

      // Reset form
      setSelectedFiles([])
      const fileInput = document.querySelector('input[type="file"][multiple]') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (err: any) {
      console.error('Toplu yükleme hatası:', err)
      setError('Görseller yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }
  const handleDelete = async (id: string) => {
    if (!confirm('Bu görseli silmek istediğinize emin misiniz?')) return

    try {
      setLoading(true)
      await deleteDoc(doc(db, getCollectionName('visabannercontents', selectedLanguage), 'images', 'banner', id))
      setSuccess('Görsel silindi')
      
      // Refresh images
      const q = query(collection(db, getCollectionName('visabannercontents', selectedLanguage), 'images', 'banner'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const imagesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Image[]
      setImages(imagesList)
    } catch (err: any) {
      console.error('Error deleting image:', err)
      setError('Görsel silinirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ descriptions: [{ title: '', desc: '' }], imageUrl: '' })
    setSelectedFile(null)
    setError('')
  }

  // Handle adding new description
  const handleAddDescription = () => {
    setFormData({
      ...formData,
      descriptions: [...formData.descriptions, { title: '', desc: '' }]
    })
  }

  // Handle removing description
  const handleRemoveDescription = (index: number) => {
    setFormData({
      ...formData,
      descriptions: formData.descriptions.filter((_, i) => i !== index)
    })
  }

  // Handle updating description
  const handleUpdateDescription = (index: number, field: 'title' | 'desc', value: string) => {
    const newDescriptions = [...formData.descriptions]
    newDescriptions[index][field] = value
    setFormData({
      ...formData,
      descriptions: newDescriptions
    })
  }

  return (
    <div>
      <div className={styles.gfHeader}>
        <h2 className={styles.gfTitle}> Vize Görselleri</h2>
        <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
          {!showForm && (
            <>
              <button
                onClick={() => setShowForm(true)}
                className={styles.gfBtn}
                style={{ background: '#C42127' }}
              >
                + Vize Görseli Ekle
              </button>
         
            </>
          )}
        </div>
      </div>

      {/* Language Selector */}
      <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />

      {selectedFiles.length > 0 && (
        <div className="bulk-upload-section" style={{ marginBottom: '30px', padding: '24px', background: '#f0f9ff', border: '2px solid #219FFF', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#0369a1' }}>
            Seçilen Vize Görselleri ({selectedFiles.length})
          </h3>
          <div style={{ marginBottom: '20px', maxHeight: '200px', overflowY: 'auto' }}>
            {selectedFiles.map((file, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#fff', marginBottom: '8px', borderRadius: '6px', border: '1px solid #e0e7ff' }}>
                <span style={{ fontSize: '13px', color: '#1f2937' }}>📷 {file.name}</span>
                <span style={{ fontSize: '12px', color: '#666' }}>({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              onClick={handleBulkSubmit}
              disabled={loading || uploadingImage}
              style={{ 
                padding: '10px 24px',
                background: '#219FFF', 
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {uploadingImage ? 'Yükleniyor...' : loading ? 'Kaydediliyor...' : `${selectedFiles.length} Vize Görselini Yükle`}
            </button>
            <button
              onClick={() => {
                setSelectedFiles([])
              }}
              disabled={loading || uploadingImage}
              style={{ 
                padding: '10px 24px',
                background: '#e5e7eb', 
                color: '#1f2937',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              İptal Et
            </button>
          </div>
        </div>
      )}

      {success && (
        <div style={{ 
          background: '#f0fdf4', 
          border: '1px solid #bbf7d0', 
          color: '#15803d', 
          padding: '12px 16px', 
          borderRadius: '6px', 
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          {success}
        </div>
      )}
      {error && (
        <div style={{ 
          background: '#fef2f2', 
          border: '1px solid #fecaca', 
          color: '#b91c1c', 
          padding: '12px 16px', 
          borderRadius: '6px', 
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {showForm && (
        <div className={styles.gfCard} style={{ marginBottom: '30px', padding: '24px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                Başlık ve Açıklamalar
              </label>
              {formData.descriptions.map((desc, index) => (
                <div key={index} style={{ marginBottom: '16px', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px', color: '#555' }}>
                      Başlık {index + 1}
                    </label>
                    <input
                      type="text"
                      value={desc.title}
                      onChange={(e) => handleUpdateDescription(index, 'title', e.target.value)}
                      placeholder="Başlık girin"
                      disabled={loading || uploadingImage}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        border: '1px solid #d0d0d0',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px', color: '#555' }}>
                      Açıklama {index + 1}
                    </label>
                    <textarea
                      value={desc.desc}
                      onChange={(e) => handleUpdateDescription(index, 'desc', e.target.value)}
                      placeholder="Açıklama girin"
                      disabled={loading || uploadingImage}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        border: '1px solid #d0d0d0',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  {formData.descriptions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDescription(index)}
                      disabled={loading || uploadingImage}
                      style={{
                        padding: '6px 12px',
                        background: '#ef4444',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Kaldır
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddDescription}
                disabled={loading || uploadingImage}
                style={{
                  padding: '8px 16px',
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                + Başlık-Açıklama Ekle
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                Görsel
              </label>
              {formData.imageUrl && !selectedFile && (
                <div style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <img 
                    src={formData.imageUrl} 
                    alt="preview" 
                    style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                    disabled={loading}
                    style={{
                      padding: '8px 12px',
                      background: '#fbbf24',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '13px'
                    }}
                  >
                    Değiştir
                  </button>
                </div>
              )}
              {!formData.imageUrl || selectedFile ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  disabled={loading || uploadingImage}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '2px dashed #d0d0d0',
                    borderRadius: '6px',
                    backgroundColor: '#fafafa',
                    cursor: 'pointer'
                  }}
                />
              ) : null}
              {selectedFile && (
                <p style={{ color: '#666', fontSize: '12px', marginTop: '8px' }}>
                  ✓ Seçilen dosya: {selectedFile.name}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={loading || uploadingImage}
                style={{ 
                  padding: '10px 24px',
                  background: '#C42127', 
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {uploadingImage ? 'Yükleniyor...' : loading ? 'Kaydediliyor...' : editingId ? 'Güncelle' : 'Ekle'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading || uploadingImage}
                style={{ 
                  padding: '10px 24px',
                  background: '#e5e7eb', 
                  color: '#1f2937',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {images.map((image) => (
          <div 
            key={image.id} 
            className={styles.gfCard}
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          >
            <img 
              src={image.imageUrl} 
              alt="Vize Görseli" 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div className={styles.gfCardContent} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {image.descriptions && image.descriptions.length > 0 && (
                <div style={{ margin: '0 0 12px 0' }}>
                  {image.descriptions.map((desc, idx) => (
                    <div key={idx} style={{ marginBottom: '8px' }}>
                      <strong style={{ fontSize: '14px', color: '#1f2937' }}>{desc.title}</strong>
                      {desc.desc && <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>{desc.desc}</p>}
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleEdit(image)}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: '#C42127',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  title="Düzenle"
                >
                  <MdEdit size={16} />
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: '#fff',
                    color: '#ef4444',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    border: '1px solid #ef4444'
                
                  }}
                  title="Sil"
                >
                  <MdDelete size={16} />
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && !showForm && (
        <div className={styles.gfEmpty}>
          Henüz bir vize görseli eklenmemiş. Başlamak için "Yeni Vize Görseli Ekle" butonuna tıklayın.
        </div>
      )}
    </div>
  )
}

export default ContentBanner