'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import '../../i18n'

export default function CountrySelectionForm() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedPurpose, setSelectedPurpose] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const countries = [
    'ABD', 'Almanya', 'Avustralya', 'Avusturya', 'Belçika', 'Bulgaristan',
    'Çekya', 'Danimarka', 'Estonya', 'Finlandiya', 'Fransa', 'Hollanda',
    'İngiltere', 'İrlanda', 'İspanya', 'İsveç', 'İsviçre', 'İtalya',
    'Kanada', 'Letonya', 'Litvanya', 'Lüksemburg', 'Macaristan', 'Malta',
    'Norveç', 'Polonya', 'Portekiz', 'Romanya', 'Slovakya', 'Slovenya', 'Yunanistan'
  ]

  const visaTypes = mounted && i18n.isInitialized ? [
    t('visa.pages.basvuruYap.options.visaTypes.tourist', 'Turistik Vize'),
    t('visa.pages.basvuruYap.options.visaTypes.business', 'İş Vizesi'),
    t('visa.pages.basvuruYap.options.visaTypes.student', 'Öğrenci Vizesi'),
    t('visa.pages.basvuruYap.options.visaTypes.family', 'Aile Birleşimi'),
    t('visa.pages.basvuruYap.options.visaTypes.transit', 'Transit Vize'),
    t('visa.pages.basvuruYap.options.visaTypes.work', 'Çalışma Vizesi')
  ] : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCountry && selectedPurpose) {
      router.push('/visa/basvuru-yap')
    }
  }

  return (
    <>
      <section className="section country-selection-section">
        <div className="container">
          <div className="country-selection-card">
            <div className="selection-header">
              <div className="header-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="header-text">
                <h2 suppressHydrationWarning>
                  {mounted && i18n.isInitialized ? t('visa.countrySelection.title', 'Vize Başvurunuza Başlayın') : ''}
                </h2>
                <p suppressHydrationWarning>
                  {mounted && i18n.isInitialized ? t('visa.countrySelection.description', 'Gitmek istediğiniz ülkeyi seçin, size uygun vize türleri görüntülensin') : ''}
                </p>
              </div>
            </div>

            <form className="selection-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* Ülke Seçimi */}
                <div className="select-wrapper" id="country-select-wrapper">
                  <label className="select-label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span suppressHydrationWarning>
                      {mounted && i18n.isInitialized ? t('visa.countrySelection.countryLabel', 'Yolculuk Nereye?') : ''}
                    </span>
                  </label>
                  <div className="custom-select-container">
                    <select
                      name="country"
                      id="country-select"
                      className="hidden-select"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        {mounted && i18n.isInitialized ? t('visa.countrySelection.selectCountry', 'Ülke Seçiniz') : ''}
                      </option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seyahat Amacı */}
                <div className="select-wrapper" id="purpose-select-wrapper">
                  <label className="select-label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span suppressHydrationWarning>
                      {mounted && i18n.isInitialized ? t('visa.countrySelection.purposeLabel', 'Seyahat Amacınız Nedir?') : ''}
                    </span>
                  </label>
                  <div className="custom-select-container">
                    <select
                      name="purpose"
                      id="purpose-select"
                      className="hidden-select"
                      value={selectedPurpose}
                      onChange={(e) => setSelectedPurpose(e.target.value)}
                      disabled={!selectedCountry}
                      required
                    >
                      <option value="" disabled>
                        {selectedCountry 
                          ? (mounted && i18n.isInitialized ? t('visa.countrySelection.selectPurpose', 'Seyahat Amacı Seçiniz') : '')
                          : (mounted && i18n.isInitialized ? t('visa.countrySelection.selectCountryFirst', 'Lütfen Ülke Seçiniz') : '')
                        }
                      </option>
                      {visaTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Başlat Butonu */}
                <button type="submit" className="start-button" disabled={!selectedCountry || !selectedPurpose}>
                  <span suppressHydrationWarning>
                    {mounted && i18n.isInitialized ? t('visa.countrySelection.startButton', 'Başvuruyu Başlat') : ''}
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .country-selection-section {
          padding: 60px 0;
          background: #fff;
        }

        .country-selection-card {
          background: #c42721;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 8px 32px rgba(196, 39, 33, 0.2);
        }

        .selection-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 32px;
        }

        .header-icon {
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #fff;
        }

        .header-text h2 {
          color: #fff;
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .header-text p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          margin: 0;
          line-height: 1.5;
        }

        .selection-form {
          width: 100%;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 20px;
          align-items: end;
        }

        .select-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .select-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
        }

        .select-label svg {
          flex-shrink: 0;
        }

        .custom-select-container {
          position: relative;
        }

        .hidden-select {
          width: 100%;
          padding: 14px 16px;
          padding-right: 40px;
          border: none;
          border-radius: 12px;
          background: #fff;
          color: #1a1a2e;
          font-size: 15px;
          font-weight: 500;
          appearance: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        #purpose-select-wrapper .hidden-select {
          background: rgba(255, 255, 255, 0.85);
        }

        .hidden-select:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
        }

        .hidden-select:disabled {
          background: rgba(255, 255, 255, 0.6);
          cursor: not-allowed;
          color: #8e8ea9;
        }

        .custom-select-container::after {
          content: '';
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid #1a1a2e;
          pointer-events: none;
        }

        .start-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .start-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }

        .start-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .start-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .start-button svg {
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .start-button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .country-selection-card {
            padding: 24px;
            border-radius: 16px;
          }

          .selection-header {
            flex-direction: column;
            gap: 16px;
            margin-bottom: 24px;
          }

          .header-icon {
            width: 56px;
            height: 56px;
          }

          .header-text h2 {
            font-size: 24px;
          }

          .header-text p {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  )
}
