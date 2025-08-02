import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface ChartProps {
  data: any;
  options?: ChartOptions;
  className?: string;
}

const Chart: React.FC<ChartProps> = ({ data, options, className = '' }) => {
  return (
    <div className={`chart-container ${className}`} aria-label="chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
