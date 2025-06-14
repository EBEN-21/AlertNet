import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LatestReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const dummyReports = [
      {
        type: 'Vehicle Collision',
        severity: 'Moderate',
        description: 'Two cars collided at a T-junction.',
        location: 'GRA Phase 2, Port Harcourt',
        time: new Date().toISOString(),
        image: '/fjf/car-collision-yield-to-right.jpg'
      },
      {
        type: 'Fire Outbreak',
        severity: 'Severe',
        description: 'House caught fire near Stadium Road.',
        location: 'Stadium Road, Port Harcourt',
        time: new Date().toISOString(),
        image: '/fjf/fire.jpg'
      },
      {
        type: 'Motorcycle Accident',
        severity: 'Minor',
        description: 'Bike slid on wet road at Rumuola.',
        location: 'Rumuola, Port Harcourt',
        time: new Date().toISOString(),
        image: '/fjf/motorcycle.jpg'
      }
    ];

    const storedReports = JSON.parse(localStorage.getItem('accidentReports')) || [];

    const newestFirst = [...storedReports].reverse();
    const maxReports = 6;

    let combined = [...newestFirst];
    if (combined.length < maxReports) {
      const remaining = maxReports - combined.length;
      combined = [...combined, ...dummyReports.slice(0, remaining)];
    }

    setReports(combined);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Severe':
        return 'bg-red-600';
      case 'Moderate':
        return 'bg-yellow-400 text-black';
      case 'Minor':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section className="pt-20 px-4 sm:px-20 bg-gray-950 min-h-[50vh]">
      <h2 className="text-3xl font-bold text-center text-white mb-6">📰 Latest Reports</h2>

      {reports.length === 0 ? (
        <p className="text-gray-400 text-center">No reports submitted yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.slice(0, 6).map((report, index) => (
            <div
              key={index}
              onClick={() => setSelectedReport(report)}
              className={`cursor-pointer bg-gray-800 rounded-xl p-6 shadow-md border border-gray-700 hover:shadow-blue-500/30 transition ${
                !report.image ? 'flex flex-col justify-end text-left' : ''
              }`}
            >
              {report.image && (
                <img
                  src={report.image}
                  alt="Accident"
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              <div className="flex justify-between items-start mb-2 w-full">
                <p className="text-white text-sm sm:text-base leading-relaxed min-h-[72px] line-clamp-4">
                  {report.description || 'No description'}
                </p>
                <span
                  className={`text-white text-xs px-2 py-1 rounded-full ml-2 mt-1 ${getSeverityColor(
                    report.severity
                  )}`}
                >
                  {report.severity}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-1">📍 {report.location || 'Unknown'}</p>
              <p className="text-xs text-gray-400">🕒 {new Date(report.time).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedReport && (
          <>
            <motion.div
              className="fixed inset-0 bg-gray-950 bg-opacity-60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                >
                  ×
                </button>

                <h3 className="text-2xl font-semibold text-red-600 mb-4">🚨 Report Details</h3>
                <div className="space-y-2 text-gray-800 text-lg">
                  <p><strong>Type:</strong> {selectedReport.type}</p>
                  <p><strong>Description:</strong> {selectedReport.description}</p>
                  <p><strong>Severity:</strong> {selectedReport.severity}</p>
                  <p><strong>Location:</strong> {selectedReport.location || 'Unknown'}</p>
                  <p><strong>Time:</strong> {new Date(selectedReport.time).toLocaleString()}</p>
                  {selectedReport.image && (
                    <img
                      src={selectedReport.image}
                      alt="Accident"
                      className="mt-4 rounded-xl border border-gray-300 w-full max-h-[300px] object-cover"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LatestReports;
