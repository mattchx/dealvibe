import React from "react"
import { useNavigate } from "react-router-dom"
import { DealForm } from "@/components/deals/deal-form"
import type { DealFormData } from "@/components/deals/deal-schema"
import { useToast } from "@/components/ui/use-toast"

export default function SubmitDealPage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (data: DealFormData) => {
    try {
      // TODO: Replace with actual API call
      console.log("Submitting deal:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      toast({
        title: "Success!",
        description: "Your deal has been submitted.",
      })

      navigate("/") // Redirect to home page
    } catch (error) {
      console.error("Error submitting deal:", error)
      toast({
        title: "Error",
        description: "Failed to submit deal. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Submit a Deal</h1>
        <p className="text-muted-foreground mb-8">
          Share a great deal with the community. Please provide accurate information and verify the deal
          is still active before submitting.
        </p>
        <DealForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}