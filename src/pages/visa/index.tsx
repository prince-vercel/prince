import HomePage from '@/src/components/VisaComponents/HomePage'
import { db } from '@/src/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useEffect } from 'react'

export default function VisaPage() {
    useEffect(() => {
      const collectionName = 'visaSiteVisits'
      addDoc(collection(db, collectionName), {
        path: '/visa',
        createdAt: serverTimestamp()
      })
    }, [])
  
  return (
    <>
      <main>
        <HomePage />
      </main>
    </>
  )
}
