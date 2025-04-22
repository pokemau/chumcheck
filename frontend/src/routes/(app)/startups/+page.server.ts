import { redirect, type Actions } from '@sveltejs/kit';
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

    newFormData.append(
      'capsuleProposal',
      formData.get('capsuleProposal') as File
    );

    newFormData.append('links', formData.get('links') as string);
    newFormData.append('groupName', formData.get('group_name') as string);
    newFormData.append(
      'universityName',
      formData.get('universityName') as string
    );

    for (let i = 2; i < 5; i++) {
      if (formData.get(`member_${i}`) !== null) {
        newFormData.append(
          'set_members',
          formData.get(`member_${i}`) as string
        );
      }
    }

    //FormData {
    //  data_privacy: 'true',
    //  eligibility: 'true',
    //  name: 'f',
    //  user_id: '1',
    //  capsule_proposal: File {
    //    size: 88304,
    //    type: 'application/pdf',
    //    name: 'a.pdf',
    //    lastModified: 1745152938968
    //  },
    //  links: 'https://maurice.vercel.app/',
    //  group_name: 'a',
    //  university_name: 'a'
    //}

    console.log(newFormData);

    const response = await fetch(`${PUBLIC_API_URL}/startup/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cookies.get('Access')}`
      },
      body: newFormData
    });

    console.log('RES');
    console.log('RES');
    console.log('RES');
    console.log(response);

    const data = await response.json();

    console.log('DATA');
    console.log('DATA');
    console.log('DATA');
    console.log(data);

    //{
    //  id: 3,
    //  name: 'TestUp',
    //  qualificationStatus: 1,
    //  dataPrivacy: true,
    //  capsuleProposal: null,
    //  links: 'https://maurice.vercel.app/',
    //  groupName: 'Group 1',
    //  universityName: 'null',
    //  eligibility: true,
    //  userId: 1
    //}

    if (!response.ok) {
      // TODO: return error
      return;
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
      startup_id: number;
      urat_question_id: number;
      response: string;
      score: number;
    }[] = [];

    const calculatorAnswers: {
      startup_id: number;
      calculator_question_id: number;
    }[] = [];

    types.forEach((type) => {
      for (let i = 0; i < 3; i++) {
        answers.push({
          startup_id: startupId,
          urat_question_id: Number.parseInt(
            formData.get(`${type}${i}id`) as string
          ),
          response: formData.get(`${type}${i}`) as string,
          score: 1
        });
      }
    });

    categories.forEach((category) => {
      console.log('CATEGORY', parseInt(formData.get(`${category}`) as string));
      //calculatorAnswers.push({
      //  startup_id: startupId,
      //  calculator_question_id: parseInt(formData.get(`${category}`) as string)
      //});
    });

    console.log(formData);
    console.log(answers);
    console.log(calculatorAnswers);

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    const urat_answers = await fetch(
      `${PUBLIC_API_URL}/urat-question-answers/bulk-create/`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${cookies.get('Access')}`
        },
        body: JSON.stringify({
          urat_question_answers: answers
        })
      }
    );

    const calculator_answers = await fetch(
      `${PUBLIC_API_URL}/calculator-question-answers/bulk-create/`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${cookies.get('Access')}`
        },
        body: JSON.stringify({
          calculator_question_answers: calculatorAnswers
        })
      }
    );
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
