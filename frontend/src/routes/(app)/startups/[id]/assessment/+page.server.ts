import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, params }) => {
  const access = cookies.get('Access');
  if (!access) {
    throw redirect(303, '/login');
  }

  return {
    startupId: params.id,
    access
  };
};
