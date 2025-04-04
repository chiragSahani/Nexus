import { Suspense } from "react"
import type { Metadata } from "next"
import { Dashboard } from "@/components/dashboard"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"
import { HeroSection } from "@/components/layout/hero-section"

export const metadata: Metadata = {
  title: "Dashboard | CryptoWeather Nexus",
  description: "View live weather, cryptocurrency data, and news in one place",
}

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <div id="dashboard-section" className="container mx-auto px-4 py-8 md:px-6">
        <Suspense fallback={<DashboardSkeleton />}>
          <Dashboard />
        </Suspense>
      </div>
    </main>
  )
}
