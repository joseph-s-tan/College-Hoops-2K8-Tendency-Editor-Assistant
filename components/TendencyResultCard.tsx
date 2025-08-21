
import React from 'react';
import { CalculatedTendencies, TendencyCalculation } from '../types';

interface TendencyResultCardProps {
  tendencies: CalculatedTendencies;
}

const ResultBar: React.FC<{ label: string; tendency: TendencyCalculation; colorClass: string }> = ({ label, tendency, colorClass }) => (
    <div title={tendency.breakdown}>
        <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-gray-300">{label}</span>
            <span className={`text-base font-bold text-${colorClass}-400`}>{tendency.value}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className={`bg-${colorClass}-500 h-2.5 rounded-full`} style={{ width: `${tendency.value}%` }}></div>
        </div>
    </div>
);

const TendencyResultCard: React.FC<TendencyResultCardProps> = ({ tendencies }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg h-full">
        <h2 className="text-2xl font-bold mb-6 text-white text-center border-b border-gray-700 pb-4">Calculated Tendencies</h2>
        <div className="space-y-6">
            <ResultBar label="Close Shot Tendency" tendency={tendencies.closeShot} colorClass="blue" />
            <ResultBar label="Mid-Range Shot Tendency" tendency={tendencies.midRangeShot} colorClass="green" />
            <ResultBar label="Three-Point Shot Tendency" tendency={tendencies.threePointShot} colorClass="yellow" />
            <ResultBar label="Drive the Lane Tendency" tendency={tendencies.driveTheLane} colorClass="red" />
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white">Note on Foul Tendency</h3>
            <p className="text-sm text-gray-400 mt-2">
                The <span className="font-bold">Commit Foul Tendency</span> is not calculated by a formula. It should be adjusted manually based on in-game observation of the player's performance and foul trouble.
            </p>
        </div>
    </div>
  );
};

export default TendencyResultCard;
