/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import styles from '@/src/styles/admin.module.css'

interface DashboardStats {
  totalEnquiries: number
  chartData: Array<{
    month: string
    enquiries: number
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
    totalEnquiries: 0,
    chartData: [],
    topDestinations: []
  })
  const [enquiriesPeriod, setEnquiriesPeriod] = useState<'daily' | 'monthly' | 'yearly'>('monthly')
  const [loading, setLoading] = useState(true)

  // Fonksiyonlar

  const generateChartData = (enquiriesDocs: any[]) => {
    const monthsMap: { [key: string]: { enquiries: number } } = {}
    const today = new Date()

    // Son 6 ay için ay anahtarları oluştur
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`
      monthsMap[monthKey] = { enquiries: 0 }
    }

    // Sorguları say
    enquiriesDocs.forEach((doc) => {
      const createdAt = doc.data().createdAt
      if (createdAt && typeof createdAt.toDate === 'function') {
        const docDate = createdAt.toDate()
        const monthKey = `${docDate.getFullYear()}-${docDate.getMonth()}`
        if (monthKey in monthsMap) {
          monthsMap[monthKey].enquiries++
        }
      }
    })

    // Sonuç dizisini oluştur
    const result = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`
      const monthStr = date.toLocaleDateString('tr-TR', { month: 'short', year: '2-digit' })
      
      result.push({
        month: monthStr,
        enquiries: monthsMap[monthKey].enquiries
      })
    }

    return result
  }

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)

      // Sorguları çek ve destinasyon bilgisini al
      let totalEnquiries = 0
      const destinationMap: { [key: string]: number } = {}
      const toursSnapshot = await getDocs(collection(db, 'traveltours'))
      
      for (const tourDoc of toursSnapshot.docs) {
        const tourData = tourDoc.data()
        const tourLocation = tourData.location || 'Belirtilmemiş'
        const enquiriesSubcoll = await getDocs(collection(db, `traveltours/${tourDoc.id}/enquiries`))
        
        totalEnquiries += enquiriesSubcoll.size
        
        // Her enquiry için turun destinasyonunu say
        enquiriesSubcoll.docs.forEach(() => {
          destinationMap[tourLocation] = (destinationMap[tourLocation] || 0) + 1
        })
      }

      const topDestinations = Object.entries(destinationMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      // Grafik verilerini hazırla
      const chartData = generateChartData(toursSnapshot.docs)

      setStats({
        totalEnquiries,
        topDestinations,
        chartData
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

  return (
    <div className={styles.dashboardWrapper}>
      <p className={styles.dashboardSubtitle}>Hoş geldiniz! İstatistikleriniz aşağıda yer almaktadır.</p>

      <div className={styles.statsGrid}>
        <StatCard
          title="Gelen İletişim Form Sayısı"
          value={stats.totalEnquiries}
          period={enquiriesPeriod}
          onPeriodChange={setEnquiriesPeriod}
          color="#E8604C"
        />
        <StatCard
          title="Gelen Başvuru Form Sayısı"
          value={stats.totalEnquiries}
          period={enquiriesPeriod}
          onPeriodChange={setEnquiriesPeriod}
                    color="#E8604C"

        />
      </div>

      {/* Grafik */}
      <div className={styles.dashboardSection}>
        <h2 className={styles.dashboardSectionTitle}>Başvuru ve Form Trendi</h2>
        <div className={styles.chartContainer}>
          {stats.chartData.map((data, index) => {
            const maxEnquiries = Math.max(...stats.chartData.map((d) => d.enquiries), 1)
            return (
              <div key={index} className={styles.chartBar}>
                <div className={styles.barGroup}>
                  <div
                    className={styles.bar}
                    style={{
                      height: `${(data.enquiries / maxEnquiries) * 150}px`,
                      backgroundColor: '#307BC4',
                      marginRight: '4px'
                    }}
                    title={`${data.enquiries} iletişim form`}
                  />
                  <div
                    className={styles.bar}
                    style={{
                      height: `${(data.enquiries / maxEnquiries) * 150}px`,
                      backgroundColor: '#E8604C'
                    }}
                    title={`${data.enquiries} başvuru form`}
                  />
                </div>
                <p className={styles.chartLabel}>{data.month}</p>
              </div>
            )
          })}
        </div>
        <div className={styles.chartLegend}>
          <span style={{ color: '#307BC4' }}>■ İletişim Formları</span>
          <span style={{ color: '#E8604C', marginLeft: '15px' }}>■ Başvuru Formları</span>
        </div>
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
                  <span className={styles.operationRank} style={{color: '#E8604C'}}>#{index + 1}</span>
                  <span className={styles.operationName}>{dest.name}</span>
                </div>
                <div className={styles.operationBar}>
                  <div
                    className={styles.operationBarFill}
                    style={{
                      width: `${(dest.count / destinationMaxCount) * 100}%`,
                       background: 'linear-gradient(90deg, #E8604C, #FF7A5A)'
                    }}
                  />
                </div>
                <span className={styles.operationCount} style={{color: '#E8604C'}}>{dest.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
