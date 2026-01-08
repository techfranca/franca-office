# 🏢 Franca Office v3.0.1

Escritório virtual da Franca com videoconferência via Jitsi Meet e **login seguro via Google**.

## 🔧 Correções da v3.0.1

- ✅ **Corrigido erro do undici** - Problema de incompatibilidade entre Firebase e Next.js
- ✅ **Next.js atualizado** - Versão 14.2.15 para melhor estabilidade
- ✅ **Firebase atualizado** - Versão 10.14.1 com correções
- ✅ **transpilePackages** - Configuração adicionada no next.config.js

## ✨ Recursos da v3.0

- 🔐 **Login com Google** - Autenticação segura via Firebase
- 👥 **Whitelist de emails** - Apenas emails autorizados podem acessar
- 📸 **Fotos do Google** - Avatares reais dos usuários nas salas
- 🔒 **Segurança reforçada** - Sem senhas armazenadas no código

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build
npm start
```

## 🔧 Configuração do Firebase

### 1. Ativar Google Auth no Firebase Console

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Selecione o projeto `franca-office`
3. Vá em **Authentication** > **Sign-in method**
4. Clique em **Google** e ative
5. Configure o email de suporte
6. Salve

### 2. Adicionar domínio autorizado

Em **Authentication** > **Settings** > **Authorized domains**, adicione:
- `localhost` (para desenvolvimento)
- `seu-dominio.vercel.app` (para produção)
- `francaoffice.com` (seu domínio final)

## 👥 Gerenciar Usuários

### Adicionar novo membro

Edite o arquivo `lib/users.ts`:

```typescript
export const AUTHORIZED_USERS: Record<string, AuthorizedUser> = {
  // Adicione o email do novo membro
  "novomembro@francaassessoria.com": {
    id: "novomembro",           // ID único
    name: "Nome Completo",       // Nome de exibição
    role: "Cargo",              // Ex: "Designer", "Dev"
    icon: "Palette",            // Ícone Lucide
    color: "#7DE08D",           // Cor do tema
    initials: "NM"              // Iniciais (2 letras)
  },
};
```

### Remover membro

Simplesmente delete a entrada do email no arquivo `lib/users.ts`.

### Ícones disponíveis

Os ícones são do [Lucide Icons](https://lucide.dev/icons/):
- `Target` - Alvo (CEO)
- `Instagram` - Social Media
- `Palette` - Design
- `TrendingUp` - Tráfego/Marketing
- `Code` - Tecnologia
- `Users` - Equipe
- `Briefcase` - Negócios
- `FileText` - Documentos
- etc.

## 📁 Estrutura do Projeto

```
├── app/
│   ├── login/page.tsx      # Página de login
│   ├── office/page.tsx     # Página principal
│   └── globals.css         # Estilos globais
├── components/
│   ├── AuthGuard.tsx       # Proteção de rotas
│   ├── AuthProvider.tsx    # Context de auth
│   ├── Login.tsx           # Tela de login Google
│   ├── Office.tsx          # Escritório virtual
│   ├── Sidebar.tsx         # Menu lateral
│   └── VideoRoom.tsx       # Sala de vídeo
├── lib/
│   ├── constants.ts        # Constantes (salas, status)
│   ├── firebase.ts         # Config Firebase
│   ├── store.ts            # Estado global (Zustand)
│   ├── useAuth.ts          # Hook de autenticação
│   ├── usePresence.ts      # Hook de presença
│   └── users.ts            # ⭐ WHITELIST DE EMAILS
└── .env.local              # Variáveis de ambiente
```

## 🔒 Segurança

### Por que Google Auth é mais seguro?

| Aspecto | Antes (v2) | Agora (v3) |
|---------|------------|------------|
| Senhas | No código | Google gerencia |
| 2FA | ❌ | ✅ |
| Rate limiting | ❌ | ✅ Google |
| Recuperação | ❌ | ✅ Google |

### Fluxo de autenticação

1. Usuário clica "Entrar com Google"
2. Firebase Auth abre popup do Google
3. Usuário seleciona conta
4. Sistema verifica se email está na whitelist
5. Se autorizado → entra no escritório
6. Se não → mostra erro e faz logout

## 🐛 Solução de Problemas

### "Email não autorizado"

Verifique se o email está na whitelist (`lib/users.ts`). O email deve estar exatamente igual (minúsculas).

### Popup bloqueado

Permita popups para o site nas configurações do navegador.

### Erro de domínio

Adicione o domínio em Firebase Console > Authentication > Authorized domains.

## 📝 Variáveis de Ambiente

```env
# Jitsi (seu servidor)
NEXT_PUBLIC_JITSI_DOMAIN=meet.francaassessoria.com

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_DATABASE_URL=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
```

## 🎨 Funcionalidades

- ✅ Login seguro via Google
- ✅ Whitelist de emails autorizados
- ✅ Presença em tempo real nas salas
- ✅ Videoconferência via Jitsi
- ✅ Status do usuário (Disponível, Focado, Almoço)
- ✅ Sala privada com trava
- ✅ Avatares (foto do Google ou ícones)

---

Desenvolvido com ❤️ pela equipe de tecnologia Franca • 2025
