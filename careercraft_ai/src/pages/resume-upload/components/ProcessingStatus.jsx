import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingStatus = ({ isProcessing, progress = 0, onComplete, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(30);

  const processingSteps = [
    {
      id: 'upload',
      label: 'File Upload',
      description: 'Uploading your resume securely',
      icon: 'Upload',
      duration: 2
    },
    {
      id: 'extraction',
      label: 'Text Extraction',
      description: 'Extracting text content from your resume',
      icon: 'FileText',
      duration: 8
    },
    {
      id: 'parsing',
      label: 'Content Analysis',
      description: 'Analyzing sections and identifying key information',
      icon: 'Search',
      duration: 12
    },
    {
      id: 'skills',
      label: 'Skills Detection',
      description: 'Identifying technical and soft skills',
      icon: 'Target',
      duration: 6
    },
    {
      id: 'completion',
      label: 'Finalizing',
      description: 'Preparing your personalized analysis',
      icon: 'Check',
      duration: 2
    }
  ];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = Math.min(prev + 1, processingSteps?.length - 1);
          if (nextStep === processingSteps?.length - 1) {
            setTimeout(() => onComplete?.(), 1000);
          }
          return nextStep;
        });
        
        setEstimatedTime((prev) => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isProcessing, onComplete]);

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const getStepStyles = (status) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-success text-success-foreground',
          text: 'text-success'
        };
      case 'active':
        return {
          circle: 'bg-primary text-primary-foreground animate-pulse',
          text: 'text-primary font-medium'
        };
      default:
        return {
          circle: 'bg-muted text-muted-foreground',
          text: 'text-muted-foreground'
        };
    }
  };

  if (!isProcessing) {
    return null;
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Processing Resume</h3>
          <p className="text-sm text-muted-foreground">
            Estimated time remaining: {estimatedTime}s
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{Math.round(progress)}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Processing Steps */}
      <div className="space-y-4">
        {processingSteps?.map((step, index) => {
          const status = getStepStatus(index);
          const styles = getStepStyles(status);
          
          return (
            <div key={step?.id} className="flex items-center space-x-4">
              {/* Step Icon */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${styles?.circle}
              `}>
                {status === 'completed' ? (
                  <Icon name="Check" size={16} />
                ) : status === 'active' ? (
                  <Icon name={step?.icon} size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium transition-colors duration-300 ${styles?.text}`}>
                  {step?.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {step?.description}
                </div>
              </div>
              {/* Status Indicator */}
              <div className="flex items-center">
                {status === 'completed' && (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                )}
                {status === 'active' && (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                )}
                {status === 'pending' && (
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Processing Details */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground">
              <strong>What's happening:</strong> Our AI is analyzing your resume to extract key information, 
              identify your skills, and prepare personalized career recommendations.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Your data is processed securely and never shared with third parties.
            </p>
          </div>
        </div>
      </div>
      {/* Cancel Option */}
      <div className="mt-4 text-center">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Cancel Processing
        </Button>
      </div>
    </div>
  );
};

export default ProcessingStatus;