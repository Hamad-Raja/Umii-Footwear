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
    <header className="bg-white/95 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] md:h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="group flex flex-col items-start text-onyx">
              <span className="text-3xl leading-none font-heading font-black tracking-tighter group-hover:text-gold transition-colors">
                SOLEA
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.42em] text-gray-400 mt-1">
                Footwear
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7">
              {navItems.map((item) => (
                <Link key={item.label} to={item.to} className={getNavClass(item.to)}>
                  {item.label}
                  <span className={`absolute left-1 right-1 -bottom-1 h-[2px] bg-gold transition-transform origin-left ${isActiveLink(item.to) ? 'scale-x-100' : 'scale-x-0'}`} />
                </Link>
              ))}
            </nav>
          </div>

          {/* Icons */}
          <div className="flex items-center justify-end gap-2 md:gap-3">
            <Link to="/shop" className="hidden lg:inline-flex items-center bg-onyx text-white px-5 h-10 text-[10px] font-black uppercase tracking-[0.22em] hover:bg-gold hover:text-onyx transition-colors">
              Shop Now
            </Link>

            <Link to="/shop" className="h-10 w-10 hidden sm:inline-flex items-center justify-center border border-gray-200 text-gray-500 hover:border-onyx hover:text-onyx transition-colors">
              <Search size={18} />
            </Link>

            {/* Profile Menu */}
            {userInfo ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="h-10 inline-flex items-center gap-2 border border-gray-200 px-3 text-onyx hover:border-onyx hover:text-gold transition-colors font-bold text-[10px] uppercase tracking-[0.2em]"
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
                <Link to="/login" className="h-10 w-10 inline-flex items-center justify-center border border-gray-200 text-onyx hover:border-onyx hover:text-gold transition-colors relative group">
                    <User size={18} />
                </Link>
            )}

            {/* Admin Menu */}
            {userInfo && userInfo.isAdmin && (
              <div className="relative hidden lg:block">
                 <button 
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="h-10 inline-flex items-center gap-1 border border-gold/40 px-3 text-gold font-black transition-colors text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-onyx"
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

            <Link to="/cart" className="h-10 w-10 inline-flex items-center justify-center bg-white border border-gray-200 text-onyx hover:border-onyx hover:text-gold transition-colors relative">
              <ShoppingCart size={18} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-onyx text-[9px] font-black h-5 min-w-5 px-1 rounded-full flex items-center justify-center border-2 border-white">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-10 w-10 inline-flex md:hidden items-center justify-center border border-gray-200 text-onyx hover:border-onyx hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in absolute inset-x-0 top-[72px] z-40 shadow-2xl">
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
