import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { CryptoData } from "@/lib/types"

// Real API call to CoinGecko
export const fetchCryptoData = createAsyncThunk("crypto/fetchCryptoData", async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&order=market_cap_desc&per_page=3&page=1&sparkline=false&price_change_percentage=24h",
    )

    if (!response.ok) {
      throw new Error("Failed to fetch crypto data")
    }

    const data = await response.json()

    return data.map((crypto: any) => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      price: crypto.current_price,
      priceChange24h: crypto.price_change_percentage_24h,
      marketCap: crypto.market_cap,
      volume24h: crypto.total_volume,
      image: crypto.image,
    })) as CryptoData[]
  } catch (error) {
    console.error("Error fetching crypto data:", error)

    // Fallback data in case of API failure
    return [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        price: 50432.75,
        priceChange24h: 2.5,
        marketCap: 980000000000,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "eth",
        price: 2950.42,
        priceChange24h: -1.2,
        marketCap: 350000000000,
      },
      {
        id: "solana",
        name: "Solana",
        symbol: "sol",
        price: 142.87,
        priceChange24h: 5.8,
        marketCap: 62000000000,
      },
    ] as CryptoData[]
  }
})

interface CryptoState {
  data: CryptoData[]
  loading: boolean
  error: string | null
}

const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
}

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoPrice: (state, action) => {
      const { id, price, priceChange24h } = action.payload
      const cryptoIndex = state.data.findIndex((crypto) => crypto.id === id)
      if (cryptoIndex !== -1) {
        state.data[cryptoIndex].price = price
        state.data[cryptoIndex].priceChange24h = priceChange24h
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch crypto data"
      })
  },
})

export const { updateCryptoPrice } = cryptoSlice.actions
export default cryptoSlice.reducer

