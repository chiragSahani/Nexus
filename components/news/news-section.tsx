"use client"

import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsItem } from "@/components/news/news-item"
import type { RootState } from "@/lib/redux/store"

export function NewsSection() {
  const { data, loading, error } = useSelector((state: RootState) => state.news)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>News</CardTitle>
          <CardDescription>Latest crypto headlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-md bg-muted"></div>
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
          <CardTitle>News</CardTitle>
          <CardDescription>Latest crypto headlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-destructive/10 p-4 text-destructive">
            <p>Failed to load news data. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10">
        <CardTitle>News</CardTitle>
        <CardDescription>Latest crypto headlines</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {data.slice(0, 5).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NewsItem article={article} />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

