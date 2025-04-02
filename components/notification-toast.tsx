"use client"
import { useToast } from "@/components/ui/use-toast"
import { ArrowDown, ArrowUp, Cloud } from "lucide-react"

interface NotificationToastProps {
  type: "price_alert" | "weather_alert"
  title: string
  description: string
  variant?: "default" | "destructive"
}

export function useNotificationToast() {
  const { toast } = useToast()

  const showNotification = ({ type, title, description, variant = "default" }: NotificationToastProps) => {
    const icon =
      type === "price_alert" ? (
        description.includes("increased") ? (
          <ArrowUp className="h-5 w-5 text-green-500" />
        ) : (
          <ArrowDown className="h-5 w-5 text-red-500" />
        )
      ) : (
        <Cloud className="h-5 w-5 text-blue-500" />
      )

    toast({
      title,
      description,
      variant,
      icon: icon,
    })
  }

  return { showNotification }
}

