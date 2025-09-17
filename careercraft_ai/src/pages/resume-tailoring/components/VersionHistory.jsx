import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VersionHistory = ({ className = '' }) => {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const mockVersions = [
    {
      id: 1,
      name: "Senior Frontend Developer - TechCorp",
      createdAt: "2025-01-17T10:30:00Z",
      matchScore: 87,
      status: "current",
      changes: [
        "Added TypeScript to skills",
        "Enhanced React experience bullets",
        "Included performance optimization metrics"
      ],
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Solutions"
    },
    {
      id: 2,
      name: "Frontend Developer - StartupXYZ",
      createdAt: "2025-01-16T14:20:00Z",
      matchScore: 82,
      status: "saved",
      changes: [
        "Emphasized startup experience",
        "Added agile methodology keywords",
        "Highlighted full-stack capabilities"
      ],
      jobTitle: "Frontend Developer",
      company: "StartupXYZ"
    },
    {
      id: 3,
      name: "React Developer - WebCorp",
      createdAt: "2025-01-15T09:15:00Z",
      matchScore: 79,
      status: "saved",
      changes: [
        "Focused on React expertise",
        "Added component library experience",
        "Included testing framework knowledge"
      ],
      jobTitle: "React Developer",
      company: "WebCorp"
    },
    {
      id: 4,
      name: "Original Resume",
      createdAt: "2025-01-10T16:45:00Z",
      matchScore: 72,
      status: "original",
      changes: [],
      jobTitle: "Base Resume",
      company: "General"
    }
  ];

  const [versions, setVersions] = useState(mockVersions);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date?.toLocaleDateString();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'current': return { icon: 'Star', color: 'text-warning' };
      case 'saved': return { icon: 'Save', color: 'text-primary' };
      case 'original': return { icon: 'FileText', color: 'text-muted-foreground' };
      default: return { icon: 'File', color: 'text-muted-foreground' };
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const handleVersionAction = (action, versionId) => {
    switch (action) {
      case 'load': console.log('Loading version:', versionId);
        break;
      case 'duplicate':
        const versionToDuplicate = versions?.find(v => v?.id === versionId);
        const newVersion = {
          ...versionToDuplicate,
          id: Date.now(),
          name: `${versionToDuplicate?.name} (Copy)`,
          createdAt: new Date()?.toISOString(),
          status: 'saved'
        };
        setVersions([newVersion, ...versions]);
        break;
      case 'delete':
        setVersions(versions?.filter(v => v?.id !== versionId));
        break;
      case 'export':
        console.log('Exporting version:', versionId);
        break;
      default:
        break;
    }
  };

  const saveCurrentVersion = () => {
    const newVersion = {
      id: Date.now(),
      name: "New Tailored Resume",
      createdAt: new Date()?.toISOString(),
      matchScore: 85,
      status: 'current',
      changes: [
        "Updated based on current edits",
        "Improved keyword matching",
        "Enhanced experience descriptions"
      ],
      jobTitle: "Current Job Application",
      company: "Target Company"
    };
    
    // Update previous current version to saved
    const updatedVersions = versions?.map(v => 
      v?.status === 'current' ? { ...v, status: 'saved' } : v
    );
    
    setVersions([newVersion, ...updatedVersions]);
  };

  return (
    <div className={`bg-card border border-border rounded-lg h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="History" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Version History</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setShowComparison(!showComparison)}>
              <Icon name="GitCompare" size={16} />
            </Button>
            <Button variant="outline" size="sm" onClick={saveCurrentVersion}>
              <Icon name="Save" size={16} />
              <span className="hidden sm:inline ml-2">Save</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {versions?.map((version) => {
            const statusInfo = getStatusIcon(version?.status);
            const isSelected = selectedVersion === version?.id;
            
            return (
              <div
                key={version?.id}
                className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/20 hover:bg-muted/50'
                }`}
                onClick={() => setSelectedVersion(isSelected ? null : version?.id)}
              >
                <div className="space-y-3">
                  {/* Version Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name={statusInfo?.icon} size={16} className={statusInfo?.color} />
                        <h4 className="font-semibold text-foreground truncate">{version?.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{version?.company}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(version?.createdAt)}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-3">
                      <div className="text-right">
                        <div className={`text-sm font-bold ${getScoreColor(version?.matchScore)}`}>
                          {version?.matchScore}%
                        </div>
                        <div className="text-xs text-muted-foreground">match</div>
                      </div>
                      
                      {version?.status === 'current' && (
                        <div className="w-2 h-2 bg-success rounded-full" />
                      )}
                    </div>
                  </div>

                  {/* Changes Summary */}
                  {version?.changes?.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Key Changes
                      </p>
                      <div className="space-y-1">
                        {version?.changes?.slice(0, 2)?.map((change, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Icon name="ArrowRight" size={12} className="text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-muted-foreground">{change}</span>
                          </div>
                        ))}
                        {version?.changes?.length > 2 && (
                          <p className="text-xs text-muted-foreground ml-4">
                            +{version?.changes?.length - 2} more changes
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Expanded Actions */}
                  {isSelected && (
                    <div className="pt-3 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={(e) => {
                            e?.stopPropagation();
                            handleVersionAction('load', version?.id);
                          }}
                        >
                          <Icon name="Upload" size={14} />
                          <span className="ml-1">Load</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e?.stopPropagation();
                            handleVersionAction('duplicate', version?.id);
                          }}
                        >
                          <Icon name="Copy" size={14} />
                          <span className="ml-1">Duplicate</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e?.stopPropagation();
                            handleVersionAction('export', version?.id);
                          }}
                        >
                          <Icon name="Download" size={14} />
                          <span className="ml-1">Export</span>
                        </Button>
                        
                        {version?.status !== 'current' && version?.status !== 'original' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e?.stopPropagation();
                              handleVersionAction('delete', version?.id);
                            }}
                            className="text-error hover:text-error"
                          >
                            <Icon name="Trash2" size={14} />
                            <span className="ml-1">Delete</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{versions?.length} versions saved</span>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={14} />
            <span className="ml-1">Manage</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;