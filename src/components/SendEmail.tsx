/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import styles from '@/src/styles/admin.module.css'

interface SendEmailProps {
  isOpen: boolean
  onClose: () => void
  recipientEmail: string
  recipientName: string
}

const SendEmail = ({ isOpen, onClose, recipientEmail, recipientName }: SendEmailProps) => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleSend = async () => {
    if (!subject || !message) {
      alert('Konu ve mesaj gereklidir')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject: subject,
          message: message,
          recipientName: recipientName
        })
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMsg = data.details || data.error || 'Email gönderilemedi'
        console.error('API Hatası:', errorMsg)
        throw new Error(errorMsg)
      }

      setNotification({ type: 'success', message: 'Cevap başarıyla gönderildi!' })
      resetForm()
      setTimeout(() => onClose(), 2000)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Bilinmeyen hata'
      console.error('Email gönderilirken hata:', error)
      setNotification({ type: 'error', message: errorMsg })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSubject('')
    setMessage('')
  }

  if (!isOpen) return null

  return (
    <>
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '6px',
            backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            animation: 'slideIn 0.3s ease-out',
          }}
          onAnimationEnd={() => {
            if (notification.type === 'success') {
              setTimeout(() => setNotification(null), 1500)
            }
          }}
        >
          {notification.message}
        </div>
      )}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h2 style={{fontSize:'20px', margin: '0 0 4px 0'}}>Cevap Gönder</h2>
            <p style={{fontSize:'14px', color: '#666', margin: 0}}>Alıcı: {recipientName} ({recipientEmail})</p>
          </div>
          <button 
            className={styles.modalClose}
            onClick={onClose}
            style={{fontSize:'20px'}}
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Subject */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{fontSize:'15px', fontWeight: '500', color: '#333', display: 'block', marginBottom: '8px'}}>
              Konu
            </label>
            <input
              type="text"
              placeholder="Email konusu..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Message */}
          <div>
            <label style={{fontSize:'15px', fontWeight: '500', color: '#333', display: 'block', marginBottom: '8px'}}>
              Mesaj
            </label>
            <textarea
              placeholder="Cevapınızı yazınız..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontFamily: 'inherit',
                minHeight: '200px',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={styles.btnCancel}
            onClick={onClose}
            style={{fontSize:'16px'}}
            disabled={loading}
          >
            İptal
          </button>
          <button 
            className={styles.btnSend}
            onClick={handleSend}
            style={{fontSize:'16px'}}
            disabled={loading || !subject || !message}
          >
            {loading ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default SendEmail
