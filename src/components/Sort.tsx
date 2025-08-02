import React from 'react';

interface SortProps {
  options: string[];
  selectedOption: string;
  onSortChange: (option: string) => void;
}

const Sort: React.FC<SortProps> = ({ options, selectedOption, onSortChange }) => {
  return (
    <div className="sort" aria-label="Sort startups">
      <select value={selectedOption} onChange={(e) => onSortChange(e.target.value)} className="p-2 border rounded">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sort;
