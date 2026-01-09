'use client'
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import { FAQ } from '@/src/types/medical'



export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(2);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [faqLoading, setFaqLoading] = useState(true);

 
   // Fetch FAQs from Firestore
   useEffect(() => {
     const fetchFaqs = async () => {
       try {
         setFaqLoading(true)
         const faqsRef = collection(db, 'medicalcontents/faq/list')
         const snapshot = await getDocs(faqsRef)
         const faqsData = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data(),
         })) as FAQ[]
         setFaqs(faqsData)
       } catch (error) {
         console.error('FAQ verileri çekilirken hata:', error)
       } finally {
         setFaqLoading(false)
       }
     }
 
     fetchFaqs()
   }, [])

  return (
    <section
     className="cs_shape_wrap cs_faq_section"
     style={{ marginBottom: 0 , paddingTop: '80px'}}
   >


     <div className="container">
       <div className="row">
         <div className="col-xxl-4">
           <div className="cs_section_heading cs_style_1">
             <h3 className="cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_fs_32">
               İnsanlar Genellikle
             </h3>
             <div className="cs_height_5"></div>
             <h2 className="cs_section_title cs_fs_72 m-0">Soruyorlar</h2>
           </div>
           <div className="cs_height_70 cs_height_lg_50"></div>
         </div>
       </div>

       <div className="row">
         <div className="col-xxl-8 offset-xxl-4">
           <div className="cs_accordians cs_style1 cs_type_1 cs_heading_color">
             {faqLoading ? (
               <div style={{ textAlign: 'center', padding: '40px', width: '100%' }}>
                 <p>Sorular yükleniyor...</p>
               </div>
             ) : faqs.length === 0 ? (
               <div style={{ textAlign: 'center', padding: '40px', width: '100%' }}>
                 <p>Henüz soru eklenmemiş</p>
               </div>
             ) : (
               faqs.map((item, i) => {
                 const isActive = activeFaq === i;

                 return (
                   <div
                     key={item.id}
                     className={`cs_accordian ${isActive ? "active" : ""}`}
                   >
                     <h2
                       className="cs_accordian_head cs_heading_color"
                       onClick={() => setActiveFaq(isActive ? null : i)}
                       style={{ cursor: "pointer" }}
                     >
                       {item.question}

                       <span className="cs_accordian_arrow">
                         <svg
                           width="23"
                           height="13"
                           viewBox="0 0 23 13"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                           style={{
                             transform: isActive
                               ? "rotate(180deg)"
                               : "rotate(0deg)",
                             transition: "transform 0.3s ease",
                           }}
                         >
                           <path
                             d="M22.9996 1.52904L11.5264 12.4967L0.00121875 1.37918"
                             stroke="#307BC4"
                             strokeWidth="2"
                             strokeLinecap="round"
                             strokeLinejoin="round"
                           />
                         </svg>
                       </span>
                     </h2>

                      {isActive && (
                        <div className="cs_accordian_body">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}