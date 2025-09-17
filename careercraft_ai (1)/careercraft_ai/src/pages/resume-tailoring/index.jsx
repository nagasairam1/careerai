import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import QuickActions from '../../components/ui/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import JobDetailsPanel from './components/JobDetailsPanel';
import ResumeEditor from './components/ResumeEditor';
import MatchScoreCard from './components/MatchScoreCard';
import VersionHistory from './components/VersionHistory';
import ExportOptions from './components/ExportOptions';

const ResumeTailoringPage = () => {
  const location = useLocation();
  const [currentScore, setCurrentScore] = useState(72);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activePanel, setActivePanel] = useState('editor');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [completedSteps] = useState(['resume-upload', 'career-analysis', 'skill-development']);

  useEffect(() => {
    // Get job data from navigation state if available
    if (location?.state?.selectedJob) {
      setSelectedJob(location?.state?.selectedJob);
    }
  }, [location?.state]);

  const handleScoreUpdate = (newScore) => {
    setCurrentScore(newScore);
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const handleExport = (formats, settings) => {
    console.log('Exporting resume:', { formats, settings });
    // Handle export logic here
  };

  const panelOptions = [
    { id: 'editor', label: 'Resume Editor', icon: 'FileText' },
    { id: 'score', label: 'Match Score', icon: 'Target' },
    { id: 'versions', label: 'Versions', icon: 'History' },
    { id: 'export', label: 'Export', icon: 'Download' }
  ];

  const renderMobilePanel = () => {
    switch (activePanel) {
      case 'score':
        return <MatchScoreCard currentScore={currentScore} onScoreChange={handleScoreUpdate} />;
      case 'versions':
        return <VersionHistory />;
      case 'export':
        return <ExportOptions onExport={handleExport} />;
      default:
        return <ResumeEditor onScoreUpdate={handleScoreUpdate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <Breadcrumbs className="mb-4" />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Resume Tailoring
                </h1>
                <p className="text-muted-foreground">
                  Customize your resume with AI-powered suggestions for better job matching
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Icon name="RotateCcw" size={16} />
                  <span className="ml-2 hidden sm:inline">Reset Changes</span>
                </Button>
                <Button variant="default">
                  <Icon name="Save" size={16} />
                  <span className="ml-2 hidden sm:inline">Save Progress</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator 
            currentStep={5} 
            completedSteps={completedSteps}
            className="mb-6"
          />

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-280px)]">
              {/* Left Panel - Job Details */}
              <div className="col-span-4">
                <JobDetailsPanel 
                  selectedJob={selectedJob}
                  onJobSelect={handleJobSelect}
                  className="h-full"
                />
              </div>

              {/* Center Panel - Resume Editor */}
              <div className="col-span-5">
                <ResumeEditor 
                  onScoreUpdate={handleScoreUpdate}
                  className="h-full"
                />
              </div>

              {/* Right Panel - Tools */}
              <div className="col-span-3 space-y-4">
                <MatchScoreCard 
                  currentScore={currentScore}
                  onScoreChange={handleScoreUpdate}
                />
                <VersionHistory className="flex-1" />
              </div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <JobDetailsPanel 
                selectedJob={selectedJob}
                onJobSelect={handleJobSelect}
                className="h-96"
              />
              <MatchScoreCard 
                currentScore={currentScore}
                onScoreChange={handleScoreUpdate}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <ResumeEditor 
                  onScoreUpdate={handleScoreUpdate}
                  className="h-[600px]"
                />
              </div>
              <div className="space-y-4">
                <VersionHistory className="h-72" />
                <ExportOptions onExport={handleExport} />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Job Details - Collapsible */}
            <div className="mb-4">
              <JobDetailsPanel 
                selectedJob={selectedJob}
                onJobSelect={handleJobSelect}
              />
            </div>

            {/* Panel Navigation */}
            <div className="mb-4">
              <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
                {panelOptions?.map((option) => (
                  <Button
                    key={option?.id}
                    variant={activePanel === option?.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActivePanel(option?.id)}
                    className="flex-shrink-0"
                  >
                    <Icon name={option?.icon} size={14} />
                    <span className="ml-2">{option?.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Active Panel Content */}
            <div className="min-h-[500px]">
              {renderMobilePanel()}
            </div>
          </div>

          {/* Export Modal for Desktop */}
          <div className="hidden lg:block fixed bottom-6 left-6 z-1000">
            <div className="bg-card border border-border rounded-lg shadow-elevated p-4 max-w-sm">
              <ExportOptions onExport={handleExport} />
            </div>
          </div>
        </div>
      </main>
      {/* Quick Actions */}
      <QuickActions />
      {/* Mobile Bottom Actions */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1">
            <Icon name="Eye" size={16} />
            <span className="ml-2">Preview</span>
          </Button>
          <Button variant="default" className="flex-1">
            <Icon name="Download" size={16} />
            <span className="ml-2">Export</span>
          </Button>
        </div>
      </div>
      {/* Mobile Spacing for Bottom Actions */}
      <div className="md:hidden h-20" />
    </div>
  );
};

export default ResumeTailoringPage;