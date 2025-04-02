import { Suspense } from "react"
import type { Metadata } from "next"
import { NewsPage } from "@/components/news/news-page"
import { NewsPageSkeleton } from "@/components/news/news-page-skeleton"

export const metadata: Metadata = {
  title: "Crypto News | CryptoWeather Nexus",
  description: "Latest cryptocurrency news and updates",
}

export default function NewsPageRoute() {
  return (
    <main className="container mx-auto p-4 md:p-6">
      <Suspense fallback={<NewsPageSkeleton />}>
        <NewsPage />
      </Suspense>
    </main>
  )
}

