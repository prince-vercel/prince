/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { db } from '@/src/lib/firebase'
import { doc, setDoc, deleteDoc, serverTimestamp, getDoc, getDocs, collection } from 'firebase/firestore'
import { storage } from '@/src/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { MdAdd, MdDelete, MdSave, MdCloudUpload, MdEdit } from 'react-icons/md'
import styles from '@/src/styles/admin.module.css'
import { Hospital, Hotel } from '@/src/types/types'
import LanguageSelector from '../../LanguageSelector'
import { getCollectionName } from '@/src/lib/localization'


const ContentOrganizations = () => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'hospitals'>('hotels')
  const [selectedLanguage, setSelectedLanguage] = useState<'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru'>('tr')

  // Fetch data on component mount
  useEffect(() => {
    fetchHotels()
    fetchHospitals()
  }, [selectedLanguage])

  // Hotels State
  const [hotelName, setHotelName] = useState('')
  const [hotelLocation, setHotelLocation] = useState('')
  const [hotelImageFile, setHotelImageFile] = useState<File | null>(null)
  const [hotelImagePreview, setHotelImagePreview] = useState<string>('')
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [hotelLoading, setHotelLoading] = useState(false)
  const [hotelSuccess, setHotelSuccess] = useState(false)
  const [editingHotelId, setEditingHotelId] = useState<string | null>(null)

  // Hospitals State
  const [hospitalName, setHospitalName] = useState('')
  const [hospitalLocation, setHospitalLocation] = useState('')
  const [hospitalImageFile, setHospitalImageFile] = useState<File | null>(null)
  const [hospitalImagePreview, setHospitalImagePreview] = useState<string>('')
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [hospitalLoading, setHospitalLoading] = useState(false)
  const [hospitalSuccess, setHospitalSuccess] = useState(false)
  const [editingHospitalId, setEditingHospitalId] = useState<string | null>(null)

  // Hotel Image Handler
  const handleHotelImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setHotelImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setHotelImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleHotelImageReset = () => {
    setHotelImageFile(null)
    setHotelImagePreview('')
  }

  // Hospital Image Handler
  const handleHospitalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setHospitalImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setHospitalImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleHospitalImageReset = () => {
    setHospitalImageFile(null)
    setHospitalImagePreview('')
  }

  // Save Hotel
  const handleHotelSave = async () => {
    if (!hotelName || !hotelLocation || (!hotelImageFile && !hotelImagePreview)) {
      alert('Otel adı, lokasyon ve görsel gereklidir')
      return
    }

    setHotelLoading(true)
    try {
      const hotelId = editingHotelId || Date.now().toString()
      let imageUrl = hotelImagePreview

      if (hotelImageFile) {
        const imageRef = ref(storage, `medicalcontents/hotels/${hotelId}-image`)
        await uploadBytes(imageRef, hotelImageFile)
        imageUrl = await getDownloadURL(imageRef)
      }

      await setDoc(
        doc(db, getCollectionName('medicalcontents', selectedLanguage) + '/hotels/list', hotelId),
        {
          id: hotelId,
          name: hotelName,
          location: hotelLocation,
          image: imageUrl,
          updatedAt: serverTimestamp(),
          ...(editingHotelId ? {} : { createdAt: serverTimestamp() })
        },
        { merge: true }
      )

      setHotelSuccess(true)
      setTimeout(() => setHotelSuccess(false), 3000)

      // Reset form
      setHotelName('')
      setHotelLocation('')
      setHotelImageFile(null)
      setHotelImagePreview('')
      setEditingHotelId(null)
      await fetchHotels()
    } catch (error) {
      console.error('Hata:', error)
      alert('Kaydedilirken hata oluştu')
    } finally {
      setHotelLoading(false)
    }
  }

  // Save Hospital
  const handleHospitalSave = async () => {
    if (!hospitalName || !hospitalLocation || (!hospitalImageFile && !hospitalImagePreview)) {
      alert('Hastane adı, lokasyon ve görsel gereklidir')
      return
    }

    setHospitalLoading(true)
    try {
      const hospitalId = editingHospitalId || Date.now().toString()
      let imageUrl = hospitalImagePreview

      if (hospitalImageFile) {
        const imageRef = ref(storage, `medicalcontents/hospitals/${hospitalId}-image`)
        await uploadBytes(imageRef, hospitalImageFile)
        imageUrl = await getDownloadURL(imageRef)
      }

      await setDoc(
        doc(db, getCollectionName('medicalcontents', selectedLanguage) + '/hospitals/list', hospitalId),
        {
          id: hospitalId,
          name: hospitalName,
          location: hospitalLocation,
          image: imageUrl,
          updatedAt: serverTimestamp(),
          ...(editingHospitalId ? {} : { createdAt: serverTimestamp() })
        },
        { merge: true }
      )

      setHospitalSuccess(true)
      setTimeout(() => setHospitalSuccess(false), 3000)

      // Reset form
      setHospitalName('')
      setHospitalLocation('')
      setHospitalImageFile(null)
      setHospitalImagePreview('')
      setEditingHospitalId(null)
      await fetchHospitals()
    } catch (error) {
      console.error('Hata:', error)
      alert('Kaydedilirken hata oluştu')
    } finally {
      setHospitalLoading(false)
    }
  }

  // Fetch Hotels
  const fetchHotels = async () => {
    try {
      const collectionName = getCollectionName('medicalcontents', selectedLanguage) + '/hotels/list'
      const hotelsRef = collection(db, collectionName)
      const snapshot = await getDocs(hotelsRef)
      const hotelsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Hotel[]
      setHotels(hotelsData)
    } catch (error) {
      console.error('Otel verileri çekilirken hata:', error)
    }
  }

  // Fetch Hospitals
  const fetchHospitals = async () => {
    try {
      const collectionName = getCollectionName('medicalcontents', selectedLanguage) + '/hospitals/list'
      const hospitalsRef = collection(db, collectionName)
      const snapshot = await getDocs(hospitalsRef)
      const hospitalsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Hospital[]
      setHospitals(hospitalsData)
    } catch (error) {
      console.error('Hastane verileri çekilirken hata:', error)
    }
  }

  // Delete Hotel
  const deleteHotel = async (id: string) => {
    if (confirm('Bu oteli silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, getCollectionName('medicalcontents', selectedLanguage) + '/hotels/list', id))
        await fetchHotels()
      } catch (error) {
        console.error('Silinirken hata:', error)
      }
    }
  }

  // Delete Hospital
  const deleteHospital = async (id: string) => {
    if (confirm('Bu hastaneyi silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, getCollectionName('medicalcontents', selectedLanguage) + '/hospitals/list', id))
        await fetchHospitals()
      } catch (error) {
        console.error('Silinirken hata:', error)
      }
    }
  }

  // Edit Hotel
  const editHotel = (hotel: Hotel) => {
    setEditingHotelId(hotel.id)
    setHotelName(hotel.name)
    setHotelLocation(hotel.location)
    setHotelImagePreview(hotel.image)
  }

  // Edit Hospital
  const editHospital = (hospital: Hospital) => {
    setEditingHospitalId(hospital.id)
    setHospitalName(hospital.name)
    setHospitalLocation(hospital.location)
    setHospitalImagePreview(hospital.image)
  }

  return (
 
    <div className={styles.contentServicesWrapper}>
      {/* Tabs */}   <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={(lang) => {
          setSelectedLanguage(lang)
          fetchHotels()
          fetchHospitals()
        }}
      />
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '32px',
        borderBottom: '2px solid #e5e7eb'
      }}>
        <button
          onClick={() => setActiveTab('hotels')}
          style={{
            padding: '12px 20px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'hotels' ? '3px solid #307bc4' : 'transparent',
            color: activeTab === 'hotels' ? '#307bc4' : '#666',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s',
            marginBottom: '-2px'
          }}
        >
         Oteller
        </button>
        <button
          onClick={() => setActiveTab('hospitals')}
          style={{
            padding: '12px 20px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'hospitals' ? '3px solid #307bc4' : 'transparent',
            color: activeTab === 'hospitals' ? '#307bc4' : '#666',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s',
            marginBottom: '-2px'
          }}
        >
           Hastaneler
        </button>
      </div>

      {/* HOTELS SECTION */}
      {activeTab === 'hotels' && (
        <div>
          {hotelSuccess && (
            <div className={styles.contentServicesSuccess}>
              ✓ Otel başarıyla kaydedildi
            </div>
          )}

          <div className={styles.contentServicesHeader}>
            <h1 className={styles.contentServicesTitle}>
              {editingHotelId ? 'Oteli Düzenle' : 'Yeni Otel Ekle'}
            </h1>
            <p className={styles.contentServicesSubtitle}>
              {editingHotelId ? 'Otel bilgilerini güncelleyin' : 'Yeni otel ekleyin'}
            </p>
          </div>

          <div className={styles.contentServicesFormSection}>
            {/* Hotel Name */}
            <div className={styles.contentServicesFieldGroup}>
              <label className={styles.contentServicesLabel}>Otel Adı</label>
              <input
                type="text"
                placeholder="Otel adını girin"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                className={styles.contentServicesInput}
              />
            </div>

            {/* Hotel Location */}
            <div className={styles.contentServicesFieldGroup}>
              <label className={styles.contentServicesLabel}>Lokasyon</label>
              <input
                type="text"
                placeholder="Otel lokasyonunu girin (şehir, bölge)"
                value={hotelLocation}
                onChange={(e) => setHotelLocation(e.target.value)}
                className={styles.contentServicesInput}
              />
            </div>

      
            {/* Hotel Image */}
            <div className={styles.contentServicesFieldGroup}>
              <label className={styles.contentServicesLabel}>Otel Görseli (16:9)</label>
              <div
                onClick={() => document.getElementById('hotelImageInput')?.click()}
                className={styles.contentServicesImageUploadContainer}
                style={hotelImagePreview ? { background: '#f0f9ff' } : {}}
              >
                {hotelImagePreview ? (
                  <div>
                    <div className={styles.contentServicesImagePreviewWrapper}>
                      <img
                        src={hotelImagePreview}
                        alt="Preview"
                        className={styles.contentServicesImagePreview}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleHotelImageReset()
                        }}
                        className={styles.contentServicesImageRemoveBtn}
                      >
                        ✕
                      </button>
                    </div>
                    <p className={styles.contentServicesImageFileName}>
                      {hotelImageFile?.name}
                    </p>
                  </div>
                ) : (
                  <div>
                    <MdCloudUpload size={32} className={styles.contentServicesImageUploadIcon} />
                    <p className={styles.contentServicesImageUploadText}>
                      Görsel yüklemek için tıklayın
                    </p>
                    <p className={styles.contentServicesImageUploadSubtext}>
                      PNG, JPG, GIF (Max 5MB)
                    </p>
                  </div>
                )}
                <input
                  id="hotelImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleHotelImageChange}
                  className={styles.contentServicesImageInput}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className={styles.contentServicesSaveButtonContainer}>
            <button
              onClick={handleHotelSave}
              disabled={hotelLoading || !hotelName || !hotelLocation || (!hotelImageFile && !hotelImagePreview)}
              className={styles.contentServicesSaveBtn}
            >
              <MdSave size={18} />
              {hotelLoading ? 'Kaydediliyor...' : editingHotelId ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>

          {/* Hotels List */}
          <div style={{ marginTop: '48px' }}>
            <h2 className={styles.contentServicesTreatmentsTitle}>Kayıtlı Oteller</h2>
            {hotels.length === 0 ? (
              <div className={styles.contentServicesEmptyTreatments}>
                Henüz otel eklenmemiş
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px',
                marginTop: '20px'
              }}>
                {hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    style={{
                      background: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '16px',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginBottom: '12px'
                      }}
                    />
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>
                      {hotel.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#666', margin: '0 0 4px 0' }}>
                     {hotel.location}
                    </p>
                  
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => editHotel(hotel)}
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
                          fontWeight: '500'
                        }}
                      >
                        <MdEdit size={16} />
                        Düzenle
                      </button>
                      <button
                        onClick={() => deleteHotel(hotel.id)}
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
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* HOSPITALS SECTION */}
      {activeTab === 'hospitals' && (
        <div>
          {hospitalSuccess && (
            <div className={styles.contentServicesSuccess}>
              ✓ Hastane başarıyla kaydedildi
            </div>
          )}

          <div className={styles.contentServicesHeader}>
            <h1 className={styles.contentServicesTitle}>
              {editingHospitalId ? 'Hastaneyi Düzenle' : 'Yeni Hastane Ekle'}
            </h1>
            <p className={styles.contentServicesSubtitle}>
              {editingHospitalId ? 'Hastane bilgilerini güncelleyin' : 'Yeni hastane ekleyin'}
            </p>
          </div>

          <div className={styles.contentServicesFormSection}>
            {/* Hospital Name */}
            <div className={styles.contentServicesFieldGroup}>
              <label className={styles.contentServicesLabel}>Hastane Adı</label>
              <input
                type="text"
                placeholder="Hastane adını girin"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className={styles.contentServicesInput}
              />
            </div>

            {/* Hospital Location */}
            <div className={styles.contentServicesFieldGroup}>
              <label className={styles.contentServicesLabel}>Lokasyon</label>
              <input
                type="text"
                placeholder="Hastane lokasyonunu girin (şehir, bölge)"
                value={hospitalLocation}
                onChange={(e) => setHospitalLocation(e.target.value)}
                className={styles.contentServicesInput}
              />
            </div>

            {/* Hospital Image */}
            <div className={styles.contentServicesFieldGroup}>
              <label className={styles.contentServicesLabel}>Hastane Görseli (16:9)</label>
              <div
                onClick={() => document.getElementById('hospitalImageInput')?.click()}
                className={styles.contentServicesImageUploadContainer}
                style={hospitalImagePreview ? { background: '#f0f9ff' } : {}}
              >
                {hospitalImagePreview ? (
                  <div>
                    <div className={styles.contentServicesImagePreviewWrapper}>
                      <img
                        src={hospitalImagePreview}
                        alt="Preview"
                        className={styles.contentServicesImagePreview}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleHospitalImageReset()
                        }}
                        className={styles.contentServicesImageRemoveBtn}
                      >
                        ✕
                      </button>
                    </div>
                    <p className={styles.contentServicesImageFileName}>
                      {hospitalImageFile?.name}
                    </p>
                  </div>
                ) : (
                  <div>
                    <MdCloudUpload size={32} className={styles.contentServicesImageUploadIcon} />
                    <p className={styles.contentServicesImageUploadText}>
                      Görsel yüklemek için tıklayın
                    </p>
                    <p className={styles.contentServicesImageUploadSubtext}>
                      PNG, JPG, GIF (Max 5MB)
                    </p>
                  </div>
                )}
                <input
                  id="hospitalImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleHospitalImageChange}
                  className={styles.contentServicesImageInput}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className={styles.contentServicesSaveButtonContainer}>
            <button
              onClick={handleHospitalSave}
              disabled={hospitalLoading || !hospitalName || !hospitalLocation || (!hospitalImageFile && !hospitalImagePreview)}
              className={styles.contentServicesSaveBtn}
            >
              <MdSave size={18} />
              {hospitalLoading ? 'Kaydediliyor...' : editingHospitalId ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>

          {/* Hospitals List */}
          <div style={{ marginTop: '48px' }}>
            <h2 className={styles.contentServicesTreatmentsTitle}>Kayıtlı Hastaneler</h2>
            {hospitals.length === 0 ? (
              <div className={styles.contentServicesEmptyTreatments}>
                Henüz hastane eklenmemiş
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px',
                marginTop: '20px'
              }}>
                {hospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    style={{
                      background: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '16px',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginBottom: '12px'
                      }}
                    />
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>
                      {hospital.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#666', margin: '0 0 12px 0' }}>
                       {hospital.location}
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => editHospital(hospital)}
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
                          fontWeight: '500'
                        }}
                      >
                        <MdEdit size={16} />
                        Düzenle
                      </button>
                      <button
                        onClick={() => deleteHospital(hospital.id)}
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
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentOrganizations