'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '../_context/WishlistContext';
import { useCart } from '../_context/CartContext';
import { useAuth } from '../_context/AuthContext';
import ProtectedRoute from '../_components/ProtectedRoute';

export default function WishlistPage() {
  const { wishlistItems, fetchWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { token } = useAuth();

  useEffect(() => {
    if (token) fetchWishlist();
  }, [token, fetchWishlist]);



  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-24 px-4">
        <p className="text-6xl mb-4">💔</p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Save items you like by tapping the heart icon.</p>
        <Link href="/products" className="bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
        <p className="text-gray-500 text-sm mt-1">{wishlistItems.length} saved items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {wishlistItems.map((item) => (
          <div key={item._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4">
            <Link href={`/products/${item._id}`} className="shrink-0">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-50">
                <Image src={item.imageCover} alt={item.title} fill className="object-cover" sizes="96px" />
              </div>
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-green-500 font-medium">{item.category?.name}</p>
              <Link href={`/products/${item._id}`}>
                <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 hover:text-green-500 transition-colors mt-0.5">
                  {item.title}
                </h3>
              </Link>
              <div className="flex items-center gap-1 mt-1">
                <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs text-gray-500">{item.ratingsAverage?.toFixed(1)}</span>
              </div>
              <p className="text-green-600 font-bold text-sm mt-1">{item.price} EGP</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => addToCart(item._id)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-1.5 rounded-lg font-medium transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="px-3 py-1.5 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg text-xs transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </ProtectedRoute>
  );
}
