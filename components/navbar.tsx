"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronRight, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-black/90 backdrop-blur-md shadow-lg" 
            : "py-2"
        )}
      >
        <div className="container mx-auto px-4 h-[60px] md:h-[72px] flex items-center">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link 
              href="/" 
              onClick={scrollToTop} 
              className="flex items-center gap-2 md:gap-3 group"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                <div className="relative bg-black/50 rounded-full p-1.5 md:p-2">
                  <Activity className="h-5 w-5 md:h-6 md:w-6 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight">
                <span className="text-orange-500 group-hover:text-orange-400 transition-colors">B</span>
                <span className="text-pink-500 group-hover:text-pink-400 transition-colors">M</span>
                <span className="text-blue-500 group-hover:text-blue-400 transition-colors">S</span>
                <span className="text-white group-hover:text-gray-300 transition-colors hidden md:inline"> Warehouse Gym</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {[
                { href: "/what-we-offer", label: "What We Offer" },
                { href: "/classes", label: "Classes" },
                { href: "/about", label: "About Us" },
                { href: "/memberships", label: "Memberships" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 group"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  onMouseEnter={() => setActiveLink(item.href)}
                  onMouseLeave={() => setActiveLink(null)}
                >
                  <span className="relative z-10 text-white/90 group-hover:text-white transition-colors duration-300">
                    {item.label}
                  </span>
                  <div 
                    className={cn(
                      "absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300",
                      activeLink === item.href && "opacity-100"
                    )} 
                  />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <Link href="/memberships" className="hidden md:block">
              <Button 
                className="relative overflow-hidden group bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 hover:from-orange-600 hover:via-pink-600 hover:to-blue-600 text-white font-medium rounded-full px-6 py-2 transition-all duration-300 shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  START YOUR JOURNEY
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div 
                  className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`
                  }}
                />
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden relative z-50 p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-all duration-500 ease-in-out md:hidden",
          mobileMenuOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-full"
        )}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
        <div className="relative h-full flex flex-col">

          {/* Mobile Menu Content */}
          <div className="flex-1 flex flex-col justify-center items-center space-y-8 p-4">
            {[
              { href: "/what-we-offer", label: "What We Offer" },
              { href: "/classes", label: "Classes" },
              { href: "/about", label: "About Us" },
              { href: "/memberships", label: "Memberships" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-2xl font-medium text-white/80 hover:text-white transition-colors duration-300"
                onClick={() => {
                  setMobileMenuOpen(false)
                  scrollToTop()
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4">
            <Button 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full py-3 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              START YOUR JOURNEY
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

