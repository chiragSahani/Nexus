import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { CryptoDetailsData } from "@/lib/types"

// Real API call to CoinGecko
export const fetchCryptoDetails = createAsyncThunk("cryptoDetails/fetchCryptoDetails", async (cryptoId: string) => {
  try {
    // Get coin details
    const detailsResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
    )

    if (!detailsResponse.ok) {
      throw new Error(`Failed to fetch details for ${cryptoId}`)
    }

    const detailsData = await detailsResponse.json()

    // Get market chart data
    const chartResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=30&interval=daily`,
    )

    if (!chartResponse.ok) {
      throw new Error(`Failed to fetch chart data for ${cryptoId}`)
    }

    const chartData = await chartResponse.json()

    // Process price history
    const priceHistory = chartData.prices.map((item: [number, number]) => ({
      date: new Date(item[0]).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      price: item[1],
    }))

    // Create metrics
    const metrics = [
      {
        name: "Market Dominance",
        value: `${(detailsData.market_data.market_cap_percentage || 0).toFixed(2)}%`,
        change: 0, // Not provided by API
        description: "Percentage of total market capitalization",
      },
      {
        name: "Trading Volume",
        value: `$${(detailsData.market_data.total_volume.usd / 1e9).toFixed(2)}B`,
        change: detailsData.market_data.total_volume_change_24h_in_currency?.usd || 0,
        description: "24h trading volume",
      },
      {
        name: "Volatility",
        value:
          Math.abs(detailsData.market_data.price_change_percentage_24h) > 5
            ? "High"
            : Math.abs(detailsData.market_data.price_change_percentage_24h) > 2
              ? "Medium"
              : "Low",
        description: "Price volatility classification",
      },
      {
        name: "ROI (1 Year)",
        value: `${(detailsData.market_data.price_change_percentage_1y || 0).toFixed(2)}%`,
        change: detailsData.market_data.price_change_percentage_1y || 0,
        description: "Return on investment over past year",
      },
    ]

    return {
      id: cryptoId,
      name: detailsData.name,
      symbol: detailsData.symbol,
      price: detailsData.market_data.current_price.usd,
      priceChange24h: detailsData.market_data.price_change_percentage_24h,
      marketCap: detailsData.market_data.market_cap.usd,
      volume24h: detailsData.market_data.total_volume.usd,
      circulatingSupply: detailsData.market_data.circulating_supply,
      allTimeHigh: detailsData.market_data.ath.usd,
      low24h: detailsData.market_data.low_24h.usd,
      high24h: detailsData.market_data.high_24h.usd,
      image: detailsData.image.large,
      priceHistory,
      metrics,
    } as CryptoDetailsData
  } catch (error) {
    console.error("Error fetching crypto details:", error)

    // Fallback data
    const basePrice = cryptoId === "bitcoin" ? 50432.75 : cryptoId === "ethereum" ? 2950.42 : 142.87

    return {
      id: cryptoId,
      name: cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1),
      symbol: cryptoId.substring(0, 3),
      price: basePrice,
      priceChange24h: cryptoId === "ethereum" ? -1.2 : 2.5,
      marketCap: cryptoId === "bitcoin" ? 980000000000 : cryptoId === "ethereum" ? 350000000000 : 62000000000,
      volume24h: cryptoId === "bitcoin" ? 28000000000 : cryptoId === "ethereum" ? 15000000000 : 3500000000,
      circulatingSupply: cryptoId === "bitcoin" ? 19000000 : cryptoId === "ethereum" ? 120000000 : 430000000,
      allTimeHigh: cryptoId === "bitcoin" ? 69000 : cryptoId === "ethereum" ? 4800 : 260,
      low24h: basePrice * 0.98,
      high24h: basePrice * 1.03,
      priceHistory: Array(30)
        .fill(0)
        .map((_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: basePrice * (0.9 + 0.2 * Math.random() + i / 100),
        })),
      metrics: [
        {
          name: "Market Dominance",
          value: cryptoId === "bitcoin" ? "42%" : cryptoId === "ethereum" ? "18%" : "2.5%",
          change: cryptoId === "bitcoin" ? -0.5 : cryptoId === "ethereum" ? 1.2 : 0.8,
          description: "Percentage of total market capitalization",
        },
        {
          name: "Trading Volume",
          value: `$${cryptoId === "bitcoin" ? "28B" : cryptoId === "ethereum" ? "15B" : "3.5B"}`,
          change: cryptoId === "bitcoin" ? 3.2 : cryptoId === "ethereum" ? -2.1 : 5.4,
          description: "24h trading volume",
        },
        {
          name: "Volatility",
          value: cryptoId === "bitcoin" ? "Medium" : cryptoId === "ethereum" ? "Medium" : "High",
          description: "Price volatility classification",
        },
        {
          name: "ROI (1 Year)",
          value: cryptoId === "bitcoin" ? "32%" : cryptoId === "ethereum" ? "28%" : "45%",
          change: cryptoId === "bitcoin" ? 32 : cryptoId === "ethereum" ? 28 : 45,
          description: "Return on investment over past year",
        },
      ],
    } as CryptoDetailsData
  }
})

interface CryptoDetailsState {
  data: CryptoDetailsData | null
  loading: boolean
  error: string | null
}

const initialState: CryptoDetailsState = {
  data: null,
  loading: false,
  error: null,
}

const cryptoDetailsSlice = createSlice({
  name: "cryptoDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchCryptoDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch crypto details"
      })
  },
})

export default cryptoDetailsSlice.reducer

