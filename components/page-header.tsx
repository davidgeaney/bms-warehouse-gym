"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

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

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (descRef.current) observer.unobserve(descRef.current)
    }
  }, [])

  return (
    <section className={cn("py-32 bg-white border-b border-gray-100", className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-6 inline-block">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full absolute -left-6 -top-6"></div>
            <span className="relative z-10 text-blue-500 uppercase tracking-wider font-medium">// Explore</span>
          </div>
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            {title}
          </h1>
          {description && (
            <p
              ref={descRef}
              className="text-lg md:text-xl text-gray-500 max-w-3xl opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200"
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

