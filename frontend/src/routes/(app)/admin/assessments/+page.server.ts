import type { PageServerLoad, Actions } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, fetch, url }) => {
  const token = cookies.get('Access');
  if (!token) throw redirect(302, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);

  const res = await fetch(`${PUBLIC_API_URL}/assessment/types`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) return { types: [] };
  const types = await res.json();
  return { types, access: token };
};

export const actions: Actions = {
  createType: async ({ request, cookies, fetch }) => {
    const token = cookies.get('Access');
    const data = await request.formData();
    const name = String(data.get('name') || '').trim();
    if (!name) return fail(400, { message: 'Name required' });
    const res = await fetch(`${PUBLIC_API_URL}/assessment/types`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name })
    });
    if (!res.ok) return fail(res.status, { message: 'Create failed' });
    return { ok: true };
  }
};
