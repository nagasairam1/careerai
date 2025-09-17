import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActions = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getContextualActions = () => {
    const currentPath = location?.pathname;
    
    const baseActions = [
      {
        label: 'Upload New Resume',
        icon: 'Upload',
        path: '/resume-upload',
        description: 'Update your resume for better analysis'
      },
      {
        label: 'View Progress',
        icon: 'BarChart3',
        action: 'showProgress',
        description: 'Check your career development progress'
      }
    ];

    // Add contextual actions based on current page
    const contextualActions = {
      '/resume-upload': [
        {
          label: 'Explore Career Paths',
          icon: 'Compass',
          path: '/career-path-recommendations',
          description: 'Discover suitable career paths'
        }
      ],
      '/career-path-recommendations': [
        {
          label: 'Analyze Skills',
          icon: 'Target',
          path: '/skill-gap-analysis',
          description: 'Identify skill gaps'
        }
      ],
      '/skill-gap-analysis': [
        {
          label: 'Create Learning Plan',
          icon: 'BookOpen',
          path: '/learning-roadmap',
          description: 'Build your learning roadmap'
        }
      ],
      '/learning-roadmap': [
        {
          label: 'Find Jobs',
          icon: 'Search',
          path: '/job-matching',
          description: 'Search for matching jobs'
        }
      ],
      '/job-matching': [
        {
          label: 'Tailor Resume',
          icon: 'FileText',
          path: '/resume-tailoring',
          description: 'Customize resume for jobs'
        }
      ],
      '/resume-tailoring': [
        {
          label: 'Back to Job Search',
          icon: 'Search',
          path: '/job-matching',
          description: 'Continue job searching'
        }
      ]
    };

    return [...baseActions, ...(contextualActions?.[currentPath] || [])];
  };

  const handleAction = (action) => {
    if (action?.path) {
      window.location.href = action?.path;
    } else if (action?.action === 'showProgress') {
      // Handle progress view action
      console.log('Show progress modal or navigate to progress page');
    }
    setIsOpen(false);
  };

  const actions = getContextualActions();

  return (
    <div className={`fixed bottom-6 right-6 z-1100 ${className}`}>
      {/* Quick Actions Menu */}
      {isOpen && (
        <div className="mb-4 bg-popover border border-border rounded-lg shadow-elevated p-2 min-w-64">
          <div className="space-y-1">
            {actions?.map((action, index) => (
              <button
                key={index}
                onClick={() => handleAction(action)}
                className="w-full flex items-start space-x-3 p-3 rounded-md hover:bg-muted transition-colors duration-200 text-left"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name={action?.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-popover-foreground">
                    {action?.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {action?.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-elevated hover:shadow-interactive transition-all duration-200"
        variant="default"
      >
        <Icon 
          name={isOpen ? "X" : "Zap"} 
          size={20} 
          className="transition-transform duration-200"
        />
      </Button>
      {/* Mobile Swipe Indicator */}
      <div className="md:hidden absolute -top-2 -left-2 w-4 h-4 bg-accent rounded-full animate-pulse" />
    </div>
  );
};

export default QuickActions;