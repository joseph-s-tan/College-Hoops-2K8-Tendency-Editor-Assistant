
import React from 'react';
import { TeamTempo } from '../types';

interface TeamTempoSelectorProps {
  value: TeamTempo;
  onChange: (value: TeamTempo) => void;
}

const TeamTempoSelector: React.FC<TeamTempoSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col h-full justify-between">
      <label htmlFor="team-tempo" className="mb-2 text-sm font-medium text-gray-400">Team Tempo</label>
      <select
        id="team-tempo"
        value={value}
        onChange={(e) => onChange(e.target.value as TeamTempo)}
        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
      >
        {Object.values(TeamTempo).map((tempo) => (
          <option key={tempo} value={tempo}>{tempo}</option>
        ))}
      </select>
    </div>
  );
};

export default TeamTempoSelector;
