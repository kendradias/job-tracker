import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const JobItem = ({ job, onDelete }) => {
  // Status badge color and styling
  const getStatusStyle = (status) => {
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
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-gray-600 mb-2">{job.company?.name || 'Company not specified'}</p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(job.applicationStatus)}`}>
              {job.applicationStatus}
            </span>
          </div>
          
          <div className="mt-2 sm:mt-0 sm:ml-4 flex flex-shrink-0">
            <Link 
              to={`/edit-job/${job._id}`}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 mr-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
            <button
              onClick={onDelete}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm font-medium text-gray-500">Location</div>
            <div className="mt-1 text-sm text-gray-900">{job.location || 'Not specified'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Application Date</div>
            <div className="mt-1 text-sm text-gray-900">{formatDate(job.applicationDate)}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Salary</div>
            <div className="mt-1 text-sm text-gray-900">{job.salary || 'Not specified'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Follow-up Date</div>
            <div className="mt-1 text-sm text-gray-900">{formatDate(job.followUpDate)}</div>
          </div>
        </div>
        
        {job.notes && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-500">Notes</div>
            <div className="mt-1 text-sm text-gray-900 whitespace-pre-line">{job.notes}</div>
          </div>
        )}
        
        <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
          {job.jobPostingUrl ? (
            <a 
              href={job.jobPostingUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Job Posting
            </a>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobItem;