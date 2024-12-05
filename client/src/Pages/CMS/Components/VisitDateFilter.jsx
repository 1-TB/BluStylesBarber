import React from 'react';

const VisitDateFilter = ({ onFilterChange }) => {
  const visitTypeRef = React.useRef(null);
  const fromDateRef = React.useRef(null);
  const toDateRef = React.useRef(null);

  //handle clear button
  const handleClear = () => {
    if (visitTypeRef.current) visitTypeRef.current.value = '';
    if (fromDateRef.current) fromDateRef.current.value = '';
    if (toDateRef.current) toDateRef.current.value = '';

    onFilterChange('visitType', '');
    onFilterChange('dateFrom', '');
    onFilterChange('dateTo', '');
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4 items-end">
      {/* Filter Type Selector */}
      <select
        ref={visitTypeRef}
        onChange={(e) => onFilterChange('visitType', e.target.value)}
        className="px-3 py-2 rounded-md border border-indigo-300 bg-white text-sm text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-200"
      >
        <option value="">Filter By Visit</option>
        <option value="last">Last Visit</option>
        <option value="next">Next Visit</option>
      </select>

      {/* Date Range Inputs */}
      <div className="flex gap-2">
        <div className="flex flex-col">
          <label className="text-sm text-indigo-600 mb-1">From</label>
          <input
            ref={fromDateRef}
            type="date"
            onChange={(e) => onFilterChange('dateFrom', e.target.value)}
            className="px-3 py-2 rounded-md border border-indigo-300 bg-white text-sm text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-indigo-600 mb-1">To</label>
          <input
            ref={toDateRef}
            type="date"
            onChange={(e) => onFilterChange('dateTo', e.target.value)}
            className="px-3 py-2 rounded-md border border-indigo-300 bg-white text-sm text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Clear Filter Button */}
      <button
        onClick={handleClear}
        className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Clear Dates
      </button>
    </div>
  );
};

export default VisitDateFilter;