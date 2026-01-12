'use client'

import { useEffect } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import HomePage from '@/src/components/TravelComponents/HomePage'

export default function TravelPage() {
  useEffect(() => {
    addDoc(collection(db, 'travelSiteVisits'), {
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
