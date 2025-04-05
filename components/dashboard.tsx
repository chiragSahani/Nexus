"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeatherSection } from "@/components/weather/weather-section"
import { CryptoSection } from "@/components/crypto/crypto-section"
import { NewsSection } from "@/components/news/news-section"
import { SearchFilter } from "@/components/search/search-filter"
import { Watchlist } from "@/components/favorites/watchlist"
import { fetchWeatherData } from "@/lib/redux/slices/weatherSlice"
import { fetchCryptoData } from "@/lib/redux/slices/cryptoSlice"
import { fetchNewsData } from "@/lib/redux/slices/newsSlice"
import type { RootState, AppDispatch } from "@/lib/redux/store"

type FilterCategory = "all" | "crypto" | "weather" | "news"
type SortOption = "newest" | "popularity" | "alphabetical"

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { favoriteCities, favoriteCryptos } = useSelector((state: RootState) => state.userPreferences)
  const weatherData = useSelector((state: RootState) => state.weather.data)
  const cryptoData = useSelector((state: RootState) => state.crypto.data)
  const newsData = useSelector((state: RootState) => state.news.data)

  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all")
  const [activeSortOption, setActiveSortOption] = useState<SortOption>("newest")
  const [activeTab, setActiveTab] = useState("all")

  const hasFavorites = favoriteCities.length > 0 || favoriteCryptos.length > 0

  // Generate search suggestions from data
  const searchSuggestions = [
    ...weatherData.map((city) => city.name),
    ...cryptoData.map((crypto) => crypto.name),
    ...newsData.map((news) => news.title.split(" ").slice(0, 3).join(" ")),
  ]

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

  // Handle search and filter changes
  const handleSearch = (term: string, category: FilterCategory, sortBy: SortOption) => {
    setSearchTerm(term)
    setActiveCategory(category)
    setActiveSortOption(sortBy)

    // Set the appropriate tab based on category
    if (category !== "all") {
      setActiveTab(category)
    }
  }

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
    <motion.div id="dashboard-section" variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="w-full">
        <SearchFilter onSearch={handleSearch} suggestions={searchSuggestions} className="mb-8" />
      </motion.div>

      {hasFavorites && (
        <motion.div variants={item}>
          <Watchlist />
        </motion.div>
      )}

      <motion.div variants={item}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <motion.div variants={item} className="lg:col-span-1 w-full overflow-hidden">
                <WeatherSection searchTerm={searchTerm} />
              </motion.div>
              <motion.div variants={item} className="lg:col-span-1 w-full overflow-hidden">
                <CryptoSection searchTerm={searchTerm} />
              </motion.div>
              <motion.div variants={item} className="lg:col-span-1 w-full overflow-hidden">
                <NewsSection searchTerm={searchTerm} />
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="m-0">
            <WeatherSection searchTerm={searchTerm} expanded />
          </TabsContent>

          <TabsContent value="crypto" className="m-0">
            <CryptoSection searchTerm={searchTerm} expanded />
          </TabsContent>

          <TabsContent value="news" className="m-0">
            <NewsSection searchTerm={searchTerm} expanded />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

