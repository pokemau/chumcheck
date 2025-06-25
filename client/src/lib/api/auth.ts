export async function registerUser() {
  const email = "test@gmail.com";
  const password = "1";
  const firstName = "Next";
  const lastName = "JS";

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/auth/signup/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
    }),
  });

  if (response.ok) {
    return {
      message: "Successfully created the user",
    };
  } else {
    return {
      message: "Something went wrong",
    };
  }
}

export async function loginUser() {}
