// src/types/team.ts
export interface Team {
    id: string;
    name: string;
    managerId: string;
    season: string;
    createdAt: Date;
    updatedAt: Date;
    players: Player[];
    settings: TeamSettings;
    stats: TeamStats;
}

export interface TeamSettings {
    defaultGameDuration: number; // in minutes
    defaultInnings: number;
    maxRunsPerInning?: number; // Optional mercy rule
    minimumPlayers: number;
    autoSubstitutionEnabled: boolean;
    notificationsEnabled: boolean;
    privacyLevel: "public" | "private" | "invite-only";
}

export interface TeamStats {
    totalGames: number;
    wins: number;
    losses: number;
    ties: number;
    runsScored: number;
    runsAllowed: number;
    winningPercentage: number;
    lastGameDate?: Date;
    streak: {
        type: "W" | "L" | "T";
        count: number;
    };
}

export interface Player {
    id: string;
    name: string;
    number: string;
    positions: Position[];
    isActive: boolean;
    stats: PlayerStats;
    attendance: AttendanceRecord;
}

export interface PlayerStats {
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
}

export interface AttendanceRecord {
    present: number;
    absent: number;
    late: number;
    lastGames: boolean[];
}

export type Position =
    | "P"
    | "C"
    | "1B"
    | "2B"
    | "3B"
    | "SS"
    | "LF"
    | "CF"
    | "RF"
    | "DH"
    | "EH"
    | "SF"
    | "ROV";

export interface PlayerCreationData {
    name: string;
    number: string;
    positions: Position[];
}

export interface PlayerUpdateData {
    name?: string;
    number?: string;
    positions?: Position[];
    isActive?: boolean;
}

export interface TeamCreationData {
    name: string;
    season: string;
    settings?: Partial<TeamSettings>;
}

export interface TeamUpdateData {
    name?: string;
    season?: string;
    settings?: Partial<TeamSettings>;
}
