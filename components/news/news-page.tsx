"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { NewsItem } from "@/components/news/news-item"
import { fetchNewsData } from "@/lib/redux/slices/newsSlice"
import type { RootState, AppDispatch } from "@/lib/redux/store"

export function NewsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.news)

  useEffect(() => {
    dispatch(fetchNewsData())
  }, [dispatch])

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Crypto News</h1>
        <div className="space-y-4">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-md bg-muted"></div>
            ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Crypto News</h1>
        <Card>
          <CardContent className="pt-6">
            <div className="rounded-md bg-destructive/10 p-4 text-destructive">
              <p>Failed to load news data. Please try again later.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Crypto News</h1>
      <p className="text-muted-foreground">Stay updated with the latest cryptocurrency news and developments</p>

      <div className="space-y-6">
        {data.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="p-0">
                <NewsItem article={article} expanded />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

