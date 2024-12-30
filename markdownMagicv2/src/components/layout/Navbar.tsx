import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { UserMenu } from './UserMenu';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">.MD Magic</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/pricing" className="text-gray-700 hover:text-blue-500">
              Pricing
            </Link>
            <Link to="/convert" className="text-gray-700 hover:text-blue-500">
              Convert
            </Link>
            <Link to="/batch" className="text-gray-700 hover:text-blue-500">
              Batch Convert
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">
              Dashboard
            </Link>
            {user ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/convert"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-500"
            >
              Convert
            </Link>
            <Link
              to="/batch"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-500"
            >
              Batch Convert
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-500"
            >
              Dashboard
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-500"
            >
              Pricing
            </Link>
            {!user && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-500"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-500"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
