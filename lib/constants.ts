// lib/constants.ts

export const JITSI_DOMAIN = process.env.NEXT_PUBLIC_JITSI_DOMAIN || "meet.francaassessoria.com";

export const USERS = {
  gabriel: {
    name: "Gabriel",
    password: "ceo@franca",
    role: "CEO",
    icon: "Target",
    color: "#7DE08D"
  },
  bruna: {
    name: "Bruna",
    password: "socialmedia@franca",
    role: "Social Media Manager",
    icon: "Instagram",
    color: "#598F74"
  },
  guilherme: {
    name: "Guilherme",
    password: "design@franca",
    role: "Design Lead",
    icon: "Palette",
    color: "#7DE08D"
  },
  leonardo: {
    name: "Leonardo",
    password: "trafego@franca",
    role: " Gestor de Tráfego",
    icon: "TrendingUp",
    color: "#598F74"
  },
  davidson: {
    name: "Davidson",
    password: "tech@franca",
    role: "Tech Lead",
    icon: "Code",
    color: "#7DE08D"
  }
} as const;

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
export type UserId = keyof typeof USERS;
export type RoomId = typeof ROOMS[number]["id"];
