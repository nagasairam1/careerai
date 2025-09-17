import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseRecommendations = ({ courses, onEnrollClick, className = '' }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const getPlatformIcon = (platform) => {
    const platformIcons = {
      'coursera': 'GraduationCap',
      'linkedin': 'Linkedin',
      'udemy': 'Play',
      'pluralsight': 'Code',
      'edx': 'BookOpen'
    };
    return platformIcons?.[platform?.toLowerCase()] || 'ExternalLink';
  };

  const getPlatformColor = (platform) => {
    const platformColors = {
      'coursera': 'text-blue-600 bg-blue-50',
      'linkedin': 'text-blue-700 bg-blue-50',
      'udemy': 'text-purple-600 bg-purple-50',
      'pluralsight': 'text-orange-600 bg-orange-50',
      'edx': 'text-green-600 bg-green-50'
    };
    return platformColors?.[platform?.toLowerCase()] || 'text-muted-foreground bg-muted';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'text-success bg-success/10';
      case 'intermediate':
        return 'text-warning bg-warning/10';
      case 'advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-muted'}
      />
    ));
  };

  return (
    <div className={`${className}`}>
      {/* Header with View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Recommended Courses</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {courses?.length} courses found based on your learning path
          </p>
        </div>
        
        <div className="hidden md:flex items-center space-x-2 bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="px-3"
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="px-3"
          >
            <Icon name="List" size={16} />
          </Button>
        </div>
      </div>
      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <div
              key={course?.id}
              className="bg-card border border-border rounded-lg overflow-hidden shadow-elevated hover:shadow-interactive transition-all duration-200"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course?.thumbnail}
                  alt={course?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(course?.platform)}`}>
                    {course?.platform}
                  </span>
                </div>
                {course?.isFree && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Free
                    </span>
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {course?.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {course?.description}
                </p>

                {/* Course Meta */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(course?.rating)}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({course?.reviewCount})
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(course?.difficulty)}`}>
                    {course?.difficulty}
                  </span>
                </div>

                {/* Duration and Students */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{formatDuration(course?.duration)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{course?.enrolledCount?.toLocaleString()}</span>
                  </span>
                </div>

                {/* Skills Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {course?.skills?.slice(0, 3)?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {course?.skills?.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                        +{course?.skills?.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => onEnrollClick(course)}
                  iconName="ExternalLink"
                  iconPosition="right"
                  iconSize={14}
                >
                  {course?.isFree ? 'Enroll Free' : `$${course?.price}`}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {courses?.map((course) => (
            <div
              key={course?.id}
              className="bg-card border border-border rounded-lg p-4 shadow-elevated hover:shadow-interactive transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                {/* Course Thumbnail */}
                <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={course?.thumbnail}
                    alt={course?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Course Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-1">
                      {course?.title}
                    </h3>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(course?.platform)}`}>
                        {course?.platform}
                      </span>
                      {course?.isFree && (
                        <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Free
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {course?.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        {renderStars(course?.rating)}
                        <span className="ml-1">({course?.reviewCount})</span>
                      </div>
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{formatDuration(course?.duration)}</span>
                      </span>
                      <span className={`px-2 py-1 rounded-full ${getDifficultyColor(course?.difficulty)}`}>
                        {course?.difficulty}
                      </span>
                    </div>

                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onEnrollClick(course)}
                      iconName="ExternalLink"
                      iconPosition="right"
                      iconSize={14}
                    >
                      {course?.isFree ? 'Enroll Free' : `$${course?.price}`}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Empty State */}
      {courses?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more course recommendations.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseRecommendations;