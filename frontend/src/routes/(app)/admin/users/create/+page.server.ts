import type { Actions, PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, url }) => {
  const token = cookies.get('Access');
  if (!token) throw redirect(302, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);
  return {};
};

export const actions: Actions = {
  create: async ({ cookies, request, url, fetch }) => {
    const token = cookies.get('Access');
    if (!token) return fail(401, { message: 'Unauthorized' });

    const data = await request.formData();
    const payload = Object.fromEntries(data) as any;

    const res = await fetch(`${PUBLIC_API_URL}/admin/users/create-json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(res.status, { message: error || 'Failed to create user' });
    }

    throw redirect(302, '/admin/users');
  }
};
