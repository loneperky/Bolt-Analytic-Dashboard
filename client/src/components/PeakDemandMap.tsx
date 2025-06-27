import React from 'react';
import { MapPin, TrendingUp } from 'lucide-react';
import { mockPeakDemandLocations } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const PeakDemandMap: React.FC = () => {
  const { isDarkMode } = useTheme();

  const getDemandColor = (level: number) => {
    if (level >= 90) return 'bg-red-500';
    if (level >= 80) return 'bg-orange-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getDemandLabel = (level: number) => {
    if (level >= 90) return 'Very High';
    if (level >= 80) return 'High';
    if (level >= 70) return 'Medium';
    return 'Low';
  };

  return (
    <div className={`rounded-xl p-6 border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Peak Demand Areas
        </h3>
        <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">Live Updates</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {mockPeakDemandLocations.map((location, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-500" />
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {location.name}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {getDemandLabel(location.demandLevel)} demand
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${getDemandColor(location.demandLevel)}`}
              />
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {location.demandLevel}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className={`mt-6 p-4 rounded-lg border ${
        isDarkMode 
          ? 'bg-blue-900/20 border-blue-800' 
          : 'bg-blue-50 border-blue-200'
      }`}>
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <span className="text-blue-400 font-medium text-sm">Recommendation</span>
        </div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Head to Downtown area for highest demand. Peak hours: 8-10 AM, 5-7 PM
        </p>
      </div>
    </div>
  );
};

export default PeakDemandMap;