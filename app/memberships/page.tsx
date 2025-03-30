"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Check, Info, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SectionHeading } from "@/components/section-heading"

type PlanFeature = {
  name: string
  included: boolean | string
  tooltip?: string
}

type Plan = {
  id: string
  name: string
  price: number | string
  period: string
  description: string
  popular?: boolean
  features: PlanFeature[]
  cta: string
  ctaLink: string
  badge?: string
  location: "bundoran" | "killybegs" | "both"
}

export default function MembershipsPage() {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [activeLocation, setActiveLocation] = useState<"bundoran" | "killybegs">("bundoran")
  const pricingSectionRef = useRef<HTMLDivElement>(null)
  const faqSectionRef = useRef<HTMLDivElement>(null)

  const plans: Plan[] = [
    // Bundoran memberships
    {
      id: "basic-bundoran",
      name: "Basic",
      price: 49,
      period: "month",
      description: "Perfect for those starting their fitness journey",
      features: [
        { name: "Gym access (6am-10pm)", included: true },
        { name: "Basic fitness assessment", included: true },
        { name: "2 group classes per week", included: true },
        { name: "Locker room access", included: true },
        { name: "Fitness app access", included: true },
        { name: "Workout plan", included: true },
        { name: "Free WiFi", included: true },
      ],
      cta: "Sign Up Now",
      ctaLink: "/contact?plan=basic-bundoran",
      location: "bundoran",
    },
    {
      id: "premium-bundoran",
      name: "Premium",
      price: 79,
      period: "month",
      description: "Our most popular plan for fitness enthusiasts",
      popular: true,
      badge: "Most Popular",
      features: [
        { name: "24/7 gym access", included: true },
        { name: "Comprehensive fitness assessment", included: true },
        { name: "Unlimited group classes", included: true },
        { name: "Personal training sessions", included: "1 per month" },
        { name: "Nutrition consultation", included: true },
        { name: "Premium app features", included: true },
        { name: "Towel service", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=premium-bundoran",
      location: "bundoran",
    },
    {
      id: "elite-bundoran",
      name: "Elite",
      price: 99,
      period: "month",
      description: "The ultimate fitness experience with premium perks",
      features: [
        { name: "24/7 gym access", included: true },
        { name: "Comprehensive fitness assessment", included: true },
        { name: "Unlimited group classes", included: true },
        { name: "Personal training sessions", included: "2 per month" },
        { name: "Nutrition consultation", included: true },
        { name: "Premium app features", included: true },
        { name: "Towel service", included: true },
        { name: "Recovery zone access", included: true },
        { name: "Guest passes", included: "2 per month" },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=elite-bundoran",
      location: "bundoran",
    },
    {
      id: "student-bundoran",
      name: "Student",
      price: 39,
      period: "month",
      description: "Special rate for full-time students",
      features: [
        { name: "Gym access (6am-10pm)", included: true },
        { name: "Basic fitness assessment", included: true },
        { name: "2 group classes per week", included: true },
        {
          name: "Valid student ID required",
          included: true,
          tooltip: "Must present a valid student ID from an accredited institution",
        },
        { name: "Locker room access", included: true },
        { name: "Fitness app access", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=student-bundoran",
      location: "bundoran",
    },
    {
      id: "senior-bundoran",
      name: "Senior",
      price: 39,
      period: "month",
      description: "For members aged 65+",
      features: [
        { name: "Gym access (6am-10pm)", included: true },
        { name: "Basic fitness assessment", included: true },
        { name: "Senior-focused classes", included: true },
        { name: "Personalized workout plan", included: true },
        { name: "Locker room access", included: true },
        { name: "Fitness app access", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=senior-bundoran",
      location: "bundoran",
    },
    {
      id: "family-bundoran",
      name: "Family",
      price: 129,
      period: "month",
      description: "For families up to 4 members",
      features: [
        { name: "Gym access for all members", included: true },
        { name: "Family fitness assessment", included: true },
        { name: "Access to all classes", included: true },
        { name: "Shared nutrition consultation", included: true },
        { name: "Locker room access", included: true },
        { name: "Fitness app access for all", included: true },
        { name: "Additional members", included: "€25/month each" },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=family-bundoran",
      location: "bundoran",
    },
    {
      id: "corporate-bundoran",
      name: "Corporate",
      price: "Custom",
      period: "",
      description: "Special rates for businesses",
      features: [
        { name: "Discounted rates for employees", included: true },
        { name: "Team building activities", included: true },
        { name: "Corporate wellness programs", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Customized group classes", included: true },
        {
          name: "Contact for pricing",
          included: true,
          tooltip: "Pricing depends on company size and specific requirements",
        },
      ],
      cta: "Contact Us",
      ctaLink: "/contact?plan=corporate-bundoran",
      location: "bundoran",
    },
    {
      id: "annual-bundoran",
      name: "Annual",
      price: 499,
      period: "year",
      description: "Best value for committed members",
      features: [
        { name: "All Premium features", included: true },
        { name: "Save over €400 annually", included: true },
        { name: "Free gym merchandise", included: true },
        { name: "Priority class booking", included: true },
        { name: "Exclusive member events", included: true },
        { name: "Freeze option", included: "Up to 1 month" },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=annual-bundoran",
      location: "bundoran",
    },
    {
      id: "day-pass-bundoran",
      name: "Day Pass",
      price: 15,
      period: "day",
      description: "Try our gym for a day",
      features: [
        { name: "Full gym access for one day", included: true },
        { name: "Access to all facilities", included: true },
        { name: "Join any class (subject to availability)", included: true },
        { name: "No commitment required", included: true },
        { name: "Locker room access", included: true },
      ],
      cta: "Get Pass",
      ctaLink: "/contact?plan=day-pass-bundoran",
      location: "bundoran",
    },

    // Killybegs memberships
    {
      id: "basic-killybegs",
      name: "Basic",
      price: 45,
      period: "month",
      description: "Essential gym access in Killybegs",
      features: [
        { name: "Gym access (6am-10pm)", included: true },
        { name: "Basic fitness assessment", included: true },
        { name: "Locker room access", included: true },
        { name: "Fitness app access", included: true },
        { name: "Free WiFi", included: true },
      ],
      cta: "Sign Up Now",
      ctaLink: "/contact?plan=basic-killybegs",
      location: "killybegs",
    },
    {
      id: "premium-killybegs",
      name: "Premium",
      price: 69,
      period: "month",
      description: "Enhanced experience at our Killybegs location",
      popular: true,
      badge: "Most Popular",
      features: [
        { name: "24/7 gym access", included: true },
        { name: "Comprehensive fitness assessment", included: true },
        { name: "All available classes", included: true },
        { name: "Nutrition consultation", included: true },
        { name: "Personalized workout plan", included: true },
        { name: "Fitness app access", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=premium-killybegs",
      location: "killybegs",
    },
    {
      id: "day-pass-killybegs",
      name: "Day Pass",
      price: 12,
      period: "day",
      description: "Try our Killybegs gym for a day",
      features: [
        { name: "Full gym access for one day", included: true },
        { name: "Access to all facilities", included: true },
        { name: "No commitment required", included: true },
        { name: "Locker room access", included: true },
      ],
      cta: "Get Pass",
      ctaLink: "/contact?plan=day-pass-killybegs",
      location: "killybegs",
    },
  ]

  // Filter plans by location and sort to show day passes first
  const filteredPlans = plans
    .filter((plan) => plan.location === activeLocation || plan.location === "both")
    .sort((a, b) => {
      // Put day passes first
      if (a.id.includes("day-pass") && !b.id.includes("day-pass")) return -1
      if (!a.id.includes("day-pass") && b.id.includes("day-pass")) return 1
      return 0
    })

  // Animation for sections
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

    if (pricingSectionRef.current) observer.observe(pricingSectionRef.current)
    if (faqSectionRef.current) observer.observe(faqSectionRef.current)

    return () => {
      if (pricingSectionRef.current) observer.unobserve(pricingSectionRef.current)
      if (faqSectionRef.current) observer.unobserve(faqSectionRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        badge="Simple Pricing"
        title="Choose your plan"
        subtitle="Affordable memberships for all fitness levels. No hidden fees."
        backgroundImage="/images/membershipbackgroundimage.png"
      />

      {/* Membership Plans */}
      <section
        ref={pricingSectionRef}
        className="py-16 bg-white opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading
            badge="Membership Options"
            title="Select the Perfect Plan for Your Goals"
            description="We offer flexible membership options to fit your lifestyle and fitness needs."
            centered={true}
          />

          {/* Location tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-colors",
                  activeLocation === "bundoran" ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-200",
                )}
                onClick={() => setActiveLocation("bundoran")}
              >
                Bundoran
              </button>
              <button
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-colors",
                  activeLocation === "killybegs" ? "bg-pink-500 text-white" : "text-gray-700 hover:bg-gray-200",
                )}
                onClick={() => setActiveLocation("killybegs")}
              >
                Killybegs
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl relative bg-white h-full border border-gray-200",
                  plan.popular && "border-orange-500",
                )}
              >
                {plan.badge && (
                  <div
                    className={cn(
                      "absolute top-0 left-6 px-4 py-1 rounded-b-lg text-white font-medium text-sm",
                      plan.popular ? "bg-orange-500" : "bg-green-500",
                    )}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-500 mb-6">{plan.description}</p>

                    <div className="mb-6">
                      {typeof plan.price === "number" ? (
                        <>
                          <span className="text-5xl font-bold">${plan.price}</span>
                          <span className="text-gray-500">/{plan.period}</span>
                        </>
                      ) : (
                        <span className="text-4xl font-bold">{plan.price}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="text-orange-500 flex-shrink-0 mt-1">
                          <Check className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-700">
                            {feature.name}
                            {typeof feature.included === "string" && `: ${feature.included}`}
                          </span>
                          {feature.tooltip && (
                            <div className="relative">
                              <button
                                className="text-gray-400 hover:text-gray-600"
                                onMouseEnter={() => setShowTooltip(`${plan.id}-${index}`)}
                                onMouseLeave={() => setShowTooltip(null)}
                              >
                                <Info className="h-4 w-4" />
                              </button>
                              {showTooltip === `${plan.id}-${index}` && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
                                  {feature.tooltip}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link href={plan.ctaLink} className="mt-auto">
                    <Button
                      className={cn(
                        "w-full font-medium",
                        plan.popular
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "bg-white border border-gray-200 hover:bg-gray-50 text-black",
                      )}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqSectionRef}
        className="py-16 bg-gray-50 opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeading
            badge="Common Questions"
            title="Frequently Asked Questions"
            description="Find answers to the most common questions about our membership plans."
            centered={true}
          />

          <div className="space-y-6 mt-12">
            <div className="bg-white p-6 rounded-xl hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Can I freeze my membership?</h3>
              <p className="text-gray-600">
                Yes, you can freeze your membership for up to 3 months per year. There's a small administrative fee of
                $10 per month while your membership is frozen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Is there a joining fee?</h3>
              <p className="text-gray-600">
                There is a one-time joining fee of $49 for all new members. This covers your initial fitness assessment
                and personalized workout plan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Can I cancel my membership anytime?</h3>
              <p className="text-gray-600">
                Monthly memberships require a 30-day notice for cancellation. Annual memberships can be canceled with a
                30-day notice after the initial 6-month commitment period.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Do you offer family discounts?</h3>
              <p className="text-gray-600">
                Yes, we offer a 10% discount on additional family memberships when two or more family members join
                together.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Can I use my membership at both locations?</h3>
              <p className="text-gray-600">
                Premium and Elite memberships at either location include access to both our Bundoran and Killybegs
                facilities. Basic memberships are location-specific.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Still have questions about our membership plans?</p>
            <Link href="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium flex items-center gap-2 group">
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 bg-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start your fitness journey?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join BMS Warehouse Gym today and transform your fitness with our state-of-the-art facilities, expert
            trainers, and supportive community.
          </p>
          <Link href="/contact">
            <Button className="bg-black text-white hover:bg-gray-900 font-medium rounded-full px-8 py-6 transition-all duration-300 hover:scale-105">
              JOIN NOW
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

