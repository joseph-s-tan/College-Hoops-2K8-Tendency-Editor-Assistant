import React from 'react';
import { Player, PlayerAttributes, Position, OffensiveRole } from '../types';
import AttributeInput from './AttributeInput';
import PositionSelector from './PositionSelector';
import OffensiveRoleSelector from './OffensiveRoleSelector';

interface PlayerEditorProps {
    player: Player;
    onPlayerChange: (player: Player) => void;
    onSave: () => void;
    onClear: () => void;
    isEditing: boolean;
    suggestedRole?: OffensiveRole;
}

const PlayerEditor: React.FC<PlayerEditorProps> = ({ player, onPlayerChange, onSave, onClear, isEditing, suggestedRole }) => {
    const handleAttributeChange = <K extends keyof PlayerAttributes>(key: K, value: PlayerAttributes[K]) => {
        onPlayerChange({
            ...player,
            attributes: {
                ...player.attributes,
                [key]: value,
            },
        });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onPlayerChange({ ...player, name: e.target.value });
    };

    const handleApplySuggestion = () => {
        if (suggestedRole) {
            handleAttributeChange('offensiveRole', suggestedRole);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col gap-8">
            <div>
                <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-4">{isEditing ? 'Edit Player' : 'Add New Player'}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                    <div className="flex flex-col sm:col-span-2">
                        <label htmlFor="player-name" className="mb-2 text-sm font-medium text-gray-400">Player Name</label>
                        <input
                            id="player-name"
                            type="text"
                            value={player.name}
                            onChange={handleNameChange}
                            placeholder="e.g., John Doe"
                            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
                        />
                    </div>
                    <PositionSelector
                        value={player.attributes.position}
                        onChange={(val) => handleAttributeChange('position', val)}
                    />
                    <div className="flex flex-col">
                        <OffensiveRoleSelector
                            value={player.attributes.offensiveRole}
                            onChange={(val) => handleAttributeChange('offensiveRole', val)}
                        />
                         {isEditing && suggestedRole && (
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-yellow-400">Suggested: <span className="font-semibold">{suggestedRole}</span></span>
                                {player.attributes.offensiveRole !== suggestedRole && (
                                    <button onClick={handleApplySuggestion} className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                                        Apply
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-300">Core Attributes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <AttributeInput label="Overall Rating" value={player.attributes.overall} onChange={(val) => handleAttributeChange('overall', val)} />
                     <AttributeInput label="Close Shot" value={player.attributes.closeShot} onChange={(val) => handleAttributeChange('closeShot', val)} />
                     <AttributeInput label="Mid-Range" value={player.attributes.midRangeShot} onChange={(val) => handleAttributeChange('midRangeShot', val)} />
                     <AttributeInput label="Three-Point" value={player.attributes.threePointShot} onChange={(val) => handleAttributeChange('threePointShot', val)} />
                     <AttributeInput label="Free Throw" value={player.attributes.freeThrow} onChange={(val) => handleAttributeChange('freeThrow', val)} />
                     <AttributeInput label="Layup" value={player.attributes.layup} onChange={(val) => handleAttributeChange('layup', val)} />
                     <AttributeInput label="Dunk" value={player.attributes.dunk} onChange={(val) => handleAttributeChange('dunk', val)} />
                     <AttributeInput label="Standing Dunk" value={player.attributes.standingDunk} onChange={(val) => handleAttributeChange('standingDunk', val)} min={0} />
                     <AttributeInput label="Handling" value={player.attributes.handling} onChange={(val) => handleAttributeChange('handling', val)} />
                     <AttributeInput label="Passing" value={player.attributes.passing} onChange={(val) => handleAttributeChange('passing', val)} />
                </div>
            </div>

             <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-300">Intangibles</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <AttributeInput label="Shoot in Traffic" value={player.attributes.shootInTraffic} onChange={(val) => handleAttributeChange('shootInTraffic', val)} min={0}/>
                    <AttributeInput label="Shoot Off Dribble" value={player.attributes.shootOffDribble} onChange={(val) => handleAttributeChange('shootOffDribble', val)} min={0}/>
                    <AttributeInput label="Consistency" value={player.attributes.consistency} onChange={(val) => handleAttributeChange('consistency', val)} min={0}/>
                </div>
            </div>
            <div className="flex items-center justify-end gap-4 mt-4">
                <button
                    onClick={onClear}
                    className="px-6 py-2 text-sm font-medium text-gray-300 bg-gray-600 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-colors"
                >
                    {isEditing ? 'Cancel' : 'Clear'}
                </button>
                <button
                    onClick={onSave}
                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors shadow-md"
                >
                    {isEditing ? 'Update Player' : 'Add Player to Roster'}
                </button>
            </div>
        </div>
    );
};

export default PlayerEditor;