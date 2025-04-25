import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCompanies, deleteCompany } from '../services/companyService';
import CompanyList from '../components/companies/CompanyList';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await getCompanies();
      setCompanies(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Could not load companies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompany = async (companyId) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await deleteCompany(companyId);
        setCompanies(companies.filter(company => company._id !== companyId));
      } catch (err) {
        console.error('Error deleting company:', err);
        setError('Failed to delete company. Please try again.');
      }
    }
  };

  const filteredCompanies = showWatchlistOnly 
    ? companies.filter(company => company.isWatchlist) 
    : companies;

  return (
    <div className="companies-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Companies</h1>
        <Link
          to="/add-company"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Company
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="mb-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={showWatchlistOnly}
            onChange={() => setShowWatchlistOnly(!showWatchlistOnly)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Show watchlist companies only</span>
        </label>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading companies...</p>
        </div>
      ) : filteredCompanies.length > 0 ? (
        <CompanyList companies={filteredCompanies} onDeleteCompany={handleDeleteCompany} />
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No companies found.</p>
          {showWatchlistOnly ? (
            <button 
              onClick={() => setShowWatchlistOnly(false)}
              className="text-blue-500 hover:text-blue-700"
            >
              Show all companies
            </button>
          ) : (
            <Link
              to="/add-company"
              className="text-green-500 hover:text-green-700"
            >
              Add your first company
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Companies;