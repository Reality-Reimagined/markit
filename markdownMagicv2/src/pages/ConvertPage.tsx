import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { FileList } from '../components/FileList';
import { MarkdownPreview } from '../components/MarkdownPreview';
import { FileStatus } from '../types';
import { useUsageTracking } from '@/hooks/useUsageTracking';
import { useToast } from '@/hooks/useToast';

export const ConvertPage = () => {
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<FileStatus | null>(null);
  const { trackUsage } = useUsageTracking();
  const { showToast } = useToast();

  const handleFilesSelected = async (selectedFiles: File[]) => {
    const newFiles = selectedFiles.map(file => ({
      name: file.name,
      status: 'pending' as const
    }));

    setFiles(prev => [...prev, ...newFiles]);

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        setFiles(prev => prev.map(f => 
          f.name === file.name ? { ...f, status: 'converting' } : f
        ));

        const response = await fetch('http://localhost:8000/convert/single', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Conversion failed');
        }

        const data = await response.json();
        
        await trackUsage(file, 'single', 'success');
        
        setFiles(prev => prev.map(f => 
          f.name === file.name 
            ? { ...f, status: 'completed', markdown: data.markdown } 
            : f
        ));

        setSelectedPreview(prev => prev || {
          name: file.name,
          status: 'completed',
          markdown: data.markdown
        });
      } catch (error) {
        await trackUsage(file, 'single', 'error');
        showToast(error.message, 'error');
        
        setFiles(prev => prev.map(f => 
          f.name === file.name 
            ? { ...f, status: 'error', error: error.message } 
            : f
        ));
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Convert File</h1>
          <p className="mt-2 text-gray-600">
            Upload your document and get it back in Markdown. Supported formats include PDF, Word, PowerPoint, Excel, and more.
          </p>
          
          <FileUpload onFilesSelected={handleFilesSelected} />
          <FileList 
            files={files}
            onFileClick={(file) => {
              if (file.status === 'completed') {
                setSelectedPreview(file);
              }
            }}
          />
        </div>
        <div className="lg:sticky lg:top-8">
          {selectedPreview?.markdown && (
            <MarkdownPreview 
              markdown={selectedPreview.markdown}
              fileName={selectedPreview.name}
            />
          )}
        </div>
      </div>
    </div>
  );
};