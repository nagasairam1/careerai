import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadInstructions = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const instructions = [
    {
      icon: 'FileText',
      title: 'Use Standard Formats',
      description: 'Upload PDF or DOCX files for best results. Avoid scanned images or unusual formats.',
      tip: 'PDF files typically provide the most accurate text extraction'
    },
    {
      icon: 'Type',
      title: 'Clear Formatting',
      description: 'Use standard fonts and clear section headers. Avoid complex layouts or graphics.',
      tip: 'Simple, clean formatting helps our AI understand your content better'
    },
    {
      icon: 'List',
      title: 'Complete Information',
      description: 'Include all relevant sections: contact info, experience, education, and skills.',
      tip: 'More complete information leads to better career recommendations'
    },
    {
      icon: 'Shield',
      title: 'Remove Passwords',
      description: 'Ensure your resume file is not password-protected or encrypted.',
      tip: 'Password-protected files cannot be processed by our system'
    }
  ];

  const commonIssues = [
    {
      issue: 'File too large',
      solution: 'Compress your PDF or reduce image quality. Maximum size is 10MB.'
    },
    {
      issue: 'Text not detected',
      solution: 'Your resume might be a scanned image. Try converting to text-based PDF.'
    },
    {
      issue: 'Missing information',
      solution: 'Add missing details manually after upload or update your resume file.'
    },
    {
      issue: 'Formatting issues',
      solution: 'Use standard section headers like "Experience", "Education", "Skills".'
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Info" size={16} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Upload Guidelines</h3>
              <p className="text-sm text-muted-foreground">
                Follow these tips for optimal resume analysis
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
      </div>
      {/* Instructions List */}
      <div className="p-6 space-y-4">
        {instructions?.map((instruction, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name={instruction?.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground mb-1">
                {instruction?.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {instruction?.description}
              </p>
              {isExpanded && (
                <p className="text-xs text-accent mt-1 italic">
                  💡 {instruction?.tip}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Common Issues Section */}
      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
              <Icon name="AlertCircle" size={16} className="text-warning mr-2" />
              Common Issues & Solutions
            </h4>
            
            <div className="space-y-3">
              {commonIssues?.map((item, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="X" size={14} className="text-destructive mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-foreground">
                        {item?.issue}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 mt-1">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-muted-foreground">
                        {item?.solution}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Quick Stats */}
      <div className="px-6 pb-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-primary">98%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-accent">~30s</div>
              <div className="text-xs text-muted-foreground">Processing Time</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-success">10MB</div>
              <div className="text-xs text-muted-foreground">Max File Size</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadInstructions;