import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white shadow-md w-full">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Job Tracker
            </Link>
          </div>
          
          {/* Desktop menu - ONLY VISIBLE ON SM AND UP */}
          <div className="hidden sm:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink
                to="/"
                end
                className={({ isActive }) => 
                  isActive
                    ? "bg-indigo-100 text-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/jobs"
                className={({ isActive }) => 
                  isActive
                    ? "bg-indigo-100 text-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Job Applications
              </NavLink>
              <NavLink
                to="/companies"
                className={({ isActive }) => 
                  isActive
                    ? "bg-indigo-100 text-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Companies
              </NavLink>
              
              {/* CTA buttons integrated with desktop nav */}
              <div className="ml-4 flex items-center space-x-3">
                <Link
                  to="/add-job"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add Job
                </Link>
                <Link
                  to="/add-company"
                  className="bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add Company
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button - ONLY VISIBLE ON XS */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu - CONDITIONALLY SHOWN AND ONLY ON XS */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 max-w-7xl mx-auto">
            <NavLink
              to="/"
              end
              className={({ isActive }) => 
                isActive
                  ? "bg-indigo-100 text-indigo-700 block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/jobs"
              className={({ isActive }) => 
                isActive
                  ? "bg-indigo-100 text-indigo-700 block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Job Applications
            </NavLink>
            <NavLink
              to="/companies"
              className={({ isActive }) => 
                isActive
                  ? "bg-indigo-100 text-indigo-700 block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Companies
            </NavLink>
            <div className="pt-4 mt-3 border-t border-gray-300">
              <Link
                to="/add-job"
                className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700 mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Job
              </Link>
              <Link
                to="/add-company"
                className="block px-3 py-2 rounded-md text-base font-medium bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Company
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;