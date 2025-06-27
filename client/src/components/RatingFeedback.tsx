import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const RatingFeedback: React.FC = () => {
  const { isDarkMode } = useTheme();

  const recentFeedback = [
    { id: 1, rating: 5, comment: "Great driver, very professional and friendly!", date: "2025-01-27" },
    { id: 2, rating: 4, comment: "Clean car and safe driving. Thank you!", date: "2025-01-26" },
    { id: 3, rating: 5, comment: "Perfect ride, arrived quickly.", date: "2025-01-26" },
    { id: 4, rating: 5, comment: "Excellent service and navigation skills.", date: "2025-01-25" },
  ];

  const averageRating = 4.6;
  const totalRatings = 247;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-500 fill-current' : isDarkMode ? 'text-gray-600' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`rounded-xl p-6 border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Rating & Feedback
      </h3>
      
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-center">
            <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {averageRating}
            </div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              {renderStars(Math.floor(averageRating))}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {totalRatings} ratings
            </div>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = stars === 5 ? 156 : stars === 4 ? 78 : stars === 3 ? 10 : stars === 2 ? 2 : 1;
              const percentage = (count / totalRatings) * 100;
              
              return (
                <div key={stars} className="flex items-center space-x-2 mb-1">
                  <span className={`text-sm w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stars}
                  </span>
                  <Star className="w-3 h-3 text-yellow-500" />
                  <div className={`flex-1 rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className={`text-sm w-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Feedback
          </h4>
          <div className="flex items-center space-x-1 text-green-500">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm">98% positive</span>
          </div>
        </div>
        
        {recentFeedback.map((feedback) => (
          <div key={feedback.id} className={`rounded-lg p-4 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {renderStars(feedback.rating)}
              </div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {feedback.date}
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {feedback.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingFeedback;