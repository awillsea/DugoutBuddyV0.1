import { useState, useEffect } from 'react';
import { Team } from '@/src/types/team';
import { teamService } from '@/src/services/team/teamService';

export const useTeam = () => {
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const teams = await teamService.getUserTeams();
      if (teams.length > 0) {
        setCurrentTeam(teams[0]);
      }
    } catch (error) {
      console.error('Error loading team:', error);
    } finally {
      setLoading(false);
    }
  };

  return { currentTeam, loading };
};