import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';
import { useEffect, useState } from 'react';

interface PieChartProps {
  data: { label: string; value: number }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartData<'pie'>>();
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  useEffect(() => {
    const labels = data.map(d => d.label);
    const values = data.map(d => d.value);

    setChartData({
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
    });
  }, [data]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div aria-label="Pie chart displaying data distribution">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
