import { Suspense } from "react"
import type { Metadata } from "next"
import { WeatherPage } from "@/components/weather/weather-page"
import { WeatherPageSkeleton } from "@/components/weather/weather-page-skeleton"

export const metadata: Metadata = {
  title: "Weather | CryptoWeather Nexus",
  description: "Global weather information and forecasts",
}

export default function WeatherPageRoute() {
  return (
    <main className="container mx-auto p-4 md:p-6">
      <Suspense fallback={<WeatherPageSkeleton />}>
        <WeatherPage />
      </Suspense>
    </main>
  )
}

