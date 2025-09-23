import {
  applicationSchema,
  parseApplicationFormData
} from '$lib/validators/application.validator';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
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

    console.log('========');
    console.log(JSON.stringify(form.data, null, 2));
    console.log('========');

    const application = form.data;

    // const response = await fetch(`${PUBLIC_API_URL}/startups/apply`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body:  JSON.stringify(application)
    // });

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
      console.log(data);
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      return fail(400, {
        form,
        message: error.response?.data?.message || 'Failed to submit application'
      });
    }


    console.log('CREATE ACCOUNT SUCCESS');
    return message(form, {
      success: true,
      text: 'Account created successfully'
    });
  }
};
