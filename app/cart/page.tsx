'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../_context/CartContext';
import { useAuth } from '../_context/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../_components/ProtectedRoute';

export default function CartPage() {
  const { cartItems, totalPrice, fetchCart, removeFromCart, updateCartItem, clearCart, cartId } = useCart();
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) fetchCart();
  }, [token, fetchCart]);



  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24 px-4">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products to get started.</p>
        <Link href="/products" className="bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition-colors">Shop Now</Link>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-gray-500 text-sm mt-1">{cartItems.length} items</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4">
              <Link href={`/products/${item.product._id}`} className="flex-shrink-0">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-50">
                  <Image src={item.product.imageCover} alt={item.product.title} fill className="object-cover" sizes="96px" />
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-green-500 font-medium">{item.product.category?.name}</p>
                <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mt-0.5">{item.product.title}</h3>
                <p className="text-green-600 font-bold text-sm mt-1">{item.price} EGP</p>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity control */}
                  <div className="flex items-center gap-2 border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => item.count > 1 ? updateCartItem(item._id, item.count - 1) : removeFromCart(item._id)}
                      className="px-3 py-1 hover:bg-gray-100 text-gray-600 text-sm transition-colors"
                    >−</button>
                    <span className="text-sm font-medium w-8 text-center">{item.count}</span>
                    <button
                      onClick={() => updateCartItem(item._id, item.count + 1)}
                      className="px-3 py-1 hover:bg-gray-100 text-gray-600 text-sm transition-colors"
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-400 hover:text-red-600 text-xs transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end justify-between text-right">
                <p className="font-bold text-gray-800">{(item.price * item.count).toFixed(2)} EGP</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>{totalPrice} EGP</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span>{totalPrice} EGP</span>
            </div>
          </div>
          <button
            onClick={() => router.push(`/checkout?cartId=${cartId}`)}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            Proceed to Checkout
          </button>
          <Link href="/products" className="block text-center text-sm text-gray-500 hover:text-green-500 mt-3 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
}
