import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparisonTool = ({ careerPaths, onClose }) => {
  const [selectedPaths, setSelectedPaths] = useState([]);
  const [sortBy, setSortBy] = useState('skillMatch');

  const sortOptions = [
    { value: 'skillMatch', label: 'Skill Match' },
    { value: 'salary', label: 'Salary Range' },
    { value: 'growthPotential', label: 'Growth Potential' },
    { value: 'marketDemand', label: 'Market Demand' }
  ];

  const handlePathSelection = (pathId) => {
    setSelectedPaths(prev => {
      if (prev?.includes(pathId)) {
        return prev?.filter(id => id !== pathId);
      } else if (prev?.length < 3) {
        return [...prev, pathId];
      }
      return prev;
    });
  };

  const getSelectedCareerPaths = () => {
    return careerPaths?.filter(path => selectedPaths?.includes(path?.id));
  };

  const getComparisonValue = (path, criteria) => {
    switch (criteria) {
      case 'skillMatch':
        return `${path?.skillMatch}%`;
      case 'salary':
        return path?.salaryRange;
      case 'growthPotential':
        return `${path?.growthPotential}%`;
      case 'marketDemand':
        return path?.marketDemand;
      default:
        return '-';
    }
  };

  const getBestInCategory = (paths, criteria) => {
    if (criteria === 'skillMatch' || criteria === 'growthPotential') {
      return Math.max(...paths?.map(p => p?.[criteria]));
    }
    return null;
  };

  const selectedCareerPaths = getSelectedCareerPaths();
  const bestSkillMatch = getBestInCategory(selectedCareerPaths, 'skillMatch');
  const bestGrowth = getBestInCategory(selectedCareerPaths, 'growthPotential');

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1200 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Compare Career Paths</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Select up to 3 career paths to compare side by side
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Path Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">Select Career Paths</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {careerPaths?.map((path) => (
                <button
                  key={path?.id}
                  onClick={() => handlePathSelection(path?.id)}
                  disabled={!selectedPaths?.includes(path?.id) && selectedPaths?.length >= 3}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                    selectedPaths?.includes(path?.id)
                      ? 'border-primary bg-primary/5 text-foreground'
                      : 'border-border hover:border-muted-foreground text-muted-foreground'
                  } ${
                    !selectedPaths?.includes(path?.id) && selectedPaths?.length >= 3
                      ? 'opacity-50 cursor-not-allowed' :'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon 
                      name={selectedPaths?.includes(path?.id) ? "CheckCircle" : "Circle"} 
                      size={16} 
                      className={selectedPaths?.includes(path?.id) ? "text-primary" : "text-muted-foreground"} 
                    />
                    <span className="font-medium text-sm">{path?.title}</span>
                  </div>
                  <div className="text-xs opacity-75">{path?.skillMatch}% match</div>
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          {selectedCareerPaths?.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Comparison Results</h3>
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Sort by..."
                  className="w-48"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-3 text-sm font-medium text-foreground">Criteria</th>
                      {selectedCareerPaths?.map((path) => (
                        <th key={path?.id} className="text-left p-3 text-sm font-medium text-foreground min-w-48">
                          {path?.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3 text-sm font-medium text-foreground">Skill Match</td>
                      {selectedCareerPaths?.map((path) => (
                        <td key={path?.id} className="p-3">
                          <div className={`text-sm ${
                            path?.skillMatch === bestSkillMatch ? 'text-success font-semibold' : 'text-foreground'
                          }`}>
                            {path?.skillMatch}%
                            {path?.skillMatch === bestSkillMatch && (
                              <Icon name="Crown" size={14} className="inline ml-1 text-warning" />
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-border bg-muted/30">
                      <td className="p-3 text-sm font-medium text-foreground">Salary Range</td>
                      {selectedCareerPaths?.map((path) => (
                        <td key={path?.id} className="p-3 text-sm text-foreground">
                          {path?.salaryRange}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3 text-sm font-medium text-foreground">Growth Potential</td>
                      {selectedCareerPaths?.map((path) => (
                        <td key={path?.id} className="p-3">
                          <div className={`text-sm ${
                            path?.growthPotential === bestGrowth ? 'text-success font-semibold' : 'text-foreground'
                          }`}>
                            {path?.growthPotential}%
                            {path?.growthPotential === bestGrowth && (
                              <Icon name="Crown" size={14} className="inline ml-1 text-warning" />
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-border bg-muted/30">
                      <td className="p-3 text-sm font-medium text-foreground">Market Demand</td>
                      {selectedCareerPaths?.map((path) => (
                        <td key={path?.id} className="p-3 text-sm text-foreground">
                          {path?.marketDemand}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3 text-sm font-medium text-foreground">Time to Transition</td>
                      {selectedCareerPaths?.map((path) => (
                        <td key={path?.id} className="p-3 text-sm text-foreground">
                          {path?.timeToTransition}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-border bg-muted/30">
                      <td className="p-3 text-sm font-medium text-foreground">Key Skills</td>
                      {selectedCareerPaths?.map((path) => (
                        <td key={path?.id} className="p-3">
                          <div className="space-y-1">
                            {path?.keySkills?.slice(0, 3)?.map((skill, index) => (
                              <div key={index} className="text-xs bg-muted px-2 py-1 rounded">
                                {skill}
                              </div>
                            ))}
                            {path?.keySkills?.length > 3 && (
                              <div className="text-xs text-muted-foreground">
                                +{path?.keySkills?.length - 3} more
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedCareerPaths?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Select Career Paths to Compare</h3>
              <p className="text-muted-foreground">
                Choose up to 3 career paths from above to see a detailed comparison
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTool;