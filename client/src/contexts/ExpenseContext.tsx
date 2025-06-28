import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Expense, ExpensesContextType } from '../types';

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);
axios.defaults.withCredentials = true;

export const ExpensesProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const BACKEND_URL = "https://bolt-analytic-dashboard.onrender.com"
  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/expenses`, { withCredentials: true });
      setExpenses(res.data.expenses);
      console.log('Fetching expenses for user...', res.data.expenses);

    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);



  const addExpenses = async (
    date: string,
    category: Expense['category'],
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
      }, { withCredentials: true });
      await fetchExpenses();
    } catch (error) {
      console.error("Add expense failed:", error);
      throw new Error("Failed to add expenses");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ExpensesContext.Provider value={{ expenses, isLoading, fetchExpenses, addExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses must be used inside an ExpensesProvider');
  }
  return context;
};
