import { useEffect, useState } from 'react';
import { Task, getTasks } from '../services/task.service';

export const useTasks = () => {
  const [tasks, setTeams] = useState<Task[]>([]);
  const [r, setRetchTeams] = useState<boolean>(true);

  useEffect(() => {
    if (r) {
      getTasks().then((t) => setTeams(t)).catch(err => console.error('error: ', err)).finally(() => setRetchTeams(false));
    }
  }, [r]);

  const refetch = () => setRetchTeams(true);
  return {
    tasks,
    refetch
  };
};