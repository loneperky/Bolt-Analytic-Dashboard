import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { SignupData } from '../types';
import axios from 'axios';

const SignupPage: React.FC = () => {
  axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
  const { signup } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupData>({
    fullname: '',
    email: '',
    password: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: new Date().getFullYear(),
    licensePlate: ''
  });
  const cleanedName = formData.fullname.toUpperCase()

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'vehicleYear' ? parseInt(value) : value
    }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullname || !formData.email || !formData.password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.phone || !formData.vehicleMake || !formData.vehicleModel || !formData.licensePlate) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/^\d{4}$/.test(formData.vehicleYear.toString())) {
      toast.error('Please select a valid vehicle year');
      return;
    }

    try {
      setIsLoading(true);
      await signup(
        cleanedName,
        formData.email,
        formData.password,
        formData.phone,
        formData.vehicleMake,
        formData.vehicleModel,
        formData.vehicleYear,
        formData.licensePlate
      );

      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const inputClasses = `mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDarkMode
    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
    }`;

  const labelClasses = `block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
    }`;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Car className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Join Bolt Dashboard</h2>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Create your account to start tracking your performance
          </p>
        </div>

        {/* Step Progress Indicator */}
        <div className="flex items-center justify-center space-x-4">
          {[1, 2].map(s => (
            <React.Fragment key={s}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${step >= s
                ? 'bg-blue-600 text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-200 text-gray-600'
                }`}>
                {s}
              </div>
              {s === 1 && <div className={`w-12 h-1 rounded ${step >= 2 ? 'bg-blue-600' : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        {error && <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleStep1Submit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className={labelClasses}>Full Name</label>
                <input id="name" name="fullname" type="text" value={formData.fullname} onChange={handleInputChange} className={inputClasses} placeholder="Enter your name" required />
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className={inputClasses} placeholder="Enter your email" required />
              </div>

              <div>
                <label htmlFor="password" className={labelClasses}>Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Create a password"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClasses}
                    placeholder="Confirm password"
                    required
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium text-sm">
              Continue
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleStep2Submit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className={inputClasses} placeholder="Phone number" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="vehicleMake" className={labelClasses}>Vehicle Make</label>
                  <input id="vehicleMake" name="vehicleMake" type="text" value={formData.vehicleMake} onChange={handleInputChange} className={inputClasses} placeholder="Toyota" required />
                </div>

                <div>
                  <label htmlFor="vehicleModel" className={labelClasses}>Vehicle Model</label>
                  <input id="vehicleModel" name="vehicleModel" type="text" value={formData.vehicleModel} onChange={handleInputChange} className={inputClasses} placeholder="Camry" required />
                </div>
              </div>

              <div>
                <label htmlFor="vehicleYear" className={labelClasses}>Vehicle Year</label>
                <select id="vehicleYear" name="vehicleYear" value={formData.vehicleYear} onChange={handleInputChange} className={inputClasses} required>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="licensePlate" className={labelClasses}>License Plate</label>
                <input id="licensePlate" name="licensePlate" type="text" value={formData.licensePlate} onChange={handleInputChange} className={inputClasses} placeholder="ABC-123" required />
              </div>
            </div>

            <div className="flex space-x-4">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 px-4 border rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800">
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
              </button>
            </div>
          </form>
        )}

        <div className="text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
