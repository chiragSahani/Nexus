"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Droplets, MapPin, Star, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WeatherData } from "@/lib/types"
import { getWeatherIcon } from "@/lib/utils"

interface WeatherCardProps {
  city: WeatherData
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function WeatherCard({ city, isFavorite, onToggleFavorite }: WeatherCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">{city.name}</h3>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-1">
              {getWeatherIcon(city.condition, "h-4 w-4")}
              <span>{city.condition}</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span>{city.humidity}%</span>
            </div>
            {city.windSpeed && (
              <div className="flex items-center gap-1">
                <Wind className="h-4 w-4 text-muted-foreground" />
                <span>{city.windSpeed} km/h</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-2xl font-bold">{Math.round(city.temperature)}°C</div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Link href={`/weather/${city.name.toLowerCase().replace(/\s+/g, "")}`}>
          <Button variant="outline" size="sm" className="group">
            View Details
            <motion.span className="ml-1" initial={{ x: 0 }} whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
              →
            </motion.span>
          </Button>
        </Link>
        <Button variant="ghost" size="icon" onClick={onToggleFavorite} className={isFavorite ? "text-yellow-500" : ""}>
          <Star className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
          <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </Button>
      </div>

      {/* Background decoration */}
      <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-blue-500/10 blur-xl" />
    </div>
  )
}

