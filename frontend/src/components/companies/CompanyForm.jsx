import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getCompany, createCompany, updateCompany } from '../../services/companyService';

const CompanyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEditing = Boolean(id);

  // Initial form values
  const initialValues = {
    name: '',
    website: '',
    location: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    notes: '',
    isWatchlist: true
  };

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Company name is required'),
    website: Yup.string().url('Must be a valid URL'),
    contactEmail: Yup.string().email('Must be a valid email')
  });

  // Fetch company data if editing
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (isEditing) {
        try {
          setLoading(true);
          const data = await getCompany(id);
          setCompany(data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching company data');
          setLoading(false);
        }
      }
    };
    
    fetchCompanyData();
  }, [id, isEditing]);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditing) {
        await updateCompany(id, values);
      } else {
        await createCompany(values);
      }
      setSubmitting(false);
      navigate('/companies');
    } catch (err) {
      setError('Error saving company data');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? 'Edit Company' : 'Add New Company'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <Formik
        initialValues={company || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, values }) => (
          <Form className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Company Name *
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter company name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="website" className="block text-gray-700 font-bold mb-2">
                Website
              </label>
              <Field
                id="website"
                name="website"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="https://example.com"
              />
              <ErrorMessage name="website" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <Field
                id="location"
                name="location"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="City, State or Remote"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contactName" className="block text-gray-700 font-bold mb-2">
                Contact Person
              </label>
              <Field
                id="contactName"
                name="contactName"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Name of contact person"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contactEmail" className="block text-gray-700 font-bold mb-2">
                Contact Email
              </label>
              <Field
                id="contactEmail"
                name="contactEmail"
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="contact@example.com"
              />
              <ErrorMessage name="contactEmail" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="contactPhone" className="block text-gray-700 font-bold mb-2">
                Contact Phone
              </label>
              <Field
                id="contactPhone"
                name="contactPhone"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Phone number"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="notes" className="block text-gray-700 font-bold mb-2">
                Notes
              </label>
              <Field
                as="textarea"
                id="notes"
                name="notes"
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Additional notes about this company"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                <Field
                  type="checkbox"
                  name="isWatchlist"
                  className="mr-2 leading-tight"
                />
                <span className="text-sm">
                  Add to watchlist (companies I'm interested in)
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? 'Saving...' : 'Save Company'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/companies')}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyForm;