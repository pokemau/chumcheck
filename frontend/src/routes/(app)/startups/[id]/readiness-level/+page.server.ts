import { PUBLIC_API_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies, params }) => {
  return {
    startupId: params.id,
    access: cookies.get('Access'),
    role: locals.user.role
  };
};

export const actions = {
  default: async ({ request, fetch, params, cookies }) => {
    const formData = await request.formData();
    const types = [
      'technology',
      'market',
      'acceptance',
      'organizational',
      'regulatory',
      'investment'
    ];

    const answers: { startup_id: number; criterion_id: number; score: number; remark: string }[] =
      [];

    const readinesslevels: { startup_id: number; readiness_level_id: number }[] = [];

    types.forEach((type) => {
      readinesslevels.push({
        startup_id: Number.parseInt(params.id as string),
        readiness_level_id: parseInt(formData.get(`${type}ReadinessLevel`) as string)
      });
      for (let level = 1; level <= 9; level++) {
        for (let criteria = 1; criteria <= 6; criteria++) {
          answers.push({
            startup_id: Number.parseInt(params.id as string),
            criterion_id: Number.parseInt(
              formData.get(`${type}Criteria${level}${criteria}`) as string
            ),
            score: Number.parseInt(formData.get(`${type}${level}${criteria}`) as string),
            remark: ''
          });
        }
      }
    });

    try {
      const rubrics_scores = await fetch(
        `${PUBLIC_API_URL}/readiness-level-criterion-answers/bulk-create/`,
        {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${cookies.get('Access')}`
          },
          body: JSON.stringify({
            criterion_answers: answers
          })
        }
      );

      if (rubrics_scores.ok) {
        const levels = await fetch(`${PUBLIC_API_URL}/startup-readiness-levels/bulk-create/`, {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${cookies.get('Access')}`
          },
          body: JSON.stringify({
            startup_readiness_levels: readinesslevels
          })
        });

        if (levels.ok) {
          throw redirect(302, `/mentor/startups/qualified/${params.id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};
