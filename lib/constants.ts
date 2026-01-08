// lib/constants.ts

import { AUTHORIZED_USERS, getUserById } from './users';

export const JITSI_DOMAIN = process.env.NEXT_PUBLIC_JITSI_DOMAIN || "meet.francaassessoria.com";

// Mapeamento de usuários para compatibilidade com código existente
// Gera USERS dinamicamente a partir da whitelist
function generateUsersFromWhitelist() {
  const users: Record<string, {
    name: string;
    role: string;
    hasPassword: boolean;
    icon: string;
    color: string;
  }> = {};
  
  // Agrupa por ID único (evita duplicatas de emails alternativos)
  const seenIds = new Set<string>();
  
  Object.values(AUTHORIZED_USERS).forEach(user => {
    if (!seenIds.has(user.id)) {
      seenIds.add(user.id);
      users[user.id] = {
        name: user.name,
        role: user.role,
        hasPassword: false, // Agora usa Google Auth
        icon: user.icon,
        color: user.color
      };
    }
  });
  
  return users;
}

export const USERS = generateUsersFromWhitelist();

// Gera mapeamento de iniciais
function generateInitialsFromWhitelist() {
  const initials: Record<string, string> = {};
  
  const seenIds = new Set<string>();
  
  Object.values(AUTHORIZED_USERS).forEach(user => {
    if (!seenIds.has(user.id)) {
      seenIds.add(user.id);
      initials[user.id] = user.initials;
    }
  });
  
  return initials;
}

export const USER_INITIALS = generateInitialsFromWhitelist();

export const ROOMS = [
  {
    id: "reuniao",
    name: "Sala de Reunião",
    icon: "Users",
    description: "Reuniões em equipe",
    capacity: 5,
    isPrivate: false
  },
  {
    id: "reuniao-privada",
    name: "Sala de Reunião Privada",
    icon: "Lock",
    description: "Reuniões confidenciais",
    capacity: 5,
    isPrivate: true
  },
  {
    id: "cafe",
    name: "Área do Café",
    icon: "Coffee",
    description: "Bate-papo descontraído",
    capacity: 5,
    isPrivate: false
  },
  {
    id: "sala-gabriel",
    name: "Sala do Gabriel",
    icon: "Target",
    description: "Escritório do CEO",
    capacity: 5,
    isPrivate: false
  },
  {
    id: "sala-bruna",
    name: "Sala da Bruna",
    icon: "Instagram",
    description: "Escritório Social Media",
    capacity: 5,
    isPrivate: false
  },
  {
    id: "sala-leonardo",
    name: "Sala do Leonardo",
    icon: "TrendingUp",
    description: "Escritório Tráfego",
    capacity: 5,
    isPrivate: false
  },
  {
    id: "sala-guilherme",
    name: "Sala do Guilherme",
    icon: "Palette",
    description: "Escritório Design",
    capacity: 5,
    isPrivate: false
  },
  {
    id: "sala-davidson",
    name: "Sala do Davidson",
    icon: "Code",
    description: "Escritório Tech",
    capacity: 5,
    isPrivate: false
  }
] as const;

export const STATUS = {
  available: { label: "Disponível", color: "#7DE08D", icon: "✓" },
  focused: { label: "Em Foco", color: "#FFA500", icon: "🎯" },
  lunch: { label: "Almoço", color: "#FF6B6B", icon: "🍽️" }
} as const;

export type UserStatus = keyof typeof STATUS;
export type UserId = string; // Agora é dinâmico baseado na whitelist
export type RoomId = typeof ROOMS[number]["id"];
