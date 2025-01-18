import React from 'react';
import { Calendar, momentLocalizer, Event, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.styles.css'; // Custom CSS for Tailwind integration

// Localizer using Moment.js
const localizer = momentLocalizer(moment);

// Define the type for calendar events
interface MyEvent extends Event {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
}

const events: MyEvent[] = [
  {
    title: 'Family Meeting',
    start: new Date(),
    end: new Date(),
    allDay: false,
  },
  {
    title: 'Doctor Appointment',
    start: moment().add(1, 'days').toDate(),
    end: moment().add(1, 'days').toDate(),
    allDay: true,
  },
];

const MyCalendar: React.FC = () => {
  // Event click handler
  const handleSelectEvent = (event: MyEvent) => {
    alert(`Event: ${event.title}`);
  };

  // Slot click handler
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    alert(`Selected slot from ${slotInfo.start} to ${slotInfo.end}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Family Planner Calendar
      </h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '600px' }}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        components={{
          event: ({ event }) => (
            <div className="bg-purple-500 text-white rounded-md p-1 hover:bg-purple-600 transition">
              {event.title}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default MyCalendar;
