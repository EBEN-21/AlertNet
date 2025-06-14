import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-8 px-20  ">
      <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 border-t border-white/10 pt-10">
        <div className="text-center md:text-left">
          <a href="/"><h2 className="text-xl font-bold text-white">AlertNet</h2></a>
          
        </div>

        <div className="flex flex-col sm:flex-row gap-4 md:ml-32 text-sm text-gray-400">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/report" className="hover:text-white transition">Report</Link>
          <Link to="/#latest-reports" className="hover:text-white transition">Latest Reports</Link>
          <a href="" className="hover:text-white transition">Contact</a>
        </div>

        <p className="text-xs text-gray-500 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} AcciAlert. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
