import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillMatrix = ({ skills, onSkillUpdate, selectedCareerPath }) => {
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('priority'); // priority, gap, name

  const categories = [
    { id: 'all', label: 'All Skills', count: skills?.length },
    { id: 'technical', label: 'Technical', count: skills?.filter(s => s?.category === 'technical')?.length },
    { id: 'soft', label: 'Soft Skills', count: skills?.filter(s => s?.category === 'soft')?.length },
    { id: 'industry', label: 'Industry', count: skills?.filter(s => s?.category === 'industry')?.length }
  ];

  const getGapLevel = (current, required) => {
    const gap = required - current;
    if (gap <= 0) return { level: 'none', color: 'text-success', bg: 'bg-success/10' };
    if (gap <= 1) return { level: 'minor', color: 'text-warning', bg: 'bg-warning/10' };
    if (gap <= 2) return { level: 'moderate', color: 'text-error', bg: 'bg-error/10' };
    return { level: 'major', color: 'text-error', bg: 'bg-error/20' };
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return { icon: 'AlertTriangle', color: 'text-error' };
      case 'medium': return { icon: 'Clock', color: 'text-warning' };
      case 'low': return { icon: 'CheckCircle', color: 'text-success' };
      default: return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const filteredSkills = skills?.filter(skill => filterCategory === 'all' || skill?.category === filterCategory)?.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        case 'gap':
          return (b?.required - b?.current) - (a?.required - a?.current);
        case 'name':
          return a?.name?.localeCompare(b?.name);
        default:
          return 0;
      }
    });

  const SkillCard = ({ skill }) => {
    const gap = getGapLevel(skill?.current, skill?.required);
    const priority = getPriorityIcon(skill?.priority);
    const progressPercentage = (skill?.current / 5) * 100;
    const requiredPercentage = (skill?.required / 5) * 100;

    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-all duration-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-foreground">{skill?.name}</h3>
              <div className={`w-2 h-2 rounded-full ${gap?.bg}`} />
            </div>
            <p className="text-sm text-muted-foreground mb-2">{skill?.description}</p>
            <div className="flex items-center space-x-3 text-xs">
              <span className={`flex items-center space-x-1 ${priority?.color}`}>
                <Icon name={priority?.icon} size={12} />
                <span className="capitalize">{skill?.priority} Priority</span>
              </span>
              <span className="text-muted-foreground">
                Market Demand: {skill?.marketDemand}/10
              </span>
            </div>
          </div>
        </div>
        {/* Skill Level Visualization */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Level</span>
            <span className="font-medium">{skill?.current}/5</span>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
            <div 
              className="absolute top-0 h-full w-0.5 bg-error"
              style={{ left: `${requiredPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Required Level</span>
            <span className="font-medium">{skill?.required}/5</span>
          </div>
        </div>
        {/* Gap Analysis */}
        <div className={`mt-3 p-2 rounded-md ${gap?.bg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${gap?.color}`}>
              {skill?.required - skill?.current > 0 
                ? `Gap: ${skill?.required - skill?.current} levels`
                : 'Skill Met'
              }
            </span>
            {skill?.learningTime && (
              <span className="text-xs text-muted-foreground">
                Est. {skill?.learningTime}
              </span>
            )}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center space-x-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSkillUpdate(skill?.id, 'assess')}
            className="flex-1"
          >
            <Icon name="Target" size={14} className="mr-1" />
            Assess
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSkillUpdate(skill?.id, 'learn')}
            className="flex-1"
          >
            <Icon name="BookOpen" size={14} className="mr-1" />
            Learn
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Skill Gap Analysis</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Comparing your skills with {selectedCareerPath} requirements
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <Icon name="List" size={16} />
          </Button>
        </div>
      </div>
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 bg-muted/50 p-4 rounded-lg">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories?.map(category => (
            <Button
              key={category?.id}
              variant={filterCategory === category?.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterCategory(category?.id)}
            >
              {category?.label} ({category?.count})
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-md px-2 py-1 bg-background"
          >
            <option value="priority">Priority</option>
            <option value="gap">Skill Gap</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      {/* Skills Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" :"space-y-4"
      }>
        {filteredSkills?.map(skill => (
          <SkillCard key={skill?.id} skill={skill} />
        ))}
      </div>
      {/* Empty State */}
      {filteredSkills?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No skills found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or category selection.
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillMatrix;