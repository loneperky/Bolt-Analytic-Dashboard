import React from 'react';
import { Car, TrendingUp, Star, MapPin, DollarSign, Shield, Smartphone, BarChart3, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const HomePage: React.FC = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: DollarSign,
      title: 'Earnings Tracking',
      description: 'Monitor your daily, weekly, and monthly earnings with detailed breakdowns and trends.'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Track your performance metrics, trip completion rates, and customer satisfaction scores.'
    },
    {
      icon: MapPin,
      title: 'Peak Demand Insights',
      description: 'Discover high-demand areas and optimal driving times to maximize your earnings.'
    },
    {
      icon: Star,
      title: 'Rating Management',
      description: 'Monitor customer feedback and ratings to maintain excellent service quality.'
    },
    {
      icon: TrendingUp,
      title: 'Goal Setting',
      description: 'Set and track performance goals to stay motivated and increase your income.'
    },
    {
      icon: Shield,
      title: 'Expense Tracking',
      description: 'Track fuel, maintenance, and other expenses to calculate your true net profit.'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Bolt Dashboard
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Driver Performance Center
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isDarkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Maximize Your Bolt Driving
            <span className="text-blue-600"> Performance</span>
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Take control of your driving career with comprehensive analytics, earnings tracking,
            and performance insights designed specifically for Bolt drivers.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link
              to="/signup"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Start Tracking Now
            </Link>
            <Link
              to="/login"
              className={`px-8 py-4 font-semibold rounded-lg transition-colors text-lg border-2 ${isDarkMode
                ? 'border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                }`}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Everything You Need to Succeed
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Comprehensive tools and insights to help you maximize your earnings and improve your performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border transition-colors ${isDarkMode
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`px-6 py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Trusted by Drivers Worldwide
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of drivers who are already maximizing their earnings with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'Active Drivers' },
              { number: '$2.5M+', label: 'Earnings Tracked' },
              { number: '500K+', label: 'Trips Analyzed' },
              { number: '4.9★', label: 'Average Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.number}
                </div>
                <div className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Ready to Boost Your Earnings?
          </h2>
          <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of successful Bolt drivers who use our dashboard to track performance,
            optimize routes, and maximize their income.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            <Smartphone className="w-5 h-5 mr-2" />
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border-t px-6 py-8`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Bolt Dashboard
            </span>
          </div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Bolt Dashboard. Empowering drivers with data-driven insights.
          </p>

          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} pt-2 text-center flex gap-4 justify-center`}>
            <a href="https://github.com/loneperky"
              target="_blank" className="text-gray-400 hover:text-primary-500 transition-colors" aria-label="Github">
              <Github size={30} />
            </a>
            <a href="https://www.linkedin.com/in/christian-otasowie-074820355?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank' className="text-gray-400 hover:text-primary-500 transition-colors" aria-label="LinkedIn">
              <Linkedin size={30} />
            </a>
          </p>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} pt-2 text-right`}>Built with Bolt AI
          </p>
          <a href="https://www.boltai.tech/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://boltai.nyc3.cdn.digitaloceanspaces.com/badge-light.svg"
              alt="Built with Bolt AI"
              style={{ width: '150px', height: 'auto' }}
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;