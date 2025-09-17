import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressStats = ({ stats, className = '' }) => {
  const progressItems = [
    {
      label: 'Courses Completed',
      value: stats?.completedCourses,
      total: stats?.totalCourses,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Hours Learned',
      value: stats?.hoursLearned,
      total: stats?.totalHours,
      icon: 'Clock',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      suffix: 'h'
    },
    {
      label: 'Skills Acquired',
      value: stats?.skillsAcquired,
      total: stats?.totalSkills,
      icon: 'Target',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Certificates Earned',
      value: stats?.certificates,
      icon: 'Award',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const getProgressPercentage = (value, total) => {
    if (!total) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Learning Progress</h2>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm text-success font-medium">
            {stats?.weeklyProgress}% this week
          </span>
        </div>
      </div>
      {/* Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {progressItems?.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 rounded-full ${item?.bgColor} flex items-center justify-center mx-auto mb-3`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {item?.value}{item?.suffix || ''}
              {item?.total && (
                <span className="text-sm text-muted-foreground font-normal">
                  /{item?.total}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground mb-2">{item?.label}</div>
            {item?.total && (
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    item?.color === 'text-success' ? 'bg-success' :
                    item?.color === 'text-primary' ? 'bg-primary' :
                    item?.color === 'text-accent' ? 'bg-accent' : 'bg-warning'
                  }`}
                  style={{ width: `${getProgressPercentage(item?.value, item?.total)}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Overall Progress */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm text-muted-foreground">
            {getProgressPercentage(stats?.completedCourses, stats?.totalCourses)}% Complete
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
            style={{ width: `${getProgressPercentage(stats?.completedCourses, stats?.totalCourses)}%` }}
          />
        </div>
      </div>
      {/* Recent Achievements */}
      {stats?.recentAchievements && stats?.recentAchievements?.length > 0 && (
        <div className="border-t border-border pt-6 mt-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Recent Achievements</h3>
          <div className="space-y-2">
            {stats?.recentAchievements?.slice(0, 3)?.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="Trophy" size={12} className="text-success" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-foreground">{achievement?.title}</div>
                  <div className="text-xs text-muted-foreground">{achievement?.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Learning Streak */}
      <div className="border-t border-border pt-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Flame" size={16} className="text-orange-500" />
            <span className="text-sm font-medium text-foreground">Learning Streak</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-foreground">{stats?.learningStreak}</div>
            <div className="text-xs text-muted-foreground">days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;