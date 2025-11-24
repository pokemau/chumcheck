import { PUBLIC_API_URL } from '$env/static/public';
import { z } from 'zod';
import { dev } from '$app/environment';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user && (locals.user.role === 'Manager' || locals.user.role === 'Manager as Mentor')) {
    throw redirect(302, '/admin');
  }
  const form = await superValidate(zod(adminLoginSchema));
  return { form };
};

export const actions = {
  default: async ({ fetch, request, cookies }) => {
    const form = await superValidate(request, zod(adminLoginSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    const { email, password } = form.data;

    try {
      const response = await fetch(`${PUBLIC_API_URL}/auth/signin/`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.status === 201) {
        const data = await response.json();
        // Decode JWT minimally to check role (client-side trust minimal; server still guards routes)
        const tokenParts = data.access_token.split('.');
        try {
          const payload = JSON.parse(atob(tokenParts[1]));
          const role = payload.role;
          if (role !== 'Manager' && role !== 'Manager as Mentor') {
            return setError(form, 'email', 'Not an admin account');
          }
        } catch {}
        cookies.set('Access', data.access_token, {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 60 * 5 * 60,
          secure: !dev
        });
        return message(form, { text: 'Admin login successful' });
      } else {
        return setError(form, 'email', 'Invalid Credentials');
      }
    } catch (error) {
      console.error(error);
      return setError(form, 'email', 'Login failed');
    }
  }
};
