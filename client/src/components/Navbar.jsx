import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, User, Search, Menu, LogOut, LayoutDashboard, UserCircle, ChevronDown, X, ArrowRight } from 'lucide-react'
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
    `relative px-1 py-2 text-[11px] font-black uppercase tracking-[0.28em] transition-colors ${
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
    <header className="bg-white/90 backdrop-blur-2xl sticky top-0 z-50 border-b border-gray-200/70 shadow-[0_12px_40px_rgba(10,10,10,0.04)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-11 w-11 inline-flex items-center justify-center border border-gray-200 text-onyx hover:border-onyx hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 justify-start">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} className={getNavClass(item.to)}>
                {item.label}
                <span className={`absolute left-1 right-1 -bottom-1 h-[2px] bg-gold transition-transform origin-left ${isActiveLink(item.to) ? 'scale-x-100' : 'scale-x-0'}`} />
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link to="/" className="group flex flex-col items-center text-onyx">
              <span className="text-3xl md:text-[34px] leading-none font-heading font-black tracking-tighter group-hover:text-gold transition-colors">
              SOLEA
              </span>
              <span className="hidden sm:block text-[8px] font-black uppercase tracking-[0.45em] text-gray-400 mt-1">
                Footwear
              </span>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center justify-end gap-2 md:gap-3">
            <Link
              to="/shop"
              className="hidden lg:inline-flex items-center gap-2 bg-onyx text-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.24em] hover:bg-gold hover:text-onyx transition-colors"
            >
              Shop Now <ArrowRight size={14} />
            </Link>

            <Link to="/shop" className="h-11 w-11 hidden sm:inline-flex items-center justify-center border border-gray-200 text-gray-500 hover:border-onyx hover:text-onyx transition-colors">
              <Search size={20} />
            </Link>

            {/* Profile Menu */}
            {userInfo ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="h-11 inline-flex items-center gap-2 border border-gray-200 px-3 text-onyx hover:border-onyx hover:text-gold transition-colors font-bold text-[10px] uppercase tracking-[0.2em]"
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
                <Link to="/login" className="h-11 w-11 inline-flex items-center justify-center border border-gray-200 text-onyx hover:border-onyx hover:text-gold transition-colors relative group">
                    <User size={20} />
                </Link>
            )}

            {/* Admin Menu */}
            {userInfo && userInfo.isAdmin && (
              <div className="relative hidden lg:block">
                 <button 
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="h-11 inline-flex items-center gap-1 border border-gold/40 px-3 text-gold font-black transition-colors text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-onyx"
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

            <Link to="/cart" className="h-11 w-11 inline-flex items-center justify-center bg-white border border-gray-200 text-onyx hover:border-onyx hover:text-gold transition-colors relative">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-onyx text-[9px] font-black h-5 min-w-5 px-1 rounded-full flex items-center justify-center border-2 border-white">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in absolute inset-x-0 top-20 z-40 shadow-2xl">
          <div className="px-6 py-8 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between border border-gray-100 px-4 py-4 text-xs font-black uppercase tracking-[0.32em] transition-colors ${
                  isActiveLink(item.to) ? 'bg-onyx text-white border-onyx' : 'text-onyx hover:border-onyx'
                }`}
              >
                {item.label}
                <ArrowRight size={14} />
              </Link>
            ))}
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-gold text-onyx px-4 py-4 text-xs font-black uppercase tracking-[0.32em]">
              Shop Now <ArrowRight size={14} />
            </Link>
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
