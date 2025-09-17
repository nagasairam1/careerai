import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobDetailsPanel = ({ selectedJob, onJobSelect, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const mockJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      postedDate: "2025-01-15",
      description: `We are seeking a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern JavaScript frameworks and ensuring optimal user experience across all devices.

Key Responsibilities:
• Develop and maintain responsive web applications using React.js and TypeScript
• Collaborate with UX/UI designers to implement pixel-perfect designs
• Optimize applications for maximum speed and scalability
• Write clean, maintainable, and well-documented code
• Participate in code reviews and mentor junior developers
• Stay up-to-date with emerging technologies and industry trends`,
      requirements: [
        "5+ years of experience in frontend development",
        "Expert knowledge of React.js, JavaScript, and TypeScript",
        "Strong understanding of HTML5, CSS3, and responsive design",
        "Experience with state management libraries (Redux, Context API)",
        "Proficiency with version control systems (Git)",
        "Knowledge of testing frameworks (Jest, React Testing Library)",
        "Experience with build tools (Webpack, Vite)",
        "Understanding of RESTful APIs and GraphQL",
        "Bachelor\'s degree in Computer Science or related field"
      ],
      preferredSkills: [
        "Next.js framework experience",
        "AWS or cloud platform knowledge",
        "UI/UX design principles",
        "Agile development methodologies",
        "Performance optimization techniques"
      ],
      keywords: ["React", "TypeScript", "JavaScript", "Frontend", "HTML", "CSS", "Redux", "Git", "Testing", "API"]
    }
  ];

  const currentJob = selectedJob || mockJobs?.[0];

  const highlightKeywords = (text, keywords) => {
    if (!keywords || keywords?.length === 0) return text;
    
    let highlightedText = text;
    keywords?.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText?.replace(regex, `<mark class="bg-primary/20 text-primary px-1 rounded">$&</mark>`);
    });
    
    return highlightedText;
  };

  return (
    <div className={`bg-card border border-border rounded-lg h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Target Job</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden"
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Search" size={16} />
              <span className="hidden sm:inline ml-2">Change Job</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className={`flex-1 overflow-y-auto ${!isExpanded ? 'hidden md:block' : ''}`}>
        <div className="p-4 space-y-4">
          {/* Job Header */}
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-bold text-foreground">{currentJob?.title}</h3>
              <p className="text-primary font-medium">{currentJob?.company}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{currentJob?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{currentJob?.type}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="DollarSign" size={14} />
                <span>{currentJob?.salary}</span>
              </div>
            </div>
          </div>

          {/* Match Score */}
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Current Match Score</span>
              <span className="text-lg font-bold text-warning">72%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div className="bg-warning h-2 rounded-full transition-all duration-300" style={{ width: '72%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Improve your match by highlighting relevant skills and experience
            </p>
          </div>

          {/* Keywords */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
              <Icon name="Hash" size={14} className="mr-1" />
              Key Requirements
            </h4>
            <div className="flex flex-wrap gap-1">
              {currentJob?.keywords?.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Job Description</h4>
            <div 
              className="text-sm text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: highlightKeywords(currentJob?.description, currentJob?.keywords) 
              }}
            />
          </div>

          {/* Requirements */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Required Qualifications</h4>
            <ul className="space-y-1">
              {currentJob?.requirements?.map((req, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span 
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightKeywords(req, currentJob?.keywords) 
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Preferred Skills */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Preferred Skills</h4>
            <ul className="space-y-1">
              {currentJob?.preferredSkills?.map((skill, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <Icon name="Plus" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  <span 
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightKeywords(skill, currentJob?.keywords) 
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPanel;