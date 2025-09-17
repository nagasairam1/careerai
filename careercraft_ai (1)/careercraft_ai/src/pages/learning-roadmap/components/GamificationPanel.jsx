import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GamificationPanel = ({ gamificationData, className = '' }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const levelProgress = (gamificationData?.currentXP % 1000) / 1000 * 100;

  const badgeCategories = [
    {
      title: 'Learning Milestones',
      badges: gamificationData?.badges?.filter(badge => badge?.category === 'learning')
    },
    {
      title: 'Skill Mastery',
      badges: gamificationData?.badges?.filter(badge => badge?.category === 'skills')
    },
    {
      title: 'Consistency',
      badges: gamificationData?.badges?.filter(badge => badge?.category === 'consistency')
    }
  ];

  const getBadgeIcon = (badgeType) => {
    const iconMap = {
      'first-course': 'BookOpen',
      'course-completion': 'CheckCircle',
      'skill-master': 'Target',
      'learning-streak': 'Flame',
      'early-bird': 'Sun',
      'night-owl': 'Moon',
      'certificate': 'Award',
      'mentor': 'Users',
      'explorer': 'Compass'
    };
    return iconMap?.[badgeType] || 'Star';
  };

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'text-slate-600 bg-slate-100';
      case 'rare':
        return 'text-blue-600 bg-blue-100';
      case 'epic':
        return 'text-purple-600 bg-purple-100';
      case 'legendary':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatXP = (xp) => {
    if (xp >= 1000) {
      return `${(xp / 1000)?.toFixed(1)}k`;
    }
    return xp?.toString();
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Your Achievements</h2>
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Level {gamificationData?.level}
            </span>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {formatXP(gamificationData?.currentXP)} / {formatXP(gamificationData?.nextLevelXP)} XP
            </span>
            <span className="text-sm text-muted-foreground">
              {formatXP(gamificationData?.nextLevelXP - gamificationData?.currentXP)} XP to next level
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{gamificationData?.totalBadges}</div>
            <div className="text-xs text-muted-foreground">Badges</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{gamificationData?.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{gamificationData?.rank}</div>
            <div className="text-xs text-muted-foreground">Global Rank</div>
          </div>
        </div>
      </div>
      {/* Badges Section */}
      <div className="p-6">
        {badgeCategories?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-6 last:mb-0">
            <h3 className="text-sm font-medium text-foreground mb-3">{category?.title}</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {category?.badges?.map((badge, badgeIndex) => (
                <div
                  key={badgeIndex}
                  className={`relative group cursor-pointer transition-all duration-200 ${
                    badge?.earned ? 'opacity-100' : 'opacity-40 grayscale'
                  }`}
                  onClick={() => setSelectedBadge(badge)}
                >
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${badge?.earned ? getBadgeColor(badge?.rarity) : 'bg-muted text-muted-foreground'}
                    group-hover:scale-110 transition-transform duration-200
                  `}>
                    <Icon name={getBadgeIcon(badge?.type)} size={20} />
                  </div>
                  
                  {badge?.earned && badge?.rarity === 'legendary' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Icon name="Crown" size={10} className="text-yellow-800" />
                    </div>
                  )}
                  
                  {!badge?.earned && badge?.progress && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 bg-muted rounded-full h-1">
                        <div
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${(badge?.progress / badge?.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Recent Milestones */}
      <div className="border-t border-border p-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Recent Milestones</h3>
        <div className="space-y-3">
          {gamificationData?.recentMilestones?.slice(0, 3)?.map((milestone, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Star" size={14} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-foreground">{milestone?.title}</div>
                <div className="text-xs text-muted-foreground">{milestone?.date}</div>
              </div>
              <div className="text-xs text-primary font-medium">+{milestone?.xp} XP</div>
            </div>
          ))}
        </div>
      </div>
      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1200 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Badge Details</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedBadge(null)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="text-center mb-4">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3
                ${selectedBadge?.earned ? getBadgeColor(selectedBadge?.rarity) : 'bg-muted text-muted-foreground'}
              `}>
                <Icon name={getBadgeIcon(selectedBadge?.type)} size={24} />
              </div>
              <h4 className="font-semibold text-foreground mb-1">{selectedBadge?.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{selectedBadge?.description}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(selectedBadge?.rarity)}`}>
                {selectedBadge?.rarity?.charAt(0)?.toUpperCase() + selectedBadge?.rarity?.slice(1)}
              </span>
            </div>

            {selectedBadge?.earned ? (
              <div className="text-center">
                <div className="text-sm text-success mb-1">✓ Earned</div>
                <div className="text-xs text-muted-foreground">
                  Completed on {selectedBadge?.earnedDate}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-sm text-muted-foreground mb-2">Progress:</div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(selectedBadge?.progress / selectedBadge?.target) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  {selectedBadge?.progress} / {selectedBadge?.target}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamificationPanel;