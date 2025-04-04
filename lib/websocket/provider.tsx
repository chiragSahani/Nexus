"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { updateCryptoPrice } from "@/lib/redux/slices/cryptoSlice"
import { addNotification } from "@/lib/redux/slices/notificationsSlice"
import type { WebSocketMessage } from "@/lib/types"
import type { AppDispatch } from "@/lib/redux/store"

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    console.log("Starting enhanced WebSocket connection")

    // More frequent updates for real-time feeling
    const priceUpdateInterval = setInterval(() => {
      // Get random crypto to update
      const cryptos = ["bitcoin", "ethereum", "solana"]
      const cryptoId = cryptos[Math.floor(Math.random() * cryptos.length)]
      const cryptoName = cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1)

      // More realistic price movements (smaller, more frequent)
      const priceChange = (Math.random() * 1 - 0.5) * 0.8 // Between -0.4% and 0.4%
      const isPositive = priceChange > 0

      // Update the price in Redux store
      const basePrice = cryptoId === "bitcoin" ? 50432.75 : cryptoId === "ethereum" ? 2950.42 : 142.87
      const newPrice = basePrice * (1 + priceChange / 100)

      dispatch(
        updateCryptoPrice({
          id: cryptoId,
          price: newPrice,
          priceChange24h:
            cryptoId === "ethereum"
              ? -1.2 + priceChange
              : cryptoId === "bitcoin"
                ? 2.5 + priceChange
                : 5.8 + priceChange,
        }),
      )

      // Show notifications for larger moves (>0.3%)
      if (Math.abs(priceChange) > 0.3) {
        const message: WebSocketMessage = {
          type: "price_alert",
          data: {
            title: `${cryptoName} Price Movement`,
            description: `${cryptoName} has ${isPositive ? "increased" : "decreased"} by ${Math.abs(priceChange).toFixed(2)}% in real-time`,
          },
        }
        dispatch(addNotification(message))
      }
    }, 8000) // Every 8 seconds for price updates

    // Weather updates are less frequent
    const weatherUpdateInterval = setInterval(() => {
      const cities = ["New York", "London", "Tokyo"]
      const conditions = ["Heavy Rain", "Thunderstorm", "Heat Wave", "Strong Winds", "Clear Skies", "Foggy Conditions"]
      const city = cities[Math.floor(Math.random() * cities.length)]
      const condition = conditions[Math.floor(Math.random() * conditions.length)]

      // Only occasionally update weather (15% chance)
      if (Math.random() < 0.15) {
        const message: WebSocketMessage = {
          type: "weather_alert",
          data: {
            title: `Weather Update for ${city}`,
            description: `${condition} expected in ${city} in the next few hours`,
          },
        }
        dispatch(addNotification(message))
      }
    }, 45000) // Every 45 seconds

    // News updates interval
    const newsUpdateInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        // 20% chance of news update
        const newHeadline = getRandomNewsHeadline()
        dispatch({
          type: "news/addNewsItem",
          payload: {
            id: `news-${Date.now()}`,
            title: newHeadline.title,
            url: "#",
            source: newHeadline.source,
            publishedAt: new Date().toISOString(),
            description: newHeadline.description,
            imageUrl: newHeadline.imageUrl || undefined,
          },
        })
      }
    }, 60000) // Every minute

    // Cleanup function
    return () => {
      clearInterval(priceUpdateInterval)
      clearInterval(weatherUpdateInterval)
      clearInterval(newsUpdateInterval)
    }
  }, [dispatch])

  // Helper function to generate random news headlines
  function getRandomNewsHeadline() {
    const headlines = [
      {
        title: "New Crypto Regulation Framework Announced",
        source: "CryptoNews",
        description: "Regulators have unveiled a comprehensive framework for cryptocurrency oversight.",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&auto=format&fit=crop",
      },
      {
        title: "Bitcoin Mining Difficulty Reaches All-Time High",
        source: "BlockchainToday",
        description: "The difficulty of mining Bitcoin has increased to unprecedented levels.",
        imageUrl: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&auto=format&fit=crop",
      },
      {
        title: "DeFi Protocol Launches Innovative Staking Solution",
        source: "DeFiPulse",
        description: "A leading DeFi protocol has launched a new staking mechanism with improved yields.",
        imageUrl: "https://images.unsplash.com/photo-1639322537157-37d4128ef7c9?w=800&auto=format&fit=crop",
      },
      {
        title: "Major Bank Partners with Crypto Exchange",
        source: "FinanceDaily",
        description:
          "A major financial institution has announced a partnership with a leading cryptocurrency exchange.",
        imageUrl: "https://images.unsplash.com/photo-1638913662584-731da41f5a59?w=800&auto=format&fit=crop",
      },
      {
        title: "NFT Market Sees Surge in New Collections",
        source: "NFTWorld",
        description: "The NFT marketplace has experienced a significant increase in new collection launches.",
        imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&auto=format&fit=crop",
      },
    ]

    return headlines[Math.floor(Math.random() * headlines.length)]
  }

  return <>{children}</>
}

