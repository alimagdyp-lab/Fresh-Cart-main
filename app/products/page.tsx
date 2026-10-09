'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '../_utils/axiosInstance';
import ProductCard from '../_components/ProductCard';
import { useWishlist } from '../_context/WishlistContext';
import { useAuth } from '../_context/AuthContext';

interface Product {
  _id: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: { name: string };
  brand?: { name: string };
}

function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { fetchWishlist } = useWishlist();
  const { token } = useAuth();
  
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category');

  useEffect(() => {
    if (token) fetchWishlist();
    setLoading(true);
    
    const url = categoryId 
      ? `/api/v1/products?category=${categoryId}&limit=40`
      : '/api/v1/products?limit=40';

    axiosInstance.get(url).then(({ data }) => {
      setProducts(data.data);
    }).finally(() => setLoading(false));
  }, [token, fetchWishlist, categoryId]);

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {categoryId && products.length > 0 ? products[0].category.name : 'All Products'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{filtered.length} products found</p>
        </div>
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-slate-100 animate-pulse rounded-xl h-72" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filtered.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-gray-500 text-lg">No products found for &quot;{search}&quot;</p>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10b981] mx-auto"></div>
      </div>
    }>
      <ProductsList />
    </Suspense>
  );
}
