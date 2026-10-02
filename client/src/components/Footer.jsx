import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Instagram, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#080808] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Main Footer */}
        <div className="py-7 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-flex flex-col items-start group">
              <span className="text-[24px] font-black tracking-[-0.04em] text-gold group-hover:text-white transition-colors">
                SOLEA
              </span>

              <span className="text-[6px] uppercase tracking-[0.5em] text-gray-500 mt-1 ml-[2px]">
                Footwear
              </span>
            </Link>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center items-center gap-5 sm:gap-7">
            <Link
              to="/shop"
              className="text-[9px] uppercase tracking-[0.22em] font-bold text-gray-400 hover:text-gold transition-colors"
            >
              Shop
            </Link>

            <Link
              to="/shop?category=Mens%20Sneakers"
              className="text-[9px] uppercase tracking-[0.22em] font-bold text-gray-400 hover:text-gold transition-colors"
            >
              Men
            </Link>

            <Link
              to="/shop?category=Womens%20Sneakers"
              className="text-[9px] uppercase tracking-[0.22em] font-bold text-gray-400 hover:text-gold transition-colors"
            >
              Women
            </Link>

            <Link
              to="/about"
              className="text-[9px] uppercase tracking-[0.22em] font-bold text-gray-400 hover:text-gold transition-colors"
            >
              Heritage
            </Link>
          </nav>

          {/* Contact / Social */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@soleafootwear.com"
              aria-label="Email"
              className="text-gray-500 hover:text-gold transition-colors"
            >
              <Mail size={15} strokeWidth={1.7} />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-500 hover:text-gold transition-colors"
            >
              <Instagram size={15} strokeWidth={1.7} />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-500 hover:text-gold transition-colors"
            >
              <Facebook size={15} strokeWidth={1.7} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.07] py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-[10px] text-gray-600">
            © {new Date().getFullYear()} Solea Footwear. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-[9px] text-gray-600 hover:text-gray-300 transition-colors"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-[9px] text-gray-600 hover:text-gray-300 transition-colors"
            >
              Terms
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer