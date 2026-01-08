// lib/store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RoomId, UserStatus } from './constants';

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;          // Ícone do Lucide
  photoURL?: string;       // Foto do Google (opcional)
  email?: string;          // Email do Google
  currentRoom: RoomId | null;
  status: UserStatus;
  lastSeen: Date;
}

interface RoomPresence {
  [roomId: string]: string[];
}

interface PrivateRoomLock {
  isLocked: boolean;
  password: string | null;
}

interface Store {
  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  logout: () => void;

  // User status
  setUserStatus: (status: UserStatus) => void;

  // Room management
  currentRoom: RoomId | null;
  joinRoom: (roomId: RoomId) => void;
  leaveRoom: () => void;

  // Room presence
  roomPresence: RoomPresence;
  updateRoomPresence: (roomId: RoomId, users: string[]) => void;
  getUsersInRoom: (roomId: RoomId) => string[];

  // Private room
  privateRoomLock: PrivateRoomLock;
  lockPrivateRoom: (password: string) => void;
  unlockPrivateRoom: () => void;
  verifyPrivateRoomPassword: (password: string) => boolean;

  // Online users
  onlineUsers: User[];
  updateOnlineUsers: (users: User[]) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      currentRoom: null,
      onlineUsers: [],
      roomPresence: {},
      privateRoomLock: {
        isLocked: false,
        password: null
      },

      // Actions
      setCurrentUser: (user) => set({ currentUser: user }),

      logout: () => set({ 
        currentUser: null, 
        currentRoom: null 
      }),

      setUserStatus: (status) => set((state) => ({
        currentUser: state.currentUser 
          ? { ...state.currentUser, status }
          : null
      })),

      joinRoom: (roomId) => set((state) => {
        const newPresence = { ...state.roomPresence };
        
        // Remover usuário da sala anterior
        if (state.currentRoom && state.currentUser) {
          const oldRoom = newPresence[state.currentRoom] || [];
          newPresence[state.currentRoom] = oldRoom.filter(id => id !== state.currentUser!.id);
        }
        
        // Adicionar usuário na nova sala
        if (state.currentUser) {
          const currentRoomUsers = newPresence[roomId] || [];
          if (!currentRoomUsers.includes(state.currentUser.id)) {
            newPresence[roomId] = [...currentRoomUsers, state.currentUser.id];
          }
        }
        
        return {
          currentRoom: roomId,
          roomPresence: newPresence,
          currentUser: state.currentUser
            ? { ...state.currentUser, currentRoom: roomId }
            : null
        };
      }),

      leaveRoom: () => set((state) => {
        const newPresence = { ...state.roomPresence };
        
        // Remover usuário da sala atual
        if (state.currentRoom && state.currentUser) {
          const currentRoomUsers = newPresence[state.currentRoom] || [];
          newPresence[state.currentRoom] = currentRoomUsers.filter(
            id => id !== state.currentUser!.id
          );
        }
        
        return {
          currentRoom: null,
          roomPresence: newPresence,
          currentUser: state.currentUser
            ? { ...state.currentUser, currentRoom: null }
            : null
        };
      }),

      // Room presence
      updateRoomPresence: (roomId, users) => set((state) => ({
        roomPresence: {
          ...state.roomPresence,
          [roomId]: users
        }
      })),

      getUsersInRoom: (roomId) => {
        const state = get();
        return state.roomPresence[roomId] || [];
      },

      lockPrivateRoom: (password) => set({
        privateRoomLock: {
          isLocked: true,
          password
        }
      }),

      unlockPrivateRoom: () => set({
        privateRoomLock: {
          isLocked: false,
          password: null
        }
      }),

      verifyPrivateRoomPassword: (password) => {
        const { privateRoomLock } = get();
        return privateRoomLock.password === password;
      },

      updateOnlineUsers: (users) => set({ onlineUsers: users })
    }),
    {
      name: 'franca-office-storage',
      partialize: (state) => ({ 
        currentUser: state.currentUser,
        privateRoomLock: state.privateRoomLock
      })
    }
  )
);
