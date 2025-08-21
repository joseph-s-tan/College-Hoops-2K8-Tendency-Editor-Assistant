
import React from 'react';
import { Position } from '../types';

interface PositionSelectorProps {
  value: Position;
  onChange: (value: Position) => void;
}

const PositionSelector: React.FC<PositionSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="position" className="mb-2 text-sm font-medium text-gray-400">Position</label>
      <select
        id="position"
        value={value}
        onChange={(e) => onChange(e.target.value as Position)}
        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
      >
        {Object.values(Position).map((pos) => (
          <option key={pos} value={pos}>{pos}</option>
        ))}
      </select>
    </div>
  );
};

export default PositionSelector;
