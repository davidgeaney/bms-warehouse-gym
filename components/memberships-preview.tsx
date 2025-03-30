"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"

type MembershipPlan = {
  id: string
  name: string
  price: number | string
  period: string
  description: string
  popular?: boolean
  features: string[]
  cta: string
  ctaLink: string
  badge?: string
  location: "bundoran" | "killybegs" | "both"
}

export function MembershipsPreview() {
  const [activeLocation, setActiveLocation] = useState<"bundoran" | "killybegs">("bundoran")
  const planRefs = useRef<(HTMLDivElement | null)[]>([])

  const plans: MembershipPlan[] = [
    // Bundoran memberships
    {
      id: "day-pass-bundoran",
      name: "Day Pass",
      price: 15,
      period: "day",
      description: "Try our gym for a day",
      features: [
        "Full gym access for one day",
        "Access to all facilities",
        "Join any class (subject to availability)",
        "No commitment required",
      ],
      cta: "Get Pass",
      ctaLink: "/contact?plan=day-pass-bundoran",
      location: "bundoran",
    },
    {
      id: "basic-bundoran",
      name: "Basic",
      price: 49,
      period: "month",
      description: "Perfect for those starting their fitness journey",
      features: [
        "Gym access (6am-10pm)",
        "Basic fitness assessment",
        "2 group classes per week",
        "Locker room access",
        "Fitness app access",
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
        "24/7 gym access",
        "Comprehensive fitness assessment",
        "Unlimited group classes",
        "1 personal training session/month",
        "Nutrition consultation",
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
        "24/7 gym access",
        "Comprehensive fitness assessment",
        "Unlimited group classes",
        "2 personal training sessions/month",
        "Nutrition consultation",
        "Premium app features",
        "Towel service",
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
        "Gym access (6am-10pm)",
        "Basic fitness assessment",
        "2 group classes per week",
        "Valid student ID required",
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
        "Gym access (6am-10pm)",
        "Basic fitness assessment",
        "Senior-focused classes",
        "Personalized workout plan",
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
        "Gym access for all members",
        "Family fitness assessment",
        "Access to all classes",
        "Shared nutrition consultation",
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
        "Discounted rates for employees",
        "Team building activities",
        "Corporate wellness programs",
        "Contact for pricing",
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
      features: ["All Premium features", "Save over €400 annually", "Free gym merchandise", "Priority class booking"],
      cta: "Join Now",
      ctaLink: "/contact?plan=annual-bundoran",
      location: "bundoran",
    },

    // Killybegs memberships
    {
      id: "day-pass-killybegs",
      name: "Day Pass",
      price: 12,
      period: "day",
      description: "Try our Killybegs gym for a day",
      features: ["Full gym access for one day", "Access to all facilities", "No commitment required"],
      cta: "Get Pass",
      ctaLink: "/contact?plan=day-pass-killybegs",
      location: "killybegs",
    },
    {
      id: "basic-killybegs",
      name: "Basic",
      price: 45,
      period: "month",
      description: "Essential gym access in Killybegs",
      features: ["Gym access (6am-10pm)", "Basic fitness assessment", "Locker room access", "Fitness app access"],
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
        "24/7 gym access",
        "Comprehensive fitness assessment",
        "All available classes",
        "Nutrition consultation",
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=premium-killybegs",
      location: "killybegs",
    },
  ]

  // Filter plans by location
  const filteredPlans = plans.filter((plan) => plan.location === activeLocation || plan.location === "both")

  // Get featured plans (limit to 2 for preview)
  const featuredPlans =
    filteredPlans.length > 0
      ? filteredPlans.slice(0, 2)
      : plans.filter((plan) => plan.location === "bundoran").slice(0, 2) // Fallback to bundoran plans if filtered is empty

  useEffect(() => {
    // Reset animation classes when location changes
    planRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.remove("animate-in")
        // Force a reflow to restart animations
        void ref.offsetWidth
      }
    })

    // Re-observe elements after location change
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

    planRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      planRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [activeLocation])

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Simple Pricing"
          title="Choose your plan"
          description="Affordable memberships for all fitness levels. No hidden fees."
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

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {featuredPlans.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => (planRefs.current[index] = el)}
              className={cn(
                "rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl relative bg-white h-full border border-gray-200 opacity-0 translate-y-8 transition-all duration-700 ease-out",
                plan.popular && "border-orange-500",
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {plan.badge && (
                <div
                  className={cn(
                    "absolute top-0 left-6 px-4 py-1 rounded-b-lg text-black font-medium text-sm",
                    plan.popular ? "bg-orange-500" : "bg-green-500",
                  )}
                >
                  {plan.badge}
                </div>
              )}

              <div className="p-8 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-orange-500">{plan.name}</h3>
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
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="text-orange-500 flex-shrink-0 mt-1">
                        <Check className="h-5 w-5" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href={plan.ctaLink} className="mt-auto">
                  <Button
                    className={cn(
                      "w-full font-medium",
                      plan.popular
                        ? "bg-orange-500 hover:bg-orange-500/70 text-white"
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

        <div className="flex justify-center mt-12">
          <Link href="/memberships">
            <Button className="bg-white border border-gray-200 hover:bg-gray-50 text-black font-medium group">
              View All Plans
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

