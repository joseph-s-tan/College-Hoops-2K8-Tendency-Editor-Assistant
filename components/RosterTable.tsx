import React from 'react';
import { Player, TeamTempo, OffensiveRole } from '../types';
import { calculateTendencies } from '../utils/tendencyCalculator';

interface RosterTableProps {
    players: Player[];
    teamTempo: TeamTempo;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    suggestedRoles: Map<string, OffensiveRole>;
}

const shortenRole = (role: OffensiveRole): string => {
    switch (role) {
        case OffensiveRole.First: return '1st';
        case OffensiveRole.Second: return '2nd';
        case OffensiveRole.Third: return '3rd';
        case OffensiveRole.RolePlayer: return 'Role';
        default: return '';
    }
};

const RosterTable: React.FC<RosterTableProps> = ({ players, teamTempo, onEdit, onDelete, suggestedRoles }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-white text-center border-b border-gray-700 pb-4">Team Roster</h2>
            {players.length === 0 ? (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-400">Your roster is empty. Add a player using the form.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                            <tr>
                                <th scope="col" className="px-4 py-3">Name</th>
                                <th scope="col" className="px-4 py-3 text-center">Pos</th>
                                <th scope="col" className="px-4 py-3 text-center">Ovr</th>
                                <th scope="col" className="px-4 py-3 text-center" title="Set Offensive Role">Set Role</th>
                                <th scope="col" className="px-4 py-3 text-center" title="Suggested Offensive Role">Sug. Role</th>
                                <th scope="col" className="px-4 py-3 text-center" title="Close Shot Tendency">Close</th>
                                <th scope="col" className="px-4 py-3 text-center" title="Mid-Range Shot Tendency">Mid</th>
                                <th scope="col" className="px-4 py-3 text-center" title="Three-Point Shot Tendency">3PT</th>
                                <th scope="col" className="px-4 py-3 text-center" title="Drive the Lane Tendency">Drive</th>
                                <th scope="col" className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map(player => {
                                const tendencies = calculateTendencies(player.attributes, teamTempo);
                                const positionShort = player.attributes.position.match(/\(([^)]+)\)/)?.[1] || '';
                                const setRoleShort = shortenRole(player.attributes.offensiveRole);
                                const suggestedRole = suggestedRoles.get(player.id);
                                const suggestedRoleShort = suggestedRole ? shortenRole(suggestedRole) : '-';
                                return (
                                    <tr key={player.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                        <th scope="row" className="px-4 py-4 font-medium text-white whitespace-nowrap">{player.name}</th>
                                        <td className="px-4 py-4 text-center">{positionShort}</td>
                                        <td className="px-4 py-4 text-center">{player.attributes.overall}</td>
                                        <td className={`px-4 py-4 text-center font-semibold ${setRoleShort === suggestedRoleShort ? 'text-gray-300' : 'text-yellow-400'}`}>{setRoleShort}</td>
                                        <td className="px-4 py-4 text-center text-gray-400">{suggestedRoleShort}</td>
                                        <td className="px-4 py-4 text-center font-mono" title={tendencies.closeShot.breakdown}>{tendencies.closeShot.value}</td>
                                        <td className="px-4 py-4 text-center font-mono" title={tendencies.midRangeShot.breakdown}>{tendencies.midRangeShot.value}</td>
                                        <td className="px-4 py-4 text-center font-mono" title={tendencies.threePointShot.breakdown}>{tendencies.threePointShot.value}</td>
                                        <td className="px-4 py-4 text-center font-mono" title={tendencies.driveTheLane.breakdown}>{tendencies.driveTheLane.value}</td>
                                        <td className="px-4 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => onEdit(player.id)} className="font-medium text-blue-400 hover:underline text-xs">Edit</button>
                                                <button onClick={() => onDelete(player.id)} className="font-medium text-red-400 hover:underline text-xs">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RosterTable;