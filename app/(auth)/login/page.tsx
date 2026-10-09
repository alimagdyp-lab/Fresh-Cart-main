'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../_utils/axiosInstance';
import { useAuth } from '../../_context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.post('/api/v1/auth/signin', values);
        setToken(data.token);
        toast.success('Welcome back!');
        router.push('/');
      } catch (err: unknown) {
        const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Login failed';
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="w-full max-w-md mx-auto my-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-green-500">Fresh</span>
            <span className="text-gray-800">Cart</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors ${
                formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-gray-200'
              }`}
              placeholder="you@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors ${
                formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-gray-200'
              }`}
              placeholder="••••••••"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !formik.isValid}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-green-500 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
