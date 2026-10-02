import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  LogOut,
  LayoutDashboard,
  UserCircle,
  ChevronDown,
  X,
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
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showAdminMenu, setShowAdminMenu] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { cartItems } = useSelector((state) => state.cart)
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

  const getNavClass = (to) =>
    `relative py-3 text-[12px] md:text-[13px] font-black uppercase tracking-[0.36em] transition-colors ${
      isActiveLink(to)
        ? 'text-onyx'
        : 'text-gray-500 hover:text-onyx'
    }`

  const closeMenus = () => {
    setShowUserMenu(false)
    setShowAdminMenu(false)
    setIsMobileMenuOpen(false)
  }

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()

      dispatch(logout())
      dispatch(clearCartItems())

      closeMenus()
      navigate('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.qty || 0),
    0
  )

  const firstName = userInfo?.name
    ? userInfo.name.split(' ')[0]
    : 'Account'

  return (
    <header className="bg-white/95 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200/70 shadow-sm shadow-black/[0.02] transition-all">
      <div className="w-full px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[76px] lg:h-[104px] gap-5">

          {/* Logo + Desktop Navigation */}
          <div className="flex items-center gap-10 xl:gap-14">
            <Link
              to="/"
              onClick={closeMenus}
              className="group flex min-w-[130px] flex-col items-start"
            >
              <span className="text-[34px] sm:text-[40px] lg:text-[44px] leading-none font-heading font-black tracking-[-0.06em] text-gold group-hover:text-gold-dark transition-colors">
                SOLEA
              </span>

              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.48em] text-gray-400 mt-2 ml-1">
                Footwear
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-9 xl:gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={getNavClass(item.to)}
                  onClick={() => {
                    setShowUserMenu(false)
                    setShowAdminMenu(false)
                  }}
                >
                  {item.label}

                  <span
                    className={`absolute left-0 right-[0.36em] -bottom-1 h-[2px] bg-gold transition-transform origin-left ${
                      isActiveLink(item.to)
                        ? 'scale-x-100'
                        : 'scale-x-0'
                    }`}
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-4">

            {/* Shop Now */}
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center justify-center bg-onyx text-white px-7 lg:px-9 h-12 lg:h-[60px] text-[10px] lg:text-[12px] font-black uppercase tracking-[0.28em] hover:bg-gold hover:text-onyx transition-colors"
            >
              Shop Now
            </Link>

            {/* Search */}
            <Link
              to="/shop"
              aria-label="Search products"
              className="h-11 w-11 sm:h-12 sm:w-12 lg:h-[60px] lg:w-[60px] hidden sm:inline-flex items-center justify-center border border-gray-200 text-gray-500 hover:border-onyx hover:text-onyx hover:bg-gray-50 transition-colors"
            >
              <Search size={24} strokeWidth={1.8} />
            </Link>

            {/* User Menu */}
            {userInfo ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu((prev) => !prev)
                    setShowAdminMenu(false)
                  }}
                  className="h-11 sm:h-12 lg:h-[60px] inline-flex items-center gap-2 border border-gray-200 px-3 lg:px-4 text-onyx hover:border-onyx hover:text-gold transition-colors font-bold text-[10px] uppercase tracking-[0.2em]"
                >
                  {firstName}

                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      showUserMenu ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 shadow-2xl z-[100] py-2">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <UserCircle size={16} />
                      Profile
                    </Link>

                    <button
                      type="button"
                      onClick={logoutHandler}
                      className="w-full flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                aria-label="Login"
                className="h-11 w-11 sm:h-12 sm:w-12 lg:h-[60px] lg:w-[60px] inline-flex items-center justify-center border border-gray-200 text-onyx hover:border-onyx hover:text-gold hover:bg-gray-50 transition-colors"
              >
                <User size={23} strokeWidth={1.9} />
              </Link>
            )}

            {/* Admin Menu */}
            {userInfo?.isAdmin && (
              <div className="relative hidden lg:block">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminMenu((prev) => !prev)
                    setShowUserMenu(false)
                  }}
                  className="h-12 lg:h-[60px] inline-flex items-center gap-1 border border-gold/40 px-3 text-gold font-black transition-colors text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-onyx"
                >
                  Admin

                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      showAdminMenu ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showAdminMenu && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 shadow-2xl z-[100] py-2">
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setShowAdminMenu(false)}
                      className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>

                    <Link
                      to="/admin/productlist"
                      onClick={() => setShowAdminMenu(false)}
                      className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Products
                    </Link>

                    <Link
                      to="/admin/orderlist"
                      onClick={() => setShowAdminMenu(false)}
                      className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Orders
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Cart with ${cartCount} items`}
              className="h-11 w-11 sm:h-12 sm:w-12 lg:h-[60px] lg:w-[60px] inline-flex items-center justify-center bg-white border border-gray-200 text-onyx hover:border-onyx hover:text-gold hover:bg-gray-50 transition-colors relative"
            >
              <ShoppingCart size={23} strokeWidth={1.9} />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-onyx text-[9px] font-black h-5 min-w-5 px-1 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen((prev) => !prev)
                setShowUserMenu(false)
                setShowAdminMenu(false)
              }}
              className="h-11 w-11 inline-flex lg:hidden items-center justify-center border border-gray-200 text-onyx hover:border-onyx hover:text-gold transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute inset-x-0 top-[76px] z-40 shadow-2xl">
          <div className="px-5 py-5 space-y-2">

            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between border px-4 py-3 text-xs font-black uppercase tracking-[0.3em] transition-colors ${
                  isActiveLink(item.to)
                    ? 'bg-onyx text-white border-onyx'
                    : 'border-gray-100 text-onyx hover:border-onyx'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center bg-gold text-onyx px-4 py-3 text-xs font-black uppercase tracking-[0.3em]"
            >
              Shop Now
            </Link>

            {userInfo && (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 border border-gray-100 px-4 py-3 text-xs font-black uppercase tracking-[0.3em] text-onyx"
                >
                  <UserCircle size={17} />
                  Profile
                </Link>

                {userInfo.isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 border border-gold/30 px-4 py-3 text-xs font-black uppercase tracking-[0.3em] text-gold"
                  >
                    <LayoutDashboard size={17} />
                    Administrator
                  </Link>
                )}

                <button
                  type="button"
                  onClick={logoutHandler}
                  className="flex w-full items-center gap-2 border border-red-100 px-4 py-3 text-left text-xs font-black uppercase tracking-[0.3em] text-red-500 hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar