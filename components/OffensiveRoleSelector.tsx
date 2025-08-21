
import React from 'react';
import { OffensiveRole } from '../types';

interface OffensiveRoleSelectorProps {
  value: OffensiveRole;
  onChange: (value: OffensiveRole) => void;
}

const OffensiveRoleSelector: React.FC<OffensiveRoleSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="offensive-role" className="mb-2 text-sm font-medium text-gray-400">Offensive Role</label>
      <select
        id="offensive-role"
        value={value}
        onChange={(e) => onChange(e.target.value as OffensiveRole)}
        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
      >
        {Object.values(OffensiveRole).map((role) => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
    </div>
  );
};

export default OffensiveRoleSelector;
