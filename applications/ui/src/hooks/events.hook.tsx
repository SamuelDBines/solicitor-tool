import { useEffect, useMemo, useState } from 'react';
import { moment } from 'moment';
import { Event, getEvents } from '../services/events.service';

export interface ReactCalendarEvent extends Event {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: Event;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [r, setRetchTeams] = useState<boolean>(true);

  useEffect(() => {
    if (r) {
      getEvents().then((t) => setEvents(t)).catch(err => console.error('error: ', err)).finally(() => setRetchTeams(false));
    }
  }, [r]);

  const formattedEvents: ReactCalendarEvent[] = useMemo(() => events.map(t => ({
    title: t.name,
    start: new Date(t.startTime),
    end: new Date(t.endTime),
    allDay: false,
    resource: t
  })), [events]);
  const refetch = () => setRetchTeams(true);
  return {
    events,
    refetch,
    formattedEvents
  };
};