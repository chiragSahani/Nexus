import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { NewsData } from "@/lib/types"

// ✅ API Key for NewsData.io
const NEWS_API_KEY = "pub_7744796b2057b0f5e17d13fddf55c8417b4b7"

// ✅ Async Thunk to fetch news data
export const fetchNewsData = createAsyncThunk("news/fetchNewsData", async () => {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&category=business&country=us`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch news data: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("No articles found in the response")
    }

    return data.results.map((article: any) => ({
      id: article.link, // Using article link as a unique identifier
      title: article.title,
      url: article.link,
      source: article.source_id,
      publishedAt: article.pubDate,
      description: article.description,
      imageUrl: article.image_url,
    })) as NewsData[]
  } catch (error) {
    console.error("Error fetching news data:", error)
    throw error
  }
})

// ✅ State Type Interface
interface NewsState {
  data: NewsData[]
  loading: boolean
  error: string | null
}

// ✅ Initial State
const initialState: NewsState = {
  data: [],
  loading: false,
  error: null,
}

// ✅ Slice Definition
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addNewsItem: (state, action) => {
      state.data.unshift(action.payload)
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
      })
  },
})

// ✅ Export Actions and Reducer
export const { addNewsItem } = newsSlice.actions
export default newsSlice.reducer
