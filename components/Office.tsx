// components/Office.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { ROOMS } from "@/lib/constants";
import Sidebar from "./Sidebar";
import VideoRoom from "./VideoRoom";
import PrivateRoomModal from "./PrivateRoomModal";

export default function Office() {
  const router = useRouter();
  const {
    currentUser,
    currentRoom,
    joinRoom,
    leaveRoom,
    privateRoomLock,
    lockPrivateRoom,
    unlockPrivateRoom,
    verifyPrivateRoomPassword,
  } = useStore();

  const [showPrivateModal, setShowPrivateModal] = useState(false);
  const [pendingRoom, setPendingRoom] = useState<string | null>(null);

  // Redirecionar se não estiver logado
  if (!currentUser) {
    router.push("/login");
    return null;
  }

  const handleJoinRoom = (roomId: string) => {
    const room = ROOMS.find((r) => r.id === roomId);
    if (!room) return;

    // Se for sala privada e estiver trancada
    if (room.isPrivate && roomId === "reuniao-privada") {
      if (privateRoomLock.isLocked) {
        setPendingRoom(roomId);
        setShowPrivateModal(true);
        return;
      }
    }

    joinRoom(roomId as any);
  };

  const handleLockPrivateRoom = (password: string) => {
    lockPrivateRoom(password);
    setShowPrivateModal(false);
    if (pendingRoom) {
      joinRoom(pendingRoom as any);
      setPendingRoom(null);
    }
  };

  const handleUnlockPrivateRoom = (password: string) => {
    if (verifyPrivateRoomPassword(password)) {
      setShowPrivateModal(false);
      if (pendingRoom) {
        joinRoom(pendingRoom as any);
        setPendingRoom(null);
      }
    } else {
      alert("Senha incorreta!");
    }
  };

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
            onLeave={leaveRoom}
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
                Bem-vindo ao Franca Office
              </h2>
              <p className="text-gray-400">
                Selecione uma sala na barra lateral para começar
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal Sala Privada */}
      <PrivateRoomModal
        isOpen={showPrivateModal}
        onClose={() => {
          setShowPrivateModal(false);
          setPendingRoom(null);
        }}
        onUnlock={handleUnlockPrivateRoom}
        isLocked={privateRoomLock.isLocked}
        onLock={handleLockPrivateRoom}
      />
    </div>
  );
}
