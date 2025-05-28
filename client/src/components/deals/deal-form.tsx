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
      price: 0,
      originalPrice: 0,
      merchant: "",
      category: "",
      tags: [],
      url: "",
      imageUrl: "/placeholder.svg",
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
  const discount = watchedFields.originalPrice > 0 
    ? Math.round(((watchedFields.originalPrice - watchedFields.price) / watchedFields.originalPrice) * 100)
    : 0

  const previewData = {
    id: "preview",
    ...watchedFields,
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deal Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the deal title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the deal"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deal Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="merchant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merchant</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter merchant name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
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
                  <FormLabel>Deal URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add tags"
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
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Submit Deal</Button>
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