import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const JobItem = ({ job, onDelete }) => {
  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Interested':
        return 'bg-blue-100 text-blue-800';
      case 'Applied':
        return 'bg-purple-100 text-purple-800';
      case 'Phone Screen':
        return 'bg-yellow-100 text-yellow-800';
      case 'Interview':
        return 'bg-indigo-100 text-indigo-800';
      case 'Offer':
        return 'bg-green-100 text-green-800';
      case 'Accepted':
        return 'bg-green-500 text-white';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Declined':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="job-item bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="mb-3 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
          <p className="text-gray-600">{job.company?.name || 'Company not specified'}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.applicationStatus)}`}>
          {job.applicationStatus}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-gray-500 text-sm">Location:</span>
          <p className="text-gray-700">{job.location || 'Not specified'}</p>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Application Date:</span>
          <p className="text-gray-700">{formatDate(job.applicationDate)}</p>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Salary:</span>
          <p className="text-gray-700">{job.salary || 'Not specified'}</p>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Follow-up Date:</span>
          <p className="text-gray-700">{formatDate(job.followUpDate)}</p>
        </div>
      </div>
      
      {job.notes && (
        <div className="mb-4">
          <span className="text-gray-500 text-sm">Notes:</span>
          <p className="text-gray-700 mt-1">{job.notes}</p>
        </div>
      )}
      
      <div className="flex justify-between pt-3 border-t border-gray-200">
        {job.jobPostingUrl ? (
          <a 
            href={job.jobPostingUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            View Job Posting
          </a>
        ) : (
          <span></span>
        )}
        
        <div className="flex gap-3">
          <Link 
            to={`/edit-job/${job._id}`}
            className="text-yellow-600 hover:text-yellow-800"
          >
            Edit
          </Link>
          <button 
            onClick={onDelete}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobItem;