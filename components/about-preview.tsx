"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

export function AboutPreview() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayVideo = () => {
    setIsVideoPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          badge="About Us"
          title="Your Fitness Journey Starts Here"
          description="At BMS Warehouse Gym, we are dedicated to helping you unlock your full fitness potential. With top-tier equipment, expert trainers, and a welcoming community, we provide the perfect environment to push your limits and achieve your goals."
          centered={true}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-end gap-1">
              <span className="text-3xl md:text-4xl font-bold">12</span>
              <span className="text-orange-500 text-xl font-bold">+</span>
            </div>
            <p className="text-zinc-600 text-sm">Years of Excellence</p>
          </div>
          <div>
            <div className="flex items-end gap-1">
              <span className="text-3xl md:text-4xl font-bold">5K</span>
              <span className="text-pink-500 text-xl font-bold">+</span>
            </div>
            <p className="text-zinc-600 text-sm">Members</p>
          </div>
          <div>
            <div className="flex items-end gap-1">
              <span className="text-3xl md:text-4xl font-bold">30</span>
              <span className="text-blue-500 text-xl font-bold">+</span>
            </div>
            <p className="text-zinc-600 text-sm">Weekly Classes</p>
          </div>
          <div>
            <div className="flex items-end gap-1">
              <span className="text-3xl md:text-4xl font-bold">15</span>
              <span className="text-orange-500 text-xl font-bold">+</span>
            </div>
            <p className="text-zinc-600 text-sm">Expert Trainers</p>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden mb-10">
          <div className="relative aspect-video">
            <Image
              src="/images/aboutuspreview.png"
              alt="Your Image Description"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="mt-2 text-center">
          <Link href="/about">
            <Button className="bg-transparent border border-black hover:border-transparent hover:bg-orange-500 hover:text-white text-black font-medium group">
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

