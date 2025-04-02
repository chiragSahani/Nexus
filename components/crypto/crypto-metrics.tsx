import { ArrowDown, ArrowUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CryptoMetricsProps {
  metrics: {
    name: string
    value: string | number
    change?: number
    description: string
  }[]
}

export function CryptoMetrics({ metrics }: CryptoMetricsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Change</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {metrics.map((metric) => (
          <TableRow key={metric.name}>
            <TableCell className="font-medium">{metric.name}</TableCell>
            <TableCell>{metric.value}</TableCell>
            <TableCell>
              {metric.change !== undefined && (
                <div className={`flex items-center gap-1 ${metric.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {metric.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  <span>{Math.abs(metric.change).toFixed(2)}%</span>
                </div>
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">{metric.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

