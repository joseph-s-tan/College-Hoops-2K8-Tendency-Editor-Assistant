
import React from 'react';

interface AttributeInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const AttributeInput: React.FC<AttributeInputProps> = ({ label, value, onChange, min = 25, max = 99 }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (rawValue === '') {
        onChange(min);
        return;
    }
    
    let numValue = parseInt(rawValue, 10);

    if (!isNaN(numValue)) {
      if (numValue > max) numValue = max;
      if (numValue < min) numValue = min;
      onChange(numValue);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="mb-2 text-sm font-medium text-gray-400">{label}</label>
      <input
        id={label}
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="bg-gray-700 border border-gray-600 text-white text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
      />
    </div>
  );
};

export default AttributeInput;
