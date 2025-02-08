// src/types/game.ts
import { Team, Player } from './team';

export interface Game {
  id: string;
  teamId: string;
  opponentName: string;
  date: Date;
  location?: string;
  isHome: boolean;
  status: 'scheduled' | 'in-progress' | 'completed';
  score: {
    team: number;
    opponent: number;
  };
  innings: Inning[];
  lineup: LineupPlayer[];
  stats: GameStats;
}

export interface Inning {
  number: number;
  topScore: number;
  bottomScore: number;
  events: GameEvent[];
}

export interface LineupPlayer extends Player {
  lineupPosition: number;
  gameStats: GamePlayerStats;
}

export interface GameEvent {
  id: string;
  timestamp: Date;
  inning: number;
  isTopInning: boolean;
  type: 'atBat' | 'substitution' | 'scoring';
  playerId: string;
  result: AtBatResult | SubstitutionResult | ScoringResult;
  description: string;
}

export type AtBatResult = 
  | '1B' // Single
  | '2B' // Double
  | '3B' // Triple
  | 'HR' // Home Run
  | 'BB' // Walk
  | 'HBP' // Hit By Pitch
  | 'OUT' // Out
  | 'K' // Strikeout
  | 'FC' // Fielder's Choice
  | 'E' // Error
  | 'SF' // Sacrifice Fly
  | 'SAC' // Sacrifice Bunt
;

export interface SubstitutionResult {
  outPlayer: string;
  inPlayer: string;
  position: string;
}

export interface ScoringResult {
  runScored: boolean;
  rbi: boolean;
  scoringPlayer: string;
}

export interface GameStats {
  hits: number;
  runs: number;
  errors: number;
  leftOnBase: number;
}

export interface GamePlayerStats {
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
  sacrifices: number;
  stolenBases: number;
  caughtStealing: number;
}