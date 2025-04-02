"use client"

import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherCard } from "@/components/weather/weather-card"
import { CryptoCard } from "@/components/crypto/crypto-card"
import type { RootState } from "@/lib/redux/store"

export function FavoritesSection() {
  const { favoriteCities, favoriteCryptos } = useSelector((state: RootState) => state.userPreferences)
  const weatherData = useSelector((state: RootState) => state.weather.data)
  const cryptoData = useSelector((state: RootState) => state.crypto.data)

  const favoriteWeatherData = weatherData.filter((city) => favoriteCities.includes(city.name))
  const favoriteCryptoData = cryptoData.filter((crypto) => favoriteCryptos.includes(crypto.id))

  const hasFavoriteWeather = favoriteWeatherData.length > 0
  const hasFavoriteCrypto = favoriteCryptoData.length > 0

  if (!hasFavoriteWeather && !hasFavoriteCrypto) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Favorites</CardTitle>
        <CardDescription>Quick access to your favorite items</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={hasFavoriteWeather ? "weather" : "crypto"}>
          <TabsList className="mb-4">
            <TabsTrigger value="weather" disabled={!hasFavoriteWeather}>
              Weather
            </TabsTrigger>
            <TabsTrigger value="crypto" disabled={!hasFavoriteCrypto}>
              Crypto
            </TabsTrigger>
          </TabsList>
          <TabsContent value="weather" className="m-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteWeatherData.map((city) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <WeatherCard city={city} isFavorite={true} onToggleFavorite={() => {}} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="crypto" className="m-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteCryptoData.map((crypto) => (
                <motion.div
                  key={crypto.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CryptoCard crypto={crypto} isFavorite={true} onToggleFavorite={() => {}} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

