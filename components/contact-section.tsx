"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SectionHeading } from "@/components/section-heading"
import { Send, CheckCircle } from "lucide-react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
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
          name: "",
          email: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Get In Touch"
          title="Questions? We're Here to Help"
          description="Have a question or want to learn more about our gym? Reach out to us and we'll get back to you as soon as possible."
          centered={true}
        />

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm">
          {formStatus === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-600">Thank you for reaching out. We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="focus-visible:ring-2 focus-visible:ring-orange-500"
                />
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
                  className="focus-visible:ring-2 focus-visible:ring-orange-500"
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
                  className="w-full rounded-md border border-black bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-500/90 text-white font-medium w-full flex items-center justify-center gap-2"
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
      </div>
    </section>
  )
}

