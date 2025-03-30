"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Instagram, Facebook, Twitter, ArrowRight } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success")
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus("idle")
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        badge="Get in Touch"
        title="Contact Us"
        subtitle="Have questions or want to learn more about our gym? Reach out to us and our team will get back to you as soon as possible."
        backgroundImage="/images/contactbackgroundimage.png"
      />

      {/* Contact Form & Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium w-full flex items-center justify-center gap-2"
                    disabled={formStatus === "submitting"}
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-white p-8 rounded-xl mb-8 border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Our Location</h4>
                      <address className="not-italic text-gray-600">
                        123 Fitness Street
                        <br />
                        Warehouse District
                        <br />
                        City, State 12345
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone Number</h4>
                      <p className="text-gray-600">
                        <a href="tel:+11234567890" className="hover:text-pink-500 transition-colors">
                          (123) 456-7890
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email Address</h4>
                      <p className="text-gray-600">
                        <a href="mailto:info@bmswarehousegym.com" className="hover:text-pink-500 transition-colors">
                          info@bmswarehousegym.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Opening Hours</h4>
                      <div className="space-y-1 text-gray-600">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>5:00 AM - 11:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span>6:00 AM - 10:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span>7:00 AM - 9:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/bms_warehouse_gym/"
                    className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/bmswarehousegym.ie"
                    className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6">Find Our Gym</h2>
              <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden">
                {/* This would be replaced with an actual map component */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">Interactive Map Would Go Here</p>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100transition-all duration-300">
                <h3 className="text-xl font-bold mb-4">Main Location</h3>
                <address className="not-italic text-gray-600 mb-4">
                  123 Fitness Street
                  <br />
                  Warehouse District
                  <br />
                  City, State 12345
                </address>
                <p className="text-sm text-gray-500 mb-4">
                  Our flagship location with full amenities, including pool and sauna.
                </p>
                <Button className="bg-pink-500 hover:bg-pink-600 text-white font-medium w-full group">
                  Get Directions
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4">Downtown Branch</h3>
                <address className="not-italic text-gray-600 mb-4">
                  456 Central Avenue
                  <br />
                  Downtown
                  <br />
                  City, State 12345
                </address>
                <p className="text-sm text-gray-500 mb-4">Convenient downtown location with 24/7 access for members.</p>
                <Button className="bg-pink-500 hover:bg-pink-600 text-white font-medium w-full group">
                  Get Directions
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start your fitness journey?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join BMS Warehouse Gym today and transform your fitness with our state-of-the-art facilities, expert
            trainers, and supportive community.
          </p>
          <Link href="/memberships">
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

