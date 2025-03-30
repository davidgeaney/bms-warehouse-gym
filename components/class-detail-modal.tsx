"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { X, Clock, Dumbbell, Users, Flame, Heart, Zap, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ClassDetailProps = {
  isOpen: boolean
  onClose: () => void
  classInfo: {
    id: number
    name: string
    description: string
    duration: string
    intensity: "Low" | "Medium" | "High"
    category: "Strength" | "Cardio" | "Flexibility" | "Mind & Body" | "HIIT"
    image: string
    trainer?: string
    benefits?: string[]
  } | null
}

export function ClassDetailModal({ isOpen, onClose, classInfo }: ClassDetailProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // If not open or no class info, don't render
  if (!isOpen || !classInfo) return null

  // Get intensity color
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "Low":
        return "bg-blue-500/20 text-black"
      case "Medium":
        return "bg-blue-500/50 text-black"
      case "High":
        return "bg-blue-500 text-black"
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div ref={modalRef} className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="relative h-56 md:h-64">
          <Image
            src={classInfo.image || "/placeholder.svg"}
            alt={classInfo.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
          <button
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{classInfo.name}</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-3 mb-6">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1",
                getIntensityColor(classInfo.intensity),
              )}
            >
              <Flame className="h-4 w-4" />
              {classInfo.intensity} Intensity
            </span>
            <span className="bg-blue-500/20 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              {getCategoryIcon(classInfo.category)}
              {classInfo.category}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {classInfo.duration}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2">Description</h3>
          <p className="text-gray-600 mb-6">{classInfo.description}</p>

          {classInfo.benefits && classInfo.benefits.length > 0 && (
            <>
              <h3 className="text-xl font-bold mb-4">Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {classInfo.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-blue-500" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {classInfo.trainer && (
            <>
              <h3 className="text-xl font-bold mb-2">Instructor</h3>
              <p className="text-gray-600 mb-6">{classInfo.trainer}</p>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 bg-blue-500 hover:bg-blue-500/90 text-white font-medium">Book This Class</Button>
            <Button
              className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-black font-medium"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

