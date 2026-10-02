import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-charcoal text-offwhite pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="text-3xl font-heading font-extrabold tracking-tighter mb-6">
              SOLEA
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Elevating the modern footprint with minimalist design and premium craftsmanship. Walk your truth.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors text-sm">New Arrivals</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors text-sm">Best Sellers</Link></li>
              <li><Link to="/shop?category=Mens%20Sneakers" className="text-gray-400 hover:text-white transition-colors text-sm">Men's Collection</Link></li>
              <li><Link to="/shop?category=Womens%20Sneakers" className="text-gray-400 hover:text-white transition-colors text-sm">Women's Collection</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Stay in the Loop</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive releases and insider-only discounts.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 text-white px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-electric"
              />
              <button 
                type="button" 
                className="bg-electric text-white px-6 py-3 font-semibold hover:bg-blue-600 transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Solea Footwear. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
