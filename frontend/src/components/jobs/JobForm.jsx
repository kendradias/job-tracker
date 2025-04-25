import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getJob, createJob, updateJob } from '../../services/jobService';
import { getCompanies } from '../../services/companyService';
import { format } from 'date-fns';

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEditing = Boolean(id);

  // Initial form values
  const initialValues = {
    title: '',
    company: '',
    jobDescription: '',
    location: '',
    salary: '',
    jobPostingUrl: '',
    applicationDate: format(new Date(), 'yyyy-MM-dd'),
    applicationStatus: 'Interested',
    followUpDate: '',
    notes: ''
  };

  // Form validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Job title is required'),
    company: Yup.string().required('Company is required'),
    applicationStatus: Yup.string().required('Application status is required')
  });

  // Fetch job data if editing and get companies list
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch companies list
        const companiesData = await getCompanies();
        setCompanies(companiesData);

        // If editing, fetch job data
        if (isEditing) {
          const jobData = await getJob(id);
          
          // Format dates for form inputs
          if (jobData.applicationDate) {
            jobData.applicationDate = format(new Date(jobData.applicationDate), 'yyyy-MM-dd');
          }
          if (jobData.followUpDate) {
            jobData.followUpDate = format(new Date(jobData.followUpDate), 'yyyy-MM-dd');
          }
          
          // Set company ID as string
          if (jobData.company && jobData.company._id) {
            jobData.company = jobData.company._id;
          }
          
          setJob(jobData);
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, isEditing]);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Parse dates back to Date objects if they exist
      if (values.applicationDate) {
        values.applicationDate = new Date(values.applicationDate);
      }
      if (values.followUpDate) {
        values.followUpDate = new Date(values.followUpDate);
      }

      if (isEditing) {
        await updateJob(id, values);
      } else {
        await createJob(values);
      }
      setSubmitting(false);
      navigate('/jobs');
    } catch (err) {
      console.error(err);
      setError('Error saving job data');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? 'Edit Job Application' : 'Add New Job Application'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <Formik
        initialValues={job || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, values }) => (
          <Form className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Job Title *
              </label>
              <Field
                id="title"
                name="title"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter job title"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700 font-bold mb-2">
                Company *
              </label>
              <Field
                as="select"
                id="company"
                name="company"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a company</option>
                {companies.map(company => (
                  <option key={company._id} value={company._id}>{company.name}</option>
                ))}
              </Field>
              <ErrorMessage name="company" component="div" className="text-red-500 text-sm mt-1" />
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => navigate('/add-company')}
                  className="text-blue-500 hover:text-blue-800 text-sm"
                >
                  + Add New Company
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="jobDescription" className="block text-gray-700 font-bold mb-2">
                Job Description
              </label>
              <Field
                as="textarea"
                id="jobDescription"
                name="jobDescription"
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Job responsibilities and requirements"
              />
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
              <label htmlFor="salary" className="block text-gray-700 font-bold mb-2">
                Salary Range
              </label>
              <Field
                id="salary"
                name="salary"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., $60,000 - $80,000"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="jobPostingUrl" className="block text-gray-700 font-bold mb-2">
                Job Posting URL
              </label>
              <Field
                id="jobPostingUrl"
                name="jobPostingUrl"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="https://example.com/job"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="applicationDate" className="block text-gray-700 font-bold mb-2">
                Application Date
              </label>
              <Field
                id="applicationDate"
                name="applicationDate"
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="applicationStatus" className="block text-gray-700 font-bold mb-2">
                Application Status *
              </label>
              <Field
                as="select"
                id="applicationStatus"
                name="applicationStatus"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Interested">Interested</option>
                <option value="Applied">Applied</option>
                <option value="Phone Screen">Phone Screen</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
                <option value="Declined">Declined</option>
                <option value="Accepted">Accepted</option>
              </Field>
              <ErrorMessage name="applicationStatus" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="followUpDate" className="block text-gray-700 font-bold mb-2">
                Follow-up Date
              </label>
              <Field
                id="followUpDate"
                name="followUpDate"
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="notes" className="block text-gray-700 font-bold mb-2">
                Notes
              </label>
              <Field
                as="textarea"
                id="notes"
                name="notes"
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Additional notes about this application"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? 'Saving...' : 'Save Job'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/jobs')}
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

export default JobForm;