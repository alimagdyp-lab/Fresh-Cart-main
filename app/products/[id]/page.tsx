'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import axiosInstance from '../../_utils/axiosInstance';
import { useCart } from '../../_context/CartContext';
import { useWishlist } from '../../_context/WishlistContext';
import { useAuth } from '../../_context/AuthContext';

interface ProductDetail {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  category: { name: string };
  brand?: { name: string };
  quantity: number;
  sold: number;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { token } = useAuth();
  const inWishlist = product ? isInWishlist(product._id) : false;

  useEffect(() => {
    axiosInstance.get(`/api/v1/products/${id}`)
      .then(({ data }) => {
        setProduct(data.data);
        setSelectedImage(data.data.imageCover);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-200 animate-pulse rounded-xl h-80" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
            <div className="h-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20 text-gray-500">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="relative h-80 rounded-xl overflow-hidden bg-gray-50 mb-4">
            <Image src={selectedImage} alt={product.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {[product.imageCover, ...product.images].map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedImage === img ? 'border-green-400' : 'border-gray-200'}`}>
                  <Image src={img} alt="" width={64} height={64} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-green-500 text-sm font-medium mb-2">{product.category?.name}</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.round(product.ratingsAverage) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.ratingsQuantity} reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-4">
            {product.priceAfterDiscount ? (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-green-600">{product.priceAfterDiscount} EGP</span>
                <span className="text-lg text-gray-400 line-through">{product.price} EGP</span>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">
                  {Math.round((1 - product.priceAfterDiscount / product.price) * 100)}% OFF
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-green-600">{product.price} EGP</span>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

          {/* Meta */}
          <div className="flex gap-6 text-sm text-gray-500 mb-6">
            <span>Stock: <strong className="text-gray-800">{product.quantity}</strong></span>
            <span>Sold: <strong className="text-gray-800">{product.sold}</strong></span>
            {product.brand && <span>Brand: <strong className="text-gray-800">{product.brand.name}</strong></span>}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => addToCart(product._id)}
              disabled={!token}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={() => inWishlist ? removeFromWishlist(product._id) : addToWishlist(product._id)}
              disabled={!token}
              className={`px-5 py-3 rounded-xl border-2 transition-colors ${inWishlist ? 'border-red-400 bg-red-50 text-red-500' : 'border-gray-200 hover:border-red-300 text-gray-500'}`}
            >
              ♥
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
