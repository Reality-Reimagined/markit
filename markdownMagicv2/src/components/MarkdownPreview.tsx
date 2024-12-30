import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Download } from 'lucide-react';

interface MarkdownPreviewProps {
  markdown: string;
  fileName: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown, fileName }) => {
  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border rounded-lg p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{fileName}</h3>
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>
      <div className="prose max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};