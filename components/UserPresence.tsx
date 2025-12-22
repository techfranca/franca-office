// components/UserPresence.tsx

"use client";

import { useStore } from "@/lib/store";
import { STATUS, USERS } from "@/lib/constants";
import * as Icons from "lucide-react";

export default function UserPresence() {
  const currentUser = useStore((state) => state.currentUser);

  if (!currentUser) return null;

  const userStatus = STATUS[currentUser.status];
  const UserIcon = Icons[USERS[currentUser.id].icon as keyof typeof Icons] as any;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="font-bold text-lg text-franca-navy mb-4">Seu Status</h3>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-franca-green to-franca-green-dark rounded-xl flex items-center justify-center shadow-lg">
          {UserIcon && <UserIcon className="w-8 h-8 text-franca-navy" />}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-franca-navy">{currentUser.name}</h4>
            <span
              className="w-3 h-3 rounded-full animate-pulse-slow"
              style={{ backgroundColor: userStatus.color }}
            ></span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{currentUser.role}</p>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${userStatus.color}20`,
              color: userStatus.color,
            }}
          >
            <span>{userStatus.icon}</span>
            <span>{userStatus.label}</span>
          </div>
        </div>
      </div>

      {currentUser.currentRoom && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            📍 Atualmente em:{" "}
            <span className="font-semibold text-franca-green">
              {currentUser.currentRoom}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
