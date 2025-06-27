import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus, Receipt, Fuel, Wrench, Shield, Phone,
  MoreHorizontal, Calendar, TrendingDown, TrendingUp
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useExpenses } from '../contexts/ExpenseContext';
import { Expense } from '../types';
import { format } from 'date-fns';

const ExpensesPage: React.FC = () => {
  axios.defaults.withCredentials = true
  const { isDarkMode } = useTheme();
  const { expenses: allExpenses, fetchExpenses, addExpenses } = useExpenses();
  const [showAddExpense, setShowAddExpense] = useState(false);

  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    category: 'fuel',
    amount: 0,
    description: '',
  });


  useEffect(() => {
    console.log('Expenses:', expenses);
  }, [allExpenses]);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.description || newExpense.amount <= 0) return;

    await addExpenses(
      newExpense.date,
      newExpense.category,
      newExpense.amount,
      newExpense.description
    );

    await fetchExpenses()


    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      category: 'fuel',
      amount: 0,
      description: '',
    });
    setShowAddExpense(false);
  };

  const expenses = allExpenses || [];

  const categoryIcons = {
    fuel: Fuel,
    maintenance: Wrench,
    insurance: Shield,
    airtime: Phone,
    other: MoreHorizontal,
  };

  const categoryColors = {
    fuel: 'text-orange-500',
    maintenance: 'text-blue-500',
    insurance: 'text-green-500',
    airtime: 'text-purple-500',
    other: 'text-gray-500',
  };

  const totalExpenses = expenses?.reduce((sum, e) => sum + (e.amount || 0), 0);
  const weeklyExpenses = expenses
    ?.filter(e => new Date(e.date) >= new Date(new Date().setDate(new Date().getDate() - 7)))
    ?.reduce((sum, e) => sum + (e.amount || 0), 0);

  const monthlyExpenses = expenses
    ?.filter(e => new Date(e.date) >= new Date(new Date().setMonth(new Date().getMonth() - 1)))
    ?.reduce((sum, e) => sum + (e.amount || 0), 0);

  const expensesByCategory = expenses?.reduce((acc, expense) => {
    const key = expense.category || 'other';
    acc[key] = (acc[key] || 0) + (expense.amount || 0);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Expense Tracking
            </h1>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Monitor your driving expenses and calculate net profit
            </p>
          </div>
          <button
            onClick={() => setShowAddExpense(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Expense</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Expenses', amount: totalExpenses, icon: <TrendingDown className="w-6 h-6 text-red-600" />, bg: 'bg-red-100 dark:bg-red-900/20' },
            { label: 'Weekly Expenses', amount: weeklyExpenses, icon: <Calendar className="w-6 h-6 text-orange-600" />, bg: 'bg-orange-100 dark:bg-orange-900/20' },
            { label: 'Monthly Expenses', amount: monthlyExpenses, icon: <Receipt className="w-6 h-6 text-purple-600" />, bg: 'bg-purple-100 dark:bg-purple-900/20' },
            {
              label: 'Net Profit (Month)',
              amount: 4832.20 - (monthlyExpenses || 0),
              icon: <TrendingUp className="w-6 h-6 text-green-600" />,
              bg: 'bg-green-100 dark:bg-green-900/20',
              extra: (
                <p className="text-sm text-green-500 mt-1">
                  +{(((4832.20 - (monthlyExpenses || 0)) / 4832.20) * 100).toFixed(1)}% margin
                </p>
              )
            }
          ].map((stat, i) => (
            <div key={i} className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    ${stat.amount?.toFixed(2)}
                  </p>
                  {stat.extra}
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Expenses by Category */}
          <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Expenses by Category
            </h3>
            <div className="space-y-4">
              {Object.entries(expensesByCategory)?.map(([category, amount]) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons] || MoreHorizontal;
                const value = amount as number;
                const percentage = totalExpenses ? (value / totalExpenses) * 100 : 0;


                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <Icon className={`w-4 h-4 ${categoryColors[category as keyof typeof categoryColors]}`} />
                      </div>
                      <div>
                        <p className={`font-medium capitalize ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{category}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {percentage.toFixed(1)}% of total
                        </p>
                      </div>
                    </div>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {typeof amount === 'number' ? `$${amount.toFixed(2)}` : '$0.00'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Expenses */}
          <div className={`lg:col-span-2 p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Expenses
            </h3>
            <div className="space-y-4">
              {expenses?.slice(0, 8).map(expense => {
                const Icon = categoryIcons[expense?.category as keyof typeof categoryIcons] || MoreHorizontal;
                return (
                  <div key={expense?.id} className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                        <Icon className={`w-5 h-5 ${categoryColors[expense?.category as keyof typeof categoryColors]}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{expense?.description}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {format(new Date(expense?.date), 'MMM dd, yyyy')} • {expense?.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${expense?.amount?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Add Expense Modal */}
        {showAddExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`max-w-md w-full p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Add New Expense
              </h3>

              <form onSubmit={handleAddExpense} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as Expense['category'] })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'}`}
                  >
                    <option value="fuel">Fuel</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="insurance">Insurance</option>
                    <option value="airtime">Airtime</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newExpense.amount || ''}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'}`}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'}`}
                    placeholder="Enter expense description"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddExpense(false)}
                    className={`flex-1 px-4 py-2 border rounded-lg font-medium transition-colors ${isDarkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesPage;
