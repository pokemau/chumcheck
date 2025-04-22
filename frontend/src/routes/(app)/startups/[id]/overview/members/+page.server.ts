import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies, params }) => {
  return {
    startupId: params.id,
    access: cookies.get('Access')
  };
};
