const Company = require('../models/Company');

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ name: 1 });
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get companies on watchlist
// @route   GET /api/companies/watchlist
// @access  Public
exports.getWatchlistCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ isWatchlist: true }).sort({ name: 1 });
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Public
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a company
// @route   POST /api/companies
// @access  Public
exports.createCompany = async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const company = await newCompany.save();
    res.status(201).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a company
// @route   PUT /api/companies/:id
// @access  Public
exports.updateCompany = async (req, res) => {
  const updates = { ...req.body, updatedAt: Date.now() };
  
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a company
// @route   DELETE /api/companies/:id
// @access  Public
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    await company.remove();
    
    res.json({ message: 'Company removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};