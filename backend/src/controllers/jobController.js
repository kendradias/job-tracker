const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('company', 'name website location')
      .sort({ applicationDate: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get jobs by status
// @route   GET /api/jobs/status/:status
// @access  Public
exports.getJobsByStatus = async (req, res) => {
  try {
    const jobs = await Job.find({ applicationStatus: req.params.status })
      .populate('company', 'name website location')
      .sort({ applicationDate: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('company');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Public
exports.createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const job = await newJob.save();
    
    // Populate the company information before sending response
    const populatedJob = await Job.findById(job._id).populate('company', 'name website location');
    
    res.status(201).json(populatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Public
exports.updateJob = async (req, res) => {
  const updates = { ...req.body, updatedAt: Date.now() };
  
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('company');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Public
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    await job.remove();
    
    res.json({ message: 'Job removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};