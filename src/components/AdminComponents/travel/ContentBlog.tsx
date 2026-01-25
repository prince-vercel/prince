/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { db } from '@/src/lib/firebase'
import { doc, setDoc, serverTimestamp, getDocs, collection, deleteDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { MdDelete, MdSave, MdEdit } from 'react-icons/md'
import styles from '@/src/styles/admin.module.css'
import { getCollectionName } from '../../../lib/localization'
import LanguageSelector from '../../LanguageSelector'

interface Blog {
  id: string
  title: string
  desc: string
  imageUrl: string
  secondaryImage1Url?: string
  secondaryImage2Url?: string
}

const ContentBlog = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [secondaryImage1Url, setSecondaryImage1Url] = useState('')
  const [secondaryImage2Url, setSecondaryImage2Url] = useState('')
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru'>('tr')

  // Fetch Blogs on component mount
  useEffect(() => {
    fetchBlogs()
  }, [selectedLanguage])

  const fetchBlogs = async () => {
    try {
      const blogsRef = collection(db, getCollectionName('travelblogs', selectedLanguage))
      const snapshot = await getDocs(blogsRef)
      const blogsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Blog[]
      setBlogs(blogsData)
    } catch (error) {
      console.error('Blog verileri çekilirken hata:', error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageType: 'main' | 'secondary1' | 'secondary2') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const storage = getStorage()
      const storageRef = ref(storage, `travelblogs/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      
      if (imageType === 'main') setImageUrl(url)
      else if (imageType === 'secondary1') setSecondaryImage1Url(url)
      else if (imageType === 'secondary2') setSecondaryImage2Url(url)
    } catch (error) {
      console.error('Görsel yükleme hatası:', error)
      alert('Görsel yükleme başarısız oldu')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSave = async () => {
    if (!title || !desc || !imageUrl) {
      alert('Başlık, açıklama ve görsel gereklidir')
      return
    }

    setLoading(true)
    try {
      const blogId = editingBlogId || Date.now().toString()

      await setDoc(
        doc(db, getCollectionName('travelblogs', selectedLanguage), blogId),
        {
          id: blogId,
          title,
          desc,
          imageUrl,
          secondaryImage1Url,
          secondaryImage2Url,
          updatedAt: serverTimestamp(),
          ...(editingBlogId ? {} : { createdAt: serverTimestamp() })
        },
        { merge: true }
      )

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)

      resetForm()
      await fetchBlogs()
    } catch (error) {
      console.error('Kaydedilirken hata:', error)
      alert('Kaydedilirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const deleteBlog = async (id: string, imageUrl: string) => {
    if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      try {
        // Görsel sil
        const storage = getStorage()
        const imageRef = ref(storage, imageUrl)
        try {
          await deleteObject(imageRef)
        } catch {
          // Görsel zaten silinmiş
          console.log('Görsel zaten silinmiş')
        }

        // Veri sil
        await deleteDoc(doc(db, getCollectionName('travelblogs', selectedLanguage), id))
        await fetchBlogs()
      } catch (error) {
        console.error('Silinirken hata:', error)
        alert('Silinirken hata oluştu')
      }
    }
  }

  const editBlog = (blog: Blog) => {
    setEditingBlogId(blog.id)
    setTitle(blog.title)
    setDesc(blog.desc)
    setImageUrl(blog.imageUrl)
    setSecondaryImage1Url(blog.secondaryImage1Url || '')
    setSecondaryImage2Url(blog.secondaryImage2Url || '')
    setIsEditMode(true)
  }

  const resetForm = () => {
    setTitle('')
    setDesc('')
    setImageUrl('')
    setSecondaryImage1Url('')
    setSecondaryImage2Url('')
    setIsEditMode(false)
    setEditingBlogId(null)
  }

  return (
    <div className={styles.contentServicesWrapper}>
      {/* Success Message */}
      {success && (
        <div className={styles.contentServicesSuccess}>
          ✓ Blog başarıyla kaydedildi
        </div>
      )}

      {/* Header */}
      <div className={styles.contentServicesHeader}>
        <h1 className={styles.contentServicesTitle} style={{fontSize:'32px'}}>
          {isEditMode ? 'Blog Düzenle' : 'Yeni Blog Ekle'}
        </h1>
        <p className={styles.contentServicesSubtitle} style={{fontSize:'16px'}}>
          {isEditMode ? 'Blog yazısını güncelleyin' : 'Yeni blog yazısı ekleyin'}
        </p>
      </div>

      {/* Language Selector */}
      <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />

      {/* Form */}
      <div className={styles.contentServicesFormSection}>
        {/* Title */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px',fontWeight: '600'}}>Blog Başlığı</label>
          <input
            type="text"
            placeholder="Blog başlığını girin"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.contentServicesInput}
            style={{fontSize:'16px'}}
          />
        </div>

        {/* Description */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px', fontWeight: '600'}}>Blog Açıklaması</label>
          <textarea
            placeholder="Blog açıklamasını girin"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className={styles.contentServicesTextarea}
            rows={8}
            style={{fontSize:'16px'}}
          />
        </div>

        {/* Image Upload */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px', fontWeight: '600'}}>Ana Blog Görseli (16:9)</label>
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
              onChange={(e) => handleImageUpload(e, 'main')}
              style={{ display: 'none' }}
              id="image-upload-main"
              disabled={uploadingImage}
            />
            <label htmlFor="image-upload-main" style={{ cursor: 'pointer', display: 'block' }}>
              {uploadingImage ? 'Yükleniyor...' : imageUrl ? '✓ Görsel yüklendi (değiştirmek için tıklayın)' : 'Görsel seçmek için tıklayın'}
            </label>
          </div>

          {imageUrl && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <img 
                src={imageUrl} 
                alt="preview" 
                style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
              />
            </div>
          )}
        </div>

        {/* Secondary Image 1 */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px', fontWeight: '600'}}>İkinci Görsel (Opsiyonel) (16:9)</label>
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
              onChange={(e) => handleImageUpload(e, 'secondary1')}
              style={{ display: 'none' }}
              id="image-upload-secondary1"
              disabled={uploadingImage}
            />
            <label htmlFor="image-upload-secondary1" style={{ cursor: 'pointer', display: 'block' }}>
              {uploadingImage ? 'Yükleniyor...' : secondaryImage1Url ? '✓ Görsel yüklendi (değiştirmek için tıklayın)' : 'Görsel seçmek için tıklayın'}
            </label>
          </div>

          {secondaryImage1Url && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <img 
                src={secondaryImage1Url} 
                alt="preview" 
                style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
              />
            </div>
          )}
        </div>

        {/* Secondary Image 2 */}
        <div className={styles.contentServicesFieldGroup}>
          <label className={styles.contentServicesLabel} style={{fontSize:'15px', fontWeight: '600'}}>Üçüncü Görsel (Opsiyonel) (16:9)</label>
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
              onChange={(e) => handleImageUpload(e, 'secondary2')}
              style={{ display: 'none' }}
              id="image-upload-secondary2"
              disabled={uploadingImage}
            />
            <label htmlFor="image-upload-secondary2" style={{ cursor: 'pointer', display: 'block' }}>
              {uploadingImage ? 'Yükleniyor...' : secondaryImage2Url ? '✓ Görsel yüklendi (değiştirmek için tıklayın)' : 'Görsel seçmek için tıklayın'}
            </label>
          </div>

          {secondaryImage2Url && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <img 
                src={secondaryImage2Url} 
                alt="preview" 
                style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className={styles.contentServicesSaveButtonContainer}>
        <button
          onClick={handleSave}
          disabled={loading || !title || !desc || !imageUrl || uploadingImage}
          className={styles.contentServicesSaveBtn}
          style={{ backgroundColor: '#d7b76e', color: 'white', border: 'none' }}
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

      {/* Blogs List */}
      <div style={{ marginTop: '48px' }}>
        <h2 className={styles.contentServicesTreatmentsTitle} style={{fontSize:'24px'}}>Kayıtlı Blog Yazıları</h2>
        {blogs.length === 0 ? (
          <div className={styles.contentServicesEmptyTreatments}>
            Henüz blog yazısı eklenmemiş
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            {blogs.map((blog) => (
              <div
                key={blog.id}
                style={{
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 12px 0', color: '#307bc4', lineHeight: '1.4' }}>
                    {blog.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0', lineHeight: '1.6', minHeight: '60px', maxHeight: '60px', overflow: 'hidden' }}>
                    {blog.desc}
                  </p>
                  
                  {(blog.secondaryImage1Url || blog.secondaryImage2Url) && (
                    <div style={{ display: 'flex', gap: '8px', margin: '12px 0', flexWrap: 'wrap' }}>
                      {blog.secondaryImage1Url && (
                        <img 
                          src={blog.secondaryImage1Url} 
                          alt="secondary1"
                          style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      )}
                      {blog.secondaryImage2Url && (
                        <img 
                          src={blog.secondaryImage2Url} 
                          alt="secondary2"
                          style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      )}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button
                      onClick={() => editBlog(blog)}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        padding: '6px 12px',
                        background: '#d7b76e',
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
                      onClick={() => deleteBlog(blog.id, blog.imageUrl)}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentBlog
