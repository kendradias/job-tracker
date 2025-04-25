const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getWatchlistCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/companyController');

// Routes for /api/companies
router.route('/')
  .get(getCompanies)
  .post(createCompany);

router.route('/watchlist')
  .get(getWatchlistCompanies);

router.route('/:id')
  .get(getCompany)
  .put(updateCompany)
  .delete(deleteCompany);

module.exports = router;