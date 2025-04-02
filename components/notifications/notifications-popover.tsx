"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationItem } from "@/components/notifications/notification-item"
import type { RootState } from "@/lib/redux/store"

export function NotificationsPopover() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const notifications = useSelector((state: RootState) => state.notifications.items)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs">
              Mark all as read
            </Button>
          )}
        </div>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="price">Price Alerts</TabsTrigger>
            <TabsTrigger value="weather">Weather Alerts</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <TabsContent value="all" className="m-0">
                  {notifications.length > 0 ? (
                    <div className="divide-y">
                      {notifications.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-[200px] items-center justify-center">
                      <p className="text-sm text-muted-foreground">No notifications</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="price" className="m-0">
                  {notifications.filter((n) => n.type === "price_alert").length > 0 ? (
                    <div className="divide-y">
                      {notifications
                        .filter((n) => n.type === "price_alert")
                        .map((notification) => (
                          <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </div>
                  ) : (
                    <div className="flex h-[200px] items-center justify-center">
                      <p className="text-sm text-muted-foreground">No price alerts</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="weather" className="m-0">
                  {notifications.filter((n) => n.type === "weather_alert").length > 0 ? (
                    <div className="divide-y">
                      {notifications
                        .filter((n) => n.type === "weather_alert")
                        .map((notification) => (
                          <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </div>
                  ) : (
                    <div className="flex h-[200px] items-center justify-center">
                      <p className="text-sm text-muted-foreground">No weather alerts</p>
                    </div>
                  )}
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </ScrollArea>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

