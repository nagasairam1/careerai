import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MatchScoreCard = ({ currentScore = 72, targetScore = 85, onScoreChange, className = '' }) => {
  const [animatedScore, setAnimatedScore] = useState(currentScore);
  const [improvements, setImprovements] = useState([]);

  const mockImprovements = [
    {
      id: 1,
      category: "Keywords",
      suggestion: "Add \'TypeScript\' to your skills section",
      impact: "+5%",
      priority: "high",
      completed: false
    },
    {
      id: 2,
      category: "Experience",
      suggestion: "Quantify your achievements with specific metrics",
      impact: "+8%",
      priority: "high",
      completed: false
    },
    {
      id: 3,
      category: "Skills",
      suggestion: "Include \'Redux\' and \'Testing\' in technical skills",
      impact: "+4%",
      priority: "medium",
      completed: true
    },
    {
      id: 4,
      category: "Format",
      suggestion: "Use action verbs to start bullet points",
      impact: "+3%",
      priority: "medium",
      completed: false
    },
    {
      id: 5,
      category: "Relevance",
      suggestion: "Emphasize frontend development experience",
      impact: "+6%",
      priority: "high",
      completed: false
    }
  ];

  useEffect(() => {
    setImprovements(mockImprovements);
  }, []);

  useEffect(() => {
    // Animate score changes
    const timer = setTimeout(() => {
      setAnimatedScore(currentScore);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentScore]);

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 85) return 'bg-success';
    if (score >= 70) return 'bg-warning';
    return 'bg-error';
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return { icon: 'AlertTriangle', color: 'text-error' };
      case 'medium': return { icon: 'AlertCircle', color: 'text-warning' };
      default: return { icon: 'Info', color: 'text-muted-foreground' };
    }
  };

  const toggleImprovement = (id) => {
    const updatedImprovements = improvements?.map(imp => {
      if (imp?.id === id) {
        const newCompleted = !imp?.completed;
        if (newCompleted) {
          // Simulate score increase
          const newScore = Math.min(95, currentScore + parseInt(imp?.impact?.replace('%', '')?.replace('+', '')));
          onScoreChange?.(newScore);
        }
        return { ...imp, completed: newCompleted };
      }
      return imp;
    });
    setImprovements(updatedImprovements);
  };

  const completedCount = improvements?.filter(imp => imp?.completed)?.length;
  const totalCount = improvements?.length;

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Match Analysis</h3>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {/* Score Display */}
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-3">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - animatedScore / 100)}`}
                className={`transition-all duration-1000 ${getScoreColor(animatedScore)?.replace('text-', 'text-')}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold ${getScoreColor(animatedScore)}`}>
                {Math.round(animatedScore)}%
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Current Match Score</p>
            <p className="text-xs text-muted-foreground">
              Target: {targetScore}% • {targetScore - animatedScore > 0 ? `${targetScore - animatedScore}% to go` : 'Target achieved!'}
            </p>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Improvements</span>
            <span className="text-sm text-muted-foreground">{completedCount}/{totalCount}</span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Improvement Suggestions */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Recommended Actions</h4>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {improvements?.map((improvement) => {
              const priorityInfo = getPriorityIcon(improvement?.priority);
              
              return (
                <div
                  key={improvement?.id}
                  className={`border rounded-lg p-3 transition-all duration-200 ${
                    improvement?.completed 
                      ? 'border-success/20 bg-success/5' :'border-border hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleImprovement(improvement?.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        improvement?.completed
                          ? 'bg-success border-success text-success-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {improvement?.completed && <Icon name="Check" size={12} />}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name={priorityInfo?.icon} size={14} className={priorityInfo?.color} />
                        <span className="text-xs font-medium text-primary uppercase tracking-wide">
                          {improvement?.category}
                        </span>
                        <span className="text-xs font-semibold text-accent">
                          {improvement?.impact}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        improvement?.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                      }`}>
                        {improvement?.suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="BarChart3" size={14} />
            <span className="ml-2">Detailed Analysis</span>
          </Button>
          <Button variant="default" size="sm" className="flex-1">
            <Icon name="Sparkles" size={14} />
            <span className="ml-2">Auto-Optimize</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchScoreCard;