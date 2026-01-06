'use client'

import { useState } from 'react'
import Footer from '@/src/components/MedicalComponents/Footer'
import Header from '@/src/components/MedicalComponents/Header'
import Toast from '@/src/components/Toast'
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
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !subject || !message) {
      setError(true)
      setTimeout(() => setError(false), 3000)
      return
    }

    try {
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
    } catch (err) {
      console.error('Form gönderme hatası:', err)
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <>
      <section style={{ background: '#4f8edc', padding: '40px 0 40px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '30px', marginTop: '10px', position: 'relative', zIndex: 2 }}>
          <ol className="breadcrumb2" style={{ color: '#fff', marginLeft: '0' }}>
            <li className="breadcrumb-item2" style={{ color: '#fff' }}>
              <Link href="/medical" style={{ color: '#fff' }}>Anasayfa</Link>
            </li>
            <li className="breadcrumb-item2 active" style={{ color: '#fff' }}>İletişim</li>
          </ol>

          <div className="cs_banner_text">
            <h2 className="cs_banner_title cs_fs_72" style={{ color: '#fff' }}>
              Bize Ulaşın
            </h2>
            <p className="cs_banner_subtitle cs_fs_20" style={{ color: '#fff' }}>
              En hızlı yanıt için bize ulaşın.
            </p>
          </div>
        </div>

        <div style={{ position: 'absolute', right: '0', bottom: '0', width: '40%', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
          <Image src={banner_img} alt="Banner" width={400} height={400} style={{ objectFit: 'contain' }} />
        </div>
      </section>

      <section>
        <div className="container cs_mt_minus_110 cs_contact_fix" style={{ marginTop: '-20px' }}>
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

          {/* SUCCESS TOAST NOTIFICATION */}
          {success && <Toast type="success" message="Mesajınız başarıyla gönderildi!" top="80px" />}

          {/* ERROR TOAST NOTIFICATION */}
          {error && <Toast type="error" message="Lütfen tüm alanları doldurunuz!" top="80px" />}
        </div>
      </section>

    </>
  )
}
