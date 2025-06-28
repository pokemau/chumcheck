import { LoginData } from "@/types/auth";

export const API_URL = process.env.NEXT_PUBLIC_NESTJS_API_URL;

type LoginResponse = {
  message: string;
  accessToken: string;
};

export async function loginUser(
  credentials: LoginData
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const data: LoginResponse = await response.json();

    document.cookie = `Access=${data.accessToken}; path=/; secure; samesite=strict`;

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export function getTokenFromCookies(): string | null {
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("Access=")
  );
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}

export function logoutUser(): void {
  document.cookie =
    "Access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
