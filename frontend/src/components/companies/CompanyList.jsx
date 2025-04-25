import React from 'react';
import CompanyItem from './CompanyItem';

const CompanyList = ({ companies, onDeleteCompany }) => {
  return (
    <div className="company-list">
      <div className="grid gap-4">
        {companies.map(company => (
          <CompanyItem 
            key={company._id} 
            company={company} 
            onDelete={() => onDeleteCompany(company._id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyList;