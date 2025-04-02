import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { WeatherData } from "@/lib/types"

// Cities coordinates
const cities = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
]

// Real API call to OpenWeatherMap
export const fetchWeatherData = createAsyncThunk("weather/fetchWeatherData", async () => {
  try {
    const apiKey = "2bb46bc5bbba314d7374d8aadb58d537"

    const weatherPromises = cities.map(async (city) => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data for ${city.name}`)
      }

      const data = await response.json()

      return {
        name: city.name,
        temperature: data.main.temp,
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      } as WeatherData
    })

    return await Promise.all(weatherPromises)
  } catch (error) {
    console.error("Error fetching weather data:", error)

    // Fallback data in case of API failure
    return [
      {
        name: "New York",
        temperature: 18,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 12,
      },
      {
        name: "London",
        temperature: 14,
        condition: "Rainy",
        humidity: 80,
        windSpeed: 8,
      },
      {
        name: "Tokyo",
        temperature: 22,
        condition: "Sunny",
        humidity: 55,
        windSpeed: 5,
      },
    ] as WeatherData[]
  }
})

interface WeatherState {
  data: WeatherData[]
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: null,
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch weather data"
      })
  },
})

export default weatherSlice.reducer

