import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UserPreferencesState {
  favoriteCities: string[]
  favoriteCryptos: string[]
  theme: "light" | "dark" | "system"
}

// Try to load preferences from localStorage if available
const loadPreferences = (): UserPreferencesState => {
  if (typeof window !== "undefined") {
    const savedPreferences = localStorage.getItem("userPreferences")
    if (savedPreferences) {
      try {
        return JSON.parse(savedPreferences)
      } catch (e) {
        console.error("Failed to parse saved preferences", e)
      }
    }
  }

  return {
    favoriteCities: [],
    favoriteCryptos: [],
    theme: "system",
  }
}

const initialState: UserPreferencesState = loadPreferences()

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      const cityName = action.payload
      const index = state.favoriteCities.indexOf(cityName)

      if (index === -1) {
        state.favoriteCities.push(cityName)
      } else {
        state.favoriteCities.splice(index, 1)
      }

      // Save to localStorage if available
      if (typeof window !== "undefined") {
        localStorage.setItem("userPreferences", JSON.stringify(state))
      }
    },
    toggleFavoriteCrypto: (state, action: PayloadAction<string>) => {
      const cryptoId = action.payload
      const index = state.favoriteCryptos.indexOf(cryptoId)

      if (index === -1) {
        state.favoriteCryptos.push(cryptoId)
      } else {
        state.favoriteCryptos.splice(index, 1)
      }

      // Save to localStorage if available
      if (typeof window !== "undefined") {
        localStorage.setItem("userPreferences", JSON.stringify(state))
      }
    },
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload

      // Save to localStorage if available
      if (typeof window !== "undefined") {
        localStorage.setItem("userPreferences", JSON.stringify(state))
      }
    },
    importUserPreferences: (state, action: PayloadAction<UserPreferencesState>) => {
      return { ...state, ...action.payload }
    },
    reorderFavorites: (
      state,
      action: PayloadAction<{
        type: "cities" | "crypto"
        items: string[]
      }>,
    ) => {
      const { type, items } = action.payload

      if (type === "cities") {
        state.favoriteCities = items
      } else {
        state.favoriteCryptos = items
      }

      // Save to localStorage if available
      if (typeof window !== "undefined") {
        localStorage.setItem("userPreferences", JSON.stringify(state))
      }
    },
  },
})

export const { toggleFavoriteCity, toggleFavoriteCrypto, setTheme, importUserPreferences, reorderFavorites } =
  userPreferencesSlice.actions

export default userPreferencesSlice.reducer

