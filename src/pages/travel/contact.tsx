/* eslint-disable @next/next/no-img-element */
'use client'

import Toast from '@/src/components/Toast'
import { db } from '@/src/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Link from 'next/link'
import { useState } from 'react'
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import '../../i18n'


export default function ContactPage() {
  const { t, isReady } = useSafeTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError(true)
      setTimeout(() => setError(false), 3000)
      return
    }

    try {
      await addDoc(collection(db, 'travelcontact'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp(),
      })

      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Form gönderme hatası:', error)
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <>
      {/*========== BREADCRUMB STYLE START ==========*/}
      <div className="paralax-container lg:py-20 py-12 relative overflow-hidden" style={{ backgroundColor: '#d7b76e' }}>
        <div className="absolute inset-0 z-minus before:content-[''] before:absolute before:inset-0 before:bg-[#030610] before:bg-opacity-50">
        </div>
        <img
          src="/assets/images/illustration/breadcrunb__shape.png"
          alt="placeholder"
          className="absolute bottom-0 left-0 z-1 lg:w-[12.5%] w-[20%]"
        />


        <div className="container relative z-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb2" style={{ color: 'white' }}>
              <li className="breadcrumb-item2">
                <Link href="/travel" suppressHydrationWarning>{isReady ? t('travel.pages.breadcrumb.home') : ''}</Link>
              </li>
              <li className="breadcrumb-item2" suppressHydrationWarning> {isReady ? t('travel.pages.contact.breadcrumb') : ''}</li>
            </ol>
          </nav>

          <h2 className="l:text-[54px] pb-5 lg:text-4xl md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]" suppressHydrationWarning>
            {isReady ? t('travel.pages.contact.title') : ''}
          </h2>
        </div>
      </div>
      {/*========== BREADCRUMB STYLE END ==========*/}

      {/*========== CONTACT US STYLE START ==========*/}
      <div className="lg:pt-30 pt-24 relative z-1">

        <div className="container" style={{ marginTop: -140 }}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-base">
            <div className="shadow-custom-1 bg-white lg:py-8 py-7 px-base wow fadeInUp">
              <div className="flex">
                <div className="mr-[15px] shrink-0 lg:text-3xl text-2xl text-[#219FFF]">
                  <i className="bi bi-envelope-at"></i>
                </div>
                <div>
                  <h4 className="text-dark-1 lg:text-2md text-md font-semibold" suppressHydrationWarning>
                    {isReady ? t('travel.pages.contact.email.title') : ''}
                  </h4>
                  <ul className="text-dark-3 space-y-1 text-base font-medium mt-2">
                    <li>
                      <a
                        href={`mailto:${isReady ? t('travel.pages.contact.email.address') : ''}`}
                        className="hover:text-primary-1 duration-200"
                        suppressHydrationWarning
                      >
                        {isReady ? t('travel.pages.contact.email.address') : ''}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${isReady ? t('travel.pages.contact.email.address') : ''}`}
                        className="hover:text-primary-1 duration-200"
                        suppressHydrationWarning
                      >
                        {isReady ? t('travel.pages.contact.email.address') : ''}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="shadow-custom-1 bg-white lg:py-88 py-7 px-base wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="flex">
                <div className="mr-[15px] shrink-0 lg:text-3xl text-2xl text-[#17BD8D]">
                  <i className="bi bi-telephone-forward"></i>
                </div>
                <div>
                  <h4 className="text-dark-1 lg:text-2md text-md font-semibold" suppressHydrationWarning>
                    {isReady ? t('travel.pages.contact.phone.title') : ''}
                  </h4>
                  <ul className="text-dark-3 space-y-1 text-base font-medium mt-2">
                    <li>
                      <a
                        href={`tel:${isReady ? t('travel.pages.contact.phone.number') : ''}`}
                        className="hover:text-primary-1 duration-200"
                        suppressHydrationWarning
                      >
                        {isReady ? t('travel.pages.contact.phone.number') : ''}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${isReady ? t('travel.pages.contact.phone.number') : ''}`}
                        className="hover:text-primary-1 duration-200"
                        suppressHydrationWarning
                      >
                        {isReady ? t('travel.pages.contact.phone.number') : ''}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="shadow-custom-1 bg-white lg:py-8 py-7 px-base wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="flex">
                <div className="mr-[15px] shrink-0 lg:text-3xl text-2xl text-[#F53D6B]">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div>
                  <h4 className="text-dark-1 lg:text-2md text-md font-semibold" suppressHydrationWarning>
                    {isReady ? t('travel.pages.contact.address.title') : ''}
                  </h4>
                  <ul className="text-dark-3 space-y-1 text-base font-medium mt-2">
                    <li suppressHydrationWarning>
                      {isReady ? t('travel.pages.contact.address.location') : ''}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="cs_map" style={{ margin: '50px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5597041697186!2d29.00434!3d41.05107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6d6e5131909%3A0xfaa0f0510c542a88!2zREFQIFlhcMSxIFogT2Zpcw!5e0!3m2!1str!2str!4v1673000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="lg:pt-20 pt-15">
            <div className="text-center lg:pb-[60px] pb-[40px]">
              <h5 className="section-sub-title-v1" suppressHydrationWarning>{isReady ? t('travel.pages.contact.form.title') : ''}</h5>
              <h2 className="section-title-v1" suppressHydrationWarning>
                {isReady ? t('travel.pages.contact.form.subtitle') : ''}
              </h2>
            </div>

            <div className="max-w-[870px] mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-base">
                  <div className="lg:col-span-1 col-span-2">
                    <input
                      type="text"
                      name="name"
                      placeholder={isReady ? t('travel.pages.contact.form.name') : ''}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input_style__primary"
                      required
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="lg:col-span-1 col-span-2">
                    <input
                      type="email"
                      name="email"
                      placeholder={isReady ? t('travel.pages.contact.form.email') : ''}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input_style__primary"
                      required
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      name="subject"
                      placeholder={isReady ? t('travel.pages.contact.form.subject') : ''}
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="input_style__primary"
                      required
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="col-span-2">
                    <textarea
                      rows={6}
                      name="message"
                      className="input_style__primary"
                      placeholder={isReady ? t('travel.pages.contact.form.message') : ''}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      suppressHydrationWarning
                    ></textarea>
                  </div>
                  <div className="col-span-2">
                    <button type="submit" className="btn_primary__v1" suppressHydrationWarning>
                      {isReady ? t('travel.pages.contact.form.submit') : ''}
                      <i className="bi bi-chevron-right ml-2"></i>
                    </button>
                  </div>
                </div>
              </form>

              {/* SUCCESS TOAST NOTIFICATION */}
              {success && <Toast type="success" message={isReady ? t('travel.pages.contact.form.success') : ''} top="120px" />}

              {/* ERROR TOAST NOTIFICATION */}
              {error && <Toast type="error" message={isReady ? t('travel.pages.contact.form.required') : ''} top="120px" />}
            </div>
          </div>
        </div>
      </div>



      {/*========== CONTACT US STYLE END ==========*/}


    </>
  )
}
