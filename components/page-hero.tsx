"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface PageHeroProps {
  badge: string
  title: string
  subtitle: string
  highlightWord?: string
  backgroundImage?: string
  className?: string
}

export function PageHero({
  badge,
  title,
  subtitle,
  highlightWord,
  backgroundImage = "/placeholder.svg?height=1080&width=1920",
  className,
}: PageHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
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
    if (subtitleRef.current) observer.observe(subtitleRef.current)
    if (badgeRef.current) observer.observe(badgeRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (subtitleRef.current) observer.unobserve(subtitleRef.current)
      if (badgeRef.current) observer.unobserve(badgeRef.current)
    }
  }, [])

  // Format title with highlighted word if provided
  let formattedTitle = title
  if (highlightWord && title.includes(highlightWord)) {
    const parts = title.split(highlightWord)
    formattedTitle = (
      <>
        {parts[0]}
        <span className="text-primary">{highlightWord}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section className={cn("relative pt-40 pb-24 overflow-hidden", className)}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image src={backgroundImage || "/placeholder.svg"} alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            ref={badgeRef}
            className="inline-block bg-blue-500/90 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 opacity-0 translate-y-4 transition-all duration-700 ease-out"
          >
            {badge}
          </div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6 text-white opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            {formattedTitle}
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200"
          >
            {subtitle}
          </p>

          {/* Decorative Element */}
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-10"></div>
        </div>
      </div>

      {/* Decorative Shape */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-white"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
      ></div>
    </section>
  )
}

