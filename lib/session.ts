import { cookies } from "next/headers";

const SESSION_COOKIE = "franca_session";

export function createSession(userId: string) {
  cookies().set(SESSION_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export function getSession() {
  return cookies().get(SESSION_COOKIE)?.value;
}

export function destroySession() {
  cookies().delete(SESSION_COOKIE);
}
