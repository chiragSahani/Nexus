"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type FilterCategory = "all" | "crypto" | "weather" | "news"
type SortOption = "newest" | "popularity" | "alphabetical"

interface SearchFilterProps {
  onSearch: (term: string, category: FilterCategory, sortBy: SortOption) => void
  suggestions?: string[]
  className?: string
}

export function SearchFilter({ onSearch, suggestions = [], className = "" }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState<FilterCategory>("all")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [open, setOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Update active filters count
  useEffect(() => {
    let count = 0
    if (category !== "all") count++
    if (sortBy !== "newest") count++
    setActiveFilters(count)
  }, [category, sortBy])

  // Handle search submission
  const handleSearch = () => {
    onSearch(searchTerm, category, sortBy)
    setOpen(false)
  }

  // Clear all filters and search
  const handleClear = () => {
    setSearchTerm("")
    setCategory("all")
    setSortBy("newest")
    onSearch("", "all", "newest")
    inputRef.current?.focus()
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Input
                ref={inputRef}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-10"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
              />
            </PopoverTrigger>

            {suggestions.length > 0 && (
              <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start">
                <Command>
                  <CommandList>
                    <CommandGroup heading="Suggestions">
                      {suggestions
                        .filter((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
                        .slice(0, 5)
                        .map((suggestion) => (
                          <CommandItem
                            key={suggestion}
                            onSelect={() => {
                              setSearchTerm(suggestion)
                              handleSearch()
                            }}
                          >
                            {suggestion}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                </Command>
              </PopoverContent>
            )}
          </Popover>

          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full p-0"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Filter className="h-4 w-4" />
              {activeFilters > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {activeFilters}
                </span>
              )}
              <span className="sr-only">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Category</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={category === "all"} onCheckedChange={() => setCategory("all")}>
              All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={category === "crypto"} onCheckedChange={() => setCategory("crypto")}>
              Cryptocurrency
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={category === "weather"} onCheckedChange={() => setCategory("weather")}>
              Weather
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={category === "news"} onCheckedChange={() => setCategory("news")}>
              News
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Sort By</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={sortBy === "newest"} onCheckedChange={() => setSortBy("newest")}>
              Newest First
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={sortBy === "popularity"} onCheckedChange={() => setSortBy("popularity")}>
              Popularity
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={sortBy === "alphabetical"}
              onCheckedChange={() => setSortBy("alphabetical")}
            >
              Alphabetical
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <div className="flex items-center justify-between px-2 py-1.5">
              <Button variant="ghost" size="sm" onClick={handleClear} className="h-auto px-2 py-1 text-xs">
                Reset
              </Button>
              <Button size="sm" onClick={handleSearch} className="h-auto px-2 py-1 text-xs">
                Apply
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={handleSearch}>Search</Button>
      </div>

      <AnimatePresence>
        {activeFilters > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 flex flex-wrap gap-2"
          >
            {category !== "all" && (
              <Badge variant="outline" className="flex items-center gap-1">
                Category: {category}
                <Button variant="ghost" size="icon" className="h-3 w-3 p-0" onClick={() => setCategory("all")}>
                  <X className="h-2 w-2" />
                  <span className="sr-only">Remove filter</span>
                </Button>
              </Badge>
            )}

            {sortBy !== "newest" && (
              <Badge variant="outline" className="flex items-center gap-1">
                Sort: {sortBy}
                <Button variant="ghost" size="icon" className="h-3 w-3 p-0" onClick={() => setSortBy("newest")}>
                  <X className="h-2 w-2" />
                  <span className="sr-only">Remove filter</span>
                </Button>
              </Badge>
            )}

            <Button variant="ghost" size="sm" className="h-5 px-2 text-xs" onClick={handleClear}>
              Clear All
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

