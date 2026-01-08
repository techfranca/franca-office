// components/Office.tsx

"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { ROOMS } from "@/lib/constants";
import { useRoomLock } from "@/lib/useRoomLock";
import AuthGuard from "./AuthGuard";
import Sidebar from "./Sidebar";
import VideoRoom from "./VideoRoom";
import { X, Lock } from "lucide-react";

function OfficeContent() {
  const { currentUser, currentRoom, joinRoom, leaveRoom } = useStore();
  
  // Estado para verificar trava da sala privada
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [lockedByName, setLockedByName] = useState("");
  
  // Hook para verificar se sala privada está trancada
  const { lockState: privateRoomLock } = useRoomLock("reuniao-privada");

  const handleJoinRoom = (roomId: string) => {
    const room = ROOMS.find((r) => r.id === roomId);
    if (!room) return;

    // Verificar se é sala privada e está trancada
    if (room.isPrivate && roomId === "reuniao-privada") {
      if (privateRoomLock.locked) {
        // Mostrar modal informando que está trancada
        setLockedByName(privateRoomLock.lockedByName || "alguém");
        setShowLockedModal(true);
        return;
      }
    }

    // Entrar na sala normalmente
    joinRoom(roomId as any);
  };

  const handleLeaveRoom = () => {
    leaveRoom();
  };

  if (!currentUser) return null;

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar fixa */}
      <Sidebar onRoomSelect={handleJoinRoom} />

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        {currentRoom ? (
          // Vídeo Room
          <VideoRoom
            roomId={currentRoom}
            roomName={ROOMS.find((r) => r.id === currentRoom)?.name || "Sala"}
            onLeave={handleLeaveRoom}
          />
        ) : (
          // Tela inicial vazia
          <div className="flex-1 flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <div className="w-32 h-32 bg-franca-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-16 h-16 text-franca-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Bem-vindo ao Franca Office, {currentUser.name}!
              </h2>
              <p className="text-gray-400">
                Selecione uma sala na barra lateral para começar
              </p>
              {currentUser.email && (
                <p className="text-gray-500 text-sm mt-2">
                  Logado como {currentUser.email}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal Sala Trancada */}
      {showLockedModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Sala Trancada
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Não é possível entrar
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLockedModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                A <strong>Sala de Reunião Privada</strong> está trancada por{" "}
                <strong className="text-red-600 dark:text-red-400">{lockedByName}</strong>.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Aguarde até que a sala seja destrancada para entrar.
              </p>
            </div>

            <button
              onClick={() => setShowLockedModal(false)}
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Office() {
  return (
    <AuthGuard>
      <OfficeContent />
    </AuthGuard>
  );
}
