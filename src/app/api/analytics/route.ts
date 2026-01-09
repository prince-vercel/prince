/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'

/**
 * Google Analytics Data API ile entegrasyon
 * 
 * KURULUM ADIMLARI:
 * 1. npm install @google-analytics/data
 * 2. Google Cloud Console'da service account oluştur
 * 3. GA4 property'ye service account ekle (Viewer)
 * 4. .env.local dosyasına ekle:
 *    - GOOGLE_ANALYTICS_PROPERTY_ID=YOUR_GA4_PROPERTY_ID
 *    - GOOGLE_ANALYTICS_CREDENTIALS (service account JSON)
 */

export async function GET(request: NextRequest) {
  try {
    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID

    // Property ID yoksa fallback data döndür
    if (!propertyId) {
      console.warn('Google Analytics Property ID not configured')
      return NextResponse.json(getFallbackData())
    }

    // Google Analytics Data paketini kontrol et
    let BetaAnalyticsDataClient: any
    try {
      const analyticsModule = await import('@google-analytics/data')
      BetaAnalyticsDataClient = analyticsModule.BetaAnalyticsDataClient
    } catch (importError) {
      console.warn('@google-analytics/data module not installed:', importError)
      return NextResponse.json(getFallbackData())
    }

    // Credentials kontrol et
    if (!process.env.GOOGLE_ANALYTICS_CREDENTIALS) {
      console.warn('Google Analytics Credentials not configured')
      return NextResponse.json(getFallbackData())
    }

    let credentials: any
    try {
      credentials = JSON.parse(process.env.GOOGLE_ANALYTICS_CREDENTIALS)
    } catch (parseError) {
      console.error('Failed to parse Google Analytics Credentials:', parseError)
      return NextResponse.json(getFallbackData())
    }

    // Google Analytics Client'ı başlat
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials
    })

    // Ana istatistikler
    const results = await Promise.allSettled([
      // Sayfa görüntüleme, ziyaretçi, bounce rate, oturum süresi
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today'
          }
        ],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'activeUsers' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' }
        ]
      }),

      // En çok ziyaret edilen sayfalar
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today'
          }
        ],
        metrics: [
          { name: 'screenPageViews' }
        ],
        dimensions: [
          { name: 'pagePath' }
        ],
        orderBys: [
          {
            metric: { name: 'screenPageViews' },
            desc: true
          }
        ],
        limit: 5
      }),

      // Cihaz türü dağılımı
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today'
          }
        ],
        metrics: [
          { name: 'activeUsers' }
        ],
        dimensions: [
          { name: 'deviceCategory' }
        ]
      })
    ])

    // Hata kontrol et
    const mainReport = results[0]?.status === 'fulfilled' ? results[0].value : null
    const pagesReport = results[1]?.status === 'fulfilled' ? results[1].value : null
    const devicesReport = results[2]?.status === 'fulfilled' ? results[2].value : null

    if (!mainReport || !pagesReport || !devicesReport) {
      console.error('Some analytics reports failed:', results)
      return NextResponse.json(getFallbackData())
    }

    // Ana metrikleri çıkar
    const mainRow = mainReport.rows?.[0]
    const pageViews = mainRow?.metricValues?.[0]?.value || '0'
    const uniqueVisitors = mainRow?.metricValues?.[1]?.value || '0'
    const bounceRate = mainRow?.metricValues?.[2]?.value || '0'
    const avgSessionDuration = mainRow?.metricValues?.[3]?.value || '0'

    // En çok ziyaret edilen sayfaları çıkar
    const topPages = pagesReport.rows?.slice(0, 5).map((row: any) => ({
      page: row.dimensionValues?.[0]?.value || 'Unknown',
      views: parseInt(row.metricValues?.[0]?.value || '0', 10)
    })) || []

    // Cihaz dağılımını çıkar
    const devices: { [key: string]: number } = {}
    devicesReport.rows?.forEach((row: any) => {
      const deviceName = row.dimensionValues?.[0]?.value || 'Unknown'
      const userCount = parseInt(row.metricValues?.[0]?.value || '0', 10)

      const deviceLabel = deviceName === 'mobile'
        ? 'Mobil'
        : deviceName === 'desktop'
          ? 'Masaüstü'
          : 'Tablet'

      devices[deviceLabel] = userCount
    })

    const analyticsData = {
      pageViews: parseInt(pageViews, 10),
      uniqueVisitors: parseInt(uniqueVisitors, 10),
      bounceRate: Math.round(parseFloat(bounceRate)),
      avgSessionDuration: Math.round(parseFloat(avgSessionDuration)),
      topPages,
      devices,
      sources: {
        'Organik Arama': 0,
        'Doğrudan': 0,
        'Sosyal Medya': 0,
        'Referans': 0
      },
      countries: []
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error('Analytics API Error:', error)
    // Hata durumunda fallback veriler döndür
    return NextResponse.json(getFallbackData())
  }
}

// Fallback: Eğer API bağlantısı başarısız olursa mock veriler
function getFallbackData() {
  return {
    pageViews: 8345,
    uniqueVisitors: 2847,
    bounceRate: 42,
    avgSessionDuration: 187,
    topPages: [
      { page: '/travel', views: 2500 },
      { page: '/travel/about', views: 1800 },
      { page: '/travel/blog', views: 1200 },
      { page: '/medical', views: 950 },
      { page: '/medical/about', views: 895 }
    ],
    devices: {
      'Mobil': 4500,
      'Masaüstü': 3200,
      'Tablet': 1300
    },
    sources: {
      'Organik Arama': 3500,
      'Doğrudan': 2100,
      'Sosyal Medya': 1800,
      'Referans': 945
    },
    countries: [
      { country: 'Türkiye', users: 1850 },
      { country: 'ABD', users: 450 },
      { country: 'Almanya', users: 320 },
      { country: 'Birleşik Krallık', users: 227 }
    ]
  }
}

/**
 * GOOGLE ANALYTICS API ENTEGRASYONU İÇİN YAPILACAKLAR:
 * 
 * 1. npm install @google-analytics/data
 * 
 * 2. Google Cloud Console'da:
 *    - Yeni Service Account oluşturun
 *    - JSON key dosyasını indirin
 *    - .env.local'a ekleyin
 * 
 * 3. GA4 Property Settings'de:
 *    - Service Account email'ini Viewer olarak ekleyin
 * 
 * 4. Kod örneği (gerçek implementasyon):
 * 
 * import { BetaAnalyticsDataClient } from '@google-analytics/data'
 * 
 * const analyticsDataClient = new BetaAnalyticsDataClient({
 *   keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
 * })
 * 
 * const request = {
 *   property: `properties/YOUR_GA4_PROPERTY_ID`,
 *   dateRanges: [
 *     {
 *       startDate: '30daysAgo',
 *       endDate: 'today'
 *     }
 *   ],
 *   metrics: [
 *     { name: 'activeUsers' },
 *     { name: 'screenPageViews' },
 *     { name: 'bounceRate' }
 *   ],
 *   dimensions: [
 *     { name: 'pagePath' }
 *   ]
 * }
 * 
 * const response = await analyticsDataClient.runReport(request)
 */
