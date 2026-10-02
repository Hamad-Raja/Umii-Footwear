import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, User, Search, Menu, LogOut, LayoutDashboard, UserCircle, ChevronDown, X } from 'lucide-react'
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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutApiCall] = useLogoutMutation();

  const currentPath = `${location.pathname}${location.search}`;
  const isActiveLink = (to) => currentPath === to || (to === '/' && location.pathname === '/' && !location.search);
  const getNavClass = (to) =>
    `relative py-3 text-[12px] md:text-[13px] font-black uppercase tracking-[0.36em] transition-colors ${
      isActiveLink(to) ? 'text-onyx' : 'text-gray-500 hover:text-onyx'
    }`;

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearCartItems());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
<<<<<<< HEAD
    <header className="bg-white/95 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200/70 shadow-sm shadow-black/[0.02] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-onyx hover:text-gold transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-heading font-black tracking-tighter text-onyx hover:text-gold transition-colors">
              SOLEA
=======
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm transition-all">
      <div className="w-full px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[76px] lg:h-[104px] gap-5">
          {/* Logo */}
          <div className="flex items-center gap-10 xl:gap-14">
            <Link to="/" className="group flex min-w-[130px] flex-col items-start">
              <span className="text-[34px] sm:text-[40px] lg:text-[44px] leading-none font-heading font-black tracking-[-0.06em] text-gold group-hover:text-gold-dark transition-colors">
                SOLEA
              </span>
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.48em] text-gray-400 mt-2 ml-1">
                Footwear
              </span>
>>>>>>> b90d159269dddb4ebdc93226e1fcb94a79042ecc
            </Link>

<<<<<<< HEAD
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link to="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-onyx transition-colors">
              Home
            </Link>
            <Link to="/shop?category=Mens%20Sneakers" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-onyx transition-colors">
              Men
            </Link>
            <Link to="/shop?category=Womens%20Sneakers" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-onyx transition-colors">
              Women
            </Link>
            <Link to="/about" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-onyx transition-colors">
              Heritage
            </Link>
          </nav>
=======
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-9 xl:gap-12">
              {navItems.map((item) => (
                <Link key={item.label} to={item.to} className={getNavClass(item.to)}>
                  {item.label}
                  <span className={`absolute left-0 right-[0.36em] -bottom-1 h-[2px] bg-gold transition-transform origin-left ${isActiveLink(item.to) ? 'scale-x-100' : 'scale-x-0'}`} />
                </Link>
              ))}
            </nav>
          </div>
>>>>>>> b90d159269dddb4ebdc93226e1fcb94a79042ecc

          {/* Icons */}
          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <Link to="/shop" className="hidden md:inline-flex items-center justify-center bg-onyx text-white px-7 lg:px-9 h-12 lg:h-[60px] text-[10px] lg:text-[12px] font-black uppercase tracking-[0.28em] hover:bg-gold hover:text-onyx transition-colors">
              Shop Now
            </Link>

            <Link to="/shop" className="h-11 w-11 sm:h-12 sm:w-12 lg:h-[60px] lg:w-[60px] hidden sm:inline-flex items-center justify-center border border-gray-200 text-gray-500 hover:border-onyx hover:text-onyx hover:bg-gray-50 transition-colors">
              <Search size={24} strokeWidth={1.8} />
            </Link>

            {/* Profile Menu */}
            {userInfo ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="h-11 sm:h-12 lg:h-[60px] inline-flex items-center gap-2 border border-gray-200 px-3 lg:px-4 text-onyx hover:border-onyx hover:text-gold transition-colors font-bold text-[10px] uppercase tracking-[0.2em]"
                >
                  {userInfo.name.split(' ')[0]} <ChevronDown size={14} />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 shadow-2xl z-[100] py-2 animate-fade-in-up">
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
                      <UserCircle size={16} /> Profile
                    </Link>
                    <button onClick={logoutHandler} className="w-full flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
                <Link to="/login" className="h-11 w-11 sm:h-12 sm:w-12 lg:h-[60px] lg:w-[60px] inline-flex items-center justify-center border border-gray-200 text-onyx hover:border-onyx hover:text-gold hover:bg-gray-50 transition-colors relative group">
                    <User size={23} strokeWidth={1.9} />
                </Link>
            )}

            {/* Admin Menu */}
            {userInfo && userInfo.isAdmin && (
              <div className="relative hidden lg:block">
                 <button 
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="h-12 lg:h-[60px] inline-flex items-center gap-1 border border-gold/40 px-3 text-gold font-black transition-colors text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-onyx"
                >
                  Admin <ChevronDown size={14} />
                </button>
                {showAdminMenu && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 shadow-2xl z-[100] py-2 animate-fade-in-up">
                    <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <Link to="/admin/productlist" className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
                       Products
                    </Link>
                    <Link to="/admin/orderlist" className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
                       Orders
                    </Link>
                  </div>
                )}
              </div>
            )}

            <Link to="/cart" className="h-11 w-11 sm:h-12 sm:w-12 lg:h-[60px] lg:w-[60px] inline-flex items-center justify-center bg-white border border-gray-200 text-onyx hover:border-onyx hover:text-gold hover:bg-gray-50 transition-colors relative">
              <ShoppingCart size={23} strokeWidth={1.9} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-onyx text-[9px] font-black h-5 min-w-5 px-1 rounded-full flex items-center justify-center border-2 border-white">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-11 w-11 inline-flex lg:hidden items-center justify-center border border-gray-200 text-onyx hover:border-onyx hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
<<<<<<< HEAD
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in absolute inset-x-0 top-20 z-40 shadow-xl">
          <div className="px-6 py-10 space-y-6">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-black uppercase tracking-[0.4em] text-onyx py-2">Home</Link>
            <Link to="/shop?category=Mens%20Sneakers" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-black uppercase tracking-[0.4em] text-onyx py-2">Men Collection</Link>
            <Link to="/shop?category=Womens%20Sneakers" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-black uppercase tracking-[0.4em] text-onyx py-2">Women Collection</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-black uppercase tracking-[0.4em] text-onyx py-2">Our Heritage</Link>
=======
        <div className="lg:hidden bg-white border-t border-gray-100 animate-fade-in absolute inset-x-0 top-[76px] z-40 shadow-2xl">
          <div className="px-5 py-5 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between border border-gray-100 px-4 py-3 text-xs font-black uppercase tracking-[0.3em] transition-colors ${
                  isActiveLink(item.to) ? 'bg-onyx text-white border-onyx' : 'text-onyx hover:border-onyx'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center bg-gold text-onyx px-4 py-3 text-xs font-black uppercase tracking-[0.3em]">
              Shop Now
            </Link>
>>>>>>> b90d159269dddb4ebdc93226e1fcb94a79042ecc
            {userInfo && (
              <button onClick={() => { logoutHandler(); setIsMobileMenuOpen(false); }} className="block w-full text-left text-xs font-black uppercase tracking-[0.4em] text-red-500 py-2">Logout</button>
            )}
            {userInfo && userInfo.isAdmin && (
               <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-black uppercase tracking-[0.4em] text-gold py-2">Administrator</Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
