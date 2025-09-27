import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const role = locals.user?.role;
  if (!role || (role !== 'Manager' && role !== 'Manager as Mentor')) {
    throw redirect(302, '/startups');
  }
  return {};
};
