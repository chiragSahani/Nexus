import React from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind } from "lucide-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B"
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M"
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K"
  }
  return num.toString()
}

export function getWeatherIcon(condition: string, className = "h-5 w-5") {
  const conditionLower = condition.toLowerCase()

  if (conditionLower.includes("clear") || conditionLower.includes("sunny")) {
    return <Sun className={`${className} text-yellow-500`} />
  } else if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
    return <CloudRain className={`${className} text-blue-500`} />
  } else if (conditionLower.includes("snow")) {
    return <CloudSnow className={`${className} text-blue-200`} />
  } else if (conditionLower.includes("thunder") || conditionLower.includes("lightning")) {
    return <CloudLightning className={`${className} text-yellow-400`} />
  } else if (conditionLower.includes("fog") || conditionLower.includes("mist")) {
    return <CloudFog className={`${className} text-gray-400`} />
  } else if (conditionLower.includes("wind")) {
    return <Wind className={`${className} text-gray-500`} />
  } else {
    return <Cloud className={`${className} text-gray-400`} />
  }
}

export function getWeatherIconFromCode(iconCode: string, className = "h-5 w-5") {
  // OpenWeatherMap icon codes
  if (iconCode.startsWith("01")) {
    return <Sun className={`${className} text-yellow-500`} />
  } else if (iconCode.startsWith("02") || iconCode.startsWith("03") || iconCode.startsWith("04")) {
    return <Cloud className={`${className} text-gray-400`} />
  } else if (iconCode.startsWith("09") || iconCode.startsWith("10")) {
    return <CloudRain className={`${className} text-blue-500`} />
  } else if (iconCode.startsWith("11")) {
    return <CloudLightning className={`${className} text-yellow-400`} />
  } else if (iconCode.startsWith("13")) {
    return <CloudSnow className={`${className} text-blue-200`} />
  } else if (iconCode.startsWith("50")) {
    return <CloudFog className={`${className} text-gray-400`} />
  } else {
    return <Cloud className={`${className} text-gray-400`} />
  }
}

