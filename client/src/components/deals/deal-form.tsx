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

interface DealFormProps {
  onSubmit: (data: DealFormData) => Promise<void>
  className?: string
}

export function DealForm({ onSubmit, className }: DealFormProps) {
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

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

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6", className)}>
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Basic Information</h3>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deal Title (Required)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 50% off Nike Air Max Sneakers" {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Be specific and include key details like brand, model, or discount
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Required)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Limited time offer on the latest Nike Air Max. All sizes available. Free shipping on orders over $50."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Include important details like conditions, shipping info, and any restrictions
                      </p>
                    </FormItem>
                  )}
                />
              </div>

              {/* Pricing Information Section */}
              <div className="space-y-4">
                <h3 className="font-semibold">Pricing Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deal Price (Required)</FormLabel>
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
                          Enter the current deal price
                        </p>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="originalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Original Price (Required)</FormLabel>
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
                          Enter the regular price before discount
                        </p>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Deal Details Section */}
              <div className="space-y-4">
                <h3 className="font-semibold">Deal Details</h3>
                <FormField
                  control={form.control}
                  name="merchant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Merchant (Optional)</FormLabel>
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
                      <FormLabel>Category (Required)</FormLabel>
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
                      <FormLabel>Deal URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.example.com/product" {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Direct link to the product or deal page
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.example.com/product-image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Add a product image URL to make your deal more appealing
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={() => (
                    <FormItem>
                      <FormLabel>Tags (Required)</FormLabel>
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
                          Add 1-5 relevant tags to help others find your deal
                        </p>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <Button type="submit" className="w-full">Submit Deal</Button>
            </div>
          </form>
        </Form>
      </Card>

      <div className="lg:sticky lg:top-4 space-y-4">
        <h3 className="font-semibold text-lg">Preview</h3>
        <DealCard {...previewData} />
      </div>
    </div>
  )
}