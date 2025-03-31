"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/section-heading"
import { Users, Heart, Dumbbell, Play, Target, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type TeamMember = {
  id: number
  name: string
  role: string
  bio: string
  image: string
  socialLinks: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
}

type CoreValue = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

type Milestone = {
  year: string
  title: string
  description: string
  image: string
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<string>("mission")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Patrick Gill",
      role: "Personal Trainer",
      bio: "His experience brings our team a wealth of knowledge and his clients are kicking some serious goals. He has competed in bodybuilding and can help if you are on that journey. Specializes in developing your physique and getting you into a winning mindset.",
      image: "/images/trainerpatrick.png",
      socialLinks: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
      },
    },
    {
      id: 2,
      name: "Liam Hegarty (PUNK)",
      role: "Personal Trainer & Surf Instructor",
      bio: "Phase IV Cardiac Rehab Trainer. His clients are achieving amazing results under his guidance. Specializes in surfer programs and physique development.",
      image: "/images/trainerliam.png",
      socialLinks: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
      },
    },
    {
      id: 3,
      name: "Eiméar McGrory",
      role: "Personal Trainer",
      bio: "Has a passion for promoting healthy behaviour and encouraging a physically active lifestyle at all stages of life. Very passionate about team sport and personal performance.",
      image: "/images/trainereimear.png",
      socialLinks: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
      },
    },
  ]

  const coreValues: CoreValue[] = [
    {
      id: "passion",
      title: "Passion",
      description:
        "Trainers selected for their genuine enthusiasm and commitment to helping members achieve their fitness goals.",
      icon: <Heart className="h-6 w-6 text-black" />,
    },
    {
      id: "excellence",
      title: "Excellence",
      description: "Maintaining the highest standards in equipment, training programs, and member services.",
      icon: <Dumbbell className="h-6 w-6 text-black" />,
    },
    {
      id: "community",
      title: "Community",
      description: "Creating an inclusive environment where everyone feels welcome, motivated and supported.",
      icon: <Users className="h-6 w-6 text-black" />,
    },
  ]

  const milestones: Milestone[] = [
    {
      year: "2018",
      title: "The Beginning",
      description:
        "What started as a small warehouse with basic equipment has grown into something special. We had a vision to create a different kind of fitness experience - one that focused on community and real results.",
      image: "/images/thebeginning.png",
    },
    {
      year: "2019",
      title: "Growing Community",
      description:
        "Word spread quickly about our unique approach. We expanded our facility and added specialized training programs to meet the diverse needs of our growing community.",
      image: "/images/growingcommunity.png",
    },
    {
      year: "2020",
      title: "Adapting & Innovating",
      description:
        "When the world changed, we adapted. We introduced virtual training options and outdoor classes, finding new ways to keep our community strong and motivated.",
      image: "/images/adaptingandinnovating.png",
    },
    {
      year: "2022",
      title: "New Heights",
      description:
        "Our community reached new heights as we introduced more specialized programs and expanded our training team. The energy in our gym was electric!",
      image: "/images/continuedgrowth.png",
    },
    {
      year: "2025",
      title: "Expansion",
      description:
        "We're excited to announce our second location, bringing our unique approach to fitness to even more people in the community. The journey continues!",
      image: "/images/comingsoon.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        badge="Our Story"
        title="More Than Just a Gym"
        subtitle="We're a community of fitness enthusiasts, dedicated to helping you reach your goals and transform your life."
        backgroundImage="/images/backgrounds/aboutbackgroundimage.webp"
      />

      {/* Tab Navigation */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8 hidden md:flex">
            <div className="inline-flex items-center bg-gray-100 p-1 rounded-full overflow-x-auto max-w-full">
              <button
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                  activeTab === "mission" ? "bg-orange-500 text-white" : "bg-transparent text-gray-600",
                )}
                onClick={() => {
                  setActiveTab("mission")
                  scrollToTop()
                }}
              >
                Our Mission
              </button>
              <button
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                  activeTab === "values" ? "bg-pink-500 text-white" : "bg-transparent text-gray-600",
                )}
                onClick={() => {
                  setActiveTab("values")
                  scrollToTop()
                }}
              >
                Core Values
              </button>
              <button
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                  activeTab === "story" ? "bg-blue-500 text-white" : "bg-transparent text-gray-600",
                )}
                onClick={() => {
                  setActiveTab("story")
                  scrollToTop()
                }}
              >
                Our Story
              </button>
              <button
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                  activeTab === "team" ? "bg-orange-500 text-white" : "bg-transparent text-gray-600",
                )}
                onClick={() => {
                  setActiveTab("team")
                  scrollToTop()
                }}
              >
                Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile View - All Sections Stacked */}
      <div className="md:hidden">
        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeading
              badge="Why We're Here"
              title="More Than Just a Gym"
              description="We're building a community where everyone can thrive, grow stronger, and achieve their personal best."
              centered={true}
            />

            <div className="grid md:grid-cols-2 gap-16 items-center mt-12">
              <div className="relative">
                <div className="absolute -top-6 -left-6 bg-orange-500/10 w-full h-full rounded-xl"></div>
                <div className="relative rounded-xl overflow-hidden">
                  <div className="relative aspect-video">
                    <iframe
                      src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fbmswarehousegym.ie%2Fvideos%2F1208825770023707%2F&show_text=false&width=560&t=0"
                      width="560"
                      height="314"
                      style={{ border: "none", overflow: "hidden" }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Accessible Fitness</h3>
                      <p className="text-gray-600">
                        Making quality fitness accessible to everyone, regardless of experience level
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Supportive Community</h3>
                      <p className="text-gray-600">
                        Building a community that motivates and supports each member's journey
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Holistic Approach</h3>
                      <p className="text-gray-600">
                        Addressing all aspects of wellness: physical, mental, and nutritional
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mt-8">
                  We believe that fitness is not just about physical strength, but about building confidence,
                  resilience, and a healthier lifestyle that extends beyond the gym walls. Our dedicated team is
                  committed to providing the guidance, resources, and motivation you need to succeed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeading
              badge="Our Heart & Soul"
              title="What We Stand For"
              description="These are the values that drive everything we do - from how we train to how we support our members."
              centered={true}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {coreValues.map((value) => (
                <div
                  key={value.id}
                  className="group bg-white rounded-xl p-8 border border-gray-100 transition-all duration-500 hover:shadow-xl relative overflow-hidden"
                >
                  {/* Sliding shadow effect */}
                  <div className="absolute inset-0 bg-orange-500/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out z-0"></div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-6 text-pink-500">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <Image
                    src="/images/ourvaluesinaction.png"
                    alt="Our Values in Action"
                    width={400}
                    height={400}
                    className="rounded-xl"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">Our Values in Action</h3>
                  <p className="text-gray-600 mb-4">
                    At BMS Warehouse Gym, our values aren't just words on a wall—they're the foundation of everything we
                    do. From the moment you walk through our doors, you'll experience a community built on passion,
                    excellence, integrity, and support.
                  </p>
                  <p className="text-gray-600">
                    Our trainers embody these values in every session, our facilities are designed with these principles
                    in mind, and our programs are developed to reflect our commitment to your success and wellbeing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section - Mobile Optimized */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeading
              badge="Our Story"
              title="From Dream to Reality"
              description="See how we've grown from a small warehouse to becoming your trusted fitness partner."
              centered={true}
            />

            <div className="mt-16 space-y-16">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="flex flex-col gap-8 items-center">
                  <div className="w-full">
                    <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={milestone.image || "/placeholder.svg"}
                        alt={milestone.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-bold">
                        {milestone.year}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <h3 className="text-2xl font-bold mb-4">{milestone.title}</h3>
                    <p className="text-gray-600 text-lg">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-16 bg-pink-500 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-5xl font-bold text-white mb-2">2</div>
                  <p className="text-white/80 font-medium">Locations</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-white mb-2">15+</div>
                  <p className="text-white/80 font-medium">Expert Trainers</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-white mb-2">5,000+</div>
                  <p className="text-white/80 font-medium">Happy Members</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-white mb-2">30+</div>
                  <p className="text-white/80 font-medium">Weekly Classes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeading
              badge="Meet the Family"
              title="The Team Behind Your Success"
              description="Get to know the passionate professionals dedicated to helping you reach your goals."
              centered={true}
            />

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:border-orange-500 transition-all duration-300"
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 w-full">
                        <div className="flex justify-center gap-4">
                          {member.socialLinks.facebook && (
                            <a
                              href={member.socialLinks.facebook}
                              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-all duration-300"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                className="text-white"
                              >
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                              </svg>
                            </a>
                          )}
                          {member.socialLinks.instagram && (
                            <a
                              href={member.socialLinks.instagram}
                              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-pink-500 hover:text-black transition-all duration-300"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                className="text-white"
                              >
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                              </svg>
                            </a>
                          )}
                          {member.socialLinks.twitter && (
                            <a
                              href={member.socialLinks.twitter}
                              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-blue-500 hover:text-black transition-all duration-300"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                className="text-white"
                              >
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                We're always looking for passionate fitness professionals to join our team. If you're dedicated to
                helping others achieve their fitness goals, we'd love to hear from you.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-500/90 text-white font-medium">
                View Career Opportunities
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Desktop View - Tabbed Sections */}
      <div className="hidden md:block">
        {/* Mission Section */}
        {activeTab === "mission" && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <SectionHeading
                badge="Why We're Here"
                title="More Than Just a Gym"
                description="We're building a community where everyone can thrive, grow stronger, and achieve their personal best."
                centered={true}
              />

              <div className="grid md:grid-cols-2 gap-16 items-center mt-12">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 bg-orange-500/10 w-full h-full rounded-xl"></div>
                  <div className="relative rounded-xl overflow-hidden">
                    <div className="relative aspect-video">
                      <iframe
                        src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fbmswarehousegym.ie%2Fvideos%2F1208825770023707%2F&show_text=false&width=560&t=0"
                        width="560"
                        height="314"
                        style={{ border: "none", overflow: "hidden" }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      ></iframe>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <Target className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Accessible Fitness</h3>
                        <p className="text-gray-600">
                          Making quality fitness accessible to everyone, regardless of experience level
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Supportive Community</h3>
                        <p className="text-gray-600">
                          Building a community that motivates and supports each member's journey
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Holistic Approach</h3>
                        <p className="text-gray-600">
                          Addressing all aspects of wellness: physical, mental, and nutritional
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mt-8">
                    We believe that fitness is not just about physical strength, but about building confidence,
                    resilience, and a healthier lifestyle that extends beyond the gym walls. Our dedicated team is
                    committed to providing the guidance, resources, and motivation you need to succeed.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Core Values Section */}
        {activeTab === "values" && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <SectionHeading
                badge="Our Heart & Soul"
                title="What We Stand For"
                description="These are the values that drive everything we do - from how we train to how we support our members."
                centered={true}
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {coreValues.map((value) => (
                  <div
                    key={value.id}
                    className="group bg-white rounded-xl p-8 border border-gray-100 transition-all duration-500 hover:shadow-xl relative overflow-hidden"
                  >
                    {/* Sliding shadow effect */}
                    <div className="absolute inset-0 bg-orange-500/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out z-0"></div>

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-6 text-pink-500">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3">
                    <Image
                      src="/images/ourvaluesinaction.png"
                      alt="Our Values in Action"
                      width={400}
                      height={400}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold mb-4">Our Values in Action</h3>
                    <p className="text-gray-600 mb-4">
                      At BMS Warehouse Gym, our values aren't just words on a wall—they're the foundation of everything
                      we do. From the moment you walk through our doors, you'll experience a community built on passion,
                      excellence, integrity, and support.
                    </p>
                    <p className="text-gray-600">
                      Our trainers embody these values in every session, our facilities are designed with these
                      principles in mind, and our programs are developed to reflect our commitment to your success and
                      wellbeing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Our Story Section */}
        {activeTab === "story" && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <SectionHeading
                badge="Our Story"
                title="From Dream to Reality"
                description="See how we've grown from a small warehouse to becoming your trusted fitness partner."
                centered={true}
              />

              <div className="mt-16 space-y-16">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
                  >
                    <div className="md:w-1/2">
                      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-md">
                        <Image
                          src={milestone.image || "/placeholder.svg"}
                          alt={milestone.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-bold">
                          {milestone.year}
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-2xl font-bold mb-4">{milestone.title}</h3>
                      <p className="text-gray-600 text-lg">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Section */}
              <div className="mt-16 bg-pink-500 rounded-xl p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">2</div>
                    <p className="text-white/80 font-medium">Locations</p>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">15+</div>
                    <p className="text-white/80 font-medium">Expert Trainers</p>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">5,000+</div>
                    <p className="text-white/80 font-medium">Happy Members</p>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">30+</div>
                    <p className="text-white/80 font-medium">Weekly Classes</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Team Section */}
        {activeTab === "team" && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <SectionHeading
                badge="Meet the Family"
                title="The Team Behind Your Success"
                description="Get to know the passionate professionals dedicated to helping you reach your goals."
                centered={true}
              />

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-6 w-full">
                          <div className="flex justify-center gap-4">
                            {member.socialLinks.facebook && (
                              <a
                                href={member.socialLinks.facebook}
                                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-all duration-300"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  className="text-white"
                                >
                                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg>
                              </a>
                            )}
                            {member.socialLinks.instagram && (
                              <a
                                href={member.socialLinks.instagram}
                                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-pink-500 hover:text-black transition-all duration-300"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  className="text-white"
                                >
                                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                </svg>
                              </a>
                            )}
                            {member.socialLinks.twitter && (
                              <a
                                href={member.socialLinks.twitter}
                                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-blue-500 hover:text-black transition-all duration-300"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  className="text-white"
                                >
                                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                  We're always looking for passionate fitness professionals to join our team. If you're dedicated to
                  helping others achieve their fitness goals, we'd love to hear from you.
                </p>
                <Button className="bg-orange-500 hover:bg-orange-500/90 text-white font-medium">
                  View Career Opportunities
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer should be outside the conditional rendering to ensure it's always visible */}
      <Footer />
    </div>
  )
}

