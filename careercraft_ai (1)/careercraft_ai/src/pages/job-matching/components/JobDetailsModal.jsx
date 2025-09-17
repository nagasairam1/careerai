import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobDetailsModal = ({ job, isOpen, onClose, onTailorResume, onApply }) => {
  if (!isOpen || !job) return null;

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-success bg-success/10 border-success/20';
    if (percentage >= 75) return 'text-primary bg-primary/10 border-primary/20';
    if (percentage >= 60) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1200 p-4">
      <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-foreground">{job?.title}</h2>
              <div className={`px-3 py-1 rounded-lg border ${getMatchColor(job?.matchPercentage)}`}>
                <span className="text-sm font-bold">{job?.matchPercentage}% Match</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Building2" size={16} />
                <span>{job?.company}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} />
                <span>{job?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>Posted {job?.postedDate}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} iconName="X" className="p-2" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Salary Range</div>
              <div className="text-lg font-semibold text-foreground">{job?.salaryRange}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Experience Level</div>
              <div className="text-lg font-semibold text-foreground">{job?.experienceLevel}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Job Type</div>
              <div className="text-lg font-semibold text-foreground">{job?.jobType}</div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Job Description</h3>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>{job?.description}</p>
            </div>
          </div>

          {/* Skills Analysis */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Skills Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Matched Skills */}
              <div>
                <h4 className="text-sm font-medium text-success mb-2">
                  Matched Skills ({job?.matchedSkills?.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job?.matchedSkills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-success/10 text-success text-sm rounded-full border border-success/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div>
                <h4 className="text-sm font-medium text-error mb-2">
                  Skills to Develop ({job?.missingSkills?.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job?.missingSkills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-error/10 text-error text-sm rounded-full border border-error/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Requirements</h3>
            <ul className="space-y-2 text-muted-foreground">
              {job?.requirements?.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">About {job?.company}</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={20} color="white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{job?.company}</div>
                  <div className="text-sm text-muted-foreground">{job?.companySize} employees</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{job?.companyDescription}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-card border-t border-border p-6">
          <div className="flex items-center space-x-3">
            <Button
              variant="default"
              onClick={() => onApply(job)}
              iconName="ExternalLink"
              iconPosition="right"
              className="flex-1 sm:flex-none"
            >
              Apply Now
            </Button>
            <Button
              variant="outline"
              onClick={() => onTailorResume(job)}
              iconName="FileText"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Tailor Resume
            </Button>
            <Button
              variant="ghost"
              iconName="Heart"
              className="p-3"
            />
            <Button
              variant="ghost"
              iconName="Share"
              className="p-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;