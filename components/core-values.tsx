"use client"

import type React from "react"

import { useState } from "react"
import { Heart, Dumbbell, Users, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

type CoreValue = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  details: string[]
}

export function CoreValues() {
  const [activeValue, setActiveValue] = useState<string | null>(null)

  const values: CoreValue[] = [
    {
      id: "passion",
      title: "Passion",
      description: "We're passionate about fitness and helping others achieve their goals.",
      icon: <Heart className="h-8 w-8 text-primary" />,
      details: [
        "Our trainers are selected for their genuine enthusiasm for fitness",
        "We celebrate every member's progress, no matter how small",
        "We constantly research and implement the latest fitness innovations",
        "Our team members are encouraged to pursue their own fitness journeys",
      ],
    },
    {
      id: "excellence",
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our facilities to our programs.",
      icon: <Dumbbell className="h-8 w-8 text-primary" />,
      details: [
        "State-of-the-art equipment maintained to the highest standards",
        "Rigorous training programs for all staff members",
        "Regular evaluation and improvement of all fitness programs",
        "Commitment to cleanliness and safety throughout our facilities",
      ],
    },
    {
      id: "community",
      title: "Community",
      description: "We foster a supportive community where everyone feels welcome and motivated.",
      icon: <Users className="h-8 w-8 text-primary" />,
      details: [
        "Regular community events and challenges to build connections",
        "Inclusive environment that welcomes people of all fitness levels",
        "Member recognition programs to celebrate achievements",
        "Partnerships with local organizations to extend our community impact",
      ],
    },
  ]

  const toggleValue = (id: string) => {
    if (activeValue === id) {
      setActiveValue(null)
    } else {
      setActiveValue(id)
    }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {values.map((value) => (
        <div
          key={value.id}
          className={cn(
            "group bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden transition-all duration-300",
            activeValue === value.id ? "md:col-span-2 lg:col-span-2" : "",
            activeValue === value.id ? "border-primary" : "hover:border-primary",
          )}
        >
          <div className="p-6 cursor-pointer" onClick={() => toggleValue(value.id)}>
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                {activeValue === value.id ? (
                  <ChevronRight className="h-5 w-5 rotate-90 transition-transform" />
                ) : (
                  <Plus className="h-5 w-5 transition-transform" />
                )}
              </button>
            </div>
          </div>

          {activeValue === value.id && (
            <div className="px-6 pb-6 pt-0 border-t border-gray-100 dark:border-gray-800 mt-2">
              <h4 className="font-medium mb-4 text-primary">Why This Matters</h4>
              <ul className="space-y-3">
                {value.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

