import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  // Require login
  if (!locals.user) {
    throw redirect(302, `/admin-login?redirectTo=${encodeURIComponent(url.pathname)}`);
  }
  const role = locals.user.role;
  if (role !== 'Manager' && role !== 'Manager as Mentor') {
    throw redirect(302, '/startups');
  }
  return { user: locals.user, role };
};
