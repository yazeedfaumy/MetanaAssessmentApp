import React, { useState } from 'react';
import { CogIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('Content');
  const [steps, setSteps] = useState([
    { id: 1, name: 'Welcome screen' },
    { id: 2, name: 'Email' },
    { id: 3, name: 'End screen' },
  ]);

  const addField = () => {
    const newField = { id: Date.now(), name: 'New Field' };
    setSteps([...steps, newField]);
  };

  const removeStep = (id) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  return (
    <div className="w-64 bg-white h-screen flex flex-col shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Dashboard</span>
          <span className="text-gray-400">›</span>
          <span className="font-semibold">yazeed</span>
        </div>
        <CogIcon className="h-5 w-5 text-gray-500" />
      </div>

      {/* Tabs */}
      <div className="flex p-2 space-x-1 bg-gray-100">
        {['Content', 'Design', 'Share', 'Replies'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              activeTab === tab ? 'bg-white text-blue-600' : 'text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold mb-1">Steps</h2>
        <p className="text-xs text-gray-500 mb-4">The steps users will take to complete the form</p>
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center mb-3">
            <div className={`w-6 h-6 rounded-full ${index === 0 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'} flex items-center justify-center text-xs font-medium mr-2`}>
              {index === 0 ? '1' : index === 1 ? '::' : 'o'}
            </div>
            <span className="text-sm">{step.name}</span>
            {index === 1 && (
              <TrashIcon
                onClick={() => removeStep(step.id)}
                className="h-4 w-4 text-gray-400 ml-auto cursor-pointer"
              />
            )}
          </div>
        ))}
        <button
          onClick={addField}
          className="flex items-center text-sm text-blue-600 mt-2"
        >
          <PlusIcon className="h-4 w-4 mr-1" /> Add field
        </button>
      </div>

      {/* Footer Buttons */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium mb-2">
          Save & Publish
        </button>
        <button className="w-full text-red-600 py-2 text-sm font-medium">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Sidebar;