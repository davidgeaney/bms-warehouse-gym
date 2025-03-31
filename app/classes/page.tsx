"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import { ChevronRight, Clock, Dumbbell, Users, Flame, Heart, Zap, Search, X, Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ClassDetailModal } from "@/components/class-detail-modal"
import { TimetableModal } from "@/components/timetable-modal"

// Class type definition
type ClassType = {
  id: number
  name: string
  description: string
  duration: string
  intensity: "Low" | "Medium" | "High"
  trainer: string
  image: string
  category: "Strength" | "Cardio" | "Flexibility" | "Mind & Body" | "HIIT"
  schedule: {
    day: string
    time: string
  }[]
  benefits?: string[]
}

export default function ClassesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const featuredClassRef = useRef<HTMLDivElement>(null)

  // Sample class data
  const classes: ClassType[] = [
    {
      id: 1,
      name: "FX Training",
      description: "Our flagship Functional Fitness Class suitable for all abilities. Join our exclusive group training program designed to prepare you for Functional Fitness races like Hyrox, BUA, and Dekafit.",
      duration: "60 min",
      intensity: "Medium",
      trainer: "BMS Team",
      image: "/images/fxtraining.png",
      category: "Strength",
      schedule: [
        { day: "Monday", time: "6:00 PM" },
        { day: "Wednesday", time: "6:00 PM" },
        { day: "Friday", time: "6:00 PM" },
      ],
      benefits: ["Build strength and endurance", "Improve mental toughness", "Prepare for Functional Fitness races"],
    },
    {
      id: 2,
      name: "Workout of the Day",
      description: "Trainer's Choice. Get a full body surprise written by our expert coaches. Suitable for all fitness levels.",
      duration: "45 min",
      intensity: "Medium",
      trainer: "BMS Coaches",
      image: "/images/workoutoftheday.png",
      category: "HIIT",
      schedule: [
        { day: "Tuesday", time: "5:30 PM" },
        { day: "Thursday", time: "5:30 PM" },
      ],
      benefits: ["Full body workout", "Suitable for all fitness levels"],
    },
    {
      id: 3,
      name: "Legs Bums & Tums",
      description: "A 45-minute group exercise workout focusing on legs, glutes, and stomach areas. Suitable for all fitness levels.",
      duration: "45 min",
      intensity: "Medium",
      trainer: "BMS Team",
      image: "/images/legsbumstums.png",
      category: "Strength",
      schedule: [
        { day: "Monday", time: "7:00 PM" },
        { day: "Wednesday", time: "7:00 PM" },
      ],
      benefits: ["Toning and tightening", "Focus on legs, glutes, and core"],
    },
    {
      id: 4,
      name: "PUMP",
      description: "A barbell group session designed to work every major muscle group. This strength-developing workout uses barbells and plates for exercises such as squats, presses, lifts, and curls.",
      duration: "30 min",
      intensity: "High",
      trainer: "BMS Team",
      image: "/images/PUMP.png",
      category: "Strength",
      schedule: [
        { day: "Thursday", time: "9:45 AM" },
        { day: "Saturday", time: "8:00 AM" },
      ],
      benefits: ["Strength development", "Lean and toned body"],
    },
    {
      id: 5,
      name: "CardioRevive",
      description:
        "Are you ready to take charge of your cardiovascular health and embark on a fitness journey that revitalizes your heart? Join us for CardioRevive, a dynamic and empowering fitness class designed to elevate your cardiovascular fitness, enhance endurance, and strengthen your heart muscles.",
      duration: "30 min",
      intensity: "High",
      trainer: "Chris Taylor",
      image: "/images/cardiorevive.png",
      category: "HIIT",
      schedule: [
        { day: "Monday", time: "12:30 PM" },
        { day: "Wednesday", time: "12:30 PM" },
        { day: "Friday", time: "12:30 PM" },
      ],
      benefits: [
        "Time-efficient workout",
        "Increased metabolic rate",
        "Improved aerobic and anaerobic capacity",
        "No equipment needed",
      ],
    },
    {
      id: 6,
      name: "Power Lifting",
      description:
        "Build strength and power with our comprehensive powerlifting program. Focus on the big three: squat, bench press, and deadlift under expert guidance.",
      duration: "60 min",
      intensity: "High",
      trainer: "Mike Johnson",
      image: "/placeholder.svg?height=400&width=600",
      category: "Strength",
      schedule: [
        { day: "Monday", time: "6:00 AM" },
        { day: "Wednesday", time: "6:00 AM" },
        { day: "Friday", time: "6:00 AM" },
      ],
      benefits: [
        "Increased strength and muscle mass",
        "Improved bone density",
        "Enhanced athletic performance",
        "Better body composition",
      ],
    },
    {
      id: 7,
      name: "HIIT Circuit",
      description:
        "High-Intensity Interval Training that combines strength and cardio exercises in a circuit format. Maximize calorie burn and improve conditioning.",
      duration: "45 min",
      intensity: "High",
      trainer: "Sarah Williams",
      image: "/placeholder.svg?height=400&width=600",
      category: "HIIT",
      schedule: [
        { day: "Tuesday", time: "5:30 PM" },
        { day: "Thursday", time: "5:30 PM" },
        { day: "Saturday", time: "9:00 AM" },
      ],
      benefits: [
        "Efficient calorie burning",
        "Improved cardiovascular health",
        "No equipment needed",
        "Increased metabolic rate",
      ],
    },
    {
      id: 8,
      name: "Yoga Flow",
      description:
        "Connect movement with breath in this dynamic yoga class. Improve flexibility, balance, and mental clarity through flowing sequences.",
      duration: "75 min",
      intensity: "Low",
      trainer: "Emma Chen",
      image: "/placeholder.svg?height=400&width=600",
      category: "Mind & Body",
      schedule: [
        { day: "Monday", time: "7:00 PM" },
        { day: "Wednesday", time: "7:00 PM" },
        { day: "Sunday", time: "10:00 AM" },
      ],
      benefits: [
        "Increased flexibility and balance",
        "Stress reduction",
        "Improved mindfulness",
        "Better sleep quality",
      ],
    },
    {
      id: 9,
      name: "Spin Class",
      description:
        "High-energy indoor cycling workout set to motivating music. Burn calories and improve cardiovascular health with this low-impact, high-intensity class.",
      duration: "45 min",
      intensity: "Medium",
      trainer: "David Park",
      image: "/placeholder.svg?height=400&width=600",
      category: "Cardio",
      schedule: [
        { day: "Tuesday", time: "6:00 AM" },
        { day: "Thursday", time: "6:00 AM" },
        { day: "Saturday", time: "8:00 AM" },
      ],
      benefits: [
        "Low-impact cardiovascular workout",
        "Increased leg strength",
        "Improved endurance",
        "Calorie burning",
      ],
    },
    {
      id: 10,
      name: "Functional Training",
      description:
        "Improve everyday movement patterns with exercises that mimic daily activities. Enhance strength, stability, and mobility for real-world applications.",
      duration: "60 min",
      intensity: "Medium",
      trainer: "Alex Rodriguez",
      image: "/placeholder.svg?height=400&width=600",
      category: "Strength",
      schedule: [
        { day: "Monday", time: "12:00 PM" },
        { day: "Wednesday", time: "12:00 PM" },
        { day: "Friday", time: "12:00 PM" },
      ],
      benefits: [
        "Improved daily movement patterns",
        "Reduced risk of injury",
        "Better coordination and balance",
        "Increased core strength",
      ],
    },
    {
      id: 11,
      name: "Pilates Reformer",
      description:
        "Utilize the Pilates reformer machine to build core strength, improve posture, and increase flexibility through controlled, precise movements.",
      duration: "55 min",
      intensity: "Low",
      trainer: "Sophia Martinez",
      image: "/placeholder.svg?height=400&width=600",
      category: "Flexibility",
      schedule: [
        { day: "Tuesday", time: "9:00 AM" },
        { day: "Thursday", time: "9:00 AM" },
        { day: "Saturday", time: "11:00 AM" },
      ],
      benefits: ["Improved core strength", "Better posture", "Increased flexibility", "Enhanced body awareness"],
    },
    {
      id: 12,
      name: "Boxing Conditioning",
      description:
        "Learn boxing techniques while getting a full-body workout. Improve coordination, speed, and cardiovascular fitness through boxing drills and conditioning exercises.",
      duration: "60 min",
      intensity: "High",
      trainer: "James Wilson",
      image: "/placeholder.svg?height=400&width=600",
      category: "Cardio",
      schedule: [
        { day: "Monday", time: "5:30 PM" },
        { day: "Wednesday", time: "5:30 PM" },
        { day: "Friday", time: "5:30 PM" },
      ],
      benefits: ["Stress relief", "Improved coordination", "Full-body workout", "Increased cardiovascular fitness"],
    },
    {
      id: 13,
      name: "Meditation & Mindfulness",
      description:
        "Develop mental clarity and emotional calm through guided meditation practices. Learn techniques to manage stress and improve overall wellbeing.",
      duration: "30 min",
      intensity: "Low",
      trainer: "Maya Patel",
      image: "/placeholder.svg?height=400&width=600",
      category: "Mind & Body",
      schedule: [
        { day: "Tuesday", time: "7:00 AM" },
        { day: "Thursday", time: "7:00 AM" },
        { day: "Sunday", time: "5:00 PM" },
      ],
      benefits: [
        "Reduced stress and anxiety",
        "Improved focus and concentration",
        "Better emotional regulation",
        "Enhanced self-awareness",
      ],
    },
    {
      id: 14,
      name: "Tabata Training",
      description:
        "Ultra-efficient workout using the 20 seconds on, 10 seconds off Tabata protocol. Maximize calorie burn and improve both aerobic and anaerobic fitness.",
      duration: "30 min",
      intensity: "High",
      trainer: "Chris Taylor",
      image: "/placeholder.svg?height=400&width=600",
      category: "HIIT",
      schedule: [
        { day: "Monday", time: "12:30 PM" },
        { day: "Wednesday", time: "12:30 PM" },
        { day: "Friday", time: "12:30 PM" },
      ],
      benefits: [
        "Time-efficient workout",
        "Increased metabolic rate",
        "Improved aerobic and anaerobic capacity",
        "No equipment needed",
      ],
    },
    
  ]

  // Filter classes based on category and search query
  const filteredClasses = classes.filter((cls) => {
    const matchesCategory = selectedCategory ? cls.category === selectedCategory : true
    const matchesSearch =
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get unique categories
  const categories = Array.from(new Set(classes.map((cls) => cls.category)))

  // Handle click outside modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isModalOpen])

  // Animation for featured class
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

    if (featuredClassRef.current) observer.observe(featuredClassRef.current)

    return () => {
      if (featuredClassRef.current) observer.unobserve(featuredClassRef.current)
    }
  }, [])

  // Get intensity color
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "Low":
        return "bg-orange-500/20 text-black"
      case "Medium":
        return "bg-orange-500/50 text-white"
      case "High":
        return "bg-orange-500 text-white"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Strength":
        return <Dumbbell className="h-5 w-5" />
      case "Cardio":
        return <Heart className="h-5 w-5" />
      case "Flexibility":
        return <Users className="h-5 w-5" />
      case "Mind & Body":
        return <Zap className="h-5 w-5" />
      case "HIIT":
        return <Flame className="h-5 w-5" />
      default:
        return <Dumbbell className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        badge="Get Moving"
        title="Find Your Perfect Class"
        subtitle="From high-energy workouts to mindful movement, we've got something for everyone. Join a class that fits your style and goals."
        backgroundImage="/images/backgrounds/classesbackgroundimage.webp"
      />

      {/* Featured Class Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Featured Class"
            title="Get Ready for FX Training"
            description="Join our signature class that's changing the game. Perfect for all levels, this class will prep you for competitions like Hyrox, BUA, and Dekafit while having a blast!"
            centered={true}
          />

          <div
            ref={featuredClassRef}
            className="grid md:grid-cols-2 gap-12 items-center opacity-0 translate-y-8 transition-all duration-700 ease-out mt-12"
          >
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="/images/fxtraining.png"
                alt="FX Training"
                fill
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j..."
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Featured Class
                  </span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    60 min
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">FX Training</h2>
                <p className="text-white/80 mb-4">
                  Our flagship Functional Fitness Class suitable for all abilities. Join our exclusive group training program designed to prepare you for Functional Fitness races like Hyrox, BUA, and Dekafit.
                </p>
                <Button
                  className="bg-orange-500 hover:bg-orange-500/90 text-white font-medium w-fit"
                  onClick={() => {
                    const fxClass = classes.find((c) => c.name === "FX Training")
                    if (fxClass) {
                      setSelectedClass(fxClass)
                      setIsModalOpen(true)
                    }
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Why Try FX Training?</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Flame className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Maximum Calorie Burn</h3>
                    <p className="text-gray-600">
                      Burn up to 500 calories in just 45 minutes with our scientifically designed HIIT workouts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Time-Efficient</h3>
                    <p className="text-gray-600">
                      Get more results in less time with workouts designed for busy schedules.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">All Fitness Levels</h3>
                    <p className="text-gray-600">
                      Our instructors provide modifications for beginners and challenges for advanced athletes.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    className="bg-orange-500 hover:bg-orange-500/90 text-white font-medium flex items-center gap-2 group"
                    onClick={() => {
                      const fxClass = classes.find((c) => c.name === "FX Training")
                      if (fxClass) {
                        setSelectedClass(fxClass)
                        setIsModalOpen(true)
                      }
                    }}
                  >
                    Book This Class
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Find Classes"
            title="Search and Filter Options"
            description="Use the tools below to find the perfect class for your fitness goals and schedule."
            centered={true}
          />

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8 mt-12">
            <input
              type="text"
              placeholder="Search classes..."
              className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            {searchQuery && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                selectedCategory === null ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
              )}
              onClick={() => setSelectedCategory(null)}
            >
              All Classes
            </button>

            {categories.map((category) => (
              <button
                key={category}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                  selectedCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {getCategoryIcon(category)}
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Class Catalog"
            title="Explore Our Diverse Class Offerings"
            description="Discover the perfect class to match your fitness goals and preferences."
            centered={true}
          />

          {filteredClasses.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No classes found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <Button
                className="bg-orange-500 hover:bg-orange-500/90 text-white"
                onClick={() => {
                  setSelectedCategory(null)
                  setSearchQuery("")
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {filteredClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    setSelectedClass(cls)
                    setIsModalOpen(true)
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={cls.image || "/placeholder.svg"}
                      alt={cls.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <Button className="w-full bg-orange-500 hover:bg-orange-500/90 text-white font-medium">
                          View Details
                        </Button>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span
                        className={cn("px-3 py-1 rounded-full text-xs font-medium", getIntensityColor(cls.intensity))}
                      >
                        {cls.intensity} Intensity
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-orange-500/20 text-black px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        {getCategoryIcon(cls.category)}
                        {cls.category}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {cls.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 transition-colors">{cls.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{cls.description}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Trainer: {cls.trainer}</span>
                      <ChevronRight className="h-5 w-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Weekly Schedule Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Plan Your Week"
            title="Weekly Class Schedule"
            description="Find the perfect time to join our classes and plan your fitness routine."
            centered={true}
          />

          {/* Mobile Schedule View */}
          <div className="block md:hidden mt-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4">
              <h3 className="text-xl font-bold mb-4">Today's Schedule</h3>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">6:45 AM</span>
                    <span className="bg-blue-500/20 px-2 py-1 rounded-full text-xs">60 min</span>
                  </div>
                  <h4 className="font-bold text-lg">Power Lifting</h4>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">9:00 AM</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">55 min</span>
                  </div>
                  <h4 className="font-bold text-lg">Pilates Reformer</h4>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">12:00 PM</span>
                    <span className="bg-blue-500/10 px-2 py-1 rounded-full text-xs">60 min</span>
                  </div>
                  <h4 className="font-bold text-lg">Functional Training</h4>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">5:30 PM</span>
                    <span className="bg-blue-500/20 px-2 py-1 rounded-full text-xs">60 min</span>
                  </div>
                  <h4 className="font-bold text-lg">Boxing Conditioning</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Schedule View */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-12">
            <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
              <div className="p-4 font-bold text-center">Time</div>
              <div className="p-4 font-bold text-center">Monday</div>
              <div className="p-4 font-bold text-center">Tuesday</div>
              <div className="p-4 font-bold text-center">Wednesday</div>
              <div className="p-4 font-bold text-center">Thursday</div>
              <div className="p-4 font-bold text-center">Friday</div>
              <div className="p-4 font-bold text-center">Saturday</div>
              <div className="p-4 font-bold text-center">Sunday</div>
            </div>

            {/* Morning Schedule */}
            <div className="grid grid-cols-8 border-b border-gray-100">
              <div className="p-4 font-medium text-center border-r border-gray-100 flex items-center justify-center">
                6:45 AM
              </div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/20 rounded-lg p-2 text-xs">
                  <div className="font-bold">FX Training</div>
                  <div>60 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/10 rounded-lg p-2 text-xs">
                  <div className="font-bold">Spin Class</div>
                  <div>45 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/20 rounded-lg p-2 text-xs">
                  <div className="font-bold">Power Lifting</div>
                  <div>60 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/10 rounded-lg p-2 text-xs">
                  <div className="font-bold">Spin Class</div>
                  <div>45 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/20 rounded-lg p-2 text-xs">
                  <div className="font-bold">Power Lifting</div>
                  <div>60 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/10 rounded-lg p-2 text-xs">
                  <div className="font-bold">Spin Class</div>
                  <div>45 min</div>
                </div>
              </div>
              <div className="p-2 text-center">
                <div className="bg-gray-100 rounded-lg p-2 text-xs">
                  <div className="font-bold">Yoga Flow</div>
                  <div>75 min</div>
                </div>
              </div>
            </div>

            {/* Mid-Morning Schedule */}
            <div className="grid grid-cols-8 border-b border-gray-100">
              <div className="p-4 font-medium text-center border-r border-gray-100 flex items-center justify-center">
                09:45 - 10:30
              </div>
              <div className="p-2 text-center border-r border-gray-100"></div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-gray-100 rounded-lg p-2 text-xs">
                  <div className="font-bold">LBT</div>
                  <div>45 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100"></div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-gray-100 rounded-lg p-2 text-xs">
                  <div className="font-bold">WOD</div>
                  <div>45 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100"></div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-gray-100 rounded-lg p-2 text-xs">
                  <div className="font-bold">WOD</div>
                  <div>45 min</div>
                </div>
              </div>
              <div className="p-2 text-center"></div>
            </div>

            {/* Noon Schedule */}
            <div className="grid grid-cols-8 border-b border-gray-100">
              <div className="p-4 font-medium text-center border-r border-gray-100 flex items-center justify-center">
                12:15 - 13:15
              </div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/10 rounded-lg p-2 text-xs">
                  <div className="font-bold">PUMP</div>
                  <div>45 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100"></div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/10 rounded-lg p-2 text-xs">
                  <div className="font-bold">WOD</div>
                  <div>45 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/10 rounded-lg p-2 text-xs">
                  <div className="font-bold">Functional Training</div>
                  <div>60 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100"></div>
              <div className="p-2 text-center"></div>
            </div>

            {/* Evening Schedule */}
            <div className="grid grid-cols-8">
              <div className="p-4 font-medium text-center border-r border-gray-100 flex items-center justify-center">
                5:30 PM
              </div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/20 rounded-lg p-2 text-xs">
                  <div className="font-bold">Boxing Conditioning</div>
                  <div>60 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/30 rounded-lg p-2 text-xs">
                  <div className="font-bold">HIIT Circuit</div>
                  <div>45 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/20 rounded-lg p-2 text-xs">
                  <div className="font-bold">Boxing Conditioning</div>
                  <div>60 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100">
                <div className="bg-blue-500/30 rounded-lg p-2 text-xs">
                  <div className="font-bold">HIIT Circuit</div>
                  <div>45 min</div>
                </div>
              </div>
              <div className="p-2 text-center border-r border-gray-100"></div>
              <div className="p-2 text-center"></div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              className="bg-blue-500 hover:bg-blue-500/90 text-white font-medium flex items-center gap-2 group"
              onClick={() => setIsTimetableModalOpen(true)}
            >
              <Calendar className="h-4 w-4" />
              View Full Schedule
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Class Detail Modal */}
      <ClassDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} classInfo={selectedClass} />

      {/* Timetable Modal */}
      <TimetableModal isOpen={isTimetableModalOpen} onClose={() => setIsTimetableModalOpen(false)} />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 bg-blue-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start your fitness journey?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join BMS Warehouse Gym today and transform your fitness with our state-of-the-art facilities, expert
            trainers, and supportive community.
          </p>
          <Button className="bg-black text-white hover:bg-gray-900 font-medium rounded-full px-8 py-6 transition-all duration-300 hover:scale-105">
            JOIN NOW
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

