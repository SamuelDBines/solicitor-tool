import { useEffect, useState } from 'react';
import { Team, getTeams } from '../services/team.service';

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [r, setRetchTeams] = useState<boolean>(true);

  useEffect(() => {
    if (r) {
      getTeams().then((t) => setTeams(t)).catch(err => console.error('error: ', err)).finally(() => setRetchTeams(false));
    }
  }, [r]);

  const refetch = () => setRetchTeams(true);
  return {
    teams,
    refetch
  };
};