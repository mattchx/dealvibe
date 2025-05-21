import DealGrid from "@/components/deal-grid"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import CategoryFilter from "@/components/category-filter"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Today's Hottest Deals</h1>
            <p className="text-muted-foreground">Discover the best deals shared by our community</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
            <PlusCircle className="mr-2 h-4 w-4" />
            Share a Deal
          </Button>
        </div>
        <CategoryFilter />
      </section>

      <DealGrid />
    </div>
  )
}
