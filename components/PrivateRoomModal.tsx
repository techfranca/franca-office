// components/PrivateRoomModal.tsx

"use client";

import { useState } from "react";
import { Lock, X, AlertCircle } from "lucide-react";

interface PrivateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (password: string) => void;
  isLocked: boolean;
  onLock: (password: string) => void;
}

export default function PrivateRoomModal({
  isOpen,
  onClose,
  onUnlock,
  isLocked,
  onLock,
}: PrivateRoomModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"unlock" | "lock">(isLocked ? "unlock" : "lock");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 4) {
      setError("A senha deve ter pelo menos 4 caracteres");
      return;
    }

    if (mode === "unlock") {
      onUnlock(password);
    } else {
      onLock(password);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-franca-green rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-franca-navy" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-franca-navy">
                Sala Privada
              </h2>
              <p className="text-sm text-gray-600">
                {isLocked ? "Sala trancada" : "Trancar sala"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isLocked ? (
            <>
              <p className="text-sm text-gray-600">
                Esta sala está trancada. Digite a senha para entrar:
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Digite a senha"
                className="input-franca"
                autoFocus
              />
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                Defina uma senha para trancar a sala. Apenas quem souber a senha
                poderá entrar:
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Crie uma senha (mín. 4 caracteres)"
                className="input-franca"
                autoFocus
              />
            </>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-franca-outline flex-1"
            >
              Cancelar
            </button>
            <button type="submit" className="btn-franca flex-1">
              {isLocked ? "Entrar" : "Trancar Sala"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
