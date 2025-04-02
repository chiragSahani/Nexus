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
    // Start simulated WebSocket
    console.log("Starting simulated WebSocket")

    // Simulate receiving WebSocket messages
    intervalRef.current = setInterval(() => {
      // Randomly decide whether to send a price alert or weather alert
      const messageType = Math.random() > 0.5 ? "price_alert" : "weather_alert"

      if (messageType === "price_alert") {
        // Simulate price change for Bitcoin, Ethereum, or Solana
        const cryptos = ["bitcoin", "ethereum", "solana"]
        const cryptoId = cryptos[Math.floor(Math.random() * cryptos.length)]
        const cryptoName = cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1)
        const priceChange = (Math.random() * 2 - 1) * 2 // Between -2% and +2%
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

        // Only show notification for significant changes (>1%)
        if (Math.abs(priceChange) > 1) {
          const message: WebSocketMessage = {
            type: "price_alert",
            data: {
              title: `${cryptoName} Price Alert`,
              description: `${cryptoName} has ${isPositive ? "increased" : "decreased"} by ${Math.abs(priceChange).toFixed(2)}% in the last minute`,
            },
          }

          dispatch(addNotification(message))
        }
      } else {
        // Simulate weather alert
        const cities = ["New York", "London", "Tokyo"]
        const conditions = ["Heavy Rain", "Thunderstorm", "Heat Wave", "Strong Winds"]
        const city = cities[Math.floor(Math.random() * cities.length)]
        const condition = conditions[Math.floor(Math.random() * conditions.length)]

        const message: WebSocketMessage = {
          type: "weather_alert",
          data: {
            title: `Weather Alert for ${city}`,
            description: `${condition} expected in ${city} in the next few hours`,
          },
        }

        // Only show weather alerts occasionally (20% chance)
        if (Math.random() < 0.2) {
          dispatch(addNotification(message))
        }
      }
    }, 30000) // Every 30 seconds

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [dispatch])

  return <>{children}</>
}

