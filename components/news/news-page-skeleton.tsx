import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function NewsPageSkeleton() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Crypto News</h1>
      <p className="text-muted-foreground">Stay updated with the latest cryptocurrency news and developments</p>

      <div className="space-y-6">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

