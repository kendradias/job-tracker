import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Job Tracker</h1>
        <p className="text-xl mb-6">Keep track of your job applications and companies you're interested in</p>
        
        <div className="flex justify-center gap-4">
          <Link 
            to="/add-job" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Add New Job
          </Link>
          <Link 
            to="/add-company" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Add New Company
          </Link>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
          <p className="mb-4">Track all your job applications in one place. Keep notes, status updates, and follow-up dates.</p>
          <Link 
            to="/jobs" 
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            View All Applications →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Watchlist Companies</h2>
          <p className="mb-4">Keep an eye on companies you're interested in, even if they don't have current openings.</p>
          <Link 
            to="/companies" 
            className="text-green-600 hover:text-green-800 font-semibold"
          >
            View Watchlist Companies →
          </Link>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Start Organizing Your Job Search</h2>
        <p className="mb-6">Use this tool to stay on top of opportunities and never miss a follow-up.</p>
      </div>
    </div>
  );
};

export default Home;