'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logo from '@/assets/logo/logo-white.png'
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
    <Image src={logo} alt="Logo" width={140} height={40} />
  </div>
  <h1 className={styles.sidebarTitle}>Prince Medikal</h1>

  <nav className={styles.menu}>
    <Link href="/admin/medical" className={`${styles.link} ${isActive('/admin/medical') ? styles.active : ''}`}>Anasayfa</Link>
    <Link href="/admin/medical/userforms" className={`${styles.link} ${isActive('/admin/medical/userforms') ? styles.active : ''}`}>Başvurular</Link>
    <Link href="/admin/medical/contents" className={`${styles.link} ${isActive('/admin/medical/contents') ? styles.active : ''}`}>İçerik Yönetimi</Link>
    <Link href="/admin/medical/contactforms" className={`${styles.link} ${isActive('/admin/medical/contactforms') ? styles.active : ''}`}>İletişim</Link>
  </nav>

  <button className={styles.close} onClick={() => setOpen(false)}>
    ✕
  </button>
</aside>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </>
  )
}

export default MedicalSidebar
