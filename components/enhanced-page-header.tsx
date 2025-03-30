"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface EnhancedPageHeaderProps {
  badge: string
  title: string
  highlightedWord?: string
  description: string
  className?: string
  align?: "left" | "center"
  titleSize?: "default" | "large"
}

export function EnhancedPageHeader({
  badge,
  title,
  highlightedWord,
  description,
  className,
  align = "center",
  titleSize = "default",
}: EnhancedPageHeaderProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (titleRef.current) observer.observe(titleRef.current)
    if (descRef.current) observer.observe(descRef.current)
    if (badgeRef.current) observer.observe(badgeRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (descRef.current) observer.unobserve(descRef.current)
      if (badgeRef.current) observer.unobserve(badgeRef.current)
    }
  }, [])

  const alignClass = align === "center" ? "text-center mx-auto" : "text-left"
  const titleSizeClass = titleSize === "large" ? "text-5xl md:text-7xl" : "text-4xl md:text-6xl"

  // Split the title if there's a highlighted word
  let titleParts: React.ReactNode[] = [title]
  if (highlightedWord && title.includes(highlightedWord)) {
    const parts = title.split(highlightedWord)
    titleParts = [
      parts[0],
      <span key="highlight" className="text-primary">
        {highlightedWord}
      </span>,
      parts[1],
    ]
  }

  return (
    <section className={cn("py-24 bg-white", className)}>
      <div className="container mx-auto px-4">
        <div className={cn("max-w-4xl", alignClass)}>
          <div
            ref={badgeRef}
            className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 opacity-0 translate-y-4 transition-all duration-700 ease-out"
          >
            {badge}
          </div>

          <h1
            ref={titleRef}
            className={cn(
              titleSizeClass,
              "font-bold mb-6 opacity-0 translate-y-8 transition-all duration-700 ease-out",
            )}
          >
            {titleParts}
          </h1>

          <p
            ref={descRef}
            className="text-lg md:text-xl text-gray-600 max-w-3xl opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200"
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}

