"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherCard } from "@/components/weather/weather-card"
import { fetchWeatherData } from "@/lib/redux/slices/weatherSlice"
import { toggleFavoriteCity } from "@/lib/redux/slices/userPreferencesSlice"
import type { RootState, AppDispatch } from "@/lib/redux/store"

export function WeatherPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.weather)
  const { favoriteCities } = useSelector((state: RootState) => state.userPreferences)

  useEffect(() => {
    dispatch(fetchWeatherData())
  }, [dispatch])

  const handleToggleFavorite = (cityName: string) => {
    dispatch(toggleFavoriteCity(cityName))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Global Weather</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {["New York", "London", "Tokyo"].map((city) => (
            <div key={city} className="h-48 animate-pulse rounded-md bg-muted"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Global Weather</h1>
        <Card>
          <CardContent className="pt-6">
            <div className="rounded-md bg-destructive/10 p-4 text-destructive">
              <p>Failed to load weather data. Please try again later.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Global Weather</h1>
      <p className="text-muted-foreground">Current weather conditions in major cities around the world</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((city, index) => (
          <motion.div
            key={city.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                <CardTitle>{city.name}</CardTitle>
                <CardDescription>Current weather conditions</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <WeatherCard
                  city={city}
                  isFavorite={favoriteCities.includes(city.name)}
                  onToggleFavorite={() => handleToggleFavorite(city.name)}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

