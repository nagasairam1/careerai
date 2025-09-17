import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ResumeEditor = ({ onScoreUpdate, className = '' }) => {
  const [activeSection, setActiveSection] = useState('summary');
  const [isEditing, setIsEditing] = useState(false);
  const [suggestions, setSuggestions] = useState({});

  const mockResumeData = {
    personalInfo: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/sarahjohnson"
    },
    summary: "Frontend Developer with 4 years of experience building responsive web applications using React and modern JavaScript. Passionate about creating intuitive user experiences and writing clean, maintainable code.",
    experience: [
      {
        id: 1,
        title: "Frontend Developer",
        company: "Digital Solutions Inc.",
        duration: "2022 - Present",
        location: "San Francisco, CA",
        bullets: [
          "Developed responsive web applications using React.js and JavaScript",
          "Collaborated with design team to implement user interfaces",
          "Optimized application performance resulting in 30% faster load times",
          "Participated in code reviews and maintained coding standards"
        ],
        suggestions: [
          "Developed and maintained 15+ responsive web applications using React.js, TypeScript, and modern JavaScript ES6+",
          "Collaborated with UX/UI designers to implement pixel-perfect designs, improving user satisfaction by 25%",
          "Optimized application performance through code splitting and lazy loading, achieving 30% faster load times and 40% better Core Web Vitals scores",
          "Led code reviews and established coding standards, reducing bug reports by 35% and improving team productivity"
        ]
      },
      {
        id: 2,
        title: "Junior Web Developer",
        company: "StartupTech",
        duration: "2021 - 2022",
        location: "San Francisco, CA",
        bullets: [
          "Built interactive web components using HTML, CSS, and JavaScript",
          "Worked with REST APIs to integrate frontend with backend services",
          "Assisted in testing and debugging web applications",
          "Contributed to team projects using Git version control"
        ],
        suggestions: [
          "Built 20+ interactive web components using HTML5, CSS3, and vanilla JavaScript, enhancing user engagement",
          "Integrated RESTful APIs and GraphQL endpoints to connect frontend applications with backend services",
          "Implemented comprehensive testing strategies using Jest and React Testing Library, achieving 85% code coverage",
          "Collaborated on team projects using Git version control and Agile methodologies, contributing to 12+ successful releases"
        ]
      }
    ],
    skills: {
      technical: ["JavaScript", "React", "HTML", "CSS", "Git", "REST APIs"],
      suggested: ["TypeScript", "Redux", "Testing", "Webpack", "GraphQL", "AWS"]
    },
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        year: "2021",
        gpa: "3.7"
      }
    ]
  };

  const [resumeData, setResumeData] = useState(mockResumeData);

  const sections = [
    { id: 'summary', label: 'Summary', icon: 'User' },
    { id: 'experience', label: 'Experience', icon: 'Briefcase' },
    { id: 'skills', label: 'Skills', icon: 'Code' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' }
  ];

  const handleBulletSuggestion = (experienceId, bulletIndex, suggestion) => {
    const updatedExperience = resumeData?.experience?.map(exp => {
      if (exp?.id === experienceId) {
        const updatedBullets = [...exp?.bullets];
        updatedBullets[bulletIndex] = suggestion;
        return { ...exp, bullets: updatedBullets };
      }
      return exp;
    });
    
    setResumeData({ ...resumeData, experience: updatedExperience });
    
    // Simulate score update
    const newScore = Math.min(95, Math.floor(Math.random() * 15) + 75);
    onScoreUpdate?.(newScore);
  };

  const addSkill = (skill) => {
    const updatedSkills = {
      ...resumeData?.skills,
      technical: [...resumeData?.skills?.technical, skill],
      suggested: resumeData?.skills?.suggested?.filter(s => s !== skill)
    };
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const generateAlternatives = (bulletIndex, experienceId) => {
    // Simulate AI generating alternatives
    const alternatives = [
      "Enhanced user experience through responsive design implementation",
      "Streamlined development workflow using modern build tools",
      "Improved application accessibility following WCAG guidelines"
    ];
    
    setSuggestions({
      ...suggestions,
      [`${experienceId}-${bulletIndex}`]: alternatives
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Resume Editor</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Eye" size={16} />
              <span className="hidden sm:inline ml-2">Preview</span>
            </Button>
            <Button variant="default" size="sm">
              <Icon name="Download" size={16} />
              <span className="hidden sm:inline ml-2">Export</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Section Navigation */}
      <div className="p-4 border-b border-border">
        <div className="flex space-x-1 overflow-x-auto">
          {sections?.map((section) => (
            <Button
              key={section?.id}
              variant={activeSection === section?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveSection(section?.id)}
              className="flex-shrink-0"
            >
              <Icon name={section?.icon} size={14} />
              <span className="ml-2">{section?.label}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Summary Section */}
        {activeSection === 'summary' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Professional Summary</h3>
              <Button variant="ghost" size="sm">
                <Icon name="Sparkles" size={14} />
                <span className="ml-1">AI Enhance</span>
              </Button>
            </div>
            
            <div className="space-y-3">
              <textarea
                className="w-full p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                rows={4}
                value={resumeData?.summary}
                onChange={(e) => setResumeData({ ...resumeData, summary: e?.target?.value })}
              />
              
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-accent">AI Suggestion</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Senior Frontend Developer with 4+ years of experience building scalable web applications using React.js and TypeScript. Proven track record of optimizing performance and collaborating with cross-functional teams to deliver user-centric solutions."
                    </p>
                    <Button variant="ghost" size="sm" className="mt-2 text-accent">
                      Apply Suggestion
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
              <Button variant="ghost" size="sm">
                <Icon name="Plus" size={14} />
                <span className="ml-1">Add Experience</span>
              </Button>
            </div>

            {resumeData?.experience?.map((exp) => (
              <div key={exp?.id} className="border border-border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{exp?.title}</h4>
                    <p className="text-primary font-medium">{exp?.company}</p>
                    <p className="text-sm text-muted-foreground">{exp?.duration} • {exp?.location}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreHorizontal" size={16} />
                  </Button>
                </div>

                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-foreground">Key Achievements</h5>
                  {exp?.bullets?.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="group relative">
                      <div className="flex items-start space-x-2">
                        <Icon name="Circle" size={6} className="text-muted-foreground mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground leading-relaxed">{bullet}</p>
                          
                          {/* AI Suggestion */}
                          {exp?.suggestions && exp?.suggestions?.[bulletIndex] && (
                            <div className="mt-2 bg-primary/5 border border-primary/20 rounded-md p-2">
                              <div className="flex items-start space-x-2">
                                <Icon name="Sparkles" size={12} className="text-primary mt-0.5" />
                                <div className="flex-1">
                                  <p className="text-xs font-medium text-primary">AI Enhancement</p>
                                  <p className="text-sm text-foreground mt-1">{exp?.suggestions?.[bulletIndex]}</p>
                                  <div className="flex items-center space-x-2 mt-2">
                                    <Button 
                                      variant="ghost" 
                                      size="xs"
                                      onClick={() => handleBulletSuggestion(exp?.id, bulletIndex, exp?.suggestions?.[bulletIndex])}
                                    >
                                      Apply
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="xs"
                                      onClick={() => generateAlternatives(bulletIndex, exp?.id)}
                                    >
                                      More Options
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Icon name="Sparkles" size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Technical Skills</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Current Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData?.skills?.technical?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                  <Icon name="Plus" size={14} className="mr-1" />
                  Suggested Skills to Add
                </h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData?.skills?.suggested?.map((skill, index) => (
                    <button
                      key={index}
                      onClick={() => addSkill(skill)}
                      className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 text-sm rounded-full font-medium hover:bg-accent/20 transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Click to add skills that match the job requirements
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Education Section */}
        {activeSection === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Education</h3>
              <Button variant="ghost" size="sm">
                <Icon name="Plus" size={14} />
                <span className="ml-1">Add Education</span>
              </Button>
            </div>

            {resumeData?.education?.map((edu, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{edu?.degree}</h4>
                    <p className="text-primary font-medium">{edu?.school}</p>
                    <p className="text-sm text-muted-foreground">Graduated {edu?.year} • GPA: {edu?.gpa}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="Edit" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeEditor;