import React from 'react';

type CheckboxProps = {
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ name, label, checked, onChange }) => (
  <div className="flex items-center mb-4">
    <input
      type="checkbox"
      name={name}
      id={name}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      aria-label={label}
    />
    <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
      {label}
    </label>
  </div>
);

export default Checkbox;