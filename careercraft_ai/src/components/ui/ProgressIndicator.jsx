import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ currentStep = 0, completedSteps = [], className = '' }) => {
  const steps = [
    {
      id: 'resume-upload',
      label: 'Upload Resume',
      icon: 'Upload',
      path: '/resume-upload'
    },
    {
      id: 'career-analysis',
      label: 'Career Analysis',
      icon: 'Compass',
      path: '/career-path-recommendations'
    },
    {
      id: 'skill-development',
      label: 'Skill Development',
      icon: 'BookOpen',
      path: '/learning-roadmap'
    },
    {
      id: 'job-application',
      label: 'Job Application',
      icon: 'Search',
      path: '/job-matching'
    }
  ];

  const getStepStatus = (stepIndex) => {
    if (completedSteps?.includes(steps?.[stepIndex]?.id)) return 'completed';
    if (stepIndex === currentStep) return 'current';
    if (stepIndex < currentStep) return 'completed';
    return 'upcoming';
  };

  const getStepStyles = (status) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-success text-success-foreground border-success',
          line: 'bg-success',
          text: 'text-success font-medium'
        };
      case 'current':
        return {
          circle: 'bg-primary text-primary-foreground border-primary ring-4 ring-primary/20',
          line: 'bg-border',
          text: 'text-primary font-semibold'
        };
      default:
        return {
          circle: 'bg-muted text-muted-foreground border-border',
          line: 'bg-border',
          text: 'text-muted-foreground'
        };
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      {/* Desktop Progress Indicator */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const status = getStepStatus(index);
            const styles = getStepStyles(status);
            const isLast = index === steps?.length - 1;

            return (
              <div key={step?.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center
                    transition-all duration-200 ${styles?.circle}
                  `}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step?.icon} size={16} />
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <span className={`mt-2 text-xs text-center transition-colors duration-200 ${styles?.text}`}>
                    {step?.label}
                  </span>
                </div>
                {/* Connecting Line */}
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 transition-colors duration-200 ${styles?.line}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Mobile Progress Indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {steps?.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps?.length) * 100}%` }}
          />
        </div>

        {/* Current Step Info */}
        <div className="flex items-center space-x-3">
          <div className={`
            w-8 h-8 rounded-full border-2 flex items-center justify-center
            ${getStepStyles(getStepStatus(currentStep))?.circle}
          `}>
            <Icon name={steps?.[currentStep]?.icon || 'Circle'} size={14} />
          </div>
          <div>
            <span className="text-sm font-medium text-foreground">
              {steps?.[currentStep]?.label || 'Getting Started'}
            </span>
            <div className="text-xs text-muted-foreground">
              {completedSteps?.length} of {steps?.length} completed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;