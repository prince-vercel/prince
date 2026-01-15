/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/src/lib/firebase'
import styles from '@/src/styles/admin.module.css'
import { MdEdit, MdDelete,MdSave } from 'react-icons/md'

interface Blog {
  id: string
  title: string
  description: string
  imageUrl: string
  isFavorite: boolean
  createdAt: Date
}

const ContentBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  // Blogları yükle
  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'medicalblogs'))
      const blogsData: Blog[] = []
      querySnapshot.forEach((doc) => {
        blogsData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        } as Blog)
      })
      setBlogs(blogsData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
    } catch (error) {
      console.error('Blog yükleme hatası:', error)
      showNotification('error', 'Bloglar yüklenirken hata oluştu')
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const timestamp = Date.now()
    const storageRef = ref(storage, `medicalcontents/blogs/${timestamp}_${file.name}`)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim() || (!editingId && !imageFile)) {
      showNotification('error', editingId ? 'Başlık ve açıklama gereklidir' : 'Tüm alanları doldurunuz ve görsel seçiniz')
      return
    }

    setLoading(true)
    try {
      let imageUrl = imagePreview

      // Yeni görsel yüklenmişse
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      if (editingId) {
        // Düzenleme
        await updateDoc(doc(db, 'medicalblogs', editingId), {
          title: formData.title,
          description: formData.description,
          ...(imageFile && { imageUrl }), // Sadece yeni resim varsa güncelle
        })
        showNotification('success', 'Blog başarıyla güncellendi')
      } else {
        // Yeni ekleme
        await addDoc(collection(db, 'medicalblogs'), {
          title: formData.title,
          description: formData.description,
          imageUrl: imageUrl,
          isFavorite: false,
          createdAt: new Date(),
        })
        showNotification('success', 'Blog başarıyla eklendi')
      }

      setFormData({ title: '', description: '' })
      setImageFile(null)
      setImagePreview('')
      setShowForm(false)
      setEditingId(null)
      loadBlogs()
    } catch (error) {
      console.error('Blog ekleme hatası:', error)
      showNotification('error', 'Blog işlemi sırasında hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (blogId: string) => {
    if (!confirm('Bu blogu silmek istediğinize emin misiniz?')) return

    try {
      await deleteDoc(doc(db, 'medicalblogs', blogId))
      showNotification('success', 'Blog başarıyla silindi')
      loadBlogs()
    } catch (error) {
      console.error('Blog silme hatası:', error)
      showNotification('error', 'Blog silinirken hata oluştu')
    }
  }

  const toggleFavorite = async (blogId: string, currentFavorite: boolean) => {
    try {
      await updateDoc(doc(db, 'medicalblogs', blogId), {
        isFavorite: !currentFavorite,
      })
      loadBlogs()
    } catch (error) {
      console.error('Favori güncelleme hatası:', error)
      showNotification('error', 'Favori güncellenirken hata oluştu')
    }
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Bildirim */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '6px',
            backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          {notification.message}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Başlık */}
      <h2 style={{ margin: '0 0 30px 0', fontSize: '28px', fontWeight: 'bold' }}>Blog Yönetimi</h2>

      {/* Form */}
      {(
        <div
          style={{
            backgroundColor: '#fff',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            padding: '32px',
            borderRadius: '12px',
            marginBottom: '30px',
            border: '1px solid #e5e7eb',
          }}
        >
          <form onSubmit={handleSubmit}>
        
            {/* Başlık */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                Başlık *
              </label>
              <input
                type="text"
                placeholder="Blog başlığı..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  padding: '10px 14px',
                fontSize: '15px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Açıklama */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                Açıklama *
              </label>
              <textarea
                placeholder="Blog açıklaması..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '15px',
                  minHeight: '150px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>
    {/* Görsel Yükleme */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                Görsel Seçiniz {!editingId && '*'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  padding: '10px 14px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  width: '100%',
                  fontSize: '15px',
                }}
              />
              {(imagePreview || editingId) && (
                <div style={{ marginTop: '10px' }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: '200px',
                      maxHeight: '150px',
                      borderRadius: '6px',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}
            </div>

            {/* Butonlar */}
          <div className={styles.contentServicesSaveButtonContainer}>
              <button
                type="submit"
                disabled={loading}
              className={styles.contentServicesSaveBtn}

              >              <MdSave size={18} />
              
                {loading ? 'Yükleniyor...' : editingId ? 'Güncelle' : 'Kaydet'}
              </button>
           
            </div>
          </form>
        </div>
      )}

      {/* Blog Kartları */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {blogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {/* Görsel */}
            <div
              onClick={() => setSelectedBlog(blog)}
              style={{
                height: '200px',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
              }}
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s',
                }}
              />
            </div>

            {/* İçerik */}
            <div style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
              <h3
                onClick={() => setSelectedBlog(blog)}
                style={{
                  margin: '0 0 15px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: '#333',
                  minHeight: '48px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {blog.title}
              </h3>

              {/* Butonlar */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                }}
              >
                {/* Düzenle Butonu */}
                <button
                  onClick={() => {
                    setEditingId(blog.id)
                    setFormData({ title: blog.title, description: blog.description })
                    setImagePreview(blog.imageUrl)
                    setImageFile(null)
                    setShowForm(true)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
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
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  <MdEdit size={14} />
                  Düzenle
                </button>

                {/* Sil Butonu */}
                <button
                  onClick={() => handleDelete(blog.id)}
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
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  <MdDelete size={14} />
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {blogs.length === 0 && !showForm && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          <p style={{ fontSize: '16px' }}>Henüz blog yok. Yeni bir blog ekleyin.</p>
        </div>
      )}

      {/* Modal - Blog Detayı */}
      {selectedBlog && (
        <div
          onClick={() => setSelectedBlog(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
          >
            {/* Modal Başlık */}
            <div
              style={{
                padding: '20px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
              }}
            >
              <h2 style={{ margin: 0, fontSize: '20px' }}>{selectedBlog.title}</h2>
              <button
                onClick={() => setSelectedBlog(null)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal İçeriği */}
            <div style={{ padding: '20px' }}>
              {/* Görsel */}
              <img
                src={selectedBlog.imageUrl}
                alt={selectedBlog.title}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
              />

              {/* Açıklama */}
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333',
                  whiteSpace: 'pre-wrap',
                  marginBottom: '20px',
                }}
              >
                {selectedBlog.description}
              </p>

              {/* Butonlar */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {/* Düzenle Butonu */}
                <button
                  onClick={() => {
                    setSelectedBlog(null)
                    setEditingId(selectedBlog.id)
                    setFormData({ title: selectedBlog.title, description: selectedBlog.description })
                    setImagePreview(selectedBlog.imageUrl)
                    setImageFile(null)
                    setShowForm(true)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
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
                    fontWeight: '500',
                  }}
                >
                  <MdEdit size={16} />
                  Düzenle
                </button>

                {/* Sil Butonu */}
                <button
                  onClick={() => {
                    handleDelete(selectedBlog.id)
                    setSelectedBlog(null)
                  }}
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
                    fontWeight: '500',
                  }}
                >
                  <MdDelete size={16} />
                  Sil
                </button>

            
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentBlog
