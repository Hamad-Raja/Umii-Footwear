import React from 'react'
import { Link } from 'react-router-dom'

const shopLinks = [
  { label: 'New Arrivals', to: '/shop?sort=newest' },
  { label: 'Men', to: '/shop?category=Mens%20Sneakers' },
  { label: 'Women', to: '/shop?category=Womens%20Sneakers' },
]

const Footer = () => {
  return (
    <footer className="bg-[#141414] text-white py-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-8 pb-8">
          <div>
            <Link to="/" className="inline-block text-3xl font-heading font-extrabold tracking-tighter mb-3 text-white">
              SOLEA
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Refined footwear for daily movement, modern wardrobes, and confident steps.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-4 uppercase tracking-[0.18em]">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-4 uppercase tracking-[0.18em]">Stay in the Loop</h4>
            <form className="flex max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 text-white placeholder:text-gray-500 px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-gold text-sm"
              />
              <button 
                type="button" 
                className="bg-gold text-onyx px-5 py-3 font-bold hover:bg-gold-light transition-colors text-sm"
              >
                Join
              </button>
            </form>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
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
