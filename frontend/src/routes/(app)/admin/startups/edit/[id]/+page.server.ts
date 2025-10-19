import type { Actions, PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, url, params, fetch }) => {
  const token = cookies.get('Access');
  if (!token) throw redirect(302, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);
  const id = params.id;

  const res = await fetch(`${PUBLIC_API_URL}/admin/startups/${id}-json`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    if (res.status === 404) throw redirect(302, '/admin/startups');
    throw redirect(302, '/login');
  }

  const startup = await res.json();
  return { startup };
};

export const actions: Actions = {
  save: async ({ cookies, request, params, fetch }) => {
    const token = cookies.get('Access');
    if (!token) return fail(401, { message: 'Unauthorized' });

    const id = params.id;
    const data = await request.formData();
    const payload: any = Object.fromEntries(data);
    if (payload.userId) payload.userId = Number(payload.userId);

    const res = await fetch(`${PUBLIC_API_URL}/admin/startups/edit-json/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(res.status, { message: error || 'Failed to update startup' });
    }

    return { success: true };
  }
};
