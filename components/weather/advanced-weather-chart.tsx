"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Cloud, Droplets, Thermometer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { WeatherDetailsData } from "@/lib/types"

type ChartType = "temperature" | "humidity" | "combined"

interface AdvancedWeatherChartProps {
  data: WeatherDetailsData["historical"]
  forecast?: WeatherDetailsData["forecast"]
  height?: number
}

export function AdvancedWeatherChart({ data, forecast, height = 350 }: AdvancedWeatherChartProps) {
  const [chartType, setChartType] = useState<ChartType>("temperature")
  const [showForecast, setShowForecast] = useState(false)

  // Format data for combined view
  const formatCombinedData = () => {
    if (!forecast) return data

    // If showing forecast, combine historical with forecast
    if (showForecast) {
      const historicalData = data.map((item) => ({
        date: item.date,
        temperature: item.temperature,
        type: "historical" as const,
      }))

      const forecastData = forecast.map((item) => ({
        date: item.date,
        temperature: (item.temperature.max + item.temperature.min) / 2,
        humidity: item.humidity,
        type: "forecast" as const,
      }))

      return [...historicalData, ...forecastData]
    }

    return data
  }

  const combinedData = formatCombinedData()

  const renderChart = () => {
    switch (chartType) {
      case "temperature":
        return (
          <AreaChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <defs>
              <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
            <YAxis
              tickFormatter={(value) => `${value}°C`}
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
              width={60}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload
                  return (
                    <Card className="border shadow-sm">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-primary" />
                          <p className="font-medium">{label}</p>
                          {item.type && (
                            <Badge variant="outline" className="ml-1 text-xs">
                              {item.type === "forecast" ? "Forecast" : "Historical"}
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 font-medium">{Number(payload[0].value).toFixed(1)}°C</p>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#temperatureGradient)"
              isAnimationActive={true}
              animationDuration={1000}
            />
          </AreaChart>
        )

      case "humidity":
        if (!forecast) return null

        return (
          <BarChart data={forecast} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
              width={60}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="border shadow-sm">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          <p className="font-medium">{label}</p>
                        </div>
                        <p className="mt-1 font-medium">{Number(payload[0].value)}% humidity</p>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="humidity"
              fill="hsl(var(--chart-2))"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </BarChart>
        )

      case "combined":
        if (!forecast) return null

        return (
          <ComposedChart data={forecast} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
            <YAxis
              yAxisId="temp"
              tickFormatter={(value) => `${value}°C`}
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
              width={60}
            />
            <YAxis
              yAxisId="humidity"
              orientation="right"
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
              width={60}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="border shadow-sm">
                      <CardContent className="p-3">
                        <p className="font-medium">{label}</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2">
                            <Thermometer className="h-4 w-4 text-primary" />
                            <p>
                              High: {payload[0].value}°C / Low: {payload[1].value}°C
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <p>{payload[2].value}% humidity</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => {
                return <span className="text-xs">{value}</span>
              }}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="temperature.max"
              name="High Temp"
              stroke="hsl(var(--chart-1))"
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="temperature.min"
              name="Low Temp"
              stroke="hsl(var(--chart-3))"
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Bar
              yAxisId="humidity"
              dataKey="humidity"
              name="Humidity"
              fill="hsl(var(--chart-2))"
              fillOpacity={0.6}
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 overflow-x-auto pb-2">
        <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
          <Button
            size="sm"
            variant={chartType === "temperature" ? "default" : "outline"}
            className="text-xs h-7 min-w-max"
            onClick={() => setChartType("temperature")}
          >
            <Thermometer className="mr-1 h-3 w-3" />
            Temperature
          </Button>

          {forecast && (
            <>
              <Button
                size="sm"
                variant={chartType === "humidity" ? "default" : "outline"}
                className="text-xs h-7 min-w-max"
                onClick={() => setChartType("humidity")}
              >
                <Droplets className="mr-1 h-3 w-3" />
                Humidity
              </Button>

              <Button
                size="sm"
                variant={chartType === "combined" ? "default" : "outline"}
                className="text-xs h-7 min-w-max"
                onClick={() => setChartType("combined")}
              >
                <Cloud className="mr-1 h-3 w-3" />
                Combined
              </Button>
            </>
          )}
        </div>

        {forecast && (
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-7 min-w-max"
            onClick={() => setShowForecast(!showForecast)}
          >
            {showForecast ? "Hide Forecast" : "Show Forecast"}
          </Button>
        )}
      </div>

      <div className="relative w-full" style={{ height: height, minHeight: "250px", maxHeight: "80vh" }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

