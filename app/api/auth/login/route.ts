import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { USERS_DB } from "@/lib/users";
import { createSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Normaliza username (protege contra maiúsculas / espaços)
    const username =
      typeof body.username === "string"
        ? body.username.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string" ? body.password : "";

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

    // ✅ Validação correta usando o hash do USERS_DB
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Senha incorreta" },
        { status: 401 }
      );
    }

    // ✅ Cria sessão segura (cookie httpOnly)
    createSession(username);

    return NextResponse.json({
      ok: true,
      user: {
        id: username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Erro interno ao autenticar" },
      { status: 500 }
    );
  }
}
