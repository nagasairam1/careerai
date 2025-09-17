import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import QuickActions from '../../components/ui/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UploadZone from './components/UploadZone';
import FilePreview from './components/FilePreview';
import UploadInstructions from './components/UploadInstructions';
import ProcessingStatus from './components/ProcessingStatus';
import ManualInputForm from './components/ManualInputForm';

const ResumeUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [showManualForm, setShowManualForm] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Mock extracted text for demonstration
  const mockExtractedText = `John Smith\nSoftware Engineer\nEmail: john.smith@email.com\nPhone: (555) 123-4567\n\nPROFESSIONAL SUMMARY\nExperienced software engineer with 5+ years of experience in full-stack development. Proficient in JavaScript, React, Node.js, and cloud technologies. Passionate about creating scalable web applications and mentoring junior developers.\n\nEXPERIENCE\nSenior Software Engineer | TechCorp Inc. | 2021 - Present\n• Led development of customer-facing web applications serving 100K+ users\n• Implemented microservices architecture reducing system latency by 40%\n• Mentored 3 junior developers and conducted code reviews\n\nSoftware Engineer | StartupXYZ | 2019 - 2021\n• Developed responsive web applications using React and Node.js\n• Collaborated with cross-functional teams in agile environment\n• Optimized database queries improving application performance by 25%\n\nSKILLS\nTechnical: JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, MongoDB, PostgreSQL\nSoft Skills: Team Leadership, Problem Solving, Communication, Agile Methodologies\n\nEDUCATION\nBachelor of Science in Computer Science\nUniversity of Technology | 2015 - 2019`;

  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    
    if (file?.size > maxSize) {
      return 'File size must be less than 10MB';
    }
    
    if (!allowedTypes?.includes(file?.type)) {
      return 'Only PDF and DOCX files are supported';
    }
    
    return null;
  };

  const handleFileSelect = (file) => {
    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      return;
    }
    
    setUploadError('');
    setUploadedFile(file);
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    setExtractedText(mockExtractedText);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setExtractedText('');
    setIsProcessing(false);
    setProcessingProgress(0);
    setUploadError('');
  };

  const handleManualSubmit = (formData) => {
    console.log('Manual form data:', formData);
    // Navigate to next step
    window.location.href = '/career-path-recommendations';
  };

  const handleContinueToAnalysis = () => {
    window.location.href = '/career-path-recommendations';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <Breadcrumbs className="mb-4" />
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Upload Your Resume
                </h1>
                <p className="text-lg text-muted-foreground">
                  Let our AI analyze your resume to provide personalized career guidance
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Step 1 of 4</div>
                  <div className="text-lg font-semibold text-primary">Resume Analysis</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator 
            currentStep={0} 
            completedSteps={[]} 
            className="mb-8"
          />

          {/* Error Message */}
          {uploadError && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="AlertCircle" size={20} className="text-destructive" />
                <div>
                  <p className="text-sm font-medium text-destructive">Upload Error</p>
                  <p className="text-sm text-destructive/80">{uploadError}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Upload Area */}
            <div className="lg:col-span-2 space-y-6">
              {!uploadedFile && !showManualForm && (
                <>
                  <UploadZone 
                    onFileSelect={handleFileSelect}
                    isProcessing={isProcessing}
                  />
                  
                  {/* Alternative Options */}
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                      <span>Having trouble with file upload?</span>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setShowManualForm(true)}
                        className="p-0 h-auto"
                      >
                        Enter details manually
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* Processing Status */}
              {isProcessing && (
                <ProcessingStatus
                  isProcessing={isProcessing}
                  progress={processingProgress}
                  onComplete={handleProcessingComplete}
                />
              )}

              {/* File Preview */}
              {uploadedFile && !isProcessing && extractedText && (
                <FilePreview
                  file={uploadedFile}
                  extractedText={extractedText}
                  onRemove={handleRemoveFile}
                />
              )}

              {/* Manual Input Form */}
              {showManualForm && (
                <ManualInputForm
                  onSubmit={handleManualSubmit}
                  onCancel={() => setShowManualForm(false)}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <UploadInstructions />
              
              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  What Happens Next?
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Resume Analysis</p>
                      <p className="text-xs text-muted-foreground">
                        AI extracts and analyzes your experience, skills, and achievements
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Career Matching</p>
                      <p className="text-xs text-muted-foreground">
                        Get personalized career path recommendations
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-success">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Skill Development</p>
                      <p className="text-xs text-muted-foreground">
                        Receive customized learning roadmaps and resources
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-muted/30 border border-border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={16} className="text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Your Privacy is Protected
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your resume data is encrypted and processed securely. 
                      We never share your information with third parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          {extractedText && !isProcessing && (
            <div className="mt-8 text-center">
              <Button
                variant="default"
                size="lg"
                onClick={handleContinueToAnalysis}
                iconName="ArrowRight"
                iconPosition="right"
                className="px-8"
              >
                Continue to Career Analysis
              </Button>
            </div>
          )}
        </div>
      </main>

      <QuickActions />
    </div>
  );
};

export default ResumeUpload;