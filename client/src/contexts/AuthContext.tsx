// src/context/authContext.tsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContextType, User, Expense, DashboardData } from '../types';


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState<User | null>(null);
  const [expenseData, setExpenseData] = useState<Expense[] | null>(null); // ✅ updated type
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDashboard, setIsLoadingDash] = useState(false)
  const [isLoadingExpense, setIsLoadingExpense] = useState(false)
  const BACKEND_URL = "https://bolt-analytic-dashboard.onrender.com"
  const getProfile = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${BACKEND_URL}/api/profile`, { withCredentials: true });
      const u = res.data?.user;

      if (!u) {
        setUser(null);
        return;
      }

      setUser({
        id: u.id,
        email: u.email,
        fullname: u.fullname,
        driverId: u.id,
        phone: u.phone,
        vehicleInfo: {
          make: u.vehicle_make,
          model: u.vehicle_model,
          year: u.vehicle_year,
          licensePlate: u.license_plate,
        },
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getDashboardData = async () => {

    setIsLoadingDash(true)
    try {
      const res = await axios.get(`${BACKEND_URL}/api/dashboard`, { withCredentials: true });
      const data = res.data?.dashboard;

      if (!data) {
        setDashboardData(null);
        return;
      }

      setDashboardData(data);
    } catch (err) {
      console.error("Failed to fetch dashboard:", err);
      setDashboardData(null);
    } finally {
      setIsLoadingDash(false)
    }
  };


  const getExpenses = async () => {
    setIsLoadingExpense(true)
    try {
      const response = await axios.get(`${BACKEND_URL}/api/expenses`, {
        withCredentials: true
      });
      const expenses = response?.data?.expenses;
      if (!expenses || expenses.length === 0) {
        setExpenseData([]);
        return;
      } else {
        setExpenseData(expenses);
        return
      }
    } catch (error: any) {
      console.error("Error fetching expenses:", error);
      setExpenseData([]);
    } finally {
      setIsLoadingExpense(false)
    }
  };

  const addExpenses = async (
    date: string,
    category: Expense['category'], // ✅ use the correct enum type
    amount: number,
    description: string,
    receipt?: string
  ) => {
    setIsLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/add`, {
        date,
        category,
        amount,
        description,
        receipt: receipt || null,
      }, {
        withCredentials: true
      });
      await getExpenses();
    } catch (error) {
      console.error("Add expense failed:", error);
      throw new Error("Failed to add expenses");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/auth/login`, { email, password }, { withCredentials: true });
      await getProfile();
    } catch (error) {
      console.error(error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    fullname: string,
    email: string,
    password: string,
    phone: string,
    vehicleMake: string,
    vehicleModel: string,
    vehicleYear: number,
    licensePlate: string
  ) => {
    setIsLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/auth/signup`, {
        fullname,
        email,
        password,
        phone,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        licensePlate,
      }, { withCredentials: true });
      await getProfile();
    } catch (error) {
      console.error(error);
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/auth/logout`);
      setUser(null);
    } catch (error) {
      console.error(error);
      throw new Error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        addExpenses,
        getExpenses,
        login,
        signup,
        logout,
        expenseData,
        isLoading,
        isLoadingDashboard,
        isLoadingExpense,
        getDashboardData,
        dashboardData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
