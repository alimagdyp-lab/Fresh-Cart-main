'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '../_utils/axiosInstance';
import { useAuth } from '../_context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import Image from 'next/image';

interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
}

interface Order {
  _id: string;
  cartItems: OrderItem[];
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  paymentMethodType: string;
  totalOrderPrice: number;
}

export default function AllOrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<{ id: string }>(token);
        if (decoded.id) {
          axiosInstance
            .get(`/api/v1/orders/user/${decoded.id}`)
            .then(({ data }) => {
              // The API usually returns the array of orders either directly in data or in data.data / data.orders
              const ordersList = Array.isArray(data) ? data : (data.data || data.orders || []);
              setOrders(ordersList);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    } else {
       setLoading(false);
    }
  }, [token]);

  if (!token) {
    return (
      <div className="text-center py-24 px-4">
        <p className="text-5xl mb-4">🔒</p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Please log in to view orders</h2>
        <Link href="/login" className="bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition-colors">Login</Link>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-24 text-gray-500">Loading your orders…</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-24 px-4">
        <p className="text-6xl mb-4">📦</p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">No orders found</h2>
        <p className="text-gray-500 mb-6">Looks like you haven&apos;t placed any orders yet.</p>
        <Link href="/products" className="bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition-colors">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 pb-4 border-b border-gray-50">
               <div>
                  <p className="text-sm text-gray-500">Order ID: <span className="font-mono text-gray-800">{order._id}</span></p>
                  <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
               </div>
               <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {order.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {order.isDelivered ? 'Delivered' : 'Processing'}
                  </span>
               </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">Items</h3>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {order.cartItems.map(item => (
                    <div key={item._id} className="flex-shrink-0 w-16 group relative">
                      <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden relative">
                         {item.product?.imageCover && (
                            <Image src={item.product.imageCover} alt={item.product?.title || 'Product'} fill className="object-cover" sizes="64px"/>
                         )}
                      </div>
                      <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-64 bg-gray-50 rounded-xl p-4 flex flex-col justify-center">
                 <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                 <p className="text-2xl font-bold text-green-600">{order.totalOrderPrice} EGP</p>
                 <p className="text-xs text-gray-400 mt-1 uppercase">{order.paymentMethodType}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
