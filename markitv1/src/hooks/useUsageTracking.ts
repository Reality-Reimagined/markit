import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from './useToast';

export function useUsageTracking() {
  const { showToast } = useToast();

  const trackUsage = useCallback(async (file: File, conversionType: string, status: string) => {
    try {
      const { error } = await supabase
        .from('usage_logs')
        .insert({
          file_name: file.name,
          file_size: file.size,
          conversion_type: conversionType,
          status: status,
        });

      if (error) throw error;
    } catch (error) {
      showToast('Failed to track usage', 'error');
      console.error('Usage tracking error:', error);
    }
  }, [showToast]);

  return { trackUsage };
}