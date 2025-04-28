import React from 'react';
import JobItem from './JobItem';

const JobList = ({ jobs, onDeleteJob }) => {
  return (
    <div className="job-list">
      <ul className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
        {jobs.map(job => (
          <li key={job._id}>
            <JobItem 
              job={job} 
              onDelete={() => onDeleteJob(job._id)} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;