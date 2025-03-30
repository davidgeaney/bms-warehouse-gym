"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

export function FeaturesSection() {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

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

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          subheading="Learn more about"
          heading="Move for healthy body"
          description="Energize Your Lifestyle. Embrace Movement for a Healthier You! Get motivated, stay active, and reap the benefits of a vibrant, well-nourished body."
          align="left"
        />

        <div className="grid md:grid-cols-12 gap-8 mt-12">
          <div
            ref={(el) => (featureRefs.current[0] = el)}
            className="md:col-span-4 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <Button className="bg-primary hover:bg-primary/90 text-black font-medium rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm mb-8 group">
              EXPLORE MORE
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <div className="h-px bg-gray-200 w-full mb-8"></div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">Personalized fitness programs tailored to your goals</p>
                  <p className="text-sm text-gray-500 mt-1">Our expert trainers design custom workouts just for you</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">State-of-the-art equipment and facilities</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Access to premium fitness technology and comfortable spaces
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">Supportive community of like-minded individuals</p>
                  <p className="text-sm text-gray-500 mt-1">Connect with others on similar fitness journeys</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 gap-4">
            <div
              ref={(el) => (featureRefs.current[1] = el)}
              className="relative rounded-xl overflow-hidden h-80 opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200"
            >
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Fitness group"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-2">A brighter future starts with the healthy life</h3>
              </div>
            </div>
            <div
              ref={(el) => (featureRefs.current[2] = el)}
              className="relative rounded-xl overflow-hidden h-80 opacity-0 translate-y-8 transition-all duration-700 ease-out delay-400"
            >
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Fitness athlete"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-0 right-0 bg-primary p-4 rounded-bl-xl">
                <p className="text-black font-medium text-sm">Designed for our community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

