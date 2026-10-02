import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Instagram, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#090909] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Main Footer */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_auto] gap-8 md:gap-12 items-start">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex flex-col items-start group">
              <span className="text-[28px] font-black tracking-[-0.05em] text-gold group-hover:text-white transition-colors">
                SOLEA
              </span>

              <span className="text-[6px] uppercase tracking-[0.5em] text-gray-500 mt-1 ml-[2px]">
                Footwear
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-[12px] leading-5 text-gray-500">
              Modern footwear built for everyday comfort, clean style, and confident movement.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-[0.28em] text-white mb-4">
              Explore
            </h4>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <Link
                to="/shop"
                className="text-[11px] text-gray-500 hover:text-gold transition-colors"
              >
                Shop All
              </Link>

              <Link
                to="/shop?category=Mens%20Sneakers"
                className="text-[11px] text-gray-500 hover:text-gold transition-colors"
              >
                Men
              </Link>

              <Link
                to="/shop?category=Womens%20Sneakers"
                className="text-[11px] text-gray-500 hover:text-gold transition-colors"
              >
                Women
              </Link>

              <Link
                to="/about"
                className="text-[11px] text-gray-500 hover:text-gold transition-colors"
              >
                Heritage
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-[0.28em] text-white mb-4">
              Connect
            </h4>

            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@soleafootwear.com"
                aria-label="Email"
                className="h-9 w-9 flex items-center justify-center border border-white/10 text-gray-500 hover:text-gold hover:border-gold/40 transition-colors"
              >
                <Mail size={14} strokeWidth={1.7} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="h-9 w-9 flex items-center justify-center border border-white/10 text-gray-500 hover:text-gold hover:border-gold/40 transition-colors"
              >
                <Instagram size={14} strokeWidth={1.7} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="h-9 w-9 flex items-center justify-center border border-white/10 text-gray-500 hover:text-gold hover:border-gold/40 transition-colors"
              >
                <Facebook size={14} strokeWidth={1.7} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.07] py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-gray-600">
            © {new Date().getFullYear()} Solea Footwear. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-[10px] text-gray-600 hover:text-gray-300 transition-colors"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-[10px] text-gray-600 hover:text-gray-300 transition-colors"
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