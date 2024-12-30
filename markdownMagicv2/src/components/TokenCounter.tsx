import React from 'react';
import { Coins } from 'lucide-react';
import { useTokens } from '@/hooks/useTokens';

export const TokenCounter = () => {
  const { tokenInfo, loading } = useTokens();

  if (loading) return null;

  return (
    <div className="flex items-center space-x-2 text-sm">
      <Coins className="h-4 w-4 text-blue-600" />
      <span className="font-medium">
        {tokenInfo?.tokensRemaining} tokens remaining
      </span>
      <span className="text-gray-500">
        • Refreshes {tokenInfo?.nextRefreshDate.toLocaleDateString()}
      </span>
    </div>
  );
};