/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'
import styles from '@/src/styles/admin.module.css'
import { ChartDataItem, DashboardStats, FilterPeriod } from '@/src/types/medical'



const filterPeriods: FilterPeriod[] = [
  { label: 'Günlük', value: 'daily' },
  { label: 'Aylık', value: 'monthly' },
  { label: 'Yıllık', value: 'yearly' }
]

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalForms: 0,
    totalMessages: 0,
    topOperations: [],
    chartData: []
  })
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

      // Grafik verilerini hazırla
      const chartData = generateChartData(formsSnapshot.docs, messagesSnapshot.docs)

      setStats({
        totalForms: formsSnapshot.docs.length,
        totalMessages: messagesSnapshot.docs.length,
        topOperations,
        chartData
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

      {/* Grafik */}
      <div className={styles.dashboardSection}>
        <h2 className={styles.dashboardSectionTitle}>Başvuru ve Mesaj Trendi</h2>
        <div className={styles.chartContainer}>
          {stats.chartData.map((data, index) => (
            <div key={index} className={styles.chartBar}>
              <div className={styles.barGroup}>
                <div
                  className={styles.bar}
                  style={{
                    height: `${(data.forms / maxValue) * 150}px`,
                    backgroundColor: '#307BC4'
                  }}
                  title={`${data.forms} başvuru`}
                />
                <div
                  className={styles.bar}
                  style={{
                    height: `${(data.messages / maxValue) * 150}px`,
                    backgroundColor: '#d7b76e'
                  }}
                  title={`${data.messages} mesaj`}
                />
              </div>
              <p className={styles.chartLabel}>{data.month}</p>
            </div>
          ))}
        </div>
        <div className={styles.chartLegend}>
          <span style={{ color: '#307BC4' }}>■ Başvurular</span>
          <span style={{ color: '#d7b76e' }}>■ Mesajlar</span>
        </div>
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
    </div>
  )
}

export default Dashboard