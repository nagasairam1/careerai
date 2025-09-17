import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillSummary = ({ skills, selectedCareerPath, onExportReport }) => {
  const totalSkills = skills?.length;
  const skillsWithGaps = skills?.filter(skill => skill?.current < skill?.required)?.length;
  const skillsMet = skills?.filter(skill => skill?.current >= skill?.required)?.length;
  const highPriorityGaps = skills?.filter(skill => skill?.priority === 'high' && skill?.current < skill?.required)?.length;

  const averageGap = skills?.reduce((acc, skill) => {
    const gap = Math.max(0, skill?.required - skill?.current);
    return acc + gap;
  }, 0) / totalSkills;

  const estimatedLearningTime = skills?.filter(skill => skill?.current < skill?.required && skill?.learningTime)?.reduce((acc, skill) => {
      const timeMatch = skill?.learningTime?.match(/(\d+)/);
      return acc + (timeMatch ? parseInt(timeMatch?.[1]) : 0);
    }, 0);

  const categoryBreakdown = skills?.reduce((acc, skill) => {
    if (!acc?.[skill?.category]) {
      acc[skill.category] = { total: 0, gaps: 0, met: 0 };
    }
    acc[skill.category].total++;
    if (skill?.current < skill?.required) {
      acc[skill.category].gaps++;
    } else {
      acc[skill.category].met++;
    }
    return acc;
  }, {});

  const getCompletionPercentage = () => {
    return Math.round((skillsMet / totalSkills) * 100);
  };

  const getGapSeverity = () => {
    if (averageGap <= 0.5) return { level: 'Low', color: 'text-success', bg: 'bg-success/10' };
    if (averageGap <= 1.5) return { level: 'Moderate', color: 'text-warning', bg: 'bg-warning/10' };
    return { level: 'High', color: 'text-error', bg: 'bg-error/10' };
  };

  const severity = getGapSeverity();
  const completionPercentage = getCompletionPercentage();

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalSkills}</p>
              <p className="text-sm text-muted-foreground">Total Skills</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-error" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{skillsWithGaps}</p>
              <p className="text-sm text-muted-foreground">Skills with Gaps</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{skillsMet}</p>
              <p className="text-sm text-muted-foreground">Skills Met</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{estimatedLearningTime}h</p>
              <p className="text-sm text-muted-foreground">Est. Learning Time</p>
            </div>
          </div>
        </div>
      </div>
      {/* Progress Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Overall Progress</h3>
          <Button variant="outline" size="sm" onClick={onExportReport}>
            <Icon name="Download" size={16} className="mr-2" />
            Export Report
          </Button>
        </div>

        <div className="space-y-4">
          {/* Completion Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Skills Readiness</span>
              <span className="text-sm font-bold text-foreground">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Gap Severity */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Gap Severity</span>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${severity?.bg} ${severity?.color}`}>
              {severity?.level}
            </div>
          </div>

          {/* High Priority Gaps */}
          {highPriorityGaps > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">High Priority Gaps</span>
              <span className="text-sm font-medium text-error">{highPriorityGaps} skills need immediate attention</span>
            </div>
          )}
        </div>
      </div>
      {/* Category Breakdown */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Skills by Category</h3>
        <div className="space-y-4">
          {Object.entries(categoryBreakdown)?.map(([category, data]) => {
            const categoryCompletion = Math.round((data?.met / data?.total) * 100);
            
            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground capitalize">{category}</span>
                    <span className="text-xs text-muted-foreground">({data?.total} skills)</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{categoryCompletion}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${categoryCompletion}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{data?.met} skills ready</span>
                  <span>{data?.gaps} gaps to fill</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Next Steps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="default" className="justify-start h-auto p-4">
            <div className="flex items-start space-x-3">
              <Icon name="BookOpen" size={20} className="text-primary-foreground mt-0.5" />
              <div className="text-left">
                <div className="font-medium">Create Learning Plan</div>
                <div className="text-sm opacity-90 mt-1">
                  Build a personalized roadmap for skill development
                </div>
              </div>
            </div>
          </Button>

          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Users" size={20} className="text-foreground mt-0.5" />
              <div className="text-left">
                <div className="font-medium">Find Mentors</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Connect with professionals in {selectedCareerPath}
                </div>
              </div>
            </div>
          </Button>

          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Award" size={20} className="text-foreground mt-0.5" />
              <div className="text-left">
                <div className="font-medium">Take Assessments</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Validate your current skill levels
                </div>
              </div>
            </div>
          </Button>

          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Search" size={20} className="text-foreground mt-0.5" />
              <div className="text-left">
                <div className="font-medium">Explore Jobs</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Find positions matching your current skills
                </div>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillSummary;