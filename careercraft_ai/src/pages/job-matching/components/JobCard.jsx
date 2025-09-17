import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobCard = ({ job, onSave, onViewDetails, onTailorResume }) => {
  const [isSaved, setIsSaved] = useState(job?.isSaved || false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(job?.id, !isSaved);
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-success bg-success/10 border-success/20';
    if (percentage >= 75) return 'text-primary bg-primary/10 border-primary/20';
    if (percentage >= 60) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getCompetitionColor = (level) => {
    switch (level) {
      case 'Low': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'High': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{job?.title}</h3>
            {job?.isNew && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                New
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Building2" size={14} />
              <span>{job?.company}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{job?.location}</span>
            </div>
            {job?.isRemote && (
              <div className="flex items-center space-x-1">
                <Icon name="Wifi" size={14} />
                <span>Remote</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Match Score */}
        <div className={`px-3 py-2 rounded-lg border ${getMatchColor(job?.matchPercentage)}`}>
          <div className="text-center">
            <div className="text-lg font-bold">{job?.matchPercentage}%</div>
            <div className="text-xs">Match</div>
          </div>
        </div>
      </div>
      {/* Job Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Salary Range</span>
          <span className="text-sm font-medium text-foreground">{job?.salaryRange}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Experience Level</span>
          <span className="text-sm font-medium text-foreground">{job?.experienceLevel}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Competition</span>
          <span className={`text-sm font-medium ${getCompetitionColor(job?.competition)}`}>
            {job?.competition}
          </span>
        </div>
      </div>
      {/* Skills Match */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Skills Match</span>
          <span className="text-xs text-muted-foreground">
            {job?.matchedSkills?.length} of {job?.requiredSkills?.length} skills
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {job?.matchedSkills?.slice(0, 4)?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-success/10 text-success text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {job?.missingSkills?.slice(0, 2)?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-error/10 text-error text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {(job?.matchedSkills?.length + job?.missingSkills?.length) > 6 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{(job?.matchedSkills?.length + job?.missingSkills?.length) - 6} more
            </span>
          )}
        </div>
      </div>
      {/* Posted Date */}
      <div className="flex items-center space-x-2 mb-4 text-xs text-muted-foreground">
        <Icon name="Clock" size={12} />
        <span>Posted {job?.postedDate}</span>
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewDetails(job)}
          className="flex-1"
        >
          View Details
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onTailorResume(job)}
          iconName="FileText"
          iconPosition="left"
        >
          Tailor Resume
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          iconName={isSaved ? "Heart" : "Heart"}
          className={isSaved ? "text-error" : ""}
        />
      </div>
    </div>
  );
};

export default JobCard;