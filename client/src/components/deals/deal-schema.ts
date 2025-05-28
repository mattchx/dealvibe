import { z } from "zod"

export const dealSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must not exceed 500 characters"),
  price: z
    .number()
    .min(0, "Price must be greater than or equal to 0")
    .max(999999.99, "Price must not exceed 999,999.99"),
  originalPrice: z
    .number()
    .min(0, "Original price must be greater than or equal to 0")
    .max(999999.99, "Original price must not exceed 999,999.99"),
  merchant: z
    .string()
    .min(2, "Merchant name must be at least 2 characters")
    .max(50, "Merchant name must not exceed 50 characters"),
  category: z.string().min(1, "Please select a category"),
  tags: z.array(z.string()).min(1, "Add at least one tag").max(5, "Maximum 5 tags allowed"),
  url: z
    .string()
    .url("Please enter a valid URL")
    .max(500, "URL must not exceed 500 characters"),
  imageUrl: z.string().default("/placeholder.svg"),
  expiresAt: z.date().optional(),
})

export type DealFormData = z.infer<typeof dealSchema>

export const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Beauty & Health",
  "Sports & Outdoors",
  "Toys & Games",
  "Automotive",
  "Books & Media",
  "Food & Grocery",
  "Travel",
  "Services",
  "Other",
] as const

export type Category = (typeof CATEGORIES)[number]