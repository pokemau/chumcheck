import { z } from "zod";

export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
        repeatPassword?: string[];
      };
      message?: string;
      success: boolean;
    }
  | undefined;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const RegisterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string(),
  repeatPassword: z.string(),
}).refine(
  (data) => data.password === data.repeatPassword,
  {
    message: "Passwords do not match",
    path: ["repeatPassword", "password"],
  },
)

