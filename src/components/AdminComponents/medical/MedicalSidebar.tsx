'use client'
import React, { useState } from 'react'
import { MdHome, MdLogout } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const logo = '/assets/logo/logo-white.png'
import styles from '@/src/styles/admin.module.css'

const MedicalSidebar = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <>
      <button className={styles.hamburger} onClick={() => setOpen(true)}>
        ☰
      </button>

<aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
  <div className={styles.logoArea}>
    <Image src={logo} alt="Logo" width={140} height={60} />
  </div>
  <h1 className={styles.sidebarTitle}>Prince Medikal</h1>

  <nav className={styles.menu}>
    <Link href="/admin/medical" className={`${styles.link} ${isActive('/admin/medical') ? styles.active : ''}`}>Anasayfa</Link>
    <Link href="/admin/medical/userforms" className={`${styles.link} ${isActive('/admin/medical/userforms') ? styles.active : ''}`}>Başvurular</Link>
    <Link href="/admin/medical/contents" className={`${styles.link} ${isActive('/admin/medical/contents') ? styles.active : ''}`}>İçerik Yönetimi</Link>
    <Link href="/admin/medical/contactforms" className={`${styles.link} ${isActive('/admin/medical/contactforms') ? styles.active : ''}`}>İletişim</Link>
  </nav>
      <div className={styles.bottomLinks} style={{ display: 'flex', gap: 12 }}>
        <Link href="/admin" className={styles.borderBox} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', padding: 0, width: 40, height: 40 }}>
          <MdHome size={22} />
        </Link>
        <button
          className={styles.borderBox}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: 40, height: 40 }}
          title="Çıkış Yap"
          onClick={() => {
            localStorage.removeItem('adminSession');
            window.location.href = '/admin/login';
          }}
        >
          <MdLogout size={22} />
        </button>
      </div>
  <button className={styles.close} onClick={() => setOpen(false)}>
    ✕
  </button>
</aside>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </>
  )
}

export default MedicalSidebar
