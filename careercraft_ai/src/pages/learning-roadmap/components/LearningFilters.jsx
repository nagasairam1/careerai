import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const LearningFilters = ({ filters, onFiltersChange, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const skillCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technical', label: 'Technical Skills' },
    { value: 'soft-skills', label: 'Soft Skills' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'data-analysis', label: 'Data Analysis' },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const timeCommitments = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: 'Under 2 hours' },
    { value: 'medium', label: '2-10 hours' },
    { value: 'long', label: '10+ hours' }
  ];

  const learningFormats = [
    { value: 'all', label: 'All Formats' },
    { value: 'video', label: 'Video Courses' },
    { value: 'interactive', label: 'Interactive' },
    { value: 'reading', label: 'Reading' },
    { value: 'hands-on', label: 'Hands-on Projects' }
  ];

  const difficultyLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'coursera', label: 'Coursera' },
    { value: 'linkedin', label: 'LinkedIn Learning' },
    { value: 'udemy', label: 'Udemy' },
    { value: 'pluralsight', label: 'Pluralsight' },
    { value: 'edx', label: 'edX' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: 'all',
      timeCommitment: 'all',
      format: 'all',
      difficulty: 'all',
      platform: 'all',
      showCompleted: true,
      sortBy: 'recommended'
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.filter(value => 
      value !== 'all' && value !== true && value !== 'recommended'
    )?.length;
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            disabled={getActiveFiltersCount() === 0}
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`p-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Skill Category */}
          <Select
            label="Category"
            options={skillCategories}
            value={filters?.category}
            onChange={(value) => handleFilterChange('category', value)}
            className="mb-0"
          />

          {/* Time Commitment */}
          <Select
            label="Duration"
            options={timeCommitments}
            value={filters?.timeCommitment}
            onChange={(value) => handleFilterChange('timeCommitment', value)}
            className="mb-0"
          />

          {/* Learning Format */}
          <Select
            label="Format"
            options={learningFormats}
            value={filters?.format}
            onChange={(value) => handleFilterChange('format', value)}
            className="mb-0"
          />

          {/* Difficulty Level */}
          <Select
            label="Difficulty"
            options={difficultyLevels}
            value={filters?.difficulty}
            onChange={(value) => handleFilterChange('difficulty', value)}
            className="mb-0"
          />

          {/* Platform */}
          <Select
            label="Platform"
            options={platforms}
            value={filters?.platform}
            onChange={(value) => handleFilterChange('platform', value)}
            className="mb-0"
          />

          {/* Sort By */}
          <Select
            label="Sort By"
            options={[
              { value: 'recommended', label: 'Recommended' },
              { value: 'duration-asc', label: 'Duration (Short to Long)' },
              { value: 'duration-desc', label: 'Duration (Long to Short)' },
              { value: 'rating', label: 'Highest Rated' },
              { value: 'newest', label: 'Newest First' }
            ]}
            value={filters?.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
            className="mb-0"
          />
        </div>

        {/* Additional Options */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters?.showCompleted}
                onChange={(e) => handleFilterChange('showCompleted', e?.target?.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-foreground">Show completed courses</span>
            </label>
          </div>
        </div>

        {/* Quick Filter Tags */}
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Quick Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Free Courses', key: 'free' },
              { label: 'Certificates', key: 'certified' },
              { label: 'Beginner Friendly', key: 'beginner' },
              { label: 'Project Based', key: 'projects' }
            ]?.map((tag) => (
              <button
                key={tag?.key}
                onClick={() => handleFilterChange('quickFilter', tag?.key)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors duration-200 ${
                  filters?.quickFilter === tag?.key
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {tag?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningFilters;