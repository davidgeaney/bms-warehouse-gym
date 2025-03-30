"use client"

import { useState } from "react"
import type React from "react"
import { useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, Heart, Users, Brain } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Service = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  image: string
}

export function ServicesSection() {
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeService, setActiveService] = useState<string>("personal-training")

  const services: Service[] = [
    {
      id: "personal-training",
      title: "Personal Training",
      description:
        "One-on-one coaching tailored to your specific goals, fitness level, and schedule. Our certified trainers will design a personalized program to help you achieve maximum results.",
      icon: <Dumbbell className="h-6 w-6 text-blue-500" />,
      image: "/images/whatweofferpersonaltraining.png",
    },
    {
      id: "group-classes",
      title: "Group Classes",
      description:
        "High-energy workouts in a motivating group environment. From HIIT to light cardio classes, our diverse class schedule offers something for everyone, regardless of fitness level.",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      image: "/images/whatweoffergroupclasses.png",
    },
    {
      id: "nutrition-coaching",
      title: "Nutrition Coaching",
      description:
        "Expert guidance on nutrition to complement your fitness routine. Learn how to fuel your body properly for optimal performance and results.",
      icon: <Heart className="h-6 w-6 text-blue-500" />,
      image: "/images/nutritioncoaching.jpg",
    },
    {
      id: "wellness-programs",
      title: "Wellness Programs",
      description:
        "Comprehensive programs addressing all aspects of health including stress management, sleep quality, and mental wellbeing alongside physical fitness.",
      icon: <Brain className="h-6 w-6 text-blue-500" />,
      image: "/images/recoveryarea.png",
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

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      serviceRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="What We Offer"
          title="Powerful tools for better fitness"
          description="Our gym offers comprehensive features designed to streamline your fitness journey and enhance your overall wellness."
          centered={true}
        />

        <div className="grid md:grid-cols-12 gap-8 mt-12">
          <div
            ref={(el) => {
              if (serviceRefs.current) serviceRefs.current[0] = el
            }}
            className="md:col-span-4 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={cn(
                    "p-4 rounded-xl cursor-pointer transition-all duration-300",
                    activeService === service.id
                      ? "bg-white shadow-md border-l-4 border-pink-500"
                      : "bg-white/50 hover:bg-white",
                  )}
                  onClick={() => setActiveService(service.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-black">{service.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/what-we-offer">
                <Button className="w-full border bg-transparent border-black hover:bg-orange-500 hover:border-transparent hover:text-white text-black font-medium flex items-center justify-center gap-2 group">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>

          <div
            ref={(el) => {
              if (serviceRefs.current) serviceRefs.current[1] = el
            }}
            className="md:col-span-8 opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200"
          >
            {services.map((service) => (
              <div
                key={service.id}
                className={cn(
                  "bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-500",
                  activeService === service.id ? "opacity-100 h-auto" : "opacity-0 h-0 absolute",
                )}
              >
                <div className="relative h-64 md:h-80">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      {service.icon}
                    </div>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link href="/what-we-offer">
                    <Button className="bg-orange-500 hover:bg-orange-500/90 text-white font-medium flex items-center gap-2 group">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

