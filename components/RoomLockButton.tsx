// components/RoomLockButton.tsx

"use client";

import { Lock, Unlock } from "lucide-react";
import { useRoomLock } from "@/lib/useRoomLock";

interface RoomLockButtonProps {
  roomId: string;
}

export default function RoomLockButton({ roomId }: RoomLockButtonProps) {
  const { lockState, isLocking, lockRoom, unlockRoom, isLockedByCurrentUser } = useRoomLock(roomId);

  // Se a sala não está trancada
  if (!lockState.locked) {
    return (
      <button
        onClick={lockRoom}
        disabled={isLocking}
        className="flex items-center gap-2 px-4 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-lg transition-all border border-yellow-500/20 hover:border-yellow-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Trancar sala (impede que outros entrem)"
      >
        <Unlock className="w-4 h-4" />
        <span className="text-sm font-medium">
          {isLocking ? "Trancando..." : "Trancar Sala"}
        </span>
      </button>
    );
  }

  // Se a sala está trancada pelo usuário atual
  if (isLockedByCurrentUser) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg border border-red-500/20">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">Sala trancada por você</span>
        </div>
        <button
          onClick={unlockRoom}
          disabled={isLocking}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg transition-all border border-green-500/20 hover:border-green-500/40 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          <Unlock className="w-4 h-4" />
          {isLocking ? "Destrancando..." : "Destrancar Sala"}
        </button>
      </div>
    );
  }

  // Se a sala está trancada por outro usuário
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg border border-red-500/20">
      <Lock className="w-4 h-4" />
      <span className="text-sm font-medium">
        Sala trancada por {lockState.lockedByName}
      </span>
    </div>
  );
}