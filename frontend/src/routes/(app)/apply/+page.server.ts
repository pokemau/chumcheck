import {
  applicationSchema,
  parseApplicationFormData
} from '$lib/validators/application.validator';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { PUBLIC_API_URL } from '$env/static/public';
import axiosInstance from '$lib/axios';

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(applicationSchema));
  return {
    form
  };
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(applicationSchema));

    if (!form.valid) {
      console.log(form.errors);
      return fail(400, { form });
    }

    const application = form.data;

    try {
      const { data } = await axiosInstance.post(
        '/startups/apply',
        application,
        {
          headers: {
            Authorization: `Bearer ${cookies.get('Access')}`
          }
        }
      );
      return message(form, {
        text: 'Your application has been submitted'
      });
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      return fail(400, {
        form,
        message: error.response?.data?.message || 'Failed to submit application'
      });
    }
  }
};
