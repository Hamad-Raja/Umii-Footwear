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
            <div className="mt-6 space-y-3 text-sm text-gray-400">
              <p className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> Crafted for worldwide delivery</p>
              <p className="flex items-center gap-3"><Mail size={16} className="text-gold" /> hello@soleafootwear.com</p>
              <p className="flex items-center gap-3"><Phone size={16} className="text-gold" /> Customer care 24/7</p>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-6">Shop</h4>
            <ul className="space-y-4">
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
            <h4 className="font-heading font-bold text-white text-lg mb-6">Support</h4>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link}>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-6">Stay in the Loop</h4>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">Get first access to new drops, limited colorways, and members-only offers.</p>
            <form className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 text-white placeholder:text-gray-500 px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <button 
                type="button" 
                className="bg-gold text-onyx px-6 py-3 font-bold hover:bg-gold-light transition-colors"
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
