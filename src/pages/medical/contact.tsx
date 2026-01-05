'use client'

import { useState } from 'react'
import Footer from '@/src/components/MedicalComponents/Footer'
import Header from '@/src/components/MedicalComponents/Header'
import Image from 'next/image'
import banner_img from '@/assets/img/contact/banner_img.png'
import Link from 'next/link'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !subject || !message) return

    await addDoc(collection(db, 'medicalcontact'), {
      name,
      email,
      subject,
      message,
      createdAt: serverTimestamp()
    })

    setSuccess(true)
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <>

      <ol className="breadcrumb2" style={{ marginLeft: '7%' }}>
        <li className="breadcrumb-item2">
          <Link href="/medical">Anasayfa</Link>
        </li>
        <li className="breadcrumb-item2">İletişim</li>
      </ol>

      <section
        className="cs_banner cs_style_5 cs_bg_filed"
        style={{ backgroundImage: 'url(/assets/img/contact/banner_bg.svg)' }}
      >
        <div className="cs_banner_img">
          <Image src={banner_img} alt="Banner" width={600} height={500} />
        </div>
        <div className="container">
          <h2 className="cs_banner_title cs_fs_72">Bize Ulaşın</h2>
          <p className="cs_banner_subtitle cs_fs_20 cs_heading_color">
            En hızlı yanıt için bize ulaşın
          </p>
        </div>
      </section>

      <section>
        <div className="container cs_mt_minus_110 cs_contact_fix">
          <form
            className="cs_contact_form cs_style_1 cs_white_bg cs_radius_30"
            onSubmit={handleSubmit}
          >
            <div className="row">
              <div className="col-lg-6">
                <label className="cs_input_label">Ad</label>
                <input
                  className="cs_form_field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-lg-6">
                <label className="cs_input_label">E-posta</label>
                <input
                  className="cs_form_field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="col-lg-12">
                <label className="cs_input_label">Konu</label>
                <input
                  className="cs_form_field"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="col-lg-12">
                <label className="cs_input_label">Mesaj</label>
                <textarea
                  className="cs_form_field"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="col-lg-12 mt-4">
                <button className="cs_btn cs_style_1" type="submit">
                  <span>Gönder</span>
                </button>
              </div>
            </div>
          </form>

          {success && (
            <div style={{ marginTop: 20, color: 'green' }}>
              Mesajınız başarıyla gönderildi.
            </div>
          )}
        </div>
      </section>

    </>
  )
}
