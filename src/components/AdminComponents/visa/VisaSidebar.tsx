'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '@/src/styles/admin.module.css'
import { MdHome, MdLogout } from 'react-icons/md'
const logo = '/assets/logo/logo-white.png'

const VisaSidebar = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <>
      <button className={styles.hamburger} style={{ color: '#cc0000' }} onClick={() => setOpen(true)}>
        ☰
      </button>

<aside className={`${styles.sidebar} ${open ? styles.open : ''}`} style={{ backgroundColor: '#cc0000' }}>          <div className={styles.logoArea}>
          <Image src={logo} alt="Logo" width={140} height={40} />
        </div>
        <h1 className={styles.sidebarTitle}>Prince Vize</h1>

        <nav className={styles.menu}>
          <Link href="/admin/visa" className={`${styles.link3} ${isActive('/admin/visa') ? styles.active : '#cc0000'}`}>Anasayfa</Link>
          <Link href="/admin/visa/userforms" className={`${styles.link3} ${isActive('/admin/visa/userforms') ? styles.active : '#cc0000'}`}>Başvurular</Link>
          <Link href="/admin/visa/contents" className={`${styles.link3} ${isActive('/admin/visa/contents') ? styles.active : '#cc0000'}`}>İçerik Yönetimi</Link>
          <Link href="/admin/visa/contactforms" className={`${styles.link3} ${isActive('/admin/visa/contactforms') ? styles.active : '#cc0000'}`}>İletişim</Link>
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

export default VisaSidebar
