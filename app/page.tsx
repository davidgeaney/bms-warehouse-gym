"use client"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { LocationsSection } from "@/components/locations-section"
import { ServicesSection } from "@/components/services-section"
import { ClassesPreview } from "@/components/classes-preview"
import { TestimonialsSection } from "@/components/testimonials-section"
import { MembershipsPreview } from "@/components/memberships-preview"
import { ContactSection } from "@/components/contact-section"
import { AboutPreview } from "@/components/about-preview"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <LocationsSection />
      <ServicesSection />
      <ClassesPreview />
      <AboutPreview />
      <TestimonialsSection />
      <MembershipsPreview />
      <ContactSection />
      <Footer />
    </div>
  )
}

