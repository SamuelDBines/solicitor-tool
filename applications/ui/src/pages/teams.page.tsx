import React, { useState } from 'react';
import { registerTeam } from '../services/team.service';
import { useTeams } from '../hooks/teams.hook';
import { getTeamId } from '../services/helper';
import EmptyStateSvg from '../assets/empty-state.svg';


const TeamsPage: React.FC = () => {

  const { teams, refetch } = useTeams();
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(getTeamId());

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');

  const selectTeam = (teamId: number) => {
    setSelectedTeamId(teamId);
    localStorage.setItem('team', teamId.toString());
  };



  const handleAddTeam = async () => {
    if (newTeamName.trim() === '') return;
    try {
      await registerTeam({
        name: newTeamName,
        description: 'A newly created family group.',
      });

      setNewTeamName('');
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      alert(err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewTeamName('');
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold mb-8">Your Teams</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transition duration-200"
        >
          Add New Team
        </button>
      </div>

      {/* Teams List */}
      <div className="max-w-4xl mx-auto mt-8">
        {teams.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Available Teams</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {teams.map((team) => (
                <li
                  key={team.id}
                  onClick={() => selectTeam(team.id)}
                  className={`p-6 rounded-lg shadow-lg cursor-pointer transition transform ${selectedTeamId === team.id
                    ? 'bg-purple-600 scale-105'
                    : 'bg-gray-800 hover:bg-purple-700'
                    }`}
                >
                  <h3 className="text-lg font-bold">{team.name}</h3>
                  <p className="text-sm text-gray-300">{team.description}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center text-center py-16">
            <EmptyStateSvg />
            <h2 className="text-2xl font-bold text-gray-300 mb-4">No Teams Yet</h2>
            <p className="text-gray-400 mb-8">
              Get started by creating your first team. Add your family members and start organizing!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transition duration-200"
            >
              Create a Team
            </button>
          </div>
        )}
      </div>

      {/* Selected Team Details */}
      <div className="max-w-3xl mx-auto mt-8">
        {selectedTeamId && (
          <div className="p-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              {teams.find((team) => team.id === selectedTeamId)?.name}
            </h2>
            <p className="text-gray-300">
              View tasks, events, and details for this team. Collaborate with your family and stay
              organized!
            </p>
            <button
              onClick={() => setSelectedTeamId(null)}
              className="mt-6 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition duration-200"
            >
              Back to Teams
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Team</h2>
            <input
              type="text"
              placeholder="Team Name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 text-gray-300 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTeam}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition duration-200"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
