import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/*': ['.jpg', '.jpeg', '.png'],
      'audio/*': ['.mp3', '.wav'],
      'text/html': ['.html'],
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/xml': ['.xml'],
      'application/zip': ['.zip']
    }
  });

  return (
    <div 
      {...getRootProps()} 
      className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <Upload className="w-12 h-12 text-gray-400" />
        {isDragActive ? (
          <p className="text-lg text-blue-500">Drop the files here...</p>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-600">Drag & drop files here, or click to select files</p>
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: PDF, Word, PowerPoint, Excel, Images, Audio, HTML, CSV, JSON, XML, ZIP
            </p>
          </div>
        )}
      </div>
    </div>
  );
};