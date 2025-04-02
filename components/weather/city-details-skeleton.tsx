import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface CityDetailsSkeletonProps {
  cityName: string
}

export function CityDetailsSkeleton({ cityName }: CityDetailsSkeletonProps) {
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

      <Card>
        <CardHeader>
          <CardTitle>Current Conditions</CardTitle>
          <CardDescription>Live weather data for {cityName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historical Data</CardTitle>
          <CardDescription>Temperature trends for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-80" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Forecast</CardTitle>
          <CardDescription>7-day weather forecast for {cityName}</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64" />
        </CardContent>
      </Card>
    </div>
  )
}

