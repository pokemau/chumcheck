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
    const startupIdRaw = formData.get('startupId');
    const startupId = startupIdRaw ? Number(startupIdRaw) : null;
    let response, data;


    // Update existing startup
    if (startupId) {
      console.log('Processing existing startup update for ID:', startupId);
      
      // Check if a new capsule proposal file was uploaded
      const capsuleProposalFile = formData.get('capsuleProposal');
      if (capsuleProposalFile && capsuleProposalFile instanceof File && capsuleProposalFile.size > 0) {
        console.log('Capsule proposal file found, using file upload endpoint');
        // Use the new endpoint that handles file uploads
        const newFormData = new FormData();
        newFormData.append('name', formData.get('startup_name') as string);
        newFormData.append('userId', locals.user.id.toString());
        newFormData.append('links', formData.get('links') as string);
        newFormData.append('groupName', formData.get('group_name') as string);
        newFormData.append('universityName', formData.get('university_name') as string);
        newFormData.append('qualificationStatus', '1'); // Set to PENDING when updating
        newFormData.append('dataPrivacy', formData.get('data_privacy') as string);
        newFormData.append('eligibility', formData.get('eligibility') as string);
        newFormData.append('capsuleProposal', capsuleProposalFile);
        
        response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}/with-capsule-proposal`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${cookies.get('Access')}`
          },
          body: newFormData
        });
      } else {
        console.log('No capsule proposal file, using regular update endpoint');
        // Use the regular update endpoint (no file upload)
        const updatePayload = {
          dataPrivacy: formData.get('data_privacy'),
          eligibility: formData.get('eligibility'),
          name: formData.get('startup_name'),
          userId: locals.user.id,
          links: formData.get('links'),
          groupName: formData.get('group_name'),
          universityName: formData.get('university_name'),
          qualificationStatus: 1, // Set to PENDING when updating
        };
        response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${cookies.get('Access')}`
          },
          body: JSON.stringify(updatePayload)
        });
      }
      data = await response.json();
    } else {
      // Create new startup (file required)
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
          newFormData.append('set_members', formData.get(`member_${i}`) as string);
        }
      }
      response = await fetch(`${PUBLIC_API_URL}/startups/create-startup`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies.get('Access')}`
        },
        body: newFormData
      });
      data = await response.json();
    }

    if (!response.ok) {
      let errorMessage = data?.message || 'Failed to create or update startup.';
      return fail(400, { error: errorMessage });
    }

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

    if (startupId) {
      // Update existing URAT question answers
      const answers: {
        id: number;
        response: string;
      }[] = [];

      types.forEach((type) => {
        for (let i = 0; i < 3; i++) {
          const answerId = formData.get(`${type}${i}answerId`);
          if (answerId) {
            answers.push({
              id: Number.parseInt(answerId as string),
              response: formData.get(`${type}${i}`) as string
            });
          }
        }
      });

      // Update existing calculator question answers
      const calculatorAnswers: {
        id: number;
        calculatorQuestionId: number;
      }[] = [];

      categories.forEach((category) => {
        const answerId = formData.get(`${category}AnswerId`);
        const questionId = formData.get(`${category}`);
        if (answerId && questionId) {
          calculatorAnswers.push({
            id: parseInt(answerId as string),
            calculatorQuestionId: parseInt(questionId as string)
          });
        }
      });

      // Update URAT question answers
      for (const answer of answers) {
        const response = await fetch(
          `${PUBLIC_API_URL}/readinesslevel/urat-question-answers/${answer.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${cookies.get('Access')}`
            },
            body: JSON.stringify({ response: answer.response })
          }
        );
      }

      // Update calculator question answers
      for (const answer of calculatorAnswers) {
        const response = await fetch(
          `${PUBLIC_API_URL}/readinesslevel/calculator-question-answers/${answer.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${cookies.get('Access')}`
            },
            body: JSON.stringify({ calculatorQuestionId: answer.calculatorQuestionId })
          }
        );
      }
      
      console.log('Finished URAT and calculator answer updates');
    } else {
      // Create new URAT question answers
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
            startupId: data.id,
            uratQuestionId: Number.parseInt(
              formData.get(`${type}${i}id`) as string
            ),
            response: formData.get(`${type}${i}`) as string
            //score: 1
          });
        }
      });

      categories.forEach((category) => {
        calculatorAnswers.push({
          startupId: data.id,
          calculatorQuestionId: parseInt(formData.get(`${category}`) as string)
        });
      });

      ////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////

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
    }
  }
};
