import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Companies from './pages/Companies';
import JobForm from './components/jobs/JobForm';
import CompanyForm from './components/companies/CompanyForm';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/add-job" element={<JobForm />} />
            <Route path="/edit-job/:id" element={<JobForm />} />
            <Route path="/add-company" element={<CompanyForm />} />
            <Route path="/edit-company/:id" element={<CompanyForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;