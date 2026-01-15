/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/src/lib/firebase'
import styles from '@/src/styles/admin.module.css'
import { MdDelete, MdSave } from 'react-icons/md'

interface Partner {
  id: string
  title: string
  imageUrl: string
  createdAt: Date
}

const ContentPartner = () => {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const [formData, setFormData] = useState({
    title: '',
  })

  // Ortakları yükle
  useEffect(() => {
    loadPartners()
  }, [])

  const loadPartners = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'travelcontents/partner/partners'))
      const partnersData: Partner[] = []
      querySnapshot.forEach((doc) => {
        partnersData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        } as Partner)
      })
      setPartners(partnersData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
    } catch (error) {
      console.error('Ortak yükleme hatası:', error)
      showNotification('error', 'Ortaklar yüklenirken hata oluştu')
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
    const storageRef = ref(storage, `travelcontents/partners/${timestamp}_${file.name}`)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !imageFile) {
      showNotification('error', 'Başlık ve görsel gereklidir')
      return
    }

    setLoading(true)
    try {
      const imageUrl = await uploadImage(imageFile)

      await addDoc(collection(db, 'travelcontents/partner/partners'), {
        title: formData.title,
        imageUrl: imageUrl,
        createdAt: new Date(),
      })
      showNotification('success', 'Ortak başarıyla eklendi')

      setFormData({ title: '' })
      setImageFile(null)
      setImagePreview('')
      loadPartners()
    } catch (error) {
      console.error('Ortak ekleme hatası:', error)
      showNotification('error', 'Ortak ekleme sırasında hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (partnerId: string) => {
    if (!confirm('Bu ortağı silmek istediğinize emin misiniz?')) return

    try {
      await deleteDoc(doc(db, 'travelcontents/partner/partners', partnerId))
      showNotification('success', 'Ortak başarıyla silindi')
      loadPartners()
    } catch (error) {
      console.error('Ortak silme hatası:', error)
      showNotification('error', 'Ortak silinirken hata oluştu')
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
      <h2 style={{ margin: '0 0 30px 0', fontSize: '24px', fontWeight: 'bold' }}>Ortak Yönetimi</h2>

      {/* Form */}
      <div
        style={{
           backgroundColor: '#fff',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            padding: '32px',
          marginBottom: '30px',
          marginTop: '10px',
          borderRadius:'6px' 
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
              placeholder="Ortak adı..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Görsel Yükleme */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              Görsel Seçiniz *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                width: '100%',
                fontSize: '14px',
              }}
            />
            {imagePreview && (
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

          <div className={styles.contentServicesSaveButtonContainer}>
            <button
              type="submit"
              disabled={loading}
              className={styles.contentServicesSaveBtn}
              style={{ background: '#d7b76e' }}
            >
              <MdSave size={18} />
              {loading ? 'Yükleniyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>

      {/* Ortak Kartları */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        {partners.map((partner) => (
          <div
            key={partner.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
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
              style={{
                height: '150px',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
              }}
            >
              <img
                src={partner.imageUrl}
                alt={partner.title}
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
                style={{
                  margin: '0 0 15px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#333',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {partner.title}
              </h3>

              {/* Sil Butonu */}
              <button
                onClick={() => handleDelete(partner.id)}
                style={{
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
        ))}
      </div>

      {partners.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          <p style={{ fontSize: '16px' }}>Henüz ortak yok. Yeni bir ortak ekleyin.</p>
        </div>
      )}
    </div>
  )
}

export default ContentPartner