/* eslint-disable @typescript-eslint/no-explicit-any */
// Medical Form Types
export interface MedicalFormData {
  personal: {
    fullName: string
    birthDate: string
    gender: string
    nationality: string
    phone: string
    email: string
  }
  medical: {
    chronicDisease: string
    chronicDiseaseDetail: string
    heartDisease: string
    diabetes: string
    hypertension: string
    cancer: string
    medication: string
    allergy: string
    surgery: string
    anesthesia: string
    pregnancy: string
    breastfeeding: string
  }
  habits: {
    smoking: string
    alcohol: string
    drugs: string
  }
  travel: {
    travelTime: string
    travelDate: string
    personCount: string
    ticketStatus: string
    airport: string
    otherAirport: string
    hotelNeed: string
    vipTransfer: string
    vehicleChoice: string
  }
  operation: {
    operation: string
    otherOperation: string
    consultation: string
    firstSurgery: string
  }
  extraInfo: string
  createdAt?: any
}
export interface ContactWithId {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: any
}

export interface Hotel {
  id: string
  name: string
  location: string
  stars: number
  image: string
  imageFile?: File
}

export interface Hospital {
  id: string
  name: string
  location: string
  image: string
  imageFile?: File
}
export interface ChartDataItem {
  month: string
  forms: number
  messages: number
}

export interface DashboardStats {
  totalForms: number
  totalMessages: number
  topOperations: { name: string; count: number }[]
  chartData: ChartDataItem[]
}

export interface FilterPeriod {
  label: string
  value: 'daily' | 'monthly' | 'yearly'
}