import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  RefreshCcw, 
  ShieldCheck, 
  Headphones
} from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';

export default function Footer() {  
  return (
    <div className="mt-auto">
      {/* Global Features Strip */}
      <div className="bg-[#f2fdf5] border-t border-emerald-50">
        <div className="max-w-[1320px] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#dcfce7] rounded-2xl flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-[#10b981]" />
              </div>
              <div>
                <h4 className="text-[#0f172a] font-bold text-[15px] leading-tight mb-0.5">Free Shipping</h4>
                <p className="text-[#64748b] text-[13px] leading-tight">On orders over 500 EGP</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#dcfce7] rounded-2xl flex items-center justify-center shrink-0">
                <RefreshCcw className="w-6 h-6 text-[#10b981]" />
              </div>
              <div>
                <h4 className="text-[#0f172a] font-bold text-[15px] leading-tight mb-0.5">Easy Returns</h4>
                <p className="text-[#64748b] text-[13px] leading-tight">14-day return policy</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#dcfce7] rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#10b981]" />
              </div>
              <div>
                <h4 className="text-[#0f172a] font-bold text-[15px] leading-tight mb-0.5">Secure Payment</h4>
                <p className="text-[#64748b] text-[13px] leading-tight">100% secure checkout</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#dcfce7] rounded-2xl flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6 text-[#10b981]" />
              </div>
              <div>
                <h4 className="text-[#0f172a] font-bold text-[15px] leading-tight mb-0.5">24/7 Support</h4>
                <p className="text-[#64748b] text-[13px] leading-tight">Contact us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#0b1329] pt-20 pb-5 font-sans text-[#7888a1] text-[13px] tracking-wide select-none">
        <div className="max-w-[1320px] mx-auto px-4">
        
        {/* Main Links Container */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-y-10 pb-12">
          
          {/* Column 1: Logo & Company Description */}
          <div className="lg:w-[28%] flex flex-col justify-between gap-5">
            <div>
              {/* FreshCart Logo */}
              <div className="bg-white inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] mb-4">
                <span className="text-[#10b981] text-lg font-bold">🛒</span>
                <span className="text-lg font-bold text-slate-900 tracking-tight">FreshCart</span>
              </div>
              
              <p className="text-[#7888a1] mb-5 leading-[1.6] text-[13px]">
                FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
              </p>
              
              {/* Contact Information */}
              <ul className="space-y-3 text-[13px]">
                <li className="flex items-center gap-2.5">
                  <Phone className="w-[14px] h-[14px] text-[#10b981] shrink-0" />
                  <a href="tel:+18001234567" className="hover:text-white transition-colors">+1 (800) 123-4567</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-[14px] h-[14px] text-[#10b981] shrink-0" />
                  <a href="mailto:support@freshcart.com" className="hover:text-white transition-colors">support@freshcart.com</a>
                </li>
                <li className="flex gap-2.5 items-start">
                  <MapPin className="w-[14px] h-[14px] text-[#10b981] shrink-0 mt-0.5" />
                  <span className="leading-tight">123 Commerce Street, New York, NY 10001</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-2.5 mt-2">
              {[
                { id: 'facebook', icon: <FaFacebookF className="w-3.5 h-3.5" /> },
                { id: 'twitter', icon: <FaTwitter className="w-3.5 h-3.5" /> },
                { id: 'instagram', icon: <FaInstagram className="w-3.5 h-3.5" /> },
                { id: 'youtube', icon: <FaYoutube className="w-3.5 h-3.5" /> },
              ].map((item) => (
                <a 
                  key={item.id} 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-[#1e293b]/40 flex items-center justify-center hover:bg-[#10b981] hover:text-white transition-all text-[#52637a]"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns Container */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:pl-16">
            
            {/* Column 2: Shop */}
            <div>
              <h4 className="font-bold text-white text-[15px] mb-4">Shop</h4>
              <ul className="space-y-2 text-[13px]">
                <li><Link href="/products" className="hover:text-white transition-colors block">All Products</Link></li>
                <li><Link href="/categories" className="hover:text-white transition-colors block">Categories</Link></li>
                <li><Link href="/brands" className="hover:text-white transition-colors block">Brands</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors block">Electronics</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors block">Men's Fashion</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors block">Women's Fashion</Link></li>
              </ul>
            </div>

            {/* Column 3: Account */}
            <div>
              <h4 className="font-bold text-white text-[15px] mb-4">Account</h4>
              <ul className="space-y-2">
                <li><Link href="/profile" className="hover:text-white transition-colors block">My Account</Link></li>
                <li><Link href="/allorders" className="hover:text-white transition-colors block">Order History</Link></li>
                <li><Link href="/wishlist" className="hover:text-white transition-colors block">Wishlist</Link></li>
                <li><Link href="/cart" className="hover:text-white transition-colors block">Shopping Cart</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors block">Sign In</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors block">Create Account</Link></li>
              </ul>
            </div>

            {/* Column 4: Support */}
            <div>
              <h4 className="font-bold text-white text-[15px] mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors block">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">Shipping Info</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">Returns & Refunds</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">Track Order</Link></li>
              </ul>
            </div>

            {/* Column 5: Legal */}
            <div>
              <h4 className="font-bold text-white text-[15px] mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors block">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">Cookie Policy</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Thin Divider Line */}
        <div className="border-t border-slate-800/60 pt-4">
          {/* Bottom Bar Details */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#4b596e]">
            <p>© 2026 FreshCart. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 hover:text-slate-400 cursor-pointer transition-colors">
                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="22" height="16" x="1" y="4" rx="2" ry="2"/><line x1="1" x2="23" y1="10" y2="10"/></svg> Visa
              </div>
              <div className="flex items-center gap-1.5 hover:text-slate-400 cursor-pointer transition-colors">
                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="22" height="16" x="1" y="4" rx="2" ry="2"/><line x1="1" x2="23" y1="10" y2="10"/></svg> Mastercard
              </div>
              <div className="flex items-center gap-1.5 hover:text-slate-400 cursor-pointer transition-colors">
                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="22" height="16" x="1" y="4" rx="2" ry="2"/><line x1="1" x2="23" y1="10" y2="10"/></svg> PayPal
              </div>
            </div>
          </div>
        </div>
        </div>
      </footer>
    </div>
  );
}