/* eslint-disable react-hooks/immutability */
'use client'

import { useState, useEffect } from 'react'
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import styles from '@/src/styles/admin.module.css'
import LanguageSelector from '../../LanguageSelector'
import { getCollectionName } from '../../../lib/localization'

type PassportType = 'lacivert' | 'yesil' | 'gri'

interface PassportData {
  status: 'Vize Var' | 'Vize Yok'
  duration?: string
}

interface VisaTableItem {
  id: string
  country: string
  slug: string
  passports: Record<PassportType, PassportData>
}

export default function ContentVisaTable() {
  const [country, setCountry] = useState('')
  const [slug, setSlug] = useState('')
  const [visaTableItems, setVisaTableItems] = useState<VisaTableItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru'>('tr')
  const [passports, setPassports] = useState<Record<PassportType, PassportData>>({
    lacivert: { status: 'Vize Var' },
    yesil: { status: 'Vize Var' },
    gri: { status: 'Vize Var' }
  })

  useEffect(() => {
    fetchVisaTable()
  }, [selectedLanguage])

  const fetchVisaTable = async () => {
    const collectionName = getCollectionName('visatable', selectedLanguage)
    const snap = await getDocs(collection(db, collectionName))
    setVisaTableItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as VisaTableItem)))
  }

  const handlePassportChange = (
    type: PassportType,
    field: keyof PassportData,
    value: string
  ) => {
    setPassports(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }))
  }

  const handleSubmit = async () => {
    if (!country || !slug) return

    const collectionName = getCollectionName('visatable', selectedLanguage)

    if (editingId) {
      await updateDoc(doc(db, collectionName, editingId), {
        country,
        slug,
        passports
      })
      setEditingId(null)
    } else {
      await addDoc(collection(db, collectionName), {
        country,
        slug,
        passports
      })
    }

    setCountry('')
    setSlug('')
    setPassports({
      lacivert: { status: 'Vize Var' },
      yesil: { status: 'Vize Var' },
      gri: { status: 'Vize Var' }
    })

    fetchVisaTable()
  }

  const handleEdit = (item: VisaTableItem) => {
    setCountry(item.country)
    setSlug(item.slug)
    setPassports(item.passports)
    setEditingId(item.id)
  }

  const handleCancel = () => {
    setCountry('')
    setSlug('')
    setPassports({
      lacivert: { status: 'Vize Var' },
      yesil: { status: 'Vize Var' },
      gri: { status: 'Vize Var' }
    })
    setEditingId(null)
  }

  return (
    <div className={styles.container}>
      <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
      <h2 className={styles.title}>{editingId ? 'Ülke Düzenle' : 'Vize Tablosu – Ülke Ekle'}</h2>

      <div className={styles.row}>
        <input
          className={styles.input}
          placeholder="Ülke Adı"
          value={country}
          onChange={e => setCountry(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Slug (almanya, abd)"
          value={slug}
          onChange={e => setSlug(e.target.value)}
        />
      </div>

      {(['lacivert', 'yesil', 'gri'] as PassportType[]).map(type => (
        <div key={type} className={styles.card}>
          <div className={styles.cardTitle}>{type.toUpperCase()} PASAPORT</div>

          <div className={styles.grid}>
            <select
              className={styles.select}
              value={passports[type].status}
              onChange={e => handlePassportChange(type, 'status', e.target.value)}
            >
              <option value="Vize Var">Vize Var</option>
              <option value="Vize Yok">Vize Yok</option>
            </select>

            <input
              className={styles.input}
              placeholder="Süre (90 gün)"
              value={passports[type].duration || ''}
              onChange={e => handlePassportChange(type, 'duration', e.target.value)}
            />


          </div>
        </div>
      ))}

      <div >
        <button className={styles.button}  onClick={handleSubmit}>
          {editingId ? 'Güncelle' : 'Kaydet'}
        </button>
        {editingId && (
          <button className={styles.button} style={{ background: 'gray' }} onClick={handleCancel}>
            İptal
          </button>
        )}
      </div>

      <h2 className={styles.title} style={{ marginTop: '20px' }}>Mevcut Ülkeler</h2>
      <table className={styles.table} style={{ borderCollapse: 'separate', borderSpacing: '25px 5px' }}>
        <thead>
          <tr>
            <th>Ülke</th>
            <th>Slug</th>
            <th>Lacivert</th>
            <th>Yeşil</th>
            <th>Gri</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {visaTableItems.map(item => (
            <tr key={item.id}>
              <td>{item.country}</td>
              <td>{item.slug}</td>
              <td>{item.passports.lacivert.status} {item.passports.lacivert.duration && `(${item.passports.lacivert.duration})`}</td>
              <td>{item.passports.yesil.status} {item.passports.yesil.duration && `(${item.passports.yesil.duration})`}</td>
              <td>{item.passports.gri.status} {item.passports.gri.duration && `(${item.passports.gri.duration})`}</td>
              <td>
                <button className={styles.button} style={{ background: '#c42721', marginRight: '5px' }} onClick={() => handleEdit(item)}>
                  Düzenle
                </button>
                <button className={styles.button} style={{ background: 'white' , color: '#c42721'}} onClick={async () => {
                  const collectionName = getCollectionName('visatable', selectedLanguage)
                  await deleteDoc(doc(db, collectionName, item.id))
                  fetchVisaTable()
                }}>
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
