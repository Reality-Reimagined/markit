import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Coins, Clock, FileText } from 'lucide-react';
import { TokenCounter } from '@/components/TokenCounter';
import { ConversionHistory } from '@/components/ConversionHistory';
import { useTokens } from '@/hooks/useTokens';

export const DashboardPage = () => {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);
  const { tokenInfo } = useTokens();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your conversions and monitor your token usage
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Coins className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available Tokens</p>
              <p className="text-2xl font-semibold text-gray-900">
                {tokenInfo?.tokensRemaining || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Next Refresh</p>
              <p className="text-2xl font-semibold text-gray-900">
                {tokenInfo?.nextRefreshDate?.toLocaleDateString() || '-'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Plan</p>
              <p className="text-2xl font-semibold text-gray-900">Free</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion History Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between text-left"
        >
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-900">Conversion History</h2>
          </div>
          {isHistoryExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {isHistoryExpanded && (
          <div className="px-6 pb-6">
            <ConversionHistory />
          </div>
        )}
      </div>
    </div>
  );
};