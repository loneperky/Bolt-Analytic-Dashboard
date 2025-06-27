import React from 'react';
import { MapPin, Clock, Star, DollarSign } from 'lucide-react';
import { mockTrips } from '../data/mockData';
import { format } from 'date-fns';
import { useTheme } from '../contexts/ThemeContext';

const TripHistory: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`rounded-xl p-6 border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Recent Trips
      </h3>
      <div className="space-y-4">
        {mockTrips.slice(0, 5).map((trip) => (
          <div
            key={trip.id}
            className={`rounded-lg p-4 transition-colors ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {trip.pickup}
                  </span>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>→</span>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {trip.dropoff}
                  </span>
                </div>
                <div className={`flex items-center space-x-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{format(new Date(trip.date), 'MMM dd, HH:mm')}</span>
                  </div>
                  <span>{trip.distance} km</span>
                  <span>{trip.duration} min</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {trip.rating}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    ${trip.earnings}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className={`w-full mt-4 py-2 text-sm font-medium transition-colors ${
        isDarkMode 
          ? 'text-blue-400 hover:text-blue-300' 
          : 'text-blue-600 hover:text-blue-700'
      }`}>
        View All Trips
      </button>
    </div>
  );
};

export default TripHistory;