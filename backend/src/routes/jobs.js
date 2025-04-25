const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobsByStatus,
  getJob,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');

// Routes for /api/jobs
router.route('/')
  .get(getJobs)
  .post(createJob);

router.route('/status/:status')
  .get(getJobsByStatus);

router.route('/:id')
  .get(getJob)
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;