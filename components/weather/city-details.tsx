"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { ArrowLeft, Cloud, Droplets, MapPin, Star, Thermometer, Wind } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WeatherChart } from "@/components/weather/weather-chart"
import { WeatherTable } from "@/components/weather/weather-table"
import { fetchCityWeatherDetails } from "@/lib/redux/slices/weatherDetailsSlice"
import { toggleFavoriteCity } from "@/lib/redux/slices/userPreferencesSlice"
import { getWeatherIconFromCode } from "@/lib/utils"
import type { RootState, AppDispatch } from "@/lib/redux/store"

interface CityDetailsProps {
  cityName: string
}

export function CityDetails({ cityName }: CityDetailsProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.weatherDetails)
  const { favoriteCities } = useSelector((state: RootState) => state.userPreferences)

  const isFavorite = favoriteCities.includes(cityName)

  useEffect(() => {
    dispatch(fetchCityWeatherDetails(cityName))
  }, [dispatch, cityName])

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCity(cityName))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{cityName} Weather</h1>
          </div>
          <Button variant="ghost" size="icon" disabled>
            <Star className="h-4 w-4" />
          </Button>
        </div>
        <div className="h-64 animate-pulse rounded-md bg-muted"></div>
        <div className="h-96 animate-pulse rounded-md bg-muted"></div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{cityName} Weather</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="rounded-md bg-destructive/10 p-4 text-destructive">
              <p>Failed to load weather details. Please try again later.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{cityName} Weather</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleFavorite}
          className={isFavorite ? "text-yellow-500" : ""}
        >
          <Star className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
          <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Conditions</CardTitle>
          <CardDescription>Live weather data for {cityName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-medium">{cityName}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-4xl font-bold">{Math.round(data.current.temperature)}°C</p>
                  {data.current.icon && getWeatherIconFromCode(data.current.icon, "h-8 w-8")}
                </div>
                <p className="text-muted-foreground">{data.current.condition}</p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <Thermometer className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{Math.round(data.current.feelsLike)}°C</span>
                  <span className="text-xs text-muted-foreground">Feels Like</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">{data.current.humidity}%</span>
                  <span className="text-xs text-muted-foreground">Humidity</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Wind className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{data.current.windSpeed} km/h</span>
                  <span className="text-xs text-muted-foreground">Wind</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Today's Forecast</h3>
              <div className="grid grid-cols-4 gap-2">
                {data.hourly.slice(0, 8).map((hour, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-sm">{hour.time}</span>
                    {hour.icon ? (
                      getWeatherIconFromCode(hour.icon, "my-2 h-5 w-5")
                    ) : (
                      <Cloud className="my-2 h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">{Math.round(hour.temperature)}°C</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historical Data</CardTitle>
          <CardDescription>Temperature trends for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <WeatherChart data={data.historical} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Forecast</CardTitle>
          <CardDescription>7-day weather forecast for {cityName}</CardDescription>
        </CardHeader>
        <CardContent>
          <WeatherTable forecast={data.forecast} />
        </CardContent>
      </Card>
    </div>
  )
}

