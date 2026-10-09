'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../_utils/axiosInstance';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export interface WishlistItem {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  category: { name: string };
  brand: { name: string };
}

interface WishlistContextType {
  wishlistIds: string[];
  fetchWishlist: () => void;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  wishlistItems: WishlistItem[];
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  fetchWishlist: () => {},
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  isInWishlist: () => false,
  wishlistItems: [],
  isLoading: false,
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/wishlist', { headers: { token } });
      return res.data;
    },
    enabled: !!token,
    retry: false,
  });

  const wishlistItems: WishlistItem[] = data?.data || [];
  const wishlistIds = wishlistItems.map((i) => i._id);

  const addMutation = useMutation({
    mutationFn: async (productId: string) => {
      await axiosInstance.post('/api/v1/wishlist', { productId }, { headers: { token } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Added to wishlist ❤️');
    },
    onError: () => toast.error('Failed to add to wishlist'),
  });

  const removeMutation = useMutation({
    mutationFn: async (productId: string) => {
      await axiosInstance.delete(`/api/v1/wishlist/${productId}`, { headers: { token } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Removed from wishlist');
    },
    onError: () => toast.error('Failed to remove from wishlist'),
  });

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        fetchWishlist: refetch,
        addToWishlist: async (productId) => { await addMutation.mutateAsync(productId); },
        removeFromWishlist: async (productId) => { await removeMutation.mutateAsync(productId); },
        isInWishlist,
        wishlistItems,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
