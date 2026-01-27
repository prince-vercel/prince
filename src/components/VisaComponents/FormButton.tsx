import React from 'react';
import { useRouter } from 'next/router';

const VisaFormButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/visa/basvuru-yap');
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '40%',
        right: '0px',
        width: '35px',
        height: '120px',
        backgroundColor: '#c42721',
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
        padding: '10px 0',
        transform: 'rotate(180deg)',
        borderBottomRightRadius: '10%',
        borderTopRightRadius: '10%',
        fontWeight: 'bold',

      }}
      title="Form Sayfasına Git"
    >
      Başvuru Yap
    </button>
  );
};

export default VisaFormButton;