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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null)

  const advantagesRef = useRef<HTMLDivElement>(null)

  // Combined offerings data
  const offerings: Offering[] = [
    // Services
    {
      id: "personal-training",
      title: "Personal Training",
      description: "Get a dedicated coach who'll work with you one-on-one to crush your fitness goals. Whether you're just starting out or looking to level up, we've got your back.",
      icon: <Dumbbell className="h-5 w-5" />,
      category: "services",
      highlights: [
        "Workout plans built just for you",
        "Expert guidance to perfect your form",
        "Track your progress every step of the way",
        "Smart nutrition tips that actually work",
      ],
      image: "/images/featuredservice.png",
    },
    {
      id: "group-classes",
      title: "Group Classes",
      description: "Join the fun! Our high-energy group sessions are where fitness meets friendship. You'll push harder and achieve more with an amazing crew by your side.",
      icon: <Users className="h-5 w-5" />,
      category: "services",
      highlights: [
        "Mix it up with different class styles",
        "Perfect for all fitness levels",
        "Make friends who motivate you",
        "Learn from our passionate instructors",
      ],
      image: "/images/groupclasses.png",
    },
    {
      id: "nutrition-coaching",
      title: "Nutrition Coaching",
      description: "Let's make healthy eating simple and enjoyable. Our nutrition experts will help you fuel your workouts and feel amazing, without giving up the foods you love.",
      icon: <Heart className="h-5 w-5" />,
      category: "services",
      highlights: [
        "Custom meal plans that fit your lifestyle",
        "Smart supplement advice when you need it",
        "Build habits that actually stick",
        "Regular body composition check-ins",
      ],
      image: "/images/nutritioncoaching.jpg",
    },
    {
      id: "wellness-programs",
      title: "Wellness Programs",
      description: "Because fitness is more than just working out. We'll help you master stress, sleep better, and feel incredible - inside and out.",
      icon: <Brain className="h-5 w-5" />,
      category: "services",
      highlights: [
        "Beat stress with proven techniques",
        "Get the quality sleep you deserve",
        "Recover like a pro athlete",
        "Boost your mental game",
      ],
      image: "/images/recoveryarea.png",
    },

    // Facilities
    {
      id: "strength-zone",
      title: "Strength Zone",
      description: "Welcome to your playground! Our strength area is packed with top-notch equipment that'll help you build muscle, gain strength, and feel powerful.",
      icon: <Dumbbell className="h-5 w-5" />,
      category: "facilities",
      highlights: [
        "Everything you need for free weights",
        "Power racks that'll make you smile",
        "Machines for every muscle group",
        "Functional training tools galore",
      ],
      image: "/images/featuredfacility.png",
    },
    {
      id: "cardio-deck",
      title: "Cardio Deck",
      description: "Make cardio fun again! Our machines come with entertainment systems to keep you engaged while you crush those calories.",
      icon: <Heart className="h-5 w-5" />,
      category: "facilities",
      highlights: [
        "Latest treadmills and ellipticals",
        "Row your way to fitness",
        "Climb to new heights",
        "Challenge yourself on our assault bikes",
      ],
      image: "/images/cardiodeck.png",
    },
    {
      id: "studio-spaces",
      title: "Studio Spaces",
      description: "Find your perfect workout spot! Our versatile studios are ready for everything from high-energy classes to peaceful yoga sessions.",
      icon: <Users className="h-5 w-5" />,
      category: "facilities",
      highlights: [
        "Spacious studios for every class",
        "Zen zones for yoga and stretching",
        "Get ready to box and kick",
        "Spin your way to fitness",
      ],
      image: "/images/studiospaces.png",
    },
    {
      id: "recovery-area",
      title: "Recovery Area",
      description: "Because rest days are just as important! Treat your body right with our premium recovery tools and spaces.",
      icon: <Zap className="h-5 w-5" />,
      category: "facilities",
      highlights: [
        "Roll away the tension",
        "Treat yourself to a massage",
        "Stretch it out in comfort",
        "Rejuvenate in our cold plunge and sauna",
      ],
      image: "/images/recoveryarea.png",
    },

    // Programs
    {
      id: "weight-loss",
      title: "Weight Loss",
      description: "Ready to transform? Our proven approach helps you lose weight and keep it off - no crash diets or crazy workouts required.",
      icon: <Award className="h-5 w-5" />,
      category: "programs",
      highlights: [
        "Workouts that work for you",
        "Real nutrition that makes sense",
        "See your progress in real-time",
        "We'll keep you on track",
      ],
      image: "/images/featuredprogram.jpg",
    },
    {
      id: "strength-building",
      title: "Strength Building",
      description: "Whether you want to lift heavier, look better, or feel stronger - we'll help you build muscle the right way.",
      icon: <Trophy className="h-5 w-5" />,
      category: "programs",
      highlights: [
        "Training plans that evolve with you",
        "Master proper form and technique",
        "Get stronger every week",
        "Recover like a champion",
      ],
      image: "/images/featuredfacility.png",
    },
    {
      id: "athletic-performance",
      title: "Athletic Performance",
      description: "Take your game to the next level! Whether you're a weekend warrior or competitive athlete, we'll help you perform at your peak.",
      icon: <Sparkles className="h-5 w-5" />,
      category: "programs",
      highlights: [
        "Get faster and more agile",
        "Build explosive power",
        "Sport-specific training that works",
        "Stay injury-free and ready to play",
      ],
      image: "/images/athleticperformance.png",
    },
    {
      id: "senior-fitness",
      title: "Senior Fitness",
      description: "Age is just a number! Our senior programs focus on keeping you strong, mobile, and independent - while having fun along the way.",
      icon: <ShieldCheck className="h-5 w-5" />,
      category: "programs",
      highlights: [
        "Move with confidence and balance",
        "Stay strong for daily activities",
        "Keep your joints happy and healthy",
        "Heart-healthy cardio you'll enjoy",
      ],
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
      description: "Work out whenever it suits you! Our doors are always open, because we know life doesn't stick to a 9-5 schedule.",
    },
    {
      icon: <Star className="h-6 w-6 text-black" />,
      title: "Expert Trainers",
      description: "Train with the best! Our certified coaches bring years of experience and a passion for helping you succeed.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-black" />,
      title: "Premium Equipment",
      description: "We've invested in the best gear out there, so you can focus on what matters - getting results and having fun doing it.",
    },
    {
      icon: <Users className="h-6 w-6 text-black" />,
      title: "Community Focus",
      description: "Join a family that celebrates your wins! Our members support each other, making every workout more enjoyable and motivating.",
    },
  ]

  // Gym advantages data for the futuristic section
  const gymAdvantages = [
    {
      id: "performance",
      title: "Performance Tracking",
      description: "See your progress in real-time! Our smart tech keeps tabs on your workouts, showing you exactly how you're improving and what to do next.",
      icon: <Gauge className="h-6 w-6" />,
      stats: [
        { label: "Workout Efficiency", value: 94, unit: "%" },
        { label: "Progress Visibility", value: 100, unit: "%" },
        { label: "Goal Achievement", value: 87, unit: "%" },
      ],
      comparison: {
        bms: "Smart tracking that actually helps you improve",
        others: "Basic or no tracking at all",
      },
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "equipment",
      title: "Next-Gen Equipment",
      description: "Train with the best! Our gear is always top-notch and regularly updated, so you get the most out of every workout.",
      icon: <Dumbbell className="h-6 w-6" />,
      stats: [
        { label: "Equipment Quality", value: 98, unit: "%" },
        { label: "Technology Integration", value: 95, unit: "%" },
        { label: "Variety", value: 92, unit: "%" },
      ],
      comparison: {
        bms: "The latest and greatest in fitness tech",
        others: "Old equipment that holds you back",
      },
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "community",
      title: "Connected Community",
      description: "Join a fitness family that gets it! Connect with like-minded people who'll cheer you on, both in the gym and online.",
      icon: <Users className="h-6 w-6" />,
      stats: [
        { label: "Member Satisfaction", value: 96, unit: "%" },
        { label: "Community Events", value: 24, unit: "monthly" },
        { label: "Support Rating", value: 4.9, unit: "/5" },
      ],
      comparison: {
        bms: "A real community that feels like family",
        others: "Just another anonymous gym",
      },
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "results",
      title: "Guaranteed Results",
      description: "We don't just promise results - we deliver them! Our proven approach helps you reach your goals faster than traditional gyms.",
      icon: <Target className="h-6 w-6" />,
      stats: [
        { label: "Goal Achievement", value: 89, unit: "%" },
        { label: "Time Efficiency", value: 35, unit: "% faster" },
        { label: "Satisfaction Rate", value: 97, unit: "%" },
      ],
      comparison: {
        bms: "Real results backed by real data",
        others: "No guarantees, just guesswork",
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

  // Function to handle dialog open/close
  const handleLearnMore = (offering: Offering) => {
    setSelectedOffering(offering)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        badge="What We Offer"
        title="Everything You Need to Succeed"
        subtitle="From state-of-the-art equipment to expert guidance, we've got all the tools to help you crush your fitness goals."
        backgroundImage="/images/backgrounds/whatweofferbackgroundimage.webp"
      />

      {/* What Makes Us Different Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Why We're Different"
            title="What Sets Us Apart"
            description="There's something special about BMS Warehouse Gym. Here's what makes us your perfect fitness partner."
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
            badge="Our Services"
            title="Everything You Need to Succeed"
            description="From personal training to group classes, we've got all the tools to help you crush your fitness goals."
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

                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-gray-200"
                          onClick={() => handleLearnMore(offering)}
                        >
                          Learn More
                        </Button>
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
            badge="Next-Level Training"
            title="Train Smarter, Not Just Harder"
            description="Get access to cutting-edge fitness tech that helps you track progress and maximize results."
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

      {/* Dialog for offering details */}
      <Dialog open={selectedOffering !== null} onOpenChange={() => setSelectedOffering(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedOffering && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    {selectedOffering.icon}
                  </div>
                  <DialogTitle className="text-2xl font-bold">{selectedOffering.title}</DialogTitle>
                </div>
                <DialogDescription className="text-base text-gray-600">
                  {selectedOffering.description}
                </DialogDescription>
              </DialogHeader>

              <div className="relative mt-4">
                <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
                  <Image
                    src={selectedOffering.image || "/placeholder.svg?height=300&width=600"}
                    alt={selectedOffering.title}
                    fill
                    className="object-cover"
                    sizes="600px"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Key Features:</h4>
                  <div className="grid gap-3">
                    {selectedOffering.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-pink-500" />
                        </div>
                        <span className="text-gray-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/contact">
                    <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

