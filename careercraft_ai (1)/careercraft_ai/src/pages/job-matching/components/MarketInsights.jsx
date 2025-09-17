import React from 'react';
import Icon from '../../../components/AppIcon';

const MarketInsights = ({ insights }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="BarChart3" size={20} />
        <h3 className="text-lg font-semibold text-foreground">Market Insights</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Average Salary */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg. Salary</span>
            <Icon 
              name={getTrendIcon(insights?.salaryTrend)} 
              size={16} 
              className={getTrendColor(insights?.salaryTrend)} 
            />
          </div>
          <div className="text-xl font-bold text-foreground">{insights?.averageSalary}</div>
          <div className="text-xs text-muted-foreground">
            {insights?.salaryChange} from last month
          </div>
        </div>

        {/* Job Openings */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Job Openings</span>
            <Icon 
              name={getTrendIcon(insights?.openingsTrend)} 
              size={16} 
              className={getTrendColor(insights?.openingsTrend)} 
            />
          </div>
          <div className="text-xl font-bold text-foreground">{insights?.totalOpenings}</div>
          <div className="text-xs text-muted-foreground">
            {insights?.openingsChange} new this week
          </div>
        </div>

        {/* Competition Level */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Competition</span>
            <Icon name="Users" size={16} className="text-muted-foreground" />
          </div>
          <div className="text-xl font-bold text-foreground">{insights?.competitionLevel}</div>
          <div className="text-xs text-muted-foreground">
            {insights?.applicantsPerJob} applicants/job
          </div>
        </div>

        {/* Hiring Speed */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Hiring Speed</span>
            <Icon name="Clock" size={16} className="text-muted-foreground" />
          </div>
          <div className="text-xl font-bold text-foreground">{insights?.averageHiringTime}</div>
          <div className="text-xs text-muted-foreground">
            Average time to hire
          </div>
        </div>
      </div>
      {/* Top Skills in Demand */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Top Skills in Demand</h4>
        <div className="flex flex-wrap gap-2">
          {insights?.topSkills?.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-primary/10 rounded-lg">
              <span className="text-sm font-medium text-primary">{skill?.name}</span>
              <span className="text-xs text-muted-foreground">+{skill?.growth}%</span>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Tips */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
          <div>
            <div className="text-sm font-medium text-accent mb-1">Pro Tip</div>
            <div className="text-sm text-muted-foreground">{insights?.tip}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;