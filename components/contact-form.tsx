"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CheckCircle2, Send } from "lucide-react"

export function ContactForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)

    try {
      console.log('Submitting form data:', formData)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      })

      // Show success state and message
      setIsSuccess(true)
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
        variant: "default",
      })
    } catch (error) {
      console.error('Form submission error:', error)
      // Show error message
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      })
      // Reset success state in case of error
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (isSuccess) {
    return (
      <div className="w-full min-h-[300px] flex flex-col items-center justify-center py-6 md:py-12 text-center px-4">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-fade-in-scale">
          <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-green-600" />
        </div>
        <div className="space-y-3 w-full max-w-sm mx-auto">
          <h3 className="text-lg md:text-2xl font-bold text-gray-900">Message Sent Successfully!</h3>
          <p className="text-gray-600 text-sm md:text-base px-2">
            Thank you for reaching out. We'll get back to you as soon as possible.
          </p>
          <div className="pt-4">
            <Button
              onClick={() => setIsSuccess(false)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 md:px-6 py-2 text-sm md:text-base transition-all duration-300 hover:scale-105"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="w-full transition-all duration-200 focus:ring-2 focus:ring-orange-500 border-gray-200"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="w-full transition-all duration-200 focus:ring-2 focus:ring-orange-500 border-gray-200"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="How can we help you?"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="w-full min-h-[150px] transition-all duration-200 focus:ring-2 focus:ring-orange-500 border-gray-200 resize-y"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className={`w-full font-medium transition-all duration-300 ${
          isLoading
            ? "bg-orange-400"
            : "bg-orange-500 hover:bg-orange-600 hover:scale-[1.02]"
        } text-white shadow-sm hover:shadow-md`}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="text-sm md:text-base">Sending...</span>
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            <span className="text-sm md:text-base">Send Message</span>
          </>
        )}
      </Button>
    </form>
  )
}