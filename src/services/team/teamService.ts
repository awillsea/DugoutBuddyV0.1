// src/services/team/teamService.ts
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/src/config/firebase";
import { Team, TeamCreationData, Position } from "@/src/types/team";

interface PlayerCreationData {
  name: string;
  number: string;
  positions: Position[];
}

interface PlayerUpdateData {
  name?: string;
  number?: string;
  positions?: Position[];
  isActive?: boolean;
}
const firestore = getFirestore();

export const teamService = {
  createTeam: async (data: { name: string; season: string }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User must be authenticated");

      const newTeam: Partial<Team> = {
        name: data.name,
        season: data.season,
        managerId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        players: [],
        settings: {
          defaultGameDuration: 120,
          defaultInnings: 7,
          minimumPlayers: 9,
          autoSubstitutionEnabled: false,
          notificationsEnabled: true,
          privacyLevel: "private",
        },
        stats: {
          totalGames: 0,
          wins: 0,
          losses: 0,
          ties: 0,
          runsScored: 0,
          runsAllowed: 0,
          winningPercentage: 0,
          streak: {
            type: "W",
            count: 0,
          },
        },
      };

      const teamsRef = collection(firestore, "teams");
      const docRef = await addDoc(teamsRef, newTeam);

      return docRef.id;
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  },

  getUserTeams: async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User must be authenticated");

      const teamsRef = collection(firestore, "teams");
      const q = query(teamsRef, where("managerId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Team[];
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },

  getTeam: async (teamId: string) => {
    try {
      const teamDoc = await getDoc(doc(firestore, "teams", teamId));
      if (!teamDoc.exists()) return null;
      return { id: teamDoc.id, ...teamDoc.data() } as Team;
    } catch (error) {
      console.error("Error fetching team:", error);
      throw error;
    }
  },

  addPlayer: async (teamId: string, playerData: PlayerCreationData) => {
    try {
      const docRef = doc(firestore, "teams", teamId);
      const newPlayer = {
        id: uuidv4(),
        ...playerData,
        isActive: true,
        stats: {
          games: 0,
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
          battingAverage: 0,
          onBasePercentage: 0,
          sluggingPercentage: 0,
          ops: 0,
        },
        attendance: {
          present: 0,
          absent: 0,
          late: 0,
          lastGames: [],
        },
      };

      await updateDoc(docRef, {
        players: arrayUnion(newPlayer),
      });

      return newPlayer.id;
    } catch (error) {
      console.error("Error adding player:", error);
      throw error;
    }
  },

  updatePlayer: async (
    teamId: string,
    playerId: string,
    playerData: PlayerUpdateData,
  ) => {
    try {
      const docRef = doc(firestore, "teams", teamId);
      const teamDoc = await getDoc(docRef);

      if (!teamDoc.exists()) throw new Error("Team not found");

      const team = teamDoc.data() as Team;
      const playerIndex = team.players.findIndex((p) => p.id === playerId);

      if (playerIndex === -1) throw new Error("Player not found");

      const updatedPlayers = [...team.players];
      updatedPlayers[playerIndex] = {
        ...updatedPlayers[playerIndex],
        ...playerData,
      };

      await updateDoc(docRef, { players: updatedPlayers });
    } catch (error) {
      console.error("Error updating player:", error);
      throw error;
    }
  },
};
