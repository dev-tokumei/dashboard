import axios from 'axios'

const API_URL = 'http://localhost:3100/tests'

export interface Test {
  id: string
  name: string
  type: string
  site: string
  status: string
  siteId?: any
}

export interface Site {
  id: number
  url: string
}

export const fetchTests = async (): Promise<Test[]> => {
  try {
    const response = await axios.get<Test[]>(API_URL)
    return response.data
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
    return []
  }
}

export const fetchSites = async () => {
  try {
    const response = await fetch('http://localhost:3100/sites')
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
    return []
  }
}
