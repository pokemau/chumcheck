import { PUBLIC_API_URL } from '$env/static/public';
import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(1),
  repeatPassword: z.string().min(1)
});

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(registerSchema));

  return {
    form
  };
};

export const actions = {
  default: async ({ fetch, request }) => {
    const form = await superValidate(request, zod(registerSchema));

    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    const { firstName, lastName, email, password, repeatPassword } = form.data;

    if (password !== repeatPassword) {
      return setError(form, 'repeatPassword', 'Password do not match');
    }

    const response = await fetch(`${PUBLIC_API_URL}/auth/signup/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName
      })
    });

    const data = await response.json();

    if (response.ok) {
      return message(form, {
        success: true,
        text: 'Account created successfully',
        access_token: data
      });
    }
  }
};
