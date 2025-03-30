"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import {
  Dumbbell,
  Heart,
  Users,
  Brain,
  Zap,
  Award,
  Check,
  Clock,
  Star,
  Sparkles,
  ShieldCheck,
  Trophy,
  ArrowRight,
  Gauge,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"

// Define our offering types
type OfferingCategory = "services" | "facilities" | "programs"

type Offering = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: OfferingCategory
  highlights: string[]
  image?: string
}

export default function WhatWeOfferPage() {
  const [activeCategory, setActiveCategory] = useState<OfferingCategory>("services")
  const [expandedOffering, setExpandedOffering] = useState<string | null>(null)
  const [activeAdvantage, setActiveAdvantage] = useState<number>(0)
  const [isInView, setIsInView] = useState(false)

  const advantagesRef = useRef<HTMLDivElement>(null)

  // Combined offerings data
  const offerings: Offering[] = [
    // Services
    {
      id: "personal-training",
      title: "Personal Training",
      description: "One-on-one coaching tailored to your specific goals and fitness level.",
      icon: <Dumbbell className="h-5 w-5" />,
      category: "services",
      highlights: [
        "Customized workout plans",
        "Expert guidance on form",
        "Regular progress tracking",
        "Nutritional guidance",
      ],
      image: "/images/featuredservice.png",
    },
    {
      id: "group-classes",
      title: "Group Classes",
      description: "High-energy workouts in a motivating group environment.",
      icon: <Users className="h-5 w-5" />,
      category: "services",
      highlights: [
        "Variety of class styles",
        "All fitness levels welcome",
        "Supportive community",
        "Expert instructors",
      ],
      image: "/images/groupclasses.png",
    },
    {
      id: "nutrition-coaching",
      title: "Nutrition Coaching",
      description: "Expert guidance on nutrition to complement your fitness routine.",
      icon: <Heart className="h-5 w-5" />,
      category: "services",
      highlights: [
        "Personalized meal plans",
        "Supplement recommendations",
        "Habit formation coaching",
        "Body composition analysis",
      ],
      image: "/images/nutritioncoaching.jpg",
    },
    {
      id: "wellness-programs",
      title: "Wellness Programs",
      description: "Comprehensive programs addressing all aspects of health and wellbeing.",
      icon: <Brain className="h-5 w-5" />,
      category: "services",
      highlights: ["Stress management", "Sleep optimization", "Recovery techniques", "Mental performance"],
      image: "/images/recoveryarea.png",
    },

    // Facilities
    {
      id: "strength-zone",
      title: "Strength Zone",
      description: "State-of-the-art strength equipment for all your lifting needs.",
      icon: <Dumbbell className="h-5 w-5" />,
      category: "facilities",
      highlights: [
        "Free weights area",
        "Power racks and platforms",
        "Specialized machines",
        "Functional training equipment",
      ],
      image: "/images/featuredfacility.png",
    },
    {
      id: "cardio-deck",
      title: "Cardio Deck",
      description: "Premium cardio machines with integrated entertainment systems.",
      icon: <Heart className="h-5 w-5" />,
      category: "facilities",
      highlights: ["Treadmills and ellipticals", "Rowing machines", "Stair climbers", "Assault bikes"],
      image: "/images/cardiodeck.png",
    },
    {
      id: "studio-spaces",
      title: "Studio Spaces",
      description: "Dedicated spaces for group classes and specialized training.",
      icon: <Users className="h-5 w-5" />,
      category: "facilities",
      highlights: [
        "Multiple class studios",
        "Yoga and stretching area",
        "Boxing and martial arts zone",
        "Cycling studio",
      ],
      image: "/images/studiospaces.png",
    },
    {
      id: "recovery-area",
      title: "Recovery Area",
      description: "Specialized recovery equipment to help you bounce back faster.",
      icon: <Zap className="h-5 w-5" />,
      category: "facilities",
      highlights: ["Foam rolling station", "Massage therapy rooms", "Stretching area", "Cold plunge and sauna"],
      image: "/images/recoveryarea.png",
    },

    // Programs
    {
      id: "weight-loss",
      title: "Weight Loss",
      description: "Structured programs to help you achieve sustainable weight loss.",
      icon: <Award className="h-5 w-5" />,
      category: "programs",
      highlights: ["Customized workout plans", "Nutrition guidance", "Progress tracking", "Accountability coaching"],
      image: "/images/featuredprogram.jpg",
    },
    {
      id: "strength-building",
      title: "Strength Building",
      description: "Progressive resistance training to increase muscle and strength.",
      icon: <Trophy className="h-5 w-5" />,
      category: "programs",
      highlights: [
        "Periodized training plans",
        "Form technique coaching",
        "Progressive overload",
        "Recovery strategies",
      ],
      image: "/images/featuredfacility.png",
    },
    {
      id: "athletic-performance",
      title: "Athletic Performance",
      description: "Sport-specific training to enhance overall athletic performance.",
      icon: <Sparkles className="h-5 w-5" />,
      category: "programs",
      highlights: ["Speed and agility training", "Power development", "Sport-specific drills", "Injury prevention"],
      image: "/images/athleticperformance.png",
    },
    {
      id: "senior-fitness",
      title: "Senior Fitness",
      description: "Specialized programs for older adults focusing on mobility and strength.",
      icon: <ShieldCheck className="h-5 w-5" />,
      category: "programs",
      highlights: ["Balance improvement", "Functional strength", "Joint mobility", "Low-impact cardio"],
      image: "/images/groupclasses.png",
    },
  ]

  // Filter offerings by active category
  const filteredOfferings = offerings.filter((offering) => offering.category === activeCategory)

  // Handle offering expansion
  const toggleExpand = (id: string) => {
    if (expandedOffering === id) {
      setExpandedOffering(null)
    } else {
      setExpandedOffering(id)
    }
  }

  // Our unique selling points
  const uniqueSellingPoints = [
    {
      icon: <Clock className="h-6 w-6 text-black" />,
      title: "24/7 Access",
      description: "Our facilities are open around the clock, giving you the freedom to work out on your schedule.",
    },
    {
      icon: <Star className="h-6 w-6 text-black" />,
      title: "Expert Trainers",
      description: "Our certified trainers bring years of experience and specialized knowledge to every session.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-black" />,
      title: "Premium Equipment",
      description:
        "We invest in the best equipment to ensure you have access to top-quality tools for your fitness journey.",
    },
    {
      icon: <Users className="h-6 w-6 text-black" />,
      title: "Community Focus",
      description: "We foster a supportive community where members encourage each other to reach their goals.",
    },
  ]

  // Gym advantages data for the futuristic section
  const gymAdvantages = [
    {
      id: "performance",
      title: "Performance Tracking",
      description:
        "Our smart gym technology tracks your workouts and progress in real-time, providing insights to optimize your training.",
      icon: <Gauge className="h-6 w-6" />,
      stats: [
        { label: "Workout Efficiency", value: 94, unit: "%" },
        { label: "Progress Visibility", value: 100, unit: "%" },
        { label: "Goal Achievement", value: 87, unit: "%" },
      ],
      comparison: {
        bms: "Advanced AI-powered tracking",
        others: "Basic or no tracking",
      },
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "equipment",
      title: "Next-Gen Equipment",
      description:
        "Experience the latest in fitness technology with our premium equipment that's regularly updated and maintained.",
      icon: <Dumbbell className="h-6 w-6" />,
      stats: [
        { label: "Equipment Quality", value: 98, unit: "%" },
        { label: "Technology Integration", value: 95, unit: "%" },
        { label: "Variety", value: 92, unit: "%" },
      ],
      comparison: {
        bms: "Latest premium equipment",
        others: "Outdated or limited options",
      },
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "community",
      title: "Connected Community",
      description:
        "Join a thriving fitness community that supports and motivates you through our digital and in-person networks.",
      icon: <Users className="h-6 w-6" />,
      stats: [
        { label: "Member Satisfaction", value: 96, unit: "%" },
        { label: "Community Events", value: 24, unit: "monthly" },
        { label: "Support Rating", value: 4.9, unit: "/5" },
      ],
      comparison: {
        bms: "Vibrant, supportive community",
        others: "Impersonal environment",
      },
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "results",
      title: "Guaranteed Results",
      description:
        "Our scientifically-backed approach ensures you'll see measurable results faster than with traditional gyms.",
      icon: <Target className="h-6 w-6" />,
      stats: [
        { label: "Goal Achievement", value: 89, unit: "%" },
        { label: "Time Efficiency", value: 35, unit: "% faster" },
        { label: "Satisfaction Rate", value: 97, unit: "%" },
      ],
      comparison: {
        bms: "Data-driven results guarantee",
        others: "No guarantees or accountability",
      },
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  // Auto-rotate through advantages
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setActiveAdvantage((prev) => (prev + 1) % gymAdvantages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [gymAdvantages.length, isInView])

  // Check if advantages section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (advantagesRef.current) {
      observer.observe(advantagesRef.current)
    }

    return () => {
      if (advantagesRef.current) {
        observer.unobserve(advantagesRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        badge="Our Offerings"
        title="What We Offer"
        subtitle="Discover our comprehensive range of fitness services designed to help you achieve your health and wellness goals."
        backgroundImage="/images/whatweofferbackgroundimage.png"
      />

      {/* What Makes Us Different Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Why Choose Us"
            title="What Makes Us Different"
            description="At BMS Warehouse Gym, we stand out from the competition with our unique approach to fitness and wellness."
            centered={true}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {uniqueSellingPoints.map((point, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl p-8 shadow-sm border border-gray-100 overflow-hidden group"
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated corner accent */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-orange-500/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors duration-300">
                    {point.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Our Offerings - Redesigned */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Explore Our Offerings"
            title="Everything You Need For Your Fitness Journey"
            description="Browse through our comprehensive range of services, facilities, and programs."
            centered={true}
          />

          {/* Category Navigation - Redesigned as pills (hidden on mobile) */}
          <div className="hidden md:flex justify-center mb-16">
            <div className="inline-flex items-center gap-3">
              {(["services", "facilities", "programs"] as const).map((category) => (
                <button
                  key={category}
                  className={cn(
                    "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative",
                    activeCategory === category
                      ? "bg-orange-500 text-white shadow-sm"
                      : "bg-gray-100 text-black hover:bg-gray-200",
                  )}
                  onClick={() => {
                    setActiveCategory(category)
                    setExpandedOffering(null)
                  }}
                >
                  {activeCategory === category && (
                    <span className="absolute inset-0 rounded-full bg-orange-500 animate-pulse opacity-30"></span>
                  )}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Category Headers */}
          <div className="md:hidden space-y-8 mb-12">
            {(["services", "facilities", "programs"] as const).map((category) => (
              <div key={category} id={`mobile-${category}`} className="scroll-mt-24">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
                    {category === "services" ? (
                      <Users className="h-4 w-4" />
                    ) : category === "facilities" ? (
                      <Dumbbell className="h-4 w-4" />
                    ) : (
                      <Trophy className="h-4 w-4" />
                    )}
                  </span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
              </div>
            ))}
          </div>

          {/* Dynamic Showcase Layout */}
          <div className="relative">
            {/* Background Elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"></div>

            {/* Desktop Tabbed Content */}
            <div className="hidden md:block">
              {filteredOfferings.length > 0 && (
                <div className="mb-16 relative">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                      <div className="bg-gray-50 p-8 rounded-2xl relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-pink-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-pink-500/20 mb-6">
                            {filteredOfferings[0].icon}
                          </div>

                          <h3 className="text-2xl font-bold mb-4">{filteredOfferings[0].title}</h3>
                          <p className="text-gray-600 mb-6">{filteredOfferings[0].description}</p>

                          <div className="space-y-3 mb-6">
                            {filteredOfferings[0].highlights.map((highlight, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Check className="h-3 w-3 text-pink-500" />
                                </div>
                                <span className="text-gray-700">{highlight}</span>
                              </div>
                            ))}
                          </div>

                          <Link href="/contact">
                            <Button className="bg-pink-500 hover:bg-pink-600 text-white group">
                              Learn More{" "}
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="order-1 md:order-2">
                      <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                        <Image
                          src={filteredOfferings[0].image || "/images/featuredservice.png"}
                          alt={filteredOfferings[0].title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                          <span className="inline-block px-3 py-1 bg-pink-500 text-white text-xs font-medium rounded-full mb-2">
                            Featured{" "}
                            {activeCategory === "facilities"
                              ? "Facility"
                              : activeCategory.slice(0, -1).charAt(0).toUpperCase() +
                                activeCategory.slice(0, -1).slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Offerings - Horizontal Scrolling Cards */}
              <div className="relative">
                <h3 className="text-xl font-bold mb-6">More {activeCategory}</h3>

                <div className="flex overflow-x-auto pb-8 -mx-4 px-4 space-x-6 scrollbar-hide">
                  {filteredOfferings.slice(1).map((offering) => (
                    <div
                      key={offering.id}
                      className="flex-shrink-0 w-[280px] bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative h-40 w-full">
                        <Image
                          src={offering.image || "/placeholder.svg?height=300&width=400"}
                          alt={offering.title}
                          fill
                          className="object-cover"
                          sizes="280px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                            {offering.icon}
                          </div>
                          <h4 className="font-bold">{offering.title}</h4>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{offering.description}</p>

                        <Link href={`/contact?service=${offering.id}`}>
                          <Button variant="outline" size="sm" className="w-full border-gray-200">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}

                  {/* View All Card */}
                  <div className="flex-shrink-0 w-[280px] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center p-8">
                    <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                      <ArrowRight className="h-5 w-5 text-pink-500" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">View All {activeCategory}</h4>
                    <p className="text-gray-600 text-sm text-center mb-4">
                      Explore our complete range of {activeCategory}
                    </p>
                    <Link href="/contact">
                      <Button variant="outline" size="sm" className="border-gray-200">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Linear Layout */}
            <div className="md:hidden space-y-16">
              {/* Services Section */}
              <div className="space-y-8">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Users className="h-5 w-5 mr-2" /> Services
                </h3>

                {offerings
                  .filter((o) => o.category === "services")
                  .map((offering, index) => (
                    <div
                      key={offering.id}
                      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={offering.image || "/placeholder.svg?height=300&width=600"}
                          alt={offering.title}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-full bg-pink-500/80 flex items-center justify-center flex-shrink-0">
                              {offering.icon}
                            </div>
                            <h4 className="font-bold text-white text-lg">{offering.title}</h4>
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="text-gray-600 mb-4">{offering.description}</p>

                        <div className="space-y-2 mb-5">
                          {offering.highlights.slice(0, 2).map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="h-3 w-3 text-pink-500" />
                              </div>
                              <span className="text-gray-700 text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        <Link href={`/contact?service=${offering.id}`}>
                          <Button variant="outline" size="sm" className="w-full border-gray-200">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Facilities Section */}
              <div className="space-y-8">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Dumbbell className="h-5 w-5 mr-2" /> Facilities
                </h3>

                {offerings
                  .filter((o) => o.category === "facilities")
                  .map((offering, index) => (
                    <div
                      key={offering.id}
                      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={offering.image || "/placeholder.svg?height=300&width=600"}
                          alt={offering.title}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-full bg-pink-500/80 flex items-center justify-center flex-shrink-0">
                              {offering.icon}
                            </div>
                            <h4 className="font-bold text-white text-lg">{offering.title}</h4>
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="text-gray-600 mb-4">{offering.description}</p>

                        <div className="space-y-2 mb-5">
                          {offering.highlights.slice(0, 2).map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="h-3 w-3 text-pink-500" />
                              </div>
                              <span className="text-gray-700 text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        <Link href={`/contact?service=${offering.id}`}>
                          <Button variant="outline" size="sm" className="w-full border-gray-200">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Programs Section */}
              <div className="space-y-8">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Trophy className="h-5 w-5 mr-2" /> Programs
                </h3>

                {offerings
                  .filter((o) => o.category === "programs")
                  .map((offering, index) => (
                    <div
                      key={offering.id}
                      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={offering.image || "/placeholder.svg?height=300&width=600"}
                          alt={offering.title}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-full bg-pink-500/80 flex items-center justify-center flex-shrink-0">
                              {offering.icon}
                            </div>
                            <h4 className="font-bold text-white text-lg">{offering.title}</h4>
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="text-gray-600 mb-4">{offering.description}</p>

                        <div className="space-y-2 mb-5">
                          {offering.highlights.slice(0, 2).map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="h-3 w-3 text-pink-500" />
                              </div>
                              <span className="text-gray-700 text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        <Link href={`/contact?service=${offering.id}`}>
                          <Button variant="outline" size="sm" className="w-full border-gray-200">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The BMS Advantage - Simplified Redesign */}
      <section className="py-24 bg-gray-50" ref={advantagesRef}>
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="The BMS Advantage"
            title="Advanced Fitness Technology"
            description="Experience the future of fitness with our innovative technology and data-driven approach."
            centered={true}
          />

          <div className="mt-16 grid md:grid-cols-2 gap-12">
            {/* Left side - Advantages */}
            <div className="space-y-8">
              <div
                className={cn(
                  "bg-white rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-md",
                )}
                onClick={() => setActiveAdvantage(0)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 flex-shrink-0">
                    <Gauge className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Performance Tracking</h3>
                    <p className="text-gray-600">
                      Our smart gym technology tracks your workouts and progress in real-time, providing insights to
                      optimize your training.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "bg-white rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-md",
                )}
                onClick={() => setActiveAdvantage(3)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 flex-shrink-0">
                    <Target className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Guaranteed Results</h3>
                    <p className="text-gray-600">
                      Our scientifically-backed approach ensures you'll see measurable results faster than with
                      traditional gyms.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "bg-white rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-md",
                )}
                onClick={() => setActiveAdvantage(2)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 flex-shrink-0">
                    <Zap className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Recovery Technology</h3>
                    <p className="text-gray-600">
                      Advanced recovery tools and techniques to help you bounce back faster and prevent injuries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Details */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Image */}
              <div className="relative h-64">
                <Image
                  src="/images/advancedfitnesstechnology.png"
                  alt="Advanced fitness technology"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="inline-block px-3 py-1 bg-pink-500 text-white text-xs font-medium rounded-full">
                    Data-Driven Fitness
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Technology Benefits</h3>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-black mb-1">94%</div>
                    <div className="text-xs text-gray-500">Workout Efficiency</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-black mb-1">89%</div>
                    <div className="text-xs text-gray-500">Goal Achievement</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-black mb-1">35%</div>
                    <div className="text-xs text-gray-500">Faster Results</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  Our integrated fitness technology platform helps you track progress, optimize workouts, and achieve
                  your goals faster through personalized insights and recommendations.
                </p>

                <Link href="/memberships">
                  <Button className="w-full border border-black text-black bg-transparent hover:bg-pink-500 hover:text-white hover:border-pink-500 font-medium group">
                    Experience the Difference
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to experience what we offer?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join BMS Warehouse Gym today and transform your fitness with our state-of-the-art facilities, expert
            trainers, and supportive community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/memberships">
              <Button className="bg-black text-white hover:bg-black/80 font-medium group">
                View Membership Plans
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-white text-black hover:bg-gray-100 font-medium group">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

