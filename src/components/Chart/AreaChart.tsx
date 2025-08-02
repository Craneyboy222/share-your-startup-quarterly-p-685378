import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';
import { useEffect, useState } from 'react';

interface AreaChartProps {
  data: { timestamp: string; value: number }[];
}

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartData<'line'>>();
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const labels = data.map(d => d.timestamp);
    const values = data.map(d => d.value);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Value Over Time',
          data: values,
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    });
  }, [data]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div aria-label="Area chart showing value over time">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default AreaChart;
