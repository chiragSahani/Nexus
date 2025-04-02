// Weather Types
export interface WeatherData {
  name: string
  temperature: number
  condition: string
  humidity: number
  windSpeed?: number
  icon?: string
}

export interface WeatherDetailsData {
  current: {
    temperature: number
    feelsLike: number
    humidity: number
    windSpeed: number
    condition: string
    icon: string
  }
  hourly: {
    time: string
    temperature: number
    condition: string
    icon: string
  }[]
  historical: {
    date: string
    temperature: number
  }[]
  forecast: {
    date: string
    condition: string
    icon: string
    temperature: {
      min: number
      max: number
    }
    humidity: number
    windSpeed: number
  }[]
}

// Crypto Types
export interface CryptoData {
  id: string
  name: string
  symbol: string
  price: number
  priceChange24h: number
  marketCap: number
  volume24h?: number
  image?: string
}

export interface CryptoDetailsData {
  id: string
  name: string
  symbol: string
  price: number
  priceChange24h: number
  marketCap: number
  volume24h: number
  circulatingSupply: number
  allTimeHigh: number
  low24h: number
  high24h: number
  image?: string
  priceHistory: {
    date: string
    price: number
  }[]
  metrics: {
    name: string
    value: string | number
    change?: number
    description: string
  }[]
}

// News Types
export interface NewsData {
  id: string
  title: string
  url: string
  source: string
  publishedAt: string
  description?: string
  imageUrl?: string
}

// WebSocket Types
export interface WebSocketMessage {
  type: "price_alert" | "weather_alert"
  data: {
    title: string
    description: string
  }
}

// Notification Types
export interface Notification {
  id: string
  type: "price_alert" | "weather_alert"
  timestamp: number
  read: boolean
  data: {
    title: string
    description: string
  }
}

// User Types
export interface User {
  id: string
  name: string
  email: string
  image?: string
}

