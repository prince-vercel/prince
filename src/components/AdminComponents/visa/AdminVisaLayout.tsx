import React, { ReactNode } from 'react'
import VisaSidebar from './VisaSidebar'

interface AdminLayoutProps {
  children: ReactNode
}

export const AdminVisaLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <VisaSidebar />
      <main style={{ 
        flex: 1, 
        marginLeft: '260px', 
        padding: '40px'
      }}>
        {children}
      </main>
      <style>{`
        @media (max-width: 1024px) {
          main {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
