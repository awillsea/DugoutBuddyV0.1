// src/services/game/gameService.ts
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firestore } from "@/src/config/firebase";
import { Game, GameEvent, LineupPlayer } from "@/src/types/game";
import { Team } from "@/src/types/team";

export const gameService = {
  createGame: async (
    teamId: string,
    opponentName: string,
    date: Date,
    isHome: boolean,
  ) => {
    try {
      const teamDoc = await getDoc(doc(firestore, "teams", teamId));
      if (!teamDoc.exists()) throw new Error("Team not found");

      const team = teamDoc.data() as Team;

      const newGame: Omit<Game, "id"> = {
        teamId,
        opponentName,
        date,
        isHome,
        status: "scheduled",
        score: {
          team: 0,
          opponent: 0,
        },
        innings: [],
        lineup: team.players.map((player, index) => ({
          ...player,
          lineupPosition: index + 1,
          gameStats: {
            atBats: 0,
            runs: 0,
            hits: 0,
            singles: 0,
            doubles: 0,
            triples: 0,
            homeRuns: 0,
            rbis: 0,
            walks: 0,
            strikeouts: 0,
            sacrifices: 0,
            stolenBases: 0,
            caughtStealing: 0,
          },
        })),
        stats: {
          hits: 0,
          runs: 0,
          errors: 0,
          leftOnBase: 0,
        },
      };

      const docRef = await addDoc(collection(firestore, "games"), newGame);
      return docRef.id;
    } catch (error) {
      console.error("Error creating game:", error);
      throw error;
    }
  },

  updateGameEvent: async (gameId: string, event: GameEvent) => {
    try {
      const gameRef = doc(firestore, "games", gameId);
      const gameDoc = await getDoc(gameRef);
      if (!gameDoc.exists()) throw new Error("Game not found");

      const game = gameDoc.data() as Game;

      // Update game stats based on event
      const updatedGame = calculateGameStats(game, event);

      await updateDoc(gameRef, updatedGame);
    } catch (error) {
      console.error("Error updating game:", error);
      throw error;
    }
  },

  getTeamGames: async (teamId: string) => {
    try {
      const gamesRef = collection(firestore, "games");
      const q = query(gamesRef, where("teamId", "==", teamId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Game[];
    } catch (error) {
      console.error("Error fetching team games:", error);
      throw error;
    }
  },

  updateLineup: async (gameId: string, lineup: LineupPlayer[]) => {
    try {
      const gameRef = doc(firestore, "games", gameId);
      await updateDoc(gameRef, { lineup });
    } catch (error) {
      console.error("Error updating lineup:", error);
      throw error;
    }
  },
};

// Helper function to calculate updated game stats
function calculateGameStats(game: Game, event: GameEvent): Partial<Game> {
  const updates: Partial<Game> = {
    innings: [...game.innings],
    lineup: [...game.lineup],
    stats: { ...game.stats },
  };

  if (event.type === "atBat") {
    const playerIndex = game.lineup.findIndex((p) => p.id === event.playerId);
    if (playerIndex === -1) return updates;

    const playerStats = { ...game.lineup[playerIndex].gameStats };

    switch (event.result) {
      case "1B":
        playerStats.hits++;
        playerStats.singles++;
        playerStats.atBats++;
        updates.stats.hits++;
        break;
      case "2B":
        playerStats.hits++;
        playerStats.doubles++;
        playerStats.atBats++;
        updates.stats.hits++;
        break;
      case "3B":
        playerStats.hits++;
        playerStats.triples++;
        playerStats.atBats++;
        updates.stats.hits++;
        break;
      case "HR":
        playerStats.hits++;
        playerStats.homeRuns++;
        playerStats.atBats++;
        updates.stats.hits++;
        updates.stats.runs++;
        break;
      case "BB":
        playerStats.walks++;
        break;
      case "OUT":
      case "K":
        playerStats.atBats++;
        if (event.result === "K") playerStats.strikeouts++;
        break;
    }

    updates.lineup[playerIndex].gameStats = playerStats;
  }

  return updates;
}
