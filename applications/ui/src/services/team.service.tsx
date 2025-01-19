import { post, get } from './helper';

export interface Team {
  id: number;
  name: string;
  description: string;
  password: string;
}

export const registerTeam = async (data: { name: string; description: string; password?: string; }): Promise<Team> => post('/groups/register', data, {}).then(res => res.data);

export const getTeams = async (): Promise<Team[]> => get('/groups', {}).then(res => res.data);