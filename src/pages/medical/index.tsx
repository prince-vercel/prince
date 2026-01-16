import HomePage from "@/src/components/MedicalComponents/Home";
import { db } from "@/src/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";
import { getCollectionName } from "@/src/lib/localization";
import i18n from "@/src/i18n";


export default function MedicalPage() {
    useEffect(() => {
      const collectionName = getCollectionName('medicalSiteVisits', i18n.language)
      addDoc(collection(db, collectionName), {
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
