import { LoginCredentials, LoginResponse } from "@/types/credentials";

// Save token with expiry time in localStorage
function saveTokenWithExpiry(token: string, expiresInMs: number) {
  const expiry = new Date().getTime() + expiresInMs;

  const tokenObj = {
    token,
    expiry,
  };

  localStorage.setItem("auth_token", JSON.stringify(tokenObj));
}

// Public function to retrieve token
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

// Login and automatically save token with 2h expiry
export async function loginService(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response = await fetch("http://localhost:3100/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  // Save JWT token for 2 hours
  saveTokenWithExpiry(data.access_token, 2 * 60 * 60 * 1000); // 2 hours

  return data;
}
