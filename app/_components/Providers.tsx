'use client';

import { AuthProvider } from '../_context/AuthContext';
import { CartProvider } from '../_context/CartContext';
import { WishlistProvider } from '../_context/WishlistContext';
import ReactQueryProvider from './ReactQueryProvider';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
            <Toaster position="top-right" />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
