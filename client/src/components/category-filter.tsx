"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const categories = [
  { id: "all", name: "All Deals" },
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "home", name: "Home & Garden" },
  { id: "travel", name: "Travel" },
  { id: "food", name: "Food & Grocery" },
  { id: "beauty", name: "Beauty" },
  { id: "toys", name: "Toys & Kids" },
  { id: "sports", name: "Sports & Outdoors" },
  { id: "auto", name: "Automotive" },
]

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="w-full">
      <ScrollArea className="w-full whitespace-nowrap">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
          <TabsList className="h-9 bg-muted/50">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={`px-4 ${activeCategory === category.id ? "bg-white dark:bg-background shadow-sm" : ""}`}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
