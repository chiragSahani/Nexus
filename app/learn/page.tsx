import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BarChart4, Bell, Cloud, CreditCard, Globe, LineChart, Search, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Learn More | CryptoWeather Nexus",
  description: "Learn about CryptoWeather Nexus, its features, and how to use the dashboard",
}

export default function LearnPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">About CryptoWeather Nexus</h1>
      </div>

      {/* Hero Section */}
      <section className="mb-16 rounded-xl bg-gradient-to-br from-primary/10 via-background to-background p-8 md:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Your All-in-One Dashboard for Crypto and Weather
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            CryptoWeather Nexus combines real-time cryptocurrency data, global weather information, and the latest
            crypto news in one powerful dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#dashboard-section">
              <Button size="lg">Explore Dashboard</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<LineChart className="h-10 w-10 text-primary" />}
            title="Real-Time Data"
            description="Get up-to-the-minute cryptocurrency prices, market data, and weather information with automatic updates."
          />
          <FeatureCard
            icon={<BarChart4 className="h-10 w-10 text-primary" />}
            title="Interactive Charts"
            description="Visualize data with responsive, interactive charts that help you understand trends and patterns."
          />
          <FeatureCard
            icon={<Star className="h-10 w-10 text-primary" />}
            title="Favorites & Watchlist"
            description="Save your favorite cryptocurrencies and cities for quick access and personalized monitoring."
          />
          <FeatureCard
            icon={<Search className="h-10 w-10 text-primary" />}
            title="Advanced Search"
            description="Quickly find the information you need with powerful search and filtering capabilities."
          />
          <FeatureCard
            icon={<Bell className="h-10 w-10 text-primary" />}
            title="Real-Time Notifications"
            description="Stay informed with instant alerts about significant price movements and weather changes."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-primary" />}
            title="Fast Performance"
            description="Enjoy a smooth, responsive experience with optimized performance across all devices."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">How It Works</h2>
        <div className="mx-auto max-w-3xl rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                1
              </div>
              <div>
                <h3 className="text-xl font-medium">Real-Time Data Collection</h3>
                <p className="text-muted-foreground">
                  CryptoWeather Nexus connects to multiple APIs to gather the latest cryptocurrency prices, weather
                  data, and news articles.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                2
              </div>
              <div>
                <h3 className="text-xl font-medium">Data Processing & Analysis</h3>
                <p className="text-muted-foreground">
                  The collected data is processed, analyzed, and prepared for visualization in real-time, ensuring you
                  always have the most current information.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                3
              </div>
              <div>
                <h3 className="text-xl font-medium">Interactive Dashboard</h3>
                <p className="text-muted-foreground">
                  The processed data is presented in an intuitive, interactive dashboard that allows you to explore,
                  search, and customize your view.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                4
              </div>
              <div>
                <h3 className="text-xl font-medium">Personalization</h3>
                <p className="text-muted-foreground">
                  Save your preferences, create watchlists, and receive notifications tailored to your interests for a
                  personalized experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Data Sources</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <DataSourceCard
            icon={<CreditCard className="h-8 w-8 text-primary" />}
            title="Cryptocurrency Data"
            sources={[
              "CoinGecko API for market data",
              "CoinCap WebSocket for real-time price updates",
              "Historical price data from multiple sources",
            ]}
          />
          <DataSourceCard
            icon={<Cloud className="h-8 w-8 text-primary" />}
            title="Weather Data"
            sources={[
              "OpenWeatherMap API for current conditions",
              "Historical weather data archives",
              "Forecast data from meteorological services",
            ]}
          />
          <DataSourceCard
            icon={<Globe className="h-8 w-8 text-primary" />}
            title="News & Updates"
            sources={[
              "NewsData.io API for crypto news",
              "Real-time news aggregation",
              "Curated content from trusted sources",
            ]}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is CryptoWeather Nexus free to use?</AccordionTrigger>
              <AccordionContent>
                Yes, CryptoWeather Nexus is completely free to use. We provide real-time cryptocurrency data, weather
                information, and news updates at no cost to our users.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How often is the data updated?</AccordionTrigger>
              <AccordionContent>
                Cryptocurrency prices are updated in real-time through WebSocket connections. Weather data is refreshed
                every hour, and news articles are updated as they become available throughout the day.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can I customize which cryptocurrencies and cities I see?</AccordionTrigger>
              <AccordionContent>
                You can add cryptocurrencies and cities to your favorites for quick access. Your preferences are saved
                locally, so they'll be available whenever you return to the dashboard.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Is my data private and secure?</AccordionTrigger>
              <AccordionContent>
                We prioritize your privacy and security. CryptoWeather Nexus only stores your preferences locally on
                your device. We don't collect personal information or track your usage beyond what's necessary for the
                application to function.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How can I get notifications about price changes?</AccordionTrigger>
              <AccordionContent>
                CryptoWeather Nexus provides real-time notifications for significant price movements and weather
                changes. These notifications appear in the application and can be viewed in the notifications panel.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Does CryptoWeather Nexus work on mobile devices?</AccordionTrigger>
              <AccordionContent>
                Yes, CryptoWeather Nexus is fully responsive and works on all devices, including smartphones and
                tablets. The interface automatically adjusts to provide the best experience on any screen size.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-xl bg-primary/10 p-8 text-center md:p-12">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">Ready to Get Started?</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Explore the CryptoWeather Nexus dashboard and start tracking your favorite cryptocurrencies and cities today.
        </p>
        <Link href="/#dashboard-section">
          <Button size="lg" className="px-8">
            Explore Dashboard
          </Button>
        </Link>
      </section>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function DataSourceCard({
  icon,
  title,
  sources,
}: {
  icon: React.ReactNode
  title: string
  sources: string[]
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {sources.map((source, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">{source}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

