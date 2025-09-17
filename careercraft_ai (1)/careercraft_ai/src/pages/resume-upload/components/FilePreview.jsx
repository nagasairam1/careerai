import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilePreview = ({ file, extractedText, onRemove, className = '' }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'FileText';
      case 'docx': case'doc':
        return 'FileText';
      default:
        return 'File';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* File Info Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getFileIcon(file?.name)} size={20} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground truncate">
              {file?.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(file?.size)} • Uploaded {new Date()?.toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          iconName="X"
          className="text-muted-foreground hover:text-destructive"
        />
      </div>
      {/* Processing Status */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Processing Status</span>
          <span className="text-xs text-success">Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-success h-2 rounded-full w-full transition-all duration-500" />
        </div>
      </div>
      {/* Extracted Text Preview */}
      {extractedText && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">Extracted Content</h4>
            <Button variant="ghost" size="sm" iconName="Eye">
              View Full
            </Button>
          </div>
          
          <div className="bg-muted rounded-lg p-4 max-h-32 overflow-y-auto">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {extractedText?.substring(0, 300)}
              {extractedText?.length > 300 && '...'}
            </p>
          </div>

          {/* Key Information Detected */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Skills Detected</span>
              <div className="flex flex-wrap gap-1">
                {['JavaScript', 'React', 'Node.js']?.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Experience</span>
              <p className="text-sm text-foreground">3+ Years</p>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-border">
        <Button variant="default" className="flex-1" iconName="ArrowRight">
          Continue to Analysis
        </Button>
        <Button variant="outline" iconName="Edit">
          Edit Info
        </Button>
      </div>
    </div>
  );
};

export default FilePreview;