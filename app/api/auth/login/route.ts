import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { USERS_DB } from "@/lib/users";
import { createSession } from "@/lib/session";

/**
 * Mapeamento dos hashes vindos do .env
 * Nunca expor isso no client
 */
const PASSWORD_HASHES: Record<string, string | undefined> = {
  gabriel: process.env.USER_GABRIEL_PASSWORD_HASH,
  bruna: process.env.USER_BRUNA_PASSWORD_HASH,
  guilherme: process.env.USER_GUILHERME_PASSWORD_HASH,
  leonardo: process.env.USER_LEONARDO_PASSWORD_HASH,
  davidson: process.env.USER_DAVIDSON_PASSWORD_HASH,
};

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 400 }
      );
    }

    const user = USERS_DB[username as keyof typeof USERS_DB];

    if (!user) {
      return NextResponse.json(
        { error: "Usuário inválido" },
        { status: 401 }
      );
    }

    const passwordHash = PASSWORD_HASHES[username];

    if (!passwordHash) {
      return NextResponse.json(
        { error: "Credencial não configurada no servidor" },
        { status: 500 }
      );
    }

    const isValid = await bcrypt.compare(password, passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Senha incorreta" },
        { status: 401 }
      );
    }

    // Cria sessão (cookie / server-side)
    createSession(username);

    return NextResponse.json({
      ok: true,
      user: {
        id: username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno ao autenticar" },
      { status: 500 }
    );
  }
}
