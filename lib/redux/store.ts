import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "./slices/weatherSlice"
import weatherDetailsReducer from "./slices/weatherDetailsSlice"
import cryptoReducer from "./slices/cryptoSlice"
import cryptoDetailsReducer from "./slices/cryptoDetailsSlice"
import newsReducer from "./slices/newsSlice"
import userPreferencesReducer from "./slices/userPreferencesSlice"
import notificationsReducer from "./slices/notificationsSlice"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    weatherDetails: weatherDetailsReducer,
    crypto: cryptoReducer,
    cryptoDetails: cryptoDetailsReducer,
    news: newsReducer,
    userPreferences: userPreferencesReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

