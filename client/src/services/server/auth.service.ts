"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { BACKEND_API_URL } from "@/constants/api"
import { FormState, LoginSchema, RegisterSchema } from "@/lib/definitions"
import { requireAccessTokenOrRedirect } from "@/lib/auth"

export async function registerUser(state: FormState, formData: FormData) {
  const registerFields = RegisterSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("repeatPassword")
  })

  if (!registerFields.success) {
    return {
      success: false,
      error: registerFields.error.flatten().fieldErrors
    }
  }

  await fetch(`${BACKEND_API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(registerFields.data)
  })

  return {
    success: true,
    message: "Success Register"
  }
}

export async function loginUser(state: FormState, formData: FormData) {
  const loginFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  })

  if (!loginFields.success) {
    return {
      success: false,
      error: loginFields.error.flatten().fieldErrors
    }
  }

  const response = await fetch(`${BACKEND_API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginFields.data)
  })

  const data = await response.json()

  if (response.ok && data.access_token) {
    const c = await cookies()
    c.set("Access", data.access_token, {
      httpOnly: true,
      path: "/"
    })
    redirect("/startups")
  } else {
    return {
      success: false,
      message: response.status === 409 ? "User already exists" : response.statusText
    }
  }
}

export async function applyStartup(state: FormState, formData: FormData) {
  const access = await requireAccessTokenOrRedirect()

  const rawFormData = {
    name: formData.get("startupName"),
    dataPrivacy: true,
    eligibility: true
  }

  const response = await fetch(`${BACKEND_API_URL}/startups/create-startup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`
    },
    body: JSON.stringify(rawFormData)
  })

  if (response.ok) {
    revalidatePath("/startups")
    return { success: true, message: "yeah" }
  } else {
    const errorData = await response.json()
    console.error("Error:", errorData)
    return { success: false, error: errorData }
  }
}

