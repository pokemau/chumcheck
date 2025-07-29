"use server"

import { BACKEND_API_URL } from "@/constants/api"
import { requireAccessTokenOrRedirect } from "@/lib/auth"
import { User } from "@/lib/types"

export async function getMentors(): Promise<User[]> {
  const access = await requireAccessTokenOrRedirect()

  const response = await fetch(`${BACKEND_API_URL}/users?userRole=Mentor`, {
    headers: {
      Authorization: `Bearer ${access}`
    }
  })

  if (!response.ok) {
    throw new Error("Failed to fetch startup data")
  }

  console.log(response)

  return response.json()
}
