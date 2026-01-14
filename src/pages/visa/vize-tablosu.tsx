'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import '../../styles/visa/VizeTablosu.css'

declare global {
    interface Window {
        grecaptcha: any;
        Swal: any;
    }
}

export default function VizeTablosuPage() {
    const sidebarRef = useRef<HTMLDivElement>(null)
    const shapesRef = useRef<HTMLDivElement>(null)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [lightboxImage, setLightboxImage] = useState('')

    // Parallax effect on hero shapes
    useEffect(() => {
        const shapes = shapesRef.current?.querySelectorAll('.shape')
        if (!shapes) return

        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset
                    shapes.forEach((shape, index) => {
                        const speed = (index + 1) * 0.03
                        ;(shape as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`
                    })
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Sticky sidebar with footer detection
    useEffect(() => {
        const sidebar = sidebarRef.current
        const footer = document.querySelector('footer')
        if (!sidebar || !footer) return

        const headerOffset = 100

        const updateSidebarPosition = () => {
            const sidebarRect = sidebar.getBoundingClientRect()
            const footerRect = footer.getBoundingClientRect()
            const sidebarHeight = sidebar.offsetHeight
            const viewportHeight = window.innerHeight

            const footerVisible = footerRect.top < viewportHeight

            if (footerVisible) {
                const stopPoint = footerRect.top - sidebarHeight - headerOffset - 20
                if (stopPoint < headerOffset) {
                    sidebar.style.position = 'relative'
                    sidebar.style.top = 'auto'
                } else {
                    sidebar.style.position = 'sticky'
                    sidebar.style.top = '100px'
                }
            } else {
                sidebar.style.position = 'sticky'
                sidebar.style.top = '100px'
            }
        }

        let scrollTicking = false
        const handleScroll = () => {
            if (!scrollTicking) {
                window.requestAnimationFrame(() => {
                    updateSidebarPosition()
                    scrollTicking = false
                })
                scrollTicking = true
            }
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', updateSidebarPosition)
        updateSidebarPosition()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', updateSidebarPosition)
        }
    }, [])

    // Table responsive wrapper
    useEffect(() => {
        const textContainers = document.querySelectorAll('.article-prose')
        textContainers.forEach((container) => {
            const tables = container.querySelectorAll('table')
            tables.forEach((table) => {
                if (!table.parentElement?.classList.contains('table-responsive')) {
                    const wrapper = document.createElement('div')
                    wrapper.className = 'table-responsive'
                    table.parentNode?.insertBefore(wrapper, table)
                    wrapper.appendChild(table)
                }
            })
        })
    }, [])

    // Custom select initialization
    useEffect(() => {
        const selectGroups = document.querySelectorAll('.select-group')

        selectGroups.forEach((wrapper) => {
            const select = wrapper.querySelector('select') as HTMLSelectElement
            if (!select) return

            const display = document.createElement('div')
            display.className = 'custom-select-display placeholder'
            display.textContent = 'Seçiniz'

            const dropdown = document.createElement('div')
            dropdown.className = 'custom-select-dropdown'

            Array.from(select.options).forEach((option) => {
                if (option.value === '' || (option.disabled && !option.selected)) return

                const optionEl = document.createElement('div')
                optionEl.className = 'custom-select-option'
                optionEl.textContent = option.textContent
                optionEl.dataset.value = option.value

                if (option.selected && option.value) {
                    optionEl.classList.add('selected')
                    display.textContent = option.textContent
                    display.classList.remove('placeholder')
                }

                optionEl.addEventListener('click', function () {
                    select.value = this.dataset.value || ''
                    display.textContent = this.textContent || ''
                    display.classList.remove('placeholder')

                    dropdown.querySelectorAll('.custom-select-option').forEach((opt) => {
                        opt.classList.remove('selected')
                    })
                    this.classList.add('selected')

                    dropdown.classList.remove('open')
                    display.classList.remove('active')

                    select.dispatchEvent(new Event('change', { bubbles: true }))
                })

                dropdown.appendChild(optionEl)
            })

            const arrow = wrapper.querySelector('.select-arrow')
            wrapper.insertBefore(display, arrow)
            wrapper.appendChild(dropdown)

            display.addEventListener('click', (e) => {
                e.stopPropagation()

                document.querySelectorAll('.custom-select-dropdown.open').forEach((d) => {
                    if (d !== dropdown) {
                        d.classList.remove('open')
                        const prevDisplay = d.previousElementSibling
                        if (prevDisplay) prevDisplay.classList.remove('active')
                    }
                })

                dropdown.classList.toggle('open')
                display.classList.toggle('active')
            })
        })

        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('.select-group')) {
                document.querySelectorAll('.custom-select-dropdown.open').forEach((d) => {
                    d.classList.remove('open')
                })
                document.querySelectorAll('.custom-select-display.active').forEach((d) => {
                    d.classList.remove('active')
                })
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    // Form submission
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const submitBtn = form.querySelector('.submit-btn') as HTMLButtonElement

        if (!submitBtn) return

        submitBtn.classList.add('loading')
        submitBtn.disabled = true

        try {
            if (window.grecaptcha) {
                const token = await window.grecaptcha.execute('6LdreBMsAAAAAOdNkcn9QvA5xO0qLry9G5W8goqg', { action: 'submit' })
                const recaptchaInput = document.getElementById('g-recaptcha-response') as HTMLInputElement
                if (recaptchaInput) {
                    recaptchaInput.value = token
                }
            }

            const formData = new FormData(form)

            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })

            const result = await response.json()

            if (response.ok && result.success) {
                if (window.Swal) {
                    window.Swal.fire({
                        icon: 'success',
                        title: 'Teşekkürler!',
                        text: result.message || 'Bilgileriniz başarıyla alındı.',
                        confirmButtonColor: '#C42127',
                        confirmButtonText: 'Tamam'
                    })
                }
                form.reset()

                const customDisplay = form.querySelector('.custom-select-display')
                if (customDisplay) {
                    customDisplay.textContent = 'Seçiniz'
                    customDisplay.classList.add('placeholder')
                }
            } else {
                throw new Error(result.message || 'Form gönderilemedi')
            }
        } catch (error: any) {
            if (window.Swal) {
                window.Swal.fire({
                    icon: 'error',
                    title: 'Hata!',
                    text: error.message || 'Bir hata oluştu.',
                    confirmButtonColor: '#C42127',
                    confirmButtonText: 'Tamam'
                })
            }
        } finally {
            submitBtn.classList.remove('loading')
            submitBtn.disabled = false
        }
    }

    return (
        <div className="static-page">
            {/* Hero Section */}
            <section className="static-hero">
                <div className="hero-bg-shapes" ref={shapesRef}>
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>

                <div className="container">
                    <div className="hero-grid">
                        {/* Sol Kolon: İçerik */}
                        <div className="hero-content">
                            {/* Breadcrumb */}
                            <nav className="breadcrumb-nav">
                                <Link href="/visa">Ana Sayfa</Link>
                                <span className="separator">/</span>
                                <span className="current">Vize Tablosu</span>
                            </nav>

                            {/* Title */}
                            <h1 className="hero-title">Vize Tablosu</h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="static-main-content">
                <div className="container">
                    <div className="content-grid no-sidebar">
                        {/* İçerik Alanı */}
                        <main className="static-content">
                            <article className="content-article">
                                {/* Main Content */}
                                <div className="article-prose">
                                    <div className="table-responsive">
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ padding: '12px', border: '1px solid #E8EAF0', backgroundColor: '#F8F9FC', fontWeight: 600, textAlign: 'left' }}>Ülke</th>
                                                    <th style={{ padding: '12px', border: '1px solid #E8EAF0', backgroundColor: '#F8F9FC', fontWeight: 600, textAlign: 'left' }}>Vize Gerekli mi?</th>
                                                    <th style={{ padding: '12px', border: '1px solid #E8EAF0', backgroundColor: '#F8F9FC', fontWeight: 600, textAlign: 'left' }}>Vize Türü</th>
                                                    <th style={{ padding: '12px', border: '1px solid #E8EAF0', backgroundColor: '#F8F9FC', fontWeight: 600, textAlign: 'left' }}>İşlem Süresi</th>
                                                    <th style={{ padding: '12px', border: '1px solid #E8EAF0', backgroundColor: '#F8F9FC', fontWeight: 600, textAlign: 'left' }}>Notlar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>İngiltere</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>Evet</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>Standart Ziyaretçi Vizesi</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>15-20 iş günü</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>-</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>Almanya</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>Evet</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>Schengen Vizesi</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>10-15 iş günü</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>-</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>Fransa</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>Evet</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>Schengen Vizesi</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>10-15 iş günü</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>-</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>Kanada</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>Evet</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>Turist Vizesi</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>20-30 iş günü</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>-</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>ABD</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>Evet</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>B1/B2 Vizesi</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>15-20 iş günü</td>
                                                    <td style={{ padding: '12px', border: '1px solid #E8EAF0' }}>-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </article>
                        </main>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {isLightboxOpen && (
                <div className="lightbox-overlay active" onClick={() => setIsLightboxOpen(false)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>&times;</button>
                        <img src={lightboxImage} alt="Lightbox" />
                    </div>
                </div>
            )}
        </div>
    )
}
