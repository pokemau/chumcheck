import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies, params }) => {
  return {
    access: cookies.get('Access'),
    startupId: params.id
  };
};

// import { fetchWithAuth } from '$lib/utils';
// import type { LayoutServerLoad } from './$types';

// export const load: LayoutServerLoad = async ({ cookies, fetch, params, url }) => {
// 	try {
// 		const startup = await fetchWithAuth(`/startups/${params.id}/`, cookies, fetch);

// 		const startupData = await startup.json();

// 		if (startup.ok) {
// 			return {
// 				info: startupData,
// 				id: params.id,
// 				pathname: url.pathname.slice(1).split('/')[2],
// 				access: cookies.get('Access')
// 			};
// 		} else {
// 			console.error('Error fetching data', {
// 				startupStatus: startup.status
// 			});
// 		}
// 	} catch (error) {
// 		console.error('Error during load:', error);
// 		return {
// 			applicants: [],
// 			mentors: [],
// 			rubricsApplicants: [],
// 			access: cookies.get('Access')
// 		};
// 	}
// };
