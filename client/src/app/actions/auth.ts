import { BACKEND_API_URL } from "@/lib/constants";
import { FormState, SignupFormSchema } from "@/lib/definitions";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("repeatPassword"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, password, repeatPassword } =
    validatedFields.data;

  try {
    const response = await fetch(`${BACKEND_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        repeatPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        message: errorData.message || "Registration failed",
      };
    }

    const data = await response.json();

    // (await cookies()).set("Access", data.accessToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    //   path: "/",
    //   maxAge: 60 * 5 * 30,
    // });
  } catch {
    return {
      message: "An error occured during registration",
    };
  }
  redirect("/startups");
}
