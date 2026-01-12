/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import styles from '@/src/styles/admin.module.css'
import { ChartDataItem, DashboardStats, FilterPeriod } from '@/src/types/types'



const filterPeriods: FilterPeriod[] = [
  { label: 'Günlük', value: 'daily' },
  { label: 'Aylık', value: 'monthly' },
  { label: 'Yıllık', value: 'yearly' }
]

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats & {
    topDestinations: Array<{ name: string; count: number }>,
    totalVisits: number,
    visitChartData: Array<{ month: string; visits: number }>
  }>(
    {
      totalForms: 0,
      totalMessages: 0,
      topOperations: [],
      chartData: [],
      topDestinations: [],
      totalVisits: 0,
      visitChartData: []
    }
  )
  const [visitsPeriod, setVisitsPeriod] = useState<'daily' | 'monthly' | 'yearly'>('monthly')
  const [formsPeriod, setFormsPeriod] = useState<'daily' | 'monthly' | 'yearly'>('monthly')
  const [messagesPeriod, setMessagesPeriod] = useState<'daily' | 'monthly' | 'yearly'>('monthly')
  const [loading, setLoading] = useState(true)

  const getDateRange = (period: 'daily' | 'monthly' | 'yearly') => {
    const now = new Date()
    const startDate = new Date()

    switch (period) {
      case 'daily':
        startDate.setDate(now.getDate() - 1)
        break
      case 'monthly':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'yearly':
        startDate.setFullYear(now.getFullYear() - 1)
        break
    }

    return { startDate, endDate: now }
  }

  const generateChartData = (formsDocs: any[], messagesDocs: any[]): ChartDataItem[] => {
    const monthsMap: { [key: string]: { forms: number; messages: number } } = {}
    const today = new Date()

    // Son 6 ay için ay anahtarları oluştur
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`
      monthsMap[monthKey] = { forms: 0, messages: 0 }
    }

    // Başvuruları say
    formsDocs.forEach((doc) => {
      const createdAt = doc.data().createdAt
      if (createdAt && typeof createdAt.toDate === 'function') {
        const docDate = createdAt.toDate()
        const monthKey = `${docDate.getFullYear()}-${docDate.getMonth()}`
        if (monthKey in monthsMap) {
          monthsMap[monthKey].forms++
        }
      }
    })

    // Mesajları say
    messagesDocs.forEach((doc) => {
      const createdAt = doc.data().createdAt
      if (createdAt && typeof createdAt.toDate === 'function') {
        const docDate = createdAt.toDate()
        const monthKey = `${docDate.getFullYear()}-${docDate.getMonth()}`
        if (monthKey in monthsMap) {
          monthsMap[monthKey].messages++
        }
      }
    })

    // Sonuç dizisini oluştur
    const result: ChartDataItem[] = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`
      const monthStr = date.toLocaleDateString('tr-TR', { month: 'short', year: '2-digit' })
      
      result.push({
        month: monthStr,
        forms: monthsMap[monthKey].forms,
        messages: monthsMap[monthKey].messages
      })
    }

    return result
  }


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

  const fetchStats = async () => {
    try {
      setLoading(true)

      // Başvuruları çek (dönem bazlı)
      const formsRange = getDateRange(formsPeriod)
      const formsQuery = query(
        collection(db, 'medicalforms'),
        where('createdAt', '>=', Timestamp.fromDate(formsRange.startDate)),
        where('createdAt', '<=', Timestamp.fromDate(formsRange.endDate))
      )
      const formsSnapshot = await getDocs(formsQuery)

      // Mesajları çek (dönem bazlı)
      const messagesRange = getDateRange(messagesPeriod)
      const messagesQuery = query(
        collection(db, 'medicalcontact'),
        where('createdAt', '>=', Timestamp.fromDate(messagesRange.startDate)),
        where('createdAt', '<=', Timestamp.fromDate(messagesRange.endDate))
      )
      const messagesSnapshot = await getDocs(messagesQuery)

      // Ziyaretleri çek (dönem bazlı)
      const visitsRange = getDateRange(visitsPeriod)
      const visitsQuery = query(
        collection(db, 'medicalSiteVisits'),
        where('createdAt', '>=', Timestamp.fromDate(visitsRange.startDate)),
        where('createdAt', '<=', Timestamp.fromDate(visitsRange.endDate))
      )
      const visitsSnapshot = await getDocs(visitsQuery)

      // En sık istenen işlemleri bul (tüm zamanlar)
      const allFormsSnapshot = await getDocs(collection(db, 'medicalforms'))
      const operationMap: { [key: string]: number } = {}
      const targetQuestionId = 'LGeWQVtcDgYkPGISWD0e'
      
      allFormsSnapshot.docs.forEach((doc) => {
        const data = doc.data()
        const operation = data.answers?.[targetQuestionId]
        
        // Belirtilmemiş olanları hariç tut
        if (operation) {
          const operationName = Array.isArray(operation) ? operation.join(', ') : String(operation)
          if (operationName && operationName !== 'Belirtilmemiş') {
            operationMap[operationName] = (operationMap[operationName] || 0) + 1
          }
        }
      })

      const topOperations = Object.entries(operationMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)

      // En çok başvuru alan destinasyonlar (formsSnapshot.docs üzerinden)
      const destinationMap: { [key: string]: number } = {}
      const destinationQuestionId = '2PbarmXMOjCuAQNFLpbA'
      formsSnapshot.docs.forEach((doc) => {
        const data = doc.data()
        const location = data.answers?.[destinationQuestionId] || data.destination || 'Belirtilmemiş'
        if (location && location !== 'Belirtilmemiş') {
          destinationMap[location] = (destinationMap[location] || 0) + 1
        }
      })
      const topDestinations = Object.entries(destinationMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)

      // Grafik verilerini hazırla
      const chartData = generateChartData(formsSnapshot.docs, messagesSnapshot.docs)
      const visitChartData = generateVisitChartData(visitsSnapshot.docs)

      setStats({
        totalForms: formsSnapshot.docs.length,
        totalMessages: messagesSnapshot.docs.length,
        topOperations,
        chartData,
        topDestinations,
        totalVisits: visitsSnapshot.docs.length,
        visitChartData
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [formsPeriod, messagesPeriod])

  const StatCard = ({
    title,
    value,
    period,
    onPeriodChange
  }: {
    title: string
    value: number
    period: 'daily' | 'monthly' | 'yearly'
    onPeriodChange: (p: 'daily' | 'monthly' | 'yearly') => void
  }) => (
    <div className={styles.statCard}>
      <div className={styles.statCardHeader}>
        <h3 className={styles.statCardTitle}>{title}</h3>
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
      </div>
      <div className={styles.statCardValue}>
        {loading ? '...' : value}
      </div>
      <p className={styles.statCardSubtext}>
        {period === 'daily' && 'Son 24 saat'}
        {period === 'monthly' && 'Son 1 ay'}
        {period === 'yearly' && 'Son 1 yıl'}
      </p>
    </div>
  )

  const maxValue = Math.max(
    ...stats.chartData.map((d) => Math.max(d.forms, d.messages)),
    1
  )

  const operationMaxCount = stats.topOperations.length > 0 
    ? Math.max(...stats.topOperations.map((o) => o.count)) 
    : 1

  const destinationMaxCount = stats.topDestinations && stats.topDestinations.length > 0
    ? Math.max(...stats.topDestinations.map((d) => d.count))
    : 1

  // Tooltip state for line chart
  const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number; month: string } | null>(null)

  return (
    <div className={styles.dashboardWrapper}>
      <p className={styles.dashboardSubtitle}>Hoş geldiniz! İstatistikleriniz aşağıda yer almaktadır.</p>

      <div className={styles.statsGrid}>
        <StatCard
          title="Gelen Başvurular"
          value={stats.totalForms}
          period={formsPeriod}
          onPeriodChange={setFormsPeriod}
        />
        <StatCard
          title="Gelen Mesajlar"
          value={stats.totalMessages}
          period={messagesPeriod}
          onPeriodChange={setMessagesPeriod}
        />
  
      </div>

      {/* En Sık İstenen İşlem */}
      <div className={styles.dashboardSection}>
        <h2 className={styles.dashboardSectionTitle}>En Sık İstenen İşlemler</h2>
        {stats.topOperations.length === 0 ? (
          <p className={styles.dashboardEmpty}>Henüz veri yok</p>
        ) : (
          <div className={styles.operationsList}>
            {stats.topOperations.map((op, index) => (
              <div key={index} className={styles.operationItem}>
                <div className={styles.operationInfo}>
                  <span className={styles.operationRank}>#{index + 1}</span>
                  <span className={styles.operationName}>{op.name}</span>
                </div>
                <div className={styles.operationBar}>
                  <div
                    className={styles.operationBarFill}
                    style={{
                      width: `${(op.count / operationMaxCount) * 100}%`
                    }}
                  />
                </div>
                <span className={styles.operationCount}>{op.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
  

      {/* Ziyaret Trendi (Çizgi Grafik) */}
      <div className={styles.dashboardSection}>
        <h2 className={styles.dashboardSectionTitle}>Site Ziyaret Sıklığı</h2>
        <div className={styles.lineChartWrapper} style={{ position: 'relative' }}>
          <svg
            width="100%"
            height="200"
            viewBox="0 0 1200 200"
            style={{ overflow: 'visible' }}
            onMouseLeave={() => setTooltip(null)}
          >
            {stats.visitChartData.map((d, i) => {
              if (i === 0) return null
              const prev = stats.visitChartData[i - 1]
              const x1 = ((i - 1) / (stats.visitChartData.length - 1)) * 1200
              const y1 = 180 - (prev.visits / Math.max(...stats.visitChartData.map(v => v.visits), 1)) * 150
              const x2 = (i / (stats.visitChartData.length - 1)) * 1200
              const y2 = 180 - (d.visits / Math.max(...stats.visitChartData.map(v => v.visits), 1)) * 150
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#307BC4"
                  strokeWidth="3"
                />
              )
            })}

            {stats.visitChartData.map((d, i) => {
              const x = (i / (stats.visitChartData.length - 1)) * 1200
              const y = 180 - (d.visits / Math.max(...stats.visitChartData.map(v => v.visits), 1)) * 150
              return (
                <g key={`dot-visit-${i}`}
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
                    fill="#307BC4"
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
                border: '1px solid #307BC4',
                color: '#307BC4',
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
            {stats.visitChartData.map((d, i) => (
              <span key={i}>{d.month}</span>
            ))}
          </div>
        </div>
      </div>
         
    </div>
  )
}

export default Dashboard