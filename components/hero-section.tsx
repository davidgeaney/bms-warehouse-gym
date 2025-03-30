"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight, X, Play } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [showTourModal, setShowTourModal] = useState(false)

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

    if (headingRef.current) observer.observe(headingRef.current)
    if (textRef.current) observer.observe(textRef.current)
    if (ctaRef.current) observer.observe(ctaRef.current)

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current)
      if (textRef.current) observer.unobserve(textRef.current)
      if (ctaRef.current) observer.unobserve(ctaRef.current)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30 z-10"></div>
          <Image
            src="/images/bmsheroimage.png"
            alt="Fitness athlete running"
            fill
            className="object-cover brightness-75"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 z-20 pt-8 md:pt-16 lg:pt-20">
        <div className="max-w-3xl">
          <h1
            ref={headingRef}
            className="text-3xl md:text-5xl lg:text-7xl font-bold leading-[1.1] md:leading-[1.2] mb-4 md:mb-8 lg:mb-10 opacity-0 translate-y-8 transition-all duration-700 ease-out text-white drop-shadow-lg"
          >
            Unleash Your
            <br />
            <span className="text-orange-500 drop-shadow-lg">Body,</span>
            <span className="text-pink-500 drop-shadow-lg">Mind,</span>
            <span className="text-blue-500 drop-shadow-lg">Soul</span>
          </h1>

          <p
            ref={textRef}
            className="text-sm md:text-lg lg:text-xl text-white/90 mb-6 md:mb-10 lg:mb-12 max-w-2xl opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200 drop-shadow-md"
          >
            At BMS Warehouse Gym, fitness is more than just a workout&mdash;it&apos;s a journey. We blend training, mindset, and community to strengthen your body, mind, and soul. Come experience fitness beyond the weights!
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col md:flex-row gap-3 md:gap-8 opacity-0 translate-y-8 transition-all duration-700 ease-out delay-400"
          >
            <Link href="/what-we-offer" className="w-full md:w-auto">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full px-4 md:px-8 lg:px-10 py-3 md:py-5 lg:py-6 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg text-sm md:text-base">
                LEARN MORE
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <button
              onClick={() => setShowTourModal(true)}
              className="w-full md:w-auto bg-white/5 hover:bg-white/10 rounded-full px-4 md:px-8 lg:px-10 py-3 md:py-5 lg:py-6 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span className="font-medium text-sm md:text-base text-white group-hover:text-pink-500 duration-300">Join Today</span>
              <ArrowRight className="h-4 w-4 text-white group-hover:text-pink-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-4 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-20 opacity-0 animate-fade-in"
        style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-white/80 font-medium drop-shadow-md">Scroll Down</span>
          <div className="w-0.5 h-6 md:h-10 bg-white/50 animate-pulse"></div>
        </div>
      </div>

      {/* 360 Tour Modal */}
      {showTourModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full">
            {/* Close button */}
            <button
              onClick={() => setShowTourModal(false)}
              className="absolute -top-12 right-0 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Video container */}
            <div className="aspect-video w-full bg-gray-900 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-orange-500/90 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <Play className="h-10 w-10 text-white fill-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

