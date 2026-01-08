// lib/users.ts
// 
// WHITELIST DE USUÁRIOS AUTORIZADOS
// =======================================
// Apenas emails listados aqui podem fazer login no Franca Office.
// Para adicionar um novo membro: adicione o email e configure o perfil.
// Para remover alguém: delete a entrada do email.

export interface AuthorizedUser {
  id: string;          // ID único (usado no Firebase)
  name: string;        // Nome de exibição
  role: string;        // Cargo
  icon: string;        // Ícone do Lucide (Target, Instagram, Palette, etc.)
  color: string;       // Cor do tema
  initials: string;    // Iniciais para mostrar nas salas
}

// Mapeamento: email Google → perfil do usuário
export const AUTHORIZED_USERS: Record<string, AuthorizedUser> = {
  // ═══════════════════════════════════════════════════════════════
  // CONFIGURE OS EMAILS AUTORIZADOS AQUI
  // Formato: "email@gmail.com": { id, name, role, icon, color, initials }
  // ═══════════════════════════════════════════════════════════════
  
  // Gabriel - CEO
  "contato@francaassessoria.com": {
    id: "gabriel",
    name: "Gabriel",
    role: "CEO",
    icon: "Target",
    color: "#7DE08D",
    initials: "GA"
  },
  
  // Bruna - Social Media Manager
  "conteudofranca@gmail.com": {
    id: "bruna",
    name: "Bruna",
    role: "Social Media Manager",
    icon: "Instagram",
    color: "#598F74",
    initials: "B"
  },
  
  // Guilherme - Design Lead
  "designfrancamidias@gmail.com": {
    id: "guilherme",
    name: "Guilherme",
    role: "Design Lead",
    icon: "Palette",
    color: "#7DE08D",
    initials: "GU"
  },
  
  // Leonardo - Gestor de Tráfego
  "gestorfrancamidias@gmail.com": {
    id: "leonardo",
    name: "Leonardo",
    role: "Gestor de Tráfego",
    icon: "TrendingUp",
    color: "#598F74",
    initials: "L"
  },
  
  // Davidson - Tech Lead
  "techfranca0@gmail.com": {
    id: "davidson",
    name: "Davidson",
    role: "Tech Lead",
    icon: "Code",
    color: "#7DE08D",
    initials: "D"
  },
  
  // ═══════════════════════════════════════════════════════════════
  // EMAILS ALTERNATIVOS (Gmail pessoal, etc.)
  // Se os membros usarem Gmail pessoal, adicione aqui também
  // ═══════════════════════════════════════════════════════════════
  
  // Exemplo com Gmail pessoal (descomente e ajuste conforme necessário):
  // "gabriel.sobrenome@gmail.com": {
  //   id: "gabriel",
  //   name: "Gabriel",
  //   role: "CEO",
  //   icon: "Target",
  //   color: "#7DE08D",
  //   initials: "GA"
  // },
};

// Função para verificar se um email está autorizado
export function isEmailAuthorized(email: string): boolean {
  return email.toLowerCase() in AUTHORIZED_USERS;
}

// Função para obter o perfil do usuário pelo email
export function getUserByEmail(email: string): AuthorizedUser | null {
  const normalizedEmail = email.toLowerCase();
  return AUTHORIZED_USERS[normalizedEmail] || null;
}

// Função para obter usuário por ID (para compatibilidade)
export function getUserById(id: string): AuthorizedUser | null {
  const users = Object.values(AUTHORIZED_USERS);
  return users.find(user => user.id === id) || null;
}

// Lista de todos os IDs únicos de usuários
export function getAllUserIds(): string[] {
  const ids = new Set<string>();
  Object.values(AUTHORIZED_USERS).forEach(user => ids.add(user.id));
  return Array.from(ids);
}
