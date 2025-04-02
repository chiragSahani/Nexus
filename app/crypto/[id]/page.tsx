import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CryptoDetails } from "@/components/crypto/crypto-details"
import { CryptoDetailsSkeleton } from "@/components/crypto/crypto-details-skeleton"

interface CryptoPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CryptoPageProps): Promise<Metadata> {
  const cryptoId = params.id

  // Capitalize first letter for display
  const cryptoName = cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1)

  return {
    title: `${cryptoName} | CryptoWeather Nexus`,
    description: `Detailed cryptocurrency information for ${cryptoName}`,
  }
}

export default function CryptoPage({ params }: CryptoPageProps) {
  const validCryptos = ["bitcoin", "ethereum", "solana"]
  const cryptoId = params.id.toLowerCase()

  if (!validCryptos.includes(cryptoId)) {
    notFound()
  }

  return (
    <main className="container mx-auto p-4 md:p-6">
      <Suspense fallback={<CryptoDetailsSkeleton cryptoId={cryptoId} />}>
        <CryptoDetails cryptoId={cryptoId} />
      </Suspense>
    </main>
  )
}

