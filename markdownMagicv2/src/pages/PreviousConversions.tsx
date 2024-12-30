import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MarkdownPreview } from '@/components/MarkdownPreview';
import { useToast } from '@/hooks/useToast';

interface Conversion {
  id: string;
  file_name: string;
  conversion_type: string;
  tokens_used: number;
  markdown_content: string;
  created_at: string;
}

export const PreviousConversions = () => {
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
          .order('created_at', { ascending: false });

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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Conversion History</h1>
          <div className="space-y-4">
            {conversions.map((conversion) => (
              <div
                key={conversion.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedConversion?.id === conversion.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedConversion(conversion)}
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
              </div>
            ))}
          </div>
        </div>
        <div className="lg:sticky lg:top-8">
          {selectedConversion && (
            <MarkdownPreview
              markdown={selectedConversion.markdown_content}
              fileName={selectedConversion.file_name}
            />
          )}
        </div>
      </div>
    </div>
  );
};