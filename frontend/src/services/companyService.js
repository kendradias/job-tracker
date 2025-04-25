import api from './api';

export const getCompanies = async () => {
  try {
    const response = await api.get('/companies');
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

export const getWatchlistCompanies = async () => {
  try {
    const response = await api.get('/companies/watchlist');
    return response.data;
  } catch (error) {
    console.error('Error fetching watchlist companies:', error);
    throw error;
  }
};

export const getCompany = async (id) => {
  try {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching company ${id}:`, error);
    throw error;
  }
};

export const createCompany = async (companyData) => {
  try {
    const response = await api.post('/companies', companyData);
    return response.data;
  } catch (error) {
    console.error('Error creating company:', error);
    throw error;
  }
};

export const updateCompany = async (id, companyData) => {
  try {
    const response = await api.put(`/companies/${id}`, companyData);
    return response.data;
  } catch (error) {
    console.error(`Error updating company ${id}:`, error);
    throw error;
  }
};

export const deleteCompany = async (id) => {
  try {
    const response = await api.delete(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting company ${id}:`, error);
    throw error;
  }
};