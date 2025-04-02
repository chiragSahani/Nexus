"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { WeatherSection } from "@/components/weather/weather-section"
import { CryptoSection } from "@/components/crypto/crypto-section"
import { NewsSection } from "@/components/news/news-section"
import { FavoritesSection } from "@/components/favorites/favorites-section"
import { fetchWeatherData } from "@/lib/redux/slices/weatherSlice"
import { fetchCryptoData } from "@/lib/redux/slices/cryptoSlice"
import { fetchNewsData } from "@/lib/redux/slices/newsSlice"
import type { RootState, AppDispatch } from "@/lib/redux/store"

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { favoriteCities, favoriteCryptos } = useSelector((state: RootState) => state.userPreferences)
  const hasFavorites = favoriteCities.length > 0 || favoriteCryptos.length > 0

  useEffect(() => {
    // Initial data fetch
    dispatch(fetchWeatherData())
    dispatch(fetchCryptoData())
    dispatch(fetchNewsData())

    // Set up interval for data refresh every 60 seconds
    const intervalId = setInterval(() => {
      dispatch(fetchWeatherData())
      dispatch(fetchCryptoData())
    }, 60000)

    return () => clearInterval(intervalId)
  }, [dispatch])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {hasFavorites && (
        <motion.div variants={item}>
          <FavoritesSection />
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-1">
          <WeatherSection />
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
          <CryptoSection />
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
          <NewsSection />
        </motion.div>
      </div>
    </motion.div>
  )
}

