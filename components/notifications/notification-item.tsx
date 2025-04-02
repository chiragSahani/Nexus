"use client"

import { useDispatch } from "react-redux"
import { formatDistanceToNow } from "date-fns"
import { ArrowDown, ArrowUp, Cloud, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { markNotificationAsRead } from "@/lib/redux/slices/notificationsSlice"
import type { Notification } from "@/lib/types"
import type { AppDispatch } from "@/lib/redux/store"

interface NotificationItemProps {
  notification: Notification
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const dispatch = useDispatch<AppDispatch>()

  const handleClick = () => {
    if (!notification.read) {
      dispatch(markNotificationAsRead(notification.id))
    }
  }

  const getIcon = () => {
    if (notification.type === "price_alert") {
      if (notification.data.description.includes("increased")) {
        return <ArrowUp className="h-5 w-5 text-green-500" />
      } else {
        return <ArrowDown className="h-5 w-5 text-red-500" />
      }
    } else if (notification.type === "weather_alert") {
      return <Cloud className="h-5 w-5 text-blue-500" />
    } else {
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    }
  }

  return (
    <div
      className={cn("flex cursor-pointer gap-3 px-4 py-3 hover:bg-muted/50", !notification.read && "bg-primary/5")}
      onClick={handleClick}
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
        {getIcon()}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>{notification.data.title}</p>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{notification.data.description}</p>
      </div>
    </div>
  )
}

