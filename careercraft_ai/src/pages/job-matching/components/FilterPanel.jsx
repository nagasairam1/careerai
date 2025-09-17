import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, onClearFilters, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'remote', label: 'Remote Only' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'boston', label: 'Boston, MA' }
  ];

  const companySizeOptions = [
    { value: 'all', label: 'All Company Sizes' },
    { value: 'startup', label: 'Startup (1-50)' },
    { value: 'small', label: 'Small (51-200)' },
    { value: 'medium', label: 'Medium (201-1000)' },
    { value: 'large', label: 'Large (1000+)' }
  ];

  const experienceLevelOptions = [
    { value: 'all', label: 'All Experience Levels' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' }
  ];

  const jobTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      location: 'all',
      salaryMin: '',
      salaryMax: '',
      companySize: 'all',
      experienceLevel: 'all',
      jobTypes: [],
      remoteOnly: false,
      postedWithin: 'all'
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const handleJobTypeChange = (jobType, checked) => {
    const updatedJobTypes = checked
      ? [...localFilters?.jobTypes, jobType]
      : localFilters?.jobTypes?.filter(type => type !== jobType);
    handleFilterChange('jobTypes', updatedJobTypes);
  };

  return (
    <div className={`bg-card border border-border rounded-lg transition-all duration-200 ${
      isOpen ? 'p-6' : 'p-4'
    }`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            iconName={isOpen ? "ChevronUp" : "ChevronDown"}
            className="md:hidden"
          />
        </div>
      </div>
      {/* Filter Content */}
      <div className={`space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
        {/* Location */}
        <div>
          <Select
            label="Location"
            options={locationOptions}
            value={localFilters?.location}
            onChange={(value) => handleFilterChange('location', value)}
          />
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Salary Range (USD)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={localFilters?.salaryMin}
              onChange={(e) => handleFilterChange('salaryMin', e?.target?.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={localFilters?.salaryMax}
              onChange={(e) => handleFilterChange('salaryMax', e?.target?.value)}
            />
          </div>
        </div>

        {/* Company Size */}
        <div>
          <Select
            label="Company Size"
            options={companySizeOptions}
            value={localFilters?.companySize}
            onChange={(value) => handleFilterChange('companySize', value)}
          />
        </div>

        {/* Experience Level */}
        <div>
          <Select
            label="Experience Level"
            options={experienceLevelOptions}
            value={localFilters?.experienceLevel}
            onChange={(value) => handleFilterChange('experienceLevel', value)}
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Job Type
          </label>
          <div className="space-y-2">
            {jobTypeOptions?.map((option) => (
              <Checkbox
                key={option?.value}
                label={option?.label}
                checked={localFilters?.jobTypes?.includes(option?.value)}
                onChange={(e) => handleJobTypeChange(option?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Remote Work */}
        <div>
          <Checkbox
            label="Remote work only"
            description="Show only remote or hybrid positions"
            checked={localFilters?.remoteOnly}
            onChange={(e) => handleFilterChange('remoteOnly', e?.target?.checked)}
          />
        </div>

        {/* Posted Within */}
        <div>
          <Select
            label="Posted Within"
            options={[
              { value: 'all', label: 'All Time' },
              { value: '1', label: 'Last 24 hours' },
              { value: '3', label: 'Last 3 days' },
              { value: '7', label: 'Last week' },
              { value: '30', label: 'Last month' }
            ]}
            value={localFilters?.postedWithin}
            onChange={(value) => handleFilterChange('postedWithin', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;