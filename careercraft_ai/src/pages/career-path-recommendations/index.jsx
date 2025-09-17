import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import QuickActions from '../../components/ui/QuickActions';
import CareerPathCard from './components/CareerPathCard';
import ComparisonTool from './components/ComparisonTool';
import MarketTrendsPanel from './components/MarketTrendsPanel';
import FilterPanel from './components/FilterPanel';

const CareerPathRecommendations = () => {
  const location = useLocation();
  const [bookmarkedPaths, setBookmarkedPaths] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showTrends, setShowTrends] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    salaryRange: 'all',
    experienceLevel: 'all',
    industries: [],
    workTypes: [],
    minSkillMatch: 0,
    minGrowthPotential: 0,
    marketDemand: []
  });

  // Mock career path data
  const careerPaths = [
    {
      id: 'senior-frontend-dev',
      title: 'Senior Frontend Developer',
      description: `Lead frontend development initiatives using modern frameworks and technologies. Drive technical decisions and mentor junior developers while building scalable user interfaces.`,
      skillMatch: 87,
      salaryRange: '$85K - $120K',
      growthPotential: 78,
      marketDemand: 'High',
      timeToTransition: '6-12 months',
      keySkills: ['React', 'TypeScript', 'JavaScript', 'CSS/SCSS', 'Redux', 'Webpack', 'Jest', 'Git', 'Responsive Design', 'Performance Optimization'],
      responsibilities: [
        'Lead frontend architecture decisions and technical implementations',
        'Mentor junior developers and conduct code reviews',
        'Collaborate with UX/UI designers to implement pixel-perfect interfaces',
        'Optimize application performance and ensure cross-browser compatibility',
        'Participate in agile development processes and sprint planning'
      ],
      progressionTimeline: [
        { years: '0-1', role: 'Senior Frontend Developer', description: 'Master advanced React patterns and lead small projects' },
        { years: '2-3', role: 'Lead Frontend Developer', description: 'Architect frontend systems and lead development teams' },
        { years: '4-5', role: 'Frontend Engineering Manager', description: 'Manage engineering teams and drive technical strategy' }
      ],
      industryOutlook: `Frontend development continues to evolve rapidly with new frameworks and tools. The demand for senior frontend developers remains strong across all industries, particularly in fintech, healthcare, and e-commerce sectors.`
    },
    {
      id: 'fullstack-engineer',
      title: 'Full Stack Engineer',
      description: `Build end-to-end web applications combining frontend and backend technologies. Work across the entire technology stack to deliver complete solutions.`,
      skillMatch: 92,
      salaryRange: '$90K - $135K',
      growthPotential: 85,
      marketDemand: 'High',
      timeToTransition: '8-15 months',
      keySkills: ['React', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'REST APIs', 'GraphQL', 'CI/CD'],
      responsibilities: [
        'Design and implement full-stack web applications from concept to deployment',
        'Build and maintain RESTful APIs and database schemas',
        'Collaborate with product managers to translate requirements into technical solutions',
        'Implement automated testing and continuous integration pipelines',
        'Monitor application performance and troubleshoot production issues'
      ],
      progressionTimeline: [
        { years: '0-1', role: 'Full Stack Engineer', description: 'Build complete features across frontend and backend' },
        { years: '2-3', role: 'Senior Full Stack Engineer', description: 'Lead complex projects and mentor other developers' },
        { years: '4-6', role: 'Staff Engineer / Tech Lead', description: 'Drive technical vision and architecture decisions' }
      ],
      industryOutlook: `Full stack engineers are highly valued for their versatility and ability to work across the entire technology stack. The role offers excellent career progression opportunities and is in high demand across startups and enterprises.`
    },
    {
      id: 'product-manager',
      title: 'Technical Product Manager',
      description: `Bridge the gap between technical teams and business stakeholders. Drive product strategy and roadmap while understanding technical constraints and opportunities.`,
      skillMatch: 73,
      salaryRange: '$95K - $150K',
      growthPotential: 90,
      marketDemand: 'Medium',
      timeToTransition: '12-18 months',
      keySkills: ['Product Strategy', 'User Research', 'Data Analysis', 'Agile/Scrum', 'Technical Understanding', 'Stakeholder Management', 'Roadmap Planning', 'A/B Testing', 'SQL', 'Analytics Tools'],
      responsibilities: [
        'Define product vision, strategy, and roadmap based on market research and user feedback',
        'Work closely with engineering teams to prioritize features and manage technical debt',
        'Conduct user research and analyze data to inform product decisions',
        'Collaborate with design, marketing, and sales teams to ensure product success',
        'Manage product launches and measure success through key performance indicators'
      ],
      progressionTimeline: [
        { years: '0-1', role: 'Technical Product Manager', description: 'Manage product features and work with engineering teams' },
        { years: '2-3', role: 'Senior Product Manager', description: 'Own entire product areas and drive strategic initiatives' },
        { years: '4-6', role: 'Director of Product', description: 'Lead product organization and set company-wide product strategy' }
      ],
      industryOutlook: `Technical product management is a rapidly growing field as companies recognize the value of product managers who can bridge technical and business domains. The role offers excellent compensation and career growth opportunities.`
    }
  ];

  // Mock market trends data
  const marketTrends = {
    insights: [
      {
        title: 'React Developer Demand Surge',
        description: 'React continues to dominate frontend development with increasing adoption across enterprises',
        growth: 18
      },
      {
        title: 'Full Stack Skills Premium',
        description: 'Companies are paying premium salaries for developers with both frontend and backend expertise',
        growth: 22
      },
      {
        title: 'Remote Work Opportunities',
        description: 'Remote and hybrid positions have increased significantly, offering more flexibility',
        growth: 35
      },
      {
        title: 'AI/ML Integration Growing',
        description: 'Traditional roles are incorporating AI/ML skills, creating new opportunities',
        growth: 28
      }
    ]
  };

  useEffect(() => {
    // Load bookmarked paths from localStorage
    const saved = localStorage.getItem('bookmarkedCareerPaths');
    if (saved) {
      setBookmarkedPaths(JSON.parse(saved));
    }
  }, []);

  const handleBookmark = (pathId) => {
    const newBookmarks = bookmarkedPaths?.includes(pathId)
      ? bookmarkedPaths?.filter(id => id !== pathId)
      : [...bookmarkedPaths, pathId];
    
    setBookmarkedPaths(newBookmarks);
    localStorage.setItem('bookmarkedCareerPaths', JSON.stringify(newBookmarks));
  };

  const handleExploreSkills = (pathId) => {
    // Store selected career path for skill analysis
    localStorage.setItem('selectedCareerPath', pathId);
    window.location.href = '/skill-gap-analysis';
  };

  const handleViewJobs = (pathId) => {
    // Store selected career path for job matching
    localStorage.setItem('selectedCareerPath', pathId);
    window.location.href = '/job-matching';
  };

  const handleViewLearningPath = (pathId) => {
    // Store selected career path for learning roadmap
    localStorage.setItem('selectedCareerPath', pathId);
    window.location.href = '/learning-roadmap';
  };

  const applyFilters = (paths) => {
    return paths?.filter(path => {
      // Salary range filter
      if (filters?.salaryRange && filters?.salaryRange !== 'all') {
        const salaryNum = parseInt(path?.salaryRange?.match(/\$(\d+)K/)?.[1]);
        switch (filters?.salaryRange) {
          case '0-50k':
            if (salaryNum >= 50) return false;
            break;
          case '50k-75k':
            if (salaryNum < 50 || salaryNum >= 75) return false;
            break;
          case '75k-100k':
            if (salaryNum < 75 || salaryNum >= 100) return false;
            break;
          case '100k-150k':
            if (salaryNum < 100 || salaryNum >= 150) return false;
            break;
          case '150k+':
            if (salaryNum < 150) return false;
            break;
        }
      }

      // Skill match filter
      if (filters?.minSkillMatch && path?.skillMatch < filters?.minSkillMatch) {
        return false;
      }

      // Growth potential filter
      if (filters?.minGrowthPotential && path?.growthPotential < filters?.minGrowthPotential) {
        return false;
      }

      // Market demand filter
      if (filters?.marketDemand && filters?.marketDemand?.length > 0) {
        if (!filters?.marketDemand?.includes(path?.marketDemand)) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredCareerPaths = applyFilters(careerPaths);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <Breadcrumbs className="mb-4" />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Career Path Recommendations
                </h1>
                <p className="text-muted-foreground">
                  AI-powered career suggestions tailored to your skills and market demand
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowTrends(!showTrends)}
                  iconName="BarChart3"
                  iconPosition="left"
                >
                  Market Trends
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowComparison(true)}
                  iconName="GitCompare"
                  iconPosition="left"
                >
                  Compare Paths
                </Button>
              </div>
            </div>

            <ProgressIndicator 
              currentStep={1} 
              completedSteps={['resume-upload']} 
              className="mb-6"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onReset={() => setFilters({
                  salaryRange: 'all',
                  experienceLevel: 'all',
                  industries: [],
                  workTypes: [],
                  minSkillMatch: 0,
                  minGrowthPotential: 0,
                  marketDemand: []
                })}
                isOpen={showFilters}
                onToggle={() => setShowFilters(!showFilters)}
                className="sticky top-24"
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Results Summary */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    {filteredCareerPaths?.length} Recommended Path{filteredCareerPaths?.length !== 1 ? 's' : ''}
                  </h2>
                  {filteredCareerPaths?.length !== careerPaths?.length && (
                    <span className="text-sm text-muted-foreground">
                      (filtered from {careerPaths?.length} total)
                    </span>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                  iconName="Filter"
                  iconPosition="left"
                >
                  Filters
                </Button>
              </div>

              {/* Career Path Cards */}
              <div className="space-y-6">
                {filteredCareerPaths?.length > 0 ? (
                  filteredCareerPaths?.map((path) => (
                    <CareerPathCard
                      key={path?.id}
                      careerPath={path}
                      isBookmarked={bookmarkedPaths?.includes(path?.id)}
                      onBookmark={handleBookmark}
                      onExploreSkills={handleExploreSkills}
                      onViewJobs={handleViewJobs}
                      onViewLearningPath={handleViewLearningPath}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No matching career paths</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters to see more recommendations
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setFilters({
                        salaryRange: 'all',
                        experienceLevel: 'all',
                        industries: [],
                        workTypes: [],
                        minSkillMatch: 0,
                        minGrowthPotential: 0,
                        marketDemand: []
                      })}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>

              {/* Market Trends Panel */}
              {showTrends && (
                <MarketTrendsPanel 
                  trends={marketTrends} 
                  className="mt-8"
                />
              )}

              {/* Next Steps */}
              {filteredCareerPaths?.length > 0 && (
                <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Next Steps</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="default"
                      onClick={() => window.location.href = '/skill-gap-analysis'}
                      iconName="Target"
                      iconPosition="left"
                      className="justify-start"
                    >
                      Analyze Skill Gaps
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.location.href = '/learning-roadmap'}
                      iconName="BookOpen"
                      iconPosition="left"
                      className="justify-start"
                    >
                      Create Learning Plan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.location.href = '/job-matching'}
                      iconName="Search"
                      iconPosition="left"
                      className="justify-start"
                    >
                      Find Matching Jobs
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Comparison Tool Modal */}
      {showComparison && (
        <ComparisonTool
          careerPaths={careerPaths}
          onClose={() => setShowComparison(false)}
        />
      )}
      <QuickActions />
    </div>
  );
};

export default CareerPathRecommendations;