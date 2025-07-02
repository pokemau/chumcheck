'use client'
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface RadarChartProps {
  min: number;
  max: number;
  labels: string[];
  data: number[];
  id: number;
}

export default function RadarChart({ min, max, labels, data, id }: RadarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const redrawChart = () => {
    if (!chartRef.current) return;

    // Destroy existing chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current;
    const chartData = {
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

    chartInstanceRef.current = new Chart(ctx, {
      type: 'radar',
      data: chartData,
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
  };

  useEffect(() => {
    redrawChart();

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [min, max, labels, data, id]); // Re-run when props change

  return (
    <canvas 
      ref={chartRef}
      id={`chart${id}`}
      height="600" 
      width="600"
    />
  );
}
