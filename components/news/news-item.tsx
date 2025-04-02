import { ExternalLink } from "lucide-react"
import type { NewsData } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface NewsItemProps {
  article: NewsData
  expanded?: boolean
}

export function NewsItem({ article, expanded = false }: NewsItemProps) {
  if (expanded) {
    return (
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-4 transition-all hover:bg-muted/50"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-medium group-hover:text-primary">{article.title}</h3>
            <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })} • {article.source}
          </p>
          {article.description && <p className="text-sm text-muted-foreground">{article.description}</p>}
          {article.imageUrl && (
            <div className="mt-2 overflow-hidden rounded-md">
              <img
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title}
                className="h-48 w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          )}
        </div>
      </a>
    )
  }

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border bg-card p-3 shadow-sm transition-all hover:bg-muted/50 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-medium line-clamp-2 group-hover:text-primary">{article.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })} • {article.source}
          </p>
        </div>
        <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  )
}

