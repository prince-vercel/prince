'use client'

import React, { useState } from 'react'
import { storage, db } from '@/src/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { MdClose, MdCloudUpload } from 'react-icons/md'
import styles from '@/src/styles/admin.module.css'

interface ImageManagerModalProps {
  isOpen: boolean
  onClose: () => void
  section: string
  onImageUpdate: (section: string, url: string) => void
}

const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  section,
  onImageUpdate,
}) => {
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      const storageRef = ref(storage, `home_images/${section}/${selectedFile.name}`)
      await uploadBytes(storageRef, selectedFile)
      const url = await getDownloadURL(storageRef)

      // Save to Firestore
      await setDoc(doc(db, 'home_images', section), { imageUrl: url }, { merge: true })

      onImageUpdate(section, url)
      onClose()
    } catch (error) {
      console.error('Upload failed:', error)
    }
    setUploading(false)
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Görsel Yönetimi</h3>
          <button onClick={onClose} className={styles.modalClose}>
            <MdClose size={24} />
          </button>
        </div>
        <div className={styles.modalBody}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className={styles.uploadButton}
          >
            {uploading ? 'Yükleniyor...' : <><MdCloudUpload size={20} /> Yükle</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageManagerModal