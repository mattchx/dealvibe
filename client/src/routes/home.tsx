import DealGrid from '@/components/deal-grid'

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Deals</h1>
      <DealGrid />
    </div>
  )
}