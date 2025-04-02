import { Cloud, Droplets, Sun } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getWeatherIconFromCode } from "@/lib/utils"

interface WeatherTableProps {
  forecast: {
    date: string
    condition: string
    icon: string
    temperature: {
      min: number
      max: number
    }
    humidity: number
    windSpeed: number
  }[]
}

export function WeatherTable({ forecast }: WeatherTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Temperature</TableHead>
          <TableHead>Humidity</TableHead>
          <TableHead>Wind</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {forecast.map((day) => (
          <TableRow key={day.date}>
            <TableCell className="font-medium">{day.date}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {day.icon ? getWeatherIconFromCode(day.icon) : getWeatherIcon(day.condition)}
                <span>{day.condition}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className="font-medium">{Math.round(day.temperature.max)}°C</span>
              <span className="text-muted-foreground"> / {Math.round(day.temperature.min)}°C</span>
            </TableCell>
            <TableCell>{day.humidity}%</TableCell>
            <TableCell>{day.windSpeed} km/h</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function getWeatherIcon(condition: string) {
  switch (condition.toLowerCase()) {
    case "sunny":
    case "clear":
      return <Sun className="h-4 w-4 text-yellow-500" />
    case "cloudy":
    case "partly cloudy":
      return <Cloud className="h-4 w-4 text-gray-500" />
    case "rainy":
    case "rain":
      return <Droplets className="h-4 w-4 text-blue-500" />
    default:
      return <Cloud className="h-4 w-4 text-gray-500" />
  }
}

