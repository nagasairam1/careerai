import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = ({ className = '' }) => {
  const location = useLocation();

  const pathMap = {
    '/resume-upload': { label: 'Upload Resume', parent: null },
    '/career-path-recommendations': { label: 'Career Path Recommendations', parent: '/resume-upload' },
    '/skill-gap-analysis': { label: 'Skill Gap Analysis', parent: '/career-path-recommendations' },
    '/learning-roadmap': { label: 'Learning Roadmap', parent: '/skill-gap-analysis' },
    '/job-matching': { label: 'Job Matching', parent: '/learning-roadmap' },
    '/resume-tailoring': { label: 'Resume Tailoring', parent: '/job-matching' }
  };

  const generateBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentPath = location?.pathname;

    // Build breadcrumb chain by following parent relationships
    while (currentPath && pathMap?.[currentPath]) {
      const pathInfo = pathMap?.[currentPath];
      breadcrumbs?.unshift({
        label: pathInfo?.label,
        path: currentPath,
        isActive: currentPath === location?.pathname
      });
      currentPath = pathInfo?.parent;
    }

    // Always include Home as the first breadcrumb
    if (breadcrumbs?.length > 0) {
      breadcrumbs?.unshift({
        label: 'Dashboard',
        path: '/',
        isActive: false
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={breadcrumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-2" 
              />
            )}
            
            {breadcrumb?.isActive ? (
              <span className="text-foreground font-medium">
                {breadcrumb?.label}
              </span>
            ) : (
              <button
                onClick={() => window.location.href = breadcrumb?.path}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {breadcrumb?.label}
              </button>
            )}
          </li>
        ))}
      </ol>
      {/* Mobile Breadcrumbs - Simplified */}
      <div className="md:hidden ml-auto">
        <button
          onClick={() => window.history?.back()}
          className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon name="ArrowLeft" size={16} />
          <span className="text-sm">Back</span>
        </button>
      </div>
    </nav>
  );
};

export default Breadcrumbs;