import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CityDetails } from "@/components/weather/city-details"
import { CityDetailsSkeleton } from "@/components/weather/city-details-skeleton"

interface CityPageProps {
  params: {
    city: string
  }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const cityName = params.city
    .toLowerCase()
    .replace(/newyork/, "New York")
    .split("")
    .map((char, idx) => (idx === 0 ? char.toUpperCase() : char))
    .join("")

  return {
    title: `${cityName} Weather | CryptoWeather Nexus`,
    description: `Detailed weather information for ${cityName}`,
  }
}

export default function CityPage({ params }: CityPageProps) {
  const validCities = ["newyork", "london", "tokyo"]
  const citySlug = params.city.toLowerCase()

  if (!validCities.includes(citySlug)) {
    notFound()
  }

  const cityName = citySlug === "newyork" ? "New York" : citySlug.charAt(0).toUpperCase() + citySlug.slice(1)

  return (
    <main className="container mx-auto p-4 md:p-6">
      <Suspense fallback={<CityDetailsSkeleton cityName={cityName} />}>
        <CityDetails cityName={cityName} />
      </Suspense>
    </main>
  )
}

