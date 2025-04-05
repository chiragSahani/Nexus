"use client"

import { useState, useEffect } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { CryptoDetailsData } from "@/lib/types"

type ChartType = "line" | "area" | "bar" | "candlestick"
type TimeRange = "1d" | "1w" | "1m" | "3m" | "1y" | "all"

interface AdvancedCryptoChartProps {
  data: CryptoDetailsData["priceHistory"]
  fullData?: CryptoDetailsData
  height?: number
}

export function AdvancedCryptoChart({ data, fullData, height = 350 }: AdvancedCryptoChartProps) {
  const [chartType, setChartType] = useState<ChartType>("area")
  const [timeRange, setTimeRange] = useState<TimeRange>("1m")
  const [chartData, setChartData] = useState(data)
  const [isLoading, setIsLoading] = useState(false)

  // Simple animation for chart changes
  useEffect(() => {
    if (data) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        // Simulate filtering data based on time range
        const filteredData = data.slice(
          timeRange === "1d"
            ? -7
            : timeRange === "1w"
              ? -14
              : timeRange === "1m"
                ? -30
                : timeRange === "3m"
                  ? -60
                  : timeRange === "1y"
                    ? -100
                    : 0,
        )
        setChartData(filteredData)
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [data, timeRange])

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 10 },
    }

    switch (chartType) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
              width={60}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-sm text-primary">${Number(payload[0].value).toFixed(2)}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </LineChart>
        )

      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
              width={60}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-sm text-primary">${Number(payload[0].value).toFixed(2)}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorPrice)"
              isAnimationActive={true}
              animationDuration={1000}
            />
          </AreaChart>
        )

      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
              width={60}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-sm text-primary">${Number(payload[0].value).toFixed(2)}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="price"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </BarChart>
        )

      // Additional chart types can be added here

      default:
        return null
    }
  }

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex items-center justify-between overflow-x-auto pb-2">
        <div className="flex space-x-2 min-w-max">
          {["1d", "1w", "1m", "3m", "1y", "all"].map((range) => (
            <Button
              key={range}
              size="sm"
              variant={timeRange === range ? "default" : "outline"}
              className="text-xs h-7"
              onClick={() => setTimeRange(range as TimeRange)}
            >
              {range.toUpperCase()}
            </Button>
          ))}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs ml-2 min-w-max">
              {chartType.toUpperCase()} <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setChartType("line")}>Line Chart</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setChartType("area")}>Area Chart</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setChartType("bar")}>Bar Chart</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative w-full" style={{ height: height, minHeight: "250px", maxHeight: "80vh" }}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </motion.div>
          ) : (
            <motion.div
              key="chart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

