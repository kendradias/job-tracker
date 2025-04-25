import React from 'react';
import JobItem from './JobItem';

const JobList = ({ jobs, onDeleteJob }) => {
  return (
    <div className="job-list">
      <div className="grid gap-4">
        {jobs.map(job => (
          <JobItem 
            key={job._id} 
            job={job} 
            onDelete={() => onDeleteJob(job._id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;