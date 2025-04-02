"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface WeatherChartProps {
  data: {
    date: string
    temperature: number
  }[]
}

export function WeatherChart({ data }: WeatherChartProps) {
  return (
    <ChartContainer
      config={{
        temperature: {
          label: "Temperature",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => value} />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `${value}°C`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="temperature" strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

