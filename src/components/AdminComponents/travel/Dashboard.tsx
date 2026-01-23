/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import styles from '@/src/styles/admin.module.css'

interface DashboardStats {
  totalContacts: number
  totalForms: number
  totalVisits: number
  chartData: Array<{
    month: string
    visits: number
  }>
  topDestinations: Array<{ name: string; count: number }>
}

interface FilterPeriod {
  label: string
  value: 'daily' | 'monthly' | 'yearly'
}

const filterPeriods: FilterPeriod[] = [
  { label: 'Günlük', value: 'daily' },
  { label: 'Aylık', value: 'monthly' },
  { label: 'Yıllık', value: 'yearly' }
]

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    totalForms: 0,
    totalVisits: 0,
    chartData: [],
    topDestinations: []
  })
  // Separate period states for each StatCard
  const [contactPeriod, setContactPeriod] = useState<'daily' | 'monthly' | 'yearly'>('monthly')
  const [formPeriod, setFormPeriod] = useState<'daily' | 'monthly' | 'yearly'>('monthly')
  const [loading, setLoading] = useState(true)
  const [rawData, setRawData] = useState<{ contacts: any[]; forms: any[]; visits: any[] }>({ contacts: [], forms: [], visits: [] })
 

  // Fonksiyonlar


  // Ziyaret çizgi grafiği datası (son 6 ay)
  const generateVisitChartData = (visitDocs: any[]) => {
    const monthsMap: { [key: string]: number } = {}
    const today = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      monthsMap[key] = 0
    }
    visitDocs.forEach((doc) => {
      const createdAt = doc.data().createdAt
      if (createdAt?.toDate) {
        const d = createdAt.toDate()
        const key = `${d.getFullYear()}-${d.getMonth()}`
        if (monthsMap[key] !== undefined) {
          monthsMap[key]++
        }
      }
    })
    return Object.entries(monthsMap).map(([key, count]) => {
      const [year, month] = key.split('-').map(Number)
      const date = new Date(year, month, 1)
      return {
        month: date.toLocaleDateString('tr-TR', { month: 'short', year: '2-digit' }),
        visits: count
      }
    })
  }

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)

      // İletişim formlarını çek
      const contactsSnapshot = await getDocs(collection(db, 'travelcontact'))
      const formsSnapshot = await getDocs(collection(db, 'travelforms'))
      const visitsSnapshot = await getDocs(collection(db, 'travelSiteVisits'))

      setRawData({
        contacts: contactsSnapshot.docs,
        forms: formsSnapshot.docs,
        visits: visitsSnapshot.docs
      })

      // Varsayılan olarak tüm verileri göster
      const totalContacts = contactsSnapshot.size
      const totalForms = formsSnapshot.size
      const totalVisits = visitsSnapshot.size

      // Destinasyonları al (başvuru formlarından)
      const destinationMap: { [key: string]: number } = {}
      formsSnapshot.docs.forEach((doc) => {
        const data = doc.data()
        const location = data.answers?.['globalId'] || data.destination || 'Belirtilmemiş'
        destinationMap[location] = (destinationMap[location] || 0) + 1
      })

      const topDestinations = Object.entries(destinationMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)

      // Ziyaret çizgi grafiği datası
      const visitChartData = generateVisitChartData(visitsSnapshot.docs)

      setStats({
        totalContacts,
        totalForms,
        totalVisits,
        topDestinations,
        chartData: visitChartData
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Filtered stats by period (separate for contacts and forms)
  useEffect(() => {
    if (!rawData.contacts.length && !rawData.forms.length && !rawData.visits.length) return

    setLoading(true)
    const now = new Date()

    // Contacts
    let contactFiltered = rawData.contacts
    if (contactPeriod === 'daily') {
      contactFiltered = rawData.contacts.filter(doc => {
        const d = doc.data().createdAt?.toDate?.() || null
        return d && (now.getTime() - d.getTime() < 24 * 60 * 60 * 1000)
      })
    } else if (contactPeriod === 'monthly') {
      contactFiltered = rawData.contacts.filter(doc => {
        const d = doc.data().createdAt?.toDate?.() || null
        return d && (now.getTime() - d.getTime() < 31 * 24 * 60 * 60 * 1000)
      })
    } else if (contactPeriod === 'yearly') {
      contactFiltered = rawData.contacts.filter(doc => {
        const d = doc.data().createdAt?.toDate?.() || null
        return d && (now.getTime() - d.getTime() < 366 * 24 * 60 * 60 * 1000)
      })
    }

    // Forms
    let formsFiltered = rawData.forms
    if (formPeriod === 'daily') {
      formsFiltered = rawData.forms.filter(doc => {
        const d = doc.data().createdAt?.toDate?.() || null
        return d && (now.getTime() - d.getTime() < 24 * 60 * 60 * 1000)
      })
    } else if (formPeriod === 'monthly') {
      formsFiltered = rawData.forms.filter(doc => {
        const d = doc.data().createdAt?.toDate?.() || null
        return d && (now.getTime() - d.getTime() < 31 * 24 * 60 * 60 * 1000)
      })
    } else if (formPeriod === 'yearly') {
      formsFiltered = rawData.forms.filter(doc => {
        const d = doc.data().createdAt?.toDate?.() || null
        return d && (now.getTime() - d.getTime() < 366 * 24 * 60 * 60 * 1000)
      })
    }

    // Visits: use the selected period for forms (or you can create a separate dropdown if needed)
    let visitsFiltered = rawData.visits
    if (formPeriod === 'daily') {
      visitsFiltered = rawData.visits.filter(doc => {
        const d = doc.data().createdAt?.toDate?.() || null
        return d && (now.getTime() - d.getTime() < 24 * 60 * 60 * 1000)
      })
    } else if (formPeriod === 'monthly') {
      visitsFiltered = rawData.visits.filter(doc => {
        const d = doc.data().createdAt?.toDate?.() || null
        return d && (now.getTime() - d.getTime() < 31 * 24 * 60 * 60 * 1000)
      })
    } else if (formPeriod === 'yearly') {
      visitsFiltered = rawData.visits.filter(doc => {
        const d = doc.data().createdAt?.toDate?.() || null
        return d && (now.getTime() - d.getTime() < 366 * 24 * 60 * 60 * 1000)
      })
    }

    // Destinasyonları al (başvuru formlarından)
    const destinationMap: { [key: string]: number } = {}
    formsFiltered.forEach((doc) => {
      const data = doc.data()
      const location = data.answers?.['destination'] || data.destination || 'Belirtilmemiş'
      destinationMap[location] = (destinationMap[location] || 0) + 1
    })
    const topDestinations = Object.entries(destinationMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)

    // Ziyaret çizgi grafiği datası
    const visitChartData = generateVisitChartData(visitsFiltered)

    setStats({
      totalContacts: contactFiltered.length,
      totalForms: formsFiltered.length,
      totalVisits: visitsFiltered.length,
      topDestinations,
      chartData: visitChartData
    })
    setLoading(false)
  }, [contactPeriod, formPeriod, rawData])



  const StatCard = ({
    title,
    value,
    period,
    onPeriodChange,
    color
  }: {
    title: string
    value: number
    period?: 'daily' | 'monthly' | 'yearly'
    onPeriodChange?: (p: 'daily' | 'monthly' | 'yearly') => void
    color?: string
  }) => (
    <div className={styles.statCard}>
      <div className={styles.statCardHeader}>
        <h3 className={styles.statCardTitle}>{title}</h3>
        {onPeriodChange && (
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value as 'daily' | 'monthly' | 'yearly')}
            className={styles.statCardFilter}
          >
            {filterPeriods.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className={styles.statCardValue} style={color ? { color } : {}}>
        {loading ? '...' : value}
      </div>
      <p className={styles.statCardSubtext}>
        {period === 'daily' && 'Son 24 saat'}
        {period === 'monthly' && 'Son 1 ay'}
        {period === 'yearly' && 'Son 1 yıl'}
        {!period && 'Toplam'}
      </p>
    </div>
  )

  const destinationMaxCount = stats.topDestinations.length > 0 
    ? Math.max(...stats.topDestinations.map((d) => d.count)) 
    : 1

  // Tooltip state for line chart
  const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number; month: string } | null>(null)

  return (
    <div className={styles.dashboardWrapper}>
      <p className={styles.dashboardSubtitle}>Hoş geldiniz! İstatistikleriniz aşağıda yer almaktadır.</p>

      <div className={styles.statsGrid}>
        <StatCard
          title="Gelen İletişim Form Sayısı"
          value={stats.totalContacts}
          period={contactPeriod}
          onPeriodChange={setContactPeriod}
          color="#d7b76e"
        />
        <StatCard
          title="Gelen Başvuru Form Sayısı"
          value={stats.totalForms}
          period={formPeriod}
          onPeriodChange={setFormPeriod}
          color="#d7b76e"
        />
      </div>

      {/* En Çok Başvuru Alan Destinasyonlar */}
      <div className={styles.dashboardSection}>
        <h2 className={styles.dashboardSectionTitle}>En Çok Başvuru Alan Yerler</h2>
        {stats.topDestinations.length === 0 ? (
          <p className={styles.dashboardEmpty}>Henüz veri yok</p>
        ) : (
          <div className={styles.operationsList}>
            {stats.topDestinations.map((dest, index) => (
              <div key={index} className={styles.operationItem}>
                <div className={styles.operationInfo}>
                  <span className={styles.operationRank} style={{ color: '#d7b76e' }}>#{index + 1}</span>
                  <span className={styles.operationName}>{dest.name}</span>
                </div>
                <div className={styles.operationBar}>
                  <div
                    className={styles.operationBarFill}
                    style={{
                      width: `${(dest.count / destinationMaxCount) * 100}%`,
                      background: 'linear-gradient(90deg, #e1d4b6, #d7b76e)'
                    }}
                  />
                </div>
                <span className={styles.operationCount} style={{ color: '#d7b76e' }}>{dest.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Site Ziyaret Trendi (Çizgi Grafik) */}
      <div className={styles.dashboardSection}>
        <h2 className={styles.dashboardSectionTitle}>Site Ziyaret Sıklığı</h2>

        <div className={styles.lineChartWrapper} style={{ position: 'relative' }}>
          {/* Increase SVG width for more distance between points */}
          <svg
            width="100%"
            height="200"
            viewBox="0 0 1200 200"
            style={{ overflow: 'visible' }}
            onMouseLeave={() => setTooltip(null)}
          >
            {stats.chartData.map((d, i) => {
              if (i === 0) return null
              const prev = stats.chartData[i - 1]
              // Use 1200 instead of 600 for more spacing
              const x1 = ((i - 1) / (stats.chartData.length - 1)) * 1200
              const y1 = 180 - (prev.visits / Math.max(...stats.chartData.map(v => v.visits), 1)) * 150
              const x2 = (i / (stats.chartData.length - 1)) * 1200
              const y2 = 180 - (d.visits / Math.max(...stats.chartData.map(v => v.visits), 1)) * 150
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#d7b76e"
                  strokeWidth="3"
                />
              )
            })}

            {stats.chartData.map((d, i) => {
              const x = (i / (stats.chartData.length - 1)) * 1200
              const y = 180 - (d.visits / Math.max(...stats.chartData.map(v => v.visits), 1)) * 150
              return (
                <g key={`dot-${i}`}
                  onMouseEnter={() => setTooltip({ x, y, value: d.visits, month: d.month })}
                  onMouseMove={e => {
                    // Optionally update position if needed
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="#fff"
                    opacity={tooltip && tooltip.x === x && tooltip.y === y ? 0.5 : 0}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#d7b76e"
                  />
                </g>
              )
            })}
          </svg>
          {tooltip && (
            <div
              className={styles.lineChartTooltip}
              style={{
                position: 'absolute',
                left: `calc(${(tooltip.x / 1200) * 100}% - 40px)`,
                top: tooltip.y - 40,
                pointerEvents: 'none',
                background: '#fff',
                border: '1px solid #d7b76e',
                color: '#d7b76e',
                borderRadius: 6,
                padding: '6px 12px',
                fontSize: 13,
                fontWeight: 500,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                zIndex: 10,
                minWidth: 60,
                textAlign: 'center',
                transform: 'translateY(-100%)',
                whiteSpace: 'nowrap'
              }}
            >
              <div style={{ fontWeight: 600 }}>{tooltip.value} ziyaret</div>
              <div style={{ fontSize: 12, color: '#888' }}>{tooltip.month}</div>
            </div>
          )}
          <div className={styles.lineChartLabels}>
            {stats.chartData.map((d, i) => (
              <span key={i}>{d.month}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
