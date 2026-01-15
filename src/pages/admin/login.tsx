/* eslint-disable @typescript-eslint/no-explicit-any */



import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MdEmail, MdLock } from 'react-icons/md';
import styles from '@/src/styles/admin.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Oturum bilgisini localStorage'a kaydet
        localStorage.setItem('adminSession', email);
        router.push('/admin');
      } else {
        setError(data.message || 'Giriş başarısız');
      }
    } catch (err: any) {
      setError('Giriş başarısız: ' + (err.message || 'Bilinmeyen hata'));
    }
    setLoading(false);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginHeader}>
        <div className={styles.loginIconBox}>
          <Image src="/assets/logo/logo-mavi.png" alt="Logo" width={100} height={80} />
        </div>
        <h2 className={styles.loginTitle}>Admin Girişi</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.loginField}>
          <label htmlFor="email" className={styles.loginLabel}>Email</label>
          <div className={styles.loginInputIconWrapper}>
            <MdEmail size={20} className={styles.loginInputIcon} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={styles.loginInput}
              autoComplete="username"
            />
          </div>
        </div>
        <div className={styles.loginField}>
          <label htmlFor="password" className={styles.loginLabel}>Şifre</label>
          <div className={styles.loginInputIconWrapper}>
            <MdLock size={20} className={styles.loginInputIcon} />
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className={styles.loginInput}
              autoComplete="current-password"
            />
          </div>
        </div>
        {error && <div className={styles.loginError}>{error}</div>}
        <button 
          type="submit"
          disabled={loading}
          className={styles.loginButton + (loading ? ' ' + styles.loginButtonDisabled : '')}
        >
          {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>
    </div>
  );
};

export default Login;