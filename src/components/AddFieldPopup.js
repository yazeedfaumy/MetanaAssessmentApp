import React from 'react';

const AddFieldPopup = ({ onClose }) => {
  const fieldOptions = [
    { icon: '✓', label: 'Multiple Choice' },
    { icon: '✎', label: 'Short Text' },
    { icon: '✉', label: 'Email' },
    { icon: '▼', label: 'Dropdown' },
    { icon: '☏', label: 'Phone Number' },
    { icon: '☰', label: 'Section' },
    { icon: 'ⓘ', label: 'Contact Information' },
    { icon: '📄', label: 'Legal' },
    { icon: '🌐', label: 'Country' },
  ];

  const handleOptionClick = (label) => {
    console.log(`Selected field type: ${label}`);
    // Add logic to handle the selected field type
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 w-80 shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold">Add Field</h2>
          <button className="text-2xl" onClick={onClose}>&times;</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {fieldOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option.label)}
            >
              <span className="mr-2">{option.icon}</span>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddFieldPopup;
