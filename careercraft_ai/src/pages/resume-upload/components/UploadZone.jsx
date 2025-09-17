import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFileSelect, isProcessing, className = '' }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0) {
      onFileSelect(files?.[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragOver 
            ? 'border-primary bg-primary/5 scale-105' :'border-border hover:border-primary/50 hover:bg-muted/30'
          }
          ${isProcessing ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isProcessing}
        />

        <div className="flex flex-col items-center space-y-4">
          {/* Upload Icon */}
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200
            ${isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
          `}>
            <Icon name="Upload" size={32} />
          </div>

          {/* Upload Text */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {isProcessing ? 'Processing Resume...' : 'Upload Your Resume'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {isProcessing 
                ? 'Please wait while we analyze your resume'
                : 'Drag and drop your resume here, or click to browse'
              }
            </p>
          </div>

          {/* File Format Info */}
          {!isProcessing && (
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="FileText" size={14} />
                <span>PDF</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="FileText" size={14} />
                <span>DOCX</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="HardDrive" size={14} />
                <span>Max 10MB</span>
              </div>
            </div>
          )}

          {/* Browse Button */}
          {!isProcessing && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={(e) => {
                e?.stopPropagation();
                handleBrowseClick();
              }}
            >
              Browse Files
            </Button>
          )}

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="flex items-center space-x-2 text-primary">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Analyzing resume...</span>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Camera Option */}
      <div className="md:hidden mt-4">
        <Button
          variant="ghost"
          className="w-full"
          iconName="Camera"
          iconPosition="left"
          disabled={isProcessing}
        >
          Scan Document with Camera
        </Button>
      </div>
    </div>
  );
};

export default UploadZone;