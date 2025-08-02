import React from 'react';
import Metric from './Metric';

interface StatsProps {
  metrics: { label: string; value: number }[];
}

const Stats: React.FC<StatsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <Metric key={index} label={metric.label} value={metric.value} />
      ))}
    </div>
  );
};

export default Stats;
