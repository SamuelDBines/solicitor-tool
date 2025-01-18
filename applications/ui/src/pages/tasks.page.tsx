import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), title: newTask.trim(), completed: false },
    ]);
    setNewTask('');
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Tasks
      </h1>

      {/* Add Task Input */}
      <div className="mb-6">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            onClick={addTask}
            className="ml-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-200"
          >
            Add
          </button>
        </div>
      </div>

      {/* Task List */}
      <div>
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between p-4 border rounded-lg ${task.completed ? 'bg-gray-100' : 'bg-white'
                  }`}
              >
                <div
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`cursor-pointer ${task.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-800'
                    }`}
                >
                  {task.title}
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No tasks yet. Add one!</p>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
