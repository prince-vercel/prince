import React, { ReactNode } from 'react'
import TravelSidebar from './TravelSidebar'

interface AdminLayoutProps {
  children: ReactNode
}

export const AdminTravelLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <TravelSidebar />
      <main style={{ flex: 1, marginLeft: '260px', padding: '40px' }}>
        {children}
      </main>
    </div>
  )
}
