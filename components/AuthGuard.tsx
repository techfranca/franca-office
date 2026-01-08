// components/AuthGuard.tsx

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoading, isAuthorized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      router.push('/login');
    }
  }, [isLoading, isAuthorized, router]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-franca-navy flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <img
              src="/logo.png"
              alt="Franca"
              className="w-full h-full object-contain animate-pulse"
            />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-franca-green mx-auto mb-4"></div>
          <p className="text-white/60 text-sm">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Não renderiza nada enquanto redireciona
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
