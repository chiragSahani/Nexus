import { Suspense } from "react"
import type { Metadata } from "next"
import { CryptoPage } from "@/components/crypto/crypto-page"
import { CryptoPageSkeleton } from "@/components/crypto/crypto-page-skeleton"

export const metadata: Metadata = {
  title: "Cryptocurrency | CryptoWeather Nexus",
  description: "Live cryptocurrency prices and market data",
}

export default function CryptoPageRoute() {
  return (
    <main className="container mx-auto p-4 md:p-6">
      <Suspense fallback={<CryptoPageSkeleton />}>
        <CryptoPage />
      </Suspense>
    </main>
  )
}

