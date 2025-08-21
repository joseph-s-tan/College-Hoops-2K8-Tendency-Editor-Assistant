
export enum Position {
  PG = 'Point Guard (PG)',
  SG = 'Shooting Guard (SG)',
  SF = 'Small Forward (SF)',
  PF = 'Power Forward (PF)',
  C = 'Center (C)',
}

export enum TeamTempo {
    VerySlow = 'Very Slow (Grind it out)',
    Slow = 'Slow',
    Balanced = 'Balanced',
    Fast = 'Fast',
    VeryFast = 'Very Fast (Run and Gun)',
}

export enum OffensiveRole {
    First = '1st Option',
    Second = '2nd Option',
    Third = '3rd Option',
    RolePlayer = 'Role Player',
}

export interface PlayerAttributes {
  position: Position;
  offensiveRole: OffensiveRole;
  overall: number;
  closeShot: number;
  layup: number;
  dunk: number;
  standingDunk: number;
  midRangeShot: number;
  threePointShot: number;
  freeThrow: number;
  handling: number;
  passing: number;
  shootInTraffic: number;
  shootOffDribble: number;
  consistency: number;
}

export interface TendencyCalculation {
    value: number;
    breakdown: string;
}

export interface CalculatedTendencies {
  closeShot: TendencyCalculation;
  midRangeShot: TendencyCalculation;
  threePointShot: TendencyCalculation;
  driveTheLane: TendencyCalculation;
}

export interface Player {
  id: string;
  name: string;
  attributes: PlayerAttributes;
}

export interface Roster {
  teamTempo: TeamTempo;
  players: Player[];
}
