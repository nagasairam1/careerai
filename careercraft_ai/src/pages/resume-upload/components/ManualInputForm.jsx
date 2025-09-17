import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ManualInputForm = ({ onSubmit, onCancel, className = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    currentRole: '',
    experience: '',
    skills: '',
    education: '',
    summary: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (!formData?.currentRole?.trim()) newErrors.currentRole = 'Current role is required';
    if (!formData?.skills?.trim()) newErrors.skills = 'Skills are required';
    if (!formData?.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    
    // Email validation
    if (formData?.email && !/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Edit" size={16} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Manual Information Entry</h3>
            <p className="text-sm text-muted-foreground">
              Fill in your details manually if resume parsing had issues
            </p>
          </div>
        </div>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground flex items-center">
            <Icon name="User" size={16} className="mr-2" />
            Personal Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData?.fullName}
              onChange={(e) => handleInputChange('fullName', e?.target?.value)}
              error={errors?.fullName}
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />
            
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
            />
            
            <Input
              label="Location"
              type="text"
              placeholder="City, State/Country"
              value={formData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              error={errors?.location}
            />
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground flex items-center">
            <Icon name="Briefcase" size={16} className="mr-2" />
            Professional Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Current Role"
              type="text"
              placeholder="e.g., Software Engineer"
              value={formData?.currentRole}
              onChange={(e) => handleInputChange('currentRole', e?.target?.value)}
              error={errors?.currentRole}
              required
            />
            
            <Input
              label="Years of Experience"
              type="text"
              placeholder="e.g., 3 years"
              value={formData?.experience}
              onChange={(e) => handleInputChange('experience', e?.target?.value)}
              error={errors?.experience}
            />
          </div>
          
          <Input
            label="Key Skills"
            type="text"
            placeholder="e.g., JavaScript, React, Node.js, Python"
            description="Separate skills with commas"
            value={formData?.skills}
            onChange={(e) => handleInputChange('skills', e?.target?.value)}
            error={errors?.skills}
            required
          />
          
          <Input
            label="Education"
            type="text"
            placeholder="e.g., Bachelor's in Computer Science"
            value={formData?.education}
            onChange={(e) => handleInputChange('education', e?.target?.value)}
            error={errors?.education}
          />
        </div>

        {/* Professional Summary */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground flex items-center">
            <Icon name="FileText" size={16} className="mr-2" />
            Professional Summary
          </h4>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Brief Summary (Optional)
            </label>
            <textarea
              className="w-full min-h-24 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              placeholder="Brief description of your professional background and career goals..."
              value={formData?.summary}
              onChange={(e) => handleInputChange('summary', e?.target?.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              This helps us provide better career recommendations
            </p>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="space-y-4">
          <Checkbox
            label="I agree to the terms and conditions and privacy policy"
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
            error={errors?.agreeToTerms}
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 pt-4 border-t border-border">
          <Button
            type="submit"
            variant="default"
            className="flex-1"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue to Analysis
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
      {/* Help Text */}
      <div className="px-6 pb-6">
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <strong>Tip:</strong> The more detailed information you provide, the better our AI can 
                analyze your profile and suggest relevant career paths and learning opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualInputForm;