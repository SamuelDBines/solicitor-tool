import { post, del, get } from './helper';
import { getTeamId } from './helper';

export interface Event {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  taskId: number;
}


export const createEvent = async (data: Omit<Event, 'id'>): Promise<Event> => post(`/events/group/${getTeamId()}`, data, {}).then(res => res.data);

export const getEvents = async (): Promise<Event[]> => get(`/events/group/${getTeamId()}`, {}).then(res => res.data);

export const delEvent = async ({ taskId }: { taskId: number; }): Promise<{ message: 'success'; }> => del(`/events/${taskId}`, {}).then(res => res.data);