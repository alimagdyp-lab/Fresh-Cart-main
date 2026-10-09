import { Mail, Check, Star, Download, Apple, Play } from 'lucide-react';

export default function NewsletterSection() {
  return (
    <section className="mb-16 bg-[#f8fdfa] rounded-[32px] p-8 md:p-12 border border-[#e5f5ec] shadow-sm overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Newsletter Form */}
        <div className="flex flex-col gap-6">
          {/* Top Label */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#10b981] rounded-2xl flex items-center justify-center shadow-md shadow-emerald-200">
              <Mail className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#10b981] font-bold text-sm tracking-wider">NEWSLETTER</span>
              <span className="text-slate-500 text-xs">50,000+ subscribers</span>
            </div>
          </div>

          {/* Headings */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight">
              Get the Freshest Updates
            </h2>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#10b981] tracking-tight leading-tight mt-1">
              Delivered Free
            </h2>
            <p className="text-slate-500 text-lg mt-4">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>
          </div>

          {/* Perks Badges */}
          <div className="flex flex-wrap gap-3 mt-2">
            {[
              { icon: '🍃', text: 'Fresh Picks Weekly' },
              { icon: '🚚', text: 'Free Delivery Codes' },
              { icon: '🏷️', text: 'Members-Only Deals' },
            ].map((perk, idx) => (
              <div key={idx} className="bg-white border border-[#10b981]/20 rounded-full py-2 px-4 flex items-center gap-2 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-[#10b981]/10 flex items-center justify-center text-xs">
                  {perk.icon}
                </div>
                <span className="text-sm font-semibold text-slate-700">{perk.text}</span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 px-6 py-4 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]/50 text-slate-700 text-lg placeholder-slate-400"
              />
              <button className="bg-[#10b981] hover:bg-[#059669] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-md shadow-emerald-200 flex items-center justify-center gap-2 whitespace-nowrap">
                Subscribe <span>→</span>
              </button>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 ml-2">
              <span className="text-amber-400">✨</span> Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        </div>

        {/* Right Side: Mobile App Promo Card */}
        <div className="lg:pl-8 lg:border-l border-emerald-100 flex justify-center lg:justify-end">
          <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] rounded-[32px] p-8 md:p-10 text-white w-full max-w-md shadow-2xl relative overflow-hidden">
            {/* Soft glow effect behind the card content */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981] opacity-10 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="bg-white/10 w-fit px-3 py-1.5 rounded-full flex items-center gap-2 mb-6 border border-white/5 backdrop-blur-md">
              <span className="text-xs">📱</span>
              <span className="text-[#10b981] text-xs font-bold tracking-wider">MOBILE APP</span>
            </div>

            <h3 className="text-3xl font-bold mb-3 tracking-tight">Shop Faster on Our App</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Get app-exclusive deals & 15% off your first order.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {/* App Store Button */}
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all group backdrop-blur-sm">
                <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider mb-0.5">DOWNLOAD ON</span>
                  <span className="text-lg font-bold leading-none">App Store</span>
                </div>
              </button>

              {/* Google Play Button */}
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all group backdrop-blur-sm">
                <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider mb-0.5">GET IT ON</span>
                  <span className="text-lg font-bold leading-none">Google Play</span>
                </div>
              </button>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-slate-400 font-medium">4.9 • 100K+ downloads</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
