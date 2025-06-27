import { Trip, Earnings, PerformanceGoal, PeakDemandLocation } from '../types';

export const mockTrips: Trip[] = [
  {
    id: '001',
    date: '2025-01-27T09:15:00Z',
    pickup: 'Downtown Plaza',
    dropoff: 'Airport Terminal 2',
    distance: 18.5,
    duration: 35,
    earnings: 42.80,
    rating: 5,
    status: 'completed'
  },
  {
    id: '002',
    date: '2025-01-27T10:45:00Z',
    pickup: 'Business District',
    dropoff: 'Shopping Mall',
    distance: 12.3,
    duration: 22,
    earnings: 28.50,
    rating: 4,
    status: 'completed'
  },
  {
    id: '003',
    date: '2025-01-27T14:20:00Z',
    pickup: 'University Campus',
    dropoff: 'City Center',
    distance: 8.7,
    duration: 18,
    earnings: 19.20,
    rating: 5,
    status: 'completed'
  },
  {
    id: '004',
    date: '2025-01-27T16:10:00Z',
    pickup: 'Residential Area',
    dropoff: 'Train Station',
    distance: 15.2,
    duration: 28,
    earnings: 35.40,
    rating: 4,
    status: 'completed'
  },
  {
    id: '005',
    date: '2025-01-27T18:30:00Z',
    pickup: 'Restaurant District',
    dropoff: 'Suburbs',
    distance: 22.1,
    duration: 40,
    earnings: 48.60,
    rating: 5,
    status: 'completed'
  }
];

export const mockEarnings: Earnings = {
  daily: 174.50,
  weekly: 1248.30,
  monthly: 4832.20,
  total: 28456.80
};

export const mockPerformanceGoals: PerformanceGoal[] = [
  {
    id: '1',
    title: 'Weekly Earnings Target',
    target: 1500,
    current: 1248.30,
    period: 'weekly',
    type: 'earnings'
  },
  {
    id: '2',
    title: 'Daily Trip Target',
    target: 12,
    current: 8,
    period: 'daily',
    type: 'trips'
  },
  {
    id: '3',
    title: 'Monthly Rating Goal',
    target: 4.8,
    current: 4.6,
    period: 'monthly',
    type: 'rating'
  }
];

export const mockPeakDemandLocations: PeakDemandLocation[] = [
  { name: 'Downtown', lat: 40.7128, lng: -74.0060, demandLevel: 95 },
  { name: 'Airport', lat: 40.6892, lng: -74.1745, demandLevel: 88 },
  { name: 'Business District', lat: 40.7580, lng: -73.9855, demandLevel: 82 },
  { name: 'University', lat: 40.8075, lng: -73.9626, demandLevel: 76 },
  { name: 'Shopping Mall', lat: 40.7505, lng: -73.9934, demandLevel: 71 }
];