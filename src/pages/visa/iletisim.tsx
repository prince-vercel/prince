'use client'

import Image from 'next/image'
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

            {/* Page Header */}
            <div className="contact-page-header">
                <div className="container text-center">
                    <h1>{t('visa.contact.title', 'Bize Ulaşın')}</h1>
                    <p>{t('visa.contact.subtitle', 'Herhangi bir sorunuz veya yorumunuz var mı? Sadece bize bir mesaj yazın!')}</p>
                </div>
            </div>

            <div className="container pb-5">
                <div className="contact-wrapper">
                    {/* Contact Info Card */}
                    <div className="contact-info-card">
                        <h2>{t('visa.contact.info.title', 'İletişim Bilgileri')}</h2>
                        <p>{t('visa.contact.info.description', 'Sohbet başlatmak için bir şey söyleyin!')}</p>

                        <div className="contact-info-items">
                            <div className="contact-info-item">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" />
                                </svg>
                                <a title="0850 888 70 71" href="tel:0850 888 70 71">0850 888 70 71</a>
                            </div>

                            <div className="contact-info-item">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <a title="info@cilekvize.com" href="mailto:info@cilekvize.com">info@cilekvize.com</a>
                            </div>

                            <div className="contact-info-item">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9999 13.4299C13.723 13.4299 15.1199 12.0331 15.1199 10.3099C15.1199 8.58681 13.723 7.18994 11.9999 7.18994C10.2768 7.18994 8.87988 8.58681 8.87988 10.3099C8.87988 12.0331 10.2768 13.4299 11.9999 13.4299Z" stroke="white" strokeWidth="1.5" />
                                    <path d="M3.61995 8.49C5.58995 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.38995 20.54C5.62995 17.88 2.46995 13.57 3.61995 8.49Z" stroke="white" strokeWidth="1.5" />
                                </svg>
                                <span>Muradiye, Beşikçiler Cd. No:73A, 16000 Osmangazi/Bursa ( Eski THY ofisi )</span>
                            </div>
                        </div>

                        <div className="contact-social">
                            <div className="contact-social-links">
                                <a title="Facebook" href="https://www.facebook.com/cilekvize" target="_blank" rel="noopener">
                                    <svg viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.3575 2.98875H9.00075V0.12675C8.71725 0.08775 7.74225 0 6.60675 0C4.2375 0 2.6145 1.49025 2.6145 4.22925V6.75H0V9.9495H2.6145V18H5.82V9.95025H8.32875L8.727 6.75075H5.81925V4.5465C5.82 3.62175 6.069 2.98875 7.3575 2.98875Z" fill="white" />
                                    </svg>
                                </a>

                                <a title="Instagram" href="https://www.instagram.com/turkiyeninvizecisi" target="_blank" rel="noopener">
                                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1.62225C11.4037 1.62225 11.6888 1.6305 12.6368 1.674C13.5142 1.71375 13.9905 1.86 14.3078 1.98375C14.7277 2.1465 15.0277 2.34225 15.3427 2.65725C15.6577 2.97225 15.8535 3.27225 16.0162 3.69225C16.14 4.00875 16.287 4.48575 16.326 5.36325C16.3695 6.31125 16.3777 6.5955 16.3777 9.00075C16.3777 11.406 16.3695 11.6902 16.326 12.6382C16.2862 13.5157 16.14 13.992 16.0162 14.3092C15.8535 14.7292 15.6577 15.0292 15.3427 15.3442C15.0277 15.6592 14.7277 15.855 14.3078 16.0177C13.9912 16.1415 13.5142 16.2885 12.6368 16.3275C11.6888 16.371 11.4045 16.3792 9 16.3792C6.5955 16.3792 6.31125 16.371 5.36325 16.3275C4.48575 16.2877 4.0095 16.1407 3.69225 16.0177C3.27225 15.855 2.97225 15.6592 2.65725 15.3442C2.34225 15.0292 2.1465 14.7292 1.98375 14.3092C1.86 13.9927 1.713 13.5157 1.674 12.6382C1.6305 11.6902 1.62225 11.406 1.62225 9.00075C1.62225 6.59625 1.6305 6.312 1.674 5.364C1.71375 4.4865 1.86075 4.01025 1.98375 3.693C2.1465 3.273 2.34225 2.973 2.65725 2.658C2.97225 2.343 3.27225 2.14725 3.69225 1.9845C4.00875 1.86075 4.48575 1.71375 5.36325 1.67475C6.31125 1.6305 6.59625 1.62225 9 1.62225ZM9 0C6.5565 0 6.2505 0.00975 5.29125 0.054C4.33425 0.0975 3.6765 0.24975 3.1035 0.4725C2.5095 0.70275 2.0055 1.0095 1.503 1.51275C0.999 2.016 0.6915 2.52 0.46125 3.11325C0.23925 3.68625 0.087 4.344 0.04275 5.301C-0.00075 6.261 -0.0105 6.567 -0.0105 9.01125C-0.0105 11.4548 -0.00075 11.7607 0.04275 12.7207C0.08625 13.6777 0.2385 14.3355 0.46125 14.9085C0.6915 15.5025 0.99825 16.0065 1.50225 16.509C2.00475 17.0115 2.509 17.319 3.10275 17.5493C3.67575 17.772 4.3335 17.9242 5.29125 17.9678C6.25125 18.0113 6.55725 18.0218 9.00075 18.0218C11.4442 18.0218 11.7502 18.012 12.7102 17.9678C13.6672 17.9243 14.325 17.772 14.898 17.5493C15.4912 17.319 15.996 17.0122 16.4985 16.509C17.001 16.0065 17.3078 15.5025 17.5387 14.9085C17.7615 14.3355 17.9138 13.6778 17.9573 12.72C18.0008 11.76 18.0105 11.454 18.0105 9.01125C18.0105 6.56775 18.0008 6.26175 17.9573 5.30175C17.9138 4.34475 17.7615 3.687 17.5387 3.114C17.3085 2.52 17.0017 2.016 16.4985 1.51275C15.996 1.01025 15.492 0.70275 14.8987 0.4725C14.3257 0.24975 13.668 0.0975 12.7102 0.054C11.7502 0.01025 11.4442 0 9.00075 0H9Z" fill="white" />
                                        <path d="M9 4.37775C6.44625 4.37775 4.37775 6.44625 4.37775 9C4.37775 11.5538 6.44625 13.6223 9 13.6223C11.5538 13.6223 13.6223 11.5538 13.6223 9C13.6223 6.44625 11.5538 4.37775 9 4.37775ZM9 12C7.34325 12 6 10.6568 6 9C6 7.34325 7.34325 6 9 6C10.6568 6 12 7.34325 12 9C12 10.6568 10.6568 12 9 12Z" fill="white" />
                                        <path d="M14.8837 4.19475C14.8837 4.7895 14.4015 5.27175 13.8067 5.27175C13.212 5.27175 12.7297 4.7895 12.7297 4.19475C12.7297 3.6 13.212 3.11775 13.8067 3.11775C14.4015 3.11775 14.8837 3.6 14.8837 4.19475Z" fill="white" />
                                    </svg>
                                </a>

                                <a title="X (Twitter)" href="https://x.com/cilekvize?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener">
                                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.7133 7.6209L17.4133 0H15.8267L10.0067 6.61776L5.36 0H0L7.02667 10.0074L0 18H1.58667L7.73333 11.0104L12.64 18H18L10.7133 7.6209ZM8.54 10.0962L7.82667 9.10176L2.16 1.16971H4.6L9.17333 7.56864L9.88667 8.56308L15.8267 16.8835H13.3867L8.54 10.0962Z" fill="white" />
                                    </svg>
                                </a>

                                <a title="LinkedIn" href="https://www.linkedin.com/company/cilekvize/" target="_blank" rel="noopener">
                                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.0275 18H0.2925V5.98125H4.0275V18ZM2.16 4.34625C0.9675 4.34625 0 3.35625 0 2.16375C0 0.97125 0.9675 0 2.16 0C3.3525 0 4.32 0.97125 4.32 2.16375C4.32 3.35625 3.3525 4.34625 2.16 4.34625ZM18 18H14.265V12.15C14.265 10.7483 14.2425 8.96625 12.3308 8.96625C10.3965 8.96625 10.098 10.4775 10.098 12.0488V18H6.36V5.98125H9.954V7.6155H10.0058C10.5023 6.6765 11.7225 5.6835 13.5495 5.6835C17.325 5.6835 18 8.1675 18 11.4083V18Z" fill="white" />
                                    </svg>
                                </a>

                                <a title="YouTube" href="https://www.youtube.com/channel/UCszeNMk_76nfPkl8YPLjqSw" target="_blank" rel="noopener">
                                    <svg viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.4953 2.82C23.2203 1.77 22.3953 0.945 21.3453 0.67C19.4703 0.125 12.0003 0.125 12.0003 0.125C12.0003 0.125 4.53028 0.125 2.65528 0.67C1.60528 0.945 0.780281 1.77 0.505281 2.82C-0.0397186 4.695 -0.0397186 8.595 -0.0397186 8.595C-0.0397186 8.595 -0.0397186 12.495 0.505281 14.37C0.780281 15.42 1.60528 16.245 2.65528 16.52C4.53028 17.065 12.0003 17.065 12.0003 17.065C12.0003 17.065 19.4703 17.065 21.3453 16.52C22.3953 16.245 23.2203 15.42 23.4953 14.37C24.0403 12.495 24.0403 8.595 24.0403 8.595C24.0403 8.595 24.0403 4.695 23.4953 2.82ZM9.56528 12.345V4.845L15.8178 8.595L9.56528 12.345Z" fill="white" />
                                    </svg>
                                </a>
                            </div>
                            <Image
                                src="/visa/assets/img/contact-logo.png"
                                alt="Prince Logo"
                                width={150}
                                height={50}
                                style={{ height: '50px', width: 'auto' }}
                            />
                        </div>
                    </div>

                    {/* Contact Form Card */}
                    <div className="contact-form-card">
                        <div className="form-section-title">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            {t('visa.contact.form.sendMessage', 'Mesaj Gönderin')}
                        </div>

                        <form id="contactForm" method="POST" onSubmit={handleSubmit}>
                            <div className="contact-form-row">
                                <div className="contact-form-col">
                                    <label className="form-label">{t('visa.contact.form.firstName', 'Adınız')} <span className="required-mark">*</span></label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        className="form-control"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        placeholder={t('visa.contact.form.placeholders.firstName', 'Adınızı giriniz')}
                                        required
                                    />
                                </div>
                                <div className="contact-form-col">
                                    <label className="form-label">{t('visa.contact.form.lastName', 'Soyadınız')} <span className="required-mark">*</span></label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        className="form-control"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        placeholder={t('visa.contact.form.placeholders.lastName', 'Soyadınızı giriniz')}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="contact-form-row">
                                <div className="contact-form-col">
                                    <label className="form-label">{t('visa.contact.form.email', 'E-Posta Adresiniz')} <span className="required-mark">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder={t('visa.contact.form.placeholders.email', 'ornek@email.com')}
                                        inputMode="email"
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                                <div className="contact-form-col">
                                    <label className="form-label">{t('visa.contact.form.phone', 'Telefon Numaranız')} <span className="required-mark">*</span></label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={handlePhoneInput}
                                        placeholder={t('visa.contact.form.placeholders.phone', '0532 123 4567')}
                                        inputMode="tel"
                                        autoComplete="tel"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="contact-form-group">
                                <label className="form-label">{t('visa.contact.form.subject', 'Konu Seçiniz')}</label>
                                <div className="subject-options">
                                    <div className="subject-option">
                                        <input
                                            type="radio"
                                            id="subject_vize"
                                            name="subject"
                                            value="vize"
                                            checked={formData.subject === 'vize'}
                                            onChange={handleSubjectChange}
                                        />
                                        <label htmlFor="subject_vize">{t('visa.contact.form.subjects.schengen', 'Schengen Vize Alımı')}</label>
                                    </div>
                                    <div className="subject-option">
                                        <input
                                            type="radio"
                                            id="subject_basvuru"
                                            name="subject"
                                            value="basvuru"
                                            checked={formData.subject === 'basvuru'}
                                            onChange={handleSubjectChange}
                                        />
                                        <label htmlFor="subject_basvuru">{t('visa.contact.form.subjects.application', 'Başvuru Yapı')}</label>
                                    </div>
                                    <div className="subject-option">
                                        <input
                                            type="radio"
                                            id="subject_randevu"
                                            name="subject"
                                            value="randevu"
                                            checked={formData.subject === 'randevu'}
                                            onChange={handleSubjectChange}
                                        />
                                        <label htmlFor="subject_randevu">{t('visa.contact.form.subjects.appointment', 'Vize Randevusu')}</label>
                                    </div>
                                    <div className="subject-option">
                                        <input
                                            type="radio"
                                            id="subject_hizmetler"
                                            name="subject"
                                            value="hizmetler"
                                            checked={formData.subject === 'hizmetler'}
                                            onChange={handleSubjectChange}
                                        />
                                        <label htmlFor="subject_hizmetler">{t('visa.contact.form.subjects.popular', 'Popüler Ülkeler')}</label>
                                    </div>
                                    <div className="subject-option">
                                        <input
                                            type="radio"
                                            id="subject_diger"
                                            name="subject"
                                            value="diger"
                                            checked={formData.subject === 'diger'}
                                            onChange={handleSubjectChange}
                                        />
                                        <label htmlFor="subject_diger">{t('visa.contact.form.subjects.other', 'Diğer')}</label>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-form-group">
                                <label className="form-label">{t('visa.contact.form.message', 'Mesajınız')} <span className="required-mark">*</span></label>
                                <textarea
                                    name="message"
                                    id="message"
                                    className="form-control"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder={t('visa.contact.form.placeholders.message', 'Mesajınızı buraya yazın...')}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-submit-area">
                                <button type="submit" className="btn-submit-contact" disabled={isLoading}>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                    {t('visa.contact.form.submit', 'Mesaj Gönder')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
