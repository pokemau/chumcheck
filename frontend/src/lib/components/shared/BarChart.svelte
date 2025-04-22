<script lang="ts">
  import Chart from 'chart.js/auto';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  export let id: number, x: any;

  const allReadinessTypes: any = ['T', 'M', 'R', 'A', 'O', 'I']; // All expected readiness types

  // // Initialize the count object with 0 for each readiness type
  const countByReadinessType = allReadinessTypes.reduce((acc, type) => {
    acc[type] = 0; // Default to 0
    return acc;
  }, {});

  // // Count occurrences from the data
  x.forEach((item) => {
    const { readiness_type, count } = item;
    if (countByReadinessType.hasOwnProperty(readiness_type)) {
      countByReadinessType[readiness_type] += count; // Increment the count for the found type
    }
  });
  // const data = {
  // 	labels: ['Technology', 'Market', 'Regulatory', 'Acceptance', 'Organizational', 'Investment'],
  // 	datasets: [
  // 		{
  // 			data: [
  // countByReadinessType['T'],
  // countByReadinessType['M'],
  // countByReadinessType['R'],
  // countByReadinessType['A'],
  // countByReadinessType['O'],
  // countByReadinessType['I']
  // 			],
  // 			backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD'],
  // 			hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#DA92DB']
  // 		}
  // 	]
  // };

  const labels = [
    'Technology',
    'Acceptance',
    'Market',
    'Organizational',
    'Regulatory',
    'Investment'
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Readiness Type',
        data: [
          countByReadinessType['T'],
          countByReadinessType['M'],
          countByReadinessType['R'],
          countByReadinessType['A'],
          countByReadinessType['O'],
          countByReadinessType['I']
        ],
        backgroundColor: [
          'rgba(12, 138, 254, 0.1)', // Lightest version of #0C8AFE
          'rgba(30, 140, 255, 0.2)', // Slightly lighter blue
          'rgba(52, 155, 255, 0.3)', // Soft, pastel blue
          'rgba(75, 170, 255, 0.2)', // Soft cyan/blue with a little more green
          'rgba(102, 180, 255, 0.2)', // Light cyan
          'rgba(120, 185, 255, 0.3)' // Very pale sky blue
        ],
        borderColor: [
          'rgb(8, 120, 215)', // Darker blue, more contrast with background
          'rgb(10, 130, 220)', // A bit lighter than the first border color
          'rgb(12, 140, 230)', // Medium vibrant blue
          'rgb(16, 150, 240)', // Light cyan blue, still strong
          'rgb(30, 160, 245)', // Vibrant, punchy cyan/blue
          'rgb(50, 170, 250)' // Brighter blue with a cl
        ],
        borderWidth: 1
      }
    ]
  };
  const redrawChart = () => {
    let ctx: HTMLCanvasElement;
    const d = {
      labels,
      datasets: [
        {
          label: 'Readiness Type',
          data,
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }
      ]
    };

    if (browser) {
      ctx = document.getElementById(`chart${id}`) as HTMLCanvasElement;
      const chart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };
  onMount(() => {
    redrawChart();
  });
</script>

<canvas id={`chart${id}`} width="600"></canvas>
