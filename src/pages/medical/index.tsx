import HomePage from "@/src/components/MedicalComponents/Home";
import { db } from "@/src/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";


export default function MedicalPage() {
    useEffect(() => {
      addDoc(collection(db, 'medicalSiteVisits'), {
        path: '/medical',
        createdAt: serverTimestamp()
      })
    }, [])
  
  return (
    <div >
    <HomePage/>
    </div>
  )
}
