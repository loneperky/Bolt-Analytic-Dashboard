// =======================
// Trip & Ride Data Types
// =======================

export interface DashboardData {
  earnings: Earnings;
  trips: Trip[];
  averageRating: number;
  activeHoursToday: number;
}


export interface Trip {
  id: string;
  date: string;
  pickup: string;
  dropoff: string;
  distance: number;
  duration: number;
  earnings: number;
  rating: number;
  status: 'completed' | 'cancelled';
}

export interface Earnings {
  daily: number;
  weekly: number;
  monthly: number;
  total: number;
}

export interface PerformanceGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  period: 'daily' | 'weekly' | 'monthly';
  type: 'earnings' | 'trips' | 'rating';
}

export interface PeakDemandLocation {
  name: string;
  lat: number;
  lng: number;
  demandLevel: number;
}

// =======================
// Expenses
// =======================

export interface AddExpenses {
  date: string;
  category: 'fuel' | 'maintenance' | 'insurance' | 'airtime' | 'other';
  amount: number;
  description: string;
  receipt?: string;
}


export interface Expense {
  id?: string;
  date: string;
  category: 'fuel' | 'maintenance' | 'insurance' | 'airtime' | 'other';
  amount: number;
  description: string;
  receipt?: string;
}

export interface ExpensesContextType {
  expenses: Expense[];
  isLoading: boolean;
  isLoadingExpense: boolean;
  fetchExpenses: () => void;
  addExpenses: (
    date: string,
    category: Expense['category'],
    amount: number,
    description: string,
    receipt?: string
  ) => Promise<void>;
}


// ====================
// User & Auth Types
// ====================

/**
 * Used in the app after a user has logged in.
 */
export interface User {
  id: string;
  email: string;
  fullname: string;
  driverId: string;
  phone: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };
}


/**
 * Context Type for Authentication Provider
 */
export interface AuthContextType {
  user: User | null;
  expenseData: any[] | null; // or define a proper Expense type
  isLoading: boolean;
  isLoadingDashboard: boolean,
  login: (email: string, password: string) => Promise<void>;
  signup: (
    fullname: string,
    email: string,
    password: string,
    phone: string,
    vehicleMake: string,
    vehicleModel: string,
    vehicleYear: number,
    licensePlate: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  dashboardData?: DashboardData | null;

}


/**
 * Used for the signup form and sending signup requests to backend.
 * This includes password (used only during registration).
 */
export interface SignupData {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  licensePlate: string;
}
