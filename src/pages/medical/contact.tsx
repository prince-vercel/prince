'use client'

import Toast from '@/src/components/Toast'
import { db } from '@/src/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSafeTranslation } from '@/src/hooks/useSafeTranslation'
import i18n from '@/src/i18n'
import '@/src/i18n'

export default function ContactPage() {
  const { t, isReady } = useSafeTranslation()
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
      console.error(isReady ? t('medical.pages.contact.errorAlert') : 'Form gönderme hatası:', err)
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <>
      <section style={{ background: '#4f8edc', padding: '40px 0 40px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container">


          <div className="container" style={{ marginBottom: '30px', marginTop: '10px', position: 'relative', zIndex: 2 }}>
            <ol className="breadcrumb2" style={{ color: '#fff', marginLeft: '0' }}>
              <li className="breadcrumb-item2" style={{ color: '#fff' }}>
                <Link href="/medical" style={{ color: '#fff' }} suppressHydrationWarning>{isReady ? t('medical.pages.breadcrumb.home') : ''}</Link>
              </li>
              <li className="breadcrumb-item2 active" style={{ color: '#fff' }} suppressHydrationWarning>{isReady ? t('medical.pages.breadcrumb.contact') : ''}</li>
            </ol>

            <div className="cs_banner_text">
              <h2 className="cs_banner_title cs_fs_72" style={{ color: '#fff' }} suppressHydrationWarning>
                {isReady ? t('medical.pages.contact.title') : ''}
              </h2>
              <p className="cs_banner_subtitle cs_fs_20" style={{ color: '#fff' }} suppressHydrationWarning>
                {isReady ? t('medical.pages.contact.subtitle') : ''}
              </p>
            </div>
          </div>

          <div style={{ position: 'absolute', right: '0', bottom: '0', width: '40%', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
            <Image src="/assets/img/contact/banner_img.png" alt="Banner" width={400} height={400} style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      <section>

        <div className="container cs_mt_minus_110 cs_contact_fix" style={{ marginTop: '-30px' }}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-base">
            <div className="shadow-custom-1 bg-white lg:py-8 py-7 px-base wow fadeInUp">
              <div className="flex">
                <div className="mr-[15px] shrink-0 lg:text-3xl text-2xl text-[#219FFF]">
                  <i className="bi bi-envelope-at"></i>
                </div>
                <div>
                  <h4 className="text-dark-1 lg:text-2md text-md font-semibold" suppressHydrationWarning>
                    {isReady ? t('medical.pages.contact.emailTitle') : ''}
                  </h4>
                  <ul className="text-dark-3 space-y-1 text-base font-medium mt-2">
                    <li>
                      <a
                        href="mailto:info@princetourismagency.com"
                        className="hover:text-primary-1 duration-200"
                      >
                        info@princetourismagency.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:medical@princetourismagency.com"
                        className="hover:text-primary-1 duration-200"
                      >
                        medical@princetourismagency.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="shadow-custom-1 bg-white lg:py-8 py-7 px-base">
              <div className="flex">
                <div className="mr-[15px] shrink-0 lg:text-3xl text-2xl text-[#17BD8D]">
                  <i className="bi bi-telephone-forward"></i>
                </div>
                <div>
                  <h4 className="text-dark-1 lg:text-2md text-md font-semibold" suppressHydrationWarning>
                    {isReady ? t('medical.pages.contact.callTitle') : ''}
                  </h4>
                  <ul className="text-dark-3 space-y-1 text-base font-medium mt-2">
                    <li>
                      <a
                        href="tel:+770434501097"
                        className="hover:text-primary-1 duration-200"
                      >
                        +7704345017
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+866-398-5917"
                        className="hover:text-primary-1 duration-200"
                      >
                        +866-398-5917
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="shadow-custom-1 bg-white lg:py-8 py-7 px-base">
              <div className="flex">
                <div className="mr-[15px] shrink-0 lg:text-3xl text-2xl text-[#F53D6B]">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div>
                  <h4 className="text-dark-1 lg:text-2md text-md font-semibold" suppressHydrationWarning>
                    {isReady ? t('medical.pages.contact.addressTitle') : ''}
                  </h4>
                  <ul className="text-dark-3 space-y-1 text-base font-medium mt-2">
                    <li suppressHydrationWarning>
                      {isReady ? t('medical.pages.contact.address') : ''}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="cs_map" style={{ margin: '50px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5597041697186!2d29.00434!3d41.05107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6d6e5131909%3A0xfaa0f0510c542a88!2zREFQIFlhcMSxIFogT2Zpcw!5e0!3m2!1str!2str!4v1673000000000"
              width="50%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <form
            className="cs_contact_form cs_style_1 cs_white_bg cs_radius_30"
            onSubmit={handleSubmit}
          >
            <div className="row">
              <h2 className="section-title-v1" suppressHydrationWarning>
                {isReady ? t('medical.pages.contact.formTitle') : ''}
              </h2>              <div className="col-lg-6">
                <label className="cs_input_label" suppressHydrationWarning>{isReady ? t('medical.pages.contact.nameLabel') : ''} <span style={{ color: 'red' }}>*</span></label>
                <input
                  className="cs_form_field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col-lg-6">
                <label className="cs_input_label" suppressHydrationWarning>{isReady ? t('medical.pages.contact.emailLabel') : ''} <span style={{ color: 'red' }}>*</span></label>
                <input
                  className="cs_form_field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="col-lg-12">
                <label className="cs_input_label" suppressHydrationWarning>{isReady ? t('medical.pages.contact.subjectLabel') : ''} <span style={{ color: 'red' }}>*</span></label>
                <input
                  className="cs_form_field"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="col-lg-12">
                <label className="cs_input_label" suppressHydrationWarning>{isReady ? t('medical.pages.contact.messageLabel') : ''} <span style={{ color: 'red' }}>*</span></label>
                <textarea
                  className="cs_form_field"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="col-lg-12 mt-4">
                <button className="cs_btn cs_style_1" type="submit">
                  <span suppressHydrationWarning>{isReady ? t('medical.pages.contact.submitButton') : ''}</span>
                </button>
              </div>
            </div>
          </form>

          {/* SUCCESS TOAST NOTIFICATION */}
          {success && <Toast type="success" message={isReady ? t('medical.pages.contact.successToast') : ''} top="80px" />}

          {/* ERROR TOAST NOTIFICATION */}
          {error && <Toast type="error" message={isReady ? t('medical.pages.contact.errorToast') : ''} top="80px" />}
        </div>
      </section>



    </>
  )
}
