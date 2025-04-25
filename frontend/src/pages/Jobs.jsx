import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobs, deleteJob } from '../services/jobService';
import JobList from '../components/jobs/JobList';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const statusFilters = [
    'All', 
    'Interested',
    'Applied',
    'Phone Screen',
    'Interview',
    'Offer',
    'Accepted',
    'Rejected',
    'Declined'
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Could not load jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        await deleteJob(jobId);
        setJobs(jobs.filter(job => job._id !== jobId));
      } catch (err) {
        console.error('Error deleting job:', err);
        setError('Failed to delete job. Please try again.');
      }
    }
  };

  const filteredJobs = activeFilter === 'All' 
    ? jobs 
    : jobs.filter(job => job.applicationStatus === activeFilter);

  return (
    <div className="jobs-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <Link
          to="/add-job"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Job
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activeFilter === filter 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading job applications...</p>
        </div>
      ) : filteredJobs.length > 0 ? (
        <JobList jobs={filteredJobs} onDeleteJob={handleDeleteJob} />
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No job applications found.</p>
          {activeFilter !== 'All' ? (
            <button 
              onClick={() => setActiveFilter('All')}
              className="text-blue-500 hover:text-blue-700"
            >
              Clear filter
            </button>
          ) : (
            <Link
              to="/add-job"
              className="text-blue-500 hover:text-blue-700"
            >
              Add your first job application
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;