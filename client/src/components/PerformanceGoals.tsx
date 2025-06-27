import React from 'react';
import { Target, TrendingUp, Star } from 'lucide-react';
import { mockPerformanceGoals } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const PerformanceGoals: React.FC = () => {
  const { isDarkMode } = useTheme();

  const getIconForGoalType = (type: string) => {
    switch (type) {
      case 'earnings': return TrendingUp;
      case 'trips': return Target;
      case 'rating': return Star;
      default: return Target;
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className={`rounded-xl p-6 border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Performance Goals
      </h3>
      <div className="space-y-6">
        {mockPerformanceGoals.map((goal) => {
          const Icon = getIconForGoalType(goal.type);
          const percentage = getProgressPercentage(goal.current, goal.target);
          const progressColor = getProgressColor(percentage);

          return (
            <div key={goal.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5 text-blue-500" />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {goal.title}
                  </span>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {goal.type === 'earnings' ? '$' : ''}{goal.current} / {goal.type === 'earnings' ? '$' : ''}{goal.target}
                </span>
              </div>
              <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${progressColor}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className={`flex justify-between mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span>{percentage.toFixed(1)}% complete</span>
                <span className="capitalize">{goal.period}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceGoals;