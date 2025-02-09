// src/services/game/gameService.ts
import { db } from '@/src/config/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { Game, LineupPlayer, GameEvent, GameStatus } from '@/src/types/game';
import { onSnapshot, Query } from 'firebase/firestore';

class GameService {
  private gamesCollection = collection(db, 'games');

  async createGame(
    teamId: string,
    opponentName: string,
    date: Date,
    isHome: boolean
  ): Promise<string> {
    try {
      const newGame: Omit<Game, 'id'> = {
        teamId,
        opponentName,
        date: Timestamp.fromDate(date),
        isHome,
        status: GameStatus.SCHEDULED,
        score: {
          team: 0,
          opponent: 0
        },
        currentInning: {
          number: 1,
          topOfInning: true
        },
        innings: [],
        lineup: [],
        events: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(this.gamesCollection, newGame);
      return docRef.id;
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  }
  subscribeToGames(onUpdate: (games: Game[]) => void): () => void {
    try {
      // Create a query for all games, sorted by date
      const gamesQuery = query(
        this.gamesCollection,
        orderBy('date', 'desc')
      );

      // Set up real-time listener
      const unsubscribe = onSnapshot(gamesQuery, (snapshot) => {
        const games = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Game));
        onUpdate(games);
      }, (error) => {
        console.error('Error in games subscription:', error);
      });

      // Return unsubscribe function
      return unsubscribe;
    } catch (error) {
      console.error('Error setting up games subscription:', error);
      throw error;
    }
  }
  async getGame(gameId: string): Promise<Game> {
    try {
      const gameDoc = await getDoc(doc(this.gamesCollection, gameId));
      if (!gameDoc.exists()) {
        throw new Error('Game not found');
      }
      return {
        id: gameDoc.id,
        ...gameDoc.data()
      } as Game;
    } catch (error) {
      console.error('Error getting game:', error);
      throw error;
    }
  }

  async getTeamGames(teamId: string): Promise<Game[]> {
    try {
      const gamesRef = collection(db, 'games');
      const q = query(
        gamesRef,
        where('teamId', '==', teamId),
        orderBy('date', 'desc') // Sort by date in descending order (newest first)
      );

      const querySnapshot = await getDocs(q);
      const games: Game[] = [];

      querySnapshot.forEach((doc) => {
        games.push({
          id: doc.id,
          ...doc.data()
        } as Game);
      });

      return games;
    } catch (error) {
      console.error('Error getting team games:', error);
      // Add better error handling
      if (error instanceof Error && error.message.includes('requires an index')) {
        console.log('Creating index... Please wait a moment and try again.');
      }
      return [];
    }
  }
  async getAllGames(): Promise<Game[]> {
    try {
      const gamesSnapshot = await getDocs(collection(db, 'games'));
      return gamesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Game));
    } catch (error) {
      console.error('Error getting all games:', error);
      throw error;
    }
  }
  

  async updateLineup(gameId: string, lineup: LineupPlayer[]): Promise<void> {
    try {
      await updateDoc(doc(this.gamesCollection, gameId), {
        lineup,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating lineup:', error);
      throw error;
    }
  }

  async startGame(gameId: string): Promise<void> {
    try {
      await updateDoc(doc(this.gamesCollection, gameId), {
        status: GameStatus.IN_PROGRESS,
        startTime: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error starting game:', error);
      throw error;
    }
  }

  async endGame(gameId: string): Promise<void> {
    try {
      await updateDoc(doc(this.gamesCollection, gameId), {
        status: GameStatus.COMPLETED,
        endTime: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error ending game:', error);
      throw error;
    }
  }

  async addGameEvent(gameId: string, event: Omit<GameEvent, 'id' | 'timestamp'>): Promise<void> {
    try {
      const game = await this.getGame(gameId);
      const newEvent: GameEvent = {
        ...event,
        id: `${Date.now()}`, // Simple ID generation
        timestamp: Timestamp.now()
      };

      await updateDoc(doc(this.gamesCollection, gameId), {
        events: [...game.events, newEvent],
        updatedAt: Timestamp.now()
      });

      // Update score if necessary
      if (event.runsScored > 0) {
        await this.updateScore(gameId, event.runsScored, event.isOpponent);
      }
    } catch (error) {
      console.error('Error adding game event:', error);
      throw error;
    }
  }

  async updateScore(gameId: string, runs: number, isOpponent: boolean): Promise<void> {
    try {
      const game = await this.getGame(gameId);
      const newScore = {
        team: isOpponent ? game.score.team : game.score.team + runs,
        opponent: isOpponent ? game.score.opponent + runs : game.score.opponent
      };

      await updateDoc(doc(this.gamesCollection, gameId), {
        score: newScore,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating score:', error);
      throw error;
    }
  }

  async updateInning(
    gameId: string,
    inningNumber: number,
    topOfInning: boolean
  ): Promise<void> {
    try {
      await updateDoc(doc(this.gamesCollection, gameId), {
        currentInning: {
          number: inningNumber,
          topOfInning
        },
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating inning:', error);
      throw error;
    }
  }

  async updatePlayerStats(
    gameId: string,
    playerId: string,
    stats: Partial<LineupPlayer['gameStats']>
  ): Promise<void> {
    try {
      const game = await this.getGame(gameId);
      const updatedLineup = game.lineup.map(player => {
        if (player.id === playerId) {
          return {
            ...player,
            gameStats: {
              ...player.gameStats,
              ...stats
            }
          };
        }
        return player;
      });

      await updateDoc(doc(this.gamesCollection, gameId), {
        lineup: updatedLineup,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating player stats:', error);
      throw error;
    }
  }
}

export const gameService = new GameService();
