'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../_utils/axiosInstance';
import { useAuth } from '../_context/AuthContext';
import { useCart } from '../_context/CartContext';
import ProtectedRoute from '../_components/ProtectedRoute';
import toast from 'react-hot-toast';
import Link from 'next/link';

function CheckoutForm() {
  const searchParams = useSearchParams();
  const cartId = searchParams.get('cartId');
  const router = useRouter();
  const { token } = useAuth();
  const { clearCart, totalPrice } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      phone: '',
      city: '',
      details: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number')
        .required('Phone is required'),
      city: Yup.string().required('City is required'),
      details: Yup.string().required('Address details are required'),
    }),
    onSubmit: async (values) => {
      if (!token || !cartId) {
        toast.error('Missing cart or auth info');
        return;
      }
      setLoading(true);
      try {
        if (paymentMethod === 'online') {
          const { data } = await axiosInstance.post(
            `/api/v1/orders/checkout-session/${cartId}`,
            { shippingAddress: values },
            {
              headers: { token },
              params: { url: window.location.origin },
            }
          );
          window.location.href = data.session.url;
        } else {
          await axiosInstance.post(
            `/api/v1/orders/${cartId}`,
            { shippingAddress: values },
            { headers: { token } }
          );
          await clearCart();
          toast.success('Order placed successfully! 🎉');
          router.push('/allorders');
        }
      } catch (err: unknown) {
        const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Order failed';
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        <p className="text-gray-500 text-sm mt-1">Complete your order</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-5 text-lg">Shipping Address</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="01XXXXXXXXX"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm ${
                  formik.touched.phone && formik.errors.phone ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Cairo, Alexandria, etc."
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm ${
                  formik.touched.city && formik.errors.city ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Details</label>
              <textarea
                name="details"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Street, building, floor, apartment..."
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm resize-none ${
                  formik.touched.details && formik.errors.details ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {formik.touched.details && formik.errors.details && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.details}</p>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <h2 className="font-bold text-gray-800 mt-8 mb-4 text-lg">Payment Method</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('cash')}
              className={`p-4 border-2 rounded-xl text-center transition-colors ${
                paymentMethod === 'cash' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="text-2xl mb-1">💵</p>
              <p className="font-semibold text-sm text-gray-700">Cash on Delivery</p>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('online')}
              className={`p-4 border-2 rounded-xl text-center transition-colors ${
                paymentMethod === 'online' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="text-2xl mb-1">💳</p>
              <p className="font-semibold text-sm text-gray-700">Online Payment</p>
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-fit">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{totalPrice} EGP</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-800 text-base">
              <span>Total</span>
              <span>{totalPrice} EGP</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !formik.isValid}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white py-3 rounded-xl font-bold transition-colors"
          >
            {loading ? 'Processing…' : paymentMethod === 'online' ? '💳 Pay Online' : '✅ Place Order'}
          </button>
          <Link href="/cart" className="block text-center text-sm text-gray-500 hover:text-green-500 mt-3 transition-colors">
            ← Back to Cart
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading checkout…</div>}>
        <CheckoutForm />
      </Suspense>
    </ProtectedRoute>
  );
}
