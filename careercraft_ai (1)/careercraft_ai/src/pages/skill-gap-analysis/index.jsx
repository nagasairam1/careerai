import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import QuickActions from '../../components/ui/QuickActions';
import SkillMatrix from './components/SkillMatrix';
import SkillSummary from './components/SkillSummary';
import SkillAssessment from './components/SkillAssessment';
import LearningRecommendations from './components/LearningRecommendations';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SkillGapAnalysis = () => {
  const [selectedCareerPath, setSelectedCareerPath] = useState('Senior Frontend Developer');
  const [activeView, setActiveView] = useState('summary'); // summary, matrix
  const [showAssessment, setShowAssessment] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skills, setSkills] = useState([]);

  // Mock skills data
  const mockSkills = [
    {
      id: 1,
      name: "React.js",
      category: "technical",
      description: "Modern JavaScript library for building user interfaces with component-based architecture",
      current: 3,
      required: 4,
      priority: "high",
      marketDemand: 9,
      learningTime: "3-4 weeks"
    },
    {
      id: 2,
      name: "TypeScript",
      category: "technical",
      description: "Strongly typed programming language that builds on JavaScript",
      current: 2,
      required: 4,
      priority: "high",
      marketDemand: 8,
      learningTime: "4-6 weeks"
    },
    {
      id: 3,
      name: "Node.js",
      category: "technical",
      description: "JavaScript runtime built on Chrome\'s V8 JavaScript engine",
      current: 2,
      required: 3,
      priority: "medium",
      marketDemand: 7,
      learningTime: "2-3 weeks"
    },
    {
      id: 4,
      name: "Leadership",
      category: "soft",
      description: "Ability to guide, influence, and inspire team members toward common goals",
      current: 3,
      required: 4,
      priority: "high",
      marketDemand: 9,
      learningTime: "6-8 weeks"
    },
    {
      id: 5,
      name: "System Design",
      category: "technical",
      description: "Designing scalable and maintainable software architecture",
      current: 2,
      required: 4,
      priority: "high",
      marketDemand: 8,
      learningTime: "8-10 weeks"
    },
    {
      id: 6,
      name: "Communication",
      category: "soft",
      description: "Effective verbal and written communication with stakeholders",
      current: 4,
      required: 4,
      priority: "low",
      marketDemand: 10,
      learningTime: "2-3 weeks"
    },
    {
      id: 7,
      name: "AWS",
      category: "technical",
      description: "Amazon Web Services cloud computing platform",
      current: 1,
      required: 3,
      priority: "medium",
      marketDemand: 8,
      learningTime: "4-6 weeks"
    },
    {
      id: 8,
      name: "Agile Methodology",
      category: "industry",
      description: "Iterative approach to project management and software development",
      current: 3,
      required: 4,
      priority: "medium",
      marketDemand: 7,
      learningTime: "2-3 weeks"
    },
    {
      id: 9,
      name: "GraphQL",
      category: "technical",
      description: "Query language and runtime for APIs",
      current: 1,
      required: 3,
      priority: "low",
      marketDemand: 6,
      learningTime: "3-4 weeks"
    },
    {
      id: 10,
      name: "Problem Solving",
      category: "soft",
      description: "Analytical thinking and creative solution development",
      current: 4,
      required: 4,
      priority: "low",
      marketDemand: 10,
      learningTime: "Ongoing"
    }
  ];

  useEffect(() => {
    setSkills(mockSkills);
  }, []);

  const handleSkillUpdate = (skillId, action) => {
    const skill = skills?.find(s => s?.id === skillId);
    if (!skill) return;

    setSelectedSkill(skill);
    
    if (action === 'assess') {
      setShowAssessment(true);
    } else if (action === 'learn') {
      setShowRecommendations(true);
    }
  };

  const handleAssessmentComplete = (assessmentData) => {
    setSkills(prevSkills => 
      prevSkills?.map(skill => 
        skill?.id === assessmentData?.skillId 
          ? { ...skill, current: assessmentData?.newLevel }
          : skill
      )
    );
    setShowAssessment(false);
    setSelectedSkill(null);
  };

  const handleResourceSelect = (resource) => {
    console.log('Selected resource:', resource);
    // Handle resource selection (e.g., track in learning plan)
  };

  const handleExportReport = () => {
    // Generate and download PDF report
    console.log('Exporting skill gap analysis report...');
  };

  const completedSteps = ['resume-upload', 'career-analysis'];
  const currentStep = 2;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation */}
          <div className="mb-6">
            <Breadcrumbs />
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <ProgressIndicator 
              currentStep={currentStep} 
              completedSteps={completedSteps}
            />
          </div>

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Skill Gap Analysis
                </h1>
                <p className="text-muted-foreground">
                  Identify skill gaps and create your development roadmap for {selectedCareerPath}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant={activeView === 'summary' ? 'default' : 'outline'}
                  onClick={() => setActiveView('summary')}
                  className="flex items-center space-x-2"
                >
                  <Icon name="BarChart3" size={16} />
                  <span>Summary</span>
                </Button>
                <Button
                  variant={activeView === 'matrix' ? 'default' : 'outline'}
                  onClick={() => setActiveView('matrix')}
                  className="flex items-center space-x-2"
                >
                  <Icon name="Grid3X3" size={16} />
                  <span>Skill Matrix</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Career Path Selection */}
          <div className="mb-8 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Target" size={20} className="text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Target Career Path</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Senior Frontend Developer', 'Full Stack Developer', 'Technical Lead']?.map(path => (
                <Button
                  key={path}
                  variant={selectedCareerPath === path ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCareerPath(path)}
                >
                  {path}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {activeView === 'summary' ? (
              <SkillSummary 
                skills={skills}
                selectedCareerPath={selectedCareerPath}
                onExportReport={handleExportReport}
              />
            ) : (
              <SkillMatrix 
                skills={skills}
                selectedCareerPath={selectedCareerPath}
                onSkillUpdate={handleSkillUpdate}
              />
            )}
          </div>

          {/* Navigation Actions */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Previous Step</p>
                <p className="text-sm text-muted-foreground">Career Path Recommendations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/career-path-recommendations'}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Back to Career Paths
              </Button>
              <Button
                onClick={() => window.location.href = '/learning-roadmap'}
              >
                Create Learning Plan
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      {showAssessment && selectedSkill && (
        <SkillAssessment
          skill={selectedSkill}
          onAssessmentComplete={handleAssessmentComplete}
          onClose={() => {
            setShowAssessment(false);
            setSelectedSkill(null);
          }}
        />
      )}
      {showRecommendations && selectedSkill && (
        <LearningRecommendations
          skill={selectedSkill}
          onResourceSelect={handleResourceSelect}
          onClose={() => {
            setShowRecommendations(false);
            setSelectedSkill(null);
          }}
        />
      )}
      <QuickActions />
    </div>
  );
};

export default SkillGapAnalysis;