import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 px-6 sm:px-10 md:px-20 py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <a href="/">
            <h2 className="text-xl font-bold text-white">AlertNet</h2>
          </a>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-400 text-center md:text-left">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/report" className="hover:text-white transition">Report</Link>
          <Link to="/#latest-reports" className="hover:text-white transition">Latest Reports</Link>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 text-center md:text-right">
          &copy; {new Date().getFullYear()} AcciAlert. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
