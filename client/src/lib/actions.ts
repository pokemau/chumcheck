"use server";

import { BACKEND_API_URL } from "./constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormState, LoginSchema, RegisterSchema } from "./definitions";


export async function registerUser(state: FormState, formData: FormData) {
  const registerFields = RegisterSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("repeatPassword"),
  });

  if (!registerFields.success) {
    return {
      success: false,
      error: registerFields.error.flatten().fieldErrors,
    };
  }

  await fetch(`${BACKEND_API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerFields.data),
  });

  return {
    success: true,
    message: "Success Register",
  };
}

export async function loginUser(state: FormState, formData: FormData) {
  const loginFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!loginFields.success) {
    return {
      success: false,
      error: loginFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginFields.data),
  });

  const data = await response.json();

  if (response.ok && data.access_token) {
    const c = await cookies();
    c.set("Access", data.access_token, {
      httpOnly: true,
      path: "/",
    });
    redirect("/startups");
  } else {
    return {
      success: false,
      message:
        response.status === 409 ? "User already exists" : response.statusText,
    };
  }
}
