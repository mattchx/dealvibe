import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Bell, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">DealVibe</span>
          </Link>

          {/* Search - hidden on mobile */}
          <div className="hidden md:flex relative flex-1 mx-8 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100" />
            <Input
              type="search"
              placeholder="Search for deals..."
              className="pl-10 bg-blue-600/30 border-blue-400/30 text-white placeholder:text-blue-100 focus-visible:ring-blue-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/categories" className="hover:text-blue-100 transition-colors">
              Categories
            </Link>
            <Link to="/trending" className="hover:text-blue-100 transition-colors">
              Trending
            </Link>
            <Link to="/leaderboard" className="hover:text-blue-100 transition-colors">
              Leaderboard
            </Link>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
              Sign In
            </Button>
            <Button className="bg-white text-blue-700 hover:bg-blue-50">Join</Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100" />
            <Input
              type="search"
              placeholder="Search for deals..."
              className="pl-10 bg-blue-600/30 border-blue-400/30 text-white placeholder:text-blue-100 focus-visible:ring-blue-300"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden absolute left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 border-b border-blue-400/30 px-4 py-4 shadow-lg transition-all duration-300",
            isMenuOpen ? "top-full opacity-100" : "-top-96 opacity-0",
          )}
        >
          <nav className="flex flex-col space-y-4">
            <Link to="/categories" className="hover:text-blue-100 transition-colors">
              Categories
            </Link>
            <Link to="/trending" className="hover:text-blue-100 transition-colors">
              Trending
            </Link>
            <Link to="/leaderboard" className="hover:text-blue-100 transition-colors">
              Leaderboard
            </Link>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" className="flex-1 border-white text-white hover:bg-white hover:text-blue-700">
                Sign In
              </Button>
              <Button className="flex-1 bg-white text-blue-700 hover:bg-blue-50">Join</Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
