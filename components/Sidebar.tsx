// components/Sidebar.tsx

"use client";

import { useStore } from "@/lib/store";
import { ROOMS, USERS, STATUS } from "@/lib/constants";
import { LogOut } from "lucide-react";
import * as Icons from "lucide-react";
import { useRouter } from "next/navigation";
import StatusSelector from "./StatusSelector";
import { usePresence } from "@/lib/usePresence";

interface SidebarProps {
  onRoomSelect: (roomId: string) => void;
}

export default function Sidebar({ onRoomSelect }: SidebarProps) {
  const router = useRouter();
  const { currentUser, currentRoom, logout } = useStore();
  const { presenceByRoom } = usePresence();

  const handleLogout = () => {
    if (confirm("Deseja realmente sair do Franca Office?")) {
      logout();
      router.push("/login");
    }
  };

  if (!currentUser) return null;

  const UserIcon = Icons[USERS[currentUser.id].icon as keyof typeof Icons] as any;

  return (
    <div className="w-64 bg-franca-navy h-screen flex flex-col text-white">
      {/* Header com logo */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Franca" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<span class="text-franca-navy font-bold text-xl">F</span>';
              }}
            />
          </div>
          <div>
            <h1 className="font-bold text-lg">Franca Office</h1>
            <p className="text-xs text-white/60">Escritório Virtual</p>
          </div>
        </div>
      </div>

      {/* Usuário atual */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-franca-green/20 rounded-lg flex items-center justify-center">
            {UserIcon && <UserIcon className="w-5 h-5 text-franca-green" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{currentUser.name}</p>
            <p className="text-xs text-white/60 truncate">{currentUser.role}</p>
          </div>
        </div>
        <StatusSelector />
      </div>

      {/* Lista de Ambientes */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">
            Ambientes
          </p>
          <div className="space-y-1">
            {ROOMS.map((room) => {
              const RoomIcon = Icons[room.icon as keyof typeof Icons] as any;
              const isActive = currentRoom === room.id;
              const usersInRoom = presenceByRoom[room.id] || [];
              const hasUsers = usersInRoom.length > 0;
              
              return (
                <button
                  key={room.id}
                  onClick={() => onRoomSelect(room.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                    isActive
                      ? "bg-franca-green text-franca-navy"
                      : "hover:bg-white/5 text-white/80 hover:text-white"
                  }`}
                >
                  {/* Ícone */}
                  <div className={`relative ${isActive ? "" : "text-white/60 group-hover:text-white"}`}>
                    {RoomIcon && <RoomIcon className="w-5 h-5" />}
                  </div>

                  {/* Nome da sala */}
                  <span className="flex-1 text-left text-sm font-medium truncate">
                    {room.name}
                  </span>

                  {/* Membros online */}
                  {hasUsers && (
                    <div className="flex items-center -space-x-2">
                      {usersInRoom.slice(0, 3).map((presence) => {
                        const userStatus = STATUS[presence.status as keyof typeof STATUS] || STATUS.available;
                        return (
                          <div
                            key={presence.userId}
                            className={`relative w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                              isActive 
                                ? "border-franca-green bg-franca-navy text-franca-green" 
                                : "border-franca-navy bg-franca-green text-franca-navy"
                            }`}
                            title={`${presence.userName} - ${userStatus.label}`}
                          >
                            {presence.userName.charAt(0)}
                            {/* Indicador de status */}
                            <span
                              className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-franca-navy"
                              style={{ backgroundColor: userStatus.color }}
                            />
                          </div>
                        );
                      })}
                      {usersInRoom.length > 3 && (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                          isActive 
                            ? "border-franca-green bg-franca-navy text-franca-green" 
                            : "border-franca-navy bg-franca-green text-franca-navy"
                        }`}>
                          +{usersInRoom.length - 3}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Badge de sala atual */}
                  {isActive && (
                    <span className="text-xs font-bold">→</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer com logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}