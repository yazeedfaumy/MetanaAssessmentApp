import React, { useState } from 'react';
import { CogIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ThemeSettings from './components/ThemeSettingsComponent';


const FormBuilder = () => {
  const [steps, setSteps] = useState([
    { id: '1', name: 'Welcome screen' },
    { id: '2', name: 'Email' },
    { id: '3', name: 'End screen', fixed: true }, // Fixed step at the bottom
  ]);

  const [activeTab, setActiveTab] = useState('Content');

  const addStep = () => {
    const newStep = { id: `${steps.length + 1}`, name: `Step ${steps.length}` };
    const updatedSteps = [...steps.slice(0, steps.length - 1), newStep, steps[steps.length - 1]];
    setSteps(updatedSteps);
  };

  const removeStep = (stepId) => {
    if (stepId !== '1' && stepId !== steps[steps.length - 1].id) {
      setSteps(steps.filter((step) => step.id !== stepId && !step.fixed));
    }
  };

  const updateStepName = (id, newName) => {
    const updatedSteps = steps.map((step) =>
      step.id === id ? { ...step, name: newName } : step
    );
    setSteps(updatedSteps);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return; // Dropped outside the list
    if (destination.index === steps.length - 1) return; // Don't move the fixed "End screen"

    const reorderedSteps = Array.from(steps);
    const [removed] = reorderedSteps.splice(source.index, 1);
    reorderedSteps.splice(destination.index, 0, removed);

    setSteps(reorderedSteps);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Content':
        return (
          <div className="mt-6">
            {/* DragDropContext must wrap Droppable */}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="steps">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {/* Draggable items */}
                    {steps.map((step, index) => (
                      <Draggable
                        key={step.id}
                        draggableId={step.id}
                        index={index}
                        isDragDisabled={step.fixed} // Disable drag for fixed steps
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex items-center mb-2 p-2 bg-white rounded-lg shadow-sm ${snapshot.isDragging ? 'bg-gray-100' : ''}`}
                          >
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                              {index + 1}
                            </div>
                            {/* Editable step name */}
                            <input
                              className="border-b border-gray-300 outline-none flex-1"
                              value={step.name}
                              onChange={(e) => updateStepName(step.id, e.target.value)}
                              disabled={step.fixed} // Disable input for fixed steps
                            />
                            {/* Trash icon (hidden for fixed steps) */}
                            {!step.fixed && (
                              <TrashIcon
                                onClick={() => removeStep(step.id)}
                                className="h-4 w-4 text-gray-400 ml-auto cursor-pointer"
                              />
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                  
                )}
              </Droppable>
            </DragDropContext>

            {/* Add new step button */}
            <button onClick={addStep} className="flex items-center text-blue-600 mt-4">
              <PlusIcon className="h-4 w-4 mr-1" /> Add field
            </button>
            <div className="mt-6">
          <button className="w-full bg-blue-600 text-white py-2 rounded mb-3">
            Save & Publish
          </button>
          <button className="w-full bg-red-600 text-white py-2 rounded">
            Delete
          </button>
        </div>
          </div>

          
        );
      case 'Design':
        return ( <ThemeSettings/>);
      case 'Share':
        return <p className="text-gray-600">Share tab active</p>;
      default:
        return null;
    }
  };


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-white p-6 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <CogIcon className="h-6 w-6 text-gray-500" />
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mb-4">
            {['Content', 'Design', 'Share', 'Replies'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm py-1 px-3 rounded-full ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {renderTabContent()}
        </div>

        {/* Save & Publish and Delete Buttons */}
       
      </div>

      {/* Main content area */}
      <div className="flex-1 p-3">
        <div className="bg-black rounded-2xl p-0 h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to our form</h1>
          <p className="text-xl mb-6">This is a description of the form</p>
          <button className="bg-white text-black px-6 py-2 rounded-full">Start</button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
