import React, { useState, useRef, useMemo } from 'react';
import { Player, PlayerAttributes, Position, CalculatedTendencies, TeamTempo, OffensiveRole, Roster } from './types';
import { useTendencyCalculator } from './hooks/useTendencyCalculator';
import { getSuggestedRoles } from './utils/rosterUtils';
import TendencyResultCard from './components/TendencyResultCard';
import TeamTempoSelector from './components/TeamTempoSelector';
import PlayerEditor from './components/PlayerEditor';
import RosterTable from './components/RosterTable';

const BasketballIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.793V12a9 9 0 1 0-9 9h.793M21 12.793A9 9 0 0 1 12.793 21M21 12.793l-8.207 8.207M12 2.25a.75.75 0 0 1 .75.75v18a.75.75 0 0 1-1.5 0v-18A.75.75 0 0 1 12 2.25Z" />
    </svg>
);

const DEFAULT_PLAYER_ATTRIBUTES: PlayerAttributes = {
    position: Position.PG,
    offensiveRole: OffensiveRole.RolePlayer,
    overall: 75, closeShot: 75, layup: 75, dunk: 75,
    standingDunk: 75, midRangeShot: 75, threePointShot: 75,
    freeThrow: 75, handling: 75, passing: 75, shootInTraffic: 75,
    shootOffDribble: 75, consistency: 75,
};

const INITIAL_FORM_STATE: Player = {
    id: '',
    name: '',
    attributes: DEFAULT_PLAYER_ATTRIBUTES,
};


const App: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [teamTempo, setTeamTempo] = useState<TeamTempo>(TeamTempo.Balanced);
    const [formPlayer, setFormPlayer] = useState<Player>(INITIAL_FORM_STATE);
    const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

    const tendencies: CalculatedTendencies = useTendencyCalculator(formPlayer.attributes, teamTempo);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const suggestedRoles = useMemo(() => getSuggestedRoles(players), [players]);

    const handleClearForm = () => {
        setEditingPlayerId(null);
        setFormPlayer(INITIAL_FORM_STATE);
    };

    const handleSavePlayer = () => {
        if (!formPlayer.name.trim()) {
            alert('Player name cannot be empty.');
            return;
        }

        if (editingPlayerId) {
            // Update existing player
            setPlayers(players.map(p => p.id === editingPlayerId ? { ...formPlayer, id: editingPlayerId } : p));
        } else {
            // Add new player
            const newPlayer: Player = { ...formPlayer, id: crypto.randomUUID() };
            setPlayers([...players, newPlayer]);
        }
        handleClearForm();
    };

    const handleEditPlayer = (id: string) => {
        const playerToEdit = players.find(p => p.id === id);
        if (playerToEdit) {
            setEditingPlayerId(id);
            setFormPlayer(playerToEdit);
        }
    };
    
    const handleDeletePlayer = (id: string) => {
        if (window.confirm('Are you sure you want to delete this player?')) {
            if (id === editingPlayerId) {
                handleClearForm();
            }
            setPlayers(players.filter(p => p.id !== id));
        }
    };

    const handleExportRoster = () => {
        const rosterData: Roster = { teamTempo, players };
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(rosterData, null, 2))}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "ch2k8-dram-roster.json";
        link.click();
        link.remove();
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== 'string') throw new Error("Invalid file content");
                const data = JSON.parse(text) as Roster;
                
                // Basic validation
                if (data && data.teamTempo && Array.isArray(data.players)) {
                    setTeamTempo(data.teamTempo);
                    setPlayers(data.players);
                    handleClearForm();
                    alert('Roster imported successfully!');
                } else {
                    throw new Error('Invalid roster file format.');
                }
            } catch (error) {
                console.error('Import failed:', error);
                alert('Failed to import roster. Please check the file format.');
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Reset input
    };
    
    const suggestedRoleForEditor = editingPlayerId ? suggestedRoles.get(editingPlayerId) : undefined;

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-screen-2xl mx-auto">
                <header className="flex items-center justify-center space-x-4 mb-2">
                    <BasketballIcon className="w-10 h-10 text-orange-500" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-center tracking-tight text-white">
                        CH 2K8 DRAM System
                    </h1>
                </header>
                <p className="text-center text-gray-400 mb-8 -mt-2">Dynamic Role & Attribute Modeling System</p>

                <div className="bg-gray-800 p-4 rounded-2xl shadow-lg mb-8">
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-end">
                        <TeamTempoSelector value={teamTempo} onChange={setTeamTempo} />
                        <div className="sm:col-span-1 md:col-span-3 flex justify-end items-center gap-4">
                            <button onClick={handleImportClick} className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-colors">
                                Import Roster
                            </button>
                             <input type="file" ref={fileInputRef} onChange={handleFileImport} accept=".json" className="hidden" />
                            <button onClick={handleExportRoster} className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors">
                                Export Roster
                            </button>
                        </div>
                    </div>
                </div>

                <main className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-8">
                        <PlayerEditor 
                            player={formPlayer}
                            onPlayerChange={setFormPlayer}
                            onSave={handleSavePlayer}
                            onClear={handleClearForm}
                            isEditing={!!editingPlayerId}
                            suggestedRole={suggestedRoleForEditor}
                        />
                        <TendencyResultCard tendencies={tendencies} />
                    </div>

                    <RosterTable 
                        players={players}
                        teamTempo={teamTempo}
                        onEdit={handleEditPlayer}
                        onDelete={handleDeletePlayer}
                        suggestedRoles={suggestedRoles}
                    />
                </main>

                <footer className="text-center mt-12 text-gray-500 text-sm">
                    <p>DRAM System based on the formulaic approach by "Ole Man Games".</p>
                    <p>This tool is for educational and entertainment purposes for the College Hoops 2K8 community.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;