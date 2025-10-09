import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({
  url,
  locals,
  params,
  cookies
}) => {
  if (!locals.user) {
    redirect(302, '/');
  }

  if (cookies.get('isMentorRole') === 'yes' && locals.user.role === 'Manager') {
    locals.user.role = 'Manager as Mentor';
  }
  return {
    startup: params.id,
    user: locals.user,
    role: locals.user.role,
    currentModule: url.pathname.slice(1),
    isAdminRoute: url.pathname.startsWith('/admin')
  };
};
