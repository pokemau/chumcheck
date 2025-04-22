<!-- <script lang="ts">

	export let x: any;

	const allReadinessTypes: any = ['T', 'M', 'R', 'A', 'O', 'I']; // All expected readiness types

	// Initialize the count object with 0 for each readiness type
	const countByReadinessType = allReadinessTypes.reduce((acc, type) => {
		acc[type] = 0; // Default to 0
		return acc;
	}, {});

	// Count occurrences from the data
	x.forEach((item) => {
		const { readiness_type, count } = item;
		if (countByReadinessType.hasOwnProperty(readiness_type)) {
			countByReadinessType[readiness_type] += count; // Increment the count for the found type
		}
	});
	const data = {
		labels: ['Technology', 'Market', 'Regulatory', 'Acceptance', 'Organizational', 'Investment'],
		datasets: [
			{
				data: [
					countByReadinessType['T'],
					countByReadinessType['M'],
					countByReadinessType['R'],
					countByReadinessType['A'],
					countByReadinessType['O'],
					countByReadinessType['I']
				],
				backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD'],
				hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#DA92DB']
			}
		]
	};

	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<Pie {data} options={{ responsive: true }} /> -->
