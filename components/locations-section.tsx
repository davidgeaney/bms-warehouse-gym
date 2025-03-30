"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

export function LocationsSection() {
  const locationRefs = useRef<(HTMLDivElement | null)[]>([])

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

    locationRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      locationRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Find Us"
          title="Our Convenient Locations"
          description="Visit one of our premium fitness centers in Bundoran or Killybegs."
          centered={true}
        />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Bundoran Location */}
          <div
            ref={(el) => (locationRefs.current[0] = el)}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 shadow-sm opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/bundoranlocation.png"
                alt="Bundoran Gym"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-orange-500 px-4 py-1 rounded-full">
                <p className="text-white font-medium text-sm">Main Location</p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-orange-500">Bundoran</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <address className="not-italic text-gray-600">
                      123 Main Street
                      <br />
                      Bundoran
                      <br />
                      Co. Donegal
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Contact</h4>
                    <p className="text-gray-600">
                      <a href="tel:+35374123456" className="hover:text-orange-500 transition-colors">
                        (074) 123 4567
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Hours</h4>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="ml-6">6:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>8:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-transparent border border-black hover:bg-orange-500 hover:border-transparent hover:text-white text-black font-medium flex items-center justify-center gap-2 group">
                Get Directions
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Killybegs Location */}
          <div
            ref={(el) => (locationRefs.current[1] = el)}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 shadow-sm opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/comingsoon.jpg"
                alt="Killybegs Gym"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-pink-500 px-4 py-1 rounded-full">
                <p className="text-white font-medium text-sm">New Location</p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-pink-500">Killybegs</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <address className="not-italic text-gray-600">
                      45 Shore Road
                      <br />
                      Killybegs
                      <br />
                      Co. Donegal
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Contact</h4>
                    <p className="text-gray-600">
                      <a href="tel:+35374987654" className="hover:text-pink-500 transition-colors">
                        (074) 987 6543
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Hours</h4>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="ml-6">6:00 AM - 9:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-transparent border border-black hover:bg-pink-500 hover:border-transparent hover:text-white text-black font-medium flex items-center justify-center gap-2 group">
                Get Directions
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

