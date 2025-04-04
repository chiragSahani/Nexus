"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Star, GripVertical } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { WeatherCard } from "@/components/weather/weather-card"
import { CryptoCard } from "@/components/crypto/crypto-card"
import { toggleFavoriteCity, toggleFavoriteCrypto, reorderFavorites } from "@/lib/redux/slices/userPreferencesSlice"
import type { RootState, AppDispatch } from "@/lib/redux/store"

export function Watchlist() {
  const dispatch = useDispatch<AppDispatch>()
  const { favoriteCities, favoriteCryptos } = useSelector((state: RootState) => state.userPreferences)
  const weatherData = useSelector((state: RootState) => state.weather.data)
  const cryptoData = useSelector((state: RootState) => state.crypto.data)

  const [expanded, setExpanded] = useState<string | null>("cities")

  const favoriteWeatherData = weatherData.filter((city) => favoriteCities.includes(city.name))
  const favoriteCryptoData = cryptoData.filter((crypto) => favoriteCryptos.includes(crypto.id))

  const hasFavoriteWeather = favoriteWeatherData.length > 0
  const hasFavoriteCrypto = favoriteCryptoData.length > 0

  const handleToggleFavoriteCity = (cityName: string) => {
    dispatch(toggleFavoriteCity(cityName))
  }

  const handleToggleFavoriteCrypto = (cryptoId: string) => {
    dispatch(toggleFavoriteCrypto(cryptoId))
  }

  // Handle drag and drop reordering
  const handleDragEnd = (result: any, type: "cities" | "crypto") => {
    if (!result.destination) return

    const items = type === "cities" ? [...favoriteCities] : [...favoriteCryptos]
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    dispatch(reorderFavorites({ type, items }))
  }

  if (!hasFavoriteWeather && !hasFavoriteCrypto) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Watchlist</CardTitle>
          <CardDescription>Add cryptocurrencies and cities to your watchlist for quick access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
            <Star className="mb-4 h-10 w-10 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-medium">No items in your watchlist</h3>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              Star your favorite cryptocurrencies and cities to add them here
            </p>
            <Button variant="outline" size="sm">
              Explore Cryptocurrencies
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="mr-2 h-5 w-5 text-yellow-500" />
          Your Watchlist
        </CardTitle>
        <CardDescription>Quick access to your favorite cryptocurrencies and cities</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion type="single" collapsible value={expanded} onValueChange={setExpanded} className="w-full">
          {hasFavoriteWeather && (
            <AccordionItem value="cities" className="border-0">
              <AccordionTrigger className="px-6 py-4 hover:bg-muted/50">
                <div className="flex items-center">
                  <h3 className="text-base font-medium">Favorite Cities</h3>
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {favoriteWeatherData.length}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <DragDropContext onDragEnd={(result) => handleDragEnd(result, "cities")}>
                  <Droppable droppableId="cities-list">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 pb-4 px-6">
                        <AnimatePresence>
                          {favoriteWeatherData.map((city, index) => (
                            <Draggable key={city.name} draggableId={city.name} index={index}>
                              {(provided) => (
                                <motion.div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="relative rounded-lg overflow-hidden"
                                >
                                  <div
                                    {...provided.dragHandleProps}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab opacity-50 hover:opacity-100"
                                  >
                                    <GripVertical className="h-5 w-5" />
                                  </div>
                                  <div className="pl-8">
                                    <WeatherCard
                                      city={city}
                                      isFavorite={true}
                                      onToggleFavorite={() => handleToggleFavoriteCity(city.name)}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </Draggable>
                          ))}
                        </AnimatePresence>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </AccordionContent>
            </AccordionItem>
          )}

          {hasFavoriteCrypto && (
            <AccordionItem value="crypto" className="border-0">
              <AccordionTrigger className="px-6 py-4 hover:bg-muted/50">
                <div className="flex items-center">
                  <h3 className="text-base font-medium">Favorite Cryptocurrencies</h3>
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {favoriteCryptoData.length}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <DragDropContext onDragEnd={(result) => handleDragEnd(result, "crypto")}>
                  <Droppable droppableId="crypto-list">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 pb-4 px-6">
                        <AnimatePresence>
                          {favoriteCryptoData.map((crypto, index) => (
                            <Draggable key={crypto.id} draggableId={crypto.id} index={index}>
                              {(provided) => (
                                <motion.div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="relative rounded-lg overflow-hidden"
                                >
                                  <div
                                    {...provided.dragHandleProps}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab opacity-50 hover:opacity-100"
                                  >
                                    <GripVertical className="h-5 w-5" />
                                  </div>
                                  <div className="pl-8">
                                    <CryptoCard
                                      crypto={crypto}
                                      isFavorite={true}
                                      onToggleFavorite={() => handleToggleFavoriteCrypto(crypto.id)}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </Draggable>
                          ))}
                        </AnimatePresence>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  )
}

