import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from './useToast';

interface TokenInfo {
  tokensRemaining: number;
  nextRefreshDate: Date;
}

export function useTokens() {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('user_tokens')
        .select('tokens_remaining, next_refresh_date')
        .single();

      if (error) throw error;

      setTokenInfo({
        tokensRemaining: data.tokens_remaining,
        nextRefreshDate: new Date(data.next_refresh_date),
      });
    } catch (error) {
      console.error('Error fetching tokens:', error);
      showToast('Failed to fetch token information', 'error');
    } finally {
      setLoading(false);
    }
  };

  const useTokens = async (amount: number): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('use_tokens', { amount });
      
      if (error) throw error;

      await fetchTokens(); // Refresh token count
      return true;
    } catch (error) {
      console.error('Error using tokens:', error);
      showToast('Insufficient tokens. Please upgrade your plan.', 'error');
      return false;
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return {
    tokenInfo,
    loading,
    useTokens,
    refreshTokens: fetchTokens,
  };
}