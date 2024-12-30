import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { FileList } from '../components/FileList';
import { FileStatus } from '../types';
import { useToast } from '../hooks/useToast';

export const BatchConvertPage = () => {
  const [files, setFiles] = useState<FileStatus[]>([]);
  const { showToast } = useToast();

  const handleFilesSelected = async (selectedFiles: File[]) => {
    const formData = new FormData();
    const newFiles = selectedFiles.map(file => ({
      name: file.name,
      status: 'pending' as const
    }));

    setFiles(prev => [...prev, ...newFiles]);

    selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:8000/convert/batch', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Batch conversion failed');
      }

      const results = await response.json();

      setFiles(prev => prev.map(file => {
        const result = results[file.name];
        if (result.status === 'success') {
          return {
            ...file,
            status: 'completed',
            markdown: result.content
          };
        } else {
          return {
            ...file,
            status: 'error',
            error: result.error
          };
        }
      }));

      showToast('Batch conversion completed!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
      setFiles(prev => prev.map(file => ({
        ...file,
        status: 'error',
        error: error.message
      })));
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Batch Convert Files</h1>
          <p className="mt-2 text-gray-600">
            Upload multiple files to convert them all at once. Supported formats include PDF, Word, PowerPoint, Excel, and more.
          </p>
        </div>
        <FileUpload onFilesSelected={handleFilesSelected} />
        <FileList files={files} />
      </div>
    </div>
  );
};