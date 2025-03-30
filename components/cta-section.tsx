import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 max-w-2xl mx-auto">
          Join our community and embark on your journey to optimal fitness & health!
        </h2>
        <p className="text-black/80 mb-8 max-w-xl mx-auto">
          Sign up for our waitlist now to be the first to access exclusive content
        </p>
        <Button className="bg-white text-black hover:bg-gray-100 font-medium rounded-full px-8 py-6 transition-all duration-300 hover:scale-105">
          JOIN NOW
        </Button>
      </div>
    </section>
  )
}

