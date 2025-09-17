import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareerPathCard = ({ 
  careerPath, 
  isBookmarked, 
  onBookmark, 
  onExploreSkills, 
  onViewJobs,
  onViewLearningPath 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getGrowthColor = (growth) => {
    if (growth >= 80) return 'text-success';
    if (growth >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getSkillMatchColor = (match) => {
    if (match >= 80) return 'bg-success text-success-foreground';
    if (match >= 60) return 'bg-warning text-warning-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const getDemandIndicator = (demand) => {
    const indicators = {
      'High': { color: 'bg-success', icon: 'TrendingUp' },
      'Medium': { color: 'bg-warning', icon: 'Minus' },
      'Low': { color: 'bg-error', icon: 'TrendingDown' }
    };
    return indicators?.[demand] || indicators?.['Medium'];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold text-foreground">{careerPath?.title}</h3>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillMatchColor(careerPath?.skillMatch)}`}>
              {careerPath?.skillMatch}% Match
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-3">{careerPath?.description}</p>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{careerPath?.salaryRange}</div>
              <div className="text-xs text-muted-foreground">Salary Range</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-semibold ${getGrowthColor(careerPath?.growthPotential)}`}>
                {careerPath?.growthPotential}%
              </div>
              <div className="text-xs text-muted-foreground">Growth Potential</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Icon 
                  name={getDemandIndicator(careerPath?.marketDemand)?.icon} 
                  size={16} 
                  className={getDemandIndicator(careerPath?.marketDemand)?.color?.replace('bg-', 'text-')} 
                />
                <span className="text-sm font-medium text-foreground">{careerPath?.marketDemand}</span>
              </div>
              <div className="text-xs text-muted-foreground">Market Demand</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{careerPath?.timeToTransition}</div>
              <div className="text-xs text-muted-foreground">Time to Transition</div>
            </div>
          </div>
        </div>

        {/* Bookmark Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBookmark(careerPath?.id)}
          className="ml-4"
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={20} 
            className={isBookmarked ? "text-primary" : "text-muted-foreground"} 
          />
        </Button>
      </div>
      {/* Skills Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Key Skills Required</h4>
        <div className="flex flex-wrap gap-2">
          {careerPath?.keySkills?.slice(0, 6)?.map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
          {careerPath?.keySkills?.length > 6 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{careerPath?.keySkills?.length - 6} more
            </span>
          )}
        </div>
      </div>
      {/* Expandable Content */}
      {isExpanded && (
        <div className="border-t border-border pt-4 space-y-4">
          {/* Detailed Skills */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">All Required Skills</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {careerPath?.keySkills?.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Typical Responsibilities</h4>
            <ul className="space-y-1">
              {careerPath?.responsibilities?.map((responsibility, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Progression */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Career Progression Timeline</h4>
            <div className="space-y-2">
              {careerPath?.progressionTimeline?.map((stage, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">{stage?.years}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{stage?.role}</div>
                    <div className="text-xs text-muted-foreground">{stage?.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Outlook */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Industry Outlook</h4>
            <p className="text-sm text-muted-foreground">{careerPath?.industryOutlook}</p>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-border">
        <Button
          variant="default"
          onClick={() => onViewLearningPath(careerPath?.id)}
          className="flex-1"
          iconName="BookOpen"
          iconPosition="left"
        >
          View Learning Path
        </Button>
        <Button
          variant="outline"
          onClick={() => onExploreSkills(careerPath?.id)}
          className="flex-1"
          iconName="Target"
          iconPosition="left"
        >
          Analyze Skills
        </Button>
        <Button
          variant="outline"
          onClick={() => onViewJobs(careerPath?.id)}
          className="flex-1"
          iconName="Search"
          iconPosition="left"
        >
          Find Jobs
        </Button>
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? "Less" : "More"}
        </Button>
      </div>
    </div>
  );
};

export default CareerPathCard;