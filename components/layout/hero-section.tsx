"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col justify-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  CryptoWeather
                </span>{" "}
                Nexus
              </h1>
              <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl">
                Your all-in-one dashboard for real-time cryptocurrency data, global weather updates, and the latest
                crypto news.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Link href="#dashboard-section" scroll={true}>
                <Button size="lg" className="group">
                  Explore Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <div className="relative aspect-square w-full max-w-[500px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`h-64 w-64 rounded-full bg-primary/20 blur-3xl ${
                    theme === "dark" ? "opacity-30" : "opacity-70"
                  }`}
                />
              </div>
              <div className="relative z-10 grid h-full w-full place-items-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-24 w-24 animate-float rounded-2xl bg-card p-4 shadow-lg">
                      <div className="h-full w-full rounded-xl bg-gradient-to-br from-blue-500 to-cyan-300" />
                    </div>
                    <div className="h-24 w-24 animate-float-delayed rounded-2xl bg-card p-4 shadow-lg">
                      <div className="h-full w-full rounded-xl bg-gradient-to-br from-yellow-500 to-amber-300" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="h-24 w-24 animate-float-slow rounded-2xl bg-card p-4 shadow-lg">
                      <div className="h-full w-full rounded-xl bg-gradient-to-br from-purple-500 to-pink-300" />
                    </div>
                    <div className="h-24 w-24 animate-float-slower rounded-2xl bg-card p-4 shadow-lg">
                      <div className="h-full w-full rounded-xl bg-gradient-to-br from-green-500 to-emerald-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
