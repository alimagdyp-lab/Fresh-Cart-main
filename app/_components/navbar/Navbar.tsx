'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../_context/AuthContext';
import { useCart } from '../../_context/CartContext';
import { useEffect, useState } from 'react';
import { Search, Heart, ShoppingBag, User, Headphones, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Navbar() {
  const { token, logout } = useAuth();
  const { cartCount, fetchCart } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: categories } = useQuery({
    queryKey: ['navbarCategories'],
    queryFn: async () => {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      return res.data.data;
    }
  });

  const isAuth = pathname.startsWith('/(auth)') || pathname === '/login' || pathname === '/register';

  useEffect(() => {
    if (token) fetchCart();
  }, [token, fetchCart]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (isAuth) return null;

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 h-20 flex items-center">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. Brand Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <span className="text-2xl font-bold text-[#10b981]">🛒</span>
            <span className="text-[22px] font-extrabold text-[#0f172a] tracking-tight">FreshCart</span>
          </Link>

          {/* 2. Embedded Center Search Bar */}
          <div className="hidden lg:flex items-center p-3.5 flex-1 max-w-[420px] ml-4 relative">
            <input
              type="text"
              placeholder="Search for products, brands and more."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f8fafc] text-slate-700 placeholder-slate-400 text-sm pl-4 pr-12 py-4 rounded-full border border-slate-200/80 focus:outline-none focus:border-[#10b981] transition-all"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center text-white hover:bg-[#059669] transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* 3. Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-[15px] font-medium text-slate-600 ml-4 relative">
            <Link href="/" className="hover:text-[#10b981] transition-colors">Home</Link>
            <Link href="/products" className="hover:text-[#10b981] transition-colors">Shop</Link>
            
            {/* Interactive Categories Dropdown Container */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 cursor-pointer font-medium transition-colors outline-none ${
                  dropdownOpen ? 'text-[#10b981]' : 'text-slate-600 hover:text-[#10b981]'
                }`}
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-[#10b981]' : ''}`} />
              </button>

              {/* Floating Menu Card (Matches image_8233b0.png perfectly) */}
              {dropdownOpen && (
                <div className="absolute left-0 top-[100%] w-56 bg-white border border-slate-100 rounded-2xl shadow-xl py-3 px-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150 max-h-96 overflow-y-auto scrollbar-hide">
                  <Link href="/categories" onClick={() => setDropdownOpen(false)} className="block px-5 py-2.5 text-slate-600 hover:text-[#10b981] hover:bg-slate-50/60 rounded-xl transition-all font-medium text-[14px]">
                    All Categories
                  </Link>
                  {categories?.map((category: { _id: string; name: string }) => (
                    <Link key={category._id} href={`/products?category=${category._id}`} onClick={() => setDropdownOpen(false)} className="block px-5 py-2.5 text-slate-600 hover:text-[#10b981] hover:bg-slate-50/60 rounded-xl transition-all font-medium text-[14px]">
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/brands" className="hover:text-[#10b981] transition-colors">Brands</Link>
          </div>

          {/* Right Interface Tray */}
          <div className="flex items-center gap-6 ml-auto">
            
            {/* 4. Support Call Widget */}
            <div className="hidden xl:flex items-center gap-2.5 border-r border-slate-200 pr-5">
              <div className="w-9 h-9 rounded-full bg-[#f0fdf4] flex items-center justify-center text-[#10b981]">
                <Headphones className="w-[18px] h-[18px]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] text-slate-400 font-medium leading-none mb-0.5">Support</span>
                <span className="text-xs font-bold text-slate-800 leading-none">24/7 Help</span>
              </div>
            </div>

            {/* 5. Utility Actions Panel */}
            <div className="flex items-center gap-4.5 text-slate-700">
              {/* Wishlist Icon */}
              <Link href="/wishlist" className="hover:text-[#10b981] transition-colors p-1 relative">
                <Heart className="w-[22px] h-[22px] text-slate-600" />
              </Link>

              {/* Shopping Cart Icon Container */}
              <Link href="/cart" className="hover:text-[#10b981] transition-colors p-1 relative">
                <ShoppingBag className="w-[22px] h-[22px] text-slate-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#10b981] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Conditional Auth Gateway Controls */}
              {token ? (
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-slate-600 hover:text-red-500 transition-colors pl-2"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-sm font-semibold bg-[#10b981] text-white px-5 py-2.5 rounded-full hover:bg-[#059669] transition-all shadow-sm shadow-emerald-100"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile Responsive Menu Trigger */}
            <button
              className="md:hidden text-slate-600 hover:text-[#10b981] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>

          </div>
        </div>

        {/* Mobile Flyout Navigation Panel */}
        {menuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-3 text-sm shadow-md">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-slate-600 hover:text-[#10b981] font-medium">Home</Link>
            <Link href="/products" onClick={() => setMenuOpen(false)} className="text-slate-600 hover:text-[#10b981] font-medium">Shop</Link>
            <Link href="/categories" onClick={() => setMenuOpen(false)} className="text-slate-600 hover:text-[#10b981] font-medium">Categories</Link>
            <Link href="/brands" onClick={() => setMenuOpen(false)} className="text-slate-600 hover:text-[#10b981] font-medium">Brands</Link>
          </div>
        )}

      </div>
    </nav>
  );
}