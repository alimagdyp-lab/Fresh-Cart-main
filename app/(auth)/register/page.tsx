'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../_utils/axiosInstance';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number')
        .required('Phone is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axiosInstance.post('/api/v1/auth/signup', values);
        toast.success('Account created! Please log in.');
        router.push('/login');
      } catch (err: unknown) {
        const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Registration failed';
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    },
  });

  const getFieldClasses = (fieldName: keyof typeof formik.values) => {
    return `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors ${
      formik.touched[fieldName] && formik.errors[fieldName] ? 'border-red-400' : 'border-gray-200'
    }`;
  };

  const field = (name: keyof typeof formik.values, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        className={getFieldClasses(name)}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-xs text-red-500">{formik.errors[name] as string}</p>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto my-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-green-500">Fresh</span>
            <span className="text-gray-800">Cart</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Create your account</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {field('name', 'Full Name', 'text', 'John Doe')}
          {field('email', 'Email', 'email', 'you@example.com')}
          {field('phone', 'Phone', 'tel', '01XXXXXXXXX')}
          {field('password', 'Password', 'password', '••••••••')}
          {field('rePassword', 'Confirm Password', 'password', '••••••••')}

          <button
            type="submit"
            disabled={loading || !formik.isValid}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-green-500 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
