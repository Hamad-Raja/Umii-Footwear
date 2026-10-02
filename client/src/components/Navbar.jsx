import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  ShoppingBag,
  UserRound,
  Search,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  UserCircle,
} from 'lucide-react'

import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { clearCartItems } from '../slices/cartSlice'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Men', to: '/shop?category=Mens%20Sneakers' },
  { label: 'Women', to: '/shop?category=Womens%20Sneakers' },
  { label: 'Heritage', to: '/about' },
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const { cartItems = [] } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [logoutApiCall] = useLogoutMutation()

  const currentPath = `${location.pathname}${location.search}`

  const isActiveLink = (to) => {
    if (to === '/') {
      return location.pathname === '/' && !location.search
    }

    return currentPath === to
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.qty || 0),
    0
  )

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()

      dispatch(logout())
      dispatch(clearCartItems())

      setShowUserMenu(false)
      setIsMobileMenuOpen(false)

      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070707] border-b border-white/5">
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="h-[64px] lg:h-[72px] flex items-center justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-10 lg:gap-14 xl:gap-16">

            {/* Logo */}
            <Link
              to="/"
              className="flex flex-col items-start leading-none group"
            >
              <span className="text-[#d6ad3c] text-[24px] sm:text-[26px] lg:text-[28px] font-black tracking-[0.03em] leading-none transition-colors group-hover:text-[#e6c25b]">
                SOLEA
              </span>

              <span className="mt-[4px] ml-[2px] text-[5px] sm:text-[6px] font-bold uppercase tracking-[0.55em] text-[#d6ad3c]/75">
                Footwear
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`relative py-6 text-[7px] lg:text-[8px] font-bold uppercase tracking-[0.38em] transition-colors ${
                    isActiveLink(item.to)
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}

                  {isActiveLink(item.to) && (
                    <span className="absolute bottom-[15px] left-0 right-[0.38em] h-[1px] bg-[#d6ad3c]" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4 sm:gap-5">

            {/* Search */}
            <Link
              to="/shop"
              aria-label="Search"
              className="hidden sm:flex items-center justify-center text-gray-400 hover:text-[#d6ad3c] transition-colors"
            >
              <Search
                size={13}
                strokeWidth={1.7}
              />
            </Link>

            {/* Account */}
            <div className="relative">
              {userInfo ? (
                <>
                  <button
                    type="button"
                    onClick={() => setShowUserMenu((prev) => !prev)}
                    className="flex items-center justify-center text-gray-400 hover:text-[#d6ad3c] transition-colors"
                    aria-label="Account menu"
                  >
                    <UserRound
                      size={13}
                      strokeWidth={1.7}
                    />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-8 w-48 bg-[#111111] border border-white/10 shadow-2xl py-2">

                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white font-bold">
                          {userInfo.name || 'Account'}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-[8px] uppercase tracking-[0.22em] font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <UserCircle size={14} />
                        Profile
                      </Link>

                      {userInfo.isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-3 text-[8px] uppercase tracking-[0.22em] font-bold text-gray-400 hover:text-[#d6ad3c] hover:bg-white/5 transition-colors"
                        >
                          <LayoutDashboard size={14} />
                          Admin
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={logoutHandler}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-[8px] uppercase tracking-[0.22em] font-bold text-red-400 hover:bg-white/5 transition-colors"
                      >
                        <LogOut size={14} />
                        Logout
                      </button>

                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  aria-label="Login"
                  className="flex items-center justify-center text-gray-400 hover:text-[#d6ad3c] transition-colors"
                >
                  <UserRound
                    size={13}
                    strokeWidth={1.7}
                  />
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex items-center justify-center text-gray-400 hover:text-[#d6ad3c] transition-colors"
            >
              <ShoppingBag
                size={14}
                strokeWidth={1.7}
              />

              {cartCount > 0 && (
                <span className="absolute -top-[7px] -right-[8px] min-w-[13px] h-[13px] px-[3px] rounded-full bg-[#d6ad3c] text-black text-[7px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Shop Now */}
            <Link
              to="/shop"
              className="hidden sm:flex items-center justify-center h-[30px] lg:h-[34px] px-4 lg:px-5 border border-[#d6ad3c] text-[#d6ad3c] text-[7px] lg:text-[8px] uppercase tracking-[0.3em] font-black hover:bg-[#d6ad3c] hover:text-black transition-all"
            >
              Shop Now
            </Link>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden text-white hover:text-[#d6ad3c] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-[64px] bg-[#090909] border-t border-white/10 shadow-2xl">
          <div className="px-5 py-6">

            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`border-b border-white/[0.07] py-4 text-[9px] font-bold uppercase tracking-[0.38em] ${
                    isActiveLink(item.to)
                      ? 'text-[#d6ad3c]'
                      : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-5 flex gap-3">
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 flex justify-center items-center h-11 border border-[#d6ad3c] text-[#d6ad3c] text-[8px] uppercase tracking-[0.3em] font-black"
              >
                Shop Now
              </Link>

              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative h-11 w-11 border border-white/20 flex items-center justify-center text-white"
              >
                <ShoppingBag size={16} />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] rounded-full bg-[#d6ad3c] text-black text-[7px] font-black flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar