import { LoginCredentials, LoginResponse } from "@/types/credentials";

function saveTokenWithExpiry(token: string, expiresInMs: number) {
  const expiry = new Date().getTime() + expiresInMs;

  const tokenObj = {
    token,
    expiry,
  };

  localStorage.setItem("auth_token", JSON.stringify(tokenObj));
}

export function getToken(): string | null {
  const tokenStr = localStorage.getItem("auth_token");
  if (!tokenStr) return null;

  const tokenObj = JSON.parse(tokenStr);
  const now = new Date().getTime();

  if (now > tokenObj.expiry) {
    localStorage.removeItem("auth_token");
    return null;
  }

  return tokenObj.token;
}

export async function loginService(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const apiUrl = 'http://localhost:3100/auth/login';

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  saveTokenWithExpiry(data.access_token, 2 * 60 * 60 * 1000);

  return data;
}
