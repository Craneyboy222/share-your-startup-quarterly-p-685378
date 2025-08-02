import React from 'react';

interface MetricProps {
  label: string;
  value: number;
}

const Metric: React.FC<MetricProps> = ({ label, value }) => {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <dl>
        <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
      </dl>
    </div>
  );
};

export default Metric;
