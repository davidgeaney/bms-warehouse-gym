"use client"

import { useEffect } from "react"

export function ClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Handle smooth scrolling on the client side only
    const handleScroll = () => {
      document.documentElement.style.scrollBehavior = "smooth"
    }

    // Add the event listener
    window.addEventListener("scroll", handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return <>{children}</>
} 