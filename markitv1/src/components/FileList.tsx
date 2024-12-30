import React from 'react';
import { FileStatus } from '../types';
import { Loader2, Check, AlertCircle } from 'lucide-react';

interface FileListProps {
  files: FileStatus[];
  onFileClick?: (file: FileStatus) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onFileClick }) => {
  return (
    <div className="space-y-4">
      {files.map((file, index) => (
        <div 
          key={index}
          className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm ${
            file.status === 'completed' && onFileClick ? 'cursor-pointer hover:bg-gray-50' : ''
          }`}
          onClick={() => onFileClick?.(file)}
        >
          <span className="font-medium">{file.name}</span>
          <div className="flex items-center space-x-2">
            {file.status === 'converting' && (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                <span className="text-blue-500">Converting...</span>
              </>
            )}
            {file.status === 'completed' && (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-green-500">Completed</span>
              </>
            )}
            {file.status === 'error' && (
              <>
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-500">{file.error}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};