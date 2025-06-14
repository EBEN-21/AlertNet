import React from 'react';
import note from '../../public/fjf/article_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
import locate from '../../public/fjf/location_on_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
import fire from '../../public/fjf/emergency_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';

const steps = [
  {
    id: 1,
    icon: note,
    title: 'Step 1',
    description: 'Fill in the accident details clearly.'
  },
  {
    id: 2,
    icon: locate,
    title: 'Step 2',
    description: 'Your current location will be attached automatically.'
  },
  {
    id: 3,
    icon: fire,
    title: 'Step 3',
    description: 'Submit the report to alert emergency services.'
  }
];

const Works = () => {
  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center py-14 px-6 sm:px-20">
      <h2 className="text-white font-bold text-3xl mb-10">How To Report</h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
        {steps.map(step => (
          <div
            key={step.id}
            className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center text-center text-white shadow-lg hover:shadow-blue-500/30 transition"
          >
            <img src={step.icon} alt={step.title} className="w-16 h-16 mb-4" />
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-gray-300 text-base">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
