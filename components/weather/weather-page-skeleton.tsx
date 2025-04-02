import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function WeatherPageSkeleton() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Global Weather</h1>
      <p className="text-muted-foreground">Current weather conditions in major cities around the world</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {["New York", "London", "Tokyo"].map((city) => (
          <Card key={city} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
              <CardTitle>{city}</CardTitle>
              <CardDescription>Current weather conditions</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-10 w-28" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

