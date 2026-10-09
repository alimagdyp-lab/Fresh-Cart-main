'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../_context/CartContext';
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

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { token } = useAuth();
  const inWishlist = isInWishlist(product._id);

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const handleWishlist = async () => {
    if (!token) return;
    setIsTogglingWishlist(true);
    try {
      if (inWishlist) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  const handleAddToCart = async () => {
    if (!token) return;
    setIsAddingToCart(true);
    try {
      await addToCart(product._id);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
      <div className="relative">
        <Link href={`/products/${product._id}`}>
          <div className="relative h-52 overflow-hidden bg-gray-50">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </Link>
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          disabled={!token || isTogglingWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-colors hover:bg-red-50 disabled:opacity-50"
        >
          {isTogglingWishlist ? (
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg
              className={`w-5 h-5 transition-colors ${inWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
              fill={inWishlist ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
        {product.priceAfterDiscount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
            SALE
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-green-500 font-medium mb-1">{product.category?.name}</p>
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2 hover:text-green-500 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs text-gray-500">{product.ratingsAverage?.toFixed(1)}</span>
          <span className="text-xs text-gray-400">({product.ratingsQuantity})</span>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-3">
          <div>
            {product.priceAfterDiscount ? (
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs line-through">{product.price} EGP</span>
                <span className="text-green-600 font-bold text-sm">{product.priceAfterDiscount} EGP</span>
              </div>
            ) : (
              <span className="text-green-600 font-bold text-sm">{product.price} EGP</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!token || isAddingToCart}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-center min-w-[60px]"
          >
            {isAddingToCart ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              '+ Add'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
