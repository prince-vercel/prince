/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useEffect, useCallback } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import styles from '@/src/styles/admin.module.css'
import LanguageSelector from '../../LanguageSelector'
import { getCollectionName } from '../../../lib/localization'

interface VisaStatItem {
  id: string
  country: string
  applicationCount: number
  visaTypeText: string
}

export default function AdminVisaStats() {
  const [items, setItems] = useState<VisaStatItem[]>([])
  const [country, setCountry] = useState('')
  const [applicationCount, setApplicationCount] = useState('')
  const [visaTypeText, setVisaTypeText] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const [selectedLanguage, setSelectedLanguage] =
    useState<'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru'>('tr')

  const fetchData = useCallback(async () => {
    const collectionName = getCollectionName('visaStats', selectedLanguage)
    const snap = await getDocs(collection(db, collectionName))
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })) as VisaStatItem[])
  }, [selectedLanguage])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = async () => {
    if (!country || !applicationCount || !visaTypeText) return

    const collectionName = getCollectionName('visaStats', selectedLanguage)

    const payload = {
      country,
      applicationCount: Number(applicationCount),
      visaTypeText
    }

    if (editingId) {
      await updateDoc(doc(db, collectionName, editingId), payload)
    } else {
      await addDoc(collection(db, collectionName), payload)
    }

    setCountry('')
    setApplicationCount('')
    setVisaTypeText('')
    setEditingId(null)

    fetchData()
  }

  const handleEdit = (item: VisaStatItem) => {
    setCountry(item.country)
    setApplicationCount(String(item.applicationCount))
    setVisaTypeText(item.visaTypeText)
    setEditingId(item.id)
  }

  const handleDelete = async (id: string) => {
    const collectionName = getCollectionName('visaStats', selectedLanguage)
    await deleteDoc(doc(db, collectionName, id))
    fetchData()
  }

  return (
    <div className={styles.container}>
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      <h2 className={styles.title}>
        {editingId ? 'İstatistik Düzenle' : 'Vize İstatistiği Ekle'}
      </h2>

      <div className={styles.row}>
        <input
          className={styles.input}
          placeholder="Ülke"
          value={country}
          onChange={e => setCountry(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Başvuru Sayısı"
          value={applicationCount}
          onChange={e => setApplicationCount(e.target.value)}
        />
      </div>

      <input
        className={styles.input}
        style={{ marginBottom: 10 }}
        placeholder="%57 Turist - %24 Çalışma - %11 Akraba Ziyareti - %8 Ticari"
        value={visaTypeText}
        onChange={e => setVisaTypeText(e.target.value)}
      />

      <button className={styles.button} onClick={handleSubmit}>
        {editingId ? 'Güncelle' : 'Kaydet'}
      </button>

      <h2 className={styles.title} style={{ marginTop: 30 }}>
        Kayıtlar
      </h2>

      <table
        className={styles.table}
        style={{ borderCollapse: 'separate', borderSpacing: '25px 10px' }}
      >
        <thead>
          <tr>
            <th>Ülke</th>
            <th>Başvuru</th>
            <th>Vize Türü Oranı</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.country}</td>
              <td>{item.applicationCount}</td>
              <td>{item.visaTypeText}</td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => handleEdit(item)}
                >
                  Düzenle
                </button>
                <button
                  className={styles.button}
                  style={{ background: '#c42721',marginLeft: '5px' }}
                  onClick={() => handleDelete(item.id)}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
