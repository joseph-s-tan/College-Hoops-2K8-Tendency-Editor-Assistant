
import { PlayerAttributes, CalculatedTendencies, OffensiveRole, TeamTempo, TendencyCalculation } from '../types';

// --- Helper Functions for Modifiers ---

const getFinishingModifier = (shootInTraffic: number): { val: number; str: string } => {
    if (shootInTraffic >= 90) return { val: 15, str: "+15" };
    if (shootInTraffic >= 80) return { val: 8, str: "+8" };
    if (shootInTraffic < 70) return { val: -10, str: "-10" };
    return { val: 0, str: "+0" };
};

const getShootingModifier = (shootOffDribble: number): { val: number; str: string } => {
    if (shootOffDribble >= 90) return { val: 15, str: "+15" };
    if (shootOffDribble >= 80) return { val: 8, str: "+8" };
    if (shootOffDribble < 70) return { val: -10, str: "-10" };
    return { val: 0, str: "+0" };
};

const getConsistencyWeightingFactor = (consistency: number): { val: number; str: string } => {
    if (consistency >= 90) return { val: 1.10, str: "x1.10" };
    if (consistency >= 80) return { val: 1.05, str: "x1.05" };
    if (consistency >= 60) return { val: 0.95, str: "x0.95" };
    if (consistency < 60) return { val: 0.90, str: "x0.90" };
    return { val: 1.00, str: "x1.00" };
};

const getSystemTempoModifier = (tempo: TeamTempo): { val: number; str: string } => {
    switch (tempo) {
        case TeamTempo.VerySlow: return { val: 0.85, str: "x0.85" };
        case TeamTempo.Slow: return { val: 0.95, str: "x0.95" };
        case TeamTempo.Fast: return { val: 1.05, str: "x1.05" };
        case TeamTempo.VeryFast: return { val: 1.10, str: "x1.10" };
        case TeamTempo.Balanced:
        default:
            return { val: 1.00, str: "x1.00" };
    }
};

const getASM = (rating: number): { val: number; str: string } => {
    let val: number;
    if (rating >= 90) val = 20;
    else if (rating >= 80) val = 10;
    else if (rating >= 70) val = 0;
    else if (rating >= 60) val = -10;
    else if (rating >= 50) val = -20;
    else val = -30;
    return { val, str: val >= 0 ? `+${val}` : `${val}` };
};

const getOHM = (role: OffensiveRole): { val: number; str: string } => {
    let val: number;
    switch (role) {
        case OffensiveRole.First:
            val = 1.15;
            break;
        case OffensiveRole.Second:
            val = 1.05;
            break;
        case OffensiveRole.Third:
            val = 0.95;
            break;
        case OffensiveRole.RolePlayer:
        default:
            val = 0.80;
            break;
    }
    return { val, str: `x${val.toFixed(2)}` };
};


export const calculateTendencies = (attributes: PlayerAttributes, teamTempo: TeamTempo): CalculatedTendencies => {
    const {
        offensiveRole, closeShot, layup, dunk, standingDunk, midRangeShot,
        threePointShot, handling, passing, shootInTraffic, shootOffDribble, consistency
    } = attributes;

    const ohm = getOHM(offensiveRole);
    const cwf = getConsistencyWeightingFactor(consistency);
    const stm = getSystemTempoModifier(teamTempo);
    const fm = getFinishingModifier(shootInTraffic);
    const sm = getShootingModifier(shootOffDribble);

    const calculateSingleTendency = (
        base: number,
        asm: {val: number, str: string},
        attrMod: {val: number, str: string},
        attrModName: 'FM' | 'SM'
    ): TendencyCalculation => {
        const preMultiplied = base + asm.val + attrMod.val;
        const finalValue = preMultiplied * (ohm.val * cwf.val) * stm.val;
        const cappedValue = Math.round(Math.max(0, Math.min(99, finalValue)));
        
        const breakdown = `Base: ${base.toFixed(1)}, ASM: ${asm.str}, ${attrModName}: ${attrMod.str}, OHM: ${ohm.str}, CWF: ${cwf.str}, STM: ${stm.str} => Final: ${cappedValue}`;

        return { value: cappedValue, breakdown };
    };

    // 1. Close Shot Tendency
    const closeBase = (closeShot + layup + dunk + standingDunk) / 4;
    const closeAsm = getASM(closeShot);
    const closeShotTendency = calculateSingleTendency(closeBase, closeAsm, fm, 'FM');

    // 2. Mid-Range Shot Tendency
    const midRangeBase = midRangeShot;
    const midRangeAsm = getASM(midRangeShot);
    const midRangeShotTendency = calculateSingleTendency(midRangeBase, midRangeAsm, sm, 'SM');

    // 3. Three-Point Shot Tendency
    const threePointBase = threePointShot;
    const threePointAsm = getASM(threePointShot);
    const threePointShotTendency = calculateSingleTendency(threePointBase, threePointAsm, sm, 'SM');
    
    // 4. Drive the Lane Tendency
    const driveBase = (closeShot + layup + handling + passing) / 4;
    const driveAsm = getASM(closeShot);
    const driveTheLaneTendency = calculateSingleTendency(driveBase, driveAsm, fm, 'FM');

    return {
        closeShot: closeShotTendency,
        midRangeShot: midRangeShotTendency,
        threePointShot: threePointShotTendency,
        driveTheLane: driveTheLaneTendency,
    };
};
