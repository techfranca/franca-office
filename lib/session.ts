import { cookies } from "next/headers";

const SESSION_KEY = "franca-office-session";

export function createSession(username: string) {
  cookies().set(SESSION_KEY, username, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function destroySession() {
  cookies().set(SESSION_KEY, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
}

export function getSession() {
  return cookies().get(SESSION_KEY)?.value ?? null;
}
