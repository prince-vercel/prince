'use client'

import { useEffect } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import i18n from '@/src/i18n'
import HomePage from '@/src/components/TravelComponents/HomePage'

export default function TravelPage() {
  useEffect(() => {
    const collectionName = 'travelSiteVisits'
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
