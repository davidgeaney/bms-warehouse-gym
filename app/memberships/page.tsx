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
      id: "nrg-group-bundoran",
      name: "NRG Group Training",
      price: 79,
      period: "month",
      description: "Group training sessions designed for all fitness levels",
      features: [
        { name: "Instructor Led Sessions", included: true },
        { name: "Free Access To Our App", included: true },
        { name: "Suitable For All Fitness Levels", included: true },
        { name: "Monthly Rolling Membership", included: true },
        { name: "30 Days Notice for Cancellation", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=nrg-group-bundoran",
      location: "bundoran",
    },
    {
      id: "platinum-bundoran",
      name: "Platinum Membership",
      price: 95,
      period: "month",
      description: "Complete access to group training and gym facilities",
      popular: true,
      badge: "Most Popular",
      features: [
        { name: "Unlimited Access To All Group Training", included: true },
        { name: "Unlimited Access To The Gym", included: true },
        { name: "1 Free Body Scan Each Month", included: true },
        { name: "Suitable For All Fitness Levels", included: true },
        { name: "1 Month Rolling Membership", included: true },
        { name: "30 Days Notice for Cancellation", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=platinum-bundoran",
      location: "bundoran",
    },
    {
      id: "diamond-bundoran",
      name: "Diamond Membership",
      price: 130,
      period: "month",
      description: "Premium membership with access to all facilities and programs",
      features: [
        { name: "Unlimited Gym Access", included: true },
        { name: "Unlimited Group Training", included: true },
        { name: "Unlimited SoulRevive (Bundoran)", included: true },
        { name: "Personalised Hyrox Training Programme", included: true },
        { name: "Access All BMS Gyms", included: true },
        { name: "Monthly Rolling Membership", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=diamond-bundoran",
      location: "bundoran",
    },
    {
      id: "1-month-gym-bundoran",
      name: "1 Month Gym Membership",
      price: 50,
      period: "month",
      description: "Basic gym access with monthly renewal",
      features: [
        { name: "Unlimited Gym Access", included: true },
        { name: "Monthly Rolling Membership", included: true },
        { name: "30 Days Notice for Cancellation", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=1-month-gym-bundoran",
      location: "bundoran",
    },
    {
      id: "3-month-gym-bundoran",
      name: "3 Month Gym Membership",
      price: 140,
      period: "one-time",
      description: "3-month commitment with savings",
      features: [
        { name: "Unlimited Gym Access", included: true },
        { name: "3 Months Membership", included: true },
        { name: "One-time Payment", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=3-month-gym-bundoran",
      location: "bundoran",
    },
    {
      id: "6-month-gym-bundoran",
      name: "6 Month Gym Membership",
      price: 260,
      period: "one-time",
      description: "6-month commitment with greater savings",
      features: [
        { name: "Unlimited Gym Access", included: true },
        { name: "6 Months Membership", included: true },
        { name: "One-time Payment", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=6-month-gym-bundoran",
      location: "bundoran",
    },
    {
      id: "1-year-gym-bundoran",
      name: "1 Year Gym Membership",
      price: 470,
      period: "one-time",
      description: "Best value annual membership",
      features: [
        { name: "Unlimited Gym Access", included: true },
        { name: "12 Months Membership", included: true },
        { name: "One-time Payment", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=1-year-gym-bundoran",
      location: "bundoran",
    },
    {
      id: "casual-month-bundoran",
      name: "1 Month Casual Membership",
      price: 50,
      period: "one-time",
      description: "Flexible one-month access",
      features: [
        { name: "Unlimited Gym Access", included: true },
        { name: "1 Month Membership", included: true },
        { name: "One-time Payment", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=casual-month-bundoran",
      location: "bundoran",
    },
    {
      id: "day-pass-bundoran",
      name: "Day Pass",
      price: 12,
      period: "one-time",
      description: "Try our gym for a day",
      features: [
        { name: "Full Gym Access For One Day", included: true },
        { name: "Access To All Facilities", included: true },
        { name: "No Commitment Required", included: true },
      ],
      cta: "Get Pass",
      ctaLink: "/contact?plan=day-pass-bundoran",
      location: "bundoran",
    },

    // Killybegs memberships
    {
      id: "day-pass-killybegs",
      name: "Day Pass",
      price: 12,
      period: "one-time",
      description: "Try our gym for a day",
      features: [
        { name: "Full Gym Access For One Day", included: true },
        { name: "Access To All Facilities", included: true },
        { name: "No Commitment Required", included: true },
      ],
      cta: "Get Pass",
      ctaLink: "/contact?plan=day-pass-killybegs",
      location: "killybegs",
    },
    {
      id: "platinum-killybegs",
      name: "Platinum Membership",
      price: 95,
      period: "month",
      description: "Complete access to group training and gym facilities",
      popular: true,
      badge: "Most Popular",
      features: [
        { name: "Unlimited Access To All Group Training", included: true },
        { name: "Unlimited Access To The Gym", included: true },
        { name: "1 Free Body Scan Each Month", included: true },
        { name: "Suitable For All Fitness Levels", included: true },
        { name: "1 Month Rolling Membership", included: true },
        { name: "30 Days Notice for Cancellation", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=platinum-killybegs",
      location: "killybegs",
    },
    {
      id: "1-month-gym-killybegs",
      name: "1 Month Gym Membership",
      price: 50,
      period: "month",
      description: "Basic gym access with monthly renewal",
      features: [
        { name: "Unlimited Gym Access", included: true },
        { name: "Monthly Rolling Membership", included: true },
        { name: "30 Days Notice for Cancellation", included: true },
      ],
      cta: "Join Now",
      ctaLink: "/contact?plan=1-month-gym-killybegs",
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

  useEffect(() => {
    // Handle smooth scrolling on the client side only
    const handleScroll = () => {
      document.documentElement.style.scrollBehavior = "smooth"
    }

    // Add the event listener
    window.addEventListener("scroll", handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const ScrollToTop = () => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }

    return (
      <button onClick={scrollToTop}>
        Scroll to top
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        badge="Simple Pricing"
        title="Choose your plan"
        subtitle="Affordable memberships for all fitness levels. No hidden fees."
        backgroundImage="/images/backgrounds/membershipbackgroundimage.webp"
      />

      {/* Membership Plans */}
      <section
        ref={pricingSectionRef}
        className="py-16 bg-white opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading
            badge="Let's Talk Pricing"
            title="Find Your Perfect Plan"
            description="Join us with a plan that fits your lifestyle - no surprises, just straightforward pricing."
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
                          <span className="text-5xl font-bold">€{plan.price}</span>
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
            badge="Got Questions?"
            title="We've Got Answers"
            description="Here are the answers to questions our members ask most often. Still curious? Just reach out!"
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

