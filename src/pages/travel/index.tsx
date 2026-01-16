'use client'

import { useEffect } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import { getCollectionName } from '@/src/lib/localization'
import i18n from '@/src/i18n'
import HomePage from '@/src/components/TravelComponents/HomePage'

export default function TravelPage() {
  useEffect(() => {
    const collectionName = getCollectionName('travelSiteVisits', i18n.language)
    addDoc(collection(db, collectionName), {
      path: '/travel',
      createdAt: serverTimestamp()
    })
  }, [])

  return (
    <div>
      <HomePage />
    </div>
  )
}
