import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { NewsData } from "@/lib/types"

// API Key for News API
const NEWS_API_KEY = "pub_7744796b2057b0f5e17d13fddf55c8417b4b7"

// Fetch news data from News API
export const fetchNewsData = createAsyncThunk("news/fetchNewsData", async () => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=business&apiKey=${NEWS_API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch news data: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.articles) {
      throw new Error("No articles found in the response")
    }

    return data.articles.map((article: any) => ({
      id: article.url, // Use URL as a unique identifier
      title: article.title,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      description: article.description,
      imageUrl: article.urlToImage,
    })) as NewsData[]
  } catch (error) {
    console.error("Error fetching news data:", error)
    throw error
  }
})

interface NewsState {
  data: NewsData[]
  loading: boolean
  error: string | null
}

const initialState: NewsState = {
  data: [], // Initialize with empty data
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
      })
  },
})

export const { addNewsItem } = newsSlice.actions

export default newsSlice.reducer
