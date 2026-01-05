import React, { ReactNode } from 'react'
import MedicalSidebar from './MedicalSidebar'

interface AdminLayoutProps {
  children: ReactNode
}

export const AdminMedicalLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <MedicalSidebar />
      <main style={{ flex: 1, marginLeft: '260px', padding: '40px' }}>
        {children}
      </main>
    </div>
  )
}
