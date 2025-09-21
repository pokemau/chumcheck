import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { dev } from '$app/environment';

export const load: PageServerLoad = async ({ cookies }) => {
  return {
    isMentorRole: cookies.get('isMentorRole')
  };
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const isMentorRole = form.get('mentorRole') === 'true' ? 'yes' : 'no';

    cookies.set('isMentorRole', isMentorRole, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      secure: !dev
    });

    if (isMentorRole === 'yes') {
      redirect(302, '/startups');
    } else {
      redirect(302, '/applications');
    }
  }
};
