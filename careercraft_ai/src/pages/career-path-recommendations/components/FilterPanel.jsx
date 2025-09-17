import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onReset, 
  isOpen, 
  onToggle,
  className = '' 
}) => {
  const salaryRanges = [
    { value: 'all', label: 'All Salary Ranges' },
    { value: '0-50k', label: '$0 - $50K' },
    { value: '50k-75k', label: '$50K - $75K' },
    { value: '75k-100k', label: '$75K - $100K' },
    { value: '100k-150k', label: '$100K - $150K' },
    { value: '150k+', label: '$150K+' }
  ];

  const experienceLevels = [
    { value: 'all', label: 'All Experience Levels' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' }
  ];

  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' }
  ];

  const workTypes = [
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'On-site' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleMultiSelectChange = (key, value, checked) => {
    const currentValues = filters?.[key] || [];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues?.filter(v => v !== value);
    
    handleFilterChange(key, newValues);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.salaryRange && filters?.salaryRange !== 'all') count++;
    if (filters?.experienceLevel && filters?.experienceLevel !== 'all') count++;
    if (filters?.industries && filters?.industries?.length > 0) count++;
    if (filters?.workTypes && filters?.workTypes?.length > 0) count++;
    if (filters?.minSkillMatch && filters?.minSkillMatch > 0) count++;
    if (filters?.minGrowthPotential && filters?.minGrowthPotential > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-primary" />
          <h3 className="font-medium text-foreground">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              Reset
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="md:hidden"
          >
            <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`p-4 space-y-4 ${!isOpen ? 'hidden md:block' : ''}`}>
        {/* Salary Range */}
        <div>
          <Select
            label="Salary Range"
            options={salaryRanges}
            value={filters?.salaryRange || 'all'}
            onChange={(value) => handleFilterChange('salaryRange', value)}
            className="w-full"
          />
        </div>

        {/* Experience Level */}
        <div>
          <Select
            label="Experience Level"
            options={experienceLevels}
            value={filters?.experienceLevel || 'all'}
            onChange={(value) => handleFilterChange('experienceLevel', value)}
            className="w-full"
          />
        </div>

        {/* Industries */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Industries
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {industries?.map((industry) => (
              <Checkbox
                key={industry?.value}
                label={industry?.label}
                checked={(filters?.industries || [])?.includes(industry?.value)}
                onChange={(e) => handleMultiSelectChange('industries', industry?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Work Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Work Type
          </label>
          <div className="space-y-2">
            {workTypes?.map((workType) => (
              <Checkbox
                key={workType?.value}
                label={workType?.label}
                checked={(filters?.workTypes || [])?.includes(workType?.value)}
                onChange={(e) => handleMultiSelectChange('workTypes', workType?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Skill Match Threshold */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Minimum Skill Match: {filters?.minSkillMatch || 0}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={filters?.minSkillMatch || 0}
            onChange={(e) => handleFilterChange('minSkillMatch', parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Growth Potential Threshold */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Minimum Growth Potential: {filters?.minGrowthPotential || 0}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={filters?.minGrowthPotential || 0}
            onChange={(e) => handleFilterChange('minGrowthPotential', parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Market Demand */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Market Demand
          </label>
          <div className="space-y-2">
            <Checkbox
              label="High Demand"
              checked={(filters?.marketDemand || [])?.includes('High')}
              onChange={(e) => handleMultiSelectChange('marketDemand', 'High', e?.target?.checked)}
            />
            <Checkbox
              label="Medium Demand"
              checked={(filters?.marketDemand || [])?.includes('Medium')}
              onChange={(e) => handleMultiSelectChange('marketDemand', 'Medium', e?.target?.checked)}
            />
            <Checkbox
              label="Low Demand"
              checked={(filters?.marketDemand || [])?.includes('Low')}
              onChange={(e) => handleMultiSelectChange('marketDemand', 'Low', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-background);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-background);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default FilterPanel;