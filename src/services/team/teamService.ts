// src/services/team/teamService.ts
import { 
    collection, 
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    Timestamp
   } from 'firebase/firestore';
   import { Team, CreateTeamInput, Player } from '../../types/team';
   import { auth, db } from '../../config/firebase';
   
   class TeamService {
    async createTeam(input: CreateTeamInput): Promise<string> {
      if (!auth.currentUser) throw new Error('Must be logged in to create a team');
   
      const teamData = {
        ...input,
        managerId: auth.currentUser.uid,
        players: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
   
      const docRef = await addDoc(collection(db, 'teams'), teamData);
      return docRef.id;
    }
   
    async getUserTeams(): Promise<Team[]> {
      if (!auth.currentUser) throw new Error('Must be logged in to fetch teams');
   
      const teamsQuery = query(
        collection(db, 'teams'),
        where('managerId', '==', auth.currentUser.uid)
      );
   
      const snapshot = await getDocs(teamsQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Team));
    }
   
    async getTeam(teamId: string): Promise<Team | null> {
      const docRef = doc(db, 'teams', teamId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) return null;
      
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Team;
    }
   
    async addPlayer(teamId: string, player: Omit<Player, 'id'>): Promise<void> {
      const teamRef = doc(db, 'teams', teamId);
      const teamSnap = await getDoc(teamRef);
      
      if (!teamSnap.exists()) throw new Error('Team not found');
      
      const team = teamSnap.data() as Team;
      const newPlayer = {
        ...player,
        id: crypto.randomUUID(),
        stats: {
          gamesPlayed: 0,
          atBats: 0,
          hits: 0,
          runs: 0,
          rbis: 0,
          avg: 0
        }
      };
      
      await updateDoc(teamRef, {
        players: [...team.players, newPlayer],
        updatedAt: Timestamp.now()
      });
    }
   
    async removePlayer(teamId: string, playerId: string): Promise<void> {
      const teamRef = doc(db, 'teams', teamId);
      const teamSnap = await getDoc(teamRef);
      
      if (!teamSnap.exists()) throw new Error('Team not found');
      
      const team = teamSnap.data() as Team;
      
      await updateDoc(teamRef, {
        players: team.players.filter(p => p.id !== playerId),
        updatedAt: Timestamp.now()
      });
    }
   
    async deleteTeam(teamId: string): Promise<void> {
      await deleteDoc(doc(db, 'teams', teamId));
    }
   }
   
   export const teamService = new TeamService();