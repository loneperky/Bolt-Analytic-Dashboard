import React from 'react';
import axios from 'axios';
import { DollarSign, Car, Clock, Star, TrendingUp, Users } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import EarningsChart from '../components/EarningsChart';
import TripHistory from '../components/TripHistory';
import PerformanceGoals from '../components/PerformanceGoals';
import PeakDemandMap from '../components/PeakDemandMap';
import RatingFeedback from '../components/RatingFeedback';
import { mockEarnings, mockTrips } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  axios.defaults.withCredentials = true
  const { isDarkMode } = useTheme();
  const { user, isLoading } = useAuth(); // 👈 Get user from context

  const todayTrips = mockTrips.length;
  const averageRating = 4.6;
  const activeHours = 8.5;

  if (isLoading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      {/* Stats Overview */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Today's Earnings"
          value={`$${mockEarnings.daily}`}
          change="+12.5% from yesterday"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-green-500"
        />
        <StatsCard
          title="Trips Completed"
          value={todayTrips.toString()}
          change="+3 from yesterday"
          changeType="positive"
          icon={Car}
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Active Hours"
          value={`${activeHours}h`}
          change="Target: 10h"
          changeType="neutral"
          icon={Clock}
          iconColor="text-purple-500"
        />
        <StatsCard
          title="Average Rating"
          value={averageRating.toString()}
          change="+0.1 this week"
          changeType="positive"
          icon={Star}
          iconColor="text-yellow-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <EarningsChart />
        </div>
        <div>
          <PerformanceGoals />
        </div>
      </div>

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <TripHistory />
        </div>
        <div className="xl:col-span-1">
          <PeakDemandMap />
        </div>
        <div className="xl:col-span-1">
          <RatingFeedback />
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StatsCard
          title="Weekly Earnings"
          value={`$${mockEarnings.weekly}`}
          change="83% of target"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-green-500"
        />
        <StatsCard
          title="Monthly Earnings"
          value={`$${mockEarnings.monthly}`}
          change="+8.2% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Total Customers"
          value="1,247"
          change="This month"
          changeType="neutral"
          icon={Users}
          iconColor="text-purple-500"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
