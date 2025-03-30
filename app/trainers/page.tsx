import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TrainersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Trainers</h1>
          <p className="text-gray-600 max-w-3xl mb-12">
            Meet our expert team of fitness professionals dedicated to helping you achieve your goals. Each trainer
            brings unique expertise and passion to create personalized fitness experiences.
          </p>

          {/* Trainers content would go here */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for trainer cards */}
            <div className="bg-gray-100 p-8 rounded-xl h-80 flex items-center justify-center">Trainer Card 1</div>
            <div className="bg-gray-100 p-8 rounded-xl h-80 flex items-center justify-center">Trainer Card 2</div>
            <div className="bg-gray-100 p-8 rounded-xl h-80 flex items-center justify-center">Trainer Card 3</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

