import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SkillAssessment = ({ skill, onAssessmentComplete, onClose }) => {
  const [currentLevel, setCurrentLevel] = useState(skill?.current);
  const [confidence, setConfidence] = useState(3);
  const [experience, setExperience] = useState('');
  const [examples, setExamples] = useState('');
  const [step, setStep] = useState(1);

  const skillLevels = [
    { value: 1, label: 'Beginner', description: 'Basic understanding, limited experience' },
    { value: 2, label: 'Novice', description: 'Some experience, can work with guidance' },
    { value: 3, label: 'Intermediate', description: 'Solid understanding, can work independently' },
    { value: 4, label: 'Advanced', description: 'Deep expertise, can mentor others' },
    { value: 5, label: 'Expert', description: 'Industry-leading expertise, thought leader' }
  ];

  const confidenceLevels = [
    { value: 1, label: 'Not confident', description: 'Unsure about my assessment' },
    { value: 2, label: 'Somewhat confident', description: 'Fairly sure but could be wrong' },
    { value: 3, label: 'Confident', description: 'Pretty sure about my level' },
    { value: 4, label: 'Very confident', description: 'Certain about my assessment' },
    { value: 5, label: 'Extremely confident', description: 'Absolutely certain' }
  ];

  const handleSubmit = () => {
    const assessmentData = {
      skillId: skill?.id,
      previousLevel: skill?.current,
      newLevel: currentLevel,
      confidence,
      experience,
      examples,
      timestamp: new Date()?.toISOString()
    };
    
    onAssessmentComplete(assessmentData);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Rate Your Current Level: {skill?.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {skill?.description}
              </p>
            </div>
            <div className="space-y-3">
              {skillLevels?.map((level) => (
                <div
                  key={level?.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    currentLevel === level?.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setCurrentLevel(level?.value)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      currentLevel === level?.value
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {currentLevel === level?.value && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-foreground">{level?.label}</span>
                        <span className="text-sm text-muted-foreground">Level {level?.value}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{level?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How confident are you in this assessment?
              </h3>
              <p className="text-sm text-muted-foreground">
                Your confidence level helps us provide better recommendations.
              </p>
            </div>
            <div className="space-y-3">
              {confidenceLevels?.map((level) => (
                <div
                  key={level?.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    confidence === level?.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setConfidence(level?.value)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      confidence === level?.value
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {confidence === level?.value && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground mb-1">{level?.label}</div>
                      <p className="text-sm text-muted-foreground">{level?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Tell us about your experience
              </h3>
              <p className="text-sm text-muted-foreground">
                This information helps us provide more personalized recommendations.
              </p>
            </div>
            <div className="space-y-4">
              <Input
                label="Years of Experience"
                type="text"
                placeholder="e.g., 2 years, 6 months, etc."
                value={experience}
                onChange={(e) => setExperience(e?.target?.value)}
                description="How long have you been working with this skill?"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Examples of Your Work
                </label>
                <textarea
                  className="w-full p-3 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Describe specific projects, achievements, or examples that demonstrate your skill level..."
                  value={examples}
                  onChange={(e) => setExamples(e?.target?.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Optional: Share specific examples to help validate your assessment
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1200 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={16} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Skill Assessment</h2>
              <p className="text-sm text-muted-foreground">Step {step} of 3</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            {step > 1 ? 'Previous' : 'Cancel'}
          </Button>

          <div className="flex items-center space-x-2">
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)}>
                Next
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Complete Assessment
                <Icon name="Check" size={16} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;