import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Membership Plans</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Choose the perfect membership plan that fits your fitness goals and lifestyle. All plans include access to
            our state-of-the-art facilities and supportive community.
          </p>

          {/* Pricing content would go here */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:border-primary">
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <p className="text-gray-500 mb-6">Perfect for beginners</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Gym access (6am-10pm)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Basic fitness assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>2 group classes per week</span>
                </li>
              </ul>
              <Button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-black">
                Choose Plan
              </Button>
            </div>

            <div className="border-2 border-primary rounded-xl p-8 shadow-lg relative">
              <div className="absolute top-0 right-0 bg-primary px-4 py-1 rounded-bl-xl rounded-tr-xl text-black font-medium text-sm">
                Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-gray-500 mb-6">Best value for fitness enthusiasts</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>24/7 gym access</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Comprehensive fitness assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Unlimited group classes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>1 personal training session/month</span>
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90 text-black">Choose Plan</Button>
            </div>

            <div className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:border-primary">
              <h3 className="text-xl font-bold mb-2">Elite</h3>
              <p className="text-gray-500 mb-6">For serious fitness goals</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$129</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>24/7 gym access</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Advanced fitness assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Unlimited group classes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>4 personal training sessions/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Nutrition consultation</span>
                </li>
              </ul>
              <Button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-black">
                Choose Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

