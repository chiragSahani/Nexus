import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Notification, WebSocketMessage } from "@/lib/types"

interface NotificationsState {
  items: Notification[]
}

const initialState: NotificationsState = {
  items: [],
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<WebSocketMessage>) => {
      const { type, data } = action.payload

      state.items.unshift({
        id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        timestamp: Date.now(),
        read: false,
        data,
      })

      // Keep only the last 20 notifications
      if (state.items.length > 20) {
        state.items = state.items.slice(0, 20)
      }
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notificationId = action.payload
      const notification = state.items.find((item) => item.id === notificationId)

      if (notification) {
        notification.read = true
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.items.forEach((notification) => {
        notification.read = true
      })
    },
    clearNotifications: (state) => {
      state.items = []
    },
  },
})

export const { addNotification, markNotificationAsRead, markAllNotificationsAsRead, clearNotifications } =
  notificationsSlice.actions

export default notificationsSlice.reducer

