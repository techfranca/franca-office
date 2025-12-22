// components/RoomCard.tsx

"use client";

import { ROOMS } from "@/lib/constants";
import { Users, Lock } from "lucide-react";

interface RoomCardProps {
  room: typeof ROOMS[number];
  onJoin: () => void;
  isCurrentRoom: boolean;
  onlineCount?: number;
}

export default function RoomCard({
  room,
  onJoin,
  isCurrentRoom,
  onlineCount = 0,
}: RoomCardProps) {
  return (
    <div
      className={`card-franca cursor-pointer transform transition-all hover:scale-105 ${
        isCurrentRoom ? "ring-4 ring-franca-green shadow-2xl" : ""
      }`}
      onClick={onJoin}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{room.icon}</div>
          <div>
            <h3 className="font-bold text-lg text-franca-navy flex items-center gap-2">
              {room.name}
              {room.isPrivate && (
                <Lock className="w-4 h-4 text-franca-green-dark" />
              )}
            </h3>
            <p className="text-sm text-gray-600">{room.description}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>
            {onlineCount > 0 ? (
              <>
                <span className="font-semibold text-franca-green">
                  {onlineCount}
                </span>{" "}
                online
              </>
            ) : (
              "Vazia"
            )}
          </span>
        </div>

        <div className="text-xs text-gray-500">
          Até {room.capacity} pessoas
        </div>
      </div>

      {/* Status atual */}
      {isCurrentRoom && (
        <div className="mt-3 px-3 py-2 bg-franca-green/20 rounded-lg text-center">
          <span className="text-sm font-semibold text-franca-green-dark">
            ✓ Você está aqui
          </span>
        </div>
      )}
    </div>
  );
}
