interface ToastProps {
  type: 'success' | 'error'
  message: string
  top?: string
}

export default function Toast({ type, message, top = '20px' }: ToastProps) {
  const isSuccess = type === 'success'
  
  return (
    <>
      <div style={{
        position: 'fixed',
        top: top,
        right: '20px',
        padding: '16px 24px',
        background: isSuccess ? '#10b981' : '#ef4444',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 9999,
        animation: 'slideInRight 0.3s ease-out, slideOutRight 0.3s ease-out 2.7s forwards',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <i className={`bi bi-${isSuccess ? 'check-circle' : 'exclamation-circle'} text-lg`}></i>
        {message}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
