import type { Actions, PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, url, fetch }) => {
  const token = cookies.get('Access');
  if (!token) throw redirect(302, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);

  // Preload users for owner selection
  const res = await fetch(`${PUBLIC_API_URL}/admin/users-json`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const users = res.ok ? await res.json() : [];
  return { users };
};

export const actions: Actions = {
  create: async ({ cookies, request, fetch }) => {
    const token = cookies.get('Access');
    if (!token) return fail(401, { message: 'Unauthorized' });

    const data = await request.formData();
    const payload: any = Object.fromEntries(data);
    if (payload.userId) payload.userId = Number(payload.userId);
    // Default to PENDING if not provided
    if (!payload.qualificationStatus) payload.qualificationStatus = 'PENDING';

    const res = await fetch(`${PUBLIC_API_URL}/admin/startups/create-json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(res.status, { message: error || 'Failed to create startup' });
    }

    throw redirect(302, '/admin/startups');
  }
};
