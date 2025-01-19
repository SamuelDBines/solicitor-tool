import React, { useState } from 'react';
import { useTasks } from '../hooks/tasks.hook';
import EmptyStateSvg from '../assets/empty-state.svg';
import { Task, createTask, delTasks } from '../services/task.service';

const initalState = {
  name: '',
  description: '',
  type: ''
};
const TasksPage: React.FC = () => {
  const { tasks, refetch } = useTasks();

  const [data, setData] = useState<Omit<Task, 'id'>>(initalState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const addTask = async () => {
    if (data.name.trim() === '') return;
    try {
      await createTask(data);
      setData(initalState);
      refetch();
    } catch (err) {
      alert(err);
    }
  };

  // const toggleTaskCompletion = (taskId: number) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       task.id === taskId ? { ...task, completed: !task.completed } : task
  //     )
  //   );
  // };

  // const deleteTask = (taskId: number) => {
  //   setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  // };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white p-6">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-center mb-8">Tasks</h1>

      {/* Add Task Input */}
      <div className="mb-8 max-w-3xl mx-auto">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Add a new task"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-gray-300 border border-gray-700 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            onClick={addTask}
            className="ml-3 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition duration-200"
          >
            Add
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="max-w-3xl mx-auto">
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${task.completed ? 'bg-gray-800' : 'bg-gray-900'
                  }`}
              >
                {/* Task Title */}
                <div
                  // onClick={() => toggleTaskCompletion(task.id)}
                  className={`cursor-pointer ${task.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-300 hover:text-white transition'
                    }`}
                >
                  {task.name}
                </div>
                {/* Delete Button */}
                <button
                  // onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-600 transition duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center text-center py-16">
            <EmptyStateSvg />
            <h2 className="text-2xl font-bold text-gray-300 mb-4">No Teams Yet</h2>
            <p className="text-gray-400 mb-8">
              Get started by creating your first team. Add your family members and start organizing!
            </p>
            <button
              // onClick={() => setIsModalOpen(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transition duration-200"
            >
              Create a Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
