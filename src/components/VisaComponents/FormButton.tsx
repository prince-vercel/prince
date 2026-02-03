import React from 'react';
import { useRouter } from 'next/router';
import { useSafeTranslation } from '../../hooks/useSafeTranslation';
import '../../i18n';

const VisaFormButton = () => {
  const router = useRouter();
  const { t, isReady } = useSafeTranslation();

  const handleClick = () => {
    router.push('/visa/basvuru-yap');
  };

  return (
    <button
      onClick={handleClick}
      style={{

        backgroundColor: '#c42721',
       position: 'fixed',
        bottom: '14%',
        right: '0.9%',
        color: 'white',
        border: '1px solid white',
        fontSize: '16px',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textOrientation: 'mixed',
        padding: '10px',
        fontWeight: 'bold',
        lineHeight: '1.2',
        borderRadius:'4px'
      }}
      title="Form Sayfasına Git"
      suppressHydrationWarning
    >
      {isReady ? t('visa.header.apply') : 'Başvuru Yap'}
    </button>
  );
};

export default VisaFormButton;