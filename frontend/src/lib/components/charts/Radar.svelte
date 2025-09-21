<script lang="ts">
  import { theme } from 'mode-watcher';

  export let trl = 0,
    mrl = 0,
    rrl = 0,
    arl = 0,
    orl = 0,
    irl = 0;

  const data = {
    labels: [
      'Technology',
      'Market',
      'Regulatory',
      'Acceptance',
      'Organizational',
      'Investment'
    ],
    datasets: [
      {
        label: 'Readiness Levels',
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
        data: [trl, mrl, rrl, arl, orl, irl]
      }
    ]
  };

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    PointElement,
    RadialLinearScale,
    LineElement
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    PointElement,
    RadialLinearScale,
    LineElement
  );

  export let classNames: string;
</script>

<div class={classNames}>
  <Radar
    {data}
    options={{
      scales: {
        r: {
          min: 1,
          max: 9,
          ticks: {
            stepSize: 1
          },
          grid: {
            color:
              $theme === 'light'
                ? 'rgba(54, 162, 235, 1)'
                : 'rgba(54, 162, 235, 0.2)'
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
    }}
  />
</div>
