import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptions = ({ onExport, className = '' }) => {
  const [selectedFormats, setSelectedFormats] = useState(['pdf']);
  const [exportSettings, setExportSettings] = useState({
    atsOptimized: true,
    includeKeywords: true,
    customFileName: '',
    includeVersionInfo: false,
    compressImages: true
  });
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Standard format for job applications',
      icon: 'FileText',
      recommended: true,
      size: '~150KB'
    },
    {
      id: 'docx',
      name: 'Word Document',
      description: 'Editable format for further customization',
      icon: 'FileEdit',
      recommended: false,
      size: '~85KB'
    },
    {
      id: 'txt',
      name: 'Plain Text',
      description: 'ATS-friendly text-only version',
      icon: 'Type',
      recommended: false,
      size: '~12KB'
    }
  ];

  const handleFormatToggle = (formatId) => {
    setSelectedFormats(prev => 
      prev?.includes(formatId) 
        ? prev?.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handleSettingChange = (setting, value) => {
    setExportSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleExport = async () => {
    if (selectedFormats?.length === 0) return;
    
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      selectedFormats?.forEach(format => {
        const fileName = exportSettings?.customFileName || 
          `Sarah_Johnson_Resume_TechCorp_${new Date()?.toISOString()?.split('T')?.[0]}`;
        
        console.log(`Exporting ${format?.toUpperCase()}: ${fileName}.${format}`);
        
        // Simulate file download
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${fileName}.${format}`;
        link?.click();
      });
      
      onExport?.(selectedFormats, exportSettings);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getEstimatedSize = () => {
    const sizes = {
      pdf: 150,
      docx: 85,
      txt: 12
    };
    
    const totalSize = selectedFormats?.reduce((total, format) => 
      total + (sizes?.[format] || 0), 0
    );
    
    return totalSize > 1000 ? `${(totalSize / 1000)?.toFixed(1)}MB` : `${totalSize}KB`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Download" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Export Resume</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Download your tailored resume in multiple formats
        </p>
      </div>
      <div className="p-4 space-y-6">
        {/* Format Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">File Formats</h4>
          
          <div className="space-y-2">
            {formatOptions?.map((format) => (
              <div
                key={format?.id}
                className={`border rounded-lg p-3 transition-all duration-200 cursor-pointer ${
                  selectedFormats?.includes(format?.id)
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/20'
                }`}
                onClick={() => handleFormatToggle(format?.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedFormats?.includes(format?.id)
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-border'
                  }`}>
                    {selectedFormats?.includes(format?.id) && <Icon name="Check" size={12} />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name={format?.icon} size={16} className="text-primary" />
                      <span className="font-medium text-foreground">{format?.name}</span>
                      {format?.recommended && (
                        <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full font-medium">
                          Recommended
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">{format?.size}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{format?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Settings */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Export Settings</h4>
          
          <div className="space-y-3">
            <Checkbox
              label="ATS Optimization"
              description="Format resume for Applicant Tracking Systems"
              checked={exportSettings?.atsOptimized}
              onChange={(e) => handleSettingChange('atsOptimized', e?.target?.checked)}
            />
            
            <Checkbox
              label="Include Keywords"
              description="Embed job-specific keywords for better matching"
              checked={exportSettings?.includeKeywords}
              onChange={(e) => handleSettingChange('includeKeywords', e?.target?.checked)}
            />
            
            <Checkbox
              label="Version Information"
              description="Add version details to document metadata"
              checked={exportSettings?.includeVersionInfo}
              onChange={(e) => handleSettingChange('includeVersionInfo', e?.target?.checked)}
            />
            
            <Checkbox
              label="Compress Images"
              description="Reduce file size by optimizing images"
              checked={exportSettings?.compressImages}
              onChange={(e) => handleSettingChange('compressImages', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Custom File Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Custom File Name</label>
          <input
            type="text"
            placeholder="Sarah_Johnson_Resume_TechCorp"
            value={exportSettings?.customFileName}
            onChange={(e) => handleSettingChange('customFileName', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Leave empty for auto-generated name based on job and date
          </p>
        </div>

        {/* Export Summary */}
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Export Summary</span>
            <span className="text-sm text-muted-foreground">{getEstimatedSize()}</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Formats:</span>
              <span className="text-foreground">
                {selectedFormats?.length > 0 
                  ? selectedFormats?.map(f => f?.toUpperCase())?.join(', ')
                  : 'None selected'
                }
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">ATS Optimized:</span>
              <span className="text-foreground">
                {exportSettings?.atsOptimized ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1"
            disabled={selectedFormats?.length === 0}
          >
            <Icon name="Eye" size={16} />
            <span className="ml-2">Preview</span>
          </Button>
          
          <Button
            variant="default"
            className="flex-1"
            onClick={handleExport}
            disabled={selectedFormats?.length === 0 || isExporting}
            loading={isExporting}
          >
            <Icon name="Download" size={16} />
            <span className="ml-2">
              {isExporting ? 'Exporting...' : 'Export Resume'}
            </span>
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Need help with formatting?</span>
            <Button variant="ghost" size="sm">
              <Icon name="HelpCircle" size={14} />
              <span className="ml-1">Export Guide</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;