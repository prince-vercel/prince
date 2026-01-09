'use client'
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import { FAQ } from '@/src/types/medical'



export default function FAQPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const toggle = (id: string) => {
    setActiveId(activeId === id ? null : id)
  }

 
   // Fetch FAQs from Firestore
   useEffect(() => {
     const fetchFaqs = async () => {
       try {
         const faqsRef = collection(db,'travelcontents/faq/list')
         const snapshot = await getDocs(faqsRef)
         const faqsData = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data(),
         })) as FAQ[]
         setFaqs(faqsData)
       } catch (error) {
         console.error('FAQ verileri çekilirken hata:', error)
       }
     }
 
     fetchFaqs()
   }, [])

  return (
    <section
     className="cs_shape_wrap cs_faq_section"
     style={{ marginBottom: 0 }}
   >


     {/*========== TESTIMONIAL STYLE ONE END==========*/}
  <div className="faq_style__one z-1 lg:pt-30 pt-24 mt-20 relative" id="faqs">
      
      

      <div className="container">
        <div className="text-center lg:pb-[60px] pb-[40px]">
          <h5 className="section-sub-title-v1">En Sık Sorulan Sorular</h5>
          <h2 className="section-title-v1">Sıkça Sorulan Sorular</h2>
        </div>

        <div className="accordion gap-base grid lg:grid-cols-2 grid-cols-1">

          {/* LEFT COLUMN */}
          <div className="col-span-1 space-y-base">
            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((item, i) => (
              <div key={item.id} className="single__accordion shadow-custom-1 bg-white">
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="toggle px-5 py-3 leading-1.5 text-2md text-start w-full text-dark-1 font-serif"
                >
                  {String(i + 1).padStart(2, '0')}. {item.question}
                </button>

                <div className={`${activeId === item.id ? 'block' : 'hidden'} inner px-5 pb-5`}>
                  <p className="text-base font-sans text-dark-3 leading-1.9">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-1 space-y-base">
            {faqs.slice(Math.ceil(faqs.length / 2)).map((item, i) => (
              <div key={item.id} className="single__accordion shadow-custom-1 bg-white">
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="toggle px-5 py-3 leading-1.5 text-2md text-start w-full text-dark-1 font-serif"
                >
                  {String(i + Math.ceil(faqs.length / 2) + 1).padStart(2, '0')}. {item.question}
                </button>

                <div className={`${activeId === item.id ? 'block' : 'hidden'} inner px-5 pb-5`}>
                  <p className="text-base font-sans text-dark-3 leading-1.9">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
    </section>
  )
}