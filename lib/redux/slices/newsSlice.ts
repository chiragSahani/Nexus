import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { NewsData } from "@/lib/types"

// Mock news data
const mockNewsData: NewsData[] = [
  {
    id: "1",
    title: "Bitcoin Surges Past $50,000 as Institutional Adoption Grows",
    url: "#",
    source: "CryptoNews",
    publishedAt: new Date().toISOString(),
    description:
      "Bitcoin has surpassed the $50,000 mark for the first time in several months as institutional investors continue to show interest in the cryptocurrency.",
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Ethereum 2.0 Upgrade: What You Need to Know About the Merge",
    url: "#",
    source: "BlockchainToday",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    description:
      "The long-awaited Ethereum 2.0 upgrade is approaching. Here's what you need to know about the transition from proof-of-work to proof-of-stake.",
    imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Regulatory Clarity: New Framework for Cryptocurrency Proposed",
    url: "#",
    source: "CoinDesk",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Regulators have proposed a new framework for cryptocurrency oversight, potentially bringing more clarity to the industry.",
  },
  {
    id: "4",
    title: "NFT Market Shows Signs of Recovery After Months of Decline",
    url: "#",
    source: "NFTWorld",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "The NFT market is showing signs of recovery after several months of declining sales and interest.",
  },
  {
    id: "5",
    title: "DeFi Protocols Reach New Milestone with $50B Total Value Locked",
    url: "#",
    source: "DeFiPulse",
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Decentralized finance protocols have collectively reached a new milestone with $50 billion in total value locked.",
  },
]

// Mock API call that doesn't actually fetch from external API
export const fetchNewsData = createAsyncThunk("news/fetchNewsData", async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return mockNewsData
})

interface NewsState {
  data: NewsData[]
  loading: boolean
  error: string | null
}

const initialState: NewsState = {
  data: mockNewsData, // Initialize with mock data
  loading: false,
  error: null,
}

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addNewsItem: (state, action) => {
      state.data.unshift(action.payload)

      // Keep the list at a reasonable size
      if (state.data.length > 20) {
        state.data = state.data.slice(0, 20)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch news data"
        // Use mock data even when rejected
        state.data = mockNewsData
      })
  },
})

export const { addNewsItem } = newsSlice.actions

export default newsSlice.reducer

