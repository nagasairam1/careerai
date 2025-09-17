import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Upload Resume',
      path: '/resume-upload',
      icon: 'Upload',
      tooltip: 'Upload and analyze your resume'
    },
    {
      label: 'Explore Careers',
      path: '/career-path-recommendations',
      icon: 'Compass',
      tooltip: 'Discover career paths and analyze skill gaps',
      subItems: [
        { label: 'Career Paths', path: '/career-path-recommendations' },
        { label: 'Skill Analysis', path: '/skill-gap-analysis' }
      ]
    },
    {
      label: 'Learn & Grow',
      path: '/learning-roadmap',
      icon: 'BookOpen',
      tooltip: 'Build skills with personalized learning paths'
    },
    {
      label: 'Find Jobs',
      path: '/job-matching',
      icon: 'Search',
      tooltip: 'Match with jobs and tailor applications',
      subItems: [
        { label: 'Job Matching', path: '/job-matching' },
        { label: 'Resume Tailoring', path: '/resume-tailoring' }
      ]
    }
  ];

  const isActiveSection = (item) => {
    if (item?.subItems) {
      return item?.subItems?.some(subItem => location?.pathname === subItem?.path);
    }
    return location?.pathname === item?.path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Briefcase" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">CareerCraft</span>
              <span className="text-xs text-muted-foreground -mt-1">AI</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <div key={item?.path} className="relative group">
              <Button
                variant={isActiveSection(item) ? "default" : "ghost"}
                className="flex items-center space-x-2 px-4 py-2 transition-smooth"
                onClick={() => window.location.href = item?.path}
              >
                <Icon name={item?.icon} size={16} />
                <span className="font-medium">{item?.label}</span>
                {item?.subItems && (
                  <Icon name="ChevronDown" size={14} className="ml-1" />
                )}
              </Button>
              
              {/* Dropdown for sections with sub-items */}
              {item?.subItems && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-1100">
                  <div className="py-2">
                    {item?.subItems?.map((subItem) => (
                      <button
                        key={subItem?.path}
                        onClick={() => window.location.href = subItem?.path}
                        className={`w-full text-left px-4 py-2 text-sm transition-smooth hover:bg-muted ${
                          location?.pathname === subItem?.path 
                            ? 'bg-muted text-primary font-medium' :'text-popover-foreground'
                        }`}
                      >
                        {subItem?.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" className="p-2">
            <Icon name="Bell" size={20} />
          </Button>
          <Button variant="ghost" className="p-2">
            <Icon name="Settings" size={20} />
          </Button>
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="white" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden p-2"
          onClick={toggleMobileMenu}
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
        </Button>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <div key={item?.path}>
                <button
                  onClick={() => {
                    if (!item?.subItems) {
                      window.location.href = item?.path;
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-smooth ${
                    isActiveSection(item)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
                
                {/* Mobile sub-items */}
                {item?.subItems && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item?.subItems?.map((subItem) => (
                      <button
                        key={subItem?.path}
                        onClick={() => {
                          window.location.href = subItem?.path;
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-smooth ${
                          location?.pathname === subItem?.path
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        {subItem?.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile User Actions */}
            <div className="pt-4 mt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="flex-1 justify-start space-x-3">
                  <Icon name="Bell" size={20} />
                  <span>Notifications</span>
                </Button>
                <Button variant="ghost" className="flex-1 justify-start space-x-3">
                  <Icon name="Settings" size={20} />
                  <span>Settings</span>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;