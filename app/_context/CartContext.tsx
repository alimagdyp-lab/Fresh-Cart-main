'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../_utils/axiosInstance';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: { name: string };
    brand: { name: string };
  };
}

interface CartContextType {
  cartCount: number;
  cartId: string | null;
  fetchCart: () => void;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateCartItem: (itemId: string, count: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartItems: CartItem[];
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  cartId: null,
  fetchCart: () => {},
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateCartItem: async () => {},
  clearCart: async () => {},
  cartItems: [],
  totalPrice: 0,
  isLoading: false,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/cart', { headers: { token } });
      return res.data;
    },
    enabled: !!token,
    retry: false,
  });

  const cartCount = data?.numOfCartItems || 0;
  const cartId = data?.data?._id || null;
  const cartItems = data?.data?.products || [];
  const totalPrice = data?.data?.totalCartPrice || 0;

  const addMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await axiosInstance.post('/api/v1/cart', { productId }, { headers: { token } });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Product added to cart!');
    },
    onError: () => toast.error('Failed to add to cart'),
  });

  const removeMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const res = await axiosInstance.delete(`/api/v1/cart/${itemId}`, { headers: { token } });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item removed');
    },
    onError: () => toast.error('Failed to remove item'),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ itemId, count }: { itemId: string; count: number }) => {
      const res = await axiosInstance.put(`/api/v1/cart/${itemId}`, { count }, { headers: { token } });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => toast.error('Failed to update quantity'),
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete('/api/v1/cart', { headers: { token } });
    },
    onSuccess: () => {
      queryClient.setQueryData(['cart'], null);
    },
    onError: () => toast.error('Failed to clear cart'),
  });

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartId,
        fetchCart: refetch,
        addToCart: async (productId) => { await addMutation.mutateAsync(productId); },
        removeFromCart: async (itemId) => { await removeMutation.mutateAsync(itemId); },
        updateCartItem: async (itemId, count) => { await updateMutation.mutateAsync({ itemId, count }); },
        clearCart: async () => { await clearMutation.mutateAsync(); },
        cartItems,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
