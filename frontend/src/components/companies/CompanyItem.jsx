import React from 'react';
import { Link } from 'react-router-dom';

const CompanyItem = ({ company, onDelete }) => {
  return (
    <div className="company-item bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="mb-3 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{company.name}</h3>
          <p className="text-gray-600">{company.location || 'Location not specified'}</p>
        </div>
        
        {company.isWatchlist && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Watchlist
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        {company.website && (
          <div className="col-span-2">
            <span className="text-gray-500 text-sm">Website:</span>
            <a 
              href={company.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-blue-500 hover:text-blue-700"
            >
              {company.website}
            </a>
          </div>
        )}
        
        {company.contactName && (
          <div>
            <span className="text-gray-500 text-sm">Contact Person:</span>
            <p className="text-gray-700">{company.contactName}</p>
          </div>
        )}
        
        {company.contactEmail && (
          <div>
            <span className="text-gray-500 text-sm">Contact Email:</span>
            <a 
              href={`mailto:${company.contactEmail}`}
              className="block text-blue-500 hover:text-blue-700"
            >
              {company.contactEmail}
            </a>
          </div>
        )}
        
        {company.contactPhone && (
          <div>
            <span className="text-gray-500 text-sm">Contact Phone:</span>
            <a 
              href={`tel:${company.contactPhone}`}
              className="block text-blue-500 hover:text-blue-700"
            >
              {company.contactPhone}
            </a>
          </div>
        )}
      </div>
      
      {company.notes && (
        <div className="mb-4">
          <span className="text-gray-500 text-sm">Notes:</span>
          <p className="text-gray-700 mt-1">{company.notes}</p>
        </div>
      )}
      
      <div className="flex justify-between pt-3 border-t border-gray-200">
        <Link 
          to="/add-job" 
          state={{ companyId: company._id }}
          className="text-blue-500 hover:text-blue-700"
        >
          Apply to a Job
        </Link>
        
        <div className="flex gap-3">
          <Link 
            to={`/edit-company/${company._id}`}
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

export default CompanyItem;