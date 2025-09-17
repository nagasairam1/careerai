import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const MarketTrendsPanel = ({ trends, className = '' }) => {
  const demandData = [
    { skill: 'React', demand: 92, growth: 15 },
    { skill: 'Python', demand: 88, growth: 12 },
    { skill: 'AWS', demand: 85, growth: 18 },
    { skill: 'Node.js', demand: 82, growth: 10 },
    { skill: 'Docker', demand: 78, growth: 22 },
    { skill: 'TypeScript', demand: 75, growth: 25 }
  ];

  const salaryTrends = [
    { year: '2020', frontend: 75000, backend: 85000, fullstack: 90000 },
    { year: '2021', frontend: 78000, backend: 88000, fullstack: 95000 },
    { year: '2022', frontend: 82000, backend: 92000, fullstack: 100000 },
    { year: '2023', frontend: 85000, backend: 95000, fullstack: 105000 },
    { year: '2024', frontend: 88000, backend: 98000, fullstack: 110000 }
  ];

  const getTrendIcon = (trend) => {
    if (trend > 15) return { icon: 'TrendingUp', color: 'text-success' };
    if (trend > 5) return { icon: 'Minus', color: 'text-warning' };
    return { icon: 'TrendingDown', color: 'text-error' };
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BarChart3" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Market Trends & Insights</h2>
      </div>
      <div className="space-y-6">
        {/* Skill Demand Chart */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Top Skills in Demand</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="skill" 
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <YAxis 
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    color: 'var(--color-popover-foreground)'
                  }}
                />
                <Bar dataKey="demand" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Trends */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Salary Trends (USD)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salaryTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <YAxis 
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    color: 'var(--color-popover-foreground)'
                  }}
                  formatter={(value) => [`$${value?.toLocaleString()}`, '']}
                />
                <Line 
                  type="monotone" 
                  dataKey="frontend" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  name="Frontend Developer"
                />
                <Line 
                  type="monotone" 
                  dataKey="backend" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  name="Backend Developer"
                />
                <Line 
                  type="monotone" 
                  dataKey="fullstack" 
                  stroke="var(--color-warning)" 
                  strokeWidth={2}
                  name="Full Stack Developer"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Insights */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Key Market Insights</h3>
          <div className="space-y-3">
            {trends?.insights?.map((insight, index) => {
              const trendInfo = getTrendIcon(insight?.growth);
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name={trendInfo?.icon} size={16} className={`${trendInfo?.color} mt-0.5`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{insight?.title}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        insight?.growth > 15 ? 'bg-success/10 text-success' :
                        insight?.growth > 5 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
                      }`}>
                        {insight?.growth > 0 ? '+' : ''}{insight?.growth}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{insight?.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-semibold text-success">+23%</div>
            <div className="text-xs text-muted-foreground">Job Growth</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-semibold text-primary">$95K</div>
            <div className="text-xs text-muted-foreground">Avg Salary</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-semibold text-warning">2.3M</div>
            <div className="text-xs text-muted-foreground">Open Positions</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-semibold text-accent">Remote</div>
            <div className="text-xs text-muted-foreground">Work Options</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTrendsPanel;