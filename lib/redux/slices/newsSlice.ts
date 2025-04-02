import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { NewsData } from "@/lib/types"

// Real API call to NewsData.io
export const fetchNewsData = createAsyncThunk("news/fetchNewsData", async () => {
  try {
    const apiKey = "pub_77447e7f8ca3bd7b8bd6e7db7251de967b51e"

    const response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&q=crypto&language=en&size=5`)

    if (!response.ok) {
      throw new Error("Failed to fetch news data")
    }

    const data = await response.json()

    return data.results.map((article: any, index: number) => ({
      id: article.article_id || `news-${index}`,
      title: article.title,
      url: article.link,
      source: article.source_id,
      publishedAt: article.pubDate,
      description: article.description,
      imageUrl: article.image_url,
    })) as NewsData[]
  } catch (error) {
    console.error("Error fetching news data:", error)

    // Fallback data in case of API failure
    return [
      {
        id: "1",
        title: "Bitcoin Surges Past $50,000 as Institutional Adoption Grows",
        url: "#",
        source: "CryptoNews",
        publishedAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Ethereum 2.0 Upgrade: What You Need to Know About the Merge",
        url: "#",
        source: "BlockchainToday",
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        title: "Regulatory Clarity: New Framework for Cryptocurrency Proposed",
        url: "#",
        source: "CoinDesk",
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "4",
        title: "NFT Market Shows Signs of Recovery After Months of Decline",
        url: "#",
        source: "NFTWorld",
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "5",
        title: "DeFi Protocols Reach New Milestone with $50B Total Value Locked",
        url: "#",
        source: "DeFiPulse",
        publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ] as NewsData[]
  }
})

interface NewsState {
  data: NewsData[]
  loading: boolean
  error: string | null
}

const initialState: NewsState = {
  data: [],
  loading: false,
  error: null,
}

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
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
      })
  },
})

export default newsSlice.reducer

