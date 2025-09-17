import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import QuickActions from '../../components/ui/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoadmapTimeline from './components/RoadmapTimeline';
import LearningFilters from './components/LearningFilters';
import CourseRecommendations from './components/CourseRecommendations';
import ProgressStats from './components/ProgressStats';
import GamificationPanel from './components/GamificationPanel';
import CalendarIntegration from './components/CalendarIntegration';

const LearningRoadmap = () => {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [filters, setFilters] = useState({
    category: 'all',
    timeCommitment: 'all',
    format: 'all',
    difficulty: 'all',
    platform: 'all',
    showCompleted: true,
    sortBy: 'recommended',
    quickFilter: null
  });

  // Mock data for learning roadmap
  const roadmapData = {
    title: "Full Stack Developer Path",
    description: "Complete roadmap to become a proficient full-stack developer with modern technologies",
    totalDuration: "6-8 months",
    difficulty: "Intermediate to Advanced",
    modules: [
      {
        id: 'module-1',
        title: 'JavaScript Fundamentals',
        description: 'Master the core concepts of JavaScript including ES6+ features, async programming, and DOM manipulation.',
        duration: '40 hours',
        difficulty: 'Beginner',
        rating: 4.8,
        progress: 100,
        status: 'completed',
        skills: ['JavaScript', 'ES6+', 'DOM', 'Async/Await', 'Promises']
      },
      {
        id: 'module-2',
        title: 'React Development',
        description: 'Build modern web applications with React, including hooks, context, and state management.',
        duration: '60 hours',
        difficulty: 'Intermediate',
        rating: 4.9,
        progress: 75,
        status: 'in-progress',
        skills: ['React', 'JSX', 'Hooks', 'Context API', 'Component Design']
      },
      {
        id: 'module-3',
        title: 'Node.js & Express',
        description: 'Create robust backend APIs with Node.js, Express, and learn about middleware and authentication.',
        duration: '50 hours',
        difficulty: 'Intermediate',
        rating: 4.7,
        progress: 0,
        status: 'upcoming',
        skills: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Middleware']
      },
      {
        id: 'module-4',
        title: 'Database Design',
        description: 'Learn database fundamentals with MongoDB and PostgreSQL, including schema design and optimization.',
        duration: '35 hours',
        difficulty: 'Intermediate',
        rating: 4.6,
        progress: 0,
        status: 'locked',
        skills: ['MongoDB', 'PostgreSQL', 'Schema Design', 'Query Optimization']
      },
      {
        id: 'module-5',
        title: 'DevOps & Deployment',
        description: 'Deploy applications using Docker, AWS, and learn CI/CD pipelines for production environments.',
        duration: '45 hours',
        difficulty: 'Advanced',
        rating: 4.5,
        progress: 0,
        status: 'locked',
        skills: ['Docker', 'AWS', 'CI/CD', 'Deployment', 'Monitoring']
      }
    ]
  };

  const courseRecommendations = [
    {
      id: 'course-1',
      title: 'Complete React Developer Course',
      description: 'Master React from basics to advanced concepts with hands-on projects and real-world applications.',
      platform: 'Udemy',
      instructor: 'Andrew Mead',
      rating: 4.8,
      reviewCount: 45230,
      duration: 2400, // minutes
      difficulty: 'Intermediate',
      price: 89.99,
      isFree: false,
      enrolledCount: 234567,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      skills: ['React', 'Redux', 'Hooks', 'Context API', 'Testing'],
      prerequisites: ['JavaScript', 'HTML', 'CSS']
    },
    {
      id: 'course-2',
      title: 'Node.js: The Complete Guide',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB from scratch.',
      platform: 'Coursera',
      instructor: 'Maximilian Schwarzmüller',
      rating: 4.9,
      reviewCount: 28945,
      duration: 3000,
      difficulty: 'Intermediate',
      price: 0,
      isFree: true,
      enrolledCount: 156789,
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Authentication'],
      prerequisites: ['JavaScript Basics']
    },
    {
      id: 'course-3',
      title: 'Advanced JavaScript Concepts',
      description: 'Deep dive into advanced JavaScript topics including closures, prototypes, and design patterns.',
      platform: 'LinkedIn',
      instructor: 'Kyle Simpson',
      rating: 4.7,
      reviewCount: 12456,
      duration: 1800,
      difficulty: 'Advanced',
      price: 49.99,
      isFree: false,
      enrolledCount: 89234,
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
      skills: ['Closures', 'Prototypes', 'Design Patterns', 'Performance', 'Memory Management'],
      prerequisites: ['JavaScript Fundamentals']
    },
    {
      id: 'course-4',
      title: 'Database Design Fundamentals',
      description: 'Learn database design principles, normalization, and query optimization techniques.',
      platform: 'edX',
      instructor: 'Stanford University',
      rating: 4.6,
      reviewCount: 8934,
      duration: 2100,
      difficulty: 'Intermediate',
      price: 0,
      isFree: true,
      enrolledCount: 67890,
      thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop',
      skills: ['SQL', 'Database Design', 'Normalization', 'Indexing', 'Query Optimization'],
      prerequisites: ['Basic Programming']
    },
    {
      id: 'course-5',
      title: 'Docker & Kubernetes Mastery',
      description: 'Master containerization and orchestration with Docker and Kubernetes for production deployments.',
      platform: 'Pluralsight',
      instructor: 'Nigel Poulton',
      rating: 4.8,
      reviewCount: 15678,
      duration: 2700,
      difficulty: 'Advanced',
      price: 29.99,
      isFree: false,
      enrolledCount: 45123,
      thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop',
      skills: ['Docker', 'Kubernetes', 'Container Orchestration', 'DevOps', 'Cloud Deployment'],
      prerequisites: ['Linux Basics', 'Command Line']
    },
    {
      id: 'course-6',
      title: 'Full Stack Web Development Bootcamp',
      description: 'Complete bootcamp covering HTML, CSS, JavaScript, React, Node.js, and deployment strategies.',
      platform: 'Udemy',
      instructor: 'Angela Yu',
      rating: 4.9,
      reviewCount: 67890,
      duration: 5400,
      difficulty: 'Beginner',
      price: 129.99,
      isFree: false,
      enrolledCount: 345678,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
      prerequisites: ['None']
    }
  ];

  const progressStats = {
    completedCourses: 3,
    totalCourses: 8,
    hoursLearned: 127,
    totalHours: 280,
    skillsAcquired: 12,
    totalSkills: 25,
    certificates: 2,
    weeklyProgress: 15,
    learningStreak: 7,
    recentAchievements: [
      {
        title: 'Completed React Fundamentals',
        date: '2 days ago'
      },
      {
        title: 'Earned JavaScript Expert Badge',
        date: '1 week ago'
      },
      {
        title: '30-day Learning Streak',
        date: '2 weeks ago'
      }
    ]
  };

  const gamificationData = {
    level: 5,
    currentXP: 2750,
    nextLevelXP: 3000,
    totalBadges: 12,
    currentStreak: 7,
    rank: 1247,
    badges: [
      {
        id: 'first-course',
        name: 'First Steps',
        description: 'Complete your first course',
        type: 'first-course',
        category: 'learning',
        rarity: 'common',
        earned: true,
        earnedDate: '2024-08-15'
      },
      {
        id: 'course-completion',
        name: 'Course Master',
        description: 'Complete 5 courses',
        type: 'course-completion',
        category: 'learning',
        rarity: 'rare',
        earned: true,
        earnedDate: '2024-09-10'
      },
      {
        id: 'skill-master',
        name: 'Skill Collector',
        description: 'Master 10 different skills',
        type: 'skill-master',
        category: 'skills',
        rarity: 'epic',
        earned: false,
        progress: 7,
        target: 10
      },
      {
        id: 'learning-streak',
        name: 'Consistency King',
        description: 'Maintain a 30-day learning streak',
        type: 'learning-streak',
        category: 'consistency',
        rarity: 'legendary',
        earned: false,
        progress: 7,
        target: 30
      },
      {
        id: 'early-bird',
        name: 'Early Bird',
        description: 'Complete 10 morning sessions',
        type: 'early-bird',
        category: 'consistency',
        rarity: 'rare',
        earned: true,
        earnedDate: '2024-09-05'
      },
      {
        id: 'certificate',
        name: 'Certified Professional',
        description: 'Earn 3 certificates',
        type: 'certificate',
        category: 'learning',
        rarity: 'epic',
        earned: false,
        progress: 2,
        target: 3
      }
    ],
    recentMilestones: [
      {
        title: 'Completed React Module',
        date: 'Today',
        xp: 250
      },
      {
        title: 'Weekly Goal Achieved',
        date: 'Yesterday',
        xp: 100
      },
      {
        title: 'Perfect Quiz Score',
        date: '2 days ago',
        xp: 50
      }
    ]
  };

  const [scheduledSessions, setScheduledSessions] = useState([
    {
      id: '1',
      date: '2024-09-18',
      time: '10:00',
      duration: 60,
      course: 'react-fundamentals',
      status: 'scheduled'
    },
    {
      id: '2',
      date: '2024-09-19',
      time: '14:00',
      duration: 90,
      course: 'javascript-advanced',
      status: 'scheduled'
    },
    {
      id: '3',
      date: '2024-09-15',
      time: '09:00',
      duration: 60,
      course: 'data-structures',
      status: 'completed'
    }
  ]);

  const handleModuleClick = (module) => {
    console.log('Module clicked:', module);
    // Handle module navigation or modal opening
  };

  const handleReorderModule = (draggedId, targetId) => {
    console.log('Reorder modules:', draggedId, 'to', targetId);
    // Handle module reordering logic
  };

  const handleEnrollClick = (course) => {
    console.log('Enroll in course:', course);
    // Handle course enrollment
    window.open(`https://example.com/enroll/${course?.id}`, '_blank');
  };

  const handleScheduleSession = (session) => {
    setScheduledSessions([...scheduledSessions, session]);
  };

  const handleUpdateSession = (sessionId, status) => {
    setScheduledSessions(sessions =>
      sessions?.map(session =>
        session?.id === sessionId ? { ...session, status } : session
      )
    );
  };

  const filteredCourses = courseRecommendations?.filter(course => {
    if (filters?.category !== 'all') {
      const categoryMatch = course?.skills?.some(skill => 
        skill?.toLowerCase()?.includes(filters?.category?.toLowerCase())
      );
      if (!categoryMatch) return false;
    }
    
    if (filters?.difficulty !== 'all' && course?.difficulty?.toLowerCase() !== filters?.difficulty) {
      return false;
    }
    
    if (filters?.platform !== 'all' && course?.platform?.toLowerCase() !== filters?.platform) {
      return false;
    }
    
    return true;
  });

  const tabs = [
    { id: 'roadmap', label: 'Learning Path', icon: 'Route' },
    { id: 'courses', label: 'Courses', icon: 'BookOpen' },
    { id: 'progress', label: 'Progress', icon: 'BarChart3' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <Breadcrumbs className="mb-4" />
            <ProgressIndicator currentStep={2} completedSteps={['resume-upload', 'career-analysis']} className="mb-6" />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-foreground mb-2">Learning Roadmap</h1>
                <p className="text-muted-foreground">
                  Your personalized learning path to achieve your career goals
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export Plan
                </Button>
                <Button variant="default" iconName="Settings" iconPosition="left">
                  Customize
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'roadmap' && (
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3">
                  <div className="bg-card border border-border rounded-lg p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-2">
                          {roadmapData?.title}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                          {roadmapData?.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-semibold text-foreground">{roadmapData?.totalDuration}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Target" size={14} />
                        <span>{roadmapData?.difficulty}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="BookOpen" size={14} />
                        <span>{roadmapData?.modules?.length} Modules</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>12,450 learners</span>
                      </span>
                    </div>
                  </div>
                  
                  <RoadmapTimeline
                    roadmapData={roadmapData}
                    onModuleClick={handleModuleClick}
                    onReorderModule={handleReorderModule}
                  />
                </div>
                
                <div className="space-y-6">
                  <ProgressStats stats={progressStats} />
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-6">
                <LearningFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                />
                <CourseRecommendations
                  courses={filteredCourses}
                  onEnrollClick={handleEnrollClick}
                />
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ProgressStats stats={progressStats} />
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Learning Analytics</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Average Session Duration</span>
                      <span className="font-medium text-foreground">1.2 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="font-medium text-foreground">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Most Active Day</span>
                      <span className="font-medium text-foreground">Wednesday</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Preferred Learning Time</span>
                      <span className="font-medium text-foreground">Evening</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <GamificationPanel gamificationData={gamificationData} />
            )}

            {activeTab === 'schedule' && (
              <CalendarIntegration
                scheduledSessions={scheduledSessions}
                onScheduleSession={handleScheduleSession}
                onUpdateSession={handleUpdateSession}
              />
            )}
          </div>
        </div>
      </main>
      <QuickActions />
    </div>
  );
};

export default LearningRoadmap;