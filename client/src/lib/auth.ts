import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAccessTokenOrRedirect() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("Access")?.value;
  if (!accessToken) {
    redirect("/login");
  }
  return accessToken;
}

