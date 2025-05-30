import React, { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import DealCard from "@/components/deal-card"
import { dealSchema, type DealFormData, CATEGORIES } from "./deal-schema"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
interface DealFormProps {
  onSubmit: (data: DealFormData) => Promise<void>
  className?: string
}

export function DealForm({ onSubmit, className }: DealFormProps) {
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [currentStep, setCurrentStep] = useState(0)

  const MAX_STEPS = 3; // Basic Info, Pricing, Details

  const form = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      originalPrice: undefined,
      merchant: "",
      category: "",
      tags: [],
      url: "",
      imageUrl: "",
    },
  })

  const handleAddTag = useCallback(() => {
    if (tagInput && tags.length < 5) {
      setTags((prev) => [...new Set([...prev, tagInput.trim()])])
      setTagInput("")
      form.setValue("tags", [...tags, tagInput.trim()])
    }
  }, [tagInput, tags, form])

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
    form.setValue("tags", tags.filter((tag) => tag !== tagToRemove))
  }, [tags, form])

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 0) {
      isValid = await form.trigger(["title", "description"]);
    } else if (currentStep === 1) {
      isValid = await form.trigger(["price", "originalPrice"]);
    } else if (currentStep === 2) {
      isValid = await form.trigger(["merchant", "category", "url", "imageUrl", "tags"]);
    }

    if (isValid && currentStep < MAX_STEPS - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const watchedFields = form.watch()
  const discount = watchedFields.originalPrice && watchedFields.price
    ? Math.round(((watchedFields.originalPrice - watchedFields.price) / watchedFields.originalPrice) * 100)
    : 0

  const previewData = {
    id: "preview",
    ...watchedFields,
    price: watchedFields.price || 0,
    originalPrice: watchedFields.originalPrice || 0,
    postedBy: {
      name: "You",
      avatar: "/placeholder-user.jpg"
    },
    votes: { up: 0, down: 0 },
    commentsCount: 0,
    discount,
    isVerified: false
  }

  const handleSubmit = async (data: DealFormData) => {
    if (currentStep === MAX_STEPS - 1) {
      await onSubmit(data);
    }
  };

  const progressValue = ((currentStep + 1) / MAX_STEPS) * 100;

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6", className)}>
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="mb-6">
              <Progress value={progressValue} className="w-full" />
              <p className="text-center text-sm text-muted-foreground mt-2">
                Step {currentStep + 1} of {MAX_STEPS}
              </p>
            </div>

            {/* Step 1: Basic Information Section */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Basic Information</h3>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Deal Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 50% off Nike Air Max Sneakers" {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Be specific and include key details.
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Limited time offer. All sizes available. Free shipping on orders over $50."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Include important details like conditions and restrictions.
                      </p>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Pricing Information Section */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Pricing Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Deal Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="19.99"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-sm text-muted-foreground">
                          Enter the current deal price.
                        </p>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="originalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Original Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="39.99"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-sm text-muted-foreground">
                          Enter the regular price before discount.
                        </p>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Deal Details Section */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Deal Details</h3>
                <FormField
                  control={form.control}
                  name="merchant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Merchant (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Amazon, Nike, Best Buy" {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Where can users find this deal?
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Deal URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.example.com/product" {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Direct link to the product or deal page.
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.example.com/product-image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Add a product image URL to make your deal more appealing.
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-base">Tags</FormLabel>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="e.g., electronics, sale, clearance"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                handleAddTag()
                              }
                            }}
                          />
                          <Button type="button" onClick={handleAddTag}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Button
                              key={tag}
                              variant="secondary"
                              size="sm"
                              onClick={() => handleRemoveTag(tag)}
                            >
                              {tag} ×
                            </Button>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Add 1-5 relevant tags.
                        </p>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="border-t pt-6 flex justify-between">
              {currentStep > 0 && (
                <Button type="button" onClick={prevStep} variant="outline">
                  Previous
                </Button>
              )}
              {currentStep < MAX_STEPS - 1 && (
                <Button type="button" onClick={nextStep} className="ml-auto">
                  Next
                </Button>
              )}
              {currentStep === MAX_STEPS - 1 && (
                <Button type="submit" className="w-full">
                  Submit Deal
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Card>

      <div className="lg:sticky lg:top-4 space-y-4 h-fit">
        <h3 className="font-semibold text-lg">Preview</h3>
        <DealCard {...previewData} />
      </div>
    </div>
  )
}