import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CryptoPageSkeleton() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cryptocurrency</h1>
      <p className="text-muted-foreground">Live cryptocurrency prices and market data</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {["Bitcoin", "Ethereum", "Solana"].map((crypto) => (
          <Card key={crypto} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <CardTitle>{crypto}</CardTitle>
              <CardDescription>Live market data</CardDescription>
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

