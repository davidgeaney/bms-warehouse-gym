import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 py-16 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
            <span className="text-black">            <span className="text-orange-500">B</span>
            <span className="text-pink-500">M</span>
            <span className="text-blue-500">S</span> Warehouse Gym</span>
            </Link>
            <p className="text-gray-500 text-sm mb-6">
              Your premium fitness destination for health, strength, and community.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/bms_warehouse_gym/"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.facebook.com/bmswarehousegym.ie"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-500 hover:text-black transition-colors">
                  Classes
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-500 hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/memberships" className="text-gray-500 hover:text-black transition-colors">
                  Memberships
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/classes" className="text-gray-500 hover:text-black transition-colors">
                  Personal Training
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-500 hover:text-black transition-colors">
                  Group Classes
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-500 hover:text-black transition-colors">
                  Nutrition Coaching
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-500 hover:text-black transition-colors">
                  Online Programs
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-500 hover:text-black transition-colors">
                  Corporate Wellness
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-500 space-y-2">
              <p>Unit 2, Bundoran Retail Park</p>
              <p>Drumacrin, Bundoran</p>
              <p>Co, Donegal, F94 P230</p>
              <p className="mt-4">
                <a href="tel:+353873999934" className="hover:text-black transition-colors">
                +353873999934
                </a>
              </p>
              <p>
                <a href="mailto:info@bmswarehousegym.com" className="hover:text-black transition-colors">
                info@bmswarehousegym.ie
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BMS Warehouse Gym. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-500 text-sm hover:text-black transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-500 text-sm hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-gray-500 text-sm hover:text-black transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Designed & Developed by{" "}
            <a 
              href="https://davidgeaney.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 transition-colors duration-300 font-medium"
            >
              David Geaney
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

