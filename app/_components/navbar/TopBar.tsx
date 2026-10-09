import Link from 'next/link';
import { Truck, Gift, Phone, Mail, User, UserPlus } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-white border-b border-slate-100 py-2 hidden md:block">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[12px] text-slate-500">
        
        {/* Left Side */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Free Shipping on Orders 500 EGP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-[#10b981]" />
            <span>New Arrivals Daily</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 border-r border-slate-200 pr-4">
            <a href="tel:+18001234567" className="flex items-center gap-1.5 hover:text-[#10b981] transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>+1 (800) 123-4567</span>
            </a>
            <a href="mailto:support@freshcart.com" className="flex items-center gap-1.5 hover:text-[#10b981] transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span>support@freshcart.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-1.5 hover:text-[#10b981] transition-colors">
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
            <Link href="/register" className="flex items-center gap-1.5 hover:text-[#10b981] transition-colors">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
