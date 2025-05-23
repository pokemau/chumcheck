import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = ({ cookies, locals }) => {
  if (locals.user.role === 'Manager') {
    redirect(302, '/applications');
  }
  return {
    access: cookies.get('Access'),
    role: locals.user.role
  };
};

export const actions: Actions = {
  default: async ({ request, fetch, locals, cookies }) => {
    const formData = await request.formData();
    const newFormData = new FormData();

    newFormData.append('dataPrivacy', formData.get('data_privacy') as string);
    newFormData.append('eligibility', formData.get('eligibility') as string);
    newFormData.append('name', formData.get('startup_name') as string);
    newFormData.append('userId', locals.user.id.toString());

    const capsuleProposalFile = formData.get('capsuleProposal');
    if (capsuleProposalFile && capsuleProposalFile instanceof File && capsuleProposalFile.size > 0) {
      newFormData.append('capsuleProposal', capsuleProposalFile);
    }

    newFormData.append('links', formData.get('links') as string);
    newFormData.append('groupName', formData.get('group_name') as string);
    newFormData.append('universityName', formData.get('university_name') as string);

    for (let i = 2; i < 5; i++) {
      if (formData.get(`member_${i}`) !== null) {
        newFormData.append(
          'set_members',
          formData.get(`member_${i}`) as string
        );
      }
    }

    const response = await fetch(`${PUBLIC_API_URL}/startups/create-startup`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cookies.get('Access')}`
      },
      body: newFormData
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = data?.message || 'Failed to create startup.';
      return fail(400, { error: errorMessage });
    }

    const startupId = data.id;

    const types = [
      'technology',
      'market',
      'acceptance',
      'organizational',
      'regulatory',
      'investment'
    ];

    const categories = [
      'Technology',
      'Product Development',
      'Product Definition/Design',
      'Competitive Landscape',
      'Team',
      'Go-To-Market',
      'Manufacturing/Supply Chain'
    ];

    const answers: {
      startupId: number;
      uratQuestionId: number;
      response: string;
      //score: number;
    }[] = [];

    const calculatorAnswers: {
      startupId: number;
      calculatorQuestionId: number;
    }[] = [];

    types.forEach((type) => {
      for (let i = 0; i < 3; i++) {
        answers.push({
          startupId: startupId,
          uratQuestionId: Number.parseInt(
            formData.get(`${type}${i}id`) as string
          ),
          response: formData.get(`${type}${i}`) as string
          //score: 1
        });
      }
    });

    //console.log(formData);

    categories.forEach((category) => {
      //console.log('CATEGORY', parseInt(formData.get(`${category}`) as string));
      calculatorAnswers.push({
        startupId: startupId,
        calculatorQuestionId: parseInt(formData.get(`${category}`) as string)
      });
    });

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    console.log('ANSWERS');
    console.log('ANSWERS');
    console.log('ANSWERS');
    console.log(answers);

    const urat_answers = await fetch(
      `${PUBLIC_API_URL}/readinesslevel/urat-question-answers/create`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${cookies.get('Access')}`
        },
        body: JSON.stringify({ answers })
      }
    );

    const urat_res = await urat_answers.json();
    console.log(urat_res);

    //console.log('CALC ANSWERS');
    //console.log('CALC ANSWERS');
    //console.log('CALC ANSWERS');
    //console.log(JSON.stringify({ calculatorAnswers }));

    const calculator_answers = await fetch(
      `${PUBLIC_API_URL}/readinesslevel/calculator-question-answers/create`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${cookies.get('Access')}`
        },
        body: JSON.stringify({
          calculatorAnswers
        })
      }
    );

    const res = await calculator_answers.json();

    console.log(res);

    //
    //    if (urat_answers.ok && calculator_answers.ok) {
    //      const capsule_info = await fetch(
    //        `${PUBLIC_API_URL}/capsule-proposal-infos/`,
    //        {
    //          method: 'POST', // slamm pisot
    //          headers: {
    //            'Content-type': 'application/json',
    //            Authorization: `Bearer ${cookies.get('Access')}`
    //          },
    //          body: JSON.stringify({
    //            title: formData.get('title'),
    //            startup_description: formData.get('startupDescription'),
    //            problem_statement: formData.get('problemStatement'),
    //            target_market: formData.get('targetMarket'),
    //            solution_description: formData.get('solutionDescription'),
    //            objectives: formData.get('objectives'),
    //            scope: formData.get('scope'),
    //            methodology: formData.get('methodology'),
    //            startup_id: startupId
    //          })
    //        }
    //      );
    //
    //      if (capsule_info.ok) {
    //        redirect(302, '/startups?success=true');
    //      }
    //    }
    //  }
  }
};
