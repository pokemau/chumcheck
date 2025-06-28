import { z } from "zod";

export const SignupFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string(),
  repeatPassword: z.string(),
});

export type FormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
        repeatPassword?: string[];
      };
      message?: string;
    }
  | undefined;
