import React, { useState } from 'react';
import { Save } from 'lucide-react';

const ThemeSettings = () => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');
  const [buttonColor, setButtonColor] = useState('#000000');
  const [buttonTextColor, setButtonTextColor] = useState('#FFFFFF');
  const [font, setFont] = useState('Arial, sans-serif');
  const [textSize, setTextSize] = useState('Regular');
  const [buttonRadius, setButtonRadius] = useState('Regular');
  const [buttonSize, setButtonSize] = useState('Regular');

  const ColorInput = ({ label, value, onChange }) =>
    React.createElement('div', { className: 'flex items-center mb-2' },
      React.createElement('label', { className: 'w-1/3 text-sm' }, label),
      React.createElement('input', {
        type: 'color',
        value: value,
        onChange: (e) => onChange(e.target.value),
        className: 'w-6 h-6 mr-2'
      }),
      React.createElement('input', {
        type: 'text',
        value: value,
        onChange: (e) => onChange(e.target.value),
        className: 'w-20 text-sm border border-gray-300 p-1'
      })
    );

  const RadioGroup = ({ label, options, value, onChange }) =>
    React.createElement('div', { className: 'mb-4' },
      React.createElement('p', { className: 'text-sm mb-1' }, label),
      React.createElement('div', { className: 'flex space-x-2' },
        options.map((option) =>
          React.createElement('button', {
            key: option,
            onClick: () => onChange(option),
            className: `px-3 py-1 text-sm border ${value === option ? 'bg-gray-200' : 'bg-white'}`
          }, option)
        )
      )
    );

  return React.createElement('div', { className: 'p-4 max-w-md mx-auto' },
    React.createElement('h2', { className: 'text-lg font-semibold mb-4' }, 'Colors'),
    React.createElement('p', { className: 'text-sm mb-2' }, 'Background and text colors:'),
    ColorInput({ label: 'Background Color', value: backgroundColor, onChange: setBackgroundColor }),
    ColorInput({ label: 'Text Color', value: textColor, onChange: setTextColor }),
    ColorInput({ label: 'Button Color', value: buttonColor, onChange: setButtonColor }),
    ColorInput({ label: 'Button Text Color', value: buttonTextColor, onChange: setButtonTextColor }),

    React.createElement('h2', { className: 'text-lg font-semibold mt-6 mb-2' }, 'Font'),
    React.createElement('p', { className: 'text-sm mb-2' }, 'Pick a font that reflects your brand'),
    React.createElement('select', {
      value: font,
      onChange: (e) => setFont(e.target.value),
      className: 'w-full p-2 border border-gray-300 rounded mb-4'
    },
      React.createElement('option', { value: 'Arial, sans-serif' }, 'Arial, sans-serif'),
      React.createElement('option', { value: 'Helvetica, sans-serif' }, 'Helvetica, sans-serif'),
      React.createElement('option', { value: 'Times New Roman, serif' }, 'Times New Roman, serif')
    ),

    RadioGroup({ label: 'Text Size', options: ['Regular', 'Medium'], value: textSize, onChange: setTextSize }),
    RadioGroup({ label: 'Button Radius', options: ['Regular', 'Medium', 'Large'], value: buttonRadius, onChange: setButtonRadius }),
    RadioGroup({ label: 'Button Size', options: ['Regular', 'Medium', 'Large'], value: buttonSize, onChange: setButtonSize }),

    React.createElement('button', { className: 'w-full bg-black text-white py-2 rounded flex items-center justify-center mt-4' },
      React.createElement(Save, { size: 16, className: 'mr-2' }),
      'Save Theme'
    )
  );
};

export default ThemeSettings;
