/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db } from '@/src/lib/firebase'
import styles from '@/src/styles/admin.module.css'
import LanguageSelector from '../../LanguageSelector'
import { getCollectionName } from '../../../lib/localization'
import Toast from '../../Toast'

interface SectionItem {
  text: string
}

interface Section {
  title: string
  content: SectionItem[]
}

interface VisaPage {
  id: string
  slug: string
  hero: {
    mainTitle: string
    description: string
    imageUrl: string
  }
  sections: Section[]
}

export default function ContentCountries() {
  const [items, setItems] = useState<VisaPage[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [slug, setSlug] = useState('')
  const [mainTitle, setMainTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [sections, setSections] = useState<Section[]>([])

  const [selectedLanguage, setSelectedLanguage] =
    useState<'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru'>('tr')

  const fetchPages = useCallback(async () => {
    setLoading(true)
    try {
      const collectionName = getCollectionName('visaPages', selectedLanguage)
      const snap = await getDocs(collection(db, collectionName))
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })) as VisaPage[])
      setErrors({})
    } catch (error) {
      console.error('Error fetching pages:', error)
      setToast({ type: 'error', message: 'Sayfalar yüklenirken hata oluştu' })
    } finally {
      setLoading(false)
    }
  }, [selectedLanguage])

  useEffect(() => {
    fetchPages()
  }, [fetchPages])

  const resetForm = () => {
    setSlug('')
    setMainTitle('')
    setDescription('')
    setImageUrl('')
    setSelectedFile(null)
    setSections([])
    setEditingId(null)
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!slug.trim()) newErrors.slug = 'ID zorunludur'
    if (!mainTitle.trim()) newErrors.mainTitle = 'Ana başlık zorunludur'
    if (!description.trim()) newErrors.description = 'Açıklama zorunludur'
    if (!selectedFile && !imageUrl.trim()) newErrors.image = 'Görsel zorunludur'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const uploadImage = async (file: File): Promise<string> => {
    const storage = getStorage()
    const storageRef = ref(storage, `visa-images/${Date.now()}-${file.name}`)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      let finalImageUrl = imageUrl

      if (selectedFile) {
        finalImageUrl = await uploadImage(selectedFile)
      }

      const collectionName = getCollectionName('visaPages', selectedLanguage)

      const payload = {
        slug: slug.trim(),
        hero: {
          mainTitle: mainTitle.trim(),
          description: description.trim(),
          imageUrl: finalImageUrl
        },
        sections
      }

      if (editingId) {
        await updateDoc(doc(db, collectionName, editingId), payload)
        setToast({ type: 'success', message: 'Sayfa başarıyla güncellendi' })
      } else {
        await addDoc(collection(db, collectionName), payload)
        setToast({ type: 'success', message: 'Yeni sayfa başarıyla eklendi' })
      }

      resetForm()
      fetchPages()
    } catch (error) {
      console.error('Error saving page:', error)
      setToast({ type: 'error', message: 'Sayfa kaydedilirken hata oluştu' })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: VisaPage) => {
    setSlug(item.slug)
    setMainTitle(item.hero.mainTitle)
    setDescription(item.hero.description)
    setImageUrl(item.hero.imageUrl)
    setSelectedFile(null)
    setSections(item.sections)
    setEditingId(item.id)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu sayfayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) return

    setLoading(true)
    try {
      const collectionName = getCollectionName('visaPages', selectedLanguage)
      await deleteDoc(doc(db, collectionName, id))
      setToast({ type: 'success', message: 'Sayfa başarıyla silindi' })
      fetchPages()
    } catch (error) {
      console.error('Error deleting page:', error)
      setToast({ type: 'error', message: 'Sayfa silinirken hata oluştu' })
    } finally {
      setLoading(false)
    }
  }

  const addSection = () => {
    setSections([...sections, { title: '', content: [] }])
  }

  const addSectionItem = (sectionIndex: number) => {
    const updated = [...sections]
    updated[sectionIndex].content.push({ text: '' })
    setSections(updated)
  }

  return (
    <div className={styles.container}>
      {toast && (
        <Toast type={toast.type} message={toast.message} />
      )}

      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      <h2 className={styles.title}>
        {editingId ? 'Sayfa Düzenle' : 'Yeni Vize Sayfası Ekle'}
      </h2>

      <div className={styles.formGroup}>
        <input
          className={`${styles.input} ${errors.slug ? styles.inputError : ''}`}
          placeholder="ID (ör: turkiye, belcika) *"
          value={slug}
          onChange={e => setSlug(e.target.value)}
        />
        {errors.slug && <span className={styles.errorText}>{errors.slug}</span>}
      </div>

      <div className={styles.formGroup}>
        <input
          className={`${styles.input} ${errors.mainTitle ? styles.inputError : ''}`}
          placeholder="Ana Başlık *"
          value={mainTitle}
          onChange={e => setMainTitle(e.target.value)}
        />
        {errors.mainTitle && <span className={styles.errorText}>{errors.mainTitle}</span>}
      </div>

      <div className={styles.formGroup}>
        <textarea
          className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
          placeholder="Ana Açıklama *"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {errors.description && <span className={styles.errorText}>{errors.description}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Ana Görsel (16:9) *</label>
        <input
          type="file"
          accept="image/*"
          className={`${styles.input} ${errors.image ? styles.inputError : ''}`}
          onChange={e => {
            const file = e.target.files?.[0] || null
            setSelectedFile(file)
            if (file) {
              setImageUrl('') // Clear URL if file selected
            }
          }}
        />
        {selectedFile && (
          <div className={styles.imagePreview}>
            <img src={URL.createObjectURL(selectedFile)} alt="Önizleme" style={{ maxWidth: '200px', maxHeight: '150px' }} />
          </div>
        )}
        {!selectedFile && imageUrl && (
          <div className={styles.imagePreview}>
            <img src={imageUrl} alt="Mevcut Görsel" style={{ maxWidth: '200px', maxHeight: '150px' }} />
          </div>
        )}
        {errors.image && <span className={styles.errorText}>{errors.image}</span>}
      </div>

      <h3 className={styles.subtitle}>İçerik Bölümleri</h3>

      {sections.map((section, sIndex) => (
        <div key={sIndex} className={styles.card}>
          <div className={styles.sectionHeader}>
            <input
              className={styles.input}
              placeholder="Bölüm Başlığı"
              value={section.title}
              onChange={e => {
                const updated = [...sections]
                updated[sIndex].title = e.target.value
                setSections(updated)
              }}
            />
            <button
              className={styles.deleteButton}
              onClick={() => {
                const updated = sections.filter((_, i) => i !== sIndex)
                setSections(updated)
              }}
            >
              ✕
            </button>
          </div>

          {section.content.map((item, iIndex) => (
            <div key={iIndex} className={styles.contentItem}>
              <textarea
                className={styles.textarea}
                placeholder="İçerik Metni"
                value={item.text}
                onChange={e => {
                  const updated = [...sections]
                  updated[sIndex].content[iIndex].text = e.target.value
                  setSections(updated)
                }}
              />
              <button
                className={styles.deleteButton}
                onClick={() => {
                  const updated = [...sections]
                  updated[sIndex].content = updated[sIndex].content.filter((_, i) => i !== iIndex)
                  setSections(updated)
                }}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            className={styles.button}
            onClick={() => addSectionItem(sIndex)}
          >
            + İçerik Ekle
          </button>
        </div>
      ))}

      <button className={styles.button} onClick={addSection}>
        + Bölüm Ekle
      </button>

      <div className={styles.buttonGroup}>
        <button 
          className={styles.button} 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Kaydediliyor...' : (editingId ? 'Güncelle' : 'Kaydet')}
        </button>

        {editingId && (
          <button
            className={styles.button}
            style={{ background: 'gray' }}
            onClick={resetForm}
            disabled={loading}
          >
            İptal
          </button>
        )}
      </div>

      <h2 className={styles.title} style={{ marginTop: 30 }}>
        Mevcut Sayfalar
      </h2>

      {loading ? (
        <div className={styles.loading}>Yükleniyor...</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ana Başlık</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.slug}</td>
                <td>{item.hero.mainTitle}</td>
                <td>
                  <button
                    className={styles.button} style={{marginRight:5}}
                    onClick={() => handleEdit(item)}
                    disabled={loading}
                  >
                    Düzenle
                  </button>
                  <button
                    className={styles.button}
                    style={{ background: '#c42721' }}
                    onClick={() => handleDelete(item.id)}
                    disabled={loading}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
