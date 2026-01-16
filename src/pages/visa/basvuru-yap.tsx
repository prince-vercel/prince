'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import '../../styles/visa/BasvuruYap.css';

export default function BasvuruYapPage() {
    const { t } = useTranslation();

    const countries = [
        'ABD', 'Almanya', 'Avustralya', 'Avusturya', 'Belçika', 'Bulgaristan',
        'Çekya', 'Danimarka', 'Estonya', 'Finlandiya', 'Fransa', 'Hollanda',
        'İngiltere', 'İrlanda', 'İspanya', 'İsveç', 'İsviçre', 'İtalya',
        'Kanada', 'Letonya', 'Litvanya', 'Lüksemburg', 'Macaristan', 'Malta',
        'Norveç', 'Polonya', 'Portekiz', 'Romanya', 'Slovakya', 'Slovenya', 'Yunanistan'
    ];

    const visaTypes = [
        t('visa.pages.basvuruYap.options.visaTypes.tourist', 'Turistik Vize'),
        t('visa.pages.basvuruYap.options.visaTypes.business', 'İş Vizesi'),
        t('visa.pages.basvuruYap.options.visaTypes.student', 'Öğrenci Vizesi'),
        t('visa.pages.basvuruYap.options.visaTypes.family', 'Aile Birleşimi'),
        t('visa.pages.basvuruYap.options.visaTypes.transit', 'Transit Vize'),
        t('visa.pages.basvuruYap.options.visaTypes.work', 'Çalışma Vizesi')
    ];

    const travelWithOptions = [
        t('visa.pages.basvuruYap.options.alone'),
        t('visa.pages.basvuruYap.options.withSpouse'),
        t('visa.pages.basvuruYap.options.withFamily'),
        t('visa.pages.basvuruYap.options.withFriend'),
        t('visa.pages.basvuruYap.options.withColleague'),
        t('visa.pages.basvuruYap.options.group')
    ];

    const jobOptions = [
        t('visa.pages.basvuruYap.options.jobs.employee', 'Çalışan'),
        t('visa.pages.basvuruYap.options.jobs.employer', 'İşveren'),
        t('visa.pages.basvuruYap.options.jobs.freelance', 'Serbest Meslek'),
        t('visa.pages.basvuruYap.options.jobs.student', 'Öğrenci'),
        t('visa.pages.basvuruYap.options.jobs.retired', 'Emekli'),
        t('visa.pages.basvuruYap.options.jobs.housewife', 'Ev Hanımı'),
        t('visa.pages.basvuruYap.options.jobs.unemployed', 'İşsiz')
    ];

    const workYearsOptions = [
        t('visa.pages.basvuruYap.options.workYears.0-1', '0-1 yıl'),
        t('visa.pages.basvuruYap.options.workYears.1-3', '1-3 yıl'),
        t('visa.pages.basvuruYap.options.workYears.3-5', '3-5 yıl'),
        t('visa.pages.basvuruYap.options.workYears.5-10', '5-10 yıl'),
        t('visa.pages.basvuruYap.options.workYears.10+', '10+ yıl'),
        t('visa.pages.basvuruYap.options.workYears.none', 'Çalışmıyorum')
    ];

    const salaryOptions = [
        t('visa.pages.basvuruYap.options.salary.0-10k', '0-10.000 TL'),
        t('visa.pages.basvuruYap.options.salary.10-20k', '10.000-20.000 TL'),
        t('visa.pages.basvuruYap.options.salary.20-35k', '20.000-35.000 TL'),
        t('visa.pages.basvuruYap.options.salary.35-50k', '35.000-50.000 TL'),
        t('visa.pages.basvuruYap.options.salary.50-75k', '50.000-75.000 TL'),
        t('visa.pages.basvuruYap.options.salary.75-100k', '75.000-100.000 TL'),
        t('visa.pages.basvuruYap.options.salary.100k+', '100.000+ TL')
    ];
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        country: '',
        visa_type: '',
        travel_subject: '',
        travel_date: '',
        flight_ticket: '',
        name: '',
        surname: '',
        email: '',
        phone: '',
        age: '',
        travel_with: '',
        marital_status: '',
        visa_before: '',
        visa_rejection: '',
        schengen_visa: '',
        job: '',
        work_years: '',
        net_salary: '',
        salary_to_bank: '',
        message: ''
    });

    // Scroll animation for shapes
    useEffect(() => {
        const shapes = document.querySelectorAll('.visa-hero .shape');
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    shapes.forEach((shape, index) => {
                        const speed = (index + 1) * 0.03;
                        (shape as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update step progress
    useEffect(() => {
        const updateStepProgress = () => {
            const sections = document.querySelectorAll('.form-section');
            const stepItems = document.querySelectorAll('.step-item');

            sections.forEach((section) => {
                const sectionNum = parseInt((section as HTMLElement).dataset.section || '1');
                const requiredFields = section.querySelectorAll('[required]');
                let allFilled = true;

                requiredFields.forEach(field => {
                    const input = field as HTMLInputElement | HTMLSelectElement;
                    if (input.type === 'radio') {
                        const radioGroup = section.querySelectorAll(`input[name="${input.name}"]`);
                        const anyChecked = Array.from(radioGroup).some((r: any) => r.checked);
                        if (!anyChecked) allFilled = false;
                    } else if (!input.value) {
                        allFilled = false;
                    }
                });

                const stepItem = document.querySelector(`.step-item[data-step="${sectionNum}"]`);
                if (stepItem) {
                    if (allFilled) {
                        stepItem.classList.add('completed');
                        stepItem.classList.remove('active');

                        const nextStep = document.querySelector(`.step-item[data-step="${sectionNum + 1}"]`);
                        if (nextStep && !nextStep.classList.contains('completed')) {
                            nextStep.classList.add('active');
                            setCurrentStep(sectionNum + 1);
                        }
                    } else {
                        stepItem.classList.remove('completed');
                        if (sectionNum === 1 || document.querySelector(`.step-item[data-step="${sectionNum - 1}"]`)?.classList.contains('completed')) {
                            stepItem.classList.add('active');
                            setCurrentStep(sectionNum);
                        }
                    }
                }
            });
        };

        const sections = document.querySelectorAll('.form-section');
        sections.forEach(section => {
            section.addEventListener('input', updateStepProgress);
            section.addEventListener('change', updateStepProgress);
        });

        return () => {
            sections.forEach(section => {
                section.removeEventListener('input', updateStepProgress);
                section.removeEventListener('change', updateStepProgress);
            });
        };
    }, [formData]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^0-9\s\-\+\(\)]/g, '');
        handleInputChange(e);
    };

    const handleAgeInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value);
        if (value > 120) value = 120;
        if (value < 1 && e.target.value !== '') value = 1;
        e.target.value = value.toString();
        handleInputChange(e);
    };

    // Field label mapping
    const getFieldLabel = (key: string): string => {
        const labels: Record<string, string> = {
            country: t('visa.pages.basvuruYap.fields.country'),
            visa_type: t('visa.pages.basvuruYap.fields.visaType'),
            travel_subject: t('visa.pages.basvuruYap.fields.travelSubject'),
            travel_date: t('visa.pages.basvuruYap.fields.travelDate'),
            flight_ticket: t('visa.pages.basvuruYap.fields.flightTicket'),
            name: t('visa.pages.basvuruYap.fields.name'),
            surname: t('visa.pages.basvuruYap.fields.surname'),
            email: t('visa.pages.basvuruYap.fields.email'),
            phone: t('visa.pages.basvuruYap.fields.phone'),
            age: t('visa.pages.basvuruYap.fields.age'),
            travel_with: t('visa.pages.basvuruYap.fields.travelWith'),
            marital_status: t('visa.pages.basvuruYap.fields.maritalStatus'),
            visa_before: t('visa.pages.basvuruYap.fields.visaBefore'),
            visa_rejection: t('visa.pages.basvuruYap.fields.visaRejection'),
            schengen_visa: t('visa.pages.basvuruYap.fields.schengenVisa'),
            job: t('visa.pages.basvuruYap.fields.job'),
            work_years: t('visa.pages.basvuruYap.fields.workYears'),
            net_salary: t('visa.pages.basvuruYap.fields.netSalary'),
            salary_to_bank: t('visa.pages.basvuruYap.fields.salaryToBank'),
            message: t('visa.pages.basvuruYap.fields.message')
        };
        return labels[key] || key;
    };

    // Get filled fields for summary
    const getFilledFields = () => {
        const filled: Array<{ key: string; label: string; value: string }> = [];

        Object.entries(formData).forEach(([key, value]) => {
            // Check if value exists and is not empty
            if (value !== null && value !== undefined && value !== '' && value.toString().trim() !== '') {
                let displayValue = value.toString();

                // Format date values
                if (key === 'travel_date' && value) {
                    const date = new Date(value.toString());
                    displayValue = date.toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                }

                // Format long text values
                if (key === 'message' && displayValue.length > 50) {
                    displayValue = displayValue.substring(0, 50) + '...';
                }

                filled.push({
                    key,
                    label: getFieldLabel(key),
                    value: displayValue
                });
            }
        });

        return filled;
    };

    // Calculate progress percentage
    const calculateProgress = (): number => {
        const requiredFields = [
            'country', 'visa_type', 'flight_ticket',
            'name', 'surname', 'email', 'phone', 'age', 'travel_with', 'marital_status',
            'visa_before', 'visa_rejection', 'schengen_visa',
            'job', 'work_years', 'net_salary', 'salary_to_bank'
        ];

        const filledRequired = requiredFields.filter(field => {
            const value = formData[field as keyof typeof formData];
            return value && value.toString().trim() !== '';
        }).length;

        return requiredFields.length > 0
            ? Math.round((filledRequired / requiredFields.length) * 100)
            : 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isLoading) return;

        setIsLoading(true);
        const loadingOverlay = document.getElementById('loadingOverlay');
        const submitBtn = document.querySelector('.submit-btn') as HTMLButtonElement;

        if (loadingOverlay) loadingOverlay.classList.add('active');
        if (submitBtn) submitBtn.classList.add('loading');

        try {
            // Form submission logic here
            // await fetch('/api/send-email', { ... });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Redirect or show success message
            if (window.Swal) {
                window.Swal.fire({
                    icon: 'success',
                    title: t('visa.common.success', 'Başarılı!'),
                    text: t('visa.pages.basvuruYap.success'),
                    confirmButtonColor: '#C42127',
                    confirmButtonText: t('visa.common.ok')
                });
            } else {
                alert(t('visa.pages.basvuruYap.success'));
            }
        } catch (error) {
            console.error('Form submission error:', error);
            if (window.Swal) {
                window.Swal.fire({
                    icon: 'error',
                    title: t('visa.common.error'),
                    text: t('visa.pages.basvuruYap.error'),
                    confirmButtonColor: '#C42127',
                    confirmButtonText: t('visa.common.ok')
                });
            } else {
                alert(t('visa.pages.basvuruYap.error'));
            }
        } finally {
            setIsLoading(false);
            if (loadingOverlay) loadingOverlay.classList.remove('active');
            if (submitBtn) submitBtn.classList.remove('loading');
        }
    };

    return (
        <div className="visa-app-page">
            {/* Hero Section */}
            <section className="visa-hero">
                <div className="hero-bg-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>

                <div className="container">
                    <div className="hero-content">
                    
                        <h1 className="hero-title">
                            <span className="title-accent">Prince</span>
                            <span className="title-main">{t('visa.pages.basvuruYap.title')}</span>
                        </h1>
                        <p className="hero-subtitle">
                            {t('visa.pages.basvuruYap.subtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="visa-main-content">
                <div className="container">
                    <div className="form-layout-wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '40px', alignItems: 'start' }}>
                        {/* Left Column: Progress + Form */}
                        <div className="form-content-column">
                            {/* Progress Steps */}
                            <div className="progress-container">
                                <div className="progress-steps">
                                    <div className={`step-item ${currentStep >= 1 ? 'active' : ''} ${formData.country && formData.visa_type ? 'completed' : ''}`} data-step="1">
                                        <div className="step-circle">
                                            <span className="step-number">1</span>
                                            <svg className="step-check" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span className="step-label">{t('visa.pages.basvuruYap.steps.visaInfo')}</span>
                                    </div>
                                    <div className="step-line"></div>
                                    <div className={`step-item ${currentStep >= 2 ? 'active' : ''} ${formData.name && formData.surname && formData.email && formData.phone ? 'completed' : ''}`} data-step="2">
                                        <div className="step-circle">
                                            <span className="step-number">2</span>
                                            <svg className="step-check" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span className="step-label">{t('visa.pages.basvuruYap.steps.personalInfo')}</span>
                                    </div>
                                    <div className="step-line"></div>
                                    <div className={`step-item ${currentStep >= 3 ? 'active' : ''} ${formData.visa_before && formData.visa_rejection && formData.schengen_visa ? 'completed' : ''}`} data-step="3">
                                        <div className="step-circle">
                                            <span className="step-number">3</span>
                                            <svg className="step-check" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span className="step-label">{t('visa.pages.basvuruYap.steps.visaHistory')}</span>
                                    </div>
                                    <div className="step-line"></div>
                                    <div className={`step-item ${currentStep >= 4 ? 'active' : ''} ${formData.job && formData.work_years && formData.net_salary ? 'completed' : ''}`} data-step="4">
                                        <div className="step-circle">
                                            <span className="step-number">4</span>
                                            <svg className="step-check" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span className="step-label">{t('visa.pages.basvuruYap.steps.workInfo')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Form Container */}
                            <div className="form-wrapper">
                                <form id="visaApplicationForm" onSubmit={handleSubmit} noValidate>
                                    {/* Section 1: Vize Bilgileri */}
                                    <div className="form-section" data-section="1">
                                        <div className="section-header">
                                            <div className="section-icon">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="2" y1="12" x2="22" y2="12" />
                                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                                </svg>
                                            </div>
                                            <div className="section-title-wrapper">
                                                <h2 className="section-title">{t('visa.pages.basvuruYap.sections.visaInfo.title')}</h2>
                                                <p className="section-desc">{t('visa.pages.basvuruYap.sections.visaInfo.description')}</p>
                                            </div>
                                        </div>

                                        <div className="form-grid">
                                            <div className="form-group">
                                                <div className="select-wrapper">
                                                    <select
                                                        name="country"
                                                        id="country"
                                                        value={formData.country || ''}
                                                        onChange={(e) => {
                                                            handleInputChange(e);
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                country: e.target.value
                                                            }));
                                                        }}
                                                        required
                                                    >
                                                        <option value="" disabled>{t('visa.common.select')}</option>
                                                        {countries.map(country => (
                                                            <option key={country} value={country}>{country}</option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="country">{t('visa.pages.basvuruYap.fields.country')} <span className="required">*</span></label>
                                                    <span className="select-arrow">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="select-wrapper">
                                                    <select
                                                        name="visa_type"
                                                        id="visa_type"
                                                        value={formData.visa_type || ''}
                                                        onChange={(e) => {
                                                            handleInputChange(e);
                                                            // Force update
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                visa_type: e.target.value
                                                            }));
                                                        }}
                                                        required
                                                    >
                                                        <option value="" disabled>{t('visa.common.select')}</option>
                                                        {visaTypes.map(type => (
                                                            <option key={type} value={type}>{type}</option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="visa_type">{t('visa.pages.basvuruYap.fields.visaType')} <span className="required">*</span></label>
                                                    <span className="select-arrow">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="form-group full-width">
                                                <div className="input-wrapper">
                                                    <input
                                                        type="text"
                                                        name="travel_subject"
                                                        id="travel_subject"
                                                        value={formData.travel_subject}
                                                        onChange={handleInputChange}
                                                        placeholder=" "
                                                    />
                                                    <label htmlFor="travel_subject">{t('visa.pages.basvuruYap.fields.travelSubject')}</label>
                                                    <span className="input-hint">{t('visa.pages.basvuruYap.fields.travelSubjectHint', 'Örn: İş görüşmesi, Tatil, Eğitim...')}</span>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-wrapper">
                                                    <input
                                                        type="date"
                                                        name="travel_date"
                                                        id="travel_date"
                                                        value={formData.travel_date}
                                                        onChange={handleInputChange}
                                                        placeholder=" "
                                                    />
                                                    <label htmlFor="travel_date">{t('visa.pages.basvuruYap.fields.travelDate')}</label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="group-label">{t('visa.pages.basvuruYap.fields.flightTicket')} <span className="required">*</span></label>
                                                <div className="radio-cards">
                                                    <label className="radio-card">
                                                        <input
                                                            type="radio"
                                                            name="flight_ticket"
                                                            value={t('visa.pages.basvuruYap.options.yes')}
                                                            checked={formData.flight_ticket === t('visa.pages.basvuruYap.options.yes')}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        <span className="radio-card-content">
                                                            <span className="radio-indicator"></span>
                                                            <span className="radio-text">{t('visa.pages.basvuruYap.options.yes')}</span>
                                                        </span>
                                                    </label>
                                                    <label className="radio-card">
                                                        <input
                                                            type="radio"
                                                            name="flight_ticket"
                                                            value={t('visa.pages.basvuruYap.options.no')}
                                                            checked={formData.flight_ticket === t('visa.pages.basvuruYap.options.no')}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span className="radio-card-content">
                                                            <span className="radio-indicator"></span>
                                                            <span className="radio-text">{t('visa.pages.basvuruYap.options.no')}</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Kişisel Bilgiler */}
                                    <div className="form-section" data-section="2">
                                        <div className="section-header">
                                            <div className="section-icon">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </div>
                                            <div className="section-title-wrapper">
                                                <h2 className="section-title">{t('visa.pages.basvuruYap.sections.personalInfo.title')}</h2>
                                                <p className="section-desc">{t('visa.pages.basvuruYap.sections.personalInfo.description')}</p>
                                            </div>
                                        </div>

                                        <div className="form-grid">
                                            <div className="form-group">
                                                <div className="input-wrapper">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder=" "
                                                        required
                                                    />
                                                    <label htmlFor="name">{t('visa.pages.basvuruYap.fields.name')} <span className="required">*</span></label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-wrapper">
                                                    <input
                                                        type="text"
                                                        name="surname"
                                                        id="surname"
                                                        value={formData.surname}
                                                        onChange={handleInputChange}
                                                        placeholder=" "
                                                        required
                                                    />
                                                    <label htmlFor="surname">{t('visa.pages.basvuruYap.fields.surname')} <span className="required">*</span></label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-wrapper">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder=" "
                                                        inputMode="email"
                                                        autoComplete="email"
                                                        required
                                                    />
                                                    <label htmlFor="email">{t('visa.pages.basvuruYap.fields.email')} <span className="required">*</span></label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-wrapper">
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        id="phone"
                                                        value={formData.phone}
                                                        onChange={handlePhoneInput}
                                                        placeholder=" "
                                                        inputMode="tel"
                                                        autoComplete="tel"
                                                        required
                                                    />
                                                    <label htmlFor="phone">{t('visa.pages.basvuruYap.fields.phone')} <span className="required">*</span></label>
                                                    <span className="input-hint">0532 123 4567</span>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-wrapper">
                                                    <input
                                                        type="number"
                                                        name="age"
                                                        id="age"
                                                        value={formData.age}
                                                        onChange={handleAgeInput}
                                                        placeholder=" "
                                                        min="1"
                                                        max="120"
                                                        inputMode="numeric"
                                                        required
                                                    />
                                                    <label htmlFor="age">{t('visa.pages.basvuruYap.fields.age')} <span className="required">*</span></label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="select-wrapper">
                                                    <select
                                                        name="travel_with"
                                                        id="travel_with"
                                                        value={formData.travel_with || ''}
                                                        onChange={(e) => {
                                                            handleInputChange(e);
                                                            // Force update
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                travel_with: e.target.value
                                                            }));
                                                        }}
                                                        required
                                                    >
                                                        <option value="" disabled>{t('visa.common.select')}</option>
                                                        {travelWithOptions.map(option => (
                                                            <option key={option} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="travel_with">{t('visa.pages.basvuruYap.fields.travelWith')} <span className="required">*</span></label>
                                                    <span className="select-arrow">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="group-label">{t('visa.pages.basvuruYap.fields.maritalStatus')} <span className="required">*</span></label>
                                                <div className="radio-cards">
                                                    <label className="radio-card">
                                                        <input
                                                            type="radio"
                                                            name="marital_status"
                                                            value={t('visa.pages.basvuruYap.options.married')}
                                                            checked={formData.marital_status === t('visa.pages.basvuruYap.options.married')}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        <span className="radio-card-content">
                                                            <span className="radio-indicator"></span>
                                                            <span className="radio-text">{t('visa.pages.basvuruYap.options.married')}</span>
                                                        </span>
                                                    </label>
                                                    <label className="radio-card">
                                                        <input
                                                            type="radio"
                                                            name="marital_status"
                                                            value={t('visa.pages.basvuruYap.options.single')}
                                                            checked={formData.marital_status === t('visa.pages.basvuruYap.options.single')}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span className="radio-card-content">
                                                            <span className="radio-indicator"></span>
                                                            <span className="radio-text">{t('visa.pages.basvuruYap.options.single')}</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3: Vize Geçmişi */}
                                    <div className="form-section" data-section="3">
                                        <div className="section-header">
                                            <div className="section-icon">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polyline points="12 6 12 12 16 14" />
                                                </svg>
                                            </div>
                                            <div className="section-title-wrapper">
                                                <h2 className="section-title">{t('visa.pages.basvuruYap.sections.visaHistory.title')}</h2>
                                                <p className="section-desc">{t('visa.pages.basvuruYap.sections.visaHistory.description')}</p>
                                            </div>
                                        </div>

                                        <div className="form-grid three-cols">
                                            <div className="form-group">
                                                <label className="group-label">{t('visa.pages.basvuruYap.fields.visaBefore')} <span className="required">*</span></label>
                                                <div className="radio-cards">
                                                    <label className="radio-card">
                                                        <input
                                                            type="radio"
                                                            name="visa_before"
                                                            value={t('visa.pages.basvuruYap.options.yes')}
                                                            checked={formData.visa_before === t('visa.pages.basvuruYap.options.yes')}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        <span className="radio-card-content">
                                                            <span className="radio-indicator"></span>
                                                            <span className="radio-text">{t('visa.pages.basvuruYap.options.yes')}</span>
                                                        </span>
                                                    </label>
                                                    <label className="radio-card">
                                                        <input
                                                            type="radio"
                                                            name="visa_before"
                                                            value={t('visa.pages.basvuruYap.options.no')}
                                                            checked={formData.visa_before === t('visa.pages.basvuruYap.options.no')}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span className="radio-card-content">
                                                            <span className="radio-indicator"></span>
                                                            <span className="radio-text">{t('visa.pages.basvuruYap.options.no')}</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="group-label">{t('visa.pages.basvuruYap.fields.visaRejection')} <span className="required">*</span></label>
                                                <div className="radio-cards">
                                                    <label className="radio-card">
                                                        <input
                                                            type="radio"
                                                            name="visa_rejection"
                                                            value={t('visa.pages.basvuruYap.options.yes')}
                                                            checked={formData.visa_rejection === t('visa.pages.basvuruYap.options.yes')}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        <span className="radio-card-content">
                                                            <span className="radio-indicator"></span>
                                                            <span className="radio-text">{t('visa.pages.basvuruYap.options.yes')}</span>
                                                        </span>
                                                    </label>
                                                    <label className="radio-card">
                                                        <input
                                                            type="radio"
                                                            name="visa_rejection"
                                                            value={t('visa.pages.basvuruYap.options.no')}
                                                            checked={formData.visa_rejection === t('visa.pages.basvuruYap.options.no')}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span className="radio-card-content">
                                                            <span className="radio-indicator"></span>
                                                            <span className="radio-text">{t('visa.pages.basvuruYap.options.no')}</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="group-label">{t('visa.pages.basvuruYap.fields.schengenVisa')} <span className="required">*</span></label>
                                                <div className="radio-cards">
                                                    <label className="radio-card">
                                                        <input
                                                            type="radio"
                                                            name="schengen_visa"
                                                            value={t('visa.pages.basvuruYap.options.yes')}
                                                            checked={formData.schengen_visa === t('visa.pages.basvuruYap.options.yes')}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        <span className="radio-card-content">
                                                            <span className="radio-indicator"></span>
                                                            <span className="radio-text">{t('visa.pages.basvuruYap.options.yes')}</span>
                                                        </span>
                                                    </label>
                                                    <label className="radio-card">
                                                        <input
                                                            type="radio"
                                                            name="schengen_visa"
                                                            value={t('visa.pages.basvuruYap.options.no')}
                                                            checked={formData.schengen_visa === t('visa.pages.basvuruYap.options.no')}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span className="radio-card-content">
                                                            <span className="radio-indicator"></span>
                                                            <span className="radio-text">{t('visa.pages.basvuruYap.options.no')}</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 4: İş ve Finansal Bilgiler */}
                                    <div className="form-section" data-section="4">
                                        <div className="section-header">
                                            <div className="section-icon">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                                </svg>
                                            </div>
                                            <div className="section-title-wrapper">
                                                <h2 className="section-title">{t('visa.pages.basvuruYap.sections.workInfo.title')}</h2>
                                                <p className="section-desc">{t('visa.pages.basvuruYap.sections.workInfo.description')}</p>
                                            </div>
                                        </div>

                                        <div className="form-grid">
                                            <div className="form-group">
                                                <div className="select-wrapper">
                                                    <select
                                                        name="job"
                                                        id="job"
                                                        value={formData.job || ''}
                                                        onChange={(e) => {
                                                            handleInputChange(e);
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                job: e.target.value
                                                            }));
                                                        }}
                                                        required
                                                    >
                                                        <option value="" disabled>{t('visa.common.select')}</option>
                                                        {jobOptions.map(job => (
                                                            <option key={job} value={job}>{job}</option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="job">{t('visa.pages.basvuruYap.fields.job')} <span className="required">*</span></label>
                                                    <span className="select-arrow">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="select-wrapper">
                                                    <select
                                                        name="work_years"
                                                        id="work_years"
                                                        value={formData.work_years || ''}
                                                        onChange={(e) => {
                                                            handleInputChange(e);
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                work_years: e.target.value
                                                            }));
                                                        }}
                                                        required
                                                    >
                                                        <option value="" disabled>{t('visa.common.select')}</option>
                                                        {workYearsOptions.map(year => (
                                                            <option key={year} value={year}>{year}</option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="work_years">{t('visa.pages.basvuruYap.fields.workYears')} <span className="required">*</span></label>
                                                    <span className="select-arrow">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="select-wrapper">
                                                    <select
                                                        name="net_salary"
                                                        id="net_salary"
                                                        value={formData.net_salary || ''}
                                                        onChange={(e) => {
                                                            handleInputChange(e);
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                net_salary: e.target.value
                                                            }));
                                                        }}
                                                        required
                                                    >
                                                        <option value="" disabled>{t('visa.common.select')}</option>
                                                        {salaryOptions.map(salary => (
                                                            <option key={salary} value={salary}>{salary}</option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="net_salary">{t('visa.pages.basvuruYap.fields.netSalary')} <span className="required">*</span></label>
                                                    <span className="select-arrow">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="group-label">{t('visa.pages.basvuruYap.fields.salaryToBank')} <span className="required">*</span></label>
                                                <div className="radio-cards">
                                                    <label className="radio-card">
                                                        <input
                                                            type="radio"
                                                            name="salary_to_bank"
                                                            value={t('visa.pages.basvuruYap.options.yes')}
                                                            checked={formData.salary_to_bank === t('visa.pages.basvuruYap.options.yes')}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        <span className="radio-card-content">
                                                            <span className="radio-indicator"></span>
                                                            <span className="radio-text">{t('visa.pages.basvuruYap.options.yes')}</span>
                                                        </span>
                                                    </label>
                                                    <label className="radio-card">
                                                        <input
                                                            type="radio"
                                                            name="salary_to_bank"
                                                            value={t('visa.pages.basvuruYap.options.no')}
                                                            checked={formData.salary_to_bank === t('visa.pages.basvuruYap.options.no')}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span className="radio-card-content">
                                                            <span className="radio-indicator"></span>
                                                            <span className="radio-text">{t('visa.pages.basvuruYap.options.no')}</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 5: Ek Bilgiler */}
                                    <div className="form-section" data-section="5">
                                        <div className="section-header">
                                            <div className="section-icon">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                </svg>
                                            </div>
                                            <div className="section-title-wrapper">
                                                <h2 className="section-title">{t('visa.pages.basvuruYap.sections.additionalInfo.title', 'Ek Bilgiler')}</h2>
                                                <p className="section-desc">{t('visa.pages.basvuruYap.sections.additionalInfo.description', 'Eklemek istediğiniz notlar')}</p>
                                            </div>
                                        </div>

                                        <div className="form-grid">
                                            <div className="form-group full-width">
                                                <div className="textarea-wrapper">
                                                    <textarea
                                                        name="message"
                                                        id="message"
                                                        value={formData.message}
                                                        onChange={handleInputChange}
                                                        placeholder=" "
                                                        rows={4}
                                                    />
                                                    <label htmlFor="message">{t('visa.pages.basvuruYap.fields.message')}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Area */}
                                    <div className="submit-section">
                                        <p className="submit-note">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                            {t('visa.pages.basvuruYap.summary.privacyNote')}
                                        </p>

                                        <button type="submit" className={`submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                                            <span className="btn-content">
                                                <span className="btn-text">{t('visa.pages.basvuruYap.submit')}</span>
                                                <svg className="btn-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <line x1="22" y1="2" x2="11" y2="13" />
                                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                                </svg>
                                            </span>
                                            <span className="btn-loader">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Form Summary Sidebar */}
                        <div className="form-summary-sidebar" style={{ position: 'sticky', top: '100px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                            <div className="summary-card" style={{
                                border: '2px solid #C42127',
                                borderRadius: '12px',
                                padding: '24px',
                                backgroundColor: '#fff',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
                                    <h5 style={{
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        color: '#1A1A2E',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C42127" strokeWidth="2">
                                            <path d="M9 11l3 3L22 4" />
                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                        </svg>
                                        {t('visa.pages.basvuruYap.summary.title')}
                                    </h5>
                                    {/* Progress Circle */}
                                    <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
                                        <svg className="transform -rotate-90" width="80" height="80" viewBox="0 0 96 96">
                                            <circle
                                                cx="48"
                                                cy="48"
                                                r="40"
                                                fill="none"
                                                stroke="#e5e7eb"
                                                strokeWidth="6"
                                            />
                                            <circle
                                                cx="48"
                                                cy="48"
                                                r="40"
                                                fill="none"
                                                stroke="#C42127"
                                                strokeWidth="6"
                                                strokeDasharray={`${(calculateProgress() / 100) * 2 * Math.PI * 40} ${2 * Math.PI * 40}`}
                                                strokeLinecap="round"
                                                style={{ transition: 'all 0.5s ease' }}
                                            />
                                        </svg>
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#C42127' }}>{calculateProgress()}</span>
                                            <span style={{ fontSize: '10px', color: '#666', fontWeight: 500 }}>%</span>
                                        </div>
                                    </div>
                                </div>

                                <ul style={{
                                    fontSize: '14px',
                                    color: '#333',
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    borderLeft: '4px solid #C42127',
                                    paddingLeft: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }}>
                                    {getFilledFields().map(({ key, label, value }) => (
                                        <li key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C42127" strokeWidth="2" style={{ marginTop: '2px', flexShrink: 0 }}>
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                            <span>
                                                <strong style={{ color: '#1A1A2E' }}>{label}:</strong> {value}
                                            </span>
                                        </li>
                                    ))}
                                    {getFilledFields().length === 0 && (
                                        <li style={{ color: '#999', fontStyle: 'italic' }}>
                                            {t('visa.pages.basvuruYap.summary.startFilling')}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Loading Overlay */}
            <div className="loading-overlay" id="loadingOverlay">
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <p>{t('visa.common.submitting', 'Başvurunuz gönderiliyor...')}</p>
                </div>
            </div>
        </div>
    );
}

