/* eslint-disable @typescript-eslint/no-explicit-any */



import React, { useState } from 'react';
import { db } from '@/src/lib/firebase';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { MdLock, MdEmail } from 'react-icons/md';
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
      // Firestore'dan admin koleksiyonunu çek
      const querySnapshot = await getDocs(collection(db, 'admin'));
      let found = false;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email === email && data.password === password) {
          found = true;
        }
      });
      if (!found) {
        setError('Email veya şifre yanlış.');
        setLoading(false);
        return;
      }
      // Oturum bilgisini localStorage'a kaydet
      localStorage.setItem('adminSession', email);
      router.push('/admin');
    } catch (err: any) {
      setError('Giriş başarısız: ' + (err.message || 'Bilinmeyen hata'));
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginHeader}>
        <div className={styles.loginIconBox}>
          <MdLock size={32} color="#fff" />
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