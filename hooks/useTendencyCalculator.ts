
import { useMemo } from 'react';
import { PlayerAttributes, CalculatedTendencies, TeamTempo } from '../types';
import { calculateTendencies as calculate } from '../utils/tendencyCalculator';

export const useTendencyCalculator = (attributes: PlayerAttributes, teamTempo: TeamTempo): CalculatedTendencies => {
    return useMemo(() => calculate(attributes, teamTempo), [attributes, teamTempo]);
};
