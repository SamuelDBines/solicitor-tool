import React, { useState } from 'react';
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ReactCalendarEvent, useEvents } from '../hooks/events.hook';
import { Event, createEvent } from '../services/events.service';
import './calendar.styles.css'; // Custom CSS for Tailwind integration
import { useTasks } from '../hooks/tasks.hook';

// Localizer using Moment.js
const localizer = momentLocalizer(moment);

// Define the type for calendar events


const MyCalendar: React.FC = () => {
  const { formattedEvents, refetch } = useEvents();
  const { tasks } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Event click handler
  const handleSelectEvent = (event: ReactCalendarEvent) => {
    alert(`Event: ${event.title}`);
  };

  const [data, setData] = useState<Omit<Event, 'id'> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleAddEvent = async () => {
    try {
      if (!data) return;
      await createEvent(data);
      await refetch();
      setIsModalOpen(false);
    } catch (err) {
      alert(err);
    }
  };

  // Slot click handler
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setIsModalOpen(true);
    setData({
      startTime: slotInfo.start,
      endTime: slotInfo.end,
      name: '',
      description: '',
      taskId: 0
    });
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-lg shadow-lg">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Team</h2>
            <input
              type="text"
              placeholder="Title"
              name="name"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 text-gray-300 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 text-gray-300 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />

            <select
              name="taskId"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 text-gray-300 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            >
              <option disabled selected>
                Select a task
              </option>
              {tasks.map((t) => (
                <option key={t.id} value={t.id} className="bg-gray-800 text-gray-300">
                  {t.name}
                </option>
              ))}
            </select>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition duration-200"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      <Calendar
        localizer={localizer}
        events={formattedEvents}
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
