"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { ArrowDown, ArrowLeft, ArrowUp, DollarSign, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CryptoChart } from "@/components/crypto/crypto-chart"
import { CryptoMetrics } from "@/components/crypto/crypto-metrics"
import { fetchCryptoDetails } from "@/lib/redux/slices/cryptoDetailsSlice"
import { toggleFavoriteCrypto } from "@/lib/redux/slices/userPreferencesSlice"
import { formatNumber } from "@/lib/utils"
import type { RootState, AppDispatch } from "@/lib/redux/store"

interface CryptoDetailsProps {
  cryptoId: string
}

export function CryptoDetails({ cryptoId }: CryptoDetailsProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.cryptoDetails)
  const { favoriteCryptos } = useSelector((state: RootState) => state.userPreferences)

  const isFavorite = favoriteCryptos.includes(cryptoId)

  useEffect(() => {
    dispatch(fetchCryptoDetails(cryptoId))
  }, [dispatch, cryptoId])

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCrypto(cryptoId))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold capitalize">{cryptoId}</h1>
          </div>
          <Button variant="ghost" size="icon" disabled>
            <Star className="h-4 w-4" />
          </Button>
        </div>
        <div className="h-64 animate-pulse rounded-md bg-muted"></div>
        <div className="h-96 animate-pulse rounded-md bg-muted"></div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold capitalize">{cryptoId}</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="rounded-md bg-destructive/10 p-4 text-destructive">
              <p>Failed to load cryptocurrency details. Please try again later.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isPositiveChange = data.priceChange24h >= 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            {data.image && (
              <img src={data.image || "/placeholder.svg"} alt={data.name} className="h-8 w-8 rounded-full" />
            )}
            <h1 className="text-2xl font-bold">
              {data.name} ({data.symbol.toUpperCase()})
            </h1>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleFavorite}
          className={isFavorite ? "text-yellow-500" : ""}
        >
          <Star className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
          <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Price</CardTitle>
          <CardDescription>Live market data for {data.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-medium">{data.name}</h3>
                </div>
                <p className="text-4xl font-bold">${data.price.toFixed(2)}</p>
                <div className={`flex items-center gap-2 ${isPositiveChange ? "text-green-500" : "text-red-500"}`}>
                  {isPositiveChange ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  <span>{Math.abs(data.priceChange24h).toFixed(2)}% (24h)</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Market Cap</span>
                  <span className="text-sm font-medium">${formatNumber(data.marketCap)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Volume (24h)</span>
                  <span className="text-sm font-medium">${formatNumber(data.volume24h)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Circulating Supply</span>
                  <span className="text-sm font-medium">
                    {formatNumber(data.circulatingSupply)} {data.symbol.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">All-Time High</span>
                  <span className="text-sm font-medium">${data.allTimeHigh.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Price Range (24h)</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Low</span>
                  <span className="text-sm text-muted-foreground">High</span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-muted">
                  <div
                    className="absolute h-2 rounded-full bg-primary"
                    style={{
                      width: `${((data.price - data.low24h) / (data.high24h - data.low24h)) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">${data.low24h.toFixed(2)}</span>
                  <span className="font-medium">${data.high24h.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
          <CardDescription>Historical price data for {data.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <CryptoChart data={data.priceHistory} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
          <CardDescription>Important metrics and indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <CryptoMetrics metrics={data.metrics} />
        </CardContent>
      </Card>
    </div>
  )
}

