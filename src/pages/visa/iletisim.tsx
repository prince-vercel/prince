'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import '../../styles/visa/Iletisim.css'

declare global {
    interface Window {
        grecaptcha: any;
        Swal: any;
        $: any;
    }
}

export default function IletisimPage() {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        subject: 'vize',
        message: ''
    })

    // reCAPTCHA script yükleme
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://www.google.com/recaptcha/enterprise.js?render=6LdreBMsAAAAAOdNkcn9QvA5xO0qLry9G5W8goqg'
        script.async = true
        script.defer = true
        document.head.appendChild(script)

        return () => {
            document.head.removeChild(script)
        }
    }, [])

    // SweetAlert2 script yükleme
    useEffect(() => {
        const swalScript = document.createElement('script')
        swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11'
        swalScript.async = true
        document.head.appendChild(swalScript)

        return () => {
            // Cleanup
        }
    }, [])

    // Telefon input formatlaması
    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9\s\-\+\(\)]/g, '')
        setFormData({ ...formData, phone: value })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, subject: e.target.value })
    }

    const getRecaptchaToken = async (action: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (!window.grecaptcha) {
                reject(new Error('reCAPTCHA yüklenmedi'))
                return
            }

            window.grecaptcha.enterprise.ready(async () => {
                try {
                    const token = await window.grecaptcha.enterprise.execute('6LdreBMsAAAAAOdNkcn9QvA5xO0qLry9G5W8goqg', { action })
                    resolve(token)
                } catch (error) {
                    console.error('reCAPTCHA error:', error)
                    reject(error)
                }
            })
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validation
        if (!formData.first_name || formData.first_name.length < 2) {
            if (window.Swal) {
                window.Swal.fire({
                    icon: 'error',
                    title: t('visa.common.error'),
                    text: t('visa.contact.form.errors.firstNameMin', { count: 2 }),
                    confirmButtonColor: '#C41E3A',
                    confirmButtonText: t('visa.common.ok')
                })
            }
            return
        }

        if (!formData.last_name || formData.last_name.length < 2) {
            if (window.Swal) {
                window.Swal.fire({
                    icon: 'error',
                    title: t('visa.common.error'),
                    text: t('visa.contact.form.errors.lastNameMin', { count: 2 }),
                    confirmButtonColor: '#C41E3A',
                    confirmButtonText: t('visa.common.ok')
                })
            }
            return
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!formData.email || !emailPattern.test(formData.email)) {
            if (window.Swal) {
                window.Swal.fire({
                    icon: 'error',
                    title: t('visa.common.error'),
                    text: t('visa.contact.form.errors.invalidEmail'),
                    confirmButtonColor: '#C41E3A',
                    confirmButtonText: t('visa.common.ok')
                })
            }
            return
        }

        const cleanedPhone = formData.phone.replace(/[\s\-\(\)]/g, '')
        const phonePattern = /^(\+90|90|0)?[1-9][0-9]{9}$/
        if (!formData.phone || !phonePattern.test(cleanedPhone)) {
            if (window.Swal) {
                window.Swal.fire({
                    icon: 'error',
                    title: t('visa.common.error'),
                    text: t('visa.contact.form.errors.invalidPhone'),
                    confirmButtonColor: '#C41E3A',
                    confirmButtonText: t('visa.common.ok')
                })
            }
            return
        }

        if (!formData.message || formData.message.length < 10) {
            if (window.Swal) {
                window.Swal.fire({
                    icon: 'error',
                    title: t('visa.common.error'),
                    text: t('visa.contact.form.errors.messageMin', { count: 10 }),
                    confirmButtonColor: '#C41E3A',
                    confirmButtonText: t('visa.common.ok')
                })
            }
            return
        }

        setIsLoading(true)
        const loadingElement = document.getElementById('contact-page-loading')
        if (loadingElement) {
            loadingElement.style.display = 'flex'
        }

        try {
            const token = await getRecaptchaToken('contact')

            const formDataToSend = new FormData()
            formDataToSend.append('first_name', formData.first_name)
            formDataToSend.append('last_name', formData.last_name)
            formDataToSend.append('email', formData.email)
            formDataToSend.append('phone', formData.phone)
            formDataToSend.append('subject', formData.subject)
            formDataToSend.append('message', formData.message)
            formDataToSend.append('recaptcha_token', token)

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })

            const result = await response.json()

            if (loadingElement) {
                loadingElement.style.display = 'none'
            }
            setIsLoading(false)

            if (response.ok && result.success) {
                if (window.Swal) {
                    window.Swal.fire({
                        icon: 'success',
                        title: t('visa.common.success', 'Başarılı!'),
                        text: result.message || t('visa.contact.form.successMessage', 'Mesajınız başarıyla gönderildi.'),
                        confirmButtonColor: '#C41E3A',
                        confirmButtonText: t('visa.common.ok')
                    }).then(() => {
                        setFormData({
                            first_name: '',
                            last_name: '',
                            email: '',
                            phone: '',
                            subject: 'vize',
                            message: ''
                        })
                    })
                } else {
                    alert(t('visa.contact.form.successMessage', 'Mesajınız başarıyla gönderildi.'))
                    setFormData({
                        first_name: '',
                        last_name: '',
                        email: '',
                        phone: '',
                        subject: 'vize',
                        message: ''
                    })
                }
            } else {
                throw new Error(result.message || t('visa.contact.form.errorMessage', 'Bir hata oluştu. Lütfen tekrar deneyiniz.'))
            }
        } catch (error: any) {
            if (loadingElement) {
                loadingElement.style.display = 'none'
            }
            setIsLoading(false)

            const errorMessage = error.message || t('visa.contact.form.errorMessage', 'Bir hata oluştu. Lütfen tekrar deneyiniz.')

            if (window.Swal) {
                window.Swal.fire({
                    icon: 'error',
                    title: t('visa.common.error'),
                    text: errorMessage,
                    confirmButtonColor: '#C41E3A',
                    confirmButtonText: t('visa.common.ok')
                })
            } else {
                alert(errorMessage)
            }
        }
    }

    return (
        <div id="contact-page">
            {/* Loading Overlay */}
            <div id="contact-page-loading">
                <div className="contact-spinner">
                    <div className="contact-spinner-icon"></div>
                    <p>{t('visa.contact.loading', 'Mesajınız gönderiliyor...')}</p>
                </div>
            </div>

            {/* Banner Section */}
            <section style={{ background: '#C41E3A', padding: '40px 0 40px 0', position: 'relative', overflow: 'hidden' }}>
                <div className="container">
                    <div className="container" style={{ marginBottom: '20px', marginTop: '0', position: 'relative', zIndex: 2 }}>
                        <ol className="breadcrumb2" style={{ color: '#fff', marginLeft: '0', marginTop: '0' }}>
                            <li className="breadcrumb-item2" style={{ color: '#fff' }}>
                                <Link href="/visa" style={{ color: '#fff' }} suppressHydrationWarning>{t('visa.pages.sss.breadcrumb', 'Ana Sayfa')}</Link>
                            </li>
                            <li className="breadcrumb-item2 active" style={{ color: '#fff' }} suppressHydrationWarning>{t('visa.footer.contact', 'İletişim')}</li>
                        </ol>

                        <div className="cs_banner_text" style={{ marginTop: '15px' }}>
                            <h2 className="cs_banner_title cs_fs_72" style={{ color: '#fff' }} suppressHydrationWarning>
                                {t('visa.contact.title', 'Bize Ulaşın')}
                            </h2>
                            <p className="cs_banner_subtitle cs_fs_20" style={{ color: '#fff' }} suppressHydrationWarning>
                                {t('visa.contact.subtitle', 'Herhangi bir sorunuz veya yorumunuz var mı? Sadece bize bir mesaj yazın!')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container cs_mt_minus_110 cs_contact_fix" style={{ marginTop: '-30px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1.5rem' }} className="contact-cards-grid">
                        <div className="shadow-custom-1 bg-white lg:py-8 py-7 px-base wow fadeInUp">
                            <div className="flex">
                                <div className="mr-[15px] shrink-0 lg:text-3xl text-2xl text-[#219FFF]">
                                    <i className="bi bi-envelope-at"></i>
                                </div>
                                <div>
                                    <h4 className="text-dark-1 lg:text-2md text-md font-semibold" suppressHydrationWarning>
                                        {t('visa.contact.info.title', 'E-Posta')}
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
                                        {t('visa.contact.info.title', 'Telefon')}
                                    </h4>
                                    <ul className="text-dark-3 space-y-1 text-base font-medium mt-2">
                                        <li>
                                            <a
                                                href="tel:+902120000000"
                                                className="hover:text-primary-1 duration-200"
                                            >
                                                +90 212 000 00 00
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
                                        {t('visa.contact.info.title', 'Adres')}
                                    </h4>
                                    <ul className="text-dark-3 space-y-1 text-base font-medium mt-2">
                                        <li suppressHydrationWarning>
                                            {t('visa.footer.address', 'Dap Vadisi Z Ofis, Merkez, Seçkin Sk. Z ofis, Kat 2, Daire 232, 34406 Kağıthane/İstanbul')}
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
                                {t('visa.contact.form.sendMessage', 'Mesaj Gönderin')}
                            </h2>
                            <div className="col-lg-6">
                                <label className="cs_input_label" style={{ marginTop: '15px' }} suppressHydrationWarning>{t('visa.contact.form.firstName', 'Adınız')} <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    className="cs_form_field"
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="col-lg-6">
                                <label className="cs_input_label" style={{ marginTop: '15px' }} suppressHydrationWarning>{t('visa.contact.form.lastName', 'Soyadınız')} <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    className="cs_form_field"
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="col-lg-6">
                                <label className="cs_input_label" style={{ marginTop: '15px' }} suppressHydrationWarning>{t('visa.contact.form.email', 'E-Posta Adresiniz')} <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    className="cs_form_field"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="col-lg-6">
                                <label className="cs_input_label" style={{ marginTop: '15px' }} suppressHydrationWarning>{t('visa.contact.form.phone', 'Telefon Numaranız')} <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    className="cs_form_field"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handlePhoneInput}
                                    required
                                />
                            </div>

                            <div className="col-lg-12">
                                <label className="cs_input_label" style={{ marginTop: '15px' }} suppressHydrationWarning>{t('visa.contact.form.subject', 'Konu Seçiniz')} <span style={{ color: 'red' }}>*</span></label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '10px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '1.5rem', fontWeight: '500' }}>
                                        <input
                                            type="radio"
                                            name="subject"
                                            value="vize"
                                            checked={formData.subject === 'vize'}
                                            onChange={handleSubjectChange}
                                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                        />
                                        {t('visa.contact.form.subjects.schengen', 'Schengen Vize Alımı')}
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '1.5rem', fontWeight: '500' }}>
                                        <input
                                            type="radio"
                                            name="subject"
                                            value="basvuru"
                                            checked={formData.subject === 'basvuru'}
                                            onChange={handleSubjectChange}
                                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                        />
                                        {t('visa.contact.form.subjects.application', 'Başvuru Yapı')}
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '1.5rem', fontWeight: '500' }}>
                                        <input
                                            type="radio"
                                            name="subject"
                                            value="randevu"
                                            checked={formData.subject === 'randevu'}
                                            onChange={handleSubjectChange}
                                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                        />
                                        {t('visa.contact.form.subjects.appointment', 'Vize Randevusu')}
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '1.5rem', fontWeight: '500' }}>
                                        <input
                                            type="radio"
                                            name="subject"
                                            value="hizmetler"
                                            checked={formData.subject === 'hizmetler'}
                                            onChange={handleSubjectChange}
                                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                        />
                                        {t('visa.contact.form.subjects.popular', 'Popüler Ülkeler')}
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '1.5rem', fontWeight: '500' }}>
                                        <input
                                            type="radio"
                                            name="subject"
                                            value="diger"
                                            checked={formData.subject === 'diger'}
                                            onChange={handleSubjectChange}
                                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                        />
                                        {t('visa.contact.form.subjects.other', 'Diğer')}
                                    </label>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <label className="cs_input_label" style={{ marginTop: '15px' }} suppressHydrationWarning>{t('visa.contact.form.message', 'Mesajınız')} <span style={{ color: 'red' }}>*</span></label>
                                <textarea
                                    className="cs_form_field"
                                    rows={6}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="col-lg-12 mt-4">
                                <button className="cs_btn cs_style_1" type="submit" disabled={isLoading}>
                                    <span suppressHydrationWarning>{t('visa.contact.form.submit', 'Mesaj Gönder')}</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}
