import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, MessageSquare, Clock } from "lucide-react"
import { Link } from "react-router-dom"

interface DealCardProps {
  id: string
  title: string
  description: string
  price: number
  originalPrice: number
  discount: number
  imageUrl: string
  merchant?: string
  category: string
  tags: string[]
  postedBy: {
    name: string
    avatar: string
  }
  votes: {
    up: number
    down: number
  }
  commentsCount: number
  expiresIn?: string
  isExpiring?: boolean
  isVerified?: boolean
}

export default function DealCard({
  id,
  title,
  description,
  price,
  originalPrice,
  discount,
  imageUrl,
  merchant,
  category,
  tags,
  postedBy,
  votes,
  commentsCount,
  expiresIn,
  isExpiring = false,
  isVerified = false,
}: DealCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="relative">
        {imageUrl && (
          <Link to={`/deals/${id}`}>
            <div className="aspect-video relative overflow-hidden">
              <img
                src={imageUrl}
                alt={title}
                className="object-cover transition-transform hover:scale-105 w-full h-full"
              />
            </div>
          </Link>
        )}

        {isExpiring && (
          <Badge variant="destructive" className="absolute top-2 right-2 flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            Expires Soon
          </Badge>
        )}

        {isVerified && (
          <Badge variant="secondary" className="absolute top-2 left-2">
            Verified Deal
          </Badge>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <Link to={`/deals/${id}`} className="hover:underline">
            <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
          </Link>
        </div>
        <div className="flex items-center mt-1 text-sm text-muted-foreground">
          {merchant && (
            <>
              <span>{merchant}</span>
              <span className="mx-2">•</span>
            </>
          )}
          <Link to={`/category/${category.toLowerCase()}`} className="hover:underline">
            {category}
          </Link>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-green-600 dark:text-green-500">${price.toFixed(2)}</span>
          {originalPrice > 0 && (
            <span className="text-sm line-through text-muted-foreground">${originalPrice.toFixed(2)}</span>
          )}
          {discount > 0 && (
            <Badge
              variant="outline"
              className="text-green-600 dark:text-green-500 border-green-600 dark:border-green-500"
            >
              {discount}% OFF
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button className="inline-flex items-center justify-center p-1 rounded-md hover:bg-accent">
            <ThumbsUp className="h-4 w-4 text-blue-600 dark:text-blue-500" />
            <span className="ml-1 text-xs">{votes.up}</span>
          </button>
          <button className="inline-flex items-center justify-center p-1 rounded-md hover:bg-accent">
            <ThumbsDown className="h-4 w-4 text-red-600 dark:text-red-500" />
            <span className="ml-1 text-xs">{votes.down}</span>
          </button>
          <Link
            to={`/deals/${id}#comments`}
            className="inline-flex items-center justify-center p-1 rounded-md hover:bg-accent"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="ml-1 text-xs">{commentsCount}</span>
          </Link>
        </div>

        <div className="flex items-center">
          <Avatar className="h-6 w-6">
            <AvatarImage src={postedBy.avatar || "/placeholder.svg"} alt={postedBy.name} />
            <AvatarFallback>{postedBy.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Link to={`/user/${postedBy.name.toLowerCase()}`} className="ml-2 text-xs hover:underline">
            {postedBy.name}
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
