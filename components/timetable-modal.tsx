"use client"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TimeSlot = {
  time: string
  classes: {
    [day: string]: {
      name: string
      duration: string
      intensity: "Low" | "Medium" | "High"
    } | null
  }
}

export interface TimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TimetableModal({ isOpen, onClose }: TimetableModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const activeDay = new Date().getDay() || 0

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

  // If not open, don't render
  if (!isOpen) return null

  // Sample timetable data
  const timetable: TimeSlot[] = [
    {
      time: "06:15",
      classes: {
        Monday: { name: "FX Training", duration: "60 min", intensity: "Medium" },
        Tuesday: { name: "FX Training", duration: "60 min", intensity: "Medium" },
        Wednesday: { name: "FX Training", duration: "60 min", intensity: "Medium" },
        Thursday: { name: "FX Training", duration: "60 min", intensity: "Medium" },
        Friday: { name: "FX Training", duration: "60 min", intensity: "Medium" },
        Saturday: { name: "PUMP", duration: "45 min", intensity: "High" },
        Sunday: null,
      },
    },
    {
      time: "09:00",
      classes: {
        Monday: null,
        Tuesday: null,
        Wednesday: null,
        Thursday: null,
        Friday: null,
        Saturday: { name: "TEAMS", duration: "4 hours", intensity: "Medium" },
        Sunday: null,
      },
    },
    {
      time: "09:45",
      classes: {
        Monday: { name: "LBT", duration: "45 min", intensity: "Medium" },
        Tuesday: { name: "WOD", duration: "45 min", intensity: "Medium" },
        Wednesday: { name: "WOD", duration: "45 min", intensity: "Medium" },
        Thursday: { name: "PUMP", duration: "45 min", intensity: "High" },
        Friday: { name: "WOD", duration: "45 min", intensity: "Medium" },
        Saturday: null,
        Sunday: null,
      },
    },
    {
      time: "12:15",
      classes: {
        Monday: null,
        Tuesday: { name: "CARDIOREVIVE", duration: "60 min", intensity: "Low" },
        Wednesday: null,
        Thursday: { name: "CARDIOREVIVE", duration: "60 min", intensity: "Low" },
        Friday: null,
        Saturday: null,
        Sunday: null,
      },
    },
    {
      time: "18:00",
      classes: {
        Monday: { name: "WOD", duration: "45 min", intensity: "Medium" },
        Tuesday: { name: "WOD", duration: "45 min", intensity: "Medium" },
        Wednesday: { name: "PUMP", duration: "60 min", intensity: "High" },
        Thursday: null,
        Friday: null,
        Saturday: null,
        Sunday: null,
      },
    },
    {
      time: "19:00",
      classes: {
        Monday: { name: "FX Training", duration: "60 min", intensity: "Medium" },
        Tuesday: { name: "FX Training", duration: "60 min", intensity: "Medium" },
        Wednesday: { name: "FX Training", duration: "60 min", intensity: "Medium" },
        Thursday: { name: "WOD", duration: "60 min", intensity: "Medium" },
        Friday: { name: "FX Training", duration: "60 min", intensity: "Medium" },
        Saturday: null,
        Sunday: null,
      },
    },
  ]

  // Get intensity color
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "Low":
        return "bg-blue-500/20 text-black"
      case "Medium":
        return "bg-blue-500/50 text-white"
      case "High":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div ref={modalRef} className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-2xl font-bold">Weekly Class Schedule</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Day selector tabs */}
        </div>

        <div className="p-6">
          {/* Mobile view - single day */}
          <div className="md:hidden">
            <div className="space-y-4">
              {timetable.map((slot) => {
                const classInfo = slot.classes[days[activeDay]]
                if (!classInfo) return null

                return (
                  <div key={`${days[activeDay]}-${slot.time}`} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{slot.time}</span>
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          getIntensityColor(classInfo.intensity),
                        )}
                      >
                        {classInfo.intensity} Intensity
                      </span>
                    </div>
                    <h4 className="font-bold text-lg">{classInfo.name}</h4>
                    <p className="text-gray-600">{classInfo.duration}</p>
                  </div>
                )
              })}

              {timetable.filter((slot) => slot.classes[days[activeDay]]).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No classes scheduled for this day.</p>
                </div>
              )}
            </div>
          </div>

          {/* Desktop view - full week */}
          <div className="hidden md:block">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
                <div className="p-4 font-bold text-center">Time</div>
                {days.map((day) => (
                  <div key={day} className="p-4 font-bold text-center">
                    {day}
                  </div>
                ))}
              </div>

              {timetable.map((slot) => (
                <div key={slot.time} className="grid grid-cols-8 border-b border-gray-100">
                  <div className="p-4 font-medium text-center border-r border-gray-100 flex items-center justify-center">
                    {slot.time}
                  </div>

                  {days.map((day) => {
                    const classInfo = slot.classes[day]
                    return (
                      <div key={`${day}-${slot.time}`} className="p-2 text-center border-r border-gray-100">
                        {classInfo && (
                          <div
                            className={cn(
                              "rounded-lg p-2 text-xs",
                              classInfo.intensity === "Low"
                                ? "bg-blue-500/20"
                                : classInfo.intensity === "Medium"
                                  ? "bg-blue-500/40"
                                  : "bg-blue-500/60",
                            )}
                          >
                            <div className="font-bold">{classInfo.name}</div>
                            <div>{classInfo.duration}</div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button onClick={onClose} className="bg-blue-500 hover:bg-blue-500/90 text-white font-medium">
              Close Schedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

