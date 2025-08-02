import React from 'react';

type RadioProps = {
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Radio: React.FC<RadioProps> = ({ name, label, value, checked, onChange }) => (
  <div className="flex items-center mb-4">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
      aria-label={label}
    />
    <label htmlFor={value} className="ml-2 block text-sm text-gray-900">
      {label}
    </label>
  </div>
);

export default Radio;