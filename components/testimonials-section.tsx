"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

type Testimonial = {
  id: number
  name: string
  role: string
  quote: string
  rating: number
  category: "weight-loss" | "strength" | "fitness" | "wellness"
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rachel Connolly",
      role: "Member since 2024",
      quote:
        "An extremely welcoming and friendly gym ran by the most motivating and inspiring staff. Training in BMS is part of my day I always look forward to and couldn't be without!",
      rating: 5,
      category: "fitness",
    },
    {
      id: 2,
      name: "Dermot Lawless",
      role: "Member since 2025",
      quote:
        "I've been a member at BMS Warehouse Gym for 6 months and can't recommend them highly enough. I've lost a stone and half, and in my 40s am now fitter and stronger than I have ever been thanks to Seamus, Patrick, Eimear and all the dedicated BMS team. Without a doubt BMS have the best gym facilities in Ireland, with classes for all abilities and goals, and a welcoming and supportive community.",
      rating: 5,
      category: "weight-loss",
    },
    {
      id: 3,
      name: "James McKee",
      role: "Member since 2025",
      quote:
        "The best gym around. For a small town, BMS has everything and more than you'd expect to find in any gym in a large city. Great atmosphere and staff are so friendly. Couldn't recommend it more. I'd give more stars if that was an option.",
      rating: 5,
      category: "fitness",
    },
    {
      id: 4,
      name: "Kate Mullins",
      role: "Member since 2024",
      quote:
        "BMS is a brilliant gym. Lorraine and Seamie provide an amazing facility and are forever innovating to ensure all their members are getting the most out of their experience. No matter what your fitness or health goals are, you will be tailored to here. I couldn't speak highly enough of how good the classes are, and all the trainers go above and beyond what I've experienced in any previous gyms. There's always a lovely friendly and welcoming atmosphere and all the equipment you could possibly need.",
      rating: 5,
      category: "fitness",
    },
    {
      id: 5,
      name: "Deborah Dawson",
      role: "Member since 2024",
      quote:
        "Fantastic gym, fantastic equipment, brilliant classes with amazing coaches who help and guide u through all the workouts, nothing is ever a problem, my fitness has improved hugely since I joined BMS and I always come out of BMS smiling.",
      rating: 5,
      category: "fitness",
    },
  ]

  const filteredTestimonials = selectedCategory
    ? testimonials.filter((t) => t.category === selectedCategory)
    : testimonials

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === filteredTestimonials.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  // Reset active index when filtered testimonials change
  useEffect(() => {
    setActiveIndex(0)
  }, [selectedCategory])

  // Autoplay functionality
  useEffect(() => {
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        nextSlide()
      }, 6000)
    }

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
        autoplayRef.current = null
      }
    }

    startAutoplay()

    // Pause autoplay on hover
    const sliderElement = sliderRef.current
    if (sliderElement) {
      sliderElement.addEventListener("mouseenter", stopAutoplay)
      sliderElement.addEventListener("mouseleave", startAutoplay)
    }

    return () => {
      stopAutoplay()
      if (sliderElement) {
        sliderElement.removeEventListener("mouseenter", stopAutoplay)
        sliderElement.removeEventListener("mouseleave", startAutoplay)
      }
    }
  }, [filteredTestimonials.length])

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Real Stories"
          title="Hear From Our Members"
          description="These are real people sharing their journey with us. Their success could be your story too!"
          centered={true}
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              selectedCategory === null
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
            )}
            onClick={() => setSelectedCategory(null)}
          >
            All Stories
          </button>

          <button
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              selectedCategory === "weight-loss"
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
            )}
            onClick={() => setSelectedCategory("weight-loss")}
          >
            Weight Loss
          </button>

          <button
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              selectedCategory === "strength"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
            )}
            onClick={() => setSelectedCategory("strength")}
          >
            Strength
          </button>

          <button
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              selectedCategory === "fitness"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
            )}
            onClick={() => setSelectedCategory("fitness")}
          >
            Fitness
          </button>

          <button
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              selectedCategory === "wellness"
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
            )}
            onClick={() => setSelectedCategory("wellness")}
          >
            Wellness
          </button>
        </div>

        {/* Testimonials Slider */}
        <div ref={sliderRef} className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {filteredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 h-12 w-12 text-orange-500/20" />
                      <div className="pt-6">
                        <p className="text-lg md:text-xl leading-relaxed mb-6">{testimonial.quote}</p>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-black">{testimonial.name}</h3>
                            <p className="text-gray-500">{testimonial.role}</p>
                          </div>

                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < testimonial.rating ? "text-orange-500 fill-orange-500" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <span className="inline-block px-3 py-1 bg-orange-500/10 text-black text-xs font-medium rounded-full">
                            {testimonial.category.charAt(0).toUpperCase() + testimonial.category.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-orange-500 hover:text-white transition-colors z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-6 w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-orange-500 hover:text-white transition-colors z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-orange-500 w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

