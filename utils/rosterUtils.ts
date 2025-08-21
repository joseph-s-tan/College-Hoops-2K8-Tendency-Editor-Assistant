import { Player, PlayerAttributes, OffensiveRole } from '../types';

/**
 * Calculates the Offensive Talent Score (OTS) for a player.
 * This composite score provides a single number representing a player's overall offensive value.
 * @param attributes The player's attributes.
 * @returns The calculated OTS number.
 */
export const calculateOTS = (attributes: PlayerAttributes): number => {
    const {
        overall, closeShot, midRangeShot, threePointShot,
        handling, shootOffDribble, consistency
    } = attributes;

    const overallTalent = overall * 0.4;
    const scoringProwess = ((closeShot + midRangeShot + threePointShot) / 3) * 0.3;
    const shotCreation = ((handling + shootOffDribble) / 2) * 0.2;
    const reliability = consistency * 0.1;

    return overallTalent + scoringProwess + shotCreation + reliability;
};

/**
 * Ranks players by OTS and assigns a suggested offensive role.
 * @param players The array of players in the roster.
 * @returns A Map where the key is the player's ID and the value is their suggested OffensiveRole.
 */
export const getSuggestedRoles = (players: Player[]): Map<string, OffensiveRole> => {
    if (players.length === 0) {
        return new Map();
    }

    const playersWithOTS = players.map(player => ({
        id: player.id,
        ots: calculateOTS(player.attributes),
    }));

    playersWithOTS.sort((a, b) => b.ots - a.ots);

    const suggestedRoles = new Map<string, OffensiveRole>();
    playersWithOTS.forEach((player, index) => {
        let role: OffensiveRole;
        switch (index) {
            case 0:
                role = OffensiveRole.First;
                break;
            case 1:
                role = OffensiveRole.Second;
                break;
            case 2:
                role = OffensiveRole.Third;
                break;
            default:
                role = OffensiveRole.RolePlayer;
                break;
        }
        suggestedRoles.set(player.id, role);
    });

    return suggestedRoles;
};
