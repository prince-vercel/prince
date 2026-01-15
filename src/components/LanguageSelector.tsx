import React from 'react'

interface LanguageSelectorProps {
  selectedLanguage: 'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru'
  onLanguageChange: (language: 'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru') => void
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  return (
    <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value as 'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru')}
        style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          background: 'white',
          fontSize: '14px',
          cursor: 'pointer'
        }}
      >
        <option value="tr">TR</option>
        <option value="en">EN</option>
        <option value="fr">FR</option>
        <option value="es">ES</option>
        <option value="ar">AR</option>
        <option value="ru">RU</option>
      </select>
    </div>
  )
}

export default LanguageSelector