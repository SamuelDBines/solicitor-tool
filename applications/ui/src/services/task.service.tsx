import { post, del, get } from './helper';
import { getTeamId } from './helper';

export interface Task {
  id: number;
  name: string;
  description: string;
  type: string;
  completed?: boolean;
}


export const createTask = async (data: Omit<Task, 'id'>): Promise<Task> => post(`/tasks/group/${getTeamId()}`, data, {}).then(res => res.data);

export const getTasks = async (): Promise<Task[]> => get(`/tasks/group/${getTeamId()}`, {}).then(res => res.data);

export const delTasks = async ({ taskId }: { taskId: number; }): Promise<{ message: 'success'; }> => del(`/tasks/${taskId}`, {}).then(res => res.data);