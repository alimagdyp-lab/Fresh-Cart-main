import Link from 'next/link';

export default function SecondaryBanners() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Organic Fruits */}
      <div className="bg-red-50 rounded-2xl p-8 h-64 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Fresh Organic Fruits</h3>
        <p className="text-gray-600 mb-6 max-w-xs">Get up to 40% off on selected organic fruits</p>
        <Link href="/products" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors w-fit">
          Shop Now
        </Link>
      </div>

      {/* Exotic Vegetables */}
      <div className="bg-emerald-50 rounded-2xl p-8 h-64 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Exotic Vegetables</h3>
        <p className="text-gray-600 mb-6 max-w-xs">Discover our latest collection of premium vegetables</p>
        <Link href="/products?sort=newest" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors w-fit">
          Explore Now
        </Link>
      </div>
    </section>
  );
}
