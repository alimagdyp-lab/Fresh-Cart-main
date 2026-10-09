'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Headphones 
} from 'lucide-react';

// Core Swiper CSS requirements
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function MainSlider() {
  const slides = [
    {
      id: 1,
      title: 'Fresh Products Delivered to your Door',
      subtitle: 'Get 20% off your first order',
      bgUrl: `url('/_next/static/media/home-slider-1.d79601a8.png')`,
      btnText: 'Shop Now',
      btnColor: 'text-green-500',
      btnUrl: '/products',
      secText: 'View Deals',
      secUrl: '/deals'
    },
    {
      id: 2,
      title: 'Premium Quality Guaranteed',
      subtitle: 'Fresh from farm to your table',
      bgUrl: `url('/_next/static/media/home-slider-1.d79601a8.png')`,
      btnText: 'Shop Now',
      btnColor: 'text-blue-500',
      btnUrl: '/products',
      secText: 'Learn More',
      secUrl: '/about'
    },
    {
      id: 3,
      title: 'Fast & Free Delivery',
      subtitle: 'Same day delivery available',
      bgUrl: `url('/_next/static/media/home-slider-1.d79601a8.png')`,
      btnText: 'Order Now',
      btnColor: 'text-purple-500',
      btnUrl: '/products',
      secText: 'Delivery Info',
      secUrl: '/delivery'
    }
  ];

  const features = [
    {
      id: 1,
      title: 'Free Shipping',
      desc: 'On orders over 500 EGP',
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      bgClass: 'bg-blue-50'
    },
    {
      id: 2,
      title: 'Secure Payment',
      desc: '100% secure transactions',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      bgClass: 'bg-emerald-50'
    },
    {
      id: 3,
      title: 'Easy Returns',
      desc: '14-day return policy',
      icon: <RotateCcw className="w-6 h-6 text-orange-600" />,
      bgClass: 'bg-orange-50'
    },
    {
      id: 4,
      title: '24/7 Support',
      desc: 'Dedicated support team',
      icon: <Headphones className="w-6 h-6 text-purple-600" />,
      bgClass: 'bg-purple-50'
    }
  ];

  return (
    <div className="w-full">
      
      {/* 1. SLIDER CONTAINER SECTION */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] mb-8 rounded-none overflow-hidden main-banner-swiper group select-none">
        <style jsx global>{`
          .main-banner-swiper .swiper-pagination-bullets {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            bottom: 24px !important;
          }
          .main-banner-swiper .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.4) !important;
            opacity: 1 !important;
            width: 12px !important;
            height: 12px !important;
            margin: 0 !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 9999px;
          }
          .main-banner-swiper .swiper-pagination-bullet-active {
            background: #ffffff !important;
            width: 36px !important;
            height: 14px !important;
          }
        `}</style>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          className="w-full h-[400px]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="h-[400px] w-full flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: slide.bgUrl }}
              >
                <div className="overlay py-20 text-white p-4 w-full h-full bg-gradient-to-r from-green-500/90 to-green-400/50 flex items-center">
                  <div className="container mx-auto px-8 sm:px-16 md:px-24 h-full content-center text-left">
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 max-w-xl leading-[1.2]">
                      {slide.title}
                    </h2>
                    <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6 font-medium">
                      {slide.subtitle}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <Link
                        href={slide.btnUrl}
                        className={`bg-white border-2 border-white/50 inline-block px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform duration-200 shadow-sm ${slide.btnColor}`}
                      >
                        {slide.btnText}
                      </Link>
                      <Link
                        href={slide.secUrl}
                        className="bg-transparent border-2 border-white/50 text-white inline-block px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform duration-200"
                      >
                        {slide.secText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button className="custom-prev absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border-none outline-none cursor-pointer">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="custom-next absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border-none outline-none cursor-pointer">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 2. FEATURE BADGES GRID */}
      <div className="w-full py-4 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feat) => (
            <div 
              key={feat.id} 
              className="flex items-center p-5 bg-white border border-gray-100/80 rounded-2xl shadow-xs hover:shadow-sm transition-shadow duration-300"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 mr-4 ${feat.bgClass}`}>
                {feat.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[15px] font-bold text-slate-800 leading-tight mb-0.5">
                  {feat.title}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {feat.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}