import React from 'react';
import heroPic1 from '../../public/fjf/vecteezy_map-of-paris-with-red-pins-and-bokeh-lights-travel-concept_32189714.jpg'

const Hero = () => {
  return (
    <div className="relative w-full h-[420px] sm:h-[520px] md:h-[600px] lg:h-[680px] bg-gray-900">
      {/* 🔲 Background Image */}
      <img src={heroPic1} alt="" className="absolute inset-0 w-full h-full object-cover z-0 "  />

      {/* 🔳 Overlay (for readability) */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* 📝 Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-6">
        <h2 className="text-yellow-400 text-2xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Accidents Don't Wait. Neither Should You
        </h2>
        <p className="text-gray-100 max-w-xl mb-6 text-base sm:text-lg">
          A simple tap can make the difference between life and death. Quickly report accidents and automatically alert nearby emergency services.
        </p>
        <a
          href="/report"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition duration-300"
        >
          🚨 Report an Accident
        </a>
      </div>
    </div>
  );
};

export default Hero;
