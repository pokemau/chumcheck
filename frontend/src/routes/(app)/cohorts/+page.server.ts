import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals }) => {
  if (locals.user.role !== 'Manager') {
    redirect(302, '/startups');
  }

  return {
    access: cookies.get('Access')
  };
};
