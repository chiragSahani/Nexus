"use client"

import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherCard } from "@/components/weather/weather-card"
import { toggleFavoriteCity } from "@/lib/redux/slices/userPreferencesSlice"
import type { RootState, AppDispatch } from "@/lib/redux/store"

interface WeatherSectionProps {
  searchTerm?: string
  expanded?: boolean
}

export function WeatherSection({ searchTerm = "", expanded = false }: WeatherSectionProps) {
  const { data, loading, error } = useSelector((state: RootState) => state.weather)
  const { favoriteCities } = useSelector((state: RootState) => state.userPreferences)
  const dispatch = useDispatch<AppDispatch>()

  // Filter data based on search term
  const filteredData = searchTerm
    ? data.filter(
        (city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.condition.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : data

  const handleToggleFavorite = (cityName: string) => {
    dispatch(toggleFavoriteCity(cityName))
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather</CardTitle>
          <CardDescription>Current conditions in major cities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["New York", "London", "Tokyo"].map((city) => (
              <div key={city} className="h-24 animate-pulse rounded-md bg-muted"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather</CardTitle>
          <CardDescription>Current conditions in major cities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-destructive/10 p-4 text-destructive">
            <p>Failed to load weather data. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
        <CardTitle>Weather</CardTitle>
        <CardDescription>Current conditions in major cities</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className={`space-y-4 ${expanded ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : ""}`}>
          {filteredData.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <WeatherCard
                city={city}
                isFavorite={favoriteCities.includes(city.name)}
                onToggleFavorite={() => handleToggleFavorite(city.name)}
              />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

