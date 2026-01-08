"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { AlertCircle, Chrome } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const { 
    isLoading, 
    isAuthorized, 
    error, 
    signInWithGoogle, 
    clearError 
  } = useAuth();

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthorized && !isLoading) {
      router.push("/office");
    }
  }, [isAuthorized, isLoading, router]);

  const handleGoogleLogin = async () => {
    clearError();
    const result = await signInWithGoogle();
    
    if (result.success) {
      router.push("/office");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-franca-navy via-franca-navy-light to-franca-navy flex items-center justify-center p-4">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-franca-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-franca-green-dark/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 mb-4">
              <img
                src="/logo.png"
                alt="Franca"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class="w-10 h-10 text-franca-navy">
                      <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>`;
                }}
              />
            </div>
            <h1 className="text-3xl font-bold text-franca-navy mb-2">
              Franca Office
            </h1>
            <p className="text-gray-600">Escritório Virtual</p>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-slide-in">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Acesso negado</p>
                <p className="mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Botão de Login com Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-franca-navy"></div>
                <span>Entrando...</span>
              </>
            ) : (
              <>
                {/* Google Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Entrar com Google</span>
              </>
            )}
          </button>

          {/* Informação de segurança */}
          <div className="mt-6 p-4 bg-franca-green/10 rounded-lg">
            <p className="text-sm text-franca-navy text-center">
              <span className="font-semibold">🔒 Login seguro</span>
              <br />
              <span className="text-gray-600">
                Apenas emails autorizados podem acessar o escritório.
              </span>
            </p>
          </div>

          {/* Rodapé */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              <span className="font-semibold text-franca-green">
                Franca Office v3.0
              </span>
              <br />
              Hub de Comunicação
            </p>
          </div>
        </div>

        {/* Créditos */}
        <p className="text-center mt-6 text-sm text-franca-green/70">
          Desenvolvido pela equipe de tecnologia Franca • Todos os direitos
          reservados • 2025
        </p>
      </div>
    </div>
  );
}
