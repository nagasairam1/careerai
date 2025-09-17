import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LearningRecommendations = ({ skill, onResourceSelect, onClose }) => {
  const [selectedTab, setSelectedTab] = useState('courses');

  const mockResources = {
    courses: [
      {
        id: 1,
        title: "Complete React Developer Course",
        provider: "Udemy",
        rating: 4.8,
        students: 45000,
        duration: "40 hours",
        price: "$89.99",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
        description: "Master React from basics to advanced concepts with hands-on projects and real-world applications.",
        skills: ["React Hooks", "State Management", "Component Architecture"],
        certificate: true
      },
      {
        id: 2,
        title: "React - The Complete Guide",
        provider: "Coursera",
        rating: 4.7,
        students: 32000,
        duration: "35 hours",
        price: "$49.99",
        level: "Beginner to Advanced",
        image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?w=300&h=200&fit=crop",
        description: "Comprehensive React course covering modern development practices and industry standards.",
        skills: ["JSX", "Components", "Props & State"],
        certificate: true
      },
      {
        id: 3,
        title: "Advanced React Patterns",
        provider: "Pluralsight",
        rating: 4.9,
        students: 18000,
        duration: "25 hours",
        price: "$29.99",
        level: "Advanced",
        image: "https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg?w=300&h=200&fit=crop",
        description: "Deep dive into advanced React patterns, performance optimization, and architectural decisions.",
        skills: ["Render Props", "Higher-Order Components", "Context API"],
        certificate: true
      }
    ],
    tutorials: [
      {
        id: 4,
        title: "React Hooks Tutorial Series",
        provider: "YouTube - Traversy Media",
        rating: 4.6,
        views: "2.1M views",
        duration: "8 hours",
        price: "Free",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
        description: "Complete tutorial series covering all React Hooks with practical examples.",
        skills: ["useState", "useEffect", "Custom Hooks"]
      },
      {
        id: 5,
        title: "React Project Walkthrough",
        provider: "freeCodeCamp",
        rating: 4.8,
        views: "1.5M views",
        duration: "12 hours",
        price: "Free",
        level: "Intermediate",
        image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?w=300&h=200&fit=crop",
        description: "Build real-world React applications from scratch with step-by-step guidance.",
        skills: ["Project Structure", "API Integration", "Deployment"]
      }
    ],
    books: [
      {
        id: 6,
        title: "Learning React: Modern Patterns",
        author: "Alex Banks & Eve Porcello",
        rating: 4.5,
        reviews: 1200,
        pages: 350,
        price: "$39.99",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop",
        description: "Comprehensive guide to modern React development with practical examples and best practices.",
        skills: ["Functional Components", "Hooks", "Testing"]
      },
      {
        id: 7,
        title: "React Design Patterns",
        author: "Michele Bertoli",
        rating: 4.7,
        reviews: 850,
        pages: 280,
        price: "$34.99",
        level: "Advanced",
        image: "https://images.pixabay.com/photo/2015/09/05/21/51/reading-925589_1280.jpg?w=300&h=200&fit=crop",
        description: "Master React design patterns and architectural principles for scalable applications.",
        skills: ["Component Patterns", "State Management", "Performance"]
      }
    ],
    practice: [
      {
        id: 8,
        title: "React Coding Challenges",
        provider: "LeetCode",
        rating: 4.4,
        challenges: 150,
        difficulty: "Mixed",
        price: "Free",
        level: "All Levels",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
        description: "Practice React concepts with coding challenges and interactive exercises.",
        skills: ["Problem Solving", "Algorithm Implementation", "Code Optimization"]
      },
      {
        id: 9,
        title: "React Project Ideas",
        provider: "GitHub",
        rating: 4.6,
        projects: 50,
        difficulty: "Beginner to Advanced",
        price: "Free",
        level: "All Levels",
        image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?w=300&h=200&fit=crop",
        description: "Collection of React project ideas with starter code and implementation guides.",
        skills: ["Project Planning", "Implementation", "Best Practices"]
      }
    ]
  };

  const tabs = [
    { id: 'courses', label: 'Courses', icon: 'BookOpen', count: mockResources?.courses?.length },
    { id: 'tutorials', label: 'Tutorials', icon: 'Play', count: mockResources?.tutorials?.length },
    { id: 'books', label: 'Books', icon: 'Book', count: mockResources?.books?.length },
    { id: 'practice', label: 'Practice', icon: 'Code', count: mockResources?.practice?.length }
  ];

  const ResourceCard = ({ resource, type }) => (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-all duration-200">
      <div className="flex space-x-4">
        <div className="w-20 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={resource?.image}
            alt={resource?.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-foreground text-sm leading-tight">
              {resource?.title}
            </h4>
            <div className="text-right flex-shrink-0 ml-2">
              <div className="text-sm font-medium text-foreground">{resource?.price}</div>
              <div className="text-xs text-muted-foreground">{resource?.level}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
            <span>{resource?.provider || resource?.author}</span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span>{resource?.rating}</span>
            </div>
            <span>
              {resource?.duration || resource?.pages ? 
                `${resource?.duration || resource?.pages + ' pages'}` : 
                `${resource?.students || resource?.views || resource?.reviews || resource?.challenges} ${
                  resource?.students ? 'students' : resource?.views ?'': resource?.reviews ?'reviews' : 'challenges'
                }`
              }
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {resource?.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {resource?.skills?.slice(0, 2)?.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                  {skill}
                </span>
              ))}
              {resource?.skills?.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{resource?.skills?.length - 2} more
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {resource?.certificate && (
                <Icon name="Award" size={14} className="text-success" />
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => onResourceSelect(resource)}
              >
                <Icon name="ExternalLink" size={12} className="mr-1" />
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1200 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={16} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Learning Resources</h2>
              <p className="text-sm text-muted-foreground">Recommended for {skill?.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-1 p-4">
            {tabs?.map(tab => (
              <Button
                key={tab?.id}
                variant={selectedTab === tab?.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedTab(tab?.id)}
                className="flex items-center space-x-2"
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
                <span className="text-xs opacity-70">({tab?.count})</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {mockResources?.[selectedTab]?.map(resource => (
              <ResourceCard
                key={resource?.id}
                resource={resource}
                type={selectedTab}
              />
            ))}
          </div>

          {mockResources?.[selectedTab]?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
              <p className="text-muted-foreground">
                We're working on adding more {selectedTab} for this skill.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Found {mockResources?.[selectedTab]?.length || 0} {selectedTab} for {skill?.name}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => window.location.href = '/learning-roadmap'}>
              Create Learning Plan
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRecommendations;