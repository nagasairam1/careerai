import React from 'react';

import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortBy, sortOrder, onSortChange, viewMode, onViewModeChange, totalResults }) => {
  const sortOptions = [
    { value: 'match', label: 'Best Match' },
    { value: 'salary', label: 'Salary' },
    { value: 'date', label: 'Date Posted' },
    { value: 'company', label: 'Company Rating' },
    { value: 'relevance', label: 'Relevance' }
  ];

  const handleSortChange = (value) => {
    onSortChange(value, sortOrder);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(sortBy, newOrder);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        {/* Results Count */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {totalResults?.toLocaleString()} jobs found
          </span>
        </div>

        {/* Sort and View Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
            <div className="flex items-center space-x-1">
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={handleSortChange}
                className="min-w-32"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSortOrder}
                iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
                className="p-2"
              />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden md:flex items-center space-x-1 border border-border rounded-md p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              iconName="Grid3X3"
              className="p-2"
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              iconName="List"
              className="p-2"
            />
          </div>
        </div>
      </div>
      {/* Mobile Sort Info */}
      <div className="mt-2 sm:hidden">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Sorted by {sortOptions?.find(opt => opt?.value === sortBy)?.label}</span>
          <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
        </div>
      </div>
    </div>
  );
};

export default SortControls;