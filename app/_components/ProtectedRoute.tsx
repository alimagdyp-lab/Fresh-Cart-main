'use client';

import { useAuth } from '../_context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode, useState } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !token) {
      router.push('/login');
    }
  }, [token, isMounted, router]);

  if (!isMounted || !token) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
