import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import QuickActions from '../../components/ui/QuickActions';
import JobCard from './components/JobCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import JobDetailsModal from './components/JobDetailsModal';
import MarketInsights from './components/MarketInsights';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const JobMatching = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: 'all',
    salaryMin: '',
    salaryMax: '',
    companySize: 'all',
    experienceLevel: 'all',
    jobTypes: [],
    remoteOnly: false,
    postedWithin: 'all'
  });
  const [sortBy, setSortBy] = useState('match');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salaryRange: "$120,000 - $160,000",
      experienceLevel: "Senior Level",
      jobType: "Full-time",
      matchPercentage: 92,
      competition: "Medium",
      isNew: true,
      isRemote: true,
      postedDate: "2 days ago",
      matchedSkills: ["React", "JavaScript", "TypeScript", "CSS", "HTML", "Node.js"],
      missingSkills: ["GraphQL", "Docker"],
      requiredSkills: ["React", "JavaScript", "TypeScript", "CSS", "HTML", "Node.js", "GraphQL", "Docker"],
      requirements: [
        "5+ years of experience with React and modern JavaScript",
        "Strong understanding of TypeScript and ES6+",
        "Experience with state management libraries (Redux, Context API)",
        "Knowledge of responsive design and CSS frameworks",
        "Familiarity with testing frameworks (Jest, React Testing Library)"
      ],
      description: `We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using React and modern JavaScript technologies. The ideal candidate will have strong problem-solving skills and experience working in an agile environment.\n\nYou will work closely with our design and backend teams to deliver high-quality user experiences. We offer competitive compensation, comprehensive benefits, and opportunities for professional growth.`,
      companySize: "201-500",
      companyDescription: "TechCorp Inc. is a leading technology company focused on building innovative solutions for modern businesses. We pride ourselves on our collaborative culture and commitment to excellence.",
      isSaved: false
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLabs",
      location: "New York, NY",
      salaryRange: "$110,000 - $140,000",
      experienceLevel: "Mid Level",
      jobType: "Full-time",
      matchPercentage: 85,
      competition: "High",
      isNew: false,
      isRemote: false,
      postedDate: "1 week ago",
      matchedSkills: ["Product Strategy", "User Research", "Analytics", "Agile"],
      missingSkills: ["SQL", "A/B Testing", "Wireframing"],
      requiredSkills: ["Product Strategy", "User Research", "Analytics", "Agile", "SQL", "A/B Testing", "Wireframing"],
      requirements: [
        "3+ years of product management experience",
        "Strong analytical and problem-solving skills",
        "Experience with user research and data analysis",
        "Knowledge of agile development methodologies",
        "Excellent communication and leadership skills"
      ],
      description: `Join our product team as a Product Manager where you'll drive the strategy and execution of our core products. You'll work with cross-functional teams to identify opportunities, define requirements, and deliver solutions that delight our customers.\n\nWe're looking for someone who is passionate about building great products and has experience working with engineering, design, and marketing teams.`,
      companySize: "51-200",
      companyDescription: "InnovateLabs is a fast-growing startup focused on developing cutting-edge solutions for the healthcare industry.",
      isSaved: true
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "DesignStudio Pro",
      location: "Austin, TX",
      salaryRange: "$85,000 - $110,000",
      experienceLevel: "Mid Level",
      jobType: "Full-time",
      matchPercentage: 78,
      competition: "Low",
      isNew: true,
      isRemote: true,
      postedDate: "3 days ago",
      matchedSkills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      missingSkills: ["Adobe XD", "After Effects", "Sketch"],
      requiredSkills: ["Figma", "User Research", "Prototyping", "Design Systems", "Adobe XD", "After Effects", "Sketch"],
      requirements: [
        "3+ years of UX/UI design experience",
        "Proficiency in Figma and design systems",
        "Strong portfolio demonstrating user-centered design",
        "Experience with user research and usability testing",
        "Knowledge of accessibility standards and best practices"
      ],
      description: `We're seeking a talented UX/UI Designer to join our creative team. You'll be responsible for designing intuitive and engaging user experiences across our digital products. The role involves collaborating with product managers, developers, and stakeholders to create designs that solve real user problems.\n\nYou'll have the opportunity to work on diverse projects and contribute to our design system while mentoring junior designers.`,
      companySize: "11-50",
      companyDescription: "DesignStudio Pro is a creative agency specializing in digital product design and brand experiences for innovative companies.",
      isSaved: false
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "DataTech Solutions",
      location: "Seattle, WA",
      salaryRange: "$130,000 - $170,000",
      experienceLevel: "Senior Level",
      jobType: "Full-time",
      matchPercentage: 71,
      competition: "Medium",
      isNew: false,
      isRemote: true,
      postedDate: "5 days ago",
      matchedSkills: ["Python", "Machine Learning", "Statistics", "SQL"],
      missingSkills: ["TensorFlow", "AWS", "Spark", "R"],
      requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL", "TensorFlow", "AWS", "Spark", "R"],
      requirements: [
        "5+ years of experience in data science or related field",
        "Strong programming skills in Python and R",
        "Experience with machine learning frameworks",
        "Knowledge of statistical analysis and modeling",
        "Experience with cloud platforms (AWS, GCP, or Azure)"
      ],
      description: `Join our data science team to help drive data-driven decision making across the organization. You'll work on challenging problems involving large datasets, build predictive models, and create insights that directly impact business outcomes.\n\nWe're looking for someone with strong technical skills and the ability to communicate complex findings to non-technical stakeholders.`,
      companySize: "501-1000",
      companyDescription: "DataTech Solutions provides advanced analytics and AI solutions to enterprise clients across various industries.",
      isSaved: false
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudFirst Inc.",
      location: "Remote",
      salaryRange: "$115,000 - $145,000",
      experienceLevel: "Mid Level",
      jobType: "Full-time",
      matchPercentage: 68,
      competition: "High",
      isNew: true,
      isRemote: true,
      postedDate: "1 day ago",
      matchedSkills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      missingSkills: ["Terraform", "Ansible", "Monitoring"],
      requiredSkills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Ansible", "Monitoring"],
      requirements: [
        "3+ years of DevOps or infrastructure experience",
        "Strong knowledge of containerization and orchestration",
        "Experience with cloud platforms (AWS, GCP, or Azure)",
        "Proficiency in infrastructure as code tools",
        "Understanding of monitoring and logging solutions"
      ],
      description: `We're looking for a DevOps Engineer to help scale our infrastructure and improve our deployment processes. You'll work with development teams to implement CI/CD pipelines, manage cloud infrastructure, and ensure system reliability.\n\nThis is a great opportunity to work with cutting-edge technologies and contribute to our platform's growth.`,
      companySize: "101-500",
      companyDescription: "CloudFirst Inc. is a cloud-native company providing scalable solutions for modern businesses.",
      isSaved: true
    },
    {
      id: 6,
      title: "Marketing Manager",
      company: "GrowthCo",
      location: "Chicago, IL",
      salaryRange: "$75,000 - $95,000",
      experienceLevel: "Mid Level",
      jobType: "Full-time",
      matchPercentage: 62,
      competition: "Medium",
      isNew: false,
      isRemote: false,
      postedDate: "1 week ago",
      matchedSkills: ["Digital Marketing", "Content Strategy", "Analytics", "SEO"],
      missingSkills: ["PPC", "Marketing Automation", "Social Media"],
      requiredSkills: ["Digital Marketing", "Content Strategy", "Analytics", "SEO", "PPC", "Marketing Automation", "Social Media"],
      requirements: [
        "3+ years of digital marketing experience",
        "Strong understanding of SEO and content marketing",
        "Experience with marketing analytics and reporting",
        "Knowledge of social media marketing strategies",
        "Excellent written and verbal communication skills"
      ],
      description: `Join our marketing team as a Marketing Manager where you'll develop and execute comprehensive marketing strategies to drive growth. You'll manage campaigns across multiple channels, analyze performance metrics, and collaborate with sales and product teams.\n\nWe're looking for a creative and analytical marketer who can think strategically while executing tactically.`,
      companySize: "51-200",
      companyDescription: "GrowthCo is a marketing agency helping B2B companies accelerate their growth through data-driven strategies.",
      isSaved: false
    }
  ];

  // Mock market insights data
  const marketInsights = {
    averageSalary: "$118,500",
    salaryTrend: "up",
    salaryChange: "+5.2%",
    totalOpenings: "2,847",
    openingsTrend: "up",
    openingsChange: "+127",
    competitionLevel: "Medium",
    applicantsPerJob: "23",
    averageHiringTime: "18 days",
    topSkills: [
      { name: "React", growth: 15 },
      { name: "Python", growth: 12 },
      { name: "AWS", growth: 18 },
      { name: "TypeScript", growth: 22 },
      { name: "Docker", growth: 14 }
    ],
    tip: "Jobs with \'React\' and \'TypeScript\' skills are seeing 25% faster hiring times. Consider highlighting these skills in your applications."
  };

  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  // Initialize saved jobs from mock data
  useEffect(() => {
    const initialSavedJobs = new Set(mockJobs.filter(job => job.isSaved).map(job => job.id));
    setSavedJobs(initialSavedJobs);
  }, []);

  // Filter and sort jobs
  useEffect(() => {
    let filtered = [...mockJobs];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(job =>
        job?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        job?.company?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        job?.matchedSkills?.some(skill => skill?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply filters
    if (filters?.location !== 'all') {
      if (filters?.location === 'remote') {
        filtered = filtered?.filter(job => job?.isRemote);
      } else {
        filtered = filtered?.filter(job => job?.location?.toLowerCase()?.includes(filters?.location?.replace('-', ' ')));
      }
    }

    if (filters?.salaryMin) {
      filtered = filtered?.filter(job => {
        const minSalary = parseInt(job?.salaryRange?.replace(/[^0-9]/g, ''));
        return minSalary >= parseInt(filters?.salaryMin);
      });
    }

    if (filters?.remoteOnly) {
      filtered = filtered?.filter(job => job?.isRemote);
    }

    if (filters?.jobTypes?.length > 0) {
      filtered = filtered?.filter(job => 
        filters?.jobTypes?.some(type => job?.jobType?.toLowerCase()?.includes(type?.replace('-', ' ')))
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'match':
          aValue = a?.matchPercentage;
          bValue = b?.matchPercentage;
          break;
        case 'salary':
          aValue = parseInt(a?.salaryRange?.replace(/[^0-9]/g, ''));
          bValue = parseInt(b?.salaryRange?.replace(/[^0-9]/g, ''));
          break;
        case 'date':
          aValue = new Date(a.postedDate);
          bValue = new Date(b.postedDate);
          break;
        case 'company':
          aValue = a?.company;
          bValue = b?.company;
          break;
        default:
          aValue = a?.matchPercentage;
          bValue = b?.matchPercentage;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredJobs(filtered);
  }, [searchQuery, filters, sortBy, sortOrder]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      location: 'all',
      salaryMin: '',
      salaryMax: '',
      companySize: 'all',
      experienceLevel: 'all',
      jobTypes: [],
      remoteOnly: false,
      postedWithin: 'all'
    });
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleSaveJob = (jobId, isSaved) => {
    const newSavedJobs = new Set(savedJobs);
    if (isSaved) {
      newSavedJobs?.add(jobId);
    } else {
      newSavedJobs?.delete(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  const handleTailorResume = (job) => {
    navigate('/resume-tailoring', { state: { selectedJob: job } });
  };

  const handleApply = (job) => {
    window.open(`https://careers.${job?.company?.toLowerCase()?.replace(/\s+/g, '')}.com`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <Breadcrumbs className="mb-4" />
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Job Matching</h1>
                <p className="text-muted-foreground">
                  Discover AI-curated job opportunities that match your skills and career goals
                </p>
              </div>
              <div className="hidden lg:block">
                <ProgressIndicator currentStep={3} completedSteps={['resume-upload', 'career-analysis', 'skill-development']} />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearch={handleSearch}
            />
          </div>

          {/* Market Insights */}
          <div className="mb-6">
            <MarketInsights insights={marketInsights} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                totalResults={filteredJobs?.length}
              />

              {/* Job Listings */}
              {filteredJobs?.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 xl:grid-cols-2' :'grid-cols-1'
                }`}>
                  {filteredJobs?.map((job) => (
                    <JobCard
                      key={job?.id}
                      job={{ ...job, isSaved: savedJobs?.has(job?.id) }}
                      onSave={handleSaveJob}
                      onViewDetails={handleViewDetails}
                      onTailorResume={handleTailorResume}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters to find more opportunities.
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Load More */}
              {filteredJobs?.length > 0 && (
                <div className="text-center pt-6">
                  <Button variant="outline" className="px-8">
                    Load More Jobs
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJob}
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        onTailorResume={handleTailorResume}
        onApply={handleApply}
      />
      <QuickActions />
    </div>
  );
};

export default JobMatching;