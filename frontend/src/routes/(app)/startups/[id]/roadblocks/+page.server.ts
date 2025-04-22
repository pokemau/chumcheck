import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
  return {
    startupId: params.id,
    access: cookies.get('Access')
  };
};
