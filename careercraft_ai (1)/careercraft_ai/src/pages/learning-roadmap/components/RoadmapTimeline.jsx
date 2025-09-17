import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoadmapTimeline = ({ roadmapData, onModuleClick, onReorderModule, className = '' }) => {
  const [draggedModule, setDraggedModule] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'in-progress':
        return 'bg-primary text-primary-foreground';
      case 'locked':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-card text-card-foreground border-2 border-dashed border-border';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-success bg-success/10';
      case 'Intermediate':
        return 'text-warning bg-warning/10';
      case 'Advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const handleDragStart = (e, moduleId) => {
    setDraggedModule(moduleId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetModuleId) => {
    e?.preventDefault();
    if (draggedModule && draggedModule !== targetModuleId) {
      onReorderModule(draggedModule, targetModuleId);
    }
    setDraggedModule(null);
  };

  return (
    <div className={`${className}`}>
      {/* Desktop Timeline View */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-8">
            {roadmapData?.modules?.map((module, index) => (
              <div
                key={module.id}
                className="relative flex items-start space-x-6"
                draggable={module.status !== 'locked'}
                onDragStart={(e) => handleDragStart(e, module.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, module.id)}
              >
                {/* Timeline Node */}
                <div className={`
                  relative z-10 w-16 h-16 rounded-full flex items-center justify-center
                  ${getStatusColor(module.status)} shadow-elevated
                `}>
                  {module.status === 'completed' ? (
                    <Icon name="Check" size={24} />
                  ) : module.status === 'in-progress' ? (
                    <Icon name="Play" size={24} />
                  ) : module.status === 'locked' ? (
                    <Icon name="Lock" size={24} />
                  ) : (
                    <Icon name="Circle" size={24} />
                  )}
                </div>

                {/* Module Card */}
                <div className="flex-1 bg-card border border-border rounded-lg p-6 shadow-elevated hover:shadow-interactive transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {module.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {module.description}
                      </p>
                      
                      {/* Module Meta */}
                      <div className="flex items-center space-x-4 text-xs">
                        <span className={`px-2 py-1 rounded-full ${getDifficultyColor(module.difficulty)}`}>
                          {module.difficulty}
                        </span>
                        <span className="flex items-center space-x-1 text-muted-foreground">
                          <Icon name="Clock" size={12} />
                          <span>{module.duration}</span>
                        </span>
                        <span className="flex items-center space-x-1 text-muted-foreground">
                          <Icon name="Star" size={12} />
                          <span>{module.rating}/5</span>
                        </span>
                      </div>
                    </div>

                    {/* Progress Circle */}
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - module.progress / 100)}`}
                          className="text-primary transition-all duration-300"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-foreground">
                          {module.progress}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills & Outcomes */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Skills You'll Learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {module.skills?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {module.status === 'completed' && (
                        <span className="flex items-center space-x-1 text-success text-sm">
                          <Icon name="CheckCircle" size={16} />
                          <span>Completed</span>
                        </span>
                      )}
                      {module.status === 'in-progress' && (
                        <span className="flex items-center space-x-1 text-primary text-sm">
                          <Icon name="PlayCircle" size={16} />
                          <span>In Progress</span>
                        </span>
                      )}
                    </div>
                    
                    <Button
                      variant={module.status === 'locked' ? 'ghost' : 'default'}
                      size="sm"
                      disabled={module.status === 'locked'}
                      onClick={() => onModuleClick(module)}
                    >
                      {module.status === 'completed' ? 'Review' : 
                       module.status === 'in-progress' ? 'Continue' : 
                       module.status === 'locked' ? 'Locked' : 'Start'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {roadmapData?.modules?.map((module, index) => (
          <div
            key={module.id}
            className="bg-card border border-border rounded-lg p-4 shadow-elevated"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${getStatusColor(module.status)}
              `}>
                {module.status === 'completed' ? (
                  <Icon name="Check" size={16} />
                ) : module.status === 'in-progress' ? (
                  <Icon name="Play" size={16} />
                ) : module.status === 'locked' ? (
                  <Icon name="Lock" size={16} />
                ) : (
                  <Icon name="Circle" size={16} />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {module.title}
                </h3>
                <p className="text-muted-foreground text-xs mb-2 line-clamp-2">
                  {module.description}
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{module.progress}% complete</span>
                  <span className="text-muted-foreground">{module.duration}</span>
                </div>
              </div>
            </div>

            <Button
              variant={module.status === 'locked' ? 'ghost' : 'default'}
              size="sm"
              fullWidth
              disabled={module.status === 'locked'}
              onClick={() => onModuleClick(module)}
            >
              {module.status === 'completed' ? 'Review' : 
               module.status === 'in-progress' ? 'Continue' : 
               module.status === 'locked' ? 'Locked' : 'Start'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;