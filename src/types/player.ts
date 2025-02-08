import { Position } from "./team";

export interface PlayerCreationData {
    name: string;
    number: string;
    positions: Position[];
    teamId: string;
    // Add other relevant fields
  }
  
  export interface Player {
    id: string;
    name: string;
    number: string;
    positions: Position[];
    teamId: string;
    stats: PlayerStats;
  }
  
  export interface PlayerStats {
    // Add relevant stats fields
    games: number;
    atBats: number;
    runs: number;
    hits: number;
    singles: number;
    doubles: number;
    triples: number;
    homeRuns: number;
    rbis: number;
    walks: number;
    strikeouts: number;
    battingAverage: number;
    onBasePercentage: number;
    sluggingPercentage: number;
    ops: number;
    // etc.
  }