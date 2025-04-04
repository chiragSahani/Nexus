import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Learn More | CryptoWeather Nexus",
  description:
    "Learn about CryptoWeather Nexus, its features, and how to use the dashboard for tracking cryptocurrency and weather data in real-time.",
  keywords: [
    "CryptoWeather Nexus",
    "cryptocurrency dashboard",
    "weather tracking",
    "crypto news",
    "real-time data",
    "financial dashboard",
    "market data",
  ],
  authors: [{ name: "CryptoWeather Nexus Team" }],
  openGraph: {
    title: "Learn More | CryptoWeather Nexus",
    description:
      "Your all-in-one dashboard for real-time cryptocurrency data, global weather updates, and the latest crypto news.",
    url: "/learn",
    siteName: "CryptoWeather Nexus",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CryptoWeather Nexus Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

