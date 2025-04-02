"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CryptoData } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

interface CryptoCardProps {
  crypto: CryptoData
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function CryptoCard({ crypto, isFavorite, onToggleFavorite }: CryptoCardProps) {
  const isPositiveChange = crypto.priceChange24h >= 0

  return (
    <div className="relative overflow-hidden rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            {crypto.image && (
              <img src={crypto.image || "/placeholder.svg"} alt={crypto.name} className="h-6 w-6 rounded-full" />
            )}
            <h3 className="font-medium">
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </h3>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className={`flex items-center gap-1 ${isPositiveChange ? "text-green-500" : "text-red-500"}`}>
              {isPositiveChange ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              <span>{Math.abs(crypto.priceChange24h).toFixed(2)}%</span>
            </div>
            <div className="text-muted-foreground">
              <span>Market Cap: ${formatNumber(crypto.marketCap)}</span>
            </div>
          </div>
        </div>
        <div className="text-2xl font-bold">${crypto.price.toFixed(2)}</div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Link href={`/crypto/${crypto.id}`}>
          <Button variant="outline" size="sm" className="group">
            View Details
            <motion.span className="ml-1" initial={{ x: 0 }} whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
              →
            </motion.span>
          </Button>
        </Link>
        <Button variant="ghost" size="icon" onClick={onToggleFavorite} className={isFavorite ? "text-yellow-500" : ""}>
          <Star className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
          <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </Button>
      </div>

      {/* Background decoration */}
      <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-purple-500/10 blur-xl" />
    </div>
  )
}

