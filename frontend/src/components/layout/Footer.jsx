import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Job Tracker App
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <p className="text-gray-500 text-sm">
              Made with ❤️ by Kendra 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;