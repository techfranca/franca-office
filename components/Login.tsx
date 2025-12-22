// components/Login.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { USERS, UserId } from "@/lib/constants";
import { LogIn, AlertCircle } from "lucide-react";
import * as Icons from "lucide-react";

export default function Login() {
  const router = useRouter();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const [selectedUser, setSelectedUser] = useState<UserId | "">("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!selectedUser) {
      setError("Selecione um usuário");
      setIsLoading(false);
      return;
    }

    const user = USERS[selectedUser];
    
    if (password !== user.password) {
      setError("Senha incorreta");
      setIsLoading(false);
      return;
    }

    // Login bem-sucedido
    setCurrentUser({
      id: selectedUser,
      name: user.name,
      role: user.role,
      avatar: user.icon,
      currentRoom: null,
      status: "available",
      lastSeen: new Date(),
    });

    setTimeout(() => {
      router.push("/office");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-franca-navy via-franca-navy-light to-franca-navy flex items-center justify-center p-4">
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
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-10 h-10 text-franca-navy"><svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div>';
                }}
              />
            </div>
            <h1 className="text-3xl font-bold text-franca-navy mb-2">
              Franca Office
            </h1>
            <p className="text-gray-600">Escritório Virtual</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Seletor de Usuário */}
            <div>
              <label className="block text-sm font-semibold text-franca-navy mb-2">
                Selecione seu usuário
              </label>
              <select
                value={selectedUser}
                onChange={(e) => {
                  setSelectedUser(e.target.value as UserId);
                  setError("");
                }}
                className="input-franca"
                required
              >
                <option value="">Escolha...</option>
                {Object.entries(USERS).map(([id, user]) => {
                  return (
                    <option key={id} value={id}>
                      {user.name} - {user.role}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-semibold text-franca-navy mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Digite sua senha"
                className="input-franca"
                required
              />
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-slide-in">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            {/* Botão de login */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-franca w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-franca-navy"></div>
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Entrar no Escritório</span>
                </>
              )}
            </button>
          </form>

          {/* Rodapé */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              <span className="font-semibold text-franca-green">Franca Office v2.0</span>
              <br />
              Hub de Comunicação
            </p>
          </div>
        </div>

        {/* Créditos */}
        <p className="text-center mt-6 text-sm text-franca-green/70">
           Desenvolvido pela equipe de tecnologia Franca • Todos os direitos reservados • 2025
        </p>
      </div>
    </div>
  );
}