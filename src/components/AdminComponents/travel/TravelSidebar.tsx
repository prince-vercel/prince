'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logo from '@/assets/logo/logo-white.png'
import styles from '@/src/styles/admin.module.css'

const TravelSidebar = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <>
      <button className={styles.hamburger} style={{ color: '#E8604C' }} onClick={() => setOpen(true)}>
        ☰
      </button>

<aside className={`${styles.sidebar} ${open ? styles.open : ''}`} style={{ backgroundColor: '#E8604C' }}>          <div className={styles.logoArea}>
          <Image src={logo} alt="Logo" width={140} height={40} />
        </div>
        <h1 className={styles.sidebarTitle}>Prince Seyahat</h1>

        <nav className={styles.menu}>
          <Link href="/admin/travel" className={`${styles.link2} ${isActive('/admin/travel') ? styles.active : ''}`}>Anasayfa</Link>
          <Link href="/admin/travel/userforms" className={`${styles.link2} ${isActive('/admin/travel/userforms') ? styles.active : ''}`}>Başvurular</Link>
          <Link href="/admin/travel/contents" className={`${styles.link2} ${isActive('/admin/travel/contents') ? styles.active : ''}`}>İçerik Yönetimi</Link>
          <Link href="/admin/travel/contactforms" className={`${styles.link2} ${isActive('/admin/travel/contactforms') ? styles.active : ''}`}>İletişim</Link>
        </nav>

        <button className={styles.close} onClick={() => setOpen(false)}>
          ✕
        </button>
      </aside>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </>
  )
}

export default TravelSidebar
