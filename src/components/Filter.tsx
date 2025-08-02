import React from 'react';

interface FilterProps {
  filters: string[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, selectedFilter, onFilterChange }) => {
  return (
    <div className="filter" aria-label="Filter startups">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`p-2 ${selectedFilter === filter ? 'bg-blue-500 text-white' : 'bg-white text-black'} rounded`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default Filter;
