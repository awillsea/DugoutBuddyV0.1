// src/types/game.ts
import { Timestamp } from 'firebase/firestore';
import { Position } from './team';

export enum GameStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  POSTPONED = 'POSTPONED'
}

export interface GameStats {
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

export interface LineupPlayer {
  id: string;
  name: string;
  number: string;
  positions: Position[];
  lineupPosition: number;
  gameStats: GameStats;
}

export interface Inning {
  number: number;
  topOfInning: boolean;
  outs: number;
  runs: number;
  hits: number;
  errors: number;
}

export interface GameEvent {
  id: string;
  timestamp: Timestamp;
  inning: number;
  topOfInning: boolean;
  playerId?: string;
  eventType: 'AT_BAT' | 'SUBSTITUTION' | 'STOLEN_BASE' | 'CAUGHT_STEALING' | 'OTHER';
  result?: 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'HOME_RUN' | 'WALK' | 'STRIKEOUT' | 'OUT' | 'ERROR' | 'FIELDERS_CHOICE' | 'SACRIFICE';
  runsScored: number;
  rbi: number;
  isOpponent: boolean;
  description?: string;
}

export interface Game {
  id: string;
  teamId: string;
  opponentName: string;
  date: Timestamp;
  isHome: boolean;
  status: GameStatus;
  score: {
    team: number;
    opponent: number;
  };
  currentInning: {
    number: number;
    topOfInning: boolean;
  };
  innings: Inning[];
  lineup: LineupPlayer[];
  events: GameEvent[];
  startTime?: Timestamp;
  endTime?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}