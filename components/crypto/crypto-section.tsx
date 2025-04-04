"use client"

import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CryptoCard } from "@/components/crypto/crypto-card"
import { toggleFavoriteCrypto } from "@/lib/redux/slices/userPreferencesSlice"
import type { RootState, AppDispatch } from "@/lib/redux/store"

interface CryptoSectionProps {
  searchTerm?: string
  expanded?: boolean
}

export function CryptoSection({
  searchTerm = "",
  expanded = false,
}: CryptoSectionProps) {
  const { data, loading, error } = useSelector((state: RootState) => state.crypto)
  const { favoriteCryptos } = useSelector(
    (state: RootState) => state.userPreferences
  )
  const dispatch = useDispatch<AppDispatch>()

  const filteredData = searchTerm
    ? data.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data

  const handleToggleFavorite = (cryptoId: string) => {
    dispatch(toggleFavoriteCrypto(cryptoId))
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency</CardTitle>
          <CardDescription>Live prices and market data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-md bg-muted"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency</CardTitle>
          <CardDescription>Live prices and market data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-destructive/10 p-4 text-destructive">
            <p>Failed to load cryptocurrency data. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <CardTitle>Cryptocurrency</CardTitle>
        <CardDescription>Live prices and market data</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {filteredData.length === 0 ? (
          <p className="text-center text-muted-foreground">No cryptocurrencies found.</p>
        ) : (
          <div
            className={`${
              expanded
                ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }`}
          >
            {filteredData.map((crypto, index) => (
              <motion.div
                key={crypto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CryptoCard
                  crypto={crypto}
                  isFavorite={favoriteCryptos.includes(crypto.id)}
                  onToggleFavorite={() => handleToggleFavorite(crypto.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
