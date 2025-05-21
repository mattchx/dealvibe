"use client"

import { useState, useEffect } from "react"
import DealCard from "./deal-card"
import { mockDeals } from "@/lib/mock-data"
import { useMobile } from "@/hooks/use-mobile"

export default function DealGrid() {
  const [deals, setDeals] = useState(mockDeals)
  const isMobile = useMobile()

  // In a real app, you would fetch deals from an API
  useEffect(() => {
    // Simulate loading deals
    const timer = setTimeout(() => {
      setDeals(mockDeals)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {deals.map((deal) => (
        <DealCard key={deal.id} {...deal} />
      ))}
    </div>
  )
}
