"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Dumbbell, Users, Flame, Heart, Zap } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"
import { ClassDetailModal } from "@/components/class-detail-modal"
import { TimetableModal } from "@/components/timetable-modal"

type ClassPreview = {
  id: number
  name: string
  description: string
  duration: string
  intensity: "Low" | "Medium" | "High"
  category: "Strength" | "Cardio" | "Flexibility" | "Mind & Body" | "HIIT"
  image: string
  trainer?: string
  benefits?: string[]
}

export function ClassesPreview() {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<ClassPreview | null>(null)
  const classRefs = useRef<(HTMLDivElement | null)[]>([])

  const featuredClasses: ClassPreview[] = [
    {
      id: 1,
      name: "Cardiorevive",
      description: "A revitalizing cardio class designed to boost your heart health and energy levels.",
      duration: "45 min",
      intensity: "Medium",
      category: "Cardio",
      image: "/images/cardiorevive.png",
      trainer: "Jane Smith",
      benefits: ["Increased cardiovascular fitness", "Enhanced stamina", "Weight management"],
    },
    {
      id: 2,
      name: "PUMP",
      description: "A barbell group session targeting all major muscle groups, designed for strength development.",
      duration: "30 min",
      intensity: "High",
      category: "Strength",
      image: "/images/PUMP.png",
      trainer: "Michael Brown",
      benefits: ["Increased muscle strength", "Improved muscle endurance", "Full-body workout"],
    },
    {
      id: 3,
      name: "Legs Bums Tums",
      description: "A focused group workout targeting legs, glutes, and stomach areas, emphasizing toning and tightening.",
      duration: "45 min",
      intensity: "Medium",
      category: "Strength",
      image: "/images/legsbumstums.png",
      trainer: "Emily Johnson",
      benefits: ["Toned legs and glutes", "Improved core strength", "Enhanced body confidence"],
    },
  ]

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

    classRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      classRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  // Get intensity color
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "Low":
        return "bg-orange-500/20 text-black"
      case "Medium":
        return "bg-pink-500/50 text-black"
      case "High":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Strength":
        return <Dumbbell className="h-5 w-5 text-orange-500" />
      case "Cardio":
        return <Heart className="h-5 w-5 text-pink-500" />
      case "Flexibility":
        return <Users className="h-5 w-5 text-blue-500" />
      case "Mind & Body":
        return <Zap className="h-5 w-5 text-orange-500" />
      case "HIIT":
        return <Flame className="h-5 w-5 text-pink-500" />
      default:
        return <Dumbbell className="h-5 w-5 text-orange-500" />
    }
  }

  const handleViewDetails = (cls: ClassPreview, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedClass(cls)
    setIsDetailModalOpen(true)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Join the Action"
          title="Classes You'll Love"
          description="From high-energy workouts to mindful movement, find the perfect class to match your style."
          centered={true}
        />

        <div className="mt-16 relative">
          {/* Featured class spotlight */}
          <div className="relative rounded-2xl overflow-hidden mb-16">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
            <Image
              src="/images/fxtraining.png"
              alt="Featured Class"
              width={1200}
              height={600}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 md:p-12">
              <div className="flex flex-wrap gap-2 mb-2 md:gap-3 md:mb-4">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                  Featured Class
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs md:text-sm backdrop-blur-sm">
                  Medium Intensity
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-1 md:mb-3">
                FX Training
              </h3>
              <p className="text-white/80 text-sm md:text-lg max-w-2xl mb-3 md:mb-6 line-clamp-2 md:line-clamp-none">
                A flagship Functional Fitness Class suitable for all abilities, focusing on preparing participants for Functional Fitness races.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-4">
                <Button className="bg-blue-500 hover:bg-blue-500/70 text-white font-semibold px-4 py-2 text-sm md:px-8 md:py-6 md:text-lg rounded-xl transition-all duration-300">
                  Join Class
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white hover:border-pink-500 hover:text-white hover:bg-pink-500 backdrop-blur-sm px-4 py-2 text-sm md:px-8 md:py-6 md:text-lg rounded-xl"
                  onClick={() => setIsTimetableModalOpen(true)}
                >
                  View Schedule
                </Button>
              </div>
            </div>
          </div>

          {/* Class cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {featuredClasses.map((cls, index) => (
              <div
                key={cls.id}
                ref={(el) => (classRefs.current[index] = el)}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer opacity-0 translate-y-8 transition-all duration-700 ease-out"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={cls.image || "/placeholder.svg"}
                    alt={cls.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={cn("px-3 py-1 rounded-full text-xs font-medium", getIntensityColor(cls.intensity))}
                    >
                      {cls.intensity} Intensity
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-orange-500/20 text-black px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      {getCategoryIcon(cls.category)}
                      {cls.category}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {cls.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-black">{cls.name}</h3>
                  <p className="text-gray-600 text-sm mb-5">{cls.description}</p>

                  <Button
                    className="w-full border border-black bg-transparent hover:bg-orange-500 hover:border-transparent hover:text-white text-black font-medium transition-all duration-300"
                    onClick={(e) => handleViewDetails(cls, e)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link href="/classes">
              <Button className="border border-black bg-transparent hover:bg-pink-500 hover:border-pink-500 hover:text-white text-black rounded-xl px-8 py-7 text-lg transition-all duration-300 flex items-center gap-3 shadow-lg group">
                Explore All Classes
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Class Detail Modal */}
        <ClassDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          classInfo={selectedClass}
        />

        {/* Timetable Modal */}
        <TimetableModal isOpen={isTimetableModalOpen} onClose={() => setIsTimetableModalOpen(false)} />
      </div>
    </section>
  )
}

