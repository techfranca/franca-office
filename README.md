# 🏢 Franca Office v2.0

Sistema de Escritório Virtual com videoconferência integrada usando Jitsi Meet.

## 📋 Sobre o Projeto

Franca Office é uma solução completa de escritório virtual desenvolvida para a equipe Franca, permitindo colaboração em tempo real através de videoconferências em salas dedicadas.

### ✨ Funcionalidades

- 🔐 Sistema de login com 5 usuários pré-definidos
- 🎯 8 salas de videoconferência (capacidade de 5 pessoas cada):
  - Sala de Reunião
  - Sala de Reunião Privada (com senha)
  - Área do Café
  - Salas individuais (Gabriel, Bruna, Leonardo, Guilherme, Davidson)
- 📊 Sistema de status (Disponível, Em Foco, Almoço)
- 👥 **Indicadores de presença** - veja quem está em cada sala em tempo real
- 🎨 Identidade visual da Franca (cores, tipografia Poppins)
- 🖼️ **Logo personalizada** e favicon
- 📹 Integração completa com Jitsi Meet
- 🔒 Sala privada com sistema de senha
- 🎨 Ícones minimalistas (Lucide React)
- 📱 Sidebar fixa com navegação de salas
- 📱 Totalmente responsivo

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Servidor Jitsi Meet configurado (meet.francaassessoria.com)

### Passo 1: Instalar Dependências

```bash
npm install
# ou
yarn install
```

### Passo 2: Configurar Variáveis de Ambiente

O arquivo `.env.local` já está configurado com:

```env
NEXT_PUBLIC_JITSI_DOMAIN=meet.francaassessoria.com
NEXT_PUBLIC_APP_NAME=Franca Office
NEXT_PUBLIC_APP_VERSION=2.0.0
```

**IMPORTANTE:** Se você mudou o domínio do Jitsi, atualize `NEXT_PUBLIC_JITSI_DOMAIN`.

### Passo 3: Rodar em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse: http://localhost:3000

### Passo 4: Build para Produção

```bash
npm run build
npm run start
# ou
yarn build
yarn start
```

## 👥 Usuários e Senhas

| Usuário    | Senha              | Cargo         |
|------------|-------------------|---------------|
| Gabriel    | ceo@franca        | CEO           |
| Bruna      | socialmedia@franca| Social Media  |
| Guilherme  | design@franca     | Designer      |
| Leonardo   | trafego@franca    | Tráfego       |
| Davidson   | tech@franca       | Tech Lead     |

## 🎨 Identidade Visual

### Cores Principais

- **Verde Franca:** `#7DE08D`
- **Verde Escuro:** `#598F74`
- **Navy:** `#081534`
- **Branco:** `#FFFFFF`

### Tipografia

- **Fonte:** Poppins (Google Fonts)
- **Pesos:** 300, 400, 500, 600, 700

## 📁 Estrutura do Projeto

```
franca-office/
├── app/
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Redirect para login
│   ├── login/
│   │   └── page.tsx      # Página de login
│   └── office/
│       └── page.tsx      # Página do escritório
├── components/
│   ├── Login.tsx         # Componente de login
│   ├── Office.tsx        # Lobby do escritório
│   ├── RoomCard.tsx      # Card de sala
│   ├── VideoRoom.tsx     # Sala de vídeo (Jitsi)
│   ├── StatusSelector.tsx    # Seletor de status
│   ├── UserPresence.tsx      # Status do usuário
│   └── PrivateRoomModal.tsx  # Modal sala privada
├── lib/
│   ├── constants.ts      # Constantes (usuários, salas, etc)
│   └── store.ts          # Estado global (Zustand)
└── public/
    └── logo.svg          # Logo da Franca
```

## 🔧 Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **Jitsi Meet** - Videoconferência
- **Lucide React** - Ícones

## 🌐 Deploy na Vercel

1. Faça push do código para o GitHub
2. Conecte o repositório na Vercel
3. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_JITSI_DOMAIN=meet.francaassessoria.com`
4. Deploy automático!

## 🔒 Sala Privada

A **Sala de Reunião Privada** possui sistema de senha:

1. Primeiro usuário a entrar define a senha
2. Outros usuários precisam da senha para entrar
3. Senha persiste enquanto o primeiro usuário não sair

## 📝 Notas Importantes

- O servidor Jitsi **deve estar rodando** em `meet.francaassessoria.com`
- Certifique-se de que o SSL está configurado (HTTPS)
- Navegadores bloqueiam câmera/mic sem HTTPS
- Estado do usuário persiste no localStorage

## 🆘 Suporte

Para problemas ou dúvidas:
- Email: contato@francaassessoria.com
- Desenvolvido por: Davidson (Tech Lead)

## 📜 Licença

Projeto privado - Franca Assessoria © 2024

---

**Franca Office v2.0** - Vendendo mais para você. 🚀
