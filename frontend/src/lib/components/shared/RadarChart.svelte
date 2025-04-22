<script lang="ts">
  import Chart from 'chart.js/auto';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  export let min: number, max: number, labels: any, data: any, id: number;
  // export let trl: number = 9, orl: number = 7, mrl: number = 6, rrl: number = 8, arl: number = 5, irl: number = 7, id: number;
  // ['Technology', 'Organizational', 'Market', 'Regulatory', 'Acceptance', 'Investment']
  const redrawChart = () => {
    let ctx: HTMLCanvasElement;
    const d = {
      labels,
      datasets: [
        {
          label: 'Readiness Levels',
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
        type: 'radar',
        data: d,
        options: {
          scales: {
            r: {
              min,
              max,
              ticks: {
                stepSize: 1
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
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

<div class="flex flex-col">
  <canvas id={`chart${id}`}></canvas>
</div>
