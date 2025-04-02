"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CryptoCard } from "@/components/crypto/crypto-card"
import { fetchCryptoData } from "@/lib/redux/slices/cryptoSlice"
import { toggleFavoriteCrypto } from "@/lib/redux/slices/userPreferencesSlice"
import type { RootState, AppDispatch } from "@/lib/redux/store"

export function CryptoPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.crypto)
  const { favoriteCryptos } = useSelector((state: RootState) => state.userPreferences)

  useEffect(() => {
    dispatch(fetchCryptoData())
  }, [dispatch])

  const handleToggleFavorite = (cryptoId: string) => {
    dispatch(toggleFavoriteCrypto(cryptoId))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Cryptocurrency</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {["bitcoin", "ethereum", "solana"].map((crypto) => (
            <div key={crypto} className="h-48 animate-pulse rounded-md bg-muted"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Cryptocurrency</h1>
        <Card>
          <CardContent className="pt-6">
            <div className="rounded-md bg-destructive/10 p-4 text-destructive">
              <p>Failed to load cryptocurrency data. Please try again later.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cryptocurrency</h1>
      <p className="text-muted-foreground">Live cryptocurrency prices and market data</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((crypto, index) => (
          <motion.div
            key={crypto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <CardTitle>{crypto.name}</CardTitle>
                <CardDescription>Live market data</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <CryptoCard
                  crypto={crypto}
                  isFavorite={favoriteCryptos.includes(crypto.id)}
                  onToggleFavorite={() => handleToggleFavorite(crypto.id)}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

