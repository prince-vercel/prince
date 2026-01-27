import React from 'react';
import { useRouter } from 'next/router';
import { useSafeTranslation } from '../../hooks/useSafeTranslation';
import '../../i18n';

const TravelFormButton = () => {
  const router = useRouter();
  const { t, isReady } = useSafeTranslation();

  const handleClick = () => {
    router.push('/travel/form');
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '40%',
        right: '0px',
        width: '35px',
        minHeight: '120px',
        height: 'auto',
        backgroundColor: '#d7b76e',
        color: 'white',
        border: '1px solid white',
        fontSize: '15px',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        padding: '15px 5px',
        transform: 'rotate(180deg)',
        borderBottomRightRadius: '10%',
        borderTopRightRadius: '10%',
        fontWeight: 'bold',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        lineHeight: '1.2',
      }}
      title="Form Sayfasına Git"
      suppressHydrationWarning
    >
      {isReady ? t('travel.header.apply') : 'Başvuru Yap'}
    </button>
  );
};

export default TravelFormButton;