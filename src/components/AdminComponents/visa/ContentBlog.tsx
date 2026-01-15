/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { db } from '@/src/lib/firebase'
import { doc, setDoc, serverTimestamp, getDocs, collection, deleteDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { MdDelete, MdSave, MdEdit } from 'react-icons/md'
import styles from '@/src/styles/admin.module.css'

interface Blog {
  id: string
  title: string
  desc: string
  imageUrl: string
}

const ContentBlog = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  // ...
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Fetch Blogs on component mount
  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const blogsRef = collection(db, 'visablogs')
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const storage = getStorage()
      const storageRef = ref(storage, `visablogs/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setImageUrl(url)
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
        doc(db, 'visablogs', blogId),
        {
          id: blogId,
          title,
          desc,
          imageUrl,
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
        await deleteDoc(doc(db, 'visablogs', id))
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
    setIsEditMode(true)
  }

  const resetForm = () => {
    setTitle('')
    setDesc('')
    setImageUrl('')
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
          <label className={styles.contentServicesLabel} style={{fontSize:'15px', fontWeight: '600'}}>Ana Blog Görseli</label>
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

        {/* ...secondary image fields removed... */}
      </div>

      {/* Save Button */}
      <div className={styles.contentServicesSaveButtonContainer}>
        <button
          onClick={handleSave}
          disabled={loading || !title || !desc || !imageUrl || uploadingImage}
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
                  
                  {/* ...secondary image previews removed... */}

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
