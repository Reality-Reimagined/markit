import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MarkdownPreview } from './MarkdownPreview';
import { useToast } from '@/hooks/useToast';

interface Conversion {
  id: string;
  file_name: string;
  conversion_type: string;
  tokens_used: number;
  markdown_content: string;
  created_at: string;
}

export const ConversionHistory = () => {
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversion, setSelectedConversion] = useState<Conversion | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchConversions = async () => {
      try {
        const { data, error } = await supabase
          .from('conversion_history')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setConversions(data);
      } catch (error) {
        console.error('Error fetching conversions:', error);
        showToast('Failed to load conversion history', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchConversions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (conversions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No conversions yet. Start by converting your first file!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {conversions.map((conversion) => (
        <div
          key={conversion.id}
          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
            selectedConversion?.id === conversion.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => setSelectedConversion(
            selectedConversion?.id === conversion.id ? null : conversion
          )}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{conversion.file_name}</h3>
              <p className="text-sm text-gray-500">
                {new Date(conversion.created_at).toLocaleDateString()}
              </p>
            </div>
            <span className="text-sm text-gray-500">
              {conversion.tokens_used} tokens
            </span>
          </div>
          {selectedConversion?.id === conversion.id && (
            <div className="mt-4">
              <MarkdownPreview
                markdown={conversion.markdown_content}
                fileName={conversion.file_name}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};