/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { db, storage } from '@/src/lib/firebase'
import { getCollectionName } from '@/src/lib/localization'
import styles from '@/src/styles/admin.module.css'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import LanguageSelector from '../../LanguageSelector'

interface Image {
  id: string
  title: string
  imageUrl: string
  createdAt: any
}

const ContentImages = () => {
  const [images, setImages] = useState<Image[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru'>('tr')
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [jsonFile, setJsonFile] = useState<File | null>(null)
  const [importingJson, setImportingJson] = useState(false)

  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, getCollectionName('travelcontents', selectedLanguage), 'images', 'banners'), orderBy('createdAt', 'desc'))
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
      const filename = `travel-banner-${timestamp}-${file.name}`
      const storageRef = ref(storage, `travelbanners/${filename}`)

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

  // Upload image from URL/path to Firebase Storage
  const uploadImageFromPath = async (imagePath: string) => {
    try {
      // Eğer zaten bir URL ise (http/https ile başlıyorsa), direkt döndür
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath
      }

      // Local path ise (örn: /travel-banners/resim.webp)
      setUploadingImage(true)

      // Public klasöründeki dosyayı fetch et
      const response = await fetch(imagePath)
      if (!response.ok) {
        throw new Error(`Görsel yüklenemedi: ${imagePath}`)
      }

      const blob = await response.blob()
      const filename = imagePath.split('/').pop() || `image-${Date.now()}`
      const timestamp = Date.now()
      const storageFilename = `travel-banner-${timestamp}-${filename}`
      const storageRef = ref(storage, `travelbanners/${storageFilename}`)

      await uploadBytes(storageRef, blob)
      const downloadURL = await getDownloadURL(storageRef)

      return downloadURL
    } catch (err: any) {
      console.error('Error uploading image from path:', err)
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      setError('Başlık gereklidir')
      return
    }

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
        const docRef = doc(db, getCollectionName('travelcontents', selectedLanguage), 'images', 'banners', editingId)
        await updateDoc(docRef, {
          title: formData.title,
          imageUrl: imageUrl,
          updatedAt: serverTimestamp()
        })
        setSuccess('Görsel güncellendi')
      } else {
        // Add new image
        await addDoc(collection(db, getCollectionName('travelcontents', selectedLanguage), 'images', 'banners'), {
          title: formData.title,
          imageUrl: imageUrl,
          createdAt: serverTimestamp()
        })
        setSuccess('Görsel eklendi')
      }

      // Refresh images
      const q = query(collection(db, getCollectionName('travelcontents', selectedLanguage), 'images', 'banners'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const imagesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Image[]
      setImages(imagesList)

      // Reset form
      setFormData({ title: '', imageUrl: '' })
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
      title: image.title,
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
            await addDoc(collection(db, getCollectionName('travelcontents', selectedLanguage), 'images', 'banners'), {
              title: file.name.split('.')[0] || 'Banner',
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
      const q = query(collection(db, getCollectionName('travelcontents', selectedLanguage), 'images', 'banners'), orderBy('createdAt', 'desc'))
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
      await deleteDoc(doc(db, getCollectionName('travelcontents', selectedLanguage), 'images', 'banners', id))
      setSuccess('Görsel silindi')

      // Refresh images
      const q = query(collection(db, getCollectionName('travelcontents', selectedLanguage), 'images', 'banners'), orderBy('createdAt', 'desc'))
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
    setFormData({ title: '', imageUrl: '' })
    setSelectedFile(null)
    setError('')
  }

  // Handle JSON file selection
  const handleJsonFileSelect = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
        setError('Lütfen geçerli bir JSON dosyası seçin')
        return
      }
      setJsonFile(file)
    }
  }

  // Handle JSON import
  const handleJsonImport = async () => {
    if (!jsonFile) {
      setError('Lütfen bir JSON dosyası seçin')
      return
    }

    try {
      setImportingJson(true)
      setError('')
      setSuccess('')

      // Read JSON file
      const text = await jsonFile.text()
      let jsonData: Array<{ title: string; imageUrl: string }>

      try {
        jsonData = JSON.parse(text)
      } catch (parseError) {
        setError('JSON dosyası geçersiz format. Lütfen doğru formatta bir JSON dosyası yükleyin.')
        setImportingJson(false)
        return
      }

      // Validate JSON structure
      if (!Array.isArray(jsonData)) {
        setError('JSON dosyası bir dizi içermelidir')
        setImportingJson(false)
        return
      }

      if (jsonData.length === 0) {
        setError('JSON dosyası boş')
        setImportingJson(false)
        return
      }

      // Validate each item
      for (const item of jsonData) {
        if (!item.title || !item.imageUrl) {
          setError('JSON dosyasındaki her öğe "title" ve "imageUrl" alanlarına sahip olmalıdır')
          setImportingJson(false)
          return
        }
      }

      // Import to Firebase
      let importedCount = 0
      let failedCount = 0

      for (const item of jsonData) {
        try {
          let finalImageUrl = item.imageUrl.trim()

          // Eğer local path ise (http/https ile başlamıyorsa), Firebase Storage'a yükle
          if (!finalImageUrl.startsWith('http://') && !finalImageUrl.startsWith('https://')) {
            const uploadedUrl = await uploadImageFromPath(finalImageUrl)
            if (!uploadedUrl) {
              console.error(`Görsel yüklenemedi: ${item.title} - ${finalImageUrl}`)
              failedCount++
              continue
            }
            finalImageUrl = uploadedUrl
          }

          await addDoc(collection(db, getCollectionName('travelcontents', selectedLanguage), 'images', 'banners'), {
            title: item.title.trim(),
            imageUrl: finalImageUrl,
            createdAt: serverTimestamp()
          })
          importedCount++
        } catch (err) {
          console.error(`Hata: ${item.title}`, err)
          failedCount++
        }
      }

      if (importedCount > 0) {
        setSuccess(`${importedCount} banner başarıyla eklendi${failedCount > 0 ? `, ${failedCount} başarısız` : ''}`)

        // Refresh images
        const q = query(collection(db, getCollectionName('travelcontents', selectedLanguage), 'images', 'banners'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        const imagesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Image[]
        setImages(imagesList)
      } else {
        setError('Hiçbir banner eklenemedi')
      }

      // Reset JSON file
      setJsonFile(null)
      const jsonInput = document.querySelector('input[type="file"][accept=".json,application/json"]') as HTMLInputElement
      if (jsonInput) jsonInput.value = ''
    } catch (err: any) {
      console.error('JSON import hatası:', err)
      setError('JSON dosyası yüklenirken hata oluştu: ' + (err.message || 'Bilinmeyen hata'))
    } finally {
      setImportingJson(false)
    }
  }

  return (
    <div>
      <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />

      <div className={styles.gfHeader}>

        <h2 className={styles.gfTitle}>Anasayfa Bannerları</h2>
        <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
          {!showForm && (
            <>
              <button
                onClick={() => setShowForm(true)}
                className={styles.gfBtn}
                style={{ background: '#d7b76e' }}
              >
                + Banner Ekle
              </button>
             
            </>
          )}
        </div>
      </div>

      

      {selectedFiles.length > 0 && (
        <div className="bulk-upload-section" style={{ marginBottom: '30px', padding: '24px', background: '#f0f9ff', border: '2px solid #219FFF', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#0369a1' }}>
            Seçilen Görseller ({selectedFiles.length})
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
              {uploadingImage ? 'Yükleniyor...' : loading ? 'Kaydediliyor...' : `${selectedFiles.length} Görseli Yükle`}
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
                Başlık
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Banner başlığını girin"
                disabled={loading || uploadingImage}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d0d0d0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                Görsel (16:9)
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
                  background: '#d7b76e',
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
              alt={image.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div className={styles.gfCardContent} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                {image.title}
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleEdit(image)}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: '#d7b76e',
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
          Henüz bir banner eklenmemiş. Başlamak için "Yeni Banner Ekle" butonuna tıklayın.
        </div>
      )}
    </div>
  )
}

export default ContentImages